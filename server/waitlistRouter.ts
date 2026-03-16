import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { androidWaitlist } from "../drizzle/schema";
import { notifyOwner } from "./_core/notification";
import { eq } from "drizzle-orm";

export const waitlistRouter = router({
  /**
   * Join the Android early access waitlist.
   * Public endpoint — no auth required.
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
});
