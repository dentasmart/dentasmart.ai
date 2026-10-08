import { describe, expect, it } from "vitest";
import { formatPageTitle, SITE_TITLE_PHRASE } from "../shared/pageTitle";

const HOME_TITLE = `DentaSmart | ${SITE_TITLE_PHRASE}`;

describe("sitewide page-title formatting", () => {
  it("keeps the approved full tagline only on the homepage", () => {
    expect(formatPageTitle("DentaSmart")).toBe(HOME_TITLE);
    expect(formatPageTitle("DentaSmart | Your Personal AI Oral Health Guide"))
      .toBe(HOME_TITLE);
    expect(formatPageTitle(HOME_TITLE)).toBe(HOME_TITLE);
  });

  it("normalizes normal internal titles to the compact DentaSmart suffix", () => {
    expect(formatPageTitle("Dental Crown Cost | DentaSmart"))
      .toBe("Dental Crown Cost | DentaSmart");
    expect(formatPageTitle("Mouth Ulcer Guide | DentaSmart Oral Health Hub"))
      .toBe("Mouth Ulcer Guide | DentaSmart");
    expect(formatPageTitle("What Causes Tooth Pain?"))
      .toBe("What Causes Tooth Pain? | DentaSmart");
  });

  it("does not duplicate an existing compact suffix", () => {
    expect(formatPageTitle("Features | DentaSmart"))
      .toBe("Features | DentaSmart");
    expect(formatPageTitle("Features | DentaSmart | DentaSmart"))
      .toBe("Features | DentaSmart");
  });

  it("normalizes legacy long-tagline titles to the compact suffix", () => {
    expect(formatPageTitle(`Buck Teeth (Overjet): Causes, Costs & How to Fix Them | ${SITE_TITLE_PHRASE}`))
      .toBe("Buck Teeth (Overjet): Causes, Costs & How to Fix Them | DentaSmart");
  });
});
