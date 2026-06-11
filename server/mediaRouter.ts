import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { jwtVerify } from "jose";
import { getDb } from "./db";
import { mediaItems, blogPosts } from "../drizzle/schema";
import { eq, like, desc, or, sql, isNull } from "drizzle-orm";
import { storagePut } from "./storage";
import sharp from "sharp";

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

// ─── Sharp image processing helper ──────────────────────────────────────────

const IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

function randomSuffix(len = 8): string {
  return Math.random().toString(36).substring(2, 2 + len);
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

function extFromMime(mimeType: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg",
    "application/pdf": "pdf",
  };
  return map[mimeType] ?? "bin";
}

interface ProcessedImage {
  url: string;
  thumbnailUrl: string | null;
  mediumUrl: string | null;
  webpUrl: string | null;
  width: number | null;
  height: number | null;
  fileSizeBytes: number | null;
  fileKey: string;
}

async function processAndUploadImage(
  buffer: Buffer,
  mimeType: string,
  sanitizedName: string,
  suffix: string
): Promise<ProcessedImage> {
  const isPdf = mimeType === "application/pdf";
  const isImage = IMAGE_MIME_TYPES.has(mimeType) && !isPdf;
  const ext = extFromMime(mimeType);
  const baseKey = `blog-images/${suffix}-${sanitizedName}`;

  if (!isImage) {
    // PDF or unknown — upload as-is, no Sharp processing
    const fileKey = `${baseKey}.${ext}`;
    const { url } = await storagePut(fileKey, buffer, mimeType);
    return {
      url,
      thumbnailUrl: null,
      mediumUrl: null,
      webpUrl: null,
      width: null,
      height: null,
      fileSizeBytes: buffer.length,
      fileKey,
    };
  }

  // SVG — upload as-is (Sharp can't reliably process all SVGs)
  if (mimeType === "image/svg+xml") {
    const fileKey = `${baseKey}.svg`;
    const { url } = await storagePut(fileKey, buffer, mimeType);
    return {
      url,
      thumbnailUrl: null,
      mediumUrl: null,
      webpUrl: null,
      width: null,
      height: null,
      fileSizeBytes: buffer.length,
      fileKey,
    };
  }

  // Raster image — run Sharp pipeline
  const meta = await sharp(buffer).metadata();
  const width = meta.width ?? null;
  const height = meta.height ?? null;

  // Upload original
  const originalKey = `${baseKey}-original.${ext}`;
  const { url: originalUrl } = await storagePut(originalKey, buffer, mimeType);

  // WebP version of original (quality 85)
  const webpBuffer = await sharp(buffer).webp({ quality: 85 }).toBuffer();
  const webpKey = `${baseKey}-webp.webp`;
  const { url: webpUrl } = await storagePut(webpKey, webpBuffer, "image/webp");

  // Medium (600x600 max, fit inside, no enlarge)
  const mediumBuffer = await sharp(buffer)
    .resize(600, 600, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer();
  const mediumKey = `${baseKey}-medium.webp`;
  const { url: mediumUrl } = await storagePut(mediumKey, mediumBuffer, "image/webp");

  // Thumbnail (300x300, fit cover, centre)
  const thumbBuffer = await sharp(buffer)
    .resize(300, 300, { fit: "cover", position: "centre" })
    .webp({ quality: 80 })
    .toBuffer();
  const thumbKey = `${baseKey}-thumb.webp`;
  const { url: thumbnailUrl } = await storagePut(thumbKey, thumbBuffer, "image/webp");

  return {
    url: originalUrl,
    thumbnailUrl,
    mediumUrl,
    webpUrl,
    width,
    height,
    fileSizeBytes: buffer.length,
    fileKey: originalKey,
  };
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

  /**
   * Upload a single file with Sharp processing.
   * Generates thumbnail (300x300), medium (600x600), and WebP variants.
   */
  upload: adminMediaProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileBase64: z.string(),
        mimeType: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { fileName, fileBase64, mimeType } = input;

      const ALLOWED_TYPES = new Set([
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
        "image/svg+xml",
        "application/pdf",
      ]);

      if (!ALLOWED_TYPES.has(mimeType)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `File type "${mimeType}" is not allowed. Accepted: JPEG, PNG, WebP, GIF, SVG, PDF.`,
        });
      }

      const buffer = Buffer.from(fileBase64, "base64");

      // 10 MB limit
      if (buffer.length > 10 * 1024 * 1024) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `File exceeds the 10 MB size limit (${(buffer.length / 1024 / 1024).toFixed(1)} MB).`,
        });
      }

      const suffix = randomSuffix();
      const sanitizedName = sanitizeFilename(fileName.replace(/\.[^.]+$/, ""));

      const processed = await processAndUploadImage(buffer, mimeType, sanitizedName, suffix);

      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [inserted] = await db
        .insert(mediaItems)
        .values({
          url: processed.url,
          fileKey: processed.fileKey,
          filename: fileName,
          mimeType,
          fileSizeBytes: processed.fileSizeBytes,
          width: processed.width,
          height: processed.height,
          thumbnailUrl: processed.thumbnailUrl,
          mediumUrl: processed.mediumUrl,
          webpUrl: processed.webpUrl,
        })
        .$returningId();

      const [item] = await db
        .select()
        .from(mediaItems)
        .where(eq(mediaItems.id, inserted.id));

      return item;
    }),

  /**
   * Upload multiple files in a single call.
   * Each file is processed independently — failures don't block other files.
   */
  uploadMultiple: adminMediaProcedure
    .input(
      z.object({
        files: z
          .array(
            z.object({
              fileName: z.string(),
              fileBase64: z.string(),
              mimeType: z.string(),
            })
          )
          .min(1)
          .max(20),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const results: Array<{
        success: boolean;
        fileName: string;
        mediaItem?: typeof mediaItems.$inferSelect;
        error?: string;
      }> = [];

      for (const file of input.files) {
        try {
          // Re-use single upload logic by calling the procedure inline
          const ALLOWED_TYPES = new Set([
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/gif",
            "image/svg+xml",
            "application/pdf",
          ]);

          if (!ALLOWED_TYPES.has(file.mimeType)) {
            results.push({
              success: false,
              fileName: file.fileName,
              error: `File type "${file.mimeType}" is not allowed.`,
            });
            continue;
          }

          const buffer = Buffer.from(file.fileBase64, "base64");

          if (buffer.length > 10 * 1024 * 1024) {
            results.push({
              success: false,
              fileName: file.fileName,
              error: `File exceeds the 10 MB size limit (${(buffer.length / 1024 / 1024).toFixed(1)} MB).`,
            });
            continue;
          }

          const suffix = randomSuffix();
          const sanitizedName = sanitizeFilename(file.fileName.replace(/\.[^.]+$/, ""));
          const processed = await processAndUploadImage(buffer, file.mimeType, sanitizedName, suffix);

          const db = await getDb();
          if (!db) {
            results.push({ success: false, fileName: file.fileName, error: "Database unavailable" });
            continue;
          }

          const [inserted] = await db
            .insert(mediaItems)
            .values({
              url: processed.url,
              fileKey: processed.fileKey,
              filename: file.fileName,
              mimeType: file.mimeType,
              fileSizeBytes: processed.fileSizeBytes,
              width: processed.width,
              height: processed.height,
              thumbnailUrl: processed.thumbnailUrl,
              mediumUrl: processed.mediumUrl,
              webpUrl: processed.webpUrl,
            })
            .$returningId();

          const [item] = await db
            .select()
            .from(mediaItems)
            .where(eq(mediaItems.id, inserted.id));

          results.push({ success: true, fileName: file.fileName, mediaItem: item });
        } catch (err) {
          results.push({
            success: false,
            fileName: file.fileName,
            error: err instanceof Error ? err.message : "Unknown error",
          });
        }
      }

      return { results };
    }),

  /**
   * Back-populate width, height, and fileSizeBytes for media items where width IS NULL.
   * Fetches each image from its URL, runs Sharp metadata extraction, and updates the DB row.
   * Returns a progress report.
   */
  backpopulateDimensions: adminMediaProcedure
    .input(z.object({ dryRun: z.boolean().default(false) }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Find all rows where width is null (backfilled images)
      const nullWidthItems = await db
        .select({ id: mediaItems.id, url: mediaItems.url, filename: mediaItems.filename, mimeType: mediaItems.mimeType })
        .from(mediaItems)
        .where(isNull(mediaItems.width));

      const report: Array<{
        id: number;
        filename: string;
        success: boolean;
        width?: number;
        height?: number;
        fileSizeBytes?: number;
        error?: string;
        skipped?: boolean;
      }> = [];

      for (const item of nullWidthItems) {
        // Skip PDFs and SVGs — Sharp can't reliably extract dimensions
        if (item.mimeType === "application/pdf" || item.mimeType === "image/svg+xml") {
          report.push({ id: item.id, filename: item.filename, success: true, skipped: true });
          continue;
        }

        try {
          const response = await fetch(item.url, { signal: AbortSignal.timeout(15000) });
          if (!response.ok) {
            report.push({
              id: item.id,
              filename: item.filename,
              success: false,
              error: `HTTP ${response.status} ${response.statusText}`,
            });
            continue;
          }

          const arrayBuffer = await response.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const meta = await sharp(buffer).metadata();

          if (!input.dryRun) {
            await db
              .update(mediaItems)
              .set({
                width: meta.width ?? null,
                height: meta.height ?? null,
                fileSizeBytes: buffer.length,
              })
              .where(eq(mediaItems.id, item.id));
          }

          report.push({
            id: item.id,
            filename: item.filename,
            success: true,
            width: meta.width,
            height: meta.height,
            fileSizeBytes: buffer.length,
          });
        } catch (err) {
          report.push({
            id: item.id,
            filename: item.filename,
            success: false,
            error: err instanceof Error ? err.message : "Unknown error",
          });
        }
      }

      return {
        dryRun: input.dryRun,
        total: nullWidthItems.length,
        processed: report.filter((r) => r.success && !r.skipped).length,
        skipped: report.filter((r) => r.skipped).length,
        failed: report.filter((r) => !r.success).length,
        items: report,
      };
    }),
});
