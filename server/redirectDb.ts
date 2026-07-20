import { eq, sql } from "drizzle-orm";
import { getDb } from "./db";
import { redirects, type InsertRedirect, type Redirect } from "../drizzle/schema";

/** Return every row — enabled and disabled. Used to populate the cache. */
export async function getAllRedirects(): Promise<Redirect[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(redirects).orderBy(redirects.createdAt);
}

/** Upsert a redirect by sourcePath. */
export async function upsertRedirect(
  input: Omit<InsertRedirect, "id" | "hitCount" | "lastHitAt" | "createdAt" | "updatedAt">
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .insert(redirects)
    .values({
      sourcePath: input.sourcePath,
      targetPath: input.targetPath,
      statusCode: input.statusCode ?? 301,
      isEnabled: input.isEnabled ?? true,
      note: input.note ?? null,
    })
    .onDuplicateKeyUpdate({
      set: {
        targetPath: input.targetPath,
        statusCode: input.statusCode ?? 301,
        // Use ?? null so clearing a field writes NULL, not skips the column
        isEnabled: input.isEnabled ?? true,
        note: input.note ?? null,
      },
    });
}

/** Delete a redirect by id. */
export async function deleteRedirect(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(redirects).where(eq(redirects.id, id));
}

/**
 * Increment hitCount and set lastHitAt for a redirect.
 * Fire-and-forget — never awaited in the request path so it never blocks.
 */
export function incrementHit(id: number): void {
  getDb().then((db) => {
    if (!db) return;
    db.update(redirects)
      .set({
        hitCount: sql`${redirects.hitCount} + 1`,
        lastHitAt: new Date(),
      })
      .where(eq(redirects.id, id))
      .catch((err: Error) => {
        // Non-fatal — never block the redirect response
        console.error("[redirectDb] incrementHit failed:", err?.message);
      });
  }).catch(() => { /* ignore */ });
}
