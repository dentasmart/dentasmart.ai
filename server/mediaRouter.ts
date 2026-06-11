import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { jwtVerify } from "jose";
import { getDb } from "./db";
import { mediaItems, blogPosts } from "../drizzle/schema";
import { eq, like, desc, or, sql } from "drizzle-orm";

// ─── Re-use the same admin auth as blogRouter ────────────────────────────────

const ADMIN_COOKIE_NAME = "blog_admin_session";
const JWT_SECRET_KEY = process.env.JWT_SECRET || "dentasmart-blog-admin-secret";

async function verifyAdminToken(token: string) {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET_KEY);
    const { payload } = await jwtVerify(token, secret);
    return payload as { adminId: number; username: string };
  } catch {
    return null;
  }
}

async function getAdminFromContext(ctx: any) {
  const cookies = ctx.req?.headers?.cookie || "";
  const cookieMap = Object.fromEntries(
    cookies.split(";").map((c: string) => {
      const [key, ...val] = c.trim().split("=");
      return [key, val.join("=")];
    })
  );
  const token = cookieMap[ADMIN_COOKIE_NAME];
  if (!token) return null;
  return verifyAdminToken(token);
}

const adminMediaProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const admin = await getAdminFromContext(ctx);
  if (!admin) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Admin authentication required" });
  }
  return next({ ctx: { ...ctx, admin } });
});

// ─── Simple in-process usage cache (5-minute TTL) ───────────────────────────

type UsageCache = {
  data: { postId: number; postSlug: string; postTitle: string }[];
  expiresAt: number;
};
const usageCache = new Map<number, UsageCache>();

async function getUsageForItem(mediaItemId: number, url: string) {
  const now = Date.now();
  const cached = usageCache.get(mediaItemId);
  if (cached && cached.expiresAt > now) return cached.data;

  // Query bodyHtml LIKE '%<url>%' for each post
  const db = await getDb();
  if (!db) return [];

  const posts = await db
    .select({ id: blogPosts.id, slug: blogPosts.slug, title: blogPosts.title })
    .from(blogPosts)
    .where(like(blogPosts.bodyHtml, `%${url}%`));

  const data = posts.map((p: { id: number; slug: string; title: string }) => ({
    postId: p.id,
    postSlug: p.slug,
    postTitle: p.title,
  }));

  usageCache.set(mediaItemId, { data, expiresAt: now + 5 * 60 * 1000 });
  return data;
}

// ─── Router ──────────────────────────────────────────────────────────────────

export const mediaRouter = router({
  /**
   * List all media items, optionally filtered by a search term.
   * Returns items sorted newest-first.
   */
  list: adminMediaProcedure
    .input(
      z.object({
        search: z.string().optional(),
        limit: z.number().min(1).max(200).default(100),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      const { search, limit, offset } = input;

      const conditions = search
        ? or(
            like(mediaItems.filename, `%${search}%`),
            like(mediaItems.altText, `%${search}%`),
            like(mediaItems.title, `%${search}%`),
            like(mediaItems.caption, `%${search}%`)
          )
        : undefined;

      const db = await getDb();
      if (!db) return { items: [], total: 0 };

      const items = await db
        .select()
        .from(mediaItems)
        .where(conditions)
        .orderBy(desc(mediaItems.createdAt))
        .limit(limit)
        .offset(offset);

      const [{ count }] = await db
        .select({ count: sql<number>`count(*)` })
        .from(mediaItems)
        .where(conditions);

      return { items, total: Number(count) };
    }),

  /**
   * Get a single media item by ID, including its usage list.
   */
  get: adminMediaProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [item] = await db
        .select()
        .from(mediaItems)
        .where(eq(mediaItems.id, input.id));

      if (!item) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Media item not found" });
      }

      const usage = await getUsageForItem(item.id, item.url);
      return { item, usage };
    }),

  /**
   * Update editorial metadata for a media item.
   * Allowed fields: altText, caption, title, filename.
   */
  update: adminMediaProcedure
    .input(
      z.object({
        id: z.number(),
        altText: z.string().max(500).optional(),
        caption: z.string().optional(),
        title: z.string().max(500).optional(),
        filename: z.string().max(500).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...fields } = input;

      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [existing] = await db
        .select({ id: mediaItems.id })
        .from(mediaItems)
        .where(eq(mediaItems.id, id));

      if (!existing) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Media item not found" });
      }

      // Build update object with only provided fields
      const updateData: Partial<typeof mediaItems.$inferInsert> = {};
      if (fields.altText !== undefined) updateData.altText = fields.altText;
      if (fields.caption !== undefined) updateData.caption = fields.caption;
      if (fields.title !== undefined) updateData.title = fields.title;
      if (fields.filename !== undefined) updateData.filename = fields.filename;

      if (Object.keys(updateData).length === 0) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "No fields to update" });
      }

      await db.update(mediaItems).set(updateData).where(eq(mediaItems.id, id));

      const [updated] = await db
        .select()
        .from(mediaItems)
        .where(eq(mediaItems.id, id));

      return updated;
    }),

  /**
   * Delete a media item record from the catalogue.
   * Does NOT delete the file from S3 (files are managed by the storage proxy).
   */
  delete: adminMediaProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [existing] = await db
        .select({ id: mediaItems.id })
        .from(mediaItems)
        .where(eq(mediaItems.id, input.id));

      if (!existing) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Media item not found" });
      }

      await db.delete(mediaItems).where(eq(mediaItems.id, input.id));
      usageCache.delete(input.id);
      return { success: true };
    }),

  /**
   * Check usage for a specific media item (cache-aware).
   */
  checkUsage: adminMediaProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [item] = await db
        .select({ id: mediaItems.id, url: mediaItems.url })
        .from(mediaItems)
        .where(eq(mediaItems.id, input.id));

      if (!item) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Media item not found" });
      }

      const usage = await getUsageForItem(item.id, item.url);
      return { id: item.id, usageCount: usage.length, posts: usage };
    }),

  /**
   * Register a newly uploaded image in the media catalogue.
   * Called by the blog editor's upload flow after storagePut succeeds.
   */
  register: adminMediaProcedure
    .input(
      z.object({
        url: z.string().url(),
        fileKey: z.string(),
        filename: z.string(),
        mimeType: z.string(),
        fileSizeBytes: z.number().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
        altText: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [inserted] = await db
        .insert(mediaItems)
        .values({
          url: input.url,
          fileKey: input.fileKey,
          filename: input.filename,
          mimeType: input.mimeType,
          fileSizeBytes: input.fileSizeBytes ?? null,
          width: input.width ?? null,
          height: input.height ?? null,
          altText: input.altText ?? null,
        })
        .$returningId();

      const [item] = await db
        .select()
        .from(mediaItems)
        .where(eq(mediaItems.id, inserted.id));

      return item;
    }),
});
