import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { SignJWT } from "jose";

const JWT_SECRET_KEY = process.env.JWT_SECRET || "dentasmart-blog-admin-secret";
const ADMIN_COOKIE_NAME = "blog_admin_session";

// Helper to create an admin JWT token for testing
async function createTestAdminToken() {
  const secret = new TextEncoder().encode(JWT_SECRET_KEY);
  return await new SignJWT({ adminId: 1, username: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
}

// Helper to create a context with admin cookie
async function createAdminContext(): Promise<TrpcContext> {
  const token = await createTestAdminToken();
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {
        cookie: `${ADMIN_COOKIE_NAME}=${token}`,
      },
    } as TrpcContext["req"],
    res: {
      cookie: () => {},
      clearCookie: () => {},
    } as unknown as TrpcContext["res"],
  };
}

// Helper to create a public (unauthenticated) context
function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      cookie: () => {},
      clearCookie: () => {},
    } as unknown as TrpcContext["res"],
  };
}

describe("blog.listCategories (public)", () => {
  it("returns an array of categories", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const categories = await caller.blog.listCategories();

    expect(Array.isArray(categories)).toBe(true);
    // We seeded categories, so there should be at least one
    expect(categories.length).toBeGreaterThan(0);
  });

  it("each category has required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const categories = await caller.blog.listCategories();

    for (const cat of categories) {
      expect(cat).toHaveProperty("id");
      expect(cat).toHaveProperty("name");
      expect(cat).toHaveProperty("slug");
      expect(typeof cat.id).toBe("number");
      expect(typeof cat.name).toBe("string");
      expect(typeof cat.slug).toBe("string");
    }
  });

  it("contains parent categories (parentId is null) and subcategories (parentId is set)", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const categories = await caller.blog.listCategories();

    const parents = categories.filter((c) => c.parentId === null);
    const subs = categories.filter((c) => c.parentId !== null);

    // We seeded both parent and sub categories
    expect(parents.length).toBeGreaterThan(0);
    expect(subs.length).toBeGreaterThan(0);
  });
});

describe("blog.stats (admin)", () => {
  it("returns total, published, drafts, and unpublished counts", async () => {
    const ctx = await createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const stats = await caller.blog.stats();

    expect(stats).toHaveProperty("total");
    expect(stats).toHaveProperty("published");
    expect(stats).toHaveProperty("drafts");
    expect(stats).toHaveProperty("unpublished");
    expect(typeof stats.total).toBe("number");
    expect(typeof stats.published).toBe("number");
    expect(typeof stats.drafts).toBe("number");
    expect(typeof stats.unpublished).toBe("number");
  });

  it("total equals sum of published + drafts + unpublished", async () => {
    const ctx = await createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const stats = await caller.blog.stats();

    expect(stats.total).toBe(stats.published + stats.drafts + stats.unpublished);
  });

  it("returns correct total count matching the database", async () => {
    const ctx = await createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // Get stats
    const stats = await caller.blog.stats();

    // Get list total for comparison
    const publicCtx = createPublicContext();
    const publicCaller = appRouter.createCaller(publicCtx);
    const list = await publicCaller.blog.list({ limit: 1 });

    // Stats total should match list total (both query the full database)
    expect(stats.total).toBe(list.total);
  });
});

describe("blog.createCategory (admin)", () => {
  it("creates a new category and returns its id", async () => {
    const ctx = await createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const slug = `test-category-${Date.now()}`;
    const result = await caller.blog.createCategory({
      name: "Test Category",
      slug,
      description: "A test category",
      color: "blue",
    });

    expect(result).toHaveProperty("id");
    expect(typeof result.id).toBe("number");

    // Clean up: delete the test category
    await caller.blog.deleteCategory({ id: result.id });
  });

  it("rejects duplicate slugs", async () => {
    const ctx = await createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const slug = `dup-test-${Date.now()}`;
    const result = await caller.blog.createCategory({
      name: "Dup Test",
      slug,
    });

    await expect(
      caller.blog.createCategory({ name: "Dup Test 2", slug })
    ).rejects.toThrow("already exists");

    // Clean up
    await caller.blog.deleteCategory({ id: result.id });
  });
});

describe("blog.updateCategory (admin)", () => {
  it("updates a category name", async () => {
    const ctx = await createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const slug = `update-test-${Date.now()}`;
    const { id } = await caller.blog.createCategory({
      name: "Before Update",
      slug,
    });

    const result = await caller.blog.updateCategory({
      id,
      name: "After Update",
    });

    expect(result).toEqual({ success: true });

    // Verify the update
    const categories = await caller.blog.listCategories();
    const updated = categories.find((c) => c.id === id);
    expect(updated?.name).toBe("After Update");

    // Clean up
    await caller.blog.deleteCategory({ id });
  });
});

describe("blog.deleteCategory (admin)", () => {
  it("deletes a category", async () => {
    const ctx = await createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const slug = `delete-test-${Date.now()}`;
    const { id } = await caller.blog.createCategory({
      name: "To Delete",
      slug,
    });

    const result = await caller.blog.deleteCategory({ id });
    expect(result).toEqual({ success: true });

    // Verify deletion
    const categories = await caller.blog.listCategories();
    const found = categories.find((c) => c.id === id);
    expect(found).toBeUndefined();
  });

  it("prevents deleting a category with subcategories", async () => {
    const ctx = await createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const parentSlug = `parent-del-${Date.now()}`;
    const { id: parentId } = await caller.blog.createCategory({
      name: "Parent To Delete",
      slug: parentSlug,
    });

    const childSlug = `child-del-${Date.now()}`;
    const { id: childId } = await caller.blog.createCategory({
      name: "Child",
      slug: childSlug,
      parentId,
    });

    // Should fail because it has children
    await expect(
      caller.blog.deleteCategory({ id: parentId })
    ).rejects.toThrow("subcategories");

    // Clean up: delete child first, then parent
    await caller.blog.deleteCategory({ id: childId });
    await caller.blog.deleteCategory({ id: parentId });
  });
});

describe("blog categories - 3-tier taxonomy structure", () => {
  it("has exactly 3 parent categories: Dental Issues, Dentist Challenges, Insurance Problems", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const categories = await caller.blog.listCategories();
    const parents = categories.filter((c) => c.parentId === null);
    const parentNames = parents.map((p) => p.name).sort();

    expect(parentNames).toEqual(["Dental Issues", "Dentist Challenges", "Insurance Problems"]);
  });

  it("each parent category has subcategories", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const categories = await caller.blog.listCategories();
    const parents = categories.filter((c) => c.parentId === null);

    for (const parent of parents) {
      const subs = categories.filter((c) => c.parentId === parent.id);
      expect(subs.length).toBeGreaterThan(0);
    }
  });

  it("Dental Issues has expected subcategories", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const categories = await caller.blog.listCategories();
    const dentalIssues = categories.find((c) => c.name === "Dental Issues" && !c.parentId);
    expect(dentalIssues).toBeDefined();

    const subs = categories.filter((c) => c.parentId === dentalIssues!.id);
    const subNames = subs.map((s) => s.name);

    expect(subNames).toContain("Cavities & Tooth Decay");
    expect(subNames).toContain("Gum Disease");
    expect(subNames).toContain("Tooth Pain & Sensitivity");
  });

  it("filtering by categoryId returns only posts in that category", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const categories = await caller.blog.listCategories();
    const dentalIssues = categories.find((c) => c.name === "Dental Issues" && !c.parentId);
    expect(dentalIssues).toBeDefined();

    const filtered = await caller.blog.list({
      category: String(dentalIssues!.id),
      publishedOnly: true,
      limit: 100,
    });

    // All returned posts should have the Dental Issues categoryId
    for (const post of filtered.posts) {
      expect((post as any).categoryId).toBe(dentalIssues!.id);
    }
  });

  it("all posts have categoryId and subcategoryId assigned", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const allPosts = await caller.blog.list({ limit: 100 });

    for (const post of allPosts.posts) {
      expect((post as any).categoryId).not.toBeNull();
      expect((post as any).subcategoryId).not.toBeNull();
    }
  });

  it("default sort is by publishedAt descending", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.blog.list({ publishedOnly: true, limit: 10 });
    const posts = result.posts;

    if (posts.length >= 2) {
      for (let i = 0; i < posts.length - 1; i++) {
        const dateA = new Date(posts[i].publishedAt!).getTime();
        const dateB = new Date(posts[i + 1].publishedAt!).getTime();
        expect(dateA).toBeGreaterThanOrEqual(dateB);
      }
    }
  });
});

describe("blog category unauthorized access", () => {
  it("rejects createCategory without admin auth", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.blog.createCategory({ name: "Unauth", slug: "unauth" })
    ).rejects.toThrow();
  });

  it("rejects updateCategory without admin auth", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.blog.updateCategory({ id: 1, name: "Hack" })
    ).rejects.toThrow();
  });

  it("rejects deleteCategory without admin auth", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.blog.deleteCategory({ id: 1 })
    ).rejects.toThrow();
  });

  it("rejects stats without admin auth", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.blog.stats()
    ).rejects.toThrow();
  });
});
