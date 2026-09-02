/**
 * Phase 6 content and clinical governance primitives.
 *
 * This leaf module is intentionally safe to import from client and server code.
 * Governance states describe evidence and workflow readiness. They do not create
 * clinical-review, source-verification, or profile claims on their own.
 */

export type ContentClaimClass =
  | "PRODUCT_FACT"
  | "CLINICAL_EDUCATION"
  | "URGENT_CARE"
  | "TREATMENT_INFORMATION"
  | "COST_INFORMATION"
  | "EXTERNAL_COMPARISON"
  | "POLICY"
  | "TESTIMONIAL_OR_USER_CLAIM"
  | "BUSINESS_ROI"
  | "REGULATORY"
  | "PRIVACY";

export type ContentRiskClass = "general" | "health" | "urgent_care" | "product" | "policy";

export type SourceType =
  | "government_public_health"
  | "professional_dental_organization"
  | "peer_reviewed_journal"
  | "academic_health_system"
  | "official_regulatory_product"
  | "commercial_health_reference"
  | "external_product_provider"
  | "other"
  | "unknown";

export type SourceVerificationStatus =
  | "verified"
  | "legacy_existing"
  | "pending_verification"
  | "not_applicable";

export type ReviewVerificationStatus =
  | "verified"
  | "legacy_unverified"
  | "pending_verification"
  | "not_applicable";

export type ContentWorkflowState =
  | "draft"
  | "pending_editorial_review"
  | "pending_clinical_review"
  | "approved_for_publish"
  | "published"
  | "correction_required"
  | "archived";

export interface ContentAuthorRef {
  kind: "organization" | "person";
  displayName: string;
  profileSlug?: string;
  verificationStatus: ReviewVerificationStatus;
}

export interface ClinicalReviewerRef {
  id?: string;
  displayName?: string;
  role?: string;
  credentials?: string;
  profileSlug?: string;
  verificationStatus: ReviewVerificationStatus;
  publicDisplayAllowed: boolean;
}

export interface ContentReviewRecord {
  reviewer?: ClinicalReviewerRef;
  reviewedOn?: string;
  reviewScope?: string;
  reviewType?: "clinical" | "editorial" | "product";
  verificationStatus: ReviewVerificationStatus;
  reviewContentVersion?: string;
}

export interface ContentSourceRef {
  id: string;
  title: string;
  publisher?: string;
  url: string;
  sourceType: SourceType;
  verificationStatus: SourceVerificationStatus;
  publicationDate?: string;
  accessedOn?: string;
  appliesTo?: string[];
  claimIds?: string[];
  notes?: string;
  publicDisplayAllowed?: boolean;
}

export interface ContentDates {
  publishedOn?: string;
  modifiedOn?: string;
  lastReviewedOn?: string;
}

export interface DirectAnswerData {
  question: string;
  answer: string;
  definition?: string;
  intendedAudience?: string;
  sourceRefIds?: string[];
}

export interface UrgentCareGuidance {
  title: string;
  introduction?: string;
  actions: string[];
  contentBeforeConversion: true;
}

export interface CTAContentPolicy {
  placement: "after_urgent_guidance" | "after_educational_context" | "not_applicable";
  requiresProfessionalCareBoundary: boolean;
}

export interface ContentGovernanceException {
  code: "legacy_review_metadata" | "legacy_source_mapping" | "missing_provenance";
  reason: string;
}

export interface ContentGovernance {
  contentId: string;
  contentVersion: string;
  riskClass: ContentRiskClass;
  claimClasses: ContentClaimClass[];
  dates?: ContentDates;
  author?: ContentAuthorRef;
  review?: ContentReviewRecord;
  sourceRefs?: ContentSourceRef[];
  directAnswer?: DirectAnswerData;
  urgentCare?: UrgentCareGuidance;
  ctaPolicy: CTAContentPolicy;
  exceptions?: ContentGovernanceException[];
}

export interface ContentBrief {
  audience: string;
  searchJob: string;
  uniqueAngle: string;
  primaryTopic: string;
  relatedQuestions?: string[];
  productFit?: string;
  sourceRefIds?: string[];
  reviewerRequirement?: "not_required" | "editorial" | "clinical";
  internalLinks?: string[];
  ctaPolicy?: CTAContentPolicy;
  metadataRequirements?: string[];
  phase7SchemaRequirements?: string[];
}

export const governanceSourceRegistry = {
  "ada-oral-health": {
    id: "ada-oral-health",
    title: "Oral Health Topics",
    publisher: "American Dental Association",
    url: "https://www.ada.org/resources/research/science-and-research-institute/oral-health-topics",
    sourceType: "professional_dental_organization",
    verificationStatus: "legacy_existing",
    publicDisplayAllowed: true,
  },
  "nidcr-health-info": {
    id: "nidcr-health-info",
    title: "Oral Health Information",
    publisher: "National Institute of Dental and Craniofacial Research",
    url: "https://www.nidcr.nih.gov/health-info",
    sourceType: "government_public_health",
    verificationStatus: "legacy_existing",
    publicDisplayAllowed: true,
  },
  "ada-emergencies": {
    id: "ada-emergencies",
    title: "Dental Emergencies",
    publisher: "American Dental Association",
    url: "https://www.ada.org/resources/research/science-and-research-institute/oral-health-topics/dental-emergencies",
    sourceType: "professional_dental_organization",
    verificationStatus: "legacy_existing",
    publicDisplayAllowed: true,
  },
  "fair-health-consumer": {
    id: "fair-health-consumer",
    title: "Fair Health Consumer",
    publisher: "FAIR Health",
    url: "https://www.fairhealthconsumer.org/",
    sourceType: "commercial_health_reference",
    verificationStatus: "legacy_existing",
    publicDisplayAllowed: true,
  },
  "ada-health-policy": {
    id: "ada-health-policy",
    title: "Health Policy Institute",
    publisher: "American Dental Association",
    url: "https://www.ada.org/resources/research/health-policy-institute",
    sourceType: "professional_dental_organization",
    verificationStatus: "legacy_existing",
    publicDisplayAllowed: true,
  },
  "carecredit-dentistry": {
    id: "carecredit-dentistry",
    title: "Dentistry Information",
    publisher: "CareCredit",
    url: "https://www.carecredit.com/dentistry/",
    sourceType: "commercial_health_reference",
    verificationStatus: "legacy_existing",
    publicDisplayAllowed: true,
  },
} as const satisfies Record<string, ContentSourceRef>;

export function canDisplayVerifiedReview(review?: ContentReviewRecord): boolean {
  return Boolean(
    review &&
      review.verificationStatus === "verified" &&
      review.reviewedOn &&
      review.reviewer?.publicDisplayAllowed &&
      review.reviewer.verificationStatus === "verified" &&
      review.reviewer.displayName &&
      review.reviewer.credentials,
  );
}

export function isExternalEvidenceUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host !== "dentasmart.ai" && host !== "www.dentasmart.ai";
  } catch {
    return false;
  }
}

export function createContentVersion(parts: readonly string[]): string {
  return parts.join("|").trim();
}

export const publicReviewerProfiles: readonly ClinicalReviewerRef[] = [];
