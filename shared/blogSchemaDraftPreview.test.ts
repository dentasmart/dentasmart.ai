import { describe, expect, it } from "vitest";
import { getBlogSchemaDraftPreview } from "./blogSchemaDraftPreview";
import type { BlogSeoDraft } from "./blogSeoAdapter";
const draft: BlogSeoDraft = {
  title:"Gum health", slug:"gum-health", bodyHtml:"<p>Gum health matters for oral health.</p>",
  editorMode:"wysiwyg",storySections:[],
  primaryKeyword:"gum health",secondaryKeywords:"",
  metaTitle:"Gum Health: Information",metaDescription:"Learn more about gum health.",
  canonicalUrl:"",ogTitle:"",ogDescription:"",ogImage:"/og-image.png",featuredImage:"/featured-image.png",
};
describe("original BlogPosting draft-only schema preview",()=>{
  it("uses existing BlogPosting model, publisher reference and featured-image precedence",()=>{
    const preview=getBlogSchemaDraftPreview(draft);
    expect(preview.type).toBe("BlogPosting");
    expect(preview.schema["@type"]).toBe("BlogPosting");
    expect(preview.schema.image).toBe("https://dentasmart.ai/featured-image.png");
    expect(preview.schema.url).toBe("https://dentasmart.ai/oral-health-hub/gum-health/");
    expect(preview.previewOnly).toBe(true);
  });
  it("uses OG as image fallback and does not invent reviewer or published date",()=>{
    const result=getBlogSchemaDraftPreview({...draft,featuredImage:"",ogImage:"/share.webp"});
    expect(result.schema.image).toBe("https://dentasmart.ai/share.webp");
    expect(result.schema).not.toHaveProperty("reviewedBy");
    expect(result.schema).not.toHaveProperty("datePublished");
  });
  it("does not modify existing data or assume custom schema can be applied",()=>{
    const old=structuredClone(draft);
    const result=getBlogSchemaDraftPreview({...draft,canonicalUrl:"http://example.com/unsafe"});
    expect(result.issues.some(x=>x.includes("canonical"))).toBe(true);
    expect(draft).toEqual(old);
  });
  it("does not display publication dates for unpublished drafts, even when the DB has a timestamp", () => {
    const unpublished=getBlogSchemaDraftPreview({...draft,status:"draft",publishedAt:"2026-10-27T05:29:07.000Z",updatedAt:"2026-10-27T05:50:58.000Z"});
    expect(unpublished.schema).not.toHaveProperty("datePublished");
    expect(unpublished.schema).not.toHaveProperty("dateModified");
    const published=getBlogSchemaDraftPreview({...draft,status:"published",publishedAt:"2026-10-27T05:29:07.000Z",updatedAt:"2026-10-27T05:50:58.000Z"});
    expect(published.schema.datePublished).toBe("2026-10-27T05:29:07.000Z");
  });

  it("avoids claiming private CMS test media is a public article image", () => {
    const result=getBlogSchemaDraftPreview({...draft,featuredImage:"/api/cms-test-media/testing.webp"});
    expect(result.schema.image).toBe("https://dentasmart.ai/og-image.png");
    expect(result.issues.join(" ")).toContain("not public");
    const bothPrivate=getBlogSchemaDraftPreview({...draft,featuredImage:"/api/cms-test-media/featured.webp",ogImage:"/api/cms-test-media/og.webp"});
    expect(bothPrivate.schema).not.toHaveProperty("image");
  });

  it("includes complete eligible reviewer information and one consistent WebPage reference", () => {
    const result=getBlogSchemaDraftPreview({
      ...draft,status:"draft",
      reviewedByName:"Example QA Clinician",
      reviewerProfileUrl:"/team/#example-reviewer",
      reviewedByCredentials:"BDS",reviewerShortBio:"Approved public reviewer biography.",
      lastReviewed:"2026-10-27",
    });
    const article=result.schemas.find(node=>node["@type"]==="BlogPosting")!;
    const page=result.schemas.find(node=>node["@type"]==="WebPage")!;
    expect(article.mainEntityOfPage).toEqual({ "@type":"WebPage", "@id":page["@id"] });
    expect(page.lastReviewed).toBe("2026-10-27");
    expect(page.reviewedBy).toEqual({
      "@type":"Person",name:"Example QA Clinician",jobTitle:"BDS",
      description:"Approved public reviewer biography.",url:"https://dentasmart.ai/team/#example-reviewer",
    });
  });

});
