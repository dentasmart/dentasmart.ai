import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = path.resolve(import.meta.dirname, "..");

function readSource(relativePath: string) {
  return readFileSync(path.join(projectRoot, relativePath), "utf8");
}

describe("active public security claims", () => {
  it("keeps unsupported HIPAA and E2EE claims out of the FAQ page and its client schema source", () => {
    const source = readSource("client/src/pages/FAQs.tsx");

    expect(source).not.toMatch(/HIPAA[- ]compliant/i);
    expect(source).not.toMatch(/end[- ]to[- ]end/i);
    expect(source).not.toMatch(/bank[- ]level/i);
    expect(source).not.toMatch(/bank[- ]grade/i);
    expect(source).not.toMatch(/encrypted at rest and in transit/i);
    expect(source).toContain("How do you protect my information?");
  });

  it("keeps unsupported encryption and compliance claims out of the Features page", () => {
    const source = readSource("client/src/pages/Features.tsx");

    expect(source).not.toMatch(/HIPAA[- ]compliant/i);
    expect(source).not.toMatch(/end[- ]to[- ]end/i);
    expect(source).not.toMatch(/bank[- ]level/i);
    expect(source).not.toMatch(/bank[- ]grade/i);
    expect(source).not.toMatch(/encrypted at rest and in transit/i);
    expect(source).toContain('title: "Privacy & Security"');
    expect(source).toContain('title: "Data Protection"');
  });

  it("keeps universal encryption claims out of the Download page", () => {
    const source = readSource("client/src/pages/Download.tsx");

    expect(source).not.toMatch(/HIPAA[- ]compliant/i);
    expect(source).not.toMatch(/end[- ]to[- ]end/i);
    expect(source).not.toMatch(/bank[- ]level/i);
    expect(source).not.toMatch(/bank[- ]grade/i);
    expect(source).not.toMatch(/encrypted at rest and in transit/i);
    expect(source).not.toMatch(/stays encrypted/i);
  });

  it("keeps the approved privacy wording on the Download page free of absolute third-party sharing claims", () => {
    const source = readSource("client/src/pages/Download.tsx");

    expect(source).not.toMatch(/never shared/i);
    expect(source).not.toMatch(/not shared with third parties/i);
    expect(source).toContain("See our Privacy Policy for details on how information is handled.");
  });

  it("keeps FAQ access and retention wording focused on user choice and the Privacy Policy", () => {
    const source = readSource("client/src/pages/FAQs.tsx");

    expect(source).not.toMatch(/Only you and anyone you explicitly share/i);
    expect(source).not.toMatch(/Your data is stored for as long as your account is active/i);
    expect(source).toContain("You can choose when to share your DentaSmart reports with your dentist or others.");
    expect(source).toContain("We retain information as described in our Privacy Policy. You can request account deletion at any time.");
  });

  it("keeps Features copy specific to report downloads and account-deletion requests", () => {
    const source = readSource("client/src/pages/Features.tsx");

    expect(source).not.toMatch(/Export or delete your information anytime, instantly/i);
    expect(source).toContain('title: "Your Data, Your Choices"');
    expect(source).toContain("Download your reports and request account deletion at any time.");
  });

  it("keeps Answers and Free AI Teeth Scanner copy free of unverified sharing, encryption, and compliance assertions", () => {
    const answers = readSource("client/src/pages/Answers.tsx");
    const scanner = readSource("client/src/pages/FreeAiTeethScanner.tsx");

    expect(answers).not.toMatch(/never share your personal health information with third parties/i);
    expect(answers).not.toMatch(/encrypted and stored securely/i);
    expect(answers).not.toMatch(/delete your data at any time from the app/i);
    expect(scanner).not.toMatch(/photos are processed securely and are not shared with third parties/i);
    expect(scanner).not.toMatch(/complies with standard data protection practices/i);
    expect(scanner).toContain("We take the privacy and security of your information seriously.");
  });
});
