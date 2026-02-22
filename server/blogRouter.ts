import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import {
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogPostById,
  getBlogPostBySlug,
  listBlogPosts,
  verifyAdminCredentials,
  getAdminById,
  slugExists,
  seedAdminUser,
  getBlogStats,
  listCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  categorySlugExists,
} from "./blogDb";
import { SignJWT, jwtVerify } from "jose";
import { storagePut } from "./storage";

const ADMIN_COOKIE_NAME = "blog_admin_session";
const JWT_SECRET_KEY = process.env.JWT_SECRET || "dentasmart-blog-admin-secret";

// Helper to create JWT token
async function createAdminToken(adminId: number, username: string) {
  const secret = new TextEncoder().encode(JWT_SECRET_KEY);
  const token = await new SignJWT({ adminId, username })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secret);
  return token;
}

// Helper to verify JWT token
async function verifyAdminToken(token: string) {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET_KEY);
    const { payload } = await jwtVerify(token, secret);
    return payload as { adminId: number; username: string };
  } catch {
    return null;
  }
}

// Helper to get admin from context
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

  const payload = await verifyAdminToken(token);
  if (!payload) return null;

  return await getAdminById(payload.adminId);
}

// Middleware-like procedure for admin-only blog routes
const adminBlogProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const admin = await getAdminFromContext(ctx);
  if (!admin) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Admin authentication required" });
  }
  return next({ ctx: { ...ctx, admin } });
});

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 200);
}

export const blogRouter = router({
  // ============ Admin Auth ============
  adminLogin: publicProcedure
    .input(z.object({
      username: z.string().min(1),
      password: z.string().min(1),
    }))
    .mutation(async ({ input, ctx }) => {
      // Ensure admin user exists
      await seedAdminUser();

      const admin = await verifyAdminCredentials(input.username, input.password);
      if (!admin) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid credentials" });
      }

      const token = await createAdminToken(admin.id, admin.username);

      // Set cookie
      ctx.res.cookie(ADMIN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        path: "/",
      });

      return { success: true, admin: { username: admin.username, displayName: admin.displayName } };
    }),

  adminLogout: publicProcedure.mutation(async ({ ctx }) => {
    ctx.res.clearCookie(ADMIN_COOKIE_NAME, { path: "/" });
    return { success: true };
  }),

  adminMe: publicProcedure.query(async ({ ctx }) => {
    const admin = await getAdminFromContext(ctx);
    return admin;
  }),

  // ============ Blog CRUD (Admin Only) ============
  create: adminBlogProcedure
    .input(z.object({
      title: z.string().min(1, "Title is required"),
      slug: z.string().optional(),
      category: z.enum(["Dentist Problems", "Dental Problems", "Insurance Problems", "Symptoms", "Gums", "Cavities", "X-Rays", "Costs"]),
      readTime: z.string().optional(),
      problemHeading: z.string().optional(),
      problemContent: z.string().optional(),
      empathyHeading: z.string().optional(),
      empathyContent: z.string().optional(),
      solutionHeading: z.string().optional(),
      solutionContent: z.string().optional(),
      changeHeading: z.string().optional(),
      changeContent: z.string().optional(),
      resultHeading: z.string().optional(),
      resultContent: z.string().optional(),
      bodyHtml: z.string().optional(),
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      metaKeywords: z.string().optional(),
      ogTitle: z.string().optional(),
      ogDescription: z.string().optional(),
      ogImage: z.string().optional(),
      canonicalUrl: z.string().optional(),
      featuredImage: z.string().optional(),
      categoryId: z.number().nullable().optional(),
      subcategoryId: z.number().nullable().optional(),
      primaryKeyword: z.string().optional(),
      secondaryKeywords: z.string().optional(),
      atAGlanceAnswer: z.string().optional(),
      keyTakeaways: z.string().optional(),
      whenUrgent: z.string().optional(),
      faqs: z.string().optional(),
      relatedPosts: z.string().optional(),
      reviewedByName: z.string().optional(),
      reviewedByCredentials: z.string().optional(),
      status: z.enum(["draft", "published", "unpublished"]).optional(),
    }))
    .mutation(async ({ input }) => {
      let slug = input.slug || generateSlug(input.title);

      // Ensure slug is unique
      let counter = 0;
      let baseSlug = slug;
      while (await slugExists(slug)) {
        counter++;
        slug = `${baseSlug}-${counter}`;
      }

      const id = await createBlogPost({
        ...input,
        slug,
        status: input.status || "draft",
        publishedAt: input.status === "published" ? new Date() : undefined,
      });

      return { id, slug };
    }),

  update: adminBlogProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      slug: z.string().optional(),
      category: z.enum(["Dentist Problems", "Dental Problems", "Insurance Problems", "Symptoms", "Gums", "Cavities", "X-Rays", "Costs"]).optional(),
      readTime: z.string().optional(),
      problemHeading: z.string().optional(),
      problemContent: z.string().optional(),
      empathyHeading: z.string().optional(),
      empathyContent: z.string().optional(),
      solutionHeading: z.string().optional(),
      solutionContent: z.string().optional(),
      changeHeading: z.string().optional(),
      changeContent: z.string().optional(),
      resultHeading: z.string().optional(),
      resultContent: z.string().optional(),
      bodyHtml: z.string().optional(),
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      metaKeywords: z.string().optional(),
      ogTitle: z.string().optional(),
      ogDescription: z.string().optional(),
      ogImage: z.string().optional(),
      canonicalUrl: z.string().optional(),
      featuredImage: z.string().optional(),
      categoryId: z.number().nullable().optional(),
      subcategoryId: z.number().nullable().optional(),
      primaryKeyword: z.string().optional(),
      secondaryKeywords: z.string().optional(),
      atAGlanceAnswer: z.string().optional(),
      keyTakeaways: z.string().optional(),
      whenUrgent: z.string().optional(),
      faqs: z.string().optional(),
      relatedPosts: z.string().optional(),
      reviewedByName: z.string().optional(),
      reviewedByCredentials: z.string().optional(),
      status: z.enum(["draft", "published", "unpublished"]).optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;

      // Check slug uniqueness if slug is being changed
      if (data.slug) {
        const exists = await slugExists(data.slug, id);
        if (exists) {
          throw new TRPCError({ code: "CONFLICT", message: "This URL slug is already in use" });
        }
      }

      // Set publishedAt when publishing for the first time
      const existing = await getBlogPostById(id);
      if (data.status === "published" && existing && !existing.publishedAt) {
        (data as any).publishedAt = new Date();
      }

      await updateBlogPost(id, data);
      return { success: true };
    }),

  delete: adminBlogProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deleteBlogPost(input.id);
      return { success: true };
    }),

  publish: adminBlogProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const post = await getBlogPostById(input.id);
      if (!post) throw new TRPCError({ code: "NOT_FOUND", message: "Blog post not found" });

      await updateBlogPost(input.id, {
        status: "published",
        publishedAt: post.publishedAt || new Date(),
      });
      return { success: true };
    }),

  unpublish: adminBlogProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await updateBlogPost(input.id, { status: "unpublished" });
      return { success: true };
    }),

  // ============ Blog Read (Public) ============
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await getBlogPostById(input.id);
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return await getBlogPostBySlug(input.slug);
    }),

  list: publicProcedure
    .input(z.object({
      category: z.string().optional(),
      status: z.string().optional(),
      search: z.string().optional(),
      page: z.number().optional(),
      limit: z.number().optional(),
      sortBy: z.string().optional(),
      sortOrder: z.enum(["asc", "desc"]).optional(),
      publishedOnly: z.boolean().optional(),
    }).optional())
    .query(async ({ input }) => {
      return await listBlogPosts(input || {});
    }),

  // Admin list (includes all statuses)
  adminList: adminBlogProcedure
    .input(z.object({
      category: z.string().optional(),
      status: z.string().optional(),
      search: z.string().optional(),
      page: z.number().optional(),
      limit: z.number().optional(),
    }).optional())
    .query(async ({ input }) => {
      return await listBlogPosts(input || {});
    }),

  // ============ Stats (Admin) ============
  stats: adminBlogProcedure.query(async () => {
    return await getBlogStats();
  }),

  checkSlug: publicProcedure
    .input(z.object({ slug: z.string(), excludeId: z.number().optional() }))
    .query(async ({ input }) => {
      const exists = await slugExists(input.slug, input.excludeId);
      return { exists };
    }),

  // ============ Category CRUD (Admin) ============
  listCategories: publicProcedure.query(async () => {
    return await listCategories();
  }),

  createCategory: adminBlogProcedure
    .input(z.object({
      name: z.string().min(1, "Name is required"),
      slug: z.string().min(1, "Slug is required"),
      parentId: z.number().nullable().optional(),
      description: z.string().optional(),
      color: z.string().optional(),
      sortOrder: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const exists = await categorySlugExists(input.slug);
      if (exists) {
        throw new TRPCError({ code: "CONFLICT", message: "A category with this slug already exists" });
      }
      const id = await createCategory({
        name: input.name,
        slug: input.slug,
        parentId: input.parentId ?? null,
        description: input.description,
        color: input.color || "stone",
        sortOrder: input.sortOrder || 0,
      });
      return { id };
    }),

  updateCategory: adminBlogProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      slug: z.string().optional(),
      parentId: z.number().nullable().optional(),
      description: z.string().optional(),
      color: z.string().optional(),
      sortOrder: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      if (data.slug) {
        const exists = await categorySlugExists(data.slug, id);
        if (exists) {
          throw new TRPCError({ code: "CONFLICT", message: "A category with this slug already exists" });
        }
      }
      await updateCategory(id, data);
      return { success: true };
    }),

  deleteCategory: adminBlogProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      try {
        await deleteCategory(input.id);
        return { success: true };
      } catch (err: any) {
        throw new TRPCError({ code: "BAD_REQUEST", message: err.message });
      }
    }),

  // Image upload for blog editor
  uploadImage: adminBlogProcedure
    .input(z.object({
      fileName: z.string(),
      fileBase64: z.string(),
      mimeType: z.string(),
    }))
    .mutation(async ({ input }) => {
      const { fileName, fileBase64, mimeType } = input;
      const buffer = Buffer.from(fileBase64, "base64");
      const randomSuffix = Math.random().toString(36).substring(2, 10);
      const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
      const fileKey = `blog-images/${randomSuffix}-${sanitizedName}`;
      const { url } = await storagePut(fileKey, buffer, mimeType);
      return { url };
    }),
});
