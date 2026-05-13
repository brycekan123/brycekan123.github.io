---
layout: page
title: visitors
permalink: /visitors/
description: Live map of where visitors are coming from.
nav: true
nav_order: 8
_styles: |
  .visitor-map-shell {
    display: grid;
    gap: 1.5rem;
  }

  .visitor-map-hero,
  .visitor-map-card,
  .visitor-map-footer {
    border: 1px solid var(--global-divider-color);
    border-radius: 24px;
    padding: 1.5rem;
    background: var(--global-card-bg-color);
  }

  .visitor-map-hero {
    background:
      radial-gradient(circle at top right, rgba(14, 165, 233, 0.18), transparent 32%),
      linear-gradient(135deg, rgba(15, 23, 42, 0.03), rgba(15, 118, 110, 0.1));
  }

  .visitor-map-eyebrow,
  .visitor-map-kicker {
    margin: 0 0 0.45rem;
    font-size: 0.78rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--global-theme-color);
  }

  .visitor-map-hero h2,
  .visitor-map-card h3,
  .visitor-map-footer h3 {
    margin-bottom: 0.75rem;
  }

  .visitor-map-card {
    overflow: hidden;
  }

  .visitor-map-embed {
    min-height: 24rem;
  }

  .visitor-map-caption {
    margin: 0.9rem 0 0;
    color: var(--global-text-color-light);
    font-size: 0.95rem;
  }

  .visitor-map-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    margin: 1.25rem 0 1rem;
  }

  .visitor-map-button,
  .visitor-map-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.85rem;
    padding: 0.8rem 1.1rem;
    border-radius: 999px;
    text-decoration: none !important;
    font-weight: 600;
  }

  .visitor-map-button {
    background: var(--global-theme-color);
    color: #fff !important;
  }

  .visitor-map-link {
    border: 1px solid var(--global-divider-color);
    color: var(--global-text-color) !important;
    background: rgba(255, 255, 255, 0.45);
  }

  .visitor-map-steps {
    margin: 1rem 0 0;
    padding-left: 1.2rem;
  }

  .visitor-map-steps li + li {
    margin-top: 0.55rem;
  }

  .visitor-map-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    margin-top: 1rem;
  }

  .visitor-map-stat {
    border-radius: 18px;
    padding: 1rem 1.1rem;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(15, 23, 42, 0.04));
    border: 1px solid var(--global-divider-color);
  }

  .visitor-map-stat strong {
    display: block;
    margin-bottom: 0.35rem;
    font-size: 0.92rem;
  }

  .visitor-map-stat p {
    margin: 0;
    color: var(--global-text-color-light);
    font-size: 0.95rem;
  }

  @media (max-width: 576px) {
    .visitor-map-hero,
    .visitor-map-card,
    .visitor-map-footer {
      padding: 1.2rem;
      border-radius: 20px;
    }

    .visitor-map-embed {
      min-height: 20rem;
    }
  }
---

{% assign visitor_map = site.visitor_map %}
{% assign provider_name = visitor_map.provider | default: 'visitor map provider' %}
{% assign setup_url = visitor_map.setup_url | default: 'https://mapmyvisitors.com/' %}

<div class="visitor-map-shell">
  <section class="visitor-map-hero">
    <p class="visitor-map-eyebrow">Live Audience</p>
    <h2>Where people are visiting from</h2>
    <p>
      This page is for a public visitor map, not exact personal location tracking. The map service only receives
      approximate geolocation from IP data, which usually resolves to the city, region, or country level.
    </p>
  </section>

  <section class="visitor-map-card">
    {% if visitor_map and visitor_map.enabled and visitor_map.embed_html != blank %}
      <div class="visitor-map-embed">
        {{ visitor_map.embed_html }}
      </div>
      <p class="visitor-map-caption">
        Approximate location only. Exact device location is not collected here.
      </p>
    {% else %}
      <p class="visitor-map-kicker">One step left</p>
      <h3>Connect your {{ provider_name }} widget</h3>
      <p>
        The visitor map page is live in the site now, but the external widget snippet has not been added yet. Once
        you paste the widget HTML into <code>_config.yml</code>, this page will immediately switch from setup mode to
        the live map.
      </p>

      <div class="visitor-map-actions">
        <a class="visitor-map-button" href="{{ setup_url }}" target="_blank" rel="noopener noreferrer">
          Create the free widget
        </a>
        <a
          class="visitor-map-link"
          href="https://support.google.com/analytics/answer/9353692?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open GA location reports
        </a>
      </div>

      <ol class="visitor-map-steps">
        <li>Create a free widget at {{ provider_name }}.</li>
        <li>Copy the embed snippet they give you for your site.</li>
        <li>Paste that snippet into <code>visitor_map.embed_html</code> in <code>_config.yml</code>.</li>
        <li>Rebuild the site and visit <code>/visitors/</code>.</li>
      </ol>
    {% endif %}

  </section>

  <section class="visitor-map-footer">
    <h3>What this page is meant to show</h3>
    <div class="visitor-map-grid">
      <div class="visitor-map-stat">
        <strong>Public map</strong>
        <p>A visual map of roughly where visitors are coming from.</p>
      </div>
      <div class="visitor-map-stat">
        <strong>Approximate only</strong>
        <p>City and country level in most cases, not an exact address or precise GPS position.</p>
      </div>
      <div class="visitor-map-stat">
        <strong>Separate from GA</strong>
        <p>Google Analytics still handles background reporting and password-gate event counts.</p>
      </div>
    </div>
  </section>
</div>
