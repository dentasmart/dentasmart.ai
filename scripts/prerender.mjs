/**
 * Build-time prerendering script.
 *
 * Generates per-route HTML files in dist/public/ with unique meta tags baked in.
 * Imports the staticMeta map and escapeHtml helper from server/metaTags.ts
 * (the single source of truth) via esbuild inline bundling.
 *
 * Usage: node scripts/prerender.mjs  (called automatically after vite build)
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ─── Step 1: Extract staticMeta and escapeHtml from server/metaTags.ts ────────
// We use esbuild to bundle a tiny shim that re-exports what we need.
// This avoids modifying metaTags.ts while keeping it as the single source of truth.

const shimSource = `
// Re-export staticMeta and escapeHtml from metaTags.ts
// We access them by evaluating the module in a controlled way.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = ${JSON.stringify(ROOT)};
const src = readFileSync(resolve(ROOT, "server/metaTags.ts"), "utf-8");

// Extract the staticMeta object (lines 24 to the closing "};")
const startMarker = "const staticMeta: Record<string, MetaInfo> = {";
const startIdx = src.indexOf(startMarker);
if (startIdx === -1) throw new Error("Could not find staticMeta in metaTags.ts");

// Find the matching closing brace by counting braces
let braceCount = 0;
let endIdx = -1;
for (let i = startIdx + startMarker.length - 1; i < src.length; i++) {
  if (src[i] === "{") braceCount++;
  else if (src[i] === "}") {
    braceCount--;
    if (braceCount === 0) {
      endIdx = i + 1;
      break;
    }
  }
}
if (endIdx === -1) throw new Error("Could not find end of staticMeta");

// Extract the object literal and evaluate it
const objectLiteral = src.slice(startIdx + startMarker.length - 1, endIdx);
// Use Function constructor to evaluate the object in a safe scope
const staticMeta = new Function("return (" + objectLiteral + ")")();

// Extract escapeHtml function
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export { staticMeta, escapeHtml };
`;

// Write the shim to a temp file, bundle it, then import the result
const shimPath = path.join(ROOT, "scripts/.prerender-shim.mjs");
fs.writeFileSync(shimPath, shimSource);

// Actually, since the shim only uses Node built-ins and string parsing,
// we can just run it directly without esbuild bundling.
// Let's inline the logic instead for simplicity.
fs.unlinkSync(shimPath);

// ─── Direct extraction approach (no external bundling needed) ─────────────────

const metaTagsSrc = fs.readFileSync(
  path.join(ROOT, "server/metaTags.ts"),
  "utf-8"
);

// Extract staticMeta object
const startMarker = 'const staticMeta: Record<string, MetaInfo> = {';
const startIdx = metaTagsSrc.indexOf(startMarker);
if (startIdx === -1) {
  throw new Error("Could not find staticMeta in server/metaTags.ts");
}

// Find the matching closing brace
let braceCount = 0;
let endIdx = -1;
for (let i = startIdx + startMarker.length - 1; i < metaTagsSrc.length; i++) {
  if (metaTagsSrc[i] === "{") braceCount++;
  else if (metaTagsSrc[i] === "}") {
    braceCount--;
    if (braceCount === 0) {
      endIdx = i + 1;
      break;
    }
  }
}
if (endIdx === -1) {
  throw new Error("Could not find end of staticMeta object");
}

const objectLiteral = metaTagsSrc.slice(
  startIdx + startMarker.length - 1,
  endIdx
);

// Evaluate the object literal (it's a plain JS object with string keys/values)
const staticMeta = new Function("return (" + objectLiteral + ")")();

// escapeHtml — replicated exactly from server/metaTags.ts (same logic, same source of truth)
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ─── Step 2: Read the built template ──────────────────────────────────────────

const distPublic = path.join(ROOT, "dist/public");
const templatePath = path.join(distPublic, "index.html");

if (!fs.existsSync(templatePath)) {
  throw new Error(
    `Template not found at ${templatePath}. Run 'vite build' first.`
  );
}

const template = fs.readFileSync(templatePath, "utf-8");

// Verify placeholders exist in template
if (!template.includes("__PAGE_TITLE__")) {
  throw new Error(
    "Template does not contain __PAGE_TITLE__ placeholder. Check client/index.html."
  );
}

// ─── Step 3: Generate per-route HTML files ────────────────────────────────────

const BASE_URL = "https://dentasmart.ai";
let count = 0;

for (const [routePath, meta] of Object.entries(staticMeta)) {
  // Skip blog posts (dynamic, handled separately)
  if (routePath.startsWith("/oral-health-hub/")) continue;

  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const canonical = `${BASE_URL}${routePath}`;

  // Replace ALL occurrences using split/join
  let html = template;
  html = html.split("__PAGE_TITLE__").join(title);
  html = html.split("__PAGE_DESCRIPTION__").join(description);
  html = html.split("__PAGE_CANONICAL__").join(canonical);

  // Determine output path
  let outputPath;
  if (routePath === "/") {
    outputPath = path.join(distPublic, "index.html");
  } else {
    // "/employers" → dist/public/employers/index.html
    outputPath = path.join(distPublic, routePath, "index.html");
  }

  // Create directory if needed
  const outputDir = path.dirname(outputPath);
  fs.mkdirSync(outputDir, { recursive: true });

  // Write the file
  fs.writeFileSync(outputPath, html);
  count++;
}

console.log(`Prerendered ${count} routes to dist/public/`);
