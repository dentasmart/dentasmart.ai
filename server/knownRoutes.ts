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

export interface BlogSlugLookupResult {
  slugs: Set<string>;
  authoritative: boolean;
}

type BlogSlugLookup = () => Promise<BlogSlugLookupResult>;

async function getBlogSlugLookup(): Promise<BlogSlugLookupResult> {
  const now = Date.now();
  if (now - blogSlugLastLoaded < BLOG_SLUG_TTL_MS) {
    return { slugs: blogSlugSet, authoritative: true };
  }

  try {
    const db = await getDb();
    if (!db) return { slugs: blogSlugSet, authoritative: false };

    const rows = await db
      .select({ slug: blogPosts.slug })
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"));

    blogSlugSet = new Set(rows.map((r) => r.slug));
    blogSlugLastLoaded = now;
    return { slugs: blogSlugSet, authoritative: true };
  } catch {
    return { slugs: blogSlugSet, authoritative: false };
  }
}

// ── Static asset extensions ───────────────────────────────────────────────────
// Only these extensions are treated as static assets (never logged).
// .php and other server-side extensions are intentionally excluded.
const STATIC_EXTENSIONS = new Set([
  "js", "css", "png", "jpg", "jpeg", "gif", "svg", "ico",
  "woff", "woff2", "ttf", "eot", "otf", "webp", "avif",
  "map", "json", "txt", "xml", "pdf", "mp4", "webm", "mp3", "webmanifest",
]);

/**
 * Returns true if the given raw request path is a known valid route.
 * Unknown paths should be logged (dry-run) or 404'd (enforce mode).
 */
export async function isKnownRouteWithBlogLookup(
  rawPath: string,
  getBlogSlugs: BlogSlugLookup = getBlogSlugLookup,
): Promise<boolean> {
  // Strip query string and normalise trailing slash
  const withoutQuery = rawPath.split("?")[0];
  const path = withoutQuery.replace(/\/+$/, "") || "/";
  const pathLower = path.toLowerCase();

  // 1. Admin routes — never log
  if (pathLower.startsWith("/admin")) return true;

  // 2. API / tRPC / OAuth — never log
  if (pathLower.startsWith("/api")) return true;

  // 3. Vite/build-tool internal paths — never valid in production, skip unconditionally
  //    (/@vite, /@react-refresh, /@fs/..., /src/*, /node_modules/*)
  if (pathLower.startsWith("/@") || pathLower.startsWith("/src/") || pathLower.startsWith("/node_modules/")) return true;

  // 4. Static asset extensions (restricted allowlist)
  const ext = pathLower.split(".").pop() ?? "";
  if (STATIC_EXTENSIONS.has(ext)) return true;

  // 5. Exact static path match (with or without trailing slash)
  if (staticPathSet.has(path) || staticPathSet.has(path + "/")) return true;

  // 6. Dynamic routes — valid slug check using data-file keys
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 2) {
    const [prefix, slug] = parts;
    if (prefix === "symptoms" && validSymptomSlugs.has(slug)) return true;
    if (prefix === "conditions" && validConditionSlugs.has(slug)) return true;
    if (prefix === "guides" && validGuideSlugs.has(slug)) return true;
  }

  // 7. Tokenized account deletion route — token validity belongs to the target
  // service, but a non-empty token route must never be intercepted as a 404.
  if (parts.length === 3 && parts[0] === "account" && parts[1] === "delete" && parts[2]) return true;

  // 8. Blog posts — /oral-health-hub/:slug (with or without trailing slash)
  if (parts.length === 2 && parts[0] === "oral-health-hub") {
    const result = await getBlogSlugs();
    // A missing database or failed lookup must fail open so a temporary outage
    // cannot hard-404 every published article on a cold cache.
    if (!result.authoritative) return true;
    if (result.slugs.has(parts[1])) return true;
  }

  return false;
}

/** Returns true for a recognised path, or fails open for unavailable blog lookups. */
export async function isKnownRoute(rawPath: string): Promise<boolean> {
  return isKnownRouteWithBlogLookup(rawPath);
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

  // Vite/build-tool internal paths — skip unconditionally
  if (pathLower.startsWith("/@") || pathLower.startsWith("/src/") || pathLower.startsWith("/node_modules/")) return true;

  const ext = pathLower.split(".").pop() ?? "";
  if (STATIC_EXTENSIONS.has(ext)) return true;

  if (staticPathSet.has(path) || staticPathSet.has(path + "/")) return true;

  const parts = path.split("/").filter(Boolean);
  if (parts.length === 2) {
    const [prefix, slug] = parts;
    if (prefix === "symptoms" && validSymptomSlugs.has(slug)) return true;
    if (prefix === "conditions" && validConditionSlugs.has(slug)) return true;
    if (prefix === "guides" && validGuideSlugs.has(slug)) return true;
  }

  if (parts.length === 3 && parts[0] === "account" && parts[1] === "delete" && parts[2]) return true;

  // Blog slugs not checked in sync version — audit script handles separately
  return false;
}
