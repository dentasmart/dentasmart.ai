import { useState, useMemo } from "react";
import { useLocation, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  FolderTree,
  ChevronRight,
  Loader2,
  ExternalLink,
  LogOut,
  Palette,
} from "lucide-react";
import { toast } from "sonner";

const COLOR_OPTIONS = [
  { value: "stone", label: "Stone", bg: "bg-stone-100", text: "text-stone-700" },
  { value: "blue", label: "Blue", bg: "bg-blue-100", text: "text-blue-700" },
  { value: "purple", label: "Purple", bg: "bg-purple-100", text: "text-purple-700" },
  { value: "orange", label: "Orange", bg: "bg-orange-100", text: "text-orange-700" },
  { value: "green", label: "Green", bg: "bg-green-100", text: "text-green-700" },
  { value: "red", label: "Red", bg: "bg-red-100", text: "text-red-700" },
  { value: "amber", label: "Amber", bg: "bg-amber-100", text: "text-amber-700" },
  { value: "teal", label: "Teal", bg: "bg-teal-100", text: "text-teal-700" },
  { value: "pink", label: "Pink", bg: "bg-pink-100", text: "text-pink-700" },
  { value: "indigo", label: "Indigo", bg: "bg-indigo-100", text: "text-indigo-700" },
];

function getColorClasses(color: string) {
  const found = COLOR_OPTIONS.find((c) => c.value === color);
  return found || { bg: "bg-stone-100", text: "text-stone-700" };
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

interface CategoryFormData {
  name: string;
  slug: string;
  parentId: number | null;
  description: string;
  color: string;
  sortOrder: number;
}

const defaultFormData: CategoryFormData = {
  name: "",
  slug: "",
  parentId: null,
  description: "",
  color: "stone",
  sortOrder: 0,
};

export default function AdminCategories() {
  const [, setLocation] = useLocation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>(defaultFormData);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // Auth check
  const { data: admin, isLoading: authLoading } = trpc.blog.adminMe.useQuery();
  const logoutMutation = trpc.blog.adminLogout.useMutation({
    onSuccess: () => setLocation("/admin/login"),
  });

  // Categories
  const { data: categories, isLoading, refetch } = trpc.blog.listCategories.useQuery();
  const utils = trpc.useUtils();

  const createMutation = trpc.blog.createCategory.useMutation({
    onSuccess: () => {
      toast.success("Category created successfully");
      setDialogOpen(false);
      resetForm();
      refetch();
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = trpc.blog.updateCategory.useMutation({
    onSuccess: () => {
      toast.success("Category updated successfully");
      setDialogOpen(false);
      resetForm();
      refetch();
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = trpc.blog.deleteCategory.useMutation({
    onSuccess: () => {
      toast.success("Category deleted");
      refetch();
    },
    onError: (err) => toast.error(err.message),
  });

  // Organize categories into tree structure
  const { parentCategories, subcategoryMap } = useMemo(() => {
    if (!categories) return { parentCategories: [], subcategoryMap: new Map() };

    const parents = categories.filter((c) => !c.parentId);
    const subMap = new Map<number, typeof categories>();

    categories.forEach((c) => {
      if (c.parentId) {
        const existing = subMap.get(c.parentId) || [];
        existing.push(c);
        subMap.set(c.parentId, existing);
      }
    });

    return { parentCategories: parents, subcategoryMap: subMap };
  }, [categories]);

  // Redirect if not authenticated
  if (!authLoading && !admin) {
    setLocation("/admin/login");
    return null;
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!admin) return null;

  function resetForm() {
    setFormData(defaultFormData);
    setEditingId(null);
    setSlugManuallyEdited(false);
  }

  function openCreateDialog(parentId: number | null = null) {
    resetForm();
    setFormData({ ...defaultFormData, parentId });
    setDialogOpen(true);
  }

  function openEditDialog(cat: any) {
    setEditingId(cat.id);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      parentId: cat.parentId || null,
      description: cat.description || "",
      color: cat.color || "stone",
      sortOrder: cat.sortOrder || 0,
    });
    setSlugManuallyEdited(true);
    setDialogOpen(true);
  }

  function handleNameChange(name: string) {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: slugManuallyEdited ? prev.slug : generateSlug(name),
    }));
  }

  function handleSave() {
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }
    if (!formData.slug.trim()) {
      toast.error("Category slug is required");
      return;
    }

    if (editingId) {
      updateMutation.mutate({ id: editingId, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="DentaSmart" className="h-8" />
              <div className="hidden sm:block">
                <span className="text-stone-300 mx-2">|</span>
                <span className="text-sm font-medium text-stone-600">Category Management</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-stone-500 hidden sm:block">
                Welcome, <span className="font-medium text-stone-700">{admin.displayName || admin.username}</span>
              </span>
              <Link href="/" target="_blank">
                <Button variant="ghost" size="sm" className="text-stone-500 hover:text-stone-700 cursor-pointer">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">View Site</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => logoutMutation.mutate()}
                className="text-stone-500 hover:text-red-600 cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back + Title */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/admin")}
              className="text-stone-500 hover:text-stone-700 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Articles
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-stone-900 flex items-center gap-2">
                <FolderTree className="w-6 h-6 text-primary" />
                Categories & Subcategories
              </h1>
              <p className="text-sm text-stone-500 mt-1">
                Organize your blog content with parent categories and subcategories
              </p>
            </div>
          </div>
          <Button
            onClick={() => openCreateDialog(null)}
            className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Category
          </Button>
        </div>

        {/* Categories Tree */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : parentCategories.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
            <FolderTree className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-stone-700 mb-2">No categories yet</h3>
            <p className="text-stone-500 text-sm mb-6">
              Create your first category to start organizing blog content.
            </p>
            <Button
              onClick={() => openCreateDialog(null)}
              className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Category
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {parentCategories.map((parent) => {
              const subs = subcategoryMap.get(parent.id) || [];
              const colorClasses = getColorClasses(parent.color || "stone");

              return (
                <div key={parent.id} className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                  {/* Parent Category Row */}
                  <div className="flex items-center justify-between p-5 border-b border-stone-100">
                    <div className="flex items-center gap-4">
                      <Badge className={`${colorClasses.bg} ${colorClasses.text} border-0 text-sm px-3 py-1`}>
                        {parent.name}
                      </Badge>
                      <span className="text-xs text-stone-400 font-mono">/{parent.slug}</span>
                      {parent.description && (
                        <span className="text-sm text-stone-500 hidden md:block">
                          {parent.description}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openCreateDialog(parent.id)}
                        className="text-primary hover:text-primary/80 cursor-pointer"
                        title="Add subcategory"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Add Sub</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(parent)}
                        className="text-stone-500 hover:text-primary cursor-pointer"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-stone-500 hover:text-red-600 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Category</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{parent.name}"? This cannot be undone.
                              {subs.length > 0 && " You must delete all subcategories first."}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate({ id: parent.id })}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  {/* Subcategories */}
                  {subs.length > 0 && (
                    <div className="bg-stone-50/50">
                      {subs.map((sub: any) => {
                        const subColor = getColorClasses(sub.color || parent.color || "stone");
                        return (
                          <div
                            key={sub.id}
                            className="flex items-center justify-between px-5 py-3 border-b border-stone-100 last:border-b-0 ml-6"
                          >
                            <div className="flex items-center gap-3">
                              <ChevronRight className="w-4 h-4 text-stone-300" />
                              <Badge className={`${subColor.bg} ${subColor.text} border-0 text-xs px-2.5 py-0.5`}>
                                {sub.name}
                              </Badge>
                              <span className="text-xs text-stone-400 font-mono">/{sub.slug}</span>
                              {sub.description && (
                                <span className="text-xs text-stone-400 hidden md:block">{sub.description}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditDialog(sub)}
                                className="text-stone-400 hover:text-primary cursor-pointer"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-stone-400 hover:text-red-600 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Subcategory</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "{sub.name}"? This cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteMutation.mutate({ id: sub.id })}
                                      className="bg-red-600 hover:bg-red-700 text-white"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {subs.length === 0 && (
                    <div className="px-5 py-4 text-sm text-stone-400 italic bg-stone-50/30">
                      No subcategories yet. Click "Add Sub" to create one.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) { resetForm(); } setDialogOpen(open); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Category" : formData.parentId ? "New Subcategory" : "New Category"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Update the category details below."
                : formData.parentId
                ? `Create a subcategory under "${parentCategories.find((p) => p.id === formData.parentId)?.name || "parent"}".`
                : "Create a new top-level category for organizing blog posts."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm font-medium text-stone-700 mb-1.5 block">Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g., Dental Problems"
                className="border-stone-200"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-stone-700 mb-1.5 block">Slug</Label>
              <Input
                value={formData.slug}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, slug: e.target.value }));
                  setSlugManuallyEdited(true);
                }}
                placeholder="dental-problems"
                className="border-stone-200 font-mono text-sm"
              />
              <p className="text-xs text-stone-400 mt-1">Used in URLs and for filtering</p>
            </div>

            {!editingId && (
              <div>
                <Label className="text-sm font-medium text-stone-700 mb-1.5 block">Parent Category</Label>
                <Select
                  value={formData.parentId ? String(formData.parentId) : "none"}
                  onValueChange={(v) =>
                    setFormData((prev) => ({ ...prev, parentId: v === "none" ? null : Number(v) }))
                  }
                >
                  <SelectTrigger className="border-stone-200">
                    <SelectValue placeholder="None (top-level)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (top-level category)</SelectItem>
                    {parentCategories.map((p) => (
                      <SelectItem key={p.id} value={String(p.id)}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label className="text-sm font-medium text-stone-700 mb-1.5 block">Description (optional)</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of this category..."
                className="border-stone-200 min-h-[60px]"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-stone-700 mb-1.5 block flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" />
                Color
              </Label>
              <div className="flex flex-wrap gap-2">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, color: c.value }))}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${c.bg} ${c.text} ${
                      formData.color === c.value
                        ? "ring-2 ring-offset-1 ring-primary scale-105"
                        : "hover:scale-105 opacity-70 hover:opacity-100"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-stone-700 mb-1.5 block">Sort Order</Label>
              <Input
                type="number"
                value={formData.sortOrder}
                onChange={(e) => setFormData((prev) => ({ ...prev, sortOrder: Number(e.target.value) }))}
                className="border-stone-200 w-24"
              />
              <p className="text-xs text-stone-400 mt-1">Lower numbers appear first</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="cursor-pointer">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
            >
              {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingId ? "Save Changes" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
