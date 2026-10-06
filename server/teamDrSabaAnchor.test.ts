import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const clientRoot = path.resolve(import.meta.dirname, "../client/src");
const teamSource = fs.readFileSync(path.join(clientRoot, "pages/Team.tsx"), "utf8");
const articleSource = fs.readFileSync(path.join(clientRoot, "pages/Article.tsx"), "utf8");

describe("Dr. Saba Team profile anchor", () => {
  it("keeps the canonical reviewer target on Dr. Saba Ahmed's Leadership Team card", () => {
    expect(teamSource).toContain('const DR_SABA_PROFILE_ID = "dr-saba-ahmed"');
    expect(teamSource).toMatch(/<motion\.div\s+id="dr-saba-ahmed"[\s\S]*?<h3[^>]*>Dr\. Saba Ahmed<\/h3>/);
  });

  it("offsets the canonical card from the fixed site header on mobile and desktop", () => {
    expect(teamSource).toContain("scroll-mt-28 bg-white");
  });

  it("does not animate the hash target after the browser positions it", () => {
    expect(teamSource).toMatch(/id="dr-saba-ahmed"[\s\S]*?initial=\{false\}/);
  });

  it("scrolls to the mounted canonical target on direct load and hash navigation", () => {
    expect(teamSource).toContain("window.location.hash !== `#${DR_SABA_PROFILE_ID}`");
    expect(teamSource).toContain("window.requestAnimationFrame");
    expect(teamSource).toContain("document.getElementById(DR_SABA_PROFILE_ID)?.scrollIntoView({ block: \"start\" })");
    expect(teamSource).toContain('window.addEventListener("hashchange", scrollToDrSabaProfile)');
    expect(teamSource).toContain('window.removeEventListener("hashchange", scrollToDrSabaProfile)');
  });

  it("keeps article reviewer links bound to the validated reviewer profile URL", () => {
    expect(articleSource).toContain("href={publicReviewerMetadata.profileUrl}");
  });
});
