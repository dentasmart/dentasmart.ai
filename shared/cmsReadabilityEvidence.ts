import type { CmsBlock, CmsDocument } from "./cmsBlocks";
import { cmsSeoPlainText, cmsSeoWords } from "./cmsSeoAnalysis";
import { getCmsReadabilityStructure } from "./cmsReadabilityStructure";

/** Trace editorial warnings back to an exact editable CMS block and quote. */
export interface CmsReadingExcerpt {
  blockId: string;
  section: string;
  excerpt: string;
  words: number;
  opening?: string;
}
export interface CmsReadingEvidence {
  longSentences: CmsReadingExcerpt[];
  longParagraphs: CmsReadingExcerpt[];
  repeatedStarts: CmsReadingExcerpt[];
  structure: CmsReadingExcerpt[];
}
function textPieces(block: CmsBlock): string[] {
  switch(block.type) {
    case "hero": return [block.subheading];
    case "rich_text": {
      const html = block.html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi," ")
        .replace(/<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]\s*>/gi, " ");
      return html.split(/<\/(?:p|li|div|blockquote)\s*>/gi).map(cmsSeoPlainText);
    }
    case "quick_answer": return [block.answer];
    case "urgent_care": case "list": return block.items;
    case "causes": return block.items.flatMap(item => [item.description]);
    case "symptoms": return block.items.map(item => item.text);
    case "faq": return block.items.map(item => item.answer);
    case "table": return block.rows.flat();
    case "cta": return [block.description];
    case "related_links": case "image": return [];
  }
}
export function getCmsReadabilityEvidence(document: CmsDocument): CmsReadingEvidence {
  const result: CmsReadingEvidence = { longSentences: [], longParagraphs: [], repeatedStarts: [], structure: [] };
  const structure = getCmsReadabilityStructure(document);
  const totalWords = cmsSeoWords(document.blocks.flatMap(textPieces).join(" ")).length;
  // The evidence and the score must use the same structural thresholds.
  const headingsNeedAttention = totalWords >= 80 &&
    (structure.contentHeadings === 0 || (totalWords >= 250 && structure.contentHeadings < 2));
  for (const empty of structure.emptySections) {
    result.structure.push({ blockId: empty.blockId, section: empty.heading,
      excerpt: empty.heading, words: 0 });
  }
  let previousOpening = "";
  for (let index = 0; index < document.blocks.length; index++) {
    const block = document.blocks[index];
    const section = "heading" in block && block.heading?.trim()
      ? block.heading.trim() : `Section ${index+1} · ${block.type.replace(/_/g, " ")}`;
    const pieces = textPieces(block).map(value => value.trim()).filter(Boolean);
    for (const paragraph of pieces) {
      const words = cmsSeoWords(paragraph).length;
      if (words > 75 && result.longParagraphs.length < 20) {
        result.longParagraphs.push({ blockId: block.id, section, excerpt: paragraph, words });
      }
      const sentences = paragraph.split(/(?<=[.!?])\s+/).map(x => x.trim()).filter(Boolean);
      for (const sentence of sentences) {
        const terms = cmsSeoWords(sentence).length;
        if (terms > 20 && result.longSentences.length < 25) {
          result.longSentences.push({ blockId: block.id, section, excerpt: sentence, words: terms });
        }
        const opening = cmsSeoWords(sentence).slice(0, 2).join(" ");
        if (opening && opening === previousOpening && result.repeatedStarts.length < 20) {
          result.repeatedStarts.push({ blockId: block.id, section, excerpt: sentence,
            words: terms, opening: sentence.trim().split(/\s+/).slice(0, 2).join(" ") });
        }
        previousOpening = opening;
      }
    }
    // A Blog Editor rich_text block stores its real H2s inside HTML; do not
    // call the whole block "unheaded" when those headings were counted.
    const hasHeading = "heading" in block && Boolean(block.heading?.trim());
    const hasEmbeddedHeading = block.type === "rich_text" &&
      /<h[2-6]\b[^>]*>[\s\S]*?<\/h[2-6]\s*>/i.test(block.html);
    if (block.type !== "hero" && headingsNeedAttention && !hasHeading && !hasEmbeddedHeading && pieces.length) {
      // Anchor the missing-heading suggestion to a *real paragraph*, not the
      // concatenated block (which may contain hundreds of separately formatted paragraphs).
      const paragraph = pieces[0];
      result.structure.push({ blockId: block.id, section, excerpt: paragraph,
        words: cmsSeoWords(paragraph).length });
    }
  }
  return result;
}
