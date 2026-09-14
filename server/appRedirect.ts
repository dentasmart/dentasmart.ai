import { CAMPAIGN_KEYS } from "@shared/analyticsContract";

/**
 * Redirects legacy /app entries to the final download page while preserving
 * only first-party campaign fields. Arbitrary query parameters never cross
 * this boundary because they can contain user or third-party data.
 */
export function getAppDownloadRedirectTarget(path: string, search = ""): string | null {
  if (path !== "/app" && !path.startsWith("/app/")) return null;

  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const preserved = new URLSearchParams();

  for (const key of CAMPAIGN_KEYS) {
    const value = params.get(key);
    if (value) preserved.set(key, value.slice(0, 120));
  }

  const query = preserved.toString();
  return query ? `/download/?${query}` : "/download/";
}
