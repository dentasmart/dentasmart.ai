import { describe, expect, it } from "vitest";
import { selectBlogCardHero } from "./blogCardHero";

describe("selectBlogCardHero", () => {
  it("prefers the explicit CMS featured image", () => {
    expect(selectBlogCardHero({
      title: "Explicit hero",
      featuredImage: "/images/blog/explicit-hero.webp",
      topBodyMarkup: '<img src="/images/blog/body-hero.webp" alt="Body hero">',
    })).toEqual({
      url: "/images/blog/explicit-hero.webp",
      alt: "Explicit hero",
      source: "featured",
    });
  });

  it("uses the first body image only when it starts the article markup", () => {
    expect(selectBlogCardHero({
      title: "Buck Teeth",
      featuredImage: null,
      topBodyMarkup: '<img class="rounded-lg" src="https://cdn.example.com/buck-teeth.webp" alt="Buck Teeth"><p>Article opening.</p>',
    })).toEqual({
      url: "https://cdn.example.com/buck-teeth.webp",
      alt: "Buck Teeth",
      source: "top-body-image",
    });
  });

  it("supports an image-only opening paragraph without selecting a later section illustration", () => {
    expect(selectBlogCardHero({
      title: "Opening paragraph image",
      featuredImage: null,
      topBodyMarkup: '<p><img src="/images/blog/opening.webp" alt="Opening illustration"></p><h2>First section</h2><img src="/images/blog/later.webp" alt="Later illustration">',
    })).toEqual({
      url: "/images/blog/opening.webp",
      alt: "Opening illustration",
      source: "top-body-image",
    });
  });

  it("rejects images after opening text or headings", () => {
    for (const topBodyMarkup of [
      '<p>Article opening.</p><img src="/images/blog/later.webp" alt="Later illustration">',
      '<h2>First section</h2><img src="/images/blog/later.webp" alt="Later illustration">',
    ]) {
      expect(selectBlogCardHero({ title: "No declared hero", featuredImage: null, topBodyMarkup })).toBeNull();
    }
  });

  it("rejects missing or unsafe top image URLs", () => {
    expect(selectBlogCardHero({
      title: "Unsafe hero",
      featuredImage: null,
      topBodyMarkup: '<img src="javascript:alert(1)" alt="Unsafe">',
    })).toBeNull();
    expect(selectBlogCardHero({ title: "No hero", featuredImage: null, topBodyMarkup: null })).toBeNull();
  });
});
