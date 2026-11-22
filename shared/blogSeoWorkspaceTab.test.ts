import { describe, expect, it } from "vitest";
import { BLOG_SEO_WORKSPACE_TABS, blogSeoWorkspaceTabKey, parseBlogSeoWorkspaceTab } from "./blogSeoWorkspaceTab";

describe("Blog Editor SEO workspace refresh continuity", () => {
  it("restores every supported editorial tab, including Reviewer", () => {
    expect(BLOG_SEO_WORKSPACE_TABS).toHaveLength(7);
    for (const tab of BLOG_SEO_WORKSPACE_TABS) {
      expect(parseBlogSeoWorkspaceTab(tab)).toBe(tab);
    }
  });

  it("falls back safely for stale, missing, or malformed saved tabs", () => {
    for (const value of [null, "", "fake", "structured", "wysiwyg", "REVIEWER"]) {
      expect(parseBlogSeoWorkspaceTab(value)).toBe("seo");
    }
  });

  it("isolates the saved tab per article without storing article contents", () => {
    expect(blogSeoWorkspaceTabKey(3)).not.toBe(blogSeoWorkspaceTabKey(4));
    expect(blogSeoWorkspaceTabKey(null)).not.toBe(blogSeoWorkspaceTabKey(3));
    expect(blogSeoWorkspaceTabKey(3)).toContain(":3");
    expect(blogSeoWorkspaceTabKey(0)).toBe(blogSeoWorkspaceTabKey(null));
  });
});
