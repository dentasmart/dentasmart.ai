/**
 * Reusable JSON-LD schema utilities for GEO optimization.
 * These generate structured data objects to pass into the SEO component's jsonLd prop.
 */

const SITE_URL = "https://dentasmart.ai";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * BreadcrumbList schema for non-home pages.
 * Helps search engines and AI engines understand page hierarchy.
 */
export function breadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * WebPage schema for general pages.
 */
export function webPageSchema(opts: {
  name: string;
  description: string;
  url: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: opts.url.startsWith("http") ? opts.url : `${SITE_URL}${opts.url}`,
    isPartOf: {
      "@type": "WebSite",
      name: "DentaSmart",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "DentaSmart",
      url: SITE_URL,
    },
  };
}

/**
 * MedicalWebPage schema for condition/symptom pages.
 */
export function medicalWebPageSchema(opts: {
  name: string;
  description: string;
  url: string;
  lastReviewed?: string;
  reviewedBy?: string;
  reviewedByCredentials?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: opts.name,
    description: opts.description,
    url: opts.url.startsWith("http") ? opts.url : `${SITE_URL}${opts.url}`,
    ...(opts.lastReviewed && { lastReviewed: opts.lastReviewed }),
    ...(opts.reviewedBy && {
      reviewedBy: {
        "@type": "Person",
        name: opts.reviewedBy,
        ...(opts.reviewedByCredentials && { jobTitle: opts.reviewedByCredentials }),
      },
    }),
    publisher: {
      "@type": "Organization",
      name: "DentaSmart",
      url: SITE_URL,
    },
  };
}

/**
 * Article schema for blog/hub articles.
 */
export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  image?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    url: opts.url.startsWith("http") ? opts.url : `${SITE_URL}${opts.url}`,
    ...(opts.datePublished && { datePublished: opts.datePublished }),
    ...(opts.dateModified && { dateModified: opts.dateModified }),
    author: {
      "@type": "Organization",
      name: opts.author || "DentaSmart",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "DentaSmart",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    ...(opts.image && {
      image: {
        "@type": "ImageObject",
        url: opts.image,
      },
    }),
  };
}

/**
 * FAQPage schema for pages with visible FAQ sections.
 */
export function faqPageSchema(faqs: { question: string; answer: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * HowTo schema for guide pages.
 */
export function howToSchema(opts: {
  name: string;
  description: string;
  steps: { title: string; description: string }[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: step.title,
      text: step.description,
    })),
  };
}
