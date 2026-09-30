import { normalizeSchemaUrls, toSchemaUrl } from "./jsonLd";

const SITE_URL = "https://dentasmart.ai";
const INTERNAL_HOSTS = new Set(["dentasmart.ai", "www.dentasmart.ai"]);
const CONFLICTING_ROOT_SCHEMA_TYPES = new Set([
  "Article",
  "BlogPosting",
  "NewsArticle",
  "WebPage",
  "MedicalWebPage",
  "Person",
]);

export type BlogReviewerMetadataField =
  | "reviewedByName"
  | "reviewedByCredentials"
  | "reviewerShortBio"
  | "reviewerProfileUrl"
  | "lastReviewed"
  | "reviewerJsonLd";

export interface BlogReviewerMetadataInput {
  reviewedByName?: string | null;
  reviewedByCredentials?: string | null;
  reviewerShortBio?: string | null;
  reviewerProfileUrl?: string | null;
  lastReviewed?: string | null;
  reviewerJsonLd?: string | null;
}

export interface PublicBlogReviewerMetadata {
  name: string;
  profileUrl: string;
  credentials?: string;
  shortBio?: string;
}

export interface BlogReviewerMetadataValidation {
  hasAnyReviewInput: boolean;
  /** True only when a name and valid first-party reviewer profile are present. */
  isComplete: boolean;
  publicMetadata?: PublicBlogReviewerMetadata;
  errors: Array<{ field: BlogReviewerMetadataField; message: string }>;
}

function valueOrUndefined(value?: string | null): string | undefined {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

export function isValidLastReviewedDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function isReviewerProfilePath(pathname: string, hash: string): boolean {
  const normalized = pathname === "/team" ? "/team/" : pathname;
  if (normalized === "/team/") return hash.length >= 2;
  if (normalized.startsWith("/team/")) return true;
  return normalized.startsWith("/authors/") && normalized.length > "/authors/".length;
}

/**
 * Allows only secure, first-party DentaSmart reviewer or author profile URLs.
 * The current Team anchor works, while future first-party Team or author profile
 * pages can be used without loosening the external-domain boundary.
 */
export function normalizeReviewerProfileUrl(value: string): string | null {
  let url: URL;
  try {
    url = new URL(value, SITE_URL);
  } catch {
    return null;
  }

  if (url.protocol !== "https:" || !INTERNAL_HOSTS.has(url.hostname.toLowerCase())) return null;
  if (url.username || url.password || url.search) return null;
  if (!isReviewerProfilePath(url.pathname, url.hash)) return null;

  url.protocol = "https:";
  url.hostname = "dentasmart.ai";
  url.pathname = url.pathname === "/team" ? "/team/" : url.pathname;
  return url.toString();
}

function rootSchemaTypes(schema: Record<string, unknown>): string[] | undefined {
  const type = schema["@type"];
  if (typeof type === "string" && type.trim()) return [type];
  if (Array.isArray(type) && type.length > 0 && type.every((value) => typeof value === "string" && value.trim())) {
    return type as string[];
  }
  return undefined;
}

function containsReviewerOverride(value: unknown): boolean {
  if (Array.isArray(value)) return value.some(containsReviewerOverride);
  if (!value || typeof value !== "object") return false;

  const schema = value as Record<string, unknown>;
  if ("reviewedBy" in schema || "lastReviewed" in schema) return true;
  return Object.values(schema).some(containsReviewerOverride);
}

/**
 * Parses an optional supplemental Schema.org object while preserving source-owned
 * Article, reviewer, and WebPage schema. The inline script serializer remains a
 * second safety boundary; literal closing-script text is rejected before output.
 */
export function parseSupplementalReviewerJsonLd(value: string): {
  value?: Record<string, unknown>;
  error?: string;
} {
  if (/<\/script\s*>/i.test(value)) {
    return { error: "Custom JSON-LD cannot contain a closing script tag." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    return { error: "Custom JSON-LD must be valid JSON." };
  }

  if (!parsed || Array.isArray(parsed) || typeof parsed !== "object") {
    return { error: "Custom JSON-LD must be one schema object, not an array or scalar." };
  }

  const schema = parsed as Record<string, unknown>;
  if (schema["@context"] !== "https://schema.org") {
    return { error: "Custom JSON-LD must use @context: https://schema.org." };
  }

  const types = rootSchemaTypes(schema);
  if (!types) {
    return { error: "Custom JSON-LD must include a non-empty @type." };
  }
  if (types.some((type) => CONFLICTING_ROOT_SCHEMA_TYPES.has(type))) {
    return { error: "Custom JSON-LD cannot replace source-controlled Article, BlogPosting, WebPage, Person, or reviewer schema." };
  }
  if (containsReviewerOverride(schema)) {
    return { error: "Custom JSON-LD cannot set reviewedBy or lastReviewed; those fields are source-controlled." };
  }

  return { value: normalizeSchemaUrls(schema) };
}

/**
 * Resolves public reviewer attribution fail-closed. Legacy name or credential
 * values without a current first-party profile remain editorial history only.
 */
export function validateBlogReviewerMetadata(
  input: BlogReviewerMetadataInput,
): BlogReviewerMetadataValidation {
  const name = valueOrUndefined(input.reviewedByName);
  const credentials = valueOrUndefined(input.reviewedByCredentials);
  const shortBio = valueOrUndefined(input.reviewerShortBio);
  const profileUrlInput = valueOrUndefined(input.reviewerProfileUrl);
  const lastReviewed = valueOrUndefined(input.lastReviewed);
  const reviewerJsonLd = valueOrUndefined(input.reviewerJsonLd);
  const errors: BlogReviewerMetadataValidation["errors"] = [];

  let profileUrl: string | undefined;
  if (profileUrlInput) {
    profileUrl = normalizeReviewerProfileUrl(profileUrlInput) || undefined;
    if (!profileUrl) {
      errors.push({
        field: "reviewerProfileUrl",
        message: "Reviewer profile URL must be a secure first-party DentaSmart Team or author profile URL, such as /team/#dr-saba-ahmed or /authors/dr-saba-ahmed/.",
      });
    }
  }

  if (lastReviewed && !isValidLastReviewedDate(lastReviewed)) {
    errors.push({
      field: "lastReviewed",
      message: "Last reviewed must be a real date in YYYY-MM-DD format.",
    });
  }

  if (reviewerJsonLd) {
    const parsed = parseSupplementalReviewerJsonLd(reviewerJsonLd);
    if (parsed.error) errors.push({ field: "reviewerJsonLd", message: parsed.error });
  }

  // Reviewer attribution has its own proof requirement. An independently invalid
  // date or supplemental schema remains unavailable, but it does not erase an
  // otherwise valid, manually assigned reviewer from a pre-existing article.
  const isComplete = Boolean(name && profileUrl);

  return {
    hasAnyReviewInput: Boolean(name || credentials || shortBio || profileUrlInput || lastReviewed || reviewerJsonLd),
    isComplete,
    ...(isComplete ? {
      publicMetadata: {
        name: name!,
        profileUrl: toSchemaUrl(profileUrl!),
        ...(credentials ? { credentials } : {}),
        ...(shortBio ? { shortBio } : {}),
      },
    } : {}),
    errors,
  };
}

/** Returns only validated metadata eligible for public reviewer attribution. */
export function getPublicBlogReviewerMetadata(
  input: BlogReviewerMetadataInput,
): PublicBlogReviewerMetadata | undefined {
  return validateBlogReviewerMetadata(input).publicMetadata;
}

/** Returns only a manually stored, valid review date; it is independent of reviewer attribution. */
export function getPublicLastReviewed(input: Pick<BlogReviewerMetadataInput, "lastReviewed">): string | undefined {
  const lastReviewed = valueOrUndefined(input.lastReviewed);
  return lastReviewed && isValidLastReviewedDate(lastReviewed) ? lastReviewed : undefined;
}

/** Returns valid supplemental schema independently of reviewer attribution. */
export function getPublicSupplementalJsonLd(
  input: Pick<BlogReviewerMetadataInput, "reviewerJsonLd">,
): Record<string, unknown> | undefined {
  const value = valueOrUndefined(input.reviewerJsonLd);
  return value ? parseSupplementalReviewerJsonLd(value).value : undefined;
}

/**
 * Schema.org assigns reviewedBy and lastReviewed to WebPage, not BlogPosting.
 * The companion node therefore carries a valid explicit last-reviewed date alone
 * or that date together with separately verified reviewer attribution.
 */
export function buildBlogReviewWebPageSchema(input: {
  canonicalUrl: string;
  title: string;
  description: string;
  lastReviewed?: string;
  review?: PublicBlogReviewerMetadata;
}): Record<string, unknown> {
  const canonicalUrl = toSchemaUrl(input.canonicalUrl);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: input.title,
    description: input.description,
    ...(input.lastReviewed ? { lastReviewed: input.lastReviewed } : {}),
    ...(input.review ? {
      reviewedBy: {
        "@type": "Person",
        name: input.review.name,
        ...(input.review.credentials ? { jobTitle: input.review.credentials } : {}),
        ...(input.review.shortBio ? { description: input.review.shortBio } : {}),
        url: input.review.profileUrl,
      },
    } : {}),
  };
}

export function formatReviewedDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00.000Z`));
}
