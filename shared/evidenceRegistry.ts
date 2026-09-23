import type { ContentSourceRef } from "./contentGovernance";

/**
 * Public, source-controlled provenance for existing DentaSmart owners.
 * This registry deliberately contains only display-safe information. It is not
 * a substitute for governed database evidence on a dynamic blog article.
 */
export type EvidenceSourceType =
  | "FIRST_PARTY_PRODUCT"
  | "APP_STORE"
  | "GOVERNMENT"
  | "PROFESSIONAL_ASSOCIATION"
  | "COMPETITOR_FIRST_PARTY";

export type EvidenceFreshness = "STABLE" | "PERIODIC_REVIEW" | "FAST_CHANGING";

export interface PublicEvidenceSource extends ContentSourceRef {
  evidenceType: EvidenceSourceType;
  sourceScope: string;
  verifiedAt: string;
  reviewCadence: EvidenceFreshness;
  allowedRoutes: readonly string[];
  claimKeys: readonly string[];
  qualification?: string;
}

const accessedAt = "2026-09-23";

export const publicEvidenceRegistry = {
  pricing: {
    id: "dentasmart-pricing",
    title: "DentaSmart Pricing",
    publisher: "DentaSmart",
    url: "https://dentasmart.ai/pricing/",
    sourceType: "official_regulatory_product",
    evidenceType: "FIRST_PARTY_PRODUCT",
    verificationStatus: "verified",
    publicDisplayAllowed: true,
    sourceScope: "Current public plan names, prices, family capacity, and the educational scope of Treatment Plan Review.",
    accessedOn: accessedAt,
    verifiedAt: accessedAt,
    reviewCadence: "FAST_CHANGING",
    allowedRoutes: ["/pricing/", "/product-facts/", "/faqs/"],
    claimKeys: [
      "DENTASMART_PRICE_FREE_QUICK_CHECK",
      "DENTASMART_PRICE_FULL_QUICK_CHECK",
      "DENTASMART_PRICE_TREATMENT_PLAN_REVIEW",
      "DENTASMART_PRICE_COMPLETE_CARE",
      "DENTASMART_FAMILY_CAPACITY",
      "DENTASMART_TREATMENT_PLAN_REVIEW_BOUNDARY",
    ],
  },
  productFacts: {
    id: "dentasmart-product-facts",
    title: "DentaSmart Product Facts",
    publisher: "DentaSmart",
    url: "https://dentasmart.ai/product-facts/",
    sourceType: "official_regulatory_product",
    evidenceType: "FIRST_PARTY_PRODUCT",
    verificationStatus: "verified",
    publicDisplayAllowed: true,
    sourceScope: "Public manifest for current DentaSmart availability, supported inputs, and educational-use boundaries.",
    accessedOn: accessedAt,
    verifiedAt: accessedAt,
    reviewCadence: "FAST_CHANGING",
    allowedRoutes: ["/", "/download/", "/features/", "/how-it-works/", "/free-ai-teeth-scanner/", "/instant-scan/", "/employers/", "/product-facts/"],
    claimKeys: [
      "DENTASMART_APP_AVAILABILITY",
      "DENTASMART_FREE_QUICK_CHECK_SCOPE",
      "DENTASMART_XRAY_SCOPE",
      "DENTASMART_EDUCATIONAL_BOUNDARY",
      "DENTASMART_ORAL_HEALTH_SCORE_BOUNDARY",
      "DENTASMART_DR_DIN_BOUNDARY",
    ],
  },
  iosStore: {
    id: "dentasmart-ios-store",
    title: "DentaSmart on the App Store",
    publisher: "Apple App Store",
    url: "https://apps.apple.com/us/app/dentasmart/id6670311232",
    sourceType: "official_regulatory_product",
    evidenceType: "APP_STORE",
    verificationStatus: "verified",
    publicDisplayAllowed: true,
    sourceScope: "Current public iOS app listing and application identifier.",
    accessedOn: accessedAt,
    verifiedAt: accessedAt,
    reviewCadence: "FAST_CHANGING",
    allowedRoutes: ["/product-facts/", "/download/"],
    claimKeys: ["DENTASMART_IOS_AVAILABILITY", "DENTASMART_IOS_APP_ID"],
  },
  androidStore: {
    id: "dentasmart-android-store",
    title: "DentaSmart on Google Play",
    publisher: "Google Play",
    url: "https://play.google.com/store/apps/details?id=com.dentaSmart.app.android",
    sourceType: "official_regulatory_product",
    evidenceType: "APP_STORE",
    verificationStatus: "verified",
    publicDisplayAllowed: true,
    sourceScope: "Current public Android app listing and package identifier.",
    accessedOn: accessedAt,
    verifiedAt: accessedAt,
    reviewCadence: "FAST_CHANGING",
    allowedRoutes: ["/product-facts/", "/download/"],
    claimKeys: ["DENTASMART_ANDROID_AVAILABILITY", "DENTASMART_ANDROID_PACKAGE"],
  },
  nidcrOralHygiene: {
    id: "nidcr-oral-hygiene",
    title: "Oral Hygiene",
    publisher: "National Institute of Dental and Craniofacial Research",
    url: "https://www.nidcr.nih.gov/health-info/oral-hygiene",
    sourceType: "government_public_health",
    evidenceType: "GOVERNMENT",
    verificationStatus: "verified",
    publicDisplayAllowed: true,
    sourceScope: "Basic oral-hygiene and prevention education for the named cavity, gum-disease, and prevention-guide pages only.",
    accessedOn: accessedAt,
    verifiedAt: accessedAt,
    reviewCadence: "PERIODIC_REVIEW",
    allowedRoutes: [
      "/conditions/cavities/",
      "/conditions/gum-disease/",
      "/conditions/periodontitis/",
      "/guides/brushing-guide/",
      "/guides/complete-oral-health-routine/",
      "/guides/flossing-guide/",
      "/guides/gum-disease-prevention/",
      "/guides/how-to-prevent-cavities/",
    ],
    claimKeys: ["CLINICAL_ORAL_HYGIENE_CONTEXT", "CLINICAL_PROFESSIONAL_CARE_DIRECTION"],
  },
  whoOralHealth: {
    id: "who-oral-health",
    title: "Oral Health",
    publisher: "World Health Organization",
    url: "https://www.who.int/news-room/fact-sheets/detail/oral-health",
    sourceType: "government_public_health",
    evidenceType: "GOVERNMENT",
    verificationStatus: "verified",
    publicDisplayAllowed: true,
    sourceScope: "Public-health context for prevention and access only on the named prevention and affordability guides.",
    publicationDate: "2025-03-17",
    accessedOn: accessedAt,
    verifiedAt: accessedAt,
    reviewCadence: "PERIODIC_REVIEW",
    allowedRoutes: [
      "/guides/affordable-dental-care/",
      "/guides/complete-oral-health-routine/",
      "/guides/gum-disease-prevention/",
      "/guides/how-to-prevent-cavities/",
      "/guides/preventing-expensive-dental-problems/",
    ],
    claimKeys: ["CLINICAL_ORAL_HEALTH_PREVENTION_CONTEXT", "ORAL_HEALTH_ACCESS_CONTEXT"],
  },
  adaRootCanals: {
    id: "ada-root-canals",
    title: "Root Canals",
    publisher: "American Dental Association, MouthHealthy",
    url: "https://www.mouthhealthy.org/all-topics-a-z/root-canals",
    sourceType: "professional_dental_organization",
    evidenceType: "PROFESSIONAL_ASSOCIATION",
    verificationStatus: "verified",
    publicDisplayAllowed: true,
    sourceScope: "Patient education on reasons a dentist may recommend root canal treatment, broad procedure steps, and follow-up restoration.",
    accessedOn: accessedAt,
    verifiedAt: accessedAt,
    reviewCadence: "PERIODIC_REVIEW",
    allowedRoutes: ["/treatments/root-canal-procedure/"],
    claimKeys: ["ROOT_CANAL_PROCEDURE_CONTEXT", "ROOT_CANAL_AFTERCARE_CONTEXT"],
  },
  aaeRootCanalSafety: {
    id: "aae-root-canal-safety",
    title: "Root Canal Safety",
    publisher: "American Association of Endodontists",
    url: "https://www.aae.org/specialty/clinical-resources/root-canal-safety/",
    sourceType: "professional_dental_organization",
    evidenceType: "PROFESSIONAL_ASSOCIATION",
    verificationStatus: "verified",
    publicDisplayAllowed: true,
    sourceScope: "Patient-facing context on the safety of endodontic treatment. It does not determine whether treatment is needed for an individual.",
    accessedOn: accessedAt,
    verifiedAt: accessedAt,
    reviewCadence: "PERIODIC_REVIEW",
    allowedRoutes: ["/treatments/root-canal-procedure/"],
    claimKeys: ["ROOT_CANAL_SAFETY_CONTEXT"],
  },
  adaDentalEmergencies: {
    id: "ada-dental-emergencies",
    title: "Dental Emergencies",
    publisher: "American Dental Association, MouthHealthy",
    url: "https://www.mouthhealthy.org/all-topics-a-z/dental-emergencies",
    sourceType: "professional_dental_organization",
    evidenceType: "PROFESSIONAL_ASSOCIATION",
    verificationStatus: "verified",
    publicDisplayAllowed: true,
    sourceScope: "Immediate patient guidance and prompt professional-care direction for the named emergency pages only.",
    accessedOn: accessedAt,
    verifiedAt: accessedAt,
    reviewCadence: "PERIODIC_REVIEW",
    allowedRoutes: [
      "/dental-emergencies/broken-tooth/",
      "/dental-emergencies/dental-abscess/",
      "/dental-emergencies/dental-emergency-guide/",
      "/dental-emergencies/knocked-out-tooth/",
      "/dental-emergencies/severe-toothache/",
    ],
    claimKeys: ["DENTAL_EMERGENCY_ESCALATION", "DENTAL_EMERGENCY_SELF_CARE_BOUNDARY"],
  },
  openaiChatGptHealth: {
    id: "openai-chatgpt-health",
    title: "Introducing ChatGPT Health",
    publisher: "OpenAI",
    url: "https://openai.com/index/introducing-chatgpt-health/",
    sourceType: "external_product_provider",
    evidenceType: "COMPETITOR_FIRST_PARTY",
    verificationStatus: "verified",
    publicDisplayAllowed: true,
    sourceScope: "Current first-party information about ChatGPT Health. It supports product-context statements only, not head-to-head performance claims.",
    publicationDate: "2026-01-07",
    accessedOn: accessedAt,
    verifiedAt: accessedAt,
    reviewCadence: "FAST_CHANGING",
    allowedRoutes: ["/compare/dentasmart-vs-chatgpt-dental/"],
    claimKeys: ["CHATGPT_PRODUCT_CONTEXT"],
  },
  dentalCom: {
    id: "dental-com-platform",
    title: "Dental.com",
    publisher: "Dental.com",
    url: "https://dental.com/com/dental/index.html",
    sourceType: "external_product_provider",
    evidenceType: "COMPETITOR_FIRST_PARTY",
    verificationStatus: "verified",
    publicDisplayAllowed: true,
    sourceScope: "Current provider overview. Facts about provider services should be read with this source and rechecked before substantive comparison updates.",
    accessedOn: accessedAt,
    verifiedAt: accessedAt,
    reviewCadence: "FAST_CHANGING",
    allowedRoutes: ["/vs/dental-com/"],
    claimKeys: ["DENTAL_COM_PROVIDER_CONTEXT"],
  },
  dentistryOneSmileScan: {
    id: "dentistry-one-smilescan",
    title: "SmileScan",
    publisher: "Dentistry.One",
    url: "https://dentistry.one/services/smilescan/",
    sourceType: "external_product_provider",
    evidenceType: "COMPETITOR_FIRST_PARTY",
    verificationStatus: "verified",
    publicDisplayAllowed: true,
    sourceScope: "Current provider information for SmileScan. Facts about provider services should be rechecked before substantive comparison updates.",
    accessedOn: accessedAt,
    verifiedAt: accessedAt,
    reviewCadence: "FAST_CHANGING",
    allowedRoutes: ["/vs/dentistry-one/"],
    claimKeys: ["DENTISTRY_ONE_PROVIDER_CONTEXT"],
  },
} as const satisfies Record<string, PublicEvidenceSource>;

export type PublicEvidenceKey = keyof typeof publicEvidenceRegistry;

export const publicClaimUseMap = {
  DENTASMART_PRICE_FREE_QUICK_CHECK: ["/pricing/", "/product-facts/", "/faqs/"],
  DENTASMART_PRICE_FULL_QUICK_CHECK: ["/pricing/", "/product-facts/", "/faqs/"],
  DENTASMART_PRICE_TREATMENT_PLAN_REVIEW: ["/pricing/", "/product-facts/", "/faqs/"],
  DENTASMART_FAMILY_CAPACITY: ["/pricing/", "/product-facts/", "/faqs/"],
  DENTASMART_APP_AVAILABILITY: ["/product-facts/", "/download/"],
  DENTASMART_TREATMENT_PLAN_REVIEW_BOUNDARY: ["/pricing/", "/product-facts/", "/faqs/"],
  ROOT_CANAL_PROCEDURE_CONTEXT: ["/treatments/root-canal-procedure/"],
  CLINICAL_ORAL_HYGIENE_CONTEXT: [
    "/conditions/cavities/",
    "/conditions/gum-disease/",
    "/conditions/periodontitis/",
    "/guides/brushing-guide/",
    "/guides/complete-oral-health-routine/",
    "/guides/flossing-guide/",
    "/guides/gum-disease-prevention/",
    "/guides/how-to-prevent-cavities/",
  ],
  CLINICAL_ORAL_HEALTH_PREVENTION_CONTEXT: [
    "/guides/affordable-dental-care/",
    "/guides/complete-oral-health-routine/",
    "/guides/gum-disease-prevention/",
    "/guides/how-to-prevent-cavities/",
    "/guides/preventing-expensive-dental-problems/",
  ],
  ORAL_HEALTH_ACCESS_CONTEXT: [
    "/guides/affordable-dental-care/",
    "/guides/preventing-expensive-dental-problems/",
  ],
  DENTAL_EMERGENCY_ESCALATION: [
    "/dental-emergencies/broken-tooth/",
    "/dental-emergencies/dental-abscess/",
    "/dental-emergencies/dental-emergency-guide/",
    "/dental-emergencies/knocked-out-tooth/",
    "/dental-emergencies/severe-toothache/",
  ],
  DENTAL_EMERGENCY_SELF_CARE_BOUNDARY: [
    "/dental-emergencies/broken-tooth/",
    "/dental-emergencies/dental-abscess/",
    "/dental-emergencies/dental-emergency-guide/",
    "/dental-emergencies/knocked-out-tooth/",
    "/dental-emergencies/severe-toothache/",
  ],
  CHATGPT_PRODUCT_CONTEXT: ["/compare/dentasmart-vs-chatgpt-dental/"],
  DENTAL_COM_PROVIDER_CONTEXT: ["/vs/dental-com/"],
  DENTISTRY_ONE_PROVIDER_CONTEXT: ["/vs/dentistry-one/"],
} as const;

function routeMatches(path: string, allowedRoute: string): boolean {
  return path === allowedRoute;
}

export function getPublicEvidenceForRoute(path: string): PublicEvidenceSource[] {
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}/`;
  return Object.values(publicEvidenceRegistry).filter((source) =>
    source.publicDisplayAllowed && source.allowedRoutes.some((allowedRoute) => routeMatches(normalizedPath, allowedRoute)),
  );
}

export function getPublicEvidence(...keys: PublicEvidenceKey[]): PublicEvidenceSource[] {
  return keys.map((key) => publicEvidenceRegistry[key]).filter((source) => source.publicDisplayAllowed);
}

/**
 * Explicit governed or route-owned sources always take precedence. Route fallback
 * is allowed only when the caller has not supplied a source set at all.
 */
export function resolvePublicEvidenceSources({
  sources,
  governedSources,
  route,
}: {
  sources?: readonly PublicEvidenceSource[];
  governedSources?: readonly ContentSourceRef[];
  route?: string;
}): readonly (PublicEvidenceSource | ContentSourceRef)[] {
  if (sources !== undefined) return sources;
  if (governedSources !== undefined) return governedSources;
  return route ? getPublicEvidenceForRoute(route) : [];
}

export function getDisplayableEvidenceSources(
  sources: readonly (PublicEvidenceSource | ContentSourceRef)[],
): readonly (PublicEvidenceSource | ContentSourceRef)[] {
  return sources.filter((source) => source.publicDisplayAllowed === true && Boolean(source.url?.trim()));
}

export function isEvidenceFresh(source: Pick<PublicEvidenceSource, "reviewCadence" | "verifiedAt">, today = new Date()): boolean {
  const verifiedAt = new Date(`${source.verifiedAt}T00:00:00Z`);
  if (Number.isNaN(verifiedAt.getTime())) return false;
  const days = Math.floor((today.getTime() - verifiedAt.getTime()) / 86_400_000);
  const threshold = source.reviewCadence === "FAST_CHANGING" ? 90 : source.reviewCadence === "PERIODIC_REVIEW" ? 365 : 730;
  return days >= 0 && days <= threshold;
}

export function asGovernedPublicSources(sources: readonly PublicEvidenceSource[]): ContentSourceRef[] {
  return sources.map(({ evidenceType: _evidenceType, sourceScope, verifiedAt, reviewCadence: _reviewCadence, allowedRoutes: _allowedRoutes, claimKeys, qualification, ...source }) => ({
    ...source,
    appliesTo: [...claimKeys],
    notes: [sourceScope, qualification].filter(Boolean).join(" ") || undefined,
  }));
}
