import { z } from "zod";
import {
  ANALYTICS_EVENT_NAMES,
  ANALYTICS_EVENT_VERSION,
  ANALYTICS_PLATFORMS,
  ANALYTICS_DESTINATION_TYPES,
  ANALYTICS_INTENTS,
  ANALYTICS_SURFACES,
  normalizeAnalyticsPath,
  type AnalyticsEventEnvelope,
} from "@shared/analyticsContract";

const safeId = z.string().min(8).max(100).regex(/^[a-zA-Z0-9_-]+$/);
const safePath = z.string().max(240).refine(value => normalizeAnalyticsPath(value) === value, "Expected a path without query, hash, or protocol");
const safeCampaignValue = z.string().max(100).regex(/^[A-Za-z0-9._~-]+$/);

const campaignSchema = z.object({
  utm_source: safeCampaignValue.optional(),
  utm_medium: safeCampaignValue.optional(),
  utm_campaign: safeCampaignValue.optional(),
  utm_content: safeCampaignValue.optional(),
  utm_term: safeCampaignValue.optional(),
  landing_path: safePath,
  captured_at: z.string().datetime(),
  updated_at: z.string().datetime(),
}).strict();

export const analyticsEventEnvelopeSchema = z.object({
  event_name: z.enum(ANALYTICS_EVENT_NAMES),
  event_version: z.literal(ANALYTICS_EVENT_VERSION),
  event_id: safeId,
  timestamp: z.string().datetime(),
  page_path: safePath,
  route_family: z.string().max(40).regex(/^[a-z_]+$/).optional(),
  landing_path: safePath.optional(),
  session_id: safeId.optional(),
  cta_id: z.string().max(100).regex(/^[a-z0-9_]+$/).optional(),
  surface: z.enum(ANALYTICS_SURFACES).optional(),
  intent: z.enum(ANALYTICS_INTENTS).optional(),
  destination_type: z.enum(ANALYTICS_DESTINATION_TYPES).optional(),
  destination_path: safePath.optional(),
  platform: z.enum(ANALYTICS_PLATFORMS).optional(),
  campaign: campaignSchema.optional(),
}).strict();

export type ValidatedAnalyticsEvent = z.infer<typeof analyticsEventEnvelopeSchema>;

const categoryByEvent: Record<ValidatedAnalyticsEvent["event_name"], "download" | "lead" | "cta_click" | "quiz" | "page_view" | "engagement"> = {
  page_view: "page_view",
  quick_check_start: "cta_click",
  download_hub_open: "cta_click",
  store_listing_click: "download",
  pricing_plan_selected: "cta_click",
  checkout_started: "cta_click",
  employer_demo_submit_attempt: "lead",
  employer_demo_submitted: "lead",
  cta_click: "cta_click",
  content_engagement: "engagement",
};

/**
 * Maps the privacy-safe public envelope into the existing conversion-events
 * persistence model. The mapping intentionally omits raw referrers, user
 * agent, browser titles, arbitrary metadata, and all visitor-entered text.
 */
export function toConversionEventInsert(input: ValidatedAnalyticsEvent) {
  const campaign = input.campaign;
  return {
    eventName: input.event_name,
    eventCategory: categoryByEvent[input.event_name],
    sourcePage: input.page_path,
    sourcePageTitle: null,
    referrer: null,
    utmSource: campaign?.utm_source ?? null,
    utmMedium: campaign?.utm_medium ?? null,
    utmCampaign: campaign?.utm_campaign ?? null,
    deviceType: "desktop" as const,
    userAgent: null,
    sessionId: input.session_id ?? null,
    metadata: {
      eventVersion: input.event_version,
      eventId: input.event_id,
      timestamp: input.timestamp,
      routeFamily: input.route_family,
      landingPath: input.landing_path,
      ctaId: input.cta_id,
      surface: input.surface,
      intent: input.intent,
      destinationType: input.destination_type,
      destinationPath: input.destination_path,
      platform: input.platform,
      campaign: input.campaign,
    },
  };
}

export function acceptsAnalyticsEnvelope(value: unknown): value is AnalyticsEventEnvelope {
  return analyticsEventEnvelopeSchema.safeParse(value).success;
}
