import { cmsDocumentSchema, type CmsBlock, type CmsDocument } from "./cmsBlocks";
import { createCmsBlankDocument, type CmsHubId } from "./cmsHubRegistry";
import { legacyConditionToCmsDocument } from "./cmsConditionAdapter";
import { conditionsData } from "../client/src/data/conditions";
import { symptomsData } from "../client/src/data/symptoms";
import { guidesData } from "../client/src/data/guides";

function escaped(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
const paragraph = (text: string) => "<p>" + escaped(text) + "</p>";
const related = (items: { slug: string; title: string }[], type: "conditions" | "symptoms" | "guides") =>
  items.map((item) => ({ title: item.title, url: "/" + type + "/" + item.slug }));

/** Full source-backed imports currently exist only for Conditions, Symptoms and Guides. */
export function getCmsStructuredSource(hubId: CmsHubId, slug: string): CmsDocument | null {
  if (hubId === "conditions") {
    const source = conditionsData[slug];
    if (!source) return null;
    const doc = legacyConditionToCmsDocument(source);
    return { ...doc, hubId };
  }
  if (hubId === "symptoms") {
    const source = symptomsData[slug];
    if (!source) return null;
    const blocks: CmsBlock[] = [
      { id: "hero", type: "hero", heading: source.title, subheading: source.heroSubheading },
      { id: "answer", type: "quick_answer", heading: "Quick Answer", answer: source.directAnswer || source.heroSubheading },
      { id: "urgent", type: "urgent_care", heading: "When to Get Care", items: [...source.whenToSeeDentist] },
      { id: "explanation", type: "rich_text", heading: "Understanding " + source.primaryKeyword,
        html: source.detailedExplanation.map(paragraph).join("") },
      { id: "causes", type: "causes", heading: "Possible Causes", items: source.possibleCauses.map(({ title, description }) => ({ title, description })) },
      { id: "care", type: "list", heading: "Self-Care Guidance", items: source.selfCareSteps },
      { id: "takeaways", type: "list", heading: "Key Takeaways", items: source.keyTakeaways },
      { id: "faq", type: "faq", heading: "Frequently Asked Questions", items: source.faqs.map(({ question, answer }) => ({ question, answer })) },
      { id: "related", type: "related_links", heading: "Related Reading", links: [
        ...related(source.relatedConditions, "conditions"), ...related(source.relatedSymptoms, "symptoms"), ...related(source.relatedGuides, "guides"),
      ] },
    ];
    const candidate = {
      ...createCmsBlankDocument(hubId, slug, source.title),
      templateKey: "symptom-standard", blocks,
      seo: { focusKeyword: source.primaryKeyword, secondaryKeywords: source.secondaryKeywords,
        metaTitle: source.metaTitle, metaDescription: source.metaDescription },
      reviewer: {}, // Source attribution must not be treated as verified clinical approval.
    };
    return cmsDocumentSchema.parse(candidate);
  }
  if (hubId === "guides") {
    const source = guidesData[slug];
    if (!source) return null;
    const blocks: CmsBlock[] = [
      { id: "hero", type: "hero", heading: source.title, subheading: source.heroSubheading },
      { id: "intro", type: "rich_text", heading: "Introduction", html: paragraph(source.introduction) },
      ...source.steps.map((step, index) => ({
        id: "step-" + index, type: "rich_text" as const, heading: step.title,
        html: paragraph(step.content) + (step.tip ? paragraph("Tip: " + step.tip) : ""),
      })),
      { id: "mistakes", type: "causes", heading: "Common Mistakes", items: source.commonMistakes.map((item) => ({
        title: item.mistake, description: item.correction,
      })) },
      { id: "takeaways", type: "list", heading: "Key Takeaways", items: source.keyTakeaways },
      { id: "faq", type: "faq", heading: "Frequently Asked Questions", items: source.faqs.map(({ question, answer }) => ({ question, answer })) },
      { id: "related", type: "related_links", heading: "Related Reading", links: [
        ...related(source.relatedConditions, "conditions"), ...related(source.relatedSymptoms, "symptoms"), ...related(source.relatedGuides, "guides"),
      ] },
    ];
    const candidate = {
      ...createCmsBlankDocument(hubId, slug, source.title),
      templateKey: "guide-standard", blocks,
      seo: { focusKeyword: source.primaryKeyword, secondaryKeywords: source.secondaryKeywords,
        metaTitle: source.metaTitle, metaDescription: source.metaDescription },
      reviewer: {},
      editorial: { categories: source.category ? [source.category] : [], cornerstone: false,
        schemaPageType: "WebPage" as const, schemaArticleType: "Article" as const },
    };
    return cmsDocumentSchema.parse(candidate);
  }
  return null;
}

export const cmsStructuredSources = {
  conditions: Object.values(conditionsData).map(({ slug, title }) => ({ slug, title, publicPath: "/conditions/" + slug })),
  symptoms: Object.values(symptomsData).map(({ slug, title }) => ({ slug, title, publicPath: "/symptoms/" + slug })),
  guides: Object.values(guidesData).map(({ slug, title }) => ({ slug, title, publicPath: "/guides/" + slug })),
};
