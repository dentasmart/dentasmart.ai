/**
 * Test-only, admin-managed blog tags. No public render, SEO output or CMS draft coupling.
 * Installation SQL is reviewed/applied separately to the isolated test database only.
 */
import { TRPCError } from "@trpc/server";
import { eq, asc } from "drizzle-orm";
import { blogPostTags } from "../drizzle/schema";
import { normalizeBlogTags } from "../shared/blogTags";
import { getDb } from "./db";
import { getBlogPostById } from "./blogDb";
import { isCmsTestPublicationEnvironment } from "./cmsTestPublication";

function assertTestEnvironment(): void {
  if (!isCmsTestPublicationEnvironment()) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "Blog tags are available only in the isolated test environment until migration and rollout are approved.",
    });
  }
}

function clarifyMissingTable(error: unknown): never {
  const candidate = error as {code?: string; cause?: {code?: string}; message?: string};
  if (candidate?.code === "ER_NO_SUCH_TABLE" || candidate?.cause?.code === "ER_NO_SUCH_TABLE" ||
      (candidate?.message?.includes("blog_post_tags") && candidate?.message?.includes("doesn't exist"))) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "Test blog tags table is not installed. Review the test-only migration before saving tags.",
    });
  }
  throw error;
}

export async function readAdminBlogTags(postId: number): Promise<string[]> {
  assertTestEnvironment();
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Test database unavailable." });
  try {
    const rows = await db.select({tag: blogPostTags.tag})
      .from(blogPostTags).where(eq(blogPostTags.blogPostId, postId))
      .orderBy(asc(blogPostTags.position));
    return rows.map(row => row.tag);
  } catch (error) { clarifyMissingTable(error); }
}

export async function saveAdminBlogTags(postId: number, candidateTags: readonly string[]): Promise<string[]> {
  assertTestEnvironment();
  const tags = normalizeBlogTags(candidateTags);
  if (!(await getBlogPostById(postId))) {
    throw new TRPCError({code: "NOT_FOUND", message: "Blog article not found."});
  }
  const db = await getDb();
  if (!db) throw new TRPCError({code: "PRECONDITION_FAILED", message: "Test database unavailable."});
  try {
    await db.transaction(async tx => {
      await tx.delete(blogPostTags).where(eq(blogPostTags.blogPostId, postId));
      if (tags.length) await tx.insert(blogPostTags).values(
        tags.map((tag, position) => ({blogPostId: postId, tag, position}))
      );
    });
    return tags;
  } catch (error) { clarifyMissingTable(error); }
}
