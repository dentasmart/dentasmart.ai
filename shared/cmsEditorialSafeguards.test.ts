import { describe, expect, it } from "vitest";
import { createCmsBlankDocument } from "./cmsHubRegistry";
import { cmsDocumentSchema } from "./cmsBlocks";
import { analyzeCmsSeo } from "./cmsSeoAnalysis";
import { getCmsReadabilityEvidence } from "./cmsReadabilityEvidence";
import { getCmsDraftDeletePolicy } from "./cmsDraftDeletePolicy";
import { editorLinkHasNoFollow, editorLinkRel, isExternalEditorLink, validEditorLinkHref } from "./editorLinkPolicy";
import { cmsUrlTransition, isValidCmsPublicPath } from "./cmsUrlPolicy";

describe("Advanced CMS editorial and URL safeguards", () => {
  it("stores index/noindex, follow and robots choices in a private draft", () => {
    const doc = createCmsBlankDocument("guides", "sample-guide", "Sample Guide");
    const parsed = cmsDocumentSchema.parse({ ...doc, seo: {
      ...doc.seo, robotsNoindex: true, robotsNofollow: true, robotsDisallow: false,
      requestedPath: "/guides/sample-new-guide/",
    }});
    expect(parsed.seo.robotsNoindex).toBe(true);
    expect(parsed.seo.robotsNofollow).toBe(true);
    expect(parsed.seo.requestedPath).toBe("/guides/sample-new-guide/");
    expect(cmsDocumentSchema.safeParse({ ...doc, seo: {...doc.seo, requestedPath: "https://evil.test/"} }).success).toBe(false);
    expect(cmsDocumentSchema.safeParse({ ...doc, seo: {...doc.seo, requestedPath: "/guide/../secret"} }).success).toBe(false);
  });

  it("counts on-page images accurately without counting featured/social duplicates", () => {
    const doc = createCmsBlankDocument("guides", "sample", "Sample");
    doc.images = {
      hero: { url: "/images/hero.webp", altText: "Toothbrushing technique close up" },
      featured: { url: "/images/featured.webp", altText: "" },
      og: { url: "/images/og.webp", altText: "" },
    };
    doc.blocks.push({ id: "content-image", type: "image",
      image: { url: "/images/inline.webp", altText: "" } });
    const result = analyzeCmsSeo(doc);
    expect(result.metrics.imageCount).toBe(2);
    expect(result.metrics.imagesWithAlt).toBe(1);
    expect(result.metrics.imagesWithoutAlt).toBe(1);
    expect(result.checks.find(check => check.id === "alt")?.status).toBe("improve");
    doc.blocks[doc.blocks.length - 1] = { id: "content-image", type: "image",
      image: { url: "/images/inline.webp", altText: "", decorative: true } };
    const updated = analyzeCmsSeo(doc);
    expect(updated.metrics.decorativeImages).toBe(1);
    expect(updated.metrics.imagesWithoutAlt).toBe(0);
    doc.blocks[doc.blocks.length - 1] = { id: "content-image", type: "image",
      image: { url: "/images/inline.webp", altText: "Pasted image" } };
    const weak = analyzeCmsSeo(doc);
    expect(weak.metrics.imagesWeakAlt).toBe(1);
    expect(weak.checks.find(check => check.id === "alt")?.status).toBe("improve");

    expect(updated.checks.find(check => check.id === "alt")?.status).toBe("good");
  });

  it("identifies exact text and section ids behind long-sentence and paragraph warnings", () => {
    const doc = createCmsBlankDocument("guides", "sample-guide", "Example");
    const long = "Patients should discuss the intended procedure, potential alternatives, expected benefits, important risks, healing duration, and any questions with a suitably qualified dental professional before making an informed treatment decision.";
    doc.blocks[1] = { id: "main", type: "rich_text", heading: "", html: "<p>" + long + " ".repeat(2) + long + " " + long + "</p>" };
    const evidence = getCmsReadabilityEvidence(doc);
    expect(evidence.longSentences.length).toBeGreaterThan(0);
    expect(evidence.longSentences[0].blockId).toBe("main");
    expect(evidence.longSentences[0].excerpt).toContain("Patients should discuss");
    expect(evidence.longParagraphs.some(item => item.blockId === "main")).toBe(true);
    expect(evidence.structure.some(item => item.blockId === "main")).toBe(true);
  });

  it("never creates an automatic redirect to an unpublished or source-controlled destination", () => {
    expect(isValidCmsPublicPath("/guides/new-slug/")).toBe(true);
    expect(isValidCmsPublicPath("/guides//bad/")).toBe(false);
    expect(isValidCmsPublicPath("https://other.site/")).toBe(false);
    expect(cmsUrlTransition("/guides/old/", "/guides/new/", false)).toEqual({
      changed: true, ready: false, requiresRedirect: false,
    });
    expect(cmsUrlTransition("/guides/old/", "/guides/new/", true)).toEqual({
      changed: true, ready: true, requiresRedirect: true,
    });
  });

  it("protects original pages and test-published snapshots from deletion", () => {
    expect(getCmsDraftDeletePolicy({ editable:false, revision:1, publishedRevision:null, origin:"source" }).allowed).toBe(false);
    expect(getCmsDraftDeletePolicy({ editable:true, revision:11, publishedRevision:6, origin:"source" }).allowed).toBe(false);
    expect(getCmsDraftDeletePolicy({ editable:true, revision:3, publishedRevision:null, origin:"draft" }).allowed).toBe(true);
    expect(getCmsDraftDeletePolicy({ editable:true, revision:1, publishedRevision:null, origin:"source" }).label).toBe("Discard saved draft");
  });

  it("preserves accurate link-level nofollow choices and refuses unsafe URLs", () => {
    expect(editorLinkRel(true, false)).toBe("nofollow");
    expect(editorLinkRel(false, true)).toBe("noopener noreferrer");
    expect(editorLinkRel(true, true)).toBe("noopener noreferrer nofollow");
    expect(editorLinkRel(false, false)).toBeNull();
    expect(editorLinkHasNoFollow("noopener nofollow")).toBe(true);
    expect(editorLinkHasNoFollow("noopener")).toBe(false);
    expect(isExternalEditorLink("https://dentasmart.ai.evil.example/path")).toBe(true);
    expect(isExternalEditorLink("https://dentasmart.ai/conditions/")).toBe(false);
    expect(validEditorLinkHref("javascript:alert(1)")).toBeNull();
    expect(validEditorLinkHref("//evil.example")).toBeNull();
    expect(validEditorLinkHref("/conditions/toothache/")).toBe("/conditions/toothache/");
  });
});
