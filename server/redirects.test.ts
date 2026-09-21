import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./db", () => ({
  getDb: vi.fn(),
}));

import { getDb } from "./db";
import { upsertRedirect } from "./redirectDb";
import { redirectUpsertInputSchema } from "./redirectsRouter";

const validInput = {
  sourcePath: "/legacy-page",
  targetPath: "/current-page/",
  statusCode: 301,
  isEnabled: true,
  note: null,
};

describe("redirect source-path contract", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("accepts normal create and update inputs through the 768-character production limit", () => {
    expect(redirectUpsertInputSchema.parse(validInput)).toMatchObject(validInput);
    expect(redirectUpsertInputSchema.parse({ ...validInput, id: 42 })).toMatchObject({
      ...validInput,
      id: 42,
    });
    expect(redirectUpsertInputSchema.parse({
      ...validInput,
      sourcePath: `/${"a".repeat(767)}`,
    }).sourcePath).toHaveLength(768);
  });

  it("rejects source paths longer than the production schema limit before persistence", () => {
    const tooLong = `/${"a".repeat(768)}`;
    expect(tooLong).toHaveLength(769);
    expect(() => redirectUpsertInputSchema.parse({ ...validInput, sourcePath: tooLong })).toThrow();
  });

  it("uses the unique source-path key as an upsert for duplicate sources", async () => {
    const onDuplicateKeyUpdate = vi.fn().mockResolvedValue(undefined);
    const values = vi.fn().mockReturnValue({ onDuplicateKeyUpdate });
    const insert = vi.fn().mockReturnValue({ values });
    vi.mocked(getDb).mockResolvedValue({ insert } as never);

    await upsertRedirect(validInput);

    expect(insert).toHaveBeenCalledOnce();
    expect(values).toHaveBeenCalledWith(expect.objectContaining(validInput));
    expect(onDuplicateKeyUpdate).toHaveBeenCalledWith({
      set: {
        targetPath: validInput.targetPath,
        statusCode: validInput.statusCode,
        isEnabled: validInput.isEnabled,
        note: null,
      },
    });
  });

  it("resolves exact paths, trailing-slash fallbacks, and unrelated paths behaviorally", async () => {
    const getAllRedirects = vi.fn().mockResolvedValue([
      {
        id: 1,
        sourcePath: "/exact-source",
        targetPath: "/exact-target/",
        statusCode: 301,
        isEnabled: true,
      },
      {
        id: 2,
        sourcePath: "/trailing-source/",
        targetPath: "/trailing-target/",
        statusCode: 308,
        isEnabled: true,
      },
    ]);
    vi.resetModules();
    vi.doMock("./redirectDb", () => ({ getAllRedirects }));

    const { clearRedirectCache, resolveRedirect } = await import("./redirectCache");
    clearRedirectCache();

    await expect(resolveRedirect("/exact-source")).resolves.toEqual({
      entry: {
        id: 1,
        targetPath: "/exact-target/",
        statusCode: 301,
        isEnabled: true,
      },
      cacheIsLoaded: true,
    });
    await expect(resolveRedirect("/trailing-source")).resolves.toEqual({
      entry: {
        id: 2,
        targetPath: "/trailing-target/",
        statusCode: 308,
        isEnabled: true,
      },
      cacheIsLoaded: true,
    });
    await expect(resolveRedirect("/unrelated-path")).resolves.toEqual({
      entry: null,
      cacheIsLoaded: true,
    });
    expect(getAllRedirects).toHaveBeenCalledOnce();

    vi.doUnmock("./redirectDb");
  });
});
