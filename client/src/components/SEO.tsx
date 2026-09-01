/**
 * SEO Component — JSON-LD Schema Injection Only
 *
 * IMPORTANT: Title, meta description, canonical URL, OG tags, and Twitter tags
 * are ALL injected server-side by server/metaTags.ts BEFORE the HTML reaches the browser.
 * This prevents duplicate meta tags that confuse SEMrush and Google crawlers.
 *
 * This component ONLY handles JSON-LD structured data injection via react-helmet-async,
 * because JSON-LD is additive (multiple scripts are valid) and doesn't cause duplication issues.
 *
 * DO NOT add <title>, <meta>, or <link rel="canonical"> here — they belong in server/metaTags.ts.
 */
import { Helmet } from 'react-helmet-async';
import { app, company, pricing, productTerminology } from "@shared/facts";

const SITE_URL = "https://dentasmart.ai";

interface SEOProps {
  title?: string; // Kept for backward compatibility but NOT rendered
  description?: string; // Kept for backward compatibility but NOT rendered
  canonical?: string; // Kept for backward compatibility but NOT rendered
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

export default function SEO({
  jsonLd,
}: SEOProps) {
  // Build default Organization JSON-LD
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DentaSmart",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: "Educational oral health guidance that helps people organize supported information and prepare questions for professional dental care.",
    sameAs: [
      company.social.instagram,
      company.social.linkedin,
    ],
  };

  // Build WebSite JSON-LD for homepage
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DentaSmart",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/answers?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // Build SoftwareApplication JSON-LD
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DentaSmart",
    operatingSystem: "iOS, Android",
    applicationCategory: "HealthApplication",
    description: "A free-to-download oral health education app with optional paid Quick Check, Second Opinion, and Complete Care services. It does not diagnose conditions or replace professional dental care.",
    downloadUrl: [app.iosUrl, app.androidUrl],
    offers: [
      {
        "@type": "Offer",
        name: "DentaSmart app download",
        price: "0",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: productTerminology.quickCheck,
        price: pricing.quickCheck.price.toFixed(2),
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: productTerminology.secondOpinion,
        price: pricing.secondOpinion.price.toFixed(2),
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: `${productTerminology.completeCare} Individual`,
        price: pricing.completeCareIndividual.price.toFixed(2),
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: `${productTerminology.completeCare} Family`,
        price: pricing.completeCareFamily.price.toFixed(2),
        priceCurrency: "USD",
      },
    ],
  };

  // Combine JSON-LD scripts
  const jsonLdScripts: Record<string, unknown>[] = [orgJsonLd, websiteJsonLd, appJsonLd];
  if (jsonLd) {
    if (Array.isArray(jsonLd)) {
      jsonLdScripts.push(...jsonLd);
    } else {
      jsonLdScripts.push(jsonLd);
    }
  }

  // Only render JSON-LD — no meta tags, no canonical, no title
  // Those are handled exclusively by server/metaTags.ts
  return (
    <Helmet>
      {jsonLdScripts.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
}
