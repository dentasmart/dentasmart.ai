import "dotenv/config";
import shrinkRay from "shrink-ray-current";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { registerSeoRoutes } from "../seo";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use(shrinkRay());
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Storage proxy for uploaded assets
  registerStorageProxy(app);
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // ─── Server-side 301 Redirects ─────────────────────────────────────
  // Converts client-side redirects to proper server-side 301s so crawlers
  // see the redirect header before JS runs (fixes duplicate meta descriptions).
  const serverRedirects: Record<string, string> = {
    // Article URL changes
    "/oral-health-hub/best-ai-dental-apps": "/oral-health-hub/top-10-best-ai-dental-apps/",
    // Comparison pages consolidated
    "/comparisons/veneers-vs-crowns": "/comparisons/",
    "/comparisons/veneers-vs-crowns/": "/comparisons/",
    // Old hub articles that now have dedicated pages
    "/oral-health-hub/oral-health-score-explained": "/conditions/toothache",
    "/oral-health-hub/dental-benefits-utilization-guide": "/conditions/gum-disease",
    // Hub category redirects
    "/hub/understanding-dental-conditions": "/conditions",
    "/hub/treatment-guides": "/treatments",
    "/hub/prevention-tips": "/oral-health-hub/prevention",
    "/hub/dental-technology": "/features",
    "/hub/cost-and-insurance": "/dental-costs",
    "/hub/affordability": "/oral-health-hub/affordability",
    "/hub/second-opinion": "/oral-health-hub/second-opinion",
    "/hub/prevention": "/oral-health-hub/prevention",
    // Short-path redirects
    "/affordability": "/oral-health-hub/affordability",
    "/prevention": "/oral-health-hub/prevention",
    "/second-opinion": "/oral-health-hub/second-opinion",
    "/symptom-checker": "/symptom-quiz",
    // Symptom aliases → conditions
    "/symptoms/toothache": "/conditions/toothache",
    "/symptoms/cracked-tooth": "/conditions/cracked-tooth",
    "/symptoms/sensitive-teeth": "/conditions/sensitive-teeth",
    // Treatment aliases
    "/treatments/veneers": "/treatments/veneers-procedure",
    "/treatments/invisalign": "/treatments/braces-treatment",
    "/treatments/teeth-whitening": "/treatments/teeth-whitening-procedure",
    "/treatments/dental-crowns": "/treatments/dental-crown-procedure",
    "/treatments/bone-grafting": "/treatments",
    "/treatments/full-mouth-dental-implants": "/treatments/dental-implant-procedure",
    "/treatments/gingivitis": "/conditions/gum-disease",
    // Cost aliases
    "/dental-costs/dental-cleaning": "/dental-costs/dental-cleaning-cost",
    "/dental-costs/dental-implants-cost": "/dental-costs/dental-implant-cost",
    // Comparison aliases
    "/comparisons/invisalign-vs-braces": "/compare/braces-vs-invisalign",
    // Guide aliases
    "/guides/teeth-whitening": "/conditions/teeth-whitening",
    "/guides/when-to-get-second-opinion": "/guides/when-to-get-dental-second-opinion",
    // Legacy URL patterns
    "/index.php": "/",
    "/employers.php": "/employers",
    "/teams.php": "/team",
    "/features.php": "/features",
    "/privacy-policy.php": "/privacy-policy",
    "/terms-and-condition.php": "/terms-of-service",
    "/faqs.php": "/faqs",
    "/how-it-works.php": "/how-it-works",
    "/DentaSmart": "/",
    // Typo slug corrections
    "/oral-health-hub/wwhat-are-dental-implants-cost": "/oral-health-hub/what-are-dental-implants-cost",
    "/oral-health-hub/cclear-aligners-vs-braces": "/oral-health-hub/clear-aligners-vs-braces",
  };
  app.use((req, res, next) => {
    const path = req.path;
    const pathNoSlash = path.endsWith('/') && path.length > 1
      ? path.slice(0, -1)
      : path;

    const redirect = serverRedirects[path] || serverRedirects[pathNoSlash];
    if (redirect) {
      return res.redirect(301, redirect);
    }
    next();
  });

  // ─── Blog Trailing-Slash Redirect ─────────────────────────────────────
  // Redirect /oral-health-hub/[post] to /oral-health-hub/[post]/ for canonical consistency
  // This ensures Google sees the trailing-slash version as the primary URL
  app.use((req, res, next) => {
    // Only handle GET requests
    if (req.method !== 'GET') {
      return next();
    }
    
    // Match /oral-health-hub/[something] without trailing slash
    const blogPostRegex = /^\/oral-health-hub\/[^/]+$/;
    if (blogPostRegex.test(req.path)) {
      // Preserve query string if present
      const queryString = req.url.includes('?') ? req.url.split('?')[1] : '';
      const redirectUrl = req.path + '/' + (queryString ? '?' + queryString : '');
      return res.redirect(301, redirectUrl);
    }
    
    next();
  });

  // ─── HTTP Caching Headers ──────────────────────────────────────────
  // Immutable cache for hashed static assets (JS/CSS/images with content hash)
  app.use('/assets', (req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    next();
  });
  // Short cache for HTML pages (allows revalidation after 5 minutes)
  app.use((req, res, next) => {
    const isHtmlPage = !req.path.startsWith('/api') &&
      !req.path.startsWith('/assets') &&
      !req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|webp|avif)$/);
    if (isHtmlPage) {
      res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=3600');
    }
    next();
  });

  // SEO routes (robots.txt, sitemap.xml)
  registerSeoRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
