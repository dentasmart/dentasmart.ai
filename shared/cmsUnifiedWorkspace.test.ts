import { describe, expect, it } from "vitest";
import { cmsDocumentSchema } from "./cmsBlocks";
import { cmsAdminHubDefinitions, cmsHubDefinitions, cmsHubCoverage, cmsDraftStoragePath, createCmsBlankDocument, getCmsHub, isCmsAdminHub } from "./cmsHubRegistry";
import { cmsStructuredSources, getCmsStructuredSource } from "./cmsSourceImports";
import { getCmsReadingInsights } from "./cmsReadingInsights";
import { analyzeCmsSeo } from "./cmsSeoAnalysis";

describe("Unified 15-hub CMS workspace", () => {
  it("separates Blogs from the 14 admin Content Hubs without changing the public registry", () => {
    expect(cmsHubDefinitions).toHaveLength(15);
    expect(cmsAdminHubDefinitions).toHaveLength(14);
    expect(cmsAdminHubDefinitions.some(hub => hub.id === "articles")).toBe(false);
    expect(isCmsAdminHub("articles")).toBe(false);
    for (const hub of cmsAdminHubDefinitions) expect(isCmsAdminHub(hub.id)).toBe(true);
    expect(getCmsHub("articles")?.sourcePath).toBe("/oral-health-hub/");
  });
  it("covers every current Oral Health Hub destination once", () => {
    const definitions = cmsHubCoverage();
    expect(definitions).toHaveLength(15);
    expect(new Set(definitions.map(hub => hub.id)).size).toBe(15);
    expect(new Set(definitions.map(hub => hub.destination)).size).toBe(15);
    expect(definitions.map(hub => hub.id)).toEqual(cmsHubDefinitions.map(hub => hub.id));
    expect(definitions.some(hub => hub.id === "symptom-checker" && hub.importMode === "utility")).toBe(true);
  });

  it("ensures all hub identifiers resolve and have valid content type templates", () => {
    for (const hub of cmsHubDefinitions) {
      expect(getCmsHub(hub.id)).toBeDefined();
      const draft = createCmsBlankDocument(hub.id, "example-page", "Example page");
      expect(draft.hubId).toBe(hub.id);
      expect(draft.contentType).toBe(hub.contentType);
      expect(cmsDocumentSchema.safeParse(draft).success).toBe(true);
    }
    expect(getCmsHub("fake-hub")).toBeUndefined();
  });

  it("retains the old existing Condition route and isolates all other drafts", () => {
    expect(cmsDraftStoragePath("conditions", "toothache", true)).toBe("/conditions/toothache");
    expect(cmsDraftStoragePath("conditions", "new-draft", false)).toBe("/cms-workspace/conditions/new-draft");
    expect(cmsDraftStoragePath("guides", "brushing-guide", false)).toBe("/cms-workspace/guides/brushing-guide");
    expect(cmsDraftStoragePath("articles", "new-post", false)).toBe("/cms-workspace/articles/new-post");
  });

  it("requires urgent-care blocks for medical draft templates", () => {
    for (const hub of ["conditions", "symptoms"] as const) {
      const doc = createCmsBlankDocument(hub, "check", "New draft");
      expect(doc.blocks.some(block => block.type === "urgent_care")).toBe(true);
      expect(doc.blocks.some(block => block.type === "quick_answer")).toBe(true);
    }
    expect(createCmsBlankDocument("guides", "check", "Guide").blocks.some(b => b.type === "urgent_care")).toBe(false);
  });

  it("imports full source-backed Conditions without claiming clinical verification", () => {
    const doc = getCmsStructuredSource("conditions", "toothache");
    expect(doc?.hubId).toBe("conditions");
    expect(doc?.contentType).toBe("condition");
    expect(doc?.blocks.some(block => block.type === "causes")).toBe(true);
    expect(doc?.blocks.some(block => block.type === "urgent_care")).toBe(true);
    expect(cmsDocumentSchema.safeParse(doc).success).toBe(true);
  });

  it("imports Symptoms including emergency guidance and source question/answers", () => {
    const doc = getCmsStructuredSource("symptoms", "tooth-pain-when-biting");
    expect(doc?.hubId).toBe("symptoms");
    expect(doc?.contentType).toBe("symptom");
    expect(doc?.blocks.some(block => block.type === "faq")).toBe(true);
    expect(doc?.blocks.some(block => block.type === "urgent_care")).toBe(true);
    expect(cmsDocumentSchema.safeParse(doc).success).toBe(true);
  });

  it("imports Guides including steps and FAQ without rewriting source-controlled data", () => {
    const doc = getCmsStructuredSource("guides", "brushing-guide");
    expect(doc?.hubId).toBe("guides");
    expect(doc?.contentType).toBe("guide");
    expect(doc?.blocks.some(block => block.type === "rich_text")).toBe(true);
    expect(cmsDocumentSchema.safeParse(doc).success).toBe(true);
    expect(cmsStructuredSources.guides.length).toBeGreaterThan(0);
  });

  it("does not pretend unsupported sources are already importable", () => {
    expect(getCmsStructuredSource("treatments", "root-canal")).toBeNull();
    expect(getCmsStructuredSource("faqs", "overview")).toBeNull();
  });

  it("preserves optional private SEO/editorial JSON fields", () => {
    const doc = createCmsBlankDocument("articles", "my-blog", "My Article");
    const parsed = cmsDocumentSchema.parse({
      ...doc, seo: { ...doc.seo, synonyms: ["related dental phrase"] },
      editorial: { categories: ["oral health"], cornerstone: true,
        schemaPageType: "WebPage", schemaArticleType: "Article" },
    });
    expect(parsed.seo.synonyms).toEqual(["related dental phrase"]);
    expect(parsed.editorial?.cornerstone).toBe(true);
    expect(parsed.hubId).toBe("articles");
  });

  it("updates SEO synonyms and reading metrics without mutating page content", () => {
    const doc = getCmsStructuredSource("conditions", "toothache")!;
    const modified = { ...doc, seo: { ...doc.seo, synonyms: ["tooth pain"] } };
    const before = JSON.stringify(modified);
    const analysis = analyzeCmsSeo(modified);
    expect(analysis.synonyms).toHaveLength(1);
    expect(analysis.synonyms[0].phrase).toBe("tooth pain");
    const reading = getCmsReadingInsights(modified);
    expect(reading.words).toBeGreaterThan(0);
    expect(reading.readingMinutes).toBeGreaterThanOrEqual(1);
    expect(reading.prominentWords.length).toBeGreaterThan(0);
    expect(JSON.stringify(modified)).toBe(before);
  });
});
