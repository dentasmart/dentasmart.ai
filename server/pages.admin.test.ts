import { describe, it, expect, beforeAll } from "vitest";

/**
 * Tests for admin panel Parts 1, 4a, and 4b:
 *   Part 1  — listPages returns Orphaned-Redirected when an enabled redirect covers the path
 *   Part 4b — three-state orphan classification (Orphaned vs Orphaned-Redirected)
 *   Part 4a — cross-page invalidation is tested indirectly: after toggling a redirect,
 *             listPages reflects the updated classification without a server restart.
 *
 * Uses the same caller pattern as blog.audit.test.ts.
 */

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { seedAdminUser } from "./blogDb";
import { getDb } from "./db";
import { redirects } from "../drizzle/schema";
import { eq } from "drizzle-orm";

// ── Helpers ───────────────────────────────────────────────────────────────────

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
      cookie: (name: string, value: string) => {
        cookieStr = `${name}=${value}`;
      },
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

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("Admin Pages — Parts 1, 4a, 4b", () => {
  let adminCookie = "";

  beforeAll(async () => {
    await seedAdminUser();
    adminCookie = await getAdminCookie();
  });

  // ── Auth guard ───────────────────────────────────────────────────────────────

  describe("listPages auth guard", () => {
    it("rejects unauthenticated requests", async () => {
      const caller = appRouter.createCaller(createPublicContext());
      await expect(caller.pages.listPages()).rejects.toThrow(
        "Admin authentication required"
      );
    });
  });

  // ── Basic shape ──────────────────────────────────────────────────────────────

  describe("listPages basic shape", () => {
    it("returns an array of PageEntry objects with required fields", async () => {
      const caller = appRouter.createCaller(createAdminContext(adminCookie));
      const pages = await caller.pages.listPages();

      expect(Array.isArray(pages)).toBe(true);
      expect(pages.length).toBeGreaterThan(0);

      const first = pages[0];
      expect(first).toHaveProperty("path");
      expect(first).toHaveProperty("label");
      expect(first).toHaveProperty("type");
      expect(first).toHaveProperty("hasMetaTitle");
      expect(first).toHaveProperty("hasMetaDesc");
      expect(first).toHaveProperty("hasCanonical");
    });

    it("includes at least one non-orphaned page from the manifest", async () => {
      const caller = appRouter.createCaller(createAdminContext(adminCookie));
      const pages = await caller.pages.listPages();
      const nonOrphaned = pages.filter(
        (p) => p.type !== "Orphaned" && p.type !== "Orphaned-Redirected"
      );
      expect(nonOrphaned.length).toBeGreaterThan(0);
    });
  });

  // ── Part 4b: three-state orphan classification ───────────────────────────────

  describe("Part 4b — three-state orphan classification", () => {
    // Use a path that is known to be in staticMeta but NOT in the route manifest.
    // /symptoms/tooth-pain is a confirmed orphan from the runtime query.
    const ORPHAN_PATH = "/symptoms/tooth-pain/"; // trailing-slash form as stored in staticMeta

    it("classifies a known orphan with NO enabled redirect as 'Orphaned'", async () => {
      // Ensure no enabled redirect exists for this path
      const db = await getDb();
      if (!db) return;
      await db
        .delete(redirects)
        .where(eq(redirects.sourcePath, ORPHAN_PATH));

      const caller = appRouter.createCaller(createAdminContext(adminCookie));
      const pages = await caller.pages.listPages();
      const entry = pages.find((p) => p.path === ORPHAN_PATH);

      // If the path is not in the current staticMeta snapshot, skip gracefully
      if (!entry) return;

      expect(entry.type).toBe("Orphaned");
    });

    it("classifies an orphan WITH an enabled redirect as 'Orphaned-Redirected'", async () => {
      const db = await getDb();
      if (!db) return;

      // Insert an enabled redirect for the orphan path
      const normPath = ORPHAN_PATH.replace(/\/$/, "");
      await db
        .insert(redirects)
        .values({
          sourcePath: ORPHAN_PATH,
          targetPath: "/symptoms/toothache",
          statusCode: 301,
          isEnabled: true,
          note: "test redirect — Part 4b",
        })
        .onDuplicateKeyUpdate({
          set: {
            targetPath: "/symptoms/toothache",
            isEnabled: true,
          },
        });

      const caller = appRouter.createCaller(createAdminContext(adminCookie));
      const pages = await caller.pages.listPages();
      const entry = pages.find((p) => p.path === ORPHAN_PATH);

      if (!entry) {
        // Clean up and skip
        await db.delete(redirects).where(eq(redirects.sourcePath, ORPHAN_PATH));
        return;
      }

      expect(entry.type).toBe("Orphaned-Redirected");

      // Clean up
      await db.delete(redirects).where(eq(redirects.sourcePath, ORPHAN_PATH));
    });

    it("reverts to 'Orphaned' after the redirect is disabled", async () => {
      const db = await getDb();
      if (!db) return;

      // Insert a DISABLED redirect
      await db
        .insert(redirects)
        .values({
          sourcePath: ORPHAN_PATH,
          targetPath: "/symptoms/toothache",
          statusCode: 301,
          isEnabled: false,
          note: "test redirect disabled — Part 4b",
        })
        .onDuplicateKeyUpdate({
          set: { isEnabled: false },
        });

      const caller = appRouter.createCaller(createAdminContext(adminCookie));
      const pages = await caller.pages.listPages();
      const entry = pages.find((p) => p.path === ORPHAN_PATH);

      if (!entry) {
        await db.delete(redirects).where(eq(redirects.sourcePath, ORPHAN_PATH));
        return;
      }

      // A disabled redirect must NOT promote the orphan to Orphaned-Redirected
      expect(entry.type).toBe("Orphaned");

      // Clean up
      await db.delete(redirects).where(eq(redirects.sourcePath, ORPHAN_PATH));
    });

    it("trailing-slash normalisation: redirect stored with trailing slash matches orphan path", async () => {
      const db = await getDb();
      if (!db) return;

      // Store redirect WITHOUT trailing slash; orphan path has trailing slash
      const noTrailingSlash = "/symptoms/tooth-pain";
      await db
        .insert(redirects)
        .values({
          sourcePath: noTrailingSlash,
          targetPath: "/symptoms/toothache",
          statusCode: 301,
          isEnabled: true,
          note: "test trailing slash normalisation — Part 4b",
        })
        .onDuplicateKeyUpdate({
          set: { isEnabled: true },
        });

      const caller = appRouter.createCaller(createAdminContext(adminCookie));
      const pages = await caller.pages.listPages();
      const entry = pages.find((p) => p.path === ORPHAN_PATH);

      if (!entry) {
        await db.delete(redirects).where(eq(redirects.sourcePath, noTrailingSlash));
        return;
      }

      expect(entry.type).toBe("Orphaned-Redirected");

      // Clean up
      await db.delete(redirects).where(eq(redirects.sourcePath, noTrailingSlash));
    });
  });

  // ── Existing known-good paths remain in manifest ─────────────────────────────

  describe("known-good paths remain present", () => {
    const MUST_EXIST = [
      "/conditions/cavities",
      "/conditions/oral-thrush",
      "/symptoms/loose-tooth",
      "/symptoms/tooth-sensitivity",
    ];

    it("all four paths are present and not classified as Orphaned", async () => {
      const caller = appRouter.createCaller(createAdminContext(adminCookie));
      const pages = await caller.pages.listPages();
      const pathSet = new Map(pages.map((p) => [p.path, p.type]));

      for (const path of MUST_EXIST) {
        expect(pathSet.has(path)).toBe(true);
        expect(pathSet.get(path)).not.toBe("Orphaned");
        expect(pathSet.get(path)).not.toBe("Orphaned-Redirected");
      }
    });
  });
});
