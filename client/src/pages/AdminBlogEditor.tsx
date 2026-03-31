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
  Loader2,
  ChevronDown,
  ChevronUp,
  Globe,
  FileText,
  Search as SearchIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Clock,
  AlertCircle,
} from "lucide-react";
import BlogEditor from "@/components/BlogEditor";

export default function AdminBlogEditor() {
  const [, setLocation] = useLocation();
  const [matchNew] = useRoute("/admin/new");
  const [matchEdit, editParams] = useRoute("/admin/edit/:id");
  const isNew = !!matchNew;
  const editId = editParams?.id ? parseInt(editParams.id) : null;

  // Auth check. Disable refetch on window focus to prevent unexpected redirects (Bug 3)
  const { data: admin, isLoading: authLoading } = trpc.blog.adminMe.useQuery(undefined, {
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Track whether form has been populated from server data (Bug 1 fix)
  const hasPopulated = useRef(false);
  // Track whether user has unsaved changes (Bug 3 fix)
  const [isDirty, setIsDirty] = useState(false);

  // Load existing post if editing. Disable refetch on window focus to prevent overwriting edits (Bug 1)
  const { data: existingPost, isLoading: postLoading } = trpc.blog.getById.useQuery(
    { id: editId! },
    {
      enabled: !!editId,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: Infinity, // Never auto-refetch. User controls when to reload
    }
  );

  // Category state (declared before useMemo that depends on them)
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [subcategoryId, setSubcategoryId] = useState<number | null>(null);

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
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");

  // UI state
  const [seoOpen, setSeoOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("structured");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Populate form when editing. Only once on initial load (Bug 1 fix)
  useEffect(() => {
    if (existingPost && !hasPopulated.current) {
      hasPopulated.current = true;
      setTitle(existingPost.title || "");
      setSlug(existingPost.slug || "");
      setSlugManuallyEdited(true);
      setCategory(existingPost.category);
      setReadTime(existingPost.readTime || "3 min read");
      setStatus(existingPost.status);
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
      setOgTitle(existingPost.ogTitle || "");
      setOgDescription(existingPost.ogDescription || "");
      setOgImage(existingPost.ogImage || "");
      setCanonicalUrl(existingPost.canonicalUrl || "");
      setFeaturedImage(existingPost.featuredImage || "");
      setCategoryId(existingPost.categoryId || null);
      setSubcategoryId(existingPost.subcategoryId || null);

      // Always default to Rich Text Editor tab for reviewing content
      setActiveTab("wysiwyg");
      // Reset dirty flag after initial population
      setTimeout(() => setIsDirty(false), 0);
    }
  }, [existingPost]);

  // Reset hasPopulated when navigating to a different post
  useEffect(() => {
    hasPopulated.current = false;
    setIsDirty(false);
  }, [editId]);

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

  // Mutations
  const createMutation = trpc.blog.create.useMutation({
    onSuccess: (data) => {
      setIsDirty(false);
      showSuccess("Article created successfully!");
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
    if (!authLoading) {
      if (!admin && !authCheckedOnce.current) {
        // First auth check failed. User is not logged in
        setLocation("/admin/login");
      }
      authCheckedOnce.current = true;
    }
  }, [admin, authLoading, setLocation]);

  // Bug 3 fix: Warn user about unsaved changes before leaving/refreshing
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        // Modern browsers show a generic message regardless of returnValue
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  if (authLoading || (editId && postLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!admin) return null;

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
    ogTitle: ogTitle || undefined,
    ogDescription: ogDescription || undefined,
    ogImage: ogImage || undefined,
    canonicalUrl: canonicalUrl || undefined,
    featuredImage: featuredImage || undefined,
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

  const handleSaveAsDraft = () => {
    if (!title.trim()) {
      showError("Please enter a title for your article before saving.");
      return;
    }
    setErrorMessage(null);
    setStatus("draft");
    if (isNew) {
      createMutation.mutate({ ...formData, status: "draft" });
    } else if (editId) {
      updateMutation.mutate({ id: editId, ...formData, status: "draft" });
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
                  if (isDirty) {
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
              {/* Save Draft: saves without publishing */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveAsDraft}
                disabled={isSaving}
                className="cursor-pointer"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-1" />
                )}
                Save Draft
              </Button>
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
                    label="The Problem"
                    headingValue={problemHeading}
                    onHeadingChange={setProblemHeading}
                    contentValue={problemContent}
                    onContentChange={setProblemContent}
                    headingPlaceholder="e.g., The Problem: You're Told What, But Not Why"
                    contentPlaceholder="Describe the problem the reader faces..."
                    color="red"
                  />
                  <SectionEditor
                    label="Empathy"
                    headingValue={empathyHeading}
                    onHeadingChange={setEmpathyHeading}
                    contentValue={empathyContent}
                    onContentChange={setEmpathyContent}
                    headingPlaceholder="e.g., Why This Feels Frustrating"
                    contentPlaceholder="Show understanding of the reader's feelings..."
                    color="amber"
                  />
                  <SectionEditor
                    label="The Truth"
                    headingValue={solutionHeading}
                    onHeadingChange={setSolutionHeading}
                    contentValue={solutionContent}
                    onContentChange={setSolutionContent}
                    headingPlaceholder="e.g., The Simple Truth: X-Rays Are for Dentists"
                    contentPlaceholder="Explain the underlying truth or insight..."
                    color="blue"
                  />
                  <SectionEditor
                    label="What Should Change"
                    headingValue={changeHeading}
                    onHeadingChange={setChangeHeading}
                    contentValue={changeContent}
                    onContentChange={setChangeContent}
                    headingPlaceholder="e.g., What Should Happen Instead"
                    contentPlaceholder="Describe the ideal outcome..."
                    color="green"
                  />
                  <SectionEditor
                    label="How DentaSmart Helps"
                    headingValue={resultHeading}
                    onHeadingChange={setResultHeading}
                    contentValue={resultContent}
                    onContentChange={setResultContent}
                    headingPlaceholder="e.g., How DentaSmart Helps"
                    contentPlaceholder="Explain how DentaSmart solves this problem..."
                    color="primary"
                  />
                </TabsContent>

                <TabsContent value="wysiwyg">
                  <p className="text-sm text-stone-500 mb-4">
                    Use the rich text editor for free-form content with formatting, images, and links.
                  </p>
                  <BlogEditor
                    content={bodyHtml}
                    onChange={(html) => { setBodyHtml(html); setIsDirty(true); }}
                    placeholder="Write your article content here..."
                  />
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
                  {status === "draft" && "Use the buttons above to Save Draft or Publish."}
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
                    onValueChange={(v) => setSubcategoryId(v === "none" ? null : Number(v))}
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

              <div>
                <Label className="text-xs font-medium text-stone-500 mb-1 block">Read Time</Label>
                <Input
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="e.g., 3 min read"
                  className="border-stone-200"
                />
              </div>

              <div>
                <Label className="text-xs font-medium text-stone-500 mb-1 block">Featured Image URL</Label>
                <Input
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://..."
                  className="border-stone-200"
                />
              </div>
            </div>

            {/* URL / Slug */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-3">
              <h3 className="font-semibold text-stone-800 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-primary" />
                URL Settings
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

            {/* SEO Settings */}
            <Collapsible open={seoOpen} onOpenChange={setSeoOpen}>
              <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                <CollapsibleTrigger className="w-full p-5 flex items-center justify-between hover:bg-stone-50 transition-colors cursor-pointer">
                  <h3 className="font-semibold text-stone-800 flex items-center gap-2">
                    <SearchIcon className="w-4 h-4 text-primary" />
                    SEO Settings
                  </h3>
                  {seoOpen ? (
                    <ChevronUp className="w-4 h-4 text-stone-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="px-5 pb-5 space-y-4 border-t border-stone-100 pt-4">
                    <div>
                      <Label className="text-xs font-medium text-stone-500 mb-1 block">Meta Title</Label>
                      <Input
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        placeholder="SEO title (50-60 chars)"
                        className="border-stone-200"
                      />
                      <p className="text-xs text-stone-400 mt-1">{metaTitle.length}/60 characters</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-stone-500 mb-1 block">Meta Description</Label>
                      <Textarea
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        placeholder="SEO description (150-160 chars)"
                        className="border-stone-200 min-h-[80px]"
                      />
                      <p className="text-xs text-stone-400 mt-1">{metaDescription.length}/160 characters</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-stone-500 mb-1 block">Meta Keywords</Label>
                      <Input
                        value={metaKeywords}
                        onChange={(e) => setMetaKeywords(e.target.value)}
                        placeholder="keyword1, keyword2, keyword3"
                        className="border-stone-200"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-stone-500 mb-1 block">OG Title</Label>
                      <Input
                        value={ogTitle}
                        onChange={(e) => setOgTitle(e.target.value)}
                        placeholder="Open Graph title"
                        className="border-stone-200"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-stone-500 mb-1 block">OG Description</Label>
                      <Textarea
                        value={ogDescription}
                        onChange={(e) => setOgDescription(e.target.value)}
                        placeholder="Open Graph description"
                        className="border-stone-200 min-h-[60px]"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-stone-500 mb-1 block">OG Image URL</Label>
                      <Input
                        value={ogImage}
                        onChange={(e) => setOgImage(e.target.value)}
                        placeholder="https://..."
                        className="border-stone-200"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-stone-500 mb-1 block">Canonical URL</Label>
                      <Input
                        value={canonicalUrl}
                        onChange={(e) => setCanonicalUrl(e.target.value)}
                        placeholder="https://..."
                        className="border-stone-200"
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>

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
                <li>Click <strong>Publish</strong> to make the article live</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SectionEditor({
  label,
  headingValue,
  onHeadingChange,
  contentValue,
  onContentChange,
  headingPlaceholder,
  contentPlaceholder,
  color,
}: {
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
    <div className={`border-l-4 rounded-r-lg p-4 space-y-3 ${colorClasses[color] || ""}`}>
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
