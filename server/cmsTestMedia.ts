/**
 * Isolated CMS media for the local MySQL test workspace ONLY.
 * This deliberately NEVER calls the production/Manus storage proxy.
 *
 * Files live in .cms-test-media/ in the Codespace. They are intentionally
 * not portable outside this test server; production publishing is untouched.
 */
import type { Express } from "express";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { isCmsTestPublicationEnvironment, isCmsIsolatedDraftQaEnvironment } from "./cmsTestPublication";
import { ADMIN_COOKIE_NAME, parseCookies, verifyAdminToken } from "./adminAuth";

const FOLDER = path.resolve(process.cwd(), ".cms-test-media");
const MAX_SOURCE_BYTES = 8 * 1024 * 1024;
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp"] as const;

export class CmsTestMediaError extends Error {}
export async function saveCmsTestImage(fileName: string, fileBase64: string, mimeType: string) {
  if (!isCmsTestPublicationEnvironment() && !isCmsIsolatedDraftQaEnvironment()) throw new CmsTestMediaError("Local CMS image upload is only available with the isolated test database.");
  if (!ALLOWED_MIME.some(type => type === mimeType)) throw new CmsTestMediaError("Choose a JPG, PNG or WebP image.");
  if (!fileBase64 || fileBase64.length > Math.ceil(MAX_SOURCE_BYTES * 4 / 3) + 10) {
    throw new CmsTestMediaError("Image must be smaller than 8 MB.");
  }
  const source = Buffer.from(fileBase64, "base64");
  if (!source.length || source.length > MAX_SOURCE_BYTES) throw new CmsTestMediaError("Image must be smaller than 8 MB.");
  const processor = sharp(source, { limitInputPixels: 24_000_000, failOn: "error" });
  const metadata = await processor.metadata();
  const actual = metadata.format === "jpeg" ? "image/jpeg" :
    metadata.format === "png" ? "image/png" :
    metadata.format === "webp" ? "image/webp" : "";
  if (actual !== mimeType) throw new CmsTestMediaError("Image contents do not match the declared file type.");
  if (!metadata.width || !metadata.height) throw new CmsTestMediaError("Image dimensions are unavailable.");
  const output = await sharp(source, { limitInputPixels: 24_000_000 })
    .rotate().resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 83 }).toBuffer({ resolveWithObject: true });
  const uuid = randomUUID();
  const name = uuid + ".webp";
  const filePath = path.join(FOLDER, name);
  await mkdir(FOLDER, { recursive: true, mode: 0o700 });
  await writeFile(filePath, output.data, { mode: 0o600, flag: "wx" });
  const cleanName = path.basename(fileName).replace(/[\\/\u0000-\u001F]/g, "").slice(0, 200) || "cms-upload";
  return {
    url: "/api/cms-test-media/" + name,
    fileKey: "cms-test-media/" + name,
    filename: cleanName,
    mimeType: "image/webp",
    fileSizeBytes: output.data.length,
    width: output.info.width,
    height: output.info.height,
    filePath,
  };
}

export async function cleanupCmsTestImage(filePath: string) {
  if (path.dirname(filePath) !== FOLDER) return;
  await unlink(filePath).catch(() => {});
}

/** Admin-cookie-protected image response; not a published website asset. */
export function registerCmsTestMediaRoutes(app: Express) {
  app.get("/api/cms-test-media/:name", async (req, res) => {
    if (!isCmsTestPublicationEnvironment() && !isCmsIsolatedDraftQaEnvironment()) return res.status(404).end();
    const filename = req.params.name;
    if (!/^[a-f0-9-]{36}\.webp$/.test(filename)) return res.status(404).end();
    const token = parseCookies(req.headers.cookie || "")[ADMIN_COOKIE_NAME];
    if (!token || !(await verifyAdminToken(token))) return res.status(403).end();
    try {
      const buffer = await readFile(path.join(FOLDER, filename));
      res.setHeader("Content-Type", "image/webp");
      res.setHeader("Cache-Control", "private, no-store");
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("X-Robots-Tag", "noindex, nofollow");
      return res.status(200).send(buffer);
    } catch { return res.status(404).end(); }
  });
}
