/**
 * Privacy-safe analytics contract shared by browser instrumentation and the
 * first-party validation layer. This file must remain free of runtime I/O.
 */

export const ANALYTICS_EVENT_VERSION = 1 as const;
export const ANALYTICS_CONSENT_VERSION = 1 as const;

export const ANALYTICS_EVENT_NAMES = [
  "page_view",
  "quick_check_start",
  "download_hub_open",
  "store_listing_click",
  "pricing_plan_selected",
  "checkout_started",
  "employer_demo_submit_attempt",
  "employer_demo_submitted",
  "cta_click",
  "content_engagement",
] as const;

export type CanonicalAnalyticsEvent = (typeof ANALYTICS_EVENT_NAMES)[number];

export const ANALYTICS_SURFACES = [
  "header",
  "hero",
  "mid_content",
  "sticky",
  "exit_intent",
  "footer",
  "download_section",
  "download_hub",
  "pricing_card",
  "symptom_next_steps",
  "treatment_plan_cta",
  "employer_form",
] as const;
export type AnalyticsSurface = (typeof ANALYTICS_SURFACES)[number];

export const ANALYTICS_INTENTS = [
  "quick_check",
  "download",
  "treatment_plan_review",
  "pricing",
  "checkout",
  "employer_demo",
  "symptom_support",
  "content_engagement",
] as const;
export type AnalyticsIntent = (typeof ANALYTICS_INTENTS)[number];

export const ANALYTICS_DESTINATION_TYPES = [
  "internal_route",
  "app_store",
  "play_store",
  "external_checkout",
  "employer_form",
  "external_reference",
] as const;
export type AnalyticsDestinationType = (typeof ANALYTICS_DESTINATION_TYPES)[number];

export const ANALYTICS_PLATFORMS = ["ios", "android"] as const;
export type AnalyticsPlatform = (typeof ANALYTICS_PLATFORMS)[number];

export const CAMPAIGN_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
export type CampaignKey = (typeof CAMPAIGN_KEYS)[number];

export interface CampaignContext {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_path: string;
  captured_at: string;
  updated_at: string;
}

export interface AnalyticsEventEnvelope {
  event_name: CanonicalAnalyticsEvent;
  event_version: typeof ANALYTICS_EVENT_VERSION;
  event_id: string;
  timestamp: string;
  page_path: string;
  route_family?: string;
  landing_path?: string;
  session_id?: string;
  cta_id?: string;
  surface?: AnalyticsSurface;
  intent?: AnalyticsIntent;
  destination_type?: AnalyticsDestinationType;
  destination_path?: string;
  platform?: AnalyticsPlatform;
  campaign?: CampaignContext;
}

export const SENSITIVE_ANALYTICS_KEYS = [
  "email",
  "email_address",
  "phone",
  "phone_number",
  "name",
  "first_name",
  "last_name",
  "full_name",
  "street_address",
  "password",
  "token",
  "access_token",
  "refresh_token",
  "authorization",
  "auth",
  "report",
  "report_text",
  "diagnosis",
  "diagnostic_text",
  "symptom_text",
  "health_notes",
  "medical_history",
  "treatment_details",
  "user_entered_text",
  "image",
  "image_url",
  "xray",
  "xray_url",
  "full_url",
  "query_string",
  "raw_referrer",
] as const;

export function isCanonicalAnalyticsEvent(value: unknown): value is CanonicalAnalyticsEvent {
  return typeof value === "string" && (ANALYTICS_EVENT_NAMES as readonly string[]).includes(value);
}

export function isAnalyticsSurface(value: unknown): value is AnalyticsSurface {
  return typeof value === "string" && (ANALYTICS_SURFACES as readonly string[]).includes(value);
}

export function isAnalyticsIntent(value: unknown): value is AnalyticsIntent {
  return typeof value === "string" && (ANALYTICS_INTENTS as readonly string[]).includes(value);
}

export function isAnalyticsDestinationType(value: unknown): value is AnalyticsDestinationType {
  return typeof value === "string" && (ANALYTICS_DESTINATION_TYPES as readonly string[]).includes(value);
}

export function isAnalyticsPlatform(value: unknown): value is AnalyticsPlatform {
  return typeof value === "string" && (ANALYTICS_PLATFORMS as readonly string[]).includes(value);
}

export function normalizeAnalyticsPath(value: unknown): string | null {
  if (typeof value !== "string" || value.length === 0 || value.length > 240 || !value.startsWith("/")) return null;
  const path = value.split(/[?#]/, 1)[0];
  return path.startsWith("//") ? null : path;
}

export function isSensitiveAnalyticsKey(value: string): boolean {
  return (SENSITIVE_ANALYTICS_KEYS as readonly string[]).includes(value.toLowerCase());
}
