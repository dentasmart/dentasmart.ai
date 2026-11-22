/**
 * Admin-only draft edits and test-only publication.
 * Public access is restricted to a separately saved, TEST-PUBLISHED snapshot.
 *
 * Optimistic revision checks prevent stale browser tabs overwriting work.
 */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { and, desc, eq } from "drizzle-orm";
import { cmsPages, cmsPageRevisions, mediaItems } from "../drizzle/schema";
import { saveCmsTestImage, cleanupCmsTestImage, CmsTestMediaError } from "./cmsTestMedia";
import { cmsDocumentSchema, type CmsDocument } from "../shared/cmsBlocks";
import { conditionsData } from "../client/src/data/conditions";
import { cmsAdminHubDefinitions, cmsDraftStoragePath, createCmsBlankDocument, getCmsHub, isCmsAdminHub, type CmsHubId } from "../shared/cmsHubRegistry";
import { cmsStructuredSources, getCmsStructuredSource } from "../shared/cmsSourceImports";
import { getCmsDraftDeletePolicy } from "../shared/cmsDraftDeletePolicy";
import { staticRoutes } from "../shared/routes";
import { publicProcedure, router } from "./_core/trpc";
import { getCmsTestPublishedToothache, isCmsTestPublicationEnvironment, isCmsIsolatedDraftQaEnvironment, validateCmsTestPublication } from "./cmsTestPublication";
import { cmsAdminProcedure } from "./cmsAdminSecurity";
import { cmsMediaUploadAvailability } from "./cmsMediaUploadAvailability";
import { getPrivateCmsMediaConfig } from "./cmsPrivateMediaS3";
import { uploadPrivateCmsImage, sendPrivateCmsPut, removePrivateCmsObject } from "./cmsPrivateMediaUpload";
import { canUseProductionCmsPrivateDrafts } from "./cmsPrivateDraftPolicy";
import { getDb } from "./db";
import { hydrateCmsAltFromLibrary } from "./mediaAltSync";

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(200);

const hubSchema = z.string().refine((value) => isCmsAdminHub(value), "This content belongs in Blog Management or is not an Advanced CMS hub.")
  .transform((value) => value as CmsHubId);
const selectedSchema = z.object({ slug: slugSchema, hubId: hubSchema.default("conditions") });

function isExistingCondition(hubId: CmsHubId, slug: string): boolean {
  return hubId === "conditions" && Object.prototype.hasOwnProperty.call(conditionsData, slug);
}
function storagePath(hubId: CmsHubId, slug: string): string {
  return cmsDraftStoragePath(hubId, slug, isExistingCondition(hubId, slug));
}
function baselineDocument(hubId: CmsHubId, slug: string, title?: string): CmsDocument {
  return getCmsStructuredSource(hubId, slug) ??
    createCmsBlankDocument(hubId, slug, title || slug.split("-").map(w => w[0]?.toUpperCase() + w.slice(1)).join(" "));
}
function conditionPath(slug: string): string { return "/conditions/" + slug; }
function requireTestingStorage() {
  if (!isCmsTestPublicationEnvironment() && !isCmsIsolatedDraftQaEnvironment()) {
    throw new TRPCError({ code: "FORBIDDEN", message: "CMS edits are restricted to the isolated local test database." });
  }
}
function requirePrivateDraftWriteAccess() {
  if (isCmsTestPublicationEnvironment() || isCmsIsolatedDraftQaEnvironment()) return;

  if (canUseProductionCmsPrivateDrafts({
    nodeEnv: process.env.NODE_ENV,
    enabled: process.env.CMS_PRIVATE_DRAFT_WRITES_ENABLED,
    jwtSecret: process.env.JWT_SECRET,
    databaseUrl: process.env.DATABASE_URL,
  })) return;

  throw new TRPCError({
    code: "FORBIDDEN",
    message: "Private CMS drafting is not enabled in this environment.",
  });
}

function sourceListings(hubId: CmsHubId) {
  const hub = getCmsHub(hubId)!;
  const imported = hubId === "conditions" ? cmsStructuredSources.conditions :
    hubId === "symptoms" ? cmsStructuredSources.symptoms :
    hubId === "guides" ? cmsStructuredSources.guides : null;
  if (imported) return imported.map(item => ({ ...item, editable: true as const, origin: "source" as const }));
  const prefix = hub.sourcePath.replace(/\/$/, "");
  return staticRoutes
    .filter(route => (route.path === prefix || route.path.startsWith(prefix + "/")) &&
      !route.path.startsWith("/admin/") && !route.path.includes(":") &&
      !route.label.toLowerCase().includes("redirect alias"))
    .map(route => {
      const suffix = route.path.slice(prefix.length).replace(/^\/+|\/+$/g, "");
      const slug = suffix ? suffix.replace(/\//g, "-") : "overview";
      return { slug, title: route.label, publicPath: route.path, editable: false as const, origin: "source" as const };
    });
}
function isUnsupportedExistingPage(hubId: CmsHubId, slug: string): boolean {
  return sourceListings(hubId).some(item => item.slug === slug && !item.editable);
}

async function requireCmsDb() {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Testing database unavailable." });
  return db;
}

function translateCmsDbError(error: unknown): never {
  if (error instanceof TRPCError) throw error;
  const candidate = error as { code?: string; cause?: { code?: string } };
  if (candidate?.code === "ER_NO_SUCH_TABLE" || candidate?.cause?.code === "ER_NO_SUCH_TABLE") {
    throw new TRPCError({ code: "PRECONDITION_FAILED", message: "CMS storage hasn't been installed in the test database yet." });
  }
  throw error;
}

export const cmsRouter = router({
  getMediaUploadAvailability: cmsAdminProcedure.query(() =>
    cmsMediaUploadAvailability(
      isCmsTestPublicationEnvironment(),
      isCmsIsolatedDraftQaEnvironment(),
      !!getPrivateCmsMediaConfig(process.env)
    )
  ),

  /** TEST ONLY: store image bytes on Codespaces disk and metadata in isolated test DB.
   * Never call the shared media/storage upload proxy for this endpoint.
   */
  uploadTestImage: cmsAdminProcedure.input(z.object({
    fileName: z.string().min(1).max(250),
    mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]),
    fileBase64: z.string().min(1).max(12_000_000),
    altText: z.string().max(500).optional(),
  })).mutation(async ({ input }) => {
    requireTestingStorage();
    const db = await requireCmsDb();
    let uploaded: Awaited<ReturnType<typeof saveCmsTestImage>>;
    try { uploaded = await saveCmsTestImage(input.fileName, input.fileBase64, input.mimeType); }
    catch (error) {
      if (error instanceof CmsTestMediaError) throw new TRPCError({ code: "BAD_REQUEST", message: error.message });
      throw new TRPCError({ code: "BAD_REQUEST", message: "Unable to process this image. Try another JPG, PNG or WebP file." });
    }
    try {
      const [created] = await db.insert(mediaItems).values({
        url: uploaded.url, fileKey: uploaded.fileKey, filename: uploaded.filename,
        mimeType: uploaded.mimeType, fileSizeBytes: uploaded.fileSizeBytes,
        width: uploaded.width, height: uploaded.height,
        altText: input.altText?.trim() || null,
      }).$returningId();
      return {
        id: created.id, url: uploaded.url, width: uploaded.width, height: uploaded.height,
        mimeType: uploaded.mimeType, filename: uploaded.filename,
      };
    } catch (error) {
      await cleanupCmsTestImage(uploaded.filePath);
      translateCmsDbError(error);
    }
  }),

  /** Production-private CMS media. Requires independent bucket privacy review and owner opt-in. */
  uploadPrivateImage: cmsAdminProcedure.input(z.object({
    fileName: z.string().min(1).max(250),
    mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]),
    fileBase64: z.string().min(1).max(12_000_000),
    altText: z.string().max(500).optional(),
  })).mutation(async ({ input }) => {
    if (isCmsTestPublicationEnvironment() || isCmsIsolatedDraftQaEnvironment()) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Use isolated test storage in QA." });
    }
    const config = getPrivateCmsMediaConfig(process.env);
    if (!config) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Verified private CMS storage is not enabled." });
    }
    const db = await requireCmsDb();
    try {
      return await uploadPrivateCmsImage(input, config, {
        put: command => sendPrivateCmsPut(config.region, command),
        remove: key => removePrivateCmsObject(config.region, config.bucket, key),
        insert: async record => {
          const [created] = await db.insert(mediaItems).values(record).$returningId();
          if (!created?.id) throw new Error("Media Library insertion returned no ID");
          return created.id;
        },
      });
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      const message = error instanceof Error ? error.message : "";
      const inputError = /^(Invalid image encoding|Unsupported image type|Image must be|Image content does not match|Processed image exceeds)/.test(message);
      throw new TRPCError({
        code: inputError ? "BAD_REQUEST" : "INTERNAL_SERVER_ERROR",
        message: inputError ? message : "Private image upload failed. The file was not added to the Media Library.",
      });
    }
  }),

  /** Hub-wide browse endpoint. Original static pages are never overwritten by this listing. */
  listContent: cmsAdminProcedure.input(z.object({ hubId: hubSchema.optional() }))
    .query(async ({ input }) => {
      const db = await requireCmsDb();
      const rows = await db.select({
        slug: cmsPages.slug, routePath: cmsPages.routePath,
        revision: cmsPages.draftRevision, draft: cmsPages.draftContent,
        publishedRevision: cmsPages.publishedRevision,
      }).from(cmsPages);
      const requested = input.hubId ? [input.hubId] : cmsAdminHubDefinitions.map(hub => hub.id);
      const entries: Array<{
        hubId: CmsHubId; hubLabel: string; slug: string; title: string;
        publicPath: string | null; editable: boolean; origin: "source" | "draft";
        revision: number; publishedRevision: number | null;
      }> = [];
      for (const hubId of requested) {
        const hubLabel = getCmsHub(hubId)!.label;
        const sources = sourceListings(hubId);
        const scopedRows = rows.filter(row => row.routePath === storagePath(hubId, row.slug));
        const sourceSlugs = new Set(sources.map(source => source.slug));
        for (const source of sources) {
          const stored = scopedRows.find(row => row.slug === source.slug);
          entries.push({
            hubId, hubLabel, slug: source.slug, title: stored?.draft?.title || source.title,
            publicPath: source.publicPath, editable: source.editable,
            origin: "source", revision: stored?.revision ?? 0,
            publishedRevision: stored?.publishedRevision ?? null,
          });
        }
        for (const row of scopedRows) {
          if (sourceSlugs.has(row.slug)) continue;
          entries.push({
            hubId, hubLabel, slug: row.slug, title: row.draft.title,
            publicPath: null, editable: true, origin: "draft",
            revision: row.revision, publishedRevision: row.publishedRevision,
          });
        }
      }
      return entries.sort((a, b) => a.hubLabel.localeCompare(b.hubLabel) || a.title.localeCompare(b.title));
    }),

  /** Public site reads only the TEST-published Toothache snapshot, never draft history. */
  getTestPublished: publicProcedure.input(z.object({ slug: slugSchema }))
    .query(async ({ input }) => {
      if (input.slug !== "toothache") return null;
      return getCmsTestPublishedToothache();
    }),

  getPublicationStatus: cmsAdminProcedure.input(selectedSchema)
    .query(async ({ input }) => {
      if (!isCmsTestPublicationEnvironment()) {
        return { permitted: false, publishedRevision: null as number | null, reason: "Test-only publication is not available with this database." };
      }
      if (input.hubId !== "conditions" || input.slug !== "toothache") return { permitted: false, publishedRevision: null as number | null, reason: "Test publication is currently limited to Toothache." };
      const db = await requireCmsDb();
      const [row] = await db.select({ publishedRevision: cmsPages.publishedRevision })
        .from(cmsPages).where(eq(cmsPages.routePath, conditionPath(input.slug))).limit(1);
      return { permitted: true, publishedRevision: row?.publishedRevision ?? null, reason: null };
    }),

  /**
   * One-click TEST publication of a SAVED draft. Never modifies source files,
   * static public pages outside the pilot, or the production database.
   * Commit is atomic; the previous published snapshot is immutable in history.
   */
  publishTestDraft: cmsAdminProcedure.input(z.object({
    slug: slugSchema,
    expectedRevision: z.number().int().positive(),
  })).mutation(async ({ input, ctx }) => {
    if (!isCmsTestPublicationEnvironment()) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Test publication is restricted to the isolated local test database." });
    }
    if (input.slug !== "toothache") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Pilot publishing is enabled only for Toothache." });
    }
    const db = await requireCmsDb();
    return db.transaction(async tx => {
      const [row] = await tx.select().from(cmsPages)
        .where(eq(cmsPages.routePath, conditionPath(input.slug))).limit(1).for("update");
      if (!row || row.draftRevision !== input.expectedRevision) {
        throw new TRPCError({ code: "CONFLICT", message: "Draft revision changed or was not saved. Reload and try again." });
      }
      const checked = cmsDocumentSchema.safeParse(
        await hydrateCmsAltFromLibrary(tx, row.draftContent)
      );
      const issue = checked.success ? validateCmsTestPublication(checked.data) : "Draft is not valid.";
      if (issue || !checked.success) {
        throw new TRPCError({ code: "BAD_REQUEST", message: issue || "Invalid draft" });
      }
      const revision = row.draftRevision + 1;
      await tx.update(cmsPages).set({
        // publishedContent is a snapshot; never updated on subsequent draft saves.
        publishedContent: checked.data,
        draftContent: checked.data,
        publishedRevision: revision,
        draftRevision: revision,
      }).where(eq(cmsPages.id, row.id));
      await tx.insert(cmsPageRevisions).values({
        pageId: row.id,
        revision,
        action: "published",
        content: checked.data,
        adminId: (ctx as any).admin?.adminId,
      });
      return { published: true as const, publishedRevision: revision };
    });
  }),

  /**
   * TEST ONLY: withdraw the CMS-published Toothache overlay.
   * The original source-controlled Toothache page and its sitemap entry remain
   * intact. This is deliberately NOT a site-wide unpublish operation.
   */
  unpublishTestDraft: cmsAdminProcedure.input(z.object({
    hubId: hubSchema.default("conditions"), slug: slugSchema,
    expectedRevision: z.number().int().min(1),
  })).mutation(async ({ input }) => {
    if (!isCmsTestPublicationEnvironment()) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Test unpublishing is restricted to the dedicated publication database.",
      });
    }
    if (input.hubId !== "conditions" || input.slug !== "toothache") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Only the isolated Toothache test publication may be withdrawn." });
    }
    const db = await requireCmsDb();
    return await db.transaction(async tx => {
      const [row] = await tx.select().from(cmsPages)
        .where(eq(cmsPages.routePath, conditionPath("toothache"))).limit(1).for("update");
      if (!row || row.draftRevision !== input.expectedRevision) {
        throw new TRPCError({ code: "CONFLICT", message: "The revision changed. Refresh before unpublishing." });
      }
      if (row.publishedRevision == null) {
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: "There is no test-published snapshot to withdraw." });
      }
      await tx.update(cmsPages).set({ publishedContent: null, publishedRevision: null })
        .where(eq(cmsPages.id, row.id));
      return { unpublished: true as const, sourcePagePreserved: true as const };
    });
  }),

  /** Read the saved private draft, or import a fresh in-memory legacy baseline. */
  getDraft: cmsAdminProcedure.input(selectedSchema)
    .query(async ({ input }) => {
      if (isUnsupportedExistingPage(input.hubId, input.slug)) {
        throw new TRPCError({ code: "FORBIDDEN", message: "This public page cannot be safely imported yet. Use its original manager or create a new private draft." });
      }
      try {
        const db = await requireCmsDb();
        const [row] = await db.select().from(cmsPages)
          .where(eq(cmsPages.routePath, storagePath(input.hubId, input.slug))).limit(1);
        const imported = getCmsStructuredSource(input.hubId, input.slug);
        const document = await hydrateCmsAltFromLibrary(
          db, row ? cmsDocumentSchema.parse(row.draftContent) :
            (imported ?? baselineDocument(input.hubId, input.slug))
        );
        return row
          ? { document, revision: row.draftRevision, source: "saved_draft" as const }
          : { document, revision: 0,
              source: imported ? "original_code" as const : "new_draft" as const };
      } catch (error) { translateCmsDbError(error); }
    }),

  /** Every save records a full immutable snapshot and retains the code baseline. */
  saveDraft: cmsAdminProcedure.input(z.object({
    document: cmsDocumentSchema,
    expectedRevision: z.number().int().min(0),
  })).mutation(async ({ input, ctx }) => {
    const { document: next, expectedRevision } = input;
    requirePrivateDraftWriteAccess();
    const hubId = (next.hubId ?? "conditions") as CmsHubId;
    const hub = getCmsHub(hubId);
    if (!hub || !isCmsAdminHub(hubId) || (next.hubId == null && !(next.contentType === "condition" && isExistingCondition("conditions", next.slug)))) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "The draft needs a recognized content hub." });
    }
    if (hub.contentType !== next.contentType || !slugSchema.safeParse(next.slug).success) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Page slug or content type does not match its content hub." });
    }
    if (isUnsupportedExistingPage(hubId, next.slug)) {
      throw new TRPCError({ code: "FORBIDDEN", message: "This existing public page has not been imported. Do not overwrite it with an empty CMS template." });
    }
    const baseline = baselineDocument(hubId, next.slug, next.title);
    const path = storagePath(hubId, next.slug);
    const adminId = (ctx as any).admin?.adminId as number | undefined;

    try {
      const db = await requireCmsDb();
      return await db.transaction(async (tx) => {
        // Alt text auto-saves to Media Library, not to CMS draft revisions.
        // Persist current library alt values even if this editor tab is stale.
        const current = await hydrateCmsAltFromLibrary(tx, next);
        const [existing] = await tx.select().from(cmsPages)
          .where(eq(cmsPages.routePath, path)).limit(1).for("update");

        if (!existing) {
          if (expectedRevision !== 0) {
            throw new TRPCError({ code: "CONFLICT", message: "Draft was created in another session. Reload before saving." });
          }
          const [created] = await tx.insert(cmsPages).values({
            routePath: path,
            contentType: next.contentType,
            slug: next.slug,
            draftContent: current,
            draftRevision: 1,
            publishedContent: null,
            publishedRevision: null,
          }).$returningId();
          await tx.insert(cmsPageRevisions).values([
            { pageId: created.id, revision: 0, action: "baseline", content: baseline, adminId },
            { pageId: created.id, revision: 1, action: "draft_saved", content: current, adminId },
          ]);
          return { saved: true as const, revision: 1, document: current };
        }

        if (existing.draftRevision !== expectedRevision) {
          throw new TRPCError({ code: "CONFLICT", message: "Another editor saved a newer draft. Reload before saving." });
        }
        if (existing.slug !== next.slug || existing.contentType !== next.contentType) {
          throw new TRPCError({ code: "CONFLICT", message: "This draft does not match the original page." });
        }
        const revision = existing.draftRevision + 1;
        await tx.update(cmsPages).set({ draftContent: current, draftRevision: revision })
          .where(eq(cmsPages.id, existing.id));
        await tx.insert(cmsPageRevisions).values({
          pageId: existing.id, revision, action: "draft_saved", content: current, adminId,
        });
        return { saved: true as const, revision, document: current };
      });
    } catch (error) { translateCmsDbError(error); }
  }),

  /**
   * Permanently remove ONE saved private CMS draft overlay and its revisions.
   * This never deletes original source-controlled content or public routes.
   * TEST-ONLY: rejected for any other database or for test-published snapshots.
   */
  deleteDraft: cmsAdminProcedure.input(selectedSchema.extend({
    expectedRevision: z.number().int().min(1),
  })).mutation(async ({ input }) => {
    requireTestingStorage();
    if (isUnsupportedExistingPage(input.hubId, input.slug)) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Read-only original pages cannot be deleted." });
    }
    const sourceEntry = sourceListings(input.hubId).find(item => item.slug === input.slug);
    const origin = sourceEntry ? "source" as const : "draft" as const;
    const db = await requireCmsDb();
    try {
      return await db.transaction(async tx => {
        const [row] = await tx.select().from(cmsPages)
          .where(eq(cmsPages.routePath, storagePath(input.hubId, input.slug)))
          .limit(1).for("update");
        if (!row) throw new TRPCError({ code: "NOT_FOUND", message: "This saved draft no longer exists. Refresh the content list." });
        if (row.draftRevision !== input.expectedRevision) {
          throw new TRPCError({ code: "CONFLICT", message: "This draft has changed. Refresh before deleting to avoid losing newer work." });
        }
        const policy = getCmsDraftDeletePolicy({
          editable: !sourceEntry || sourceEntry.editable,
          revision: row.draftRevision,
          // Be conservative if an older/malformed record has a publication
          // snapshot but no publishedRevision: it must not be deleted.
          publishedRevision: row.publishedRevision ?? (row.publishedContent == null ? null : 0),
          origin,
        });
        if (!policy.allowed) throw new TRPCError({ code: "FORBIDDEN", message: policy.explanation });
        if (row.slug !== input.slug || (row.draftContent.hubId ?? "conditions") !== input.hubId) {
          throw new TRPCError({ code: "CONFLICT", message: "Draft identity mismatch. No content was deleted." });
        }
        await tx.delete(cmsPageRevisions).where(eq(cmsPageRevisions.pageId, row.id));
        await tx.delete(cmsPages).where(eq(cmsPages.id, row.id));
        return { deleted: true as const, origin, slug: input.slug, hubId: input.hubId };
      });
    } catch (error) { translateCmsDbError(error); }
  }),

  listRevisions: cmsAdminProcedure.input(selectedSchema)
    .query(async ({ input }) => {
      try {
        const db = await requireCmsDb();
        const [page] = await db.select({
          id: cmsPages.id, draftRevision: cmsPages.draftRevision,
        }).from(cmsPages).where(eq(cmsPages.routePath, storagePath(input.hubId, input.slug))).limit(1);
        if (!page) return { draftRevision: 0, revisions: [] };
        const revisions = await db.select({
          revision: cmsPageRevisions.revision,
          action: cmsPageRevisions.action,
          createdAt: cmsPageRevisions.createdAt,
        }).from(cmsPageRevisions).where(eq(cmsPageRevisions.pageId, page.id))
          .orderBy(desc(cmsPageRevisions.revision)).limit(40);
        return { draftRevision: page.draftRevision, revisions };
      } catch (error) { translateCmsDbError(error); }
    }),

  /** Restore a past snapshot into a NEW draft revision; history is never deleted. */
  restoreRevision: cmsAdminProcedure.input(z.object({
    slug: slugSchema,
    hubId: hubSchema.default("conditions"),
    restoreRevision: z.number().int().min(0),
    expectedRevision: z.number().int().min(1),
  })).mutation(async ({ input, ctx }) => {
    requirePrivateDraftWriteAccess();
    try {
      const db = await requireCmsDb();
      return await db.transaction(async (tx) => {
        const [page] = await tx.select().from(cmsPages)
          .where(eq(cmsPages.routePath, storagePath(input.hubId, input.slug))).limit(1).for("update");
        if (!page) throw new TRPCError({ code: "NOT_FOUND", message: "There is no saved draft to restore." });
        if (page.draftRevision !== input.expectedRevision) {
          throw new TRPCError({ code: "CONFLICT", message: "A newer draft exists. Reload before restoring." });
        }
        const [snapshot] = await tx.select().from(cmsPageRevisions)
          .where(and(eq(cmsPageRevisions.pageId, page.id), eq(cmsPageRevisions.revision, input.restoreRevision)))
          .limit(1);
        if (!snapshot) throw new TRPCError({ code: "NOT_FOUND", message: "Revision not found." });
        const validated = cmsDocumentSchema.safeParse(snapshot.content);
        if (!validated.success || validated.data.slug !== input.slug ||
          (validated.data.hubId ?? "conditions") !== input.hubId) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "This revision is invalid for the selected content hub." });
        }
        const revision = page.draftRevision + 1;
        const restored = await hydrateCmsAltFromLibrary(tx, validated.data);
        await tx.update(cmsPages).set({ draftRevision: revision, draftContent: restored })
          .where(eq(cmsPages.id, page.id));
        await tx.insert(cmsPageRevisions).values({
          pageId: page.id, revision, action: "restored",
          content: restored, adminId: (ctx as any).admin?.adminId,
        });
        return { restored: true as const, revision, document: restored };
      });
    } catch (error) { translateCmsDbError(error); }
  }),
});
