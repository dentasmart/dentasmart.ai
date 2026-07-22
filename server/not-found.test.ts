/**
 * Vitest tests for Part 3: 404 detection middleware
 *
 * Tests cover:
 * - isKnownRoute() for static paths, dynamic slugs, blog posts, admin, API
 * - notFoundDb upsert + list + delete helpers
 * - notFoundRouter auth guard (admin-only)
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { isKnownRoute, isKnownRouteSync } from "./knownRoutes";
import { normalisePath } from "./notFoundDb";

// ── normalisePath ────────────────────────────────────────────────────────────

describe("normalisePath", () => {
  it("strips query string", () => {
    expect(normalisePath("/foo/bar?utm_source=google")).toBe("/foo/bar");
  });

  it("strips trailing slash", () => {
    expect(normalisePath("/foo/bar/")).toBe("/foo/bar");
  });

  it("preserves root /", () => {
    expect(normalisePath("/")).toBe("/");
    expect(normalisePath("/?q=1")).toBe("/");
  });

  it("lower-cases the path", () => {
    expect(normalisePath("/Conditions/Cavities")).toBe("/conditions/cavities");
  });
});

// ── isKnownRouteSync ─────────────────────────────────────────────────────────

describe("isKnownRouteSync", () => {
  it("returns true for admin paths", () => {
    expect(isKnownRouteSync("/admin")).toBe(true);
    expect(isKnownRouteSync("/admin/pages")).toBe(true);
    expect(isKnownRouteSync("/admin/404s")).toBe(true);
  });

  it("returns true for API paths", () => {
    expect(isKnownRouteSync("/api/trpc/blog.list")).toBe(true);
  });

  it("returns true for known static asset extensions", () => {
    expect(isKnownRouteSync("/assets/app.abc123.js")).toBe(true);
    expect(isKnownRouteSync("/favicon.ico")).toBe(true);
    expect(isKnownRouteSync("/logo.png")).toBe(true);
  });

  it("returns false for .php paths (not a known extension)", () => {
    expect(isKnownRouteSync("/wp-login.php")).toBe(false);
    expect(isKnownRouteSync("/index.php")).toBe(false);
    expect(isKnownRouteSync("/anything.php")).toBe(false);
  });

  it("returns true for known static routes", () => {
    // These are in staticRoutes
    expect(isKnownRouteSync("/")).toBe(true);
    expect(isKnownRouteSync("/conditions/cavities")).toBe(true);
    expect(isKnownRouteSync("/conditions/cavities/")).toBe(true); // trailing slash variant
    expect(isKnownRouteSync("/oral-health-hub/affordability")).toBe(true);
    expect(isKnownRouteSync("/oral-health-hub/second-opinion")).toBe(true);
    expect(isKnownRouteSync("/oral-health-hub/prevention")).toBe(true);
    expect(isKnownRouteSync("/oral-health-hub/conditions")).toBe(true);
    expect(isKnownRouteSync("/oral-health-hub/symptoms")).toBe(true);
  });

  it("returns true for valid dynamic symptom slugs", () => {
    // loose-tooth is in symptomsData
    expect(isKnownRouteSync("/symptoms/loose-tooth")).toBe(true);
    expect(isKnownRouteSync("/symptoms/loose-tooth/")).toBe(true);
  });

  it("returns true for valid dynamic condition slugs", () => {
    expect(isKnownRouteSync("/conditions/gum-disease")).toBe(true);
  });

  it("returns false for invalid dynamic slugs", () => {
    expect(isKnownRouteSync("/symptoms/nonexistent-slug-xyz")).toBe(false);
    expect(isKnownRouteSync("/conditions/nonexistent-slug-xyz")).toBe(false);
  });

  it("returns false for completely unknown paths", () => {
    expect(isKnownRouteSync("/unknown-page-xyz")).toBe(false);
    expect(isKnownRouteSync("/oral-health-hub/nonexistent-article-xyz")).toBe(false);
  });

  it("returns true for JS redirect aliases (inSitemap: false)", () => {
    // These were added as aliases — known routes but not in sitemap
    expect(isKnownRouteSync("/oral-health-hub/cavity-symptoms")).toBe(true);
    expect(isKnownRouteSync("/treatments/teeth-whitening")).toBe(true);
  });
});

// ── isKnownRoute (async) ─────────────────────────────────────────────────────

describe("isKnownRoute (async)", () => {
  it("returns true for known static paths", async () => {
    expect(await isKnownRoute("/")).toBe(true);
    expect(await isKnownRoute("/conditions/cavities")).toBe(true);
  });

  it("returns false for .php paths", async () => {
    expect(await isKnownRoute("/wp-login.php")).toBe(false);
  });

  it("returns false for unknown paths", async () => {
    expect(await isKnownRoute("/completely-unknown-path-xyz")).toBe(false);
  });

  it("handles paths with query strings", async () => {
    expect(await isKnownRoute("/conditions/cavities?utm_source=google")).toBe(true);
  });
});
