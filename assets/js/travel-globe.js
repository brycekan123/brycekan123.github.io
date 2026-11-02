// Interactive travel globe for /travel/. Places come from window.TRAVEL (set in _pages/travel.md from _data/travel.yml).
(function () {
  "use strict";

  const root = document.querySelector(".travel-globe");
  if (!root) return;

  const WORLD_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const PIN_ALT = 0.02;
  const ROAD_ALT = 0.008; // just above the country shapes
  const DWELL_MS = 600;
  const STOPOVER_MS = 150; // brief pause at home between trips
  const FRAME_MS = 560; // camera move that frames each leg before it starts
  const DWELL_MS_REDUCED = 3000;
  const DEG = Math.PI / 180;
  // Plane: Material Icons "flight" (Apache 2.0), nose pointing up. Car and train: side views, facing right.
  const VEHICLE_SVG =
    '<svg class="tg-icon-plane" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>' +
    '<svg class="tg-icon-car" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 15v-3l2-1 2.5-4h8l3.5 4 3 .6V15z"/><circle cx="7" cy="16" r="2.2"/><circle cx="17" cy="16" r="2.2"/></svg>' +
    '<svg class="tg-icon-train" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M2 7h11c4 0 7.5 2.5 9 7v2H2zM4 9h3v2.5H4zm5 0h3v2.5H9zm5 0h1.8c1.5.2 2.8 1 3.8 2.5H14z"/><circle cx="6" cy="17.6" r="1.4"/><circle cx="11" cy="17.6" r="1.4"/><circle cx="17" cy="17.6" r="1.4"/></svg>';

  const $ = (id) => document.getElementById(id);
  const globeEl = $("tg-globe");
  const loadingEl = $("tg-loading");
  const tourBtn = $("tg-tour");
  const resetBtn = $("tg-reset");
  const card = {
    photo: $("tg-card-photo"),
    img: $("tg-card-img"),
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
      // Card framing: which point of the photo to keep ("x% y%") and how far to zoom around it.
      focus: /^\d{1,3}% \d{1,3}%$/.test(p.photo_focus) ? p.photo_focus : "50% 50%",
      zoom: typeof p.photo_zoom === "number" && p.photo_zoom >= 1 && p.photo_zoom <= 3 ? p.photo_zoom : 1,
      caption: p.caption ? String(p.caption) : "",
      date: p.date == null ? "" : String(p.date).trim(),
      dateLabel: p.date_label ? String(p.date_label) : "",
      color: /^#[0-9a-f]{6}$/i.test(p.color) ? p.color : "",
      color2: /^#[0-9a-f]{6}$/i.test(p.color2) ? p.color2 : "",
      by: p.by === "car" || p.by === "train" ? p.by : "plane",
      home: p.home === true,
      backHome: ["car", "train", "plane"].includes(p.back_home) ? p.back_home : "",
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
  let tour = null; // the running tour: { timers, frame }; null when idle
  let routes = []; // route lines drawn by the tour: { points: [[lat, lng, alt], ...], colors, partial }
  const pinEls = new Map();
  const chipEls = new Map();

  const vehicleEl = document.createElement("div");
  vehicleEl.className = "tg-vehicle";
  vehicleEl.innerHTML = VEHICLE_SVG;
  globeEl.after(vehicleEl);

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
    card.img.hidden = !p.photo;
    if (p.photo) {
      card.img.src = p.photo;
      card.img.alt = `Photo from ${p.place}`;
      card.img.style.objectPosition = p.focus;
      card.img.style.transformOrigin = p.focus;
      card.img.style.transform = p.zoom === 1 ? "" : `scale(${p.zoom})`;
    } else {
      card.img.removeAttribute("src");
      card.img.alt = "";
    }
    card.region.textContent = p.region;
    card.place.textContent = p.place;
    setOptionalText(card.date, p.dateLabel || formatDate(p.date));
    setOptionalText(card.caption, p.caption);
  }

  function select(p, { fly = false, updateCard = true } = {}) {
    active = p;
    if (updateCard) showCard(p);
    pinEls.forEach((el, place) => el.classList.toggle("tg-active", place === p));
    chipEls.forEach((el, place) => el.setAttribute("aria-pressed", String(place === p)));
    if (fly && world) world.pointOfView({ lat: p.lat, lng: p.lng, altitude: 0.3 }, flyMs);
  }

  // A leg between two places along the great circle, so the line and the vehicle share one curve.
  // Flights arc up and come back down; drives and train rides stay on the ground.
  function makeLeg(from, to, ground) {
    const vec = (p) => [Math.cos(p.lat * DEG) * Math.cos(p.lng * DEG), Math.cos(p.lat * DEG) * Math.sin(p.lng * DEG), Math.sin(p.lat * DEG)];
    const a = vec(from);
    const b = vec(to);
    const angle = Math.acos(Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])));
    const peak = 0.03 + angle * 0.22;
    const altAt = (t) => (ground ? ROAD_ALT : PIN_ALT + peak * Math.sin(Math.PI * t));
    const at = (t) => {
      const s = Math.sin(angle);
      const ka = angle < 1e-6 ? 1 - t : Math.sin((1 - t) * angle) / s;
      const kb = angle < 1e-6 ? t : Math.sin(t * angle) / s;
      const [x, y, z] = [0, 1, 2].map((i) => ka * a[i] + kb * b[i]);
      return [Math.atan2(z, Math.hypot(x, y)) / DEG, Math.atan2(y, x) / DEG, altAt(t)];
    };
    const samples = Math.max(24, Math.ceil(angle / DEG) * 3);
    const points = Array.from({ length: samples + 1 }, (_, i) => at(i / samples));
    return { angle, at, points };
  }

  // globe.gl only redraws a path it hasn't seen, so hand it fresh objects each time a route grows.
  function drawRoutes() {
    if (world) world.pathsData(routes.map((r) => ({ points: r.points, colors: r.colors })));
  }

  // Places the vehicle over the canvas; hidden while it is behind the globe.
  function placeVehicle([lat, lng, alt], transform) {
    const { x, y } = world.getScreenCoords(lat, lng, alt);
    const p = world.getCoords(lat, lng, alt);
    const c = world.camera().position;
    const r = world.getGlobeRadius();
    const visible = p.x * c.x + p.y * c.y + p.z * c.z > r * r;
    vehicleEl.style.transform = `translate(${x}px, ${y}px) ${transform}`;
    vehicleEl.classList.toggle("tg-moving", visible);
  }

  function wait(run, ms) {
    return new Promise((resolve) => run.timers.push(setTimeout(resolve, ms)));
  }

  // Frames the leg, then moves the plane, car or train along it while its route line grows behind it.
  async function travelLeg(run, from, to, by) {
    const ground = by !== "plane";
    const leg = makeLeg(from, to, ground);
    const mid = leg.at(0.5);
    const frameMs = reduceMotion ? 0 : FRAME_MS;
    // Close in on short drives (Zion to Bryce Canyon is under 1°) and pull back for ocean crossings.
    world.pointOfView({ lat: mid[0], lng: mid[1], altitude: Math.min(2.2, Math.max(0.18, 0.12 + leg.angle * 2.6)) }, frameMs);
    await wait(run, frameMs);
    if (tour !== run) return;

    // With place colors, the line fades from the color of where you left to where you arrived.
    const colors = from.color && to.color ? [from.color, to.color] : null;
    const route = { points: leg.points, colors, partial: true };
    routes.push(route);
    if (reduceMotion) {
      route.partial = false;
      drawRoutes();
      return;
    }

    const degrees = leg.angle / DEG;
    const duration = ground ? Math.min(1800, 1080 + degrees * 150) : Math.min(2040, Math.max(960, 900 + degrees * 36));
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    vehicleEl.classList.toggle("tg-by-car", by === "car");
    vehicleEl.classList.toggle("tg-by-train", by === "train");
    const start = performance.now();
    await new Promise((resolve) => {
      const frame = (now) => {
        if (tour !== run) return;
        const t = ease(Math.min(1, (now - start) / duration));
        const here = leg.at(t);
        const s1 = world.getScreenCoords(...leg.at(Math.max(0, t - 0.01)));
        const s2 = world.getScreenCoords(...leg.at(Math.min(1, t + 0.01)));
        route.points = leg.points.filter((_, i) => i / (leg.points.length - 1) <= t).concat([here]);
        drawRoutes();
        if (ground) {
          // The car and train are drawn from the side, so they only flip to face left or right.
          placeVehicle(here, `scaleX(${s2.x < s1.x ? -1 : 1})`);
        } else {
          const heading = (Math.atan2(s2.x - s1.x, s1.y - s2.y) * 180) / Math.PI;
          placeVehicle(here, `rotate(${heading}deg) scale(${1 + 0.3 * Math.sin(Math.PI * t)})`);
        }
        if (t < 1) run.frame = requestAnimationFrame(frame);
        else resolve();
      };
      run.frame = requestAnimationFrame(frame);
    });
    route.points = leg.points;
    route.partial = false;
    drawRoutes();
    vehicleEl.classList.remove("tg-moving");
  }

  // Tour order with a stop at home after each trip that ends with back_home: brief between trips,
  // and a full stop (home's card) when the last trip heads home.
  function tourStops() {
    const homeBase = places.find((p) => p.home);
    const stops = [];
    tourOrder.forEach((p, i) => {
      stops.push({ place: p, by: p.by, stopover: false });
      if (homeBase && p.backHome && p !== homeBase) {
        stops.push({ place: homeBase, by: p.backHome, stopover: i < tourOrder.length - 1 });
      }
    });
    return stops;
  }

  // Visits every stop, drawing the route as it goes, and ends at the last place.
  async function playTour(run) {
    const dwell = reduceMotion ? DWELL_MS_REDUCED : DWELL_MS;
    const stops = tourStops();
    select(stops[0].place, { fly: true });
    // The first leg's framing takes over the camera, so there's no need to wait out the whole fly-in.
    await wait(run, reduceMotion ? dwell : FRAME_MS + dwell);
    for (let i = 1; i < stops.length; i++) {
      const { place, by, stopover } = stops[i];
      if (tour !== run) return;
      if (world) await travelLeg(run, stops[i - 1].place, place, by);
      if (tour !== run) return;
      // A stop at home only lights up its pin; the card keeps the trip just finished.
      select(place, { updateCard: !stopover });
      if (i < stops.length - 1) await wait(run, stopover ? STOPOVER_MS : dwell);
    }
    if (tour === run) endTour();
  }

  function endTour() {
    tour = null;
    vehicleEl.classList.remove("tg-moving");
    tourBtn.textContent = "2026 travel tour";
  }

  // Stops a running tour; finished route lines stay, the one in flight is dropped.
  function stopTour() {
    if (!tour) return;
    tour.timers.forEach(clearTimeout);
    cancelAnimationFrame(tour.frame);
    routes = routes.filter((r) => !r.partial);
    drawRoutes();
    endTour();
  }

  function startTour() {
    if (!tourOrder.length) return;
    stopTour();
    routes = [];
    drawRoutes();
    tour = { timers: [], frame: 0 };
    onCountryHover(null);
    tourBtn.textContent = "Stop";
    playTour(tour);
  }

  function makePin(p) {
    const anchor = document.createElement("div");
    anchor.className = "tg-pin-anchor" + (p === active ? " tg-active" : "");
    if (p.color) anchor.style.setProperty("--tg-pin", p.color);
    if (p.color2) anchor.style.setProperty("--tg-pin-2", p.color2);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tg-pin" + (p.photo ? "" : " tg-empty");
    btn.setAttribute("aria-label", p.place);
    if (p.photo) btn.style.backgroundImage = `url(${JSON.stringify(p.photo)})`;
    const label = document.createElement("span");
    label.className = "tg-pin-label";
    label.textContent = p.place;
    // While the tour runs, pins pass under a resting cursor, so hovering only previews when idle.
    btn.addEventListener("mouseenter", () => {
      if (!tour) select(p);
    });
    btn.addEventListener("click", () => {
      stopTour();
      select(p, { fly: true });
    });
    anchor.append(label, btn);
    pinEls.set(p, anchor);
    return anchor;
  }

  // Small timeline tag in front of each chip: "Home" for the home base, else the month (or year) of the visit.
  function chipWhen(p) {
    if (p.home) return "Home";
    const m = /^(\d{4})(?:-(\d{1,2}))?/.exec(p.date);
    if (!m) return "";
    return m[2] ? MONTHS[Number(m[2]) - 1] || m[1] : m[1];
  }

  // Chips follow the tour order, so read left to right they form a timeline.
  function buildChips() {
    const wrap = $("tg-chips");
    tourOrder.forEach((p) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "tg-chip" + (p.photo ? "" : " tg-empty");
      if (p.color) b.style.setProperty("--tg-pin", p.color);
      if (p.color2) b.style.setProperty("--tg-pin-2", p.color2);
      const when = chipWhen(p);
      if (when) {
        const tag = document.createElement("span");
        tag.className = "tg-chip-when";
        tag.textContent = when;
        b.append(tag);
      }
      b.append(p.place);
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
    const route = token("--tg-route");

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
      .polygonLabel((d) => `<b>${escapeHtml(d.properties.name)}</b>`)
      .pathColor((d) => d.colors || route);
  }

  function onCountryHover(d) {
    // The tour moves the camera under a resting cursor, so countries only highlight when idle.
    if (tour) d = null;
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
      .pathPoints("points")
      .pathPointLat((pt) => pt[0])
      .pathPointLng((pt) => pt[1])
      .pathPointAlt((pt) => pt[2])
      .pathStroke(2)
      .pathTransitionDuration(0)
      .htmlElementsData(places)
      .htmlLat("lat")
      .htmlLng("lng")
      .htmlAltitude(PIN_ALT)
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
    controls.minDistance = 115; // lets the tour close in on short drives
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
    routes = [];
    drawRoutes();
    if (world) world.pointOfView(home(), flyMs);
  });
  tourBtn.addEventListener("click", () => (tour ? stopTour() : startTour()));

  // Repaint the globe when the site's light/dark theme changes.
  new MutationObserver(paint).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  buildChips();
  if (tourOrder.length) select(tourOrder[0]);
  loadGlobe();
})();
