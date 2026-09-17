import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { seedAdminUser } from "./blogDb";
import { getSetting, setSetting } from "./db";

// ─── Context helpers ──────────────────────────────────────────

function createPublicContext(): TrpcContext {
  const cookies: Record<string, string> = {};
  return {
    user: null,
    req: {
      protocol: "https",
      headers: { cookie: "" },
    } as TrpcContext["req"],
    res: {
      cookie: (name: string, value: string) => {
        cookies[name] = value;
      },
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createAdminContext(cookieStr: string): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: { cookie: cookieStr },
    } as TrpcContext["req"],
    res: {
      cookie: () => {},
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Site Settings & Auto-Publish", () => {
  let adminCookie = "";

  beforeAll(async () => {
    await seedAdminUser();

    let setCookieValue = "";
    const ctx: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: { cookie: "" },
      } as TrpcContext["req"],
      res: {
        cookie: (_name: string, value: string) => {
          setCookieValue = value;
        },
        clearCookie: () => {},
      } as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(ctx);
    const result = await caller.blog.adminLogin({
      username: "admin",
      password: "DentaSmart2026",
    });
    expect(result.success).toBe(true);
    adminCookie = `blog_admin_session=${setCookieValue}`;
  });

  describe("DB Helpers", () => {
    it("should return null for non-existent setting", async () => {
      const val = await getSetting("non_existent_key_xyz");
      expect(val).toBeNull();
    });

    it("should set and get a setting", async () => {
      await setSetting("test_setting_key", "hello_world");
      const val = await getSetting("test_setting_key");
      expect(val).toBe("hello_world");
    });

    it("should upsert (overwrite) an existing setting", async () => {
      await setSetting("test_setting_key", "first_value");
      await setSetting("test_setting_key", "second_value");
      const val = await getSetting("test_setting_key");
      expect(val).toBe("second_value");
    });
  });

  describe("Auto-Publish tRPC Procedures", () => {
    it("should reject agentGetAutoPublish without admin auth", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      await expect(caller.blog.agentGetAutoPublish()).rejects.toThrow();
    });

    it("should reject agentSetAutoPublish without admin auth", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      await expect(caller.blog.agentSetAutoPublish({ autoPublish: false })).rejects.toThrow();
    });

    it("keeps auto-publish locked off with admin auth", async () => {
      const ctx = createAdminContext(adminCookie);
      const caller = appRouter.createCaller(ctx);
      const result = await caller.blog.agentGetAutoPublish();
      expect(result).toEqual({ autoPublish: false, locked: true });
    });

    it("rejects any admin attempt to change the locked auto-publish control", async () => {
      const ctx = createAdminContext(adminCookie);
      const caller = appRouter.createCaller(ctx);
      await expect(caller.blog.agentSetAutoPublish({ autoPublish: false })).rejects.toThrow("Auto-publish is disabled");
      await expect(caller.blog.agentSetAutoPublish({ autoPublish: true })).rejects.toThrow("Auto-publish is disabled");
    });
  });

  afterAll(async () => {
    // Clean up test settings
    await setSetting("test_setting_key", "");
  });
});
