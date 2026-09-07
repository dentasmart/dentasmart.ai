import { describe, expect, it } from "vitest";
import { formatPageTitle, SITE_TITLE_PHRASE } from "../shared/pageTitle";

describe("sitewide page-title formatting", () => {
  it("uses the requested phrase on the homepage", () => {
    expect(formatPageTitle("DentaSmart | Your Personal AI Oral Health Guide"))
      .toBe(`DentaSmart | ${SITE_TITLE_PHRASE}`);
  });

  it("preserves unique search intent while replacing the old brand suffix", () => {
    expect(formatPageTitle("Dental Crown Cost | DentaSmart"))
      .toBe(`Dental Crown Cost | ${SITE_TITLE_PHRASE}`);
    expect(formatPageTitle("Mouth Ulcer Guide | DentaSmart Oral Health Hub"))
      .toBe(`Mouth Ulcer Guide | ${SITE_TITLE_PHRASE}`);
  });

  it("adds the phrase to database and override titles without a brand suffix", () => {
    expect(formatPageTitle("What Causes Tooth Pain?"))
      .toBe(`What Causes Tooth Pain? | ${SITE_TITLE_PHRASE}`);
  });

  it("does not duplicate the phrase", () => {
    const formatted = `Features | ${SITE_TITLE_PHRASE}`;
    expect(formatPageTitle(formatted)).toBe(formatted);
  });
});
