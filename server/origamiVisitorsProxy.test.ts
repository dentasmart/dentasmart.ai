import express from "express";
import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import { registerOrigamiVisitorsProxy } from "./_core/origamiVisitorsProxy";

function createApp(fetchImplementation = vi.fn<typeof fetch>()) {
  const app = express();
  registerOrigamiVisitorsProxy(app, {
    secretKey: "og_sk_test_proxy_secret",
    fetchImplementation,
  });
  return { app, fetchImplementation };
}

describe("Origami first-party visitor proxy", () => {
  it("forwards only the allowed script endpoint with server-only provenance headers", async () => {
    const fetchImplementation = vi.fn<typeof fetch>().mockResolvedValue(
      new Response("console.log('origami');", {
        status: 200,
        headers: { "content-type": "application/javascript", "cache-control": "public, max-age=60" },
      }),
    );
    const { app } = createApp(fetchImplementation);

    const response = await request(app)
      .get("/_ov/o.js?cache=1")
      .set("X-Forwarded-For", "198.51.100.4, 203.0.113.8")
      .set("User-Agent", "OrigamiProxyTest/1.0")
      .set("Origin", "https://dentasmart.ai")
      .set("Referer", "https://dentasmart.ai/pricing/")
      .set("Cookie", "private_session=keep-out")
      .expect(200);

    expect(response.text).toContain("origami");
    expect(response.headers["content-type"]).toContain("application/javascript");
    expect(fetchImplementation).toHaveBeenCalledTimes(1);

    const [target, init] = fetchImplementation.mock.calls[0];
    expect(String(target)).toBe("https://origami-web-visitors.com/v1/o.js?cache=1");
    const headers = init?.headers as Headers;
    expect(headers.get("authorization")).toBe("Bearer og_sk_test_proxy_secret");
    expect(headers.get("x-origami-client-ip")).toBe("203.0.113.8");
    expect(headers.get("user-agent")).toBe("OrigamiProxyTest/1.0");
    expect(headers.get("origin")).toBe("https://dentasmart.ai");
    expect(headers.get("referer")).toBe("https://dentasmart.ai/pricing/");
    expect(headers.get("cookie")).toBeNull();
  });

  it("forwards the exact event and identify paths but rejects every other /_ov path", async () => {
    const fetchImplementation = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 204 }));
    const { app } = createApp(fetchImplementation);

    await request(app).post("/_ov/e").set("Content-Type", "text/plain").send('{"p":"/pricing/"}').expect(204);
    await request(app).post("/_ov/identify").set("Content-Type", "text/plain").send('{"id":"user-1"}').expect(204);
    await request(app).post("/_ov/s").send("blocked").expect(404);
    await request(app).get("/_ov/anything-else").expect(404);

    expect(fetchImplementation).toHaveBeenCalledTimes(2);
    expect(String(fetchImplementation.mock.calls[0][0])).toBe("https://origami-web-visitors.com/v1/e");
    expect(String(fetchImplementation.mock.calls[1][0])).toBe("https://origami-web-visitors.com/v1/identify");
  });

  it("fails closed when the server-side secret is absent", async () => {
    const fetchImplementation = vi.fn<typeof fetch>();
    const app = express();
    registerOrigamiVisitorsProxy(app, { secretKey: "", fetchImplementation });

    await request(app).get("/_ov/o.js").expect(503);
    expect(fetchImplementation).not.toHaveBeenCalled();
  });
});
