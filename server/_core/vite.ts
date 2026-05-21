import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { resolveMetaTags, injectMetaTags } from "../metaTags";
import { resolveSSRContent } from "../ssrContent";
import { resolveSchemaMarkup } from "../schemaMarkup";

/**
 * Inject SSR content block into HTML.
 * This adds real, visible text content that crawlers can index.
 * When React hydrates, the #ssr-content div is hidden via JS.
 */
function injectSSRContent(html: string, ssrHtml: string): string {
  // Insert SSR content BEFORE the <div id="root"></div>
  // The SSR content is visible to crawlers but hidden once JS runs
  const ssrBlock = `<div id="ssr-content" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;">${ssrHtml}</div>`;
  html = html.replace(
    '<div id="root"></div>',
    `${ssrBlock}\n    <div id="root"></div>`
  );
  return html;
}

/**
 * Inject JSON-LD schema markup into the <head> section.
 */
function injectSchemaMarkup(html: string, schemas: object[]): string {
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

      // Inject page-specific meta tags before Vite transforms
      const meta = await resolveMetaTags(url);
      if (meta) {
        template = injectMetaTags(template, meta);
      }

      // Inject SSR content for crawlers (text-to-HTML ratio fix)
      const ssrContent = await resolveSSRContent(url);
      if (ssrContent) {
        template = injectSSRContent(template, ssrContent.html);
      }

      // Inject JSON-LD schema markup
      const schemas = await resolveSchemaMarkup(url);
      if (schemas && schemas.length > 0) {
        template = injectSchemaMarkup(template, schemas);
      }

      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
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
    setHeaders: (res, filePath) => {
      // HTML files should not be cached aggressively
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate');
      }
    }
  }));

  // fall through to index.html if the file doesn't exist
  // Inject page-specific meta tags + SSR content + schema so crawlers see unique content
  app.use("*", async (_req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    try {
      let html = await fs.promises.readFile(indexPath, "utf-8");
      const meta = await resolveMetaTags(_req.originalUrl);
      if (meta) {
        html = injectMetaTags(html, meta);
      }

      // Inject SSR content for crawlers
      const ssrContent = await resolveSSRContent(_req.originalUrl);
      if (ssrContent) {
        html = injectSSRContent(html, ssrContent.html);
      }

      // Inject JSON-LD schema markup
      const schemas = await resolveSchemaMarkup(_req.originalUrl);
      if (schemas && schemas.length > 0) {
        html = injectSchemaMarkup(html, schemas);
      }

      // Set proper cache headers for HTML pages
      res.status(200).set({
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
