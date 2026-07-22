/**
 * Database helpers for the not_found_log table.
 *
 * Paths are keyed by a SHA-256 hex digest (pathHash) to avoid InnoDB's
 * 3072-byte key-length limit on long varchar columns.
 */

import { createHash } from "crypto";
import { eq, desc, sql } from "drizzle-orm";
import { getDb } from "./db";
import { notFoundLog } from "../drizzle/schema";

/** Compute the SHA-256 hex digest of a normalised path. */
function hashPath(path: string): string {
  return createHash("sha256").update(path).digest("hex");
}

/**
 * Normalise a raw request path:
 *  - Strip query string
 *  - Strip trailing slash (except root "/")
 *  - Lower-case
 */
export function normalisePath(raw: string): string {
  const withoutQuery = raw.split("?")[0];
  const stripped = withoutQuery.replace(/\/+$/, "") || "/";
  return stripped.toLowerCase();
}

/**
 * Upsert a not-found hit using a raw INSERT … ON DUPLICATE KEY UPDATE.
 * Fire-and-forget safe — caller should .catch(() => {}) to avoid unhandled rejections.
 */
export async function upsertNotFoundHit(
  rawPath: string,
  referrer: string | null,
  isDryRun: boolean,
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  const path = normalisePath(rawPath);
  const pathHash = hashPath(path);

  await db.execute(sql`
    INSERT INTO not_found_log (pathHash, path, hitCount, isDryRun, lastReferrer)
    VALUES (${pathHash}, ${path}, 1, ${isDryRun ? 1 : 0}, ${referrer})
    ON DUPLICATE KEY UPDATE
      hitCount     = hitCount + 1,
      lastSeenAt   = NOW(),
      lastReferrer = ${referrer}
  `);
}

/** List all not-found log entries, ordered by hit count descending. */
export async function listNotFoundEntries(limit = 500) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(notFoundLog)
    .orderBy(desc(notFoundLog.hitCount))
    .limit(limit);
}

/** Delete a single not-found log entry by id. */
export async function deleteNotFoundEntry(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(notFoundLog).where(eq(notFoundLog.id, id));
}

/** Delete all not-found log entries (admin clear-all). */
export async function clearNotFoundLog(): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.delete(notFoundLog);
}
