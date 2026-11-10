import { describe, expect, it } from "vitest";
import { createCmsBlankDocument } from "./cmsHubRegistry";
import { getCmsReadabilityEvidence } from "./cmsReadabilityEvidence";
import { getCmsReadingInsights } from "./cmsReadingInsights";
import { getCmsReadabilityCheckStatus } from "./cmsReadabilityUiPolicy";
import { getCmsReadabilityStructure } from "./cmsReadabilityStructure";
import { findCmsReviewTextSpan } from "./cmsReviewHighlight";
import { analyzeCmsSeo } from "./cmsSeoAnalysis";

const long = "Patients should know that a dental checkup is an opportunity to discuss changes in their mouth and ask questions about symptoms that seem unusual or difficult to explain.";
const second = "Patients should share when discomfort started, whether it has changed over time, and which daily activities are affected so the dental professional can decide what examination may be appropriate.";
const short = "Patients should keep a simple record of questions.";
const regular = "A dentist can explain possible causes, discuss what additional information may be needed, and outline next steps after examining the patient.";
const last = "If severe swelling makes breathing or swallowing difficult, seek emergency medical care immediately.";
const paragraph = [long, second, short, regular, last].join(" ");

function withContent(html: string) {
  const doc = createCmsBlankDocument("guides", "readability-qa", "Readability QA");
  doc.blocks = [
    { type: "rich_text", id: "overview", heading: "Overview", html },
    { type: "quick_answer", id: "empty-answer", heading: "Quick Answer", answer: "" },
    { type: "list", id: "empty-list", heading: "Checklist", items: [] },
  ];
  return doc;
}

describe("CMS readability QA refinements", () => {
  it("shows repeated openings and exact editable section excerpts", () => {
    const doc = withContent("<p>" + paragraph + "</p>");
    const evidence = getCmsReadabilityEvidence(doc);
    expect(evidence.repeatedStarts.length).toBe(2);
    expect(evidence.repeatedStarts.every(item => item.blockId === "overview")).toBe(true);
    expect(evidence.repeatedStarts[0].opening).toBe("Patients should");
    expect(evidence.repeatedStarts[0].excerpt).toContain("Patients should share");
    expect(evidence.longSentences.some(item => item.blockId === "overview")).toBe(true);
    expect(evidence.longParagraphs[0].blockId).toBe("overview");
  });

  it("locates text without replacing or modifying the document", () => {
    const before = "<p>" + long + "</p>";
    const doc = withContent(before);
    const found = findCmsReviewTextSpan(long, long);
    expect(found).toEqual({ from: 0, to: long.length });
    expect(findCmsReviewTextSpan(long, "This does not occur in the text.")).toBeNull();
    expect(doc.blocks[0].type === "rich_text" ? doc.blocks[0].html : "").toBe(before);
  });

  it("aligns SEO sentence points with the long-sentence warning", () => {
    const doc = withContent("<p>" + paragraph + "</p>");
    const reading = getCmsReadingInsights(doc);
    const seo = analyzeCmsSeo(doc);
    expect(reading.longSentencePercent).toBeGreaterThan(25);
    expect(seo.metrics.longSentencePercent).toBe(reading.longSentencePercent);
    expect(seo.checks.find(check => check.id === "sentences")?.status).toBe("improve");
    expect(seo.checks.find(check => check.id === "sentences")?.points).toBe(0);
    expect(getCmsReadabilityCheckStatus(reading, "longSentences")).toBe("improve");
  });

  it("does not treat empty placeholder headings as organized content", () => {
    const doc = withContent("<p>" + paragraph + "</p>");
    const structure = getCmsReadabilityStructure(doc);
    expect(structure.contentHeadings).toBe(1);
    expect(structure.emptyHeadings).toBe(2);
    expect(getCmsReadabilityCheckStatus(getCmsReadingInsights(doc), "structure")).toBe("improve");
    const evidence = getCmsReadabilityEvidence(doc);
    expect(evidence.structure.some(item => item.blockId === "empty-answer")).toBe(true);
    expect(analyzeCmsSeo(doc).checks.find(check => check.id === "sections")?.status).toBe("improve");
  });

  it("does not count an unfinished draft image as an SEO image or crash readability", () => {
    const doc = withContent("<p>A short educational draft paragraph.</p>");
    doc.blocks.push({ type: "image", id: "empty-image", image: null });
    const seo = analyzeCmsSeo(doc);
    expect(seo.metrics.imageCount).toBe(0);
    expect(getCmsReadabilityStructure(doc).contentHeadings).toBe(1);
  });

  it("allows a genuinely short page with one populated heading and no placeholders", () => {
    const doc = withContent("<p>Clear writing helps patients follow simple advice.</p>");
    doc.blocks = doc.blocks.slice(0, 1);
    const reading = getCmsReadingInsights(doc);
    expect(reading.words).toBeGreaterThan(0);
    expect(getCmsReadabilityCheckStatus(reading, "structure")).toBe("good");
    expect(analyzeCmsSeo(doc).checks.find(check => check.id === "sections")?.status).toBe("good");
  });
});
