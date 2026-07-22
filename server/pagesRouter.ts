/**
 * pagesRouter — Admin Pages audit + meta editing tool.
 *
 * Procedures:
 *  - listPages       : returns all static routes LEFT JOINed with staticMeta + DB overrides
 *  - upsertPageMeta  : admin saves a meta override for a page (clears cache synchronously)
 *  - deletePageMeta  : admin reverts a page to its staticMeta defaults (clears cache synchronously)
 *
 * Protected by the same blog admin cookie used throughout the admin panel.
 */

import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { router } from "./_core/trpc";
import { adminProcedure } from "./adminAuth";
import { staticRoutes, type PageType } from "@shared/routes";
import { getStaticMetaSnapshot, getPageOverride, clearPageOverrideCache } from "./metaTags";
import { getDb } from "./db";
import { pageMetaOverrides, redirects } from "../drizzle/schema";

/**
 * Part 4b helper: load the set of sourcePaths that have an enabled redirect.
 * Normalises trailing slashes so /symptoms/tooth-pain/ matches /symptoms/tooth-pain.
 */
async function getEnabledRedirectSources(): Promise<Set<string>> {
  const db = await getDb();
  if (!db) return new Set();
  const rows = await db
    .select({ sourcePath: redirects.sourcePath })
    .from(redirects)
    .where(eq(redirects.isEnabled, true));
  return new Set(rows.map((r) => r.sourcePath.replace(/\/$/, "")));
}



// ─── Types ────────────────────────────────────────────────────────────────────
export type OrphanState = "Orphaned" | "Orphaned-Redirected";

export interface PageEntry {
  path: string;
  label: string;
  type: PageType | OrphanState;
  hasMetaTitle: boolean;
  hasMetaDesc: boolean;
  hasCanonical: boolean;
  metaTitle: string | null;
  metaDesc: string | null;
  // DB override fields — null means no override exists for this page
  overrideTitle: string | null;
  overrideDesc: string | null;
  overrideCanonical: string | null;
  hasOverride: boolean;
}

// ─── Router ───────────────────────────────────────────────────────────────────
export const pagesRouter = router({
  /**
   * Returns all static pages with their meta coverage status and current DB overrides.
   * Source of truth: shared/routes.ts (LEFT JOIN staticMeta + DB overrides).
   * Orphaned staticMeta entries (no matching route) are appended at the end.
   */
  listPages: adminProcedure.query(async (): Promise<PageEntry[]> => {
    const metaSnapshot = getStaticMetaSnapshot();

    const result: PageEntry[] = [];
    const seenPaths = new Set<string>();

    // 1. All routes from the manifest — LEFT JOIN staticMeta + DB overrides
    for (const route of staticRoutes) {
      const meta = metaSnapshot[route.path];
      const ov = await getPageOverride(route.path);
      seenPaths.add(route.path);
      result.push({
        path: route.path,
        label: route.label,
        type: route.type,
        hasMetaTitle: !!(ov?.metaTitle ?? meta?.title),
        hasMetaDesc: !!(ov?.metaDesc ?? meta?.description),
        // canonical is computed at request time by resolveMetaTags if a staticMeta entry
        // or DB override exists. A page has a canonical iff it has a staticMeta entry or override.
        hasCanonical: !!(meta || ov),
        metaTitle: meta?.title ?? null,
        metaDesc: meta?.description ?? null,
        overrideTitle: ov?.metaTitle ?? null,
        overrideDesc: ov?.metaDesc ?? null,
        overrideCanonical: ov?.canonical ?? null,
        hasOverride: !!ov,
      });
    }

    // 2. Orphaned staticMeta entries — in staticMeta but NOT in the manifest.
    //    Exclude /oral-health-hub/ entries (those are DB-driven blog posts).
    //    Part 4b: classify as "Orphaned-Redirected" when an enabled redirect covers this path.
    const enabledRedirectSources = await getEnabledRedirectSources();
    for (const [path, meta] of Object.entries(metaSnapshot)) {
      if (seenPaths.has(path)) continue;
      if (path.startsWith("/oral-health-hub/")) continue;
      const ov = await getPageOverride(path);
      const normPath = path.replace(/\/$/, "");
      const orphanType: OrphanState = enabledRedirectSources.has(normPath)
        ? "Orphaned-Redirected"
        : "Orphaned";
      result.push({
        path,
        label: meta.title ?? path,
        type: orphanType,
        hasMetaTitle: !!meta.title,
        hasMetaDesc: !!meta.description,
        // Orphaned entries exist in staticMeta so they always receive a computed canonical.
        hasCanonical: true,
        metaTitle: meta.title ?? null,
        metaDesc: meta.description ?? null,
        overrideTitle: ov?.metaTitle ?? null,
        overrideDesc: ov?.metaDesc ?? null,
        overrideCanonical: ov?.canonical ?? null,
        hasOverride: !!ov,
      });
    }

    return result;
  }),

  /**
   * Upsert a meta override for a static page.
   * Using ?? null (not ?? undefined) in .set() so that clearing a field writes NULL,
   * not a no-op. The insert path uses ?? undefined so Drizzle omits unset columns.
   * Clears the override cache synchronously before returning.
   */
  upsertPageMeta: adminProcedure
    .input(
      z.object({
        path: z.string().min(1),
        metaTitle: z.string().max(200).nullable(),
        metaDesc: z.string().nullable(),
        canonical: z.string().max(1000).nullable(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      await db
        .insert(pageMetaOverrides)
        .values({
          path: input.path,
          metaTitle: input.metaTitle ?? undefined,
          metaDesc: input.metaDesc ?? undefined,
          canonical: input.canonical ?? undefined,
        })
        .onDuplicateKeyUpdate({
          set: {
            // ?? null ensures blanking a field clears it rather than leaving the old value
            metaTitle: input.metaTitle ?? null,
            metaDesc: input.metaDesc ?? null,
            canonical: input.canonical ?? null,
          },
        });
      clearPageOverrideCache(); // synchronous — next resolveMetaTags call re-queries immediately
      return { ok: true };
    }),

  /**
   * Delete a meta override, reverting the page to its staticMeta value.
   * Clears the override cache synchronously before returning.
   */
  deletePageMeta: adminProcedure
    .input(z.object({ path: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      await db.delete(pageMetaOverrides).where(eq(pageMetaOverrides.path, input.path));
      clearPageOverrideCache();
      return { ok: true };
    }),
});
