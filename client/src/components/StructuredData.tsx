/**
 * StructuredData - Comprehensive JSON-LD schema components for AEO.
 *
 * Includes: Organization, WebSite, SoftwareApplication, BreadcrumbList,
 * Product/Service/Offer, HowTo, Article/BlogPosting, ItemList schemas.
 */

import { Helmet } from "react-helmet-async";
import { app, company, pricing } from "@shared/facts";
import { serializeJsonLd, toSchemaUrl } from "@shared/jsonLd";

const SITE_URL = "https://dentasmart.ai";

// ============================================================
// Organization Schema (site-wide, rendered on homepage)
// ============================================================
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DentaSmart",
    url: toSchemaUrl(SITE_URL),
    logo: `${SITE_URL}/images/logo.png`,
    description: "DentaSmart is an AI-powered educational oral health app that helps people organize supported photos, X-rays, symptoms, and treatment documents for clearer dental conversations.",
    sameAs: [
      company.social.instagram,
      company.social.linkedin,
      app.iosUrl,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: toSchemaUrl("/faqs"),
      availableLanguage: "English",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{serializeJsonLd(schema)}</script>
    </Helmet>
  );
}

// ============================================================
// WebSite Schema (site-wide, rendered on homepage)
// ============================================================
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DentaSmart",
    url: toSchemaUrl(SITE_URL),
    description: "Your Personal AI Dentist in Your Pocket. DentaSmart provides educational oral health reports, tracking tools, and plain-language explanations that do not replace professional diagnosis or care.",
  };

  return (
    <Helmet>
      <script type="application/ld+json">{serializeJsonLd(schema)}</script>
    </Helmet>
  );
}

// ============================================================
// SoftwareApplication Schema (for app pages)
// ============================================================
export function SoftwareApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DentaSmart",
    operatingSystem: "iOS, Android",
    applicationCategory: "HealthApplication",
    description: "DentaSmart is an AI-powered educational oral health app with Free Quick Check, Full Quick Check, Treatment Plan Review, Complete Care, Oral Health Score tracking, reports, and guidance from Dr. Din. It does not diagnose conditions or replace professional dental care.",
    url: toSchemaUrl(SITE_URL),
    downloadUrl: toSchemaUrl("/download"),
    offers: [
      {
        "@type": "Offer",
        name: pricing.quickCheck.name,
        price: pricing.quickCheck.price.toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        description: "Unlimited Free Quick Checks using supported mouth photos, supported X-rays, or both. Free X-ray submissions show a reduced subset of eligible finding data.",
      },
      {
        "@type": "Offer",
        name: pricing.fullQuickCheck.name,
        price: pricing.fullQuickCheck.price.toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        description: "Full Quick Check for one supported case with full eligible X-ray insights. $19.99 per case.",
      },
      {
        "@type": "Offer",
        name: pricing.treatmentPlanReview.name,
        price: pricing.treatmentPlanReview.price.toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        description: "Educational Treatment Plan Review for one supported case, with plain-language context and questions to discuss with a licensed dentist. $29.99 per case.",
      },
      {
        "@type": "Offer",
        name: "Complete Care (Individual)",
        price: "74.99",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        description: "Year-round educational monitoring for one person with applicable reports, Oral Health Score tracking, guided self-examination, record organization, and Dr. Din access. $74.99/year.",
      },
      {
        "@type": "Offer",
        name: "Complete Care (Family)",
        price: "149.99",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        description: "Year-round educational monitoring for up to 4 family members, with separate profiles, reports, Oral Health Score tracking, dental history, and Dr. Din access. $149.99/year.",
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{serializeJsonLd(schema)}</script>
    </Helmet>
  );
}

// ============================================================
// BreadcrumbList Schema
// ============================================================
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toSchemaUrl(item.url),
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{serializeJsonLd(schema)}</script>
    </Helmet>
  );
}

// ============================================================
// HowTo Schema
// ============================================================
export interface HowToStep {
  name: string;
  text: string;
  url?: string;
}

export function HowToSchema({ name, description, steps }: { name: string; description: string; steps: HowToStep[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url ? { url: toSchemaUrl(step.url) } : {}),
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{serializeJsonLd(schema)}</script>
    </Helmet>
  );
}

// ============================================================
// Article/BlogPosting Schema
// ============================================================
export function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: toSchemaUrl(url),
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: author || "DentaSmart",
      url: toSchemaUrl(SITE_URL),
    },
    publisher: {
      "@type": "Organization",
      name: "DentaSmart",
      url: toSchemaUrl(SITE_URL),
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": toSchemaUrl(url),
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{serializeJsonLd(schema)}</script>
    </Helmet>
  );
}

// ============================================================
// Product/Service Schema (for pricing page)
// ============================================================
export function ProductServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "DentaSmart AI Oral Health App",
    description: "AI-powered educational oral health app with Free Quick Check, Full Quick Check, Treatment Plan Review, Complete Care, Oral Health Score tracking, reports, and AI guidance.",
    brand: {
      "@type": "Brand",
      name: "DentaSmart",
    },
    url: toSchemaUrl("/pricing"),
    offers: [
      {
        "@type": "Offer",
        name: pricing.quickCheck.name,
        price: pricing.quickCheck.price.toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: toSchemaUrl("/pricing"),
        description: "Unlimited Free Quick Checks using supported mouth photos, supported X-rays, or both. Free X-ray submissions show a reduced subset of eligible finding data.",
      },
      {
        "@type": "Offer",
        name: pricing.fullQuickCheck.name,
        price: pricing.fullQuickCheck.price.toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: toSchemaUrl("/pricing"),
        description: "Full Quick Check for one supported case with full eligible X-ray insights. $19.99 per case.",
      },
      {
        "@type": "Offer",
        name: pricing.treatmentPlanReview.name,
        price: pricing.treatmentPlanReview.price.toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: toSchemaUrl("/pricing"),
        description: "Educational Treatment Plan Review for one supported case, with plain-language context and questions to discuss with a licensed dentist. $29.99 per case.",
      },
      {
        "@type": "Offer",
        name: "Complete Care (Individual)",
        price: "74.99",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: toSchemaUrl("/pricing"),
        description: "Year-round educational monitoring for one person with applicable reports, Oral Health Score tracking, guided self-examination, record organization, and Dr. Din access. $74.99/year.",
      },
      {
        "@type": "Offer",
        name: "Complete Care (Family)",
        price: "149.99",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: toSchemaUrl("/pricing"),
        description: "Year-round educational monitoring for up to 4 family members, with separate profiles, reports, Oral Health Score tracking, dental history, and Dr. Din access. $149.99/year.",
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{serializeJsonLd(schema)}</script>
    </Helmet>
  );
}

// ============================================================
// ItemList Schema (for listicle/hub pages)
// ============================================================
export function ItemListSchema({ name, description, items }: {
  name: string;
  description: string;
  items: Array<{ name: string; url: string; position?: number }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: item.position || index + 1,
      name: item.name,
      url: toSchemaUrl(item.url),
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{serializeJsonLd(schema)}</script>
    </Helmet>
  );
}
