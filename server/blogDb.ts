import { eq, like, and, or, desc, asc, sql } from "drizzle-orm";
import { getDb } from "./db";
import { blogPosts, adminUsers, InsertBlogPost, BlogPost, InsertAdminUser } from "../drizzle/schema";
import bcrypt from "bcryptjs";

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

  const result = await db.insert(blogPosts).values(data);
  return Number(result[0].insertId);
}

export async function updateBlogPost(id: number, data: Partial<InsertBlogPost>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

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

  const results = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return results.length > 0 ? results[0] : null;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const db = await getDb();
  if (!db) return null;

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
}) {
  const db = await getDb();
  if (!db) return { posts: [], total: 0 };

  const {
    category,
    status,
    search,
    page = 1,
    limit = 20,
    sortBy = "updatedAt",
    sortOrder = "desc",
    publishedOnly = false,
  } = options;

  const conditions = [];

  if (publishedOnly) {
    conditions.push(eq(blogPosts.status, "published"));
  } else if (status) {
    conditions.push(eq(blogPosts.status, status as "draft" | "published" | "unpublished"));
  }

  if (category && category !== "All") {
    conditions.push(eq(blogPosts.category, category as "Dentist Problems" | "Dental Problems" | "Insurance Problems"));
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

  const posts = await db
    .select()
    .from(blogPosts)
    .where(whereClause)
    .orderBy(orderFn(orderColumn))
    .limit(limit)
    .offset((page - 1) * limit);

  return { posts, total };
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

export async function seedAdminUser() {
  try {
    await createAdminUser("admin", "DentaSmart2026", "DentaSmart Admin");
    console.log("[Blog] Admin user seeded successfully");
  } catch (error) {
    console.error("[Blog] Failed to seed admin user:", error);
  }
}
