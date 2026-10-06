import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getDb: vi.fn(),
}));

vi.mock("./db", () => ({
  getDb: mocks.getDb,
}));

import {
  createBlogPost,
  getBlogPostById,
  listBlogPosts,
  REVIEWER_METADATA_MIGRATION_PENDING_MESSAGE,
  resetBlogPostSchemaCompatibilityCacheForTests,
  updateBlogPost,
} from "./blogDb";

const legacyPost = (id: number) => ({
  id,
  title: `Legacy article ${id}`,
  slug: `legacy-article-${id}`,
  category: "Dental Problems" as const,
  readTime: "3 min read",
  problemHeading: null,
  problemContent: null,
  empathyHeading: null,
  empathyContent: null,
  solutionHeading: null,
  solutionContent: null,
  changeHeading: null,
  changeContent: null,
  resultHeading: null,
  resultContent: null,
  bodyHtml: `<p>Legacy body ${id}</p>`,
  metaTitle: null,
  metaDescription: null,
  metaKeywords: null,
  ogTitle: null,
  ogDescription: null,
  ogImage: null,
  canonicalUrl: null,
  primaryKeyword: null,
  secondaryKeywords: null,
  atAGlanceAnswer: null,
  keyTakeaways: null,
  whenUrgent: null,
  faqs: null,
  relatedPosts: null,
  reviewedByName: null,
  reviewedByCredentials: null,
  governanceCandidateId: null,
  governanceIntentOwnerId: null,
  categoryId: null,
  subcategoryId: null,
  status: "published" as const,
  featuredImage: null,
  publishedAt: new Date("2026-09-01T00:00:00.000Z"),
  createdAt: new Date("2026-09-01T00:00:00.000Z"),
  updatedAt: new Date("2026-09-01T00:00:00.000Z"),
});

function chain<T>(rows: T) {
  const value = {
    from: () => value,
    where: () => value,
    orderBy: () => value,
    limit: () => value,
    offset: () => value,
    then: <TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
      onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
    ) => Promise.resolve(rows).then(onfulfilled, onrejected),
  };
  return value;
}

function sqlTokens(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(sqlTokens);
  if (!value || typeof value !== "object") return [];

  const record = value as { queryChunks?: unknown[]; value?: unknown };
  if (record.queryChunks) return record.queryChunks.flatMap(sqlTokens);
  return typeof record.value === "string" ? [record.value] : [];
}

function legacyDatabaseFixture() {
  const allPosts = Array.from({ length: 189 }, (_, index) => legacyPost(index + 1));
  const execute = vi.fn()
    .mockResolvedValueOnce([[], []])
    .mockResolvedValueOnce([{ insertId: 190 }, []])
    .mockResolvedValue([{}, []]);
  const select = vi.fn((selection?: Record<string, unknown>) => {
    if (selection && "count" in selection) return chain([{ count: 189 }]);
    return chain(allPosts);
  });

  return {
    allPosts,
    db: { execute, select },
    execute,
    select,
  };
}

function migratedDatabaseFixture() {
  const reviewerColumns = [
    "reviewerShortBio",
    "reviewerProfileUrl",
    "lastReviewed",
    "reviewerJsonLd",
  ].map((column_name) => ({ column_name }));
  const execute = vi.fn().mockResolvedValue([reviewerColumns, []]);
  const insertValues = vi.fn().mockResolvedValue([{ insertId: 190 }, []]);
  const insert = vi.fn().mockReturnValue({ values: insertValues });
  const updateWhere = vi.fn().mockResolvedValue([{}, []]);
  const updateSet = vi.fn().mockReturnValue({ where: updateWhere });
  const update = vi.fn().mockReturnValue({ set: updateSet });

  return {
    db: { execute, insert, update },
    execute,
    insert,
    insertValues,
    update,
    updateSet,
    updateWhere,
  };
}

describe("pre-0017 blog schema compatibility", () => {
  beforeEach(() => {
    resetBlogPostSchemaCompatibilityCacheForTests();
    mocks.getDb.mockReset();
  });

  it("lists all 189 legacy posts and supplies null reviewer metadata without selecting absent columns", async () => {
    const fixture = legacyDatabaseFixture();
    mocks.getDb.mockResolvedValue(fixture.db);

    const result = await listBlogPosts({ limit: 200, publishedOnly: true });

    expect(result.total).toBe(189);
    expect(result.posts).toHaveLength(189);
    expect(result.posts[0]).toMatchObject({
      id: 1,
      slug: "legacy-article-1",
      reviewerShortBio: null,
      reviewerProfileUrl: null,
      lastReviewed: null,
      reviewerJsonLd: null,
    });
    expect(result.posts.at(-1)).toMatchObject({ id: 189, slug: "legacy-article-189" });

    const selection = fixture.select.mock.calls[1][0] as Record<string, unknown>;
    expect(selection).not.toHaveProperty("reviewerShortBio");
    expect(selection).not.toHaveProperty("reviewerProfileUrl");
    expect(selection).not.toHaveProperty("lastReviewed");
    expect(selection).not.toHaveProperty("reviewerJsonLd");
  });

  it("supports a legacy article lookup and returns null reviewer fields", async () => {
    const fixture = legacyDatabaseFixture();
    fixture.select.mockImplementation((selection?: Record<string, unknown>) => {
      if (selection && "count" in selection) return chain([{ count: 189 }]);
      return chain([legacyPost(42)]);
    });
    mocks.getDb.mockResolvedValue(fixture.db);

    const post = await getBlogPostById(42);

    expect(post).toMatchObject({
      id: 42,
      reviewerShortBio: null,
      reviewerProfileUrl: null,
      lastReviewed: null,
      reviewerJsonLd: null,
    });
  });

  it("allows non-reviewer legacy writes but rejects reviewer metadata without issuing a write", async () => {
    const fixture = legacyDatabaseFixture();
    mocks.getDb.mockResolvedValue(fixture.db);

    const id = await createBlogPost({
      title: "New legacy-safe draft",
      slug: "new-legacy-safe-draft",
      category: "Dental Problems",
      status: "draft",
      reviewerShortBio: null,
      reviewerProfileUrl: null,
      lastReviewed: null,
      reviewerJsonLd: null,
    });
    await updateBlogPost(id, { title: "Updated legacy-safe draft" });
    await updateBlogPost(id, {
      reviewerShortBio: null,
      reviewerProfileUrl: null,
      lastReviewed: null,
      reviewerJsonLd: null,
    });

    expect(id).toBe(190);
    expect(fixture.execute).toHaveBeenCalledTimes(4);
    const writeSql = fixture.execute.mock.calls.slice(1).flatMap(([query]) => sqlTokens(query)).join(" ");
    expect(writeSql).toContain("blog_posts");
    expect(writeSql).toContain("title");
    expect(writeSql).toContain("id");
    expect(writeSql).toContain("updatedAt");
    expect(writeSql).not.toContain("reviewerShortBio");
    expect(writeSql).not.toContain("reviewerProfileUrl");
    expect(writeSql).not.toContain("lastReviewed");
    expect(writeSql).not.toContain("reviewerJsonLd");

    await expect(updateBlogPost(id, { reviewerShortBio: "Must not be silently dropped" }))
      .rejects.toThrow("Reviewer metadata is unavailable until migration 0017_blog_reviewer_metadata is applied");
    expect(fixture.execute).toHaveBeenCalledTimes(4);
  });

  it("aliases MySQL's uppercase information-schema key and uses the normal write path after migration 0017", async () => {
    const source = await import("node:fs/promises").then((fs) => fs.readFile(new URL("./blogDb.ts", import.meta.url), "utf8"));
    const mysqlDefaultRows = [
      "reviewerShortBio",
      "reviewerProfileUrl",
      "lastReviewed",
      "reviewerJsonLd",
    ].map((COLUMN_NAME) => ({ COLUMN_NAME }));
    const fixture = migratedDatabaseFixture();
    mocks.getDb.mockResolvedValue(fixture.db);

    // mysql2 exposes an unaliased information_schema column as COLUMN_NAME.
    // The detector reads row.column_name, so the SQL alias is required.
    expect(mysqlDefaultRows.every((row) => !("column_name" in row))).toBe(true);
    expect(source).toContain("SELECT column_name AS column_name");

    const reviewerData = {
      reviewerShortBio: "Approved public reviewer bio.",
      reviewerProfileUrl: "/team/#dr-saba-ahmed",
      lastReviewed: "2026-10-06",
      reviewerJsonLd: '{"@context":"https://schema.org","@type":"FAQPage"}',
    };
    const id = await createBlogPost({
      title: "Migrated reviewer metadata draft",
      slug: "migrated-reviewer-metadata-draft",
      category: "Dental Problems",
      status: "draft",
      ...reviewerData,
    });
    await updateBlogPost(id, reviewerData);

    expect(fixture.execute).toHaveBeenCalledTimes(1);
    expect(fixture.insert).toHaveBeenCalledTimes(1);
    expect(fixture.insertValues).toHaveBeenCalledWith(expect.objectContaining(reviewerData));
    expect(fixture.update).toHaveBeenCalledTimes(1);
    expect(fixture.updateSet).toHaveBeenCalledWith(expect.objectContaining(reviewerData));
    expect(fixture.updateWhere).toHaveBeenCalledTimes(1);
  });

  it("keeps the Blog Agent on the guarded createBlogPost path", async () => {
    const source = await import("node:fs/promises").then((fs) => fs.readFile(new URL("./blogAgent.ts", import.meta.url), "utf8"));
    expect(source).toContain('import { createBlogPost } from "./blogDb"');
    expect(source).toContain("const postId = await createBlogPost");
    expect(source).not.toContain("db.insert(blogPosts).values({");
  });

  it("returns a clear precondition error instead of silently dropping reviewer fields", async () => {
    const source = await import("node:fs/promises").then((fs) => fs.readFile(new URL("./blogRouter.ts", import.meta.url), "utf8"));
    expect(source).toContain("isReviewerMetadataMigrationPendingError");
    expect(source).toContain('code: "PRECONDITION_FAILED"');
    expect(REVIEWER_METADATA_MIGRATION_PENDING_MESSAGE).toContain("No reviewer metadata was saved.");
  });
});
