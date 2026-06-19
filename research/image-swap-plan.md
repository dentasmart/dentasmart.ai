# Image Swap Plan — Homepage & Features Page

## Homepage Hero (two iPhone mockups)

### Current:
- Left phone: `JQpBfeUURrCKTqFU` — Oral Health Score showing 60/100 (single dot, old UI)
- Right phone: `kQkbFcHfULXNLoOD` — AI Analysis report

### Swap to:
- Left phone: `DawnQOxKtdjguhLp` — Oral Health Score showing 83/100 (multiple data points, trend line, tooth findings below — much richer UI, shows progress over time)
  - Dimensions: 800x1734 (taller than 9:19.5 ratio, but object-cover object-top will handle it)
  - Label: "Oral Health Score"
- Right phone: `lBzNqmERojJqlfJE` — X-ray analysis with color-coded overlay and findings
  - This is the strongest "instant value" screenshot — shows the AI actually working
  - Label: "AI X-Ray Analysis"

### Rationale:
- DawnQOxKtdjguhLp shows a HIGHER score (83 vs 60) which is more aspirational/positive
- It shows a TREND LINE with multiple data points — communicates "track over time"
- It shows tooth-level findings below the chart — more feature-rich
- lBzNqmERojJqlfJE shows actual X-ray analysis — the core product value prop
- Together they tell the story: "scan → score → track"

## BenefitsCarousel (6 cards)

### Current images:
1. `kqbtmhnnWjXBFwxN` — generic dental/abstract
2. `vWIVfyPBobntLGIz` — generic dental/abstract
3. `qxBXHmKeIMzYHljf` — generic dental/abstract
4. `vMkUwiRFfsZCpBey` — generic dental/abstract
5. `aCHSoYIkHQxoISFY` — woman in dental clinic with phone (blurry face)
6. `anhNbpYEsjYAENrG` — tooth on coins still life

### Swap to:
1. Oral Health Score → `DawnQOxKtdjguhLp` (score + trend)
2. Photo & X-Ray Analysis → `lBzNqmERojJqlfJE` (X-ray with overlays)
3. Second Opinion → `XlgHEMbZpBAbEXnM` (treatment plan with costs)
4. Prevention Plan → `ChlTSVZDNZEOfine` (personalized recommendations)
5. Track Changes → `QmtzzNkXnZNbJvtj` (health timeline)
6. AI Guide → `YSjOjqlpUabDbzAW` (Din AI chat)

## Features Page

### Current images:
Features 1-3 use `/manus-storage/` paths (these resolve via CDN redirect — they work)
Features 4-10 use local `/images/optimized/` paths

### Changes:
- Feature 4 (X-Rays): Keep `ZDzeChpbpgMeHJVN` — good
- Feature 5 (Mouth Image): Keep `AfieCruvYKKqBoIa` — good
- Feature 6 (Personalized): Keep `ChlTSVZDNZEOfine` — good
- Feature 7 (Timeline): Keep `QmtzzNkXnZNbJvtj` — good
- Feature 8 (Risk): Keep `OmKqTEPOiEaBSwig` — good
- Feature 9 (Score): Swap from `DawnQOxKtdjguhLp` — KEEP (already good)
- Feature 10 (Din): Keep `YSjOjqlpUabDbzAW` — good

### Additional features to add:
- "Smart Reminders" — use `XZusOpUDOktZBHbT` (Apple Watch "Time for a quick scan!")
- "Cost Transparency" — use `XlgHEMbZpBAbEXnM` (treatment plan with cost breakdown)

## Summary of changes:
1. Homepage hero: swap both phone screenshots to newer, richer versions
2. BenefitsCarousel: swap all 6 images to actual product screenshots
3. Features page: add 2 new features (Smart Reminders, Cost Transparency)
