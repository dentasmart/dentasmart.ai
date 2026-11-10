import { describe, expect, it } from "vitest";
import {
  isPrivateCmsMediaRecord,
  containsPrivateCmsMediaReference,
  shouldRejectPublicPrivateMedia,
} from "./cmsPrivateMediaPolicy";

describe("CMS private media isolation", () => {
  it("recognizes private S3 media but not public catalog images", () => {
    expect(isPrivateCmsMediaRecord({
      fileKey: "cms-private-drafts/example.webp",
      url: "/api/cms-private-media/example.webp",
    })).toBe(true);
    expect(isPrivateCmsMediaRecord({
      fileKey: "media/public.webp",
      url: "https://cdn.example.com/public.webp",
    })).toBe(false);
  });
  it("detects private media in HTML or featured image fields", () => {
    expect(containsPrivateCmsMediaReference({
      bodyHtml: '<img src="/api/cms-private-media/test.webp">',
    })).toBe(true);
    expect(containsPrivateCmsMediaReference({
      featuredImage: "https://dentasmart.ai/api/cms-private-media/test.webp",
    })).toBe(true);
  });
  it("permits private drafts and denies publication of private assets", () => {
    const draft = { bodyHtml: '<img src="/api/cms-private-media/test.webp">' };
    expect(shouldRejectPublicPrivateMedia(false, draft)).toBe(false);
    expect(shouldRejectPublicPrivateMedia(true, draft)).toBe(true);
    expect(shouldRejectPublicPrivateMedia(true, { bodyHtml: "<p>Public</p>" })).toBe(false);
  });
});
