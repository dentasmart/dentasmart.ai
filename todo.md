# Oura-Inspired Redesign Todo List

## Phase 25: Design System & Assets
- [ ] Update `client/src/index.css` with "Stone" color palette (warm grays, creams) and refined typography.
- [ ] Generate premium background images for:
    - [ ] Home Hero (Lifestyle, confidence)
    - [ ] How It Works (Simplicity, phone interaction)
    - [ ] Features (Abstract/Macro tech + nature)
    - [ ] Pricing (Peace of mind, calm)
    - [ ] Employers (Modern workplace)
    - [ ] Team (Collaboration)
    - [ ] FAQs (Clarity)

## Phase 26: Navigation & Mobile Menu
- [ ] Redesign `Navigation.tsx` to be transparent/blur on scroll.
- [ ] Build a premium full-screen mobile menu with smooth animations (Framer Motion).
- [ ] Ensure "Download App" CTA is prominent but elegant.

## Phase 27: Home Page Redesign
- [ ] Hero Section: Full-screen lifestyle image, centered or split layout, elegant typography.
- [ ] "Problem" Section: Editorial layout with large typography.
- [ ] "Solution" Section: Minimalist feature grid with stone backgrounds.
- [ ] Testimonials: Clean, high-trust layout.
- [ ] CTA: Large, inviting, "stone" colored buttons.

## Phase 28: Inner Pages
- [ ] **How It Works:** Visual timeline, less text, more breathing room.
- [ ] **Features:** Large product shots (mockups) mixed with lifestyle imagery.
- [ ] **Pricing:** Elegant cards, clear hierarchy, "stone" borders.

## Phase 29: Support Pages
- [ ] **Employers:** Professional yet human-centric B2B layout.
- [ ] **Team:** Clean grid with hover effects.
- [ ] **FAQs:** Minimalist accordion with smooth expansion.

## Phase 30: Mobile Polish
- [ ] Verify touch targets.
- [ ] Check font sizes on small screens.
- [ ] Ensure no horizontal scroll.

## Phase 31: Add Video Section
- [ ] Add "See DentaSmart in Action" video section to Home.tsx below hero
  - [ ] Embed YouTube video: https://www.youtube.com/watch?v=Y1aoiv81rZo
  - [ ] Use StoryBrand copy (Problem -> Solution -> Success)
  - [ ] Ensure SEO optimization (H2, descriptive text)
  - [ ] Match Oura-inspired aesthetic (padding, rounded corners, shadow)

## Phase 33: Update Footer
- [ ] Move new logo to `client/public/images/logo.png`
- [ ] Update `Footer.tsx`:
  - [ ] Add StoryBrand overview (Guide/Plan/Success)
  - [ ] Use new logo image
  - [ ] Fix visual separation (remove/adjust border or spacing between sections)
  - [ ] Ensure "Your Personal AI Dental Companion" tagline is prominent

## Phase 35: Brand Alignment
- [ ] Analyze `DentaSmartBrandguideline.pdf` to extract:
  - [ ] Primary and secondary color codes (Hex/RGB)
  - [ ] Typography rules (Fonts, weights, hierarchy)
  - [ ] Logo usage and spacing rules
- [ ] Update `client/src/index.css` with exact brand colors (replace "Stone" palette where necessary, or blend it).
- [ ] Update `tailwind.config.js` (if applicable) or CSS variables to reflect new palette.

## Phase 36: Home & Nav Updates
- [ ] Update `Navigation.tsx` to use brand colors (e.g., Teal accents instead of just monochrome).
- [ ] Update `Home.tsx`:
  - [ ] Hero buttons and text accents.
  - [ ] Section backgrounds (ensure they aren't just generic gray/stone).
  - [ ] Icon colors and highlights.

## Phase 37: Inner Pages & Footer
- [ ] Update `Footer.tsx` background and text colors to match brand guidelines.
- [ ] Review and update all inner pages (`HowItWorks`, `Features`, `Pricing`, `Employers`, `Team`, `FAQs`) to ensure brand consistency.

## Phase 39: Revamp Footer
- [ ] Change footer background to light blue (brand tint)
- [ ] Update footer text color to dark gray for contrast
- [ ] Ensure logo visibility on light background
- [ ] Fix visual separation between content and footer

## Phase 40: Refine Home Page
- [ ] Replace "Stone" backgrounds with clean white/teal gradients
- [ ] Update section transitions for a medical-tech feel
- [ ] Ensure typography remains "Poppins" but fits the new theme

## Phase 43: Reduce Whitespace & Fix Home Hero
- [ ] Reduce vertical padding (py-*) across all Home page sections
- [ ] Add light blueish tint overlay to Home hero image
- [ ] Ensure hero text has high contrast against new background
- [ ] Tighten spacing between headings and content

## Phase 44: Fix Footer
- [ ] Verify Footer component reusability and consistency
- [ ] Ensure footer background and text colors are correct (light blue/dark text)
- [ ] Check footer spacing and layout

## Phase 45: Inner Pages Fixes
- [ ] Apply light blueish hero tint to all inner pages
- [ ] Reduce whitespace on How It Works, Features, Pricing, etc.
- [ ] Ensure text visibility on all headers

## Phase 47: Revert Footer & Fix Spacing
- [ ] Revert Footer to dark background (bg-foreground)
- [ ] Update copyright year to 2026
- [ ] Drastically reduce vertical padding (py-*) on Home page sections
- [ ] Remove excessive whitespace between "Real Scenarios" and "Pricing"
- [ ] Tighten spacing on inner pages (HowItWorks, Features, etc.)

## Phase 51: Fix Large Gap & Redesign Pre-Footer
- [ ] Remove excessive padding/margin between carousel and "Your Personal AI Dental Companion" section on Home page
- [ ] Redesign "Ready to take control?" section to use dark theme matching the footer
- [ ] Ensure Footer component is correctly using the dark design

## Phase 54: Revert Footer to Light Blue & Fix Pre-Footer
- [ ] Revert Footer to light blue background with dark text
- [ ] Ensure logo is full-color (remove brightness-0 invert)
- [ ] Remove excessive padding/margin between carousel and "Your Personal AI Dental Companion" section on Home page
- [ ] Redesign "Ready to take control?" section to match the light blue footer theme

# Feedback Action Items (Jan 15)

## Content Updates
- [ ] Change all mentions of "Dr. Din" to "Din" across the website.

## Homepage Design Improvements
- [ ] Reduce negative space around the hero content.
- [ ] Left-align all content around the mockup (already done, but verify).
- [ ] Resize all images to ensure they do not overpower the text.

## Typography and Headings
- [ ] Ensure all headings render clearly and consistently (check font size, weight, spacing).

## Navigation Bar
- [ ] Improve background color/texture of the navigation bar.

## Technical Recommendations
- [ ] Remove ".php" from URLs (This is a React SPA, so there shouldn't be .php extensions, but I will verify links).

# Regulatory Compliance Updates (Jan 15)

## Content Updates
- [ ] Replace "Dr. Din" with "AI Chatbot Din" (or similar StoryBrand-aligned term) across the entire website to avoid regulatory issues.
- [ ] Ensure the new description emphasizes "highly trained in dentistry" and "personal oral health context" without implying a human doctor.

# Blog Management Tool (Oral Health Hub)

- [x] Create blog database schema (posts, categories, SEO fields)
- [x] Create admin authentication (admin/DentaSmart2026)
- [x] Build blog management dashboard with search and filtering
- [x] Implement WYSIWYG editor with brand color highlighting
- [x] Add SEO fields configuration (title, description, meta, keywords)
- [x] Implement save, draft, publish, unpublish functionality
- [x] Add URL slug creation and editing
- [x] Migrate existing static blogs to database
- [x] Categorize blogs under Dentist Problems, Dental Problems, Insurance Problems
- [x] Connect public blog pages to database
- [x] Brand color for all internal/external links
- [x] Create New Blog section with enhanced WYSIWYG editor

# Blog Management System - Implementation Tracking

- [x] Database schema for blog posts with SEO fields, categories, and status
- [x] Admin authentication system (login: admin / DentaSmart2026)
- [x] Blog CRUD API routes (create, read, update, delete)
- [x] Admin dashboard with blog list, search, and category filters
- [x] WYSIWYG editor with brand color highlighting
- [x] Blog status management (Draft, Published, Unpublished)
- [x] URL slug creation and editing
- [x] Comprehensive SEO fields (title, description, meta tags, keywords)
- [x] Migrate 30 existing static blog articles to database
- [x] Connect public blog pages to load from database dynamically
- [x] Write vitest tests for blog API routes
- [x] Admin login page with DentaSmart branding

# Fixes - Feb 11, 2026

- [x] Change /hub URL to /oral-health-hub for better SEO
- [x] Show existing blog content in Rich Text Editor (not just StoryBrand sections)
- [x] Add published dates to all blogs, backdate existing ones starting December 2025

# Fixes - Feb 11, 2026 (Round 2)

- [x] Make WYSIWYG editor styling match public blog page exactly (typography, spacing, blockquotes, headings, paragraphs)

# Fixes - Feb 11, 2026 (Round 3)

- [x] Add blockquote button to WYSIWYG editor toolbar for StoryBrand callout style

# Fixes - Feb 11, 2026 (Round 4)

- [x] Remove status dropdown from editor - new articles always start as Draft
- [x] Control status through action buttons only (Save Draft, Publish, Unpublish)
- [x] Show current status as a read-only badge instead of dropdown

# Fixes - Feb 11, 2026 (Round 5)

- [x] Replace browser prompt() for image insert with proper upload modal (drag & drop + URL option)
- [x] Move error/validation messages to top of page as human-readable banners (not raw JSON in bottom-right)

# Fixes - Feb 16, 2026

- [x] Fix LinkedIn URLs on Team page for all team members (Qasim, Kashif, Dr. Saba, Pete, Ty)

# Fixes - Feb 18, 2026

- [x] Replace hero section generic model photo with split visual: iPhone mockup (Oral Health Score) + iPhone mockup (AI Analysis report)
- [x] Upload user-provided app screenshots to S3 and use them inside CSS iPhone frames

- [x] Replace How It Works hero section generic photo with iPhone mockups: X-Ray Analysis (left) + Initial Care (right)

- [x] Replace Oral Health Score image on Features page ("A simple score for total clarity" section) with new updated screenshot
- [x] Wrap Oral Health Score image on Features page in iPhone mockup frame (matching Home/How It Works style)

# Hero Section Fixes - Feb 18, 2026

- [x] Fix How It Works hero section layout on laptop (text cut off at top, phones too large)
- [x] Fix FAQs hero section — add relevant StoryBrand-aligned image (right side is empty)
- [x] Fix Features hero section — replace irrelevant beach image with dental/health relevant image
- [x] Fix Pricing hero section — replace with more relevant, user-attracting image

# Uniform Hero Sections - Feb 18, 2026

- [x] Standardize ALL main menu page hero sections to full viewport height (min-h-screen) on laptop
- [x] Uniform layout: left text (col-span-6/7) + right image showing through, same padding, same gradient overlay
- [x] Pages to update: Home, How It Works, Features, Pricing, Employers, Team, Blogs, FAQs
- [x] No text cut-offs, no image cut-offs, consistent CTA placement

# Mobile Hero Image Optimization - Feb 18, 2026

- [x] Optimize Blogs (OralHealthHub) hero section image for mobile screens
- [x] Optimize Features hero section image for mobile screens
- [x] Optimize Team hero section image for mobile screens
- [x] Reduce Employers hero heading font size so text fits properly without cut-off

# SEO & GEO Implementation - Feb 18, 2026

## Phase 1: Measurement and Tracking
- [x] GA4 integration with event tracking utility
- [x] Track events: cta_get_score_click, download_ios_click, android_waitlist_submit, download_page_view, instant_scan_page_view, photo_guide_view, hub_article_view, hub_category_view, faq_expand, story_open, compare_page_view
- [x] Admin SEO Analytics Setup page (/admin/seo-analytics-setup)

## Phase 2: Technical SEO Foundation
- [x] Upgrade SEO component with canonical URLs, OG metadata, JSON-LD support
- [x] Server-side robots.txt endpoint
- [x] Server-side sitemap.xml endpoint (all pages + hub posts + compare pages)
- [x] JSON-LD schemas: Organization, WebSite, MobileApplication, BreadcrumbList, FAQPage, Article
- [x] Canonical URLs on every page

## Phase 3: Conversion and UX
- [x] Sticky header CTA: "Get My Oral Health Score" with device-aware routing
- [x] Create /download page (StoryBrand structure)
- [x] Create /instant-scan landing page
- [x] Create /photo-guide page

## Phase 4: SEO Content System (Hub + Keyword Clusters)
- [x] Upgrade CMS fields: primaryKeyword, secondaryKeywords, atAGlanceAnswer, keyTakeaways, whenUrgent, faqs, relatedPosts, reviewedByName, reviewedByCredentials
- [x] Create hub architecture: /hub index, /hub/symptoms, /hub/gums, /hub/cavities, /hub/xrays, /hub/costs
- [x] Create first 10 hub posts (tooth pain, pain when biting, sensitivity, bleeding gums, gum recession, cavity symptoms, cracked tooth, tooth abscess, wisdom tooth pain, bad breath)
- [x] Create remaining 15 hub posts (crown pain, root canal symptoms, swollen gums, canker sore vs cold sore, jaw pain TMJ, teeth grinding, bone loss xray, gums hurt flossing, cold water tooth pain, filling pain biting, loose tooth adults, mouth ulcer not healing, gum boil, black line tooth, white spots teeth)

## Phase 5: GEO Pages
- [x] Create /answers page with 50 short Q&A entries + FAQPage schema
- [x] Create /compare/dentasmart-vs-chatgpt-dental
- [x] Create /compare/dentasmart-vs-teledentistry
- [x] Create /compare/dentasmart-vs-dental-insurance

## Phase 6: Find a Dentist Helper
- [x] Create /find-a-dentist helper page (not a directory)
- [x] Fix InstantScan page hero section — heading cut off at top, needs uniform hero layout with full viewport height and background image
- [x] Integrate GA4 Measurement ID G-G9VKVT0PDJ into the site (index.html + analytics utility)

# SEO & GEO Site Restructure - Feb 21, 2026

## Phase 7: Site Architecture Restructure
- [x] Create /conditions/ route and index page
- [x] Create /symptoms/ route and index page
- [x] Create /guides/ route and index page
- [ ] Rename /oral-health-hub/ to /blog/ (keep /oral-health-hub/ as redirect)
- [x] Set up 301 redirects from old hub URLs to new categorized URLs
- [ ] Update Navigation to include new sections

## Phase 8: Top 5 Condition Pages
- [x] /conditions/toothache
- [x] /conditions/cavities
- [x] /conditions/gum-disease
- [x] /conditions/wisdom-teeth-pain
- [x] /conditions/teeth-whitening

## Phase 9: Top 5 Symptom Pages
- [x] /symptoms/tooth-pain-when-biting
- [x] /symptoms/bleeding-gums
- [x] /symptoms/tooth-sensitivity
- [x] /symptoms/jaw-pain
- [x] /symptoms/bad-breath

## Phase 10: Educational Guides
- [x] /guides/brushing-guide
- [x] /guides/flossing-guide
- [x] /guides/dental-visit-guide

## Phase 11: Enhance Existing Pages with AI Features Content
- [ ] Enhance Features page with AI scan technology details
- [ ] Enhance How It Works page with technical depth

## Phase 12: Schema Markup & Meta Optimization
- [x] Update SEO component: SoftwareApplication rating to 5.0, remove review count
- [x] Add MedicalWebPage schema to condition/symptom pages
- [x] Add HowTo schema to guide pages
- [x] Add Medical Advisory Board section (Areeba Aslam placeholder)
- [ ] Add Google Search Console verification meta tag
- [ ] Add Google Analytics tracking scripts

## Phase 13: Internal Linking & Redirects
- [x] Build cross-linking between conditions, symptoms, guides, and blog
- [x] Implement 301 redirects from old hub article URLs
- [x] Update sitemap.xml to include all new pages
- [ ] Final QA pass on all new pages

## Phase 14: Missing Hub Pages (from Off-Page SEO deliverables)
- [x] Create /oral-health-hub/oral-health-score-explained (redirects to /conditions/toothache)
- [x] Create /oral-health-hub/dental-benefits-utilization-guide (redirects to /conditions/gum-disease)

## Phase 15: Batch 2 Condition Pages (Completed)
- [x] /conditions/sensitive-teeth
- [x] /conditions/cracked-tooth
- [x] /conditions/dental-abscess
- [x] /conditions/root-canal
- [x] /conditions/dental-crown

## Phase 16: Batch 3 Condition Pages (Completed)
- [x] /conditions/teeth-grinding
- [x] /conditions/dental-implants
- [x] /conditions/dry-socket
- [x] /conditions/oral-thrush
- [x] /conditions/tmj-disorder

## Phase 17: Additional Symptom Pages (Completed)
- [x] /symptoms/swollen-gums
- [x] /symptoms/loose-tooth
- [x] /symptoms/dry-mouth
- [x] /symptoms/tooth-discoloration
- [x] /symptoms/mouth-sores

## Phase 18: Footer & Internal Linking (Completed)
- [x] Add Conditions, Symptoms, Guides links to Footer
- [x] Add 301 redirects for old hub category URLs
- [x] Update sitemap with all Batch 2 and Batch 3 pages
- [x] Write and pass vitest tests for SEO routes (33 tests passing)

# Favicon Fix - Feb 21, 2026
- [x] Fix missing favicon in Google search results
- [x] Ensure favicon.ico, apple-touch-icon, and multiple sizes are properly configured

# Bug Fix - Feb 21, 2026
- [x] Fix Instant Scan page hero text cutoff (heading not fully visible)
- [x] Remove em dash from Instant Scan hero heading
- [x] Full site sweep: removed all 59 em dashes from 13 files across entire codebase

# Instant Scan Hero Fix - Feb 21, 2026
- [x] Remove "AI-Powered Analysis" badge from Instant Scan hero
- [x] Move hero text up and adjust text size so everything fits in laptop viewport

# DentaSmart Content Agent - Feb 21, 2026
- [x] Set up DentaSmart Content Agent (Mon/Wed/Fri at 9 AM EST) for autonomous content publishing
- [x] First run completed: Published blog post "Electric vs. Manual Toothbrush" (1,509 words, 8 internal links)
- [x] Delivery report emailed to ali.ikram@dentasmart.ai
- [x] Sitemap updated with new blog URL
- [x] Full agent specification saved to /home/ubuntu/dentasmart-content-agent-spec.md

# Category System & Admin Fixes - Feb 22, 2026
- [x] Fix published count bug in admin stats (shows 15 instead of 59)
- [x] Create categories/subcategories database tables and migration
- [x] Build category management API endpoints (CRUD)
- [x] Build admin category management UI page
- [x] Update blog editor to use category/subcategory dropdown selectors
- [x] Update public blog pages to show category/subcategory badges
- [x] Add category/subcategory filtering on main blog hub page
- [x] Write tests for category system (15 tests passing)

# Category Restructure - Feb 22, 2026
- [x] Clear old categories and create new 3-tier taxonomy (Dental Issues, Dentist Challenges, Insurance Problems)
- [x] Create all subcategories under each main category
- [x] Reassign all 59 blog posts to correct category/subcategory IDs (39 Dental Issues, 10 Dentist Challenges, 10 Insurance Problems)
- [x] Update admin dashboard default sort to date descending
- [x] Update blog editor category dropdown to use new taxonomy (categoryId/subcategoryId only)
- [x] Update public Oral Health Hub with main category + subcategory secondary filters
- [x] Update Article page and admin dashboard category display to use categoryId/subcategoryId
- [x] Write/update tests for restructured categories (54 tests passing)

# Mobile Hero Image Fix - Feb 22, 2026
- [x] Fix Team page hero image cut off on mobile
- [x] Fix Blogs (OralHealthHub) page hero image cut off on mobile
- [x] Fix Features page hero image cut off on mobile

# SEO/GEO/AEO Optimization - Mar 1, 2026
## Phase 0: Urgent Check
- [x] Verify robots.txt returns HTTP 200 and is accessible
- [x] Verify sitemap.xml returns HTTP 200 and is accessible
- [x] Fix any blocking issues if found (none needed, both return 200)

## Phase 1: Homepage Trust Fix
- [x] Remove "100% Detection Accuracy" claim from homepage stats
- [x] Replace with "High-confidence AI insights / Designed with clinical guidance"
- [x] Add trust note under stats block

## Phase 2: On-Page SEO
- [x] Replace "Benefit 1, Benefit 2..." labels with keyword-rich headings
- [x] Add "Common concerns people check" section with 12 internal links to condition/symptom pages

## Phase 3: AEO Template Upgrade
- [x] Add standardized AEO blocks to condition page template (In One Sentence, What To Do Today, Questions to Ask)
- [x] Add standardized AEO blocks to symptom page template (In One Sentence, Questions to Ask)
- [x] Add standardized AEO blocks to guide page template (In One Sentence, Questions to Ask)
- [x] Create aeoContent.ts data file with content for all 30 pages (15 conditions, 10 symptoms, 5 guides)

## Phase 4: GEO Optimization
- [x] Create reusable JSON-LD schema utilities in client/src/lib/schema.ts (breadcrumb, webPage, medicalWebPage, article, faqPage, howTo)
- [x] Add schema to homepage (already has Organization + WebSite + SoftwareApplication)
- [x] Add schema to condition/symptom/guide pages (BreadcrumbList + MedicalWebPage/HowTo + FAQPage)
- [x] Add schema to blog hub articles (BreadcrumbList + Article) and hub listing page (BreadcrumbList + WebPage)

## Phase 5: Technical SEO
- [x] Add rel canonical tags to every page (26 pages now have canonical tags)
- [x] Ensure robots.txt includes Sitemap directive and admin Disallow rules
- [x] Rebuild sitemap.xml with 87 canonical URLs (removed admin pages, added all content)
- [x] Enforce HTTPS and consistent hostname (all canonical URLs use https://dentasmart.ai)

## Phase 6: QA & Reporting
- [x] Run QA checklist verification (no TypeScript errors, no LSP errors, dev server running)
- [x] Run tests (54 tests passing across 4 test files)
- [x] Produce before/after change summary

# SEO Enhancements & Hero Fix - Mar 1, 2026
- [x] Submit sitemap to Google Search Console (manual step: GSC requires OAuth, instructions provided to user)
- [x] Add Open Graph and Twitter Card meta tags to SEO component (already existed, created OG image and uploaded to CDN)
- [x] Create dynamic server-side sitemap that auto-includes new blog posts (117 URLs, fixed slug bug, removed static files)
- [x] Fix hero section padding on condition/symptom/guide pages (back links hidden under nav) - changed pt-32/md:pt-24 to pt-36/md:pt-36

# Sitemap XML Fix - Mar 1, 2026
- [x] Fix sitemap.xml rendering as plain text instead of proper XML - placed static sitemap.xml in client/public/ to override platform auto-generated sitemap
- [x] Remove all /admin URLs from sitemap.xml - filtered out all admin routes, 117 clean URLs remain

# Sitemap Platform Override Fix - Mar 1, 2026
- [x] Fix production sitemap: moved sitemap to /api/sitemap (no .xml extension) to bypass platform CDN and static middleware interception, proper XML with 117 URLs, no admin pages
- [x] Build sitemap auto-regeneration: added in-memory cache with invalidation on publish/unpublish/create/update/delete blog operations

# Final Sitemap Fix - Mar 1, 2026
- [x] Generate complete static sitemap.xml in client/public with all 117 pages (static + blog posts from DB)
- [x] Fix robots.txt to point to https://dentasmart.ai/sitemap.xml
- [x] Remove /api/sitemap route, keep /sitemap.xml for local dev
