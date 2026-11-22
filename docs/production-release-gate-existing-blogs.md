# STOP-GATE · Existing DentaSmart Blogs: Metadata & Reviewer Preservation

**Do not authorize live deployment of the unified Blog Editor / Advanced SEO changes until all checks below have passed, with documented evidence.**

## Non-negotiable business requirement

- **All previously published articles keep their existing metadata exactly as it was before deployment** unless a separate, explicit content edit is approved. This includes: SEO title, meta description, legacy meta keywords, primary and secondary keyphrases, Open Graph title, description and image, canonical, article slug and published status.
- **Reviewer data already entered on exactly one existing blog must remain exactly as it was.** Other articles must not acquire a reviewer name, credentials, attribution URL, reviewed date, JSON-LD or review badge automatically. We must confirm the affected article from read-only production data before the release; do not guess its identifier.
- The visual relocation of original input fields into the unified SEO & Editorial Review workspace must not modify existing database records.
- Blog Tags are an independent, test-only table. Never mix Tags into legacy metaKeywords, search phrases or review attribution.
- No automatic metadata regeneration, default overwrites, bulk article rewrites, change of canonical URLs, publication-state changes, sitemap/robots changes or reviewer backfill during deployment.

## Required preflight and post-deployment checks

1. **Read-only inventory first:** Identify production database, schema version, existing blog count and the single blog with stored reviewer information. Determine which optional reviewer columns are actually installed. Do not infer a reviewer simply from non-null legacy fields; separately check approved public attribution.
2. **Verified, restorable backup:** Obtain an authenticated, restorable database backup approved by the production owner, plus a rollback plan and release window. Do not touch production until this gate passes.
3. **Baseline snapshots:** Use authorized read-only access to compute per-field SHA-256 fingerprints for every existing blog article's metadata and reviewer values. Include nulls explicitly; record the article IDs, slugs and status. Save baseline securely **outside Git**, without exposing raw reviewer data in tickets or chats. Compare only fields present on the verified production schema, but never silently omit fields that contain the reviewer entry.
4. **On a restored, production-like staging DB:** Apply the exact planned code and any separately approved migrations. Ensure that deployment itself produces zero changes to existing blog metadata/reviewer fields. Repeat checks after opening old articles in the Blog Editor, and after saving **an unrelated disposable article only**. Do not click Save Draft on previously published articles; currently it can change the article status to Draft.
5. **Use the test-only comparator:** Validate matching complete snapshots for all pre-existing blog IDs using `compareBlogMetadataSnapshots` in `shared/blogMetadataPreservation.ts`. If any baseline article/field is missing or a digest differs, **fail the release**, investigate, and do not proceed. Do not whitelist differences without a separate explicit content-change approval.
6. **Live post-deploy read-only verification:** After an approved deployment, repeat the exact same per-article fingerprint check (plus page HTML spot-checks for title, description, canonical, Open Graph, reviewer label and JSON-LD). If any unexpected difference appears, halt further rollout and execute the agreed rollback/remediation plan. Never call a release complete without this evidence.

The comparator deliberately does not connect to a database or perform updates. Its input is two complete read-only fingerprint snapshots, built by an authorized database operator, and it returns field names and article IDs for differences **without displaying metadata values**.

## Automated regression test

```bash
cd /workspaces/testing-1 && pnpm check && pnpm exec vitest run shared/blogMetadataPreservation.test.ts server/blogSeoWorkspace.test.ts shared/blogSeoAdapter.test.ts
```

**Important limitation:** Passing these tests confirms comparator logic and editor field wiring; it does **not** prove that a live database was unchanged. Only paired authorized before/after snapshots, staging verification and live post-deploy checks can establish that.

**Environment restrictions:** Current work must remain in `Arslan-denta/testing-1`, `feature/advanced-cms`, test database `dentasmart_test`; no production writes, schema migrations, backups, or live release actions are authorized by this document.
