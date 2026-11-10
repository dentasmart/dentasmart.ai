# Blog Editor reliability and conditional SEO feedback — test branch

Scope: `Arslan-denta/testing-1` / `feature/advanced-cms`. **No changes to dentasmart.ai production, production DB, media, published metadata or reviewer rows.**

## User-reported symptoms
1. SEO checks show confusing length or keyword feedback when focus keyphrase, meta title or meta description is empty.
2. After leaving the editor open for about 4–5 minutes, title/SEO fields sometimes appear blank. On the live website, the user has also observed that refreshing shows the previous stored values. This does **not** establish the production root cause; test the actual browser session before claiming that symptom is fully resolved.

## Implemented safeguards
- Original Blog Editor SEO checklist: absent primary keyphrase reads "No primary keyphrase entered"; dependent checks show "Not evaluated" rather than failing for a field not supplied. Missing meta title or description shows "Please enter…" rather than `0 characters`. Once populated, actual character counts and phrase feedback appear. Optional absent secondary keyphrases explicitly say optional / not evaluated without changing the SEO engine score.
- Presentation-only adapter `formatBlogSeoChecks` leaves the main Advanced CMS SEO engine unchanged; neither metadata DB values nor scoring weights change.
- The edit-form hydration guard is keyed by article ID and permits initial data population only once per ID. Subsequent refetches cannot overwrite user-entered fields or silently clear the unsaved-change flag.
- Edit query disallows background focus/reconnect refetches. After a successful Save, it invalidates the current server record so the next opening sees current saved data; the hydration guard protects the in-progress form.
- Admin identity is reverified when opening the editor, but stays stable during idle editing. A later authentication failure shows a clear session-verification message with retry rather than silently rendering a blank page; access remains blocked while not verified.
- TipTap programmatic `setContent` does not emit an editor user-change event, avoiding accidental parent-state edits while hydrating existing HTML.
- The existing page-unload warning still applies. These safeguards do **not** promise recovery of unsaved work if the browser crashes, a tab is forcibly closed, or the Codespace restarts; a separate secure draft recovery workflow should be designed if that is required.

## Automated validation
```bash
cd /workspaces/testing-1 && pnpm check && pnpm exec vitest run shared/blogSeoFeedback.test.ts shared/blogEditorHydration.test.ts server/blogSeoWorkspace.test.ts shared/blogSeoAdapter.test.ts shared/cmsSeoAnalysis.test.ts
```
Manual test:
1. Open disposable new test draft. Leave SEO keyphrase, meta title, and description empty. Confirm descriptive prompts and "Not evaluated" rather than `0 characters` in the checklist.
2. Enter all three; check lengths and pass/fail results. Clear them again and verify prompts return without inconsistent credit.
3. Use a **disposable saved draft** to test persistence, never an existing published post. Fill the article title, keywords, description, OG image and featured image; Save Draft; reopen, check all values.
4. With editor open, edit one field but **do not save**. Leave tab idle for **at least 10 minutes**, return without refresh; ensure unsaved changes remain. Do not close the tab before saving.
5. Save the disposable draft and reopen from Blog Management; verify saved values reappear without needing a manual refresh. Test rich-text editing too.
6. If the session expires, verify a clear reauthentication notice appears and retry after signing in; no blank page and no unauthorized mutation.
7. Check reviewer metadata on the preexisting sample (read-only) remains populated and untouched. No production edits.

Passing static/unit tests alone **does not prove** the live website symptom is eliminated. Production deployment remains gated by `docs/production-release-gate-existing-blogs.md` and its before/after metadata/reviewer checks.
