import { useState, useEffect, useMemo } from "react";
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
import { toast } from "sonner";
import BlogEditor from "@/components/BlogEditor";

export default function AdminBlogEditor() {
  const [, setLocation] = useLocation();
  const [matchNew] = useRoute("/admin/new");
  const [matchEdit, editParams] = useRoute("/admin/edit/:id");
  const isNew = !!matchNew;
  const editId = editParams?.id ? parseInt(editParams.id) : null;

  // Auth check
  const { data: admin, isLoading: authLoading } = trpc.blog.adminMe.useQuery();

  // Load existing post if editing
  const { data: existingPost, isLoading: postLoading } = trpc.blog.getById.useQuery(
    { id: editId! },
    { enabled: !!editId }
  );

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [category, setCategory] = useState<"Dentist Problems" | "Dental Problems" | "Insurance Problems">("Dental Problems");
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

  // Populate form when editing
  useEffect(() => {
    if (existingPost) {
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
      setBodyHtml(existingPost.bodyHtml || "");
      setMetaTitle(existingPost.metaTitle || "");
      setMetaDescription(existingPost.metaDescription || "");
      setMetaKeywords(existingPost.metaKeywords || "");
      setOgTitle(existingPost.ogTitle || "");
      setOgDescription(existingPost.ogDescription || "");
      setOgImage(existingPost.ogImage || "");
      setCanonicalUrl(existingPost.canonicalUrl || "");
      setFeaturedImage(existingPost.featuredImage || "");

      // Determine which tab to show
      if (existingPost.bodyHtml && existingPost.bodyHtml.trim()) {
        setActiveTab("wysiwyg");
      } else {
        setActiveTab("structured");
      }
    }
  }, [existingPost]);

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

  // Mutations
  const createMutation = trpc.blog.create.useMutation({
    onSuccess: (data) => {
      toast.success("Article created successfully!");
      setLocation(`/admin/edit/${data.id}`);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create article");
    },
  });

  const updateMutation = trpc.blog.update.useMutation({
    onSuccess: () => {
      toast.success("Article saved successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to save article");
    },
  });

  const publishMutation = trpc.blog.publish.useMutation({
    onSuccess: () => {
      setStatus("published");
      toast.success("Article published!");
    },
  });

  const unpublishMutation = trpc.blog.unpublish.useMutation({
    onSuccess: () => {
      setStatus("unpublished");
      toast.success("Article unpublished");
    },
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !admin) {
      setLocation("/admin/login");
    }
  }, [admin, authLoading, setLocation]);

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
      toast.error("Title is required");
      return;
    }
    if (isNew) {
      createMutation.mutate(formData);
    } else if (editId) {
      updateMutation.mutate({ id: editId, ...formData });
    }
  };

  const handleSaveAsDraft = () => {
    setStatus("draft");
    if (isNew) {
      createMutation.mutate({ ...formData, status: "draft" });
    } else if (editId) {
      updateMutation.mutate({ id: editId, ...formData, status: "draft" });
    }
  };

  const handlePublish = () => {
    if (!title.trim()) {
      toast.error("Title is required before publishing");
      return;
    }
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
                onClick={() => setLocation("/admin")}
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
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveAsDraft}
                disabled={isSaving}
                className="cursor-pointer"
              >
                <FileText className="w-4 h-4 mr-1" />
                Save Draft
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="cursor-pointer"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-1" />
                )}
                Save
              </Button>
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-xl border border-stone-200 p-6">
              <Label className="text-sm font-semibold text-stone-700 mb-2 block">Article Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a compelling title..."
                className="text-lg font-medium border-stone-200 bg-stone-50 focus:bg-white py-5"
              />
            </div>

            {/* Content Tabs */}
            <div className="bg-white rounded-xl border border-stone-200 p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                    onChange={setBodyHtml}
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
                <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
                  <SelectTrigger className="border-stone-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="unpublished">Unpublished</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs font-medium text-stone-500 mb-1 block">Category</Label>
                <Select value={category} onValueChange={(v) => setCategory(v as typeof category)}>
                  <SelectTrigger className="border-stone-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dentist Problems">Dentist Problems</SelectItem>
                    <SelectItem value="Dental Problems">Dental Problems</SelectItem>
                    <SelectItem value="Insurance Problems">Insurance Problems</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
                  <span className="text-xs text-stone-400 whitespace-nowrap">/hub/</span>
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
                    Live URL: /hub/{slug}
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
