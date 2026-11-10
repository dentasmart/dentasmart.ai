# Existing Blog Editor · Advanced CMS SEO Feature Parity (test-only)

**Repository:** `Arslan-denta/testing-1`, branch `feature/advanced-cms`. No production release or production DB changes.

## Implemented in this increment
- Seven clear tabs in the *original Blog Management editor*: **SEO**, **Readability**, **Social**, **Featured Image**, **Schema**, **Reviewer**, **Advanced**. The non-blog Advanced CMS remains a separate admin section.
- **SEO**: Original SEO title, description, legacy meta keywords, focus and secondary keyphrases, canonical URL and slug; one existing shared 100-point score + grouped keyword/link/image/readability checks + search preview.
- **Readability**: Detailed metrics and examples derived from the same draft, preserving article meaning and user review.
- **Social**: Existing OG title, description and OG Image fields moved (not copied) from the SEO form, with Facebook/LinkedIn and X/Twitter network previews, image validation/dimensions and isolated test Media Library picker. X uses existing OG values as fallback. *Separate X-only metadata cannot be persisted in the existing blog table yet.*
- **Featured Image**: Original `featuredImage` field moved (not copied) from Article Settings, with test Media Library picker, image preview, independent from OG image. Featured Image ALT loads from `media_items.altText`, and an explicit Save ALT button updates that library value using existing published-content and multiple-use safeguards. New local test uploads accept and persist ALT in the Media Library, and existing library selections allow reviewing/editing ALT before selection. **There is no new blog-table featured ALT column**, and external, non-library image URLs cannot persist featured ALT. Article draft Save stores only the image URL; saving ALT is independent.
- **Schema**: Automatic **existing** blog type `BlogPosting`, read-only structural issues and partial JSON-LD draft illustration. Existing server is still the **sole publisher** of BlogPosting, Organization, WebSite, verified reviewer and approved supplemental schema; preview is never injected into public pages. No new schema overrides, no invented doctor information.
- **Reviewer**: Existing verified clinical reviewer name, credentials, bio, first-party profile URL, review date, and supplemental JSON-LD fields are moved (not copied) into an explicitly named tab. The original data bindings and persistence stay unchanged. Attribution remains optional, must be manually verified, and is never auto-added to other articles.
- **Advanced**: Clear status/explanations for robots noindex/nofollow, robots.txt, redirects, sitemaps and canonical ownership. These are **not editable** in the blog editor until storage, safety rules and public output are separately approved.

## Remaining blockers before FULL parity / production
1. Separate X-specific title/description require approved new columns/API (existing `blog_posts` has no such columns); do not silently mix with Open Graph or legacy meta keywords.
2. Noindex, nofollow or robots Disallow require explicit storage and public rendering/robots integration; never change existing indexing as a side effect.
3. Test-only `CmsMediaPicker` uses `cms.uploadTestImage` to local isolated storage. This is **not a production uploader**; it must be replaced/authorized through the existing production Media Library before deployment.
4. Editorial schema preview remains informational, not a public schema editing control, because public BlogPosting/reviewer schemas are already server-owned.
5. All historical blog metadata must remain byte-equivalent before/after release, including the one existing reviewer article. Follow `docs/production-release-gate-existing-blogs.md`; verify production backups/read-only snapshots and staging behavior, not only unit tests.
6. Save Draft currently can change an article in Published status to Draft. Use disposable test drafts, and separately review this behavior before shipping an editorial overhaul.

## Isolated verification
```bash
cd /workspaces/testing-1 && pnpm check && pnpm exec vitest run server/blogSeoWorkspace.test.ts shared/blogSeoAdapter.test.ts shared/blogSchemaDraftPreview.test.ts shared/blogMetadataPreservation.test.ts
```

For Featured Image ALT, upload a disposable image with ALT, confirm the value in Media Library and the Featured Image tab, edit its ALT and verify it survives editor reopen. Select an existing image, check the ALT is prefilled, and verify changing it updates only permitted test drafts, never published content.

Then view a **disposable test draft** in Blog Management and verify all seven tabs. Confirm Reviewer is visible, its six original fields edit/save/reopen without drift and never automatically populate other articles; check OG and Featured Image remain separate, schema preview is informational, and Tag chips are unchanged. Never save an existing published article as a draft.

## Phase 9 final fixes (test branch only)

- Blog readability: all individual flagged passages now show **Find in article** even when the four-check editorial score passes. Flesch reading ease and SEO word counts are separate measurements, clearly explained.
- Blog image scoring: missing on-page images are a four-point **DentaSmart editorial** recommendation; secondary phrases stay optional, OG/Featured artwork stays separate, and existing Hub scoring remains unchanged.
- Privacy regression: numeric blog-ID API access requires authenticated admin, and public slug lookups return published articles only. Private draft previews remain permission-controlled and require saved, unchanged drafts.
- Live editor/browser acceptance, reviewer retention, and session-expiry UX still require hands-on Codespace testing; automated regression and build must pass before Phase 9 signoff.

- **Phase 9 navigation precision:** The Blog Editor now scrolls to the start of the actual selected TipTap passage after setting the text selection, offset below the sticky header. StoryBrand scrolls to its targeted field rather than the whole section. This is a transient viewport change; it does not save, edit or publish content.

- **Readability final QA:** Rich-text H2–H6 headings count for both structure scoring and per-passage warnings. The former false 624-word unheaded block warning is removed when the article has valid inner headings. Evidence retains full paragraphs and sentences for selection; the warning card shows only a short preview. Empty H2 headings navigate to actual heading text. The 100/100 score means four thresholds passed, not that all sentences are optimal.

- **Phase 9 SEO/readability parity (Blog Editor only):** The original Blog Editor now opts into the Readability panel's exact 25% long-sentence threshold (SEO still awards 4 points; average length is informative, not a second hidden requirement), and the same short/medium/long body-heading thresholds (SEO awards 2 points). Both use heading-excluded body text, and blank-body drafts earn no readability/structure points. CMS Hub analysis without this opt-in retains its existing scoring rules, weights and public behavior.

- **Phase 9 reviewer clearing fix:** The Blog Editor sends `null` when any of the six reviewer fields is cleared, so the persisted value is explicitly removed instead of silently omitted as `undefined`. Both create/update tRPC inputs accept nullable reviewer metadata; the pre-0017 legacy schema gate continues treating cleared newer fields as non-writes. No reviewer is automatically verified or published.

- **Phase 9 tab continuity:** The selected SEO/Readability/Social/Featured Image/Schema/Reviewer/Advanced workspace tab is stored as a non-sensitive, article-scoped session preference. Refreshes, including hard refreshes, restore that tab after authenticated article loading and scroll to the tab navigation below the sticky header. Switching to another article uses that article's own session choice; no article text or reviewer data is written to web storage.

## Advanced CMS unified-editor tab continuity (isolated testing only)

The existing `/admin/cms-preview?hub=...&slug=...` editor remembers the active main section (Content & Sections, Media, SEO Workspace, Organization & Review) and, when applicable, the nested SEO subtab (SEO, Readability, Schema, Social, Advanced). Choices are stored per hub/slug and per browser tab using sessionStorage; no draft content, user data, clinical review metadata or credentials are stored. After the private draft finishes loading on refresh, the UI restores the last tab and scrolls below the sticky header. Other page selections and existing test-only publishing safety remain unchanged.

- **Phase 9 private Blog Preview reviewer parity:** The admin-only `/admin/blog-draft-preview/:id` now renders the same validated reviewer byline/card and independent valid last-reviewed date as the public article component, using only saved draft fields. If saved reviewer fields are incomplete, it shows an editor-only explanation instead of claiming the draft was medically reviewed. The existing protected query, noindex header, publication state, and public reviewer-eligibility logic remain unchanged.
