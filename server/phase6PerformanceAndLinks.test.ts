import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { staticRoutes } from "../shared/routes";

const projectFile = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("Phase 6 direct internal-link corrections", () => {
  it("uses the supported Instant Scan CTA label without changing its destination", () => {
    const conditionPage = projectFile("client/src/pages/conditions/ConditionPage.tsx");

    expect(conditionPage).toContain('<Link href="/instant-scan/">');
    expect(conditionPage).toContain("Explore Image Review Options");
    expect(conditionPage).not.toContain("Review the Photo Guide");
  });

  it("uses canonical, source-controlled owners for the corrected Instant Scan links", () => {
    const instantScan = projectFile("client/src/pages/InstantScan.tsx");
    const app = projectFile("client/src/App.tsx");
    const sourceControlledRoutes = [
      "/symptoms/swollen-gums",
      "/conditions/dental-abscess",
    ];

    expect(instantScan).toContain('{ label: "Cavity Symptoms", href: "/oral-health-hub/cavity-symptoms-tooth-decay/" }');
    expect(instantScan).toContain('{ label: "Swollen Gums", href: "/symptoms/swollen-gums/" }');
    expect(instantScan).toContain('{ label: "Dental Abscess", href: "/conditions/dental-abscess/" }');
    expect(instantScan).not.toContain('href: "/oral-health-hub/cavity-symptoms/"');
    expect(instantScan).not.toContain('href: "/oral-health-hub/swollen-gums/"');
    expect(instantScan).not.toContain('href: "/oral-health-hub/tooth-abscess-symptoms/"');
    expect(app).toContain('path="/oral-health-hub/cavity-symptoms-tooth-decay" component={Article}');
    for (const route of sourceControlledRoutes) {
      expect(staticRoutes.some((entry) => entry.path === route)).toBe(true);
    }
  });
});
