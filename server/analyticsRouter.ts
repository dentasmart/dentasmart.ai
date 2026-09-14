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
import { analyticsEventEnvelopeSchema, toConversionEventInsert } from "./analyticsValidation";

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

export const analyticsRouter = router({
  /**
   * Public endpoint: Track a conversion event from the frontend.
   * No auth required since this fires from visitor browsers.
   */
  trackEvent: publicProcedure
    .input(analyticsEventEnvelopeSchema)
    .mutation(async ({ input }) => {
      await insertConversionEvent(toConversionEventInsert(input));

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
