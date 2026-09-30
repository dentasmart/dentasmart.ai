/**
 * SEO Component — client-navigation metadata and page-local JSON-LD.
 *
 * Server metadata is the authority for the initial response. This component mirrors
 * explicitly supplied values after client-side navigation, including the established
 * apex trailing-slash canonical format. Site-wide entities remain server-owned so
 * hydration does not create duplicate Organization, WebSite, or SoftwareApplication
 * objects.
 */
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import { useLayoutEffect } from "react";
import { normalizeSchemaUrls, serializeJsonLd, toSchemaUrl } from "@shared/jsonLd";
import { resolveStaticSchemaMarkup } from "@shared/schemaOwnership";
import { formatPageTitle } from "@shared/pageTitle";

interface SEOProps {
  title?: string;
  description?: string;
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

/**
 * The initial server response owns the baseline metadata. React Helmet adds
 * client-side metadata after SPA navigation, so normalize these two singleton
 * tags to prevent a prior route's canonical or og:url from remaining in head.
 */
export function reconcileCanonicalAndOpenGraphUrl(
  documentRef: Pick<Document, "createElement" | "head" | "querySelectorAll">,
  canonical?: string,
  noindex = false,
): void {
  const canonicalSelector = 'link[rel="canonical"]';
  const ogUrlSelector = 'meta[property="og:url"]';
  const removeAll = (selector: string) => {
    Array.from(documentRef.querySelectorAll<HTMLElement>(selector)).forEach((element) => element.remove());
  };

  if (noindex) {
    removeAll(canonicalSelector);
    removeAll(ogUrlSelector);
    return;
  }

  if (!canonical) return;

  const reconcile = (selector: string, tagName: "link" | "meta", attribute: "href" | "content") => {
    const matches = Array.from(documentRef.querySelectorAll<HTMLElement>(selector));
    const preferred = matches.find((element) => element.hasAttribute("data-loc")) ?? matches[0];
    const retained = preferred ?? documentRef.createElement(tagName);

    if (!preferred) {
      if (tagName === "link") retained.setAttribute("rel", "canonical");
      if (tagName === "meta") retained.setAttribute("property", "og:url");
      documentRef.head.appendChild(retained);
    }

    retained.setAttribute(attribute, canonical);
    matches.filter((element) => element !== retained).forEach((element) => element.remove());
  };

  reconcile(canonicalSelector, "link", "href");
  reconcile(ogUrlSelector, "meta", "content");
}

export default function SEO({
  title,
  description,
  canonical,
  ogImage,
  ogType,
  noindex,
  jsonLd,
  article,
}: SEOProps) {
  const [location] = useLocation();
  const pageLocalSchemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const normalizedCanonical = canonical ? toSchemaUrl(canonical) : undefined;
  const pageTitle = title ? formatPageTitle(title) : undefined;
  const robots = noindex ? "noindex, nofollow" : undefined;
  const serverOwnedTypes = new Set([
    "Organization",
    "WebSite",
    "SoftwareApplication",
    "Product",
    "BreadcrumbList",
    "MedicalWebPage",
    "WebPage",
  ]);
  const isVerifiedArticleReviewWebPage = (schema: Record<string, unknown>) => (
    schema["@type"] === "WebPage" &&
    (typeof schema.lastReviewed === "string" || Boolean(schema.reviewedBy))
  );
  const staticSchemas = !noindex && title && description && normalizedCanonical
    ? resolveStaticSchemaMarkup(location, {
      title,
      description,
      canonical: normalizedCanonical,
    })
    : [];
  const jsonLdScripts = [
    ...staticSchemas,
    ...pageLocalSchemas.filter((schema) => (
      !serverOwnedTypes.has(schema["@type"] as string) || isVerifiedArticleReviewWebPage(schema)
    )),
  ].map((schema) => normalizeSchemaUrls(schema));

  useLayoutEffect(() => {
    document
      .querySelectorAll('script[type="application/ld+json"][data-dentasmart-schema="server"]')
      .forEach((script) => script.remove());
    reconcileCanonicalAndOpenGraphUrl(document, normalizedCanonical, noindex);
  }, [location, noindex, normalizedCanonical]);

  return (
    <Helmet>
      {pageTitle && <title>{pageTitle}</title>}
      {description && <meta name="description" content={description} />}
      {robots && <meta name="robots" content={robots} />}
      {pageTitle && <meta property="og:title" content={pageTitle} />}
      {description && <meta property="og:description" content={description} />}
      {ogType && <meta property="og:type" content={ogType} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {!noindex && normalizedCanonical && (
        <>
          <link rel="canonical" href={normalizedCanonical} />
          <meta property="og:url" content={normalizedCanonical} />
        </>
      )}
      {pageTitle && <meta name="twitter:title" content={pageTitle} />}
      {description && <meta name="twitter:description" content={description} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {article?.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
      {article?.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
      {article?.author && <meta property="article:author" content={article.author} />}
      {article?.section && <meta property="article:section" content={article.section} />}
      {article?.tags?.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}
      {jsonLdScripts.map((ld, index) => (
        <script key={index} type="application/ld+json" data-dentasmart-schema="client">
          {serializeJsonLd(ld)}
        </script>
      ))}
    </Helmet>
  );
}
