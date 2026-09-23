import { app, company, pricing } from "./facts";
import { createBreadcrumbListSchema, getBreadcrumbs } from "./breadcrumbs";
import { toSchemaUrl } from "./jsonLd";

const SITE_URL = "https://dentasmart.ai";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SOFTWARE_APPLICATION_ID = `${SITE_URL}/#software`;

export interface PageSchemaMetadata {
  title: string;
  description: string;
  canonical: string;
}

const commercialOffers = [
  {
    name: pricing.quickCheck.name,
    price: pricing.quickCheck.price,
    description: "Unlimited free educational Quick Checks using supported mouth photos, supported X-rays, or both. Free X-ray submissions show a reduced subset of eligible finding data.",
  },
  {
    name: pricing.fullQuickCheck.name,
    price: pricing.fullQuickCheck.price,
    description: "One-time Full Quick Check for one supported case with full eligible X-ray insights. $19.99 per case.",
  },
  {
    name: pricing.treatmentPlanReview.name,
    price: pricing.treatmentPlanReview.price,
    description: "One-time educational review of a supported treatment plan for one case. $29.99 per case.",
  },
  {
    name: "Complete Care (Individual)",
    price: pricing.completeCareIndividual.price,
    description: "Year-round educational monitoring for one person. $74.99/year.",
  },
  {
    name: pricing.completeCareFamily.name,
    price: pricing.completeCareFamily.price,
    description: "Annual Complete Care Family plan for up to 4 total members, including the primary user. $149.99/year.",
  },
  {
    name: pricing.additionalFamilyMember.name,
    price: pricing.additionalFamilyMember.price,
    description: "Annual add-on for one additional Complete Care Family member beyond the first 4 total members. $19.99/year each.",
    isAddOn: true,
  },
] as const;

function getOfferSchema(offer: (typeof commercialOffers)[number]): Record<string, unknown> {
  return {
    "@type": "Offer",
    name: offer.name,
    price: offer.price.toFixed(2),
    priceCurrency: "USD",
    ...(!("isAddOn" in offer) ? {
      availability: "https://schema.org/InStock",
      url: toSchemaUrl("/pricing"),
    } : {}),
    description: offer.description,
  };
}

export function getOrganizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: company.name,
    url: toSchemaUrl(SITE_URL),
    logo: `${SITE_URL}/images/logo.png`,
    description: "DentaSmart is an AI-powered educational oral health app that helps people organize supported photos, X-rays, symptoms, and treatment documents for clearer dental conversations.",
    sameAs: [company.social.instagram, company.social.linkedin, app.iosUrl],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: toSchemaUrl("/faqs"),
      availableLanguage: "English",
    },
  };
}

export function getWebSiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: company.name,
    url: toSchemaUrl(SITE_URL),
    publisher: { "@id": ORGANIZATION_ID },
  };
}

function getSoftwareApplicationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_APPLICATION_ID,
    name: company.name,
    operatingSystem: "iOS, Android",
    applicationCategory: "HealthApplication",
    description: "DentaSmart is an AI-powered educational oral health app with unlimited Free Quick Checks using supported mouth photos, supported X-rays, or both. Full Quick Check unlocks full eligible X-ray insights for one case. The app also provides reports, tracking tools, and guidance from Dr. Din. It does not diagnose conditions or replace professional dental care.",
    url: toSchemaUrl(SITE_URL),
    downloadUrl: toSchemaUrl("/download"),
    installUrl: [app.iosUrl, app.androidUrl],
    publisher: { "@id": ORGANIZATION_ID },
    offers: commercialOffers.map(getOfferSchema),
  };
}

function getProductSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${toSchemaUrl("/pricing")}#product`,
    name: "DentaSmart AI Oral Health App",
    description: "AI-powered educational oral health app with Free Quick Check, Full Quick Check, Treatment Plan Review, Complete Care, plain-language reports, tracking tools, and AI guidance.",
    brand: { "@type": "Brand", name: company.name },
    url: toSchemaUrl("/pricing"),
    isRelatedTo: { "@id": SOFTWARE_APPLICATION_ID },
    offers: commercialOffers.map(getOfferSchema),
  };
}

function getPageSchema(metadata: PageSchemaMetadata, type: "WebPage" | "MedicalWebPage"): Record<string, unknown> {
  const canonical = toSchemaUrl(metadata.canonical);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${canonical}#webpage`,
    name: metadata.title,
    description: metadata.description,
    url: canonical,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
    ...(type === "MedicalWebPage" ? {
      medicalAudience: { "@type": "PatientAudience", audienceType: "Patient" },
    } : {}),
  };
}

function getHowToSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Use DentaSmart as an AI Oral Health Guide",
    description: "Use DentaSmart in four steps to organize supported dental information, review educational insights, and prepare for professional care.",
    step: [
      { "@type": "HowToStep", position: 1, name: "Add Your Information", text: "Add the supported photos, X-rays, symptoms, or treatment documents needed for the DentaSmart service you choose." },
      { "@type": "HowToStep", position: 2, name: "DentaSmart Reviews the Information", text: "DentaSmart organizes the submitted information and highlights details that may be worth discussing." },
      { "@type": "HowToStep", position: 3, name: "Review Your Educational Report", text: "Review plain-language educational insights and the report contents included with your selected service." },
      { "@type": "HowToStep", position: 4, name: "Prepare Questions and Monitor Records", text: "Use the report to prepare questions for a dentist and keep relevant records organized over time." },
    ],
  };
}

function cleanPath(urlPath: string): string {
  return urlPath.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
}

function isHealthEducationalPath(path: string): boolean {
  return ["/conditions/", "/symptoms/", "/treatments/", "/dental-costs/", "/dental-emergencies/", "/life-stages/", "/lifestyle/"].some((prefix) => path.startsWith(prefix));
}

/**
 * Shared source-controlled schema graph for the server response and client navigation.
 * Database-backed blog Article/BlogPosting data intentionally remains outside this model.
 */
export function resolveStaticSchemaMarkup(urlPath: string, metadata?: PageSchemaMetadata): Record<string, unknown>[] {
  const path = cleanPath(urlPath);
  const schemas: Record<string, unknown>[] = [getOrganizationSchema(), getWebSiteSchema()];

  if (path === "/") {
    schemas.push(getSoftwareApplicationSchema());
    return schemas;
  }

  if (path === "/how-it-works") schemas.push(getHowToSchema());
  if (path === "/pricing") schemas.push(getProductSchema());
  if (path === "/features" || path === "/download") schemas.push(getSoftwareApplicationSchema());

  if (metadata) {
    schemas.push(getPageSchema(metadata, isHealthEducationalPath(path) ? "MedicalWebPage" : "WebPage"));
  }

  const breadcrumb = createBreadcrumbListSchema(getBreadcrumbs(path));
  if (breadcrumb) schemas.push(breadcrumb);
  return schemas;
}
