import type { ConditionData } from "../client/src/data/conditions";
import type { CmsBlock, CmsDocument } from "./cmsBlocks";

/** Safely convert legacy plaintext into TipTap-compatible paragraphs. */
function escapeText(value: string): string {
  return value.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Read-only adapter for the 17 source-controlled Conditions.
 *
 * Creating this document never updates the public site or database. Once CMS
 * drafts/publishing exist, the same adapter will supply the import baseline.
 * Legacy reviewer fields are editorial history, NOT evidence of verification.
 */
export function legacyConditionToCmsDocument(condition: ConditionData): CmsDocument {
  const blocks: CmsBlock[] = [
    { id: "hero", type: "hero", heading: condition.heroHeading, subheading: condition.heroSubheading },
    { id: "answer", type: "quick_answer", heading: "Quick Answer", answer: condition.directAnswer },
    { id: "urgent", type: "urgent_care", heading: "When to Seek Dental Care", items: [...condition.whenToSeeDentist] },
    {
      id: "explanation", type: "rich_text",
      heading: "Understanding " + condition.primaryKeyword,
      html: condition.detailedExplanation.map((text) => `<p>${escapeText(text)}</p>`).join(""),
    },
    { id: "causes", type: "causes", heading: "Common Causes", items: condition.causes.map((cause) => ({ ...cause })) },
    { id: "symptoms", type: "symptoms", heading: "Signs and Symptoms", items: condition.symptoms.map((symptom) => ({ ...symptom })) },
    { id: "takeaways", type: "list", heading: "Key Takeaways", items: [...condition.keyTakeaways] },
    { id: "faq", type: "faq", heading: "Frequently Asked Questions", items: condition.faqs.map((faq) => ({ ...faq })) },
    {
      id: "related", type: "related_links", heading: "Related Topics",
      links: [
        ...condition.relatedConditions.map((related) => ({ title: related.title, url: `/conditions/${related.slug}` })),
        ...condition.relatedSymptoms.map((related) => ({ title: related.title, url: `/symptoms/${related.slug}` })),
        ...condition.relatedGuides.map((related) => ({ title: related.title, url: `/guides/${related.slug}` })),
      ],
    },
  ];
  return {
    contentType: "condition",
    slug: condition.slug,
    title: condition.title,
    templateKey: "condition-standard",
    templateVersion: 1,
    blocks,
    images: {},
    seo: {
      focusKeyword: condition.primaryKeyword,
      secondaryKeywords: [...condition.secondaryKeywords],
      metaTitle: condition.metaTitle,
      metaDescription: condition.metaDescription,
    },
    reviewer: {
      // Existing source labels must still pass the public profile/review gate.
      name: condition.reviewedBy || undefined,
      credentials: condition.reviewedByCredentials || undefined,
      lastReviewed: condition.lastReviewed || undefined,
    },
    tags: [],
  };
}
