import type { CmsBlock, CmsDocument } from "./cmsBlocks";

export interface CmsEmptyHeading {
  blockId: string;
  heading: string;
}
export interface CmsReadabilityStructure {
  contentHeadings: number;
  emptyHeadings: number;
  emptySections: CmsEmptyHeading[];
}

/** Visible text only, for heuristic section review (never used for HTML rendering). */
function plainRichText(html: string): string {
  return html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&(?:nbsp|#160|#x[aA]0);/gi, " ")
    .trim();
}

/** Treat H2–H6 authored *inside* the existing Rich Text Editor as real headings. */
function embeddedRichTextHeadings(html: string): Array<{ heading: string; hasContent: boolean }> {
  const cleaned = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, " ");
  const matches = Array.from(cleaned.matchAll(/<h([2-6])\b[^>]*>([\s\S]*?)<\/h\1\s*>/gi));
  return matches.map((match, i) => {
    const nextIndex = i + 1 < matches.length ? matches[i + 1].index! : cleaned.length;
    const following = cleaned.slice(match.index! + match[0].length, nextIndex);
    return { heading: plainRichText(match[2]), hasContent: !!plainRichText(following) };
  }).filter(item => !!item.heading);
}

/** A section heading is only meaningful when its CMS block has actual visible content. */
function hasSectionContent(block: CmsBlock): boolean {
  switch (block.type) {
    case "hero": return false;
    case "quick_answer": return Boolean(block.answer.trim());
    case "urgent_care":
    case "list": return block.items.some(item => Boolean(item.trim()));
    case "rich_text": return Boolean(plainRichText(block.html.replace(/<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]\s*>/gi, " ")));
    case "causes": return block.items.some(item => Boolean(item.title.trim() || item.description.trim()));
    case "symptoms": return block.items.some(item => Boolean(item.text.trim()));
    case "faq": return block.items.some(item => Boolean(item.question.trim() && item.answer.trim()));
    case "related_links": return block.links.some(item => Boolean(item.title.trim() && item.url.trim()));
    case "image": return Boolean(block.image?.url?.trim());
    case "table": return block.rows.some(row => row.some(cell => Boolean(cell.trim())));
    case "cta": return Boolean(block.description.trim() || (block.buttonLabel.trim() && block.buttonUrl.trim()));
  }
}

export function getCmsReadabilityStructure(document: CmsDocument): CmsReadabilityStructure {
  const result: CmsReadabilityStructure = { contentHeadings: 0, emptyHeadings: 0, emptySections: [] };
  for (const block of document.blocks) {
    if (block.type === "hero") continue;

    if ("heading" in block && block.heading?.trim()) {
      if (hasSectionContent(block)) {
        result.contentHeadings++;
      } else {
        result.emptyHeadings++;
        result.emptySections.push({ blockId: block.id, heading: block.heading.trim() });
      }
    }

    if (block.type === "rich_text") {
      // In the original Blog Editor, headings live in the saved bodyHtml rather
      // than the CMS block.heading property. Count their *own* content, not all
      // of the following article. An empty H2 is a warning, never a pass.
      for (const entry of embeddedRichTextHeadings(block.html)) {
        if (entry.hasContent) result.contentHeadings++;
        else {
          result.emptyHeadings++;
          result.emptySections.push({ blockId: block.id, heading: entry.heading });
        }
      }
    }
  }
  return result;
}
