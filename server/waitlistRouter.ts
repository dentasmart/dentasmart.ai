import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { androidWaitlist, benefitsWaitlist } from "../drizzle/schema";
import { notifyOwner } from "./_core/notification";
import { eq } from "drizzle-orm";

export const waitlistRouter = router({
  /**
   * Join the Android early access waitlist.
   * Public endpoint. No auth required.
   */
  joinAndroid: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
      }),
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        console.warn("[Waitlist] Database not available, skipping save");
        return { success: true, alreadyExists: false };
      }

      // Check for duplicate email
      const existing = await db
        .select()
        .from(androidWaitlist)
        .where(eq(androidWaitlist.email, input.email.trim().toLowerCase()))
        .limit(1);

      if (existing.length > 0) {
        return { success: true, alreadyExists: true };
      }

      // Save to database
      await db.insert(androidWaitlist).values({
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
      });

      // Notify owner
      try {
        await notifyOwner({
          title: "New Android Waitlist Signup",
          content: `Name: ${input.name.trim()}\nEmail: ${input.email.trim()}`,
        });
      } catch {
        console.warn("[Waitlist] Failed to notify owner");
      }

      return { success: true, alreadyExists: false };
    }),

  /**
   * Join the Benefits plan waitlist.
   * Public endpoint. No auth required.
   */
  joinBenefits: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        phone: z.string().optional(),
        message: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "SERVICE_UNAVAILABLE",
          message: "The benefits request service is temporarily unavailable. Please try again.",
        });
      }

      // Check for duplicate email
      const existing = await db
        .select()
        .from(benefitsWaitlist)
        .where(eq(benefitsWaitlist.email, input.email.trim().toLowerCase()))
        .limit(1);

      if (existing.length > 0) {
        return { success: true, alreadyExists: true };
      }

      // Save to database
      await db.insert(benefitsWaitlist).values({
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        phone: input.phone?.trim() || null,
        message: input.message?.trim() || null,
      });

      // Notify owner
      try {
        await notifyOwner({
          title: "New Benefits Waitlist Signup",
          content: `Name: ${input.name.trim()}\nEmail: ${input.email.trim()}${input.phone ? `\nPhone: ${input.phone.trim()}` : ""}${input.message ? `\nMessage: ${input.message.trim()}` : ""}`,
        });
      } catch {
        console.warn("[Waitlist] Failed to notify owner");
      }

      return { success: true, alreadyExists: false };
    }),
});
