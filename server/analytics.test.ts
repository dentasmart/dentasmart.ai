import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "./routers";

const PORT = 3099;
let server: any;
let client: ReturnType<typeof createTRPCProxyClient<AppRouter>>;

beforeAll(async () => {
  process.env.PORT = String(PORT);
  const mod = await import("./_core/index");
  server = mod.default || mod;

  client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `http://localhost:${PORT}/api/trpc`,
        transformer: superjson,
      }),
    ],
  });

  await new Promise((resolve) => setTimeout(resolve, 1500));
});

afterAll(async () => {
  if (server?.close) server.close();
});

describe("Analytics Router", () => {
  describe("Event Tracking (Public)", () => {
    it("should track a download_ios_click event", async () => {
      const result = await client.analytics.trackEvent.mutate({
        eventName: "download_ios_click",
        sourcePage: "/",
        sourcePageTitle: "Home",
        deviceType: "mobile",
        sessionId: "test-session-123",
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });

    it("should track an event with UTM parameters", async () => {
      const result = await client.analytics.trackEvent.mutate({
        eventName: "cta_get_score_click",
        sourcePage: "/oral-health-hub/symptoms",
        sourcePageTitle: "Symptoms Hub",
        referrer: "https://google.com",
        utmSource: "google",
        utmMedium: "organic",
        utmCampaign: "dental_symptoms",
        deviceType: "desktop",
        sessionId: "test-session-456",
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });

    it("should track a mid_content_cta_click event with metadata", async () => {
      const result = await client.analytics.trackEvent.mutate({
        eventName: "mid_content_cta_click",
        sourcePage: "/conditions/tooth-decay",
        sourcePageTitle: "Tooth Decay",
        deviceType: "mobile",
        sessionId: "test-session-789",
        metadata: { label: "condition_page_mid_cta" },
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });

    it("should track a sticky_cta_click event", async () => {
      const result = await client.analytics.trackEvent.mutate({
        eventName: "sticky_cta_click",
        sourcePage: "/oral-health-hub",
        sourcePageTitle: "Oral Health Hub",
        deviceType: "mobile",
        sessionId: "test-session-101",
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });

    it("should track an exit_intent_shown event", async () => {
      const result = await client.analytics.trackEvent.mutate({
        eventName: "exit_intent_shown",
        sourcePage: "/features",
        sourcePageTitle: "Features",
        deviceType: "desktop",
        sessionId: "test-session-202",
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });
  });

  describe("Dashboard Endpoints (Admin Protected)", () => {
    // These endpoints require admin auth, so they should return "Unauthorized"
    // when called without a valid admin_token cookie.
    // This verifies the endpoints exist and are properly protected.

    const today = new Date().toISOString().split("T")[0];
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];

    it("should reject getStats without admin auth", async () => {
      try {
        await client.analytics.getStats.query({
          startDate: weekAgo,
          endDate: today,
        });
        // Should not reach here
        expect(true).toBe(false);
      } catch (error: any) {
        expect(error.message).toContain("Unauthorized");
      }
    });

    it("should reject getTopPages without admin auth", async () => {
      try {
        await client.analytics.getTopPages.query({
          startDate: weekAgo,
          endDate: today,
        });
        expect(true).toBe(false);
      } catch (error: any) {
        expect(error.message).toContain("Unauthorized");
      }
    });

    it("should reject getDailyTrend without admin auth", async () => {
      try {
        await client.analytics.getDailyTrend.query({
          startDate: weekAgo,
          endDate: today,
        });
        expect(true).toBe(false);
      } catch (error: any) {
        expect(error.message).toContain("Unauthorized");
      }
    });

    it("should reject getDeviceBreakdown without admin auth", async () => {
      try {
        await client.analytics.getDeviceBreakdown.query({
          startDate: weekAgo,
          endDate: today,
        });
        expect(true).toBe(false);
      } catch (error: any) {
        expect(error.message).toContain("Unauthorized");
      }
    });

    it("should reject getRecentEvents without admin auth", async () => {
      try {
        await client.analytics.getRecentEvents.query({
          limit: 20,
        });
        expect(true).toBe(false);
      } catch (error: any) {
        expect(error.message).toContain("Unauthorized");
      }
    });
  });
});
