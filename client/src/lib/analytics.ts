/**
 * GA4 Analytics utility for DentaSmart
 * Provides type-safe event tracking across the site.
 * GA4 is loaded via gtag.js in index.html; this module wraps window.gtag calls.
 */

// Extend Window to include gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// ── Event names ──────────────────────────────────────────────────────────────
export type AnalyticsEvent =
  | "cta_get_score_click"
  | "download_ios_click"
  | "android_waitlist_submit"
  | "download_page_view"
  | "instant_scan_page_view"
  | "photo_guide_view"
  | "hub_article_view"
  | "hub_category_view"
  | "faq_expand"
  | "story_open"
  | "compare_page_view"
  | "find_dentist_page_view"
  | "answers_page_view"
  | "sticky_cta_click"
  | "demo_request_submit"
  | "page_view";

export interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

// ── Core helpers ─────────────────────────────────────────────────────────────

/**
 * Send a custom event to GA4.
 * Silently no-ops if gtag is not loaded (e.g. no GA4 ID configured).
 */
export function trackEvent(event: AnalyticsEvent, params?: EventParams): void {
  try {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event, params);
    }
  } catch {
    // Silently fail — analytics should never break the app
  }
}

/**
 * Track a virtual page view (useful for SPA navigation).
 */
export function trackPageView(path: string, title?: string): void {
  try {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: path,
        page_title: title || document.title,
      });
    }
  } catch {
    // Silently fail
  }
}

/**
 * Initialize GA4 by injecting the gtag.js script.
 * Called once from main.tsx or a layout component.
 * If measurementId is empty/missing, this is a no-op.
 */
export function initGA4(measurementId: string): void {
  if (!measurementId || typeof window === "undefined") return;

  // Avoid double-init
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`)) {
    return;
  }

  // Create script tag
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: any[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false, // We handle page views manually for SPA
  });
}
