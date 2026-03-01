# Sitemap CDN Override Diagnosis

## Phase 0 Findings

### /sitemap.xml
- **Status**: 200
- **Content-Type**: application/xml
- **Server**: cloudflare
- **NO x-powered-by: Express** → CDN-generated, never reaches Express
- **NO cache-control** → Platform controls caching

### /robots.txt
- **Status**: 200
- **Content-Type**: text/plain
- **Content-Length**: 82 (very short, platform-generated)
- **Server**: cloudflare
- **NO x-powered-by: Express** → CDN-generated, never reaches Express

### /sitemap-custom.xml (test - not yet implemented)
- **Status**: 200
- **Content-Type**: text/html; charset=utf-8 (SPA fallback)
- **cache-control**: no-cache, no-store, must-revalidate
- **Server**: cloudflare
- **NO x-powered-by: Express** → Falls through to SPA catch-all
- **Key finding**: The `.xml` extension causes the response to NOT have `x-powered-by: Express`, meaning it may be intercepted before Express

### /api/trpc/blog.list (known working Express route)
- **Status**: 204
- **x-powered-by: Express** ← CONFIRMED reaches Express
- **cf-cache-status**: DYNAMIC

## Root Cause
The Manus deployment platform's Cloudflare CDN layer:
1. Intercepts `/sitemap.xml` and `/robots.txt` completely — auto-generates them from React routes
2. Routes with `.xml` extension that aren't known by the CDN fall through to the SPA catch-all (returns HTML)
3. Only `/api/*` routes reliably reach Express (confirmed by x-powered-by header)

## Critical Discovery
`/sitemap-custom.xml` does NOT have `x-powered-by: Express` — it returns the SPA HTML fallback. This means even custom `.xml` paths don't reach Express. The CDN/platform treats any path with `.xml` extension specially.

## Solution
Must use a path WITHOUT `.xml` extension under `/api/` prefix to guarantee Express handles it. The route `/api/sitemap` already works locally. After publishing, it should work in production too.

Alternative: Try registering Express route at `/sitemap-custom.xml` and see if it takes priority over the SPA catch-all since it's registered before serveStatic.
