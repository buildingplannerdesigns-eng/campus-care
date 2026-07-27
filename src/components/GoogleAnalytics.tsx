"use client";

import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-2DGTSSJJH3";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Loads gtag only in production, after mount.
 * Avoids next/script in the root layout chunk (which can surface as
 * ChunkLoadError timeouts on slow OneDrive/webpack dev builds).
 */
export function GoogleAnalytics() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (document.getElementById("ga-gtag")) return;

    window.dataLayer = window.dataLayer || [];
    // Match Google's snippet: push the Arguments object, not a rest-args array.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID);

    const script = document.createElement("script");
    script.id = "ga-gtag";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }, []);

  return null;
}
