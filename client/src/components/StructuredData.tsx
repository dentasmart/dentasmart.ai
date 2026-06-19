/**
 * StructuredData - Comprehensive JSON-LD schema components for AEO.
 * 
 * Includes: Organization, WebSite, SoftwareApplication, BreadcrumbList,
 * Product/Service/Offer, HowTo, Article/BlogPosting, ItemList schemas.
 */

import { Helmet } from "react-helmet-async";

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
    description: "DentaSmart is an AI-powered oral health app that helps people understand their dental health through photo analysis, personalized care plans, and a 24/7 AI guide.",
    foundingDate: "2024",
    sameAs: [
      "https://www.instagram.com/dentasmart.ai",
      "https://www.linkedin.com/company/dentasmart",
      "https://apps.apple.com/app/dentasmart/id6504609692"
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
        description: "Fast AI scan of your teeth or X-rays with instant findings overview. $19.99 one-time."
      },
      {
        "@type": "Offer",
        name: "Second Opinion",
        price: "29.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        description: "Upload your dentist's treatment plan and get an AI-powered comparison report. $29.99 one-time."
      },
      {
        "@type": "Offer",
        name: "Complete Oral Health Checkup",
        price: "74.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        description: "Unlimited AI scans, Oral Health Score, personalized care plans, 24/7 AI guide Din. $74.99/year."
      },
      {
        "@type": "Offer",
        name: "Family Plan",
        price: "149.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        description: "Complete Oral Health Checkup for up to 5 family members. $149.99/year."
      }
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "120",
      bestRating: "5",
      worstRating: "1"
    }
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
        description: "Fast AI scan of your teeth or X-rays with instant findings overview. $19.99 one-time."
      },
      {
        "@type": "Offer",
        name: "Second Opinion",
        price: "29.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
        description: "Upload your dentist's treatment plan and get an AI-powered comparison report. $29.99 one-time."
      },
      {
        "@type": "Offer",
        name: "Complete Oral Health Checkup",
        price: "74.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
        description: "Unlimited AI scans, Oral Health Score, personalized care plans, 24/7 AI guide Din. $74.99/year ($0.21/day)."
      },
      {
        "@type": "Offer",
        name: "Family Plan",
        price: "149.99",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
        description: "Complete Oral Health Checkup for up to 5 family members. $149.99/year."
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
