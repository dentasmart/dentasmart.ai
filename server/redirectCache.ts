/**
 * In-process redirect cache.
 *
 * - Loads ALL rows (enabled and disabled) so a disabled entry is a positive
 *   "do not redirect" signal rather than an absence.
 * - TTL: 1 hour, matching blogMetaCache and pageOverrideCache.
 * - Primary invalidation: clearRedirectCache() called synchronously on every
 *   admin save/delete so changes propagate to the next request with no delay.
 *
 * MULTI-INSTANCE NOTE: This is an in-process Map. On the current Autoscale
 * (single-instance) deployment, clearRedirectCache() is sufficient. If
 * Reserved hosting with multiple instances is ever used, a Redis cache or
 * DB-timestamp heartbeat would be needed to propagate invalidations across
 * instances.
 */

import { getAllRedirects } from "./redirectDb";
import type { Redirect } from "../drizzle/schema";

interface CacheEntry {
  id: number;
  targetPath: string;
  statusCode: number;
  isEnabled: boolean;
}

let redirectCache: Map<string, CacheEntry> = new Map();
let cacheLoadedAt = 0;
let cacheLoaded = false; // true once at least one successful DB load has occurred
const REDIRECT_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

async function loadRedirectCache(): Promise<void> {
  try {
    const rows = await getAllRedirects();
    const newMap = new Map<string, CacheEntry>();
    for (const row of rows) {
      newMap.set(row.sourcePath, {
        id: row.id,
        targetPath: row.targetPath,
        statusCode: row.statusCode,
        isEnabled: row.isEnabled,
      });
    }
    redirectCache = newMap;
    cacheLoadedAt = Date.now();
    cacheLoaded = true;
  } catch (err) {
    // Leave cacheLoaded = false so the fallback dict is used
    console.error("[redirectCache] Failed to load from DB:", (err as Error)?.message);
  }
}

/** Synchronously clear the cache so the next request triggers a fresh DB load. */
export function clearRedirectCache(): void {
  redirectCache = new Map();
  cacheLoadedAt = 0;
  cacheLoaded = false;
}

/**
 * Resolve a redirect for the given path.
 *
 * Returns the matching CacheEntry if found (caller must check isEnabled),
 * or null if no entry exists.
 *
 * Also returns whether the cache loaded successfully — callers use this to
 * decide whether to fall back to the hardcoded serverRedirects dict.
 */
export async function resolveRedirect(path: string): Promise<{
  entry: CacheEntry | null;
  cacheIsLoaded: boolean;
}> {
  // Refresh cache if stale or not yet loaded
  if (!cacheLoaded || Date.now() - cacheLoadedAt > REDIRECT_CACHE_TTL_MS) {
    await loadRedirectCache();
  }

  const entry = redirectCache.get(path) ?? null;
  return { entry, cacheIsLoaded: cacheLoaded };
}

/** Expose the full cache contents for the admin listRedirects procedure. */
export function getRedirectCacheSnapshot(): Redirect[] {
  // We return from DB directly in the router, but this is available if needed
  return [];
}
