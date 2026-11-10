# Advanced CMS — SEO Suite (isolated test branch)

**Scope:** `Arslan-denta/testing-1`, branch `feature/advanced-cms`. No production release or production database modifications are authorized by this module.

## Included

- Real-time editorial SEO scoring (100 fixed points, transparent per-check weights) for CMS drafts.
- Single focus keyphrase; optional add/remove secondary keyphrases with measured occurrences.
- H1, SEO title, description, URL, opening text, section heading, body phrase frequency and general content-depth guidance.
- Non-prescriptive keyword frequency guidance (occurrences per 100 body words), no claims about Google requirements.
- Approximate readability: average sentence length and paragraphs longer than 75 words.
- Existing internal/external links counted (relative and DentaSmart absolute URLs; repeated URL formats normalized).
- Optional related **existing Condition** page suggestions based on title/topic overlap; no automatic insertion and no claim of link validity.
- Image alt-text checks across editor image slots, dedicated image blocks, and `<img>` tags embedded in rich-text sections. If no images are present, the audit explains that nothing needs alt text.
- By default, the dashboard shows **every** check with green pass ticks, red needs-attention crosses, and neutral informational markers; a Needs Work filter remains optional.
- Link & Image Checks appear directly under the link/media statistics and update immediately from unsaved editor changes. Zero external sources trigger an **unscored editorial advisory**, not a fabricated Google ranking penalty.
- Metadata inputs: SEO title, description, optional canonical override, OG/social title and description; preview for mobile, desktop and social.
- No new database migration: SEO fields already belong to the `CmsDocument` JSON and are saved/restored by existing private draft and revision APIs.
- The test-published Toothache page uses optional OG/social overrides in client and server metadata. It remains `noindex` with no canonical to the live site.

## Score rubric (100 total)

| Signal | Points |
| --- | ---: |
| Primary focus configured | 8 |
| Primary phrase in H1 | 7 |
| SEO title length | 8 |
| Primary phrase in SEO title | 6 |
| Meta description length | 8 |
| Primary phrase in description | 5 |
| Primary phrase in slug | 5 |
| Primary phrase near start | 6 |
| Primary phrase in section heading | 5 |
| Primary phrase in body | 5 |
| Frequency heuristic | 5 |
| Useful content depth | 8 |
| Internal links | 6 |
| Organized headings | 2 |
| Image alt text | 4 |
| Sentence readability | 4 |
| Paragraph readability | 4 |
| Secondary keyphrases | 4 |
| **Total** | **100** |

Search engines choose their own snippets and rankings. 30–60 title characters, 110–160 description characters, content depth, frequency and readability thresholds are editorial guidelines, **not** Google ranking signals or compliance tests.

## Safety and known limits

- The SEO score never bypasses clinical review, authorization, validation, publishing gates or `noindex`.
- The score is editorial and not a guarantee of rankings, crawling/indexing, E-E-A-T, medically accurate content or accessibility.
- Content extraction is approximate. Rich HTML is parsed for analysis, never trusted as safe markup; public pages continue their existing sanitization.
- This module does not crawl live URLs or measure broken links, backlinks, traffic, Core Web Vitals or schema validity. Those belong to the later Technical SEO module.
- Canonical overrides are warnings in the dashboard. Actual test-page canonical tags remain suppressed.
- Candidate internal links are **suggestions only**, not evidence of relevance or public availability.
- The standalone display URL is illustrative; the isolated test page cannot be indexed.

## Verification

In the Codespaces terminal after `git pull --ff-only`:

```bash
corepack pnpm check
corepack pnpm exec vitest run shared/cmsSeoAnalysis.test.ts shared/cmsBlocks.test.ts server/cmsTestPublication.test.ts
corepack pnpm build
```

After the build, restart the testing server (`corepack pnpm start`), open `/admin/cms-preview` and select **Advanced SEO Suite**. Change the focus phrase, title and description; confirm live scores, previews and unsaved status. Save, restore a revision, and verify changes persist. Test publishing is limited to Toothache and should be separately verified; the production site must not change.
