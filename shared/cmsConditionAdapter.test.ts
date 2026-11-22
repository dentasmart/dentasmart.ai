import { describe, expect, it } from "vitest";
import { conditionsData, conditionsList } from "../client/src/data/conditions";
import { cmsDocumentSchema } from "./cmsBlocks";
import { legacyConditionToCmsDocument } from "./cmsConditionAdapter";

describe("legacy Conditions import (read-only)", () => {
  it("imports all source-controlled Conditions into valid editable documents", () => {
    expect(conditionsList.length).toBe(17);
    for (const condition of conditionsList) {
      const document = legacyConditionToCmsDocument(condition);
      const validated = cmsDocumentSchema.safeParse(document);
      expect(validated.success, condition.slug + ": " +
        (!validated.success ? JSON.stringify(validated.error.issues) : "")).toBe(true);
      expect(document.slug).toBe(condition.slug);
      expect(document.seo.focusKeyword).toBe(condition.primaryKeyword);
      expect(document.seo.secondaryKeywords).toEqual(condition.secondaryKeywords);
      expect(document.blocks.find((block) => block.type === "urgent_care")).toBeDefined();
      expect(document.images).toEqual({});
    }
  });

  it("converts the toothache source content without modifying the source data", () => {
    const original = conditionsData.toothache;
    const document = legacyConditionToCmsDocument(original);
    const causes = document.blocks.find((block) => block.type === "causes");
    expect(causes?.type).toBe("causes");
    if (!causes || causes.type !== "causes") throw Error("Missing causes block");
    expect(causes.items[0].title).toBe(original.causes[0].title);
    causes.items[0].title = "Private draft";
    expect(original.causes[0].title).not.toBe("Private draft");
  });

  it("encodes legacy text before inserting it into rich-text HTML", () => {
    const condition = { ...conditionsData.toothache, detailedExplanation: ["Test <img src=x onerror=alert(1)> & safe"] };
    const document = legacyConditionToCmsDocument(condition);
    const explanation = document.blocks.find((block) => block.type === "rich_text");
    expect(explanation?.type).toBe("rich_text");
    if (!explanation || explanation.type !== "rich_text") throw Error("Missing explanation block");
    expect(explanation.html).toContain("&lt;img");
    expect(explanation.html).toContain("&amp; safe");
    expect(explanation.html).not.toContain("<img");
  });
});
