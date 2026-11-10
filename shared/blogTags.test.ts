import { describe, expect, it } from "vitest";
import { appendBlogTags, normalizeBlogTags, removeBlogTag } from "./blogTags";

describe("Existing blog editor tag normalization", () => {
  it("accepts comma-separated labels and ignores blanks and case-insensitive duplicates", () => {
    expect(normalizeBlogTags(" Tooth Pain, Oral Health, tooth pain, ,  Enamel   Care "))
      .toEqual(["Tooth Pain", "Oral Health", "Enamel Care"]);
  });
  it("handles unchanged structured labels and empty values", () => {
    expect(normalizeBlogTags(["Flossing", " Brushing ", "FLOSSING"])).toEqual(["Flossing", "Brushing"]);
    expect(normalizeBlogTags("")).toEqual([]);
  });
  it("appends a newly entered tag while retaining saved tags, without duplicates", () => {
    expect(appendBlogTags(["Toothache", "Dental Pain"], "Oral Care, test, toothache"))
      .toEqual(["Toothache", "Dental Pain", "Oral Care", "test"]);
  });
  it("removes only the selected tag chip and leaves others in the saved order", () => {
    expect(removeBlogTag(["Toothache", "Dental Pain", "Oral Care"], "Dental Pain"))
      .toEqual(["Toothache", "Oral Care"]);
  });
  it("never mutates existing saved tags when adding or removing", () => {
    const saved = ["Toothache", "Oral Care"];
    appendBlogTags(saved, "Dental Pain");
    removeBlogTag(saved, "Toothache");
    expect(saved).toEqual(["Toothache", "Oral Care"]);
  });
  it("rejects labels over 100 characters or over 30 unique labels rather than silently dropping them", () => {
    expect(() => normalizeBlogTags("x".repeat(101))).toThrow("100 characters");
    expect(() => normalizeBlogTags(Array.from({length:31}, (_,n) => "tag-"+n))).toThrow("at most 30");
  });
});
