import { Express, Request, Response } from "express";
import { listBlogPosts } from "./blogDb";

const SITE_URL = "https://dentasmart.ai";

// All static routes for the sitemap
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
];

function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml

# Disallow admin pages
Disallow: /admin
Disallow: /admin/*

# Disallow API endpoints
Disallow: /api/
`;
}

async function generateSitemapXml(): Promise<string> {
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
    <loc>${SITE_URL}/oral-health-hub/${post.id}</loc>
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

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${blogUrls}
</urlset>`;
}

export function registerSeoRoutes(app: Express) {
  // robots.txt
  app.get("/robots.txt", (_req: Request, res: Response) => {
    res.type("text/plain");
    res.send(generateRobotsTxt());
  });

  // sitemap.xml
  app.get("/sitemap.xml", async (_req: Request, res: Response) => {
    try {
      const sitemap = await generateSitemapXml();
      res.type("application/xml");
      res.send(sitemap);
    } catch (e) {
      console.error("Sitemap generation error:", e);
      res.status(500).send("Error generating sitemap");
    }
  });
}
