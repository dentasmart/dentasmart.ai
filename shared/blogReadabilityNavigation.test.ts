import { describe, expect, it } from "vitest";
import { getBlogReadabilityTarget, getBlogReadabilityScrollDelta } from "./blogReadabilityNavigation";
import { blogDraftToCmsSeoDocument, type BlogSeoDraft } from "./blogSeoAdapter";
import { getCmsReadabilityEvidence } from "./cmsReadabilityEvidence";

const baseline: BlogSeoDraft = {
  title: "Readability parity", slug: "readability-parity",
  bodyHtml: "<h2>Overview</h2><p>Short dental care summary.</p>",
  editorMode: "wysiwyg",
  storySections: [
    { heading: "Problem", content: "People need clear dental health information." },
    { heading: "Empathy", content: "Patients should feel comfortable asking questions." },
    { heading: "Solution", content: "A qualified dentist can answer questions." },
    { heading: "Change", content: "Discuss treatment choices before deciding." },
    { heading: "Result", content: "Keep track of your dentist's recommendations." },
  ],
  primaryKeyword: "", secondaryKeywords: "", metaTitle: "", metaDescription: "",
  canonicalUrl: "", ogTitle: "", ogDescription: "", ogImage: "", featuredImage: "",
};
const longSentence = "Some patients may have multiple different concerns about their teeth and gums and would benefit from talking to a dental professional about the safest next steps for their individual situation.";
describe("blog readability edit navigation", () => {
  it("routes rich text feedback only to the active Rich Text Editor", () => {
    expect(getBlogReadabilityTarget("wysiwyg", "blog-body")).toEqual({
      mode: "wysiwyg", elementId: "blog-wysiwyg-content",
    });
    expect(getBlogReadabilityTarget("wysiwyg", "blog-story-1")).toBeNull();
    const doc = blogDraftToCmsSeoDocument({ ...baseline, bodyHtml: "<h2>Overview</h2><p>" + longSentence + "</p>" });
    const findings = getCmsReadabilityEvidence(doc);
    expect(findings.longSentences.length).toBeGreaterThan(0);
    expect(findings.longSentences[0].blockId).toBe("blog-body");
    expect(getBlogReadabilityTarget("wysiwyg", findings.longSentences[0].blockId)?.mode).toBe("wysiwyg");
  });
  it("routes each StoryBrand warning to exactly its original field", () => {
    for (let i=0; i<5; i++) expect(getBlogReadabilityTarget("structured", "blog-story-"+i)).toEqual({
      mode: "structured", elementId: "blog-story-section-"+i, sectionIndex:i,
    });
    const doc = blogDraftToCmsSeoDocument({
      ...baseline, editorMode:"structured", storySections:[
        baseline.storySections[0], {...baseline.storySections[1], content:longSentence}, ...baseline.storySections.slice(2),
      ],
    });
    const findings = getCmsReadabilityEvidence(doc);
    expect(findings.longSentences.some(item => item.blockId === "blog-story-1")).toBe(true);
    expect(getBlogReadabilityTarget("structured", "blog-body")).toBeNull();
  });
  it("rejects unknown or out-of-range blocks rather than pointing at unrelated fields", () => {
    for (const id of ["bogus", "blog-story-5", "blog-story--1", "blog-story-01", "blog-story-10"]) {
      expect(getBlogReadabilityTarget("structured", id)).toBeNull();
    }
  });
  it("does not modify article content while resolving destinations", () => {
    const before=JSON.stringify(baseline);
    getBlogReadabilityTarget("wysiwyg", "blog-body");
    getBlogReadabilityTarget("structured", "blog-story-4");
    expect(JSON.stringify(baseline)).toBe(before);
  });
});

describe("precise readability passage scroll alignment", () => {
  it("targets the selected sentence rather than the start of the editor", () => {
    const nearTop = getBlogReadabilityScrollDelta(200, 900);
    const deepInArticle = getBlogReadabilityScrollDelta(800, 900);
    expect(deepInArticle - nearTop).toBe(600);
    expect(deepInArticle).toBeGreaterThan(0);
  });
  it("accounts for the sticky header and short viewports", () => {
    expect(getBlogReadabilityScrollDelta(108, 900)).toBeLessThan(0);
    expect(getBlogReadabilityScrollDelta(250, 250, 108)).toBeGreaterThan(0);
    expect(getBlogReadabilityScrollDelta(100, 0)).toBe(0);
    expect(getBlogReadabilityScrollDelta(Number.NaN, 900)).toBe(0);
  });
});
