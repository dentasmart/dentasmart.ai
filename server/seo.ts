import { Express, Request, Response } from "express";
import { listBlogPosts } from "./blogDb";

const SITE_URL = "https://dentasmart.ai";

// All static routes for the sitemap (NO admin routes)
const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/how-it-works", priority: "0.9", changefreq: "monthly" },
  { path: "/features", priority: "0.9", changefreq: "monthly" },
  { path: "/pricing", priority: "0.9", changefreq: "monthly" },
  { path: "/employers", priority: "0.8", changefreq: "monthly" },
  { path: "/team", priority: "0.7", changefreq: "monthly" },
  { path: "/faqs", priority: "0.8", changefreq: "monthly" },
  { path: "/download", priority: "0.9", changefreq: "monthly" },
  { path: "/instant-scan", priority: "0.9", changefreq: "monthly" },
  { path: "/photo-guide", priority: "0.8", changefreq: "monthly" },
  { path: "/oral-health-hub", priority: "0.8", changefreq: "weekly" },
  { path: "/answers", priority: "0.8", changefreq: "monthly" },
  { path: "/find-a-dentist", priority: "0.7", changefreq: "monthly" },
  { path: "/compare/dentasmart-vs-chatgpt-dental", priority: "0.7", changefreq: "monthly" },
  { path: "/compare/dentasmart-vs-teledentistry", priority: "0.7", changefreq: "monthly" },
  { path: "/compare/dentasmart-vs-dental-insurance", priority: "0.7", changefreq: "monthly" },
  { path: "/hub/understanding-dental-conditions", priority: "0.7", changefreq: "weekly" },
  { path: "/hub/treatment-guides", priority: "0.7", changefreq: "weekly" },
  { path: "/hub/prevention-tips", priority: "0.7", changefreq: "weekly" },
  { path: "/hub/dental-technology", priority: "0.7", changefreq: "weekly" },
  { path: "/hub/cost-and-insurance", priority: "0.7", changefreq: "weekly" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms-of-service", priority: "0.3", changefreq: "yearly" },
  { path: "/stories", priority: "0.6", changefreq: "monthly" },
  // Conditions pages
  { path: "/conditions", priority: "0.8", changefreq: "weekly" },
  { path: "/conditions/toothache", priority: "0.8", changefreq: "monthly" },
  { path: "/conditions/cavities", priority: "0.8", changefreq: "monthly" },
  { path: "/conditions/gum-disease", priority: "0.8", changefreq: "monthly" },
  { path: "/conditions/wisdom-teeth-pain", priority: "0.8", changefreq: "monthly" },
  { path: "/conditions/teeth-whitening", priority: "0.8", changefreq: "monthly" },
  { path: "/conditions/sensitive-teeth", priority: "0.8", changefreq: "monthly" },
  { path: "/conditions/cracked-tooth", priority: "0.8", changefreq: "monthly" },
  { path: "/conditions/dental-abscess", priority: "0.8", changefreq: "monthly" },
  { path: "/conditions/root-canal", priority: "0.8", changefreq: "monthly" },
  { path: "/conditions/dental-crown", priority: "0.8", changefreq: "monthly" },
  { path: "/conditions/teeth-grinding", priority: "0.8", changefreq: "monthly" },
  { path: "/conditions/dental-implants", priority: "0.8", changefreq: "monthly" },
  { path: "/conditions/dry-socket", priority: "0.8", changefreq: "monthly" },
  { path: "/conditions/oral-thrush", priority: "0.8", changefreq: "monthly" },
  { path: "/conditions/tmj-disorder", priority: "0.8", changefreq: "monthly" },
  // Symptoms pages
  { path: "/symptoms", priority: "0.8", changefreq: "weekly" },
  { path: "/symptoms/tooth-pain-when-biting", priority: "0.8", changefreq: "monthly" },
  { path: "/symptoms/bleeding-gums", priority: "0.8", changefreq: "monthly" },
  { path: "/symptoms/tooth-sensitivity", priority: "0.8", changefreq: "monthly" },
  { path: "/symptoms/jaw-pain", priority: "0.8", changefreq: "monthly" },
  { path: "/symptoms/bad-breath", priority: "0.8", changefreq: "monthly" },
  { path: "/symptoms/swollen-gums", priority: "0.8", changefreq: "monthly" },
  { path: "/symptoms/loose-tooth", priority: "0.8", changefreq: "monthly" },
  { path: "/symptoms/dry-mouth", priority: "0.8", changefreq: "monthly" },
  { path: "/symptoms/tooth-discoloration", priority: "0.8", changefreq: "monthly" },
  { path: "/symptoms/mouth-sores", priority: "0.8", changefreq: "monthly" },
  // Guides pages
  { path: "/guides", priority: "0.8", changefreq: "weekly" },
  { path: "/guides/brushing-guide", priority: "0.8", changefreq: "monthly" },
  { path: "/guides/flossing-guide", priority: "0.8", changefreq: "monthly" },
  { path: "/guides/dental-visit-guide", priority: "0.8", changefreq: "monthly" },
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
  console.log("[Sitemap] Cache invalidated — next request will regenerate");
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

export function registerSeoRoutes(app: Express) {
  // robots.txt
  app.get("/robots.txt", (_req: Request, res: Response) => {
    res.type("text/plain");
    res.send(`User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/api/sitemap.xml

# Disallow admin pages
Disallow: /admin
Disallow: /admin/*

# Disallow API endpoints
Disallow: /api/
`);
  });

  // Serve sitemap under /api/ prefix to bypass platform CDN auto-generation
  // The platform intercepts /sitemap.xml at CDN level, but /api/* routes reach Express
  app.get("/api/sitemap.xml", async (_req: Request, res: Response) => {
    try {
      const sitemap = await generateSitemapXml();
      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=3600, s-maxage=3600");
      res.send(sitemap);
    } catch (e) {
      console.error("Sitemap generation error:", e);
      res.status(500).send("Error generating sitemap");
    }
  });

  // Keep the original /sitemap.xml route for local development
  app.get("/sitemap.xml", async (_req: Request, res: Response) => {
    try {
      const sitemap = await generateSitemapXml();
      res.set("Content-Type", "application/xml; charset=utf-8");
      res.send(sitemap);
    } catch (e) {
      console.error("Sitemap generation error:", e);
      res.status(500).send("Error generating sitemap");
    }
  });
}
