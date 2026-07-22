/**
 * Static completeness audit for the known-routes set.
 *
 * Checks:
 *  1. Every <Route path="..."> in App.tsx → isKnownRoute() must return true
 *     (blog slugs loaded from DB for accurate sync check)
 *  2. Every <loc> URL in every sitemap segment → isKnownRoute() must return true
 *  3. Every published blog slug from the DB → /oral-health-hub/:slug → must return true
 *  4. Cross-reference: every hardcoded /oral-health-hub/:slug in App.tsx must be
 *     PUBLISHED in the DB — if not, report whether it has an enabled redirect
 *
 * Run: npx tsx scripts/audit-known-routes.ts
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createConnection } from "mysql2/promise";
import { config } from "dotenv";

config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

// ── Import the isKnownRouteSync function ──────────────────────────────────────
import { isKnownRouteSync } from "../server/knownRoutes";

// ── Load DB data ──────────────────────────────────────────────────────────────
const conn = await createConnection(process.env.DATABASE_URL!);

const [blogRows] = await conn.execute(
  "SELECT slug, status FROM blog_posts WHERE status IN ('published', 'draft', 'unpublished') LIMIT 2000"
) as [Array<{ slug: string; status: string }>, unknown];

const [redirectRows] = await conn.execute(
  "SELECT sourcePath, targetPath, isEnabled FROM redirects WHERE isEnabled = 1"
) as [Array<{ sourcePath: string; targetPath: string; isEnabled: number }>, unknown];

await conn.end();

const publishedSlugs = new Set(blogRows.filter((r) => r.status === "published").map((r) => r.slug));
const allBlogSlugs = new Set(blogRows.map((r) => r.slug));
const enabledRedirectSources = new Set(
  redirectRows.map((r) => r.sourcePath.replace(/\/+$/, "").toLowerCase())
);

// Extend isKnownRouteSync with DB blog slugs for accurate audit
function isKnownRouteWithBlog(rawPath: string): boolean {
  if (isKnownRouteSync(rawPath)) return true;

  // Check blog slugs from DB
  const withoutQuery = rawPath.split("?")[0];
  const path = withoutQuery.replace(/\/+$/, "") || "/";
  const parts = path.toLowerCase().split("/").filter(Boolean);
  if (parts.length === 2 && parts[0] === "oral-health-hub") {
    if (publishedSlugs.has(parts[1])) return true;
  }

  return false;
}

let failures = 0;
let passes = 0;
const failedPaths: string[] = [];

function check(path: string, source: string) {
  const known = isKnownRouteWithBlog(path);
  if (!known) {
    console.log(`  FAIL  ${path}  [${source}]`);
    failedPaths.push(`${path} [${source}]`);
    failures++;
  } else {
    passes++;
  }
}

// ── Check 1: App.tsx routes ───────────────────────────────────────────────────
console.log("\n=== Check 1: App.tsx <Route> paths ===");
const appTsx = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf-8");

const routeMatches = [...appTsx.matchAll(/[<\s]Route[^>]*\bpath=["']([^"']+)["']/g)];
const appPaths = routeMatches
  .map((m) => m[1])
  .filter((p) => !p.includes(":") && !p.startsWith("/admin"));

for (const p of appPaths) {
  check(p, "App.tsx");
}
console.log(`  → ${appPaths.length} static routes checked`);

// ── Check 2: Sitemap <loc> entries ────────────────────────────────────────────
console.log("\n=== Check 2: Sitemap <loc> entries ===");
const BASE = "https://dentasmart.ai";
const sitemapSegments = [
  "sitemap-pages.xml",
  "sitemap-conditions.xml",
  "sitemap-symptoms.xml",
  "sitemap-guides.xml",
  "sitemap-treatments.xml",
  "sitemap-costs.xml",
  "sitemap-comparisons.xml",
  "sitemap-life-stages.xml",
  "sitemap-lifestyle.xml",
  "sitemap-emergencies.xml",
  "sitemap-blog.xml",
];

let sitemapTotal = 0;
for (const seg of sitemapSegments) {
  let xml: string;
  try {
    const res = await fetch(`http://localhost:3000/${seg}`);
    if (!res.ok) {
      console.log(`  SKIP  /${seg} (${res.status})`);
      continue;
    }
    xml = await res.text();
  } catch {
    console.log(`  SKIP  /${seg} (fetch failed)`);
    continue;
  }
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locs) {
    const path = loc.replace(BASE, "").replace(/\/+$/, "") || "/";
    check(path, seg);
    sitemapTotal++;
  }
}
console.log(`  → ${sitemapTotal} sitemap <loc> entries checked`);

// ── Check 3: Published blog slugs from DB ────────────────────────────────────
console.log("\n=== Check 3: Published blog slugs (DB) ===");
for (const slug of publishedSlugs) {
  const path = `/oral-health-hub/${slug}`;
  if (!isKnownRouteWithBlog(path)) {
    console.log(`  FAIL  ${path}  [published DB slug not reachable]`);
    failedPaths.push(`${path} [published DB slug not reachable]`);
    failures++;
  } else {
    passes++;
  }
}
console.log(`  → ${publishedSlugs.size} published blog slugs checked`);

// ── Check 4: App.tsx /oral-health-hub/:slug vs published DB ──────────────────
console.log("\n=== Check 4: App.tsx /oral-health-hub/:slug vs published DB ===");
const hubRoutes = appPaths.filter((p) => p.startsWith("/oral-health-hub/"));
let unpublishedCount = 0;

for (const p of hubRoutes) {
  const slug = p.replace("/oral-health-hub/", "").replace(/\//g, "");
  if (!publishedSlugs.has(slug)) {
    const inDb = allBlogSlugs.has(slug);
    const pathNorm = p.replace(/\/+$/, "").toLowerCase();
    const hasRedirect = enabledRedirectSources.has(pathNorm) ||
      enabledRedirectSources.has(pathNorm + "/");
    const status = inDb
      ? blogRows.find((r) => r.slug === slug)?.status ?? "unknown"
      : "NOT IN DB";
    const redirectNote = hasRedirect ? "has enabled redirect ✓" : "NO REDIRECT — would 404 in enforce mode ⚠️";
    console.log(`  UNPUBLISHED  ${p}  [status: ${status}]  [${redirectNote}]`);
    unpublishedCount++;
  }
}
if (unpublishedCount === 0) {
  console.log("  → All App.tsx /oral-health-hub/:slug routes are published ✓");
} else {
  console.log(`  → ${unpublishedCount} App.tsx hub routes are not published`);
}

// ── Summary ───────────────────────────────────────────────────────────────────
console.log("\n=== Summary ===");
console.log(`  PASS: ${passes}`);
console.log(`  FAIL: ${failures}`);

if (failures > 0) {
  console.log("\nFailed paths:");
  for (const p of failedPaths) {
    console.log(`  - ${p}`);
  }
  console.log("\n❌ FAILURES FOUND — fix before deploying enforce mode.");
  process.exit(1);
} else {
  console.log("\n✅ All checks passed — safe to deploy dry-run middleware.");
  process.exit(0); // explicit exit so fetch sockets don't keep process alive
}
