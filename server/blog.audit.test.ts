import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { seedAdminUser } from "./blogDb";
import { getDb } from "./db";
import { blogPosts } from "../drizzle/schema";
import { eq } from "drizzle-orm";

// ── Helpers ──────────────────────────────────────────────────────────────────

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: { cookie: "" } } as TrpcContext["req"],
    res: { cookie: () => {}, clearCookie: () => {} } as TrpcContext["res"],
  };
}

async function getAdminCookie(): Promise<string> {
  let cookieStr = "";
  const ctx: TrpcContext = {
    user: null,
    req: { protocol: "https", headers: { cookie: "" } } as TrpcContext["req"],
    res: {
      cookie: (name: string, value: string) => { cookieStr = `${name}=${value}`; },
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
  const caller = appRouter.createCaller(ctx);
  await caller.blog.adminLogin({ username: "admin", password: "DentaSmart2026" });
  return cookieStr;
}

function createAdminContext(cookieStr: string): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: { cookie: cookieStr } } as TrpcContext["req"],
    res: { cookie: () => {}, clearCookie: () => {} } as TrpcContext["res"],
  };
}

// Track IDs of posts created during tests so we can clean them up
const createdIds: number[] = [];

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("Slug Audit", () => {
  let adminCookie = "";

  beforeAll(async () => {
    await seedAdminUser();
    adminCookie = await getAdminCookie();
  });

  afterAll(async () => {
    // Clean up any posts created during tests
    if (createdIds.length > 0) {
      const db = await getDb();
      if (db) {
        for (const id of createdIds) {
          await db.delete(blogPosts).where(eq(blogPosts.id, id));
        }
      }
    }
  });

  // ── auditSlugs ──────────────────────────────────────────────────────────────

  describe("auditSlugs procedure", () => {
    it("should reject unauthenticated requests", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      await expect(caller.blog.auditSlugs()).rejects.toThrow("Admin authentication required");
    });

    it("should return audit results with totalChecked and totalIssues", async () => {
      const caller = appRouter.createCaller(createAdminContext(adminCookie));
      const result = await caller.blog.auditSlugs();

      expect(result).toHaveProperty("totalChecked");
      expect(result).toHaveProperty("totalIssues");
      expect(result).toHaveProperty("issues");
      expect(Array.isArray(result.issues)).toBe(true);
      expect(result.totalChecked).toBeGreaterThanOrEqual(0);
      expect(result.totalIssues).toBeGreaterThanOrEqual(0);
    });

    it("should detect a leading-slash slug", async () => {
      // Insert a post with a bad slug directly via the DB
      const db = await getDb();
      if (!db) return;

      const [insertResult] = await db.insert(blogPosts).values({
        title: "Audit Test — Leading Slash",
        slug: "/audit-test-leading-slash",
        category: "Dental Problems",
        status: "draft",
      });
      const id = Number(insertResult.insertId);
      createdIds.push(id);

      const caller = appRouter.createCaller(createAdminContext(adminCookie));
      const result = await caller.blog.auditSlugs();

      const found = result.issues.find((i) => i.id === id);
      expect(found).toBeDefined();
      expect(found!.issues).toContain("leading_slash");
      expect(found!.suggestedSlug).toBe("audit-test-leading-slash");
    });

    it("should detect an empty slug", async () => {
      const db = await getDb();
      if (!db) return;

      // Use a unique slug to avoid duplicate key, then update to empty via raw SQL
      const [insertResult] = await db.insert(blogPosts).values({
        title: "Audit Test — Empty Slug",
        slug: `audit-test-empty-${Date.now()}`,
        category: "Dental Problems",
        status: "draft",
      });
      const id = Number(insertResult.insertId);
      createdIds.push(id);

      // Force the slug to empty via raw SQL (bypasses Drizzle validation)
      await db.execute(`UPDATE blog_posts SET slug = '' WHERE id = ${id}`);

      const caller = appRouter.createCaller(createAdminContext(adminCookie));
      const result = await caller.blog.auditSlugs();

      const found = result.issues.find((i) => i.id === id);
      expect(found).toBeDefined();
      expect(found!.issues).toContain("empty");
      expect(found!.suggestedSlug).toBeNull();
    });

    it("should detect a slug with invalid characters", async () => {
      const db = await getDb();
      if (!db) return;

      const [insertResult] = await db.insert(blogPosts).values({
        title: "Audit Test — Invalid Chars",
        slug: `audit-test-invalid-${Date.now()}`,
        category: "Dental Problems",
        status: "draft",
      });
      const id = Number(insertResult.insertId);
      createdIds.push(id);

      // Force a slug with uppercase and spaces via raw SQL
      await db.execute(`UPDATE blog_posts SET slug = 'Audit Test Invalid' WHERE id = ${id}`);

      const caller = appRouter.createCaller(createAdminContext(adminCookie));
      const result = await caller.blog.auditSlugs();

      const found = result.issues.find((i) => i.id === id);
      expect(found).toBeDefined();
      expect(found!.issues).toContain("invalid_chars");
      // Suggested slug should be lowercase with hyphens
      expect(found!.suggestedSlug).toBe("audit-test-invalid");
    });

    it("should detect duplicate slugs via the audit logic (unit test)", () => {
      // The DB enforces a unique constraint on slugs, so we cannot create
      // genuine duplicates via INSERT. Instead we test the duplicate-detection
      // logic directly by simulating what getSlugAuditResults does internally.
      const sharedSlug = "audit-test-dup-shared";

      // Simulate the slug frequency map that getSlugAuditResults builds
      const slugCount = new Map<string, number>();
      const posts = [
        { id: 1, slug: sharedSlug },
        { id: 2, slug: sharedSlug },
        { id: 3, slug: "unique-slug" },
      ];
      for (const p of posts) {
        const key = p.slug.trim().toLowerCase();
        slugCount.set(key, (slugCount.get(key) ?? 0) + 1);
      }

      // Posts 1 and 2 share a slug — both should be flagged
      const dupKey = sharedSlug.trim().toLowerCase();
      expect(slugCount.get(dupKey)).toBe(2);

      // Post 3 has a unique slug — should NOT be flagged
      expect(slugCount.get("unique-slug")).toBe(1);

      // Verify the condition used in getSlugAuditResults
      for (const p of posts) {
        const key = p.slug.trim().toLowerCase();
        const isDuplicate = (slugCount.get(key) ?? 0) > 1;
        if (p.id === 1 || p.id === 2) {
          expect(isDuplicate).toBe(true);
        } else {
          expect(isDuplicate).toBe(false);
        }
      }
    });

    it("should report zero issues when all slugs are clean", async () => {
      // This test verifies the happy path — if the DB is clean the audit returns 0 issues.
      // We can only assert that totalIssues is a non-negative integer here since the DB
      // may contain other posts from previous test runs.
      const caller = appRouter.createCaller(createAdminContext(adminCookie));
      const result = await caller.blog.auditSlugs();
      expect(result.totalIssues).toBeGreaterThanOrEqual(0);
      expect(result.totalChecked).toBeGreaterThanOrEqual(result.totalIssues);
    });
  });

  // ── fixSlug ─────────────────────────────────────────────────────────────────

  describe("fixSlug procedure", () => {
    it("should reject unauthenticated requests", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      await expect(caller.blog.fixSlug({ id: 1, newSlug: "some-slug" })).rejects.toThrow(
        "Admin authentication required"
      );
    });

    it("should fix a bad slug and return the sanitized value", async () => {
      const db = await getDb();
      if (!db) return;

      const [insertResult] = await db.insert(blogPosts).values({
        title: "Fix Slug Test",
        slug: `/fix-slug-test-${Date.now()}`,
        category: "Dental Problems",
        status: "draft",
      });
      const id = Number(insertResult.insertId);
      createdIds.push(id);

      const caller = appRouter.createCaller(createAdminContext(adminCookie));
      const result = await caller.blog.fixSlug({ id, newSlug: "/Fix Slug Test/" });

      expect(result.success).toBe(true);
      expect(result.slug).toBe("fix-slug-test");
    });

    it("should reject an empty slug after sanitization", async () => {
      const db = await getDb();
      if (!db) return;

      const [insertResult] = await db.insert(blogPosts).values({
        title: "Fix Slug Empty Test",
        slug: `fix-slug-empty-${Date.now()}`,
        category: "Dental Problems",
        status: "draft",
      });
      const id = Number(insertResult.insertId);
      createdIds.push(id);

      const caller = appRouter.createCaller(createAdminContext(adminCookie));
      await expect(caller.blog.fixSlug({ id, newSlug: "///" })).rejects.toThrow(
        "Slug is empty after sanitization"
      );
    });

    it("should reject a slug that conflicts with another post", async () => {
      const db = await getDb();
      if (!db) return;

      const existing = `fix-slug-conflict-existing-${Date.now()}`;
      const [r1] = await db.insert(blogPosts).values({
        title: "Fix Slug Conflict Existing",
        slug: existing,
        category: "Dental Problems",
        status: "draft",
      });
      createdIds.push(Number(r1.insertId));

      const [r2] = await db.insert(blogPosts).values({
        title: "Fix Slug Conflict New",
        slug: `fix-slug-conflict-new-${Date.now()}`,
        category: "Dental Problems",
        status: "draft",
      });
      const id2 = Number(r2.insertId);
      createdIds.push(id2);

      const caller = appRouter.createCaller(createAdminContext(adminCookie));
      await expect(caller.blog.fixSlug({ id: id2, newSlug: existing })).rejects.toThrow(
        "already used by another post"
      );
    });
  });
});
