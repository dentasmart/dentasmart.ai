/**
 * Authenticated browser acceptance for DentaSmart Advanced CMS.
 * QA writes are restricted to the disposable local dentasmart_vitest database.
 * Creates a unique temporary admin, draft and image; cleans them up in finally.
 * Does not touch production, external AWS or the protected dentasmart_test DB.
 */
import "dotenv/config";
import { randomBytes, createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import net from "node:net";
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import sharp from "sharp";
import { chromium, expect } from "@playwright/test";

const raw = process.env.DATABASE_URL || "";
let url;
try { url = new URL(raw); } catch { throw new Error("Missing local QA DATABASE_URL"); }
const dbName = decodeURIComponent(url.pathname.slice(1));
if (
  url.protocol !== "mysql:" ||
  !["127.0.0.1", "localhost"].includes(url.hostname) ||
  url.port !== "3307" ||
  dbName !== "dentasmart_vitest" ||
  process.env.CMS_AUTH_QA_ALLOW_WRITES !== "1"
) {
  throw new Error("REFUSED: Requires explicit CMS_AUTH_QA_ALLOW_WRITES=1 and disposable 127.0.0.1:3307/dentasmart_vitest only.");
}
if (process.env.CMS_PRIVATE_MEDIA_ENABLED === "1" ||
    process.env.CMS_PRIVATE_DRAFT_WRITES_ENABLED === "1") {
  throw new Error("REFUSED: Production private draft/media flags must be OFF during QA.");
}
if (process.env.NODE_ENV === "production") {
  throw new Error("REFUSED: No production test execution.");
}

const root = process.cwd();
const port = 3137;
const base = "http://127.0.0.1:" + port;
const runId = randomBytes(5).toString("hex");
const username = "qa_cms_" + runId;
const password = randomBytes(24).toString("hex");
const slug = "qa-cms-" + runId;
const testTitle = "CMS QA Editorial Draft " + runId;
const fileName = slug + ".png";
const routePath = "/cms-workspace/conditions/" + slug;
const reportDir = "/workspaces/dentasmart-cms-gate-results";
fs.mkdirSync(reportDir, {recursive: true});
const reportPath = path.join(reportDir, "cms-authenticated-qa-" + runId + ".md");
const serverLog = path.join(reportDir, "cms-authenticated-server-" + runId + ".log");
const screenshot = path.join(reportDir, "cms-private-preview-" + runId + ".png");

const results = [];
function record(label, ok, info) {
  results.push({label, ok, info: String(info || "").replaceAll("|", "/")});
  console.log((ok ? "PASS " : "FAIL ") + label + (info ? " — " + info : ""));
}
const safeErr = err => {
  let s = String(err?.stack || err?.message || err).slice(0, 1200);
  for (const secret of [url.password, password, raw, process.env.JWT_SECRET]) {
    if (secret && secret.length >= 5) s = s.split(secret).join("[redacted]");
  }
  return s;
};
const fingerprint = rows => createHash("sha256").update(JSON.stringify(rows)).digest("hex");
const count = async (conn, table) => {
  const [rows] = await conn.query("SELECT COUNT(*) AS n FROM " + table);
  return Number(rows[0].n);
};
const blogHash = async conn => {
  const [rows] = await conn.query("SELECT * FROM blog_posts ORDER BY id");
  return fingerprint(rows);
};
const canBindPort = () => new Promise(resolve => {
  const probe = net.createServer();
  probe.once("error", () => resolve(false));
  probe.listen(port, "127.0.0.1", () => probe.close(() => resolve(true)));
});

let conn;
let child;
let browser;
let page;
const browserErrors = [];
let adminId = null;
let outputFd;
let cleanupComplete = false;
let baseline;
try {
  if (!(await canBindPort())) throw new Error("Port 3137 is already occupied. Stop the existing QA server before running this test.");
  conn = await mysql.createConnection({
    uri: url.toString(),
    connectTimeout: 5000,
  });
  const [dbInfo] = await conn.query("SELECT DATABASE() AS db");
  if (dbInfo[0]?.db !== "dentasmart_vitest") throw new Error("Unexpected connected database");

  baseline = {
    admin: await count(conn, "admin_users"),
    pages: await count(conn, "cms_pages"),
    revisions: await count(conn, "cms_page_revisions"),
    media: await count(conn, "media_items"),
    blogs: await blogHash(conn),
  };
  const [existing] = await conn.execute(
    "SELECT id FROM cms_pages WHERE slug = ? OR routePath = ? LIMIT 1",
    [slug, routePath]
  );
  if (existing.length) throw new Error("Temporary QA slug unexpectedly exists");
  record("QA database safety", true, "Disposable local schema and initial inventory verified");

  const hash = await bcrypt.hash(password, 12);
  const [admin] = await conn.execute(
    "INSERT INTO admin_users (username, passwordHash, displayName) VALUES (?, ?, ?)",
    [username, hash, "Temporary CMS QA Admin"]
  );
  adminId = Number(admin.insertId);
  if (!Number.isSafeInteger(adminId) || adminId <= 0) throw new Error("Temporary admin insertion failed");

  outputFd = fs.openSync(serverLog, "a");
  child = spawn("corepack", ["pnpm", "exec", "tsx", "server/_core/index.ts"], {
    cwd: root,
    detached: true,
    stdio: ["ignore", outputFd, outputFd],
    env: {
      ...process.env,
      DATABASE_URL: url.toString(),
      NODE_ENV: "development",
      PORT: String(port),
      CMS_DRAFT_QA_MODE: "1",
      CMS_PRIVATE_MEDIA_ENABLED: "0",
      CMS_PRIVATE_DRAFT_WRITES_ENABLED: "0",
      BUILT_IN_FORGE_API_URL: "",
      BUILT_IN_FORGE_API_KEY: "",
    },
  });
  let ready = false;
  for (let i=0; i<90; i++) {
    if (child.exitCode !== null) break;
    try {
      const res = await fetch(base + "/admin/login", {signal:AbortSignal.timeout(900)});
      if (res.status === 200) { ready = true; break; }
    } catch {}
    await sleep(500);
  }
  if (!ready) throw new Error("Isolated QA server did not become ready; check " + serverLog);
  record("Isolated QA server", true, "Started on 127.0.0.1:3137 with disposable DB");

  browser = await chromium.launch({headless:true});
  const context = await browser.newContext();
  page = await context.newPage();
  page.setDefaultTimeout(30000);
  page.on("pageerror", error => browserErrors.push("pageerror: " + safeErr(error)));
  page.on("console", message => {
    if (message.type() === "error") browserErrors.push("console: " + message.text().slice(0, 260));
  });
  await page.goto(base + "/admin/login", {waitUntil:"domcontentloaded"});
  // First visit: the site's real consent dialog intentionally blocks form clicks.
  // Respect the consent flow and explicitly reject optional tracking in QA.
  const consent = page.getByRole("dialog", {name:"Privacy and tracking preferences"});
  await expect(consent).toBeVisible({timeout:15000});
  await consent.getByRole("button", {name:"Reject non-essential"}).click();
  await expect(consent).toBeHidden();
  record("Privacy consent through UI", true, "Optional analytics and marketing rejected before login");
  await page.locator("#username").fill(username);
  await page.locator("#password").fill(password);
  await page.getByRole("button", {name:"Sign In"}).click();
  await page.waitForURL(u => u.pathname === "/admin", {timeout:30000});
  const adminMe = await page.request.get(base + "/api/trpc/blog.adminMe");
  const adminPayload = await adminMe.json().catch(() => ({}));
  if (adminMe.status() !== 200 || !adminPayload?.result?.data?.json?.id) {
    throw new Error("Admin login navigated, but authenticated adminMe API did not return the QA admin identity");
  }
  record("Authenticated administrator login", true, "Browser navigation and authenticated adminMe API verified");

  const denied = await browser.newContext();
  try {
    const anonymous = await denied.request.get(base + "/api/trpc/cms.getMediaUploadAvailability");
    if (![401,403,404].includes(anonymous.status())) {
      // tRPC normally returns HTTP 401; require denial even on HTTP 200.
      const responseText = await anonymous.text();
      if (!responseText.includes("UNAUTHORIZED") && !responseText.includes("FORBIDDEN")) {
        throw new Error("Anonymous CMS draft retrieval was not denied");
      }
    }
    record("Anonymous CMS admin API access", true, "Unprivileged CMS API request rejected");
  } finally { await denied.close(); }

  const editorUrl = base + "/admin/cms-preview?hub=conditions&slug=" + slug +
    "&title=" + encodeURIComponent(testTitle);
  await page.goto(editorUrl, {waitUntil:"domcontentloaded"});
  // Vite dev may transform a large lazy-loaded CMS module after DOMContentLoaded.
  // Wait for real UI hydration, not only for the initial HTML shell.
  await expect(page.getByRole("heading", {name:/Advanced CMS.*Unified Editor/}))
    .toBeVisible({timeout:35000});
  if (new URL(page.url()).pathname !== "/admin/cms-preview") {
    throw new Error("CMS editor redirected away from its route: " + new URL(page.url()).pathname);
  }
  record("Authenticated CMS editor rendering", true, "Editor heading visible at /admin/cms-preview");
  const titleInput = page.locator("#cms-document-title");
  await expect(titleInput).toBeVisible();
  await expect(page.getByText("Draft structure valid")).toBeVisible();
  await titleInput.fill(testTitle + " — first save");
  const save = page.getByRole("button", {name:"Save Private Draft"});
  await expect(save).toBeEnabled();
  await save.click();
  await expect(page.getByRole("status")).toContainText("Private draft saved as revision 1", {timeout:20000});
  record("CMS draft saved through browser", true, "Revision 1 persisted");

  for (const label of ["SEO Workspace", "Organization & Review", "Media"]) {
    await page.getByRole("tab", {name:label}).click();
    await expect(page.getByRole("tab", {name:label})).toHaveAttribute("data-state", "active");
  }
  record("CMS editorial workspace tabs", true, "SEO, organization, and media sections opened");

  const picker = page.getByRole("button", {name:"Select image"}).first();
  await picker.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", {name:"Upload image"})).toBeEnabled();
  const png = await sharp({
    create: { width: 12, height: 12, channels: 3, background: "#66bbbb" },
  }).png().toBuffer();
  await dialog.locator('input[type="file"]').setInputFiles({
    name: fileName,
    mimeType: "image/png",
    buffer: png,
  });
  await expect(dialog).toBeHidden({timeout:30000});
  record("CMS image upload via Media Picker", true, "Private QA file uploaded to local isolated test storage");

  await expect(save).toBeEnabled();
  await save.click();
  await expect(page.getByRole("status")).toContainText("Private draft saved as revision 2", {timeout:20000});
  record("CMS image draft persistence", true, "Revision 2 saved with image selection");

  const [drafts] = await conn.execute(
    "SELECT id, draftRevision, publishedRevision, publishedContent, draftContent FROM cms_pages WHERE slug=? AND routePath=?",
    [slug, routePath]
  );
  if (drafts.length !== 1 || Number(drafts[0].draftRevision) !== 2 ||
      drafts[0].publishedRevision !== null || drafts[0].publishedContent !== null) {
    throw new Error("Unexpected draft revision or public publication state");
  }
  if (!JSON.stringify(drafts[0].draftContent).includes("/api/cms-test-media/")) {
    throw new Error("Uploaded image reference not found in saved draft");
  }
  record("Draft-only storage and publishing isolation", true, "Draft revision 2 exists; published snapshot remains null");

  await page.goto(base + "/admin/cms-draft-preview?hub=conditions&slug=" + slug, {
    waitUntil:"domcontentloaded"
  });
  await expect(page.getByText(/Private preview.*Revision 2/)).toBeVisible({timeout:20000});
  await expect(page.getByText(testTitle + " — first save").first()).toBeVisible();
  await page.screenshot({path:screenshot, fullPage:false});
  record("Authenticated private draft preview", true, "Saved draft rendered; QA screenshot stored");
} catch (error) {
  let diagnostics = "";
  if (page) {
    try {
      const currentPath = new URL(page.url()).pathname;
      const bodyExcerpt = (await page.locator("body").innerText({timeout:4000}))
        .replace(/\s+/g, " ").slice(0, 1700);
      diagnostics = "Current browser path: " + currentPath +
        "\nVisible page excerpt: " + bodyExcerpt;
      const diagnosticImage = path.join(reportDir, "cms-qa-failure-" + runId + ".png");
      await page.screenshot({path:diagnosticImage, timeout:6000}).catch(()=>{});
      diagnostics += "\nFailure screenshot: " + diagnosticImage;
    } catch (captureError) {
      diagnostics = "Unable to capture browser context: " + safeErr(captureError);
    }
  }
  if (browserErrors.length) {
    diagnostics += "\nBrowser errors: " + browserErrors.slice(-5).join(" | ").slice(0, 1100);
  }
  const diagnosticFile = path.join(reportDir, "cms-authenticated-diagnostics-" + runId + ".txt");
  fs.writeFileSync(diagnosticFile, diagnostics || "No browser diagnostic data available");
  record("Authenticated QA execution", false, safeErr(error) + "\n" + diagnostics.slice(0, 2400));
  console.error("\n=== BROWSER DIAGNOSTICS ===\n" + diagnostics);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close().catch(()=>{});
  if (child?.pid) {
    try { process.kill(-child.pid, "SIGTERM"); } catch {}
  }
  if (outputFd !== undefined) { try { fs.closeSync(outputFd); } catch {} }
  if (conn) {
    try {
      // Cleanup is deliberately restricted to unique generated QA IDs/keys.
      const [pages] = await conn.execute(
        "SELECT id FROM cms_pages WHERE slug = ? AND routePath = ?",
        [slug, routePath]
      );
      for (const row of pages) {
        await conn.execute("DELETE FROM cms_page_revisions WHERE pageId=?", [row.id]);
        await conn.execute("DELETE FROM cms_pages WHERE id=? AND slug=? AND routePath=?",
          [row.id, slug, routePath]);
      }
      const [images] = await conn.execute(
        "SELECT id, fileKey FROM media_items WHERE filename=? AND fileKey LIKE 'cms-test-media/%'",
        [fileName]
      );
      for (const image of images) {
        const match = /^cms-test-media\/([a-f0-9-]{36}\.webp)$/.exec(image.fileKey);
        if (!match) throw new Error("Unexpected QA image fileKey; cleanup refused");
        await conn.execute("DELETE FROM media_items WHERE id=? AND filename=?", [image.id, fileName]);
        await fs.promises.unlink(path.join(root, ".cms-test-media", match[1])).catch(error => {
          if (error.code !== "ENOENT") throw error;
        });
      }
      if (adminId) {
        await conn.execute("DELETE FROM admin_users WHERE id=? AND username=?",
          [adminId, username]);
      }
      const after = {
        admin: await count(conn, "admin_users"),
        pages: await count(conn, "cms_pages"),
        revisions: await count(conn, "cms_page_revisions"),
        media: await count(conn, "media_items"),
        blogs: await blogHash(conn),
      };
      cleanupComplete = !!baseline && JSON.stringify(baseline) === JSON.stringify(after);
      record("Temporary QA data cleanup and blog preservation", cleanupComplete,
        cleanupComplete ? "All baseline counts and original blog fingerprint restored" :
          "Baseline mismatch; inspect database manually before continuing");
      if (!cleanupComplete) process.exitCode = 1;
    } catch (error) {
      record("Temporary QA cleanup", false, safeErr(error));
      process.exitCode = 1;
    } finally {
      await conn.end().catch(()=>{});
    }
  }
}
const escape = x => String(x).replaceAll("|","/").replaceAll("\n"," ");
const report = [
  "# DentaSmart — Authenticated CMS QA Acceptance",
  "",
  "UTC: " + new Date().toISOString(),
  "Branch: " + (process.env.GIT_BRANCH || "see local git status"),
  "Disposable DB: dentasmart_vitest (127.0.0.1:3307)",
  "No production database, S3 bucket, or website deployment contacted.",
  "Generated temporary admin/draft/image: " + runId + " (credentials not logged)",
  "",
  "| Check | Result | Evidence |",
  "|---|---|---|",
  ...results.map(r => "| "+escape(r.label)+" | "+(r.ok?"PASS":"FAIL")+" | "+escape(r.info)+" |"),
  "",
  "Private preview screenshot: " + screenshot,
  "QA server log: " + serverLog,
  "Cleanup verified: " + (cleanupComplete ? "YES" : "NO — investigate"),
  "Overall authenticated acceptance: " +
    (results.every(r => r.ok) && cleanupComplete ? "PASS" : "NOT PASS"),
  "",
].join("\n");
fs.writeFileSync(reportPath, report);
console.log("\n=== AUTHENTICATED QA REPORT ===\n" + report);
console.log("Saved: " + reportPath);
if (!results.every(r => r.ok) || !cleanupComplete) process.exitCode = 1;
