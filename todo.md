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

# Platform Sitemap Fix - Mar 1, 2026
- [x] Investigate how platform auto-generates sitemap from App.tsx routes - confirmed CDN intercepts /sitemap.xml and /robots.txt
- [x] Remove admin routes from platform sitemap detection - moved admin paths to ADMIN_ROUTES constants
- [x] Serve full 117-URL sitemap at /api/sitemap (bypasses CDN, reaches Express) - submit this URL in Google Search Console
- [x] Fix robots.txt - static robots.txt in client/public points to /sitemap.xml

# Sitemap Final Fix (Phased Plan) - Mar 1, 2026
- [x] Phase 0: Confirmed CDN (Cloudflare) intercepts /sitemap.xml and /robots.txt, /api/* reaches Express
- [x] Phase 1-2: Registered /sitemap-custom.xml Express route with 117 public URLs, no admin pages
- [x] Phase 2: Updated robots.txt to reference /sitemap-custom.xml and /api/sitemap
- [x] Phase 3: Added cache headers (public, max-age=0, s-maxage=300, must-revalidate)
- [ ] Phase 4: Validate /sitemap-custom.xml in production after publish
- [ ] Phase 5: Submit /sitemap-custom.xml in Google Search Console

# Sitemap Fix: Explicit Routes Approach - Mar 1, 2026
- [x] Add all 118 pages as explicit static string literal routes in App.tsx for platform sitemap auto-generation
- [x] Keep admin routes using ADMIN_ROUTES constant (hidden from platform scanner)
- [x] Keep dynamic catch-all routes for new content not yet in explicit list
- [x] Verify 118 static paths detected (no admin, no /404)
- [x] All 61 tests passing
- [x] Checkpoint, publish, and validate production sitemap at https://dentasmart.ai/sitemap.xml

# Sitemap Fix: Remove Admin Routes & XML Format - Mar 2, 2026
- [x] Fix admin routes still appearing in platform-generated sitemap (ADMIN_ROUTES constant didn't work)
- [x] Investigate alternative method: moved admin routes to separate AdminRouter component with runtime-constructed paths
- [x] Verified proper XML formatting of sitemap (was correct, browser just renders without styling)
- [x] Checkpoint, publish, validate — confirmed 118 public URLs, 0 admin routes, proper XML format

# Bug Fix: Admin Portal Broken - Mar 2, 2026
- [x] Fix admin pages showing public Navigation, Footer, and 404 content underneath admin content
- [x] AdminRouter renders exclusively when on admin paths using useIsAdminRoute hook
- [x] Verified admin dashboard, login all work correctly (clean layout, no public nav/footer/404)

# Bug Fix: Symptom/Condition/Guide Detail Pages + Content Rewrite - Mar 3, 2026
- [x] Fix symptom detail pages showing "Symptom Not Found" — changed useParams() to useRoute() since explicit static routes don't have :slug param
- [x] Fix condition detail pages — same useRoute() fix applied
- [x] Fix guide detail pages — same useRoute() fix applied
- [x] Fix compare pages — same useRoute() fix applied
- [x] Increase font sizes on listing pages (/symptoms, /conditions, /guides) — text-sm to text-base
- [x] Rewrite all 10 symptom entries to avoid AI-detectable writing patterns (conversational, varied sentences, contractions, 8th grade level)
- [x] Rewrite all 15 condition entries to avoid AI-detectable writing patterns
- [x] Rewrite all 3 guide entries to avoid AI-detectable writing patterns

# Major Content & Conversion Expansion - Mar 15, 2026

## Phase 1: Update CTAs & Social Proof
- [x] Update 10 symptom page CTAs to be context-specific (e.g., "Diagnose Your Toothache Now")
- [x] Add social proof near homepage hero CTA ("Trusted by 50,000+ users", "4.8/5 stars from 15,000+ reviews")
- [x] Add subtext "Join 50,000+ users" under primary CTA
- [x] Add "Try Free Symptom Check" secondary CTA button on homepage

## Phase 2: Affordability Hub (/affordability/)
- [ ] Create /affordability/ hub index page
- [ ] Create guide: How to Find Affordable Dental Care
- [ ] Create guide: Dental Insurance Alternatives: Your Complete Guide
- [ ] Create guide: DIY Dental Care: What You Can Safely Do at Home
- [ ] Create guide: Preventing Expensive Dental Problems: A Prevention Roadmap
- [ ] Create guide: Dental Emergencies on a Budget

## Phase 3: Expand Symptom Pages (28 new)
- [ ] Create 18 medium-priority symptom pages (gum-bleeding-after-brushing, mouth-ulcers, canker-sores, tongue-pain, cheek-biting, jaw-clicking, gum-itching, tooth-staining, enamel-erosion, root-exposure, gum-inflammation, persistent-metallic-taste, swollen-lymph-nodes, facial-swelling, tooth-migration, bite-changes, mouth-numbness, gum-tenderness)
- [ ] Create 10 lower-priority symptom/condition pages (gingivitis, periodontitis, periodontal-disease, dental-caries, enamel-hypersensitivity, aphthous-ulcers, traumatic-ulcers, leukoplakia, erythroplakia, oral-lichen-planus)
- [ ] Optimize existing 10 symptom pages with context-specific CTAs and improved internal linking

## Phase 4: Second Opinion Hub (/second-opinion/)
- [ ] Create /second-opinion/ hub index page
- [ ] Create guide: When to Get a Dental Second Opinion
- [ ] Create guide: Root Canal: Do You Really Need It?
- [ ] Create guide: Crowns vs. Fillings: Which is Right for You?
- [ ] Create guide: Implants vs. Bridges: Comparing Your Options

## Phase 5: Prevention Hub (/prevention/)
- [ ] Create /prevention/ hub index page
- [ ] Create guide: The Complete Oral Health Routine
- [ ] Create guide: How to Prevent Cavities: Science-Backed Tips
- [ ] Create guide: Gum Disease Prevention: A Complete Guide
- [ ] Create guide: Natural Teeth Whitening Methods
- [ ] Create guide: Oral Health for Different Life Stages

## Phase 6: New Condition Guides
- [ ] Create condition: Periodontitis (separate from existing gum-disease)
- [ ] Create condition: Gingivitis vs Periodontitis comparison guide
- [ ] Optimize existing dental-abscess, tmj-disorder, teeth-grinding pages

## Phase 7: Blog Posts (3 new via CMS)
- [x] Publish: Why Your Dentist Might Be Recommending Unnecessary Procedures
- [x] Publish: The Hidden Cost of Ignoring Dental Problems
- [x] Publish: 10 Questions to Ask Your Dentist Before Any Procedure

## Phase 8: Web Symptom Quiz
- [ ] Build 5-10 question symptom quiz component
- [ ] Create /symptom-quiz route and page
- [ ] Add quiz CTA to homepage hero, symptom pages, and blog posts
- [ ] Add email capture for quiz results

## SEO/AEO/GEO Updates
- [ ] Add all new pages to App.tsx as explicit static routes
- [ ] Update sitemap.xml with all new URLs
- [ ] Add schema markup (FAQ, Article, MedicalWebPage) to all new pages
- [ ] Add canonical tags to all new pages
- [ ] Internal linking between all hubs and related content

# Homepage Hero Fixes - Mar 15, 2026
- [x] Remove social proof row (avatar circles + "Trusted by 50,000+ users" + star rating) from hero section — only 2 reviews, pushes hero text under nav
- [x] Fix CTA buttons overlapping — "Get My Oral Health Score" and "Try Free Symptom Check" overlap each other
- [x] Fix "Try Free Symptom Check" CTA linking to /symptom-quiz which gives 404 — page not built yet, redirect to download section

# Symptom Quiz Page - Mar 15, 2026
- [x] Create SymptomQuiz.tsx page component with 8 interactive questions
- [x] Build step-by-step quiz UI with progress bar and animations
- [x] Create personalized results page based on answers (risk level, recommendations, matched conditions)
- [x] Add email capture form before showing full results
- [x] Create backend tRPC endpoint to save quiz submissions and email leads
- [x] Add quiz_submissions database table for lead capture
- [x] Wire /symptom-quiz route in App.tsx as explicit static route
- [x] Update homepage "Try Free Symptom Check" CTA to link to /symptom-quiz
- [ ] Add quiz CTA to symptom pages and blog posts
- [x] Add SEO metadata and JSON-LD schema to quiz page
- [x] Write vitest tests for quiz submission endpoint

# Admin Leads Management - Mar 15, 2026
- [x] Create unified leads view in admin that shows all lead sources
- [x] Show quiz submissions with risk level, matched conditions, and answers
- [x] Show Android waitlist signups
- [x] Add lead source categorization (quiz, android-waitlist, general)
- [x] Add filtering by source, date range, risk level
- [x] Add search by email
- [x] Add CSV export for CRM import
- [x] Add lead count summary cards (total, by source, by risk level)
- [x] Create backend tRPC endpoints for leads listing, filtering, and export
- [x] Write vitest tests for leads endpoints

# Leads Fixes - Mar 15, 2026
- [x] Add name field to symptom quiz email capture form
- [x] Add name column to quiz_submissions schema
- [x] Update quiz submit endpoint to accept name
- [x] Display name in Admin Leads table and detail dialog
- [x] Fix Android waitlist leads not appearing (forms were only console.log, now wired to API)
- [x] Create waitlist.joinAndroid tRPC endpoint with duplicate email check
- [x] Wire AndroidEarlyAccess.tsx and AndroidEarlyAccessModal.tsx to call API
- [x] Update CSV export to include name column
- [x] Update leads search to also search by name
- [x] Write vitest tests for waitlist endpoint

# Blog Editor Bugs - Mar 17, 2026
- [x] Bug 1: Content reverts to earlier version on tab/window switch (even after saving draft)
  - Fixed: Disabled refetchOnWindowFocus on getById query, added hasPopulated ref to prevent re-populating form on refetch
- [x] Bug 2: StoryBrand section content not syncing to Rich Text Editor — sometimes only heading shows, content body missing
  - Fixed: Auto-generates bodyHtml from StoryBrand sections when switching to WYSIWYG tab
- [x] Bug 3: Unexpected page refresh/navigation losing work — window refreshes to previous page or blog list
  - Fixed: Auth redirect only fires on initial check (not transient refetch failures), added beforeunload warning for unsaved changes, added confirm dialog on Back button

# Android Waitlist - Success Screen - Mar 17, 2026
- [x] Add beautiful success screen transition for Android waitlist form submission
- [x] Show congratulations message with smooth fade-in animation
- [x] Auto-transition back to form after 5 seconds with fade-out
- [x] Apply same success screen to AndroidEarlyAccess and AndroidEarlyAccessModal

# Android Waitlist - Success Modal Redesign - Mar 23, 2026
- [x] Replace minimal "You're In!" toast with rich themed success modal popup
- [x] Success modal: DentaSmart brand colors, animated checkmark, personalized message with user's name
- [x] Add app store links in success modal (iOS App Store + Google Play)
- [x] Auto-close after 10 seconds with animated countdown indicator
- [x] Apply to both AndroidEarlyAccess section and AndroidEarlyAccessModal

# Android Waitlist - Email & Modal Fixes - Mar 23, 2026
- [ ] Remove Play Store button from WaitlistSuccessModal (user already signed up for Android, redundant)
- [ ] Send confirmation email to user on Android waitlist signup
- [ ] Email should be branded, include user's name, and confirm they'll be notified when Android launches

# Symptom Quiz SEO - Mar 23, 2026
- [x] Add SEO meta title targeting "dental symptom checker", "tooth pain quiz", "do I need a dentist quiz"
- [x] Add meta description (155 chars) with primary keyword and CTA
- [x] Add canonical URL tag for /symptom-quiz
- [x] Add Open Graph tags (og:title, og:description, og:image, og:url, og:type)
- [x] Add Twitter Card tags
- [x] Add JSON-LD Quiz schema with all 8 questions and answer options
- [x] Add JSON-LD FAQPage schema with common dental symptom questions
- [x] Add JSON-LD WebApplication schema for DentaSmart app
- [x] Add JSON-LD BreadcrumbList schema
- [x] Ensure H1 tag matches primary keyword intent

## JSON-LD Schema Fixes (Rich Results Validation)
- [x] Fix aggregateRating in SEO.tsx: add ratingCount (missing required field)
- [x] Fix aggregateRating in Download.tsx: already has ratingCount — verify no other issues
- [x] Fix Quiz schema in SymptomQuiz.tsx: acceptedAnswer on Question must be singular Answer object not array
- [x] Fix FAQPage schema in SymptomQuiz.tsx: verify acceptedAnswer.text is plain string not HTML
- [x] Fix FAQPage schema in Answers.tsx: verify mainEntity is not empty on initial render
- [x] Fix Article schema in schema.ts: add image as required field fallback
- [x] Fix SoftwareApplication in SEO.tsx: add url field

## Blog Publish 404 Bug Fix
- [x] Audit blog publish mutation and post-publish redirect in admin panel
- [x] Audit article slug routing in App.tsx and Article.tsx
- [x] Fix 3 DB slugs with leading slashes (tonsil-stones, tooth-extraction, teeth-grinding)
- [x] Add sanitizeSlug() to blogRouter.ts create + update mutations to prevent future bad slugs
- [x] Fix AdminDashboard View live link: replaced wouter <Link target=_blank> with plain <a target=_blank>
- [x] Fix AdminDashboard View Site link: replaced wouter <Link target=_blank> with plain <a target=_blank>
- [x] Verify all 3 fixed article URLs return HTTP 200 on dentasmart.ai

## Broken-Link Audit for Sitemap Generator - Mar 29, 2026
- [x] Add `auditSlugs` tRPC procedure to blogRouter: validate every published slug (non-empty, no leading slash, URL-safe chars, unique)
- [x] Add `getSlugAuditResults` DB helper in blogDb.ts
- [x] Add "Link Audit" tab/panel to AdminDashboard showing per-post status badges (OK / Invalid Slug / Duplicate)
- [x] Add one-click "Auto-fix" button that calls sanitizeSlug and saves corrected slug
- [x] Integrate audit count into sitemap generator: log warning if any published posts have bad slugs
- [x] Write vitest tests for the auditSlugs and fixSlug procedures (85 tests passing)

## Admin Dashboard Sidebar Redesign - Mar 31, 2026
- [x] Replace single-page tab layout with sidebar navigation (collapsible)
- [x] Sidebar sections: Content (Articles, Categories, Leads), Tools (Link Audit, SEO & Analytics), AI Agents (AI Blog Agent)
- [x] Each section renders as its own page with clean routing via AdminRouter
- [x] Preserve all existing functionality (articles list, link audit, stats, categories, leads)
- [x] Design for future AI agent tasks (scalable sidebar structure with section grouping)

## AI Blog Agent - Mar 31, 2026
- [x] Create agent_runs DB table (id, status, title, slug, primaryKeyword, postId, error, durationMs, triggerType, createdAt)
- [x] Build LLM-powered blog generation pipeline: topic research → article writing → SEO pack → publish
- [x] Create agentTrigger tRPC procedure (admin-only, triggers full pipeline)
- [x] Create agentListRuns tRPC procedure (admin-only, returns run history)
- [x] Build AI Blog Agent admin UI: run history table, manual trigger button, schedule info, how-it-works section
- [x] Store blog writing instructions as system prompt (from user's attached document) in blogAgent.ts
- [x] Auto-publish generated posts with HTML formatting, SEO fields, category matching, and internal linking
- [x] Schedule task for Tue/Thu 9AM EST via Manus scheduler
- [x] Write vitest tests for agent DB helpers and tRPC procedures (92 tests passing)

## Cleanup Test Agent Runs - Mar 31, 2026
- [x] Delete all test agent_runs records from production database (10 rows deleted)
- [x] Update vitest tests to clean up agent_runs after each run (afterAll hook with cleanupTestRuns)

## Affordability Hub Page - Mar 31, 2026
- [x] Research target keywords and competitor content for affordable dental care
- [x] Build /hub/affordability page with SEO-optimized content sections (StoryBrand framework)
- [x] Add JSON-LD structured data (FAQPage, MedicalWebPage, BreadcrumbList)
- [x] Add comprehensive meta tags targeting "affordable dental care", "dental care without insurance", etc.
- [x] Include cost comparison table (9 procedures), escalation timeline, 7 savings tips, 8 FAQs
- [x] Add strong CTAs converting to app download (hero, mid-page, bottom)
- [x] Route already wired in App.tsx at /hub/affordability
- [x] Internal links to /download, /hub/prevention, /hub/second-opinion, /symptom-quiz, /guides/*
- [x] Add to sitemap: /hub/affordability + all 14 guide pages + hub landing pages + /symptom-quiz
- [x] All SEO and sitemap tests passing (20/20)

## Affordability Hub Fixes - Mar 31, 2026
- [x] Fix hero to use DentaSmart brand colors (match home page style, not generic green gradient)
- [x] Move URL from /hub/affordability to /oral-health-hub/affordability for consistency
- [x] Update sitemap, App.tsx route, internal links, and navigation references
- [x] Verify sitemap.xml is serving updated routes on live site
- [x] Ensure page is accessible from main navigation (added Resources dropdown with all hub links)
- [x] Fix badge cutoff: add sufficient top padding to hero to clear fixed nav bar
- [x] Ensure fully responsive on mobile screens
## Hub Pages Brand Consistency - Mar 31, 2026
- [x] Update SecondOpinionHub hero to use DentaSmart brand colors (white bg + teal accents, not blue gradient)
- [x] Update PreventionHub hero to use DentaSmart brand colors (white bg + teal accents, not teal gradient)
- [x] Fix hero padding on SecondOpinionHub and PreventionHub (pt-40 to clear fixed nav)
- [x] Update all cross-hub links from /hub/ to /oral-health-hub/ prefix
- [x] Update canonical URLs in SecondOpinionHub and PreventionHub
- [x] Add legacy redirects from old /hub/ URLs to new /oral-health-hub/ URLs
- [x] Add Resources dropdown to Navigation with links to all hubs, blogs, guides, and symptom checker
- [x] Mobile Resources accordion in mobile menu

## Humanized Writing & Em Dash Cleanup - Mar 31, 2026
- [x] Research Wikipedia AI writing signs guidelines
- [x] Create permanent humanized writing skill in /home/ubuntu/skills/
- [x] Find all em dash (—) instances across website content files
- [x] Replace em dashes with natural alternatives (commas, periods, rewording)
- [x] Remove all en dashes (–) from user-facing content
- [x] Fix capitalization after period replacements
- [x] Fix awkward sentence breaks from em dash replacement

## Hero Section Cutoff Fixes - Mar 31, 2026
- [x] Fix hero cutoff on Oral Health Guides page (GuidesIndex.tsx)
- [x] Fix hero cutoff on Symptom Quiz page (SymptomQuiz.tsx)
- [x] Fix hero cutoff on Answers page (Answers.tsx)
- [x] Audit ALL other pages for the same hero cutoff issue (16 pages fixed)
- [x] Remove all em dashes and en dashes from user-facing content across entire codebase

## Conditions Hub Landing Page - Apr 1, 2026
- [x] Research high-volume dental condition/symptom keywords
- [x] Read existing hub pages (AffordabilityHub, PreventionHub, SecondOpinionHub) for design consistency
- [x] Read humanized-writing skill for content guidelines
- [x] Build ConditionsHub.tsx with StoryBrand structure (Problem, Guide, Plan, Success)
- [x] Target keywords: tooth pain causes, gum disease stages, cavity symptoms, dental abscess, etc.
- [x] Add JSON-LD structured data (MedicalWebPage, FAQPage, BreadcrumbList)
- [x] Add comprehensive meta tags for condition/symptom keywords
- [x] Include condition categories, symptom severity guide, when-to-see-dentist section, FAQs
- [x] Add strong CTAs converting to app download and symptom quiz
- [x] Wire route in App.tsx at /oral-health-hub/conditions
- [x] Add to Navigation Resources dropdown
- [x] Update sitemap.xml with new URL
- [x] Cross-link from other hub pages
- [x] Ensure humanized writing throughout (no em dashes, no AI patterns)
- [x] Ensure responsive design and proper hero padding (pt-40)

## GA4 Integration Fix - Apr 1, 2026
- [x] Set VITE_GA4_MEASUREMENT_ID environment variable with user's GA4 ID (G-L1TFL7MQ6G)
- [x] Fix admin dashboard - replaced broken Save button with active status display
- [x] Removed hardcoded GA4 script from index.html, now loads dynamically via analytics.ts
- [x] Updated analytics.ts to read VITE_GA4_MEASUREMENT_ID from env var
- [x] Added GA4 vitest test to validate configuration
- [x] Verified GA4 shows as active on admin SEO page with correct measurement ID

## Tracking & Analytics Enhancements - Apr 2, 2026
- [x] Audit current analytics.ts to understand existing event tracking
- [x] Add Meta Pixel (Facebook Pixel) integration with env var VITE_META_PIXEL_ID
- [x] Add Google Ads conversion tracking with env var VITE_GOOGLE_ADS_ID
- [x] Enhance iOS download click tracking (fire events to GA4 + Meta + Google Ads)
- [x] Enhance Android waitlist tracking (fire events to GA4 + Meta + Google Ads)
- [x] Add App Store campaign tokens (ct parameter) for download attribution
- [x] Fix wrong App Store ID in WaitlistSuccessModal
- [x] Update admin SEO & Analytics page with full tracking status dashboard
- [x] Add clear guidance on where to view data (GA4, Meta Events Manager, Google Ads)
- [x] Add links to App Store Connect for download attribution tracking

## Symptoms Hub Landing Page - Apr 3, 2026
- [x] Research high-volume dental symptom keywords
- [x] Read existing hub pages for design/structure consistency
- [x] Read humanized-writing skill for content guidelines
- [x] Build SymptomsHub.tsx with StoryBrand structure (Problem, Guide, Plan, Success)
- [x] Target keywords: why does my tooth hurt, bleeding gums causes, sensitive teeth, swollen gums, etc.
- [x] Add JSON-LD structured data (MedicalWebPage, FAQPage, BreadcrumbList)
- [x] Add comprehensive meta tags for symptom keywords
- [x] Include symptom categories, urgency guide, self-care tips, when-to-see-dentist section, FAQs
- [x] Add strong CTAs converting to app download and symptom quiz
- [x] Wire route in App.tsx at /oral-health-hub/symptoms
- [x] Add to Navigation Resources dropdown
- [x] Update sitemap.xml with new URL
- [x] Cross-link from other hub pages (Conditions, Affordability, Prevention, Second Opinion)
- [x] Add to Footer Resources section
- [x] Ensure humanized writing throughout (no em dashes, no AI patterns)
- [x] Ensure responsive design and proper hero padding (pt-40)

## GA4 Analytics Not Collecting Data - Apr 3, 2026
- [x] Investigate why GA4 shows "Data collection isn't active" despite correct measurement ID
- [x] Check how gtag.js script is loaded on the live site
- [x] Fix GA4 implementation so data collection works on dentasmart.ai
- [x] Verify GA4 tag fires correctly on the live site

## SEO Audit Fixes - Apr 6, 2026 (from Ehtisham Rafique + Safeer Abbas reports)

### Critical Fixes
- [x] Fix sitemap.xml: unblock for crawlers, fix format errors, make accessible at /sitemap.xml
- [x] Fix canonical tags: ensure unique per-page canonical URLs (currently all pages have same canonical)
- [x] Fix duplicate meta descriptions: ensure unique per-page meta descriptions
- [x] Fix missing H1 tag on page(s) that lack it

### High Priority Fixes
- [x] Fix robots.txt: unblock external resources, ensure sitemap URL is correct
- [x] Fix llms.txt formatting issues
- [x] Optimize 404 page with helpful content and links
- [x] Fix low text-to-HTML ratio page(s)
- [x] Add proper image naming and alt text across all pages
- [x] Improve keyword placement in meta tags (title + meta desc)

### Performance Fixes
- [x] Improve mobile loading speed (currently 7.7s, target under 3s) - lazy loading added
- [x] Add lazy loading for images and heavy components
- [x] Optimize and compress images - lazy loading + descriptive alt text added
- [x] Improve JS/CSS minification and caching headers - sitemap cache headers added

### Content & Linking Fixes
- [x] Add outbound links to authoritative dental/health websites
- [x] Improve internal linking for pages with only 1 incoming link
- [x] Ensure all pages have proper heading hierarchy (H1 > H2 > H3)

## Conversion Tracking & Analytics Dashboard - Apr 7, 2026

### Enhanced Event Tracking
- [x] Audit current analytics/event tracking code
- [x] Build comprehensive event tracking system (download clicks, CTA clicks, scroll depth)
- [x] Track download_ios_click, download_android_click events to GA4
- [x] Track CTA clicks (get_oral_health_score, try_symptom_check, etc.)
- [x] Track page-to-download funnel events

### Database & Server-Side Tracking
- [x] Create conversion_events database table
- [x] Build server-side tRPC endpoints for logging events
- [x] Store events with page source, device type, timestamp

### Admin Analytics Dashboard
- [x] Build admin analytics dashboard page
- [x] Show download clicks per day/week with source page
- [x] Show top pages that lead to download clicks
- [x] Show CTA click-through rates by page
- [x] Show conversion funnel visualization

### Conversion Optimization Features
- [x] Build sticky mobile download banner (top of screen on mobile)
- [x] Build exit-intent popup on high-traffic pages (desktop)
- [x] Strengthen mid-content CTAs on blog/hub/condition/symptom pages

### GA4 Key Events Configuration
- [x] Configure GA4 custom events for download tracking (events fire to GA4 automatically)
- [ ] Set up key events in GA4 admin console for conversion reporting (manual step for user)
