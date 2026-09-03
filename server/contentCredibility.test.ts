import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const textExtensions = new Set([".ts", ".tsx", ".json", ".html"]);
const publicRoots = [
  "client/src",
  "client/index.html",
  "server/metaTags.ts",
  "server/ssrContent.ts",
  "server/seo.ts",
  "shared",
];

function collectFiles(path: string): string[] {
  const fullPath = join(root, path);
  const stat = statSync(fullPath);
  if (stat.isFile()) {
    return textExtensions.has(path.slice(path.lastIndexOf("."))) ? [fullPath] : [];
  }

  return readdirSync(fullPath, { withFileTypes: true }).flatMap((entry) => {
    const nested = join(path, entry.name);
    return entry.isDirectory()
      ? collectFiles(nested)
      : textExtensions.has(nested.slice(nested.lastIndexOf(".")))
        ? [join(root, nested)]
        : [];
  });
}

function renderedSource(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
}

const publicFiles = [...new Set(publicRoots.flatMap(collectFiles))].filter(
  (file) =>
    !file.includes("/pages/Admin") &&
    !file.includes("/components/editor/") &&
    !file.endsWith("/shared/routes.ts")
);

const noAiSlopPattern =
  /\b(?:here(?:'|’)s the thing|let(?:'|’)s be honest|the truth is|think about it|you(?:'|’)re not alone|you are not alone|what most people get wrong|what nobody tells you|game[- ]changer|paradigm shift|cutting-edge|delve|tapestry|ever-evolving|supercharge|set it and forget it)\b/gi;

describe("source-controlled public content credibility", () => {
  it("keeps precise No AI Slop patterns out of public rendered copy", () => {
    const matches = publicFiles.flatMap((file) => {
      const source = renderedSource(readFileSync(file, "utf8"));
      const phrases = source.match(noAiSlopPattern) ?? [];
      return phrases.map((phrase) => `${relative(root, file)}: ${phrase}`);
    });

    expect(matches).toEqual([]);
  });

  it("does not label a generic symptom download link as a dentist finder", () => {
    const symptomData = readFileSync(join(root, "client/src/data/symptoms.ts"), "utf8");
    const symptomTemplate = readFileSync(
      join(root, "client/src/pages/symptoms/SymptomPage.tsx"),
      "utf8"
    );

    expect(symptomData).not.toContain('ctaButton: "Find a DentaSmart Dentist"');
    expect(symptomTemplate).toContain('<Link href="/download">');
  });

  it("describes the dentist page as an educational guide rather than a locator", () => {
    const metadata = readFileSync(join(root, "server/metaTags.ts"), "utf8");
    const finderEntry = metadata.match(
      /"\/find-a-dentist":\s*\{([\s\S]*?)\n\s*\},/
    )?.[1];

    expect(finderEntry).toBeTruthy();
    expect(finderEntry).toContain("How to Choose a Dentist");
    expect(finderEntry).not.toMatch(/dentist finder|search by location|search by specialty/i);
  });
});
