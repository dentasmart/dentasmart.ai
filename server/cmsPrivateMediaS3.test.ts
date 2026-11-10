import { describe, expect, it } from "vitest";
import sharp from "sharp";
import {
  getPrivateCmsMediaConfig,
  preparePrivateCmsImage,
} from "./cmsPrivateMediaS3";

const config = {
  NODE_ENV: "production",
  CMS_PRIVATE_DRAFT_WRITES_ENABLED: "1",
  CMS_PRIVATE_MEDIA_ENABLED: "1",
  CMS_PRIVATE_MEDIA_BUCKET_VERIFIED: "1",
  JWT_SECRET: "a".repeat(40),
  DATABASE_URL: "mysql://user:pass@db.example.com/dentasmart_prod",
  CMS_PRIVATE_MEDIA_BUCKET: "dentasmart-private-cms",
  CMS_PRIVATE_MEDIA_REGION: "us-east-1",
};

describe("Private CMS S3 preparation", () => {
  it("remains disabled without explicit configuration", () => {
    expect(getPrivateCmsMediaConfig({})).toBeNull();
    expect(getPrivateCmsMediaConfig({
      ...config,
      CMS_PRIVATE_MEDIA_ENABLED: undefined,
    })).toBeNull();
    expect(getPrivateCmsMediaConfig({
      ...config,
      CMS_PRIVATE_MEDIA_BUCKET: undefined,
    })).toBeNull();
    expect(getPrivateCmsMediaConfig({
      ...config,
      CMS_PRIVATE_MEDIA_BUCKET_VERIFIED: undefined,
    })).toBeNull();
    expect(getPrivateCmsMediaConfig({
      ...config,
      NODE_ENV: "development",
    })).toBeNull();
  });

  it("recognizes an explicitly configured backend", () => {
    expect(getPrivateCmsMediaConfig(config)).toEqual({
      bucket: "dentasmart-private-cms",
      region: "us-east-1",
    });
  });

  it("prepares WebP without uploading or exposing a URL", async () => {
    const image = await sharp({
      create: {
        width: 4,
        height: 4,
        channels: 3,
        background: "#ffffff",
      },
    }).png().toBuffer();

    const result = await preparePrivateCmsImage(
      image,
      "image/png",
      "dentasmart-private-cms"
    );

    expect(result.key).toMatch(
      /^cms-private-drafts\/[a-f0-9-]+\.webp$/
    );
    expect(result.mimeType).toBe("image/webp");
    expect(result.command.input.Bucket).toBe("dentasmart-private-cms");
    expect(result.command.input.ContentType).toBe("image/webp");
    expect(result.command.input.ACL).toBeUndefined();
    expect("url" in result).toBe(false);
  });

  it("rejects incorrect image types", async () => {
    await expect(
      preparePrivateCmsImage(Buffer.from("invalid"), "image/svg+xml", "test-bucket")
    ).rejects.toThrow("Unsupported image type");
  });
});
