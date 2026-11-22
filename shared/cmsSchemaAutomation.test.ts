import { describe, expect, it } from "vitest";
import { cmsDocumentSchema } from "./cmsBlocks";
import { cmsHubDefinitions, createCmsBlankDocument } from "./cmsHubRegistry";
import { getCmsSchemaPreview } from "./cmsSchemaPreview";

describe("automatic, editor-friendly CMS schema selection", () => {
  it("automatically uses WebPage + Article for regular educational content", () => {
    for (const hub of ["conditions", "symptoms", "guides", "treatments", "costs"] as const) {
      const doc = createCmsBlankDocument(hub, "sample-article", "Dental Education");
      const preview = getCmsSchemaPreview(doc);
      expect(preview.selectionMode).toBe("auto");
      expect(preview.recommendedPage).toBe("WebPage");
      expect(preview.recommendedArticle).toBe("Article");
      expect(preview.pageType).toBe("WebPage");
      expect(preview.articleType).toBe("Article");
      expect((preview.jsonLd["@graph"] as Array<Record<string, unknown>>).map(node => node["@type"]))
        .toEqual(["WebPage", "Article"]);
    }
  });

  it("applies CollectionPage to each of the 15 exact hub landing URLs only", () => {
    expect(cmsHubDefinitions).toHaveLength(15);
    for (const hub of cmsHubDefinitions) {
      const doc = createCmsBlankDocument(hub.id, "landing", hub.label);
      doc.seo.requestedPath = hub.sourcePath;
      const preview = getCmsSchemaPreview(doc);
      expect(preview.selectionMode).toBe("auto");
      expect(preview.pageType).toBe("CollectionPage");
      expect(preview.articleType).toBe("none");
      expect((preview.jsonLd["@graph"] as Array<Record<string, unknown>>).map(node => node["@type"]))
        .toEqual(["CollectionPage"]);
    }
  });

  it("does not call an individual article a CollectionPage just because it belongs to a hub", () => {
    const doc = createCmsBlankDocument("guides", "tooth-decay-guide", "Tooth Decay");
    doc.seo.requestedPath = "/guides/tooth-decay-guide/";
    expect(getCmsSchemaPreview(doc).pageType).toBe("WebPage");
    expect(getCmsSchemaPreview(doc).articleType).toBe("Article");
    const other = createCmsBlankDocument("lifestyle", "healthy-habits", "Healthy Habits");
    expect(getCmsSchemaPreview(other).pageType).toBe("WebPage");
    expect(getCmsSchemaPreview(other).articleType).toBe("none");
  });

  it("preserves legacy non-default manual choices and their warnings", () => {
    const doc = createCmsBlankDocument("conditions", "sample", "Dental Conditions");
    doc.editorial = { categories: [], cornerstone: false,
      schemaPageType: "MedicalWebPage", schemaArticleType: "none" };
    const preview = getCmsSchemaPreview(doc);
    expect(preview.selectionMode).toBe("manual");
    expect(preview.pageType).toBe("MedicalWebPage");
    expect(preview.articleType).toBe("none");
    expect(preview.issues.some(issue => issue.level === "warning" && issue.message.includes("credentials"))).toBe(true);
  });

  it("treats old default values as automatic while preserving an explicitly chosen manual mode", () => {
    const doc = createCmsBlankDocument("guides", "example", "Example");
    doc.editorial = { categories: [], cornerstone: false,
      schemaPageType: "WebPage", schemaArticleType: "none" };
    expect(getCmsSchemaPreview(doc).selectionMode).toBe("auto");
    expect(getCmsSchemaPreview(doc).articleType).toBe("Article");
    doc.editorial.schemaMode = "manual";
    expect(getCmsSchemaPreview(doc).selectionMode).toBe("manual");
    expect(getCmsSchemaPreview(doc).articleType).toBe("none");
    doc.editorial.schemaMode = "auto";
    expect(getCmsSchemaPreview(doc).articleType).toBe("Article");
    expect(cmsDocumentSchema.safeParse(doc).success).toBe(true);
  });

  it("maintains existing FAQ and scholarly-content protections for manual overrides", () => {
    const doc = createCmsBlankDocument("faqs", "questions", "Questions");
    doc.editorial = { categories: [], cornerstone: false, schemaMode: "manual",
      schemaPageType: "FAQPage", schemaArticleType: "none" };
    expect(getCmsSchemaPreview(doc).issues.some(issue => issue.level === "error" && /FAQPage/.test(issue.message))).toBe(true);
    doc.editorial.schemaArticleType = "MedicalScholarlyArticle";
    expect(getCmsSchemaPreview(doc).issues.some(issue => issue.level === "error" && /MedicalScholarlyArticle/.test(issue.message))).toBe(true);
  });

  it("never publishes draft JSON-LD or invents reviewer credentials or authors", () => {
    const doc = createCmsBlankDocument("guides", "flossing-guide", "Flossing Guide");
    doc.seo.metaDescription = "Dental hygiene guidance";
    const preview = getCmsSchemaPreview(doc);
    const json = JSON.stringify(preview.jsonLd);
    expect(preview.publishable).toBe(false);
    expect(json).not.toContain("author");
    expect(json).not.toContain("reviewedBy");
    expect(json).not.toContain("datePublished");
    expect(json).not.toContain("dentasmart.ai");
  });
});
