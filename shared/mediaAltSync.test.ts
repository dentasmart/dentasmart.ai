import { describe, expect, it } from "vitest";
import { isOnlyCmsAltChange, syncCmsDocumentAlt, syncHtmlImageAlt } from "./mediaAltSync";
import { createCmsBlankDocument } from "./cmsHubRegistry";

const media = { id: 42, urls: ["/api/cms-test-media/one.webp", "/api/cms-test-media/medium.webp"] };

describe("two-way alt-text-only sync", () => {
  it("edits only matching inline image alt, safely escapes characters, not text/other images", () => {
    const html = '<p>Example.</p><img src="/api/cms-test-media/one.webp" alt="old" title="caption"><img src="/different.jpg" alt="keep">';
    const next = syncHtmlImageAlt(html, media, 'A "tooth" & gum');
    expect(next.references).toBe(1);
    expect(next.changed).toBe(true);
    expect(next.html).toContain('alt="A &quot;tooth&quot; &amp; gum" title="caption"');
    expect(next.html).toContain('<img src="/different.jpg" alt="keep">');
    expect(next.html).toContain('<p>Example.</p>');
  });
  it("adds missing alt attributes and allows deliberate clearing", () => {
    const html = '<img src="/api/cms-test-media/medium.webp" width="500">';
    expect(syncHtmlImageAlt(html, media, "").html).toContain('alt=""');
    expect(syncHtmlImageAlt('<img src="/api/cms-test-media/one.webp" alt="old">', media, "").html).toContain('alt=""');
  });
  it("does not touch a deleted image or non-image URL mentions", () => {
    const html = '<a href="/api/cms-test-media/one.webp">photo</a><img src="/different.jpg" alt="keep">';
    expect(syncHtmlImageAlt(html, media, "new")).toEqual({ html, changed: false, references: 0 });
  });
  it("updates CMS image block and independent image slots without touching captions, title or URL", () => {
    const doc = createCmsBlankDocument("conditions", "alt-test", "Alt test");
    doc.images.featured = { mediaId: media.id, url: media.urls[0], altText: "old", caption: "Keep caption" };
    doc.images.hero = { mediaId: 43, url: "/different.jpg", altText: "Keep" };
    doc.blocks.push({ id: "figure", type: "image", image: {
      mediaId: media.id, url: media.urls[0], altText: "old", caption: "Keep this caption" } });
    const result = syncCmsDocumentAlt(doc, media, "updated");
    expect(result.references).toBe(2);
    expect(result.changed).toBe(true);
    expect(result.document.images.featured?.altText).toBe("updated");
    expect(result.document.images.featured?.caption).toBe("Keep caption");
    expect(result.document.images.hero?.altText).toBe("Keep");
    const image = result.document.blocks.find(x => x.type === "image");
    expect(image && image.type === "image" && image.image?.altText).toBe("updated");
    expect(image && image.type === "image" && image.image?.caption).toBe("Keep this caption");
    expect(doc.images.featured?.altText).toBe("old"); // never mutates original
  });
  it("retains empty decorative alt even if library default changes", () => {
    const doc = createCmsBlankDocument("conditions", "alt-test", "Alt test");
    doc.images.featured = { mediaId: 42, url: media.urls[0], altText: "", decorative: true };
    const result = syncCmsDocumentAlt(doc, media, "new default");
    expect(result.references).toBe(1);
    expect(result.changed).toBe(false);
    expect(result.document.images.featured?.altText).toBe("");
  });
  it("image removal never invokes library changes or retains a reference", () => {
    const doc = createCmsBlankDocument("conditions", "alt-test", "Alt test");
    expect(syncCmsDocumentAlt(doc, media, "anything").references).toBe(0);
  });
});

describe("alt auto-save without CMS draft revision", () => {
  it("recognizes only alt text edits to an existing Image Block", () => {
    const prior = createCmsBlankDocument("conditions", "alt-test", "Alt test");
    prior.blocks.push({ id: "photo", type: "image", image: {
      mediaId: media.id, url: media.urls[0], altText: "old", caption: "Caption" } });
    const changed = structuredClone(prior);
    const photo = changed.blocks.find(b => b.id === "photo");
    if (!photo || photo.type !== "image" || !photo.image) throw new Error("Missing test image");
    photo.image.altText = "auto-saved";
    expect(isOnlyCmsAltChange(prior, changed)).toBe(true);

    const cleared = structuredClone(changed);
    const toClear = cleared.blocks.find(b => b.id === "photo");
    if (!toClear || toClear.type !== "image" || !toClear.image) throw new Error("Missing test image");
    toClear.image.altText = "";
    expect(isOnlyCmsAltChange(changed, cleared)).toBe(true);
  });

  it("recognizes only alt edits to featured, hero, and social image slots", () => {
    const prior = createCmsBlankDocument("conditions", "alt-test", "Alt test");
    prior.images = { featured: { url: media.urls[0], altText: "first" },
      hero: { url: media.urls[0], altText: "first" },
      og: { url: media.urls[0], altText: "first" } };
    const changed = structuredClone(prior);
    for (const key of ["featured", "hero", "og"] as const) {
      if (changed.images[key]) changed.images[key].altText = "second";
    }
    expect(isOnlyCmsAltChange(prior, changed)).toBe(true);
  });

  it("still marks changes to captions and image removal as draft edits", () => {
    const prior = createCmsBlankDocument("conditions", "alt-test", "Alt test");
    prior.images.hero = { url: media.urls[0], altText: "first" };
    const caption = structuredClone(prior);
    if (!caption.images.hero) throw new Error("Missing image");
    caption.images.hero.caption = "New caption";
    expect(isOnlyCmsAltChange(prior, caption)).toBe(false);
    const removed = structuredClone(prior);
    removed.images.hero = null;
    expect(isOnlyCmsAltChange(prior, removed)).toBe(false);
    const decorative = structuredClone(prior);
    if (!decorative.images.hero) throw new Error("Missing image");
    decorative.images.hero.decorative = true;
    decorative.images.hero.altText = "";
    expect(isOnlyCmsAltChange(prior, decorative)).toBe(false);
  });
});
