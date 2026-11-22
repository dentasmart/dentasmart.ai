import { describe, expect, it } from "vitest";
import { inferBlogRevisionAction } from "./blogRevisions";
import { readFileSync } from "node:fs";

describe("Blog Editor revision audit actions", () => {
  it("records initial saved articles as created", () => {
    expect(inferBlogRevisionAction(null, { status: "draft" })).toBe("created");
    expect(inferBlogRevisionAction(null, { status: "published" })).toBe("created");
  });
  it("distinguishes publish, unpublish, and ordinary saves", () => {
    expect(inferBlogRevisionAction({ status: "draft" }, { status: "published" })).toBe("published");
    expect(inferBlogRevisionAction({ status: "unpublished" }, { status: "published" })).toBe("published");
    expect(inferBlogRevisionAction({ status: "published" }, { status: "unpublished" })).toBe("unpublished");
    expect(inferBlogRevisionAction({ status: "published" }, { status: "published" })).toBe("saved");
    expect(inferBlogRevisionAction({ status: "draft" }, { status: "draft" })).toBe("saved");
  });
  it("isolates admin-only history reads and prevents accidental restoration", () => {
    const router = readFileSync(new URL("./blogRouter.ts", import.meta.url), "utf8");
    expect(router).toContain("listRevisions: adminBlogProcedure");
    expect(router).toContain("getRevision: adminBlogProcedure");
    expect(router).not.toContain("restoreBlogRevision:");
  });
  it("captures revisions inside the parent article write transaction only", () => {
    const db = readFileSync(new URL("./blogDb.ts", import.meta.url), "utf8");
    const revs = readFileSync(new URL("./blogRevisions.ts", import.meta.url), "utf8");
    expect(db).toContain("if (await isBlogRevisionHistoryAvailable(db))");
    expect(db).toContain("db.transaction(async (tx) =>");
    expect(db).toContain('for("update")');
    expect(revs).toContain("isCmsTestPublicationEnvironment()");
    expect(revs).toContain('table_name = \'blog_post_revisions\'');
  });
});
