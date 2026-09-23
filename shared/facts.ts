/**
 * DentaSmart Central Facts Registry
 *
 * Pure TypeScript leaf module — no React, no JSX, no Node APIs,
 * no client imports, no server imports, no runtime side effects.
 *
 * Safe to import from both client/ and server/ code.
 *
 * Contains ONLY verified stable facts. Volatile/external data
 * (e.g., App Store rating count) is intentionally excluded.
 *
 * Unresolved claims (50K+, 100% accuracy, HIPAA, etc.) are NOT
 * included here — they remain in their original locations pending
 * business/clinical/legal approval.
 */

// ─── Brand ────────────────────────────────────────────────────────────────────

export const brand = {
  productName: "DentaSmart",
  tagline: "Your Personal AI Dentist in Your Pocket",
  aiPersonaName: "Dr. Din",
} as const;

// ─── Pricing ──────────────────────────────────────────────────────────────────

export interface PlanFact {
  readonly name: string;
  readonly price: number;
  readonly priceFormatted: string;
  readonly billing: "one-time" | "year";
  readonly billingLabel: string;
}

const freeQuickCheck = {
    name: "Free Quick Check",
    price: 0,
    priceFormatted: "Free",
    billing: "one-time",
    billingLabel: "unlimited checks",
    requiresXray: false,
    acceptsMouthPhotos: true,
    acceptsXrays: true,
    freeXrayFindingScope: "Reduced subset of eligible X-ray finding data",
  } as const;

const fullQuickCheck = {
    name: "Full Quick Check",
    price: 19.99,
    priceFormatted: "$19.99",
    billing: "one-time",
    billingLabel: "per case",
    requiresXray: true,
    includesFullEligibleXrayInsights: true,
  } as const;

const treatmentPlanReview = {
    name: "Treatment Plan Review",
    price: 29.99,
    priceFormatted: "$29.99",
    billing: "one-time",
    billingLabel: "per case",
  } as const;

export const pricing = {
  quickCheck: freeQuickCheck,
  fullQuickCheck,
  treatmentPlanReview,
  /** Compatibility aliases while older internal identifiers and checkout paths are migrated. */
  xrayAnalysis: fullQuickCheck,
  secondOpinion: treatmentPlanReview,
  completeCareIndividual: {
    name: "Complete Care",
    price: 74.99,
    priceFormatted: "$74.99",
    billing: "year",
    billingLabel: "/year",
  },
  completeCareFamily: {
    name: "Complete Care (Family)",
    price: 149.99,
    priceFormatted: "$149.99",
    billing: "year",
    billingLabel: "/year",
    maxMembers: 4,
  },
  additionalFamilyMember: {
    name: "Additional Complete Care Family Member",
    price: 19.99,
    priceFormatted: "$19.99",
    billing: "year",
    billingLabel: "/year each",
    appliesAfterIncludedMembers: 4,
  },
} as const;

// ─── Product Terminology ───────────────────────────────────────────────────────

export const productTerminology = {
  dentaSmart: brand.productName,
  quickCheck: pricing.quickCheck.name,
  fullQuickCheck: pricing.fullQuickCheck.name,
  treatmentPlanReview: pricing.treatmentPlanReview.name,
  secondOpinion: pricing.secondOpinion.name,
  completeCare: pricing.completeCareIndividual.name,
  oralHealthScore: "Oral Health Score",
  drDin: "Dr. Din",
  family: "Family",
} as const;

// ─── App ──────────────────────────────────────────────────────────────────────

export const app = {
  iosUrl: "https://apps.apple.com/us/app/dentasmart/id6670311232",
  iosId: "6670311232",
  androidUrl: "https://play.google.com/store/apps/details?id=com.dentaSmart.app.android",
  androidPackage: "com.dentaSmart.app.android",
  iosAvailability: "live" as const,
  androidAvailability: "live" as const,
} as const;

// ─── Company ──────────────────────────────────────────────────────────────────

export const company = {
  name: "DentaSmart",
  supportEmail: "support@dentasmart.ai",
  websiteUrl: "https://dentasmart.ai",
  social: {
    linkedin: "https://www.linkedin.com/company/dentasmart-ai",
    instagram: "https://www.instagram.com/dentasmart.ai",
    youtube: "https://www.youtube.com/@DentaSmartAi",
    facebook: "https://www.facebook.com/people/DentaSmart-AI/61578704828365/",
  },
} as const;

// ─── Clinical Identity ────────────────────────────────────────────────────────

/**
 * Canonical reviewer identity data.
 *
 * IMPORTANT: This does NOT automatically assign review status to pages.
 * Page-level `reviewedBy` fields remain authoritative for whether a
 * specific page has been clinically reviewed.
 */
export const clinicalIdentity = {
  reviewers: [
    {
      id: "areeba-aslam",
      name: "Areeba Aslam",
      credentials: "General Dentist at DentaSmart",
    },
  ],
} as const;
