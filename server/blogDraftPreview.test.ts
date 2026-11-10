import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getPublicBlogReviewerMetadata, getPublicLastReviewed } from "../shared/blogReviewerMetadata";

const read = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const blogEditor = read("client/src/pages/AdminBlogEditor.tsx");
const blogPreview = read("client/src/pages/AdminBlogDraftPreview.tsx");
const blogRouter = read("server/blogRouter.ts");
const adminRoutes = read("client/src/components/AdminRouter.tsx");
const cmsEditor = read("client/src/pages/AdminCmsPreview.tsx");
const cmsPreview = read("client/src/pages/AdminCmsDraftPreview.tsx");
const cmsWorkspace = read("client/src/pages/CmsContentWorkspace.tsx");

describe("Save → Preview Draft → Edit, without publishing", () => {
  it("adds a separate blog preview route and uses a protected read-only procedure", () => {
    expect(adminRoutes).toContain('blogDraftPreview: prefix + "/blog-draft-preview/:id"');
    expect(adminRoutes).toContain('<Route path={paths.blogDraftPreview} component={AdminBlogDraftPreview} />');
    expect(blogRouter).toContain("getPreviewById: adminBlogProcedure");
    expect(blogRouter).toContain("getBlogPostById(input.id)");
    expect(blogPreview).toContain("trpc.blog.getPreviewById.useQuery");
    expect(blogPreview).not.toContain("trpc.blog.getBySlug.useQuery");
    expect(blogPreview).not.toContain("trpc.blog.publish.useMutation");
    expect(blogPreview).not.toContain("trpc.blog.update.useMutation");
    expect(blogPreview).toContain('meta.content = "noindex, nofollow, noarchive"');
    expect(blogPreview).not.toContain("<SEO");
  });
  it("opens only the saved blog article, in a new tab and preserves editor form state", () => {
    expect(blogEditor).toContain("const previewReady = canPreviewSavedBlog");
    expect(blogEditor).toContain("blogDraftPreviewPath(editId)");
    expect(blogEditor).toContain('target="_blank"');
    expect(blogEditor).toContain("Save your changes before previewing.");
    expect(blogEditor).toContain("Preview Draft");
    expect(blogPreview).toContain("Previewing the last saved version");
    expect(blogPreview).toContain("Back to Editor");
    expect(blogPreview).toContain("article.bodyHtml");
    expect(blogPreview).toContain("hasStructured");
  });
  it("mirrors valid reviewer attribution in the saved private preview without changing public rules", () => {
    expect(blogPreview).toContain('getPublicBlogReviewerMetadata(article)');
    expect(blogPreview).toContain('getPublicLastReviewed(article)');
    expect(blogPreview).toContain('Medically reviewed by{" "}');
    expect(blogPreview).toContain('<ArticleReviewerMetadata review={publicReviewerMetadata} lastReviewed={publicLastReviewed} />');
    expect(blogPreview).toContain("By DentaSmart Editorial Team");
    expect(blogPreview).toContain('Reviewer information saved, but not eligible for public attribution.');
    expect(blogPreview).toContain("hasIncompleteReviewerFields");
    expect(blogPreview).not.toContain("buildBlogReviewWebPageSchema");
    expect(blogPreview).not.toContain("getPublicSupplementalJsonLd");
  });
  it("does not create a public review label from a name alone", () => {
    expect(getPublicBlogReviewerMetadata({ reviewedByName: "Example reviewer" })).toBeUndefined();
    expect(getPublicLastReviewed({ lastReviewed: "" })).toBeUndefined();
    expect(getPublicBlogReviewerMetadata({
      reviewedByName: "Verified Example",
      reviewerProfileUrl: "/authors/verified-example/",
    })).toEqual({
      name: "Verified Example",
      profileUrl: "https://dentasmart.ai/authors/verified-example/",
    });
  });
  it("retains existing Advanced CMS private previews and uses consistent labels", () => {
    expect(cmsEditor).toContain("Save Private Draft");
    expect(cmsEditor).toContain("Preview Draft <ExternalLink");
    expect(cmsEditor).toContain("revision < 1 || dirty");
    expect(cmsEditor).toContain('target="_blank"');
    expect(cmsPreview).toContain("trpc.cms.getDraft.useQuery");
    expect(cmsPreview).toContain('draft.data.source !== "saved_draft"');
    expect(cmsPreview).toContain("Edit this draft");
    expect(cmsWorkspace).toContain('">Preview Draft</a>}');
  });
});
