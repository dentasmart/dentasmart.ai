import { normalizeSchemaUrls } from "./jsonLd";

/**
 * A versioned marker in the existing reviewerJsonLd column distinguishes
 * manual blog overrides from older supplemental JSON-LD without a DB migration.
 */
export const MANUAL_BLOG_SCHEMA_PREFIX = "DENTASMART_BLOG_SCHEMA_MANUAL_V1\n";

export function isManualBlogSchema(value?: string | null): boolean {
  return Boolean(value?.startsWith(MANUAL_BLOG_SCHEMA_PREFIX));
}
export function getManualBlogSchemaText(value: string): string {
  return isManualBlogSchema(value) ? value.slice(MANUAL_BLOG_SCHEMA_PREFIX.length) : "";
}
export function storeManualBlogSchema(text: string): string {
  return MANUAL_BLOG_SCHEMA_PREFIX + text;
}
function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}
function typesOf(value: Record<string, unknown>): string[] {
  const type = value["@type"];
  if (typeof type === "string" && type.trim()) return [type.trim()];
  return Array.isArray(type) && type.length > 0 && type.every(item => typeof item === "string" && item.trim())
    ? type as string[] : [];
}
/** Requires Schema.org JSON-LD and preserves server-owned sitewide identities. */
export function parseManualBlogSchema(text: string): { schema?: Record<string, unknown>; error?: string } {
  if (!text.trim()) return { error: "Enter JSON-LD before saving a manual schema." };
  if (/<\/script\s*>/i.test(text)) return { error: "JSON-LD must not contain a closing script tag." };
  let value: unknown;
  try { value = JSON.parse(text); } catch { return { error: "Manual schema must be valid JSON." }; }
  if (!isObject(value)) return { error: "Manual schema must be one JSON-LD object." };
  if (value["@context"] !== "https://schema.org") return { error: "Use @context: https://schema.org." };
  const graph = value["@graph"];
  if (graph !== undefined && (!Array.isArray(graph) || graph.length === 0 || !graph.every(isObject))) {
    return { error: "@graph must contain at least one schema object." };
  }
  const nodes = graph === undefined ? [value] : graph as Record<string, unknown>[];
  if (nodes.some(node => typesOf(node).length === 0)) {
    return { error: "Every schema node must declare a non-empty @type." };
  }
  if (nodes.some(node => typesOf(node).some(type => ["Organization", "WebSite"].includes(type)) ||
    ["https://dentasmart.ai/#organization", "https://dentasmart.ai/#website"].includes(String(node["@id"] || "")))) {
    return { error: "Organization and WebSite remain sitewide; they cannot be overridden in blog schema." };
  }
  return { schema: normalizeSchemaUrls(value) };
}
export function getPublicManualBlogSchema(input: { reviewerJsonLd?: string | null }): Record<string, unknown> | undefined {
  const value = input.reviewerJsonLd;
  return isManualBlogSchema(value) ? parseManualBlogSchema(getManualBlogSchemaText(value!)).schema : undefined;
}
