import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { getNotFoundMeta, resolveMetaTags, injectMetaTags } from "../metaTags";
import { resolveSSRContent } from "../ssrContent";
import { resolveSchemaMarkup } from "../schemaMarkup";

const APPLE_APP_SITE_ASSOCIATION_PATH = path.join(
  ".well-known",
  "apple-app-site-association",
);

export function setStaticHeaders(
  res: { setHeader(name: string, value: string): void },
  filePath: string,
) {
  if (filePath.endsWith(APPLE_APP_SITE_ASSOCIATION_PATH)) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
  }

  // HTML files should not be cached aggressively
  if (filePath.endsWith('.html')) {
    res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate');
  }
}

/**
 * Inject SSR content block into HTML.
 * This adds real, visible text content that crawlers can index.
 * When React hydrates, the #ssr-content div is hidden via JS.
 */
export function injectSSRContent(html: string, ssrHtml: string): string {
  // Insert SSR content BEFORE the <div id="root"></div>
  // The SSR content is visible to crawlers but hidden once JS runs
  const ssrBlock = `<noscript><div id="ssr-content" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;">${ssrHtml}</div></noscript>`;
  html = html.replace(
    '<div id="root"></div>',
    `${ssrBlock}\n    <div id="root"></div>`
  );
  return html;
}

/**
 * Inject JSON-LD schema markup into the <head> section.
 */
export function injectSchemaMarkup(html: string, schemas: object[]): string {
  if (!schemas || schemas.length === 0) return html;
  const scripts = schemas
    .map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n    ');
  // Insert before </head>
  html = html.replace('</head>', `    ${scripts}\n  </head>`);
  return html;
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
    // Explicitly set cacheDir so middleware-mode restarts always use the same
    // optimized-deps cache location and never create a parallel client/.vite cache.
    cacheDir: path.resolve(import.meta.dirname, "../../node_modules/.vite"),
    // Hard-pin React to the single root copy so both the dep-optimizer graph
    // and the normal module graph resolve to the same file, preventing the
    // "Invalid hook call" / duplicate-React error.
    resolve: {
      ...viteConfig.resolve,
      dedupe: ["react", "react-dom"],
      alias: {
        ...(viteConfig.resolve?.alias as Record<string, string> ?? {}),
        react: path.resolve(import.meta.dirname, "../../node_modules/react"),
        "react-dom": path.resolve(import.meta.dirname, "../../node_modules/react-dom"),
        "react-dom/client": path.resolve(import.meta.dirname, "../../node_modules/react-dom/client"),
      },
    },
    optimizeDeps: {
      ...viteConfig.optimizeDeps,
      include: ["react", "react-dom", ...((viteConfig.optimizeDeps?.include as string[]) ?? [])],
    },
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );

      template = await renderHtmlForRequest(template, url, res.locals.confirmed404 === true);

      const page = await vite.transformIndexHtml(url, template);
      res.status(getHtmlResponseStatus(res.statusCode)).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Static assets with aggressive caching.
  // index: false prevents express.static from serving index.html for "/",
  // so the catch-all below can inject page-specific meta tags.
  app.use(express.static(distPath, {
    maxAge: '1y',
    immutable: true,
    index: false,
    setHeaders: setStaticHeaders,
  }));

  // fall through to index.html if the file doesn't exist
  // Inject page-specific meta tags + SSR content + schema so crawlers see unique content
  app.use("*", async (_req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    try {
      let html = await fs.promises.readFile(indexPath, "utf-8");
      html = await renderHtmlForRequest(html, _req.originalUrl, res.locals.confirmed404 === true);

      // Set proper cache headers for HTML pages
      res.status(getHtmlResponseStatus(res.statusCode)).set({
        "Content-Type": "text/html",
        "Cache-Control": "public, max-age=300, must-revalidate",
        "Vary": "Accept-Encoding",
      }).send(html);
    } catch {
      // Fallback to sendFile if read fails
      const indexPath2 = path.resolve(distPath, "index.html");
      res.sendFile(indexPath2);
    }
  });
}

/** Keeps confirmed 404 state intact while preserving 200 for ordinary HTML pages. */
export function getHtmlResponseStatus(existingStatus: number): number {
  return existingStatus === 404 ? 404 : 200;
}

/**
 * Produces crawler-visible output for a valid route or a server-confirmed 404.
 * Confirmed 404s deliberately bypass route-family SSR and JSON-LD generation.
 */
export async function renderHtmlForRequest(
  html: string,
  originalUrl: string,
  confirmed404: boolean,
): Promise<string> {
  if (confirmed404) {
    return injectMetaTags(html, getNotFoundMeta());
  }

  const meta = await resolveMetaTags(originalUrl);
  if (meta) {
    html = injectMetaTags(html, meta);
  }

  const ssrContent = await resolveSSRContent(originalUrl);
  if (ssrContent) {
    html = injectSSRContent(html, ssrContent.html);
  }

  const schemas = await resolveSchemaMarkup(originalUrl);
  if (schemas && schemas.length > 0) {
    html = injectSchemaMarkup(html, schemas);
  }

  return html;
}
