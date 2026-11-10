# Advanced CMS — combined six-stage development gate (November 4, 2026)

## Scope and checkpoint
- Based on verified `9cef660` of `integration/full-cms-prod-20261103`.
- Changes are isolated on `automation/full-cms-six-stage-20261104`.
- Nothing here deploys to production, writes to production MySQL, modifies production AWS, or merges the original branch.
- Execute `node scripts/run-full-cms-six-stage.mjs` in an isolated Codespace worktree after installing dependencies. It produces a Markdown report and logs outside the repository at `/workspaces/dentasmart-cms-gate-results/`.

## Changes
1. Production-private image uploads now use the existing `cms.uploadPrivateImage` CMS router and `media_items` Media Library record. The original local `uploadTestImage` remains available unchanged in the isolated test database.
2. The existing Media Picker uses the server-reported upload mode to choose the correct mutation. ALT text and existing-image selection are retained.
3. Storage stays OFF by default. Production requires valid private draft settings, `CMS_PRIVATE_MEDIA_ENABLED=1`, `CMS_PRIVATE_MEDIA_BUCKET_VERIFIED=1`, and the named S3 bucket/region. **These flags only represent explicit approval; they do not independently prove bucket privacy.** Do not enable them until privacy, credentials, access paths, logs, and CDN access are independently verified.
4. New private images are served only by the existing cookie-authenticated, no-store retrieval route. Private images are blocked from public blog creation/update/publish flows; CMS publication remains test-only.
5. Catalog-only deletion of private CMS S3 records is blocked until S3 deletion and failure recovery are fully integrated. This prevents orphaned objects being treated as deleted. Media reference checks still fail closed.
6. The run script checks TypeScript, targeted tests, repository tests, production build (without deployment), isolated local schema, optional browser smoke, optional read-only S3 audit, and publishes a readiness report with blockers.

## Run stages
- **Stage 0 / 1:** Exact branch and source-module checks.
- **Stage 2:** `corepack pnpm check`.
- **Stage 3:** Targeted CMS/media security regressions.
- **Stage 4:** Full Vitest suite, including existing baseline failures if present.
- **Stage 5:** `corepack pnpm build`; build artifacts are local only.
- **Stage 6:** Read-only local schema query only when the DB URL is exactly the disposable `127.0.0.1:3307/dentasmart_vitest`; Playwright browser smoke on a dedicated local server; optional read-only S3 policy checks if `CMS_S3_READONLY_AUDIT=1`; records remaining production and publishing blockers.

## Important release blockers — not silently auto-completed
- Production schema and migration `0017`–`0019` application status are unverified. Before running any migration verify the exact migration ledger, a **restorable** production backup and active monitoring.
- Existing blog content, SEO fields, reviewers, canonical URLs, redirects and media need before/after checksums against production, not just the local test database.
- S3 bucket IAM policy, public-access-block status, CDN bypass, object-level access and lifecycle/deletion behavior need staging evidence. A local mocked upload test is not proof of live storage behavior.
- Private draft image URLs are NOT public website assets. Promotion to public assets requires an approved copy/transform/publish workflow.
- CMS-wide public publishing does not yet exist. Test-only Toothache publication is not a production publishing system; source-controlled templates that are not imported remain read-only.
- The shared public Media Library upload flow may still depend on the existing Manus storage proxy; this separate dependency must be verified before website deployment.
- Editor login, draft saves, revisions, blog SEO/readability/media selection and preview need a genuine authenticated browser acceptance pass. The automated unauthenticated smoke alone does not prove them.

## Safety and approvals
This development gate has no direct AWS mutations, data migrations, database writes in its read-only probe, Git pushes, production deployments or feature-flag changes. The full existing local test suite may use the configured isolated local test DB, so verify `.env` is a local disposable DB before running it.

A report with locally passing stages plus BLOCKED staging/production stages means **NOT PRODUCTION READY**. Review results, remediate failures, then obtain separate owner approval before any production backup/migration/deployment.

## November 5 — authenticated local acceptance follow-up

New script: `scripts/run-cms-authenticated-qa.mjs`. This script is **separate** from the completed six-stage build/test gate. It refuses nonlocal or nondisposable databases and requires `CMS_AUTH_QA_ALLOW_WRITES=1` plus `DATABASE_URL` pointing to `127.0.0.1:3307/dentasmart_vitest`. It starts a temporary QA server on port 3137, inserts a uniquely named disposable admin, signs in through the browser, saves two CMS draft revisions, checks editorial tabs and local test-image upload, confirms the saved preview and unpublished status, and deletes its own admin, draft, revision, and image data. It compares QA database counts and the existing blog-record fingerprint before and after cleanup. No production S3 uploads or migrations occur.

If port 3137 is already occupied, the script **refuses** to connect to the unknown process. Browser failure or cleanup mismatch produces a failure report; do not mark authenticated acceptance passed unless every check and cleanup passes.

This acceptance test exercises the existing **isolated local** media upload and current CMS editing paths. It does not establish that the production S3 configuration, IAM policy, storage deletion, public content publishing, or live migration are safe. Those remain separately blocked until read-only staging evidence and explicit owner approval are available.

## November 5 — authenticated browser acceptance result (PASS)

User-executed Codespace report: `/workspaces/dentasmart-cms-gate-results/cms-authenticated-qa-498f407614.md`; UTC timestamp `2026-11-05T07:56:44.753Z`. Local branch `verify/cms-six-stage`, source head `6f53312`, disposable QA database `dentasmart_vitest`.

Reported results: **13 PASS, 0 FAIL; overall authenticated acceptance PASS; test exit code 0**. Verified QA database guard, isolated server startup, explicit rejection of optional analytics/marketing through consent UI, browser admin login plus authenticated adminMe, anonymous CMS API access denial, editor rendering, first saved draft revision, SEO/organization/media tabs, local test Media Picker upload, second persisted draft revision, unpublished/private draft status, private preview rendering and cleanup/fingerprint preservation.

The original `blog_posts` fingerprint and database row-count baselines matched after deleting temporary admin/draft/revision/media test records. This establishes acceptance of the **isolated local draft workflow only**. It does not validate real AWS bucket permissions, production DB backups or migrations, CMS-wide publication, or private-to-public image promotion. Staging and production release remain **BLOCKED**.
