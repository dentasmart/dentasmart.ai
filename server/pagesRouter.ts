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
import { jwtVerify } from "jose";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { publicProcedure, router } from "./_core/trpc";
import { staticRoutes, type PageType } from "@shared/routes";
import { getStaticMetaSnapshot, getPageOverride, clearPageOverrideCache } from "./metaTags";
import { getDb } from "./db";
import { pageMetaOverrides } from "../drizzle/schema";

// ─── Admin auth (mirrors blogRouter) ─────────────────────────────────────────
const ADMIN_COOKIE_NAME = "blog_admin_session";
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dentasmart-admin-secret-key-2024"
);

async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { adminId: number; username: string };
  } catch {
    return null;
  }
}

function parseCookies(cookieHeader: string): Record<string, string> {
  return Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [key, ...val] = c.trim().split("=");
      return [key, val.join("=")];
    })
  );
}

const adminPagesProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const cookieHeader = (ctx as any).req?.headers?.cookie ?? "";
  const cookies = parseCookies(cookieHeader);
  const token = cookies[ADMIN_COOKIE_NAME];
  if (!token) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Admin authentication required" });
  }
  const admin = await verifyAdminToken(token);
  if (!admin) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid admin session" });
  }
  return next({ ctx: { ...(ctx as any), admin } });
});

// ─── Types ────────────────────────────────────────────────────────────────────
export interface PageEntry {
  path: string;
  label: string;
  type: PageType | "Orphaned";
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
  listPages: adminPagesProcedure.query(async (): Promise<PageEntry[]> => {
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
    for (const [path, meta] of Object.entries(metaSnapshot)) {
      if (seenPaths.has(path)) continue;
      if (path.startsWith("/oral-health-hub/")) continue;
      const ov = await getPageOverride(path);
      result.push({
        path,
        label: meta.title ?? path,
        type: "Orphaned",
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
  upsertPageMeta: adminPagesProcedure
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
  deletePageMeta: adminPagesProcedure
    .input(z.object({ path: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database not available" });
      await db.delete(pageMetaOverrides).where(eq(pageMetaOverrides.path, input.path));
      clearPageOverrideCache();
      return { ok: true };
    }),
});
