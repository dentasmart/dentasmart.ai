/**
 * tRPC router for the not_found_log admin panel.
 * All procedures are admin-only, authenticated via the blog_admin_session
 * JWT cookie — same pattern as pagesRouter, redirectsRouter, and blogRouter.
 */

import { z } from "zod";
import { router } from "./_core/trpc";
import { adminProcedure } from "./adminAuth";
import {
  listNotFoundEntries,
  deleteNotFoundEntry,
  clearNotFoundLog,
} from "./notFoundDb";

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
