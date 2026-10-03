import type { Express, Request, RequestHandler, Response } from "express";
import { Readable } from "node:stream";
import { ENV } from "./env";

const ORIGAMI_ORIGIN = "https://origami-web-visitors.com";
const ALLOWED_PATHS = new Map<string, string>([
  ["/_ov/o.js", "/v1/o.js"],
  ["/_ov/e", "/v1/e"],
  ["/_ov/identify", "/v1/identify"],
]);

type FetchImplementation = typeof fetch;

export interface OrigamiVisitorsProxyDependencies {
  secretKey?: string;
  fetchImplementation?: FetchImplementation;
}

function hasRequestBody(req: Request): boolean {
  return !["GET", "HEAD"].includes(req.method.toUpperCase());
}

function getClientIp(req: Request): string {
  // DentaSmart is served through an ALB. AWS's default append behavior places
  // the address that the ALB observed at the end of X-Forwarded-For. Choosing
  // the final value prevents a browser-supplied leading value from winning.
  const forwarded = req.get("x-forwarded-for");
  const finalForwardedIp = forwarded
    ?.split(",")
    .map(value => value.trim())
    .filter(Boolean)
    .at(-1);

  return finalForwardedIp || req.socket.remoteAddress || "";
}

function requestHeaders(req: Request, secretKey: string): Headers {
  const headers = new Headers({
    Authorization: `Bearer ${secretKey}`,
    "X-Origami-Client-IP": getClientIp(req),
  });

  for (const headerName of ["user-agent", "origin", "referer", "content-type", "accept"]) {
    const value = req.get(headerName);
    if (value) headers.set(headerName, value);
  }

  // Cookies and all browser-supplied authorization values are intentionally
  // omitted. The server-only Origami authorization above is the only one sent.
  return headers;
}

function copySafeResponseHeaders(source: Headers, target: Response): void {
  for (const headerName of ["content-type", "cache-control", "etag", "last-modified"]) {
    const value = source.get(headerName);
    if (value) target.setHeader(headerName, value);
  }
}

export function registerOrigamiVisitorsProxy(
  app: Express,
  dependencies: OrigamiVisitorsProxyDependencies = {},
): void {
  const secretKey = dependencies.secretKey ?? ENV.origamiVisitorsSecretKey;
  const request = dependencies.fetchImplementation ?? fetch;

  const forward: RequestHandler = async (req, res) => {
    const upstreamPath = ALLOWED_PATHS.get(req.path);
    if (!upstreamPath) {
      res.sendStatus(404);
      return;
    }

    if (!secretKey) {
      // Do not fall back to direct collection when the server-side secret is
      // absent: that would expose a browser path without IP provenance.
      res.status(503).send("Origami visitor proxy is not configured");
      return;
    }

    const target = new URL(upstreamPath, ORIGAMI_ORIGIN);
    target.search = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";

    try {
      const init: RequestInit & { duplex?: "half" } = {
        method: req.method,
        headers: requestHeaders(req, secretKey),
        signal: AbortSignal.timeout(5_000),
      };
      if (hasRequestBody(req)) {
        init.body = Readable.toWeb(req) as unknown as BodyInit;
        init.duplex = "half";
      }

      const upstream = await request(target, init);
      copySafeResponseHeaders(upstream.headers, res);
      res.status(upstream.status);
      if (req.method.toUpperCase() === "HEAD" || !upstream.body) {
        res.end();
        return;
      }

      Readable.fromWeb(upstream.body as import("node:stream/web").ReadableStream)
        .on("error", () => res.destroy())
        .pipe(res);
    } catch (error) {
      const message = error instanceof Error ? error.name : "unknown error";
      console.error(`[OrigamiVisitorsProxy] upstream request failed: ${message}`);
      if (!res.headersSent) res.status(502).send("Origami visitor proxy unavailable");
      else res.destroy();
    }
  };

  for (const path of Array.from(ALLOWED_PATHS.keys())) app.all(path, forward);
  app.all("/_ov", (_req, res) => res.sendStatus(404));
  app.all("/_ov/*", (_req, res) => res.sendStatus(404));
}
