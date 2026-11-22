# Blog and Advanced CMS — Preview Draft (isolated test branch)

Scope: Arslan-denta/testing-1, feature/advanced-cms. No production deployment, database/storage migration, changes to public routes, sitemap, schema or reviewer/SEO metadata.

## Workflow

1. Open Blog Management > New Article, enter editorial content, SEO fields and details.
2. Save Draft first. The creation succeeds and navigates to `/admin/edit/:id`.
3. Preview Draft becomes available only for a saved article with no unsaved form or tag changes and no save in progress. The button opens a new tab at `/admin/blog-draft-preview/:id`.
4. The preview fetches the **saved** blog post through `blog.getPreviewById`, which is `adminBlogProcedure`-protected. It is read-only, marked noindex/nofollow in the browser, does not call mutations or emit public Article JSON-LD, and has an Edit this draft link.
5. Return to the still-open editor tab to modify content, Save Draft and open a fresh preview. Publish remains a separate manual action.
6. A currently published blog may view its saved record via Preview Saved; saving it as a draft is **not** part of this workflow.

The private blog preview approximates the public title/category/reading-time/body styling, without public marketing CTA/widgets; reviewer credentials remain governed by the existing public policy. It is not a pixel-perfect public-site render.

## Advanced CMS

The private saved-revision preview already existed at `/admin/cms-draft-preview?hub=...&slug=...`; it uses the protected `cms.getDraft` query and requires a saved revision. Buttons in the editor and content list have consistent `Preview Draft` labels. The editor prevents preview when the current page is dirty; no public CMS publication occurs.

## Testing checklist

- New blog: Preview Draft disabled. Save Draft, return to editor, Preview Draft enabled. Opens new private tab.
- Change title, SEO or body without saving: Preview Draft disabled. Save, then open preview and verify the saved content appears.
- Preview screen: editor-return action works; no publish button; no schema, sitemap, canonical or public blog URL created.
- Log out: accessing the new blog preview must not show its saved content.
- Existing published blog: Preview Saved is read-only; avoid Save Draft because publication-status changes require separate approval.
- Advanced CMS: save an isolated draft, preview, edit, save again, preview new revision. Unsubmitted/dirty pages cannot preview.
- Run `pnpm check` and `pnpm exec vitest run shared/blogPreviewPolicy.test.ts server/blogDraftPreview.test.ts server/blogSeoWorkspace.test.ts shared/cmsUnifiedWorkspace.test.ts`.
- Browser QA is mandatory before completion; unit/static tests alone cannot certify visual parity or auth integration.
