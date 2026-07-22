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
  normalisePath,
} from "./notFoundDb";
import { getAllRedirects } from "./redirectDb";

export const notFoundRouter = router({
  /**
   * List all not-found log entries, ordered by hit count descending.
   * Each entry is enriched with `hasRedirect: boolean` — true when an enabled
   * redirect exists whose sourcePath matches the logged path.  Once a redirect
   * is enabled the path can never 404 again (redirect middleware fires first),
   * so the entry is effectively "resolved".
   */
  list: adminProcedure
    .input(z.object({ limit: z.number().int().min(1).max(1000).default(500) }).optional())
    .query(async ({ input }) => {
      const [entries, allRedirects] = await Promise.all([
        listNotFoundEntries(input?.limit ?? 500),
        getAllRedirects(),
      ]);

      // Build a set of normalised enabled-redirect source paths for O(1) lookup
      const enabledSources = new Set(
        allRedirects
          .filter((r) => r.isEnabled)
          .map((r) => normalisePath(r.sourcePath))
      );

      return entries.map((entry) => ({
        ...entry,
        hasRedirect: enabledSources.has(normalisePath(entry.path)),
      }));
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
