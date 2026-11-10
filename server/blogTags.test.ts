import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  isTest: vi.fn(() => false),
  getDb: vi.fn(),
  getPost: vi.fn(),
}));

vi.mock("./cmsTestPublication", () => ({
  isCmsTestPublicationEnvironment: mocks.isTest,
}));
vi.mock("./db", () => ({ getDb: mocks.getDb }));
vi.mock("./blogDb", () => ({ getBlogPostById: mocks.getPost }));

import { readAdminBlogTags, saveAdminBlogTags } from "./blogTags";

describe("Blog tags stay isolated from public and production systems", () => {
  beforeEach(() => {
    mocks.isTest.mockReset().mockReturnValue(false);
    mocks.getDb.mockReset();
    mocks.getPost.mockReset();
  });
  it("rejects tag reads outside the isolated test database before querying DB", async () => {
    await expect(readAdminBlogTags(1)).rejects.toThrow("isolated test environment");
    expect(mocks.getDb).not.toHaveBeenCalled();
  });
  it("rejects tag writes outside the isolated test database before blog lookups", async () => {
    await expect(saveAdminBlogTags(1, ["Oral Care"])).rejects.toThrow("isolated test environment");
    expect(mocks.getPost).not.toHaveBeenCalled();
    expect(mocks.getDb).not.toHaveBeenCalled();
  });
  it("rejects writes to nonexistent articles in the test environment", async () => {
    mocks.isTest.mockReturnValue(true);
    mocks.getPost.mockResolvedValue(null);
    await expect(saveAdminBlogTags(123456, ["Tooth Pain"])).rejects.toThrow("Blog article not found");
    expect(mocks.getDb).not.toHaveBeenCalled();
  });
});
