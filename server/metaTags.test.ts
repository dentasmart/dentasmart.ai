import { describe, it, expect } from "vitest";

/**
 * Tests for the server-side meta tag injection system.
 * We test the pure functions (resolveMetaTags, injectMetaTags) directly.
 */

// Import the functions under test
import { resolveMetaTags, injectMetaTags } from "./metaTags";

// Sample HTML template matching the structure of index.html
const SAMPLE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>DentaSmart | Your AI Dentist in Your Pocket</title>
  <meta name="description" content="Get instant clarity about your oral health. Upload a photo of your teeth and get AI-powered insights, personalized care plans, and clear dental education in minutes." />
</head>
<body><div id="root"></div></body>
</html>`;

describe("injectMetaTags", () => {
  it("replaces the default title with a page-specific title", () => {
    const result = injectMetaTags(SAMPLE_HTML, {
      title: "Features | DentaSmart",
      description: "Explore features.",
    });
    expect(result).toContain("<title>Features | DentaSmart</title>");
    expect(result).not.toContain("Your AI Dentist in Your Pocket");
  });

  it("replaces the default meta description with a page-specific one", () => {
    const result = injectMetaTags(SAMPLE_HTML, {
      title: "Test",
      description: "A unique description for this page.",
    });
    expect(result).toContain(
      '<meta name="description" content="A unique description for this page."'
    );
    expect(result).not.toContain("Get instant clarity about your oral health");
  });

  it("escapes HTML entities in title and description", () => {
    const result = injectMetaTags(SAMPLE_HTML, {
      title: 'Braces & Invisalign "Comparison"',
      description: "Compare <braces> & Invisalign options.",
    });
    expect(result).toContain("Braces &amp; Invisalign &quot;Comparison&quot;");
    expect(result).toContain("Compare &lt;braces&gt; &amp; Invisalign options.");
  });

  it("preserves the rest of the HTML unchanged", () => {
    const result = injectMetaTags(SAMPLE_HTML, {
      title: "New Title",
      description: "New desc.",
    });
    expect(result).toContain('<div id="root"></div>');
    expect(result).toContain("<!DOCTYPE html>");
    expect(result).toContain('<meta charset="UTF-8" />');
  });
});

describe("resolveMetaTags", () => {
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
