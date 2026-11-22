# DentaSmart Advanced CMS — Unified Content Workspace

**Branch / environment:** `Arslan-denta/testing-1` · `feature/advanced-cms` · isolated Codespaces database `dentasmart_test` on port 3307. **No production deployment or DB changes.**

## Goals implemented in this branch

- Unified admin navigation for all **15 destinations** linked from the site's Oral Health Hub resource directory, plus **All Content** search.
- Central content workspace at `/admin/content-workspace`. Each hub has a searchable list of imported source pages and independently saved CMS drafts.
- New-page flow for each hub: select hub → enter title/slug → open **unsaved** template → Save Private Draft. New drafts are written only to the existing `cms_pages` / `cms_page_revisions` tables under `/cms-workspace/{hub}/{slug}`. They do **not** create public routes, sitemap entries, redirects, or indexed pages.
- Source-backed **Conditions, Symptoms, and Guides** import structured content into block editors and retain public source files unchanged.
- **Unsupported source formats remain read-only.** Treatment, Cost, Comparison, Lifestyle, Emergency, Life Stage, Prevention, Affordability, Second Opinion, FAQ and utility/template pages require adapters before existing pages can be edited or published. Existing Articles remain in the original Blog manager until migrated.
- Existing Toothache pilot keeps its previous `/conditions/toothache` private draft namespace and restricted test-publish capability. No other CMS content type can use the publishing API.
- Same CMS JSON draft/revision storage contract, no migration/reinstallation needed, optimistic revision and restore safety checks.
- Professional editor layout: page/hub selector, content blocks, media, organization and clinical reviewer fields, **sticky draft/publishing panel**, and SEO Workspace.
- SEO Workspace tabs: SEO, Readability, Schema, Social. The existing weighted editorial SEO score and live checks are preserved.
- Optional primary phrase synonyms, keyword placement, all pass/fail checks, related-page suggestions with preview/copy, reading-time and Flesch ease estimates, prominent words, structured-data editorial preferences, and a social image/title/description preview.
- Category labels and cornerstone flag in draft JSON; does **not** create actual public taxonomy or markup.
- Schema selector values are **draft-only preferences**. Existing server-owned structured-data and reviewer governance remain in effect. No automatic, duplicate or unverified rich-results JSON-LD is emitted.

## Fifteen hub destinations covered by navigation

Conditions · Symptoms · Life Stages · Symptom Checker · Treatments · Dental Costs · Comparisons · Prevention · Lifestyle · Dental Guides · Blogs & Articles · Dental Emergencies · Affordability · Second Opinion · FAQs.

**Important scope distinction:** All 15 hubs are covered for navigation and *new private drafting*. Existing structured-page import/edit has full source coverage only for Conditions, Symptoms and Guides at this stage. The remaining source templates are intentionally read-only until migration is verified. This avoids data loss, unsafe publishing, and pretending to edit live JSX pages when only their route metadata is known.

## Safety invariants

1. All CMS mutations require the **exact isolated MySQL database endpoint** `localhost:3307/dentasmart_test` or `127.0.0.1:3307/dentasmart_test`.
2. Existing-condition source drafts use the already-established condition route key, preserving legacy revisions.
3. New or noncondition content uses independent `/cms-workspace/{hub}/{slug}` private keys.
4. Unknown hub IDs, type mismatches, duplicate slug revisions, stale revision IDs and unsupported existing public source pages are rejected on the server.
5. No production repo, deployment, DB, public pages or sitemaps are modified by creating or saving drafts.
6. Published snapshot API remains limited to **Toothache**, controlled by the existing urgent-care, Quick Answer and SEO validations and the test DB check.
7. Medical review fields are editable claims only, not proof of verified clinical approval.

## Validation — Codespaces

Use a **separate terminal**, keep the website server running until the batch passes:

```bash
cd /workspaces/testing-1 && git pull --ff-only && corepack pnpm check && corepack pnpm exec vitest run shared/cmsUnifiedWorkspace.test.ts shared/cmsSeoAnalysis.test.ts shared/cmsBlocks.test.ts server/cmsSeoMetaIntegration.test.ts server/cmsTestPublication.test.ts && corepack pnpm build
```

After success, stop/restart only the **test server**, then:

- Open `/admin/content-workspace`, view all 15 hubs and search source records.
- Select Conditions, open Toothache, confirm **previous saved draft and revisions** remain unchanged.
- Select Symptoms / Guides, open an imported source page, inspect complete blocks, SEO and disclaimer.
- Select a non-importable hub; confirm original page is **read-only** and its public site has not changed.
- Create a **new** private draft under a hub with a unique slug, add content, save, refresh and restore history. Confirm it is not a new public route.
- Open SEO Workspace tabs and edit synonyms, SEO title, Readability, Schema intent, Social title/image. Confirm live changes and save/reload persistence.
- Confirm test publishing is enabled only for Toothache and all other hubs show disabled controls.
- Inspect testing public Toothache hero contrast, Quick Answer layout, and `noindex` before final acceptance.

**Not complete in this batch:** production publication, full existing-source adapters for the other 12 destinations, actual live Blog migration, new-page public rendering/routing, SEO cross-page duplicate-keyphrase registry, real crawl-based link validity, sitewide schema emission, or verified clinical approval. These require separate migrations and testing before production rollout.

## UX refinement batch (October 2026) — test-branch only

- Dashboard: content summary cards, one compact hub selector in the inventory, status filtering, search and 20-item pagination; alias routes labelled `JS redirect alias` excluded from source inventories. The main admin sidebar remains the only full 15-hub menu.
- Editor: compact draft/publish heading, preserved saved revisions and Toothache-only test publishing.
- SEO: dynamic not-applicable image-alt check for zero images; 96 applicable points are normalized to 100 without falsely passing an inapplicable check. Conservative singular/plural matching applies to phrase placement, **not** body frequency; full-token matching still prevents substring false positives. Related-link suggestions now require main-topic similarity or multiple meaningful shared terms, with scrolling and collapsible check groups.
- Readability: SEO-aligned word counting, reading-ease explanation, advisory long-sentence examples, paragraph and heading distribution, repeated sentence openings, prominent word variant grouping, and technical-word percentage. Medical correctness remains more important than numerical targets.
- Schema: on-change JSON-LD **draft preview** for whitelisted page/article intents, conservative hub-aware starting points, warning/error messages for unsupported FAQ/medical scholarly claims. This preview is never emitted to a public page. No new JSON-LD publishing path, clinical approval or schema authorization has been added.
- Social/media: compact Open Graph and X/Twitter previews, independent optional X text overrides in saved draft JSON and Toothache's test response, custom OG image with featured fallback, reusable Media Library picker, live dimension/format/readability warnings. Hero stays separate. The picker only reuses existing media; it does not upload or mutate media records.
- Remaining limitations: source templates outside Conditions/Symptoms/Guides remain read-only; new drafts are private; cross-site keyword competitiveness, search indexing, live link crawling and social scraper behavior are **not** represented as verified facts.

### Test verification

In a **second Codespaces terminal** (leave the server running), execute:

```bash
cd /workspaces/testing-1 && git pull --ff-only && corepack pnpm check && corepack pnpm exec vitest run shared/cmsAdvancedRefinement.test.ts shared/cmsUnifiedWorkspace.test.ts shared/cmsSeoAnalysis.test.ts shared/cmsBlocks.test.ts server/cmsSeoMetaIntegration.test.ts server/cmsTestPublication.test.ts && corepack pnpm build
```

Only after all checks pass, stop the original testing server and run `corepack pnpm start` again. Visually inspect the revised `/admin/content-workspace` and all four SEO panels, then test draft save/reload; do not publish new hub content.

## Follow-up: saved preview, image upload and dashboard shortcuts

- The four content summary cards are now clickable, keyboard accessible and filter the full all-hubs inventory by All, Editable, Saved Drafts, or Migration Pending. A saved source page such as Toothache counts alongside user-created private drafts; the two saved items seen during QA were Toothache and `test-draft-1`.
- Saved drafts include `Preview draft` in the list and `Preview saved draft` inside the editor. The admin-only route `/admin/cms-draft-preview?hub=<hub>&slug=<slug>` uses the existing `cms.getDraft` admin-authenticated API, displays **the saved revision only**, and has `Edit this draft` to return to editing. Unsaved changes cannot be previewed as though saved. The preview is `noindex`, is not added to static routes, and does not publish or affect the production site.
- The private preview reuses the existing safe block renderer and DentaSmart theme. For non-Condition hubs it is a **generic layout preview**, not a promise of final published templates or clinical approval.
- The CMS image picker offers `Upload image` directly. This uses `cms.uploadTestImage`, gated to the **local 127.0.0.1:3307/dentasmart_test database**, and stores converted WebP files in the local Codespace `.cms-test-media/` (not the Manus/production storage proxy). Metadata goes to the test database's existing `media_items` table; image bytes are served only with a valid admin cookie and `no-store`/noindex headers. No migration needed. Allowed JPG, PNG and WebP, max 8 MB and 24 MP; the new image is selected automatically, then the user saves the draft.
- **Important:** the original, separate Media Library upload control still follows its legacy external storage integration and should **not** be used for test uploads unless that integration is independently verified. Use the CMS image picker's local upload instead. Test media files are intentionally Codespace-local, so do not copy test media references into production without migration.
- The old public Toothache pilot remains the only separately test-publishable draft. Every new hub draft remains private.

## Follow-up: Delete / Discard saved draft

- Both **All Content / Content Hubs** lists and **Advanced CMS Editor** display a destructive action for eligible saved drafts. User-created private entries show **Delete** / **Delete draft**; imported source-backed entries show **Discard draft** / **Discard saved draft**.
- This deletes only the **test database's CMS draft row and its revision snapshots**. On source-backed entries, the original public page is never touched and reappears as an unedited source import. On user-created entries, the private-only row disappears from the list. Uploaded images are *not* deleted.
- Confirmation clearly shows the title, slug and revision, explains permanent removal and requires typing **DELETE**. The server separately requires admin authentication, exact isolated `localhost:3307/dentasmart_test` DB, matched hub/slug, revision equality and a database transaction. Older tabs cannot silently delete newer work.
- **Deletion is blocked** for unsaved entries, read-only source pages and all CMS rows with a TEST-published snapshot. Publishing remains restricted to the Toothache pilot.
- **QA steps:** after pulling/building/restarting on Codespaces, open Saved Drafts. Delete only the disposable `test-draft-1` after taking any desired screenshots; confirm it disappears and the total decreases by one. Do not delete Toothache if its saved history is required; if it has a published test snapshot the UI/server block deletion.


## Advanced CMS follow-up: deletion, unpublishing, SEO, image accessibility, readability and links

The test branch implements this work under the **exact local MySQL test database** gate (`localhost/127.0.0.1:3307/dentasmart_test`). No existing public page content is deleted and no production website configuration is changed.

### What is active in the isolated CMS

- Every eligible saved draft offers **Delete** or **Discard draft**; **Unpublish TEST** appears only when the Toothache page holds an active CMS test-published snapshot. Unpublished drafts show no Unpublish action. Delete is enabled only for an existing unprotected private draft. A private overlay on a source-backed page can be discarded, but deleting the underlying source file/public URL is impossible. A test-published record cannot be deleted until its active publication is withdrawn; the user must type `DELETE` to confirm permanent removal and history deletion. Revision conflict checking and database transactions prevent stale deletion.
- **Unpublish** is an active server action only for the existing Toothache CMS test-published overlay; it removes `publishedContent`/`publishedRevision` and returns to the source-controlled Toothache page, retaining the private draft. All other entries omit Unpublish and explain that live publishing is unavailable until their public routes can be safely migrated into CMS control.
- During Toothache TEST publication (which is always noindex), the isolated `sitemap-conditions.xml` excludes the test overlay URL. Withdrawing the overlay restores the original source page and its sitemap listing, because the underlying page has *not* been removed. Private drafts have never been added to any sitemap. Do not claim this is site-wide sitemap withdrawal.
- **Advanced SEO** draft tab stores noindex, page-level nofollow and prospective robots.txt disallow separately. A warning explains why combining Disallow with noindex can prevent crawlers seeing the meta directive. Until actual CMS public routes are migrated, these are **saved editorial preferences**, *not live changes to production robots.txt or HTML responses*.
- Search metadata now shows the full proposed URL path and character count, validated against a shared safe lowercase path rule; the URL is a **draft proposal** and does not rename an existing static page.
- A URL change for a CMS-managed published page must be implemented as an **atomic publishing transition** (new routable path, collision checks, automatic 301 from old path, sitemap canonical replacement, old-path preservation in redirect history, redirect loop checks and cache invalidation). This is intentionally NOT enabled for source-controlled or private drafts: creating a 301 before a new public destination exists would cause broken links and SEO damage.
- On-page image coverage counts the hero plus real body image placements. Featured/social media do not inflate on-page counts. The audit now distinguishes images with alt text, missing alt, generic placeholder alt and explicitly decorative assets. Hero and inline image blocks can mark purely decorative images. Rich-text inline images are inspected from their HTML.
- Readability provides concrete long-sentence, long-paragraph and missing-structure examples with source section labels and **Edit section** navigation; the editor auto-expands and scrolls to the relevant block.
- The shared Blog/CMS rich-text editor link dialog no longer silently flips user-selected nofollow/new-tab settings when the URL changes. It rejects unsupported URL schemes and preserves per-link rel settings; the CMS test renderer now carries these attributes through safe Markdown conversion.

### Remaining publisher migration work

**All-hub unpublish/deletion of original public pages, production robots directives, immediate sitemap removal, and automatic SEO 301 redirects on changed live URLs remain blocked** by the pre-existing static source-controlled route architecture and medical content governance. Each migration should:
1. Import an original source route as an approved CMS-owned public record (preserve original H1, medical guidance, canonical, and review status).
2. Confirm identical rendering and strict noindex/no-follow/robots/canonical behavior at the new route.
3. Implement an atomic publish/unpublish/rename state transition in the route resolver, redirect table, dynamic sitemap and cache invalidation layer.
4. Confirm a never-published draft never enters the sitemap, a live unpublish actually withdraws a CMS-owned URL, and an old URL redirects only after the new destination exists.
5. Test links, redirects, robots and sitemap together in isolation, then require separate explicit approval before any production deployment.

### Recommended tests

`corepack pnpm check`

`corepack pnpm exec vitest run shared/cmsEditorialSafeguards.test.ts shared/cmsSeoAnalysis.test.ts shared/cmsAdvancedRefinement.test.ts shared/cmsUnifiedWorkspace.test.ts shared/cmsBlocks.test.ts server/cmsTestPublication.test.ts server/cmsTestMedia.test.ts`

`corepack pnpm build`

Do not run database migrations or deploy any change to production as part of these checks.
