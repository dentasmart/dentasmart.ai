import { describe, expect, it } from "vitest";
import { blogDraftPreviewPath, blogLiveArticlePath, canPreviewSavedBlog } from "./blogPreviewPolicy";

const ready = { articleId: 21, isDirty: false, tagsChanged: false, isSaving: false };
describe("private saved blog preview policy", () => {
  it("only enables preview for saved and unchanged articles", () => {
    expect(canPreviewSavedBlog(ready)).toBe(true);
    expect(canPreviewSavedBlog({ ...ready, articleId: null })).toBe(false);
    expect(canPreviewSavedBlog({ ...ready, articleId: 0 })).toBe(false);
    expect(canPreviewSavedBlog({ ...ready, articleId: NaN })).toBe(false);
  });
  it("prevents stale previews when changes are unsaved or saving", () => {
    expect(canPreviewSavedBlog({ ...ready, isDirty: true })).toBe(false);
    expect(canPreviewSavedBlog({ ...ready, tagsChanged: true })).toBe(false);
    expect(canPreviewSavedBlog({ ...ready, isSaving: true })).toBe(false);
  });
  it("opens a private admin route only for a saved article ID", () => {
    expect(blogDraftPreviewPath(21)).toBe("/admin/blog-draft-preview/21");
    expect(() => blogDraftPreviewPath(-1)).toThrow(/Invalid/);
    expect(() => blogDraftPreviewPath(1.2)).toThrow(/Invalid/);
  });
});

describe("public published blog link policy", () => {
  it("opens the public blog renderer for a persisted published slug", () => {
    expect(blogLiveArticlePath({ status: "published", slug: "root-canal-guide" }))
      .toBe("/oral-health-hub/root-canal-guide");
  });
  it("does not expose a public link for private drafts or unpublished posts", () => {
    expect(blogLiveArticlePath({ status: "draft", slug: "private-post" })).toBeNull();
    expect(blogLiveArticlePath({ status: "unpublished", slug: "removed-post" })).toBeNull();
    expect(blogLiveArticlePath(null)).toBeNull();
  });
  it("rejects missing slugs and encodes special characters in saved slugs", () => {
    expect(blogLiveArticlePath({ status: "published", slug: "  " })).toBeNull();
    expect(blogLiveArticlePath({ status: "published", slug: "a b" }))
      .toBe("/oral-health-hub/a%20b");
  });
});
