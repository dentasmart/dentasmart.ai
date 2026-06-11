/**
 * backfill-media.mjs
 *
 * Scans all blog_posts.bodyHtml for <img> tags and registers any image
 * that is not already in the media_items table.
 *
 * Usage:
 *   node scripts/backfill-media.mjs --dry-run   (show what would be inserted, no writes)
 *   node scripts/backfill-media.mjs             (execute the backfill)
 *
 * Requires DATABASE_URL in the environment (loaded from .env automatically).
 */

import { createConnection } from "mysql2/promise";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Load .env manually (no dotenv dependency needed) ────────────────────────
const envPath = resolve(__dirname, "../.env");
if (existsSync(envPath)) {
  const lines = readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}

const DRY_RUN = process.argv.includes("--dry-run");
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌  DATABASE_URL is not set. Cannot connect to the database.");
  process.exit(1);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Extract all <img src="..."> URLs from an HTML string. */
function extractImageUrls(html) {
  if (!html) return [];
  const urls = [];
  const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const url = match[1].trim();
    if (url && !url.startsWith("data:")) {
      urls.push(url);
    }
  }
  return urls;
}

/** Extract the alt attribute from an <img> tag. */
function extractAlt(imgTag) {
  const m = imgTag.match(/alt=["']([^"']*)["']/i);
  return m ? m[1].trim() : null;
}

/** Derive a filename from a URL. */
function filenameFromUrl(url) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/");
    return decodeURIComponent(parts[parts.length - 1]) || "image.jpg";
  } catch {
    return "image.jpg";
  }
}

/** Derive the S3 fileKey from a Manus CDN URL. */
function fileKeyFromUrl(url) {
  try {
    const u = new URL(url);
    // Manus CDN URLs: https://files.manuscdn.com/<key>
    // Strip leading slash
    return u.pathname.replace(/^\//, "");
  } catch {
    return url;
  }
}

/** Guess MIME type from filename extension. */
function mimeFromFilename(filename) {
  const ext = filename.split(".").pop()?.toLowerCase();
  const map = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    avif: "image/avif",
  };
  return map[ext] || "image/jpeg";
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔍  DentaSmart Media Library Backfill${DRY_RUN ? " (DRY RUN — no writes)" : ""}\n`);

  const conn = await createConnection(DATABASE_URL);

  try {
    // 1. Fetch all blog posts that contain at least one <img> tag
    const [posts] = await conn.execute(
      "SELECT id, slug, title, bodyHtml FROM blog_posts WHERE bodyHtml LIKE '%<img%'"
    );

    console.log(`📄  Found ${posts.length} post(s) containing <img> tags\n`);

    // 2. Collect all unique image URLs across all posts
    const urlToImgTag = new Map(); // url → first <img> tag seen (for alt extraction)
    const urlToPostInfo = new Map(); // url → { postId, postSlug, postTitle }

    for (const post of posts) {
      const imgTagRegex = /<img[^>]+>/gi;
      let match;
      while ((match = imgTagRegex.exec(post.bodyHtml)) !== null) {
        const imgTag = match[0];
        const srcMatch = imgTag.match(/src=["']([^"']+)["']/i);
        if (!srcMatch) continue;
        const url = srcMatch[1].trim();
        if (!url || url.startsWith("data:")) continue;

        if (!urlToImgTag.has(url)) {
          urlToImgTag.set(url, imgTag);
          urlToPostInfo.set(url, {
            postId: post.id,
            postSlug: post.slug,
            postTitle: post.title,
          });
        }
      }
    }

    const allUrls = Array.from(urlToImgTag.keys());
    console.log(`🖼️   Unique image URLs found: ${allUrls.length}\n`);

    // 3. Check which URLs are already in media_items
    const [existing] = await conn.execute("SELECT url FROM media_items");
    const existingUrls = new Set(existing.map((r) => r.url));

    const toInsert = allUrls.filter((url) => !existingUrls.has(url));
    const alreadyPresent = allUrls.filter((url) => existingUrls.has(url));

    console.log(`✅  Already in media_items: ${alreadyPresent.length}`);
    if (alreadyPresent.length > 0) {
      for (const url of alreadyPresent) {
        console.log(`   ↳ (skip) ${url.slice(0, 80)}...`);
      }
    }

    console.log(`\n➕  To be inserted: ${toInsert.length}\n`);

    if (toInsert.length === 0) {
      console.log("🎉  Nothing to backfill — all images are already catalogued.\n");
      return;
    }

    // 4. Show what would be inserted
    const rows = toInsert.map((url) => {
      const imgTag = urlToImgTag.get(url);
      const postInfo = urlToPostInfo.get(url);
      const filename = filenameFromUrl(url);
      const fileKey = fileKeyFromUrl(url);
      const mimeType = mimeFromFilename(filename);
      const altText = extractAlt(imgTag) || null;

      return {
        url,
        fileKey,
        filename,
        mimeType,
        altText,
        fileSizeBytes: null,
        width: null,
        height: null,
        postInfo,
      };
    });

    console.log("─".repeat(80));
    for (const row of rows) {
      console.log(`\n  URL      : ${row.url}`);
      console.log(`  Filename : ${row.filename}`);
      console.log(`  MIME     : ${row.mimeType}`);
      console.log(`  Alt text : ${row.altText || "(none)"}`);
      console.log(`  File key : ${row.fileKey}`);
      console.log(`  Used in  : [${row.postInfo.postId}] ${row.postInfo.postTitle}`);
    }
    console.log("\n" + "─".repeat(80));

    if (DRY_RUN) {
      console.log(`\n⚠️   DRY RUN complete. ${toInsert.length} row(s) would be inserted.`);
      console.log("    Run without --dry-run to execute the backfill.\n");
      return;
    }

    // 5. Execute inserts
    console.log(`\n⚙️   Inserting ${toInsert.length} row(s)...`);
    let inserted = 0;
    for (const row of rows) {
      await conn.execute(
        `INSERT INTO media_items (url, fileKey, filename, mimeType, fileSizeBytes, width, height, altText)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          row.url,
          row.fileKey,
          row.filename,
          row.mimeType,
          row.fileSizeBytes,
          row.width,
          row.height,
          row.altText,
        ]
      );
      inserted++;
      console.log(`   ✓ [${inserted}/${rows.length}] ${row.filename}`);
    }

    console.log(`\n🎉  Backfill complete. ${inserted} image(s) added to media_items.\n`);
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error("\n❌  Backfill failed:", err.message);
  process.exit(1);
});
