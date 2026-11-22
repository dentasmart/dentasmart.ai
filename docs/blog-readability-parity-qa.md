# Blog Editor readability parity – testing-branch handoff

## Scope
- The existing Blog Editor and Advanced CMS reuse the same `ReadingPanel`, `getCmsReadingInsights`, `getCmsReadabilityScore`, `getCmsReadabilityEvidence`, targets and four check statuses.
- Blog Editor readability now connects **Edit section** back to the *active* content mode (Rich Text or StoryBrand). It does not switch authoring mode or copy/replace article content.
- Rich Text uses the existing TipTap read-only selection pathway (finding a quoted excerpt, focusing and selecting matching characters).
- StoryBrand targets one of five existing section editors, focuses the heading for empty sections or the body for text warnings and selects matching text where available.
- If evidence does not match an exact span (e.g. an empty section or truncated quote), the relevant field is still focused; no text is rewritten or saved.
- Existing read-only metadata, blog reviewer data, original content routes, public schema, publication and SEO scoring are untouched.

## Manual browser acceptance (isolated Codespace only)
1. Open a disposable **draft** Blog Editor article; never use Save Draft on an existing published blog.
2. In **Rich Text Editor**, enter an H2 with one real paragraph containing a 25+ word sentence. Open the Readability tab and verify the long-sentence warning, its cited excerpt and **Edit section**.
3. Click **Edit section**. Confirm the page scrolls to Rich Text Editor and selects the flagged words, without modifying HTML or changing draft/published status. Edit the sentence and verify the warning/score update.
4. Add a heading with no content; verify **Section structure** warns and the edit action goes to content instead of falsely declaring it populated.
5. On a different disposable draft, switch to **StoryBrand Sections**, enter a long sentence under the second section and use **Edit section**. Confirm it focuses the second section only.
6. Confirm empty new article says **Not evaluated**; after normal short readable text, shared checks pass and the score updates without counting inactive editor text.
7. Leave the editor open for 5–10 minutes, switch tabs and return. Ensure unsaved values remain. Save/reopen **only on disposable draft**, verify field persistence.
8. Compare the 4 check statuses, score, Flesch estimate and topic words in both editors for equivalent text. Render/interaction testing remains required before sign-off.

## Deliberate differences
- The Blog Editor retains existing blog storage, OG fields and server-owned BlogPosting schema; the 14-hub Advanced CMS has separate draft schemas and publishing policies.
- Readability is editorial guidance, not a Google rank, dental diagnosis, or clinical review.
- Test branch only; no production deployment or database migration.
