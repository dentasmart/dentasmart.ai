import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

/**
 * Tests for quiz.submit (public), waitlist.joinAndroid (public),
 * and leads router (admin-protected).
 * We mock the database layer to avoid needing a real DB connection.
 */

// Mock the DB modules
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue(null),
}));

vi.mock("./blogDb", () => ({
  getAdminById: vi.fn().mockResolvedValue(null),
  verifyAdminCredentials: vi.fn().mockResolvedValue(null),
  seedAdminUser: vi.fn(),
  slugExists: vi.fn().mockResolvedValue(false),
  categorySlugExists: vi.fn().mockResolvedValue(false),
  getBlogStats: vi.fn().mockResolvedValue({ total: 0, published: 0, drafts: 0, unpublished: 0 }),
  listCategories: vi.fn().mockResolvedValue([]),
  getCategoryById: vi.fn().mockResolvedValue(null),
  createCategory: vi.fn(),
  updateCategory: vi.fn(),
  deleteCategory: vi.fn(),
  listBlogPosts: vi.fn().mockResolvedValue({ posts: [], total: 0 }),
  getBlogPostById: vi.fn().mockResolvedValue(null),
  getBlogPostBySlug: vi.fn().mockResolvedValue(null),
  createBlogPost: vi.fn(),
  updateBlogPost: vi.fn(),
  deleteBlogPost: vi.fn(),
}));

vi.mock("./leadsDb", () => ({
  getLeads: vi.fn().mockResolvedValue({ leads: [], total: 0 }),
  getLeadsStats: vi.fn().mockResolvedValue({
    total: 5,
    quizLeads: 3,
    androidWaitlist: 2,
    highRisk: 1,
    withEmail: 4,
  }),
  getAllLeadsForExport: vi.fn().mockResolvedValue([]),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
      cookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

/* ─── Quiz Submit ──────────────────────────────────────────────────── */

describe("quiz.submit", () => {
  it("accepts a valid quiz submission without email or name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quiz.submit({
      answers: { pain: "yes", bleeding: "no" },
      riskLevel: "moderate",
      matchedConditions: ["Gingivitis"],
    });

    expect(result).toEqual({ success: true });
  });

  it("accepts a valid quiz submission with name and email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quiz.submit({
      name: "John Doe",
      email: "test@example.com",
      answers: { pain: "severe", bleeding: "yes", sensitivity: "hot_cold" },
      riskLevel: "high",
      matchedConditions: ["Periodontitis", "Dental Abscess"],
    });

    expect(result).toEqual({ success: true });
  });

  it("accepts a submission with name but no email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quiz.submit({
      name: "Jane Smith",
      answers: { pain: "no" },
      riskLevel: "low",
    });

    expect(result).toEqual({ success: true });
  });

  it("accepts a submission with empty email string", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quiz.submit({
      email: "",
      answers: { pain: "no" },
      riskLevel: "low",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects an invalid email format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.quiz.submit({
        email: "not-an-email",
        answers: { pain: "no" },
        riskLevel: "low",
      })
    ).rejects.toThrow();
  });

  it("rejects an invalid risk level", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.quiz.submit({
        answers: { pain: "no" },
        riskLevel: "critical" as any,
      })
    ).rejects.toThrow();
  });
});

/* ─── Waitlist Join Android ────────────────────────────────────────── */

describe("waitlist.joinAndroid", () => {
  it("accepts a valid waitlist signup with name and email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.waitlist.joinAndroid({
      name: "John Doe",
      email: "john@example.com",
    });

    // DB is null (mocked), so it returns success without saving
    expect(result).toEqual({ success: true, alreadyExists: false });
  });

  it("rejects a signup without name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.waitlist.joinAndroid({
        name: "",
        email: "john@example.com",
      })
    ).rejects.toThrow();
  });

  it("rejects a signup with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.waitlist.joinAndroid({
        name: "John Doe",
        email: "not-an-email",
      })
    ).rejects.toThrow();
  });

  it("rejects a signup without email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.waitlist.joinAndroid({
        name: "John Doe",
        email: "",
      })
    ).rejects.toThrow();
  });
});

/* ─── Leads List (Admin) ──────────────────────────────────────────── */

describe("leads.list", () => {
  it("rejects unauthenticated requests", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.leads.list({ page: 1, limit: 20 })
    ).rejects.toThrow("Admin authentication required");
  });
});

/* ─── Leads Stats (Admin) ─────────────────────────────────────────── */

describe("leads.stats", () => {
  it("rejects unauthenticated requests", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.leads.stats()).rejects.toThrow("Admin authentication required");
  });
});

/* ─── Leads Export CSV (Admin) ─────────────────────────────────────── */

describe("leads.exportCsv", () => {
  it("rejects unauthenticated requests", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.leads.exportCsv({})).rejects.toThrow("Admin authentication required");
  });
});
