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
import { resolveRedirect } from "../redirectCache";
import { isKnownRoute } from "../knownRoutes";
import { upsertNotFoundHit } from "../notFoundDb";

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

  // ─── Server-side Redirects (DB-backed) ───────────────────────────────
  // Primary source: DB table `redirects`, cached in-process (1-hour TTL).
  // Fallback: hardcoded serverRedirects dict below — used ONLY when the cache
  // failed to load (cold start / DB unreachable). Do NOT delete the dict.
  //
  // IMPORTANT: Must be kept in sync with the DB. When adding redirects, use
  // the admin panel at /admin/redirects. Only add to this dict as a last
  // resort if the DB is unavailable.
  //
  // NOTE: Must be updated whenever App.tsx routes change.
  const serverRedirects: Record<string, string> = {
    // Article URL changes
    "/oral-health-hub/best-ai-dental-apps": "/oral-health-hub/top-10-best-ai-dental-apps/",
    "/oral-health-hub/dental-crown": "/oral-health-hub/what-is-a-dental-crown/",
    "/oral-health-hub/dental-crown/": "/oral-health-hub/what-is-a-dental-crown/",
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
    // Wisdom teeth article consolidation
    "/oral-health-hub/wisdom-teeth-confusion": "/oral-health-hub/when-do-wisdom-teeth-come-in/",
    "/oral-health-hub/wisdom-teeth-confusion/": "/oral-health-hub/when-do-wisdom-teeth-come-in/",
    "/oral-health-hub/wisdom-tooth-infection-symptoms": "/oral-health-hub/when-do-wisdom-teeth-come-in/",
    "/oral-health-hub/wisdom-tooth-infection-symptoms/": "/oral-health-hub/when-do-wisdom-teeth-come-in/",
  };

  app.use(async (req, res, next) => {
    // Prefix guard: skip API and static asset requests immediately
    if (req.path.startsWith('/api') || req.path.startsWith('/assets')) {
      return next();
    }

    const path = req.path;
    const pathNoSlash = path.endsWith('/') && path.length > 1
      ? path.slice(0, -1)
      : path;

    // Try DB cache first (checks both path and pathNoSlash)
    const { entry, cacheIsLoaded } = await resolveRedirect(path).catch(() => ({ entry: null, cacheIsLoaded: false }));
    const { entry: entryNoSlash } = (!entry && pathNoSlash !== path)
      ? await resolveRedirect(pathNoSlash).catch(() => ({ entry: null, cacheIsLoaded: false }))
      : { entry: null };

    const matched = entry ?? entryNoSlash;

    if (matched) {
      if (!matched.isEnabled) {
        // Disabled entry is a positive signal — do not redirect, do not fall through to dict
        return next();
      }
      // Loop guard: normalise trailing slash on BOTH sides before comparing.
      // Without this, /hub/costs → /hub/costs/ would not be caught because
      // targetPath "/hub/costs/" !== path "/hub/costs".
      const targetNorm = matched.targetPath.endsWith('/') && matched.targetPath.length > 1
        ? matched.targetPath.slice(0, -1)
        : matched.targetPath;
      if (targetNorm === path || targetNorm === pathNoSlash) {
        console.warn(`[redirects] Loop detected for path: ${path} → ${matched.targetPath}`);
        return next();
      }
      // Preserve query string unless target already has one
      const qs = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
      const target = matched.targetPath.includes('?') ? matched.targetPath : matched.targetPath + qs;
      // Fire-and-forget hit count increment
      const { incrementHit } = await import('../redirectDb');
      incrementHit(matched.id);
      return res.redirect(matched.statusCode, target);
    }

    // Cache loaded successfully but no match — do NOT fall through to dict
    if (cacheIsLoaded) {
      return next();
    }

    // Cache failed to load (cold start / DB unreachable) — fall back to hardcoded dict
    const fallback = serverRedirects[path] || serverRedirects[pathNoSlash];
    if (fallback) {
      const qs = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
      const target = fallback.includes('?') ? fallback : fallback + qs;
      return res.redirect(301, target);
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
  // ─── 404 Detection Middleware ─────────────────────────────────────────
  // DRY-RUN MODE: logs unknown paths to not_found_log without returning 404.
  // To enable real 404 responses, set NOT_FOUND_MODE=enforce in Secrets.
  // IMPORTANT: This middleware fires AFTER all redirects, SEO routes, and tRPC,
  // so redirect sources never reach this point and are never logged.
  app.use(async (req, res, next) => {
    // Only intercept GET requests for HTML pages
    if (req.method !== 'GET') return next();
    // Skip API, assets, and storage paths (already handled above)
    if (req.path.startsWith('/api') || req.path.startsWith('/assets') || req.path.startsWith('/storage')) {
      return next();
    }
    try {
      const known = await isKnownRoute(req.path);
      if (!known) {
        const referrer = req.headers.referer || req.headers.referrer || null;
        const isDryRun = process.env.NOT_FOUND_MODE !== 'enforce';
        // Fire-and-forget — never block the response
        upsertNotFoundHit(req.path, referrer as string | null, isDryRun).catch(() => {});
        if (!isDryRun) {
          // Enforce mode: return 404 status but still serve index.html so React renders a 404 page
          res.status(404);
          // Fall through to setupVite/serveStatic which will serve index.html
          return next();
        }
        // Dry-run: log only, continue with 200 as normal
      }
    } catch {
      // Never block on errors in the 404 detector
    }
    next();
  });

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
