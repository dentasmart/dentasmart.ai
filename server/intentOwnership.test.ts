import { describe, expect, it } from "vitest";
import { staticRoutes } from "../shared/routes";
import {
  assertValidIntentOwnershipRegistry,
  getIntentOwner,
  getOwnersForSupportingRoute,
  getStaticRoutePaths,
  intentOwnershipRegistry,
  validateIntentOwnershipRegistry,
  type IntentOwnershipRecord,
} from "../shared/intentOwnership";

describe("Phase 2 intent ownership registry", () => {
  it("references only routes in the existing static route authority", () => {
    expect(validateIntentOwnershipRegistry()).toEqual([]);
    expect(() => assertValidIntentOwnershipRegistry()).not.toThrow();
  });

  it("surfaces duplicate intent IDs and conflicting primary owners", () => {
    const first = intentOwnershipRegistry[0] as IntentOwnershipRecord;
    const duplicate: IntentOwnershipRecord = {
      ...first,
      primaryRoute: "/pricing",
    };
    const issues = validateIntentOwnershipRegistry([first, duplicate]);

    expect(issues.map((issue) => issue.code)).toContain("DUPLICATE_INTENT_ID");
    expect(issues.map((issue) => issue.code)).toContain("PRIMARY_OWNER_CONFLICT");
  });

  it("keeps supporting pages connected to owner records without creating a route", () => {
    const owners = getOwnersForSupportingRoute("/oral-health-hub/second-opinion");
    expect(owners.map((owner) => owner.intentId)).toContain("treatment-plan-review");
    expect(getIntentOwner("instant-scan-education")?.primaryRoute).toBe("/instant-scan");
    expect(getIntentOwner("instant-scan-education")?.ownerRole).toBe("SUPPORTING_PAGE");
  });

  it("is import-safe for shared client and server use and does not mutate the route manifest", () => {
    const before = JSON.stringify(staticRoutes);
    const validPaths = getStaticRoutePaths();

    expect(validPaths.has("/pricing")).toBe(true);
    expect(getIntentOwner("pricing")?.primaryRoute).toBe("/pricing");
    expect(JSON.stringify(staticRoutes)).toBe(before);
  });

  it("preserves Treatment Plan Review as the public product name", () => {
    const record = getIntentOwner("treatment-plan-review");
    expect(record?.intentName).toBe("Treatment Plan Review");
    expect(record?.entity).toBe("Treatment Plan Review");
    expect(JSON.stringify(record)).not.toContain("AI Second Opinion");
  });

  it("does not seed unsupported B2B offerings as approved owners", () => {
    const serialized = JSON.stringify(intentOwnershipRegistry).toLowerCase();

    for (const blockedTerm of [
      "dental benefits plan",
      "careington",
      "dialcare",
      "broker package",
      "peo package",
      "association package",
      "self-insured employer package",
      "partner/network",
      "employer savings",
      "roi claim",
    ]) {
      expect(serialized).not.toContain(blockedTerm);
    }

    expect(getIntentOwner("employer-discovery")?.governanceStatus).toBe("DEFER");
  });
});
