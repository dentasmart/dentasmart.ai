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

import { registerSeoRoutes } from "./seo";

function createTestApp() {
  const app = express();
  registerSeoRoutes(app);
  return app;
}

describe("SEO Routes", () => {
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

    it("should reference /sitemap-custom.xml as primary sitemap", async () => {
      const app = createTestApp();
      const res = await request(app).get("/robots.txt");

      expect(res.text).toContain("Sitemap: https://dentasmart.ai/sitemap-custom.xml");
    });

    it("should allow /api/sitemap explicitly for crawlers", async () => {
      const app = createTestApp();
      const res = await request(app).get("/robots.txt");

      expect(res.text).toContain("Allow: /api/sitemap");
    });

    it("should reference /sitemap.xml as primary sitemap", async () => {
      const app = createTestApp();
      const res = await request(app).get("/robots.txt");

      expect(res.text).toContain("Sitemap: https://dentasmart.ai/sitemap.xml");
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

  describe("GET /sitemap-custom.xml (primary production route)", () => {
    it("should return sitemap with correct content type", async () => {
      const app = createTestApp();
      const res = await request(app).get("/sitemap-custom.xml");

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toContain("application/xml");
    });

    it("should contain XML declaration and urlset", async () => {
      const app = createTestApp();
      const res = await request(app).get("/sitemap-custom.xml");

      expect(res.text).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(res.text).toContain("<urlset");
      expect(res.text).toContain("</urlset>");
    });

    it("should include all key static routes", async () => {
      const app = createTestApp();
      const res = await request(app).get("/sitemap-custom.xml");

      const keyRoutes = [
        "https://dentasmart.ai/",
        "https://dentasmart.ai/how-it-works",
        "https://dentasmart.ai/features",
        "https://dentasmart.ai/pricing",
        "https://dentasmart.ai/employers",
        "https://dentasmart.ai/faqs",
        "https://dentasmart.ai/download",
        "https://dentasmart.ai/instant-scan",
        "https://dentasmart.ai/answers",
        "https://dentasmart.ai/find-a-dentist",
        "https://dentasmart.ai/oral-health-hub",
      ];

      for (const route of keyRoutes) {
        expect(res.text).toContain(`<loc>${route}</loc>`);
      }
    });

    it("should include compare pages", async () => {
      const app = createTestApp();
      const res = await request(app).get("/sitemap-custom.xml");

      expect(res.text).toContain("dentasmart-vs-chatgpt-dental");
      expect(res.text).toContain("dentasmart-vs-teledentistry");
      expect(res.text).toContain("dentasmart-vs-dental-insurance");
    });

    it("should include blog post URLs from database using slugs", async () => {
      const app = createTestApp();
      const res = await request(app).get("/sitemap-custom.xml");

      expect(res.text).toContain("https://dentasmart.ai/oral-health-hub/test-post");
      expect(res.text).toContain("https://dentasmart.ai/oral-health-hub/another-post");
    });

    it("should include priority and changefreq for static routes", async () => {
      const app = createTestApp();
      const res = await request(app).get("/sitemap-custom.xml");

      expect(res.text).toContain("<priority>1.0</priority>");
      expect(res.text).toContain("<changefreq>weekly</changefreq>");
      expect(res.text).toContain("<changefreq>monthly</changefreq>");
    });

    it("should NOT include any admin URLs", async () => {
      const app = createTestApp();
      const res = await request(app).get("/sitemap-custom.xml");

      expect(res.text).not.toContain("/admin");
    });

    it("should have proper cache headers", async () => {
      const app = createTestApp();
      const res = await request(app).get("/sitemap-custom.xml");

      expect(res.headers["cache-control"]).toContain("must-revalidate");
      expect(res.headers["cache-control"]).toContain("s-maxage=300");
    });
  });

  describe("GET /api/sitemap (fallback production route)", () => {
    it("should return sitemap with correct content type at /api/sitemap", async () => {
      const app = createTestApp();
      const res = await request(app).get("/api/sitemap");

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toContain("application/xml");
      expect(res.text).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(res.text).toContain("<urlset");
      expect(res.text).not.toContain("/admin");
    });
  });

  describe("GET /sitemap.xml (local dev route)", () => {
    it("should return sitemap with correct content type", async () => {
      const app = createTestApp();
      const res = await request(app).get("/sitemap.xml");

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toContain("application/xml");
    });

    it("should NOT include any admin URLs", async () => {
      const app = createTestApp();
      const res = await request(app).get("/sitemap.xml");

      expect(res.text).not.toContain("/admin");
    });
  });
});

describe("Conditions/Symptoms/Guides in Sitemap", () => {
  it("should include all 15 condition pages in sitemap", async () => {
    const app = createTestApp();
    const res = await request(app).get("/sitemap-custom.xml");

    const conditions = [
      "toothache", "cavities", "gum-disease", "wisdom-teeth-pain", "teeth-whitening",
      "sensitive-teeth", "cracked-tooth", "dental-abscess", "root-canal", "dental-crown",
      "teeth-grinding", "dental-implants", "dry-socket", "oral-thrush", "tmj-disorder",
    ];

    for (const condition of conditions) {
      expect(res.text).toContain(`https://dentasmart.ai/conditions/${condition}`);
    }

    // Also check the conditions index
    expect(res.text).toContain("https://dentasmart.ai/conditions</loc>");
  });

  it("should include all 10 symptom pages in sitemap", async () => {
    const app = createTestApp();
    const res = await request(app).get("/sitemap-custom.xml");

    const symptoms = [
      "tooth-pain-when-biting", "bleeding-gums", "tooth-sensitivity", "jaw-pain", "bad-breath",
      "swollen-gums", "loose-tooth", "dry-mouth", "tooth-discoloration", "mouth-sores",
    ];

    for (const symptom of symptoms) {
      expect(res.text).toContain(`https://dentasmart.ai/symptoms/${symptom}`);
    }

    // Also check the symptoms index
    expect(res.text).toContain("https://dentasmart.ai/symptoms</loc>");
  });

  it("should include all 3 guide pages in sitemap", async () => {
    const app = createTestApp();
    const res = await request(app).get("/sitemap-custom.xml");

    const guides = ["brushing-guide", "flossing-guide", "dental-visit-guide"];

    for (const guide of guides) {
      expect(res.text).toContain(`https://dentasmart.ai/guides/${guide}`);
    }

    // Also check the guides index
    expect(res.text).toContain("https://dentasmart.ai/guides</loc>");
  });
});
