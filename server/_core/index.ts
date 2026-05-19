import "dotenv/config";
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
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Storage proxy for uploaded assets
  registerStorageProxy(app);
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // ─── Trailing Slash Normalization ────────────────────────────────────
  // 301-redirect trailing-slash URLs to their canonical no-slash form.
  // Excludes the homepage (/) which keeps its trailing slash.
  app.use((req, res, next) => {
    if (req.path.length > 1 && req.path.endsWith('/') && !req.path.startsWith('/api')) {
      const normalized = req.path.slice(0, -1);
      const query = req.originalUrl.includes('?')
        ? req.originalUrl.slice(req.originalUrl.indexOf('?'))
        : '';
      return res.redirect(301, normalized + query);
    }
    next();
  });

  // ─── Server-side 301 Redirects ─────────────────────────────────────
  // Converts client-side redirects to proper server-side 301s so crawlers
  // see the redirect header before JS runs (fixes duplicate meta descriptions).
  const serverRedirects: Record<string, string> = {
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
  };
  app.use((req, res, next) => {
    const redirect = serverRedirects[req.path];
    if (redirect) {
      return res.redirect(301, redirect);
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
