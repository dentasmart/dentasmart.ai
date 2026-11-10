/**
 * Editorial reference copy only: these labels do not influence calculations,
 * score weights, statuses, saved CMS documents, or publication.
 * Keep aligned with the established thresholds in cmsReadabilityUiPolicy.ts
 * and cmsSeoAnalysis.ts if those rules are ever changed separately.
 */
export const CMS_READABILITY_TARGETS = {
  readingMinutes: "Estimate only · no fixed SEO target.",
  bodyWords: "No fixed ideal word count; prioritize useful, accurate content.",
  averageSentence: "Suggested: 22 words or fewer on average.",
  longSentences: "Suggested: 25% or fewer of sentences longer than 20 words.",
  paragraphs: "Suggested: 0 paragraphs longer than 75 words.",
  structure: "Suggested: no empty headings; longer pages benefit from 2+ populated sections.",
  openings: "Suggested: no more than 1 adjacent repeated two-word sentence opening.",
  flesch: "Reference: 60+ generally reads more easily; not a Google requirement.",
  technical: "Advisory only · no fixed SEO percentage. Preserve correct dental terminology.",
  topicWords: "Topic overview only · no fixed SEO keyword-frequency target.",
  seoSentences: "Suggested: average 22 words or fewer, AND at most 25% longer than 20 words.",
} as const;

/** Display-only copy for existing SEO checklist items. */
export function cmsSeoReadabilityTarget(id: string): string | null {
  if (id === "sentences") return CMS_READABILITY_TARGETS.seoSentences;
  if (id === "paragraphs") return CMS_READABILITY_TARGETS.paragraphs;
  if (id === "sections") return CMS_READABILITY_TARGETS.structure;
  return null;
}
