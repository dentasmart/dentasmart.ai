import { randomUUID } from "node:crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { canUseProductionCmsPrivateDrafts } from "./cmsPrivateDraftPolicy";

type Environment = Record<string, string | undefined>;

export function getPrivateCmsMediaConfig(env: Environment) {
  if (
    env.CMS_PRIVATE_MEDIA_ENABLED !== "1" ||
    env.CMS_PRIVATE_MEDIA_BUCKET_VERIFIED !== "1" ||
    !canUseProductionCmsPrivateDrafts({
      nodeEnv: env.NODE_ENV,
      enabled: env.CMS_PRIVATE_DRAFT_WRITES_ENABLED,
      jwtSecret: env.JWT_SECRET,
      databaseUrl: env.DATABASE_URL,
    })
  ) return null;

  const bucket = env.CMS_PRIVATE_MEDIA_BUCKET?.trim();
  const region = env.CMS_PRIVATE_MEDIA_REGION?.trim();

  if (
    !bucket ||
    !region ||
    !/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/.test(bucket) ||
    !/^[a-z0-9-]+$/.test(region)
  ) return null;

  return { bucket, region };
}

/**
 * Prepares a private S3 object.
 * Never uploads, publishes or returns a public image URL.
 * The production bucket policy must be verified separately.
 */
export async function preparePrivateCmsImage(
  source: Buffer,
  mimeType: string,
  bucket: string
) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(mimeType)) {
    throw new Error("Unsupported image type");
  }

  if (!source.length || source.length > 8 * 1024 * 1024) {
    throw new Error("Image must be between 1 byte and 8 MB");
  }

  const metadata = await sharp(source, {
    limitInputPixels: 24_000_000,
    failOn: "error",
  }).metadata();

  const actual = metadata.format === "jpeg" ? "image/jpeg" :
    metadata.format === "png" ? "image/png" :
    metadata.format === "webp" ? "image/webp" : "";

  if (actual !== mimeType) {
    throw new Error("Image content does not match MIME type");
  }

  const converted = await sharp(source, {
    limitInputPixels: 24_000_000,
    failOn: "error",
  })
    .rotate()
    .resize({
      width: 2400,
      height: 2400,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 83 })
    .toBuffer({ resolveWithObject: true });

  const key = `cms-private-drafts/${randomUUID()}.webp`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: converted.data,
    ContentType: "image/webp",
    CacheControl: "private, no-store",
  });

  return {
    key,
    width: converted.info.width,
    height: converted.info.height,
    fileSizeBytes: converted.data.length,
    mimeType: "image/webp" as const,
    command,
  };
}
