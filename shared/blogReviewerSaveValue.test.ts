import { describe, expect, it } from "vitest";
import { reviewerValueForSave } from "./blogReviewerSaveValue";

describe("reviewer metadata draft save normalization", () => {
  it("sends explicit null for empty or whitespace-only fields", () => {
    for (const value of ["", " ", "  \n  ", "\t"]) {
      expect(reviewerValueForSave(value)).toBeNull();
      expect(reviewerValueForSave(value)).not.toBeUndefined();
    }
  });

  it("preserves nonempty reviewer text while trimming accidental whitespace", () => {
    expect(reviewerValueForSave(" QA TEST - NOT A CLINICAL REVIEWER ")).toBe("QA TEST - NOT A CLINICAL REVIEWER");
    expect(reviewerValueForSave("/team/#dr-saba-ahmed")).toBe("/team/#dr-saba-ahmed");
    expect(reviewerValueForSave("2026-10-26")).toBe("2026-10-26");
  });
});
