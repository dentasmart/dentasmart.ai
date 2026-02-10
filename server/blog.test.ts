import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { seedAdminUser } from "./blogDb";

// Helper to create a mock context without admin auth
function createPublicContext(): TrpcContext {
  const cookies: Record<string, string> = {};
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {
        cookie: "",
      },
    } as TrpcContext["req"],
    res: {
      cookie: (name: string, value: string) => {
        cookies[name] = value;
      },
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

// Helper to create context with admin cookie after login
function createAdminContext(cookieStr: string): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {
        cookie: cookieStr,
      },
    } as TrpcContext["req"],
    res: {
      cookie: () => {},
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Blog Router", () => {
  let adminCookie = "";

  beforeAll(async () => {
    // Ensure admin user exists
    await seedAdminUser();
  });

  describe("Admin Authentication", () => {
    it("should reject login with invalid credentials", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.blog.adminLogin({ username: "wrong", password: "wrong" })
      ).rejects.toThrow("Invalid credentials");
    });

    it("should login with valid admin credentials", async () => {
      let setCookieName = "";
      let setCookieValue = "";
      const ctx: TrpcContext = {
        user: null,
        req: {
          protocol: "https",
          headers: { cookie: "" },
        } as TrpcContext["req"],
        res: {
          cookie: (name: string, value: string) => {
            setCookieName = name;
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
      expect(result.admin.username).toBe("admin");
      expect(setCookieName).toBe("blog_admin_session");
      expect(setCookieValue).toBeTruthy();

      // Save cookie for subsequent tests
      adminCookie = `blog_admin_session=${setCookieValue}`;
    });

    it("should return admin info for authenticated admin", async () => {
      const ctx = createAdminContext(adminCookie);
      const caller = appRouter.createCaller(ctx);

      const admin = await caller.blog.adminMe();
      expect(admin).not.toBeNull();
      expect(admin?.username).toBe("admin");
    });

    it("should return null for unauthenticated adminMe", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const admin = await caller.blog.adminMe();
      expect(admin).toBeNull();
    });
  });

  describe("Blog CRUD Operations", () => {
    let createdPostId: number;
    let createdSlug: string;

    it("should reject create without admin auth", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.blog.create({
          title: "Test Post",
          category: "Dental Problems",
        })
      ).rejects.toThrow("Admin authentication required");
    });

    it("should create a new blog post", async () => {
      const ctx = createAdminContext(adminCookie);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.blog.create({
        title: "Test Blog Post for Vitest",
        category: "Dental Problems",
        status: "draft",
        metaTitle: "Test Meta Title",
        metaDescription: "Test meta description for SEO",
        metaKeywords: "test, vitest, blog",
        problemHeading: "The Problem",
        problemContent: "This is a test problem content.",
      });

      expect(result.id).toBeGreaterThan(0);
      expect(result.slug).toBe("test-blog-post-for-vitest");
      createdPostId = result.id;
      createdSlug = result.slug;
    });

    it("should get blog post by id", async () => {
      const ctx = createAdminContext(adminCookie);
      const caller = appRouter.createCaller(ctx);

      const post = await caller.blog.getById({ id: createdPostId });
      expect(post).not.toBeNull();
      expect(post?.title).toBe("Test Blog Post for Vitest");
      expect(post?.category).toBe("Dental Problems");
      expect(post?.status).toBe("draft");
      expect(post?.metaTitle).toBe("Test Meta Title");
    });

    it("should get blog post by slug", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const post = await caller.blog.getBySlug({ slug: createdSlug });
      expect(post).not.toBeNull();
      expect(post?.title).toBe("Test Blog Post for Vitest");
    });

    it("should update a blog post", async () => {
      const ctx = createAdminContext(adminCookie);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.blog.update({
        id: createdPostId,
        title: "Updated Test Blog Post",
        metaDescription: "Updated meta description",
      });

      expect(result.success).toBe(true);

      // Verify update
      const post = await caller.blog.getById({ id: createdPostId });
      expect(post?.title).toBe("Updated Test Blog Post");
      expect(post?.metaDescription).toBe("Updated meta description");
    });

    it("should publish a blog post", async () => {
      const ctx = createAdminContext(adminCookie);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.blog.publish({ id: createdPostId });
      expect(result.success).toBe(true);

      const post = await caller.blog.getById({ id: createdPostId });
      expect(post?.status).toBe("published");
      expect(post?.publishedAt).not.toBeNull();
    });

    it("should unpublish a blog post", async () => {
      const ctx = createAdminContext(adminCookie);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.blog.unpublish({ id: createdPostId });
      expect(result.success).toBe(true);

      const post = await caller.blog.getById({ id: createdPostId });
      expect(post?.status).toBe("unpublished");
    });

    it("should check slug uniqueness", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.blog.checkSlug({ slug: createdSlug });
      expect(result.exists).toBe(true);

      const result2 = await caller.blog.checkSlug({ slug: "non-existent-slug-xyz" });
      expect(result2.exists).toBe(false);
    });

    it("should reject duplicate slug on update", async () => {
      const ctx = createAdminContext(adminCookie);
      const caller = appRouter.createCaller(ctx);

      // Create another post
      const post2 = await caller.blog.create({
        title: "Another Test Post",
        category: "Insurance Problems",
        status: "draft",
      });

      // Try to update post2 with the same slug as post1
      await expect(
        caller.blog.update({
          id: post2.id,
          slug: createdSlug,
        })
      ).rejects.toThrow("This URL slug is already in use");

      // Clean up
      await caller.blog.delete({ id: post2.id });
    });

    it("should delete a blog post", async () => {
      const ctx = createAdminContext(adminCookie);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.blog.delete({ id: createdPostId });
      expect(result.success).toBe(true);

      const post = await caller.blog.getById({ id: createdPostId });
      expect(post).toBeNull();
    });
  });

  describe("Blog Listing", () => {
    it("should list published blog posts", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.blog.list({ publishedOnly: true, limit: 10 });
      expect(result.posts).toBeDefined();
      expect(result.total).toBeGreaterThan(0);
      // All returned posts should be published
      result.posts.forEach((post) => {
        expect(post.status).toBe("published");
      });
    });

    it("should filter by category", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.blog.list({
        category: "Dental Problems",
        publishedOnly: true,
        limit: 50,
      });

      result.posts.forEach((post) => {
        expect(post.category).toBe("Dental Problems");
      });
    });

    it("should search blog posts", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.blog.list({
        search: "cavity",
        publishedOnly: true,
        limit: 10,
      });

      expect(result.posts.length).toBeGreaterThanOrEqual(0);
    });

    it("should paginate results", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const page1 = await caller.blog.list({ publishedOnly: true, page: 1, limit: 5 });
      const page2 = await caller.blog.list({ publishedOnly: true, page: 2, limit: 5 });

      expect(page1.posts.length).toBeLessThanOrEqual(5);
      expect(page1.total).toBeGreaterThan(0);
      if (page1.total > 5) {
        expect(page2.posts.length).toBeGreaterThan(0);
        // Verify pagination returns expected number of results
        expect(page2.posts.length).toBeLessThanOrEqual(5);
      }
    });
  });

  describe("Admin Logout", () => {
    it("should logout admin", async () => {
      let clearedCookieName = "";
      const ctx: TrpcContext = {
        user: null,
        req: {
          protocol: "https",
          headers: { cookie: adminCookie },
        } as TrpcContext["req"],
        res: {
          cookie: () => {},
          clearCookie: (name: string) => {
            clearedCookieName = name;
          },
        } as TrpcContext["res"],
      };

      const caller = appRouter.createCaller(ctx);
      const result = await caller.blog.adminLogout();

      expect(result.success).toBe(true);
      expect(clearedCookieName).toBe("blog_admin_session");
    });
  });
});
