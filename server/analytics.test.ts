/**
 * In-process analytics router regression tests.
 *
 * The old suite imported the server bootstrap and called localhost:3099, but
 * the app intentionally suppresses auto-listening during Vitest. This suite
 * uses the current privacy-safe analytics envelope and mocks database I/O,
 * so it cannot write conversion events to the shared QA database.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";
import type { AnalyticsEventEnvelope } from "@shared/analyticsContract";
import { ANALYTICS_EVENT_VERSION } from "@shared/analyticsContract";

vi.mock("./db", () => ({
  insertConversionEvent: vi.fn(async () => ({ insertId: 1 })),
  getConversionStats: vi.fn(),
  getTopConversionPages: vi.fn(),
  getDailyConversionTrend: vi.fn(),
  getDeviceBreakdown: vi.fn(),
  getRecentConversionEvents: vi.fn(),
  getDb: vi.fn(),
}));

import { analyticsRouter } from "./analyticsRouter";
import { insertConversionEvent } from "./db";

function publicCaller() {
  const ctx = {
    user: null,
    req: { cookies: {}, headers: {} },
    res: {},
  } as unknown as TrpcContext;
  return analyticsRouter.createCaller(ctx);
}

function envelope(
  event_name: AnalyticsEventEnvelope["event_name"],
  fields: Partial<AnalyticsEventEnvelope> = {},
): AnalyticsEventEnvelope {
  return {
    event_name,
    event_version: ANALYTICS_EVENT_VERSION,
    event_id: "qa_event_00000001",
    timestamp: "2026-10-29T06:00:00.000Z",
    page_path: "/download/",
    session_id: "qa_session_0001",
    ...fields,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Analytics Router - privacy-safe public tracking", () => {
  it("accepts a canonical page_view event", async () => {
    expect(await publicCaller().trackEvent(envelope("page_view", { page_path: "/" })))
      .toEqual({ success: true });
    expect(insertConversionEvent).toHaveBeenCalledWith(
      expect.objectContaining({ eventName: "page_view", sourcePage: "/" }),
    );
  });

  it("tracks a download_hub_open event", async () => {
    expect(await publicCaller().trackEvent(envelope("download_hub_open", {
      page_path: "/conditions/toothache/",
      cta_id: "symptom_professional_care_download",
      surface: "symptom_next_steps",
      intent: "symptom_support",
      destination_type: "internal_route",
      destination_path: "/download/",
    }))).toEqual({ success: true });
    expect(insertConversionEvent).toHaveBeenCalledWith(
      expect.objectContaining({ eventCategory: "cta_click" }),
    );
  });

  it("tracks an iOS store_listing_click event", async () => {
    expect(await publicCaller().trackEvent(envelope("store_listing_click", {
      platform: "ios",
      destination_type: "app_store",
      surface: "download_hub",
    }))).toEqual({ success: true });
    expect(insertConversionEvent).toHaveBeenCalledWith(
      expect.objectContaining({ eventCategory: "download" }),
    );
  });

  it("tracks a sticky CTA using approved fields", async () => {
    expect(await publicCaller().trackEvent(envelope("cta_click", {
      page_path: "/oral-health-hub/",
      cta_id: "sticky_quick_check",
      surface: "sticky",
      intent: "quick_check",
    }))).toEqual({ success: true });
  });

  it("maps campaign UTM values without storing raw referrer or titles", async () => {
    expect(await publicCaller().trackEvent(envelope("cta_click", {
      campaign: {
        utm_source: "google",
        utm_medium: "organic",
        utm_campaign: "dental_symptoms",
        landing_path: "/oral-health-hub/symptoms/",
        captured_at: "2026-10-29T05:50:00.000Z",
        updated_at: "2026-10-29T05:55:00.000Z",
      },
    }))).toEqual({ success: true });
    expect(insertConversionEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        utmSource: "google",
        utmMedium: "organic",
        utmCampaign: "dental_symptoms",
        referrer: null,
        sourcePageTitle: null,
      }),
    );
  });

  it("rejects arbitrary metadata that could contain private dental information", async () => {
    await expect(publicCaller().trackEvent({
      ...envelope("cta_click"),
      metadata: { symptom_text: "private value" },
    } as any)).rejects.toThrow();
    expect(insertConversionEvent).not.toHaveBeenCalled();
  });

  it("rejects a full URL instead of a privacy-safe path", async () => {
    await expect(publicCaller().trackEvent(envelope("page_view", {
      page_path: "https://dentasmart.ai/conditions/toothache/?health=private",
    }))).rejects.toThrow();
    expect(insertConversionEvent).not.toHaveBeenCalled();
  });
});

describe("Analytics Router - admin dashboard protection", () => {
  const startDate = "2026-10-01";
  const endDate = "2026-10-29";

  it("rejects getStats without an admin session", async () => {
    await expect(publicCaller().getStats({ startDate, endDate })).rejects.toThrow("Unauthorized");
  });

  it("rejects getTopPages without an admin session", async () => {
    await expect(publicCaller().getTopPages({ startDate, endDate })).rejects.toThrow("Unauthorized");
  });

  it("rejects getDailyTrend without an admin session", async () => {
    await expect(publicCaller().getDailyTrend({ startDate, endDate })).rejects.toThrow("Unauthorized");
  });

  it("rejects getDeviceBreakdown without an admin session", async () => {
    await expect(publicCaller().getDeviceBreakdown({ startDate, endDate })).rejects.toThrow("Unauthorized");
  });

  it("rejects getRecentEvents without an admin session", async () => {
    await expect(publicCaller().getRecentEvents({ limit: 20 })).rejects.toThrow("Unauthorized");
  });
});
