/**
 * Analytics utility for DentaSmart
 * Supports GA4, Meta Pixel, and Google Ads conversion tracking.
 * All platforms fire from a single trackEvent() call.
 */

import { app } from "@shared/facts";
import { isEmailUnsubscribePath } from "@shared/privacyRoutes";

// ── Global type extensions ──────────────────────────────────────────────────
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

// ── Event names ─────────────────────────────────────────────────────────────
export type AnalyticsEvent =
  | "cta_get_score_click"
  | "download_ios_click"
  | "download_android_click"
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
  | "exit_intent_cta_click"
  | "exit_intent_shown"
  | "exit_intent_click"
  | "mid_content_cta_click"
  | "demo_request_submit"
  | "symptom_quiz_start"
  | "symptom_quiz_complete"
  | "symptom_quiz_email_submit"
  | "pricing_plan_select"
  | "blog_read"
  | "employer_demo_request"
  | "scroll_depth_50"
  | "scroll_depth_75"
  | "scroll_depth_100"
  | "free_ai_scanner_page_view"
  | "best_ai_dental_apps_page_view"
  | "vs_comparison_page_view"
  | "page_view";

export interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

export function shouldDisableAnalyticsForPath(path: string): boolean {
  return isEmailUnsubscribePath(path);
}

function isAnalyticsDisabledForCurrentPage(): boolean {
  return typeof window !== "undefined" && shouldDisableAnalyticsForPath(window.location.pathname);
}

// ── Env var helpers ─────────────────────────────────────────────────────────

export function getGA4MeasurementId(): string | null {
  try {
    const id = (import.meta as any).env?.VITE_GA4_MEASUREMENT_ID;
    return id && id.startsWith("G-") ? id : null;
  } catch {
    return null;
  }
}

export function getMetaPixelId(): string | null {
  try {
    const id = (import.meta as any).env?.VITE_META_PIXEL_ID;
    return id && /^\d+$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

export function getGoogleAdsId(): string | null {
  try {
    const id = (import.meta as any).env?.VITE_GOOGLE_ADS_ID;
    return id && id.startsWith("AW-") ? id : null;
  } catch {
    return null;
  }
}

export function getGoogleAdsConversionLabel(): string | null {
  try {
    const label = (import.meta as any).env?.VITE_GOOGLE_ADS_CONVERSION_LABEL;
    return label || null;
  } catch {
    return null;
  }
}

// ── GA4 initialization ──────────────────────────────────────────────────────

export function initGA4(measurementId?: string): void {
  if (isAnalyticsDisabledForCurrentPage()) return;
  const id = measurementId || getGA4MeasurementId();
  if (!id || typeof window === "undefined") return;

  // gtag.js is loaded directly from index.html <head> for reliable data collection.
  // The inline script in index.html already calls gtag('config', id) with
  // send_page_view: true (default), so the initial page view fires immediately
  // before React even mounts. This function only needs to handle:
  // 1. Ensuring dataLayer/gtag exist (fallback if index.html script hasn't run)
  // 2. Configuring Google Ads if present

  if (!window.dataLayer) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: any[]) {
      window.dataLayer!.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", id);

    // Fallback: dynamically add script if not already present
    if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${id}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.appendChild(script);
    }
  }

  // Configure Google Ads if present (shares the gtag.js script)
  const adsId = getGoogleAdsId();
  if (adsId && window.gtag) {
    window.gtag("config", adsId);
  }
}

// ── Meta Pixel initialization ───────────────────────────────────────────────

export function initMetaPixel(): void {
  if (isAnalyticsDisabledForCurrentPage()) return;
  const pixelId = getMetaPixelId();
  if (!pixelId || typeof window === "undefined") return;

  // Avoid double-init
  if (window.fbq) return;

  // Standard Meta Pixel base code
  const f: any = window;
  const b = document;
  const e = "script";

  if (f.fbq) return;
  const n: any = (f.fbq = function (...args: any[]) {
    if (n.callMethod) {
      n.callMethod.apply(n, args);
    } else {
      n.queue.push(args);
    }
  });
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];

  const t = b.createElement(e) as HTMLScriptElement;
  t.async = true;
  t.src = "https://connect.facebook.net/en_US/fbevents.js";
  const s = b.getElementsByTagName(e)[0];
  s?.parentNode?.insertBefore(t, s);

  window.fbq!("init", pixelId);
  window.fbq!("track", "PageView");
}

// ── Cross-platform event mapping ────────────────────────────────────────────

/**
 * Maps DentaSmart events to Meta Pixel standard/custom events.
 * Meta has specific standard events that improve ad optimization.
 */
function getMetaEventName(event: AnalyticsEvent): { name: string; isStandard: boolean } {
  switch (event) {
    case "download_ios_click":
      return { name: "CompleteRegistration", isStandard: true };
    case "download_android_click":
      return { name: "CompleteRegistration", isStandard: true };
    case "android_waitlist_submit":
      return { name: "Lead", isStandard: true };
    case "cta_get_score_click":
      return { name: "InitiateCheckout", isStandard: true };
    case "symptom_quiz_start":
      return { name: "ViewContent", isStandard: true };
    case "symptom_quiz_complete":
      return { name: "Lead", isStandard: true };
    case "symptom_quiz_email_submit":
      return { name: "Subscribe", isStandard: true };
    case "demo_request_submit":
    case "employer_demo_request":
      return { name: "Contact", isStandard: true };
    case "pricing_plan_select":
      return { name: "AddToCart", isStandard: true };
    default:
      return { name: event, isStandard: false };
  }
}

// ── Core tracking functions ─────────────────────────────────────────────────

/**
 * Send a custom event to all configured platforms (GA4 + Meta Pixel + Google Ads).
 * Silently no-ops if a platform is not loaded.
 */
export function trackEvent(event: AnalyticsEvent, params?: EventParams): void {
  try {
    if (isAnalyticsDisabledForCurrentPage()) return;
    // GA4
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event, params);
    }

    // Meta Pixel
    if (typeof window !== "undefined" && window.fbq) {
      const metaEvent = getMetaEventName(event);
      const metaParams = params ? { ...params, content_name: event } : { content_name: event };
      if (metaEvent.isStandard) {
        window.fbq("track", metaEvent.name, metaParams);
      } else {
        window.fbq("trackCustom", metaEvent.name, metaParams);
      }
    }

    // Google Ads conversion (fires on high-value events only)
    if (typeof window !== "undefined" && window.gtag) {
      const adsId = getGoogleAdsId();
      const convLabel = getGoogleAdsConversionLabel();
      if (adsId && convLabel) {
        const conversionEvents: AnalyticsEvent[] = [
          "download_ios_click",
          "download_android_click",
          "android_waitlist_submit",
          "symptom_quiz_complete",
          "demo_request_submit",
          "employer_demo_request",
        ];
        if (conversionEvents.includes(event)) {
          window.gtag("event", "conversion", {
            send_to: `${adsId}/${convLabel}`,
            event_callback: () => {},
          });
        }
      }
    }

    // Server-side tracking (fires for all events to build our own analytics)
    trackEventServer(event, params);
  } catch {
    // Analytics should never break the app
  }
}

/**
 * Track a virtual page view for SPA navigation.
 * Fires to GA4 and Meta Pixel.
 */
export function trackPageView(path: string, title?: string): void {
  try {
    if (shouldDisableAnalyticsForPath(path) || isAnalyticsDisabledForCurrentPage()) return;
    // GA4 page view
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: path,
        page_title: title || document.title,
      });
    }

    // Meta Pixel page view
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  } catch {
    // Silently fail
  }
}

/**
 * Track an app download click with full attribution.
 * Adds UTM parameters to the app store URL for campaign tracking.
 */
export function trackAppDownload(
  platform: "ios" | "android",
  source: string
): void {
  const event: AnalyticsEvent = platform === "ios" ? "download_ios_click" : "download_android_click";
  trackEvent(event, {
    platform,
    source,
    page_url: typeof window !== "undefined" ? window.location.pathname : "",
  });
}


/**
 * Build an App Store URL with UTM parameters for campaign tracking.
 * These UTMs show up in App Store Connect and Google Play Console analytics.
 */
export function getAppStoreUrl(source: string): string {
  const baseUrl = app.iosUrl;
  const params = new URLSearchParams({
    pt: "126584659", // Provider Token (Apple)
    ct: source, // Campaign Token - tracks which page drove the download
    mt: "8", // Media Type (8 = mobile software)
  });
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Build a Google Play Store URL with UTM parameters for campaign tracking.
 * These UTMs show up in Google Play Console analytics.
 */
export function getPlayStoreUrl(source: string): string {
  const baseUrl = "https://play.google.com/store/apps/details?id=com.dentaSmart.app.android";
  const params = new URLSearchParams({
    utm_source: "dentasmart_website",
    utm_medium: "cta",
    utm_campaign: source,
  });
  return `${baseUrl}&${params.toString()}`;
}

// ── Server-side tracking ───────────────────────────────────────────────────

let _sessionId: string | null = null;

function getSessionId(): string {
  if (_sessionId) return _sessionId;
  // Try to read from sessionStorage, or create a new one
  try {
    _sessionId = sessionStorage.getItem('ds_session_id');
    if (!_sessionId) {
      _sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem('ds_session_id', _sessionId);
    }
  } catch {
    _sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
  return _sessionId;
}

function getDeviceType(): "desktop" | "tablet" | "mobile" {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function getUTMParams(): { utmSource?: string; utmMedium?: string; utmCampaign?: string } {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') || undefined,
    utmMedium: params.get('utm_medium') || undefined,
    utmCampaign: params.get('utm_campaign') || undefined,
  };
}

/**
 * Send event to our server-side tracking database.
 * Uses navigator.sendBeacon for reliable delivery (survives page unload).
 * Falls back to fetch if sendBeacon is not available.
 */
export function trackEventServer(event: AnalyticsEvent, params?: EventParams): void {
  try {
    if (typeof window === "undefined") return;
    if (isAnalyticsDisabledForCurrentPage()) return;
    
    const utm = getUTMParams();
    const payload = {
      eventName: event,
      sourcePage: window.location.pathname,
      sourcePageTitle: document.title,
      referrer: document.referrer || undefined,
      utmSource: utm.utmSource,
      utmMedium: utm.utmMedium,
      utmCampaign: utm.utmCampaign,
      deviceType: getDeviceType(),
      sessionId: getSessionId(),
      metadata: params ? { ...params } : undefined,
    };

    // Use fetch with keepalive for reliable delivery
    fetch('/api/trpc/analytics.trackEvent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ json: payload }),
      keepalive: true,
      credentials: 'include',
    }).catch(() => { /* silently fail */ });
  } catch {
    // Server tracking should never break the app
  }
}

/**
 * Initialize all analytics platforms.
 * Called once from App.tsx on mount.
 */
export function initAllAnalytics(): void {
  if (isAnalyticsDisabledForCurrentPage()) return;
  initGA4();
  initMetaPixel();
}
