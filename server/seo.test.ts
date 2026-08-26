import { describe, expect, it, vi, beforeEach } from "vitest";
import express from "express";
import request from "supertest";

// Mock the blogDb module before importing seo
vi.mock("./blogDb", () => ({
  listBlogPosts: vi.fn().mockResolvedValue({
    posts: [
      {
        id: 1,
        slug: "test-post",
        title: "Test Post",
        updatedAt: new Date("2026-01-15"),
      },
      {
        id: 2,
        slug: "another-post",
        title: "Another Post",
        updatedAt: new Date("2026-02-01"),
      },
    ],
    total: 2,
  }),
}));

import { registerSeoRoutes, toFinalPublicUrl } from "./seo";

function createTestApp() {
  const app = express();
  registerSeoRoutes(app);
  return app;
}

describe("SEO Routes", () => {
  describe("llms final public URL normalization", () => {
    it("normalizes DentaSmart pages to final trailing-slash URLs while preserving files and external URLs", () => {
      expect(toFinalPublicUrl("https://dentasmart.ai/pricing")).toBe("https://dentasmart.ai/pricing/");
      expect(toFinalPublicUrl("https://www.dentasmart.ai/guides/brushing-guide")).toBe("https://dentasmart.ai/guides/brushing-guide/");
      expect(toFinalPublicUrl("https://dentasmart.ai/images/logo.png")).toBe("https://dentasmart.ai/images/logo.png");
      expect(toFinalPublicUrl("https://partner.example/article")).toBe("https://partner.example/article");
    });

    it("preserves query strings and hashes while normalizing internal page paths", () => {
      expect(toFinalPublicUrl("https://dentasmart.ai/pricing?utm_source=test")).toBe("https://dentasmart.ai/pricing/?utm_source=test");
      expect(toFinalPublicUrl("https://dentasmart.ai/pricing#plans")).toBe("https://dentasmart.ai/pricing/#plans");
      expect(toFinalPublicUrl("https://dentasmart.ai/pricing/")).toBe("https://dentasmart.ai/pricing/");
    });

    it("publishes only final internal URLs in both llms endpoints without changing external social links", async () => {
      const app = createTestApp();
      for (const endpoint of ["/llms.txt", "/llms-full.txt"]) {
        const res = await request(app).get(endpoint);
        const internalUrls = res.text.match(/https:\/\/dentasmart\.ai[^\s)\]}]+/g) ?? [];
        expect(internalUrls.length).toBeGreaterThan(0);
        for (const url of internalUrls) {
          expect(url === "https://dentasmart.ai/" || /\.[a-z0-9]{1,10}$/i.test(url) || url.endsWith("/")).toBe(true);
        }
        expect(res.text).not.toContain("https://dentasmart.ai/oral-health-hub/best-ai-dental-apps/");
        if (endpoint === "/llms-full.txt") {
          expect(res.text).toContain("https://dentasmart.ai/oral-health-hub/top-10-best-ai-dental-apps/");
        }
        expect(res.text).toContain("https://www.instagram.com/dentasmart");
      }
    });
  });

  describe("GET /robots.txt", () => {
    it("should return robots.txt with correct content type", async () => {
      const app = createTestApp();
      const res = await request(app).get("/robots.txt");

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toContain("text/plain");
    });

    it("should contain User-agent and Allow directives", async () => {
      const app = createTestApp();
      const res = await request(app).get("/robots.txt");

      expect(res.text).toContain("User-agent: *");
      expect(res.text).toContain("Allow: /");
    });

    it("should reference /sitemap-index.xml as primary sitemap", async () => {
      const app = createTestApp();
      const res = await request(app).get("/robots.txt");

      expect(res.text).toContain("Sitemap: https://dentasmart.ai/sitemap-index.xml");
      expect(res.text).not.toContain("Sitemap: https://dentasmart.ai/sitemap.xml");
    });

    it("should allow /api/sitemap explicitly for crawlers", async () => {
      const app = createTestApp();
      const res = await request(app).get("/robots.txt");

      expect(res.text).toContain("Allow: /api/sitemap");
    });

    it("should not reference deprecated flat sitemap.xml", async () => {
      const app = createTestApp();
      const res = await request(app).get("/robots.txt");

      expect(res.text).not.toContain("Sitemap: https://dentasmart.ai/sitemap.xml");
    });

    it("should disallow admin and API paths", async () => {
      const app = createTestApp();
      const res = await request(app).get("/robots.txt");

      expect(res.text).toContain("Disallow: /admin");
      expect(res.text).toContain("Disallow: /api/");
    });

    it("should have proper cache headers", async () => {
      const app = createTestApp();
      const res = await request(app).get("/robots.txt");

      expect(res.headers["cache-control"]).toContain("must-revalidate");
    });
  });

  describe("GET /sitemap-custom.xml (deprecated — now 301 to sitemap-index.xml)", () => {
    it("should return 301 redirect to /sitemap-index.xml", async () => {
      const app = createTestApp();
      const res = await request(app).get("/sitemap-custom.xml");

      expect(res.status).toBe(301);
      expect(res.headers["location"]).toBe("/sitemap-index.xml");
    });

    // Legacy content tests removed — route now redirects, no XML body returned

    it("should include all key static routes via sitemap-index", async () => {
      const app = createTestApp();
      const res = await request(app).get("/sitemap-pages.xml");

      // sitemap-pages.xml uses trailing slashes on all non-root paths
      const keyRoutes = [
        "https://dentasmart.ai/",
        "https://dentasmart.ai/how-it-works/",
        "https://dentasmart.ai/features/",
        "https://dentasmart.ai/pricing/",
        "https://dentasmart.ai/faqs/",
        "https://dentasmart.ai/download/",
        "https://dentasmart.ai/instant-scan/",
        "https://dentasmart.ai/answers/",
        "https://dentasmart.ai/find-a-dentist/",
        "https://dentasmart.ai/oral-health-hub/",
      ];

      for (const route of keyRoutes) {
        expect(res.text).toContain(`<loc>${route}</loc>`);
      }
    });

    it("should include compare pages", async () => {
      const app = createTestApp();
      // compare pages are blog posts — they live in sitemap-blog.xml
      // In test environment, the mock DB returns test-post and another-post
      const res = await request(app).get("/sitemap-blog.xml");

      expect(res.text).toContain("oral-health-hub/test-post");
      expect(res.text).toContain("oral-health-hub/another-post");
    });

    it("should include blog post URLs from database using slugs", async () => {
      const app = createTestApp();
      const res = await request(app).get("/sitemap-blog.xml");

      expect(res.text).toContain("https://dentasmart.ai/oral-health-hub/test-post");
      expect(res.text).toContain("https://dentasmart.ai/oral-health-hub/another-post");
    });

    it("should include priority and changefreq for static routes", async () => {
      const app = createTestApp();
      const res = await request(app).get("/sitemap-pages.xml");

      expect(res.text).toContain("<priority>1.0</priority>");
      expect(res.text).toContain("<changefreq>weekly</changefreq>");
      expect(res.text).toContain("<changefreq>monthly</changefreq>");
    });

    it("should NOT include any admin URLs", async () => {
      const app = createTestApp();
      const res = await request(app).get("/sitemap-pages.xml");

      expect(res.text).not.toContain("/admin");
    });

    it("should have proper cache headers", async () => {
      const app = createTestApp();
      const res = await request(app).get("/sitemap-pages.xml");

      expect(res.headers["cache-control"]).toContain("must-revalidate");
      expect(res.headers["cache-control"]).toContain("s-maxage=300");
    });
  });

  describe("GET /api/sitemap (deprecated — now 301 to sitemap-index.xml)", () => {
    it("should return 301 redirect to /sitemap-index.xml", async () => {
      const app = createTestApp();
      const res = await request(app).get("/api/sitemap");

      expect(res.status).toBe(301);
      expect(res.headers["location"]).toBe("/sitemap-index.xml");
    });
  });

  describe("GET /sitemap.xml (deprecated — now 301 to sitemap-index.xml)", () => {
    it("should return 301 redirect to /sitemap-index.xml", async () => {
      const app = createTestApp();
      const res = await request(app).get("/sitemap.xml");

      expect(res.status).toBe(301);
      expect(res.headers["location"]).toBe("/sitemap-index.xml");
    });
  });
});

describe("Conditions/Symptoms/Guides in Sitemap", () => {
  it("should include all 15 condition pages in sitemap", async () => {
    const app = createTestApp();
    const res = await request(app).get("/sitemap-conditions.xml");

    const conditions = [
      "toothache", "cavities", "gum-disease", "wisdom-teeth-pain", "teeth-whitening",
      "sensitive-teeth", "cracked-tooth", "dental-abscess", "root-canal", "dental-crown",
      "teeth-grinding", "dental-implants", "dry-socket", "oral-thrush", "tmj-disorder",
    ];

    for (const condition of conditions) {
      expect(res.text).toContain(`https://dentasmart.ai/conditions/${condition}`);
    }

    // Also check the conditions index (trailing slash)
    expect(res.text).toContain("https://dentasmart.ai/conditions/</loc>");
  });

  it("should include all 10 symptom pages in sitemap", async () => {
    const app = createTestApp();
    const res = await request(app).get("/sitemap-symptoms.xml");

    const symptoms = [
      "tooth-pain-when-biting", "bleeding-gums", "tooth-sensitivity", "jaw-pain", "bad-breath",
      "swollen-gums", "loose-tooth", "dry-mouth", "tooth-discoloration", "mouth-sores",
    ];

    for (const symptom of symptoms) {
      expect(res.text).toContain(`https://dentasmart.ai/symptoms/${symptom}`);
    }

    // Also check the symptoms index (trailing slash)
    expect(res.text).toContain("https://dentasmart.ai/symptoms/</loc>");
  });

  it("should include all 3 guide pages in sitemap", async () => {
    const app = createTestApp();
    const res = await request(app).get("/sitemap-guides.xml");

    const guides = ["brushing-guide", "flossing-guide", "dental-visit-guide"];

    for (const guide of guides) {
      expect(res.text).toContain(`https://dentasmart.ai/guides/${guide}`);
    }

    // Also check the guides index (trailing slash)
    expect(res.text).toContain("https://dentasmart.ai/guides/</loc>");
  });
});

describe("Dental Cost Pages in Sitemap", () => {
  it("should include the dental costs hub in sitemap", async () => {
    const app = createTestApp();
    const res = await request(app).get("/sitemap-costs.xml");

    expect(res.text).toContain("https://dentasmart.ai/dental-costs/</loc>");
  });

  it("should include all 10 dental cost pages in sitemap", async () => {
    const app = createTestApp();
    const res = await request(app).get("/sitemap-costs.xml");

    const costPages = [
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
    ];

    for (const page of costPages) {
      expect(res.text).toContain(`https://dentasmart.ai/dental-costs/${page}`);
    }
  });

  it("should have high priority for dental cost pages", async () => {
    const app = createTestApp();
    const res = await request(app).get("/sitemap-costs.xml");

    // Dental cost hub should have 0.9 priority
    const hubMatch = res.text.match(
      /dental-costs\/<\/loc>[\s\S]*?<priority>([\d.]+)<\/priority>/
    );
    expect(hubMatch).toBeTruthy();
    expect(parseFloat(hubMatch![1])).toBeGreaterThanOrEqual(0.9);
  });

  it("should include dental cost pages in llms.txt", async () => {
    const app = createTestApp();
    const res = await request(app).get("/llms.txt");

    expect(res.text).toContain("Dental Cost Guides");
    expect(res.text).toContain("/dental-costs/root-canal-cost");
    expect(res.text).toContain("/dental-costs/dentures-cost");
  });
});

describe("Treatment Explainer Pages SEO", () => {
  it("should include treatments hub in sitemap", async () => {
    const app = createTestApp();
    const res = await request(app).get("/sitemap-treatments.xml");

    expect(res.text).toContain("https://dentasmart.ai/treatments/</loc>");
  });

  it("should include all 10 treatment pages in sitemap", async () => {
    const app = createTestApp();
    const res = await request(app).get("/sitemap-treatments.xml");

    const treatmentPages = [
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
    ];

    for (const page of treatmentPages) {
      expect(res.text).toContain(`https://dentasmart.ai/treatments/${page}`);
    }
  });

  it("should have high priority for treatment pages", async () => {
    const app = createTestApp();
    const res = await request(app).get("/sitemap-treatments.xml");

    // Treatments hub should have 0.9 priority
    const hubMatch = res.text.match(
      /treatments\/<\/loc>[\s\S]*?<priority>([\d.]+)<\/priority>/
    );
    expect(hubMatch).toBeTruthy();
    expect(parseFloat(hubMatch![1])).toBeGreaterThanOrEqual(0.9);
  });

  it("should include treatment pages in llms.txt", async () => {
    const app = createTestApp();
    const res = await request(app).get("/llms.txt");

    expect(res.text).toContain("Treatment Guides");
    expect(res.text).toContain("/treatments/root-canal-procedure");
    expect(res.text).toContain("/treatments/dentures-treatment");
  });
});

describe("Comparison Pages SEO", () => {
  it("should include all comparison pages in sitemap", async () => {
    const app = createTestApp();
    const res = await request(app).get("/sitemap-comparisons.xml");

    expect(res.status).toBe(200);
    expect(res.text).toContain("https://dentasmart.ai/comparisons/");

    const comparisonPages = [
      "braces-vs-invisalign",
      "dental-implants-vs-dentures",
      "crown-vs-veneer",
      "electric-vs-manual-toothbrush",
      "fluoride-vs-fluoride-free-toothpaste",
    ];

    for (const page of comparisonPages) {
      expect(res.text).toContain(`https://dentasmart.ai/comparisons/${page}`);
    }
  });

  it("should have high priority for comparison pages", async () => {
    const app = createTestApp();
    const res = await request(app).get("/sitemap-comparisons.xml");

    // Comparisons hub should have 0.9 priority
    const hubMatch = res.text.match(
      /comparisons\/<\/loc>[\s\S]*?<priority>([\d.]+)<\/priority>/
    );
    expect(hubMatch).toBeTruthy();
    expect(parseFloat(hubMatch![1])).toBeGreaterThanOrEqual(0.9);
  });

  it("should include comparison pages in llms.txt", async () => {
    const app = createTestApp();
    const res = await request(app).get("/llms.txt");

    expect(res.text).toContain("Dental Comparison Guides");
    expect(res.text).toContain("/comparisons/braces-vs-invisalign");
    expect(res.text).toContain("/comparisons/fluoride-vs-fluoride-free-toothpaste");
  });
});

describe("Life Stages Pages SEO", () => {
  it("should include all life stage pages in sitemap", async () => {
    const app = createTestApp();
    const res = await request(app).get("/sitemap-life-stages.xml");

    const lifeStagePages = [
      "baby-teething-guide",
      "childrens-dental-health",
      "teen-braces-guide",
      "pregnancy-dental-care",
      "senior-dental-care",
    ];

    for (const page of lifeStagePages) {
      expect(res.text).toContain(`https://dentasmart.ai/life-stages/${page}`);
    }
  });

  it("should have high priority for life stages hub", async () => {
    const app = createTestApp();
    const res = await request(app).get("/sitemap-life-stages.xml");

    const hubMatch = res.text.match(
      /\/life-stages\/<\/loc>[\s\S]*?<priority>([\d.]+)<\/priority>/
    );
    expect(hubMatch).toBeTruthy();
    expect(parseFloat(hubMatch![1])).toBeGreaterThanOrEqual(0.9);
  });

  it("should include life stages in llms.txt", async () => {
    const app = createTestApp();
    const res = await request(app).get("/llms.txt");

    expect(res.text).toContain("Life Stages Dental Care");
    expect(res.text).toContain("/life-stages/baby-teething-guide");
    expect(res.text).toContain("/life-stages/senior-dental-care");
  });
});

describe("Dental Emergencies Pages SEO", () => {
  it("should include all emergency pages in sitemap", async () => {
    const app = createTestApp();
    const res = await request(app).get("/sitemap-emergencies.xml");

    const emergencyPages = [
      "knocked-out-tooth",
      "dental-emergency-guide",
      "broken-tooth",
      "severe-toothache",
      "dental-abscess",
    ];

    for (const page of emergencyPages) {
      expect(res.text).toContain(`https://dentasmart.ai/dental-emergencies/${page}`);
    }
  });

  it("should have high priority for emergencies hub", async () => {
    const app = createTestApp();
    const res = await request(app).get("/sitemap-emergencies.xml");

    const hubMatch = res.text.match(
      /dental-emergencies\/<\/loc>[\s\S]*?<priority>([\d.]+)<\/priority>/
    );
    expect(hubMatch).toBeTruthy();
    expect(parseFloat(hubMatch![1])).toBeGreaterThanOrEqual(0.9);
  });

  it("should include emergencies in llms.txt", async () => {
    const app = createTestApp();
    const res = await request(app).get("/llms.txt");

    expect(res.text).toContain("Dental Emergencies");
    expect(res.text).toContain("/dental-emergencies/knocked-out-tooth");
    expect(res.text).toContain("/dental-emergencies/dental-abscess");
  });
});

describe("Lifestyle Pages SEO", () => {
  it("should include all 5 lifestyle pages in sitemap", async () => {
    const app = createTestApp();
    const res = await request(app).get("/sitemap-lifestyle.xml");

    const lifestyleSlugs = [
      "smoking-and-oral-health",
      "diabetes-and-dental-care",
      "diet-and-teeth",
      "sports-mouthguards",
      "oral-piercing-risks",
    ];

    for (const slug of lifestyleSlugs) {
      expect(res.text).toContain(`/lifestyle/${slug}`);
    }
  });

  it("should have lifestyle hub with priority >= 0.9", async () => {
    const app = createTestApp();
    const res = await request(app).get("/sitemap-lifestyle.xml");

    const hubMatch = res.text.match(
      /\/lifestyle\/<\/loc>[\s\S]*?<priority>([\d.]+)<\/priority>/
    );
    expect(hubMatch).toBeTruthy();
    expect(parseFloat(hubMatch![1])).toBeGreaterThanOrEqual(0.9);
  });

  it("should include lifestyle pages in llms.txt", async () => {
    const app = createTestApp();
    const res = await request(app).get("/llms.txt");

    expect(res.text).toContain("Lifestyle & Oral Health");
    expect(res.text).toContain("/lifestyle/smoking-and-oral-health");
    expect(res.text).toContain("/lifestyle/oral-piercing-risks");
  });
});
