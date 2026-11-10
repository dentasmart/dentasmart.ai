import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  CMS_EDITOR_MAIN_TABS, CMS_EDITOR_SEO_TABS, cmsEditorSessionKey,
  parseCmsEditorMainTab, parseCmsEditorSeoTab,
} from "./cmsEditorTabState";

const page = readFileSync(new URL("../client/src/pages/AdminCmsPreview.tsx", import.meta.url), "utf8");
const panels = readFileSync(new URL("../client/src/components/cms/CmsSeoPanels.tsx", import.meta.url), "utf8");

describe("Advanced CMS refresh location and section restoration", () => {
  it("round-trips all four main tabs and five nested SEO tabs", () => {
    expect(CMS_EDITOR_MAIN_TABS).toHaveLength(4);
    expect(CMS_EDITOR_SEO_TABS).toHaveLength(5);
    for (const tab of CMS_EDITOR_MAIN_TABS) expect(parseCmsEditorMainTab(tab)).toBe(tab);
    for (const tab of CMS_EDITOR_SEO_TABS) expect(parseCmsEditorSeoTab(tab)).toBe(tab);
  });
  it("ignores invalid saved sections and does not select unknown panels", () => {
    for (const value of [null, "", "reviewer", "fake", "Rich Text Editor"]) {
      expect(parseCmsEditorMainTab(value)).toBe("sections");
      expect(parseCmsEditorSeoTab(value)).toBe("seo");
    }
  });
  it("stores selection independently for every hub, slug, and tab level", () => {
    expect(cmsEditorSessionKey("conditions", "toothache", "main"))
      .not.toBe(cmsEditorSessionKey("symptoms", "toothache", "main"));
    expect(cmsEditorSessionKey("conditions", "toothache", "main"))
      .not.toBe(cmsEditorSessionKey("conditions", "gum-disease", "main"));
    expect(cmsEditorSessionKey("conditions", "toothache", "seo"))
      .not.toBe(cmsEditorSessionKey("conditions", "toothache", "main"));
  });
  it("restores the saved private-draft page after loading, including nested SEO position", () => {
    expect(page).toContain('window.sessionStorage.getItem(cmsEditorSessionKey(hubId, slug, "main"))');
    expect(page).toContain('window.sessionStorage.getItem(cmsEditorSessionKey(hubId, slug, "seo"))');
    expect(page).toContain('window.sessionStorage.setItem(cmsEditorSessionKey(hubId, slug, "main"), next)');
    expect(page).toContain('window.sessionStorage.setItem(cmsEditorSessionKey(hubId, slug, "seo"), next)');
    expect(page).toContain("savedDraft.isLoading || savedDraft.isFetching");
    expect(page).toContain('tab === "seo" ? "cms-advanced-seo-tabs" : "cms-advanced-main-tabs"');
    expect(page).toContain('navigation.scrollIntoView({ behavior: "auto", block: "start" })');
    expect(page).toContain('id="cms-advanced-main-tabs"');
    expect(page).toContain('tabListId="cms-advanced-seo-tabs"');
    expect(page).toContain('activeTab={seoTab} onActiveTabChange={changeSeoTab}');
    expect(page).toContain('changeMainTab("sections")');
    expect(panels).toContain("activeTab ?? localTab");
    expect(panels).toContain("if (onActiveTabChange) onActiveTabChange(next)");
    expect(panels).toContain('id={tabListId}');
  });
  it("does not write CMS document content or draft data to browser storage", () => {
    const writes = page.match(/window\.sessionStorage\.setItem\([^\n]+/g) || [];
    expect(writes).toHaveLength(2);
    for (const write of writes) {
      expect(write).toContain("cmsEditorSessionKey(");
      expect(write).not.toContain("document");
      expect(write).not.toContain("reviewer");
    }
    expect(page).not.toContain("window.localStorage.setItem");
    expect(panels).not.toContain("window.localStorage.setItem");
  });
});
