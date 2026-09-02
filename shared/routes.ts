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
 * inSitemap: false — route is excluded from all sitemaps (utility pages,
 *                     redirect aliases). Defaults to true when omitted.
 *
 * priority / changefreq / lastmod — per-route overrides. When omitted, the
 *   per-type defaults defined in server/seo.ts are used.
 *
 * ── Data-driven sections ─────────────────────────────────────────────────────
 * Symptoms, Conditions, and Guides are derived automatically from their data
 * files (client/src/data/{symptoms,conditions,guides}.ts). Adding a new entry
 * to those files is sufficient — no manual update to this manifest is needed.
 *
 * Client-side redirect aliases (routes that exist in App.tsx but render no
 * content and bounce via window.location.replace) are kept as hardcoded
 * entries below with inSitemap: true until they are converted to server-side
 * 301s. Once converted, the server-side redirect filter in seo.ts will exclude
 * them automatically and the hardcoded entries can be removed.
 */

import { symptomsData } from "../client/src/data/symptoms";
import { conditionsData } from "../client/src/data/conditions";
import { guidesData } from "../client/src/data/guides";
import { hubCategoryData } from "../client/src/data/hubCategories";

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

// ── Derived route helpers ─────────────────────────────────────────────────────

/**
 * Build RouteEntry objects from a data-file Record whose keys are slugs.
 * The label is derived from the entry's `title` field when present, otherwise
 * the slug is title-cased. All entries use the supplied type/priority/changefreq.
 */
function deriveEntries<T extends { title?: string; slug?: string }>(
  data: Record<string, T>,
  prefix: string,
  type: PageType,
  priority: string,
  changefreq: string,
): RouteEntry[] {
  return Object.entries(data).map(([slug, entry]) => ({
    path: `${prefix}${slug}`,
    label: entry.title ?? slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
    type,
    priority,
    changefreq,
  }));
}

const derivedSymptoms = deriveEntries(symptomsData, "/symptoms/", "Symptom", "0.8", "monthly");
const derivedConditions = deriveEntries(conditionsData, "/conditions/", "Condition", "0.8", "monthly");
const derivedGuides = deriveEntries(guidesData, "/guides/", "Guide", "0.8", "monthly");

// /hub/:category pages — derived from hubCategoryData so adding a new category
// automatically produces a staticRoute + sitemap entry without manual edits here.
const derivedHubCategories: RouteEntry[] = Object.keys(hubCategoryData).map((slug) => ({
  path: `/hub/${slug}`,
  label: `Hub: ${hubCategoryData[slug].heading}`,
  type: "Hub" as const,
  priority: "0.8",
  changefreq: "weekly" as const,
}));

// ── Static route manifest ─────────────────────────────────────────────────────

const staticOnlyRoutes: RouteEntry[] = [
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
  { path: "/editorial-policy", label: "Editorial Policy", type: "Single Page", priority: "0.3", changefreq: "yearly" },
  { path: "/corrections-policy", label: "Corrections Policy", type: "Single Page", priority: "0.3", changefreq: "yearly" },
  { path: "/ai-use-disclosure", label: "AI Use Disclosure", type: "Single Page", priority: "0.3", changefreq: "yearly" },
  { path: "/product-facts", label: "Product Facts", type: "Single Page", priority: "0.4", changefreq: "monthly" },
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
  // Redirect aliases — excluded from sitemap (server-side 301 pending)
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
  // NOTE: /hub/* content pages are derived from hubCategoryData in derivedHubCategories below.
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

  // ── Conditions — client-side redirect aliases (no content in conditionsData, pending server-side 301) ──
  // /conditions/cavities and /conditions/oral-thrush are NOT listed here — they exist in conditionsData
  // and are already generated by deriveEntries above. Adding them here would create duplicate <loc> entries.
  // Only slugs that are NOT in conditionsData belong here.
  { path: "/conditions/dry-mouth", label: "Dry Mouth (client redirect alias)", type: "Condition" },
  { path: "/conditions/tooth-sensitivity", label: "Tooth Sensitivity (client redirect alias)", type: "Condition" },

  // ── Symptoms — client-side redirect aliases (no content in symptomsData, pending server-side 301) ──
  // /symptoms/loose-tooth and /symptoms/tooth-sensitivity are NOT listed here — they exist in symptomsData
  // and are already generated by deriveEntries above. Adding them here would create duplicate <loc> entries.
  // Only slugs that are NOT in symptomsData belong here.
  { path: "/symptoms/cracked-tooth", label: "Cracked Tooth (client redirect alias)", type: "Symptom" },
  { path: "/symptoms/sensitive-teeth", label: "Sensitive Teeth (client redirect alias)", type: "Symptom" },
  { path: "/symptoms/toothache", label: "Toothache (client redirect alias)", type: "Symptom" },

  // ── Hub — JS redirect aliases (no content, pending server-side 301 conversion) ──
  // These paths exist in App.tsx as window.location.replace() stubs.
  // They are excluded from the sitemap but must be in staticRoutes so isKnownRoute()
  // does not log them as 404s. Convert to server-side 301s to remove these entries.
  { path: "/oral-health-hub/ai-detect-cavity-dental-xray", label: "AI Detect Cavity (JS redirect alias)", type: "Hub", inSitemap: false },
  { path: "/oral-health-hub/cavity-symptoms", label: "Cavity Symptoms (JS redirect alias)", type: "Hub", inSitemap: false },
  { path: "/oral-health-hub/how-to-brush-your-teeth", label: "How to Brush Your Teeth (JS redirect alias)", type: "Hub", inSitemap: false },
  { path: "/oral-health-hub/tooth-abscess", label: "Tooth Abscess (JS redirect alias)", type: "Hub", inSitemap: false },
  { path: "/oral-health-hub/tooth-pain", label: "Tooth Pain (JS redirect alias)", type: "Hub", inSitemap: false },
  { path: "/oral-health-hub/what-are-tonsil-stones-how-to-remove", label: "Tonsil Stones (JS redirect alias)", type: "Hub", inSitemap: false },
  { path: "/oral-health-hub/what-to-do-when-your-dentist-recommends-expensive-treatment-you-cant-afford", label: "Expensive Treatment (JS redirect alias)", type: "Hub", inSitemap: false },
  { path: "/oral-health-hub/wisdom-teeth-confusion", label: "Wisdom Teeth Confusion (JS redirect alias, server 301 exists)", type: "Hub", inSitemap: false },

  // ── Treatments ────────────────────────────────────────────────────────────
  { path: "/treatments/bone-grafting", label: "Bone Grafting (JS shim — redirects to /treatments)", type: "Treatment", priority: "0.85", changefreq: "monthly", inSitemap: false },
  { path: "/treatments/braces-treatment", label: "Braces Treatment", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  { path: "/treatments/dental-cleaning-procedure", label: "Dental Cleaning Procedure", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  { path: "/treatments/dental-crown-procedure", label: "Dental Crown Procedure", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  { path: "/treatments/dental-implant-procedure", label: "Dental Implant Procedure", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  { path: "/treatments/dentures-treatment", label: "Dentures Treatment", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  { path: "/treatments/full-mouth-dental-implants", label: "Full Mouth Dental Implants (JS shim — redirects to /treatments/dental-implant-procedure)", type: "Treatment", priority: "0.85", changefreq: "monthly", inSitemap: false },
  { path: "/treatments/root-canal-procedure", label: "Root Canal Procedure", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  { path: "/treatments/teeth-whitening-procedure", label: "Teeth Whitening Procedure", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  { path: "/treatments/tooth-extraction-procedure", label: "Tooth Extraction Procedure", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  { path: "/treatments/veneers-procedure", label: "Veneers Procedure", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  { path: "/treatments/wisdom-teeth-removal", label: "Wisdom Teeth Removal", type: "Treatment", priority: "0.85", changefreq: "monthly" },
  // Redirect aliases — excluded from sitemap
  { path: "/treatments/teeth-whitening", label: "Teeth Whitening (JS redirect alias, server 301 exists)", type: "Treatment", inSitemap: false },
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

  // ── Guides — redirect aliases (no content, pending server-side 301) ───────
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

/**
 * Complete route manifest: static routes + data-derived entries.
 *
 * Symptoms, conditions, guides, and hub categories are derived from their data
 * files at module load time. Any new entry added to those files automatically
 * appears here — no manual update to this manifest required.
 */
export const staticRoutes: RouteEntry[] = [
  ...staticOnlyRoutes,
  ...derivedSymptoms,
  ...derivedConditions,
  ...derivedGuides,
  ...derivedHubCategories,
];
