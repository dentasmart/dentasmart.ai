import { describe, expect, it } from "vitest";
import { blogDraftToCmsSeoDocument, type BlogSeoDraft } from "./blogSeoAdapter";
import { getCmsReadingInsights } from "./cmsReadingInsights";
import { getCmsReadabilityScore } from "./cmsReadabilityScore";
import { getCmsReadabilityStructure } from "./cmsReadabilityStructure";
import { getCmsReadabilityCheckStatus } from "./cmsReadabilityUiPolicy";

const example: BlogSeoDraft = {
  title: "Blog readability test", slug: "blog-readability",
  bodyHtml: "", editorMode: "wysiwyg",
  storySections: [{ heading: "StoryBrand title", content: "A useful and clear test sentence." }],
  primaryKeyword: "", secondaryKeywords: "", metaTitle: "", metaDescription: "",
  canonicalUrl: "", ogTitle: "", ogDescription: "", ogImage: "", featuredImage: "",
};
const doc = (html: string) => blogDraftToCmsSeoDocument({ ...example, bodyHtml: html });

describe("original Blog Editor readability regression", () => {
  it("does not show a passing score for an empty new article", () => {
    const reading = getCmsReadingInsights(doc(""));
    expect(reading.words).toBe(0);
    expect(getCmsReadabilityScore(reading)).toEqual({score:null, passed:0, checks:4});
  });
  it("does not treat heading-only HTML as readable body content", () => {
    const onlyHeadings = doc("<h2>Overview</h2><h2>Next steps</h2>");
    const reading = getCmsReadingInsights(onlyHeadings);
    expect(reading.words).toBe(0);
    expect(getCmsReadabilityScore(reading).score).toBeNull();
    const sections = getCmsReadabilityStructure(onlyHeadings);
    expect(sections.contentHeadings).toBe(0);
    expect(sections.emptyHeadings).toBe(2);
  });
  it("recognizes actual H2/H3 sections in Rich Text Editor, not just structured CMS headings", () => {
    const draft = doc("<h2>Why teeth need attention</h2><p>Patients can ask questions about dental care.</p><h3>What to do next</h3><p>Speak with your dentist.</p>");
    expect(getCmsReadabilityStructure(draft)).toMatchObject({contentHeadings:2, emptyHeadings:0});
    const reading = getCmsReadingInsights(draft);
    expect(getCmsReadabilityCheckStatus(reading,"structure")).toBe("good");
    expect(getCmsReadabilityScore(reading)).toEqual({score:100, passed:4, checks:4});
  });
  it("flags empty inline headings even when other sections have body text", () => {
    const draft = doc("<h2>Overview</h2><p>Dental care starts with simple questions.</p><h2>Empty section</h2>");
    const structure = getCmsReadabilityStructure(draft);
    expect(structure.contentHeadings).toBe(1);
    expect(structure.emptyHeadings).toBe(1);
    expect(structure.emptySections.some(x=>x.heading==="Empty section")).toBe(true);
    expect(getCmsReadabilityCheckStatus(getCmsReadingInsights(draft),"structure")).toBe("improve");
  });
  it("switches between StoryBrand and WYSIWYG content instead of counting the inactive tab", () => {
    const rich = getCmsReadingInsights(doc(""));
    const structured = getCmsReadingInsights(blogDraftToCmsSeoDocument({ ...example, editorMode:"structured" }));
    expect(rich.words).toBe(0);
    expect(structured.words).toBeGreaterThan(0);
  });
  it("updates scores when a long paragraph is split and long sentences are shortened", () => {
    const longParagraph = Array.from({length:18}, ()=>"This explanation helps people understand their teeth.").join(" ");
    const before = getCmsReadabilityScore(getCmsReadingInsights(doc("<h2>Overview</h2><p>"+longParagraph+"</p>")));
    const after = getCmsReadabilityScore(getCmsReadingInsights(doc("<h2>Overview</h2><p>"+Array.from({length:9}, ()=>"This explanation helps people understand their teeth.").join(" ")+"</p><p>"+Array.from({length:9}, ()=>"This explanation helps people understand their teeth.").join(" ")+"</p>")));
    expect(before.score).toBeLessThan(after.score!);
  });
});
