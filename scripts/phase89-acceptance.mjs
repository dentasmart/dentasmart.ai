/**
 * DentaSmart combined Phase 8/9 browser acceptance — guarded testing only.
 * Usage: cd /workspaces/testing-1 && node scripts/phase89-acceptance.mjs
 * Requires locally installed @playwright/test, Chromium and OS dependencies.
 * Does NOT test CMS draft writes: current production-safe gate intentionally
 * rejects the disposable dentasmart_vitest database.
 */
import "dotenv/config";
import { chromium } from "@playwright/test";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { spawn, execFileSync } from "node:child_process";
import net from "node:net";
import fs from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";

const ROOT = process.cwd();
const PORT = 3137;
const BASE = "http://127.0.0.1:" + PORT;
const runId = randomBytes(5).toString("hex");
// Short targeted browser recheck for preview selector; does not repeat 10-minute idle QA.
const previewOnly = process.env.PH89_PREVIEW_ONLY === "1";
const prefix = "QA PH89 " + runId;
const results = [];
let child, browser, db, page, qaAdmin, qaArticleId, qaArticleSlug;
const log = [];
const state = { writeAllowed: false, baseline: null };

function result(id, group, status, detail) {
  results.push({ id, group, status, detail: String(detail).slice(0, 500) });
  console.log(status.padEnd(7) + " " + id + ": " + detail);
}
async function check(id, group, task) {
  try { result(id, group, "PASS", await task()); return true; }
  catch (e) { result(id, group, "FAIL", e.message || e); return false; }
}
function blocked(id, group, reason) { result(id, group, "BLOCKED", reason); }
function assert(condition, message) { if (!condition) throw Error(message); }
async function pageText(locator, phrase) {
  assert((await locator.innerText()).includes(phrase), "Expected " + phrase);
}
async function isPortFree(port) {
  return await new Promise(resolve => {
    const probe = net.createServer();
    probe.once("error", () => resolve(false));
    probe.listen(port, "127.0.0.1", () => probe.close(() => resolve(true)));
  });
}
async function waitForIsolatedServer() {
  for (let i = 0; i < 80; i++) {
    if (child.exitCode != null) throw Error("Isolated server exited: " + log.slice(-12).join(" | "));
    try {
      const response = await fetch(BASE + "/admin/login", { signal: AbortSignal.timeout(2500) });
      if (response.status === 200 && log.some(line => line.includes("Server running on http://localhost:" + PORT))) return;
    } catch {}
    await delay(500);
  }
  throw Error("Isolated server did not become ready on pinned port " + PORT + ". " + log.slice(-12).join(" | "));
}
async function snapshotOriginal() {
  const [rows] = await db.query("SELECT id, slug, status, metaTitle, metaDescription, metaKeywords, primaryKeyword, secondaryKeywords, reviewedByName, publishedAt FROM blog_posts ORDER BY id");
  return JSON.stringify(rows);
}
async function makeReport() {
  const lines = [
    previewOnly ? "# Phase 8/9 isolated preview recheck (not full acceptance)" : "# Phase 8/9 Codespace browser acceptance",
    "",
    "Source branch: feature/advanced-cms",
    "Isolated server: 127.0.0.1:" + PORT + " (temporary)",
    "Database: dentasmart_vitest (localhost:3307; explicit override)",
    "Execution: " + new Date().toISOString(),
    ...(previewOnly ? ["Mode: Preview-only regression; idle and later CMS checks not run in this invocation."] : []),
    "",
    "| Test | Area | Verdict | Detail |", "|---|---|---|---|",
    ...results.map(x => "| " + x.id + " | " + x.group + " | " + x.status + " | " + x.detail.replace(/[|\\r\\n]/g, " ") + " |"),
    "",
    "Total: PASS " + results.filter(x=>x.status==="PASS").length +
    ", FAIL " + results.filter(x=>x.status==="FAIL").length +
    ", BLOCKED " + results.filter(x=>x.status==="BLOCKED").length,
    "",
    "Phase 8 / 9 signoff is NOT granted by this script alone. Some interactive workflows",
    "require additional acceptance evidence, and the CMS draft-write gate intentionally",
    "blocks using dentasmart_vitest. Publishing to production was never attempted.",
  ];
  await fs.mkdir(ROOT + "/docs", { recursive: true });
  const path = ROOT + (previewOnly ? "/docs/phase8-phase9-preview-recheck.md" : "/docs/phase8-phase9-acceptance-report.md");
  await fs.writeFile(path, lines.join("\n") + "\n", "utf8");
  console.log("REPORT: " + path);
}
async function main() {
  assert(execFileSync("git", ["branch", "--show-current"], { encoding: "utf8" }).trim() === "feature/advanced-cms", "Wrong branch");
  const source = new URL(process.env.DATABASE_URL || "http://invalid");
  assert(source.protocol === "mysql:" &&
    ["localhost", "127.0.0.1"].includes(source.hostname) &&
    source.port === "3307" && source.pathname === "/dentasmart_test",
    "STOP: Unexpected source database; no tests executed.");
  source.pathname = "/dentasmart_vitest";
  db = await mysql.createConnection(source.toString());
  const [[preflight]] = await db.query("SELECT DATABASE() AS db, (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema=DATABASE()) AS tables, (SELECT COUNT(*) FROM blog_categories) AS categories, (SELECT COUNT(*) FROM blog_posts) AS articles");
  assert(preflight.db === "dentasmart_vitest" && Number(preflight.tables) === 29 && Number(preflight.categories) === 8 && Number(preflight.articles) === 1, "STOP: Disposable DB fixture count unexpected: " + JSON.stringify(preflight));
  assert(await isPortFree(PORT), "STOP: Port " + PORT + " occupied; never attach to an unknown running server.");
  state.baseline = await snapshotOriginal();
  result("SAFE-01", "Environment", "PASS", "Disposable database verified: 29 tables, 8 categories, 1 article.");
  child = spawn("pnpm", ["exec", "tsx", "server/_core/index.ts"], {
    cwd: ROOT,
    env: { ...process.env, DATABASE_URL: source.toString(), NODE_ENV: "development", PORT: String(PORT), VITEST: "" },
    stdio: ["ignore","pipe","pipe"],
    detached: true, // kill only this QA server's process group on exit
  });
  for (const stream of [child.stdout, child.stderr]) {
    stream.on("data", chunk => {
      for (const line of chunk.toString().split(/\r?\n/).filter(Boolean)) {
        log.push(line);
        if (log.length > 120) log.shift();
      }
    });
  }
  await waitForIsolatedServer();
  state.writeAllowed = true;
  result("SAFE-02", "Environment", "PASS", "Separate application started on verified port 3137 using disposable DB override.");
  browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  const context = await browser.newContext({ baseURL: BASE });
  page = await context.newPage();
  await check("SEC-01", "Security", async () => {
    const res = await context.request.get("/api/trpc/blog.getPreviewById?input=" + encodeURIComponent(JSON.stringify({json:{id:1}})));
    assert(res.status() === 401, "Expected unauthenticated preview HTTP 401, received " + res.status());
    return "Unauthenticated saved-blog preview API refused.";
  });
  await check("SEC-02", "Security", async () => {
    await page.goto("/admin/new");
    await page.waitForURL("**/admin/login", { timeout: 15000 });
    return "Unauthenticated editor redirected to admin login.";
  });

  // Treat the privacy dialog as a real modal: explicitly reject optional
  // tracking in this disposable browser context before interacting with login.
  // Never bypass it with a forced click, injected localStorage or removed overlay.
  const privacyReady = await check("PRIVACY-01", "Privacy", async () => {
    const dialog = page.getByRole("dialog", { name: "Privacy and tracking preferences" });
    await dialog.waitFor({ state: "visible", timeout: 15000 });
    await dialog.getByRole("button", { name: "Reject non-essential", exact: true }).click();
    await dialog.waitFor({ state: "hidden", timeout: 10000 });
    return "Privacy consent handled through UI; optional tracking rejected.";
  });
  if (!privacyReady) throw Error("Privacy dialog could not be resolved; browser login blocked.");

  // A unique disposable login is created ONLY in the verified disposable DB.
  const username = "qa-ph89-" + runId;
  const password = randomBytes(22).toString("hex");
  const hash = await bcrypt.hash(password, 10);
  const [adminInsert] = await db.query(
    "INSERT INTO admin_users (username,passwordHash,displayName) VALUES (?,?,?)",
    [username,hash,"Phase89 disposable QA"]
  );
  qaAdmin = { id: adminInsert.insertId, username };
  const loggedIn = await check("AUTH-01", "Security", async () => {
    await page.goto("/admin/login");
    await page.locator("#username").fill(username);
    await page.locator("#password").fill(password);
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.waitForURL(/\/admin\/?$/, {timeout: 20000});
    return "Disposable test admin logged in through actual browser form.";
  });
  if (!loggedIn) throw Error("Browser login failed; remaining authenticated tests blocked.");

  const editorReady = await check("BLOG-01", "Blog Editor", async () => {
    await page.goto("/admin/new");
    await page.getByPlaceholder("Enter a compelling title...").waitFor({ timeout: 20000 });
    assert(await page.getByRole("button", { name: "Save Draft" }).count() > 0, "Missing Save Draft button");
    assert(await page.locator('a[aria-disabled="true"]').filter({hasText:"Preview Draft"}).count() > 0, "New draft preview not disabled");
    return "New Article editor and saved-only preview guard rendered.";
  });
  if (!editorReady) throw Error("Blog Editor unavailable; cannot safely continue.");

  await check("BLOG-02", "Blog Editor", async () => {
    const tabs = ["SEO","Readability","Social","Featured Image","Schema","Reviewer","Advanced"];
    for (const title of tabs) {
      const tab = page.getByRole("tab", { name: title, exact: true });
      assert(await tab.count() > 0, "Missing SEO workspace tab " + title);
      await tab.click();
      assert(await tab.getAttribute("aria-selected") === "true", "Tab " + title + " did not activate");
    }
    return "All seven SEO workspace tabs activated.";
  });
  await check("BLOG-03", "SEO", async () => {
    await page.getByRole("tab", { name: "SEO", exact: true }).click();
    await page.getByText("SEO metadata & keyphrases").click();
    await pageText(page.locator("body"), "No primary keyphrase entered");
    await pageText(page.locator("body"), "Please enter a meta title");
    await pageText(page.locator("body"), "Please enter a meta description");
    return "Missing keyphrase/title/description feedback visible.";
  });
  const title = prefix + " Draft Safety";
  await page.getByPlaceholder("Enter a compelling title...").fill(title);
  await page.getByPlaceholder("Write a unique SEO title").fill("Phase 8 and 9 Isolated Browser Test");
  await page.getByPlaceholder("Write a helpful search description").fill("Disposable browser acceptance fixture, generated only for the isolated DentaSmart testing environment and not a medical claim.");
  await page.getByPlaceholder("e.g. toothache remedies").fill("dental editor testing");
  const saved = await check("BLOG-04", "Blog Editor", async () => {
    await page.getByRole("button", {name:"Save Draft"}).click();
    await page.waitForURL(/\/admin\/edit\/\d+/, { timeout: 25000 });
    qaArticleId = Number(page.url().match(/\/edit\/(\d+)/)[1]);
    const [rows] = await db.query("SELECT id,slug,status,metaTitle,metaDescription,primaryKeyword FROM blog_posts WHERE id=?", [qaArticleId]);
    assert(rows.length === 1 && rows[0].status === "draft" && rows[0].metaTitle === "Phase 8 and 9 Isolated Browser Test", "Saved values or Draft status invalid.");
    qaArticleSlug = rows[0].slug;
    return "Draft " + qaArticleId + " created; persisted SEO metadata and Draft status verified.";
  });
  if (!saved) throw Error("Disposable draft creation failed; cannot safely continue.");

  await check("BLOG-05", "Blog Editor", async () => {
    await page.reload();
    await page.getByPlaceholder("Enter a compelling title...").waitFor({ timeout: 20000 });
    assert(await page.getByPlaceholder("Enter a compelling title...").inputValue() === title, "Title lost after refresh.");
    assert(await page.getByPlaceholder("Write a unique SEO title").inputValue() === "Phase 8 and 9 Isolated Browser Test", "Meta title lost on refresh.");
    return "Saved title and SEO fields persisted across hard refresh.";
  });
  await check("BLOG-06", "SEO", async () => {
    await page.getByRole("tab", {name:"Schema",exact:true}).click();
    await page.getByRole("tab", {name:"SEO",exact:true}).click();
    await page.reload();
    await page.getByRole("tab", {name:"SEO",exact:true}).waitFor({timeout:20000});
    return "SEO tab switching and refresh completed.";
  });
  await check("BLOG-07", "Security", async () => {
    const resp = await context.request.get("/api/trpc/blog.getBySlug?input=" + encodeURIComponent(JSON.stringify({json:{slug:qaArticleSlug}})));
    const body = await resp.text();
    assert(resp.ok() && (body.includes('"json":null') || body.includes('"data":null')), "Public slug may be exposing draft: " + body.slice(0,200));
    return "Saved draft not available through public slug endpoint.";
  });
  await check("BLOG-08", "Preview", async () => {
    await page.goto("/admin/blog-draft-preview/" + qaArticleId);
    await page.getByText("Previewing the last saved version").first().waitFor({ timeout: 20000 });
    // SSR and runtime can both add noindex. Select the runtime-owned tag and
    // validate all robots tags agree on the private preview's noindex rule.
    const runtimeRobots = page.locator('meta[name="robots"][data-dentasmart-private-preview="true"]');
    assert(await runtimeRobots.count() === 1, "Expected one private-preview runtime robots meta tag.");
    const robots = await runtimeRobots.getAttribute("content");
    assert(robots?.includes("noindex"), "Draft preview lacks runtime noindex meta.");
    const tags = page.locator('meta[name="robots"]');
    for (let i = 0; i < await tags.count(); i++) {
      const content = await tags.nth(i).getAttribute("content");
      assert(content?.includes("noindex"), "Conflicting robots directive: " + content);
    }
    return "Authenticated saved preview opens; all robots tags specify noindex.";
  });
  // Preview-only recheck stops here and preserves the original full-run evidence.
  if (previewOnly) return;
  await page.goto("/admin/edit/" + qaArticleId);
  await page.getByPlaceholder("Enter a compelling title...").waitFor({timeout:20000});

  // Begin the actual idle verification; run other checks while its timer elapses.
  const idleStart = Date.now();
  const idleTitle = prefix + " UNSAVED IDLE";
  await page.getByPlaceholder("Enter a compelling title...").fill(idleTitle);
  await check("BLOG-09", "Durability", async () => {
    assert(await page.locator('a[aria-disabled="true"]').filter({hasText:"Preview Draft"}).count() > 0, "Dirty draft preview remains enabled.");
    return "Dirty-state guard disables stale saved preview.";
  });
  await check("BLOG-10", "Durability", async () => {
    let prompted = false;
    page.once("dialog", async dialog => { prompted = true; await dialog.dismiss(); });
    await page.getByRole("button", {name:"Back",exact:true}).click();
    assert(prompted, "Unsaved navigation confirmation not displayed.");
    assert(page.url().includes("/admin/edit/"), "Editor navigated despite rejected discard.");
    return "Unsaved Back navigation requires confirmation.";
  });
  await check("BLOG-11", "Durability", async () => {
    await page.getByRole("tab", {name:"Rich Text Editor"}).click();
    const editor = page.locator("#blog-wysiwyg-content .ProseMirror").first();
    await editor.waitFor({timeout:15000});
    await editor.fill("QA unsaved rich text survived editor tab switching.");
    await page.getByRole("tab", {name:"StoryBrand Sections"}).click();
    await page.getByRole("tab", {name:"Rich Text Editor"}).click();
    assert((await editor.innerText()).includes("QA unsaved rich text survived"), "Rich text lost on switching.");
    return "Rich text survived StoryBrand/Rich Text mode switches.";
  });
  const cms = await context.newPage();
  await check("CMS-01", "Phase 8 CMS", async () => {
    await cms.goto("/admin/content-workspace");
    await cms.getByText("Manage drafts and source pages").waitFor({timeout:20000});
    return "CMS workspace opens under admin session.";
  });
  await check("CMS-02", "Phase 8 CMS", async () => {
    await cms.goto("/admin/cms-preview?hub=conditions&slug=toothache");
    await cms.getByText("Advanced CMS", {exact:false}).first().waitFor({timeout:20000});
    for (const t of ["Content & Sections","Media","SEO Workspace","Organization & Review"]) {
      await cms.getByRole("tab", {name:t,exact:false}).click();
    }
    return "All four Advanced CMS editor sections activated read-only.";
  });
  await check("CMS-03", "Phase 8 CMS", async () => {
    const response = await context.request.get("/api/trpc/cms.getPublicationStatus?input=" + encodeURIComponent(JSON.stringify({json:{hubId:"conditions",slug:"toothache"}})));
    const content = await response.text();
    assert(response.ok() && content.includes('"permitted":false'), "Unexpected CMS publication permission. " + content.slice(0,220));
    return "Toothache test publication remains fail-closed on disposable database.";
  });
  blocked("CMS-04", "Phase 8 CMS", "CMS save/revision/restore and media uploads require the exact dentasmart_test publication gate; deliberately NOT attempted against shared QA DB.");
  blocked("CMS-05", "Phase 8 CMS", "Toothache publish/unpublish not attempted: protected pilot and no separate publication authorization.");
  blocked("BLOG-12", "Publishing", "A published Save Changes lifecycle requires explicit isolated publication eligibility and complete governed content; not exercised by this safe draft-only smoke suite.");
  while (Date.now() - idleStart < 600000) await delay(Math.min(15000, 600000 - (Date.now() - idleStart)));
  await check("BLOG-13", "Durability", async () => {
    assert(await page.getByPlaceholder("Enter a compelling title...").inputValue() === idleTitle, "Unsaved title reset during ten-minute idle.");
    assert((await page.locator("#blog-wysiwyg-content .ProseMirror").first().innerText()).includes("QA unsaved rich text survived"), "Unsaved rich text reset during ten-minute idle.");
    return "Unsaved title and rich text retained after 10 minutes of real browser inactivity.";
  });
  await check("BLOG-14", "Durability", async () => {
    await page.reload();
    await page.getByPlaceholder("Enter a compelling title...").waitFor({ timeout: 20000 });
    assert(await page.getByPlaceholder("Enter a compelling title...").inputValue() === title, "Refresh failed to recover saved version.");
    return "Refresh restored saved title, not discarded unsaved edits.";
  });
}
async function cleanup() {
  try {
    if (db && qaArticleId) {
      await db.query("DELETE FROM blog_post_revisions WHERE blogPostId=?", [qaArticleId]);
      const [r] = await db.query("DELETE FROM blog_posts WHERE id=? AND slug=? AND title LIKE 'QA PH89 %'", [qaArticleId, qaArticleSlug]);
      if (r.affectedRows !== 1) result("CLEAN-01","Preservation","FAIL","Fixture deletion was not confirmed.");
      else result("CLEAN-01","Preservation","PASS","Deleted only disposable QA blog " + qaArticleId);
    }
  } catch(e) { result("CLEAN-01","Preservation","FAIL","Fixture cleanup failed: " + e.message); }
  try {
    if (db && qaAdmin) {
      const [r] = await db.query("DELETE FROM admin_users WHERE id=? AND username=?", [qaAdmin.id,qaAdmin.username]);
      result("CLEAN-02","Preservation",r.affectedRows===1?"PASS":"FAIL","Disposable QA admin cleanup: " + r.affectedRows);
    }
  } catch(e) { result("CLEAN-02","Preservation","FAIL",e.message); }
  try {
    if (db && state.baseline) {
      const after = await snapshotOriginal();
      result("SAFE-03","Preservation",after===state.baseline?"PASS":"FAIL",
        after===state.baseline?"Original disposable blog records unchanged.":"Original blog baseline mismatch after cleanup.");
    }
  } catch(e) { result("SAFE-03","Preservation","FAIL",e.message); }
  try { if (browser) await browser.close(); } catch {}
  if (child) {
    try { process.kill(-child.pid, "SIGTERM"); } catch {}
    await delay(1000);
    try { process.kill(-child.pid, "SIGKILL"); } catch {}
  }
  if (db) await db.end().catch(()=>{});
}
try { await main(); }
catch(e) { result("STOP","Harness","FAIL",e.stack || e.message || e); }
finally { await cleanup(); await makeReport(); }
if (results.some(x => x.status === "FAIL")) process.exitCode = 1;
