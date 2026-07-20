/**
 * pagesRouter — Admin Pages audit tool.
 *
 * Exposes a single `listPages` procedure that:
 *  1. Reads all static routes from shared/routes.ts (the source of truth)
 *  2. LEFT JOINs staticMeta from server/metaTags.ts onto each route
 *  3. Appends any staticMeta entries that have NO matching route (orphaned)
 *
 * Protected by the same blog admin cookie used throughout the admin panel.
 */

import { TRPCError } from "@trpc/server";
import { jwtVerify } from "jose";
import { publicProcedure, router } from "./_core/trpc";
import { staticRoutes, type PageType } from "@shared/routes";
import { getStaticMetaSnapshot } from "./metaTags";

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
}

// ─── Router ───────────────────────────────────────────────────────────────────
export const pagesRouter = router({
  listPages: adminPagesProcedure.query(async (): Promise<PageEntry[]> => {
    const metaSnapshot = getStaticMetaSnapshot();

    const result: PageEntry[] = [];
    const seenPaths = new Set<string>();

    // 1. All routes from the manifest — LEFT JOIN staticMeta
    for (const route of staticRoutes) {
      const meta = metaSnapshot[route.path];
      seenPaths.add(route.path);
      result.push({
        path: route.path,
        label: route.label,
        type: route.type,
        hasMetaTitle: !!meta?.title,
        hasMetaDesc: !!meta?.description,
        hasCanonical: !!meta?.canonical,
        metaTitle: meta?.title ?? null,
        metaDesc: meta?.description ?? null,
      });
    }

    // 2. Orphaned staticMeta entries — in staticMeta but NOT in the manifest.
    //    Exclude /oral-health-hub/ entries (those are DB-driven blog posts).
    for (const [path, meta] of Object.entries(metaSnapshot)) {
      if (seenPaths.has(path)) continue;
      if (path.startsWith("/oral-health-hub/")) continue;
      result.push({
        path,
        label: meta.title ?? path,
        type: "Orphaned",
        hasMetaTitle: !!meta.title,
        hasMetaDesc: !!meta.description,
        hasCanonical: !!meta.canonical,
        metaTitle: meta.title ?? null,
        metaDesc: meta.description ?? null,
      });
    }

    return result;
  }),
});
