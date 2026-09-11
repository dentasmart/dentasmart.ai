import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(import.meta.dirname, "..");
const symptomsSource = readFileSync(
  path.join(projectRoot, "client/src/data/symptoms.ts"),
  "utf8",
);
const symptomPageSource = readFileSync(
  path.join(projectRoot, "client/src/pages/symptoms/SymptomPage.tsx"),
  "utf8",
);
const rootCanalSource = readFileSync(
  path.join(projectRoot, "client/src/pages/treatments/RootCanalProcedure.tsx"),
  "utf8",
);
const treatmentTemplateSource = readFileSync(
  path.join(projectRoot, "client/src/pages/treatments/TreatmentPageTemplate.tsx"),
  "utf8",
);
const exitIntentSource = readFileSync(
  path.join(projectRoot, "client/src/components/ExitIntentPopup.tsx"),
  "utf8",
);
const scrollProgressSource = readFileSync(
  path.join(projectRoot, "client/src/components/ScrollProgressCTA.tsx"),
  "utf8",
);
const stickyBannerSource = readFileSync(
  path.join(projectRoot, "client/src/components/StickyDownloadBanner.tsx"),
  "utf8",
);
const aeoSource = readFileSync(
  path.join(projectRoot, "client/src/data/aeoContent.ts"),
  "utf8",
);

describe("Phase 9 source-only medical page safeguards", () => {
  it("keeps tooth-pain-when-biting qualified, source-backed, and non-diagnostic", () => {
    expect(symptomsSource).toContain("Tooth Pain When Biting: What to Notice and When to Get Care");
    expect(symptomsSource).toContain("metaTitle: \"Tooth Pain When Biting: What to Notice | DentaSmart\"");
    expect(symptomsSource).toContain("The pattern of pain can help describe the problem, but it cannot confirm the cause.");
    expect(symptomsSource).toContain("https://www.aae.org/patients/dental-symptoms/tooth-pain/");
    expect(symptomsSource).toContain("https://www.aae.org/patients/dental-symptoms/cracked-teeth/");
    expect(symptomsSource).toContain("https://my.clevelandclinic.org/health/articles/11368--dental-emergencies-what-to-do");
    expect(symptomsSource).toContain("https://www.nhs.uk/conditions/dental-abscess/");
    expect(symptomsSource).not.toMatch(/A filling might be \$150-\$300/);
    expect(symptomsSource).not.toMatch(/Diagnose My Tooth Pain/);
    expect(symptomsSource).toContain("An exam is needed to identify the cause.");
    expect(aeoSource).not.toContain("Pain when biting down usually means");
    expect(symptomsSource).toContain("Contact a dentist urgently for fever with tooth pain or swelling, or for worsening swelling of the face or jaw.");
    expect(symptomsSource).toContain("Get emergency medical care now if swelling makes it hard to breathe, speak, or swallow");
  });

  it("keeps tongue-pain guidance clear about visible and non-visible limits", () => {
    expect(symptomsSource).toContain("Tongue Pain: What to Notice and When to Get Care");
    expect(symptomsSource).toContain("A photo can help you document a visible change, but it cannot rule out a cause of tongue pain");
    expect(symptomsSource).toContain("https://www.nidcr.nih.gov/health-info/burning-mouth");
    expect(symptomsSource).toContain("https://www.nidcr.nih.gov/health-info/dry-mouth");
    expect(symptomsSource).toContain("https://www.nidcr.nih.gov/health-info/oral-cancer");
    expect(symptomsSource).toContain("https://www.cdc.gov/oral-health/about/about-oral-cancer.html");
    expect(symptomsSource).toContain("https://www.mouthhealthy.org/all-topics-a-z/mouth-sores/");
    expect(symptomsSource).toContain("https://www.nhs.uk/conditions/dental-abscess/");
    expect(symptomsSource).not.toMatch(/Try over-the-counter oral pain relief gels/);
    expect(symptomsSource).not.toMatch(/A lack of iron, vitamin B12, or folate/);
    expect(aeoSource).toContain("Persistent symptoms need professional assessment.");
    expect(aeoSource).not.toContain("Tongue pain is usually a temporary discomfort");
    expect(symptomsSource).toContain("A mouth sore lasts a week or longer or keeps returning.");
    expect(symptomsSource).toContain("lasts more than two weeks.");
    expect(symptomsSource).toContain("Get emergency medical care now if swelling makes it hard to breathe, speak, or swallow.");
    expect(symptomsSource).toContain("Do not wait for an app result or a routine appointment when these symptoms are present.");
  });

  it("keeps root-canal information qualified, source-backed, and within product boundaries", () => {
    expect(rootCanalSource).toContain("Why a Dentist May Discuss a");
    expect(rootCanalSource).toContain("These symptoms do not confirm that a root canal is needed.");
    expect(rootCanalSource).toContain("https://www.aae.org/patients/root-canal-treatment/what-is-a-root-canal/root-canal-explained/");
    expect(rootCanalSource).toContain("https://www.aae.org/patients/your-office-visit/post-treatment-care/");
    expect(rootCanalSource).toContain("https://www.mouthhealthy.org/all-topics-a-z/root-canals");
    expect(rootCanalSource).toContain("It does not determine whether you need a root canal");
    expect(rootCanalSource).toContain("buttonText: \"Review Your Treatment Plan\"");
    expect(rootCanalSource).toContain("ctaLabel: \"See Root Canal Cost\"");
    expect(rootCanalSource).toContain("It does not verify healing or treatment success.");
    expect(rootCanalSource).not.toMatch(/Get a Second Opinion|Second Opinion|monitor your healing|healing progress/);
    expect(rootCanalSource).not.toContain("clean and seal tissue inside a tooth");
    expect(rootCanalSource).toContain("clean and seal the canal spaces inside a tooth");
    expect(rootCanalSource).toContain("may recommend or discuss a permanent filling, crown, or other restoration");
    expect(rootCanalSource).not.toContain("will recommend a permanent filling, crown, or other restoration");
    expect(rootCanalSource).not.toMatch(/90 minutes to 3 hours/);
    expect(rootCanalSource).not.toMatch(/Most of the time, a tooth that needs a root canal also needs a crown/);
    expect(treatmentTemplateSource).toContain("data.midContentCta?.buttonText");
    expect(treatmentTemplateSource).toContain("data.followUpSupport?.description");
    expect(treatmentTemplateSource).toContain("data.relatedCostPage.ctaLabel");
    expect(exitIntentSource).toContain('id: "root-canal-treatment-plan"');
    expect(exitIntentSource).toContain('ctaText: "Review Your Treatment Plan"');
    expect(exitIntentSource).toContain('normalizedPathname === "/treatments/root-canal-procedure"');
    expect(exitIntentSource).toContain("pathname.split(/[?#]/, 1)[0]");
    expect(scrollProgressSource).toContain('normalizedPathname === "/treatments/root-canal-procedure"');
    expect(scrollProgressSource).toContain('ctaButtonText: "Review Your Treatment Plan"');
    expect(scrollProgressSource).toContain("href={ctaContext.ctaLink}");
    expect(stickyBannerSource).toContain('normalizedPathname === "/treatments/root-canal-procedure"');
    expect(stickyBannerSource).toContain('ctaButtonText: "Review Your Treatment Plan"');
    expect(stickyBannerSource).toContain("href={ctaContext.ctaLink}");
  });

  it("renders visible sources only for symptom entries that provide page-specific references", () => {
    expect(symptomsSource).toContain("sourceRefs?: ContentSourceRef[];");
    expect(symptomsSource.match(/sourceRefs: \[/g)).toHaveLength(2);
    expect(symptomPageSource).toContain("sourceRefs: symptom.sourceRefs");
    expect(symptomPageSource).toContain("<ExternalSources governedSources={symptom.sourceRefs} />");
    expect(symptomPageSource).toContain("symptom.sourceRefs &&");
    expect(symptomPageSource).toContain("urgentCareText={symptom.nextStepsUrgencyText}");
  });
});
