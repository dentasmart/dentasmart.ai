/**
 * Admin-only Blog Editor revision history. Not part of Advanced CMS revisions.
 * Storage is enabled ONLY in the exact isolated Codespace test database and
 * only after the separate TEST_ONLY_blog_post_revisions.sql migration exists.
 * History reads never create, restore, publish or unpublish an article.
 */
import { desc, eq, sql } from "drizzle-orm";
import { blogPostRevisions, type BlogPost } from "../drizzle/schema";
import { getDb } from "./db";
import { isCmsTestPublicationEnvironment } from "./cmsTestPublication";

type Db = NonNullable<Awaited<ReturnType<typeof getDb>>>;
export type BlogRevisionAction = "baseline" | "created" | "saved" | "published" | "unpublished";

let tableCache: { available: boolean; checkedAt: number } | null = null;
export async function isBlogRevisionHistoryAvailable(db: Db): Promise<boolean> {
  if (!isCmsTestPublicationEnvironment()) return false;
  const now = Date.now();
  if (tableCache && now - tableCache.checkedAt < (tableCache.available ? 60000 : 5000)) {
    return tableCache.available;
  }
  const result = await db.execute(sql`
    SELECT table_name AS table_name FROM information_schema.tables
    WHERE table_schema = DATABASE() AND table_name = 'blog_post_revisions'
  `) as unknown as [{ table_name: string }[], unknown];
  const available = result[0].length > 0;
  tableCache = { available, checkedAt: now };
  return available;
}

/**
 * Must run inside the transaction that inserts/updates the blog_posts row.
 * Locks on the parent row prevent concurrent edits from using the same number.
 */
export async function appendBlogPostRevision(
  tx: any, postId: number, previous: BlogPost | null,
  current: BlogPost, action: BlogRevisionAction,
): Promise<void> {
  const [last] = await tx.select({ revision: blogPostRevisions.revision })
    .from(blogPostRevisions).where(eq(blogPostRevisions.blogPostId, postId))
    .orderBy(desc(blogPostRevisions.revision)).limit(1);

  if (!last && previous) {
    await tx.insert(blogPostRevisions).values({
      blogPostId: postId, revision: 0, action: "baseline", snapshot: previous,
    });
  }
  await tx.insert(blogPostRevisions).values({
    blogPostId: postId, revision: last ? last.revision + 1 : 1,
    action, snapshot: current,
  });
}

export function inferBlogRevisionAction(
  previous: { status: BlogPost["status"] } | null,
  next: { status: BlogPost["status"] },
): BlogRevisionAction {
  if (!previous) return "created";
  if (previous.status !== "published" && next.status === "published") return "published";
  if (previous.status === "published" && next.status === "unpublished") return "unpublished";
  return "saved";
}

export async function listBlogRevisions(blogPostId: number) {
  const db = await getDb();
  if (!db || !(await isBlogRevisionHistoryAvailable(db))) {
    return { available: false, revisions: [] as { revision: number; action: BlogRevisionAction; createdAt: Date; title: string; status: BlogPost["status"] }[] };
  }
  const records = await db.select({
    revision: blogPostRevisions.revision,
    action: blogPostRevisions.action,
    createdAt: blogPostRevisions.createdAt,
    snapshot: blogPostRevisions.snapshot,
  }).from(blogPostRevisions).where(eq(blogPostRevisions.blogPostId, blogPostId))
    .orderBy(desc(blogPostRevisions.revision)).limit(50);
  return { available: true, revisions: records.map(({ snapshot, ...item }) => ({
    ...item, title: snapshot.title, status: snapshot.status,
  })) };
}

export async function getBlogRevision(blogPostId: number, revision: number) {
  const db = await getDb();
  if (!db || !(await isBlogRevisionHistoryAvailable(db))) return null;
  const [record] = await db.select().from(blogPostRevisions).where(
    sql`${blogPostRevisions.blogPostId} = ${blogPostId} AND ${blogPostRevisions.revision} = ${revision}`
  ).limit(1);
  return record ? { revision: record.revision, action: record.action, createdAt: record.createdAt, snapshot: record.snapshot } : null;
}
