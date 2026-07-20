/**
 * Static page route manifest — metadata only.
 *
 * This file is the single source of truth for all non-admin, non-blog static
 * routes registered in App.tsx. It is imported by:
 *   - server/pagesRouter.ts  (admin Pages audit tool)
 *
 * ⚠️  MUST be kept in sync with App.tsx routes.
 *     Update this file whenever you add or remove a page in App.tsx.
 *     Do NOT add component references here — this file is imported by server
 *     code and must remain free of any client-side imports.
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
  | "Hub";

export interface RouteEntry {
  path: string;
  label: string;
  type: PageType;
}

export const staticRoutes: RouteEntry[] = [
  // ── Single Pages ──────────────────────────────────────────────────────────
  { path: "/", label: "Home", type: "Single Page" },
  { path: "/how-it-works", label: "How It Works", type: "Single Page" },
  { path: "/features", label: "Features", type: "Single Page" },
  { path: "/pricing", label: "Pricing", type: "Single Page" },
  { path: "/employers", label: "Employers", type: "Single Page" },
  { path: "/team", label: "Team", type: "Single Page" },
  { path: "/faqs", label: "FAQs", type: "Single Page" },
  { path: "/privacy-policy", label: "Privacy Policy", type: "Single Page" },
  { path: "/terms-of-service", label: "Terms of Service", type: "Single Page" },
  { path: "/account-deletion", label: "Account Deletion", type: "Single Page" },
  { path: "/stories", label: "Stories", type: "Single Page" },
  { path: "/download", label: "Download", type: "Single Page" },
  { path: "/instant-scan", label: "Instant Scan", type: "Single Page" },
  { path: "/free-ai-teeth-scanner", label: "Free AI Teeth Scanner", type: "Single Page" },
  { path: "/best-ai-dental-apps", label: "Best AI Dental Apps", type: "Single Page" },
  { path: "/photo-guide", label: "Photo Guide", type: "Single Page" },
  { path: "/answers", label: "Answers", type: "Single Page" },
  { path: "/find-a-dentist", label: "Find a Dentist", type: "Single Page" },
  { path: "/symptom-quiz", label: "Symptom Quiz", type: "Single Page" },
  { path: "/symptom-checker", label: "Symptom Checker", type: "Single Page" },
  { path: "/affordability", label: "Affordability", type: "Single Page" },
  { path: "/prevention", label: "Prevention", type: "Single Page" },
  { path: "/second-opinion", label: "Second Opinion", type: "Single Page" },
  { path: "/invite", label: "Invite", type: "Single Page" },
  { path: "/invite/success", label: "Invite Success", type: "Single Page" },
  { path: "/404", label: "404 Not Found", type: "Single Page" },
  { path: "/vs/dental-com", label: "VS Dental.com", type: "Single Page" },
  { path: "/vs/dentistry-one", label: "VS Dentistry One", type: "Single Page" },

  // ── Index Pages ───────────────────────────────────────────────────────────
  { path: "/hub", label: "Oral Health Hub", type: "Index" },
  { path: "/conditions", label: "Conditions Index", type: "Index" },
  { path: "/symptoms", label: "Symptoms Index", type: "Index" },
  { path: "/treatments", label: "Treatments Index", type: "Index" },
  { path: "/dental-costs", label: "Dental Costs Index", type: "Index" },
  { path: "/comparisons", label: "Comparisons Index", type: "Index" },
  { path: "/guides", label: "Guides Index", type: "Index" },
  { path: "/life-stages", label: "Life Stages Index", type: "Index" },
  { path: "/lifestyle", label: "Lifestyle Index", type: "Index" },
  { path: "/dental-emergencies", label: "Dental Emergencies Index", type: "Index" },

  // ── Hub Sub-pages ─────────────────────────────────────────────────────────
  { path: "/hub/affordability", label: "Hub: Affordability", type: "Hub" },
  { path: "/hub/cost-and-insurance", label: "Hub: Cost & Insurance", type: "Hub" },
  { path: "/hub/dental-technology", label: "Hub: Dental Technology", type: "Hub" },
  { path: "/hub/prevention", label: "Hub: Prevention", type: "Hub" },
  { path: "/hub/prevention-tips", label: "Hub: Prevention Tips", type: "Hub" },
  { path: "/hub/second-opinion", label: "Hub: Second Opinion", type: "Hub" },
  { path: "/hub/treatment-guides", label: "Hub: Treatment Guides", type: "Hub" },
  { path: "/hub/understanding-dental-conditions", label: "Hub: Understanding Dental Conditions", type: "Hub" },

  // ── Comparisons ───────────────────────────────────────────────────────────
  { path: "/compare/dentasmart-vs-chatgpt-dental", label: "DentaSmart vs ChatGPT Dental", type: "Comparison" },
  { path: "/compare/dentasmart-vs-teledentistry", label: "DentaSmart vs Teledentistry", type: "Comparison" },
  { path: "/compare/dentasmart-vs-dental-insurance", label: "DentaSmart vs Dental Insurance", type: "Comparison" },
  { path: "/comparisons/braces-vs-invisalign", label: "Braces vs Invisalign", type: "Comparison" },
  { path: "/comparisons/crown-vs-veneer", label: "Crown vs Veneer", type: "Comparison" },
  { path: "/comparisons/dental-implants-vs-dentures", label: "Dental Implants vs Dentures", type: "Comparison" },
  { path: "/comparisons/electric-vs-manual-toothbrush", label: "Electric vs Manual Toothbrush", type: "Comparison" },
  { path: "/comparisons/fluoride-vs-fluoride-free-toothpaste", label: "Fluoride vs Fluoride-Free Toothpaste", type: "Comparison" },
  { path: "/comparisons/invisalign-vs-braces", label: "Invisalign vs Braces", type: "Comparison" },

  // ── Conditions ────────────────────────────────────────────────────────────
  { path: "/conditions/cavities", label: "Cavities", type: "Condition" },
  { path: "/conditions/cracked-tooth", label: "Cracked Tooth", type: "Condition" },
  { path: "/conditions/dental-abscess", label: "Dental Abscess", type: "Condition" },
  { path: "/conditions/dental-crown", label: "Dental Crown", type: "Condition" },
  { path: "/conditions/dental-implants", label: "Dental Implants", type: "Condition" },
  { path: "/conditions/dry-mouth", label: "Dry Mouth", type: "Condition" },
  { path: "/conditions/dry-socket", label: "Dry Socket", type: "Condition" },
  { path: "/conditions/gingivitis-vs-periodontitis", label: "Gingivitis vs Periodontitis", type: "Condition" },
  { path: "/conditions/gum-disease", label: "Gum Disease", type: "Condition" },
  { path: "/conditions/oral-thrush", label: "Oral Thrush", type: "Condition" },
  { path: "/conditions/periodontitis", label: "Periodontitis", type: "Condition" },
  { path: "/conditions/root-canal", label: "Root Canal", type: "Condition" },
  { path: "/conditions/sensitive-teeth", label: "Sensitive Teeth", type: "Condition" },
  { path: "/conditions/teeth-grinding", label: "Teeth Grinding", type: "Condition" },
  { path: "/conditions/teeth-whitening", label: "Teeth Whitening", type: "Condition" },
  { path: "/conditions/tmj-disorder", label: "TMJ Disorder", type: "Condition" },
  { path: "/conditions/toothache", label: "Toothache", type: "Condition" },
  { path: "/conditions/wisdom-teeth-pain", label: "Wisdom Teeth Pain", type: "Condition" },

  // ── Symptoms ──────────────────────────────────────────────────────────────
  { path: "/symptoms/aphthous-ulcers", label: "Aphthous Ulcers", type: "Symptom" },
  { path: "/symptoms/bad-breath", label: "Bad Breath", type: "Symptom" },
  { path: "/symptoms/bite-changes", label: "Bite Changes", type: "Symptom" },
  { path: "/symptoms/bleeding-gums", label: "Bleeding Gums", type: "Symptom" },
  { path: "/symptoms/canker-sores", label: "Canker Sores", type: "Symptom" },
  { path: "/symptoms/cheek-biting", label: "Cheek Biting", type: "Symptom" },
  { path: "/symptoms/cracked-tooth", label: "Cracked Tooth (Symptom)", type: "Symptom" },
  { path: "/symptoms/dental-caries", label: "Dental Caries", type: "Symptom" },
  { path: "/symptoms/dry-mouth", label: "Dry Mouth (Symptom)", type: "Symptom" },
  { path: "/symptoms/enamel-erosion", label: "Enamel Erosion", type: "Symptom" },
  { path: "/symptoms/enamel-hypersensitivity", label: "Enamel Hypersensitivity", type: "Symptom" },
  { path: "/symptoms/facial-swelling", label: "Facial Swelling", type: "Symptom" },
  { path: "/symptoms/gingivitis", label: "Gingivitis (Symptom)", type: "Symptom" },
  { path: "/symptoms/gum-bleeding-after-brushing", label: "Gum Bleeding After Brushing", type: "Symptom" },
  { path: "/symptoms/gum-inflammation", label: "Gum Inflammation", type: "Symptom" },
  { path: "/symptoms/gum-itching", label: "Gum Itching", type: "Symptom" },
  { path: "/symptoms/gum-tenderness", label: "Gum Tenderness", type: "Symptom" },
  { path: "/symptoms/jaw-clicking", label: "Jaw Clicking", type: "Symptom" },
  { path: "/symptoms/jaw-pain", label: "Jaw Pain", type: "Symptom" },
  { path: "/symptoms/leukoplakia", label: "Leukoplakia", type: "Symptom" },
  { path: "/symptoms/loose-tooth", label: "Loose Tooth", type: "Symptom" },
  { path: "/symptoms/mouth-numbness", label: "Mouth Numbness", type: "Symptom" },
  { path: "/symptoms/mouth-sores", label: "Mouth Sores", type: "Symptom" },
  { path: "/symptoms/mouth-ulcers", label: "Mouth Ulcers", type: "Symptom" },
  { path: "/symptoms/oral-lichen-planus", label: "Oral Lichen Planus", type: "Symptom" },
  { path: "/symptoms/oral-thrush", label: "Oral Thrush (Symptom)", type: "Symptom" },
  { path: "/symptoms/periodontal-disease", label: "Periodontal Disease", type: "Symptom" },
  { path: "/symptoms/persistent-metallic-taste", label: "Persistent Metallic Taste", type: "Symptom" },
  { path: "/symptoms/root-exposure", label: "Root Exposure", type: "Symptom" },
  { path: "/symptoms/sensitive-teeth", label: "Sensitive Teeth (Symptom)", type: "Symptom" },
  { path: "/symptoms/swollen-gums", label: "Swollen Gums", type: "Symptom" },
  { path: "/symptoms/swollen-lymph-nodes-dental", label: "Swollen Lymph Nodes (Dental)", type: "Symptom" },
  { path: "/symptoms/teeth-grinding", label: "Teeth Grinding (Symptom)", type: "Symptom" },
  { path: "/symptoms/tmj-disorder", label: "TMJ Disorder (Symptom)", type: "Symptom" },
  { path: "/symptoms/tongue-pain", label: "Tongue Pain", type: "Symptom" },
  { path: "/symptoms/tooth-discoloration", label: "Tooth Discoloration", type: "Symptom" },
  { path: "/symptoms/tooth-migration", label: "Tooth Migration", type: "Symptom" },
  { path: "/symptoms/tooth-pain-when-biting", label: "Tooth Pain When Biting", type: "Symptom" },
  { path: "/symptoms/tooth-sensitivity", label: "Tooth Sensitivity", type: "Symptom" },
  { path: "/symptoms/tooth-staining", label: "Tooth Staining", type: "Symptom" },
  { path: "/symptoms/toothache", label: "Toothache (Symptom)", type: "Symptom" },

  // ── Treatments ────────────────────────────────────────────────────────────
  { path: "/treatments/bone-grafting", label: "Bone Grafting", type: "Treatment" },
  { path: "/treatments/braces-treatment", label: "Braces Treatment", type: "Treatment" },
  { path: "/treatments/dental-cleaning-procedure", label: "Dental Cleaning Procedure", type: "Treatment" },
  { path: "/treatments/dental-crown-procedure", label: "Dental Crown Procedure", type: "Treatment" },
  { path: "/treatments/dental-crowns", label: "Dental Crowns", type: "Treatment" },
  { path: "/treatments/dental-implant-procedure", label: "Dental Implant Procedure", type: "Treatment" },
  { path: "/treatments/dentures-treatment", label: "Dentures Treatment", type: "Treatment" },
  { path: "/treatments/full-mouth-dental-implants", label: "Full Mouth Dental Implants", type: "Treatment" },
  { path: "/treatments/gingivitis", label: "Gingivitis Treatment", type: "Treatment" },
  { path: "/treatments/invisalign", label: "Invisalign", type: "Treatment" },
  { path: "/treatments/root-canal-procedure", label: "Root Canal Procedure", type: "Treatment" },
  { path: "/treatments/teeth-whitening", label: "Teeth Whitening Treatment", type: "Treatment" },
  { path: "/treatments/teeth-whitening-procedure", label: "Teeth Whitening Procedure", type: "Treatment" },
  { path: "/treatments/tooth-extraction-procedure", label: "Tooth Extraction Procedure", type: "Treatment" },
  { path: "/treatments/veneers", label: "Veneers", type: "Treatment" },
  { path: "/treatments/veneers-procedure", label: "Veneers Procedure", type: "Treatment" },
  { path: "/treatments/wisdom-teeth-removal", label: "Wisdom Teeth Removal", type: "Treatment" },

  // ── Dental Costs ──────────────────────────────────────────────────────────
  { path: "/dental-costs/braces-cost", label: "Braces Cost", type: "Dental Cost" },
  { path: "/dental-costs/dental-cleaning", label: "Dental Cleaning Cost", type: "Dental Cost" },
  { path: "/dental-costs/dental-cleaning-cost", label: "Dental Cleaning Cost (Alt)", type: "Dental Cost" },
  { path: "/dental-costs/dental-crown-cost", label: "Dental Crown Cost", type: "Dental Cost" },
  { path: "/dental-costs/dental-implant-cost", label: "Dental Implant Cost", type: "Dental Cost" },
  { path: "/dental-costs/dental-implants-cost", label: "Dental Implants Cost (Alt)", type: "Dental Cost" },
  { path: "/dental-costs/dentures-cost", label: "Dentures Cost", type: "Dental Cost" },
  { path: "/dental-costs/root-canal-cost", label: "Root Canal Cost", type: "Dental Cost" },
  { path: "/dental-costs/teeth-whitening-cost", label: "Teeth Whitening Cost", type: "Dental Cost" },
  { path: "/dental-costs/tooth-extraction-cost", label: "Tooth Extraction Cost", type: "Dental Cost" },
  { path: "/dental-costs/veneers-cost", label: "Veneers Cost", type: "Dental Cost" },
  { path: "/dental-costs/wisdom-teeth-removal-cost", label: "Wisdom Teeth Removal Cost", type: "Dental Cost" },

  // ── Guides ────────────────────────────────────────────────────────────────
  { path: "/guides/affordable-dental-care", label: "Affordable Dental Care", type: "Guide" },
  { path: "/guides/brushing-guide", label: "Brushing Guide", type: "Guide" },
  { path: "/guides/complete-oral-health-routine", label: "Complete Oral Health Routine", type: "Guide" },
  { path: "/guides/crowns-vs-fillings", label: "Crowns vs Fillings", type: "Guide" },
  { path: "/guides/dental-emergencies-on-a-budget", label: "Dental Emergencies on a Budget", type: "Guide" },
  { path: "/guides/dental-insurance-alternatives", label: "Dental Insurance Alternatives", type: "Guide" },
  { path: "/guides/dental-visit-guide", label: "Dental Visit Guide", type: "Guide" },
  { path: "/guides/diy-dental-care", label: "DIY Dental Care", type: "Guide" },
  { path: "/guides/do-you-need-root-canal", label: "Do You Need a Root Canal?", type: "Guide" },
  { path: "/guides/flossing-guide", label: "Flossing Guide", type: "Guide" },
  { path: "/guides/gum-disease-prevention", label: "Gum Disease Prevention", type: "Guide" },
  { path: "/guides/how-to-prevent-cavities", label: "How to Prevent Cavities", type: "Guide" },
  { path: "/guides/implants-vs-bridges", label: "Implants vs Bridges", type: "Guide" },
  { path: "/guides/natural-teeth-whitening", label: "Natural Teeth Whitening", type: "Guide" },
  { path: "/guides/oral-health-life-stages", label: "Oral Health Life Stages", type: "Guide" },
  { path: "/guides/preventing-expensive-dental-problems", label: "Preventing Expensive Dental Problems", type: "Guide" },
  { path: "/guides/teeth-whitening", label: "Teeth Whitening Guide", type: "Guide" },
  { path: "/guides/when-to-get-dental-second-opinion", label: "When to Get a Dental Second Opinion", type: "Guide" },
  { path: "/guides/when-to-get-second-opinion", label: "When to Get Second Opinion (Alt)", type: "Guide" },

  // ── Life Stages ───────────────────────────────────────────────────────────
  { path: "/life-stages/baby-teething-guide", label: "Baby Teething Guide", type: "Life Stage" },
  { path: "/life-stages/childrens-dental-health", label: "Children's Dental Health", type: "Life Stage" },
  { path: "/life-stages/pregnancy-dental-care", label: "Pregnancy Dental Care", type: "Life Stage" },
  { path: "/life-stages/senior-dental-care", label: "Senior Dental Care", type: "Life Stage" },
  { path: "/life-stages/teen-braces-guide", label: "Teen Braces Guide", type: "Life Stage" },

  // ── Lifestyle ─────────────────────────────────────────────────────────────
  { path: "/lifestyle/diabetes-and-dental-care", label: "Diabetes & Dental Care", type: "Lifestyle" },
  { path: "/lifestyle/diet-and-teeth", label: "Diet & Teeth", type: "Lifestyle" },
  { path: "/lifestyle/oral-piercing-risks", label: "Oral Piercing Risks", type: "Lifestyle" },
  { path: "/lifestyle/smoking-and-oral-health", label: "Smoking & Oral Health", type: "Lifestyle" },
  { path: "/lifestyle/sports-mouthguards", label: "Sports Mouthguards", type: "Lifestyle" },

  // ── Dental Emergencies ────────────────────────────────────────────────────
  { path: "/dental-emergencies/broken-tooth", label: "Broken Tooth", type: "Dental Emergency" },
  { path: "/dental-emergencies/dental-abscess", label: "Dental Abscess (Emergency)", type: "Dental Emergency" },
  { path: "/dental-emergencies/dental-emergency-guide", label: "Dental Emergency Guide", type: "Dental Emergency" },
  { path: "/dental-emergencies/knocked-out-tooth", label: "Knocked Out Tooth", type: "Dental Emergency" },
  { path: "/dental-emergencies/severe-toothache", label: "Severe Toothache", type: "Dental Emergency" },
];
