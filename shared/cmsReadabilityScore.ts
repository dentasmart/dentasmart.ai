import type { CmsReadingInsights } from "./cmsReadingInsights";
import { getCmsReadabilityCheckStatus, type CmsReadabilityCheckId } from "./cmsReadabilityUiPolicy";

const IDS: CmsReadabilityCheckId[] = ["longSentences", "paragraphs", "structure", "openings"];

/** Four equally-weighted editorial checks. Not Flesch, clinical review, or a ranking score. */
export function getCmsReadabilityScore(reading: CmsReadingInsights): { score: number | null; passed: number; checks: number } {
  if (reading.words === 0) return { score: null, passed: 0, checks: IDS.length };
  const passed = IDS.filter(id => getCmsReadabilityCheckStatus(reading, id) === "good").length;
  return { score: passed * 25, passed, checks: IDS.length };
}
