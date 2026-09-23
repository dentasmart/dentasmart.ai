import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  getTreatmentPlanReviewTargetId,
  treatmentPlanReviewSectionId,
} from "../client/src/lib/treatmentPlanReviewHash";

const root = new URL("..", import.meta.url).pathname;
const source = (relativePath: string) => readFileSync(`${root}/${relativePath}`, "utf8");

function readClientSources(directory = `${root}/client/src`): string {
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return [readClientSources(path)];
      return entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")
        ? [readFileSync(path, "utf8")]
        : [];
    })
    .join("\n");
}

describe("Treatment Plan Review fragment compatibility", () => {
  it("maps current and legacy fragments to the one semantic section only", () => {
    expect(getTreatmentPlanReviewTargetId("#treatment-plan-review")).toBe(treatmentPlanReviewSectionId);
    expect(getTreatmentPlanReviewTargetId("#second-opinion")).toBe(treatmentPlanReviewSectionId);
    expect(getTreatmentPlanReviewTargetId("#quick-check")).toBeNull();
    expect(getTreatmentPlanReviewTargetId("")).toBeNull();
  });

  it("keeps one current section id, one legacy compatibility anchor, and current CTA targets", () => {
    const pricing = source("client/src/pages/Pricing.tsx");
    const home = source("client/src/pages/Home.tsx");
    const comparison = source("client/src/pages/DentaSmartVsChatGPT.tsx");

    expect(pricing.match(/id="treatment-plan-review"/g)).toHaveLength(1);
    expect(pricing.match(/id="second-opinion"/g)).toHaveLength(1);
    expect(pricing).toContain("getTreatmentPlanReviewTargetId(window.location.hash)");
    expect(home).toContain('setLocation("/pricing/#treatment-plan-review")');
    expect(comparison).toContain('href="/pricing/#treatment-plan-review"');
  });

  it("keeps public CTA destinations on the current fragment only", () => {
    const clientSources = readClientSources();

    expect(clientSources).toContain("/pricing/#treatment-plan-review");
    expect(clientSources).not.toContain("/pricing/#second-opinion");
  });

  it("preserves only the compatible Pricing fragments instead of resetting the page to the top", () => {
    const scrollToTop = source("client/src/components/ScrollToTop.tsx");

    expect(scrollToTop).toContain("isTreatmentPlanReviewHash(window.location.hash)");
  });
});
