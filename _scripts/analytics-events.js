---
permalink: /assets/js/analytics-events.js
---
(function () {
  function toPirschEventName(name) {
    if (!name) return "event";
    return String(name).replace(/_/g, " ");
  }

  function normalizeProps(props) {
    if (!props || typeof props !== "object") return {};
    return props;
  }

  function trackWithGoogleAnalytics(name, props) {
    if (typeof window.gtag !== "function") return false;
    window.gtag("event", name, props);
    return true;
  }

  function trackWithOpenPanel(name, props) {
    if (typeof window.op !== "function") return false;
    window.op("track", name, props);
    return true;
  }

  function trackWithPirsch(name, props) {
    if (typeof window.pirsch !== "function") return false;
    window.pirsch(toPirschEventName(name), { meta: props }).catch(function () {});
    return true;
  }

  function trackWithGoatCounter(name, props) {
    if (!window.goatcounter || typeof window.goatcounter.count !== "function") return false;

    window.goatcounter.count({
      path: name,
      title: name,
      event: true,
      referrer: window.location.pathname,
    });

    return true;
  }

  window.siteAnalytics = {
    track: function (name, props) {
      var eventName = String(name || "");
      var eventProps = normalizeProps(props);

      return [
        trackWithGoogleAnalytics(eventName, eventProps),
        trackWithOpenPanel(eventName, eventProps),
        trackWithPirsch(eventName, eventProps),
        trackWithGoatCounter(eventName, eventProps),
      ].some(Boolean);
    },
  };
})();
