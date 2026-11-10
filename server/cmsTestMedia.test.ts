import { afterEach, describe, expect, it } from "vitest";
import sharp from "sharp";
import { cleanupCmsTestImage, saveCmsTestImage } from "./cmsTestMedia";

const originalDatabaseUrl = process.env.DATABASE_URL;
afterEach(() => {
  if (originalDatabaseUrl === undefined) delete process.env.DATABASE_URL;
  else process.env.DATABASE_URL = originalDatabaseUrl;
});

describe("isolated CMS media upload safety", () => {
  it("rejects all uploads when not using the exact local testing database", async () => {
    process.env.DATABASE_URL = "mysql://example:example@db.example.com:3306/dentasmart";
    await expect(saveCmsTestImage("test.png", "AAAA", "image/png")).rejects.toThrow(/isolated test database/);
  });

  it("rejects potentially unsafe SVG content even in the test environment", async () => {
    process.env.DATABASE_URL = "mysql://localhost:3307/dentasmart_test";
    await expect(saveCmsTestImage("graphic.svg", "PHN2Zy8+", "image/svg+xml")).rejects.toThrow(/JPG, PNG or WebP/);
  });

  it("rejects forged MIME types by inspecting the actual image bytes", async () => {
    process.env.DATABASE_URL = "mysql://127.0.0.1:3307/dentasmart_test";
    const png = await sharp({ create: { width: 4, height: 4, channels: 3, background: "white" } }).png().toBuffer();
    await expect(saveCmsTestImage("incorrect.jpg", png.toString("base64"), "image/jpeg")).rejects.toThrow(/do not match/);
  });

  it("converts valid test image locally without using the external storage service", async () => {
    process.env.DATABASE_URL = "mysql://127.0.0.1:3307/dentasmart_test";
    const png = await sharp({ create: { width: 80, height: 40, channels: 3, background: "white" } }).png().toBuffer();
    const image = await saveCmsTestImage("test.png", png.toString("base64"), "image/png");
    try {
      expect(image.url).toMatch(/^\/api\/cms-test-media\/[a-f0-9-]{36}\.webp$/);
      expect(image.mimeType).toBe("image/webp");
      expect(image.width).toBe(80);
      expect(image.height).toBe(40);
      expect(image.filePath).toContain(".cms-test-media");
    } finally {
      await cleanupCmsTestImage(image.filePath);
    }
  });
});
