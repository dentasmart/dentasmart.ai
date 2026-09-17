import { brand, pricing } from "./facts";
import type { ContentClaimClass } from "./contentGovernance";
import type {
  GovernanceClaimStatus,
  GovernanceContentChannel,
  GovernanceRiskLevel,
} from "./claimGovernance";

export interface GovernanceSourceSeed {
  sourceKey: string;
  sourceType: "other";
  publisher: string;
  title: string;
  location: string;
  verificationStatus: "verified";
  scope: string;
  publicDisplayAllowed: false;
}

export interface GovernanceClaimSeed {
  claimKey: string;
  claimText: string;
  approvedWording: string;
  claimClass: ContentClaimClass;
  riskLevel: GovernanceRiskLevel;
  status: GovernanceClaimStatus;
  productEntity?: string;
  audience?: string;
  allowedParaphrase: boolean;
  allowedChannels: readonly GovernanceContentChannel[];
  prohibitedChannels?: readonly GovernanceContentChannel[];
  qualification?: string;
  sourceKeys: readonly string[];
}

const publicProductChannels = [
  "visible_body",
  "title",
  "meta_description",
  "open_graph",
  "faq",
  "direct_answer",
  "schema",
  "llms",
] as const satisfies readonly GovernanceContentChannel[];

const bodyOnly = ["visible_body", "faq", "direct_answer"] as const satisfies readonly GovernanceContentChannel[];

export const governanceSourceSeeds: readonly GovernanceSourceSeed[] = [
  {
    sourceKey: "central-facts-registry",
    sourceType: "other",
    publisher: "DentaSmart",
    title: "DentaSmart Central Facts Registry",
    location: "shared/facts.ts",
    verificationStatus: "verified",
    scope: "Verified product names, current prices, supported inputs, platform availability, company facts, and limited clinical identity references.",
    publicDisplayAllowed: false,
  },
  {
    sourceKey: "phase2-approved-safety-boundaries",
    sourceType: "other",
    publisher: "DentaSmart",
    title: "Phase 2 approved governance safety boundaries",
    location: "Phase 2 Governance Implementation instruction",
    verificationStatus: "verified",
    scope: "Approved public product naming, educational boundaries, claim restrictions, and no-diagnosis requirements for governed work.",
    publicDisplayAllowed: false,
  },
];

export const governanceClaimSeeds: readonly GovernanceClaimSeed[] = [
  {
    claimKey: "brand-tagline",
    claimText: brand.tagline,
    approvedWording: brand.tagline,
    claimClass: "PRODUCT_FACT",
    riskLevel: "MEDIUM",
    status: "VERIFIED",
    productEntity: brand.productName,
    allowedParaphrase: false,
    allowedChannels: publicProductChannels,
    sourceKeys: ["central-facts-registry"],
  },
  {
    claimKey: "free-quick-check-supported-inputs",
    claimText: "Free Quick Check accepts supported mouth photos, supported X-rays, or both.",
    approvedWording: "Free Quick Check accepts supported mouth photos, supported X-rays, or both.",
    claimClass: "PRODUCT_FACT",
    riskLevel: "HIGH",
    status: "VERIFIED",
    productEntity: pricing.quickCheck.name,
    audience: "Consumers",
    allowedParaphrase: false,
    allowedChannels: publicProductChannels,
    qualification: "Use the word supported. Do not imply that every image or finding is eligible.",
    sourceKeys: ["central-facts-registry"],
  },
  {
    claimKey: "free-quick-check-unlimited",
    claimText: "Free Quick Check includes unlimited checks.",
    approvedWording: "Free Quick Check includes unlimited checks.",
    claimClass: "PRODUCT_FACT",
    riskLevel: "HIGH",
    status: "VERIFIED",
    productEntity: pricing.quickCheck.name,
    allowedParaphrase: false,
    allowedChannels: publicProductChannels,
    sourceKeys: ["central-facts-registry"],
  },
  {
    claimKey: "free-quick-check-mouth-photo-no-xray-required",
    claimText: "Mouth photos do not require an X-ray for Free Quick Check.",
    approvedWording: "Mouth photos do not require an X-ray for Free Quick Check.",
    claimClass: "PRODUCT_FACT",
    riskLevel: "HIGH",
    status: "VERIFIED",
    productEntity: pricing.quickCheck.name,
    allowedParaphrase: false,
    allowedChannels: publicProductChannels,
    sourceKeys: ["central-facts-registry"],
  },
  {
    claimKey: "free-quick-check-educational-limit",
    claimText: "Free Quick Check is educational and does not diagnose conditions.",
    approvedWording: "Free Quick Check is educational and does not diagnose conditions.",
    claimClass: "PRODUCT_FACT",
    riskLevel: "CRITICAL",
    status: "VERIFIED",
    productEntity: pricing.quickCheck.name,
    allowedParaphrase: false,
    allowedChannels: bodyOnly,
    qualification: "Do not claim universal detection, clinical diagnosis, treatment recommendation, or unsupported accuracy.",
    sourceKeys: ["phase2-approved-safety-boundaries"],
  },
  {
    claimKey: "full-quick-check-price",
    claimText: `Full Quick Check is ${pricing.fullQuickCheck.priceFormatted} ${pricing.fullQuickCheck.billingLabel}.`,
    approvedWording: `Full Quick Check is ${pricing.fullQuickCheck.priceFormatted} ${pricing.fullQuickCheck.billingLabel}.`,
    claimClass: "PRODUCT_FACT",
    riskLevel: "HIGH",
    status: "VERIFIED",
    productEntity: pricing.fullQuickCheck.name,
    allowedParaphrase: false,
    allowedChannels: publicProductChannels,
    sourceKeys: ["central-facts-registry"],
  },
  {
    claimKey: "full-quick-check-xray-insights",
    claimText: "Full Quick Check includes full eligible X-ray insights for one supported case.",
    approvedWording: "Full Quick Check includes full eligible X-ray insights for one supported case.",
    claimClass: "PRODUCT_FACT",
    riskLevel: "HIGH",
    status: "VERIFIED",
    productEntity: pricing.fullQuickCheck.name,
    allowedParaphrase: false,
    allowedChannels: publicProductChannels,
    qualification: "Use eligible and supported. Do not imply a diagnosis or dentist interpretation.",
    sourceKeys: ["central-facts-registry", "phase2-approved-safety-boundaries"],
  },
  {
    claimKey: "treatment-plan-review-name-and-price",
    claimText: `${pricing.treatmentPlanReview.name} is ${pricing.treatmentPlanReview.priceFormatted} ${pricing.treatmentPlanReview.billingLabel}.`,
    approvedWording: `${pricing.treatmentPlanReview.name} is ${pricing.treatmentPlanReview.priceFormatted} ${pricing.treatmentPlanReview.billingLabel}.`,
    claimClass: "PRODUCT_FACT",
    riskLevel: "HIGH",
    status: "VERIFIED",
    productEntity: pricing.treatmentPlanReview.name,
    allowedParaphrase: false,
    allowedChannels: publicProductChannels,
    qualification: "Use Treatment Plan Review as the public product name. Do not rename it as a Second Opinion product.",
    sourceKeys: ["central-facts-registry", "phase2-approved-safety-boundaries"],
  },
  {
    claimKey: "treatment-plan-review-educational-limit",
    claimText: "Treatment Plan Review provides educational context and does not determine whether treatment is necessary, diagnose conditions, or replace a licensed dentist's clinical opinion.",
    approvedWording: "Treatment Plan Review provides educational context and does not determine whether treatment is necessary, diagnose conditions, or replace a licensed dentist's clinical opinion.",
    claimClass: "PRODUCT_FACT",
    riskLevel: "CRITICAL",
    status: "VERIFIED",
    productEntity: pricing.treatmentPlanReview.name,
    allowedParaphrase: false,
    allowedChannels: bodyOnly,
    sourceKeys: ["phase2-approved-safety-boundaries"],
  },
  {
    claimKey: "complete-care-individual-price",
    claimText: `Complete Care Individual is ${pricing.completeCareIndividual.priceFormatted}${pricing.completeCareIndividual.billingLabel}.`,
    approvedWording: `Complete Care Individual is ${pricing.completeCareIndividual.priceFormatted}${pricing.completeCareIndividual.billingLabel}.`,
    claimClass: "PRODUCT_FACT",
    riskLevel: "HIGH",
    status: "VERIFIED",
    productEntity: "Complete Care Individual",
    allowedParaphrase: false,
    allowedChannels: publicProductChannels,
    sourceKeys: ["central-facts-registry"],
  },
  {
    claimKey: "complete-care-family-price-and-limit",
    claimText: `Complete Care Family is ${pricing.completeCareFamily.priceFormatted}${pricing.completeCareFamily.billingLabel} for up to ${pricing.completeCareFamily.maxMembers} members.`,
    approvedWording: `Complete Care Family is ${pricing.completeCareFamily.priceFormatted}${pricing.completeCareFamily.billingLabel} for up to ${pricing.completeCareFamily.maxMembers} members.`,
    claimClass: "PRODUCT_FACT",
    riskLevel: "HIGH",
    status: "VERIFIED",
    productEntity: pricing.completeCareFamily.name,
    allowedParaphrase: false,
    allowedChannels: publicProductChannels,
    sourceKeys: ["central-facts-registry"],
  },
  {
    claimKey: "complete-care-additional-member-price",
    claimText: `An additional family member is ${pricing.additionalFamilyMember.priceFormatted}${pricing.additionalFamilyMember.billingLabel}.`,
    approvedWording: `An additional family member is ${pricing.additionalFamilyMember.priceFormatted}${pricing.additionalFamilyMember.billingLabel}.`,
    claimClass: "PRODUCT_FACT",
    riskLevel: "HIGH",
    status: "VERIFIED",
    productEntity: pricing.completeCareFamily.name,
    allowedParaphrase: false,
    allowedChannels: publicProductChannels,
    sourceKeys: ["central-facts-registry"],
  },
  {
    claimKey: "oral-health-score-boundary",
    claimText: "Oral Health Score has an educational role and is not a diagnosis, predictive clinical risk claim, or treatment recommendation.",
    approvedWording: "Oral Health Score has an educational role and is not a diagnosis, predictive clinical risk claim, or treatment recommendation.",
    claimClass: "PRODUCT_FACT",
    riskLevel: "CRITICAL",
    status: "VERIFIED",
    productEntity: "Oral Health Score",
    allowedParaphrase: false,
    allowedChannels: bodyOnly,
    sourceKeys: ["phase2-approved-safety-boundaries"],
  },
  {
    claimKey: "dr-din-educational-boundary",
    claimText: "Dr Din is an AI oral-health guide for approved educational scope and does not diagnose, prescribe, or replace professional care.",
    approvedWording: "Dr Din is an AI oral-health guide for approved educational scope and does not diagnose, prescribe, or replace professional care.",
    claimClass: "PRODUCT_FACT",
    riskLevel: "CRITICAL",
    status: "VERIFIED",
    productEntity: brand.aiPersonaName,
    allowedParaphrase: false,
    allowedChannels: bodyOnly,
    sourceKeys: ["central-facts-registry", "phase2-approved-safety-boundaries"],
  },
  {
    claimKey: "employer-discovery-pending",
    claimText: "DentaSmart employer offerings, eligibility, data access, savings, ROI, partners, and network claims require current business and legal evidence.",
    approvedWording: "DentaSmart employer offerings, eligibility, data access, savings, ROI, partners, and network claims require current business and legal evidence.",
    claimClass: "BUSINESS_ROI",
    riskLevel: "CRITICAL",
    status: "PENDING",
    productEntity: "DentaSmart for Employers",
    allowedParaphrase: false,
    allowedChannels: [],
    sourceKeys: ["phase2-approved-safety-boundaries"],
  },
  {
    claimKey: "affordability-no-savings-promise",
    claimText: "DentaSmart affordability content provides educational cost context and does not promise savings, financing, insurance, or discount-network access.",
    approvedWording: "DentaSmart affordability content provides educational cost context and does not promise savings, financing, insurance, or discount-network access.",
    claimClass: "COST_INFORMATION",
    riskLevel: "HIGH",
    status: "VERIFIED",
    productEntity: "Affordability education",
    allowedParaphrase: false,
    allowedChannels: bodyOnly,
    sourceKeys: ["phase2-approved-safety-boundaries"],
  },
  {
    claimKey: "legal-privacy-claims-pending",
    claimText: "Privacy, security, retention, sharing, analytics, deletion, and legal terms claims require legal and privacy reconciliation.",
    approvedWording: "Privacy, security, retention, sharing, analytics, deletion, and legal terms claims require legal and privacy reconciliation.",
    claimClass: "PRIVACY",
    riskLevel: "CRITICAL",
    status: "PENDING",
    allowedParaphrase: false,
    allowedChannels: [],
    sourceKeys: ["phase2-approved-safety-boundaries"],
  },
];
