/**
 * GA4 Analytics utility for DentaSmart
 * Provides type-safe event tracking across the site.
 * GA4 is initialized dynamically via initGA4() using the VITE_GA4_MEASUREMENT_ID env var.
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
  | "symptom_quiz_start"
  | "symptom_quiz_complete"
  | "symptom_quiz_email_submit"
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
    // Silently fail - analytics should never break the app
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
 * Get the configured GA4 Measurement ID from the environment variable.
 * Returns null if not configured.
 */
export function getGA4MeasurementId(): string | null {
  try {
    const id = (import.meta as any).env?.VITE_GA4_MEASUREMENT_ID;
    return id && id.startsWith("G-") ? id : null;
  } catch {
    return null;
  }
}

/**
 * Initialize GA4 by injecting the gtag.js script.
 * Called once from App.tsx on mount.
 * Uses the VITE_GA4_MEASUREMENT_ID environment variable.
 */
export function initGA4(measurementId?: string): void {
  const id = measurementId || getGA4MeasurementId();
  if (!id || typeof window === "undefined") return;

  // Avoid double-init
  if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${id}"]`)) {
    // Already loaded, just make sure gtag is configured
    if (window.gtag) {
      window.gtag("config", id, { send_page_view: false });
    }
    return;
  }

  // Initialize dataLayer and gtag first so events queue while script loads
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: any[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", id, {
    send_page_view: false, // We handle page views manually for SPA
  });

  // Create and inject script tag
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);
}
