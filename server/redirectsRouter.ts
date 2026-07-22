/**
 * redirectsRouter — Admin Redirect Management tool.
 *
 * Procedures:
 *  - listRedirects   : returns all redirect rows ordered by createdAt desc
 *  - upsertRedirect  : admin saves a redirect (clears cache synchronously)
 *                      returns a chainWarning if target is itself a redirect source
 *  - deleteRedirect  : admin deletes a redirect (clears cache synchronously)
 *
 * Protected by the same blog admin cookie used throughout the admin panel.
 */

import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router } from "./_core/trpc";
import { adminProcedure } from "./adminAuth";
import { getAllRedirects, upsertRedirect, deleteRedirect } from "./redirectDb";
import { clearRedirectCache } from "./redirectCache";

// ─── Router ──────────────────────────────────────────────────────────────────
export const redirectsRouter = router({
  listRedirects: adminProcedure.query(async () => {
    const rows = await getAllRedirects();
    // Return newest first for the admin table
    return [...rows].reverse();
  }),

  upsertRedirect: adminProcedure
    .input(
      z.object({
        id: z.number().optional(),
        sourcePath: z.string().min(1).startsWith("/"),
        targetPath: z.string().min(1),
        statusCode: z.number().int().refine((n) => [301, 302, 307, 308].includes(n), {
          message: "Status code must be 301, 302, 307, or 308",
        }),
        isEnabled: z.boolean(),
        note: z.string().nullable().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Normalise sourcePath: strip trailing slash (except root "/") so the
      // middleware can always match it against the incoming request path.
      // e.g. /hub/xrays/ → /hub/xrays
      const normPath = (p: string) =>
        p.endsWith('/') && p.length > 1 ? p.slice(0, -1) : p;
      const normalisedSource = normPath(input.sourcePath);

      // Self-redirect guard — normalise both sides before comparing.
      if (normalisedSource === normPath(input.targetPath)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Source and target paths cannot be the same (self-redirect)",
        });
      }

      await upsertRedirect({
        sourcePath: normalisedSource,  // normalised: trailing slash stripped
        targetPath: input.targetPath,
        statusCode: input.statusCode,
        isEnabled: input.isEnabled,
        note: input.note ?? null,
      });

      // Clear cache synchronously before returning so the next request sees the change
      clearRedirectCache();

      // Chain detection: warn if target is itself a redirect source
      const allRows = await getAllRedirects();
      const chainTarget = allRows.find(
        (r) => r.sourcePath === input.targetPath && r.id !== input.id
      );
      const chainWarning = chainTarget
        ? `Target "${input.targetPath}" is itself redirected to "${chainTarget.targetPath}" — check for redirect chains`
        : null;

      return { success: true, chainWarning };
    }),

  deleteRedirect: adminProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ input }) => {
      await deleteRedirect(input.id);
      // Clear cache synchronously before returning
      clearRedirectCache();
      return { success: true };
    }),
});
