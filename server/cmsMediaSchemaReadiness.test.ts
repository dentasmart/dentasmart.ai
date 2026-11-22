import { afterEach, describe, expect, it } from "vitest";
import { blogPosts, cmsPages } from "../drizzle/schema";
import {
  scanMediaReferences,
  isMissingCmsTableError,
} from "./mediaAltSync";

const originalEnv = process.env.NODE_ENV;

afterEach(() => {
  if (originalEnv === undefined) delete process.env.NODE_ENV;
  else process.env.NODE_ENV = originalEnv;
});

const media = {
  url: "https://example.com/image.webp",
  thumbnailUrl: null,
  mediumUrl: null,
  webpUrl: null,
  altText: null,
} as any;

function fakeDb(cmsError?: unknown) {
  return {
    select: () => ({
      from: async (table: unknown) => {
        if (table === blogPosts) return [];
        if (table === cmsPages) {
          if (cmsError) throw cmsError;
          return [];
        }
        throw new Error("Unexpected table");
      },
    }),
  };
}

describe("CMS media schema readiness", () => {
  it("recognizes missing table errors", () => {
    expect(isMissingCmsTableError({
      code: "ER_NO_SUCH_TABLE"
    })).toBe(true);

    expect(isMissingCmsTableError({
      cause: { code: "ER_NO_SUCH_TABLE" }
    })).toBe(true);

    expect(isMissingCmsTableError({
      code: "ECONNREFUSED"
    })).toBe(false);
  });

  it("marks missing production CMS storage as incomplete", async () => {
    process.env.NODE_ENV = "production";

    const result = await scanMediaReferences(
      fakeDb({ code: "ER_NO_SUCH_TABLE" }) as any,
      media
    );

    expect(result.cmsInventoryComplete).toBe(false);
    expect(result.cmsRows).toEqual([]);
  });

  it("recognizes successful CMS inventory", async () => {
    process.env.NODE_ENV = "production";

    const result = await scanMediaReferences(fakeDb() as any, media);

    expect(result.cmsInventoryComplete).toBe(true);
  });

  it("does not conceal unexpected database errors", async () => {
    process.env.NODE_ENV = "production";

    await expect(
      scanMediaReferences(
        fakeDb({ code: "ECONNREFUSED" }) as any,
        media
      )
    ).rejects.toMatchObject({ code: "ECONNREFUSED" });
  });
});
