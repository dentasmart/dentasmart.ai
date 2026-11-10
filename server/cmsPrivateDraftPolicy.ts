/**
 * Fail-closed production opt-in for private CMS draft writing.
 * Does not authorize publication, deletion or media uploads.
 */
export function canUseProductionCmsPrivateDrafts(input: {
  nodeEnv?: string;
  enabled?: string;
  jwtSecret?: string;
  databaseUrl?: string;
}): boolean {
  if (
    input.nodeEnv !== "production" ||
    input.enabled !== "1" ||
    !input.jwtSecret ||
    input.jwtSecret.length < 32 ||
    !input.databaseUrl
  ) return false;

  try {
    const url = new URL(input.databaseUrl);
    const db = decodeURIComponent(url.pathname.slice(1));
    return url.protocol === "mysql:" &&
      !!url.hostname &&
      !["localhost", "127.0.0.1"].includes(url.hostname) &&
      !!db &&
      !["dentasmart_test", "dentasmart_vitest"].includes(db);
  } catch {
    return false;
  }
}
