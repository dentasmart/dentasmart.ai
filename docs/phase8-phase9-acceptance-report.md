# Phase 8/9 Codespace browser acceptance

Source branch: feature/advanced-cms
Isolated server: 127.0.0.1:3137 (temporary)
Database: dentasmart_vitest (localhost:3307; explicit override)
Execution: 2026-10-29T10:55:30.741Z

| Test | Area | Verdict | Detail |
|---|---|---|---|
| SAFE-01 | Environment | PASS | Disposable database ve ified: 29 tables, 8 catego ies, 1 a ticle. |
| SAFE-02 | Environment | PASS | Sepa ate applicatio  sta ted o  ve ified po t 3137 usi g disposable DB ove  ide. |
| SEC-01 | Security | PASS | U authe ticated saved-blog p eview API  efused. |
| SEC-02 | Security | PASS | U authe ticated edito   edi ected to admi  logi . |
| PRIVACY-01 | Privacy | PASS | P ivacy co se t ha dled th ough UI; optio al t acki g  ejected. |
| AUTH-01 | Security | PASS | Disposable test admi  logged i  th ough actual b owse  fo m. |
| BLOG-01 | Blog Editor | PASS | New A ticle edito  a d saved-o ly p eview gua d  e de ed. |
| BLOG-02 | Blog Editor | PASS | All seve  SEO wo kspace tabs activated. |
| BLOG-03 | SEO | PASS | Missi g keyph ase/title/desc iptio  feedback visible. |
| BLOG-04 | Blog Editor | PASS | D aft 22 c eated; pe sisted SEO metadata a d D aft status ve ified. |
| BLOG-05 | Blog Editor | PASS | Saved title a d SEO fields pe sisted ac oss ha d  ef esh. |
| BLOG-06 | SEO | PASS | SEO tab switchi g a d  ef esh completed. |
| BLOG-07 | Security | PASS | Saved d aft  ot available th ough public slug e dpoi t. |
| BLOG-08 | Preview | PASS | Authe ticated saved p eview ope s; all  obots tags specify  oi dex. |
| BLOG-09 | Durability | PASS | Di ty-state gua d disables stale saved p eview. |
| BLOG-10 | Durability | PASS | U saved Back  avigatio   equi es co fi matio . |
| BLOG-11 | Durability | PASS | Rich text su vived Sto yB a d/Rich Text mode switches. |
| CMS-01 | Phase 8 CMS | PASS | CMS wo kspace ope s u de  admi  sessio . |
| CMS-02 | Phase 8 CMS | PASS | All fou  Adva ced CMS edito  sectio s activated  ead-o ly. |
| CMS-03 | Phase 8 CMS | PASS | Toothache test publicatio   emai s fail-closed o  disposable database. |
| CMS-04 | Phase 8 CMS | BLOCKED | CMS save/ evisio / esto e a d media uploads  equi e the exact de tasma t_test publicatio  gate; delibe ately NOT attempted agai st sha ed QA DB. |
| CMS-05 | Phase 8 CMS | BLOCKED | Toothache publish/u publish  ot attempted: p otected pilot a d  o sepa ate publicatio  autho izatio . |
| BLOG-12 | Publishing | BLOCKED | A published Save Cha ges lifecycle  equi es explicit isolated publicatio  eligibility a d complete gove  ed co te t;  ot exe cised by this safe d aft-o ly smoke suite. |
| BLOG-13 | Durability | PASS | U saved title a d  ich text  etai ed afte  10 mi utes of  eal b owse  i activity. |
| BLOG-14 | Durability | PASS | Ref esh  esto ed saved title,  ot disca ded u saved edits. |
| CLEAN-01 | Preservation | PASS | Deleted o ly disposable QA blog 22 |
| CLEAN-02 | Preservation | PASS | Disposable QA admi  clea up: 1 |
| SAFE-03 | Preservation | PASS | O igi al disposable blog  eco ds u cha ged. |

Total: PASS 25, FAIL 0, BLOCKED 3

Phase 8 / 9 signoff is NOT granted by this script alone. Some interactive workflows
require additional acceptance evidence, and the CMS draft-write gate intentionally
blocks using dentasmart_vitest. Publishing to production was never attempted.

## Phase 8/9 follow-up acceptance — 2026-10-30

This section supersedes the original blocked verdicts below.
The original 2026-10-29 acceptance results are preserved
as historical execution evidence.

| Test | Updated status | Evidence |
|---|---|---|
| CMS-04 | PASS | Isolated API and browser tests verified draft creation, saving, revisions, restoration, media uploads, refresh persistence, private preview and deletion. Disposable database baseline restored. |
| BLOG-12 | PASS | Published Save Changes tested using a temporary article. Cancel prevented changes; confirmation updated content while preserving published status and publication date. Public API and browser refresh verified. Separate cleanup verification confirmed no temporary records remained. |
| CMS-05 | DEFERRED | General Advanced CMS publishing is outside the current draft-only acceptance scope. Existing Toothache publication was not modified. |

### Updated acceptance summary

- Original acceptance checks passed: 25
- Additional functional checks passed: 2
- Total verified: 27
- Outstanding functional failures: 0
- Deferred: 1 (CMS-05)

### Safety and preservation

- All new acceptance testing used dentasmart_vitest.
- Existing dentasmart_test data was not modified by these tests.
- The original published blog record in the disposable database was preserved.
- Temporary testing records were removed and cleanup verified.
- No production deployment, migration, or publication was performed.

### Scope decision

Draft-only functional acceptance is complete.

CMS-05 publication/unpublication testing is deferred until
a separately approved migration and publishing rollout.

This is not approval for production deployment or a database migration.
Those require their own safeguards and verification.
