---
layout: page
title: travel (page pending)
permalink: /travel/
description: "Places I've been (starting from 2024)."
nav: true
nav_order: 6
_styles: |
  /* Baby-blue accent, scoped to this page. accent = fills/rings/dots, ink = accent-colored text. */
  .travel-globe {
    --tg-accent: #74c0ea;
    --tg-ink: #1d6fa5;
    --tg-soft: #e4f3fc;
    --tg-ocean: #eef4f9;
    --tg-land: #b4c3d1;
    --tg-land-hover: #89cff0;
    --tg-atmos: #a9d8f2;
    --tg-stroke: var(--global-bg-color);
    display: grid;
    gap: 14px;
    min-width: 0;
  }

  html[data-theme="dark"] .travel-globe {
    --tg-accent: #8fd0f2;
    --tg-ink: #9bd5f4;
    --tg-soft: #233a47;
    --tg-ocean: #262b31;
    --tg-land: #56606b;
    --tg-land-hover: #4f8fb3;
    --tg-atmos: #4f86a8;
  }

  .travel-globe .tg-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }

  .travel-globe .tg-btn {
    font-family: inherit;
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--global-text-color);
    background: transparent;
    border: 1px solid var(--global-divider-color);
    border-radius: 999px;
    padding: 6px 14px;
    cursor: pointer;
  }

  .travel-globe .tg-btn:hover {
    background: var(--tg-soft);
  }

  .travel-globe .tg-btn:focus-visible,
  .travel-globe .tg-chip:focus-visible,
  .travel-globe .tg-pin:focus-visible {
    outline: 2px solid var(--tg-ink);
    outline-offset: 2px;
  }

  /* Globe column + photo card; one column on phones. */
  .travel-globe .tg-stage {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 300px;
    gap: 24px;
    align-items: start;
  }

  .travel-globe .tg-globe-col {
    display: grid;
    gap: 14px;
    min-width: 0;
  }

  .travel-globe .tg-globe-box {
    position: relative;
    height: 500px;
    border-radius: 16px;
    border: 1px solid var(--global-divider-color);
    background:
      radial-gradient(ellipse at 50% 45%, var(--tg-soft), transparent 62%),
      var(--global-bg-color);
    overflow: hidden;
    cursor: grab;
  }

  .travel-globe .tg-globe-box:active {
    cursor: grabbing;
  }

  .travel-globe .tg-globe {
    position: absolute;
    inset: 0;
  }

  .travel-globe .tg-hint {
    position: absolute;
    left: 14px;
    bottom: 12px;
    font-size: 0.75rem;
    color: var(--global-text-color-light);
    pointer-events: none;
  }

  .travel-globe .tg-loading {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    padding: 0 16px;
    text-align: center;
    color: var(--global-text-color-light);
    font-size: 0.9rem;
  }

  .travel-globe .tg-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .travel-globe .tg-chip {
    font-family: inherit;
    font-size: 0.8rem;
    color: var(--global-text-color);
    background: var(--global-card-bg-color);
    border: 1px solid var(--global-divider-color);
    border-radius: 999px;
    padding: 4px 12px 4px 8px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }

  .travel-globe .tg-chip::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--tg-accent);
  }

  .travel-globe .tg-chip.tg-empty::before {
    background: transparent;
    box-shadow: inset 0 0 0 1.5px var(--tg-accent);
  }

  .travel-globe .tg-chip[aria-pressed="true"] {
    border-color: var(--tg-accent);
    background: var(--tg-soft);
  }

  /* Pins: globe.gl positions .tg-pin-anchor, the button inside scales freely. */
  .travel-globe .tg-pin-anchor {
    pointer-events: none;
  }

  .travel-globe .tg-pin {
    pointer-events: auto;
    display: block;
    width: 28px;
    height: 28px;
    padding: 0;
    border-radius: 50%;
    border: 2px solid var(--global-bg-color);
    box-shadow:
      0 0 0 2px var(--tg-accent),
      0 4px 10px rgba(0, 0, 0, 0.25);
    background: var(--tg-accent) center / cover no-repeat;
    cursor: pointer;
    transition:
      transform 0.15s ease,
      opacity 0.2s ease;
  }

  .travel-globe .tg-pin.tg-empty {
    width: 14px;
    height: 14px;
  }

  .travel-globe .tg-pin:hover,
  .travel-globe .tg-pin-anchor.tg-active .tg-pin {
    transform: scale(1.45);
  }

  .travel-globe .tg-pin-label {
    position: absolute;
    left: 50%;
    bottom: calc(100% + 12px);
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 0.72rem;
    font-weight: 500;
    background: var(--global-card-bg-color);
    color: var(--global-text-color);
    border: 1px solid var(--global-divider-color);
    border-radius: 6px;
    padding: 1px 7px;
    opacity: 0;
    transition: opacity 0.15s ease;
    pointer-events: none;
  }

  .travel-globe .tg-pin-anchor:hover .tg-pin-label,
  .travel-globe .tg-pin-anchor:focus-within .tg-pin-label,
  .travel-globe .tg-pin-anchor.tg-active .tg-pin-label {
    opacity: 1;
  }

  /* globe.gl's built-in country tooltip */
  .travel-globe .float-tooltip-kap,
  .travel-globe .scene-tooltip {
    font-family: inherit !important;
    font-size: 0.78rem !important;
    font-weight: 500 !important;
    color: var(--global-text-color) !important;
    background: var(--global-card-bg-color) !important;
    border: 1px solid var(--global-divider-color);
    border-radius: 6px !important;
    padding: 3px 8px !important;
  }

  /* Photo card */
  .travel-globe .tg-card {
    border: 1px solid var(--global-divider-color);
    border-radius: 16px;
    background: var(--global-card-bg-color);
    overflow: hidden;
    display: grid;
    min-width: 0;
  }

  .travel-globe .tg-card-photo {
    aspect-ratio: 4 / 3;
    max-width: 100%;
    background: var(--tg-soft) center / cover no-repeat;
    display: grid;
    place-items: center;
    text-align: center;
    color: var(--global-text-color-light);
    font-size: 0.82rem;
    padding: 16px;
  }

  .travel-globe .tg-card-photo.tg-empty {
    background-image: repeating-linear-gradient(135deg, transparent 0 10px, var(--global-divider-color) 10px 11px);
  }

  .travel-globe .tg-card-photo span {
    display: none;
    max-width: 22ch;
  }

  .travel-globe .tg-card-photo.tg-empty span {
    display: block;
  }

  .travel-globe .tg-card-body {
    padding: 18px 20px 20px;
    display: grid;
    gap: 8px;
  }

  .travel-globe .tg-region {
    margin: 0;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--tg-ink);
  }

  .travel-globe .tg-place {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 500;
  }

  .travel-globe .tg-date {
    margin: 0;
    font-size: 0.85rem;
    color: var(--global-text-color-light);
    font-variant-numeric: tabular-nums;
  }

  .travel-globe .tg-caption {
    margin: 0;
    color: var(--global-text-color);
  }

  @media (max-width: 767.98px) {
    .travel-globe .tg-stage {
      grid-template-columns: minmax(0, 1fr);
    }

    .travel-globe .tg-globe-box {
      height: 380px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .travel-globe .tg-pin,
    .travel-globe .tg-pin-label {
      transition: none;
    }
  }
---

<div class="travel-globe">
  <div class="tg-controls">
    <button type="button" class="tg-btn" id="tg-tour">Fly through pins</button>
    <button type="button" class="tg-btn" id="tg-reset">Reset view</button>
  </div>

  <div class="tg-stage">
    <div class="tg-globe-col">
      <div class="tg-globe-box">
        <div class="tg-loading" id="tg-loading">Loading globe…</div>
        <div class="tg-globe" id="tg-globe" role="region" aria-label="Interactive globe with travel pins"></div>
        <span class="tg-hint">Drag to spin · scroll to zoom · tap a pin</span>
      </div>
      <div class="tg-chips" id="tg-chips" role="group" aria-label="Jump to a place"></div>
    </div>

    <aside class="tg-card" aria-live="polite">
      <div class="tg-card-photo tg-empty" id="tg-card-photo" role="img" aria-label="Photo coming soon."><span>Photo coming soon.</span></div>
      <div class="tg-card-body">
        <p class="tg-region" id="tg-card-region"></p>
        <h2 class="tg-place" id="tg-card-place"></h2>
        <p class="tg-date" id="tg-card-date" hidden></p>
        <p class="tg-caption" id="tg-card-caption" hidden></p>
      </div>
    </aside>

  </div>
</div>

<script>
  window.TRAVEL = { baseurl: {{ site.baseurl | jsonify }}, places: {{ site.data.travel | jsonify }} };
</script>
<script
  defer
  src="https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js"
  integrity="sha384-Ukv1p/xTma6P4/2bY5KzWBw+ydSpXmhCMtyciIQVDJ1RmOxtCYNMF1uXT9T63H67"
  crossorigin="anonymous"
></script>
<script
  defer
  src="https://cdn.jsdelivr.net/npm/globe.gl@2.46.2/dist/globe.gl.min.js"
  integrity="sha384-1uolMBZ25k3zJcNwCLEv49+L+m2dZudqAzsoSAJfQTzDCSBxJzrMuZ2dkp/5JKiT"
  crossorigin="anonymous"
></script>
<script defer src="{{ '/assets/js/travel-globe.js' | relative_url | bust_file_cache }}"></script>
