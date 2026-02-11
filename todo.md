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
