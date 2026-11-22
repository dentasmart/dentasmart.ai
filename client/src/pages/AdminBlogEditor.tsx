import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useLocation, useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  ExternalLink,
  Loader2,
  ChevronDown,
  ChevronUp,
  Globe,
  History,
  FileText,
  Search as SearchIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Clock,
  AlertCircle,
  X,
} from "lucide-react";
import BlogEditor from "@/components/BlogEditor";
import BlogRevisionHistory from "@/components/blog/BlogRevisionHistory";
import { appendBlogTags, removeBlogTag } from "@shared/blogTags";
import BlogAdvancedSeoAudit from "@/components/blog/BlogAdvancedSeoAudit";
import BlogSeoFeaturePanel from "@/components/blog/BlogSeoFeaturePanel";
import type { BlogSeoDraft } from "@shared/blogSeoAdapter";
import { shouldHydrateBlogEditor } from "@shared/blogEditorHydration";
import { getBlogSaveIntent } from "@shared/blogSavePolicy";
import { blogDraftPreviewPath, blogLiveArticlePath, canPreviewSavedBlog } from "@shared/blogPreviewPolicy";
import { getBlogReadabilityTarget } from "@shared/blogReadabilityNavigation";
import { findCmsReviewTextSpan } from "@shared/cmsReviewHighlight";
import { reviewerValueForSave } from "@shared/blogReviewerSaveValue";
import { isManualBlogSchema } from "@shared/blogSchemaOverride";
import { blogSeoWorkspaceTabKey, parseBlogSeoWorkspaceTab, type BlogSeoWorkspaceTab } from "@shared/blogSeoWorkspaceTab";
import type { CmsReadingExcerpt } from "@shared/cmsReadabilityEvidence";

export default function AdminBlogEditor() {
  const [, setLocation] = useLocation();
  const [matchNew] = useRoute("/admin/new");
  const [matchEdit, editParams] = useRoute("/admin/edit/:id");
  const isNew = !!matchNew;
  const editId = editParams?.id ? parseInt(editParams.id) : null;

  // Auth check. Disable refetch on window focus to prevent unexpected redirects (Bug 3)
  const { data: admin, isLoading: authLoading, isFetching: authChecking, refetch: retryAdminCheck } = trpc.blog.adminMe.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: "always", // Reverify when opening an editor after signing in.
    retry: false,
    staleTime: Infinity, // Stable while editing; server still checks permission on writes.
  });

  // Hydrate server fields once for each article ID, never on refetch.
  const hydratedArticleId = useRef<number | null>(null);
  const previousArticleId = useRef<number | null>(editId);
  if (previousArticleId.current !== editId) {
    previousArticleId.current = editId;
    hydratedArticleId.current = null;
  }
  // Track whether user has unsaved changes (Bug 3 fix)
  const [isDirty, setIsDirty] = useState(false);

  // Load existing post if editing. Disable refetch on window focus to prevent overwriting edits (Bug 1)
  const { data: existingPost, isLoading: postLoading } = trpc.blog.getById.useQuery(
    { id: editId! },
    {
      enabled: !!editId,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: Infinity, // Never auto-refetch. User controls when to reload
    }
  );

  // Category state (declared before useMemo that depends on them)
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [subcategoryId, setSubcategoryId] = useState<number | null>(null);

  // Tags are saved separately in the isolated test DB; existing categories
  // and SEO keywords remain unchanged.
  const [tagText, setTagText] = useState("");
  const [tagsChanged, setTagsChanged] = useState(false);
  const trpcUtils = trpc.useUtils();
  const tagsQuery = trpc.blog.getEditorialTags.useQuery(
    { id: editId ?? 0 },
    { enabled: !!editId, retry: false, refetchOnWindowFocus: false }
  );
  const saveTagsMutation = trpc.blog.saveEditorialTags.useMutation();
  // The query cache is the single source of truth for saved chips.
  // Updating it after a mutation renders new tags immediately, without refresh.
  const savedTags = tagsQuery.data?.tags ?? [];

  useEffect(() => {
    // A new article has its own tag list; never carry over unsaved input.
    setTagText("");
    setTagsChanged(false);
  }, [editId]);

  // Load categories from database
  const { data: allCategories } = trpc.blog.listCategories.useQuery();
  const parentCategories = useMemo(() => allCategories?.filter((c) => !c.parentId) || [], [allCategories]);
  const subcategories = useMemo(() => {
    if (!categoryId || !allCategories) return [];
    return allCategories.filter((c) => c.parentId === categoryId);
  }, [categoryId, allCategories]);

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [category, setCategory] = useState<"Dentist Problems" | "Dental Problems" | "Insurance Problems" | "Symptoms" | "Gums" | "Cavities" | "X-Rays" | "Costs">("Dental Problems");
  const [readTime, setReadTime] = useState("3 min read");
  const [status, setStatus] = useState<"draft" | "published" | "unpublished">("draft");
  const [reviewedByName, setReviewedByName] = useState("");
  const [reviewedByCredentials, setReviewedByCredentials] = useState("");
  const [reviewerShortBio, setReviewerShortBio] = useState("");
  const [reviewerProfileUrl, setReviewerProfileUrl] = useState("");
  const [lastReviewed, setLastReviewed] = useState("");
  const [reviewerJsonLd, setReviewerJsonLd] = useState("");
  const originalLegacySupplemental = useRef("");

  // Structured content (StoryBrand sections)
  const [problemHeading, setProblemHeading] = useState("");
  const [problemContent, setProblemContent] = useState("");
  const [empathyHeading, setEmpathyHeading] = useState("");
  const [empathyContent, setEmpathyContent] = useState("");
  const [solutionHeading, setSolutionHeading] = useState("");
  const [solutionContent, setSolutionContent] = useState("");
  const [changeHeading, setChangeHeading] = useState("");
  const [changeContent, setChangeContent] = useState("");
  const [resultHeading, setResultHeading] = useState("");
  const [resultContent, setResultContent] = useState("");

  // Rich content
  const [bodyHtml, setBodyHtml] = useState("");

  // SEO fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [primaryKeyword, setPrimaryKeyword] = useState("");
  const [secondaryKeywords, setSecondaryKeywords] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");

  // UI state
  const [seoOpen, setSeoOpen] = useState(!!editId);
  const [showBlogHistory, setShowBlogHistory] = useState(false);
  const [activeTab, setActiveTab] = useState("structured");
  // Session-only navigation state, scoped to this article: never persist
  // actual draft fields, credentials, or reviewer information in web storage.
  const [seoWorkspaceTab, setSeoWorkspaceTab] = useState<BlogSeoWorkspaceTab>("seo");
  const pendingSeoTabRestore = useRef<{ key: string; tab: BlogSeoWorkspaceTab } | null>(null);
  const pendingSeoTabFrame = useRef<number>(0);
  useEffect(() => {
    const key = blogSeoWorkspaceTabKey(editId);
    let stored: string | null = null;
    try { stored = window.sessionStorage.getItem(key); } catch { /* Storage may be blocked. */ }
    const savedTab = parseBlogSeoWorkspaceTab(stored);
    setSeoWorkspaceTab(savedTab);
    pendingSeoTabRestore.current = stored && savedTab === stored ? { key, tab: savedTab } : null;
  }, [editId]);
  const readabilityLocateId = useRef(0);
  const [readabilitySelection, setReadabilitySelection] = useState<{ excerpt: string; requestId: number }>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Populate only once per matching record. Refetches cannot reset local edits.
  useEffect(() => {
    if (existingPost && shouldHydrateBlogEditor(editId, existingPost.id, hydratedArticleId.current)) {
      hydratedArticleId.current = editId;
      setTitle(existingPost.title || "");
      setSlug(existingPost.slug || "");
      setSlugManuallyEdited(true);
      setCategory(existingPost.category);
      setReadTime(existingPost.readTime || "3 min read");
      setStatus(existingPost.status);
      setReviewedByName(existingPost.reviewedByName || "");
      setReviewedByCredentials(existingPost.reviewedByCredentials || "");
      setReviewerShortBio(existingPost.reviewerShortBio || "");
      setReviewerProfileUrl(existingPost.reviewerProfileUrl || "");
      setLastReviewed(existingPost.lastReviewed || "");
      setReviewerJsonLd(existingPost.reviewerJsonLd || "");
      originalLegacySupplemental.current = existingPost.reviewerJsonLd && !isManualBlogSchema(existingPost.reviewerJsonLd) ? existingPost.reviewerJsonLd : "";
      setProblemHeading(existingPost.problemHeading || "");
      setProblemContent(existingPost.problemContent || "");
      setEmpathyHeading(existingPost.empathyHeading || "");
      setEmpathyContent(existingPost.empathyContent || "");
      setSolutionHeading(existingPost.solutionHeading || "");
      setSolutionContent(existingPost.solutionContent || "");
      setChangeHeading(existingPost.changeHeading || "");
      setChangeContent(existingPost.changeContent || "");
      setResultHeading(existingPost.resultHeading || "");
      setResultContent(existingPost.resultContent || "");
      // If bodyHtml exists, use it; otherwise auto-generate from StoryBrand sections
      if (existingPost.bodyHtml && existingPost.bodyHtml.trim()) {
        setBodyHtml(existingPost.bodyHtml);
      } else {
        // Convert StoryBrand structured content to HTML for the Rich Text Editor
        const sections: string[] = [];
        if (existingPost.problemHeading || existingPost.problemContent) {
          sections.push(`<h2>${existingPost.problemHeading || "The Problem"}</h2>`);
          if (existingPost.problemContent) sections.push(`<p>${existingPost.problemContent}</p>`);
        }
        if (existingPost.empathyHeading || existingPost.empathyContent) {
          sections.push(`<h3>${existingPost.empathyHeading || "Why This Feels Frustrating"}</h3>`);
          if (existingPost.empathyContent) sections.push(`<blockquote><p>${existingPost.empathyContent}</p></blockquote>`);
        }
        if (existingPost.solutionHeading || existingPost.solutionContent) {
          sections.push(`<h2>${existingPost.solutionHeading || "The Simple Truth"}</h2>`);
          if (existingPost.solutionContent) sections.push(`<p>${existingPost.solutionContent}</p>`);
        }
        if (existingPost.changeHeading || existingPost.changeContent) {
          sections.push(`<h3>${existingPost.changeHeading || "What Should Happen Instead"}</h3>`);
          if (existingPost.changeContent) sections.push(`<p>${existingPost.changeContent}</p>`);
        }
        if (existingPost.resultHeading || existingPost.resultContent) {
          sections.push(`<h2>${existingPost.resultHeading || "How DentaSmart Helps"}</h2>`);
          if (existingPost.resultContent) sections.push(`<p>${existingPost.resultContent}</p>`);
        }
        setBodyHtml(sections.join("\n"));
      }
      setMetaTitle(existingPost.metaTitle || "");
      setMetaDescription(existingPost.metaDescription || "");
      setMetaKeywords(existingPost.metaKeywords || "");
      setPrimaryKeyword(existingPost.primaryKeyword || "");
      setSecondaryKeywords(existingPost.secondaryKeywords || "");
      setOgTitle(existingPost.ogTitle || "");
      setOgDescription(existingPost.ogDescription || "");
      setOgImage(existingPost.ogImage || "");
      setCanonicalUrl(existingPost.canonicalUrl || "");
      setFeaturedImage(existingPost.featuredImage || "");
      setCategoryId(existingPost.categoryId || null);
      setSubcategoryId(existingPost.subcategoryId || null);

      // Always default to Rich Text Editor tab for reviewing content
      setActiveTab("wysiwyg");
      // Server hydration is not an editorial change.
      setIsDirty(false);
    }
  }, [existingPost, editId]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManuallyEdited && title) {
      const generated = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .substring(0, 200);
      setSlug(generated);
    }
  }, [title, slugManuallyEdited]);

  // Parse tRPC/Zod errors into human-readable messages
  const parseErrorMessage = (err: any): string => {
    // Handle Zod validation errors (array of issues)
    if (err?.message) {
      try {
        const parsed = JSON.parse(err.message);
        if (Array.isArray(parsed)) {
          return parsed
            .map((issue: any) => {
              const field = issue.path?.join(" > ") || "Field";
              const friendlyField = field.charAt(0).toUpperCase() + field.slice(1);
              return `${friendlyField}: ${issue.message || "is invalid"}`;
            })
            .join(". ");
        }
      } catch {
        // Not JSON, use as-is
      }
      // Clean up common tRPC error prefixes
      const msg = err.message.replace(/^TRPCClientError:\s*/i, "");
      return msg || "Something went wrong. Please try again.";
    }
    return "Something went wrong. Please try again.";
  };

  // Helper to show messages at top of page
  const showError = (msg: string) => {
    setErrorMessage(msg);
    setSuccessMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setErrorMessage(null);
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const handleSaveTags = async () => {
    if (!editId || !tagText.trim() || !tagsQuery.data || saveTagsMutation.isPending) return;
    try {
      // Append rather than overwrite existing chips, ignoring duplicate names.
      const tags = appendBlogTags(savedTags, tagText);
      const saved = await saveTagsMutation.mutateAsync({ id: editId, tags });
      trpcUtils.blog.getEditorialTags.setData({ id: editId }, { tags: saved.tags });
      setTagText("");
      setTagsChanged(false);
      showSuccess("Blog tags saved successfully.");
    } catch (error) {
      showError("Tags were not saved: " +
        (error instanceof Error ? error.message : "Please check the test database."));
    }
  };

  const handleRemoveTag = async (tag: string) => {
    if (!editId || !tagsQuery.data || saveTagsMutation.isPending) return;
    const previousTags = savedTags;
    const remainingTags = removeBlogTag(previousTags, tag);
    // Remove the chip instantly, then persist. Restore it if the request fails.
    trpcUtils.blog.getEditorialTags.setData({ id: editId }, { tags: remainingTags });
    try {
      const saved = await saveTagsMutation.mutateAsync({ id: editId, tags: remainingTags });
      trpcUtils.blog.getEditorialTags.setData({ id: editId }, { tags: saved.tags });
    } catch (error) {
      trpcUtils.blog.getEditorialTags.setData({ id: editId }, { tags: previousTags });
      showError("Unable to remove tag: " +
        (error instanceof Error ? error.message : "Please try again."));
    }
  };

  // Mutations
  const createMutation = trpc.blog.create.useMutation({
    onSuccess: (data) => {
      setIsDirty(false);
      showSuccess("Article created successfully! You can now add tags in Article Settings.");
      setLocation(`/admin/edit/${data.id}`);
    },
    onError: (err) => {
      const msg = parseErrorMessage(err);
      showError(msg);
    },
  });

  const updateMutation = trpc.blog.update.useMutation({
    onSuccess: () => {
      setIsDirty(false);
      // Keep the saved server snapshot fresh for the next time this article is opened.
      // One-time form hydration makes background invalidation safe for local edits.
      if (editId) void trpcUtils.blog.getById.invalidate({ id: editId });
      showSuccess("Article saved successfully!");
    },
    onError: (err) => {
      const msg = parseErrorMessage(err);
      showError(msg);
    },
  });

  const publishMutation = trpc.blog.publish.useMutation({
    onSuccess: () => {
      setStatus("published");
      if (editId) void trpcUtils.blog.getById.invalidate({ id: editId });
      showSuccess("Article published! It is now live on the website.");
    },
    onError: (err) => {
      const msg = parseErrorMessage(err);
      showError(msg);
    },
  });

  const unpublishMutation = trpc.blog.unpublish.useMutation({
    onSuccess: () => {
      setStatus("unpublished");
      if (editId) void trpcUtils.blog.getById.invalidate({ id: editId });
      showSuccess("Article unpublished. It is no longer visible on the website.");
    },
    onError: (err) => {
      const msg = parseErrorMessage(err);
      showError(msg);
    },
  });

  // Track initial auth check completion (Bug 3 fix)
  const authCheckedOnce = useRef(false);

  // Redirect if not authenticated. Only on initial check, not on transient refetch failures
  useEffect(() => {
    if (!authLoading && !authChecking) {
      if (!admin && !authCheckedOnce.current) {
        // First auth check failed. User is not logged in
        setLocation("/admin/login");
      }
      if (admin) authCheckedOnce.current = true;
    }
  }, [admin, authLoading, authChecking, setLocation]);

  // Once admin authentication and the saved article have finished loading,
  // return to the workspace section the editor was using before refresh.
  // Delaying the viewport movement until the tab's content is mounted avoids
  // scrolling to the old SEO panel during asynchronous hydration.
  useEffect(() => {
    if (!admin || authLoading || postLoading || (editId && !existingPost)) return;
    const pending = pendingSeoTabRestore.current;
    if (!pending || pending.key !== blogSeoWorkspaceTabKey(editId) || pending.tab !== seoWorkspaceTab) return;
    const firstFrame = window.requestAnimationFrame(() => {
      const secondFrame = window.requestAnimationFrame(() => {
        const tabs = document.getElementById("blog-seo-workspace-tabs");
        if (!tabs) return;
        tabs.scrollIntoView({ behavior: "auto", block: "start" });
        pendingSeoTabRestore.current = null;
      });
      pendingSeoTabFrame.current = secondFrame;
    });
    pendingSeoTabFrame.current = firstFrame;
    return () => window.cancelAnimationFrame(pendingSeoTabFrame.current);
  }, [admin, authLoading, postLoading, existingPost, editId, seoWorkspaceTab]);

  // Bug 3 fix: Warn user about unsaved changes before leaving/refreshing
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty || tagsChanged) {
        e.preventDefault();
        // Modern browsers show a generic message regardless of returnValue
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, tagsChanged]);

  if (authLoading || (authChecking && (!authCheckedOnce.current || !admin)) || (editId && postLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!admin) {
    // Never silently render a blank editor when a previously verified admin
    // session fails revalidation. Keep draft state mounted; do not expose or
    // save private content until authentication succeeds again.
    if (!authCheckedOnce.current) return null;
    return <div className="min-h-screen bg-stone-50 px-6 py-20">
      <section className="mx-auto max-w-xl space-y-3 rounded-xl border border-amber-200 bg-white p-6">
        <h1 className="text-lg font-semibold text-stone-900">Admin session needs verification</h1>
        <p className="text-sm text-stone-700">
          Your editor data has not been cleared. Sign in again in another tab if needed,
          then retry the session check here. Do not close or reload this tab while you have unsaved changes.
        </p>
        <Button type="button" onClick={() => { void retryAdminCheck(); }}>Retry session check</Button>
        <a className="ml-3 text-sm text-teal-700 underline" href="/admin/login" target="_blank" rel="noopener noreferrer">Sign in in a new tab</a>
      </section>
    </div>;
  }

  const seoDraft: BlogSeoDraft = {
    title, slug, bodyHtml,
    editorMode: activeTab === "structured" ? "structured" : "wysiwyg",
    storySections: [
      { heading: problemHeading, content: problemContent },
      { heading: empathyHeading, content: empathyContent },
      { heading: solutionHeading, content: solutionContent },
      { heading: changeHeading, content: changeContent },
      { heading: resultHeading, content: resultContent },
    ],
    primaryKeyword, secondaryKeywords, metaTitle, metaDescription,
    canonicalUrl, ogTitle, ogDescription, ogImage, featuredImage,
    reviewedByName, reviewedByCredentials, reviewerShortBio, reviewerProfileUrl,
    lastReviewed, reviewerJsonLd, publishedAt: existingPost?.publishedAt,
    updatedAt: existingPost?.updatedAt, status,
  };
  const handleLocateReadability = (example: CmsReadingExcerpt) => {
    const target = getBlogReadabilityTarget(seoDraft.editorMode, example.blockId);
    if (!target) return;
    const section = document.getElementById(target.elementId);
    if (target.mode === "wysiwyg") {
      // The rich-text editor owns sentence-level scrolling after TipTap selects
      // the exact words. Scrolling the whole editor here loses the location
      // of a sentence deep in the article.
      // TipTap locates/selects the exact text without changing the saved HTML.
      readabilityLocateId.current += 1;
      setReadabilitySelection({ excerpt: example.excerpt, requestId: readabilityLocateId.current });
      section?.querySelector<HTMLElement>('[contenteditable="true"]')?.focus({ preventScroll: true });
      return;
    }
    // StoryBrand: focus and center the specific editable field, not the whole
    // section. Selecting the text also scrolls within longer textareas.
    const textarea = section?.querySelector<HTMLTextAreaElement>("textarea");
    if (example.words === 0) {
      const heading = section?.querySelector<HTMLInputElement>("input");
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (textarea) {
      textarea.focus({ preventScroll: true });
      const span = findCmsReviewTextSpan(textarea.value, example.excerpt);
      if (span) textarea.setSelectionRange(span.from, span.to);
      textarea.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  const updateSocialOrMedia = (field: "ogTitle" | "ogDescription" | "ogImage" | "featuredImage", value: string) => {
    switch (field) {
      case "ogTitle": setOgTitle(value); break;
      case "ogDescription": setOgDescription(value); break;
      case "ogImage": setOgImage(value); break;
      case "featuredImage": setFeaturedImage(value); break;
    }
    setIsDirty(true);
  };

  const formData = {
    title,
    slug,
    category,
    categoryId,
    subcategoryId,
    readTime,
    problemHeading: problemHeading || undefined,
    problemContent: problemContent || undefined,
    empathyHeading: empathyHeading || undefined,
    empathyContent: empathyContent || undefined,
    solutionHeading: solutionHeading || undefined,
    solutionContent: solutionContent || undefined,
    changeHeading: changeHeading || undefined,
    changeContent: changeContent || undefined,
    resultHeading: resultHeading || undefined,
    resultContent: resultContent || undefined,
    bodyHtml: bodyHtml || undefined,
    metaTitle: metaTitle || undefined,
    metaDescription: metaDescription || undefined,
    metaKeywords: metaKeywords || undefined,
    // Existing blog_posts SEO columns; send empty values to explicitly clear.
    primaryKeyword: primaryKeyword.trim(),
    secondaryKeywords: secondaryKeywords.trim(),
    ogTitle: ogTitle || undefined,
    ogDescription: ogDescription || undefined,
    ogImage: ogImage || undefined,
    canonicalUrl: canonicalUrl || undefined,
    featuredImage: featuredImage || undefined,
    // Explicit null is required to clear a saved value. Undefined tells
    // Drizzle to leave the existing database field untouched.
    reviewedByName: reviewerValueForSave(reviewedByName),
    reviewedByCredentials: reviewerValueForSave(reviewedByCredentials),
    reviewerShortBio: reviewerValueForSave(reviewerShortBio),
    reviewerProfileUrl: reviewerValueForSave(reviewerProfileUrl),
    lastReviewed: reviewerValueForSave(lastReviewed),
    reviewerJsonLd: reviewerValueForSave(reviewerJsonLd),
    status,
  };

  const handleSave = () => {
    if (!title.trim()) {
      showError("Please enter a title for your article before saving.");
      return;
    }
    setErrorMessage(null);
    if (isNew) {
      createMutation.mutate(formData);
    } else if (editId) {
      updateMutation.mutate({ id: editId, ...formData });
    }
  };

  const saveIntent = getBlogSaveIntent(status, isNew);
  const handleSaveAsDraft = () => {
    if (!title.trim()) {
      showError("Please enter a title for your article before saving.");
      return;
    }
    // This changes the content visible on the live article; never mislabel as a draft save.
    if (saveIntent.changesLivePage &&
        !window.confirm("Save Changes will update this currently published article on the live website. Its publication status will remain Published. Continue?")) {
      return;
    }
    setErrorMessage(null);
    if (isNew) {
      createMutation.mutate({ ...formData, status: "draft" });
    } else if (editId) {
      // Intentionally omit status for published or unpublished articles.
      // A generic content save must not change public visibility.
      updateMutation.mutate({
        id: editId, ...formData,
        status: saveIntent.submittedStatus,
      });
    }
  };

  const handlePublish = () => {
    if (!title.trim()) {
      showError("Please enter a title for your article before publishing.");
      return;
    }
    setErrorMessage(null);
    if (isNew) {
      createMutation.mutate({ ...formData, status: "published" });
    } else if (editId) {
      publishMutation.mutate({ id: editId });
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const previewReady = canPreviewSavedBlog({ articleId: editId, isDirty, tagsChanged, isSaving });
  // Always use the last persisted published slug, never a locally edited/unsaved slug.
  const liveArticlePath = blogLiveArticlePath(existingPost ? { status, slug: existingPost.slug } : null);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (isDirty || tagsChanged) {
                    if (window.confirm("You have unsaved changes. Are you sure you want to leave?")) {
                      setIsDirty(false);
                      setLocation("/admin");
                    }
                  } else {
                    setLocation("/admin");
                  }
                }}
                className="text-stone-500 hover:text-stone-700 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <span className="text-stone-300">|</span>
              <span className="text-sm font-medium text-stone-700">
                {isNew ? "New Article" : "Edit Article"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* Save Draft for drafts; Save Changes for existing published/unpublished articles. */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveAsDraft}
                disabled={isSaving || publishMutation.isPending || unpublishMutation.isPending}
                className="cursor-pointer"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-1" />
                )}
                {saveIntent.label}
              </Button>
              {/* Preview is read-only and always opens the saved database version. */}
              <a
                href={previewReady && editId ? blogDraftPreviewPath(editId) : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!previewReady}
                title={!editId
                  ? "Save Draft first to create a preview."
                  : !previewReady
                    ? "Save your changes before previewing."
                    : "View the saved article in a separate private tab; this does not publish."}
                onClick={(event) => { if (!previewReady) event.preventDefault(); }}
                className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-md border px-3 text-sm font-semibold ${previewReady
                  ? "border-teal-400 bg-teal-50 text-teal-800 hover:bg-teal-100"
                  : "pointer-events-none cursor-not-allowed border-stone-200 bg-stone-50 text-stone-400"}`}
              >
                <Eye className="h-4 w-4"/>
                {status === "published" ? "Preview Saved" : "Preview Draft"}
                <ExternalLink className="h-3.5 w-3.5"/>
              </a>
              {editId && (
                <Button variant="outline" size="sm" type="button"
                  onClick={() => setShowBlogHistory(value => !value)}
                  aria-expanded={showBlogHistory}
                  className="cursor-pointer">
                  <History className="mr-1 h-4 w-4" /> Revision History
                </Button>
              )}
              {/* Public article link: displayed only for an already published DB record.
                  Opens this testing site's public renderer; unsaved edits are excluded. */}
              {liveArticlePath && (
                <a
                  href={liveArticlePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View the currently published article on this website. Unsaved edits are not included."
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-stone-300 bg-white px-3 text-sm font-semibold text-stone-800 hover:bg-stone-50"
                >
                  <Globe className="h-4 w-4" />
                  View Live
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              {/* Publish / Unpublish toggle */}
              {status === "published" ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => editId && unpublishMutation.mutate({ id: editId })}
                  disabled={unpublishMutation.isPending || isNew}
                  className="text-amber-600 border-amber-200 hover:bg-amber-50 cursor-pointer"
                >
                  <EyeOff className="w-4 h-4 mr-1" />
                  Unpublish
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={handlePublish}
                  disabled={publishMutation.isPending || isSaving}
                  className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Publish
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {showBlogHistory && editId && <BlogRevisionHistory articleId={editId} />}

      {/* Error / Success Banner */}
      {errorMessage && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-400 hover:text-red-600 cursor-pointer"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      {successMessage && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
            <Eye className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">{successMessage}</p>
            </div>
            <button
              onClick={() => setSuccessMessage(null)}
              className="text-green-400 hover:text-green-600 cursor-pointer"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-xl border border-stone-200 p-6">
              <Label className="text-sm font-semibold text-stone-700 mb-2 block">Article Title</Label>
              <Input
                value={title}
                onChange={(e) => { setTitle(e.target.value); setIsDirty(true); }}
                placeholder="Enter a compelling title..."
                className="text-lg font-medium border-stone-200 bg-stone-50 focus:bg-white py-5"
              />
            </div>

            {/* Content Tabs */}
            <div className="bg-white rounded-xl border border-stone-200 p-6">
              <Tabs value={activeTab} onValueChange={(newTab) => {
                // Bug 2 fix: When switching to WYSIWYG, auto-generate bodyHtml from StoryBrand sections
                // if the user has been editing in StoryBrand mode
                if (newTab === "wysiwyg" && activeTab === "structured") {
                  const sections: string[] = [];
                  if (problemHeading || problemContent) {
                    sections.push(`<h2>${problemHeading || "The Problem"}</h2>`);
                    if (problemContent) sections.push(`<p>${problemContent}</p>`);
                  }
                  if (empathyHeading || empathyContent) {
                    sections.push(`<h3>${empathyHeading || "Why This Feels Frustrating"}</h3>`);
                    if (empathyContent) sections.push(`<blockquote><p>${empathyContent}</p></blockquote>`);
                  }
                  if (solutionHeading || solutionContent) {
                    sections.push(`<h2>${solutionHeading || "The Simple Truth"}</h2>`);
                    if (solutionContent) sections.push(`<p>${solutionContent}</p>`);
                  }
                  if (changeHeading || changeContent) {
                    sections.push(`<h3>${changeHeading || "What Should Happen Instead"}</h3>`);
                    if (changeContent) sections.push(`<p>${changeContent}</p>`);
                  }
                  if (resultHeading || resultContent) {
                    sections.push(`<h2>${resultHeading || "How DentaSmart Helps"}</h2>`);
                    if (resultContent) sections.push(`<p>${resultContent}</p>`);
                  }
                  const generatedHtml = sections.join("\n");
                  // Only update if StoryBrand sections have content
                  if (generatedHtml.trim()) {
                    setBodyHtml(generatedHtml);
                  }
                }
                setActiveTab(newTab);
              }}>
                <TabsList className="mb-4">
                  <TabsTrigger value="structured" className="cursor-pointer">StoryBrand Sections</TabsTrigger>
                  <TabsTrigger value="wysiwyg" className="cursor-pointer">Rich Text Editor</TabsTrigger>
                </TabsList>

                <TabsContent value="structured" className="space-y-6">
                  <p className="text-sm text-stone-500 mb-4">
                    Use the StoryBrand format with structured sections for consistent article layout.
                  </p>

                  <SectionEditor
                    sectionId="blog-story-section-0"
                    label="The Problem"
                    headingValue={problemHeading}
                    onHeadingChange={(value) => { setProblemHeading(value); setIsDirty(true); }}
                    contentValue={problemContent}
                    onContentChange={(value) => { setProblemContent(value); setIsDirty(true); }}
                    headingPlaceholder="e.g., The Problem: You're Told What, But Not Why"
                    contentPlaceholder="Describe the problem the reader faces..."
                    color="red"
                  />
                  <SectionEditor
                    sectionId="blog-story-section-1"
                    label="Empathy"
                    headingValue={empathyHeading}
                    onHeadingChange={(value) => { setEmpathyHeading(value); setIsDirty(true); }}
                    contentValue={empathyContent}
                    onContentChange={(value) => { setEmpathyContent(value); setIsDirty(true); }}
                    headingPlaceholder="e.g., Why This Feels Frustrating"
                    contentPlaceholder="Show understanding of the reader's feelings..."
                    color="amber"
                  />
                  <SectionEditor
                    sectionId="blog-story-section-2"
                    label="The Truth"
                    headingValue={solutionHeading}
                    onHeadingChange={(value) => { setSolutionHeading(value); setIsDirty(true); }}
                    contentValue={solutionContent}
                    onContentChange={(value) => { setSolutionContent(value); setIsDirty(true); }}
                    headingPlaceholder="e.g., The Simple Truth: X-Rays Are for Dentists"
                    contentPlaceholder="Explain the underlying truth or insight..."
                    color="blue"
                  />
                  <SectionEditor
                    sectionId="blog-story-section-3"
                    label="What Should Change"
                    headingValue={changeHeading}
                    onHeadingChange={(value) => { setChangeHeading(value); setIsDirty(true); }}
                    contentValue={changeContent}
                    onContentChange={(value) => { setChangeContent(value); setIsDirty(true); }}
                    headingPlaceholder="e.g., What Should Happen Instead"
                    contentPlaceholder="Describe the ideal outcome..."
                    color="green"
                  />
                  <SectionEditor
                    sectionId="blog-story-section-4"
                    label="How DentaSmart Helps"
                    headingValue={resultHeading}
                    onHeadingChange={(value) => { setResultHeading(value); setIsDirty(true); }}
                    contentValue={resultContent}
                    onContentChange={(value) => { setResultContent(value); setIsDirty(true); }}
                    headingPlaceholder="e.g., How DentaSmart Helps"
                    contentPlaceholder="Explain how DentaSmart solves this problem..."
                    color="primary"
                  />
                </TabsContent>

                <TabsContent value="wysiwyg">
                  <div id="blog-wysiwyg-content" className="scroll-mt-24">
                  <p className="text-sm text-stone-500 mb-4">
                    Use the rich text editor for free-form content with formatting, images, and links.
                  </p>
                  <BlogEditor
                    content={bodyHtml}
                    onChange={(html) => { setBodyHtml(html); setIsDirty(true); }}
                    placeholder="Write your article content here..."
                    reviewSelection={readabilitySelection}
                  />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Meta */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-4">
              <h3 className="font-semibold text-stone-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Article Settings
              </h3>

              <div>
                <Label className="text-xs font-medium text-stone-500 mb-1 block">Status</Label>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                  status === "published"
                    ? "bg-green-100 text-green-700"
                    : status === "draft"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-stone-100 text-stone-600"
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    status === "published"
                      ? "bg-green-500"
                      : status === "draft"
                      ? "bg-amber-500"
                      : "bg-stone-400"
                  }`} />
                  {status === "published" ? "Published" : status === "draft" ? "Draft" : "Unpublished"}
                </div>
                <p className="text-xs text-stone-400 mt-1.5">
                  {status === "draft" && "Use the buttons above to Save Draft or Publish. Publish is a manual release action, not clinical-review evidence."}
                  {status === "published" && "This article is live. Click Unpublish to take it offline."}
                  {status === "unpublished" && "This article is offline. Click Publish to make it live."}
                </p>
              </div>

              <div>
                <Label className="text-xs font-medium text-stone-500 mb-1 block">Category</Label>
                <Select
                  value={categoryId ? String(categoryId) : "none"}
                  onValueChange={(v) => {
                    const newCatId = v === "none" ? null : Number(v);
                    setCategoryId(newCatId);
                    setSubcategoryId(null);
                    setIsDirty(true);
                  }}
                >
                  <SelectTrigger className="border-stone-200">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No category</SelectItem>
                    {parentCategories.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {categoryId && subcategories.length > 0 && (
                <div>
                  <Label className="text-xs font-medium text-stone-500 mb-1 block">Subcategory</Label>
                  <Select
                    value={subcategoryId ? String(subcategoryId) : "none"}
                    onValueChange={(v) => { setSubcategoryId(v === "none" ? null : Number(v)); setIsDirty(true); }}
                  >
                    <SelectTrigger className="border-stone-200">
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No subcategory</SelectItem>
                      {subcategories.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2 border-t border-stone-100 pt-4">
                <Label htmlFor="blog-editor-tags" className="text-xs font-medium text-stone-500 mb-1 block">Tags</Label>
                <Input
                  id="blog-editor-tags"
                  value={tagText}
                  maxLength={3500}
                  disabled={!editId || tagsQuery.isLoading || !!tagsQuery.error || saveTagsMutation.isPending}
                  onChange={event => {
                    setTagText(event.target.value);
                    setTagsChanged(Boolean(event.target.value.trim()));
                  }}
                  onKeyDown={event => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      void handleSaveTags();
                    }
                  }}
                  placeholder="Add tags, separated by commas"
                  className="border-stone-200"
                />
                {savedTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5" aria-label="Saved blog tags">
                    {savedTags.map(tag => (
                      <span key={tag} className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-800">
                        <span className="break-all">{tag}</span>
                        <button
                          type="button"
                          title={`Remove ${tag}`}
                          aria-label={`Remove tag ${tag}`}
                          disabled={saveTagsMutation.isPending}
                          onClick={() => void handleRemoveTag(tag)}
                          className="rounded-full p-0.5 hover:bg-teal-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:opacity-50"
                        >
                          <X className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-stone-500">Enter comma-separated tags and select Save Tags (or press Enter). Use × to remove a tag. Tags are separate from Categories and SEO meta keywords.</p>
                {!editId && <p className="text-xs text-amber-700">Save the article as a draft first, then add tags.</p>}
                {tagsQuery.error && <p role="alert" className="text-xs text-red-700">Tags storage is not ready: {tagsQuery.error.message}</p>}
                <Button type="button" size="sm" variant="outline"
                  disabled={!editId || !tagsChanged || !tagText.trim() || !tagsQuery.data || !!tagsQuery.error || saveTagsMutation.isPending}
                  onClick={() => void handleSaveTags()}>
                  {saveTagsMutation.isPending ? "Saving Tags…" : "Save Tags"}
                </Button>
              </div>

              <div>
                <Label className="text-xs font-medium text-stone-500 mb-1 block">Read Time</Label>
                <Input
                  value={readTime}
                  onChange={(e) => { setReadTime(e.target.value); setIsDirty(true); }}
                  placeholder="e.g., 3 min read"
                  className="border-stone-200"
                />
              </div>

            </div>

            <a href="#blog-seo-workspace" className="block rounded-xl border border-teal-200 bg-teal-50 p-4 text-sm font-semibold text-teal-800 hover:bg-teal-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500">
              Edit SEO metadata & reviewer information ↓
            </a>

            {/* Quick Tips */}
            <div className="bg-primary/5 rounded-xl border border-primary/10 p-5">
              <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                Quick Tips
              </h4>
              <ul className="text-xs text-stone-600 space-y-1.5">
                <li>Use the <strong>StoryBrand Sections</strong> tab for consistent article format</li>
                <li>Use the <strong>Rich Text Editor</strong> for free-form content</li>
                <li>Fill in SEO fields for better search engine visibility</li>
                <li>Save as <strong>Draft</strong> to continue editing later</li>
                <li>Click <strong>Publish</strong> to make the article live after manual review</li>
              </ul>
            </div>
          </div>
        </div>

        {/* One workspace, one source of truth: existing blog SEO, URL and reviewer columns. */}
        <section id="blog-seo-workspace" className="mt-8 scroll-mt-20 space-y-6" aria-labelledby="blog-seo-heading">
          <div className="space-y-2">
            <h2 id="blog-seo-heading" className="text-xl font-semibold text-stone-900">SEO & Editorial Review</h2>
            <p className="max-w-4xl text-sm leading-relaxed text-stone-600">
              Your existing blog SEO metadata, URL and reviewer fields live here alongside the new live analysis.
              There is only one set of fields: the audit reads your current edits, and Save Draft saves those edits through the existing article workflow.
            </p>
          </div>
          <Tabs value={seoWorkspaceTab} onValueChange={(value) => {
            const tab = parseBlogSeoWorkspaceTab(value);
            if (tab !== value) return;
            pendingSeoTabRestore.current = null;
            setSeoWorkspaceTab(tab);
            try {
              window.sessionStorage.setItem(blogSeoWorkspaceTabKey(editId), tab);
            } catch { /* Navigation still works when session storage is disabled. */ }
          }} className="space-y-5">
            <TabsList id="blog-seo-workspace-tabs" className="flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0 scroll-mt-24" aria-label="Blog SEO workspace sections">
              <TabsTrigger value="seo" className="border bg-white">SEO</TabsTrigger>
              <TabsTrigger value="readability" className="border bg-white">Readability</TabsTrigger>
              <TabsTrigger value="social" className="border bg-white">Social</TabsTrigger>
              <TabsTrigger value="media" className="border bg-white">Featured Image</TabsTrigger>
              <TabsTrigger value="schema" className="border bg-white">Schema</TabsTrigger>
              <TabsTrigger value="reviewer" className="border bg-white">Reviewer</TabsTrigger>
              <TabsTrigger value="advanced" className="border bg-white">Advanced</TabsTrigger>
            </TabsList>
            <TabsContent value="seo" className="space-y-5">
          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
            <div className="min-w-0 space-y-4">
            {/* SEO Settings */}
            <Collapsible open={seoOpen} onOpenChange={setSeoOpen}>
              <div className="bg-white rounded-xl border border-stone-200 overflow-hidden h-full">
                <CollapsibleTrigger className="w-full p-5 flex items-center justify-between hover:bg-stone-50 transition-colors cursor-pointer">
                  <h3 className="font-semibold text-stone-800 flex items-center gap-2">
                    <SearchIcon className="w-4 h-4 text-primary" />
                    SEO metadata & keyphrases
                  </h3>
                  {seoOpen ? (
                    <ChevronUp className="w-4 h-4 text-stone-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="grid grid-cols-1 gap-4 border-t border-stone-100 px-5 pb-5 pt-4 md:grid-cols-2">
                    <div>
                      <Label className="text-xs font-medium text-stone-500 mb-1 block">Primary focus keyphrase</Label>
                      <Input value={primaryKeyword} maxLength={200}
                        onChange={(e) => { setPrimaryKeyword(e.target.value); setIsDirty(true); }}
                        placeholder="e.g. toothache remedies" className="border-stone-200" />
                      <p className="text-xs text-stone-500 mt-1">
                        {primaryKeyword.trim()
                          ? "Primary keyphrase entered. Placement checks update live."
                          : "No primary keyphrase entered. Please add one to evaluate keyword placement."}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-stone-500 mb-1 block">Secondary keyphrases</Label>
                      <Textarea value={secondaryKeywords}
                        onChange={(e) => { setSecondaryKeywords(e.target.value); setIsDirty(true); }}
                        placeholder="e.g. tooth pain, dental sensitivity"
                        className="border-stone-200 min-h-[64px]" />
                      <p className="text-xs text-stone-500 mt-1">
                        {secondaryKeywords.trim()
                          ? "Comma-separated; up to 30 unique secondary phrases analyzed."
                          : "No secondary keyphrases entered (optional)."}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-stone-500 mb-1 block">Meta Title</Label>
                      <Input
                        value={metaTitle}
                        onChange={(e) => { setMetaTitle(e.target.value); setIsDirty(true); }}
                        placeholder="Write a unique SEO title"
                        className="border-stone-200"
                      />
                      <p className="text-xs text-stone-500 mt-1">
                        {metaTitle.trim()
                          ? `${metaTitle.trim().length} characters · Recommended 30–60.`
                          : "Please enter a meta title. The article title appears only as a search preview fallback."}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-stone-500 mb-1 block">Meta Description</Label>
                      <Textarea
                        value={metaDescription}
                        onChange={(e) => { setMetaDescription(e.target.value); setIsDirty(true); }}
                        placeholder="Write a helpful search description"
                        className="border-stone-200 min-h-[80px]"
                      />
                      <p className="text-xs text-stone-500 mt-1">
                        {metaDescription.trim()
                          ? `${metaDescription.trim().length} characters · Recommended 110–160.`
                          : "Please enter a meta description."}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-stone-500 mb-1 block">Meta Keywords (legacy)</Label>
                      <Input
                        value={metaKeywords}
                        onChange={(e) => { setMetaKeywords(e.target.value); setIsDirty(true); }}
                        placeholder="keyword1, keyword2, keyword3"
                        className="border-stone-200"
                      />
                      <p className="text-xs text-stone-500 mt-1">Preserved for compatibility. This field is not included in the new SEO score.</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-stone-500 mb-1 block">Canonical URL</Label>
                      <Input
                        value={canonicalUrl}
                        onChange={(e) => { setCanonicalUrl(e.target.value); setIsDirty(true); }}
                        placeholder="https://..."
                        className="border-stone-200"
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
            </div>
            <div className="min-w-0 space-y-4">
            {/* URL / Slug */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
              <h3 className="font-semibold text-stone-800 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-primary" />
                Article URL
              </h3>
              <div>
                <Label className="text-xs font-medium text-stone-500 mb-1 block">URL Slug</Label>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-stone-400 whitespace-nowrap">/oral-health-hub/</span>
                  <Input
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      setSlugManuallyEdited(true);
                      setIsDirty(true);
                    }}
                    placeholder="article-url-slug"
                    className="border-stone-200 text-sm"
                  />
                </div>
                {!isNew && slug && (
                  <p className="text-xs text-stone-400 mt-1">
                    Live URL: /oral-health-hub/{slug}
                  </p>
                )}
              </div>
            </div>
              <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
                Changing an existing article URL requires checking redirects and internal links first. Editing the slug here does not create a redirect.
              </p>
            </div>
          </div>
          <div className="min-w-0">
            <BlogAdvancedSeoAudit draft={seoDraft} />
          </div>
            </TabsContent>
            {(["readability", "social", "media", "advanced"] as const).map(panel => (
              <TabsContent key={panel} value={panel}>
                <BlogSeoFeaturePanel panel={panel} draft={seoDraft} onChange={updateSocialOrMedia} onLocateReadability={handleLocateReadability} />
              </TabsContent>
            ))}
            <TabsContent value="schema">
              <BlogSeoFeaturePanel panel="schema" draft={seoDraft} onChange={updateSocialOrMedia}
                onSchemaChange={value => { setReviewerJsonLd(value); setIsDirty(true); }}
                onSchemaReset={() => { setReviewerJsonLd(originalLegacySupplemental.current); setIsDirty(true); }} />
            </TabsContent>
            <TabsContent value="reviewer">
              <section className="overflow-hidden rounded-xl border border-stone-200 bg-white" aria-labelledby="blog-reviewer-heading">
                <div className="border-b border-stone-100 px-5 py-4">
                  <h3 id="blog-reviewer-heading" className="text-base font-semibold text-stone-900">
                    Reviewer & attribution information <span className="ml-2 text-xs font-normal text-stone-500">(existing settings)</span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    Before publishing, check whether this article was actually clinically reviewed. Reviewer attribution is optional;
                    leave these fields empty unless the review and public details are verified. Do not invent a reviewer.
                  </p>
                </div>
            <div className="space-y-3 border-t border-stone-100 px-5 pb-5 pt-4">
              <p className="text-sm leading-relaxed text-stone-600">
                These are the article’s original reviewer details—not separate Advanced SEO fields.
                Enter only verified information. The SEO score does not establish clinical accuracy, reviewer approval or publication readiness.
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <h4 className="text-sm font-semibold text-stone-800 md:col-span-2">Existing reviewer fields</h4>
                <div>
                  <Label className="text-xs font-medium text-stone-500 mb-1 block">Reviewer name</Label>
                  <Input
                    value={reviewedByName}
                    onChange={(e) => { setReviewedByName(e.target.value); setIsDirty(true); }}
                    placeholder="Only enter verified public reviewer information"
                    className="border-stone-200"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-stone-500 mb-1 block">Reviewer credentials</Label>
                  <Input
                    value={reviewedByCredentials}
                    onChange={(e) => { setReviewedByCredentials(e.target.value); setIsDirty(true); }}
                    placeholder="Only enter credentials approved for public display"
                    className="border-stone-200"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-stone-500 mb-1 block">Reviewer short bio</Label>
                  <Textarea
                    value={reviewerShortBio}
                    onChange={(e) => { setReviewerShortBio(e.target.value); setIsDirty(true); }}
                    placeholder="Approved public bio only. Do not add unverified credentials or claims."
                    className="border-stone-200 min-h-[88px]"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-stone-500 mb-1 block">Reviewer profile URL</Label>
                  <Input
                    value={reviewerProfileUrl}
                    onChange={(e) => { setReviewerProfileUrl(e.target.value); setIsDirty(true); }}
                    placeholder="/team/#dr-saba-ahmed or /authors/dr-saba-ahmed/"
                    className="border-stone-200"
                  />
                </div>
                <div>
                  <Label className="text-xs font-medium text-stone-500 mb-1 block">Last reviewed</Label>
                  <Input
                    type="date"
                    value={lastReviewed}
                    onChange={(e) => { setLastReviewed(e.target.value); setIsDirty(true); }}
                    className="border-stone-200"
                  />
                </div>
                <p className="text-xs text-stone-500 leading-relaxed md:col-span-2">A public reviewer label needs a manually entered name and a valid first-party DentaSmart Team or author profile URL, such as /team/#dr-saba-ahmed or /authors/dr-saba-ahmed/. Last reviewed displays independently when a valid date is supplied. Credentials and short bio display only when supplied. Existing legacy reviewer fields remain stored but do not publish a label on their own. Schema is managed in the Schema tab. Publishing alone does not create a clinical-review label.</p>
              </div>
            </div>
              </section>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
}

function SectionEditor({
  sectionId,
  label,
  headingValue,
  onHeadingChange,
  contentValue,
  onContentChange,
  headingPlaceholder,
  contentPlaceholder,
  color,
}: {
  sectionId: string;
  label: string;
  headingValue: string;
  onHeadingChange: (v: string) => void;
  contentValue: string;
  onContentChange: (v: string) => void;
  headingPlaceholder: string;
  contentPlaceholder: string;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    red: "border-l-red-400 bg-red-50/30",
    amber: "border-l-amber-400 bg-amber-50/30",
    blue: "border-l-blue-400 bg-blue-50/30",
    green: "border-l-green-400 bg-green-50/30",
    primary: "border-l-primary bg-primary/5",
  };

  return (
    <div id={sectionId} className={`scroll-mt-24 border-l-4 rounded-r-lg p-4 space-y-3 ${colorClasses[color] || ""}`}>
      <Label className="text-sm font-semibold text-stone-700">{label}</Label>
      <Input
        value={headingValue}
        onChange={(e) => onHeadingChange(e.target.value)}
        placeholder={headingPlaceholder}
        className="border-stone-200 bg-white font-medium"
      />
      <Textarea
        value={contentValue}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder={contentPlaceholder}
        className="border-stone-200 bg-white min-h-[120px]"
      />
    </div>
  );
}
