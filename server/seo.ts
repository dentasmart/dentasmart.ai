import { Express, Request, Response } from "express";
import { listBlogPosts } from "./blogDb";

const SITE_URL = "https://dentasmart.ai";

// All static routes for the sitemap (NO admin routes)
// Each route includes lastmod for better crawl efficiency
const today = new Date().toISOString().split("T")[0];

const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly", lastmod: today },
  { path: "/how-it-works", priority: "0.9", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/features", priority: "0.9", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/pricing", priority: "0.9", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/employers", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-01" },
  { path: "/team", priority: "0.7", changefreq: "monthly", lastmod: "2026-03-01" },
  { path: "/faqs", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/download", priority: "0.9", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/instant-scan", priority: "0.9", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/photo-guide", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-01" },
  { path: "/oral-health-hub", priority: "0.8", changefreq: "weekly", lastmod: today },
  { path: "/answers", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  { path: "/find-a-dentist", priority: "0.7", changefreq: "monthly", lastmod: "2026-03-01" },
  { path: "/compare/dentasmart-vs-chatgpt-dental", priority: "0.7", changefreq: "monthly", lastmod: "2026-03-01" },
  { path: "/compare/dentasmart-vs-teledentistry", priority: "0.7", changefreq: "monthly", lastmod: "2026-03-01" },
  { path: "/compare/dentasmart-vs-dental-insurance", priority: "0.7", changefreq: "monthly", lastmod: "2026-03-01" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly", lastmod: "2026-01-01" },
  { path: "/terms-of-service", priority: "0.3", changefreq: "yearly", lastmod: "2026-01-01" },
  { path: "/stories", priority: "0.6", changefreq: "monthly", lastmod: "2026-03-01" },
  // Conditions pages
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
  { path: "/conditions/tmj-disorder", priority: "0.8", changefreq: "monthly", lastmod: "2026-03-15" },
  // Symptoms pages
  { path: "/symptoms", priority: "0.8", changefreq: "weekly", lastmod: today },
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
  // Guides pages
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
  // Hub landing pages
  { path: "/oral-health-hub/affordability", priority: "0.9", changefreq: "weekly", lastmod: today },
  { path: "/oral-health-hub/second-opinion", priority: "0.8", changefreq: "weekly", lastmod: today },
  { path: "/oral-health-hub/prevention", priority: "0.8", changefreq: "weekly", lastmod: today },
  { path: "/oral-health-hub/conditions", priority: "0.9", changefreq: "weekly", lastmod: today },
  { path: "/oral-health-hub/symptoms", priority: "0.9", changefreq: "weekly", lastmod: today },
  // Symptom Quiz
  { path: "/symptom-quiz", priority: "0.9", changefreq: "weekly", lastmod: today },
  // Dental Cost Pages
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
  // Treatment Explainer Pages
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
  // Comparison Pages
  { path: "/comparisons", priority: "0.9", changefreq: "weekly", lastmod: today },
  { path: "/comparisons/braces-vs-invisalign", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/comparisons/dental-implants-vs-dentures", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/comparisons/crown-vs-veneer", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/comparisons/electric-vs-manual-toothbrush", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/comparisons/fluoride-vs-fluoride-free-toothpaste", priority: "0.85", changefreq: "monthly", lastmod: today },
  // Life Stages pages
  { path: "/life-stages", priority: "0.9", changefreq: "monthly", lastmod: today },
  { path: "/life-stages/baby-teething-guide", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/life-stages/childrens-dental-health", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/life-stages/teen-braces-guide", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/life-stages/pregnancy-dental-care", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/life-stages/senior-dental-care", priority: "0.85", changefreq: "monthly", lastmod: today },
  // Dental Emergency pages
  { path: "/dental-emergencies", priority: "0.9", changefreq: "monthly", lastmod: today },
  { path: "/dental-emergencies/knocked-out-tooth", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/dental-emergencies/dental-emergency-guide", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/dental-emergencies/broken-tooth", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/dental-emergencies/severe-toothache", priority: "0.85", changefreq: "monthly", lastmod: today },
  { path: "/dental-emergencies/dental-abscess", priority: "0.85", changefreq: "monthly", lastmod: today },
];

// Sitemap cache: regenerated on demand and invalidated when blog content changes
let cachedSitemap: string | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour max cache

/**
 * Invalidate the sitemap cache. Call this whenever blog posts are
 * created, updated, published, unpublished, or deleted.
 */
export function invalidateSitemapCache(): void {
  cachedSitemap = null;
  cacheTimestamp = 0;
  console.log("[Sitemap] Cache invalidated. Next request will regenerate");
}

export async function generateSitemapXml(): Promise<string> {
  // Return cached version if still valid
  if (cachedSitemap && Date.now() - cacheTimestamp < CACHE_TTL_MS) {
    return cachedSitemap;
  }

  let blogUrls = "";

  try {
    const result = await listBlogPosts({ publishedOnly: true, limit: 1000 });
    const posts = result.posts;
    for (const post of posts) {
      const lastmod = post.updatedAt
        ? new Date(post.updatedAt).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];
      blogUrls += `
  <url>
    <loc>${SITE_URL}/oral-health-hub/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }
  } catch (e) {
    // If blog fetch fails, continue with static routes only
    console.error("Failed to fetch blog posts for sitemap:", e);
  }

  const staticUrls = staticRoutes
    .map(
      (r) => `
  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${blogUrls}
</urlset>`;

  // Cache the result
  cachedSitemap = xml;
  cacheTimestamp = Date.now();

  return xml;
}

// Shared sitemap handler with proper cache headers for CDN/edge
const serveSitemap = async (_req: Request, res: Response) => {
  try {
    const sitemap = await generateSitemapXml();
    res.set("Content-Type", "application/xml; charset=utf-8");
    // Cache headers: short edge cache, no stale content
    res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
    res.send(sitemap);
  } catch (e) {
    console.error("Sitemap generation error:", e);
    res.status(500).send("Error generating sitemap");
  }
};

export function registerSeoRoutes(app: Express) {
  // robots.txt - Fixed: Allow /api/sitemap explicitly before Disallow /api/
  // Also references all three sitemap URLs for maximum discoverability
  app.get("/robots.txt", (_req: Request, res: Response) => {
    res.type("text/plain");
    res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
    res.send(`User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-custom.xml

# Allow sitemap API endpoint explicitly (before Disallow /api/)
Allow: /api/sitemap

# Disallow admin pages
Disallow: /admin
Disallow: /admin/*

# Disallow API endpoints (except sitemap above)
Disallow: /api/
`);
  });

  // llms.txt - Information for AI/LLM crawlers about the site
  app.get("/llms.txt", (_req: Request, res: Response) => {
    res.type("text/plain");
    res.set("Cache-Control", "public, max-age=0, s-maxage=3600, must-revalidate");
    res.send(`# DentaSmart - Your Personal AI Oral Health Guide
> AI-powered dental health analysis and personalized oral care guidance.

DentaSmart helps people understand their oral health through AI-powered photo analysis, personalized care plans, and clear dental education content.

## Main Pages
- [Home](${SITE_URL}/)
- [How It Works](${SITE_URL}/how-it-works)
- [Features](${SITE_URL}/features)
- [Pricing](${SITE_URL}/pricing)
- [Download](${SITE_URL}/download)
- [Instant Scan](${SITE_URL}/instant-scan)
- [Symptom Quiz](${SITE_URL}/symptom-quiz)
- [FAQs](${SITE_URL}/faqs)

## Oral Health Resources
- [Oral Health Hub](${SITE_URL}/oral-health-hub)
- [Dental Conditions](${SITE_URL}/conditions)
- [Dental Symptoms](${SITE_URL}/symptoms)
- [Oral Health Guides](${SITE_URL}/guides)
- [Dental Answers](${SITE_URL}/answers)

## Hub Pages
- [Affordability Guide](${SITE_URL}/oral-health-hub/affordability)
- [Second Opinion Guide](${SITE_URL}/oral-health-hub/second-opinion)
- [Prevention Guide](${SITE_URL}/oral-health-hub/prevention)
- [Conditions Guide](${SITE_URL}/oral-health-hub/conditions)
- [Symptoms Guide](${SITE_URL}/oral-health-hub/symptoms)

## Dental Cost Guides
- [Dental Costs Hub](${SITE_URL}/dental-costs)
- [Root Canal Cost](${SITE_URL}/dental-costs/root-canal-cost)
- [Dental Implant Cost](${SITE_URL}/dental-costs/dental-implant-cost)
- [Braces Cost](${SITE_URL}/dental-costs/braces-cost)
- [Veneers Cost](${SITE_URL}/dental-costs/veneers-cost)
- [Wisdom Teeth Removal Cost](${SITE_URL}/dental-costs/wisdom-teeth-removal-cost)
- [Teeth Whitening Cost](${SITE_URL}/dental-costs/teeth-whitening-cost)
- [Dental Crown Cost](${SITE_URL}/dental-costs/dental-crown-cost)
- [Tooth Extraction Cost](${SITE_URL}/dental-costs/tooth-extraction-cost)
- [Dental Cleaning Cost](${SITE_URL}/dental-costs/dental-cleaning-cost)
- [Dentures Cost](${SITE_URL}/dental-costs/dentures-cost)

## Treatment Guides
- [Treatment Guides Hub](${SITE_URL}/treatments)
- [Root Canal Procedure](${SITE_URL}/treatments/root-canal-procedure)
- [Dental Implant Procedure](${SITE_URL}/treatments/dental-implant-procedure)
- [Wisdom Teeth Removal](${SITE_URL}/treatments/wisdom-teeth-removal)
- [Dental Crown Procedure](${SITE_URL}/treatments/dental-crown-procedure)
- [Braces Treatment](${SITE_URL}/treatments/braces-treatment)
- [Teeth Whitening Procedure](${SITE_URL}/treatments/teeth-whitening-procedure)
- [Tooth Extraction Procedure](${SITE_URL}/treatments/tooth-extraction-procedure)
- [Dental Cleaning Procedure](${SITE_URL}/treatments/dental-cleaning-procedure)
- [Veneers Procedure](${SITE_URL}/treatments/veneers-procedure)
- [Dentures Treatment](${SITE_URL}/treatments/dentures-treatment)

## Dental Comparison Guides
- [Comparison Guides Hub](${SITE_URL}/comparisons)
- [Braces vs Invisalign](${SITE_URL}/comparisons/braces-vs-invisalign)
- [Dental Implants vs Dentures](${SITE_URL}/comparisons/dental-implants-vs-dentures)
- [Crown vs Veneer](${SITE_URL}/comparisons/crown-vs-veneer)
- [Electric vs Manual Toothbrush](${SITE_URL}/comparisons/electric-vs-manual-toothbrush)
- [Fluoride vs Fluoride-Free Toothpaste](${SITE_URL}/comparisons/fluoride-vs-fluoride-free-toothpaste)

## Life Stages Dental Care
- [Life Stages Hub](${SITE_URL}/life-stages)
- [Baby Teething Guide](${SITE_URL}/life-stages/baby-teething-guide)
- [Children's Dental Health](${SITE_URL}/life-stages/childrens-dental-health)
- [Teen Braces Guide](${SITE_URL}/life-stages/teen-braces-guide)
- [Pregnancy Dental Care](${SITE_URL}/life-stages/pregnancy-dental-care)
- [Senior Dental Care](${SITE_URL}/life-stages/senior-dental-care)

## Dental Emergencies
- [Dental Emergencies Hub](${SITE_URL}/dental-emergencies)
- [Knocked Out Tooth](${SITE_URL}/dental-emergencies/knocked-out-tooth)
- [Dental Emergency Guide](${SITE_URL}/dental-emergencies/dental-emergency-guide)
- [Broken Tooth](${SITE_URL}/dental-emergencies/broken-tooth)
- [Severe Toothache](${SITE_URL}/dental-emergencies/severe-toothache)
- [Dental Abscess](${SITE_URL}/dental-emergencies/dental-abscess)

## Product Comparisons
- [DentaSmart vs ChatGPT for Dental](${SITE_URL}/compare/dentasmart-vs-chatgpt-dental)
- [DentaSmart vs Teledentistry](${SITE_URL}/compare/dentasmart-vs-teledentistry)
- [DentaSmart vs Dental Insurance](${SITE_URL}/compare/dentasmart-vs-dental-insurance)

## Company
- [Team](${SITE_URL}/team)
- [For Employers](${SITE_URL}/employers)
- [Privacy Policy](${SITE_URL}/privacy-policy)
- [Terms of Service](${SITE_URL}/terms-of-service)

## Contact
- Website: ${SITE_URL}
- Instagram: https://www.instagram.com/dentasmart.ai
- LinkedIn: https://www.linkedin.com/company/dentasmart
`);
  });

  // PRIMARY: /sitemap-custom.xml - Custom path unlikely to be overridden by platform
  app.get("/sitemap-custom.xml", serveSitemap);

  // /api/sitemap - API route that works through Express
  app.get("/api/sitemap", serveSitemap);

  // /sitemap.xml - Standard path (platform CDN may override in production,
  // but we register it anyway for dev and as a fallback)
  app.get("/sitemap.xml", serveSitemap);
}
