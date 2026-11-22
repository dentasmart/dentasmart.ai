import { describe, expect, it } from "vitest";
import { cmsDocumentSchema } from "./cmsBlocks";
import { createCmsBlankDocument } from "./cmsHubRegistry";
import { getCmsSchemaPreview } from "./cmsSchemaPreview";
import { parseManualCmsSchema } from "./cmsSchemaOverride";

const manual = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", name: "CMS QA manual" },
    { "@type": "Article", headline: "CMS QA manual" },
  ],
});
function make() {
  const doc = createCmsBlankDocument("guides", "cms-qa", "CMS QA");
  doc.seo.metaDescription = "Example";
  return doc;
}
function setManual(doc: ReturnType<typeof make>, jsonLd: string) {
  doc.editorial = {
    categories: [], cornerstone: false,
    schemaPageType: "WebPage", schemaArticleType: "none",
    schemaMode: "manual", manualSchemaJsonLd: jsonLd,
  };
}
describe("private Advanced CMS schema override", () => {
  it("generates automatic page and article schema for guides", () => {
    const preview = getCmsSchemaPreview(make());
    expect(preview.selectionMode).toBe("auto");
    expect(preview.publishable).toBe(false);
    expect((preview.jsonLd["@graph"] as Record<string, unknown>[]).map(n => n["@type"]))
      .toEqual(["WebPage", "Article"]);
  });
  it("supports validated manual override and restores automatic mode", () => {
    const doc = make();
    setManual(doc, manual);
    expect(cmsDocumentSchema.safeParse(doc).success).toBe(true);
    const preview = getCmsSchemaPreview(doc);
    expect(preview.selectionMode).toBe("manual");
    expect(preview.jsonLd["@graph"]).toEqual(JSON.parse(manual)["@graph"]);
    doc.editorial!.schemaMode = "auto";
    expect(getCmsSchemaPreview(doc).jsonLd).toEqual(preview.automaticJsonLd);
  });
  it("rejects malformed drafts before save and uses a safe fallback", () => {
    const doc = make();
    setManual(doc, "{");
    const preview = getCmsSchemaPreview(doc);
    expect(preview.manualError).toMatch(/valid JSON/);
    expect(preview.jsonLd).toEqual(preview.automaticJsonLd);
    expect(cmsDocumentSchema.safeParse(doc).success).toBe(false);
  });
  it("blocks overriding sitewide schema or adding blog schema", () => {
    for (const type of ["Organization", "WebSite", "BlogPosting"]) {
      const bad = JSON.stringify({ "@context": "https://schema.org", "@type": type });
      expect(parseManualCmsSchema(bad).error).toBeTruthy();
    }
  });
  it("preserves old manual type selections without a JSON field", () => {
    const doc = make();
    doc.editorial = { categories: [], cornerstone: false, schemaPageType: "MedicalWebPage",
      schemaArticleType: "none" };
    const preview = getCmsSchemaPreview(doc);
    expect(preview.selectionMode).toBe("manual");
    expect(preview.pageType).toBe("MedicalWebPage");
    expect(cmsDocumentSchema.safeParse(doc).success).toBe(true);
  });
  it("includes reviewer data only when complete and marks it unverified", () => {
    const doc = make();
    doc.reviewer = { name: "QA TEST", credentials: "TEST", shortBio: "QA only",
      profileUrl: "https://dentasmart.ai/authors/qa/", lastReviewed: "2025-01-15" };
    const preview = getCmsSchemaPreview(doc);
    const page = (preview.jsonLd["@graph"] as Record<string, unknown>[])[0];
    expect(page.lastReviewed).toBe("2025-01-15");
    expect(page.reviewedBy).toEqual({ "@type": "Person", name: "QA TEST", jobTitle: "TEST",
      description: "QA only", url: "https://dentasmart.ai/authors/qa/" });
    expect(preview.issues.some(issue => issue.message.includes("independently verified"))).toBe(true);
    setManual(doc, manual);
    const override = getCmsSchemaPreview(doc);
    expect(override.manualMissingReviewer).toBe(true);
    expect(override.manualMissingReviewDate).toBe(true);
  });
  it("does not invent reviewer attribution when data is incomplete", () => {
    const doc = make();
    doc.reviewer = { name: "QA" };
    const preview = getCmsSchemaPreview(doc);
    expect(JSON.stringify(preview.jsonLd)).not.toContain("reviewedBy");
    expect(preview.issues.some(issue => issue.message.includes("incomplete"))).toBe(true);
  });
});
