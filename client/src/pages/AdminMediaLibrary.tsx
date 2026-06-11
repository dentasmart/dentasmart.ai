import { useState, useCallback, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  LayoutGrid,
  List,
  Search,
  Loader2,
  ImageIcon,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  FileText,
  X,
  Save,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/AdminLayout";

// ─── Types ───────────────────────────────────────────────────────────────────

type MediaItem = {
  id: number;
  url: string;
  fileKey: string;
  filename: string;
  mimeType: string;
  fileSizeBytes: number | null;
  width: number | null;
  height: number | null;
  altText: string | null;
  caption: string | null;
  title: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type UsagePost = {
  postId: number;
  postSlug: string;
  postTitle: string;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatBytes(bytes: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(d: Date): string {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function MediaGrid({
  items,
  selectedId,
  onSelect,
}: {
  items: MediaItem[];
  selectedId: number | null;
  onSelect: (item: MediaItem) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className={`group relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer text-left ${
            selectedId === item.id
              ? "border-primary ring-2 ring-primary/20"
              : "border-stone-200 hover:border-stone-300"
          }`}
        >
          <img
            src={item.url}
            alt={item.altText || item.filename}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f5f5f4'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='%23a8a29e' font-size='12'%3E?%3C/text%3E%3C/svg%3E";
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-white text-[10px] truncate leading-tight">
              {item.filename}
            </p>
          </div>
          {selectedId === item.id && (
            <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

function MediaListView({
  items,
  selectedId,
  onSelect,
}: {
  items: MediaItem[];
  selectedId: number | null;
  onSelect: (item: MediaItem) => void;
}) {
  return (
    <div className="divide-y divide-stone-100 border border-stone-200 rounded-lg overflow-hidden">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-colors cursor-pointer ${
            selectedId === item.id
              ? "bg-primary/5 border-l-2 border-l-primary"
              : "hover:bg-stone-50 border-l-2 border-l-transparent"
          }`}
        >
          <div className="w-12 h-12 rounded-md overflow-hidden border border-stone-200 flex-shrink-0 bg-stone-50">
            <img
              src={item.url}
              alt={item.altText || item.filename}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-stone-800 truncate">{item.filename}</p>
            <p className="text-xs text-stone-500 mt-0.5">
              {formatBytes(item.fileSizeBytes)}
              {item.width && item.height ? ` · ${item.width}×${item.height}` : ""}
              {" · "}
              {formatDate(item.createdAt)}
            </p>
          </div>
          <div className="text-xs text-stone-400 flex-shrink-0">
            {item.mimeType.replace("image/", "")}
          </div>
        </button>
      ))}
    </div>
  );
}

function DetailPanel({
  item,
  onClose,
  onDeleted,
}: {
  item: MediaItem;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const utils = trpc.useUtils();
  const [altText, setAltText] = useState(item.altText || "");
  const [caption, setCaption] = useState(item.caption || "");
  const [title, setTitle] = useState(item.title || "");
  const [filename, setFilename] = useState(item.filename);
  const [copied, setCopied] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // Usage query
  const { data: usageData, isLoading: usageLoading } = trpc.media.checkUsage.useQuery(
    { id: item.id },
    { staleTime: 5 * 60 * 1000 }
  );

  const updateMutation = trpc.media.update.useMutation({
    onSuccess: () => {
      toast.success("Metadata saved");
      setIsDirty(false);
      utils.media.list.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteMutation = trpc.media.delete.useMutation({
    onSuccess: () => {
      toast.success("Image removed from library");
      onDeleted();
    },
    onError: (err) => toast.error(err.message),
  });

  const handleSave = () => {
    updateMutation.mutate({
      id: item.id,
      altText: altText || undefined,
      caption: caption || undefined,
      title: title || undefined,
      filename: filename || undefined,
    });
  };

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(item.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const markDirty = () => setIsDirty(true);

  return (
    <div className="w-80 flex-shrink-0 border-l border-stone-200 bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100">
        <h3 className="text-sm font-semibold text-stone-800 truncate max-w-[200px]">
          {item.filename}
        </h3>
        <button
          onClick={onClose}
          className="text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Preview */}
        <div className="p-4 border-b border-stone-100">
          <div className="aspect-video rounded-lg overflow-hidden bg-stone-50 border border-stone-200">
            <img
              src={item.url}
              alt={item.altText || item.filename}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* File metadata */}
        <div className="px-4 py-3 border-b border-stone-100 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-500">Size</span>
            <span className="text-stone-700 font-medium">{formatBytes(item.fileSizeBytes)}</span>
          </div>
          {item.width && item.height && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500">Dimensions</span>
              <span className="text-stone-700 font-medium">{item.width} × {item.height}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-500">Type</span>
            <span className="text-stone-700 font-medium">{item.mimeType}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-500">Uploaded</span>
            <span className="text-stone-700 font-medium">{formatDate(item.createdAt)}</span>
          </div>
        </div>

        {/* URL copy */}
        <div className="px-4 py-3 border-b border-stone-100">
          <div className="flex gap-2">
            <Input
              value={item.url}
              readOnly
              className="text-xs h-8 bg-stone-50 text-stone-600"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyUrl}
              className="flex-shrink-0 h-8 px-2 cursor-pointer"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </Button>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <Button variant="outline" size="sm" className="h-8 px-2 cursor-pointer">
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </a>
          </div>
        </div>

        {/* Editable metadata */}
        <div className="px-4 py-3 border-b border-stone-100 space-y-3">
          <div>
            <Label className="text-xs text-stone-600 mb-1 block">Filename</Label>
            <Input
              value={filename}
              onChange={(e) => { setFilename(e.target.value); markDirty(); }}
              className="h-8 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs text-stone-600 mb-1 block">Alt Text</Label>
            <Input
              value={altText}
              onChange={(e) => { setAltText(e.target.value); markDirty(); }}
              placeholder="Describe the image..."
              className="h-8 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs text-stone-600 mb-1 block">Title</Label>
            <Input
              value={title}
              onChange={(e) => { setTitle(e.target.value); markDirty(); }}
              placeholder="Optional title..."
              className="h-8 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs text-stone-600 mb-1 block">Caption</Label>
            <Textarea
              value={caption}
              onChange={(e) => { setCaption(e.target.value); markDirty(); }}
              placeholder="Optional caption..."
              className="text-sm resize-none"
              rows={2}
            />
          </div>
        </div>

        {/* Usage */}
        <div className="px-4 py-3 border-b border-stone-100">
          <p className="text-xs font-semibold text-stone-600 mb-2 uppercase tracking-wide">
            Used In
          </p>
          {usageLoading ? (
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <Loader2 className="w-3 h-3 animate-spin" />
              Checking usage...
            </div>
          ) : usageData && usageData.usageCount > 0 ? (
            <div className="space-y-1.5">
              {(usageData.posts as UsagePost[]).map((post) => (
                <a
                  key={post.postId}
                  href={`/oral-health-hub/${post.postSlug}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-primary hover:underline"
                >
                  <FileText className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{post.postTitle}</span>
                </a>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <AlertCircle className="w-3 h-3" />
              Not used in any article
            </div>
          )}
        </div>
      </div>

      {/* Footer actions */}
      <div className="px-4 py-3 border-t border-stone-100 flex gap-2">
        <Button
          onClick={handleSave}
          disabled={!isDirty || updateMutation.isPending}
          size="sm"
          className="flex-1 bg-primary hover:bg-primary/90 text-white cursor-pointer"
        >
          {updateMutation.isPending ? (
            <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5 mr-1.5" />
          )}
          Save
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove from library?</AlertDialogTitle>
              <AlertDialogDescription>
                This removes <strong>{item.filename}</strong> from the media catalogue. The file
                will remain on the CDN and any articles using it will be unaffected. This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteMutation.mutate({ id: item.id })}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Remove"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminMediaLibrary() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data, isLoading, refetch } = trpc.media.list.useQuery(
    { search: debouncedSearch || undefined, limit: 100, offset: 0 },
    { staleTime: 30 * 1000 }
  );

  const items: MediaItem[] = (data?.items ?? []) as MediaItem[];
  const total = data?.total ?? 0;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(value), 300);
  };

  const handleSelect = useCallback((item: MediaItem) => {
    setSelectedItem((prev) => (prev?.id === item.id ? null : item));
  }, []);

  const handleDeleted = useCallback(() => {
    setSelectedItem(null);
    refetch();
  }, [refetch]);

  return (
    <AdminLayout activeId="media-library">
      <div className="flex flex-col h-full">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-stone-800">Media Library</h1>
            <p className="text-sm text-stone-500 mt-0.5">
              {total} image{total !== 1 ? "s" : ""} in the catalogue
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by filename, alt text, title..."
              className="pl-9 h-9"
            />
            {search && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 border border-stone-200 rounded-md p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded cursor-pointer transition-colors ${
                viewMode === "grid"
                  ? "bg-stone-100 text-stone-800"
                  : "text-stone-400 hover:text-stone-600"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded cursor-pointer transition-colors ${
                viewMode === "list"
                  ? "bg-stone-100 text-stone-800"
                  : "text-stone-400 hover:text-stone-600"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-1 gap-0 overflow-hidden border border-stone-200 rounded-lg bg-white">
          {/* Main grid/list */}
          <div className="flex-1 overflow-y-auto p-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-48 text-stone-400">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                Loading media...
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-stone-400">
                <ImageIcon className="w-12 h-12 mb-3 opacity-30" />
                <p className="text-sm font-medium">
                  {debouncedSearch ? "No images match your search" : "No images in the library yet"}
                </p>
                <p className="text-xs mt-1 text-stone-400">
                  {debouncedSearch
                    ? "Try a different search term"
                    : "Images uploaded in the blog editor will appear here"}
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <MediaGrid
                items={items}
                selectedId={selectedItem?.id ?? null}
                onSelect={handleSelect}
              />
            ) : (
              <MediaListView
                items={items}
                selectedId={selectedItem?.id ?? null}
                onSelect={handleSelect}
              />
            )}
          </div>

          {/* Detail panel */}
          {selectedItem && (
            <DetailPanel
              key={selectedItem.id}
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
              onDeleted={handleDeleted}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
