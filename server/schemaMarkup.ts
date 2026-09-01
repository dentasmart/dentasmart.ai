/**
 * Server-Side JSON-LD Schema Markup
 *
 * Generates structured data (JSON-LD) for each page type and injects it
 * into the raw HTML <head> section. This ensures crawlers see schema markup
 * without needing to execute JavaScript.
 *
 * This replaces the need for client-side schema injection via react-helmet-async
 * for the primary schemas. The client-side StructuredData.tsx components can still
 * add supplementary schemas, but the critical ones are now server-rendered.
 */

const SITE_URL = "https://dentasmart.ai";

import { getBlogPostBySlug } from "./blogDb";
import { app, company, pricing } from "../shared/facts";
import { getVerifiedReviewMetadata, type VerifiedReviewMetadata } from "./reviewMetadata";

// ─── Organization Schema (every page) ────────────────────────────────
function getOrganizationSchema(): object {
  return {
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
}

// ─── WebSite Schema (homepage) ───────────────────────────────────────
function getWebSiteSchema(): object {
  return {
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
}

// ─── SoftwareApplication Schema ──────────────────────────────────────
function getSoftwareApplicationSchema(): object {
  return {
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
        price: pricing.quickCheck.price.toString(),
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        name: "Second Opinion",
        price: pricing.secondOpinion.price.toString(),
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        name: "Complete Care (Individual)",
        price: pricing.completeCareIndividual.price.toString(),
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        name: "Complete Care (Family)",
        price: pricing.completeCareFamily.price.toString(),
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock"
      }
    ]
  };
}

// ─── BreadcrumbList Schema ───────────────────────────────────────────
function getBreadcrumbSchema(items: Array<{ name: string; url: string }>): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`
    }))
  };
}

// ─── MedicalWebPage Schema (for conditions/symptoms/treatments) ──────
function getMedicalWebPageSchema(
  title: string,
  description: string,
  url: string,
  reviewMetadata?: VerifiedReviewMetadata,
): object {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: title,
    description: description,
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    publisher: {
      "@type": "Organization",
      name: "DentaSmart",
      url: SITE_URL
    },
    medicalAudience: {
      "@type": "PatientAudience",
      audienceType: "Patient"
    }
  };
  if (reviewMetadata) {
    schema.lastReviewed = reviewMetadata.lastReviewed;
    schema.reviewedBy = {
      "@type": "Person",
      name: reviewMetadata.reviewedBy,
      jobTitle: reviewMetadata.reviewedByCredentials,
    };
  }
  return schema;
}

// ─── Product Schema (pricing page) ──────────────────────────────────
function getProductSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "DentaSmart AI Oral Health App",
    description: "AI-powered educational oral health app with supported photo and X-ray reviews, an Oral Health Score, plain-language reports, treatment-information comparisons, tracking tools, and AI guidance.",
    brand: { "@type": "Brand", name: "DentaSmart" },
    url: `${SITE_URL}/pricing`,
    offers: [
      {
        "@type": "Offer",
        name: "Quick Check",
        description: "One-time educational review of supported mouth photos and X-rays with visible areas to discuss, an Oral Health Score, a patient-friendly report, and Dr Din access for 30 days.",
        price: pricing.quickCheck.price.toString(),
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`
      },
      {
        "@type": "Offer",
        name: "Second Opinion",
        description: "One-time educational comparison for one case using supported treatment plans, bills, X-rays, and mouth photos, with cost context and questions to discuss with a licensed dentist. Dr Din access for 30 days.",
        price: pricing.secondOpinion.price.toString(),
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`
      },
      {
        "@type": "Offer",
        name: "Complete Care (Individual)",
        description: "Year-round educational monitoring for one person with supported photo and X-ray reviews, reports, Oral Health Score tracking, guided self-examination, record organization, and Dr Din access.",
        price: pricing.completeCareIndividual.price.toString(),
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`
      },
      {
        "@type": "Offer",
        name: "Complete Care (Family)",
        description: "Year-round educational monitoring for up to 4 family members, with separate profiles, reports, Oral Health Score tracking, dental history, and Dr Din access.",
        price: pricing.completeCareFamily.price.toString(),
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`
      }
    ]
  };
}

// ─── HowTo Schema (how-it-works page) ───────────────────────────────
function getHowToSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Use DentaSmart as an AI Oral Health Guide",
    description: "Use DentaSmart in four steps to organize supported dental information, review educational insights, and prepare for professional care.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Add Your Information",
        text: "Add the supported photos, X-rays, symptoms, or treatment documents needed for the DentaSmart service you choose."
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "DentaSmart Reviews the Information",
        text: "DentaSmart organizes the submitted information and highlights details that may be worth discussing."
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Review Your Educational Report",
        text: "Review plain-language educational insights and the report contents included with your selected service."
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Prepare Questions and Monitor Records",
        text: "Use the report to prepare questions for a dentist and keep relevant records organized over time."
      }
    ]
  };
}

// ─── Main resolver ───────────────────────────────────────────────────
export async function resolveSchemaMarkup(urlPath: string): Promise<object[]> {
  const cleanPath = urlPath.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  const schemas: object[] = [];

  // Organization schema on every page
  schemas.push(getOrganizationSchema());

  // Homepage
  if (cleanPath === "/") {
    schemas.push(getWebSiteSchema());
    schemas.push(getSoftwareApplicationSchema());
    return schemas;
  }

  // How it works
  if (cleanPath === "/how-it-works") {
    schemas.push(getHowToSchema());
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "How It Works", url: "/how-it-works" }
    ]));
    return schemas;
  }

  // Pricing
  if (cleanPath === "/pricing") {
    schemas.push(getProductSchema());
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Pricing", url: "/pricing" }
    ]));
    return schemas;
  }

  // Download
  if (cleanPath === "/download") {
    schemas.push(getSoftwareApplicationSchema());
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Download", url: "/download" }
    ]));
    return schemas;
  }

  // Features
  if (cleanPath === "/features") {
    schemas.push(getSoftwareApplicationSchema());
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Features", url: "/features" }
    ]));
    return schemas;
  }

  // Conditions
  if (cleanPath === "/conditions") {
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Dental Conditions", url: "/conditions" }
    ]));
    return schemas;
  }
  if (cleanPath.startsWith("/conditions/")) {
    const slug = cleanPath.replace("/conditions/", "");
    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    schemas.push(getMedicalWebPageSchema(
      `${title} Guide`,
      `Learn about ${slug.replace(/-/g, ' ')} — causes, symptoms, treatment options, and when to see a dentist.`,
      cleanPath,
      getVerifiedReviewMetadata(cleanPath),
    ));
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Conditions", url: "/conditions" },
      { name: title, url: cleanPath }
    ]));
    return schemas;
  }

  // Symptoms
  if (cleanPath === "/symptoms") {
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Dental Symptoms", url: "/symptoms" }
    ]));
    return schemas;
  }
  if (cleanPath.startsWith("/symptoms/")) {
    const slug = cleanPath.replace("/symptoms/", "");
    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    schemas.push(getMedicalWebPageSchema(
      `${title}: Causes & What to Do`,
      `Experiencing ${slug.replace(/-/g, ' ')}? Learn the possible causes and when to see a dentist.`,
      cleanPath,
      getVerifiedReviewMetadata(cleanPath),
    ));
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Symptoms", url: "/symptoms" },
      { name: title, url: cleanPath }
    ]));
    return schemas;
  }

  // Dental Costs
  if (cleanPath === "/dental-costs") {
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Dental Costs", url: "/dental-costs" }
    ]));
    return schemas;
  }
  if (cleanPath.startsWith("/dental-costs/")) {
    const slug = cleanPath.replace("/dental-costs/", "");
    const title = slug.replace(/-cost$/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    // Cost pages have no verified clinical review date — omit lastReviewed
    schemas.push({
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: `${title} Cost Guide`,
      description: `Understand the cost of ${title.toLowerCase()} procedures, insurance coverage, and ways to save.`,
      url: `${SITE_URL}${cleanPath}/`,
      publisher: {
        "@type": "Organization",
        name: "DentaSmart",
        url: SITE_URL,
      },
      medicalAudience: {
        "@type": "PatientAudience",
        audienceType: "Patient",
      },
    });
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Dental Costs", url: "/dental-costs" },
      { name: `${title} Cost`, url: cleanPath }
    ]));
    return schemas;
  }

  // Treatments
  if (cleanPath === "/treatments") {
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Treatments", url: "/treatments" }
    ]));
    return schemas;
  }
  if (cleanPath.startsWith("/treatments/")) {
    const slug = cleanPath.replace("/treatments/", "");
    const title = slug.replace(/-procedure$|-treatment$/g, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    schemas.push(getMedicalWebPageSchema(
      `${title} Procedure Guide`,
      `Learn about the ${title.toLowerCase()} procedure, what to expect, recovery, and aftercare.`,
      cleanPath
    ));
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Treatments", url: "/treatments" },
      { name: title, url: cleanPath }
    ]));
    return schemas;
  }

  // Comparisons
  if (cleanPath === "/comparisons") {
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Comparisons", url: "/comparisons" }
    ]));
    return schemas;
  }
  if (cleanPath.startsWith("/comparisons/") || cleanPath.startsWith("/compare/")) {
    const slug = cleanPath.replace(/^\/(comparisons|compare)\//, "");
    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Comparisons", url: "/comparisons" },
      { name: title, url: cleanPath }
    ]));
    return schemas;
  }

  // Guides
  if (cleanPath === "/guides") {
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Guides", url: "/guides" }
    ]));
    return schemas;
  }
  if (cleanPath.startsWith("/guides/")) {
    const slug = cleanPath.replace("/guides/", "");
    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Guides", url: "/guides" },
      { name: title, url: cleanPath }
    ]));
    return schemas;
  }

  // Life Stages
  if (cleanPath === "/life-stages") {
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Life Stages", url: "/life-stages" }
    ]));
    return schemas;
  }
  if (cleanPath.startsWith("/life-stages/")) {
    const slug = cleanPath.replace("/life-stages/", "");
    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Life Stages", url: "/life-stages" },
      { name: title, url: cleanPath }
    ]));
    return schemas;
  }

  // Dental Emergencies
  if (cleanPath === "/dental-emergencies") {
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Dental Emergencies", url: "/dental-emergencies" }
    ]));
    return schemas;
  }
  if (cleanPath.startsWith("/dental-emergencies/")) {
    const slug = cleanPath.replace("/dental-emergencies/", "");
    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    schemas.push(getMedicalWebPageSchema(
      `${title}: Emergency Dental Care`,
      `A dental emergency guide for ${slug.replace(/-/g, ' ')}. What to do, when to get help.`,
      cleanPath
    ));
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Dental Emergencies", url: "/dental-emergencies" },
      { name: title, url: cleanPath }
    ]));
    return schemas;
  }

  // Lifestyle
  if (cleanPath === "/lifestyle") {
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Lifestyle & Oral Health", url: "/lifestyle" }
    ]));
    return schemas;
  }
  if (cleanPath.startsWith("/lifestyle/")) {
    const slug = cleanPath.replace("/lifestyle/", "");
    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Lifestyle", url: "/lifestyle" },
      { name: title, url: cleanPath }
    ]));
    return schemas;
  }

  // Oral Health Hub / Blog
  if (cleanPath === "/oral-health-hub") {
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Oral Health Hub", url: "/oral-health-hub" }
    ]));
    return schemas;
  }
  if (cleanPath.startsWith("/oral-health-hub/")) {
    const slug = cleanPath.replace("/oral-health-hub/", "");
    const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    // BlogPosting schema — use actual DB data when available
    const post = await getBlogPostBySlug(slug);
    if (post && post.status === "published") {
      const blogPosting: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.metaTitle || post.title,
        description: post.metaDescription || "",
        url: post.canonicalUrl || `${SITE_URL}/oral-health-hub/${post.slug}/`,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE_URL}/oral-health-hub/${post.slug}/`,
        },
        publisher: {
          "@type": "Organization",
          name: "DentaSmart",
          url: SITE_URL,
        },
      };
      if (post.featuredImage || post.ogImage) {
        blogPosting.image = post.featuredImage || post.ogImage;
      }
      if (post.publishedAt) {
        blogPosting.datePublished = new Date(post.publishedAt).toISOString();
      }
      if (post.updatedAt) {
        blogPosting.dateModified = new Date(post.updatedAt).toISOString();
      }
      if (post.reviewedByName) {
        blogPosting.author = {
          "@type": "Person",
          name: post.reviewedByName,
        };
      } else {
        blogPosting.author = {
          "@type": "Organization",
          name: "DentaSmart",
        };
      }
      schemas.push(blogPosting);
    }
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Oral Health Hub", url: "/oral-health-hub" },
      { name: title, url: cleanPath }
    ]));
    return schemas;
  }

  // FAQs
  if (cleanPath === "/faqs") {
    schemas.push(getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "FAQs", url: "/faqs" }
    ]));
    return schemas;
  }

  return schemas;
}
