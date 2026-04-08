/**
 * All dynamic page slugs for explicit route registration in App.tsx.
 * The Manus deployment platform auto-generates /sitemap.xml by scanning
 * static string literal paths in <Route path="..."> components.
 * By listing every slug here and rendering explicit routes, the platform
 * will include all pages in the sitemap.
 *
 * IMPORTANT: When adding a new blog post, condition, symptom, or guide,
 * add its slug to the appropriate array below so it appears in the sitemap.
 */

export const CONDITION_SLUGS = [
  "toothache",
  "cavities",
  "gum-disease",
  "wisdom-teeth-pain",
  "teeth-whitening",
  "sensitive-teeth",
  "cracked-tooth",
  "dental-abscess",
  "root-canal",
  "dental-crown",
  "teeth-grinding",
  "dental-implants",
  "dry-socket",
  "oral-thrush",
  "tmj-disorder",
] as const;

export const SYMPTOM_SLUGS = [
  "tooth-pain-when-biting",
  "bleeding-gums",
  "tooth-sensitivity",
  "jaw-pain",
  "bad-breath",
  "swollen-gums",
  "loose-tooth",
  "dry-mouth",
  "tooth-discoloration",
  "mouth-sores",
] as const;

export const GUIDE_SLUGS = [
  "brushing-guide",
  "flossing-guide",
  "dental-visit-guide",
] as const;

export const COMPARE_SLUGS = [
  "dentasmart-vs-chatgpt-dental",
  "dentasmart-vs-teledentistry",
  "dentasmart-vs-dental-insurance",
] as const;

export const HUB_CATEGORY_SLUGS = [
  "understanding-dental-conditions",
  "treatment-guides",
  "prevention-tips",
  "dental-technology",
  "cost-and-insurance",
] as const;

export const DENTAL_COST_SLUGS = [
  "root-canal-cost",
  "dental-implant-cost",
  "braces-cost",
  "veneers-cost",
  "wisdom-teeth-removal-cost",
  "teeth-whitening-cost",
  "dental-crown-cost",
  "tooth-extraction-cost",
  "dental-cleaning-cost",
  "dentures-cost",
] as const;

export const COMPARISON_SLUGS = [
  "braces-vs-invisalign",
  "dental-implants-vs-dentures",
  "crown-vs-veneer",
  "electric-vs-manual-toothbrush",
  "fluoride-vs-fluoride-free-toothpaste",
] as const;

export const TREATMENT_SLUGS = [
  "root-canal-procedure",
  "dental-implant-procedure",
  "wisdom-teeth-removal",
  "dental-crown-procedure",
  "braces-treatment",
  "teeth-whitening-procedure",
  "tooth-extraction-procedure",
  "dental-cleaning-procedure",
  "veneers-procedure",
  "dentures-treatment",
] as const;

export const LIFE_STAGE_SLUGS = [
  "baby-teething-guide",
  "childrens-dental-health",
  "teen-braces-guide",
  "pregnancy-dental-care",
  "senior-dental-care",
] as const;

export const EMERGENCY_SLUGS = [
  "knocked-out-tooth",
  "dental-emergency-guide",
  "broken-tooth",
  "severe-toothache",
  "dental-abscess",
] as const;

export const BLOG_POST_SLUGS = [
  "dental-emergency-what-to-do",
  "pregnancy-dental-health",
  "brushing-teeth-prevent-dementia",
  "electric-vs-manual-toothbrush",
  "at-what-age-should-my-child-first-see-a-dentist",
  "how-do-i-know-its-time-for-dental-implants",
  "gums-hurt-when-flossing",
  "swollen-gums-around-one-tooth",
  "black-line-on-tooth",
  "gum-boil",
  "mouth-ulcer-not-healing",
  "loose-tooth-adults",
  "filling-feels-high-pain-biting",
  "tooth-hurts-cold-water",
  "crown-pain-sensitivity",
  "bone-loss-dental-xray",
  "teeth-grinding-bruxism",
  "jaw-pain-tmj",
  "canker-sore-vs-cold-sore",
  "white-spots-on-teeth",
  "root-canal-symptoms",
  "bad-breath-halitosis",
  "wisdom-tooth-pain",
  "tooth-abscess-infection",
  "cracked-tooth-symptoms",
  "cavity-symptoms-tooth-decay",
  "gum-recession",
  "bleeding-gums",
  "tooth-sensitivity-cold-hot",
  "pain-when-biting-or-chewing",
  "tooth-pain-toothache",
  "how-can-ai-detect-a-cavity-in-my-dental-xray",
  "maximize-benefits",
  "employer-dental-plans",
  "no-insurance-options",
  "cosmetic-vs-necessary",
  "pre-authorization",
  "waiting-periods",
  "in-network-confusion",
  "insurance-limitations",
  "denied-claims",
  "misleading-insurance",
  "enamel-erosion",
  "missing-teeth",
  "cracked-tooth",
  "bad-breath",
  "stained-teeth",
  "teeth-grinding",
  "wisdom-teeth-confusion",
  "tooth-sensitivity",
  "silent-gum-disease",
  "undetected-cavities",
  "choosing-right-dentist",
  "communication-gap",
  "preventive-care-gap",
  "overtreatment-concerns",
  "fear-of-dentist",
  "cost-transparency",
  "second-opinions",
  "questioning-recommendations",
  "rushed-decisions",
  "unclear-diagnoses",
] as const;
