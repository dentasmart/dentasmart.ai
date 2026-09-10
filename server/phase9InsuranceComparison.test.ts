import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(import.meta.dirname, "..");
const comparisonSource = readFileSync(
  path.join(projectRoot, "client/src/pages/ComparePage.tsx"),
  "utf8",
);

describe("Phase 9 insurance comparison factual safety", () => {
  it("does not present the unsupported generic dental-insurance price range", () => {
    expect(comparisonSource).not.toMatch(/\$30[–-]60\/month/);
    expect(comparisonSource).not.toMatch(/30[–-]60\/month/);
    expect(comparisonSource).toContain("Varies by plan and coverage.");
  });

  it("describes insurance availability through multiple possible pathways", () => {
    expect(comparisonSource).not.toContain("Often employer-tied");
    expect(comparisonSource).toContain(
      "May be available through employers, individual plans, or Marketplace options.",
    );
  });

  it("retains the DentaSmart insurance, diagnosis, and professional-care boundaries", () => {
    expect(comparisonSource).toContain(
      "DentaSmart is not insurance and does not diagnose conditions.",
    );
    expect(comparisonSource).toContain(
      "DentaSmart is not dental insurance and does not replace professional care.",
    );
  });
});
