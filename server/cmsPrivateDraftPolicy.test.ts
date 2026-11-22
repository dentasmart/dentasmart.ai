import { describe, expect, it } from "vitest";
import { canUseProductionCmsPrivateDrafts as allowed } from "./cmsPrivateDraftPolicy";

const valid = {
  nodeEnv: "production",
  enabled: "1",
  jwtSecret: "a".repeat(32),
  databaseUrl: "mysql://user:pass@db.example.com:3306/dentasmart_prod",
};

describe("Private CMS production draft gate", () => {
  it("defaults to disabled and requires explicit safeguards", () => {
    expect(allowed({})).toBe(false);
    expect(allowed({ ...valid, enabled: undefined })).toBe(false);
    expect(allowed({ ...valid, nodeEnv: "development" })).toBe(false);
    expect(allowed({ ...valid, jwtSecret: "weak" })).toBe(false);
    expect(allowed({ ...valid, databaseUrl: undefined })).toBe(false);
  });

  it("rejects isolated test databases and invalid URLs", () => {
    expect(allowed({ ...valid, databaseUrl: "invalid" })).toBe(false);
    expect(allowed({
      ...valid,
      databaseUrl: "mysql://user:pass@localhost:3307/dentasmart_test",
    })).toBe(false);
    expect(allowed({
      ...valid,
      databaseUrl: "mysql://user:pass@db.example.com:3306/dentasmart_vitest",
    })).toBe(false);
  });

  it("permits only explicitly opted-in production private drafting", () => {
    expect(allowed(valid)).toBe(true);
  });
});
