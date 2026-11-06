import { describe, expect, it } from "vitest";
import { brand } from "../shared/facts";
import { formatPageTitle, SITE_TITLE_PHRASE } from "../shared/pageTitle";

const HOME_TITLE = "DentaSmart | Better Teeth. Lower Costs";
const LEGACY_TAGLINE = "Your Personal AI Dentist in Your Pocket";

describe("sitewide page-title formatting", () => {
  it("keeps the exact approved tagline only on the homepage, sourced from central brand facts", () => {
    expect(SITE_TITLE_PHRASE).toBe(brand.tagline);
    expect(SITE_TITLE_PHRASE).toBe("Better Teeth. Lower Costs");
    expect(formatPageTitle("DentaSmart")).toBe(HOME_TITLE);
    expect(formatPageTitle("DentaSmart | Your Personal AI Oral Health Guide"))
      .toBe(HOME_TITLE);
    expect(formatPageTitle(HOME_TITLE)).toBe(HOME_TITLE);
    expect(formatPageTitle("")).toBe(HOME_TITLE);
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
    expect(formatPageTitle(`Buck Teeth (Overjet): Causes, Costs & How to Fix Them | ${LEGACY_TAGLINE}`))
      .toBe("Buck Teeth (Overjet): Causes, Costs & How to Fix Them | DentaSmart");
  });

  it.each([LEGACY_TAGLINE, brand.tagline, `${brand.tagline}.`, LEGACY_TAGLINE.toLowerCase(), brand.tagline.toUpperCase()])(
    "normalizes the legacy homepage and non-homepage suffix %s",
    (tagline) => {
      expect(formatPageTitle(`DentaSmart | ${tagline}`)).toBe(HOME_TITLE);
      expect(formatPageTitle(`Features | ${tagline}`)).toBe("Features | DentaSmart");
      expect(formatPageTitle(`Features | DentaSmart | ${tagline}`)).toBe("Features | DentaSmart");
    },
  );

  it("normalizes stacked old, new, and compact suffixes without duplication", () => {
    expect(formatPageTitle(`  Features | ${LEGACY_TAGLINE} | ${brand.tagline} | DentaSmart  `))
      .toBe("Features | DentaSmart");
    expect(formatPageTitle(`DentaSmart | ${LEGACY_TAGLINE} | ${brand.tagline}`)).toBe(HOME_TITLE);
  });

  it("preserves tagline-like words within a genuine topic rather than broadly replacing text", () => {
    expect(formatPageTitle("Better Teeth. Lower Costs. explained"))
      .toBe("Better Teeth. Lower Costs. explained | DentaSmart");
  });
});
