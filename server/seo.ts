import { Express, Request, Response } from "express";
import { listBlogPosts } from "./blogDb";
import { staticRoutes as allRoutes } from "../shared/routes";
import { resolveRedirect } from "./redirectCache";
import { company, pricing } from "../shared/facts";

const SITE_URL = "https://dentasmart.ai";
const NL = "\r\n";

// All static routes for the sitemap (NO admin routes)
// Each route includes lastmod for better crawl efficiency
const today = new Date().toISOString().split("T")[0];

// ============================================================
// Per-type sitemap defaults (used when route has no per-route override)
// ============================================================
const TYPE_DEFAULTS: Record<string, { priority: string; changefreq: string }> = {
  "Single Page":      { priority: "0.8",  changefreq: "monthly" },
  "Index":            { priority: "0.8",  changefreq: "weekly" },
  "Hub":              { priority: "0.8",  changefreq: "weekly" },
  "Employer":         { priority: "0.7",  changefreq: "monthly" },
  "Condition":        { priority: "0.8",  changefreq: "monthly" },
  "Symptom":          { priority: "0.8",  changefreq: "monthly" },
  "Treatment":        { priority: "0.85", changefreq: "monthly" },
  "Dental Cost":      { priority: "0.9",  changefreq: "monthly" },
  "Comparison":       { priority: "0.85", changefreq: "monthly" },
  "Guide":            { priority: "0.8",  changefreq: "monthly" },
  "Life Stage":       { priority: "0.85", changefreq: "monthly" },
  "Lifestyle":        { priority: "0.85", changefreq: "monthly" },
  "Dental Emergency": { priority: "0.85", changefreq: "monthly" },
};

/**
 * Build a set of enabled redirect source paths from the redirect cache.
 * If the cache fails to load, returns an empty set so sitemap generation
 * continues without redirect filtering (never fails sitemap generation).
 */
async function getEnabledRedirectSources(): Promise<Set<string>> {
  const sources = new Set<string>();
  try {
    // We only need to trigger a single load  -  the cache is shared in-process.
    // Probe with a dummy path to warm the cache, then inspect via resolveRedirect
    // for each candidate. This is safe: resolveRedirect returns { entry, cacheIsLoaded }.
    // If cacheIsLoaded is false after the probe, skip filtering entirely.
    const probe = await resolveRedirect("/__sitemap_probe__");
    if (!probe.cacheIsLoaded) {
      console.warn("[Sitemap] Redirect cache unavailable  -  skipping redirect filter");
      return sources;
    }
    // Walk all routes that are candidates for the sitemap and check each path.
    // We also check trailing-slash variants for blog paths.
    for (const route of allRoutes) {
      if (route.inSitemap === false) continue;
      const { entry } = await resolveRedirect(route.path);
      if (entry && entry.isEnabled) {
        sources.add(route.path);
      }
    }
  } catch (err) {
    console.error("[Sitemap] Error building redirect source set:", (err as Error)?.message);
  }
  return sources;
}

/**
 * Derive a sitemap entry array from shared/routes.ts for the given type(s),
 * filtered by inSitemap !== false and not an enabled redirect source.
 */
function deriveRoutes(
  routes: typeof allRoutes,
  types: string[],
  redirectSources: Set<string>
): Array<{ path: string; priority: string; changefreq: string; lastmod: string }> {
  return routes
    .filter((r) => types.includes(r.type) && r.inSitemap !== false && !redirectSources.has(r.path))
    .map((r) => {
      const defaults = TYPE_DEFAULTS[r.type] ?? { priority: "0.7", changefreq: "monthly" };
      return {
        path: r.path,
        priority: r.priority ?? defaults.priority,
        changefreq: r.changefreq ?? defaults.changefreq,
        lastmod: r.lastmod ?? today,
      };
    });
}

export function invalidateSitemapCache(): void {
  // Legacy cache removed  -  segmented sitemaps regenerate on each request.
  // This function is kept as a no-op because blogRouter and blogAgent import it.
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
// Segmented sitemap generation
// ============================================================
async function generateBlogSitemap(): Promise<string> {
  let blogUrls: Array<{ path: string; priority: string; changefreq: string; lastmod: string }> = [];
  try {
    const result = await listBlogPosts({ publishedOnly: true, limit: 1000 });
    // Build redirect source set  -  if cache is unavailable, skip filtering (never fail sitemap)
    const redirectSources = await getEnabledRedirectSources();
    blogUrls = result.posts
      .map((post) => ({
        path: `/oral-health-hub/${post.slug}`,
        priority: "0.7",
        changefreq: "weekly",
        lastmod: post.updatedAt
          ? new Date(post.updatedAt).toISOString().split("T")[0]
          : today,
      }))
      // Exclude any post whose canonical path is an enabled redirect source
      .filter((entry) => !redirectSources.has(entry.path) && !redirectSources.has(entry.path + "/"));
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
// llms.txt content builder
// ============================================================
export function toFinalPublicUrl(rawUrl: string): string {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return rawUrl;
  }

  if (url.hostname !== "dentasmart.ai" && url.hostname !== "www.dentasmart.ai") {
    return rawUrl;
  }

  url.protocol = "https:";
  url.hostname = "dentasmart.ai";
  url.pathname = url.pathname.replace(/\/{2,}/g, "/");

  const finalSegment = url.pathname.split("/").filter(Boolean).at(-1) ?? "";
  const isFileLike = /\.[a-z0-9]{1,10}$/i.test(finalSegment) || finalSegment === "images" || finalSegment === "assets";
  if (!isFileLike && url.pathname !== "/" && !url.pathname.endsWith("/")) {
    url.pathname += "/";
  }

  return url.toString();
}

function normalizeLlmsOutputUrls(content: string): string {
  return content.replace(/https?:\/\/[^\s)\]}]+/g, toFinalPublicUrl);
}

function buildLlmsTxt(): string {
  const content = [
    "# DentaSmart - Your Personal AI Dentist in Your Pocket",
    "> AI-powered oral health education and decision-preparation tools.",
    "",
    "DentaSmart helps people organize oral health information with supported photo, X-ray, treatment-document, and educational tools. It provides educational information and does not diagnose conditions or replace professional dental care.",
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
    "1. Add supported mouth photos, dental X-rays, or treatment documents",
    "2. Review educational observations and plain-language information",
    "3. View an Oral Health Score (0-100) when it is included with the selected service",
    "4. Organize questions to discuss with a licensed dentist",
    "5. Track records and reminders when the selected service includes them",
    "6. Use educational comparison information before discussing a treatment plan with a dentist",
    "",
    "## Current Pricing",
    "",
    "Use the live pricing page as the source of truth:",
    `${SITE_URL}/pricing`,
    "",
    "Known public pricing:",
    `- Free Quick Check: ${pricing.quickCheck.priceFormatted}, unlimited checks -- use supported mouth photos, supported X-rays, or both; free X-ray submissions show a reduced subset of eligible finding data`,
    `- Full Quick Check: ${pricing.fullQuickCheck.priceFormatted} per case -- unlocks the paid Quick Check package and full eligible X-ray insights for one case`,
    `- Treatment Plan Review: ${pricing.treatmentPlanReview.priceFormatted} per case -- educational plain-language review of a supported dentist treatment plan and questions to discuss with a dentist`,
    `- Complete Care (Individual): ${pricing.completeCareIndividual.priceFormatted}/year -- year-round access to applicable reports, Oral Health Score tracking, guided self-examination, record organization, and Dr. Din access`,
    `- Complete Care (Family): ${pricing.completeCareFamily.priceFormatted}/year -- up to 4 family members, separate profiles, reports, Oral Health Score tracking, dental history, and Dr. Din access; +${pricing.additionalFamilyMember.priceFormatted}/yr per additional member`,
    "- Benefits: availability, eligibility, and terms are not published as general consumer claims",
    "",
    "## App Availability",
    "- iOS: Live on App Store",
    "- Android: Live on Google Play",
    "",
    "## Contact",
    `- Website: ${SITE_URL}`,
    `- Instagram: ${company.social.instagram}`,
    `- LinkedIn: ${company.social.linkedin}`,
    "",
    "## Important Notes",
    "- DentaSmart is NOT a replacement for professional dental care",
    "- AI analysis is for educational and informational purposes only",
    "- Users should always consult a licensed dentist for diagnosis and treatment",
    "- The app helps users understand their oral health and make informed decisions",
    ""
  ];
  return normalizeLlmsOutputUrls(content.join(NL));
}

// ============================================================
// llms-full.txt content builder (extended with page summaries)
// ============================================================
function buildLlmsFullTxt(): string {
  const content = [
    "# DentaSmart - Full Content Reference for AI Engines",
    "> Complete content reference for DentaSmart.ai, an AI-powered oral health education app (Your Personal AI Dentist in Your Pocket).",
    "",
    "## About DentaSmart",
    "",
    "DentaSmart is Your Personal AI Dentist in Your Pocket. It is an AI-powered oral health app that helps everyday people organize supported mouth photos, dental X-rays, treatment documents, and educational information. Selected services may include an Oral Health Score from 0 to 100, plain-language reports, and question preparation. DentaSmart provides educational information and does not diagnose conditions or replace a licensed dentist.",
    "",
    "For compliance-sensitive contexts, DentaSmart can also be described as an AI Dentist or AI Oral Health tool.",
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
    "Step 1: Add supported mouth photos, dental X-rays, or treatment documents in the DentaSmart app.",
    "Step 2: DentaSmart reviews the information included with your selected service.",
    "Step 3: Review an educational report with plain-language information and an Oral Health Score when included.",
    "Step 4: Prepare questions for a licensed dentist and organize records or reminders when your selected service includes them.",
    "",
    "## Current Pricing (Source of Truth: https://dentasmart.ai/pricing)",
    "",
    "Free Quick Check: $0 with unlimited checks. Use supported mouth photos, supported X-rays, or both. Free X-ray submissions show a reduced subset of eligible finding data.",

    "Full Quick Check: $19.99 per case. Unlocks the paid Quick Check package and full eligible X-ray insights for one case. It does not provide a diagnosis.",
    "",
    "Treatment Plan Review: $29.99 per case. Upload a supported dentist treatment plan for an educational plain-language review and questions to discuss with your dentist.",
    "",
    "Complete Care: $74.99/year individual. Year-round access for one person to applicable reports, Oral Health Score tracking, guided self-examination, record organization, preventive education, and Dr. Din access. It provides educational information, not diagnosis or treatment.",
    "",
    "Complete Care Family: $149.99/year for up to 4 family members. Separate profiles, reports, Oral Health Score tracking, dental history, and Dr. Din access for each member. Additional members are $19.99/year each.",
    "",
    "Benefits: availability, eligibility, and terms are not published as general consumer claims.",
    "",
    "## Key Features",
    "",
    "Free Quick Check: Use supported mouth photos, supported X-rays, or both for unlimited free checks. Free X-ray submissions show a reduced subset of eligible finding data.",
    "Full Quick Check: Unlock the paid Quick Check package and full eligible X-ray insights for one supported case.",
    "Guided Self-Examination: A structured self-observation activity that can help you organize information to discuss with a dentist. Included when the selected service offers it.",
    "Complete Reports: Complete Care includes patient-friendly and dentist-ready reports that can be downloaded, shared, and used to prepare questions for professional care.",
    "Oral Health Score: A 0-100 score that can be tracked over time when included with the selected service.",
    "Dr. Din: An AI oral health guide that can explain DentaSmart reports, findings, dental terms, history, and general oral-health information. It does not provide diagnosis or treatment.",
    "Treatment Plan Review: Upload a supported treatment plan from your dentist for an educational plain-language review before your next discussion with a dentist.",
    "Family Profiles: Monitor oral health for up to 4 family members under one account.",
    "Cost Guides: Review educational cost context, which can vary by location, provider, insurance, and treatment needs.",
    "Educational guidance: Organize oral health information and questions before discussing care with a dentist.",
    "Reminders: Get notifications for brushing, flossing, and dental checkups.",
    "",
    "## App Availability",
    "",
    "iOS: Live on the Apple App Store.",
    "Android: Live on Google Play. Download at https://play.google.com/store/apps/details?id=com.dentaSmart.app.android",
    "",
    "## DentaSmart vs ChatGPT for Dental Questions",
    "",
    "This comparison discusses the role of general-purpose AI and DentaSmart's oral health education tools. DentaSmart supports educational review of selected dental photos, X-rays, and treatment documents, an Oral Health Score when included, and record organization. DentaSmart does not diagnose conditions or replace a licensed dentist.",
    "",
    "## DentaSmart vs Teledentistry",
    "",
    "This comparison explains the different roles of teledentistry and DentaSmart's educational tools. DentaSmart is a separate educational app with published service prices. It can help users organize information and prepare questions for a dentist, but it does not replace professional care.",
    "",
    "## DentaSmart vs Dental Insurance",
    "",
    "This comparison explains the difference between dental insurance and DentaSmart. DentaSmart has published individual and family annual prices and is not dental insurance. It provides educational tools and does not pay claims, replace coverage, or replace professional dental care.",
    "",
    "## Page Summaries",
    "",
    "### Homepage (https://dentasmart.ai/)",
    "DentaSmart helps you organize oral health information. Add supported mouth photos or X-rays to receive educational information and prepare questions for a licensed dentist.",
    "",
    "### How It Works (https://dentasmart.ai/how-it-works)",
    "Four steps: Add information, DentaSmart review, educational report, and question preparation or monitoring when included. DentaSmart provides educational information and does not diagnose conditions.",
    "",
    "### Features (https://dentasmart.ai/features)",
    "Unlimited Free Quick Checks; Full Quick Check with full eligible X-ray insights for one case; Treatment Plan Review; guided self-examination when included; reports; Oral Health Score tracking; Dr. Din explanations; family profiles; history; and reminders.",
    "",
    "### Pricing (https://dentasmart.ai/pricing)",
    "Free Quick Check is unlimited. Full Quick Check is $19.99 per case. Treatment Plan Review is $29.99 per case. Complete Care is $74.99/year individual or $149.99/year family for year-round access to applicable reports, record organization, and educational monitoring tools.",
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
    "DentaSmart offers an educational oral health service for employers exploring decision-support tools. It is not dental insurance, and employer eligibility and service terms require separate confirmation.",
    "",
    "## New AEO Content (Published April 2026)",
    "",
    "### AEO Blog Posts",
    "What Is an AI Oral Health Guide (https://dentasmart.ai/oral-health-hub/what-is-ai-oral-health-guide) - Explains what AI dental tools are and how DentaSmart works as your personal AI dentist.",
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
    "DentaSmart vs Dental Insurance (https://dentasmart.ai/compare/dentasmart-vs-dental-insurance/)",
    "DentaSmart vs Traditional Second Opinion (https://dentasmart.ai/oral-health-hub/dentasmart-vs-traditional-second-opinion)",
    "DentaSmart vs Dental Discount Plans (https://dentasmart.ai/oral-health-hub/dentasmart-vs-dental-discount-plans)",
    "DentaSmart vs Dental Savings Plans (https://dentasmart.ai/oral-health-hub/dentasmart-vs-dental-savings-plans)",
    "DentaSmart vs Toothpic (https://dentasmart.ai/oral-health-hub/dentasmart-vs-toothpic)",
    "DentaSmart vs Pearl and Overjet (https://dentasmart.ai/oral-health-hub/dentasmart-vs-pearl-overjet)",
    "DentaSmart vs Googling Dental Symptoms (https://dentasmart.ai/oral-health-hub/dentasmart-vs-googling-dental-symptoms)",
    "DentaSmart vs Waiting for Dental Visit (https://dentasmart.ai/oral-health-hub/dentasmart-vs-waiting-for-dental-visit)",
    "",
    "### Listicle Pages",
    "7 Best AI Dental Apps in 2026 (https://dentasmart.ai/oral-health-hub/top-10-best-ai-dental-apps/)",
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
    `Instagram: ${company.social.instagram}`,
    `LinkedIn: ${company.social.linkedin}`,
    "",
    "## Important Notes",
    "",
    "DentaSmart provides AI-powered oral health insights and education. It helps users prepare for better dentist conversations. DentaSmart does not replace a licensed dentist for diagnosis or treatment. Emergency symptoms should be handled by a licensed dentist, urgent care, or emergency services.",
    ""
  ];
  return normalizeLlmsOutputUrls(content.join(NL));
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
  // ── sitemap-pages: Single Page + Index + Hub + Employer ──────────────────
  app.get("/sitemap-pages.xml", async (_req: Request, res: Response) => {
    try {
      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
      const redirectSources = await getEnabledRedirectSources();
      const routes = deriveRoutes(allRoutes, ["Single Page", "Index", "Hub"], redirectSources);
      res.send(generateSegmentedSitemap(routes));
    } catch (e) {
      console.error("sitemap-pages error:", e);
      res.status(500).send("Error generating sitemap-pages");
    }
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

  app.get("/sitemap-conditions.xml", async (_req: Request, res: Response) => {
    try {
      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
      const redirectSources = await getEnabledRedirectSources();
      res.send(generateSegmentedSitemap(deriveRoutes(allRoutes, ["Condition"], redirectSources)));
    } catch (e) { console.error("sitemap-conditions error:", e); res.status(500).send("Error"); }
  });

  app.get("/sitemap-symptoms.xml", async (_req: Request, res: Response) => {
    try {
      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
      const redirectSources = await getEnabledRedirectSources();
      res.send(generateSegmentedSitemap(deriveRoutes(allRoutes, ["Symptom"], redirectSources)));
    } catch (e) { console.error("sitemap-symptoms error:", e); res.status(500).send("Error"); }
  });

  app.get("/sitemap-treatments.xml", async (_req: Request, res: Response) => {
    try {
      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
      const redirectSources = await getEnabledRedirectSources();
      res.send(generateSegmentedSitemap(deriveRoutes(allRoutes, ["Treatment"], redirectSources)));
    } catch (e) { console.error("sitemap-treatments error:", e); res.status(500).send("Error"); }
  });

  app.get("/sitemap-costs.xml", async (_req: Request, res: Response) => {
    try {
      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
      const redirectSources = await getEnabledRedirectSources();
      res.send(generateSegmentedSitemap(deriveRoutes(allRoutes, ["Dental Cost"], redirectSources)));
    } catch (e) { console.error("sitemap-costs error:", e); res.status(500).send("Error"); }
  });

  app.get("/sitemap-comparisons.xml", async (_req: Request, res: Response) => {
    try {
      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
      const redirectSources = await getEnabledRedirectSources();
      res.send(generateSegmentedSitemap(deriveRoutes(allRoutes, ["Comparison"], redirectSources)));
    } catch (e) { console.error("sitemap-comparisons error:", e); res.status(500).send("Error"); }
  });

  app.get("/sitemap-guides.xml", async (_req: Request, res: Response) => {
    try {
      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
      const redirectSources = await getEnabledRedirectSources();
      res.send(generateSegmentedSitemap(deriveRoutes(allRoutes, ["Guide"], redirectSources)));
    } catch (e) { console.error("sitemap-guides error:", e); res.status(500).send("Error"); }
  });

  app.get("/sitemap-life-stages.xml", async (_req: Request, res: Response) => {
    try {
      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
      const redirectSources = await getEnabledRedirectSources();
      res.send(generateSegmentedSitemap(deriveRoutes(allRoutes, ["Life Stage"], redirectSources)));
    } catch (e) { console.error("sitemap-life-stages error:", e); res.status(500).send("Error"); }
  });

  app.get("/sitemap-emergencies.xml", async (_req: Request, res: Response) => {
    try {
      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
      const redirectSources = await getEnabledRedirectSources();
      res.send(generateSegmentedSitemap(deriveRoutes(allRoutes, ["Dental Emergency"], redirectSources)));
    } catch (e) { console.error("sitemap-emergencies error:", e); res.status(500).send("Error"); }
  });

  app.get("/sitemap-lifestyle.xml", async (_req: Request, res: Response) => {
    try {
      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
      const redirectSources = await getEnabledRedirectSources();
      res.send(generateSegmentedSitemap(deriveRoutes(allRoutes, ["Lifestyle"], redirectSources)));
    } catch (e) { console.error("sitemap-lifestyle error:", e); res.status(500).send("Error"); }
  });

  app.get("/sitemap-employers.xml", async (_req: Request, res: Response) => {
    try {
      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=0, s-maxage=300, must-revalidate");
      const redirectSources = await getEnabledRedirectSources();
      res.send(generateSegmentedSitemap(deriveRoutes(allRoutes, ["Employer"], redirectSources)));
    } catch (e) { console.error("sitemap-employers error:", e); res.status(500).send("Error"); }
  });

  // ============================================================
  // Deprecated flat sitemap routes  -  301 redirect to sitemap-index.xml
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
