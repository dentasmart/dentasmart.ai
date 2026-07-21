/**
 * Static page route manifest — metadata only.
 *
 * This file is the single source of truth for all non-admin, non-blog static
 * routes registered in App.tsx. It is imported by:
 *   - server/pagesRouter.ts  (admin Pages audit tool)
 *   - server/seo.ts          (segmented sitemap generation)
 *
 * ⚠️  MUST be kept in sync with App.tsx routes.
 *     Update this file whenever you add or remove a page in App.tsx.
 *     Do NOT add component references here — this file is imported by server
 *     code and must remain free of any client-side imports.
 *
 * inSitemap: false  — route is excluded from all sitemaps (utility pages,
 *                     redirect aliases). Defaults to true when omitted.
 *
 * priority / changefreq / lastmod — per-route overrides. When omitted, the
 *   per-type defaults defined in server/seo.ts are used.
 */

export type PageType =
  | "Single Page"
  | "Index"
  | "Condition"
  | "Symptom"
  | "Treatment"
  | "Dental Cost"
  | "Comparison"
  | "Guide"
  | "Life Stage"
  | "Lifestyle"
  | "Dental Emergency"
  | "Hub"
  | "Employer";

export interface RouteEntry {
  path: string;
  label: string;
  type: PageType;
  /** When false, this route is excluded from all sitemaps. Defaults to true. */
  inSitemap?: boolean;
  /** Per-route sitemap priority override (e.g. "0.9"). Uses type default when omitted. */
  priority?: string;
  /** Per-route sitemap changefreq override. Uses type default when omitted. */
  changefreq?: string;
  /** Per-route sitemap lastmod override (YYYY-MM-DD). Uses type default when omitted. */
  lastmod?: string;
}

export const staticRoutes: RouteEntry[] = [
  // ── Single Pages ──────────────────────────────────────────────────────────
  { path: "/", label: "Home", type: "Single Page", priority: "1.0", changefreq: "weekly" },
  { path: "/how-it-works", label: "How It Works", type: "Single Page", priority: "0.9", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/features", label: "Features", type: "Single Page", priority: "0.9", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/pricing", label: "Pricing", type: "Single Page", priority: "0.9", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/employers", label: "Employers", type: "Employer", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-01" },
  { path: "/team", label: "Team", type: "Employer", priority: "0.7", changefreq: "monthly", lastmod: "2026-03-01" },
  { path: "/faqs", label: "FAQs", type: "Single Page", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/privacy-policy", label: "Privacy Policy", type: "Single Page", priority: "0.3", changefreq: "yearly", lastmod: "2026-01-01" },
  { path: "/terms-of-service", label: "Terms of Service", type: "Single Page", priority: "0.3", changefreq: "yearly", lastmod: "2026-01-01" },
  // Utility pages — excluded from sitemap
  { path: "/account-deletion", label: "Account Deletion", type: "Single Page", inSitemap: false },
  { path: "/invite", label: "Invite", type: "Single Page", inSitemap: false },
  { path: "/invite/success", label: "Invite Success", type: "Single Page", inSitemap: false },
  { path: "/404", label: "404 Not Found", type: "Single Page", inSitemap: false },
  { path: "/stories", label: "Stories", type: "Single Page", priority: "0.6", changefreq: "monthly", lastmod: "2026-03-01" },
  { path: "/download", label: "Download", type: "Single Page", priority: "0.9", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/instant-scan", label: "Instant Scan", type: "Single Page", priority: "0.9", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/free-ai-teeth-scanner", label: "Free AI Teeth Scanner", type: "Single Page", priority: "0.9", changefreq: "monthly" },
  { path: "/best-ai-dental-apps", label: "Best AI Dental Apps", type: "Single Page", priority: "0.8", changefreq: "monthly" },
  { path: "/photo-guide", label: "Photo Guide", type: "Single Page", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-01" },
  { path: "/answers", label: "Answers", type: "Single Page", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/find-a-dentist", label: "Find a Dentist", type: "Single Page", priority: "0.7", changefreq: "monthly", lastmod: "2026-03-01" },
  { path: "/symptom-quiz", label: "Symptom Quiz", type: "Single Page", priority: "0.9", changefreq: "weekly" },
  // Redirect aliases — excluded from sitemap (redirect fires before page renders)
  { path: "/symptom-checker", label: "Symptom Checker", type: "Single Page", inSitemap: false },
  { path: "/affordability", label: "Affordability", type: "Single Page", inSitemap: false },
  { path: "/prevention", label: "Prevention", type: "Single Page", inSitemap: false },
  { path: "/second-opinion", label: "Second Opinion", type: "Single Page", inSitemap: false },
  { path: "/vs/dental-com", label: "VS Dental.com", type: "Single Page", priority: "0.8", changefreq: "monthly" },
  { path: "/vs/dentistry-one", label: "VS Dentistry One", type: "Single Page", priority: "0.8", changefreq: "monthly" },

  // ── Index Pages ───────────────────────────────────────────────────────────
  // /hub is a redirect alias — excluded from sitemap
  { path: "/hub", label: "Oral Health Hub (redirect alias)", type: "Index", inSitemap: false },
  { path: "/conditions", label: "Conditions Index", type: "Index", priority: "0.8", changefreq: "weekly" },
  { path: "/symptoms", label: "Symptoms Index", type: "Index", priority: "0.8", changefreq: "weekly" },
  { path: "/treatments", label: "Treatments Index", type: "Index", priority: "0.9", changefreq: "weekly" },
  { path: "/dental-costs", label: "Dental Costs Index", type: "Index", priority: "0.9", changefreq: "weekly" },
  { path: "/comparisons", label: "Comparisons Index", type: "Index", priority: "0.9", changefreq: "weekly" },
  { path: "/guides", label: "Guides Index", type: "Index", priority: "0.8", changefreq: "weekly" },
  { path: "/life-stages", label: "Life Stages Index", type: "Index", priority: "0.9", changefreq: "monthly" },
  { path: "/lifestyle", label: "Lifestyle Index", type: "Index", priority: "0.9", changefreq: "monthly" },
  { path: "/dental-emergencies", label: "Dental Emergencies Index", type: "Index", priority: "0.9", changefreq: "monthly" },

  // ── Hub Sub-pages (canonical /oral-health-hub/* paths) ────────────────────
  { path: "/oral-health-hub", label: "Oral Health Hub", type: "Hub", priority: "0.8", changefreq: "weekly" },
  { path: "/oral-health-hub/affordability", label: "Hub: Affordability", type: "Hub", priority: "0.9", changefreq: "weekly" },
  { path: "/oral-health-hub/second-opinion", label: "Hub: Second Opinion", type: "Hub", priority: "0.8", changefreq: "weekly" },
  { path: "/oral-health-hub/prevention", label: "Hub: Prevention", type: "Hub", priority: "0.8", changefreq: "weekly" },
  { path: "/oral-health-hub/conditions", label: "Hub: Conditions", type: "Hub", priority: "0.9", changefreq: "weekly" },
  { path: "/oral-health-hub/symptoms", label: "Hub: Symptoms", type: "Hub", priority: "0.9", changefreq: "weekly" },
  // /hub/* redirect aliases — excluded from sitemap
  { path: "/hub/affordability", label: "Hub: Affordability (redirect alias)", type: "Hub", inSitemap: false },
  { path: "/hub/cost-and-insurance", label: "Hub: Cost & Insurance (redirect alias)", type: "Hub", inSitemap: false },
  { path: "/hub/dental-technology", label: "Hub: Dental Technology (redirect alias)", type: "Hub", inSitemap: false },
  { path: "/hub/prevention", label: "Hub: Prevention (redirect alias)", type: "Hub", inSitemap: false },
  { path: "/hub/prevention-tips", label: "Hub: Prevention Tips (redirect alias)", type: "Hub", inSitemap: false },
  { path: "/hub/second-opinion", label: "Hub: Second Opinion (redirect alias)", type: "Hub", inSitemap: false },
  { path: "/hub/treatment-guides", label: "Hub: Treatment Guides (redirect alias)", type: "Hub", inSitemap: false },
  { path: "/hub/understanding-dental-conditions", label: "Hub: Understanding Dental Conditions (redirect alias)", type: "Hub", inSitemap: false },

  // ── Comparisons ───────────────────────────────────────────────────────────
  { path: "/compare/dentasmart-vs-chatgpt-dental", label: "DentaSmart vs ChatGPT Dental", type: "Comparison", priority: "0.85", changefreq: "monthly" },
  { path: "/compare/dentasmart-vs-teledentistry", label: "DentaSmart vs Teledentistry", type: "Comparison", priority: "0.85", changefreq: "monthly" },
  { path: "/compare/dentasmart-vs-dental-insurance", label: "DentaSmart vs Dental Insurance", type: "Comparison", priority: "0.85", changefreq: "monthly" },
  { path: "/comparisons/braces-vs-invisalign", label: "Braces vs Invisalign", type: "Comparison", priority: "0.85", changefreq: "monthly" },
  { path: "/comparisons/crown-vs-veneer", label: "Crown vs Veneer", type: "Comparison", priority: "0.85", changefreq: "monthly" },
  { path: "/comparisons/dental-implants-vs-dentures", label: "Dental Implants vs Dentures", type: "Comparison", priority: "0.85", changefreq: "monthly" },
  { path: "/comparisons/electric-vs-manual-toothbrush", label: "Electric vs Manual Toothbrush", type: "Comparison", priority: "0.85", changefreq: "monthly" },
  { path: "/comparisons/fluoride-vs-fluoride-free-toothpaste", label: "Fluoride vs Fluoride-Free Toothpaste", type: "Comparison", priority: "0.85", changefreq: "monthly" },
  // Redirect alias — excluded from sitemap
  { path: "/comparisons/invisalign-vs-braces", label: "Invisalign vs Braces (redirect alias)", type: "Comparison", inSitemap: false },

  // ── Conditions ────────────────────────────────────────────────────────────
  { path: "/conditions/cavities", label: "Cavities", type: "Condition", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/cracked-tooth", label: "Cracked Tooth", type: "Condition", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/dental-abscess", label: "Dental Abscess", type: "Condition", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/dental-crown", label: "Dental Crown", type: "Condition", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/dental-implants", label: "Dental Implants", type: "Condition", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/dry-mouth", label: "Dry Mouth", type: "Condition", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/dry-socket", label: "Dry Socket", type: "Condition", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/gingivitis-vs-periodontitis", label: "Gingivitis vs Periodontitis", type: "Condition", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/conditions/gum-disease", label: "Gum Disease", type: "Condition", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/oral-thrush", label: "Oral Thrush", type: "Condition", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/periodontitis", label: "Periodontitis", type: "Condition", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/conditions/root-canal", label: "Root Canal", type: "Condition", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/sensitive-teeth", label: "Sensitive Teeth", type: "Condition", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/teeth-grinding", label: "Teeth Grinding", type: "Condition", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/teeth-whitening", label: "Teeth Whitening", type: "Condition", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/tmj-disorder", label: "TMJ Disorder", type: "Condition", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/toothache", label: "Toothache", type: "Condition", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/wisdom-teeth-pain", label: "Wisdom Teeth Pain", type: "Condition", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/tooth-sensitivity", label: "Tooth Sensitivity", type: "Condition", priority: "0.8", changefreq: "monthly", lastmod: "2026-05-07" },

  // ── Symptoms ──────────────────────────────────────────────────────────────
  { path: "/symptoms/aphthous-ulcers", label: "Aphthous Ulcers", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/bad-breath", label: "Bad Breath", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/bite-changes", label: "Bite Changes", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/bleeding-gums", label: "Bleeding Gums", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/canker-sores", label: "Canker Sores", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/cheek-biting", label: "Cheek Biting", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/cracked-tooth", label: "Cracked Tooth (Symptom)", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/dental-caries", label: "Dental Caries", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/dry-mouth", label: "Dry Mouth (Symptom)", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/enamel-erosion", label: "Enamel Erosion", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/enamel-hypersensitivity", label: "Enamel Hypersensitivity", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/facial-swelling", label: "Facial Swelling", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/gingivitis", label: "Gingivitis (Symptom)", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/gum-bleeding-after-brushing", label: "Gum Bleeding After Brushing", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/gum-inflammation", label: "Gum Inflammation", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/gum-itching", label: "Gum Itching", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/gum-tenderness", label: "Gum Tenderness", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/jaw-clicking", label: "Jaw Clicking", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/jaw-pain", label: "Jaw Pain", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/leukoplakia", label: "Leukoplakia", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/loose-tooth", label: "Loose Tooth", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/mouth-numbness", label: "Mouth Numbness", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/mouth-sores", label: "Mouth Sores", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/mouth-ulcers", label: "Mouth Ulcers", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/oral-lichen-planus", label: "Oral Lichen Planus", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/oral-thrush", label: "Oral Thrush (Symptom)", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/periodontal-disease", label: "Periodontal Disease", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/persistent-metallic-taste", label: "Persistent Metallic Taste", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/root-exposure", label: "Root Exposure", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/sensitive-teeth", label: "Sensitive Teeth (Symptom)", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/swollen-gums", label: "Swollen Gums", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/swollen-lymph-nodes-dental", label: "Swollen Lymph Nodes (Dental)", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/teeth-grinding", label: "Teeth Grinding (Symptom)", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/tmj-disorder", label: "TMJ Disorder (Symptom)", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/tongue-pain", label: "Tongue Pain", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/tooth-discoloration", label: "Tooth Discoloration", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/tooth-migration", label: "Tooth Migration", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/tooth-pain-when-biting", label: "Tooth Pain When Biting", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/tooth-sensitivity", label: "Tooth Sensitivity", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/tooth-staining", label: "Tooth Staining", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/toothache", label: "Toothache (Symptom)", type: "Symptom", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },

  // ── Treatments ────────────────────────────────────────────────────────────
  { path: "/treatments/bone-grafting", label: "Bone Grafting", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  { path: "/treatments/braces-treatment", label: "Braces Treatment", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  { path: "/treatments/dental-cleaning-procedure", label: "Dental Cleaning Procedure", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  { path: "/treatments/dental-crown-procedure", label: "Dental Crown Procedure", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  { path: "/treatments/dental-implant-procedure", label: "Dental Implant Procedure", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  { path: "/treatments/dentures-treatment", label: "Dentures Treatment", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  { path: "/treatments/full-mouth-dental-implants", label: "Full Mouth Dental Implants", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  { path: "/treatments/root-canal-procedure", label: "Root Canal Procedure", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  { path: "/treatments/teeth-whitening-procedure", label: "Teeth Whitening Procedure", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  { path: "/treatments/tooth-extraction-procedure", label: "Tooth Extraction Procedure", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  { path: "/treatments/veneers-procedure", label: "Veneers Procedure", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  { path: "/treatments/wisdom-teeth-removal", label: "Wisdom Teeth Removal", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  // Redirect aliases — excluded from sitemap
  { path: "/treatments/dental-crowns", label: "Dental Crowns (redirect alias)", type: "Treatment", inSitemap: false },
  { path: "/treatments/gingivitis", label: "Gingivitis Treatment (redirect alias)", type: "Treatment", inSitemap: false },
  { path: "/treatments/invisalign", label: "Invisalign (redirect alias)", type: "Treatment", inSitemap: false },
  { path: "/treatments/veneers", label: "Veneers (redirect alias)", type: "Treatment", inSitemap: false },

  // ── Dental Costs ──────────────────────────────────────────────────────────
  { path: "/dental-costs/braces-cost", label: "Braces Cost", type: "Dental Cost", priority: "0.9", changefreq: "monthly" },
  { path: "/dental-costs/dental-cleaning-cost", label: "Dental Cleaning Cost", type: "Dental Cost", priority: "0.9", changefreq: "monthly" },
  { path: "/dental-costs/dental-crown-cost", label: "Dental Crown Cost", type: "Dental Cost", priority: "0.9", changefreq: "monthly" },
  { path: "/dental-costs/dental-implant-cost", label: "Dental Implant Cost", type: "Dental Cost", priority: "0.9", changefreq: "monthly" },
  { path: "/dental-costs/dentures-cost", label: "Dentures Cost", type: "Dental Cost", priority: "0.9", changefreq: "monthly" },
  { path: "/dental-costs/root-canal-cost", label: "Root Canal Cost", type: "Dental Cost", priority: "0.9", changefreq: "monthly" },
  { path: "/dental-costs/teeth-whitening-cost", label: "Teeth Whitening Cost", type: "Dental Cost", priority: "0.9", changefreq: "monthly" },
  { path: "/dental-costs/tooth-extraction-cost", label: "Tooth Extraction Cost", type: "Dental Cost", priority: "0.9", changefreq: "monthly" },
  { path: "/dental-costs/veneers-cost", label: "Veneers Cost", type: "Dental Cost", priority: "0.9", changefreq: "monthly" },
  { path: "/dental-costs/wisdom-teeth-removal-cost", label: "Wisdom Teeth Removal Cost", type: "Dental Cost", priority: "0.9", changefreq: "monthly" },
  // Redirect aliases — excluded from sitemap
  { path: "/dental-costs/dental-cleaning", label: "Dental Cleaning Cost (redirect alias)", type: "Dental Cost", inSitemap: false },
  { path: "/dental-costs/dental-implants-cost", label: "Dental Implants Cost (redirect alias)", type: "Dental Cost", inSitemap: false },

  // ── Guides ────────────────────────────────────────────────────────────────
  { path: "/guides/affordable-dental-care", label: "Affordable Dental Care", type: "Guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/brushing-guide", label: "Brushing Guide", type: "Guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/complete-oral-health-routine", label: "Complete Oral Health Routine", type: "Guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/crowns-vs-fillings", label: "Crowns vs Fillings", type: "Guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/dental-emergencies-on-a-budget", label: "Dental Emergencies on a Budget", type: "Guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/dental-insurance-alternatives", label: "Dental Insurance Alternatives", type: "Guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/dental-visit-guide", label: "Dental Visit Guide", type: "Guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/diy-dental-care", label: "DIY Dental Care", type: "Guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/do-you-need-root-canal", label: "Do You Need a Root Canal?", type: "Guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/flossing-guide", label: "Flossing Guide", type: "Guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/gum-disease-prevention", label: "Gum Disease Prevention", type: "Guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/how-to-prevent-cavities", label: "How to Prevent Cavities", type: "Guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/implants-vs-bridges", label: "Implants vs Bridges", type: "Guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/natural-teeth-whitening", label: "Natural Teeth Whitening", type: "Guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/oral-health-life-stages", label: "Oral Health Life Stages", type: "Guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/preventing-expensive-dental-problems", label: "Preventing Expensive Dental Problems", type: "Guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/when-to-get-dental-second-opinion", label: "When to Get a Dental Second Opinion", type: "Guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  // Redirect aliases — excluded from sitemap
  { path: "/guides/teeth-whitening", label: "Teeth Whitening Guide (redirect alias)", type: "Guide", inSitemap: false },
  { path: "/guides/when-to-get-second-opinion", label: "When to Get Second Opinion (redirect alias)", type: "Guide", inSitemap: false },

  // ── Life Stages ───────────────────────────────────────────────────────────
  { path: "/life-stages/baby-teething-guide", label: "Baby Teething Guide", type: "Life Stage", priority: "0.85", changefreq: "monthly" },
  { path: "/life-stages/childrens-dental-health", label: "Children's Dental Health", type: "Life Stage", priority: "0.85", changefreq: "monthly" },
  { path: "/life-stages/pregnancy-dental-care", label: "Pregnancy Dental Care", type: "Life Stage", priority: "0.85", changefreq: "monthly" },
  { path: "/life-stages/senior-dental-care", label: "Senior Dental Care", type: "Life Stage", priority: "0.85", changefreq: "monthly" },
  { path: "/life-stages/teen-braces-guide", label: "Teen Braces Guide", type: "Life Stage", priority: "0.85", changefreq: "monthly" },

  // ── Lifestyle ─────────────────────────────────────────────────────────────
  { path: "/lifestyle/diabetes-and-dental-care", label: "Diabetes & Dental Care", type: "Lifestyle", priority: "0.85", changefreq: "monthly" },
  { path: "/lifestyle/diet-and-teeth", label: "Diet & Teeth", type: "Lifestyle", priority: "0.85", changefreq: "monthly" },
  { path: "/lifestyle/oral-piercing-risks", label: "Oral Piercing Risks", type: "Lifestyle", priority: "0.85", changefreq: "monthly" },
  { path: "/lifestyle/smoking-and-oral-health", label: "Smoking & Oral Health", type: "Lifestyle", priority: "0.85", changefreq: "monthly" },
  { path: "/lifestyle/sports-mouthguards", label: "Sports Mouthguards", type: "Lifestyle", priority: "0.85", changefreq: "monthly" },

  // ── Dental Emergencies ────────────────────────────────────────────────────
  { path: "/dental-emergencies/broken-tooth", label: "Broken Tooth", type: "Dental Emergency", priority: "0.85", changefreq: "monthly" },
  { path: "/dental-emergencies/dental-abscess", label: "Dental Abscess (Emergency)", type: "Dental Emergency", priority: "0.85", changefreq: "monthly" },
  { path: "/dental-emergencies/dental-emergency-guide", label: "Dental Emergency Guide", type: "Dental Emergency", priority: "0.85", changefreq: "monthly" },
  { path: "/dental-emergencies/knocked-out-tooth", label: "Knocked Out Tooth", type: "Dental Emergency", priority: "0.85", changefreq: "monthly" },
  { path: "/dental-emergencies/severe-toothache", label: "Severe Toothache", type: "Dental Emergency", priority: "0.85", changefreq: "monthly" },
];
