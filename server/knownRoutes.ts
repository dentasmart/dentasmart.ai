/**
 * Known-routes set for 404 detection.
 *
 * Derives valid paths from the SAME sources as the sitemap:
 *  1. staticRoutes from shared/routes.ts (exact static paths)
 *  2. Object.keys(symptomsData / conditionsData / guidesData) for dynamic slug validation
 *  3. Published blog slugs from the DB (refreshed every 5 minutes)
 *
 * Dynamic routes (/symptoms/:slug etc.) are validated against the data-file slug
 * sets — a valid slug must exist in the data file, not just match a prefix pattern.
 */

import { staticRoutes } from "../shared/routes";
import { symptomsData } from "../client/src/data/symptoms";
import { conditionsData } from "../client/src/data/conditions";
import { guidesData } from "../client/src/data/guides";
import { getDb } from "./db";
import { blogPosts } from "../drizzle/schema";
import { eq } from "drizzle-orm";

// ── Static exact paths ────────────────────────────────────────────────────────
// Built from staticRoutes (same export used by seo.ts for the sitemap).
// Store both with and without trailing slash to handle normalisation variance.
const staticPathSet = new Set<string>();
for (const r of staticRoutes) {
  const p = r.path.replace(/\/+$/, "") || "/";
  staticPathSet.add(p);
  if (p !== "/") staticPathSet.add(p + "/");
}

// ── Dynamic slug sets (data-file keys) ───────────────────────────────────────
// Same source as deriveEntries() in shared/routes.ts.
const validSymptomSlugs = new Set(Object.keys(symptomsData));
const validConditionSlugs = new Set(Object.keys(conditionsData));
const validGuideSlugs = new Set(Object.keys(guidesData));

// ── Blog slug cache ───────────────────────────────────────────────────────────
// Published blog slugs are loaded from the DB and cached for 5 minutes.
// Same query as seo.ts uses to build the blog sitemap segment.
let blogSlugSet: Set<string> = new Set();
let blogSlugLastLoaded = 0;
const BLOG_SLUG_TTL_MS = 5 * 60 * 1000;

async function getBlogSlugSet(): Promise<Set<string>> {
  const now = Date.now();
  if (now - blogSlugLastLoaded < BLOG_SLUG_TTL_MS) return blogSlugSet;

  const db = await getDb();
  if (!db) return blogSlugSet;

  const rows = await db
    .select({ slug: blogPosts.slug })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"));

  blogSlugSet = new Set(rows.map((r) => r.slug));
  blogSlugLastLoaded = now;
  return blogSlugSet;
}

// ── Static asset extensions ───────────────────────────────────────────────────
// Only these extensions are treated as static assets (never logged).
// .php and other server-side extensions are intentionally excluded.
const STATIC_EXTENSIONS = new Set([
  "js", "css", "png", "jpg", "jpeg", "gif", "svg", "ico",
  "woff", "woff2", "ttf", "eot", "otf", "webp", "avif",
  "map", "json", "txt", "xml", "pdf", "mp4", "webm", "mp3",
]);

/**
 * Returns true if the given raw request path is a known valid route.
 * Unknown paths should be logged (dry-run) or 404'd (enforce mode).
 */
export async function isKnownRoute(rawPath: string): Promise<boolean> {
  // Strip query string and normalise trailing slash
  const withoutQuery = rawPath.split("?")[0];
  const path = withoutQuery.replace(/\/+$/, "") || "/";
  const pathLower = path.toLowerCase();

  // 1. Admin routes — never log
  if (pathLower.startsWith("/admin")) return true;

  // 2. API / tRPC / OAuth — never log
  if (pathLower.startsWith("/api")) return true;

  // 3. Static asset extensions (restricted allowlist)
  const ext = pathLower.split(".").pop() ?? "";
  if (STATIC_EXTENSIONS.has(ext)) return true;

  // 4. Exact static path match (with or without trailing slash)
  if (staticPathSet.has(path) || staticPathSet.has(path + "/")) return true;

  // 5. Dynamic routes — valid slug check using data-file keys
  const parts = pathLower.split("/").filter(Boolean);
  if (parts.length === 2) {
    const [prefix, slug] = parts;
    if (prefix === "symptoms" && validSymptomSlugs.has(slug)) return true;
    if (prefix === "conditions" && validConditionSlugs.has(slug)) return true;
    if (prefix === "guides" && validGuideSlugs.has(slug)) return true;
  }

  // 6. Blog posts — /oral-health-hub/:slug (with or without trailing slash)
  if (parts.length === 2 && parts[0] === "oral-health-hub") {
    const slugSet = await getBlogSlugSet();
    if (slugSet.has(parts[1])) return true;
  }

  return false;
}

/**
 * Synchronous version for use in the completeness audit script.
 * Does NOT check blog slugs (requires DB). Use isKnownRoute() in production.
 */
export function isKnownRouteSync(rawPath: string): boolean {
  const withoutQuery = rawPath.split("?")[0];
  const path = withoutQuery.replace(/\/+$/, "") || "/";
  const pathLower = path.toLowerCase();

  if (pathLower.startsWith("/admin")) return true;
  if (pathLower.startsWith("/api")) return true;

  const ext = pathLower.split(".").pop() ?? "";
  if (STATIC_EXTENSIONS.has(ext)) return true;

  if (staticPathSet.has(path) || staticPathSet.has(path + "/")) return true;

  const parts = pathLower.split("/").filter(Boolean);
  if (parts.length === 2) {
    const [prefix, slug] = parts;
    if (prefix === "symptoms" && validSymptomSlugs.has(slug)) return true;
    if (prefix === "conditions" && validConditionSlugs.has(slug)) return true;
    if (prefix === "guides" && validGuideSlugs.has(slug)) return true;
  }

  // Blog slugs not checked in sync version — audit script handles separately
  return false;
}
