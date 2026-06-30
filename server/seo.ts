import { Express, Request, Response } from "express";
import { listBlogPosts } from "./blogDb";

const SITE_URL = "https://dentasmart.ai";
const NL = "\r\n";

// All static routes for the sitemap (NO admin routes)
// Each route includes lastmod for better crawl efficiency
const today = new Date().toISOString().split("T")[0];

// ============================================================
// Route definitions organized by content type for segmented sitemaps
// ============================================================

const corePages = [
  { path: "/", priority: "1.0", changefreq: "weekly", lastmod: today },
  { path: "/how-it-works", priority: "0.9", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/features", priority: "0.9", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/pricing", priority: "0.9", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/download", priority: "0.9", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/instant-scan", priority: "0.9", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptom-quiz", priority: "0.9", changefreq: "weekly", lastmod: today },
  { path: "/faqs", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/photo-guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-01" },
  { path: "/oral-health-hub", priority: "0.8", changefreq: "weekly", lastmod: today },
  { path: "/answers", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/find-a-dentist", priority: "0.7", changefreq: "monthly", lastmod: "2026-03-01" },
  { path: "/stories", priority: "0.6", changefreq: "monthly", lastmod: "2026-03-01" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly", lastmod: "2026-01-01" },
  { path: "/terms-of-service", priority: "0.3", changefreq: "yearly", lastmod: "2026-01-01" },
  // Hub landing pages
  { path: "/oral-health-hub/affordability", priority: "0.9", changefreq: "weekly", lastmod: today },
  { path: "/oral-health-hub/second-opinion", priority: "0.8", changefreq: "weekly", lastmod: today },
  { path: "/oral-health-hub/prevention", priority: "0.8", changefreq: "weekly", lastmod: today },
  { path: "/oral-health-hub/conditions", priority: "0.9", changefreq: "weekly", lastmod: today },
  { path: "/oral-health-hub/symptoms", priority: "0.9", changefreq: "weekly", lastmod: today },
  // Note: /hub/* paths are 301 redirects and intentionally excluded from sitemap
];

const employerPages = [
  { path: "/employers", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-01" },
  { path: "/team", priority: "0.7", changefreq: "monthly", lastmod: "2026-03-01" },
];

const conditionPages = [
  { path: "/conditions", priority: "0.8", changefreq: "weekly", lastmod: today },
  { path: "/conditions/toothache", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/cavities", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/gum-disease", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/wisdom-teeth-pain", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/teeth-whitening", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/sensitive-teeth", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/cracked-tooth", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/dental-abscess", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/root-canal", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/dental-crown", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/teeth-grinding", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/dental-implants", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/dry-socket", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/oral-thrush", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/periodontitis", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/conditions/gingivitis-vs-periodontitis", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/conditions/tmj-disorder", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/conditions/tooth-sensitivity", priority: "0.8", changefreq: "monthly", lastmod: "2026-05-07" },
];

const symptomPages = [
  { path: "/symptoms", priority: "0.8", changefreq: "weekly", lastmod: today },
  { path: "/symptoms/tooth-pain", priority: "0.8", changefreq: "monthly", lastmod: "2026-05-07" },
  { path: "/symptoms/tooth-pain-when-biting", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/bleeding-gums", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/tooth-sensitivity", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/jaw-pain", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/bad-breath", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/swollen-gums", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/loose-tooth", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/dry-mouth", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/tooth-discoloration", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/mouth-sores", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/symptoms/gum-bleeding-after-brushing", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/mouth-ulcers", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/canker-sores", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/tongue-pain", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/cheek-biting", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/teeth-grinding", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/jaw-clicking", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/gum-itching", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/tooth-staining", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/enamel-erosion", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/root-exposure", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/gum-inflammation", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/persistent-metallic-taste", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/swollen-lymph-nodes-dental", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/facial-swelling", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/tooth-migration", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/bite-changes", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/mouth-numbness", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/gum-tenderness", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/tmj-disorder", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/periodontal-disease", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/gingivitis", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/dental-caries", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/enamel-hypersensitivity", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/oral-thrush", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/aphthous-ulcers", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/leukoplakia", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/symptoms/oral-lichen-planus", priority: "0.8", changefreq: "monthly", lastmod: "2026-04-01" },
];

const treatmentPages = [
  { path: "/treatments", priority: "0.9", changefreq: "weekly", lastmod: today },
  { path: "/treatments/root-canal-procedure", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/treatments/dental-implant-procedure", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/treatments/wisdom-teeth-removal", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/treatments/dental-crown-procedure", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/treatments/braces-treatment", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/treatments/teeth-whitening-procedure", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/treatments/tooth-extraction-procedure", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/treatments/dental-cleaning-procedure", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/treatments/veneers-procedure", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/treatments/dentures-treatment", priority: "0.85", changefreq: "monthly", lastmod: today },
];

const costPages = [
  { path: "/dental-costs", priority: "0.9", changefreq: "weekly", lastmod: today },
  { path: "/dental-costs/root-canal-cost", priority: "0.9", changefreq: "monthly", lastmod: today },
  { path: "/dental-costs/dental-implant-cost", priority: "0.9", changefreq: "monthly", lastmod: today },
  { path: "/dental-costs/braces-cost", priority: "0.9", changefreq: "monthly", lastmod: today },
  { path: "/dental-costs/veneers-cost", priority: "0.9", changefreq: "monthly", lastmod: today },
  { path: "/dental-costs/wisdom-teeth-removal-cost", priority: "0.9", changefreq: "monthly", lastmod: today },
  { path: "/dental-costs/teeth-whitening-cost", priority: "0.9", changefreq: "monthly", lastmod: today },
  { path: "/dental-costs/dental-crown-cost", priority: "0.9", changefreq: "monthly", lastmod: today },
  { path: "/dental-costs/tooth-extraction-cost", priority: "0.9", changefreq: "monthly", lastmod: today },
  { path: "/dental-costs/dental-cleaning-cost", priority: "0.9", changefreq: "monthly", lastmod: today },
  { path: "/dental-costs/dentures-cost", priority: "0.9", changefreq: "monthly", lastmod: today },
];

const comparisonPages = [
  { path: "/comparisons", priority: "0.9", changefreq: "weekly", lastmod: today },
  { path: "/comparisons/braces-vs-invisalign", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/comparisons/dental-implants-vs-dentures", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/comparisons/crown-vs-veneer", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/comparisons/electric-vs-manual-toothbrush", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/comparisons/fluoride-vs-fluoride-free-toothpaste", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/comparisons/veneers-vs-crowns", priority: "0.85", changefreq: "monthly", lastmod: today },
];

const guidePages = [
  { path: "/guides", priority: "0.8", changefreq: "weekly", lastmod: today },
  { path: "/guides/brushing-guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/flossing-guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/dental-visit-guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/affordable-dental-care", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/dental-insurance-alternatives", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/diy-dental-care", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/preventing-expensive-dental-problems", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/dental-emergencies-on-a-budget", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/when-to-get-dental-second-opinion", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/do-you-need-root-canal", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/crowns-vs-fillings", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/implants-vs-bridges", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/complete-oral-health-routine", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/how-to-prevent-cavities", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/gum-disease-prevention", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/natural-teeth-whitening", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/guides/oral-health-life-stages", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
];

const lifeStagePages = [
  { path: "/life-stages", priority: "0.9", changefreq: "monthly", lastmod: today },
  { path: "/life-stages/baby-teething-guide", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/life-stages/childrens-dental-health", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/life-stages/teen-braces-guide", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/life-stages/pregnancy-dental-care", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/life-stages/senior-dental-care", priority: "0.85", changefreq: "monthly", lastmod: today },
];

const emergencyPages = [
  { path: "/dental-emergencies", priority: "0.9", changefreq: "monthly", lastmod: today },
  { path: "/dental-emergencies/knocked-out-tooth", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/dental-emergencies/dental-emergency-guide", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/dental-emergencies/broken-tooth", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/dental-emergencies/severe-toothache", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/dental-emergencies/dental-abscess", priority: "0.85", changefreq: "monthly", lastmod: today },
];

const lifestylePages = [
  { path: "/lifestyle", priority: "0.9", changefreq: "monthly", lastmod: today },
  { path: "/lifestyle/smoking-and-oral-health", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/lifestyle/diabetes-and-dental-care", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/lifestyle/diet-and-teeth", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/lifestyle/sports-mouthguards", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/lifestyle/oral-piercing-risks", priority: "0.85", changefreq: "monthly", lastmod: today },
];

// Hardcoded blog post routes (for static sitemap fallback)
const blogPostPages = [
  { path: "/oral-health-hub/dental-emergency-what-to-do", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/pregnancy-dental-health", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/brushing-teeth-prevent-dementia", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/electric-vs-manual-toothbrush", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/at-what-age-should-my-child-first-see-a-dentist", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/how-do-i-know-its-time-for-dental-implants", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/gums-hurt-when-flossing", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/swollen-gums-around-one-tooth", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/black-line-on-tooth", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/gum-boil", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/mouth-ulcer-not-healing", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/loose-tooth-adults", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/filling-feels-high-pain-biting", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/tooth-hurts-cold-water", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/crown-pain-sensitivity", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/bone-loss-dental-xray", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/teeth-grinding-bruxism", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/jaw-pain-tmj", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/canker-sore-vs-cold-sore", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/white-spots-on-teeth", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/root-canal-symptoms", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/bad-breath-halitosis", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/wisdom-tooth-pain", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/tooth-abscess-infection", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/cracked-tooth-symptoms", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/cavity-symptoms-tooth-decay", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/gum-recession", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/bleeding-gums", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/tooth-sensitivity-cold-hot", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/pain-when-biting-or-chewing", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/tooth-pain-toothache", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/how-can-ai-detect-a-cavity-in-my-dental-xray", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/maximize-benefits", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/employer-dental-plans", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/no-insurance-options", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/cosmetic-vs-necessary", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/pre-authorization", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/waiting-periods", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/in-network-confusion", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/insurance-limitations", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/denied-claims", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/misleading-insurance", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/enamel-erosion", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/missing-teeth", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/cracked-tooth", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/bad-breath", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/stained-teeth", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/teeth-grinding", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/wisdom-teeth-confusion", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/tooth-sensitivity", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/silent-gum-disease", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/undetected-cavities", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/choosing-right-dentist", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/communication-gap", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/preventive-care-gap", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/overtreatment-concerns", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/fear-of-dentist", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/cost-transparency", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/second-opinions", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/questioning-recommendations", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/rushed-decisions", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/unclear-diagnoses", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/why-your-dentist-might-be-recommending-unnecessary-procedures", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/the-hidden-cost-of-ignoring-dental-problems", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/10-questions-to-ask-your-dentist-before-any-procedure", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
  { path: "/oral-health-hub/why-is-oral-health-important-and-how-can-you-monitor-it-at-home", priority: "0.7", changefreq: "monthly", lastmod: "2026-04-01" },
];

// Combined static routes for the main sitemap
const staticRoutes = [
  ...corePages,
  ...employerPages,
  ...conditionPages,
  ...symptomPages,
  ...treatmentPages,
  ...costPages,
  ...comparisonPages,
  ...guidePages,
  ...lifeStagePages,
  ...emergencyPages,
  ...lifestylePages,
  ...blogPostPages,
];

// ============================================================
// Sitemap cache
// ============================================================
let cachedSitemap: string | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export function invalidateSitemapCache(): void {
  cachedSitemap = null;
  cacheTimestamp = 0;
  console.log("[Sitemap] Cache invalidated. Next request will regenerate");
}

function routesToXml(routes: Array<{ path: string; priority: string; changefreq: string; lastmod: string }>): string {
  return routes
    .map(
      (r) => {
        // Trailing slash for non-root paths to match infrastructure behavior
        const loc = r.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${r.path}/`;
        return `  <url>
    <loc>${loc}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
      }
    )
    .join("\n");
}

function wrapUrlset(urls: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// ============================================================
// Main sitemap generation (all URLs)
// ============================================================
export async function generateSitemapXml(): Promise<string> {
  if (cachedSitemap && Date.now() - cacheTimestamp < CACHE_TTL_MS) {
    return cachedSitemap;
  }

  let blogUrls = "";
  const dynamicBlogSlugs = new Set<string>();

  try {
    const result = await listBlogPosts({ publishedOnly: true, limit: 1000 });
    const posts = result.posts;
    for (const post of posts) {
      const lastmod = post.updatedAt
        ? new Date(post.updatedAt).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];
      blogUrls += `\n  <url>
    <loc>${SITE_URL}/oral-health-hub/${post.slug}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
      dynamicBlogSlugs.add(`/oral-health-hub/${post.slug}`);
    }
  } catch (e) {
    console.error("Failed to fetch blog posts for sitemap:", e);
  }

  const staticUrls = staticRoutes
    .filter((r) => !dynamicBlogSlugs.has(r.path))
    .map(
      (r) => {
        const loc = r.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${r.path}/`;
        return `  <url>
    <loc>${loc}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
      }
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${blogUrls}
</urlset>`;

  cachedSitemap = xml;
  cacheTimestamp = Date.now();

  return xml;
}

// ============================================================
// Segmented sitemap generation
// ============================================================
async function generateBlogSitemap(): Promise<string> {
  let blogUrls: Array<{ path: string; priority: string; changefreq: string; lastmod: string }> = [];
  try {
    const result = await listBlogPosts({ publishedOnly: true, limit: 1000 });
    blogUrls = result.posts.map((post) => ({
      path: `/oral-health-hub/${post.slug}`,
      priority: "0.7",
      changefreq: "weekly",
      lastmod: post.updatedAt
        ? new Date(post.updatedAt).toISOString().split("T")[0]
        : today,
    }));
  } catch (e) {
    console.error("Failed to fetch blog posts for blog sitemap:", e);
  }
  return wrapUrlset(routesToXml(blogUrls));
}

function generateSegmentedSitemap(routes: Array<{ path: string; priority: string; changefreq: string; lastmod: string }>): string {
  return wrapUrlset(routesToXml(routes));
}

function generateSitemapIndex(): string {
  const sitemaps = [
    { loc: `${SITE_URL}/sitemap-pages.xml`, lastmod: today },
    { loc: `${SITE_URL}/sitemap-blog.xml`, lastmod: today },
    { loc: `${SITE_URL}/sitemap-conditions.xml`, lastmod: today },
    { loc: `${SITE_URL}/sitemap-symptoms.xml`, lastmod: today },
    { loc: `${SITE_URL}/sitemap-treatments.xml`, lastmod: today },
    { loc: `${SITE_URL}/sitemap-costs.xml`, lastmod: today },
    { loc: `${SITE_URL}/sitemap-comparisons.xml`, lastmod: today },
    { loc: `${SITE_URL}/sitemap-guides.xml`, lastmod: today },
    { loc: `${SITE_URL}/sitemap-life-stages.xml`, lastmod: today },
    { loc: `${SITE_URL}/sitemap-emergencies.xml`, lastmod: today },
    { loc: `${SITE_URL}/sitemap-lifestyle.xml`, lastmod: today },
    { loc: `${SITE_URL}/sitemap-employers.xml`, lastmod: today },
  ];

  const entries = sitemaps
    .map(
      (s) => `  <sitemap>
    <loc>${s.loc}</loc>
    <lastmod>${s.lastmod}</lastmod>
  </sitemap>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;
}

// ============================================================
// Shared sitemap handler
// ============================================================
const serveSitemap = async (_req: Request, res: Response) => {
  try {
    const sitemap = await generateSitemapXml();
    res.set("Content-Type", "application/xml; charset=utf-8");
    res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
    res.send(sitemap);
  } catch (e) {
    console.error("Sitemap generation error:", e);
    res.status(500).send("Error generating sitemap");
  }
};

// ============================================================
// llms.txt content builder
// ============================================================
function buildLlmsTxt(): string {
  const content = [
    "# DentaSmart - Your Personal AI Dentist in Your Pocket",
    "> AI-powered dental health analysis and personalized oral care guidance.",
    "",
    "DentaSmart helps people understand their oral health through AI-powered photo analysis, personalized care plans, and clear dental education content.",
    "",
    "## Main Pages",
    `- [Home](${SITE_URL}/)`,
    `- [How It Works](${SITE_URL}/how-it-works)`,
    `- [Features](${SITE_URL}/features)`,
    `- [Pricing](${SITE_URL}/pricing)`,
    `- [Download](${SITE_URL}/download)`,
    `- [Instant Scan](${SITE_URL}/instant-scan)`,
    `- [Symptom Quiz](${SITE_URL}/symptom-quiz)`,
    `- [FAQs](${SITE_URL}/faqs)`,
    "",
    "## Oral Health Resources",
    `- [Oral Health Hub](${SITE_URL}/oral-health-hub)`,
    `- [Dental Conditions](${SITE_URL}/conditions)`,
    `- [Dental Symptoms](${SITE_URL}/symptoms)`,
    `- [Oral Health Guides](${SITE_URL}/guides)`,
    `- [Dental Answers](${SITE_URL}/answers)`,
    "",
    "## Hub Pages",
    `- [Affordability Guide](${SITE_URL}/oral-health-hub/affordability)`,
    `- [Second Opinion Guide](${SITE_URL}/oral-health-hub/second-opinion)`,
    `- [Prevention Guide](${SITE_URL}/oral-health-hub/prevention)`,
    `- [Conditions Guide](${SITE_URL}/oral-health-hub/conditions)`,
    `- [Symptoms Guide](${SITE_URL}/oral-health-hub/symptoms)`,
    "",
    "## Dental Cost Guides",
    `- [Dental Costs Hub](${SITE_URL}/dental-costs)`,
    `- [Root Canal Cost](${SITE_URL}/dental-costs/root-canal-cost)`,
    `- [Dental Implant Cost](${SITE_URL}/dental-costs/dental-implant-cost)`,
    `- [Braces Cost](${SITE_URL}/dental-costs/braces-cost)`,
    `- [Veneers Cost](${SITE_URL}/dental-costs/veneers-cost)`,
    `- [Wisdom Teeth Removal Cost](${SITE_URL}/dental-costs/wisdom-teeth-removal-cost)`,
    `- [Teeth Whitening Cost](${SITE_URL}/dental-costs/teeth-whitening-cost)`,
    `- [Dental Crown Cost](${SITE_URL}/dental-costs/dental-crown-cost)`,
    `- [Tooth Extraction Cost](${SITE_URL}/dental-costs/tooth-extraction-cost)`,
    `- [Dental Cleaning Cost](${SITE_URL}/dental-costs/dental-cleaning-cost)`,
    `- [Dentures Cost](${SITE_URL}/dental-costs/dentures-cost)`,
    "",
    "## Treatment Guides",
    `- [Treatment Guides Hub](${SITE_URL}/treatments)`,
    `- [Root Canal Procedure](${SITE_URL}/treatments/root-canal-procedure)`,
    `- [Dental Implant Procedure](${SITE_URL}/treatments/dental-implant-procedure)`,
    `- [Wisdom Teeth Removal](${SITE_URL}/treatments/wisdom-teeth-removal)`,
    `- [Dental Crown Procedure](${SITE_URL}/treatments/dental-crown-procedure)`,
    `- [Braces Treatment](${SITE_URL}/treatments/braces-treatment)`,
    `- [Teeth Whitening Procedure](${SITE_URL}/treatments/teeth-whitening-procedure)`,
    `- [Tooth Extraction Procedure](${SITE_URL}/treatments/tooth-extraction-procedure)`,
    `- [Dental Cleaning Procedure](${SITE_URL}/treatments/dental-cleaning-procedure)`,
    `- [Veneers Procedure](${SITE_URL}/treatments/veneers-procedure)`,
    `- [Dentures Treatment](${SITE_URL}/treatments/dentures-treatment)`,
    "",
    "## Dental Comparison Guides",
    `- [Comparison Guides Hub](${SITE_URL}/comparisons)`,
    `- [Braces vs Invisalign](${SITE_URL}/comparisons/braces-vs-invisalign)`,
    `- [Dental Implants vs Dentures](${SITE_URL}/comparisons/dental-implants-vs-dentures)`,
    `- [Crown vs Veneer](${SITE_URL}/comparisons/crown-vs-veneer)`,
    `- [Electric vs Manual Toothbrush](${SITE_URL}/comparisons/electric-vs-manual-toothbrush)`,
    `- [Fluoride vs Fluoride-Free Toothpaste](${SITE_URL}/comparisons/fluoride-vs-fluoride-free-toothpaste)`,
    "",
    "## Life Stages Dental Care",
    `- [Life Stages Hub](${SITE_URL}/life-stages)`,
    `- [Baby Teething Guide](${SITE_URL}/life-stages/baby-teething-guide)`,
    `- [Children's Dental Health](${SITE_URL}/life-stages/childrens-dental-health)`,
    `- [Teen Braces Guide](${SITE_URL}/life-stages/teen-braces-guide)`,
    `- [Pregnancy Dental Care](${SITE_URL}/life-stages/pregnancy-dental-care)`,
    `- [Senior Dental Care](${SITE_URL}/life-stages/senior-dental-care)`,
    "",
    "## Dental Emergencies",
    `- [Dental Emergencies Hub](${SITE_URL}/dental-emergencies)`,
    `- [Knocked Out Tooth](${SITE_URL}/dental-emergencies/knocked-out-tooth)`,
    `- [Dental Emergency Guide](${SITE_URL}/dental-emergencies/dental-emergency-guide)`,
    `- [Broken Tooth](${SITE_URL}/dental-emergencies/broken-tooth)`,
    `- [Severe Toothache](${SITE_URL}/dental-emergencies/severe-toothache)`,
    `- [Dental Abscess](${SITE_URL}/dental-emergencies/dental-abscess)`,
    "",
    "## Lifestyle & Oral Health",
    `- [Lifestyle Hub](${SITE_URL}/lifestyle)`,
    `- [Smoking & Oral Health](${SITE_URL}/lifestyle/smoking-and-oral-health)`,
    `- [Diabetes & Dental Care](${SITE_URL}/lifestyle/diabetes-and-dental-care)`,
    `- [Diet & Your Teeth](${SITE_URL}/lifestyle/diet-and-teeth)`,
    `- [Sports Mouthguards](${SITE_URL}/lifestyle/sports-mouthguards)`,
    `- [Oral Piercing Risks](${SITE_URL}/lifestyle/oral-piercing-risks)`,
    "",
    "## Product Comparisons",
    `- [DentaSmart vs ChatGPT for Dental](${SITE_URL}/compare/dentasmart-vs-chatgpt-dental)`,
    `- [DentaSmart vs Teledentistry](${SITE_URL}/compare/dentasmart-vs-teledentistry)`,
    `- [DentaSmart vs Dental Insurance](${SITE_URL}/compare/dentasmart-vs-dental-insurance)`,
    "",
    "## Company",
    `- [Team](${SITE_URL}/team)`,
    `- [For Employers](${SITE_URL}/employers)`,
    `- [Privacy Policy](${SITE_URL}/privacy-policy)`,
    `- [Terms of Service](${SITE_URL}/terms-of-service)`,
    "",
    "## What DentaSmart Does",
    "DentaSmart is an AI-powered oral health app that helps users:",
    "1. Upload a photo of their teeth or dental X-rays",
    "2. Receive AI-powered analysis identifying potential issues",
    "3. Get a personalized Oral Health Score (0-100)",
    "4. Understand treatment options with cost estimates",
    "5. Track oral health over time with reminders",
    "6. Get a second opinion before expensive dental procedures",
    "",
    "## Current Pricing",
    "",
    "Use the live pricing page as the source of truth:",
    `${SITE_URL}/pricing`,
    "",
    "Known public pricing:",
    "- Quick Check: $19.99 one-time -- fast AI scan with instant findings overview",
    "- Complete Oral Health Checkup: $74.99/year -- unlimited scans, oral health score, care plans, 24/7 AI guide",
    "- Second Opinion: $29.99 one-time -- upload dentist treatment plan, get comparison report",
    "- Family Plan: $149.99/year -- covers up to 4 family members, all Complete Checkup features",
    "- Benefits: coming soon -- includes discounted dental network (75,000+ dentists), 20-60% savings, BNPL options",
    "",
    "## App Availability",
    "- iOS: Live on App Store",
    "- Android: Live on Google Play",
    "",
    "## Contact",
    `- Website: ${SITE_URL}`,
    "- Instagram: https://www.instagram.com/dentasmart.ai",
    "- LinkedIn: https://www.linkedin.com/company/dentasmart",
    "",
    "## Important Notes",
    "- DentaSmart is NOT a replacement for professional dental care",
    "- AI analysis is for educational and informational purposes only",
    "- Users should always consult a licensed dentist for diagnosis and treatment",
    "- The app helps users understand their oral health and make informed decisions",
    ""
  ];
  return content.join(NL);
}

// ============================================================
// llms-full.txt content builder (extended with page summaries)
// ============================================================
function buildLlmsFullTxt(): string {
  const content = [
    "# DentaSmart - Full Content Reference for AI Engines",
    "> Complete content reference for DentaSmart.ai, an AI-powered oral health guide app.",
    "",
    "## About DentaSmart",
    "",
    "DentaSmart is Your Personal AI Dentist in Your Pocket. It is an AI-powered oral health app that helps everyday people understand what is happening in their mouth. Users upload a photo of their teeth or dental X-rays and receive AI-powered analysis, a personalized Oral Health Score from 0 to 100, plain-English explanations of findings, treatment cost estimates, and a personalized care plan. DentaSmart also offers Din, a 24/7 AI oral health guide that answers dental questions anytime.",
    "",
    "For compliance-sensitive contexts, DentaSmart can also be described as an AI Oral Health Guide.",
    "",
    "## Who Is DentaSmart For?",
    "",
    "DentaSmart is designed for:",
    "- People without dental insurance who need affordable oral health guidance",
    "- Anyone confused by a dental treatment plan who wants a second opinion",
    "- Parents who want to monitor their family's oral health at home",
    "- People with dental anxiety who want to understand their situation before visiting a dentist",
    "- Gig workers and freelancers without employer dental benefits",
    "- Small business owners looking for dental benefits alternatives for their team",
    "- Anyone who wants to avoid surprise dental bills",
    "",
    "## How DentaSmart Works",
    "",
    "Step 1: Upload a photo of your teeth or dental X-rays using the DentaSmart app.",
    "Step 2: The AI analyzes your image and identifies potential oral health concerns.",
    "Step 3: You receive an Oral Health Score (0-100), plain-English explanations, and a personalized care plan.",
    "Step 4: Use Din, the 24/7 AI guide, to ask follow-up questions about your oral health.",
    "Step 5: Track your oral health over time and get reminders for dental care.",
    "",
    "## Current Pricing (Source of Truth: https://dentasmart.ai/pricing)",
    "",
    "Quick Check: $19.99 one-time. Fast AI scan of your teeth or X-rays with instant findings overview.",
    "",
    "Complete Oral Health Checkup: $74.99/year ($0.21/day). Unlimited scans, Oral Health Score, personalized care plans, and 24/7 AI guide Din.",
    "",
    "Second Opinion: $29.99 one-time. Upload your dentist's treatment plan and get an AI-powered comparison report. Family Plan: $149.99/year for up to 4 family members.",
    "",
    "Benefits: Coming soon. Will include access to a discounted dental network of 75,000+ dentists, 20-60% savings on dental procedures, and Buy Now Pay Later (BNPL) options.",
    "",
    "## Key Features",
    "",
    "Quick Check: Fast AI analysis of X-rays or mouth photos with color-coded findings overlay. Available free (limited) and unlimited on Insights plan.",
    "AI Photo Analysis: Upload mouth photos or dental X-rays for instant AI analysis with visual findings.",
    "Guided Self-Examination: Before uploading photos, complete Bite Pressure Test, Cold Sensitivity Test, and Visual Inspection to improve AI accuracy. Included in all plans.",
    "Dual Reports: Two report formats - a plain-English 'For You' version and a clinical 'For Dentist' version. Both downloadable as PDF and shareable.",
    "Oral Health Score: Get a score from 0-100 that tracks your oral health over time.",
    "Din AI Guide: 24/7 AI chatbot trained in dentistry that answers oral health questions.",
    "Second Opinion: Upload a treatment plan from your dentist and get an independent AI review.",
    "Family Profiles: Monitor oral health for up to 4 family members under one account.",
    "Cost Estimates: Understand what dental procedures typically cost before committing.",
    "Care Plans: Receive personalized oral health improvement plans.",
    "Reminders: Get notifications for brushing, flossing, and dental checkups.",
    "",
    "## App Availability",
    "",
    "iOS: Live on the Apple App Store.",
    "Android: Live on Google Play. Download at https://play.google.com/store/apps/details?id=com.dentaSmart.app.android",
    "",
    "## DentaSmart vs ChatGPT for Dental Questions",
    "",
    "DentaSmart is purpose-built for oral health. Unlike ChatGPT, DentaSmart can analyze dental photos and X-rays, provide an Oral Health Score, offer treatment cost estimates, and maintain a history of your oral health. ChatGPT provides general text responses but cannot analyze dental images, track your oral health over time, or provide personalized care plans based on your specific dental situation.",
    "",
    "## DentaSmart vs Teledentistry",
    "",
    "Teledentistry requires scheduling a video call with a dentist, typically costs $50-$100+ per visit, and has limited availability. DentaSmart provides instant AI analysis 24/7 for $74.99/year (unlimited scans), does not require appointments, and helps users prepare for better conversations with their dentist.",
    "",
    "## DentaSmart vs Dental Insurance",
    "",
    "Traditional dental insurance costs $300-$600/year per person, has waiting periods, annual maximums, and network restrictions. DentaSmart costs $74.99/year for individuals or $149.99/year for families, has no waiting periods, and helps users understand their dental needs before committing to treatment. DentaSmart is not a replacement for dental insurance but can serve as an affordable complement or alternative for basic oral health monitoring.",
    "",
    "## Page Summaries",
    "",
    "### Homepage (https://dentasmart.ai/)",
    "DentaSmart helps you know what is happening in your mouth. Upload a photo of your teeth or X-rays and get clear AI insights in minutes, with an easy plan to prevent expensive surprises.",
    "",
    "### How It Works (https://dentasmart.ai/how-it-works)",
    "Three simple steps: Upload a photo, get instant AI insights, and take control with a personalized plan. DentaSmart uses AI trained on dental data to analyze your oral health.",
    "",
    "### Features (https://dentasmart.ai/features)",
    "Quick Check for fast X-ray/photo analysis, guided Self-Examination tests (Bite Pressure, Cold Sensitivity, Visual Inspection), dual report formats (patient + dentist PDF), AI-powered photo analysis, Oral Health Score tracking, Din AI guide for 24/7 questions, second opinion reports, family profiles, cost estimates, care plans, and reminders.",
    "",
    "### Pricing (https://dentasmart.ai/pricing)",
    "Quick Check at $19.99, Second Opinion at $29.99, Complete Oral Health Checkup at $74.99/year, and Family Plan at $149.99/year.",
    "",
    "### Dental Conditions (https://dentasmart.ai/conditions)",
    "Comprehensive guides for 17 dental conditions including toothache, cavities, gum disease, wisdom teeth pain, sensitive teeth, cracked tooth, dental abscess, root canal, dental crown, teeth grinding, dental implants, dry socket, oral thrush, periodontitis, gingivitis, and TMJ disorder.",
    "",
    "### Dental Symptoms (https://dentasmart.ai/symptoms)",
    "Guides for 38 dental symptoms including tooth pain, bleeding gums, sensitivity, jaw pain, bad breath, swollen gums, loose tooth, dry mouth, mouth sores, and more.",
    "",
    "### Dental Costs (https://dentasmart.ai/dental-costs)",
    "Cost guides for 10 common dental procedures: root canal, dental implant, braces, veneers, wisdom teeth removal, teeth whitening, dental crown, tooth extraction, dental cleaning, and dentures.",
    "",
    "### Treatment Guides (https://dentasmart.ai/treatments)",
    "Step-by-step guides for 10 dental procedures explaining what to expect, recovery time, and typical costs.",
    "",
    "### Oral Health Guides (https://dentasmart.ai/guides)",
    "17 practical guides covering brushing, flossing, dental visits, affordable care, insurance alternatives, DIY care, preventing expensive problems, second opinions, and more.",
    "",
    "### For Employers (https://dentasmart.ai/employers)",
    "DentaSmart offers dental benefits alternatives for small businesses and employers looking to provide oral health support to their teams without traditional dental insurance.",
    "",
    "## New AEO Content (Published April 2026)",
    "",
    "### AEO Blog Posts",
    "What Is an AI Oral Health Guide (https://dentasmart.ai/oral-health-hub/what-is-ai-oral-health-guide) - Explains what AI oral health guides are and how DentaSmart works as one.",
    "What Is DentaSmart and How Does It Work (https://dentasmart.ai/oral-health-hub/what-is-dentasmart-how-does-it-work) - Complete overview of DentaSmart features, pricing, and how to use it.",
    "How Much Does DentaSmart Cost (https://dentasmart.ai/oral-health-hub/how-much-does-dentasmart-cost) - Detailed pricing breakdown for all DentaSmart plans.",
    "DentaSmart vs ChatGPT for Dental Questions (https://dentasmart.ai/oral-health-hub/dentasmart-vs-chatgpt-dental-questions) - Comparison of DentaSmart vs ChatGPT for dental advice.",
    "Can AI Help Explain Dental X-Rays (https://dentasmart.ai/oral-health-hub/can-ai-explain-dental-xrays) - How AI tools like DentaSmart analyze and explain dental X-rays.",
    "Dental Second Opinion Without Insurance (https://dentasmart.ai/oral-health-hub/dental-second-opinion-without-insurance) - How to get a dental second opinion without insurance.",
    "Is DentaSmart a Dental Insurance Alternative (https://dentasmart.ai/oral-health-hub/is-dentasmart-dental-insurance-alternative) - Whether DentaSmart can serve as an insurance alternative.",
    "What Is an Oral Health Score (https://dentasmart.ai/oral-health-hub/what-is-oral-health-score) - Explains DentaSmart Oral Health Score 0-100.",
    "How to Avoid Surprise Dental Bills (https://dentasmart.ai/oral-health-hub/how-to-avoid-surprise-dental-bills) - Strategies to prevent unexpected dental costs.",
    "What to Do When Dentist Says You Need a Crown (https://dentasmart.ai/oral-health-hub/what-to-do-dentist-says-need-crown) - Guide for patients told they need a dental crown.",
    "",
    "### Use-Case Pages",
    "AI Dental Second Opinion Without Insurance (https://dentasmart.ai/oral-health-hub/ai-dental-second-opinion-without-insurance)",
    "How to Understand Your Dental X-Rays with AI (https://dentasmart.ai/oral-health-hub/understand-dental-x-rays)",
    "Confused by Your Dental Treatment Plan (https://dentasmart.ai/oral-health-hub/dental-treatment-plan-confusion)",
    "How to Avoid Surprise Dental Bills Guide (https://dentasmart.ai/oral-health-hub/avoid-surprise-dental-bills-guide)",
    "Dental Anxiety Before Your Appointment (https://dentasmart.ai/oral-health-hub/dental-anxiety-before-appointment)",
    "Parents Checking Kids Teeth (https://dentasmart.ai/oral-health-hub/parents-checking-kids-teeth)",
    "Family Oral Health Monitoring (https://dentasmart.ai/oral-health-hub/family-oral-health-monitoring)",
    "Small Business Dental Benefits Alternative (https://dentasmart.ai/oral-health-hub/small-business-dental-benefits-alternative)",
    "Worried About Dental Overtreatment (https://dentasmart.ai/oral-health-hub/worried-about-overtreatment)",
    "Tooth Pain at Night (https://dentasmart.ai/oral-health-hub/tooth-pain-at-night)",
    "Gig Workers Without Dental Insurance (https://dentasmart.ai/oral-health-hub/gig-workers-without-dental-insurance)",
    "Second Opinion Before Root Canal (https://dentasmart.ai/oral-health-hub/second-opinion-before-root-canal)",
    "Second Opinion Before Crown (https://dentasmart.ai/oral-health-hub/second-opinion-before-crown)",
    "Dental Cost Help for Families (https://dentasmart.ai/oral-health-hub/dental-cost-help-for-families)",
    "AI Dental App for Parents (https://dentasmart.ai/oral-health-hub/ai-dental-app-for-parents)",
    "",
    "### Comparison Pages",
    "DentaSmart vs ChatGPT for Dental Advice (https://dentasmart.ai/oral-health-hub/dentasmart-vs-chatgpt-dental-advice)",
    "DentaSmart vs Teledentistry (https://dentasmart.ai/oral-health-hub/dentasmart-vs-teledentistry)",
    "DentaSmart vs Dental Insurance (https://dentasmart.ai/oral-health-hub/dentasmart-vs-dental-insurance)",
    "DentaSmart vs Traditional Second Opinion (https://dentasmart.ai/oral-health-hub/dentasmart-vs-traditional-second-opinion)",
    "DentaSmart vs Dental Discount Plans (https://dentasmart.ai/oral-health-hub/dentasmart-vs-dental-discount-plans)",
    "DentaSmart vs Dental Savings Plans (https://dentasmart.ai/oral-health-hub/dentasmart-vs-dental-savings-plans)",
    "DentaSmart vs Toothpic (https://dentasmart.ai/oral-health-hub/dentasmart-vs-toothpic)",
    "DentaSmart vs Pearl and Overjet (https://dentasmart.ai/oral-health-hub/dentasmart-vs-pearl-overjet)",
    "DentaSmart vs Googling Dental Symptoms (https://dentasmart.ai/oral-health-hub/dentasmart-vs-googling-dental-symptoms)",
    "DentaSmart vs Waiting for Dental Visit (https://dentasmart.ai/oral-health-hub/dentasmart-vs-waiting-for-dental-visit)",
    "",
    "### Listicle Pages",
    "7 Best AI Dental Apps in 2026 (https://dentasmart.ai/oral-health-hub/best-ai-dental-apps)",
    "5 Best Dental Second Opinion Apps (https://dentasmart.ai/oral-health-hub/best-dental-second-opinion-apps)",
    "Best Apps to Understand Dental X-Rays (https://dentasmart.ai/oral-health-hub/best-apps-understand-dental-xrays)",
    "7 Best Dental Insurance Alternatives (https://dentasmart.ai/oral-health-hub/best-dental-insurance-alternatives)",
    "5 Best Oral Health Apps for Families (https://dentasmart.ai/oral-health-hub/best-oral-health-apps-families)",
    "5 Best Dental Cost Transparency Tools (https://dentasmart.ai/oral-health-hub/best-dental-cost-transparency-tools)",
    "5 Best Apps for Tooth Pain Guidance (https://dentasmart.ai/oral-health-hub/best-apps-tooth-pain-guidance)",
    "5 Best Dental Apps Without Insurance (https://dentasmart.ai/oral-health-hub/best-dental-apps-without-insurance)",
    "7 Best AI Health Apps for Preventive Care (https://dentasmart.ai/oral-health-hub/best-ai-health-apps-preventive-care)",
    "5 Best Dental Apps for Parents (https://dentasmart.ai/oral-health-hub/best-dental-apps-for-parents)",
    "",
    "## Contact & Social",
    "",
    `Website: ${SITE_URL}`,
    "Instagram: https://www.instagram.com/dentasmart.ai",
    "LinkedIn: https://www.linkedin.com/company/dentasmart",
    "",
    "## Important Notes",
    "",
    "DentaSmart provides AI-powered oral health insights and education. It helps users prepare for better dentist conversations. DentaSmart does not replace a licensed dentist for diagnosis or treatment. Emergency symptoms should be handled by a licensed dentist, urgent care, or emergency services.",
    ""
  ];
  return content.join(NL);
}

// ============================================================
// robots.txt content builder
// ============================================================
function buildRobotsTxt(): string {
  const lines = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin/",
    "Disallow: /api/",
    "",
    "User-agent: OAI-SearchBot",
    "Allow: /",
    "",
    "User-agent: GPTBot",
    "Allow: /",
    "",
    "User-agent: Google-Extended",
    "Allow: /",
    "",
    "User-agent: PerplexityBot",
    "Allow: /",
    "",
    "User-agent: ClaudeBot",
    "Allow: /",
    "",
    "User-agent: Anthropic-ai",
    "Allow: /",
    "",
    "User-agent: Bytespider",
    "Allow: /",
    "",
    "User-agent: CCBot",
    "Allow: /",
    "",
    "User-agent: cohere-ai",
    "Allow: /",
    "",
    "User-agent: Applebot-Extended",
    "Allow: /",
    "",
    `Sitemap: ${SITE_URL}/sitemap-index.xml`,
    ""
  ];
  return lines.join(NL);
}

// ============================================================
// Route registration
// ============================================================
export function registerSeoRoutes(app: Express) {
  // robots.txt
  app.get("/robots.txt", (_req: Request, res: Response) => {
    res.type("text/plain");
    res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
    res.send(buildRobotsTxt());
  });

  // llms.txt
  app.get("/llms.txt", (_req: Request, res: Response) => {
    res.type("text/plain");
    res.set("Cache-Control", "public, max-age=0, s-maxage=3600, must-revalidate");
    res.send(buildLlmsTxt());
  });

  // llms-full.txt
  app.get("/llms-full.txt", (_req: Request, res: Response) => {
    res.type("text/markdown");
    res.set("Cache-Control", "public, max-age=0, s-maxage=3600, must-revalidate");
    res.send(buildLlmsFullTxt());
  });

  // ============================================================
  // Sitemap Index
  // ============================================================
  app.get("/sitemap-index.xml", (_req: Request, res: Response) => {
    res.set("Content-Type", "application/xml; charset=utf-8");
    res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
    res.send(generateSitemapIndex());
  });

  // ============================================================
  // Segmented Sitemaps
  // ============================================================
  app.get("/sitemap-pages.xml", (_req: Request, res: Response) => {
    res.set("Content-Type", "application/xml; charset=utf-8");
    res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
    res.send(generateSegmentedSitemap(corePages));
  });

  app.get("/sitemap-blog.xml", async (_req: Request, res: Response) => {
    try {
      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
      res.send(await generateBlogSitemap());
    } catch (e) {
      console.error("Blog sitemap error:", e);
      res.status(500).send("Error generating blog sitemap");
    }
  });

  app.get("/sitemap-conditions.xml", (_req: Request, res: Response) => {
    res.set("Content-Type", "application/xml; charset=utf-8");
    res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
    res.send(generateSegmentedSitemap(conditionPages));
  });

  app.get("/sitemap-symptoms.xml", (_req: Request, res: Response) => {
    res.set("Content-Type", "application/xml; charset=utf-8");
    res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
    res.send(generateSegmentedSitemap(symptomPages));
  });

  app.get("/sitemap-treatments.xml", (_req: Request, res: Response) => {
    res.set("Content-Type", "application/xml; charset=utf-8");
    res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
    res.send(generateSegmentedSitemap(treatmentPages));
  });

  app.get("/sitemap-costs.xml", (_req: Request, res: Response) => {
    res.set("Content-Type", "application/xml; charset=utf-8");
    res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
    res.send(generateSegmentedSitemap(costPages));
  });

  app.get("/sitemap-comparisons.xml", (_req: Request, res: Response) => {
    res.set("Content-Type", "application/xml; charset=utf-8");
    res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
    res.send(generateSegmentedSitemap(comparisonPages));
  });

  app.get("/sitemap-guides.xml", (_req: Request, res: Response) => {
    res.set("Content-Type", "application/xml; charset=utf-8");
    res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
    res.send(generateSegmentedSitemap(guidePages));
  });

  app.get("/sitemap-life-stages.xml", (_req: Request, res: Response) => {
    res.set("Content-Type", "application/xml; charset=utf-8");
    res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
    res.send(generateSegmentedSitemap(lifeStagePages));
  });

  app.get("/sitemap-emergencies.xml", (_req: Request, res: Response) => {
    res.set("Content-Type", "application/xml; charset=utf-8");
    res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
    res.send(generateSegmentedSitemap(emergencyPages));
  });

  app.get("/sitemap-lifestyle.xml", (_req: Request, res: Response) => {
    res.set("Content-Type", "application/xml; charset=utf-8");
    res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
    res.send(generateSegmentedSitemap(lifestylePages));
  });

  app.get("/sitemap-employers.xml", (_req: Request, res: Response) => {
    res.set("Content-Type", "application/xml; charset=utf-8");
    res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
    res.send(generateSegmentedSitemap(employerPages));
  });

  // ============================================================
  // Deprecated flat sitemap routes — 301 redirect to sitemap-index.xml
  // ============================================================
  app.get("/sitemap.xml", (_req: Request, res: Response) => {
    res.redirect(301, "/sitemap-index.xml");
  });
  app.get("/sitemap-custom.xml", (_req: Request, res: Response) => {
    res.redirect(301, "/sitemap-index.xml");
  });
  app.get("/api/sitemap", (_req: Request, res: Response) => {
    res.redirect(301, "/sitemap-index.xml");
  });
}
