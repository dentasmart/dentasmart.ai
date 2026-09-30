import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  getPublicBlogReviewerMetadata,
  getPublicLastReviewed,
  getPublicSupplementalJsonLd,
  normalizeReviewerProfileUrl,
  parseSupplementalReviewerJsonLd,
  validateBlogReviewerMetadata,
} from "../shared/blogReviewerMetadata";
import { serializeJsonLd } from "../shared/jsonLd";
import { buildBlogPostingSchemas } from "./schemaMarkup";

const fullReview = {
  reviewedByName: "Dr. Saba Ahmed",
  reviewedByCredentials: "BDS",
  reviewerShortBio: "Dental Surgeon and DentaSmart Product Lead.",
  reviewerProfileUrl: "/team/#dr-saba-ahmed",
  lastReviewed: "2026-09-30",
};

function findBlogPosting(schemas: Record<string, unknown>[]) {
  return schemas.find((schema) => schema["@type"] === "BlogPosting");
}

function findReviewWebPage(schemas: Record<string, unknown>[]) {
  return schemas.find((schema) => schema["@type"] === "WebPage");
}

describe("public blog reviewer metadata", () => {
  it("provides manually stored reviewer attribution without inventing values", () => {
    expect(getPublicBlogReviewerMetadata(fullReview)).toEqual({
      name: "Dr. Saba Ahmed",
      credentials: "BDS",
      shortBio: "Dental Surgeon and DentaSmart Product Lead.",
      profileUrl: "https://dentasmart.ai/team/#dr-saba-ahmed",
    });
  });

  it("keeps legacy name and credential values non-public without a current reviewer profile", () => {
    const validation = validateBlogReviewerMetadata({
      reviewedByName: "Legacy Reviewer",
      reviewedByCredentials: "DDS",
    });
    expect(validation.hasAnyReviewInput).toBe(true);
    expect(validation.isComplete).toBe(false);
    expect(validation.publicMetadata).toBeUndefined();
  });

  it("returns a manually stored valid Last Reviewed date without a reviewer", () => {
    expect(getPublicLastReviewed({ lastReviewed: "2026-09-28" })).toBe("2026-09-28");
    const schemas = buildBlogPostingSchemas({
      slug: "editorial-date-only",
      title: "Editorial Date Only",
      canonicalUrl: "https://dentasmart.ai/oral-health-hub/editorial-date-only/",
      lastReviewed: "2026-09-28",
      updatedAt: new Date("2040-01-01T00:00:00.000Z"),
    });
    const reviewWebPage = findReviewWebPage(schemas)!;

    expect(reviewWebPage).toMatchObject({
      "@type": "WebPage",
      lastReviewed: "2026-09-28",
    });
    expect(reviewWebPage).not.toHaveProperty("reviewedBy");
    expect(findBlogPosting(schemas)).not.toHaveProperty("lastReviewed");
  });

  it("hides Last Reviewed and its WebPage schema when the stored date is empty", () => {
    expect(getPublicLastReviewed({ lastReviewed: "" })).toBeUndefined();
    const schemas = buildBlogPostingSchemas({ slug: "no-review-date", title: "No Review Date" });
    expect(findReviewWebPage(schemas)).toBeUndefined();
  });

  it("keeps valid reviewer attribution independent when no review date is saved", () => {
    const schemas = buildBlogPostingSchemas({
      slug: "reviewer-no-date",
      title: "Reviewer Without Date",
      reviewedByName: "Dr. Saba Ahmed",
      reviewerProfileUrl: "/team/#dr-saba-ahmed",
    });
    const reviewWebPage = findReviewWebPage(schemas)!;
    expect(reviewWebPage).toMatchObject({
      "@type": "WebPage",
      reviewedBy: { name: "Dr. Saba Ahmed" },
    });
    expect(reviewWebPage).not.toHaveProperty("lastReviewed");
  });

  it("keeps Last Reviewed fail-closed when the stored date is invalid", () => {
    const validation = validateBlogReviewerMetadata({ lastReviewed: "2026-02-30" });
    expect(validation.errors).toContainEqual({
      field: "lastReviewed",
      message: "Last reviewed must be a real date in YYYY-MM-DD format.",
    });
    expect(getPublicLastReviewed({ lastReviewed: "2026-02-30" })).toBeUndefined();
  });

  it("keeps reviewer attribution separate from invalid date or supplemental-schema fallbacks", () => {
    const input = {
      reviewedByName: "Dr. Saba Ahmed",
      reviewerProfileUrl: "/team/#dr-saba-ahmed",
      lastReviewed: "2026-02-30",
      reviewerJsonLd: "{not json}",
    };
    const validation = validateBlogReviewerMetadata(input);

    expect(validation.errors).toHaveLength(2);
    expect(validation.publicMetadata).toEqual({
      name: "Dr. Saba Ahmed",
      profileUrl: "https://dentasmart.ai/team/#dr-saba-ahmed",
    });
    expect(getPublicLastReviewed(input)).toBeUndefined();
    expect(getPublicSupplementalJsonLd(input)).toBeUndefined();
  });

  it("accepts the current Team anchor and future first-party reviewer profile URLs", () => {
    expect(normalizeReviewerProfileUrl("/team/#dr-saba-ahmed")).toBe("https://dentasmart.ai/team/#dr-saba-ahmed");
    expect(normalizeReviewerProfileUrl("https://www.dentasmart.ai/team/#dr-saba-ahmed")).toBe("https://dentasmart.ai/team/#dr-saba-ahmed");
    expect(normalizeReviewerProfileUrl("/team/dr-saba-ahmed/")).toBe("https://dentasmart.ai/team/dr-saba-ahmed/");
    expect(normalizeReviewerProfileUrl("/authors/dr-saba-ahmed/")).toBe("https://dentasmart.ai/authors/dr-saba-ahmed/");
  });

  it("rejects unsafe, malformed, external, and non-profile reviewer URLs", () => {
    expect(normalizeReviewerProfileUrl("https://example.org/reviewer")).toBeNull();
    expect(normalizeReviewerProfileUrl("javascript:alert(1)")).toBeNull();
    expect(normalizeReviewerProfileUrl("https://user:password@dentasmart.ai/authors/dr-saba-ahmed/")).toBeNull();
    expect(normalizeReviewerProfileUrl("http://dentasmart.ai/team/#dr-saba-ahmed")).toBeNull();
    expect(normalizeReviewerProfileUrl("https://dentasmart.ai/pricing/")).toBeNull();
    expect(normalizeReviewerProfileUrl("https://dentasmart.ai/team/")).toBeNull();
  });

  it("accepts safe supplemental Schema.org objects and normalizes first-party URLs", () => {
    const raw = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Educational webinar",
      url: "https://www.dentasmart.ai/oral-health-hub/example-post",
    });
    expect(getPublicSupplementalJsonLd({ reviewerJsonLd: raw })).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Event",
      url: "https://dentasmart.ai/oral-health-hub/example-post/",
    });
  });

  it("rejects source-controlled article or reviewer-schema collisions", () => {
    for (const type of ["Article", "BlogPosting", "NewsArticle", "WebPage", "Person"]) {
      expect(parseSupplementalReviewerJsonLd(JSON.stringify({
        "@context": "https://schema.org",
        "@type": type,
      })).error).toContain("cannot replace source-controlled");
    }
    expect(parseSupplementalReviewerJsonLd(JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      reviewedBy: { "@type": "Person", name: "Override" },
    })).error).toContain("cannot set reviewedBy or lastReviewed");
    expect(parseSupplementalReviewerJsonLd(JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      about: { lastReviewed: "2026-09-28" },
    })).error).toContain("cannot set reviewedBy or lastReviewed");
  });

  it("fails closed for invalid JSON and script-closing payloads while retaining serializer protection", () => {
    expect(parseSupplementalReviewerJsonLd("{not json}").error).toBe("Custom JSON-LD must be valid JSON.");
    expect(parseSupplementalReviewerJsonLd(JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Unsafe </script><script>alert(1)</script>",
    })).error).toBe("Custom JSON-LD cannot contain a closing script tag.");

    const serialized = serializeJsonLd({ "@context": "https://schema.org", "@type": "Event", name: "Safe <value>" });
    expect(serialized).not.toContain("<value>");
    expect(serialized).toContain("\\u003cvalue\\u003e");
  });

  it("retains generated BlogPosting and adds separately owned reviewer WebPage metadata", () => {
    const schemas = buildBlogPostingSchemas({
      slug: "reviewed-article",
      title: "Reviewed Article",
      metaDescription: "A safe educational article.",
      canonicalUrl: "https://dentasmart.ai/oral-health-hub/reviewed-article/",
      ...fullReview,
      reviewerJsonLd: JSON.stringify({ "@context": "https://schema.org", "@type": "Event", name: "Educational webinar" }),
    });
    const blogPosting = findBlogPosting(schemas)!;
    const reviewWebPage = findReviewWebPage(schemas)!;

    expect(blogPosting).toMatchObject({
      "@type": "BlogPosting",
      author: { "@id": "https://dentasmart.ai/#organization" },
      mainEntityOfPage: { "@id": "https://dentasmart.ai/oral-health-hub/reviewed-article/" },
    });
    expect(blogPosting).not.toHaveProperty("reviewedBy");
    expect(reviewWebPage).toMatchObject({
      "@type": "WebPage",
      "@id": "https://dentasmart.ai/oral-health-hub/reviewed-article/#webpage",
      lastReviewed: "2026-09-30",
      reviewedBy: {
        "@type": "Person",
        name: "Dr. Saba Ahmed",
        jobTitle: "BDS",
        description: fullReview.reviewerShortBio,
        url: "https://dentasmart.ai/team/#dr-saba-ahmed",
      },
    });
    expect(schemas).toContainEqual(expect.objectContaining({ "@type": "Event" }));
  });

  it("keeps editor fields, independent date display, fallback, Team anchor, and schema protections wired", () => {
    const root = resolve(import.meta.dirname, "..");
    const articleSource = readFileSync(resolve(root, "client/src/pages/Article.tsx"), "utf8");
    const cardSource = readFileSync(resolve(root, "client/src/components/ArticleReviewerMetadata.tsx"), "utf8");
    const seoSource = readFileSync(resolve(root, "client/src/components/SEO.tsx"), "utf8");
    const serverSource = readFileSync(resolve(root, "server/schemaMarkup.ts"), "utf8");
    const editorSource = readFileSync(resolve(root, "client/src/pages/AdminBlogEditor.tsx"), "utf8");
    const teamSource = readFileSync(resolve(root, "client/src/pages/Team.tsx"), "utf8");
    const migrationSource = readFileSync(resolve(root, "drizzle/0017_blog_reviewer_metadata.sql"), "utf8");

    expect(articleSource).toContain("By DentaSmart Editorial Team");
    expect(articleSource).toContain("Medically reviewed by");
    expect(articleSource).toContain("getPublicLastReviewed(article)");
    expect(articleSource).toContain("Last reviewed");
    expect(cardSource).toContain("View reviewer profile");
    expect(seoSource).toContain("typeof schema.lastReviewed === \"string\"");
    expect(serverSource).toContain("getPublicLastReviewed(post)");
    expect(editorSource).toContain("setReviewerJsonLd(existingPost.reviewerJsonLd || \"\")");
    expect(editorSource).toContain("Reviewer short bio");
    expect(editorSource).toContain("Reviewer profile URL");
    expect(editorSource).toContain("Last reviewed");
    expect(editorSource).toContain("Supplemental JSON-LD, optional");
    expect(teamSource).toContain('id="dr-saba-ahmed"');
    expect(migrationSource).toContain("reviewerShortBio");
    expect(migrationSource).toContain("reviewerProfileUrl");
    expect(migrationSource).toContain("lastReviewed");
    expect(migrationSource).toContain("reviewerJsonLd");
  });
});
