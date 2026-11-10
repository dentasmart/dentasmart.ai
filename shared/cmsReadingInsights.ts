import { cmsSeoWords, extractCmsReadabilityContent } from "./cmsSeoAnalysis";
import type { CmsDocument } from "./cmsBlocks";
import { getCmsReadabilityStructure } from "./cmsReadabilityStructure";

/** Approximate editorial indicators, not literacy certification or clinical advice. */
export interface CmsReadingInsights {
  readingMinutes: number;
  words: number;
  sentences: number;
  longSentencePercent: number;
  longSentenceExamples: string[];
  longParagraphs: number;
  repeatedStarts: number;
  headingCount: number;
  contentHeadings: number;
  emptyHeadings: number;
  technicalWordPercent: number;
  prominentWords: Array<{ word: string; count: number }>;
  avgWordsPerSentence: number;
  easeEstimate: number | null;
}
const STOP = new Set("the and for with your that this have from into than then when what which while will where whose about their them there after before because also only each been more much some are was were you not but can could should would under over other they these those here how why who has had its use using help dentist dental".split(" "));

function syllables(value: string): number {
  const word = value.toLowerCase().replace(/[^a-z]/g, "");
  if (!word) return 1;
  const noE = word.length > 3 ? word.replace(/e$/, "") : word;
  return Math.max(1, (noE.match(/[aeiouy]+/g) || []).length);
}
function topicWord(value: string): string {
  const word = value.toLowerCase();
  if (word === "teeth") return "tooth";
  if (word.length > 4 && word.endsWith("s") && !/(ss|us|is)$/.test(word)) return word.slice(0, -1);
  return word;
}
export function getCmsReadingInsights(document: CmsDocument): CmsReadingInsights {
  // Reuse the identical body-only text extraction as Blog Editor SEO scoring.
  const content = extractCmsReadabilityContent(document);
  const structure = getCmsReadabilityStructure(document);
  const tokens = cmsSeoWords(content.text);
  const sentences = content.text.split(/[.!?]+(?:\s+|$)/)
    .map(sentence => ({ sentence: sentence.trim(), terms: cmsSeoWords(sentence) }))
    .filter(item => item.terms.length > 0);
  const longSentences = sentences.filter(item => item.terms.length > 20);
  const repeatKeys = sentences.map(item => item.terms.slice(0, 2).join(" "));
  const repeatedStarts = repeatKeys.filter((key, i) => i > 0 && key && key === repeatKeys[i - 1]).length;
  const longParagraphs = content.paragraphs.filter(paragraph => cmsSeoWords(paragraph).length > 75).length;
  const wordCount = tokens.length;
  const totalSyllables = tokens.reduce((sum, token) => sum + syllables(token), 0);
  const technicalWords = tokens.filter(word => syllables(word) >= 3).length;
  const easeEstimate = wordCount && sentences.length
    ? Math.max(0, Math.min(100, Math.round((206.835 - 1.015 * (wordCount / sentences.length)
      - 84.6 * (totalSyllables / wordCount)) * 10) / 10))
    : null;
  const frequency = new Map<string, number>();
  for (const token of tokens) {
    const word = topicWord(token);
    if (word.length < 4 || STOP.has(word)) continue;
    frequency.set(word, (frequency.get(word) ?? 0) + 1);
  }
  const prominentWords = Array.from(frequency.entries())
    .sort(([a, countA], [b, countB]) => countB - countA || a.localeCompare(b))
    .slice(0, 15)
    .map(([word, count]) => ({ word, count }));
  return {
    readingMinutes: wordCount ? Math.max(1, Math.ceil(wordCount / 220)) : 0,
    words: wordCount,
    sentences: sentences.length,
    longSentencePercent: sentences.length ? Math.round(1000 * longSentences.length / sentences.length) / 10 : 0,
    longSentenceExamples: longSentences.slice(0, 4).map(item => item.sentence.slice(0, 240)),
    longParagraphs, repeatedStarts, headingCount: content.headings.length,
    contentHeadings: structure.contentHeadings, emptyHeadings: structure.emptyHeadings,
    technicalWordPercent: wordCount ? Math.round(1000 * technicalWords / wordCount) / 10 : 0,
    prominentWords,
    avgWordsPerSentence: sentences.length ? Math.round(wordCount / sentences.length * 10) / 10 : 0,
    easeEstimate,
  };
}
