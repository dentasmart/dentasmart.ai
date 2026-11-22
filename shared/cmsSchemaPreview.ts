import type { CmsDocument } from "./cmsBlocks";
import { getCmsHub } from "./cmsHubRegistry";
import { cmsSeoPlainText, extractCmsSeoContent } from "./cmsSeoAnalysis";
import { assessCmsReviewerDraft } from "./cmsOrganizationReview";
import { parseManualCmsSchema } from "./cmsSchemaOverride";

export type CmsSchemaIssue = { level: "error" | "warning" | "passed"; message: string };
export interface CmsSchemaPreview {
  jsonLd: Record<string, unknown>;
  automaticJsonLd: Record<string, unknown>;
  issues: CmsSchemaIssue[];
  recommendedPage: "WebPage" | "MedicalWebPage" | "CollectionPage" | "FAQPage";
  recommendedArticle: "none" | "Article" | "BlogPosting";
  pageType: "WebPage" | "MedicalWebPage" | "CollectionPage" | "FAQPage";
  articleType: "none" | "Article" | "BlogPosting" | "MedicalScholarlyArticle";
  selectionMode: "auto" | "manual";
  recommendationReason: string;
  manualError?: string;
  reviewerExpected: boolean;
  reviewDateExpected: boolean;
  manualMissingReviewer: boolean;
  manualMissingReviewDate: boolean;
  publishable: false;
}

/**
 * Draft-only structural inspection. Existing server-owned production JSON-LD
 * is unchanged; this output MUST NOT be injected into public HTML.
 * Legacy manually selected schema types remain readable and can be converted
 * to free-form manual JSON-LD without discarding saved drafts.
 */
export function getCmsSchemaPreview(document: CmsDocument): CmsSchemaPreview {
  const medical = document.contentType === "condition" || document.contentType === "symptom";
  // Hub membership alone never makes an individual article a CollectionPage.
  const hubLanding = !!document.hubId && !!getCmsHub(document.hubId) &&
    document.seo.requestedPath === getCmsHub(document.hubId)?.sourcePath;
  const educationalArticle = ["condition", "symptom", "guide", "treatment", "cost"].includes(document.contentType);
  const recommendedPage = hubLanding ? "CollectionPage" as const : "WebPage" as const;
  const recommendedArticle = hubLanding ? "none" as const : educationalArticle ? "Article" as const : "none" as const;
  const recommendationReason = hubLanding
    ? "This draft explicitly targets a registered content-hub landing URL."
    : educationalArticle
      ? "This is an individual educational page; Article is sufficient for normal dental content."
      : "A general WebPage is the safest choice until this page's purpose is confirmed.";
  const editorial = document.editorial;
  const legacyOverride = !!editorial && (editorial.schemaPageType !== "WebPage" || editorial.schemaArticleType !== "none");
  const selectionMode = editorial?.schemaMode ?? (legacyOverride ? "manual" : "auto");
  const legacyPage = selectionMode === "manual" ? editorial?.schemaPageType ?? recommendedPage : recommendedPage;
  const legacyArticle = selectionMode === "manual" ? editorial?.schemaArticleType ?? recommendedArticle : recommendedArticle;
  const faq = document.blocks.filter(block => block.type === "faq").flatMap(block => block.type === "faq"
    ? block.items.filter(item => item.question.trim() && item.answer.trim()).map(item => ({
      "@type": "Question",
      name: item.question.trim(),
      acceptedAnswer: { "@type": "Answer", text: cmsSeoPlainText(item.answer) },
    })) : []);
  const body = extractCmsSeoContent(document);
  const reviewer = document.reviewer;
  const hasReviewerFields = Boolean(reviewer && Object.values(reviewer).some(v => typeof v === "string" && v.trim()));
  const reviewerAssessment = hasReviewerFields ? assessCmsReviewerDraft(reviewer) : null;
  const reviewerExpected = Boolean(reviewerAssessment?.fieldsComplete);
  const reviewDateExpected = reviewerExpected && Boolean(reviewer?.lastReviewed?.trim());

  function buildGraph(pageType: CmsSchemaPreview["pageType"], articleType: CmsSchemaPreview["articleType"]): Record<string, unknown> {
    const graph: Record<string, unknown>[] = [{
      "@type": pageType,
      name: document.title,
      ...(document.seo.metaDescription.trim() ? { description: document.seo.metaDescription.trim() } : {}),
      ...(pageType === "FAQPage" && faq.length > 0 ? { mainEntity: faq } : {}),
      ...(reviewerExpected ? {
        lastReviewed: reviewer!.lastReviewed!.trim(),
        reviewedBy: {
          "@type": "Person",
          name: reviewer!.name!.trim(),
          jobTitle: reviewer!.credentials!.trim(),
          ...(reviewer!.shortBio?.trim() ? { description: reviewer!.shortBio.trim() } : {}),
          url: reviewer!.profileUrl!.trim(),
        },
      } : {}),
    }];
    if (articleType !== "none") {
      graph.push({
        "@type": articleType,
        headline: document.title,
        ...(document.seo.metaDescription.trim() ? { description: document.seo.metaDescription.trim() } : {}),
      });
    }
    return { "@context": "https://schema.org", "@graph": graph };
  }

  const automaticJsonLd = buildGraph(recommendedPage, recommendedArticle);
  const legacyJsonLd = buildGraph(legacyPage, legacyArticle);
  const manualText = editorial?.manualSchemaJsonLd;
  const parsedManual = selectionMode === "manual" && manualText !== undefined
    ? parseManualCmsSchema(manualText) : undefined;
  const manualError = parsedManual?.error;
  const jsonLd = selectionMode !== "manual" ? automaticJsonLd :
    parsedManual?.schema ?? (manualText === undefined ? legacyJsonLd : automaticJsonLd);
  const actualNodes = Array.isArray(jsonLd["@graph"])
    ? jsonLd["@graph"] as Record<string, unknown>[]
    : [jsonLd];
  const nodeTypes = actualNodes.flatMap(node => {
    const value = node["@type"];
    return typeof value === "string" ? [value] : Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
  });
  const pageType = selectionMode === "manual" && !manualError
    ? (["WebPage", "MedicalWebPage", "CollectionPage", "FAQPage"].find(type => nodeTypes.includes(type)) as CmsSchemaPreview["pageType"] | undefined) ?? legacyPage
    : recommendedPage;
  const articleType = selectionMode === "manual" && !manualError
    ? (["Article", "BlogPosting", "MedicalScholarlyArticle"].find(type => nodeTypes.includes(type)) as CmsSchemaPreview["articleType"] | undefined) ?? "none"
    : recommendedArticle;
  const manualMissingReviewer = selectionMode === "manual" && reviewerExpected &&
    !actualNodes.some(node => Boolean(node.reviewedBy));
  const manualMissingReviewDate = selectionMode === "manual" && reviewDateExpected &&
    !actualNodes.some(node => Boolean(node.lastReviewed));

  const issues: CmsSchemaIssue[] = [];
  if (!document.title.trim()) issues.push({ level: "error", message: "Add a meaningful page title before considering structured data." });
  else issues.push({ level: "passed", message: "Page has a visible title." });
  if (!document.seo.metaDescription.trim()) issues.push({ level: "warning", message: "A clear page description is recommended." });
  else issues.push({ level: "passed", message: "A page description is available." });
  if (manualError) issues.push({ level: "error", message: "Manual JSON-LD invalid: " + manualError });
  if (pageType === "FAQPage" && faq.length === 0)
    issues.push({ level: "error", message: "FAQPage requires visible, complete question-and-answer content. No complete FAQs were found." });
  else if (pageType === "FAQPage")
    issues.push({ level: "warning", message: "FAQ structured data needs visible Q&A content and search-provider eligibility checks; rich results are not guaranteed." });
  if (pageType === "MedicalWebPage")
    issues.push({ level: "warning", message: "MedicalWebPage is intended for appropriate medical content. Clinician credentials and page review must be independently verified." });
  if (articleType === "MedicalScholarlyArticle")
    issues.push({ level: "error", message: "MedicalScholarlyArticle needs independently verified scholarly authorship and publication context. Do not use for general patient education." });
  if (medical && pageType === "WebPage")
    issues.push({ level: "passed", message: "WebPage is a conservative default for educational oral-health content." });
  if (articleType !== "none" && body.text.length < 100)
    issues.push({ level: "warning", message: "Very little article text is present; confirm the selected article type represents a complete page." });
  if (articleType === "none" && !hubLanding && document.contentType === "guide")
    issues.push({ level: "warning", message: "An Article type may be appropriate for individual educational content." });
  if (hasReviewerFields && !reviewerExpected)
    issues.push({ level: "warning", message: "Reviewer details are incomplete or invalid; reviewer attribution is omitted until required fields are supplied." });
  if (reviewerExpected)
    issues.push({ level: "warning", message: "Reviewer metadata is editor-entered, not independently verified. Confirm identity, credentials, profile, clinical review and date before any publication." });
  if (manualMissingReviewer || manualMissingReviewDate)
    issues.push({ level: "warning", message: "Manual schema omits eligible reviewer details or review date. Add accurate attribution or restore automatic schema." });
  return {
    jsonLd, automaticJsonLd, issues, recommendedPage, recommendedArticle, pageType, articleType,
    selectionMode, recommendationReason, manualError, reviewerExpected, reviewDateExpected,
    manualMissingReviewer, manualMissingReviewDate, publishable: false,
  };
}
