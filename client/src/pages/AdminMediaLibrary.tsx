import { useState, useCallback, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
  Upload,
  CloudUpload,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Crop,
  Maximize2,
  RotateCcw,
  RotateCw,
  AlertTriangle,
  CheckSquare,
  Square,
} from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/AdminLayout";
import ReactCrop, { type Crop as CropType, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

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
  thumbnailUrl: string | null;
  mediumUrl: string | null;
  webpUrl: string | null;
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

type UploadFileState = {
  id: string;
  file: File;
  status: "pending" | "uploading" | "done" | "error";
  error?: string;
  result?: MediaItem;
};

type EditMode = "crop" | "resize" | "rotate";

// ─── Constants ───────────────────────────────────────────────────────────────

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
]);
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const CDN_WARNING =
  "Note: The catalogue entry will be removed. CDN files cannot be deleted via the current storage API and may remain accessible via direct URLs.";

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

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.has(file.type)) {
    return `"${file.type}" is not supported. Accepted: JPEG, PNG, WebP, GIF, SVG, PDF.`;
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `File exceeds ${MAX_FILE_SIZE_MB} MB limit (${(file.size / 1024 / 1024).toFixed(1)} MB).`;
  }
  return null;
}

// ─── UploadProgressPanel ─────────────────────────────────────────────────────

function UploadProgressPanel({
  files,
  onRemove,
  onClose,
}: {
  files: UploadFileState[];
  onRemove: (id: string) => void;
  onClose: () => void;
}) {
  const done = files.filter((f) => f.status === "done").length;
  const failed = files.filter((f) => f.status === "error").length;
  const pending = files.filter((f) => f.status === "pending" || f.status === "uploading").length;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-white border border-stone-200 rounded-xl shadow-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-stone-50 border-b border-stone-200">
        <div className="flex items-center gap-2">
          {pending > 0 ? (
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
          ) : failed > 0 ? (
            <XCircle className="w-4 h-4 text-red-500" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          )}
          <span className="text-sm font-medium text-stone-800">
            {pending > 0
              ? `Uploading ${pending} file${pending !== 1 ? "s" : ""}…`
              : `${done} uploaded${failed > 0 ? `, ${failed} failed` : ""}`}
          </span>
        </div>
        {pending === 0 && (
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="max-h-60 overflow-y-auto divide-y divide-stone-100">
        {files.map((f) => (
          <div key={f.id} className="flex items-center gap-3 px-4 py-2.5">
            <div className="flex-shrink-0">
              {f.status === "uploading" || f.status === "pending" ? (
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              ) : f.status === "done" ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-stone-700 truncate">{f.file.name}</p>
              {f.status === "error" && f.error && (
                <p className="text-[10px] text-red-500 mt-0.5 truncate">{f.error}</p>
              )}
            </div>
            {(f.status === "done" || f.status === "error") && (
              <button
                onClick={() => onRemove(f.id)}
                className="text-stone-300 hover:text-stone-500 cursor-pointer flex-shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DragDropOverlay ─────────────────────────────────────────────────────────

function DragDropOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-40 bg-primary/10 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
      <div className="bg-white border-2 border-dashed border-primary rounded-2xl px-16 py-12 flex flex-col items-center gap-3 shadow-2xl">
        <CloudUpload className="w-12 h-12 text-primary" />
        <p className="text-lg font-semibold text-primary">Drop files to upload</p>
        <p className="text-sm text-stone-500">
          JPEG, PNG, WebP, GIF, SVG, PDF · Max {MAX_FILE_SIZE_MB} MB each
        </p>
      </div>
    </div>
  );
}

// ─── MediaGrid ───────────────────────────────────────────────────────────────

function MediaGrid({
  items,
  selectedId,
  selectedIds,
  anySelected,
  onSelect,
  onCheckboxClick,
}: {
  items: MediaItem[];
  selectedId: number | null;
  selectedIds: Set<number>;
  anySelected: boolean;
  onSelect: (item: MediaItem) => void;
  onCheckboxClick: (item: MediaItem, e: React.MouseEvent) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {items.map((item) => {
        const isChecked = selectedIds.has(item.id);
        return (
          <div
            key={item.id}
            className={`group relative rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
              selectedId === item.id
                ? "border-primary ring-2 ring-primary/20"
                : isChecked
                ? "border-primary/60"
                : "border-stone-200 hover:border-stone-300"
            }`}
          >
            {/* Checkbox overlay */}
            <div
              className={`absolute top-1.5 left-1.5 z-10 transition-opacity ${
                anySelected || isChecked ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
              onClick={(e) => { e.stopPropagation(); onCheckboxClick(item, e); }}
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shadow-sm ${
                isChecked ? "bg-primary border-primary" : "bg-white/90 border-stone-400"
              }`}>
                {isChecked && <Check className="w-3 h-3 text-white" />}
              </div>
            </div>

            {/* Image */}
            <button
              onClick={() => onSelect(item)}
              className="w-full aspect-square block"
            >
              <img
                src={item.thumbnailUrl || item.url}
                alt={item.altText || item.filename}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f5f5f4'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='%23a8a29e' font-size='12'%3E?%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-[10px] truncate leading-tight">{item.filename}</p>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ─── MediaListView ────────────────────────────────────────────────────────────

function MediaListView({
  items,
  selectedId,
  selectedIds,
  anySelected,
  onSelect,
  onCheckboxClick,
}: {
  items: MediaItem[];
  selectedId: number | null;
  selectedIds: Set<number>;
  anySelected: boolean;
  onSelect: (item: MediaItem) => void;
  onCheckboxClick: (item: MediaItem, e: React.MouseEvent) => void;
}) {
  return (
    <div className="divide-y divide-stone-100 border border-stone-200 rounded-lg overflow-hidden">
      {items.map((item) => {
        const isChecked = selectedIds.has(item.id);
        return (
          <div
            key={item.id}
            className={`flex items-center gap-3 px-4 py-3 transition-colors ${
              selectedId === item.id
                ? "bg-primary/5 border-l-2 border-l-primary"
                : "hover:bg-stone-50 border-l-2 border-l-transparent"
            }`}
          >
            {/* Checkbox */}
            <div
              className={`flex-shrink-0 transition-opacity ${
                anySelected || isChecked ? "opacity-100" : "opacity-0 hover:opacity-100"
              }`}
              onClick={(e) => { e.stopPropagation(); onCheckboxClick(item, e); }}
            >
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer ${
                isChecked ? "bg-primary border-primary" : "border-stone-400"
              }`}>
                {isChecked && <Check className="w-2.5 h-2.5 text-white" />}
              </div>
            </div>

            <button
              onClick={() => onSelect(item)}
              className="flex items-center gap-4 flex-1 min-w-0 text-left cursor-pointer"
            >
              <div className="w-12 h-12 rounded-md overflow-hidden border border-stone-200 flex-shrink-0 bg-stone-50">
                <img
                  src={item.thumbnailUrl || item.url}
                  alt={item.altText || item.filename}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
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
          </div>
        );
      })}
    </div>
  );
}

// ─── DetailPanel ─────────────────────────────────────────────────────────────

function DetailPanel({
  item,
  onClose,
  onDeleted,
  onOpenEdit,
  onOpenReplace,
  onItemUpdated,
}: {
  item: MediaItem;
  onClose: () => void;
  onDeleted: () => void;
  onOpenEdit: (item: MediaItem) => void;
  onOpenReplace: (item: MediaItem) => void;
  onItemUpdated: (updated: MediaItem) => void;
}) {
  const utils = trpc.useUtils();
  const [altText, setAltText] = useState(item.altText || "");
  const [caption, setCaption] = useState(item.caption || "");
  const [title, setTitle] = useState(item.title || "");
  const [filename, setFilename] = useState(item.filename);
  const [copied, setCopied] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const { data: usageData, isLoading: usageLoading } = trpc.media.checkUsage.useQuery(
    { id: item.id },
    { staleTime: 5 * 60 * 1000, retry: false }
  );

  const updateMutation = trpc.media.update.useMutation({
    onSuccess: (updated) => {
      toast.success("Metadata saved");
      setIsDirty(false);
      onItemUpdated(updated as MediaItem);
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
          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.thumbnailUrl && (
              <a href={item.thumbnailUrl} target="_blank" rel="noopener noreferrer"
                className="text-[10px] text-primary hover:underline">Thumb</a>
            )}
            {item.mediumUrl && (
              <a href={item.mediumUrl} target="_blank" rel="noopener noreferrer"
                className="text-[10px] text-primary hover:underline">Medium</a>
            )}
            {item.webpUrl && (
              <a href={item.webpUrl} target="_blank" rel="noopener noreferrer"
                className="text-[10px] text-primary hover:underline">WebP</a>
            )}
          </div>
        </div>

        {/* File info */}
        <div className="px-4 py-3 border-b border-stone-100 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500">Size</span>
            <span className="text-xs font-medium text-stone-700">{formatBytes(item.fileSizeBytes)}</span>
          </div>
          {item.width && item.height && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-500">Dimensions</span>
              <span className="text-xs font-medium text-stone-700">{item.width}×{item.height}px</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500">Type</span>
            <span className="text-xs font-medium text-stone-700">{item.mimeType}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500">Uploaded</span>
            <span className="text-xs font-medium text-stone-700">{formatDate(item.createdAt)}</span>
          </div>
          <div className="flex gap-1.5 mt-2">
            <Button variant="outline" size="sm" onClick={handleCopyUrl}
              className="flex-1 text-xs h-7 cursor-pointer">
              {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
              {copied ? "Copied!" : "Copy URL"}
            </Button>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="text-xs h-7 cursor-pointer">
                <ExternalLink className="w-3 h-3" />
              </Button>
            </a>
          </div>
        </div>

        {/* Edit / Replace actions */}
        <div className="px-4 py-3 border-b border-stone-100 flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onOpenEdit(item)}
            className="flex-1 text-xs h-7 cursor-pointer flex items-center gap-1">
            <Crop className="w-3 h-3" /> Edit Image
          </Button>
          <Button variant="outline" size="sm" onClick={() => onOpenReplace(item)}
            className="flex-1 text-xs h-7 cursor-pointer flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> Replace
          </Button>
        </div>

        {/* Metadata form */}
        <div className="px-4 py-3 border-b border-stone-100 space-y-3">
          <div>
            <Label className="text-xs text-stone-600 mb-1 block">Filename</Label>
            <Input value={filename} onChange={(e) => { setFilename(e.target.value); markDirty(); }}
              className="h-8 text-sm" />
          </div>
          <div>
            <Label className="text-xs text-stone-600 mb-1 block">Alt Text</Label>
            <Input value={altText} onChange={(e) => { setAltText(e.target.value); markDirty(); }}
              placeholder="Describe the image…" className="h-8 text-sm" />
          </div>
          <div>
            <Label className="text-xs text-stone-600 mb-1 block">Title</Label>
            <Input value={title} onChange={(e) => { setTitle(e.target.value); markDirty(); }}
              placeholder="Optional title..." className="h-8 text-sm" />
          </div>
          <div>
            <Label className="text-xs text-stone-600 mb-1 block">Caption</Label>
            <Textarea value={caption} onChange={(e) => { setCaption(e.target.value); markDirty(); }}
              placeholder="Optional caption..." className="text-sm resize-none" rows={2} />
          </div>
        </div>

        {/* Usage */}
        <div className="px-4 py-3 border-b border-stone-100">
          <p className="text-xs font-semibold text-stone-600 mb-2 uppercase tracking-wide">Used In</p>
          {usageLoading ? (
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <Loader2 className="w-3 h-3 animate-spin" /> Checking usage...
            </div>
          ) : usageData && usageData.usageCount > 0 ? (
            <div className="space-y-1.5">
              {(usageData.posts as UsagePost[]).map((post) => (
                <a key={post.postId} href={`/oral-health-hub/${post.postSlug}/`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-primary hover:underline">
                  <FileText className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{post.postTitle}</span>
                </a>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <AlertCircle className="w-3 h-3" /> Not used in any article
            </div>
          )}
        </div>
      </div>

      {/* Footer actions */}
      <div className="px-4 py-3 border-t border-stone-100 space-y-2">
        <Button onClick={handleSave} disabled={!isDirty || updateMutation.isPending}
          size="sm" className="w-full bg-primary hover:bg-primary/90 text-white cursor-pointer">
          {updateMutation.isPending ? (
            <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
          ) : (
            <Save className="w-3.5 h-3.5 mr-1.5" />
          )}
          Save Metadata
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm"
              className="w-full text-red-600 border-red-200 hover:bg-red-50 cursor-pointer">
              <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete from Catalogue
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove from library?</AlertDialogTitle>
              <AlertDialogDescription className="space-y-2">
                <span>This removes <strong>{item.filename}</strong> from the media catalogue.</span>
                <span className="block mt-2 text-amber-700 bg-amber-50 border border-amber-200 rounded p-2 text-xs">
                  {CDN_WARNING}
                </span>
                {usageData && usageData.usageCount > 0 && (
                  <span className="block text-red-600 font-medium text-xs">
                    ⚠ This image is used in {usageData.usageCount} post(s). Deleting it will break those images.
                  </span>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteMutation.mutate({ id: item.id })}
                className="bg-red-600 hover:bg-red-700 text-white">
                {deleteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Remove"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

// ─── ImageEditModal ───────────────────────────────────────────────────────────

function ImageEditModal({
  item,
  onClose,
  onDone,
}: {
  item: MediaItem;
  onClose: () => void;
  onDone: (newItem: MediaItem) => void;
}) {
  const [mode, setMode] = useState<EditMode>("crop");
  const [saveAs, setSaveAs] = useState<"new" | "replace">("new");

  // Crop state
  const [crop, setCrop] = useState<CropType>({ unit: "%", x: 10, y: 10, width: 80, height: 80 });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [aspect, setAspect] = useState<number | undefined>(undefined);

  // Resize state
  const originalAspect = item.width && item.height ? item.width / item.height : 1;
  const [resizeW, setResizeW] = useState(item.width ?? 800);
  const [resizeH, setResizeH] = useState(item.height ?? 600);
  const [lockAspect, setLockAspect] = useState(true);

  // Rotate state
  const [rotation, setRotation] = useState(0);

  const editMutation = trpc.media.editImage.useMutation({
    onSuccess: (result) => {
      toast.success(saveAs === "new" ? "Saved as new image" : "Image replaced");
      onDone(result.item as MediaItem);
    },
    onError: (err) => toast.error(err.message),
  });

  const handleApply = () => {
    const payload: Parameters<typeof editMutation.mutate>[0] = { id: item.id, saveAs };

    if (mode === "crop" && completedCrop && imgRef.current) {
      const scaleX = (item.width ?? imgRef.current.naturalWidth) / imgRef.current.width;
      const scaleY = (item.height ?? imgRef.current.naturalHeight) / imgRef.current.height;
      payload.crop = {
        left: Math.round(completedCrop.x * scaleX),
        top: Math.round(completedCrop.y * scaleY),
        width: Math.round(completedCrop.width * scaleX),
        height: Math.round(completedCrop.height * scaleY),
      };
    } else if (mode === "resize") {
      payload.resize = { width: resizeW, height: resizeH, fit: "inside" };
    } else if (mode === "rotate") {
      payload.rotate = rotation;
    }

    editMutation.mutate(payload);
  };

  const aspectPresets: { label: string; value: number | undefined }[] = [
    { label: "Free", value: undefined },
    { label: "1:1", value: 1 },
    { label: "16:9", value: 16 / 9 },
    { label: "4:3", value: 4 / 3 },
    { label: "3:2", value: 3 / 2 },
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Image — {item.filename}</DialogTitle>
        </DialogHeader>

        {/* Mode tabs */}
        <div className="flex gap-2 border-b border-border pb-3">
          {(["crop", "resize", "rotate"] as EditMode[]).map((m) => (
            <Button key={m} variant={mode === m ? "default" : "outline"} size="sm"
              onClick={() => setMode(m)} className="flex items-center gap-1 capitalize cursor-pointer">
              {m === "crop" && <Crop className="w-3 h-3" />}
              {m === "resize" && <Maximize2 className="w-3 h-3" />}
              {m === "rotate" && <RotateCw className="w-3 h-3" />}
              {m}
            </Button>
          ))}
        </div>

        <div className="flex gap-4 min-h-64">
          {/* Preview area */}
          <div className="flex-1 flex items-center justify-center bg-stone-100 rounded-lg overflow-hidden">
            {mode === "crop" && (
              <ReactCrop crop={crop} onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)} aspect={aspect}>
                <img ref={imgRef} src={item.url} alt={item.filename}
                  className="max-h-80 max-w-full object-contain" />
              </ReactCrop>
            )}
            {mode === "resize" && (
              <img src={item.url} alt={item.filename} className="max-h-80 max-w-full object-contain" />
            )}
            {mode === "rotate" && (
              <img src={item.url} alt={item.filename}
                style={{ transform: `rotate(${rotation}deg)` }}
                className="max-h-64 max-w-full object-contain transition-transform" />
            )}
          </div>

          {/* Controls */}
          <div className="w-44 flex-shrink-0 space-y-3">
            {mode === "crop" && (
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-stone-600">Aspect Ratio</p>
                {aspectPresets.map((p) => (
                  <Button key={p.label} variant={aspect === p.value ? "default" : "outline"} size="sm"
                    onClick={() => setAspect(p.value)} className="w-full text-xs cursor-pointer">{p.label}</Button>
                ))}
              </div>
            )}

            {mode === "resize" && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-stone-600">Dimensions (px)</p>
                <div>
                  <label className="text-xs text-stone-500">Width</label>
                  <Input type="number" value={resizeW} onChange={(e) => {
                    const w = parseInt(e.target.value) || 1;
                    setResizeW(w);
                    if (lockAspect) setResizeH(Math.round(w / originalAspect));
                  }} className="h-8 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-stone-500">Height</label>
                  <Input type="number" value={resizeH} onChange={(e) => {
                    const h = parseInt(e.target.value) || 1;
                    setResizeH(h);
                    if (lockAspect) setResizeW(Math.round(h * originalAspect));
                  }} className="h-8 text-sm" />
                </div>
                <Button variant={lockAspect ? "default" : "outline"} size="sm"
                  onClick={() => setLockAspect(!lockAspect)} className="w-full text-xs cursor-pointer">
                  {lockAspect ? "🔒 Locked" : "🔓 Free"}
                </Button>
              </div>
            )}

            {mode === "rotate" && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-stone-600">Rotation: {rotation}°</p>
                <Button variant="outline" size="sm" onClick={() => setRotation((r) => r - 90)}
                  className="w-full flex items-center gap-1 text-xs cursor-pointer">
                  <RotateCcw className="w-3 h-3" /> 90° CCW
                </Button>
                <Button variant="outline" size="sm" onClick={() => setRotation((r) => r + 90)}
                  className="w-full flex items-center gap-1 text-xs cursor-pointer">
                  <RotateCw className="w-3 h-3" /> 90° CW
                </Button>
                <Button variant="outline" size="sm" onClick={() => setRotation(0)}
                  className="w-full text-xs cursor-pointer">Reset</Button>
              </div>
            )}

            {/* Save as */}
            <div className="pt-2 border-t border-border space-y-1.5">
              <p className="text-xs font-medium text-stone-600">Save as</p>
              <Button variant={saveAs === "new" ? "default" : "outline"} size="sm"
                onClick={() => setSaveAs("new")} className="w-full text-xs cursor-pointer">New Image</Button>
              <Button variant={saveAs === "replace" ? "default" : "outline"} size="sm"
                onClick={() => setSaveAs("replace")} className="w-full text-xs cursor-pointer">Replace Original</Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="cursor-pointer">Cancel</Button>
          <Button onClick={handleApply} disabled={editMutation.isPending} className="cursor-pointer">
            {editMutation.isPending ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing…</>
            ) : (
              `Apply & ${saveAs === "new" ? "Save as New" : "Replace"}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── ReplaceModal ─────────────────────────────────────────────────────────────

function ReplaceModal({
  item,
  onClose,
  onDone,
}: {
  item: MediaItem;
  onClose: () => void;
  onDone: (updated: MediaItem, postsUpdated: number) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const { data: usageData } = trpc.media.checkUsage.useQuery(
    { id: item.id },
    { staleTime: 5 * 60 * 1000, retry: false }
  );

  const replaceMutation = trpc.media.replaceWithNew.useMutation({
    onSuccess: (result) => {
      toast.success(`Image replaced. ${result.postsUpdated} post(s) updated.`);
      onDone(result.item as MediaItem, result.postsUpdated);
    },
    onError: (err) => toast.error(err.message),
  });

  const handleFileChange = (f: File) => {
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const handleReplace = () => {
    if (!file || !preview) return;
    const base64 = preview.split(",")[1];
    replaceMutation.mutate({ id: item.id, fileName: file.name, fileBase64: base64, mimeType: file.type });
  };

  const usageCount = usageData?.usageCount ?? 0;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Replace Image</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-stone-600 mb-1">Current</p>
              <div className="aspect-video bg-stone-100 rounded overflow-hidden flex items-center justify-center border border-stone-200">
                <img src={item.url} alt="current" className="max-w-full max-h-full object-contain" />
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-stone-600 mb-1">New</p>
              <div
                className="aspect-video bg-stone-100 rounded overflow-hidden flex items-center justify-center border-2 border-dashed border-stone-300 cursor-pointer hover:border-primary transition-colors"
                onClick={() => document.getElementById("replace-file-input")?.click()}
              >
                {preview ? (
                  <img src={preview} alt="new" className="max-w-full max-h-full object-contain" />
                ) : (
                  <div className="text-center text-stone-400 text-xs p-2">
                    <Upload className="w-5 h-5 mx-auto mb-1" />
                    Click to select
                  </div>
                )}
              </div>
              <input id="replace-file-input" type="file" accept="image/*" className="hidden"
                onChange={(e) => { if (e.target.files?.[0]) handleFileChange(e.target.files[0]); }} />
            </div>
          </div>

          {usageCount > 0 && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded text-sm text-amber-800">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">This will modify {usageCount} published post(s).</p>
                <p className="text-xs mt-1">All occurrences of the current image URL will be replaced with the new one.</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-2 p-3 bg-stone-50 border border-stone-200 rounded text-xs text-stone-600">
            <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
            <span>{CDN_WARNING}</span>
          </div>

          {file && (
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
              I understand this action {usageCount > 0 ? `will update ${usageCount} post(s) and ` : ""}cannot be undone
            </label>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="cursor-pointer">Cancel</Button>
          <Button onClick={handleReplace} disabled={!file || !confirmed || replaceMutation.isPending}
            className="cursor-pointer">
            {replaceMutation.isPending ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Replacing…</>
            ) : "Replace Image"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── BulkDeleteModal ──────────────────────────────────────────────────────────

function BulkDeleteModal({
  ids,
  totalInUse,
  onClose,
  onConfirm,
  isPending,
}: {
  ids: number[];
  totalInUse: number;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
}) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete {ids.length} Image{ids.length !== 1 ? "s" : ""}?</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {totalInUse > 0 && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>
                <span className="font-medium">{totalInUse} of these images are used in published posts.</span>{" "}
                Deleting them will break those images.
              </p>
            </div>
          )}
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
            <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
            <span>{CDN_WARNING}</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="cursor-pointer">Cancel</Button>
          <Button onClick={onConfirm} disabled={isPending}
            className="bg-red-600 hover:bg-red-700 text-white cursor-pointer">
            {isPending ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Deleting…</>
            ) : `Delete ${ids.length} Image${ids.length !== 1 ? "s" : ""}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminMediaLibrary() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<UploadFileState[]>([]);
  const [showProgress, setShowProgress] = useState(false);
  const [isBackpopulating, setIsBackpopulating] = useState(false);

  // Phase 3: bulk selection
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [anchorId, setAnchorId] = useState<number | null>(null);
  const [showBulkDelete, setShowBulkDelete] = useState(false);
  const [bulkUsageTotalInUse, setBulkUsageTotalInUse] = useState(0);

  // Phase 3: edit/replace modals
  const [editItem, setEditItem] = useState<MediaItem | null>(null);
  const [replaceItem, setReplaceItem] = useState<MediaItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragCounterRef = useRef(0);

  const utils = trpc.useUtils();

  const { data, isLoading, refetch } = trpc.media.list.useQuery(
    { search: debouncedSearch || undefined, limit: 200, offset: 0 },
    { staleTime: 30 * 1000, retry: false }
  );

  const backpopulateMutation = trpc.media.backpopulateDimensions.useMutation({
    onSuccess: (result) => {
      setIsBackpopulating(false);
      if (result.dryRun) return;
      toast.success(
        `Back-populated ${result.processed} image${result.processed !== 1 ? "s" : ""}` +
          (result.failed > 0 ? ` (${result.failed} failed)` : "")
      );
      utils.media.list.invalidate();
    },
    onError: (err) => { setIsBackpopulating(false); toast.error(err.message); },
  });

  const bulkDeleteMutation = trpc.media.bulkDelete.useMutation({
    onSuccess: (result) => {
      toast.success(`${result.deleted} image${result.deleted !== 1 ? "s" : ""} removed from catalogue`);
      setSelectedIds(new Set());
      setAnchorId(null);
      setShowBulkDelete(false);
      utils.media.list.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const checkBulkUsage = trpc.media.checkBulkUsage.useQuery(
    { ids: Array.from(selectedIds) },
    { enabled: false }
  );

  const items: MediaItem[] = (data?.items ?? []) as MediaItem[];
  const total = data?.total ?? 0;
  const nullDimensionCount = items.filter((i) => i.width === null).length;
  const anySelected = selectedIds.size > 0;

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

  // Keyboard shortcuts: Escape clears selection, Cmd+A selects all
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedIds(new Set());
        setAnchorId(null);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "a" && items.length > 0) {
        e.preventDefault();
        setSelectedIds(new Set(items.map((i) => i.id)));
        setAnchorId(items[0].id);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [items]);

  // Checkbox click with shift+click range select
  const handleCheckboxClick = useCallback((item: MediaItem, e: React.MouseEvent) => {
    const id = item.id;
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (e.shiftKey && anchorId !== null) {
        const allIds = items.map((i) => i.id);
        const anchorIdx = allIds.indexOf(anchorId);
        const clickIdx = allIds.indexOf(id);
        const [from, to] = anchorIdx < clickIdx ? [anchorIdx, clickIdx] : [clickIdx, anchorIdx];
        for (let i = from; i <= to; i++) next.add(allIds[i]);
      } else {
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setAnchorId(id);
      }
      return next;
    });
  }, [anchorId, items]);

  const handleBulkDeleteClick = async () => {
    const result = await checkBulkUsage.refetch();
    setBulkUsageTotalInUse(result.data?.totalInUse ?? 0);
    setShowBulkDelete(true);
  };

  // Upload logic
  const processFiles = useCallback(
    async (files: File[]) => {
      const validFiles: UploadFileState[] = [];
      for (const file of files) {
        const error = validateFile(file);
        validFiles.push({
          id: `${Date.now()}-${Math.random()}`,
          file,
          status: error ? "error" : "pending",
          error: error ?? undefined,
        });
      }
      setUploadFiles((prev) => [...prev, ...validFiles]);
      setShowProgress(true);

      for (const entry of validFiles) {
        if (entry.status === "error") continue;
        setUploadFiles((prev) => prev.map((f) => f.id === entry.id ? { ...f, status: "uploading" } : f));
        try {
          const fileBase64 = await fileToBase64(entry.file);
          const result = await utils.client.media.upload.mutate({
            fileName: entry.file.name,
            fileBase64,
            mimeType: entry.file.type || "application/octet-stream",
          });
          setUploadFiles((prev) => prev.map((f) =>
            f.id === entry.id ? { ...f, status: "done", result: result as MediaItem } : f
          ));
        } catch (err) {
          const message = err instanceof Error ? err.message : "Upload failed";
          setUploadFiles((prev) => prev.map((f) =>
            f.id === entry.id ? { ...f, status: "error", error: message } : f
          ));
        }
      }
      utils.media.list.invalidate();
    },
    [utils]
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) processFiles(files);
    e.target.value = "";
  };

  // Drag-and-drop
  useEffect(() => {
    const onDragEnter = (e: DragEvent) => { e.preventDefault(); dragCounterRef.current++; if (dragCounterRef.current === 1) setIsDragging(true); };
    const onDragLeave = (e: DragEvent) => { e.preventDefault(); dragCounterRef.current--; if (dragCounterRef.current === 0) setIsDragging(false); };
    const onDragOver = (e: DragEvent) => e.preventDefault();
    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      dragCounterRef.current = 0;
      setIsDragging(false);
      const files = Array.from(e.dataTransfer?.files ?? []);
      if (files.length > 0) processFiles(files);
    };
    document.addEventListener("dragenter", onDragEnter);
    document.addEventListener("dragleave", onDragLeave);
    document.addEventListener("dragover", onDragOver);
    document.addEventListener("drop", onDrop);
    return () => {
      document.removeEventListener("dragenter", onDragEnter);
      document.removeEventListener("dragleave", onDragLeave);
      document.removeEventListener("dragover", onDragOver);
      document.removeEventListener("drop", onDrop);
    };
  }, [processFiles]);

  // Clipboard paste
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const pasteItems = Array.from(e.clipboardData?.items ?? []);
      const imageItems = pasteItems.filter((item) => item.type.startsWith("image/"));
      if (imageItems.length === 0) return;
      const files = imageItems.map((item) => item.getAsFile()).filter((f): f is File => f !== null);
      if (files.length > 0) { e.preventDefault(); processFiles(files); }
    };
    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
  }, [processFiles]);

  const handleBackpopulate = () => {
    setIsBackpopulating(true);
    backpopulateMutation.mutate({ dryRun: false });
  };

  return (
    <AdminLayout activeId="media-library">
      <div className="flex flex-col h-full">
        <DragDropOverlay visible={isDragging} />

        <input ref={fileInputRef} type="file" multiple
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,application/pdf"
          className="hidden" onChange={handleFileInputChange} />

        {/* Page header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-stone-800">Media Library</h1>
            <p className="text-sm text-stone-500 mt-0.5">
              {total} image{total !== 1 ? "s" : ""} in the catalogue
              {nullDimensionCount > 0 && (
                <span className="ml-2 text-amber-600">· {nullDimensionCount} missing dimensions</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {nullDimensionCount > 0 && (
              <Button variant="outline" size="sm" onClick={handleBackpopulate} disabled={isBackpopulating}
                className="text-amber-700 border-amber-200 hover:bg-amber-50 cursor-pointer">
                {isBackpopulating ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5 mr-1.5" />}
                Fix Dimensions
              </Button>
            )}
            <Button onClick={() => fileInputRef.current?.click()}
              className="bg-primary hover:bg-primary/90 text-white cursor-pointer" size="sm">
              <Upload className="w-4 h-4 mr-1.5" /> Upload
            </Button>
          </div>
        </div>

        {/* Bulk actions bar */}
        {anySelected && (
          <div className="flex items-center gap-3 px-4 py-2 mb-3 bg-primary/5 border border-primary/20 rounded-lg">
            <CheckSquare className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{selectedIds.size} selected</span>
            <Button variant="outline" size="sm" onClick={handleBulkDeleteClick}
              className="text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1 text-xs cursor-pointer">
              <Trash2 className="w-3 h-3" /> Delete Selected
            </Button>
            <Button variant="outline" size="sm" onClick={() => { setSelectedIds(new Set()); setAnchorId(null); }}
              className="flex items-center gap-1 text-xs cursor-pointer">
              <X className="w-3 h-3" /> Clear
            </Button>
            <span className="text-xs text-stone-400 ml-auto hidden sm:block">
              Shift+click for range · {navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}+A for all · Esc to clear
            </span>
          </div>
        )}

        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input value={search} onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by filename, alt text, title..." className="pl-9 h-9" />
            {search && (
              <button onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-1 border border-stone-200 rounded-md p-0.5">
            <button onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded cursor-pointer transition-colors ${viewMode === "grid" ? "bg-stone-100 text-stone-800" : "text-stone-400 hover:text-stone-600"}`}>
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode("list")}
              className={`p-1.5 rounded cursor-pointer transition-colors ${viewMode === "list" ? "bg-stone-100 text-stone-800" : "text-stone-400 hover:text-stone-600"}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-1 gap-0 overflow-hidden border border-stone-200 rounded-lg bg-white">
          <div className="flex-1 overflow-y-auto p-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-48 text-stone-400">
                <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading media...
              </div>
            ) : items.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center h-48 text-stone-400 border-2 border-dashed border-stone-200 rounded-lg cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <CloudUpload className="w-12 h-12 mb-3 opacity-30" />
                <p className="text-sm font-medium">
                  {debouncedSearch ? "No images match your search" : "Drop files here or click to upload"}
                </p>
                <p className="text-xs mt-1 text-stone-400">
                  {debouncedSearch ? "Try a different search term" : `JPEG, PNG, WebP, GIF, SVG, PDF · Max ${MAX_FILE_SIZE_MB} MB each`}
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <MediaGrid items={items} selectedId={selectedItem?.id ?? null}
                selectedIds={selectedIds} anySelected={anySelected}
                onSelect={handleSelect} onCheckboxClick={handleCheckboxClick} />
            ) : (
              <MediaListView items={items} selectedId={selectedItem?.id ?? null}
                selectedIds={selectedIds} anySelected={anySelected}
                onSelect={handleSelect} onCheckboxClick={handleCheckboxClick} />
            )}
          </div>

          {/* Detail panel */}
          {selectedItem && (
            <DetailPanel
              key={selectedItem.id}
              item={selectedItem}
              onClose={() => setSelectedItem(null)}
              onDeleted={handleDeleted}
              onOpenEdit={(item) => setEditItem(item)}
              onOpenReplace={(item) => setReplaceItem(item)}
              onItemUpdated={(updated) => setSelectedItem(updated)}
            />
          )}
        </div>
      </div>

      {/* Upload progress panel */}
      {showProgress && uploadFiles.length > 0 && (
        <UploadProgressPanel
          files={uploadFiles}
          onRemove={(id) => setUploadFiles((prev) => prev.filter((f) => f.id !== id))}
          onClose={() => { setShowProgress(false); setUploadFiles([]); }}
        />
      )}

      {/* Edit modal */}
      {editItem && (
        <ImageEditModal item={editItem} onClose={() => setEditItem(null)}
          onDone={(newItem) => { setEditItem(null); setSelectedItem(newItem); refetch(); }} />
      )}

      {/* Replace modal */}
      {replaceItem && (
        <ReplaceModal item={replaceItem} onClose={() => setReplaceItem(null)}
          onDone={(updated, postsUpdated) => {
            setReplaceItem(null);
            setSelectedItem(updated);
            refetch();
            if (postsUpdated > 0) toast.success(`${postsUpdated} post(s) updated with new image URL`);
          }} />
      )}

      {/* Bulk delete modal */}
      {showBulkDelete && (
        <BulkDeleteModal
          ids={Array.from(selectedIds)}
          totalInUse={bulkUsageTotalInUse}
          onClose={() => setShowBulkDelete(false)}
          onConfirm={() => bulkDeleteMutation.mutate({ ids: Array.from(selectedIds) })}
          isPending={bulkDeleteMutation.isPending}
        />
      )}
    </AdminLayout>
  );
}
