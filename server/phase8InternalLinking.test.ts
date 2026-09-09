import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readSource = (relativePath: string) =>
  readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");

describe("Phase 8 internal-linking safeguards", () => {
  it("keeps direct canonical destinations in the corrected high-fan-out templates", () => {
    const sources = [
      "client/src/pages/symptoms/SymptomPage.tsx",
      "client/src/pages/dental-costs/DentalCostsHub.tsx",
      "client/src/pages/dental-emergencies/DentalEmergenciesHub.tsx",
      "client/src/pages/dental-emergencies/EmergencyPageTemplate.tsx",
      "client/src/pages/guides/ConditionsHub.tsx",
      "client/src/pages/guides/AffordabilityHub.tsx",
    ].map(readSource);

    for (const source of sources) {
      expect(source).not.toMatch(/href="\/(?:download|pricing|symptom-quiz|treatments|dental-costs|conditions|guides)"/);
    }
  });

  it("keeps the corrected dynamic spoke links on final trailing-slash destinations", () => {
    const symptomTemplate = readSource("client/src/pages/symptoms/SymptomPage.tsx");
    const emergencyTemplate = readSource("client/src/pages/dental-emergencies/EmergencyPageTemplate.tsx");

    expect(symptomTemplate).toContain('canonicalRelatedDestinations');
    expect(symptomTemplate).toContain('"dry-mouth": "/symptoms/dry-mouth/"');
    expect(symptomTemplate).toContain('"cracked-tooth": "/conditions/cracked-tooth/"');
    expect(symptomTemplate).toContain('"sensitive-teeth": "/conditions/sensitive-teeth/"');
    expect(symptomTemplate).toContain('toothache: "/conditions/toothache/"');
    expect(symptomTemplate).toContain('"teeth-whitening": "/conditions/teeth-whitening/"');
    expect(symptomTemplate).toContain('`/conditions/${item.slug}/`');
    expect(symptomTemplate).toContain('`/symptoms/${item.slug}/`');
    expect(symptomTemplate).toContain('`/guides/${item.slug}/`');
    expect(emergencyTemplate).toContain('href={`/dental-emergencies/${page.slug}/`}');
    expect(emergencyTemplate).toContain('href={`/dental-costs/${data.relatedCostPage.slug}/`}');
    expect(emergencyTemplate).toContain('href={`/treatments/${data.relatedTreatmentPage.slug}/`}');
  });

  it("keeps emergency escalation content ahead of optional internal navigation", () => {
    const source = readSource("client/src/pages/dental-emergencies/EmergencyPageTemplate.tsx");
    expect(source.indexOf('id="immediate-steps"')).toBeLessThan(source.indexOf("More emergency guides"));
    expect(source.indexOf('id="immediate-steps"')).toBeLessThan(source.indexOf("<MidContentCTA"));
  });
});
