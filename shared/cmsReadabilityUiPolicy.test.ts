import { describe, expect, it } from "vitest";
import { createCmsBlankDocument } from "./cmsHubRegistry";
import { getCmsReadingInsights } from "./cmsReadingInsights";
import { getCmsReadabilityCheckStatus, type CmsReadabilityCheckId } from "./cmsReadabilityUiPolicy";

const ids: CmsReadabilityCheckId[] = ["longSentences", "paragraphs", "structure", "openings"];

describe("CMS readability empty-content feedback", () => {
  it("marks all checks as not evaluated for a heading-only draft", () => {
    const doc = createCmsBlankDocument("guides", "empty-qa", "Readability QA");
    doc.blocks = [{ id: "heading-only", type: "rich_text", heading: "Overview", html: "" }];
    const reading = getCmsReadingInsights(doc);
    expect(reading.words).toBe(0);
    expect(reading.headingCount).toBe(1);
    for (const id of ids) expect(getCmsReadabilityCheckStatus(reading, id)).toBe("not_evaluated");
  });

  it("evaluates checks normally once actual body text is added", () => {
    const doc = createCmsBlankDocument("guides", "with-text", "Readability QA");
    doc.blocks = [{ id: "overview", type: "rich_text", heading: "Overview",
      html: "<p>Short sentences help readers understand instructions. Keep the explanation clear.</p>" }];
    const reading = getCmsReadingInsights(doc);
    expect(reading.words).toBeGreaterThan(0);
    for (const id of ids) expect(getCmsReadabilityCheckStatus(reading, id)).toBe("good");
  });

  it("preserves attention states for real issues in populated drafts", () => {
    const doc = createCmsBlankDocument("guides", "with-issues", "Readability QA");
    doc.blocks = [{ id: "overview", type: "rich_text", heading: "Overview",
      html: "<p>Readers should carefully consider all the important information about their particular situation and consult a qualified dental professional before making a decision because different symptoms can require very different approaches.</p>" }];
    const reading = getCmsReadingInsights(doc);
    expect(reading.words).toBeGreaterThan(0);
    expect(getCmsReadabilityCheckStatus(reading, "longSentences")).toBe("improve");
    expect(getCmsReadabilityCheckStatus({ ...reading, longParagraphs: 1 }, "paragraphs")).toBe("improve");
    expect(getCmsReadabilityCheckStatus({ ...reading, words: 250, headingCount: 1 }, "structure")).toBe("improve");
    expect(getCmsReadabilityCheckStatus({ ...reading, repeatedStarts: 2 }, "openings")).toBe("improve");
  });
});
