import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

/**
 * Tests for the server-side meta tag injection system.
 * We test the pure functions (resolveMetaTags, injectMetaTags) directly.
 */

import { staticRoutes } from "../shared/routes";
// Import the functions under test
import {
  getNotFoundMeta,
  getStaticMetaSnapshot,
  injectMetaTags,
  normalizeBlogCanonical,
  resolveMetaTags,
} from "./metaTags";

// Sample HTML template matching the placeholder-based structure of index.html
const SAMPLE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>__PAGE_TITLE__</title>
  <meta name="description" content="__PAGE_DESCRIPTION__" />
  <link rel="canonical" href="__PAGE_CANONICAL__" />
  <meta property="og:title" content="__PAGE_TITLE__" />
  <meta property="og:description" content="__PAGE_DESCRIPTION__" />
  <meta property="og:image" content="https://dentasmart.ai/manus-storage/dentasmart-free-quick-check-social-1200x630_b33c85da.png" />
  <meta property="og:url" content="__PAGE_CANONICAL__" />
  <meta name="twitter:title" content="__PAGE_TITLE__" />
  <meta name="twitter:description" content="__PAGE_DESCRIPTION__" />
  <meta name="twitter:image" content="https://dentasmart.ai/manus-storage/dentasmart-free-quick-check-social-1200x630_b33c85da.png" />
  <script type="application/ld+json">{"@type":"WebPage","name":"Fixed schema title"}</script>
</head>
<body><div id="root"></div></body>
</html>`;

describe("injectMetaTags", () => {
  it("replaces __PAGE_TITLE__ in all locations", () => {
    const result = injectMetaTags(SAMPLE_HTML, {
      title: "Features | DentaSmart",
      description: "Explore features.",
      canonical: "https://dentasmart.ai/features",
    });
    expect(result).toContain("<title>Features | DentaSmart</title>");
    expect(result).toContain('og:title" content="Features | DentaSmart"');
    expect(result).toContain('twitter:title" content="Features | DentaSmart"');
    expect(result).not.toContain("__PAGE_TITLE__");
  });

  it("keeps the homepage tagline while using compact titles on representative routes", async () => {
    const expected = [
      ["/", "DentaSmart | Your Personal AI Dentist in Your Pocket"],
      ["/team", "Meet the DentaSmart Team and Advisors | DentaSmart"],
      ["/pricing", "DentaSmart Pricing | Free Quick Check, Full Quick Check & Complete Care | DentaSmart"],
      ["/features", "DentaSmart Features | Oral Health Reports and Tracking | DentaSmart"],
      ["/how-it-works", "How DentaSmart Works | AI Oral Health Guide in 4 Steps | DentaSmart"],
      ["/oral-health-hub", "Oral Health Hub: Conditions, Symptoms & Guides | DentaSmart"],
    ] as const;

    for (const [path, expectedTitle] of expected) {
      const meta = await resolveMetaTags(path);
      const result = injectMetaTags(SAMPLE_HTML, meta!);
      const escapedTitle = expectedTitle.replace(/&/g, "&amp;");

      expect(result).toContain(`<title>${escapedTitle}</title>`);
      expect(result).toContain(`og:title" content="${escapedTitle}"`);
      expect(result).toContain(`twitter:title" content="${escapedTitle}"`);
    }
  });

  it("normalizes the Buck Teeth legacy title without changing its description or canonical", () => {
    const description = "Buck teeth, or overjet, happen when upper front teeth stick out past 2mm.";
    const canonical = "https://dentasmart.ai/oral-health-hub/buck-teeth/";
    const result = injectMetaTags(SAMPLE_HTML, {
      title: "Buck Teeth (Overjet): Causes, Costs & How to Fix Them | Your Personal AI Dentist in Your Pocket",
      description,
      canonical,
    });

    const expectedTitle = "Buck Teeth (Overjet): Causes, Costs &amp; How to Fix Them | DentaSmart";
    expect(result).toContain(`<title>${expectedTitle}</title>`);
    expect(result).toContain(`og:title" content="${expectedTitle}"`);
    expect(result).toContain(`twitter:title" content="${expectedTitle}"`);
    expect(result).toContain(`name="description" content="${description}"`);
    expect(result).toContain(`href="${canonical}"`);
    expect(result).toContain(`og:url" content="${canonical}"`);
  });

  it("replaces __PAGE_DESCRIPTION__ in all locations", () => {
    const result = injectMetaTags(SAMPLE_HTML, {
      title: "Test",
      description: "A unique description for this page.",
      canonical: "https://dentasmart.ai/test",
    });
    expect(result).toContain(
      'name="description" content="A unique description for this page."'
    );
    expect(result).toContain(
      'og:description" content="A unique description for this page."'
    );
    expect(result).toContain(
      'twitter:description" content="A unique description for this page."'
    );
    expect(result).not.toContain("__PAGE_DESCRIPTION__");
  });

  it("replaces __PAGE_CANONICAL__ in all locations", () => {
    const result = injectMetaTags(SAMPLE_HTML, {
      title: "Test",
      description: "Test desc.",
      canonical: "https://dentasmart.ai/conditions/cavities",
    });
    expect(result).toContain('href="https://dentasmart.ai/conditions/cavities"');
    expect(result).toContain('og:url" content="https://dentasmart.ai/conditions/cavities"');
    expect(result).not.toContain("__PAGE_CANONICAL__");
    expect(result).not.toContain('name="robots"');
  });

  it("uses the meaningful free Quick Check card only for the homepage social image override", async () => {
    const homepage = await resolveMetaTags("/");
    const result = injectMetaTags(SAMPLE_HTML, homepage!);

    expect(result).toContain('property="og:image" content="https://dentasmart.ai/manus-storage/dentasmart-free-quick-check-social-1200x630_b33c85da.png"');
    expect(result).toContain('name="twitter:image" content="https://dentasmart.ai/manus-storage/dentasmart-free-quick-check-social-1200x630_b33c85da.png"');
    expect((await resolveMetaTags("/pricing"))?.ogImage).toBeUndefined();
  });

  it("keeps the static Open Graph and X fallback aligned with the approved homepage social card", () => {
    const template = readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
    const approvedSocialCard = "https://dentasmart.ai/manus-storage/dentasmart-free-quick-check-social-1200x630_b33c85da.png";

    expect(template).toContain(`property="og:image" content="${approvedSocialCard}"`);
    expect(template).toContain(`name="twitter:image" content="${approvedSocialCard}"`);
    expect(template).not.toContain("https://dentasmart.ai/images/og-image.png");
  });

  it("escapes HTML entities in title and description", () => {
    const result = injectMetaTags(SAMPLE_HTML, {
      title: 'Braces & Invisalign "Comparison"',
      description: "Compare <braces> & Invisalign options.",
      canonical: "https://dentasmart.ai/test",
    });
    expect(result).toContain("Braces &amp; Invisalign &quot;Comparison&quot;");
    expect(result).toContain("Compare &lt;braces&gt; &amp; Invisalign options.");
  });

  it("preserves the rest of the HTML unchanged", () => {
    const result = injectMetaTags(SAMPLE_HTML, {
      title: "New Title",
      description: "New desc.",
      canonical: "https://dentasmart.ai/",
    });
    expect(result).toContain('<div id="root"></div>');
    expect(result).toContain("<!DOCTYPE html>");
    expect(result).toContain('<meta charset="UTF-8" />');
    expect(result).toContain('{"@type":"WebPage","name":"Fixed schema title"}');
  });

  it("produces exactly one canonical tag", () => {
    const result = injectMetaTags(SAMPLE_HTML, {
      title: "Test",
      description: "Test",
      canonical: "https://dentasmart.ai/test",
    });
    const canonicalMatches = result.match(/rel="canonical"/g);
    expect(canonicalMatches).toHaveLength(1);
  });

  it("emits server-visible noindex 404 metadata without canonical or og:url", () => {
    const result = injectMetaTags(SAMPLE_HTML, getNotFoundMeta());
    expect(result).toContain("<title>Page Not Found | DentaSmart</title>");
    expect(result).toContain('name="robots" content="noindex, follow"');
    expect(result).not.toContain('rel="canonical"');
    expect(result).not.toContain('property="og:url"');
    expect(result).not.toContain("__PAGE_CANONICAL__");
  });
});

describe("resolveMetaTags", () => {
  it("returns server-visible noindex metadata for account deletion tokens only", async () => {
    const meta = await resolveMetaTags("/account/delete/example-token");
    expect(meta).toMatchObject({
      canonical: null,
      robots: "noindex, nofollow",
    });
  });

  it("returns server-visible noindex metadata for admin paths only", async () => {
    const meta = await resolveMetaTags("/admin/media-library");
    expect(meta).toMatchObject({
      canonical: null,
      robots: "noindex, nofollow",
    });
  });

  it("returns meta for the homepage", async () => {
    const meta = await resolveMetaTags("/");
    expect(meta).not.toBeNull();
    expect(meta!.title).toContain("DentaSmart");
    expect(meta!.description.length).toBeGreaterThan(50);
  });

  it("returns meta for /features", async () => {
    const meta = await resolveMetaTags("/features");
    expect(meta).not.toBeNull();
    expect(meta!.title).toContain("Features");
    expect(meta!.description).toContain("DentaSmart");
  });

  it("returns meta for /pricing", async () => {
    const meta = await resolveMetaTags("/pricing");
    expect(meta).not.toBeNull();
    expect(meta!.title).toContain("Pricing");
  });

  it("keeps SMS consent metadata aligned with the current provider wording", async () => {
    const meta = await resolveMetaTags("/sms-consent/");

    expect(meta).toMatchObject({
      title: "SMS Communication Preferences | DentaSmart",
      description: "Manage your consent to receive DentaSmart customer care-related or one-on-one communication messages.",
      canonical: "https://dentasmart.ai/sms-consent/",
    });
  });

  it("keeps the commercial route descriptions owned by their current page contracts", async () => {
    const expected = [
      ["/", "Start with unlimited Free Quick Checks using supported mouth photos, supported X-rays, or both. Full Quick Check unlocks full eligible X-ray insights for one case."],
      ["/pricing", "Compare unlimited Free Quick Check, Full Quick Check for $19.99 per case, Treatment Plan Review for $29.99 per case, and annual Complete Care plans."],
      ["/download", "Download DentaSmart for unlimited Free Quick Checks using supported mouth photos, supported X-rays, or both. Upgrade to Full Quick Check when you need full eligible X-ray insights."],
      ["/free-ai-teeth-scanner", "Use supported mouth photos for a free DentaSmart Quick Check. No X-ray is required. See visible areas to discuss with a dentist without receiving a diagnosis."],
      ["/instant-scan", "Learn how DentaSmart uses supported mouth photos and dental X-rays for educational observations that do not replace professional diagnosis or care."],
      ["/features", "Explore DentaSmart's unlimited Free Quick Checks, Full Quick Check, Treatment Plan Review, Oral Health Score tracking, reports, records, and guidance from Dr. Din."],
      ["/how-it-works", "Learn how DentaSmart reviews supported dental photos, X-rays, symptoms, and treatment documents to provide educational reports and questions for your dentist."],
      ["/employers", "Explore DentaSmart as an educational oral health resource for employees. Employer pricing, eligibility, implementation, and success measures are confirmed during discovery."],
      ["/compare/dentasmart-vs-chatgpt-dental", "Compare DentaSmart's purpose-built educational workflow with a general AI chatbot, including records, pricing, and professional-care boundaries."],
      ["/vs/dental-com", "Compare verified DentaSmart facts with a framework for checking Dental.com SmartScan's current features, pricing, availability, and professional-care boundaries."],
    ] as const;

    for (const [path, description] of expected) {
      const meta = await resolveMetaTags(path);
      expect(meta?.description).toBe(description);
    }
  });

  it("keeps the primary insurance comparison metadata neutral and self-canonical", async () => {
    const meta = await resolveMetaTags("/compare/dentasmart-vs-dental-insurance/");
    expect(meta).toMatchObject({
      title: "DentaSmart vs Dental Insurance | Different Purposes",
      description: "Compare DentaSmart's educational oral health tools with dental insurance. Learn what each may do, what neither replaces, and questions to review.",
      canonical: "https://dentasmart.ai/compare/dentasmart-vs-dental-insurance/",
    });
  });

  it("keeps the established /vs/Dental.com canonical owner stable", async () => {
    const meta = await resolveMetaTags("/vs/dental-com/");
    expect(meta).toMatchObject({
      title: "DentaSmart vs Dental.com SmartScan (2026) | Comparison Guide",
      canonical: "https://dentasmart.ai/vs/dental-com/",
    });
  });

  it("keeps the three Phase 9 medical-page metadata entries aligned with their qualified education pages", async () => {
    const expected = [
      {
        path: "/symptoms/tooth-pain-when-biting/",
        title: "Tooth Pain When Biting: What to Notice | DentaSmart",
        description: "Learn what to note about tooth pain when biting, possible reasons a dentist may consider, and when to seek timely dental care.",
      },
      {
        path: "/symptoms/tongue-pain/",
        title: "Tongue Pain: What to Notice and When to Get Care | DentaSmart",
        description: "Learn what to note about tongue pain, visible and non-visible symptoms, and when to contact a dentist or doctor.",
      },
      {
        path: "/treatments/root-canal-procedure/",
        title: "Root Canal Procedure: Steps, Recovery, and Questions | DentaSmart",
        description: "Learn how dentists may clean and seal the inside of a tooth during a root canal, what restoration may follow, and when to contact the treating clinician.",
      },
    ] as const;

    for (const item of expected) {
      const meta = await resolveMetaTags(item.path);
      expect(meta).toMatchObject({
        title: item.title,
        description: item.description,
        canonical: `https://dentasmart.ai${item.path}`,
      });
    }
  });

  it("returns public, self-canonical metadata for the Phase 6 governance resources", async () => {
    const expected = [
      ["/editorial-policy", "Editorial Policy"],
      ["/corrections-policy", "Corrections Policy"],
      ["/ai-use-disclosure", "AI Use Disclosure"],
      ["/product-facts", "Product Facts"],
    ] as const;

    for (const [path, title] of expected) {
      const meta = await resolveMetaTags(path);
      expect(meta).toMatchObject({
        title: expect.stringContaining(title),
        canonical: `https://dentasmart.ai${path}/`,
      });
      expect(meta?.robots).toBeUndefined();
    }
  });

  it("returns meta for /conditions/toothache", async () => {
    const meta = await resolveMetaTags("/conditions/toothache");
    expect(meta).not.toBeNull();
    expect(meta!.title.toLowerCase()).toContain("toothache");
  });

  it("returns meta for /symptoms/bleeding-gums", async () => {
    const meta = await resolveMetaTags("/symptoms/bleeding-gums");
    expect(meta).not.toBeNull();
    expect(meta!.title.toLowerCase()).toContain("bleeding gums");
  });

  it("returns meta for /dental-costs/root-canal-cost", async () => {
    const meta = await resolveMetaTags("/dental-costs/root-canal-cost");
    expect(meta).not.toBeNull();
    expect(meta!.title.toLowerCase()).toContain("root canal");
  });

  it("strips trailing slashes before lookup", async () => {
    const meta = await resolveMetaTags("/features/");
    expect(meta).not.toBeNull();
    expect(meta!.title).toContain("Features");
  });

  it("strips query strings before lookup", async () => {
    const meta = await resolveMetaTags("/pricing?ref=google");
    expect(meta).not.toBeNull();
    expect(meta!.title).toContain("Pricing");
  });

  it("strips hash fragments before lookup", async () => {
    const meta = await resolveMetaTags("/faqs#general");
    expect(meta).not.toBeNull();
    expect(meta!.title).toContain("FAQ");
  });

  it("returns null for unknown paths", async () => {
    const meta = await resolveMetaTags("/this-page-does-not-exist-xyz");
    expect(meta).toBeNull();
  });

  it("resolves page-specific server metadata for every indexable static manifest route", async () => {
    const indexableStaticRoutes = staticRoutes.filter((route) => route.inSitemap !== false);
    const staticMeta = getStaticMetaSnapshot();

    for (const route of indexableStaticRoutes) {
      if (!staticMeta[route.path]) {
        expect(route.label).toContain("redirect alias");
        continue;
      }

      const meta = await resolveMetaTags(`${route.path}/`);
      const canonicalPath = route.path === "/" ? "/" : `${route.path}/`;
      expect(meta).not.toBeNull();
      expect(meta!.title).not.toBe("DentaSmart");
      expect(meta!.description.length).toBeGreaterThan(0);
      expect(meta!.canonical).toBe(`https://dentasmart.ai${canonicalPath}`);
    }
  });

  it("returns unique descriptions for every static page", async () => {
    const paths = [
      "/",
      "/features",
      "/pricing",
      "/how-it-works",
      "/employers",
      "/team",
      "/faqs",
      "/download",
      "/conditions/toothache",
      "/conditions/cavities",
      "/conditions/gum-disease",
      "/symptoms/tooth-pain-when-biting",
      "/symptoms/bleeding-gums",
      "/symptoms/jaw-pain",
      "/dental-costs/root-canal-cost",
      "/dental-costs/dental-implant-cost",
      "/treatments/root-canal-procedure",
      "/treatments/dental-implant-procedure",
      "/comparisons/braces-vs-invisalign",
      "/guides/brushing-guide",
      "/guides/flossing-guide",
      "/life-stages/baby-teething-guide",
      "/dental-emergencies/knocked-out-tooth",
      "/lifestyle/smoking-and-oral-health",
    ];

    const descriptions = new Set<string>();
    for (const p of paths) {
      const meta = await resolveMetaTags(p);
      expect(meta).not.toBeNull();
      expect(meta!.description.length).toBeGreaterThan(30);
      // Check for uniqueness
      expect(descriptions.has(meta!.description)).toBe(false);
      descriptions.add(meta!.description);
    }
    // All descriptions should be unique
    expect(descriptions.size).toBe(paths.length);
  });
});

describe("normalizeBlogCanonical", () => {
  it("preserves apex DentaSmart behavior by adding a trailing slash", () => {
    expect(normalizeBlogCanonical(
      "https://dentasmart.ai/oral-health-hub/example-post",
      "example-post",
    )).toBe("https://dentasmart.ai/oral-health-hub/example-post/");
  });

  it("preserves an already-slashed apex DentaSmart canonical", () => {
    expect(normalizeBlogCanonical(
      "https://dentasmart.ai/oral-health-hub/example-post/",
      "example-post",
    )).toBe("https://dentasmart.ai/oral-health-hub/example-post/");
  });

  it("normalizes a www DentaSmart canonical without a slash to apex with a trailing slash", () => {
    expect(normalizeBlogCanonical(
      "https://www.dentasmart.ai/oral-health-hub/example-post",
      "example-post",
    )).toBe("https://dentasmart.ai/oral-health-hub/example-post/");
  });

  it("normalizes an already-slashed www DentaSmart canonical to the apex host", () => {
    expect(normalizeBlogCanonical(
      "https://www.dentasmart.ai/oral-health-hub/example-post/",
      "example-post",
    )).toBe("https://dentasmart.ai/oral-health-hub/example-post/");
  });

  it("uses the slashed DentaSmart fallback when canonicalUrl is blank", () => {
    expect(normalizeBlogCanonical("", "example-post"))
      .toBe("https://dentasmart.ai/oral-health-hub/example-post/");
  });

  it("preserves an external canonical exactly", () => {
    expect(normalizeBlogCanonical(
      "https://partner.example/article",
      "example-post",
    )).toBe("https://partner.example/article");
  });

  it("keeps normalized canonical output aligned across canonical and og:url injection", () => {
    const canonical = normalizeBlogCanonical(
      "https://dentasmart.ai/oral-health-hub/example-post",
      "example-post",
    );
    const result = injectMetaTags(SAMPLE_HTML, {
      title: "Example Post",
      description: "Example description.",
      canonical,
    });

    expect(result).toContain(`href="${canonical}"`);
    expect(result).toContain(`og:url" content="${canonical}"`);
  });
});
