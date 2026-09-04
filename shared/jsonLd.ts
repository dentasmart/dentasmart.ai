const SITE_URL = "https://dentasmart.ai";
const INTERNAL_HOSTS = new Set(["dentasmart.ai", "www.dentasmart.ai"]);

/**
 * Serializes JSON-LD safely for an inline script element while preserving the
 * original JSON value when it is parsed by consumers.
 */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/**
 * Applies DentaSmart's final public URL convention only to same-site schema
 * page URLs. External, malformed, asset, and file-like URLs are unchanged.
 */
export function normalizeInternalSchemaUrl(rawUrl: string): string {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return rawUrl;
  }

  if (!INTERNAL_HOSTS.has(url.hostname)) {
    return rawUrl;
  }

  url.protocol = "https:";
  url.hostname = "dentasmart.ai";
  url.pathname = url.pathname.replace(/\/{2,}/g, "/");

  const finalSegment = url.pathname.split("/").filter(Boolean).at(-1) ?? "";
  const isFileLike =
    /\.[a-z0-9]{1,10}$/i.test(finalSegment) ||
    finalSegment === "images" ||
    finalSegment === "assets";

  if (!isFileLike && url.pathname !== "/" && !url.pathname.endsWith("/")) {
    url.pathname += "/";
  }

  return url.toString();
}

/** Resolves relative DentaSmart schema paths before applying schema URL normalization. */
export function toSchemaUrl(value: string): string {
  return normalizeInternalSchemaUrl(value.startsWith("/") ? `${SITE_URL}${value}` : value);
}
