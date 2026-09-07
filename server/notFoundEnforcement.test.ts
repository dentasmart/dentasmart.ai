import { describe, expect, it, vi } from "vitest";
import express from "express";
import { createServer } from "http";
import { createNotFoundDetectionMiddleware } from "./_core/index";
import { getHtmlResponseStatus, renderHtmlForRequest } from "./_core/vite";

const SAMPLE_HTML = `<!DOCTYPE html><html><head>
  <title>__PAGE_TITLE__</title>
  <meta name="description" content="__PAGE_DESCRIPTION__" />
  <meta property="og:url" content="__PAGE_CANONICAL__" />
  <link rel="canonical" href="__PAGE_CANONICAL__" />
</head><body><div id="root"></div></body></html>`;

async function runMiddleware({
  path = "/unknown-page",
  known = false,
  mode = "enforce",
  logFailure = false,
}: {
  path?: string;
  known?: boolean;
  mode?: string | undefined;
  logFailure?: boolean;
} = {}) {
  const next = vi.fn();
  const res = {
    locals: {} as Record<string, unknown>,
    statusCode: 200,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
  };
  const middleware = createNotFoundDetectionMiddleware({
    isKnownRoute: vi.fn().mockResolvedValue(known),
    upsertNotFoundHit: vi.fn().mockImplementation(() => logFailure ? Promise.reject(new Error("log failed")) : Promise.resolve()),
    getMode: () => mode,
  });
  await middleware({ method: "GET", path, headers: {} } as any, res as any, next);
  return { next, res };
}

describe("P3-C confirmed 404 enforcement safeguards", () => {
  it("marks an unknown HTML route as a confirmed 404 only in simulated enforce mode", async () => {
    const { next, res } = await runMiddleware();
    expect(next).toHaveBeenCalledOnce();
    expect(res.statusCode).toBe(404);
    expect(res.locals.confirmed404).toBe(true);
  });

  it("retains dry-run behavior without a confirmed 404 marker", async () => {
    const { next, res } = await runMiddleware({ mode: "dry-run" });
    expect(next).toHaveBeenCalledOnce();
    expect(res.statusCode).toBe(200);
    expect(res.locals.confirmed404).toBeUndefined();
  });

  it("keeps known routes, API endpoints, and logging failures from being intercepted", async () => {
    expect((await runMiddleware({ known: true })).res.statusCode).toBe(200);
    expect((await runMiddleware({ path: "/api/trpc/blog.list" })).res.statusCode).toBe(200);
    expect((await runMiddleware({ logFailure: true })).res.statusCode).toBe(404);
  });

  it("leaves a redirect source ahead of the detector and never reclassifies it as a 404", async () => {
    const app = express();
    const checkKnownRoute = vi.fn().mockResolvedValue(false);
    app.get("/conditions/dry-mouth", (_req, res) => res.redirect(301, "/symptoms/dry-mouth"));
    app.use(createNotFoundDetectionMiddleware({
      isKnownRoute: checkKnownRoute,
      getMode: () => "enforce",
      upsertNotFoundHit: vi.fn().mockResolvedValue(undefined),
    }));
    app.use((_req, res) => res.sendStatus(200));

    const server = createServer(app);
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    const port = typeof address === "object" && address ? address.port : 0;
    try {
      const response = await fetch(`http://127.0.0.1:${port}/conditions/dry-mouth`, { redirect: "manual" });
      expect(response.status).toBe(301);
      expect(response.headers.get("location")).toBe("/symptoms/dry-mouth");
      expect(checkKnownRoute).not.toHaveBeenCalled();
    } finally {
      await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    }
  });

  it("preserves confirmed 404 status while normal HTML responses remain 200", () => {
    expect(getHtmlResponseStatus(404)).toBe(404);
    expect(getHtmlResponseStatus(200)).toBe(200);
  });

  it("renders confirmed 404 initial HTML with noindex and without canonical, og:url, SSR, or schema", async () => {
    const result = await renderHtmlForRequest(SAMPLE_HTML, "/conditions/not-a-real-condition/", true);
    expect(result).toContain("Page Not Found | Your Personal AI Dentist in Your Pocket");
    expect(result).toContain('name="robots" content="noindex, follow"');
    expect(result).not.toContain('rel="canonical"');
    expect(result).not.toContain('property="og:url"');
    expect(result).not.toContain("ssr-content");
    expect(result).not.toContain('application/ld+json');
  });

  it("keeps valid normal HTML at 200 with ordinary page metadata", async () => {
    const result = await renderHtmlForRequest(SAMPLE_HTML, "/pricing/", false);
    expect(result).toContain("DentaSmart Pricing");
    expect(result).toContain('href="https://dentasmart.ai/pricing/"');
  });
});
