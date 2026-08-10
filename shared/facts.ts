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

export const pricing = {
  quickCheck: {
    name: "Quick Check",
    price: 19.99,
    priceFormatted: "$19.99",
    billing: "one-time",
    billingLabel: "one-time",
  },
  secondOpinion: {
    name: "Second Opinion",
    price: 29.99,
    priceFormatted: "$29.99",
    billing: "one-time",
    billingLabel: "one-time",
  },
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
    price: 19.99,
    priceFormatted: "$19.99",
    billing: "year",
    billingLabel: "/year each",
  },
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
