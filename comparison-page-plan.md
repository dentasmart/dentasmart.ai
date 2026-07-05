# DentaSmart vs ChatGPT Page Rebuild Plan

## Strategy
- Keep existing URL: `/compare/dentasmart-vs-chatgpt-dental`
- Completely rewrite `ComparePage.tsx` to be a dedicated, comprehensive page (not using the generic data-driven approach)
- Create a new dedicated component: `client/src/pages/DentaSmartVsChatGPT.tsx`
- Update App.tsx route to point to the new component
- Update metaTags.ts with better SEO title/description

## Key Images Available
- Oral Health Score: `/images/optimized/DawnQOxKtdjguhLp-800.webp`
- AI X-Ray Analysis: `/images/optimized/lBzNqmERojJqlfJE-800.webp`
- Quick Check X-Ray: `/manus-storage/quick-check-xray_0e827efc.png`
- Self Examination: `/manus-storage/self-examination_c897255b.png`
- Dual Report: `/manus-storage/dual-report-dentist_5dcf6f0b.png`
- Dr. Din Chat: `/images/optimized/YSjOjqlpUabDbzAW-800.webp`
- Cost Transparency: `/images/optimized/XlgHEMbZpBAbEXnM-800.webp`
- Progress Tracking: `/images/optimized/QmtzzNkXnZNbJvtj-800.webp`
- Risk Assessment: `/images/optimized/OmKqTEPOiEaBSwig-800.webp`
- Reminders: `/images/optimized/XZusOpUDOktZBHbT-800.webp`

## Components to Use
- Navigation, Footer, SEO, FAQSchema, QuickAnswerBlock, ExternalSources, MidContentCTA
- motion from framer-motion
- Button from @/components/ui/button
- Link from wouter
- trackEvent, getAppStoreUrl, getPlayStoreUrl, trackAppDownload from @/lib/analytics
- Icons from lucide-react

## Homepage Link Location
- Add a link in the FAQ section answer for "How is DentaSmart different from ChatGPT?" 
- Also add a subtle comparison link banner between sections (after Solution section or after Dr. Din section)

## Brand Rules
- Do NOT use "AI guide" or "Din AI guide"
- Use "Dr. Din, your 24/7 Personal AI Dentist"
- Use "Your Personal AI Dentist in Your Pocket"
- Do NOT use "educational insights"
- Do NOT overuse "go to a licensed dentist" language
- ChatGPT CAN accept images and HAS memory - don't say otherwise
- Focus on purpose-built vs general-purpose distinction
- No em dashes
- Humanized writing, no AI jargon
