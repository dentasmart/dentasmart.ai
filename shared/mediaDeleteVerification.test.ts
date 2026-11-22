import { describe, expect, it } from "vitest";
import { canConfirmVerifiedMediaDelete } from "./mediaDeleteVerification";

describe("media deletion verification", () => {
  it("does not allow deletion before a fresh usage check finishes", () => {
    expect(canConfirmVerifiedMediaDelete(null, false, false)).toBe(false);
    expect(canConfirmVerifiedMediaDelete(null, true, false)).toBe(false);
  });

  it("allows an unused image only after verification", () => {
    expect(canConfirmVerifiedMediaDelete(0, false, false)).toBe(true);
  });

  it("requires acknowledgement for an in-use image", () => {
    expect(canConfirmVerifiedMediaDelete(1, false, false)).toBe(false);
    expect(canConfirmVerifiedMediaDelete(1, true, false)).toBe(true);
    expect(canConfirmVerifiedMediaDelete(5, false, false)).toBe(false);
  });

  it("prevents deletion during verification or another pending operation", () => {
    expect(canConfirmVerifiedMediaDelete(0, false, true)).toBe(false);
    expect(canConfirmVerifiedMediaDelete(1, true, true)).toBe(false);
  });

  it("rejects malformed verification counts", () => {
    expect(canConfirmVerifiedMediaDelete(-1, true, false)).toBe(false);
  });
});
