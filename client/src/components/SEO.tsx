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
    description: "AI-powered dental health analysis and personalized oral care guidance.",
    sameAs: [
      "https://www.instagram.com/dentasmart.ai",
      "https://www.linkedin.com/company/dentasmart",
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
    description: "AI-powered dental health analysis app. Upload a photo of your teeth or X-rays and get instant insights with a personalized care plan.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1200",
      bestRating: "5",
      worstRating: "1",
    },
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
