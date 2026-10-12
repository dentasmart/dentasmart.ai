import { eq, like, and, or, desc, asc, sql, isNull } from "drizzle-orm";
import { getDb } from "./db";
import { blogPosts, adminUsers, blogCategories, InsertBlogPost, BlogPost, InsertAdminUser, BlogCategory, InsertBlogCategory } from "../drizzle/schema";
import bcrypt from "bcryptjs";
import { selectBlogCardHero } from "./blogCardHero";

type PendingReviewerMetadataColumn =
  | "reviewerShortBio"
  | "reviewerProfileUrl"
  | "lastReviewed"
  | "reviewerJsonLd";

type LegacyBlogPost = Omit<BlogPost, PendingReviewerMetadataColumn>;
type DatabaseClient = NonNullable<Awaited<ReturnType<typeof getDb>>>;

const pendingReviewerMetadataColumns = [
  "reviewerShortBio",
  "reviewerProfileUrl",
  "lastReviewed",
  "reviewerJsonLd",
] as const satisfies readonly PendingReviewerMetadataColumn[];

export const REVIEWER_METADATA_MIGRATION_PENDING_MESSAGE =
  "Reviewer metadata is unavailable until migration 0017_blog_reviewer_metadata is applied. No reviewer metadata was saved.";

const legacyBlogPostSelection = {
  id: blogPosts.id,
  title: blogPosts.title,
  slug: blogPosts.slug,
  category: blogPosts.category,
  readTime: blogPosts.readTime,
  problemHeading: blogPosts.problemHeading,
  problemContent: blogPosts.problemContent,
  empathyHeading: blogPosts.empathyHeading,
  empathyContent: blogPosts.empathyContent,
  solutionHeading: blogPosts.solutionHeading,
  solutionContent: blogPosts.solutionContent,
  changeHeading: blogPosts.changeHeading,
  changeContent: blogPosts.changeContent,
  resultHeading: blogPosts.resultHeading,
  resultContent: blogPosts.resultContent,
  bodyHtml: blogPosts.bodyHtml,
  metaTitle: blogPosts.metaTitle,
  metaDescription: blogPosts.metaDescription,
  metaKeywords: blogPosts.metaKeywords,
  ogTitle: blogPosts.ogTitle,
  ogDescription: blogPosts.ogDescription,
  ogImage: blogPosts.ogImage,
  canonicalUrl: blogPosts.canonicalUrl,
  primaryKeyword: blogPosts.primaryKeyword,
  secondaryKeywords: blogPosts.secondaryKeywords,
  atAGlanceAnswer: blogPosts.atAGlanceAnswer,
  keyTakeaways: blogPosts.keyTakeaways,
  whenUrgent: blogPosts.whenUrgent,
  faqs: blogPosts.faqs,
  relatedPosts: blogPosts.relatedPosts,
  reviewedByName: blogPosts.reviewedByName,
  reviewedByCredentials: blogPosts.reviewedByCredentials,
  governanceCandidateId: blogPosts.governanceCandidateId,
  governanceIntentOwnerId: blogPosts.governanceIntentOwnerId,
  categoryId: blogPosts.categoryId,
  subcategoryId: blogPosts.subcategoryId,
  status: blogPosts.status,
  featuredImage: blogPosts.featuredImage,
  publishedAt: blogPosts.publishedAt,
  createdAt: blogPosts.createdAt,
  updatedAt: blogPosts.updatedAt,
};

const legacyBlogPostWriteColumns = [
  "id",
  "title",
  "slug",
  "category",
  "readTime",
  "problemHeading",
  "problemContent",
  "empathyHeading",
  "empathyContent",
  "solutionHeading",
  "solutionContent",
  "changeHeading",
  "changeContent",
  "resultHeading",
  "resultContent",
  "bodyHtml",
  "metaTitle",
  "metaDescription",
  "metaKeywords",
  "ogTitle",
  "ogDescription",
  "ogImage",
  "canonicalUrl",
  "primaryKeyword",
  "secondaryKeywords",
  "atAGlanceAnswer",
  "keyTakeaways",
  "whenUrgent",
  "faqs",
  "relatedPosts",
  "reviewedByName",
  "reviewedByCredentials",
  "governanceCandidateId",
  "governanceIntentOwnerId",
  "categoryId",
  "subcategoryId",
  "status",
  "featuredImage",
  "publishedAt",
  "createdAt",
  "updatedAt",
] as const satisfies readonly Exclude<keyof InsertBlogPost, PendingReviewerMetadataColumn>[];

type BlogListResult = { posts: BlogPost[]; total: number };

let reviewerMetadataColumnsAvailable: { value: boolean; checkedAt: number } | null = null;
const REVIEWER_METADATA_SCHEMA_TTL_MS = 60_000;
const PENDING_REVIEWER_METADATA_SCHEMA_RECHECK_MS = 5_000;

function withUnavailableReviewerMetadata(post: LegacyBlogPost): BlogPost {
  return {
    ...post,
    reviewerShortBio: null,
    reviewerProfileUrl: null,
    lastReviewed: null,
    reviewerJsonLd: null,
  };
}

function pendingReviewerMetadataWrite(data: Partial<InsertBlogPost>): boolean {
  // The editor omits empty inputs, but API clients may serialize those same
  // empty nullable fields as `null`. Neither form is a reviewer write on a
  // pre-0017 database, so only a non-empty value must fail closed.
  return pendingReviewerMetadataColumns.some((column) => data[column] != null);
}

function assertLegacyReviewerMetadataWriteSafe(data: Partial<InsertBlogPost>): void {
  if (pendingReviewerMetadataWrite(data)) {
    throw new Error(REVIEWER_METADATA_MIGRATION_PENDING_MESSAGE);
  }
}

export function isReviewerMetadataMigrationPendingError(error: unknown): error is Error {
  return error instanceof Error && error.message === REVIEWER_METADATA_MIGRATION_PENDING_MESSAGE;
}

function legacyBlogPostWriteEntries(data: Partial<InsertBlogPost>) {
  return legacyBlogPostWriteColumns.flatMap((column) => {
    const value = data[column];
    return value === undefined ? [] : [[column, value] as const];
  });
}

async function hasReviewerMetadataColumns(db: DatabaseClient): Promise<boolean> {
  const now = Date.now();
  const cacheTtl = reviewerMetadataColumnsAvailable?.value
    ? REVIEWER_METADATA_SCHEMA_TTL_MS
    : PENDING_REVIEWER_METADATA_SCHEMA_RECHECK_MS;
  if (reviewerMetadataColumnsAvailable && now - reviewerMetadataColumnsAvailable.checkedAt < cacheTtl) {
    return reviewerMetadataColumnsAvailable.value;
  }

  const result = await db.execute(sql`
    SELECT column_name AS column_name
    FROM information_schema.columns
    WHERE table_schema = DATABASE()
      AND table_name = 'blog_posts'
      AND column_name IN ('reviewerShortBio', 'reviewerProfileUrl', 'lastReviewed', 'reviewerJsonLd')
  `) as unknown as [{ column_name: string }[], unknown];
  const existingColumns = new Set(result[0].map((row) => row.column_name));
  const value = pendingReviewerMetadataColumns.every((column) => existingColumns.has(column));
  reviewerMetadataColumnsAvailable = { value, checkedAt: now };
  return value;
}

async function insertLegacyBlogPost(db: DatabaseClient, data: InsertBlogPost): Promise<number> {
  assertLegacyReviewerMetadataWriteSafe(data);
  const entries = legacyBlogPostWriteEntries(data);
  if (entries.length === 0) throw new Error("Blog post data is required");

  const columns = sql.join(entries.map(([column]) => sql.identifier(column)), sql`, `);
  const values = sql.join(entries.map(([, value]) => sql`${value}`), sql`, `);
  const executionResult: unknown = await db.execute(sql`INSERT INTO ${sql.identifier("blog_posts")} (${columns}) VALUES (${values})`);
  const [result] = executionResult as [{ insertId: number }, unknown];
  return Number(result.insertId);
}

async function updateLegacyBlogPost(db: DatabaseClient, id: number, data: Partial<InsertBlogPost>): Promise<void> {
  assertLegacyReviewerMetadataWriteSafe(data);
  // Drizzle adds `onUpdateNow()` fields to ordinary updates. Mirror that
  // behavior on the legacy explicit-column path rather than leaving a stale
  // CMS update timestamp until migration 0017 is applied.
  const entries = legacyBlogPostWriteEntries({
    ...data,
    updatedAt: data.updatedAt ?? new Date(),
  });
  if (entries.length === 0) return;

  const assignments = sql.join(entries.map(([column, value]) => sql`${sql.identifier(column)} = ${value}`), sql`, `);
  await db.execute(sql`UPDATE ${sql.identifier("blog_posts")} SET ${assignments} WHERE ${sql.identifier("id")} = ${id}`);
}

export function resetBlogPostSchemaCompatibilityCacheForTests(): void {
  reviewerMetadataColumnsAvailable = null;
}

// ============ Admin User Helpers ============

export async function createAdminUser(username: string, password: string, displayName?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const passwordHash = await bcrypt.hash(password, 12);
  await db.insert(adminUsers).values({
    username,
    passwordHash,
    displayName: displayName || username,
  }).onDuplicateKeyUpdate({
    set: { passwordHash, displayName: displayName || username },
  });
}

export async function verifyAdminCredentials(username: string, password: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const results = await db.select().from(adminUsers).where(eq(adminUsers.username, username)).limit(1);
  if (results.length === 0) return null;

  const admin = results[0];
  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) return null;

  return { id: admin.id, username: admin.username, displayName: admin.displayName };
}

export async function getAdminById(id: number) {
  const db = await getDb();
  if (!db) return null;

  const results = await db.select({
    id: adminUsers.id,
    username: adminUsers.username,
    displayName: adminUsers.displayName,
  }).from(adminUsers).where(eq(adminUsers.id, id)).limit(1);

  return results.length > 0 ? results[0] : null;
}

// ============ Blog Post Helpers ============

export async function createBlogPost(data: InsertBlogPost): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  if (!(await hasReviewerMetadataColumns(db))) {
    return insertLegacyBlogPost(db, data);
  }
  const result = await db.insert(blogPosts).values(data);
  return Number(result[0].insertId);
}

export async function updateBlogPost(id: number, data: Partial<InsertBlogPost>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  if (!(await hasReviewerMetadataColumns(db))) {
    await updateLegacyBlogPost(db, id, data);
    return;
  }
  await db.update(blogPosts).set(data).where(eq(blogPosts.id, id));
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

export async function getBlogPostById(id: number): Promise<BlogPost | null> {
  const db = await getDb();
  if (!db) return null;

  if (!(await hasReviewerMetadataColumns(db))) {
    const results = await db.select(legacyBlogPostSelection).from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    return results.length > 0 ? withUnavailableReviewerMetadata(results[0]) : null;
  }
  const results = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return results.length > 0 ? results[0] : null;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const db = await getDb();
  if (!db) return null;

  if (!(await hasReviewerMetadataColumns(db))) {
    const results = await db.select(legacyBlogPostSelection).from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    return results.length > 0 ? withUnavailableReviewerMetadata(results[0]) : null;
  }
  const results = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return results.length > 0 ? results[0] : null;
}

export async function listBlogPosts(options: {
  category?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  publishedOnly?: boolean;
  cardView?: boolean;
}): Promise<BlogListResult> {
  const db = await getDb();
  if (!db) return { posts: [], total: 0 };

  const {
    category,
    status,
    search,
    page = 1,
    limit = 20,
    sortBy = "publishedAt",
    sortOrder = "desc",
    publishedOnly = false,
    cardView = false,
  } = options;

  const conditions = [];

  if (publishedOnly) {
    conditions.push(eq(blogPosts.status, "published"));
  } else if (status) {
    conditions.push(eq(blogPosts.status, status as "draft" | "published" | "unpublished"));
  }

  if (category && category !== "All") {
    // Try to match by categoryId (new system) - category param may be a name or ID
    const catIdNum = parseInt(category);
    if (!isNaN(catIdNum)) {
      conditions.push(eq(blogPosts.categoryId, catIdNum));
    } else {
      conditions.push(eq(blogPosts.category, category as any));
    }
  }

  if (search) {
    conditions.push(
      or(
        like(blogPosts.title, `%${search}%`),
        like(blogPosts.problemContent, `%${search}%`),
        like(blogPosts.metaDescription, `%${search}%`)
      )
    );
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Get total count
  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(blogPosts)
    .where(whereClause);
  const total = Number(countResult[0].count);

  // Get paginated results
  const orderFn = sortOrder === "asc" ? asc : desc;
  const orderColumn = sortBy === "title" ? blogPosts.title
    : sortBy === "createdAt" ? blogPosts.createdAt
    : sortBy === "publishedAt" ? blogPosts.publishedAt
    : blogPosts.updatedAt;

  if (cardView) {
    // Hub cards load only a bounded markup prefix to identify a genuine
    // top-of-article image. Later inline illustrations remain excluded.
    const posts = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        slug: blogPosts.slug,
        category: blogPosts.category,
        readTime: blogPosts.readTime,
        problemContent: blogPosts.problemContent,
        metaDescription: blogPosts.metaDescription,
        categoryId: blogPosts.categoryId,
        subcategoryId: blogPosts.subcategoryId,
        featuredImage: blogPosts.featuredImage,
        topBodyMarkup: sql<string | null>`case when nullif(trim(${blogPosts.featuredImage}), '') is null then left(${blogPosts.bodyHtml}, 2048) else null end`,
        publishedAt: blogPosts.publishedAt,
        updatedAt: blogPosts.updatedAt,
      })
      .from(blogPosts)
      .where(whereClause)
      .orderBy(orderFn(orderColumn))
      .limit(limit)
      .offset((page - 1) * limit);
    return {
      posts: posts.map((post) => {
        const hero = selectBlogCardHero(post);
        const { topBodyMarkup: _topBodyMarkup, ...card } = post;
        return {
          ...card,
          heroImageUrl: hero?.url ?? null,
          heroImageAlt: hero?.alt ?? null,
          heroImageSource: hero?.source ?? null,
        };
      }) as unknown as BlogPost[],
      total,
    };
  }

  if (await hasReviewerMetadataColumns(db)) {
    const posts = await db
      .select()
      .from(blogPosts)
      .where(whereClause)
      .orderBy(orderFn(orderColumn))
      .limit(limit)
      .offset((page - 1) * limit);
    return { posts, total };
  }

  const posts = await db
    .select(legacyBlogPostSelection)
    .from(blogPosts)
    .where(whereClause)
    .orderBy(orderFn(orderColumn))
    .limit(limit)
    .offset((page - 1) * limit);
  return { posts: posts.map(withUnavailableReviewerMetadata), total };
}

export async function slugExists(slug: string, excludeId?: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  const conditions = [eq(blogPosts.slug, slug)];
  if (excludeId) {
    conditions.push(sql`${blogPosts.id} != ${excludeId}`);
  }

  const results = await db
    .select({ count: sql<number>`count(*)` })
    .from(blogPosts)
    .where(and(...conditions));

  return Number(results[0].count) > 0;
}

// ============ Blog Stats ============

export async function getBlogStats() {
  const db = await getDb();
  if (!db) return { total: 0, published: 0, drafts: 0, unpublished: 0 };

  const result = await db
    .select({
      total: sql<number>`count(*)`,
      published: sql<number>`SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END)`,
      drafts: sql<number>`SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END)`,
      unpublished: sql<number>`SUM(CASE WHEN status = 'unpublished' THEN 1 ELSE 0 END)`,
    })
    .from(blogPosts);

  return {
    total: Number(result[0].total),
    published: Number(result[0].published),
    drafts: Number(result[0].drafts),
    unpublished: Number(result[0].unpublished),
  };
}

// ============ Blog Category Helpers ============

export async function listCategories(): Promise<BlogCategory[]> {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(blogCategories)
    .orderBy(asc(blogCategories.sortOrder), asc(blogCategories.name));
}

export async function getCategoryById(id: number): Promise<BlogCategory | null> {
  const db = await getDb();
  if (!db) return null;

  const results = await db.select().from(blogCategories).where(eq(blogCategories.id, id)).limit(1);
  return results.length > 0 ? results[0] : null;
}

export async function createCategory(data: InsertBlogCategory): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(blogCategories).values(data);
  return Number(result[0].insertId);
}

export async function updateCategory(id: number, data: Partial<InsertBlogCategory>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(blogCategories).set(data).where(eq(blogCategories.id, id));
}

export async function deleteCategory(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // First check if any posts use this category
  const postsUsingCategory = await db
    .select({ count: sql<number>`count(*)` })
    .from(blogPosts)
    .where(or(eq(blogPosts.categoryId, id), eq(blogPosts.subcategoryId, id)));
  
  if (Number(postsUsingCategory[0].count) > 0) {
    throw new Error("Cannot delete category: it is used by existing blog posts. Reassign posts first.");
  }

  // Check if it has children
  const children = await db
    .select({ count: sql<number>`count(*)` })
    .from(blogCategories)
    .where(eq(blogCategories.parentId, id));
  
  if (Number(children[0].count) > 0) {
    throw new Error("Cannot delete category: it has subcategories. Delete subcategories first.");
  }

  await db.delete(blogCategories).where(eq(blogCategories.id, id));
}

export async function categorySlugExists(slug: string, excludeId?: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  const conditions = [eq(blogCategories.slug, slug)];
  if (excludeId) {
    conditions.push(sql`${blogCategories.id} != ${excludeId}`);
  }

  const results = await db
    .select({ count: sql<number>`count(*)` })
    .from(blogCategories)
    .where(and(...conditions));

  return Number(results[0].count) > 0;
}

export async function seedAdminUser() {
  try {
    await createAdminUser("admin", "DentaSmart2026", "DentaSmart Admin");
    console.log("[Blog] Admin user seeded successfully");
  } catch (error) {
    console.error("[Blog] Failed to seed admin user:", error);
  }
}

// ============ Slug Audit ============

export type SlugAuditIssue =
  | "leading_slash"
  | "trailing_slash"
  | "empty"
  | "invalid_chars"
  | "too_long"
  | "duplicate";

export interface SlugAuditResult {
  id: number;
  title: string;
  slug: string;
  status: string;
  issues: SlugAuditIssue[];
  suggestedSlug: string | null;
}

/**
 * Validate a single slug and return the list of issues found.
 * Does NOT hit the database. Purely string-based checks.
 */
function validateSlug(slug: string): SlugAuditIssue[] {
  const issues: SlugAuditIssue[] = [];
  if (!slug || slug.trim() === "") {
    issues.push("empty");
    return issues;
  }
  if (slug.startsWith("/")) issues.push("leading_slash");
  if (slug.endsWith("/")) issues.push("trailing_slash");
  if (slug.length > 200) issues.push("too_long");
  // Allow only lowercase letters, digits, and hyphens
  if (/[^a-z0-9-]/.test(slug)) issues.push("invalid_chars");
  return issues;
}

/**
 * Sanitize a slug the same way the router does, returning the corrected value.
 * Returns null if the slug cannot be salvaged (e.g. empty after stripping).
 */
function sanitizeSlugForAudit(slug: string): string | null {
  const cleaned = slug
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 200);
  return cleaned || null;
}

/**
 * Run a full slug audit across all blog posts.
 * Checks for: empty slugs, leading/trailing slashes, invalid characters,
 * slugs that are too long, and duplicate slugs within the published set.
 * Returns one result per post that has at least one issue.
 */
export async function getSlugAuditResults(): Promise<{
  issues: SlugAuditResult[];
  totalChecked: number;
  totalIssues: number;
}> {
  const db = await getDb();
  if (!db) return { issues: [], totalChecked: 0, totalIssues: 0 };

  // Fetch all posts (all statuses). bad slugs in drafts will also cause 404s when published
  const posts = await db
    .select({
      id: blogPosts.id,
      title: blogPosts.title,
      slug: blogPosts.slug,
      status: blogPosts.status,
    })
    .from(blogPosts)
    .orderBy(asc(blogPosts.id));

  // Build a frequency map to detect duplicates
  const slugCount = new Map<string, number>();
  for (const post of posts) {
    const key = post.slug?.trim().toLowerCase() ?? "";
    slugCount.set(key, (slugCount.get(key) ?? 0) + 1);
  }

  const issueResults: SlugAuditResult[] = [];

  for (const post of posts) {
    const issues = validateSlug(post.slug ?? "");

    // Check for duplicates
    const key = post.slug?.trim().toLowerCase() ?? "";
    if ((slugCount.get(key) ?? 0) > 1) {
      issues.push("duplicate");
    }

    if (issues.length > 0) {
      issueResults.push({
        id: post.id,
        title: post.title,
        slug: post.slug ?? "",
        status: post.status,
        issues,
        suggestedSlug: sanitizeSlugForAudit(post.slug ?? ""),
      });
    }
  }

  return {
    issues: issueResults,
    totalChecked: posts.length,
    totalIssues: issueResults.length,
  };
}
