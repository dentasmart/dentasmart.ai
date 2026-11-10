import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { hydrateBlogDraftAltFromLibrary, hydrateCmsAltFromLibrary, summarizeMediaUsages } from "./mediaAltSync";
import { createCmsBlankDocument } from "../shared/cmsHubRegistry";

describe("media usage inventory for alt sync and deletion warnings", () => {
  it("counts a referenced CMS draft even without any blog post", () => {
    const result = summarizeMediaUsages([
      { kind: "cms", id: 2, title: "Test CMS page", status: "draft", references: 1 },
    ]);
    expect(result.distinctPages).toBe(1);
    expect(result.draftCount).toBe(1);
    expect(result.publishedCount).toBe(0);
  });

  it("counts a published post so it can block silent published-content edits", () => {
    const result = summarizeMediaUsages([
      { kind: "blog", id: 3, title: "A published article", status: "published", references: 1 },
    ]);
    expect(result.publishedCount).toBe(1);
  });

  it("does not double-count draft and published snapshots as two pages", () => {
    const result = summarizeMediaUsages([
      { kind: "cms", id: 8, title: "Toothache", status: "draft", references: 1 },
      { kind: "cms", id: 8, title: "Toothache", status: "published", references: 1 },
    ]);
    expect(result.total).toBe(2);
    expect(result.distinctPages).toBe(1);
    expect(result.publishedCount).toBe(1);
  });

  it("does not warn for an unreferenced image, including removed images", () => {
    expect(summarizeMediaUsages([])).toEqual({
      usages: [], total: 0, distinctPages: 0, draftCount: 0, publishedCount: 0,
    });
  });
});


describe("read-through alt auto-save (no draft save)", () => {
  const originalUrl = process.env.DATABASE_URL;
  const mediaUrl = "/api/cms-test-media/test-image.webp";
  const mockDb = {
    select: () => ({ from: async () => [{
      id: 42, url: mediaUrl, thumbnailUrl: null, mediumUrl: null, webpUrl: null,
      altText: "latest library alt",
    }] }),
  };

  beforeEach(() => {
    process.env.DATABASE_URL = "mysql://user:password@127.0.0.1:3307/dentasmart_test";
  });
  afterEach(() => {
    if (originalUrl === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = originalUrl;
  });

  it("renders the latest library alt despite an older saved CMS draft", async () => {
    const draft = createCmsBlankDocument("conditions", "test-draft-1", "Test draft");
    draft.blocks.push({ id: "test-photo", type: "image",
      image: { mediaId: 42, url: mediaUrl, altText: "old draft alt", caption: "Keep caption" } });
    const hydrated = await hydrateCmsAltFromLibrary(mockDb, draft);
    const image = hydrated.blocks.find(b => b.id === "test-photo");
    expect(image && image.type === "image" && image.image?.altText).toBe("latest library alt");
    expect(image && image.type === "image" && image.image?.caption).toBe("Keep caption");
    expect(draft.blocks.find(b => b.id === "test-photo")).toEqual({
      id: "test-photo", type: "image",
      image: { mediaId: 42, url: mediaUrl, altText: "old draft alt", caption: "Keep caption" },
    });
  });

  it("renders refreshed blog-draft alt without saving the post", async () => {
    const old = '<p>Keep paragraph</p><img src="' + mediaUrl + '" alt="outdated" title="Caption">';
    const html = await hydrateBlogDraftAltFromLibrary(mockDb, old);
    expect(html).toContain('alt="latest library alt" title="Caption"');
    expect(html).toContain("<p>Keep paragraph</p>");
    expect(old).toContain('alt="outdated"');
  });
});
