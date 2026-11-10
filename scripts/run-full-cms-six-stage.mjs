/**
 * One-run DentaSmart Advanced CMS six-stage release gate.
 * No production writes, database migrations, AWS object writes, Git pushes,
 * or deployments. External release gates remain blocked until verified.
 */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { spawnSync, spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(root);
const reportDir = process.env.CMS_GATE_REPORT_DIR || "/workspaces/dentasmart-cms-gate-results";
fs.mkdirSync(reportDir, { recursive: true });
const stages = [];
const now = new Date().toISOString().replace(/[:.]/g, "-");
const reportPath = path.join(reportDir, "cms-six-stage-" + now + ".md");

function stage(name, status, details) {
  stages.push({ name, status, details: String(details || "").trim() });
  console.log("\n" + status + ": " + name + (details ? " — " + String(details).slice(0, 190) : ""));
}
function run(name, command, args, timeout = 300000) {
  const result = spawnSync(command, args, {
    cwd: root, encoding: "utf8", timeout,
    maxBuffer: 30 * 1024 * 1024,
    env: { ...process.env, CI: "1" },
  });
  const output = [result.stdout, result.stderr].filter(Boolean).join("\n");
  fs.writeFileSync(path.join(reportDir, name.replace(/[^a-z0-9]+/gi, "-").toLowerCase() + ".log"), output);
  stage(name, result.status === 0 ? "PASS" : "FAIL",
    result.error?.message || ("exit=" + (result.status ?? "none") + "; see saved log"));
  if (result.status !== 0) console.log(output.slice(-1800));
  return result.status === 0;
}

const gitBranch = spawnSync("git", ["branch", "--show-current"], {encoding:"utf8"}).stdout?.trim();
const gitHead = spawnSync("git", ["rev-parse", "--short", "HEAD"], {encoding:"utf8"}).stdout?.trim();
console.log("DentaSmart CMS combined release gate");
console.log("Branch:", gitBranch, "Commit:", gitHead, "Report:", reportPath);

if (gitBranch !== "verify/cms-six-stage" &&
    gitBranch !== "automation/full-cms-six-stage-20261104") {
  stage("0. Checkpoint identity", "FAIL", "Wrong worktree/branch. No changes made.");
  process.exitCode = 1;
} else {
  const ancestor = spawnSync("git", ["merge-base", "--is-ancestor", "9cef660", "HEAD"]);
  stage("0. Checkpoint identity", ancestor.status === 0 ? "PASS" : "FAIL",
    "Source checkpoint must include 9cef660; worktree " + gitBranch);
  if (ancestor.status !== 0) process.exitCode = 1;
}
const localDatabaseUrl = process.env.DATABASE_URL;
let safeIsolatedDb = false;
try {
  const u = new URL(localDatabaseUrl || "");
  safeIsolatedDb = u.protocol === "mysql:" &&
    ["127.0.0.1", "localhost"].includes(u.hostname) &&
    u.port === "3307" &&
    decodeURIComponent(u.pathname.slice(1)) === "dentasmart_vitest";
} catch {}
if (!safeIsolatedDb) {
  stage("0b. Isolated QA database guard", "FAIL",
    "Tests/build refused: use disposable local MySQL 127.0.0.1:3307/dentasmart_vitest only");
  process.exitCode = 1;
} else {
  stage("0b. Isolated QA database guard", "PASS", "Verified disposable local QA database URL; no remote DB access");
}
const required = [
  "server/cmsPrivateMediaS3.ts",
  "server/cmsPrivateMediaRead.ts",
  "server/cmsPrivateMediaUpload.ts",
  "server/cmsPrivateMediaPolicy.ts",
  "server/cmsRouter.ts",
  "server/mediaRouter.ts",
  "client/src/components/cms/CmsMediaPicker.tsx",
  "drizzle/0019_advanced_cms_tables.sql",
];
if (process.exitCode !== 1) {
  stage("1. Source integration", required.every(p => fs.existsSync(p)) ? "PASS" : "FAIL",
    "Required modules and migration source checked; no migration applied");
  run("2. TypeScript", "corepack", ["pnpm", "check"], 300000);
  run("3. Security and CMS regression", "corepack", [
    "pnpm", "exec", "vitest", "run",
    "server/cmsPrivateMediaPolicy.test.ts",
    "server/cmsMediaUploadAvailability.test.ts",
    "server/cmsPrivateMediaS3.test.ts",
    "server/cmsPrivateMediaRead.test.ts",
    "server/cmsPrivateMediaUpload.test.ts",
    "server/cmsProductionMediaSafety.test.ts",
    "server/cmsMediaSchemaReadiness.test.ts",
    "server/mediaAltSync.test.ts",
    "server/cmsAdminSecurity.test.ts",
    "server/cmsTestMedia.test.ts",
    "server/cmsPrivateDraftPolicy.test.ts",
  ], 360000);
  run("4. Full repository test suite", "corepack", ["pnpm", "exec", "vitest", "run"], 720000);
  run("5. Production build without deployment", "corepack", ["pnpm", "build"], 720000);
}

async function probeLocalDb() {
  try {
    const dotenv = await import("dotenv");
    dotenv.config({quiet:true});
    const raw = process.env.DATABASE_URL;
    if (!raw) return stage("6a. Read-only local schema", "BLOCKED", "DATABASE_URL not configured in this worktree");
    const u = new URL(raw);
    const schema = decodeURIComponent(u.pathname.slice(1));
    if (u.protocol !== "mysql:" ||
        !["localhost", "127.0.0.1"].includes(u.hostname) ||
        u.port !== "3307" ||
        !["dentasmart_test", "dentasmart_vitest"].includes(schema)) {
      return stage("6a. Read-only local schema", "BLOCKED", "Non-isolated DB URL; refusing connection");
    }
    const mysql = await import("mysql2/promise");
    const connection = await mysql.createConnection({
      host: u.hostname, port: Number(u.port),
      user: decodeURIComponent(u.username),
      password: decodeURIComponent(u.password),
      database: schema, connectTimeout: 5000,
    });
    try {
      const [tables] = await connection.execute(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = ?",
        [schema]
      );
      const names = new Set(tables.map(r => r.TABLE_NAME || r.table_name));
      const missing = ["blog_posts", "media_items", "cms_pages", "cms_page_revisions"]
        .filter(n => !names.has(n));
      const counts = {};
      for (const name of ["blog_posts", "cms_pages", "cms_page_revisions"]) {
        if (!names.has(name)) continue;
        const [rows] = await connection.query("SELECT COUNT(*) AS n FROM " + name);
        counts[name] = Number(rows[0].n);
      }
      stage("6a. Read-only local schema", missing.length ? "BLOCKED" : "PASS",
        JSON.stringify({schema, tableCount:names.size, counts, missing}));
    } finally {await connection.end();}
  } catch (error) {
    stage("6a. Read-only local schema", "BLOCKED",
      "Could not verify isolated local DB: " + String(error?.code || error?.message || error).slice(0,100));
  }
}

async function smokeBrowser() {
  let child;
  let browser;
  try {
    const {chromium} = await import("@playwright/test");
    browser = await chromium.launch({headless:true});
    const port = 3138;
    child = spawn("corepack", ["pnpm", "dev"], {
      cwd: root, detached: true, stdio: "ignore",
      env: {...process.env, NODE_ENV:"development", PORT:String(port), CMS_DRAFT_QA_MODE:"0"},
    });
    const origin = "http://127.0.0.1:" + port;
    let ready = false;
    for (let attempt=0; attempt<65; attempt++) {
      try {
        const r = await fetch(origin + "/admin/login", {signal:AbortSignal.timeout(800)});
        if (r.status === 200) { ready=true; break; }
      } catch {}
      await delay(450);
    }
    if (!ready) throw new Error("Dev server did not respond at isolated port 3138");
    const page = await browser.newPage();
    const response = await page.goto(origin + "/admin/login", {waitUntil:"domcontentloaded"});
    if (response?.status() !== 200 || !(await page.locator("body").innerText()).trim()) {
      throw new Error("Admin login page did not render");
    }
    const denied = await page.request.get(origin +
      "/api/cms-private-media/12345678-1234-4234-8234-123456789abc.webp");
    if (![401, 403, 404].includes(denied.status())) {
      throw new Error("Anonymous private media endpoint did not reject access");
    }
    stage("6b. Local browser smoke", "PASS",
      "Admin page rendered; anonymous private image retrieval denied ("+denied.status()+")");
  } catch (error) {
    stage("6b. Local browser smoke", "BLOCKED",
      String(error?.message || error).slice(0,250));
  } finally {
    if (browser) await browser.close().catch(()=>{});
    if (child?.pid) {
      try { process.kill(-child.pid, "SIGTERM"); } catch {}
    }
  }
}

async function auditS3ReadOnly() {
  if (process.env.CMS_S3_READONLY_AUDIT !== "1") {
    return stage("6c. S3 bucket privacy", "BLOCKED",
      "Read-only staging audit not authorized/configured; no AWS requests sent");
  }
  const bucket = process.env.CMS_PRIVATE_MEDIA_BUCKET;
  const region = process.env.CMS_PRIVATE_MEDIA_REGION;
  if (!bucket || !region) return stage("6c. S3 bucket privacy", "BLOCKED", "Bucket or region missing");
  try {
    const { S3Client, GetPublicAccessBlockCommand, GetBucketPolicyStatusCommand } =
      await import("@aws-sdk/client-s3");
    const client = new S3Client({ region });
    try {
      const a = await client.send(new GetPublicAccessBlockCommand({ Bucket: bucket }));
      const b = await client.send(new GetBucketPolicyStatusCommand({ Bucket: bucket }));
      const block = a.PublicAccessBlockConfiguration;
      const safe = !!block?.BlockPublicAcls && !!block?.IgnorePublicAcls &&
        !!block?.BlockPublicPolicy && !!block?.RestrictPublicBuckets &&
        b.PolicyStatus?.IsPublic === false;
      stage("6c. S3 bucket privacy", safe ? "PASS" : "FAIL",
        "Read-only AWS checks: public access blocked="+!!safe+
        "; verify IAM, ACLs, CDN and owner sign-off separately");
    } finally { client.destroy(); }
  } catch(error) {
    stage("6c. S3 bucket privacy", "BLOCKED",
      "Read-only AWS verification unavailable: " + String(error?.name || error?.code || "unknown error"));
  }
}

if (process.exitCode !== 1) {
  await probeLocalDb();
  await smokeBrowser();
  await auditS3ReadOnly();
}
stage("6d. Production database & rollback approval", "BLOCKED",
  "Production never contacted. Verify production schema, restorable backup, legacy blog/SEO fingerprints, and rollback with owner before any release");
stage("6e. Public CMS publication", "BLOCKED",
  "CMS-wide public publishing remains intentionally disabled; only test-only Toothache pilot exists. Separate reviewed release required");

const allLocalPass = stages.filter(s => ["0.", "0b.", "1.", "2.", "3.", "4.", "5."].some(prefix=>s.name.startsWith(prefix)))
  .every(s => s.status === "PASS");
const readyForProduction = stages.every(s=>s.status==="PASS");
const escape = s => String(s).replaceAll("|","/").replaceAll("\n"," ");
const report = [
  "# DentaSmart Advanced CMS — Combined Six-Stage Gate",
  "",
  "Generated: " + new Date().toISOString(),
  "",
  "- Branch: " + gitBranch,
  "- Commit: " + gitHead,
  "- Local development checks passed: **" + (allLocalPass ? "yes" : "no") + "**",
  "- Production release authorized: **NO**",
  "- Production ready: **" + (readyForProduction ? "yes" : "NO — blockers remain") + "**",
  "",
  "| Check | Status | Evidence / limitation |",
  "|---|---|---|",
  ...stages.map(s => "| "+escape(s.name)+" | "+s.status+" | "+escape(s.details)+" |"),
  "",
  "## Release limits",
  "No database migrations, AWS object writes, production deploys or feature-flag activations were performed.",
  "Private draft images are not public publishing assets. Private S3 media deletion is blocked until a true verified cleanup workflow exists.",
  "Source-controlled pages not yet fully imported remain read-only. CMS-wide public publication needs a separate review and implementation.",
  "A successful build or local smoke test is not production acceptance.",
  ""
].join("\n");
fs.writeFileSync(reportPath, report);
console.log("\n=== FINAL SIX-STAGE REPORT ===\n" + report);
console.log("Saved:", reportPath);
if (!allLocalPass) process.exitCode = 1;
