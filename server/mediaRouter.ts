import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { jwtVerify } from "jose";
import { getDb } from "./db";
import { mediaItems, blogPosts, mediaReplacementLog } from "../drizzle/schema";
import { eq, like, desc, or, sql, isNull, inArray } from "drizzle-orm";
import { storagePut, storageDelete } from "./storage";
import sharp from "sharp";

// ─── Admin auth (mirrors blogRouter) ─────────────────────────────────────────

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

// ─── Usage cache (5-minute TTL) ──────────────────────────────────────────────

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

function invalidateUsageCache(ids: number[]) {
  for (const id of ids) usageCache.delete(id);
}

// ─── Sharp helpers ────────────────────────────────────────────────────────────

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
    const fileKey = `${baseKey}.${ext}`;
    const { url } = await storagePut(fileKey, buffer, mimeType);
    return { url, thumbnailUrl: null, mediumUrl: null, webpUrl: null, width: null, height: null, fileSizeBytes: buffer.length, fileKey };
  }

  if (mimeType === "image/svg+xml") {
    const fileKey = `${baseKey}.svg`;
    const { url } = await storagePut(fileKey, buffer, mimeType);
    return { url, thumbnailUrl: null, mediumUrl: null, webpUrl: null, width: null, height: null, fileSizeBytes: buffer.length, fileKey };
  }

  const meta = await sharp(buffer).metadata();
  const width = meta.width ?? null;
  const height = meta.height ?? null;

  const originalKey = `${baseKey}-original.${ext}`;
  const { url: originalUrl } = await storagePut(originalKey, buffer, mimeType);

  const webpBuffer = await sharp(buffer).webp({ quality: 85 }).toBuffer();
  const webpKey = `${baseKey}-webp.webp`;
  const { url: webpUrl } = await storagePut(webpKey, webpBuffer, "image/webp");

  const mediumBuffer = await sharp(buffer).resize(600, 600, { fit: "inside", withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
  const mediumKey = `${baseKey}-medium.webp`;
  const { url: mediumUrl } = await storagePut(mediumKey, mediumBuffer, "image/webp");

  const thumbBuffer = await sharp(buffer).resize(300, 300, { fit: "cover", position: "centre" }).webp({ quality: 80 }).toBuffer();
  const thumbKey = `${baseKey}-thumb.webp`;
  const { url: thumbnailUrl } = await storagePut(thumbKey, thumbBuffer, "image/webp");

  return { url: originalUrl, thumbnailUrl, mediumUrl, webpUrl, width, height, fileSizeBytes: buffer.length, fileKey: originalKey };
}

// ─── Helper: attempt to delete all storage variants for a media item ─────────

async function deleteStorageVariants(item: {
  fileKey: string;
  thumbnailUrl: string | null;
  mediumUrl: string | null;
  webpUrl: string | null;
}) {
  // storageDelete is a no-op stub — the storage proxy has no delete API.
  // We call it for each variant so the intent is logged and the code is
  // ready to work automatically if the proxy gains a delete endpoint.
  const keysToDelete = [item.fileKey];

  // Derive keys from variant URLs (strip CDN domain prefix)
  for (const variantUrl of [item.thumbnailUrl, item.mediumUrl, item.webpUrl]) {
    if (!variantUrl) continue;
    try {
      const url = new URL(variantUrl);
      // CloudFront URLs: path starts with /blog-images/...
      const key = url.pathname.replace(/^\//, "");
      if (key && key !== item.fileKey) keysToDelete.push(key);
    } catch {
      // ignore malformed URLs
    }
  }

  for (const key of keysToDelete) {
    await storageDelete(key);
  }
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const mediaRouter = router({
  // ── List ──────────────────────────────────────────────────────────────────
  list: adminMediaProcedure
    .input(z.object({
      search: z.string().optional(),
      limit: z.number().min(1).max(200).default(100),
      offset: z.number().min(0).default(0),
    }))
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

      const items = await db.select().from(mediaItems).where(conditions).orderBy(desc(mediaItems.createdAt)).limit(limit).offset(offset);
      const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(mediaItems).where(conditions);
      return { items, total: Number(count) };
    }),

  // ── Get single item ────────────────────────────────────────────────────────
  get: adminMediaProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [item] = await db.select().from(mediaItems).where(eq(mediaItems.id, input.id));
      if (!item) throw new TRPCError({ code: "NOT_FOUND", message: "Media item not found" });

      const usage = await getUsageForItem(item.id, item.url);
      return { item, usage };
    }),

  // ── Update metadata ────────────────────────────────────────────────────────
  update: adminMediaProcedure
    .input(z.object({
      id: z.number(),
      altText: z.string().max(500).optional(),
      caption: z.string().optional(),
      title: z.string().max(500).optional(),
      filename: z.string().max(500).optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...fields } = input;
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [existing] = await db.select({ id: mediaItems.id }).from(mediaItems).where(eq(mediaItems.id, id));
      if (!existing) throw new TRPCError({ code: "NOT_FOUND", message: "Media item not found" });

      const updateData: Partial<typeof mediaItems.$inferInsert> = {};
      if (fields.altText !== undefined) updateData.altText = fields.altText;
      if (fields.caption !== undefined) updateData.caption = fields.caption;
      if (fields.title !== undefined) updateData.title = fields.title;
      if (fields.filename !== undefined) updateData.filename = fields.filename;

      if (Object.keys(updateData).length === 0) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "No fields to update" });
      }

      await db.update(mediaItems).set(updateData).where(eq(mediaItems.id, id));
      const [updated] = await db.select().from(mediaItems).where(eq(mediaItems.id, id));
      return updated;
    }),

  // ── Delete single item ─────────────────────────────────────────────────────
  delete: adminMediaProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [existing] = await db.select().from(mediaItems).where(eq(mediaItems.id, input.id));
      if (!existing) throw new TRPCError({ code: "NOT_FOUND", message: "Media item not found" });

      // Attempt to delete storage variants (no-op stub — storage proxy has no delete API)
      await deleteStorageVariants(existing);

      await db.delete(mediaItems).where(eq(mediaItems.id, input.id));
      invalidateUsageCache([input.id]);

      return {
        success: true,
        storageNote: "CDN files cannot be deleted via the current storage API and may remain accessible via direct URLs.",
      };
    }),

  // ── Bulk delete ────────────────────────────────────────────────────────────
  bulkDelete: adminMediaProcedure
    .input(z.object({ ids: z.array(z.number()).min(1).max(100) }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const rows = await db.select().from(mediaItems).where(inArray(mediaItems.id, input.ids));
      if (rows.length === 0) throw new TRPCError({ code: "NOT_FOUND", message: "No matching media items found" });

      // Attempt storage deletion for each item (no-op stub)
      for (const row of rows) {
        await deleteStorageVariants(row);
      }

      await db.delete(mediaItems).where(inArray(mediaItems.id, input.ids));
      invalidateUsageCache(input.ids);

      return {
        success: true,
        deleted: rows.length,
        storageNote: "CDN files cannot be deleted via the current storage API and may remain accessible via direct URLs.",
      };
    }),

  // ── Check usage ────────────────────────────────────────────────────────────
  checkUsage: adminMediaProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [item] = await db.select({ id: mediaItems.id, url: mediaItems.url }).from(mediaItems).where(eq(mediaItems.id, input.id));
      if (!item) throw new TRPCError({ code: "NOT_FOUND", message: "Media item not found" });

      const usage = await getUsageForItem(item.id, item.url);
      return { id: item.id, usageCount: usage.length, posts: usage };
    }),

  // ── Check usage for multiple items ────────────────────────────────────────
  checkBulkUsage: adminMediaProcedure
    .input(z.object({ ids: z.array(z.number()).min(1).max(100) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const rows = await db.select({ id: mediaItems.id, url: mediaItems.url }).from(mediaItems).where(inArray(mediaItems.id, input.ids));

      const results: Array<{ id: number; usageCount: number; posts: { postId: number; postSlug: string; postTitle: string }[] }> = [];
      for (const row of rows) {
        const usage = await getUsageForItem(row.id, row.url);
        results.push({ id: row.id, usageCount: usage.length, posts: usage });
      }

      const totalInUse = results.filter((r) => r.usageCount > 0).length;
      return { results, totalInUse };
    }),

  // ── Register (called by blog editor upload flow) ───────────────────────────
  register: adminMediaProcedure
    .input(z.object({
      url: z.string().url(),
      fileKey: z.string(),
      filename: z.string(),
      mimeType: z.string(),
      fileSizeBytes: z.number().optional(),
      width: z.number().optional(),
      height: z.number().optional(),
      altText: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [inserted] = await db.insert(mediaItems).values({
        url: input.url,
        fileKey: input.fileKey,
        filename: input.filename,
        mimeType: input.mimeType,
        fileSizeBytes: input.fileSizeBytes ?? null,
        width: input.width ?? null,
        height: input.height ?? null,
        altText: input.altText ?? null,
      }).$returningId();

      const [item] = await db.select().from(mediaItems).where(eq(mediaItems.id, inserted.id));
      return item;
    }),

  // ── Upload single file ─────────────────────────────────────────────────────
  upload: adminMediaProcedure
    .input(z.object({
      fileName: z.string(),
      fileBase64: z.string(),
      mimeType: z.string(),
    }))
    .mutation(async ({ input }) => {
      const { fileName, fileBase64, mimeType } = input;
      const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "application/pdf"]);

      if (!ALLOWED_TYPES.has(mimeType)) {
        throw new TRPCError({ code: "BAD_REQUEST", message: `File type "${mimeType}" is not allowed.` });
      }

      const buffer = Buffer.from(fileBase64, "base64");
      if (buffer.length > 10 * 1024 * 1024) {
        throw new TRPCError({ code: "BAD_REQUEST", message: `File exceeds the 10 MB size limit (${(buffer.length / 1024 / 1024).toFixed(1)} MB).` });
      }

      const suffix = randomSuffix();
      const sanitizedName = sanitizeFilename(fileName.replace(/\.[^.]+$/, ""));
      const processed = await processAndUploadImage(buffer, mimeType, sanitizedName, suffix);

      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [inserted] = await db.insert(mediaItems).values({
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
      }).$returningId();

      const [item] = await db.select().from(mediaItems).where(eq(mediaItems.id, inserted.id));
      return item;
    }),

  // ── Upload multiple files ──────────────────────────────────────────────────
  uploadMultiple: adminMediaProcedure
    .input(z.object({
      files: z.array(z.object({
        fileName: z.string(),
        fileBase64: z.string(),
        mimeType: z.string(),
      })).min(1).max(20),
    }))
    .mutation(async ({ input }) => {
      const results: Array<{
        success: boolean;
        fileName: string;
        mediaItem?: typeof mediaItems.$inferSelect;
        error?: string;
      }> = [];

      for (const file of input.files) {
        try {
          const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "application/pdf"]);
          if (!ALLOWED_TYPES.has(file.mimeType)) {
            results.push({ success: false, fileName: file.fileName, error: `File type "${file.mimeType}" is not allowed.` });
            continue;
          }

          const buffer = Buffer.from(file.fileBase64, "base64");
          if (buffer.length > 10 * 1024 * 1024) {
            results.push({ success: false, fileName: file.fileName, error: `File exceeds the 10 MB size limit.` });
            continue;
          }

          const suffix = randomSuffix();
          const sanitizedName = sanitizeFilename(file.fileName.replace(/\.[^.]+$/, ""));
          const processed = await processAndUploadImage(buffer, file.mimeType, sanitizedName, suffix);

          const db = await getDb();
          if (!db) { results.push({ success: false, fileName: file.fileName, error: "Database unavailable" }); continue; }

          const [inserted] = await db.insert(mediaItems).values({
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
          }).$returningId();

          const [item] = await db.select().from(mediaItems).where(eq(mediaItems.id, inserted.id));
          results.push({ success: true, fileName: file.fileName, mediaItem: item });
        } catch (err) {
          results.push({ success: false, fileName: file.fileName, error: err instanceof Error ? err.message : "Unknown error" });
        }
      }

      return { results };
    }),

  // ── Back-populate dimensions ───────────────────────────────────────────────
  backpopulateDimensions: adminMediaProcedure
    .input(z.object({ dryRun: z.boolean().default(false) }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const nullWidthItems = await db
        .select({ id: mediaItems.id, url: mediaItems.url, filename: mediaItems.filename, mimeType: mediaItems.mimeType })
        .from(mediaItems)
        .where(isNull(mediaItems.width));

      const report: Array<{
        id: number; filename: string; success: boolean;
        width?: number; height?: number; fileSizeBytes?: number;
        error?: string; skipped?: boolean;
      }> = [];

      for (const item of nullWidthItems) {
        if (item.mimeType === "application/pdf" || item.mimeType === "image/svg+xml") {
          report.push({ id: item.id, filename: item.filename, success: true, skipped: true });
          continue;
        }
        try {
          const response = await fetch(item.url, { signal: AbortSignal.timeout(15000) });
          if (!response.ok) {
            report.push({ id: item.id, filename: item.filename, success: false, error: `HTTP ${response.status}` });
            continue;
          }
          const buffer = Buffer.from(await response.arrayBuffer());
          const meta = await sharp(buffer).metadata();

          if (!input.dryRun) {
            await db.update(mediaItems).set({ width: meta.width ?? null, height: meta.height ?? null, fileSizeBytes: buffer.length }).where(eq(mediaItems.id, item.id));
          }

          report.push({ id: item.id, filename: item.filename, success: true, width: meta.width, height: meta.height, fileSizeBytes: buffer.length });
        } catch (err) {
          report.push({ id: item.id, filename: item.filename, success: false, error: err instanceof Error ? err.message : "Unknown error" });
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

  // ── Edit image (crop / resize / rotate) ───────────────────────────────────
  editImage: adminMediaProcedure
    .input(z.object({
      id: z.number(),
      saveAs: z.enum(["new", "replace"]),
      // Crop: pixel coordinates (all required together)
      crop: z.object({
        left: z.number().int().min(0),
        top: z.number().int().min(0),
        width: z.number().int().min(1),
        height: z.number().int().min(1),
      }).optional(),
      // Resize: target dimensions
      resize: z.object({
        width: z.number().int().min(1).max(8000),
        height: z.number().int().min(1).max(8000),
        fit: z.enum(["inside", "cover", "fill"]).default("inside"),
      }).optional(),
      // Rotate: degrees (must be multiple of 90)
      rotate: z.number().int().refine((v) => v % 90 === 0, "Must be multiple of 90").optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [existing] = await db.select().from(mediaItems).where(eq(mediaItems.id, input.id));
      if (!existing) throw new TRPCError({ code: "NOT_FOUND", message: "Media item not found" });

      if (!input.crop && input.resize === undefined && input.rotate === undefined) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "At least one operation (crop, resize, rotate) must be specified." });
      }

      // Fetch the original image
      const response = await fetch(existing.url, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: `Failed to fetch original image: HTTP ${response.status}` });
      }
      const originalBuffer = Buffer.from(await response.arrayBuffer());

      // Build Sharp pipeline
      let pipeline = sharp(originalBuffer);
      if (input.crop) pipeline = pipeline.extract(input.crop);
      if (input.rotate !== undefined) pipeline = pipeline.rotate(input.rotate);
      if (input.resize) pipeline = pipeline.resize(input.resize.width, input.resize.height, { fit: input.resize.fit as any, withoutEnlargement: true });

      // Output as WebP
      const editedBuffer = await pipeline.webp({ quality: 85 }).toBuffer();
      const meta = await sharp(editedBuffer).metadata();

      const suffix = randomSuffix();
      const baseName = sanitizeFilename(existing.filename.replace(/\.[^.]+$/, ""));
      const editedKey = `blog-images/${suffix}-${baseName}-edited.webp`;
      const { url: editedUrl } = await storagePut(editedKey, editedBuffer, "image/webp");

      // Generate variants for the edited image
      const thumbBuffer = await sharp(editedBuffer).resize(300, 300, { fit: "cover", position: "centre" }).webp({ quality: 80 }).toBuffer();
      const thumbKey = `blog-images/${suffix}-${baseName}-edited-thumb.webp`;
      const { url: thumbnailUrl } = await storagePut(thumbKey, thumbBuffer, "image/webp");

      const mediumBuffer = await sharp(editedBuffer).resize(600, 600, { fit: "inside", withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
      const mediumKey = `blog-images/${suffix}-${baseName}-edited-medium.webp`;
      const { url: mediumUrl } = await storagePut(mediumKey, mediumBuffer, "image/webp");

      if (input.saveAs === "new") {
        // Insert as a new media item
        const [inserted] = await db.insert(mediaItems).values({
          url: editedUrl,
          fileKey: editedKey,
          filename: `${baseName}-edited.webp`,
          mimeType: "image/webp",
          fileSizeBytes: editedBuffer.length,
          width: meta.width ?? null,
          height: meta.height ?? null,
          thumbnailUrl,
          mediumUrl,
          webpUrl: editedUrl,
        }).$returningId();

        const [newItem] = await db.select().from(mediaItems).where(eq(mediaItems.id, inserted.id));
        return { saveAs: "new", item: newItem };
      } else {
        // Replace the existing item's URL and variants
        await db.update(mediaItems).set({
          url: editedUrl,
          fileKey: editedKey,
          mimeType: "image/webp",
          fileSizeBytes: editedBuffer.length,
          width: meta.width ?? null,
          height: meta.height ?? null,
          thumbnailUrl,
          mediumUrl,
          webpUrl: editedUrl,
        }).where(eq(mediaItems.id, input.id));

        invalidateUsageCache([input.id]);
        const [updatedItem] = await db.select().from(mediaItems).where(eq(mediaItems.id, input.id));
        return { saveAs: "replace", item: updatedItem };
      }
    }),

  // ── Replace with new image (updates all posts) ────────────────────────────
  replaceWithNew: adminMediaProcedure
    .input(z.object({
      id: z.number(),
      fileName: z.string(),
      fileBase64: z.string(),
      mimeType: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [existing] = await db.select().from(mediaItems).where(eq(mediaItems.id, input.id));
      if (!existing) throw new TRPCError({ code: "NOT_FOUND", message: "Media item not found" });

      const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);
      if (!ALLOWED_TYPES.has(input.mimeType)) {
        throw new TRPCError({ code: "BAD_REQUEST", message: `File type "${input.mimeType}" is not allowed.` });
      }

      const buffer = Buffer.from(input.fileBase64, "base64");
      if (buffer.length > 10 * 1024 * 1024) {
        throw new TRPCError({ code: "BAD_REQUEST", message: `File exceeds the 10 MB size limit.` });
      }

      const suffix = randomSuffix();
      const sanitizedName = sanitizeFilename(input.fileName.replace(/\.[^.]+$/, ""));
      const processed = await processAndUploadImage(buffer, input.mimeType, sanitizedName, suffix);

      const oldUrl = existing.url;
      const newUrl = processed.url;

      // Find all posts that reference the old URL
      const affectedPosts = await db
        .select({ id: blogPosts.id, slug: blogPosts.slug, bodyHtml: blogPosts.bodyHtml })
        .from(blogPosts)
        .where(like(blogPosts.bodyHtml, `%${oldUrl}%`));

      // Replace the URL in each affected post's bodyHtml
      let postsUpdated = 0;
      for (const post of affectedPosts) {
        if (!post.bodyHtml) continue;
        const updatedHtml = post.bodyHtml.split(oldUrl).join(newUrl);
        await db.update(blogPosts).set({ bodyHtml: updatedHtml }).where(eq(blogPosts.id, post.id));
        postsUpdated++;
      }

      // Update the media item record
      await db.update(mediaItems).set({
        url: processed.url,
        fileKey: processed.fileKey,
        filename: input.fileName,
        mimeType: input.mimeType,
        fileSizeBytes: processed.fileSizeBytes,
        width: processed.width,
        height: processed.height,
        thumbnailUrl: processed.thumbnailUrl,
        mediumUrl: processed.mediumUrl,
        webpUrl: processed.webpUrl,
      }).where(eq(mediaItems.id, input.id));

      // Log the replacement
      await db.insert(mediaReplacementLog).values({
        mediaItemId: input.id,
        oldUrl,
        newUrl,
        postsUpdated,
      });

      invalidateUsageCache([input.id]);

      const [updatedItem] = await db.select().from(mediaItems).where(eq(mediaItems.id, input.id));
      return {
        item: updatedItem,
        postsUpdated,
        affectedSlugs: affectedPosts.map((p) => p.slug),
        storageNote: "The old image file cannot be deleted via the current storage API and may remain accessible via its direct URL.",
      };
    }),
});
