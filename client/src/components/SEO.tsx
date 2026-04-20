import { Helmet } from 'react-helmet-async';

const SITE_URL = "https://dentasmart.ai";
const DEFAULT_OG_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663137878519/bguxPMV2uwRUGpkQABmyXT/og-image_914b065d.png";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
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
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  keywords,
  noindex = false,
  jsonLd,
  article,
}: SEOProps) {
  const fullTitle = title.includes("DentaSmart") ? title : `${title} | DentaSmart`;
  // Normalize canonical: strip trailing slash (except root "/"), remove query params & hash
  const rawCanonical = canonical || `${SITE_URL}${typeof window !== "undefined" ? window.location.pathname : ""}`;
  const canonicalUrl = rawCanonical.endsWith("/") && rawCanonical !== `${SITE_URL}/`
    ? rawCanonical.slice(0, -1)
    : rawCanonical;
  const image = ogImage || DEFAULT_OG_IMAGE;

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

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="DentaSmart" />
      <meta property="og:locale" content="en_US" />

      {/* Article-specific OG tags */}
      {article?.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
      {article?.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
      {article?.author && <meta property="article:author" content={article.author} />}
      {article?.section && <meta property="article:section" content={article.section} />}
      {article?.tags?.map((tag, i) => <meta key={i} property="article:tag" content={tag} />)}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {jsonLdScripts.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
}
