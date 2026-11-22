import { describe, expect, it } from "vitest";
import { getCmsSchemaPreview } from "./cmsSchemaPreview";
import { getCmsReadingInsights } from "./cmsReadingInsights";
import { analyzeCmsSeo, suggestCmsInternalLinks } from "./cmsSeoAnalysis";
import { cmsDocumentSchema } from "./cmsBlocks";
import { createCmsBlankDocument } from "./cmsHubRegistry";
import { getCmsStructuredSource } from "./cmsSourceImports";

describe("CMS dashboard/SEO refinements: pure content rules", () => {
  const source = getCmsStructuredSource("conditions", "toothache")!;
  it("uses identical word counts in SEO and Readability", () => {
    const reading = getCmsReadingInsights(source);
    const seo = analyzeCmsSeo(source);
    expect(reading.words).toBe(seo.metrics.wordCount);
    expect(reading.readingMinutes).toBeGreaterThanOrEqual(1);
    expect(reading.easeEstimate).toBeGreaterThanOrEqual(0);
    expect(reading.easeEstimate).toBeLessThanOrEqual(100);
  });
  it("reports examples and varied sentence openings without changing source", () => {
    const longSentence = "A toothache may involve several different causes and it is important to consult an actual dentist who can examine your symptoms and explain which treatment, if any, is required.";
    const doc = { ...source, blocks: [
      ...source.blocks,
      { id:"extra-guidance",type:"rich_text" as const,heading:"Patient guidance",html:"<p>" + longSentence + "</p>" },
    ] };
    const before = JSON.stringify(doc);
    const result = getCmsReadingInsights(doc);
    expect(result.longSentenceExamples.length).toBeGreaterThan(0);
    expect(result.longSentencePercent).toBeGreaterThan(0);
    expect(JSON.stringify(doc)).toBe(before);
  });
  it("groups tooth and teeth into one prominent word", () => {
    const doc = createCmsBlankDocument("guides","example","Example");
    doc.blocks = [{id:"hero",type:"hero",heading:"Example",subheading:""},
      {id:"body",type:"rich_text",heading:"Teeth",html:"<p>One tooth and two teeth help. Tooth and teeth.</p>"}];
    expect(getCmsReadingInsights(doc).prominentWords.find(w=>w.word==="tooth")?.count).toBe(4);
  });
  it("prioritizes focus-topic links rather than generic dental-related overlaps", () => {
    const results = suggestCmsInternalLinks(source, [
      { slug:"severe-toothache",title:"Severe Toothache",path:"/dental-emergencies/severe-toothache" },
      { slug:"emergencies-on-a-budget",title:"Dental Emergencies on a Budget: When to Call a Dentist",path:"/guides/emergencies-on-a-budget" },
      { slug:"your-oral-health",title:"Your Dental Health Guide",path:"/guides/your-oral-health" },
    ]);
    expect(results.map(result=>result.slug)).toContain("severe-toothache");
    expect(results.map(result=>result.slug)).not.toContain("emergencies-on-a-budget");
  });
  it("never injects draft schema or imaginary reviewer credentials", () => {
    const doc = createCmsBlankDocument("conditions","my-private-page","Toothache Test");
    doc.seo.metaDescription = "Test educational content";
    const preview = getCmsSchemaPreview(doc);
    expect(preview.publishable).toBe(false);
    expect(preview.jsonLd["@context"]).toBe("https://schema.org");
    const json = JSON.stringify(preview.jsonLd);
    expect(json).not.toContain("dentasmart.ai/conditions");
    expect(json).not.toContain("reviewedBy");
    expect(json).not.toContain("author");
  });
  it("warns when FAQPage is selected but no complete FAQ exists", () => {
    const doc = createCmsBlankDocument("faqs","questions","Questions");
    doc.editorial = { categories:[],cornerstone:false,schemaPageType:"FAQPage",schemaArticleType:"none" };
    const preview = getCmsSchemaPreview(doc);
    expect(preview.issues.some(issue=>issue.level==="error" && /FAQPage/.test(issue.message))).toBe(true);
  });
  it("uses only user-provided complete questions and answers in preview", () => {
    const doc = createCmsBlankDocument("faqs","questions","Questions");
    doc.editorial = { categories:[],cornerstone:false,schemaPageType:"FAQPage",schemaArticleType:"none" };
    doc.blocks.push({id:"faq",type:"faq",heading:"FAQs",items:[{question:"What is enamel?",answer:"It is the hard outer layer."}]});
    const preview = getCmsSchemaPreview(doc);
    const json = JSON.stringify(preview.jsonLd);
    expect(json).toContain("What is enamel?");
    expect(json).toContain("It is the hard outer layer.");
    expect(preview.issues.some(issue=>issue.level==="error")).toBe(false);
  });
  it("preserves independent X metadata as optional draft fields", () => {
    const doc = createCmsBlankDocument("articles","a-brief-post","A Brief Post");
    doc.seo = { ...doc.seo, ogTitle:"General share title",twitterTitle:"X-specific title",
      twitterDescription:"Different X summary" };
    const parsed = cmsDocumentSchema.parse(doc);
    expect(parsed.seo.twitterTitle).toBe("X-specific title");
    expect(parsed.seo.ogTitle).toBe("General share title");
  });
  it("rejects medical scholarly intent without separately verified eligibility", () => {
    const doc = createCmsBlankDocument("guides","how-to","How to");
    doc.editorial = { categories:[],cornerstone:false,schemaPageType:"WebPage",schemaArticleType:"MedicalScholarlyArticle" };
    expect(getCmsSchemaPreview(doc).issues.some(issue=>issue.level==="error")).toBe(true);
  });
});
