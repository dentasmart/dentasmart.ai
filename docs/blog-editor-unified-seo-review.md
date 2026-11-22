# Blog Editor · Unified SEO & Editorial Review (testing branch)

**Scope:** `Arslan-denta/testing-1`, `feature/advanced-cms`. No changes to production, public indexing, or the separate 14-hub Advanced CMS.

## Unified editor
- One **SEO & Editorial Review** workspace appears below the article editor, using the previously empty full-width area.
- The original sidebar keeps only article operational settings: status, category, independent test-only tags, reading time and featured image.
- Original metadata fields remain **the only editable fields** for SEO title, meta description, canonical, meta keywords, social Open Graph data, URL slug and focus/secondary keyphrases.
- Existing blog reviewer name, credentials, bio, profile URL, review date and supplemental JSON-LD move without renaming their underlying state/database columns into the **Reviewer & attribution information** collapsible. The original verification requirement and public attribution rules are untouched.
- The SEO audit reads the same live metadata and editor content; it does not create duplicate reviewer records, meta fields, schema output or publication permissions.
- The live 100-point editorial analysis is full width beneath the inputs and groups feedback into six expandable areas: Keywords, Search metadata, Content structure, Links & sources, Image accessibility and Readability. Search/social previews appear beside the checklist on wide screens.
- Legacy meta keywords remain editable for compatibility but are not counted in the editorial SEO score.
- A shortcut in the sidebar links to the full-width workspace, and edits to previously untracked reviewer, slug, category, read-time and featured-image fields trigger the existing unsaved-change warning.

## Safety and known behavior
- **Blog Tags** continue to save/delete independently in the isolated test table. **SEO/reviewer fields** use the original Blog Editor's Save Draft action, and are not persisted until it succeeds.
- Clicking **Save Draft** on an article currently marked **Published** changes its status to Draft according to the existing behavior. When testing, use a disposable draft article, not a published sample.
- The SEO score does not establish clinical review, E-E-A-T, search ranking or publication readiness. Existing reviewer attribution and schema safety rules remain as before.
- No database migration, public page changes, redirects, robots directives, sitemap edits or production actions.

## Checks

```bash
cd /workspaces/testing-1 && pnpm check && pnpm exec vitest run server/blogSeoWorkspace.test.ts shared/blogSeoAdapter.test.ts shared/cmsSeoAnalysis.test.ts server/blogTags.test.ts shared/blogTags.test.ts
```

Manual: On a disposable test draft, confirm metadata fields appear only once, keyword changes affect the score immediately, six checklist groups expand/collapse, search/social previews update, reviewer fields remain pre-populated in their section, Save Draft persists them, and Tags still save/delete separately.
