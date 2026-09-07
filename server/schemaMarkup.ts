/**
 * Server-owned crawlable JSON-LD for source-controlled DentaSmart routes.
 * Client navigation uses the same shared schema model after removing these initial
 * response scripts, which avoids duplicated logical entities after hydration.
 */
import { getBlogPostBySlug } from "./blogDb";
import { getStaticMetaSnapshot } from "./metaTags";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  ORGANIZATION_ID,
  resolveStaticSchemaMarkup,
  type PageSchemaMetadata,
} from "../shared/schemaOwnership";
import { toSchemaUrl } from "../shared/jsonLd";
import { getVerifiedReviewMetadata } from "./reviewMetadata";

const SITE_URL = "https://dentasmart.ai";

interface ResolvedMetadata {
  title: string;
  description: string;
  canonical?: string | null;
}

function cleanPath(urlPath: string): string {
  return urlPath.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
}

function getStaticSchemaMetadata(urlPath: string, resolved?: ResolvedMetadata | null): PageSchemaMetadata | undefined {
  if (resolved?.canonical) {
    return {
      title: resolved.title,
      description: resolved.description,
      canonical: resolved.canonical,
    };
  }

  const path = cleanPath(urlPath);
  const staticMeta = getStaticMetaSnapshot()[path];
  if (!staticMeta) {
    if (![
      "/conditions/",
      "/symptoms/",
      "/treatments/",
      "/dental-costs/",
      "/dental-emergencies/",
      "/life-stages/",
      "/lifestyle/",
    ].some((prefix) => path.startsWith(prefix))) return undefined;

    const readableName = path
      .split("/")
      .filter(Boolean)
      .at(-1)
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase()) || "Oral Health";
    return {
      title: `${readableName} Guide`,
      description: `Educational information about ${readableName.toLowerCase()} and when to seek professional dental care.`,
      canonical: `${SITE_URL}${path}/`,
    };
  }
  return {
    title: staticMeta.title,
    description: staticMeta.description,
    canonical: path === "/" ? SITE_URL : `${SITE_URL}${path}/`,
  };
}

async function getBlogSchemas(cleanedPath: string): Promise<Record<string, unknown>[]> {
  const schemas: Record<string, unknown>[] = [getOrganizationSchema(), getWebSiteSchema()];
  const slug = cleanedPath.replace("/oral-health-hub/", "");
  if (!slug) return schemas;

  const post = await getBlogPostBySlug(slug);
  if (!post || post.status !== "published") return schemas;

  const blogPosting: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metaTitle || post.title,
    description: post.metaDescription || "",
    url: toSchemaUrl(post.canonicalUrl || `${SITE_URL}/oral-health-hub/${post.slug}/`),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": toSchemaUrl(`/oral-health-hub/${post.slug}/`),
    },
    publisher: { "@id": ORGANIZATION_ID },
  };
  if (post.featuredImage || post.ogImage) blogPosting.image = post.featuredImage || post.ogImage;
  if (post.publishedAt) blogPosting.datePublished = new Date(post.publishedAt).toISOString();
  if (post.updatedAt) blogPosting.dateModified = new Date(post.updatedAt).toISOString();
  blogPosting.author = post.reviewedByName
    ? { "@type": "Person", name: post.reviewedByName }
    : { "@id": ORGANIZATION_ID };
  schemas.push(blogPosting);
  return schemas;
}

/**
 * Produces initial-response schema. Confirmed 404 pages bypass this resolver.
 * Passing resolved metadata avoids a second database lookup from the HTML renderer.
 */
export async function resolveSchemaMarkup(
  urlPath: string,
  resolvedMetadata?: ResolvedMetadata | null,
): Promise<Record<string, unknown>[]> {
  const cleanedPath = cleanPath(urlPath);
  if (resolvedMetadata?.canonical === null) return [];

  if (cleanedPath.startsWith("/oral-health-hub/") && cleanedPath !== "/oral-health-hub") {
    return getBlogSchemas(cleanedPath);
  }

  const schemas = resolveStaticSchemaMarkup(cleanedPath, getStaticSchemaMetadata(cleanedPath, resolvedMetadata));
  const reviewMetadata = getVerifiedReviewMetadata(cleanedPath);
  if (reviewMetadata) {
    const medicalWebPage = schemas.find((schema) => schema["@type"] === "MedicalWebPage");
    if (medicalWebPage) {
      medicalWebPage.lastReviewed = reviewMetadata.lastReviewed;
      medicalWebPage.reviewedBy = {
        "@type": "Person",
        name: reviewMetadata.reviewedBy,
        jobTitle: reviewMetadata.reviewedByCredentials,
      };
    }
  }
  return schemas;
}
