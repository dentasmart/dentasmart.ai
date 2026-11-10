import { normalizeSchemaUrls } from "./jsonLd";

/**
 * Manual schema for the PRIVATE Advanced CMS preview only.
 * Never allow an editor to replace sitewide Organization / WebSite identities.
 */
export function parseManualCmsSchema(text: string): { schema?: Record<string, unknown>; error?: string } {
  if (!text.trim()) return { error: "Enter JSON-LD before saving a manual schema." };
  if (text.toLowerCase().includes("</script")) return { error: "JSON-LD must not contain a closing script tag." };
  let value: unknown;
  try { value = JSON.parse(text); } catch { return { error: "Manual schema must be valid JSON." }; }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { error: "Manual schema must be one JSON-LD object." };
  }
  const object = value as Record<string, unknown>;
  if (object["@context"] !== "https://schema.org") {
    return { error: "Use @context: https://schema.org." };
  }
  const graph = object["@graph"];
  if (graph !== undefined && (!Array.isArray(graph) || graph.length === 0 ||
    !graph.every(node => node && typeof node === "object" && !Array.isArray(node)))) {
    return { error: "@graph must contain at least one schema object." };
  }
  const nodes: Record<string, unknown>[] = graph
    ? graph as Record<string, unknown>[] : [object];
  for (const node of nodes) {
    const type = node["@type"];
    const types = typeof type === "string" && type.trim() ? [type.trim()] :
      Array.isArray(type) && type.length && type.every(item => typeof item === "string" && item.trim())
        ? type as string[] : [];
    if (types.length === 0) return { error: "Every schema node must declare a non-empty @type." };
    if (types.some(item => ["Organization", "WebSite"].includes(item)) ||
      ["https://dentasmart.ai/#organization", "https://dentasmart.ai/#website"].includes(String(node["@id"] || ""))) {
      return { error: "Organization and WebSite are sitewide; they cannot be overridden in Advanced CMS." };
    }
    if (types.some(item => ["BlogPosting", "Blog", "LiveBlogPosting"].includes(item))) {
      return { error: "Blog markup belongs in the separate Blog Editor, not Advanced CMS." };
    }
  }
  return { schema: normalizeSchemaUrls(object) };
}
