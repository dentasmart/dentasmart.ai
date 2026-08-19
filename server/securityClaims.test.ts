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
});
