import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const editor = readFileSync(new URL("../client/src/pages/AdminBlogEditor.tsx", import.meta.url), "utf8");
const audit = readFileSync(new URL("../client/src/components/blog/BlogAdvancedSeoAudit.tsx", import.meta.url), "utf8");
const panels = readFileSync(new URL("../client/src/components/blog/BlogSeoFeaturePanel.tsx", import.meta.url), "utf8");
const richEditor = readFileSync(new URL("../client/src/components/BlogEditor.tsx", import.meta.url), "utf8");
const count = (s: string, needle: string) => s.split(needle).length - 1;

describe("Blog Editor full SEO workspace integration", () => {
  it("displays seven dedicated sections without creating another Blog Editor", () => {
    for (const tab of ["seo", "readability", "social", "media", "schema", "reviewer", "advanced"]) {
      expect(editor).toContain(`<TabsTrigger value="${tab}"`);
    }
    expect(count(editor, "const seoDraft: BlogSeoDraft")).toBe(1);
    expect(count(editor, "<BlogSeoFeaturePanel")).toBe(2); // Schema has explicit save/reset handlers.
    expect(count(editor, "<BlogAdvancedSeoAudit")).toBe(1);
  });
  it("restores the current SEO workspace tab and scrolls back to it after a refresh", () => {
    expect(editor).toContain('const [seoWorkspaceTab, setSeoWorkspaceTab] = useState<BlogSeoWorkspaceTab>("seo")');
    expect(editor).toContain('window.sessionStorage.getItem(key)');
    expect(editor).toContain("window.sessionStorage.setItem(blogSeoWorkspaceTabKey(editId), tab)");
    expect(editor).toContain("pending.tab !== seoWorkspaceTab");
    expect(editor).toContain('tabs.scrollIntoView({ behavior: "auto", block: "start" })');
    expect(editor).toContain('id="blog-seo-workspace-tabs"');
    expect(editor).toContain("<Tabs value={seoWorkspaceTab} onValueChange=");
    expect(editor).not.toContain('<Tabs defaultValue="seo"');
  });

  it("keeps one set of SEO title and description, metadata and reviewer fields", () => {
    for (const field of ["Primary focus keyphrase","Secondary keyphrases","Meta Title",
      "Meta Description","Meta Keywords (legacy)","Canonical URL","Reviewer name",
      "Reviewer credentials","Reviewer short bio","Reviewer profile URL",
      "Last reviewed"]) {
      expect(count(editor, `>${field}<`)).toBe(1);
    }
    expect(count(panels, ">OG Title (optional)<")).toBe(1);
    expect(count(panels, ">OG Description (optional)<")).toBe(1);
    expect(count(panels, ">OG Image URL (optional)<")).toBe(1);
    expect(count(panels, ">Featured Image URL<")).toBe(1);
    expect(editor).not.toContain(">OG Title<");
    expect(editor).not.toContain(">Featured Image URL<");
  });
  it("shows one visible Reviewer tab without copying or resetting existing reviewer fields", () => {
    const tabStart = editor.indexOf('<TabsContent value="reviewer"');
    expect(tabStart).toBeGreaterThan(-1);
    const tabEnd = editor.indexOf("</TabsContent>", tabStart);
    expect(tabEnd).toBeGreaterThan(tabStart);
    const reviewerPanel = editor.slice(tabStart, tabEnd);
    expect(reviewerPanel).toContain("Reviewer & attribution information");
    expect(reviewerPanel).toContain("Reviewer attribution is optional");
    expect(reviewerPanel).toContain("Do not invent a reviewer");
    expect(editor).not.toContain("<details className=\"overflow-hidden rounded-xl border border-stone-200 bg-white\">");
    for (const [field, setter] of [
      ["reviewedByName", "setReviewedByName"],
      ["reviewedByCredentials", "setReviewedByCredentials"],
      ["reviewerShortBio", "setReviewerShortBio"],
      ["reviewerProfileUrl", "setReviewerProfileUrl"],
      ["lastReviewed", "setLastReviewed"],
    ]) {
      expect(reviewerPanel).toContain(`value={${field}}`);
      expect(reviewerPanel).toContain(`${setter}(e.target.value); setIsDirty(true);`);
      expect(count(editor, `value={${field}}`)).toBe(1);
      expect(editor).toContain(`${field}:`);
      expect(editor).toContain(`${setter}(existingPost.${field} || "")`);
    }
    expect(reviewerPanel).not.toContain("Supplemental JSON-LD, optional");
    expect(editor).toContain("setReviewerJsonLd(existingPost.reviewerJsonLd || \"\")");
    expect(editor).toContain("onSchemaChange={value => { setReviewerJsonLd(value); setIsDirty(true); }}");
    expect(panels).toContain("Manual JSON-LD for this article");
    expect(editor).not.toContain("reviewerRequired");
  });

  it("sends cleared reviewer fields as explicit nulls through the create and update API", () => {
    const routerSource = readFileSync(new URL("./blogRouter.ts", import.meta.url), "utf8");
    for (const field of ["reviewedByName", "reviewedByCredentials", "reviewerShortBio",
      "reviewerProfileUrl", "lastReviewed", "reviewerJsonLd"]) {
      expect(editor).toContain(`${field}: reviewerValueForSave(${field})`);
      expect(routerSource).toMatch(new RegExp(field + ": z\\.string\\(\\).*?\\.nullable\\(\\)\\.optional\\(\\)"));
    }
    expect(editor).toContain("import { reviewerValueForSave }");
    expect(editor).toContain("const saveIntent = getBlogSaveIntent(status, isNew)");
    expect(editor).toContain("status: saveIntent.submittedStatus");
    expect(editor).not.toContain('updateMutation.mutate({ id: editId, ...formData, status: "draft" })');
    expect(routerSource).toContain("isUnsafeBlogStatusDemotion(existing?.status, data.status)");
  });

  it("shows an accurate meta title counter consistent with the SEO analyzer", () => {
    expect(editor).toContain("metaTitle.trim().length} characters · Recommended 30–60");
    expect(editor).toContain("metaDescription.trim().length} characters · Recommended 110–160");
    expect(editor).not.toContain("metaTitle.length}/60 characters");
    expect(editor).toContain("No primary keyphrase entered. Please add one");
    expect(editor).toContain("No secondary keyphrases entered (optional)");
    expect(editor).toContain("Please enter a meta title.");
    expect(editor).toContain("Please enter a meta description.");
  });
  it("preserves the original blog storage and private draft save behavior", () => {
    for (const name of ["primaryKeyword","secondaryKeywords","metaTitle","metaDescription",
      "ogTitle","ogDescription","ogImage","canonicalUrl","featuredImage","reviewedByName",
      "reviewerShortBio","reviewerProfileUrl","lastReviewed","reviewerJsonLd"]) {
      expect(editor).toContain(`set${name[0].toUpperCase() + name.slice(1)}(existingPost.${name}`);
    }
    expect(editor).toContain("updateMutation.mutate({ id: editId, ...formData");
    expect(editor).not.toContain("saveBlogSeoMutation");
  });
  it("shows grouped SEO guidance and a separate social-preview editor", () => {
    for (const category of ["Keyphrase","Metadata","Content","Links","Images","Readability"]) {
      expect(audit).toContain(`category: "${category}"`);
    }
    expect(audit).toContain("Search result preview");
    expect(audit).not.toContain("Social share preview");
    expect(panels).toContain("Facebook / LinkedIn");
    expect(panels).toContain("X / Twitter");
    expect(panels).toContain('onChange("ogImage",image.url)');
  });
  it("keeps Featured Image ALT in Media Library with guarded editing and no duplicate blog column", () => {
    const picker = readFileSync(new URL("../client/src/components/cms/CmsMediaPicker.tsx", import.meta.url), "utf8");
    const cmsRouter = readFileSync(new URL("./cmsRouter.ts", import.meta.url), "utf8");
    const mediaRouter = readFileSync(new URL("./mediaRouter.ts", import.meta.url), "utf8");
    expect(panels).toContain('editAltText');
    expect(panels).toContain("<FeaturedMediaAltField url={draft.featuredImage} />");
    expect(panels).toContain("trpc.media.findByUrl.useQuery");
    expect(panels).toContain("Save ALT to Media Library");
    expect(panels).toContain("MULTIPLE_USE_CONFIRMATION_REQUIRED");
    expect(panels).toContain("Published articles are not automatically changed.");
    expect(picker).toContain("ALT text for a new upload (optional)");
    expect(picker).toContain("Selected image ALT text (Media Library default)");
    expect(picker).toContain("altText: edited, mediaId: selectedMedia.id");
    expect(picker).toContain('altText: item.altText || "", mediaId: item.id');
    expect(picker).toContain("editAltText ? uploadAltText.trim()");
    expect(picker).toContain("MULTIPLE_USE_CONFIRMATION_REQUIRED");
    expect(cmsRouter).toContain("altText: z.string().max(500).optional()");
    expect(cmsRouter).toContain("altText: input.altText?.trim() || null");
    expect(mediaRouter).toContain("summary.publishedCount > 0");
    expect(mediaRouter).toContain("summary.distinctPages > 1 && !confirmMultiple");
    expect(editor).not.toContain("featuredImageAlt:");
  });

  it("prevents editor fields from disappearing during idle refreshes", () => {
    expect(editor).toContain("shouldHydrateBlogEditor(editId, existingPost.id, hydratedArticleId.current)");
    expect(editor).toContain("hydratedArticleId.current = editId");
    expect(editor).toContain("refetchOnReconnect: false");
    expect(editor).toContain('refetchOnMount: "always"');
    expect(editor).toContain("staleTime: Infinity");
    expect(editor).toContain("trpcUtils.blog.getById.invalidate({ id: editId })");
    expect(editor).not.toContain("setTimeout(() => setIsDirty(false), 0)");
    expect(editor).not.toContain("hasPopulated.current = false");
    expect(richEditor).toContain("editor.commands.setContent(content, { emitUpdate: false })");
    expect(editor).toContain("Admin session needs verification");
  });
  it("renders conditional SEO guidance without affecting the shared CMS analyzer", () => {
    expect(audit).toContain("formatBlogSeoChecks(analysis.checks, draft)");
    expect(audit).toContain("Not evaluated · ");
  });
  it("does not label unassessed readability or image sections as passed", () => {
    expect(audit).toContain('const notEvaluated = groupChecks.every(check => check.status === "info")');
    expect(audit).toContain(">Not evaluated</span>");
    expect(audit).toContain('!/^not evaluated/i.test(check.detail)');
  });
  it("uses the full shared CMS readability panel in the Blog Editor, not the abbreviated metric card", () => {
    const sharedPanel = readFileSync(new URL("../client/src/components/cms/CmsSeoPanels.tsx", import.meta.url), "utf8");
    expect(panels).toContain('import { ReadingPanel } from "@/components/cms/CmsSeoPanels"');
    expect(panels).toContain("<ReadingPanel document={document}");
    expect(panels).toContain('draft.editorMode === "wysiwyg" ? "Rich Text Editor" : "StoryBrand Sections"');
    for (const label of ["Long sentences", "Scannable paragraphs", "Section structure", "Varied sentence openings",
      "Flesch reading-ease estimate", "Technical language", "Prominent topic words", "Readability score"]) {
      expect(sharedPanel).toContain(label);
    }
    expect(sharedPanel).toContain("getCmsReadabilityScore(reading)");
    expect(sharedPanel).toContain("Sentence length (4 SEO points), paragraph length (4) and section structure (2)");
    expect(sharedPanel).toContain('readabilityScore === null ? "Not evaluated"');
    expect(sharedPanel).toContain("No body text yet. Readability checks are not evaluated");
  });

  it("connects Blog Editor readability warnings to the active editable content", () => {
    expect(panels).toContain("onLocateReadability?: (example: CmsReadingExcerpt) => void");
    expect(panels).toContain("<ReadingPanel document={document} onLocate={onLocateReadability} />");
    expect(editor).toContain("getBlogReadabilityTarget(seoDraft.editorMode, example.blockId)");
    expect(editor).toContain("onLocateReadability={handleLocateReadability}");
    expect(editor).toContain("reviewSelection={readabilitySelection}");
    expect(editor).toContain('id="blog-wysiwyg-content"');
    for (let i=0; i<5; i++) expect(editor).toContain(`sectionId="blog-story-section-${i}"`);
    expect(editor).toContain("findCmsReviewTextSpan(textarea.value, example.excerpt)");
    expect(editor).toContain("textarea.setSelectionRange(span.from, span.to)");
    expect(editor).toContain('textarea.scrollIntoView({ behavior: "smooth", block: "center" })');
    expect(editor).toContain('heading?.scrollIntoView({ behavior: "smooth", block: "center" })');
    expect(richEditor).toContain("reviewSelection?.requestId");
    expect(richEditor).toContain("editor.chain().focus().setTextSelection(range).run()");
    expect(richEditor).toContain("editor.view.coordsAtPos(position).top");
    expect(richEditor).toContain("getBlogReadabilityScrollDelta(targetTop, window.innerHeight)");
    expect(richEditor).toContain('window.scrollBy({ top: delta, behavior: "smooth" })');
    const locator = editor.split("const handleLocateReadability =")[1].split("const updateSocialOrMedia =")[0];
    expect(locator.split('if (target.mode === "wysiwyg")')[0]).not.toContain("scrollIntoView");
  });

  it("shows individual readability passages even when the overall thresholds pass", () => {
    const panel = readFileSync(new URL("../client/src/components/cms/CmsSeoPanels.tsx", import.meta.url), "utf8");
    expect(panel).toContain('item.status !== "not_evaluated" && item.examples.length > 0');
    expect(panel).toContain("This overall check passed, but the following individual passages may still be worth reviewing.");
    expect(panel).toContain("Find in article");
    expect(panel).toContain("totals may differ");
    expect(editor).toContain("setReadabilitySelection({ excerpt: example.excerpt");
  });

  it("warns and scores missing on-page images only in the Blog Editor", () => {
    expect(audit).toContain("analyzeCmsSeo(document, { requireOnPageImage: true, matchReadabilityPanel: true })");
    expect(audit).toContain("Article image recommendation:");
    expect(audit).toContain("Featured Image:");
    expect(audit).toContain("No body images");
  });

  it("keeps drafts private and requires admin access to numeric-ID routes", () => {
    const route = readFileSync(new URL("./blogRouter.ts", import.meta.url), "utf8");
    expect(route).toContain("getPreviewById: adminBlogProcedure");
    expect(route).toContain("getById: adminBlogProcedure");
    expect(route).toContain('if (!post || post.status !== "published") return null;');
    expect(route).toContain('return await listBlogPosts({ ...(input || {}), status: "published", publishedOnly: true });');
    expect(route).toContain("adminList: adminBlogProcedure");
    expect(editor).toContain('href={previewReady && editId ? blogDraftPreviewPath(editId) : undefined}');
  });

  it("opens a separate public View Live link only from the persisted published article", () => {
    expect(editor).toContain("const liveArticlePath = blogLiveArticlePath(existingPost ? { status, slug: existingPost.slug } : null)");
    expect(editor).toContain('if (editId) void trpcUtils.blog.getById.invalidate({ id: editId })');
    expect(editor).toContain("{liveArticlePath && (");
    expect(editor).toContain("href={liveArticlePath}");
    expect(editor).toContain("View Live");
    expect(editor).toContain('rel="noopener noreferrer"');
    expect(editor).not.toContain("https://dentasmart.ai/oral-health-hub/");
  });

  it("offers saved preview to blog drafts directly from Blog Management", () => {
    const admin = readFileSync(new URL("../client/src/pages/AdminDashboard.tsx", import.meta.url), "utf8");
    expect(admin).toContain("blogDraftPreviewPath(post.id)");
    expect(admin).toContain('title={post.status === "draft" ? "Preview Draft" : "Preview Saved"}');
    expect(admin).toContain("FileSearch");
    expect(admin).toContain("View live");
    expect(admin).toContain('rel="noopener noreferrer"');
  });
  it("shows read-only revision history and authenticated historic snapshots", () => {
    const history = readFileSync(new URL("../client/src/components/blog/BlogRevisionHistory.tsx", import.meta.url), "utf8");
    const preview = readFileSync(new URL("../client/src/pages/AdminBlogDraftPreview.tsx", import.meta.url), "utf8");
    const routes = readFileSync(new URL("../client/src/components/AdminRouter.tsx", import.meta.url), "utf8");
    expect(editor).toContain("<BlogRevisionHistory articleId={editId} />");
    expect(editor).toContain("Revision History");
    expect(history).toContain("trpc.blog.listRevisions.useQuery");
    expect(history).toContain("View Revision");
    expect(preview).toContain("trpc.blog.getRevision.useQuery");
    expect(preview).toContain("Historical snapshot only");
    expect(routes).toContain('blogRevisionPreview: prefix + "/blog-revision-preview/:id/:revision"');
  });

  it("shows a short card preview but retains the full editor selection", () => {
    const sharedPanel = readFileSync(new URL("../client/src/components/cms/CmsSeoPanels.tsx", import.meta.url), "utf8");
    const evidenceSource = readFileSync(new URL("../shared/cmsReadabilityEvidence.ts", import.meta.url), "utf8");
    expect(sharedPanel).toContain("Preview shortened; Find in article selects the complete passage.");
    expect(evidenceSource).toContain("excerpt: paragraph, words");
    expect(evidenceSource).toContain("excerpt: sentence, words: terms");
  });

  it("opts into the same body-only readability rules in both Blog SEO and Readability tabs", () => {
    expect(audit).toContain("matchReadabilityPanel: true");
    const seoAnalyzer = readFileSync(new URL("../shared/cmsSeoAnalysis.ts", import.meta.url), "utf8");
    const readingAnalyzer = readFileSync(new URL("../shared/cmsReadingInsights.ts", import.meta.url), "utf8");
    expect(seoAnalyzer).toContain("passesCmsLongSentenceRate(longSentencePercent)");
    expect(seoAnalyzer).toContain("passesCmsSectionStructure(readingWordCount, structure.contentHeadings, structure.emptyHeadings)");
    expect(readingAnalyzer).toContain("extractCmsReadabilityContent(document)");
  });

  it("marks all StoryBrand readability edits as unsaved changes", () => {
    for (const field of ["ProblemHeading","ProblemContent","EmpathyHeading","EmpathyContent",
      "SolutionHeading","SolutionContent","ChangeHeading","ChangeContent",
      "ResultHeading","ResultContent"]) {
      expect(editor).toContain(`set${field}(value); setIsDirty(true);`);
    }
  });

  it("previews automatic or manually edited schema without enabling unrelated indexing directives", () => {
    expect(panels).toContain("Edit schema manually");
    expect(panels).toContain("Restore automatic schema");
    expect(panels).toContain("Only published pages expose public schema.");
    expect(panels).toContain("BlogPosting");
    expect(panels).toContain("currently shares the existing Open Graph");
    expect(panels).toContain("do not change live website indexing");
    expect(editor).not.toContain('robotsNoindex:');
    expect(editor).not.toContain('schemaPageType:');
  });
});
