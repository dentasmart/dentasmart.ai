# Phase 9 · Existing Blog Editor: Advanced SEO audit (testing slice 1)

**Repository:** `Arslan-denta/testing-1`, branch `feature/advanced-cms`.

The original Blog Management editor and category system remain authoritative. The 14 non-blog CMS hubs stay in Advanced CMS. The public website is unchanged until an approved release.

## What this slice adds

- Primary focus keyphrase and comma-separated secondary keyphrases in the existing Blog Editor SEO Settings.
- Both values persist via existing `blog_posts.primaryKeyword` and `blog_posts.secondaryKeywords` columns when **Save Draft** is selected; no new schema, migration or duplicate Blog Editor.
- Live 100-point **editorial** SEO audit using existing shared Advanced CMS SEO analysis: title, meta description, primary keyword in intro/headings/body, length heuristics, approximate readability, internal/external links and embedded-image alt text.
- Search snippet and social preview, where custom OG image takes precedence and Featured Image is the only fallback (never the hero image).
- Analysis reads only the active editor mode, avoiding double-counting an older generated WYSIWYG copy while editing StoryBrand sections.
- Existing meta fields warn about unsaved changes rather than silently losing edits on navigation.

## Constraints

- The score is not a Google score, ranking prediction, readability certification or clinical approval.
- Preview is illustrative; the search engine may rewrite snippets.
- A featured/OG image is metadata; it does not inflate on-page image alt counts.
- This slice does **not** change public Article/BlogPosting schema ownership, sitemap, canonical handling, indexing, robots directives or redirects.
- Advanced SEO Noindex/Nofollow preferences and Phase 10 publishing/sitemap/redirect behavior need a separate storage and publication review; do not silently repurpose the existing metadata fields.
- No production database/production website changes. Test-only branch.

## Validation before browser QA

```bash
cd /workspaces/testing-1 && pnpm check && pnpm exec vitest run shared/blogSeoAdapter.test.ts shared/cmsSeoAnalysis.test.ts
```

Manual: Open `/admin/edit/1` in Codespaces and expand SEO Settings. Change focus keyphrase, content mode and meta fields: live score, checks and previews should update without reload. **Save Draft**, refresh, and verify primary/secondary keyphrases persist in the editor. Do not publish as part of this check.
