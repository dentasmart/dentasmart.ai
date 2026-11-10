import { describe, expect, it, vi } from "vitest";
import express from "express";
import request from "supertest";
import {
  privateCmsImageKey,
  registerCmsPrivateMediaRoutes,
} from "./cmsPrivateMediaRead";

const filename = "12345678-1234-4234-8234-123456789abc.webp";
const path = `/api/cms-private-media/${filename}`;

function setup(overrides: Record<string, any> = {}) {
  const app = express();
  const readObject = vi.fn().mockResolvedValue(
    new Uint8Array([82, 73, 70, 70])
  );

  registerCmsPrivateMediaRoutes(app, {
    getConfig: () => ({
      bucket: "private-cms",
      region: "us-east-1",
    }),
    verifyToken: async () => ({
      adminId: 1,
      username: "editor",
    }),
    getAdmin: async () => ({ username: "editor" }),
    readObject,
    ...overrides,
  });

  return { app, readObject };
}

describe("Private CMS image retrieval", () => {
  it("restricts object keys to generated WebP filenames", () => {
    expect(privateCmsImageKey(filename)).toBe(
      `cms-private-drafts/${filename}`
    );
    expect(privateCmsImageKey("../secret.webp")).toBeNull();
    expect(privateCmsImageKey("random.webp")).toBeNull();
  });

  it("returns 404 when storage is disabled", async () => {
    const { app, readObject } = setup({
      getConfig: () => null,
    });

    await request(app).get(path).expect(404);
    expect(readObject).not.toHaveBeenCalled();
  });

  it("rejects requests without an administrator session", async () => {
    const { app, readObject } = setup();

    await request(app).get(path).expect(401);
    expect(readObject).not.toHaveBeenCalled();
  });

  it("rejects invalid administrator sessions", async () => {
    const { app, readObject } = setup({
      verifyToken: async () => null,
    });

    await request(app)
      .get(path)
      .set("Cookie", "blog_admin_session=invalid")
      .expect(401);

    expect(readObject).not.toHaveBeenCalled();
  });

  it("rejects revoked administrator accounts", async () => {
    const { app, readObject } = setup({
      getAdmin: async () => null,
    });

    await request(app)
      .get(path)
      .set("Cookie", "blog_admin_session=test")
      .expect(403);

    expect(readObject).not.toHaveBeenCalled();
  });

  it("serves authenticated images without public caching", async () => {
    const { app, readObject } = setup();

    const response = await request(app)
      .get(path)
      .set("Cookie", "blog_admin_session=test")
      .expect(200);

    expect(response.headers["content-type"]).toMatch(
      /image\/webp/
    );
    expect(response.headers["cache-control"]).toBe(
      "private, no-store"
    );
    expect(response.headers["x-content-type-options"]).toBe(
      "nosniff"
    );
    expect(response.headers["cross-origin-resource-policy"]).toBe(
      "same-origin"
    );

    expect(readObject).toHaveBeenCalledWith(
      "private-cms",
      "us-east-1",
      `cms-private-drafts/${filename}`
    );
  });

  it("does not expose storage errors", async () => {
    const { app } = setup({
      readObject: async () => {
        throw new Error("private storage error");
      },
    });

    const response = await request(app)
      .get(path)
      .set("Cookie", "blog_admin_session=test")
      .expect(503);

    expect(response.text).not.toContain(
      "private storage error"
    );
  });
});
