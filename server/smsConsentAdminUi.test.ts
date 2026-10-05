import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const pageSource = readFileSync(
  resolve(process.cwd(), "client/src/pages/AdminSmsConsents.tsx"),
  "utf8"
);
const layoutSource = readFileSync(
  resolve(process.cwd(), "client/src/components/AdminLayout.tsx"),
  "utf8"
);

describe("SMS consent admin UI", () => {
  it("renders the required summary columns and nullable identity fallbacks", () => {
    for (const label of [
      "ID",
      "Full Name",
      "Email",
      "Mobile Number",
      "Consent Status",
      "Consent Date",
      "Source",
      "Created At",
      "View Details",
      "Not provided",
      "Granted",
    ]) {
      expect(pageSource).toContain(label);
    }
  });

  it("keeps audit fields out of the main list and includes them in the detail view", () => {
    const listStart = pageSource.indexOf('<Table className="min-w-[1080px]">');
    const listEnd = pageSource.indexOf("</Table>", listStart);
    const listSource = pageSource.slice(listStart, listEnd);
    const detailStart = pageSource.indexOf("function ConsentDetails");
    const detailEnd = pageSource.indexOf("export default function AdminSmsConsents");
    const detailSource = pageSource.slice(detailStart, detailEnd);

    expect(listSource).not.toContain("sourceIp");
    expect(listSource).not.toContain("userAgent");
    expect(listSource).not.toContain("idempotencyKey");
    expect(detailSource).toContain("Source IP");
    expect(detailSource).toContain("User agent");
    expect(detailSource).toContain("Idempotency key");
    expect(detailSource).toContain("Exact consent wording");
  });

  it("contains no edit, delete, revoke, or mutation controls", () => {
    expect(pageSource).not.toContain("useMutation");
    expect(pageSource).not.toContain("Delete");
    expect(pageSource).not.toContain("Edit");
    expect(pageSource).not.toContain("Revoke");
  });

  it("uses compact mobile cards and a viewport-safe, internally scrolling detail dialog", () => {
    expect(pageSource).toContain("MobileConsentCard");
    expect(pageSource).toContain("hidden overflow-x-auto md:block");
    expect(pageSource).toContain("grid gap-3 p-3 md:hidden");
    expect(pageSource).toContain("max-h-[calc(100dvh-2rem)]");
    expect(pageSource).toContain("overflow-x-hidden overflow-y-auto");
    expect(pageSource).toContain("break-words");
  });

  it("uses the existing sheet primitive for a mobile-only admin navigation drawer", () => {
    expect(layoutSource).toContain("SheetContent");
    expect(layoutSource).toContain("Open admin navigation");
    expect(layoutSource).toContain("hidden md:flex");
    expect(layoutSource).toContain("md:hidden");
  });
});
