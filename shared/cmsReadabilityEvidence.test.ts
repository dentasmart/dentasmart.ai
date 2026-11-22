import { describe, expect, it } from "vitest";
import { blogDraftToCmsSeoDocument, type BlogSeoDraft } from "./blogSeoAdapter";
import { getCmsReadabilityEvidence } from "./cmsReadabilityEvidence";
import { getCmsReadingInsights } from "./cmsReadingInsights";
import { getCmsReadabilityCheckStatus } from "./cmsReadabilityUiPolicy";
import { getCmsReadabilityScore } from "./cmsReadabilityScore";
import { findCmsReviewTextSpan } from "./cmsReviewHighlight";

const template: BlogSeoDraft = {
  title: "Readability test", slug: "readability-test", editorMode: "wysiwyg",
  bodyHtml: "", storySections: [], primaryKeyword: "", secondaryKeywords: "",
  metaTitle: "", metaDescription: "", canonicalUrl: "",
  ogTitle: "", ogDescription: "", ogImage: "", featuredImage: "",
};
const documentFor = (html: string) => blogDraftToCmsSeoDocument({ ...template, bodyHtml: html });

describe("readability structure evidence and complete passage highlighting", () => {
  it("does not flag an article with five populated rich-text H2s as unheaded", () => {
    const paragraph = "Patients can brush gently to maintain clean teeth and healthy gums. They should discuss any discomfort with a dental professional when needed.";
    const html = Array.from({ length: 5 }, (_, i) =>
      `<h2>Section ${i + 1}</h2>` + Array.from({ length: 7 }, () => `<p>${paragraph}</p>`).join("")
    ).join("");
    const doc = documentFor(html);
    const reading = getCmsReadingInsights(doc);
    const evidence = getCmsReadabilityEvidence(doc);
    expect(reading.words).toBeGreaterThan(500);
    expect(reading.contentHeadings).toBe(5);
    expect(reading.emptyHeadings).toBe(0);
    expect(getCmsReadabilityCheckStatus(reading, "structure")).toBe("good");
    expect(evidence.structure).toHaveLength(0);
    expect(evidence.longParagraphs).toHaveLength(0);
  });

  it("retains all of a long paragraph as the selection target", () => {
    const first = "An explanation about oral health";
    const second = Array.from({ length: 90 }, (_, n) => `word${n}`).join(" ");
    const text = first + " " + second + ".";
    const evidence = getCmsReadabilityEvidence(documentFor(
      `<h2>Oral health</h2><p><strong>${first}</strong> ${second}.</p>`
    ));
    expect(evidence.longParagraphs).toHaveLength(1);
    expect(evidence.longParagraphs[0].excerpt).toBe(text);
    expect(findCmsReviewTextSpan(text, evidence.longParagraphs[0].excerpt))
      .toEqual({ from: 0, to: text.length });
  });

  it("maps whitespace differences to a complete selected paragraph", () => {
    const text = "Full  paragraph with\n several     spaces and an ending.";
    const excerpt = "Full paragraph with several spaces and an ending.";
    const range = findCmsReviewTextSpan(text, excerpt);
    expect(range).not.toBeNull();
    expect(text.slice(range!.from, range!.to)).toBe(text);
  });

  it("points empty heading evidence at the real H2 text", () => {
    const doc = documentFor("<h2>Useful section</h2><p>This section is populated.</p><h2>Unfinished heading</h2>");
    const structure = getCmsReadabilityEvidence(doc).structure;
    const empty = structure.find(item => item.section === "Unfinished heading");
    expect(empty?.excerpt).toBe("Unfinished heading");
    expect(empty?.words).toBe(0);
    expect(getCmsReadabilityCheckStatus(getCmsReadingInsights(doc), "structure")).toBe("improve");
  });

  it("points an unstructured long article to a single real paragraph, not the full block", () => {
    const paragraph = "Users can review their oral health and discuss concerns with a dentist.";
    const doc = documentFor(Array.from({ length: 30 }, () => `<p>${paragraph}</p>`).join(""));
    const evidence = getCmsReadabilityEvidence(doc);
    expect(evidence.structure).toHaveLength(1);
    expect(evidence.structure[0].excerpt).toBe(paragraph);
    expect(evidence.structure[0].words).toBeLessThan(75);
    expect(getCmsReadabilityCheckStatus(getCmsReadingInsights(doc), "structure")).toBe("improve");
  });

  it("keeps the four-check readability score distinct from individual sentence advice", () => {
    const doc = documentFor(
      "<h2>Benefits</h2><p>Patients should brush and floss every day. Dentists can answer questions.</p>" +
      "<h2>Practical steps</h2><p>Early advice can help. Ask a professional about changes.</p>"
    );
    expect(getCmsReadabilityScore(getCmsReadingInsights(doc)).score).toBe(100);
  });
});
