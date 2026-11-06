import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

// Real router and admin middleware; JWT verification, DB helpers, storage,
// governance and transport side effects are isolated fixture boundaries.
// No database, network, real admin token or production lead is used.
const mocks = vi.hoisted(() => ({
  createBlogPost: vi.fn(),
  updateBlogPost: vi.fn(),
  getBlogPostById: vi.fn(),
  slugExists: vi.fn(),
  invalidateSitemapCache: vi.fn(),
  canPublishBlogPost: vi.fn(),
  getDb: vi.fn(),
}));
vi.mock("./blogDb", () => ({
  ...mocks,
  isReviewerMetadataMigrationPendingError: () => false,
}));
vi.mock("./seo", () => ({ invalidateSitemapCache: mocks.invalidateSitemapCache }));
vi.mock("./governancePublishing", () => ({ canPublishBlogPost: mocks.canPublishBlogPost }));
vi.mock("./governedBlogEvidence", () => ({ getApprovedPublicBlogGovernance: vi.fn() }));
vi.mock("./db", () => ({ getDb: mocks.getDb }));
vi.mock("./blogAgent", () => ({ runBlogAgent: vi.fn(), listAgentRuns: vi.fn() }));
vi.mock("./storage", () => ({ storagePut: vi.fn(() => { throw new Error("Unexpected fixture storage call"); }) }));
vi.mock("jose", async (importOriginal) => {
  const actual = await importOriginal<typeof import("jose")>();
  return {
    ...actual,
    jwtVerify: vi.fn(async (token: string) => {
      if (token !== "publication-date-test-token") throw new Error("Invalid fixture token");
      return { payload: { adminId: 1, username: "fixture-admin" } };
    }),
  };
});

import { blogRouter } from "./blogRouter";

function caller(authenticated = true) {
  return blogRouter.createCaller({
    user: null,
    req: { headers: { cookie: authenticated ? "blog_admin_session=publication-date-test-token" : "" } },
    res: {},
  } as TrpcContext);
}
const NOW = new Date("2026-11-06T13:00:00.000Z");
const ORIGINAL = new Date("2025-04-10T00:00:00.000Z");
const EXPLICIT = "2024-02-19T12:30:00.000Z";
const requiredCreateFields = {
  title: "Fixture publication-date article",
  slug: "fixture-publication-date-article",
  category: "Dental Problems" as const,
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(NOW);
  mocks.createBlogPost.mockReset().mockResolvedValue(42);
  mocks.updateBlogPost.mockReset().mockResolvedValue(undefined);
  mocks.getBlogPostById.mockReset().mockResolvedValue({ id: 42, status: "published", publishedAt: ORIGINAL });
  mocks.slugExists.mockReset().mockResolvedValue(false);
  mocks.canPublishBlogPost.mockReset().mockResolvedValue({ allowed: true });
  mocks.getDb.mockImplementation(() => { throw new Error("Unexpected database call in isolated router test"); });
});
afterEach(() => {
  expect(mocks.getDb).not.toHaveBeenCalled();
  vi.useRealTimers();
});

describe("Blog publication-date update payload", () => {
  it("passes a Date, not the input string, and strips id from the database update payload", async () => {
    await caller().update({ id: 42, title: "Updated fixture title", publishedAt: EXPLICIT });
    expect(mocks.updateBlogPost).toHaveBeenCalledTimes(1);
    expect(mocks.updateBlogPost).toHaveBeenCalledWith(42, {
      title: "Updated fixture title", publishedAt: new Date(EXPLICIT),
    });
    expect(mocks.updateBlogPost.mock.calls[0][1].publishedAt).toBeInstanceOf(Date);
    expect(mocks.invalidateSitemapCache).not.toHaveBeenCalled();
  });

  it.each([undefined, ""])("omits missing or empty publishedAt %s instead of clearing or stringifying it", async (publishedAt) => {
    await caller().update({ id: 42, title: "Updated fixture title", publishedAt });
    expect(mocks.updateBlogPost).toHaveBeenCalledTimes(1);
    expect(mocks.updateBlogPost).toHaveBeenCalledWith(42, { title: "Updated fixture title" });
    expect(mocks.updateBlogPost.mock.calls[0][1]).not.toHaveProperty("publishedAt");
  });

  it("rejects an invalid date before reading or writing an article", async () => {
    await expect(caller().update({ id: 42, publishedAt: "not-a-date" }))
      .rejects.toMatchObject({ code: "BAD_REQUEST", message: "publishedAt must be a valid ISO date" });
    expect(mocks.getBlogPostById).not.toHaveBeenCalled();
    expect(mocks.updateBlogPost).not.toHaveBeenCalled();
    expect(mocks.invalidateSitemapCache).not.toHaveBeenCalled();
  });

  it("does not replace an existing publication date when an ordinary published edit omits the date", async () => {
    await caller().update({ id: 42, status: "published", title: "Updated fixture title" });
    expect(mocks.updateBlogPost).toHaveBeenCalledTimes(1);
    expect(mocks.updateBlogPost).toHaveBeenCalledWith(42, { status: "published", title: "Updated fixture title" });
    expect(mocks.canPublishBlogPost).toHaveBeenCalledTimes(1);
    expect(mocks.canPublishBlogPost).toHaveBeenCalledWith(42);
    expect(mocks.invalidateSitemapCache).toHaveBeenCalledTimes(1);
  });

  it.each([undefined, EXPLICIT])("preserves the upstream first-publication fallback even with input date %s", async (publishedAt) => {
    mocks.getBlogPostById.mockResolvedValue({ id: 42, status: "draft", publishedAt: null });
    await caller().update({ id: 42, status: "published", publishedAt });
    // Existing upstream behavior intentionally remains unchanged: first
    // publication replaces a supplied date too. This type-only fix does not
    // silently introduce a separate publication-date behavior correction.
    expect(mocks.updateBlogPost).toHaveBeenCalledTimes(1);
    expect(mocks.updateBlogPost).toHaveBeenCalledWith(42, { status: "published", publishedAt: NOW });
    expect(mocks.invalidateSitemapCache).toHaveBeenCalledTimes(1);
  });

  it("preserves slug sanitization and uniqueness checking alongside date conversion", async () => {
    await caller().update({ id: 42, slug: "/Fixture Changed Slug/", publishedAt: EXPLICIT });
    expect(mocks.slugExists).toHaveBeenCalledTimes(1);
    expect(mocks.slugExists).toHaveBeenCalledWith("fixture-changed-slug", 42);
    expect(mocks.updateBlogPost).toHaveBeenCalledTimes(1);
    expect(mocks.updateBlogPost).toHaveBeenCalledWith(42, { slug: "fixture-changed-slug", publishedAt: new Date(EXPLICIT) });
    expect(mocks.invalidateSitemapCache).toHaveBeenCalledTimes(1);
  });

  it("preserves the publication governance block with no database write", async () => {
    mocks.canPublishBlogPost.mockResolvedValue({ allowed: false, reason: "Fixture publication not approved" });
    await expect(caller().update({ id: 42, status: "published", publishedAt: EXPLICIT }))
      .rejects.toMatchObject({ code: "PRECONDITION_FAILED", message: "Fixture publication not approved" });
    expect(mocks.updateBlogPost).not.toHaveBeenCalled();
    expect(mocks.invalidateSitemapCache).not.toHaveBeenCalled();
  });

  it("requires an admin session before processing an update", async () => {
    await expect(caller(false).update({ id: 42, publishedAt: EXPLICIT })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    expect(mocks.getBlogPostById).not.toHaveBeenCalled();
    expect(mocks.updateBlogPost).not.toHaveBeenCalled();
  });
});

describe("Existing create publication-date behavior", () => {
  it("preserves an explicit date on published creation as a Date-valued payload", async () => {
    await caller().create({ ...requiredCreateFields, status: "published", publishedAt: EXPLICIT });
    expect(mocks.createBlogPost).toHaveBeenCalledTimes(1);
    expect(mocks.createBlogPost).toHaveBeenCalledWith({
      ...requiredCreateFields, status: "published", publishedAt: new Date(EXPLICIT),
    });
    expect(mocks.invalidateSitemapCache).toHaveBeenCalledTimes(1);
  });

  it("preserves current-date fallback for published creation without a supplied date", async () => {
    await caller().create({ ...requiredCreateFields, status: "published" });
    expect(mocks.createBlogPost).toHaveBeenCalledTimes(1);
    expect(mocks.createBlogPost).toHaveBeenCalledWith({ ...requiredCreateFields, status: "published", publishedAt: NOW });
  });

  it("preserves draft creation without a publication date even when a date was supplied", async () => {
    await caller().create({ ...requiredCreateFields, status: "draft", publishedAt: EXPLICIT });
    expect(mocks.createBlogPost).toHaveBeenCalledTimes(1);
    expect(mocks.createBlogPost).toHaveBeenCalledWith({ ...requiredCreateFields, status: "draft", publishedAt: undefined });
    expect(mocks.invalidateSitemapCache).not.toHaveBeenCalled();
  });

  it("rejects an invalid publication date on published creation before writing", async () => {
    await expect(caller().create({ ...requiredCreateFields, status: "published", publishedAt: "not-a-date" }))
      .rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(mocks.createBlogPost).not.toHaveBeenCalled();
    expect(mocks.invalidateSitemapCache).not.toHaveBeenCalled();
  });
});
