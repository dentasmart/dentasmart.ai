import { afterEach, describe, expect, it, vi } from "vitest";
import { resolveSchemaMarkup } from "./schemaMarkup";

function findMedicalSchema(schemas: object[]) {
  return schemas.find((schema) => (schema as { "@type"?: string })["@type"] === "MedicalWebPage") as Record<string, unknown> | undefined;
}

describe("MedicalWebPage review metadata", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("omits legacy condition reviewer and date strings until public reviewer provenance is verified", async () => {
    const schema = findMedicalSchema(await resolveSchemaMarkup("/conditions/toothache"));
    expect(schema).toBeDefined();
    expect(schema).not.toHaveProperty("lastReviewed");
    expect(schema).not.toHaveProperty("reviewedBy");
  });

  it("omits legacy symptom reviewer and date strings until public reviewer provenance is verified", async () => {
    const schema = findMedicalSchema(await resolveSchemaMarkup("/symptoms/mouth-numbness"));
    expect(schema).toBeDefined();
    expect(schema).not.toHaveProperty("lastReviewed");
    expect(schema).not.toHaveProperty("reviewedBy");
  });

  it("does not introduce a MedicalWebPage review claim for the representative guide route", async () => {
    const schema = findMedicalSchema(await resolveSchemaMarkup("/guides/brushing-guide"));
    expect(schema).toBeUndefined();
  });

  it("does not emit review metadata for unsupported route families", async () => {
    const schema = findMedicalSchema(await resolveSchemaMarkup("/dental-costs/root-canal-cost"));
    expect(schema).toBeDefined();
    expect(schema).not.toHaveProperty("lastReviewed");
    expect(schema).not.toHaveProperty("reviewedBy");
  });

  it("does not invent review metadata for a treatment", async () => {
    const schema = findMedicalSchema(await resolveSchemaMarkup("/treatments/root-canal-treatment"));
    expect(schema).toBeDefined();
    expect(schema).not.toHaveProperty("lastReviewed");
    expect(schema).not.toHaveProperty("reviewedBy");
  });

  it("does not invent review metadata for a dental emergency", async () => {
    const schema = findMedicalSchema(await resolveSchemaMarkup("/dental-emergencies/knocked-out-tooth"));
    expect(schema).toBeDefined();
    expect(schema).not.toHaveProperty("lastReviewed");
    expect(schema).not.toHaveProperty("reviewedBy");
  });

  it("does not create a MedicalWebPage or review metadata for an unsupported route", async () => {
    const schema = findMedicalSchema(await resolveSchemaMarkup("/unsupported-review-metadata-route"));
    expect(schema).toBeUndefined();
  });

  it("keeps legacy condition review strings absent independently of the runtime clock", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2031-01-01T00:00:00.000Z"));
    const firstSchema = findMedicalSchema(await resolveSchemaMarkup("/conditions/toothache"));

    vi.setSystemTime(new Date("2042-12-31T23:59:59.000Z"));
    const secondSchema = findMedicalSchema(await resolveSchemaMarkup("/conditions/toothache"));

    expect(firstSchema).not.toHaveProperty("lastReviewed");
    expect(secondSchema).not.toHaveProperty("lastReviewed");
  });
});
