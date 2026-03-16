import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { quizSubmissions } from "../drizzle/schema";
import { notifyOwner } from "./_core/notification";

export const quizRouter = router({
  /**
   * Submit a quiz result with optional email for lead capture.
   * Public endpoint — no auth required.
   */
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        email: z.string().email().optional().or(z.literal("")),
        answers: z.record(z.string(), z.string()),
        riskLevel: z.enum(["low", "moderate", "high"]),
        matchedConditions: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) {
        console.warn("[Quiz] Database not available, skipping save");
        return { success: true };
      }

      // Save to database
      await db.insert(quizSubmissions).values({
        name: input.name && input.name.trim() !== "" ? input.name.trim() : null,
        email: input.email && input.email.trim() !== "" ? input.email.trim() : null,
        answers: input.answers,
        riskLevel: input.riskLevel,
        matchedConditions: input.matchedConditions || [],
      });

      // Notify owner for high-risk leads with email
      if (input.email && input.riskLevel === "high") {
        try {
          await notifyOwner({
            title: "New High-Risk Quiz Lead",
            content: `Email: ${input.email}\nRisk Level: ${input.riskLevel}\nConditions: ${(input.matchedConditions || []).join(", ")}`,
          });
        } catch {
          // Don't block the response if notification fails
          console.warn("[Quiz] Failed to notify owner");
        }
      }

      return { success: true };
    }),
});
