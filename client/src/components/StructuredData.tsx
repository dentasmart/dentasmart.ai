/**
 * StructuredData - Comprehensive JSON-LD schema components for AEO.
 * 
 * Includes: Organization, WebSite, SoftwareApplication, BreadcrumbList,
 * Product/Service/Offer, HowTo, Article/BlogPosting, ItemList schemas.
 */

import { Helmet } from "react-helmet-async";
import { app, company } from "@shared/facts";

const SITE_URL = "https://dentasmart.ai";

// ============================================================
// Organization Schema (site-wide, rendered on homepage)
// ============================================================
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DentaSmart",
    url: SITE_URL,
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
      url: `${SITE_URL}/faqs`,
      availableLanguage: "English"
    }
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
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
    url: SITE_URL,
    description: "Your Personal AI Dentist in Your Pocket. DentaSmart provides educational oral health reports, tracking tools, and plain-language explanations that do not replace professional diagnosis or care.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/oral-health-hub?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
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
    description: "DentaSmart is an AI-powered educational oral health app for supported mouth photos, dental X-rays, symptoms, and treatment documents. It provides an Oral Health Score, plain-language reports, tracking tools, and AI guidance from Dr Din. It does not diagnose conditions or replace professional dental care.",
    url: SITE_URL,
    downloadUrl: `${SITE_URL}/download`,
    offers: [
      {
        "@type": "Offer",
        name: "Quick Check",
        price: "19.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        description: "One-time educational review of supported mouth photos and X-rays with visible areas to discuss, an Oral Health Score, a patient-friendly report, and Dr Din access for 30 days. $19.99 one-time."
      },
      {
        "@type": "Offer",
        name: "Second Opinion",
        price: "29.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        description: "One-time educational comparison for one case using supported treatment plans, bills, X-rays, and mouth photos, with cost context and questions to discuss with a licensed dentist. Dr Din access for 30 days. $29.99 one-time."
      },
      {
        "@type": "Offer",
        name: "Complete Care (Individual)",
        price: "74.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        description: "Year-round educational monitoring for one person with supported photo and X-ray reviews, reports, Oral Health Score tracking, guided self-examination, record organization, and Dr Din access. $74.99/year."
      },
      {
        "@type": "Offer",
        name: "Complete Care (Family)",
        price: "149.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        description: "Year-round educational monitoring for up to 4 family members, with separate profiles, reports, Oral Health Score tracking, dental history, and Dr Din access. $149.99/year."
      }
    ],
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
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
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`
    }))
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
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
      ...(step.url ? { url: step.url.startsWith("http") ? step.url : `${SITE_URL}${step.url}` } : {})
    }))
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
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
  author 
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
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: author || "DentaSmart",
      url: SITE_URL
    },
    publisher: {
      "@type": "Organization",
      name: "DentaSmart",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url.startsWith("http") ? url : `${SITE_URL}${url}`
    }
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
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
    description: "AI-powered educational oral health app with supported photo and X-ray reviews, an Oral Health Score, plain-language reports, treatment-information comparisons, tracking tools, and AI guidance.",
    brand: {
      "@type": "Brand",
      name: "DentaSmart"
    },
    url: `${SITE_URL}/pricing`,
    offers: [
      {
        "@type": "Offer",
        name: "Quick Check",
        price: "19.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
        description: "One-time educational review of supported mouth photos and X-rays with visible areas to discuss, an Oral Health Score, a patient-friendly report, and Dr Din access for 30 days. $19.99 one-time."
      },
      {
        "@type": "Offer",
        name: "Second Opinion",
        price: "29.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
        description: "One-time educational comparison for one case using supported treatment plans, bills, X-rays, and mouth photos, with cost context and questions to discuss with a licensed dentist. Dr Din access for 30 days. $29.99 one-time."
      },
      {
        "@type": "Offer",
        name: "Complete Care (Individual)",
        price: "74.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
        description: "Year-round educational monitoring for one person with supported photo and X-ray reviews, reports, Oral Health Score tracking, guided self-examination, record organization, and Dr Din access. $74.99/year."
      },
      {
        "@type": "Offer",
        name: "Complete Care (Family)",
        price: "149.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
        description: "Year-round educational monitoring for up to 4 family members, with separate profiles, reports, Oral Health Score tracking, dental history, and Dr Din access. $149.99/year."
      }
    ]
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
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
      url: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`
    }))
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
