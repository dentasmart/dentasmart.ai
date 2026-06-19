# AEO Upgrade Targets (Existing Ranking Posts)

These posts already rank on Google (page 4-8) and need the 2.1 AI-extraction template applied:

| ID | Slug | Title | Ranking |
|---|---|---|---|
| 330007 | bone-loss-dental-xray | What Bone Loss on a Dental X-Ray Really Means | #63 |
| 1260001 | dentist-cost-without-insurance | How Much Does a Dentist Visit Cost Without Insurance? A 2026 Guide | #35 |
| 330008 | gums-hurt-when-flossing | Why Do My Gums Hurt When I Floss? | #77 |
| 2910001 | filling-without-insurance-options | My Dentist Says I Need a Filling, But I Don't Have Insurance. What Are My Options? | #68 |
| 1170003 | how-to-remove-plaque-at-home | How Can You Remove Plaque at Home - And Are You Doing It the Right Way? | #76 |

Note: 3270001 (filling-without-insurance-options-1) is a duplicate - skip it.

## AEO 2.1 Template to Prepend

Each post needs these elements PREPENDED to the existing bodyHtml:

1. **Direct Answer Block** (2-4 sentences, plain English, answering the title question)
2. **Cited Statistic** (with source link to ADA, NIH, Cleveland Clinic, etc.)
3. Keep existing content (already has scannable structure)
4. **"When to See a Dentist" block** (APPEND at end if not already present)
5. **FAQ section** (3-5 Q&As - APPEND at end)
6. **DentaSmart CTA** (APPEND at end)

The FAQ JSON-LD schema is handled by the blog rendering system (faqs field in the blog_posts table).
