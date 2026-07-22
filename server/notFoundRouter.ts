/**
 * tRPC router for the not_found_log admin panel.
 * All procedures are admin-only (protected + role check).
 */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "./_core/trpc";
import {
  listNotFoundEntries,
  deleteNotFoundEntry,
  clearNotFoundLog,
} from "./notFoundDb";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
  }
  return next({ ctx });
});

export const notFoundRouter = router({
  /** List all not-found log entries, ordered by hit count descending. */
  list: adminProcedure
    .input(z.object({ limit: z.number().int().min(1).max(1000).default(500) }).optional())
    .query(async ({ input }) => {
      return listNotFoundEntries(input?.limit ?? 500);
    }),

  /** Delete a single entry by id. */
  delete: adminProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ input }) => {
      await deleteNotFoundEntry(input.id);
      return { success: true };
    }),

  /** Clear all entries. */
  clearAll: adminProcedure.mutation(async () => {
    await clearNotFoundLog();
    return { success: true };
  }),
});
