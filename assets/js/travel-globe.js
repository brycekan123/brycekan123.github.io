// Interactive travel globe for /travel/. Places come from window.TRAVEL (set in _pages/travel.md from _data/travel.yml).
(function () {
  "use strict";

  const root = document.querySelector(".travel-globe");
  if (!root) return;

  const WORLD_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const TOUR_MS = 2600;
  const TOUR_MS_REDUCED = 3000;

  const $ = (id) => document.getElementById(id);
  const globeEl = $("tg-globe");
  const loadingEl = $("tg-loading");
  const tourBtn = $("tg-tour");
  const resetBtn = $("tg-reset");
  const card = {
    photo: $("tg-card-photo"),
    region: $("tg-card-region"),
    place: $("tg-card-place"),
    date: $("tg-card-date"),
    caption: $("tg-card-caption"),
  };

  const config = window.TRAVEL || {};
  const baseurl = config.baseurl || "";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const flyMs = reduceMotion ? 0 : 1200;

  // Site-root photo paths need the site's baseurl in front of them.
  function photoUrl(path) {
    if (!path) return "";
    return path.charAt(0) === "/" ? baseurl + path : path;
  }

  const places = (Array.isArray(config.places) ? config.places : [])
    .filter((p) => p && p.place && typeof p.lat === "number" && typeof p.lng === "number")
    .map((p) => ({
      place: String(p.place),
      region: p.region ? String(p.region) : "",
      lat: p.lat,
      lng: p.lng,
      photo: photoUrl(p.photo),
      caption: p.caption ? String(p.caption) : "",
      date: p.date == null ? "" : String(p.date).trim(),
    }));

  // Dated places oldest first (the strings sort correctly), then undated ones in file order.
  const tourOrder = [
    ...places.filter((p) => p.date).sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0)),
    ...places.filter((p) => !p.date),
  ];

  let countries = [];
  let world = null;
  let hoverCountry = null;
  let active = null;
  let tourTimer = null;
  const pinEls = new Map();
  const chipEls = new Map();

  const home = () => ({ lat: 36, lng: -108, altitude: globeEl.clientWidth < 520 ? 2.3 : 1.7 });

  // "2024" stays "2024"; "2024-03" and "2024-03-15" become "Mar 2024". No new Date(), which shifts by timezone.
  function formatDate(value) {
    const m = /^(\d{4})(?:-(\d{1,2}))?/.exec(value);
    if (!m) return value;
    const month = m[2] ? MONTHS[Number(m[2]) - 1] : "";
    return month ? `${month} ${m[1]}` : m[1];
  }

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }

  function setOptionalText(el, text) {
    el.textContent = text;
    el.hidden = !text;
  }

  function showCard(p) {
    card.photo.classList.toggle("tg-empty", !p.photo);
    card.photo.style.backgroundImage = p.photo ? `url(${JSON.stringify(p.photo)})` : "";
    card.photo.setAttribute("aria-label", p.photo ? `Photo from ${p.place}` : "Photo coming soon.");
    card.region.textContent = p.region;
    card.place.textContent = p.place;
    setOptionalText(card.date, formatDate(p.date));
    setOptionalText(card.caption, p.caption);
  }

  function select(p, { fly = false } = {}) {
    active = p;
    showCard(p);
    pinEls.forEach((el, place) => el.classList.toggle("tg-active", place === p));
    chipEls.forEach((el, place) => el.setAttribute("aria-pressed", String(place === p)));
    if (fly && world) world.pointOfView({ lat: p.lat, lng: p.lng, altitude: 0.5 }, flyMs);
  }

  function stopTour() {
    clearInterval(tourTimer);
    tourTimer = null;
    tourBtn.textContent = "Fly through pins";
  }

  function startTour() {
    if (!tourOrder.length) return;
    // Fly to the place already shown first, then advance from whichever place is selected.
    select(active || tourOrder[0], { fly: true });
    const step = () => select(tourOrder[(tourOrder.indexOf(active) + 1) % tourOrder.length], { fly: true });
    tourTimer = setInterval(step, reduceMotion ? TOUR_MS_REDUCED : TOUR_MS);
    tourBtn.textContent = "Stop";
  }

  function makePin(p) {
    const anchor = document.createElement("div");
    anchor.className = "tg-pin-anchor" + (p === active ? " tg-active" : "");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tg-pin" + (p.photo ? "" : " tg-empty");
    btn.setAttribute("aria-label", p.place);
    if (p.photo) btn.style.backgroundImage = `url(${JSON.stringify(p.photo)})`;
    const label = document.createElement("span");
    label.className = "tg-pin-label";
    label.textContent = p.place;
    btn.addEventListener("mouseenter", () => {
      stopTour();
      select(p);
    });
    btn.addEventListener("click", () => {
      stopTour();
      select(p, { fly: true });
    });
    anchor.append(label, btn);
    pinEls.set(p, anchor);
    return anchor;
  }

  function buildChips() {
    const wrap = $("tg-chips");
    places.forEach((p) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "tg-chip" + (p.photo ? "" : " tg-empty");
      b.textContent = p.place;
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", () => {
        stopTour();
        select(p, { fly: true });
      });
      chipEls.set(p, b);
      wrap.append(b);
    });
  }

  // Colors live in the --tg-* tokens on .travel-globe, so light/dark follows the site theme.
  function paint() {
    if (!world) return;
    const style = getComputedStyle(root);
    const token = (name) => style.getPropertyValue(name).trim();
    const ocean = token("--tg-ocean");
    const land = token("--tg-land");
    const hover = token("--tg-land-hover");
    const stroke = token("--tg-stroke");

    const mat = world.globeMaterial();
    mat.color.set(ocean);
    if (mat.emissive) {
      mat.emissive.set(ocean);
      mat.emissiveIntensity = 0.55;
    }
    mat.shininess = 4;
    world.atmosphereColor(token("--tg-atmos"));

    world
      .polygonsData(countries)
      .polygonCapColor((d) => (d === hoverCountry ? hover : land))
      .polygonSideColor(() => "rgba(0,0,0,0.06)")
      .polygonStrokeColor(() => stroke)
      .polygonAltitude((d) => (d === hoverCountry ? 0.022 : 0.006))
      .polygonLabel((d) => `<b>${escapeHtml(d.properties.name)}</b>`);
  }

  function onCountryHover(d) {
    if (d === hoverCountry) return;
    hoverCountry = d;
    paint();
  }

  function initGlobe() {
    world = new Globe(globeEl, { animateIn: !reduceMotion })
      .backgroundColor("rgba(0,0,0,0)")
      .showAtmosphere(true)
      .atmosphereAltitude(0.14)
      .polygonsTransitionDuration(reduceMotion ? 0 : 250)
      .onPolygonHover(onCountryHover)
      .htmlElementsData(places)
      .htmlLat("lat")
      .htmlLng("lng")
      .htmlAltitude(0.02)
      .htmlElement(makePin)
      .htmlTransitionDuration(0)
      .htmlElementVisibilityModifier((el, visible) => {
        el.style.opacity = visible ? "1" : "0";
        const pin = el.querySelector(".tg-pin");
        pin.style.pointerEvents = visible ? "auto" : "none";
        pin.tabIndex = visible ? 0 : -1;
      })
      .onGlobeReady(() => {
        loadingEl.remove();
        // Pins behind the globe are only hidden on a camera change, so signal one once they exist.
        requestAnimationFrame(() => world.controls().dispatchEvent({ type: "change" }));
      });

    const controls = world.controls();
    controls.enableDamping = true;
    controls.minDistance = 130;
    controls.maxDistance = 520;
    globeEl.addEventListener("pointerdown", stopTour);

    const fit = () => world.width(globeEl.clientWidth).height(globeEl.clientHeight);
    new ResizeObserver(fit).observe(globeEl);
    fit();
    paint();
    world.pointOfView(home(), 0);
  }

  async function loadGlobe() {
    try {
      if (typeof Globe === "undefined" || typeof topojson === "undefined") throw new Error("Globe libraries did not load");
      const res = await fetch(WORLD_URL);
      if (!res.ok) throw new Error(`World data request failed: ${res.status}`);
      const topo = await res.json();
      countries = topojson.feature(topo, topo.objects.countries).features.filter((f) => f.properties.name !== "Antarctica");
      initGlobe();
    } catch (err) {
      console.warn("Travel globe:", err);
      loadingEl.textContent = "The globe didn't load. Reload the page to try again.";
    }
  }

  resetBtn.addEventListener("click", () => {
    stopTour();
    if (world) world.pointOfView(home(), flyMs);
  });
  tourBtn.addEventListener("click", () => (tourTimer ? stopTour() : startTour()));

  // Repaint the globe when the site's light/dark theme changes.
  new MutationObserver(paint).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  buildChips();
  if (tourOrder.length) select(tourOrder[0]);
  loadGlobe();
})();
