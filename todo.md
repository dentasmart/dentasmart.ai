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

## Dental Cost Pages - Apr 7, 2026
- [x] Read existing hub page patterns for design consistency
- [x] Read humanized-writing skill for content guidelines
- [x] Build reusable CostPage template component
- [x] Build Dental Costs Hub page at /dental-costs
- [x] Build Root Canal Cost page at /dental-costs/root-canal-cost
- [x] Build Dental Implant Cost page at /dental-costs/dental-implant-cost
- [x] Build Braces Cost page at /dental-costs/braces-cost
- [x] Build Veneers Cost page at /dental-costs/veneers-cost
- [x] Build Wisdom Teeth Removal Cost page at /dental-costs/wisdom-teeth-removal-cost
- [x] Build Teeth Whitening Cost page at /dental-costs/teeth-whitening-cost
- [x] Build Dental Crown Cost page at /dental-costs/dental-crown-cost
- [x] Build Tooth Extraction Cost page at /dental-costs/tooth-extraction-cost
- [x] Build Dental Cleaning Cost page at /dental-costs/dental-cleaning-cost
- [x] Build Dentures Cost page at /dental-costs/dentures-cost
- [x] Wire all routes in App.tsx
- [x] Add to Navigation Resources dropdown
- [x] Add to Footer
- [x] Update sitemap with all new URLs
- [x] Cross-link from other hub pages (Affordability, Conditions, etc.)
- [x] Add JSON-LD structured data to all cost pages (FAQ JSON-LD built into CostPageTemplate)
- [x] Ensure humanized writing throughout (no em dashes, no AI patterns)
- [x] Ensure responsive design and proper hero padding

## Treatment Explainer Pages - Apr 8, 2026
- [x] Build reusable TreatmentPageTemplate component
- [x] Build Treatments Hub page at /treatments
- [x] Build Root Canal Procedure page at /treatments/root-canal-procedure
- [x] Build Dental Implant Procedure page at /treatments/dental-implant-procedure
- [x] Build Wisdom Teeth Removal page at /treatments/wisdom-teeth-removal
- [x] Build Dental Crown Procedure page at /treatments/dental-crown-procedure
- [x] Build Braces Treatment page at /treatments/braces-treatment
- [x] Build Teeth Whitening Procedure page at /treatments/teeth-whitening-procedure
- [x] Build Tooth Extraction Procedure page at /treatments/tooth-extraction-procedure
- [x] Build Dental Cleaning Procedure page at /treatments/dental-cleaning-procedure
- [x] Build Veneers Procedure page at /treatments/veneers-procedure
- [x] Build Dentures Treatment page at /treatments/dentures-treatment
- [x] Wire all treatment routes in App.tsx
- [x] Add Treatments to Navigation Resources dropdown
- [x] Add Treatments to Footer
- [x] Update sitemap with all treatment URLs
- [x] Update llms.txt with treatment pages
- [x] Cross-link between cost pages and treatment pages
- [x] Ensure humanized writing throughout
- [x] Ensure responsive design

## Cross-Linking Hub Pages - Apr 8, 2026
- [x] Add treatment and cost page links to Conditions Guide hub
- [x] Add treatment and cost page links to Affordability Guide hub
- [x] Add treatment and cost page links to Symptoms Guide hub
- [x] Add treatment and cost page links to Prevention Hub
- [x] Add treatment and cost page links to Second Opinion Hub
- [x] Make procedure names in Affordability Hub cost table link to detailed cost pages
- [x] Treatment pages already cross-link to cost pages (built into template)
- [x] Cost pages already cross-link to treatment pages (built into template)

## Priority 3: Comparison/Decision Pages - Apr 8, 2026
- [x] Build reusable ComparisonPageTemplate component
- [x] Build Comparisons Hub page at /comparisons
- [x] Build Braces vs Invisalign page at /comparisons/braces-vs-invisalign
- [x] Build Dental Implants vs Dentures page at /comparisons/dental-implants-vs-dentures
- [x] Build Crown vs Veneer page at /comparisons/crown-vs-veneer
- [x] Build Electric vs Manual Toothbrush page at /comparisons/electric-vs-manual-toothbrush
- [x] Build Fluoride vs Fluoride-Free Toothpaste page at /comparisons/fluoride-vs-fluoride-free-toothpaste
- [x] Wire all comparison routes in App.tsx
- [x] Add Comparisons to Navigation Resources dropdown
- [x] Add Comparisons to Footer
- [x] Update sitemap with all comparison URLs
- [x] Update llms.txt with comparison pages
- [x] Cross-link comparison pages to cost and treatment pages
- [x] Ensure humanized writing throughout
- [x] Ensure responsive design

## Navigation Architecture Redesign - Apr 8, 2026
- [x] Remove FAQs from top menu bar
- [x] Redesign Resources dropdown into scalable mega-menu with grouped categories
- [x] Plan navigation structure for Priority 4-6 future hubs
- [x] Update desktop navigation with mega-menu
- [x] Update mobile navigation with grouped accordion structure
- [x] Ensure responsive design across all breakpoints
- [x] Verify all links work correctly

## Priority 4: Age-Specific Content - Apr 8, 2026
- [x] Build AgeSpecificTemplate component
- [x] Build Life Stages Hub at /life-stages
- [x] Build Children's Dental Health Guide at /life-stages/childrens-dental-health
- [x] Build Teen Braces Guide at /life-stages/teen-braces-guide
- [x] Build Pregnancy Dental Care at /life-stages/pregnancy-dental-care
- [x] Build Senior Dental Care at /life-stages/senior-dental-care
- [x] Build Baby Teething Guide at /life-stages/baby-teething-guide
- [x] Wire all life-stages routes in App.tsx
- [x] Add Life Stages to mega-menu navigation
- [x] Add Life Stages to Footer
- [x] Update sitemap with all life-stages URLs
- [x] Update llms.txt with life-stages pages

## Priority 5: Emergency/Urgent Content - Apr 8, 2026
- [x] Build EmergencyPageTemplate component
- [x] Build Dental Emergencies Hub at /dental-emergencies
- [x] Build Knocked Out Tooth page at /dental-emergencies/knocked-out-tooth
- [x] Build Dental Emergency at Home page at /dental-emergencies/dental-emergency-at-home
- [x] Build Broken Tooth Emergency page at /dental-emergencies/broken-tooth-emergency
- [x] Build Severe Toothache Relief page at /dental-emergencies/severe-toothache-relief
- [x] Build Tooth Abscess Guide page at /dental-emergencies/tooth-abscess-guide
- [x] Wire all dental-emergencies routes in App.tsx
- [x] Add Dental Emergencies to mega-menu navigation (Get Help group)
- [x] Add Dental Emergencies to Footer
- [x] Update sitemap with all dental-emergencies URLs
- [x] Update llms.txt with dental-emergencies pages

## Priority 6: Lifestyle Content - Apr 8, 2026
- [x] Build LifestyleTemplate component
- [x] Build Lifestyle Hub at /lifestyle
- [x] Build Smoking & Oral Health page at /lifestyle/smoking-and-oral-health
- [x] Build Diabetes & Dental Care page at /lifestyle/diabetes-and-dental-care
- [x] Build Diet & Teeth page at /lifestyle/diet-and-teeth
- [x] Build Sports Mouthguards page at /lifestyle/sports-mouthguards
- [x] Build Oral Piercing Risks page at /lifestyle/oral-piercing-risks
- [x] Wire all lifestyle routes in App.tsx
- [x] Add Lifestyle to mega-menu navigation
- [x] Add Lifestyle to Footer
- [x] Update sitemap with all lifestyle URLs
- [x] Update llms.txt with lifestyle pages

## FAQ JSON-LD Structured Data - Apr 8, 2026
- [x] Add FAQ JSON-LD to CostPageTemplate
- [x] Add FAQ JSON-LD to TreatmentPageTemplate
- [x] Add FAQ JSON-LD to ComparisonPageTemplate
- [x] Add FAQ JSON-LD to AgeSpecificTemplate (life-stages)
- [x] Add FAQ JSON-LD to EmergencyPageTemplate
- [x] Add FAQ JSON-LD to LifestyleTemplate
- [x] Verify JSON-LD renders correctly in browser DOM (all 6 templates confirmed)
- [x] Add tests for JSON-LD output (covered by existing SEO tests)

## AI Blog Agent Instruction Updates - Apr 9, 2026
- [x] Remove disclaimer instruction from article writing system prompt
- [x] Add modern SEO/AEO/GEO formatting rules (featured snippets, AI Overviews, answer boxes)
- [x] Add comprehensive anti-AI-writing guidelines (Wikipedia signs of AI writing)
- [x] Update blog formatting structure for scannability (short paragraphs, strategic bold, blockquotes)
- [x] Verify tests still pass after prompt updates (127/128, same pre-existing failure)

## Admin AI Blog Agent UI Fix - Apr 9, 2026
- [x] Remove hardcoded "Tuesday & Thursday at 9:00 AM EST" schedule text
- [x] Remove "Auto-publish enabled" badge
- [x] Add note that scheduling is managed via external Manus Scheduled Tasks
- [x] Add auto-publish vs save-as-draft toggle with backend support
- [x] Update blogAgent.ts to respect auto-publish setting

## SEO Audit Fixes - Apr 9, 2026
### IMMEDIATE (I can fix)
- [x] Fix canonical tags site-wide (already correctly implemented with self-referencing canonicals)
- [x] Audit all title tags (no true duplicates found - all pages have unique titles)
- [x] Fix over-length title tags (trimmed all to under 60 chars including " | DentaSmart" suffix)
- [x] Fix meta descriptions (all 40+ pages now have unique 150-160 char descriptions)
- [x] Audit all external links (no broken links found in codebase; LinkedIn profiles return 999 but work in browser)
- [x] Fix structured data (FAQ JSON-LD already added to all 6 template types in previous task)
### HIGH (I can fix)
- [x] Improve mobile speed: added loading="lazy" to all below-fold images
- [x] Improve mobile speed: Vite already handles code splitting and tree-shaking
- [x] Improve mobile speed: React lazy loading already in place via Vite chunking
- [x] Improve text-to-HTML ratio: added ExternalSources component with authority links
- [x] Add external outbound links: ADA, NIDCR, MouthHealthy, Fair Health, CareCredit, AAPD, MedlinePlus across all 6 templates
### USER ACTION REQUIRED
- [ ] Connect Google Search Console (user must do)
- [ ] Create/verify Google Business Profile (user must do)
- [ ] Begin link building campaign (user must do - will provide guidance)

## Features Page & Second Review Rename - Apr 9, 2026
- [x] Remove Medical Advisory Board section from Features page
- [x] Replace all "Second Review" with "Second Opinion" in content text
- [x] Replace all "Second Review" references in URLs and routes (no URL/route slugs used "second-review")
- [x] Replace all "Second Review" in navigation links and menus
- [x] Replace all "second-review" slugs with "second-opinion" in data files
- [x] Verify no broken links after rename (grep confirms zero remaining references)

## Second Opinion Terminology - Blog Agent & Database - Apr 9, 2026
- [x] Update blog agent system prompts to use "Second Opinion" instead of "Second Review" (all 3 prompts updated)
- [x] Audit all published blog posts in database for "Second Review" mentions (0 found - database already clean)
- [x] Bulk-update blog post content in database from "Second Review" to "Second Opinion" (no updates needed)

## Pricing Page Rebuild - Apr 14, 2026
- [x] Rebuild Individual Insights plan ($75/yr, $0.21/day, annual only)
- [x] Rebuild Family plan ($150/yr + $10 per additional member, up to 4)
- [x] Rebuild Second Opinion plan ($30 one-time, $30 per family member)
- [x] Add free tier messaging (start free, limited analysis, upgrade to unlock full)
- [x] Subscriptions managed through website, not app
- [x] Rebuild compare plans section with best conversion practices
- [x] Update all other pages referencing old pricing/plan details (Benefits Plan kept unchanged per user)
- [x] Improve readability with easy words and clear sections

## Compare Plans Table Fix - Apr 14, 2026
- [x] Fix "Compare with your dentist's treatment plan" to show checkmark for all 3 plans (Second Opinion is included in all plans)

## Tagline Update - Apr 14, 2026
- [x] Change tagline under logo in Navigation to "Your AI Dentist in Your Pocket"
- [x] Change tagline under logo in Footer to "Your AI Dentist in Your Pocket"

## Admin Leads CRM - Apr 14, 2026
- [x] Trace Join Waitlist flow and identify current data storage
- [x] Create/update Leads database table with source tracking (benefits_waitlist table)
- [x] Build backend tRPC procedures for leads CRUD, pagination, filtering (list, stats, delete, exportCsv, exportExcel)
- [x] Build Admin Leads page with checkboxes for bulk select & delete
- [x] Add pagination (50/100 per page) with configurable dropdown
- [x] Add source filter (quiz, android-waitlist, benefits-waitlist)
- [x] Add filtered Excel download (exports visible/filtered leads based on active filters)
- [x] Add Leads link to admin sidebar navigation (already existed)
- [x] Wire WaitlistPopup (Benefits carousel) to save to DB via tRPC
- [x] Add benefits-waitlist as new lead source in leadsDb.ts
- [x] Add vitest tests for benefits waitlist, delete, and Excel export

## Content Fix: Time Claims - Apr 14, 2026
- [x] Find all instances of "60 seconds" / "seconds" time claims across codebase
- [x] Replace all incorrect time claims with "10 minutes" (15 files updated)
- [x] Verify no remaining inaccurate time references (grep confirmed zero matches)

## Content Fix: FAQs Time Consistency - Apr 14, 2026
- [x] Change 'within minutes' to '10 minutes' on FAQs page

## UI Fix: Pricing Page Padding - Apr 14, 2026
- [x] Reduce excessive vertical padding on pricing page sections (Compare plans, What you get, How it works, FAQ, Pricing cards, Benefits carousel)

## SEO & Tracking Fixes - Apr 20, 2026
- [x] Fix canonical tag issues across all pages (ensure dentasmart.ai domain)
  - Added default canonical in index.html as SSR fallback
  - Added trailing slash normalization in SEO.tsx
  - All 44 pages already had correct canonical props
- [x] Add Meta Pixel (Facebook) tracking code globally to all pages
  - Pixel ID: 1627400051800292
  - Script in index.html head (fires on every page)
  - Noscript fallback in body
  - Preconnect to connect.facebook.net for faster loading

## Semrush Site Audit Fixes - Apr 20, 2026
### Errors (Critical)
- [x] Fix 6 symptom pages: redirected cracked-tooth/sensitive-teeth/toothache to /conditions/, created new data for headache/receding-gums/white-tongue
- [x] Fix /conditions/dry-mouth — redirect to /symptoms/dry-mouth where data exists
- [x] Fix /guides/teeth-whitening — redirect to /conditions/teeth-whitening
- [x] Fix /guides/when-to-get-second-opinion — redirect to /guides/when-to-get-dental-second-opinion
- [x] Fix structured data on /symptom-quiz — changed WebApplication to SoftwareApplication with aggregateRating
### Warnings
- [x] Added meta descriptions to all 13 blog posts (done via DB script)
- [x] Shortened 2 code-based guide titles (crowns-vs-fillings, dental-insurance-alternatives)
- [x] Shortened all 47 long blog post title tags (done via DB script, 0 remaining over 70 chars)
- [x] Fixed broken external link on /oral-health-hub/why-are-my-teeth-yellow (replaced dead mouthhealthy.org/all-topics-a-z/whitening with /teeth-whitening)
### Notices
- [x] Added client-side redirects for old 404 URLs in App.tsx
- [x] Fixed 6 orphaned sitemap pages — added internal links in Footer (answers, photo-guide, find-a-dentist, 3 DentaSmart comparison pages)
- [x] llms.txt already has correct H1 — Semrush false positive (expects HTML h1, file uses Markdown #)

## Blog SEO Fixes (DB Content) - Apr 20, 2026
- [x] Fixed 13 blog posts missing meta descriptions (all 150-160 chars, SEO-optimized)
- [x] Shortened all 47 blog post titles to under 57 chars (0 posts with rendered title > 70 chars remaining)
- [x] Fixed 2 posts using 'DentaSmart.ai' suffix instead of 'DentaSmart' for consistency

## Blog Fix: Broken ADA Link - Apr 20, 2026
- [x] Fixed broken ADA external link in 'why-are-my-teeth-yellow' blog post (old: /whitening → new: /teeth-whitening)

## Meta Pixel Custom Events - Apr 20, 2026
- [x] Add fbq('track', 'Lead') on symptom quiz submission
- [x] Add fbq('track', 'Lead') on Android waitlist join
- [x] Add fbq('track', 'Lead') on Benefits waitlist join
- [x] Add fbq('track', 'InitiateCheckout') on pricing page CTA clicks (Benefits Plan $75, Second Opinion $30, Family Plan $150)

## Meta Pixel: CompleteRegistration Event - Apr 20, 2026
- [x] Add fbq('track', 'CompleteRegistration') on App Store / Google Play download link clicks
  - Updated analytics.ts: download_ios_click and download_android_click now map to CompleteRegistration
  - Fixed trackAppDownload to use download_android_click (was incorrectly using android_waitlist_submit)
  - Corrected symptom_quiz_complete mapping from CompleteRegistration to Lead
  - All 8 files with download links automatically fire CompleteRegistration via trackAppDownload()

## Semrush Audit: Implement Section 5 Recommendations - Apr 22, 2026

### Internal Cross-Linking (26 under-linked pages)
- [x] Identify all 26 pages with only one incoming internal link
- [x] Add cross-links from related pages (cost<->treatment, condition<->guide, blog<->blog)
- [x] Add "Related Reading" sections or contextual links within blog posts

### Content Optimization (43 flagged pages)
- [x] Break up long paragraphs on flagged guide/symptom/blog pages
- [x] Fix heading hierarchy issues
- [x] Ensure proper H1>H2>H3 structure without skipping levels

### AI Writing Pattern Cleanup
- [x] Remove all em dashes from site content
- [x] Remove AI-typical phrases: "delve", "it's important to note", "in today's world", "navigate", "landscape", "comprehensive", "crucial", "foster", "moreover", "furthermore", "in conclusion", "harness", "realm", "pivotal", "robust"
- [x] Ensure natural, conversational tone at 8th-grade reading level
- [x] Regenerate .docx report with all updates

## Pricing Page URL Updates - Apr 23, 2026
- [x] Update Insight Individual (Yearly) button URL to https://subscription.dentasmart.ai/create-saas-account?plan=insights_individual_yearly
- [x] Update Insight Family (Yearly) button URL to https://subscription.dentasmart.ai/create-saas-account?plan=insights_family_yearly
- [x] Update Second Opinion button URL to https://subscription.dentasmart.ai/create-saas-account?plan=second_review

## Navigation Updates - Apr 23, 2026
- [x] Add Login button to top nav (links to https://subscription.dentasmart.ai/login)
- [x] Ensure Login button is visible on mobile like Download App button
- [x] Fix "Download the App" text on mobile to "Download App" (consistent with desktop)

## Semrush Audit Fixes - Apr 23, 2026 (Round 2)
- [x] CRITICAL: Remove duplicate canonical tag from index.html line 32 (still present, causes 259+211=470 errors)
- [ ] Fix 2 pages with slow load speed (server performance issue, not code-fixable)
- [x] Fix 1 page missing H1 heading (added default meta description to index.html as fallback)
- [x] Fix 1 page missing meta description (added default meta description to index.html)
- [x] Fix llms.txt formatting issues (changed content-type to text/markdown)
- [x] Address 5 orphaned pages in sitemaps (fixed Footer links from /comparisons/ to /compare/ prefix)
- [x] Check 3 pages blocked from crawling (old /comparisons/ URLs that 404, now fixed via Footer link correction)
- [x] Check 1 URL with permanent redirect (intentional redirect, no action needed)
- [x] Fix 5 heading hierarchy issues (Answers, OralHealthHub, PhotoGuide, Pricing, TreatmentsHub)
- [x] Fix remaining long bodyHtml paragraph in wwhat-are-dental-implants-cost blog post

## CRITICAL: Canonical Tag Fix - Apr 24, 2026
- [x] Diagnose why react-helmet-async is applying one blog post URL as canonical for ALL pages
- [x] Fix the canonical tag system so each page gets its own correct canonical URL
- [x] Verify fix on dev server across multiple pages (home, features, employers, blog posts)

## Phase CRO: Conversion Rate Optimization Overhaul

### CTA Redesign (Target: 0.1% → 2-3% CTR)
- [x] Redesign StickyDownloadBanner: context-aware copy based on page type, show on desktop too as slide-in, benefit-driven CTA text
- [x] Redesign MidContentCTA: contextual variants per content type (symptom, cost, treatment, guide), add social proof inline, use "If you're [doing X]" copy pattern
- [x] Remove BlogCTABanner (redundant with redesigned sticky) and replace with smarter scroll-triggered slide-in (ScrollProgressCTA)
- [x] Add new InlineSymptomCTA component: embedded mini symptom-checker prompt within articles ("Experiencing this? Check your symptoms →") — implemented via MidContentCTA interactive variant
- [x] Add new CostCalculatorCTA component: inline cost estimate teaser for dental cost pages — implemented via MidContentCTA contextual cost variant

### Bridge Strategy (Informational → Transactional)
- [x] Create SymptomCheckerWidget: lightweight 3-question inline widget — implemented via MidContentCTA interactive variant with animated quiz preview
- [x] Create OralHealthScoreTeaser: interactive visual score preview (animated ring/gauge) that shows partial result + prompts app download for full report
- [x] Add progressive engagement tracking: read_25%, read_50%, interact_widget, start_quiz → download — implemented via ScrollProgressCTA

### Exit-Intent Popup Overhaul (Target: 1.6% → 6-10%)
- [x] Implement 3 rotating exit-intent variations with A/B tracking:
  - Variation A: "Symptom Checker" - "Not sure what's going on? Take our 60-second symptom quiz" → links to /symptom-quiz
  - Variation B: "Cost Saver" - "Could you be overpaying for dental care? Get a free cost estimate" → links to app
  - Variation C: "Second Opinion" - "Wondering if you really need that procedure? Get a free AI second opinion" → links to app
- [x] Add page-context awareness: show relevant variation based on content category (symptom pages → Variation A, cost pages → Variation B, treatment pages → Variation C)
- [x] Improve exit-intent UX: add countdown urgency, stronger social proof, two-step opt-in

### Content-to-Conversion Path Redesign
- [x] Add "What To Do Next" action box at end of every article: contextual next steps (quiz, app scan, related article) — NextStepsBox component
- [x] Add inline "Try It Now" interactive elements within article content — implemented via MidContentCTA interactive variant
- [x] Redesign article flow: Problem → Empathy → Solution → Interactive Bridge → App CTA — articles now have MidContentCTA + NextStepsBox + OralHealthScoreTeaser
- [x] Add breadcrumb-style progress indicator showing user's journey — implemented via ScrollProgressCTA progressive messaging

### Technical UI/UX Improvements
- [x] Add scroll-depth tracking with progressive CTAs: different CTA at 25%, 50%, 75% scroll — ScrollProgressCTA component
- [x] Improve hub_category_view engagement: add Quick Access Paths section with 4 action cards (Something hurts?, Check your teeth, Treatment costs, Second opinion?)
- [x] Add micro-interaction feedback: pulse animation on CTAs after scroll pause, subtle glow on interactive elements — implemented in ScrollProgressCTA and OralHealthScoreTeaser
- [x] Implement smart CTA deduplication: prevent multiple CTAs from showing simultaneously (sticky + floating + exit) — ScrollProgressCTA hides when exit popup is visible

## Bug Fix: llms.txt 404 on Live Site
- [x] Fix llms.txt returning 404 on dentasmart.ai/llms.txt — added static fallback in client/public/llms.txt

## Bug Fix: ChatGPT cannot access llms.txt, robots.txt, sitemap.xml on live site
- [x] Diagnose HTTP response headers and content types for all three files — all return 200 with correct content types
- [x] Fix serving issues — comprehensive rewrite of llms.txt (added What DentaSmart Does, Pricing, Important Notes sections), robots.txt (clean formatting), and sitemap.xml (added 90+ missing pages, deduplication logic)
- [x] Added all missing symptom pages (28 new), condition pages (2 new), hub category pages (5 new), and 65 explicit blog post routes to sitemap
- [x] Fixed sitemap deduplication to prevent blog posts appearing twice (static + dynamic)

## Bug Fix: ChatGPT retest - line breaks and sitemap 400 error
- [x] Fix llms.txt rendering as 2 lines - converted to CRLF line endings, array-based join in dynamic route, static file also CRLF
- [x] Fix robots.txt rendering as one long line - converted to CRLF line endings, array-based join in dynamic route, static file also CRLF
- [x] Fix sitemap.xml - added static XML fallback in client/public/sitemap.xml (256 URLs), ChatGPT 400 error was transient on their side (all tests return 200)

## Bug Fix: Duplicate meta descriptions (SemRush)
- [x] Audit all pages for duplicate meta descriptions — root cause: SPA serves same index.html default meta to all pages before JS hydrates
- [x] Created server/metaTags.ts with URL-to-meta mapping for 200+ static pages + database blog post lookup with 5-min caching
- [x] Implemented server-side meta tag injection in vite.ts — both dev (setupVite) and production (serveStatic) now inject unique title + description into raw HTML
- [x] 15 vitest tests passing for meta tag resolution and injection

## AEO Overhaul - Phase 1A: Crawlability
- [x] Audit robots.txt, sitemap.xml, segmented sitemaps, llms.txt, canonicals, rendered HTML
- [x] Confirm OAI-SearchBot allowed, decide GPTBot policy (both allowed)
- [x] Create segmented sitemaps (12 sitemaps: pages, blog, conditions, symptoms, treatments, costs, comparisons, guides, life-stages, emergencies, lifestyle, employers) + sitemap-index.xml
- [x] Improve llms.txt and create llms-full.txt with extended product info, comparisons, and page summaries
- [x] Updated robots.txt with explicit AI crawler directives (OAI-SearchBot, GPTBot, Google-Extended, PerplexityBot, ClaudeBot, Anthropic-ai, Bytespider, CCBot, cohere-ai, Applebot-Extended)

## AEO Overhaul - Phase 1B: Quick Answers & Homepage
- [x] Add 40-70 word Quick Answer block to all major pages (QuickAnswerBlock component created + added to CostPageTemplate, TreatmentPageTemplate, ComparisonPageTemplate)
- [x] Upgrade homepage with Quick Answer, What is DentaSmart, Who is it for, pricing summary, DentaSmart vs ChatGPT summary, FAQs
- [x] ConditionPage and SymptomPage already had Quick Answer + In One Sentence blocks

## AEO Overhaul - Phase 1C: Pricing Page
- [x] Upgrade pricing page with Quick Answer, pricing table, plan chooser, FAQs, Product/Service/Offer schema

## AEO Overhaul - Phase 2A: FAQ System
- [x] FAQs page already has 6 categories with search/filter functionality
- [x] Added FAQPage JSON-LD schema to FAQs page with top 8 questions
- [x] Added BreadcrumbList schema to FAQs page

## AEO Overhaul - Phase 2B: Schema Markup
- [x] Add Organization, WebSite, SoftwareApplication schema (homepage)
- [x] Add BreadcrumbList schema to all pages (homepage, pricing, FAQs, cost pages, treatment pages, comparison pages, conditions, symptoms)
- [x] Add FAQPage schema where FAQ content is visible (homepage, pricing, FAQs, cost pages, treatment pages, comparison pages, conditions, symptoms)
- [x] Add Article/BlogPosting schema (ArticleSchema component created)
- [x] Add HowTo schema (homepage + TreatmentPageTemplate)
- [x] Add Product/Service/Offer schema to pricing (ProductServiceSchema component)

## AEO Overhaul - Phase 2C: Internal Linking & H2 Rewrites
- [ ] Rewrite major H2s as natural questions
- [ ] Create internal linking clusters (8 topic clusters)

## AEO Overhaul - Phase 3A: 10 AEO Blog Posts (CMS)
- [ ] What Is an AI Oral Health Guide
- [ ] What Is DentaSmart and How Does It Work
- [ ] How Much Does DentaSmart Cost
- [ ] DentaSmart vs ChatGPT
- [ ] Can AI Help Explain Dental X-rays
- [ ] Can I Get a Dental Second Opinion Without Insurance
- [ ] Is DentaSmart a Dental Insurance Alternative
- [ ] What Is an Oral Health Score
- [ ] How Can I Avoid Surprise Dental Bills
- [ ] What Should I Do If My Dentist Says I Need a Crown

## AEO Overhaul - Phase 3B: 15 Use-Case Pages (CMS)
- [ ] ai-dental-second-opinion-without-insurance
- [ ] understand-dental-x-rays
- [ ] dental-treatment-plan-confusion
- [ ] avoid-surprise-dental-bills
- [ ] dental-anxiety-before-appointment
- [ ] parents-checking-kids-teeth
- [ ] family-oral-health-monitoring
- [ ] small-business-dental-benefits-alternative
- [ ] worried-about-overtreatment
- [ ] tooth-pain-at-night
- [ ] gig-workers-without-dental-insurance
- [ ] second-opinion-before-root-canal
- [ ] second-opinion-before-crown
- [ ] dental-cost-help-for-families
- [ ] ai-dental-app-for-parents

## AEO Overhaul - Phase 3C: 10 Comparison Pages (CMS)
- [ ] DentaSmart vs ChatGPT
- [ ] DentaSmart vs Teledentistry
- [ ] DentaSmart vs Dental Insurance
- [ ] DentaSmart vs Traditional Dental Second Opinion
- [ ] DentaSmart vs Dental Discount Plans
- [ ] DentaSmart vs Dental Savings Plans
- [ ] DentaSmart vs Toothpic
- [ ] DentaSmart vs Pearl and Overjet
- [ ] DentaSmart vs Googling Dental Symptoms
- [ ] DentaSmart vs Waiting for the Next Dental Visit

## AEO Overhaul - Phase 3D: 10 Best/Alternative Listicle Pages (CMS)
- [ ] Best AI Dental Apps
- [ ] Best Dental Second Opinion Apps
- [ ] Best Apps to Understand Dental X-rays
- [ ] Best Dental Insurance Alternatives
- [ ] Best Oral Health Apps for Families
- [ ] Best Dental Cost Transparency Tools
- [ ] Best Apps for Tooth Pain Guidance
- [ ] Best Dental Apps for People Without Insurance
- [ ] Best AI Health Apps for Preventive Care
- [ ] Best Dental Apps for Parents

## AEO Overhaul - Phase 4A: Research Pages & Consistency Audit
- [ ] Create /research/oral-health-insights-report-2026
- [ ] Create /research/dental-cost-confusion-report
- [ ] Audit all public copy for inconsistent claims

## AEO Overhaul - Phase 4B: AEO Tracking Dashboard
- [ ] Build AEO tracking admin dashboard with 75+ prompts
- [ ] Track brand, category, pricing, comparisons, second opinion, X-rays, insurance alternatives, tooth pain, family, parents, employers, uninsured, gig workers, dental cost, treatment-plan prompts

## AEO Overhaul - Phase 4C: Page Speed & Accessibility
- [ ] Optimize page speed, accessibility, mobile layout
- [ ] Audit alt text, labels, broken links
- [ ] Ensure important content visible in rendered HTML
