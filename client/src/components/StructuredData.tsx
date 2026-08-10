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
    description: "DentaSmart is an AI-powered oral health app that helps people understand their dental health through photo analysis, personalized care plans, and a 24/7 AI dentist.",
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
    description: "Your Personal AI Dentist in Your Pocket. Upload a photo of your teeth and get AI-powered insights, personalized care plans, and clear dental education.",
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
    description: "DentaSmart is an AI-powered oral health app. Upload a photo of your teeth or dental X-rays and get AI analysis, an Oral Health Score, personalized care plans, and 24/7 AI guidance from Din.",
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
        description: "One-time AI review of mouth photos and X-rays. See visible concerns, key insights, and your Oral Health Score. Save or share a patient-friendly report. Dr. Din support for 30 days. $19.99 one-time."
      },
      {
        "@type": "Offer",
        name: "Second Opinion",
        price: "29.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        description: "One-time second opinion for one case. Upload treatment plans, bills, X-rays, and mouth photos. Get a plain-English comparison with treatment option context, cost ranges, and questions to ask your dentist. Dr. Din support for 30 days. $29.99 one-time."
      },
      {
        "@type": "Offer",
        name: "Complete Care (Individual)",
        price: "74.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        description: "Year-round monitoring for one person. Unlimited mouth photo and X-ray reviews, complete reports, Oral Health Score tracking, guided self-examination, personalized guidance, treatment options with cost estimates and risks of delay, and 24/7 Dr. Din support. $74.99/year."
      },
      {
        "@type": "Offer",
        name: "Complete Care (Family)",
        price: "149.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        description: "Year-round monitoring for up to 4 family members. Separate profiles, reports, Oral Health Score tracking, and dental history for each person. Dr. Din support for family dental questions. $149.99/year."
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
    description: "AI-powered oral health analysis app with photo scanning, Oral Health Score, personalized care plans, second opinions, and 24/7 AI guidance.",
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
        description: "One-time AI review of mouth photos and X-rays. See visible concerns, key insights, and your Oral Health Score. Save or share a patient-friendly report. Dr. Din support for 30 days. $19.99 one-time."
      },
      {
        "@type": "Offer",
        name: "Second Opinion",
        price: "29.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
        description: "One-time second opinion for one case. Upload treatment plans, bills, X-rays, and mouth photos. Get a plain-English comparison with treatment option context, cost ranges, and questions to ask your dentist. Dr. Din support for 30 days. $29.99 one-time."
      },
      {
        "@type": "Offer",
        name: "Complete Care (Individual)",
        price: "74.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
        description: "Year-round monitoring for one person. Unlimited mouth photo and X-ray reviews, complete reports, Oral Health Score tracking, guided self-examination, personalized guidance, treatment options with cost estimates and risks of delay, and 24/7 Dr. Din support. $74.99/year."
      },
      {
        "@type": "Offer",
        name: "Complete Care (Family)",
        price: "149.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
        description: "Year-round monitoring for up to 4 family members. Separate profiles, reports, Oral Health Score tracking, and dental history for each person. Dr. Din support for family dental questions. $149.99/year."
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
