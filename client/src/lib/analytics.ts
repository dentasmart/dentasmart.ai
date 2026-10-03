import { app } from "@shared/facts";
import {
  ANALYTICS_EVENT_VERSION,
  type AnalyticsDestinationType,
  type AnalyticsEventEnvelope,
  type AnalyticsIntent,
  type AnalyticsPlatform,
  type AnalyticsSurface,
  type CampaignContext,
  isCanonicalAnalyticsEvent,
  normalizeAnalyticsPath,
} from "@shared/analyticsContract";
import { isEmailUnsubscribePath } from "@shared/privacyRoutes";
import { createPageviewDeliveryState } from "@shared/pageviewState";
import {
  type ConsentPreferences,
  canTrackCurrentPath,
  getConsentPreferences,
  hasAnalyticsConsent,
  hasMarketingConsent,
} from "@/lib/consent";
import { applyOrigamiConsent } from "@/lib/origamiVisitors";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    umami?: {
      track?: (
        event?: string | Record<string, unknown> | ((properties: Record<string, unknown>) => Record<string, unknown>),
        data?: Record<string, unknown>,
      ) => void;
    };
  }
}

export type AnalyticsEvent =
  | "page_view" | "quick_check_start" | "download_hub_open" | "store_listing_click"
  | "pricing_plan_selected" | "checkout_started" | "employer_demo_submit_attempt"
  | "employer_demo_submitted" | "cta_click" | "content_engagement"
  | "cta_get_score_click" | "home_intent_click" | "download_ios_click" | "download_android_click"
  | "android_waitlist_submit" | "download_page_view" | "instant_scan_page_view" | "photo_guide_view"
  | "hub_article_view" | "hub_category_view" | "faq_expand" | "story_open" | "compare_page_view"
  | "find_dentist_page_view" | "symptom_professional_care_click" | "answers_page_view"
  | "sticky_cta_click" | "exit_intent_cta_click" | "exit_intent_shown" | "exit_intent_click"
  | "mid_content_cta_click" | "demo_request_submit" | "symptom_quiz_start"
  | "symptom_quiz_complete" | "symptom_quiz_email_submit" | "pricing_plan_select"
  | "blog_read" | "employer_demo_request" | "scroll_depth_50" | "scroll_depth_75"
  | "scroll_depth_100" | "free_ai_scanner_page_view" | "best_ai_dental_apps_page_view"
  | "vs_comparison_page_view";

export type EventParams = Record<string, string | number | boolean | undefined>;

const CAMPAIGN_STORAGE_KEY = "dentasmart_campaign_v1";
const MARKETING_STORAGE_KEY = "dentasmart_marketing_click_ids_v1";
const SESSION_STORAGE_KEY = "dentasmart_analytics_session_v1";
const TRACKER_ATTRIBUTE = "data-dentasmart-consent-tracker";
const pageviewDelivery = createPageviewDeliveryState();
let ga4Configured = false;
let metaConfigured = false;
let umamiConfigured = false;
let sessionId: string | null = null;
let pendingUmamiPageviews: string[] = [];

const legacyEventMap: Partial<Record<AnalyticsEvent, AnalyticsEvent>> = {
  cta_get_score_click: "download_hub_open",
  home_intent_click: "download_hub_open",
  download_ios_click: "store_listing_click",
  download_android_click: "store_listing_click",
  download_page_view: "download_hub_open",
  pricing_plan_select: "pricing_plan_selected",
  employer_demo_request: "employer_demo_submit_attempt",
  demo_request_submit: "employer_demo_submitted",
  symptom_professional_care_click: "download_hub_open",
  sticky_cta_click: "cta_click",
  exit_intent_cta_click: "cta_click",
  exit_intent_click: "cta_click",
  mid_content_cta_click: "cta_click",
  scroll_depth_50: "content_engagement",
  scroll_depth_75: "content_engagement",
  scroll_depth_100: "content_engagement",
};

export function shouldDisableAnalyticsForPath(path: string): boolean {
  return isEmailUnsubscribePath(path);
}

function getEnv(name: string): string | null {
  try {
    const value = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env?.[name];
    return value && value.trim() ? value.trim() : null;
  } catch {
    return null;
  }
}

export function getGA4MeasurementId(): string | null {
  const value = getEnv("VITE_GA4_MEASUREMENT_ID");
  return value?.startsWith("G-") ? value : null;
}

export function getMetaPixelId(): string | null {
  const value = getEnv("VITE_META_PIXEL_ID");
  return value && /^\d+$/.test(value) ? value : null;
}

export function getGoogleAdsId(): string | null {
  const value = getEnv("VITE_GOOGLE_ADS_ID");
  return value?.startsWith("AW-") ? value : null;
}

export function getGoogleAdsConversionLabel(): string | null {
  return getEnv("VITE_GOOGLE_ADS_CONVERSION_LABEL");
}

function addExternalScript(src: string, attributes: Record<string, string> = {}, onLoad?: () => void): void {
  if (typeof document === "undefined" || document.querySelector(`script[${TRACKER_ATTRIBUTE}][src="${src}"]`)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  script.setAttribute(TRACKER_ATTRIBUTE, "true");
  Object.entries(attributes).forEach(([key, value]) => script.setAttribute(key, value));
  if (onLoad) script.addEventListener("load", onLoad, { once: true });
  document.head.appendChild(script);
}

function initGA4(): void {
  const id = getGA4MeasurementId();
  if (!id || typeof window === "undefined" || ga4Configured) return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(..._args: unknown[]) {
    window.dataLayer?.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id, { send_page_view: false });
  addExternalScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`);
  ga4Configured = true;
}

function initMetaPixel(): void {
  const id = getMetaPixelId();
  if (!id || typeof window === "undefined" || metaConfigured) return;
  const queued: { queue: unknown[][]; callMethod?: (...args: unknown[]) => void } & ((...args: unknown[]) => void) = Object.assign(
    (...args: unknown[]) => queued.callMethod ? queued.callMethod(...args) : queued.queue.push(args),
    { queue: [] as unknown[][] },
  );
  window.fbq = queued;
  window.fbq("init", id);
  addExternalScript("https://connect.facebook.net/en_US/fbevents.js");
  metaConfigured = true;
}

function initUmami(): void {
  const endpoint = getEnv("VITE_ANALYTICS_ENDPOINT");
  const websiteId = getEnv("VITE_ANALYTICS_WEBSITE_ID");
  if (!endpoint || !websiteId || umamiConfigured) return;
  addExternalScript(
    `${endpoint.replace(/\/$/, "")}/umami`,
    { "data-website-id": websiteId, "data-auto-track": "false", "data-auto-pageview": "false" },
    flushPendingUmamiPageviews,
  );
  umamiConfigured = true;
}

function removeTrackers(category: "analytics" | "marketing"): void {
  if (typeof document === "undefined") return;
  const matcher = category === "analytics" ? /googletagmanager|umami/ : /facebook\.net/;
  document.querySelectorAll<HTMLScriptElement>(`script[${TRACKER_ATTRIBUTE}]`).forEach(script => {
    if (matcher.test(script.src)) script.remove();
  });
  if (category === "analytics") {
    ga4Configured = false;
    umamiConfigured = false;
    pendingUmamiPageviews = [];
    window.gtag = undefined;
  } else {
    metaConfigured = false;
    window.fbq = undefined;
  }
}

export function applyConsentState(consent: ConsentPreferences = getConsentPreferences()): void {
  if (typeof window === "undefined" || !canTrackCurrentPath()) return;
  applyOrigamiConsent(consent);
  if (consent.analytics) {
    initGA4();
    initUmami();
  } else {
    removeTrackers("analytics");
    pageviewDelivery.resetChannel("analytics");
    try { window.sessionStorage.removeItem(CAMPAIGN_STORAGE_KEY); window.sessionStorage.removeItem(SESSION_STORAGE_KEY); } catch { /* storage is optional */ }
    sessionId = null;
  }
  if (consent.marketing) {
    initMetaPixel();
    persistMarketingClickIds();
  } else {
    removeTrackers("marketing");
    pageviewDelivery.resetChannel("marketing");
    try { window.sessionStorage.removeItem(MARKETING_STORAGE_KEY); } catch { /* storage is optional */ }
  }
}

function randomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;
}

function getSessionId(): string | undefined {
  if (!hasAnalyticsConsent()) return undefined;
  if (sessionId) return sessionId;
  try {
    sessionId = window.sessionStorage.getItem(SESSION_STORAGE_KEY) || randomId();
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  } catch {
    sessionId = randomId();
  }
  return sessionId;
}

function safeCampaignValue(value: string | null): string | undefined {
  if (!value || value.length > 100 || !/^[A-Za-z0-9._~-]+$/.test(value)) return undefined;
  return value;
}

function parseIncomingCampaign(): Omit<CampaignContext, "landing_path" | "captured_at" | "updated_at"> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: safeCampaignValue(params.get("utm_source")),
    utm_medium: safeCampaignValue(params.get("utm_medium")),
    utm_campaign: safeCampaignValue(params.get("utm_campaign")),
    utm_content: safeCampaignValue(params.get("utm_content")),
    utm_term: safeCampaignValue(params.get("utm_term")),
  };
}

function captureCampaign(): CampaignContext | undefined {
  if (!hasAnalyticsConsent() || typeof window === "undefined" || shouldDisableAnalyticsForPath(window.location.pathname)) return undefined;
  const incoming = parseIncomingCampaign();
  const hasIncoming = Object.values(incoming).some(Boolean);
  try {
    const stored = JSON.parse(window.sessionStorage.getItem(CAMPAIGN_STORAGE_KEY) ?? "null") as CampaignContext | null;
    if (!hasIncoming) return stored ?? undefined;
    const now = new Date().toISOString();
    const next: CampaignContext = {
      ...incoming,
      landing_path: stored?.landing_path ?? window.location.pathname,
      captured_at: stored?.captured_at ?? now,
      updated_at: now,
    };
    window.sessionStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    return undefined;
  }
}

function persistMarketingClickIds(): void {
  if (!hasMarketingConsent() || typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const values = ["gclid", "fbclid"].reduce<Record<string, string>>((result, key) => {
    const value = safeCampaignValue(params.get(key));
    if (value) result[key] = value;
    return result;
  }, {});
  if (Object.keys(values).length) {
    try { window.sessionStorage.setItem(MARKETING_STORAGE_KEY, JSON.stringify(values)); } catch { /* storage is optional */ }
  }
}

function getRouteFamily(path: string): string {
  if (path.startsWith("/symptoms/")) return "symptom";
  if (path.startsWith("/treatments/")) return "treatment";
  if (path.startsWith("/dental-costs/")) return "dental_cost";
  if (path.startsWith("/compare/") || path.startsWith("/vs/")) return "comparison";
  if (path.startsWith("/oral-health-hub/")) return "oral_health_hub";
  if (path === "/pricing/" || path === "/pricing") return "pricing";
  if (path === "/download/" || path === "/download") return "download";
  return "general";
}

function canonicalEvent(event: AnalyticsEvent): Extract<AnalyticsEvent, "page_view" | "quick_check_start" | "download_hub_open" | "store_listing_click" | "pricing_plan_selected" | "checkout_started" | "employer_demo_submit_attempt" | "employer_demo_submitted" | "cta_click" | "content_engagement"> {
  const mapped = legacyEventMap[event] ?? event;
  return isCanonicalAnalyticsEvent(mapped) ? mapped : "content_engagement";
}

function sendFirstParty(payload: AnalyticsEventEnvelope): void {
  if (!hasAnalyticsConsent() || typeof window === "undefined") return;
  fetch("/api/trpc/analytics.trackEvent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ json: payload }),
    keepalive: true,
    credentials: "include",
  }).catch(() => undefined);
}

function externalPayload(payload: AnalyticsEventEnvelope): Record<string, string> {
  return {
    event_id: payload.event_id,
    surface: payload.surface ?? "",
    intent: payload.intent ?? "",
    cta_id: payload.cta_id ?? "",
    route_family: payload.route_family ?? "",
    platform: payload.platform ?? "",
  };
}

function trackUmamiPageview(pagePath: string): void {
  const websiteId = getEnv("VITE_ANALYTICS_WEBSITE_ID");
  if (!websiteId || typeof window === "undefined" || !hasAnalyticsConsent()) return;
  const send = () => {
    if (!window.umami?.track) return false;
    window.umami.track((properties: Record<string, unknown>) => ({
      website: properties.website ?? websiteId,
      url: pagePath,
      title: document.title,
    }));
    return true;
  };
  if (!send()) pendingUmamiPageviews.push(pagePath);
}

function flushPendingUmamiPageviews(): void {
  if (!hasAnalyticsConsent()) {
    pendingUmamiPageviews = [];
    return;
  }
  const queued = pendingUmamiPageviews;
  pendingUmamiPageviews = [];
  queued.forEach(trackUmamiPageview);
}

function sendExternal(payload: AnalyticsEventEnvelope, channels: { analytics: boolean; marketing: boolean }): void {
  if (typeof window === "undefined") return;
  if (channels.analytics) {
    if (payload.event_name === "page_view") {
      window.gtag?.("event", "page_view", { page_path: payload.page_path });
      trackUmamiPageview(payload.page_path);
    } else {
      window.gtag?.("event", payload.event_name, externalPayload(payload));
      window.umami?.track?.(payload.event_name, externalPayload(payload));
    }
  }
  if (!channels.marketing || !window.fbq) return;
  if (payload.event_name === "page_view") window.fbq("track", "PageView");
  else if (payload.event_name === "checkout_started") window.fbq("track", "InitiateCheckout", externalPayload(payload));
  else if (payload.event_name === "employer_demo_submitted") window.fbq("track", "Lead", externalPayload(payload));
  else window.fbq("trackCustom", payload.event_name, externalPayload(payload));
}

function emit(
  event: AnalyticsEvent,
  details: Partial<AnalyticsEventEnvelope> = {},
  channels = { analytics: hasAnalyticsConsent(), marketing: hasMarketingConsent() },
): void {
  if (typeof window === "undefined" || !canTrackCurrentPath()) return;
  const analyticsAllowed = channels.analytics && hasAnalyticsConsent();
  const marketingAllowed = channels.marketing && hasMarketingConsent();
  if (!analyticsAllowed && !marketingAllowed) return;
  const pagePath = normalizeAnalyticsPath(window.location.pathname) ?? "/";
  const payload: AnalyticsEventEnvelope = {
    event_name: canonicalEvent(event),
    event_version: ANALYTICS_EVENT_VERSION,
    event_id: randomId(),
    timestamp: new Date().toISOString(),
    page_path: pagePath,
    route_family: getRouteFamily(pagePath),
    landing_path: captureCampaign()?.landing_path,
    session_id: getSessionId(),
    ...details,
  };
  if (analyticsAllowed) payload.campaign = captureCampaign();
  sendExternal(payload, { analytics: analyticsAllowed, marketing: marketingAllowed });
  if (analyticsAllowed) sendFirstParty(payload);
}

export function beginRouteView(path: string): void {
  trackPageView(path, pageviewDelivery.startRouteView());
}

export function trackPageView(path: string, routeViewId = pageviewDelivery.currentOrStartRouteView()): void {
  const normalized = normalizeAnalyticsPath(path);
  if (!normalized || shouldDisableAnalyticsForPath(normalized) || (!hasAnalyticsConsent() && !hasMarketingConsent())) return;
  const analytics = hasAnalyticsConsent() && pageviewDelivery.claim(routeViewId, "analytics");
  const marketing = hasMarketingConsent() && pageviewDelivery.claim(routeViewId, "marketing");
  if (!analytics && !marketing) return;
  emit("page_view", { page_path: normalized, route_family: getRouteFamily(normalized) }, { analytics, marketing });
}

export function trackConversionEvent(event: AnalyticsEvent, details: Pick<AnalyticsEventEnvelope, "cta_id" | "surface" | "intent" | "destination_type" | "destination_path" | "platform">): void {
  emit(event, details);
}

export function trackEvent(event: AnalyticsEvent, _params?: EventParams): void {
  emit(event);
}

export function trackSymptomProfessionalCareClick(): void {
  trackConversionEvent("download_hub_open", {
    cta_id: "symptom_professional_care_download",
    surface: "symptom_next_steps",
    intent: "symptom_support",
    destination_type: "internal_route",
    destination_path: "/download/",
  });
}

function surfaceForStoreSource(source: string): AnalyticsSurface {
  if (source.includes("footer")) return "footer";
  if (source.includes("header")) return "header";
  if (source.includes("hero")) return "hero";
  if (source.includes("sticky")) return "sticky";
  if (source.includes("pricing")) return "pricing_card";
  if (source.includes("download_page")) return "download_hub";
  return "download_section";
}

export function trackAppDownload(platform: AnalyticsPlatform, source = "download_section"): void {
  trackConversionEvent("store_listing_click", {
    cta_id: `store_${platform}_${source.replace(/[^a-z0-9_]/gi, "").slice(0, 80) || "website"}`,
    surface: surfaceForStoreSource(source),
    intent: "download",
    destination_type: platform === "ios" ? "app_store" : "play_store",
    platform,
  });
}

export function getAppStoreUrl(source: string): string {
  const token = source.replace(/[^a-z0-9_]/gi, "").slice(0, 80) || "website";
  return `${app.iosUrl}?${new URLSearchParams({ pt: "126584659", ct: token, mt: "8" }).toString()}`;
}

export function getPlayStoreUrl(source: string): string {
  const token = source.replace(/[^a-z0-9_]/gi, "").slice(0, 80) || "website";
  return `${app.androidUrl}&${new URLSearchParams({ utm_source: "dentasmart_website", utm_medium: "cta", utm_campaign: token }).toString()}`;
}

export function initAllAnalytics(): void {
  applyConsentState();
}

export function openConsentPreferences(): void {
  if (typeof window !== "undefined") window.dispatchEvent(new Event("dentasmart:open-consent"));
}

export function getConsentStateForTesting(): { analytics: boolean; marketing: boolean } {
  return { analytics: hasAnalyticsConsent(), marketing: hasMarketingConsent() };
}
