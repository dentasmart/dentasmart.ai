import type { CmsReadingInsights } from "./cmsReadingInsights";

export type CmsReadabilityCheckId = "longSentences" | "paragraphs" | "structure" | "openings";
export type CmsReadabilityCheckStatus = "not_evaluated" | "good" | "improve";

/** Shared editorial thresholds used by both the Blog SEO checklist and Readability panel. */
export function passesCmsLongSentenceRate(percent: number): boolean {
  return Number.isFinite(percent) && percent >= 0 && percent <= 25;
}

export function passesCmsSectionStructure(words: number, populatedHeadings: number, emptyHeadings: number): boolean {
  if (!Number.isFinite(words) || words <= 0 || emptyHeadings !== 0) return false;
  if (words < 80) return true;
  if (words < 250) return populatedHeadings >= 1;
  return populatedHeadings >= 2;
}

/** Empty drafts cannot pass or fail reading checks without body text to assess. */
export function getCmsReadabilityCheckStatus(
  reading: CmsReadingInsights,
  id: CmsReadabilityCheckId,
): CmsReadabilityCheckStatus {
  if (reading.words === 0) return "not_evaluated";
  switch (id) {
    case "longSentences": return passesCmsLongSentenceRate(reading.longSentencePercent) ? "good" : "improve";
    case "paragraphs": return reading.longParagraphs === 0 ? "good" : "improve";
    case "structure": return passesCmsSectionStructure(reading.words, reading.contentHeadings, reading.emptyHeadings)
      ? "good" : "improve";
    case "openings": return reading.repeatedStarts <= 1 ? "good" : "improve";
  }
}
