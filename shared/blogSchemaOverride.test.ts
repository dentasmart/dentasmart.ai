import { describe, expect, it } from "vitest";
import {
  getManualBlogSchemaText,
  getPublicManualBlogSchema,
  isManualBlogSchema,
  parseManualBlogSchema,
  storeManualBlogSchema,
} from "./blogSchemaOverride";
import { buildBlogPostingSchemas } from "./blogPostSchemas";
import { getPublicSupplementalJsonLd, validateBlogReviewerMetadata } from "./blogReviewerMetadata";

const article = { slug: "test-post", title: "Test Post", metaDescription: "Educational article" };
describe("Blog automatic/manual schema override", () => {
  it("generates automatic BlogPosting plus sitewide schema by default", () => {
    expect(buildBlogPostingSchemas(article).map(node => node["@type"])).toEqual([
      "Organization", "WebSite", "BlogPosting",
    ]);
  });

  it("manual Article overrides only this blog's page-specific schema", () => {
    const manual = storeManualBlogSchema(JSON.stringify({
      "@context": "https://schema.org", "@type": "Article", headline: "Custom article",
    }));
    expect(isManualBlogSchema(manual)).toBe(true);
    expect(getManualBlogSchemaText(manual)).toContain("Custom article");
    expect(getPublicManualBlogSchema({ reviewerJsonLd: manual })).toHaveProperty("@type", "Article");
    expect(buildBlogPostingSchemas({ ...article, reviewerJsonLd: manual }).map(n => n["@type"]))
      .toEqual(["Organization", "WebSite", "Article"]);
    expect(validateBlogReviewerMetadata({ reviewerJsonLd: manual }).errors).toEqual([]);
    expect(getPublicSupplementalJsonLd({ reviewerJsonLd: manual })).toBeUndefined();
  });

  it("manual mode also overrides automatic reviewer WebPage and date schema", () => {
    const manual = storeManualBlogSchema(JSON.stringify({
      "@context": "https://schema.org", "@type": "Article", headline: "Manual",
    }));
    const schemas = buildBlogPostingSchemas({
      ...article, reviewerJsonLd: manual,
      reviewedByName: "Test Verified Reviewer", reviewerProfileUrl: "/authors/tester/",
      lastReviewed: "2026-10-27",
    });
    expect(schemas).toHaveLength(3);
    expect(JSON.stringify(schemas)).not.toContain("lastReviewed");
    expect(JSON.stringify(schemas)).not.toContain("Test Verified Reviewer");
  });

  it("keeps legacy supplemental JSON-LD with automatic BlogPosting", () => {
    const legacy = JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage" });
    expect(getPublicSupplementalJsonLd({ reviewerJsonLd: legacy })).toHaveProperty("@type", "FAQPage");
    expect(buildBlogPostingSchemas({ ...article, reviewerJsonLd: legacy }).map(n => n["@type"]))
      .toEqual(["Organization", "WebSite", "BlogPosting", "FAQPage"]);
  });

  it("rejects malformed manual input, missing types, unsafe script and sitewide schema collisions", () => {
    const invalid = [
      "not json",
      "{}",
      JSON.stringify({ "@context": "https://schema.org", "@type": "Organization" }),
      JSON.stringify({ "@context": "https://schema.org", "@graph": [
        { "@type": "BlogPosting" }, { "@type": "WebSite" },
      ] }),
      JSON.stringify({ "@context": "https://schema.org", "@type": "Article", name: "</script>" }),
    ];
    for (const text of invalid) {
      expect(parseManualBlogSchema(text).error).toBeTruthy();
      expect(validateBlogReviewerMetadata({ reviewerJsonLd: storeManualBlogSchema(text) }).errors.length).toBeGreaterThan(0);
    }
  });

  it("supports an Article/WebPage graph and normalizes URLs for manual markup", () => {
    const manual = JSON.stringify({ "@context": "https://schema.org", "@graph": [
      { "@type": "Article", url: "/oral-health-hub/test-post/" },
      { "@type": "WebPage", name: "Test Post" },
    ] });
    const result = parseManualBlogSchema(manual);
    expect(result.error).toBeUndefined();
    expect((result.schema?.["@graph"] as Record<string, unknown>[])[0].url)
      .toBe("https://dentasmart.ai/oral-health-hub/test-post/");
    expect(buildBlogPostingSchemas({ ...article, reviewerJsonLd: storeManualBlogSchema(manual) })).toHaveLength(3);
  });
});
