import { describe, expect, it } from "vitest";
import { injectMetaTags } from "./metaTags";

const template = `<!doctype html>
<html><head>
<title>__PAGE_TITLE__</title>
<meta name="description" content="__PAGE_DESCRIPTION__" />
<meta property="og:title" content="__PAGE_TITLE__" />
<meta property="og:description" content="__PAGE_DESCRIPTION__" />
<meta name="twitter:title" content="__PAGE_TITLE__" />
<meta name="twitter:description" content="__PAGE_DESCRIPTION__" />
<meta property="og:url" content="__PAGE_CANONICAL__" />
<link rel="canonical" href="__PAGE_CANONICAL__" />
</head><body></body></html>`;

describe("Advanced CMS social metadata injection", () => {
  it("preserves normal site metadata when no social overrides are entered", () => {
    const output = injectMetaTags(template, {
      title: "Toothache",
      description: "An informational guide about toothache",
      canonical: "https://dentasmart.ai/conditions/toothache/",
    });
    expect(output).toContain('<meta property="og:title" content="Toothache | DentaSmart" />');
    expect(output).toContain('<meta name="twitter:title" content="Toothache | DentaSmart" />');
    expect(output).toContain('<meta property="og:description" content="An informational guide about toothache" />');
    expect(output).toContain('<link rel="canonical" href="https://dentasmart.ai/conditions/toothache/" />');
  });

  it("outputs independent social title and description for noindex CMS test pages", () => {
    const output = injectMetaTags(template, {
      title: "Toothache SEO title",
      description: "Public search description",
      ogTitle: "Helpful social share headline",
      ogDescription: "A summary for sharing",
      canonical: null,
      robots: "noindex, nofollow",
    });
    expect(output).toContain("<title>Toothache SEO title | DentaSmart</title>");
    expect(output).toContain('<meta name="description" content="Public search description" />');
    expect(output).toContain('<meta property="og:title" content="Helpful social share headline | DentaSmart" />');
    expect(output).toContain('<meta name="twitter:title" content="Helpful social share headline | DentaSmart" />');
    expect(output).toContain('<meta property="og:description" content="A summary for sharing" />');
    expect(output).toContain('<meta name="twitter:description" content="A summary for sharing" />');
    expect(output).toContain('<meta name="robots" content="noindex, nofollow" />');
    expect(output).not.toMatch(/rel="canonical"/);
    expect(output).not.toMatch(/property="og:url"/);
  });

  it("keeps X/Twitter overrides distinct from Open Graph when explicitly supplied", () => {
    const output = injectMetaTags(template, {
      title: "Toothache SEO title",
      description: "Public search description",
      ogTitle: "Facebook and LinkedIn headline",
      ogDescription: "General social summary",
      twitterTitle: "Short X headline",
      twitterDescription: "Short X summary",
      canonical: null,
      robots: "noindex, nofollow",
    });
    expect(output).toContain('<meta property="og:title" content="Facebook and LinkedIn headline | DentaSmart" />');
    expect(output).toContain('<meta name="twitter:title" content="Short X headline | DentaSmart" />');
    expect(output).toContain('<meta property="og:description" content="General social summary" />');
    expect(output).toContain('<meta name="twitter:description" content="Short X summary" />');
    expect(output).not.toMatch(/rel="canonical"/);
  });

  it("escapes untrusted social metadata before inserting HTML", () => {
    const output = injectMetaTags(template, {
      title: "Page",
      description: "Standard",
      ogTitle: 'Fun <script>alert("bad")</script>',
      ogDescription: '<img src=x onerror="bad()"> & test',
      canonical: null,
      robots: "noindex, nofollow",
    });
    expect(output).not.toContain("<script>");
    expect(output).not.toContain("<img");
    expect(output).toContain("&lt;script&gt;");
    expect(output).toContain("&amp; test");
  });
});
