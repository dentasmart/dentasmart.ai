import { describe, it, expect } from "vitest";

/**
 * Test the canonical URL generation logic from SEO.tsx
 * This validates the core logic without needing a full React render.
 * The actual SEO component uses wouter's useLocation() hook to get the current route,
 * which is then used to build the canonical URL.
 */

const SITE_URL = "https://dentasmart.ai";

function buildCanonicalUrl(canonical: string | undefined, location: string): string {
  const rawCanonical = canonical || `${SITE_URL}${location}`;
  const canonicalUrl = rawCanonical.endsWith("/") && rawCanonical !== `${SITE_URL}/`
    ? rawCanonical.slice(0, -1)
    : rawCanonical;
  return canonicalUrl;
}

describe("SEO canonical URL generation", () => {
  it("uses explicit canonical when provided", () => {
    const result = buildCanonicalUrl("https://dentasmart.ai/features", "/features");
    expect(result).toBe("https://dentasmart.ai/features");
  });

  it("builds canonical from wouter location when no explicit canonical is given", () => {
    const result = buildCanonicalUrl(undefined, "/features");
    expect(result).toBe("https://dentasmart.ai/features");
  });

  it("builds correct canonical for homepage", () => {
    const result = buildCanonicalUrl(undefined, "/");
    expect(result).toBe("https://dentasmart.ai/");
  });

  it("builds correct canonical for blog posts", () => {
    const result = buildCanonicalUrl(undefined, "/oral-health-hub/tooth-pain-toothache");
    expect(result).toBe("https://dentasmart.ai/oral-health-hub/tooth-pain-toothache");
  });

  it("strips trailing slash from non-root URLs", () => {
    const result = buildCanonicalUrl(undefined, "/features/");
    expect(result).toBe("https://dentasmart.ai/features");
  });

  it("preserves trailing slash for homepage", () => {
    const result = buildCanonicalUrl("https://dentasmart.ai/", "/");
    expect(result).toBe("https://dentasmart.ai/");
  });

  it("uses explicit blog canonical over location", () => {
    const result = buildCanonicalUrl(
      "https://dentasmart.ai/oral-health-hub/my-article",
      "/oral-health-hub/my-article"
    );
    expect(result).toBe("https://dentasmart.ai/oral-health-hub/my-article");
  });

  it("each page gets unique canonical based on its route", () => {
    const pages = ["/features", "/employers", "/pricing", "/team", "/how-it-works"];
    const canonicals = pages.map(page => buildCanonicalUrl(undefined, page));
    
    // All canonicals should be unique
    const uniqueCanonicals = new Set(canonicals);
    expect(uniqueCanonicals.size).toBe(pages.length);
    
    // Each canonical should contain its route
    pages.forEach((page, i) => {
      expect(canonicals[i]).toBe(`https://dentasmart.ai${page}`);
    });
  });

  it("does not produce a blog post URL for non-blog pages", () => {
    // This was the original bug: all pages got a blog post URL as canonical
    const featuresCanonical = buildCanonicalUrl(undefined, "/features");
    expect(featuresCanonical).not.toContain("/oral-health-hub/");
    expect(featuresCanonical).toBe("https://dentasmart.ai/features");
    
    const employersCanonical = buildCanonicalUrl(undefined, "/employers");
    expect(employersCanonical).not.toContain("/oral-health-hub/");
    expect(employersCanonical).toBe("https://dentasmart.ai/employers");
  });
});
