import type { Express } from "express";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  ADMIN_COOKIE_NAME,
  parseCookies,
  verifyAdminToken,
} from "./adminAuth";
import { getAdminById } from "./blogDb";
import { getPrivateCmsMediaConfig } from "./cmsPrivateMediaS3";

const IMAGE_NAME =
  /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}\.webp$/;

export function privateCmsImageKey(name: string): string | null {
  return IMAGE_NAME.test(name)
    ? `cms-private-drafts/${name}`
    : null;
}

type Config = { bucket: string; region: string };

type Dependencies = {
  getConfig: () => Config | null;
  verifyToken: (
    token: string
  ) => Promise<{ adminId: number; username: string } | null>;
  getAdmin: (
    id: number
  ) => Promise<{ username: string } | null>;
  readObject: (
    bucket: string,
    region: string,
    key: string
  ) => Promise<Uint8Array | null>;
};

async function readPrivateObject(
  bucket: string,
  region: string,
  key: string
): Promise<Uint8Array | null> {
  const client = new S3Client({ region });

  try {
    const result = await client.send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    );

    if (!result.Body) return null;

    return await result.Body.transformToByteArray();
  } catch (error) {
    if ((error as { name?: string })?.name === "NoSuchKey") {
      return null;
    }
    throw error;
  } finally {
    client.destroy();
  }
}

/**
 * Same-origin, administrator-authenticated retrieval.
 * No public S3 URLs or presigned URLs are returned.
 * Disabled until the production private-media configuration is approved.
 */
export function registerCmsPrivateMediaRoutes(
  app: Express,
  overrides: Partial<Dependencies> = {}
) {
  const dependencies: Dependencies = {
    getConfig: () => getPrivateCmsMediaConfig(process.env),
    verifyToken: verifyAdminToken,
    getAdmin: getAdminById,
    readObject: readPrivateObject,
    ...overrides,
  };

  app.get("/api/cms-private-media/:name", async (req, res) => {
    res.set({
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, nofollow",
      "Cross-Origin-Resource-Policy": "same-origin",
      "Referrer-Policy": "no-referrer",
      "Vary": "Cookie",
    });

    const config = dependencies.getConfig();
    if (!config) return res.status(404).end();

    const key = privateCmsImageKey(req.params.name);
    if (!key) return res.status(404).end();

    const token = parseCookies(
      req.headers.cookie || ""
    )[ADMIN_COOKIE_NAME];

    if (!token) return res.status(401).end();

    try {
      const identity = await dependencies.verifyToken(token);

      if (
        !identity ||
        !Number.isSafeInteger(identity.adminId) ||
        identity.adminId <= 0 ||
        !identity.username
      ) {
        return res.status(401).end();
      }

      const account = await dependencies.getAdmin(
        identity.adminId
      );

      if (
        !account ||
        account.username !== identity.username
      ) {
        return res.status(403).end();
      }

      const image = await dependencies.readObject(
        config.bucket,
        config.region,
        key
      );

      if (!image?.byteLength) return res.status(404).end();

      if (image.byteLength > 10 * 1024 * 1024) {
        return res.status(413).end();
      }

      return res.status(200)
        .type("image/webp")
        .send(Buffer.from(image));
    } catch {
      return res.status(503).end();
    }
  });
}
