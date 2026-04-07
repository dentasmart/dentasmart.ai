import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import {
  insertConversionEvent,
  getConversionStats,
  getTopConversionPages,
  getDailyConversionTrend,
  getDeviceBreakdown,
  getRecentConversionEvents,
} from "./db";
import type { InsertConversionEvent } from "../drizzle/schema";

// Admin auth middleware (reuse blog admin pattern)
import { getDb } from "./db";
import { eq } from "drizzle-orm";
import { adminUsers } from "../drizzle/schema";
import * as jose from "jose";

const ADMIN_JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dentasmart-admin-secret"
);

async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, ADMIN_JWT_SECRET);
    return payload as { adminId: number; username: string };
  } catch {
    return null;
  }
}

// Event category mapping
const EVENT_CATEGORY_MAP: Record<string, InsertConversionEvent["eventCategory"]> = {
  download_ios_click: "download",
  download_android_click: "download",
  android_waitlist_submit: "lead",
  cta_get_score_click: "cta_click",
  sticky_cta_click: "cta_click",
  exit_intent_cta_click: "cta_click",
  mid_content_cta_click: "cta_click",
  symptom_quiz_start: "quiz",
  symptom_quiz_complete: "quiz",
  symptom_quiz_email_submit: "lead",
  demo_request_submit: "lead",
  employer_demo_request: "lead",
  pricing_plan_select: "cta_click",
  page_view: "page_view",
  hub_article_view: "page_view",
  hub_category_view: "page_view",
  blog_read: "engagement",
  faq_expand: "engagement",
  story_open: "engagement",
  scroll_depth_50: "engagement",
  scroll_depth_75: "engagement",
  scroll_depth_100: "engagement",
};

export const analyticsRouter = router({
  /**
   * Public endpoint: Track a conversion event from the frontend.
   * No auth required since this fires from visitor browsers.
   */
  trackEvent: publicProcedure
    .input(
      z.object({
        eventName: z.string().max(100),
        sourcePage: z.string().max(500),
        sourcePageTitle: z.string().max(500).optional(),
        referrer: z.string().max(1000).optional(),
        utmSource: z.string().max(200).optional(),
        utmMedium: z.string().max(200).optional(),
        utmCampaign: z.string().max(200).optional(),
        deviceType: z.enum(["desktop", "tablet", "mobile"]).optional(),
        sessionId: z.string().max(100).optional(),
        metadata: z.record(z.string(), z.any()).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const eventCategory = EVENT_CATEGORY_MAP[input.eventName] || "engagement";
      const userAgent = ctx.req.headers["user-agent"]?.substring(0, 500) || "";

      await insertConversionEvent({
        eventName: input.eventName,
        eventCategory,
        sourcePage: input.sourcePage,
        sourcePageTitle: input.sourcePageTitle ?? null,
        referrer: input.referrer ?? null,
        utmSource: input.utmSource ?? null,
        utmMedium: input.utmMedium ?? null,
        utmCampaign: input.utmCampaign ?? null,
        deviceType: input.deviceType ?? "desktop",
        userAgent: userAgent || null,
        sessionId: input.sessionId ?? null,
        metadata: input.metadata ?? null,
      });

      return { success: true };
    }),

  /**
   * Admin endpoint: Get conversion stats summary for a date range.
   */
  getStats: publicProcedure
    .input(
      z.object({
        startDate: z.string(), // ISO date string
        endDate: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      // Verify admin auth
      const token = ctx.req.cookies?.admin_token;
      if (!token) throw new Error("Unauthorized");
      const admin = await verifyAdminToken(token);
      if (!admin) throw new Error("Unauthorized");

      const start = new Date(input.startDate);
      const end = new Date(input.endDate);
      end.setHours(23, 59, 59, 999);

      return getConversionStats(start, end);
    }),

  /**
   * Admin endpoint: Get top pages driving conversions.
   */
  getTopPages: publicProcedure
    .input(
      z.object({
        startDate: z.string(),
        endDate: z.string(),
        eventCategory: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const token = ctx.req.cookies?.admin_token;
      if (!token) throw new Error("Unauthorized");
      const admin = await verifyAdminToken(token);
      if (!admin) throw new Error("Unauthorized");

      const start = new Date(input.startDate);
      const end = new Date(input.endDate);
      end.setHours(23, 59, 59, 999);

      return getTopConversionPages(start, end, input.eventCategory);
    }),

  /**
   * Admin endpoint: Get daily conversion trend.
   */
  getDailyTrend: publicProcedure
    .input(
      z.object({
        startDate: z.string(),
        endDate: z.string(),
        eventCategory: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const token = ctx.req.cookies?.admin_token;
      if (!token) throw new Error("Unauthorized");
      const admin = await verifyAdminToken(token);
      if (!admin) throw new Error("Unauthorized");

      const start = new Date(input.startDate);
      const end = new Date(input.endDate);
      end.setHours(23, 59, 59, 999);

      return getDailyConversionTrend(start, end, input.eventCategory);
    }),

  /**
   * Admin endpoint: Get device type breakdown.
   */
  getDeviceBreakdown: publicProcedure
    .input(
      z.object({
        startDate: z.string(),
        endDate: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const token = ctx.req.cookies?.admin_token;
      if (!token) throw new Error("Unauthorized");
      const admin = await verifyAdminToken(token);
      if (!admin) throw new Error("Unauthorized");

      const start = new Date(input.startDate);
      const end = new Date(input.endDate);
      end.setHours(23, 59, 59, 999);

      return getDeviceBreakdown(start, end);
    }),

  /**
   * Admin endpoint: Get recent conversion events (live feed).
   */
  getRecentEvents: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(200).default(50),
      })
    )
    .query(async ({ input, ctx }) => {
      const token = ctx.req.cookies?.admin_token;
      if (!token) throw new Error("Unauthorized");
      const admin = await verifyAdminToken(token);
      if (!admin) throw new Error("Unauthorized");

      return getRecentConversionEvents(input.limit);
    }),
});
