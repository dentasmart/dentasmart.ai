import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Upload, Link as LinkIcon, Loader2, ImageIcon, X, Library, Search, Check } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface ImageUploadModalProps {
  open: boolean;
  onClose: () => void;
  onInsert: (url: string, alt?: string) => void;
  /** Which tab to open by default. Defaults to "upload". */
  defaultTab?: "upload" | "url" | "library";
}

export default function ImageUploadModal({ open, onClose, onInsert, defaultTab = "upload" }: ImageUploadModalProps) {
  const [tab, setTab] = useState(defaultTab);
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Library tab state
  const [librarySearch, setLibrarySearch] = useState("");
  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null);
  const [libraryAlt, setLibraryAlt] = useState("");

  const uploadMutation = trpc.blog.uploadImage.useMutation();

  // Fetch media items for library tab (only when tab is active and modal is open)
  const { data: mediaData, isLoading: mediaLoading } = trpc.media.list.useQuery(
    { search: librarySearch || undefined, limit: 100 },
    { enabled: open && tab === "library", retry: false, staleTime: 30_000 }
  );

  const mediaItems = mediaData?.items ?? [];
  const selectedMedia = mediaItems.find((m) => m.id === selectedMediaId) ?? null;

  const resetState = useCallback(() => {
    setImageUrl("");
    setAltText("");
    setPreview(null);
    setSelectedFile(null);
    setDragOver(false);
    setTab(defaultTab);
    setLibrarySearch("");
    setSelectedMediaId(null);
    setLibraryAlt("");
  }, [defaultTab]);

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleUploadAndInsert = async () => {
    if (!selectedFile) return;
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string).split(",")[1];
        const result = await uploadMutation.mutateAsync({
          fileName: selectedFile.name,
          fileBase64: base64,
          mimeType: selectedFile.type,
        });
        onInsert(result.url, altText || undefined);
        handleClose();
      };
      reader.readAsDataURL(selectedFile);
    } catch {
      // Error handled by mutation
    }
  };

  const handleUrlInsert = () => {
    if (!imageUrl.trim()) return;
    onInsert(imageUrl.trim(), altText || undefined);
    handleClose();
  };

  const handleLibraryInsert = () => {
    if (!selectedMedia) return;
    const src = selectedMedia.mediumUrl || selectedMedia.url;
    const alt = libraryAlt || selectedMedia.altText || selectedMedia.filename;
    onInsert(src, alt || undefined);
    handleClose();
  };

  const handleSelectMedia = (id: number) => {
    setSelectedMediaId(id);
    const item = mediaItems.find((m) => m.id === id);
    if (item) setLibraryAlt(item.altText || "");
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            Insert Image
          </DialogTitle>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="mt-2 flex flex-col flex-1 min-h-0">
          <TabsList className="w-full shrink-0">
            <TabsTrigger value="upload" className="flex-1 cursor-pointer">
              <Upload className="w-4 h-4 mr-1.5" />
              Upload File
            </TabsTrigger>
            <TabsTrigger value="url" className="flex-1 cursor-pointer">
              <LinkIcon className="w-4 h-4 mr-1.5" />
              Paste URL
            </TabsTrigger>
            <TabsTrigger value="library" className="flex-1 cursor-pointer">
              <Library className="w-4 h-4 mr-1.5" />
              Media Library
            </TabsTrigger>
          </TabsList>

          {/* ── Upload Tab ─────────────────────────────────────────────── */}
          <TabsContent value="upload" className="mt-4 space-y-4">
            {!preview ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  dragOver
                    ? "border-primary bg-primary/5"
                    : "border-stone-300 hover:border-primary/50 hover:bg-stone-50"
                }`}
              >
                <Upload className="w-10 h-10 mx-auto mb-3 text-stone-400" />
                <p className="text-sm font-medium text-stone-700">Drag and drop an image here</p>
                <p className="text-xs text-stone-500 mt-1">or click to browse from your computer</p>
                <p className="text-xs text-stone-400 mt-2">PNG, JPG, GIF, WebP up to 5MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />
              </div>
            ) : (
              <div className="relative">
                <div className="rounded-xl overflow-hidden border border-stone-200 bg-stone-50">
                  <img src={preview} alt="Preview" className="max-h-48 mx-auto object-contain" />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-stone-500 truncate max-w-[200px]">{selectedFile?.name}</span>
                  <Button variant="ghost" size="sm" onClick={clearFile} className="text-stone-500 hover:text-red-600 cursor-pointer">
                    <X className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            )}
            <div>
              <Label className="text-sm text-stone-600">Alt Text (optional)</Label>
              <Input value={altText} onChange={(e) => setAltText(e.target.value)} placeholder="Describe the image for accessibility..." className="mt-1" />
            </div>
          </TabsContent>

          {/* ── URL Tab ────────────────────────────────────────────────── */}
          <TabsContent value="url" className="mt-4 space-y-4">
            <div>
              <Label className="text-sm text-stone-600">Image URL</Label>
              <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" className="mt-1" />
            </div>
            {imageUrl && (
              <div className="rounded-xl overflow-hidden border border-stone-200 bg-stone-50 p-2">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="max-h-48 mx-auto object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            )}
            <div>
              <Label className="text-sm text-stone-600">Alt Text (optional)</Label>
              <Input value={altText} onChange={(e) => setAltText(e.target.value)} placeholder="Describe the image for accessibility..." className="mt-1" />
            </div>
          </TabsContent>

          {/* ── Library Tab ────────────────────────────────────────────── */}
          <TabsContent value="library" className="mt-4 flex flex-col gap-3 min-h-0 flex-1">
            {/* Search */}
            <div className="relative shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <Input
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
                placeholder="Search by filename, alt text, title..."
                className="pl-9"
              />
            </div>

            {/* Grid */}
            <div className="overflow-y-auto flex-1 min-h-0" style={{ maxHeight: "280px" }}>
              {mediaLoading ? (
                <div className="flex items-center justify-center h-32 text-stone-400">
                  <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  Loading library...
                </div>
              ) : mediaItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-stone-400 text-sm">
                  <Library className="w-8 h-8 mb-2 opacity-40" />
                  {librarySearch ? "No images match your search" : "No images in library yet"}
                </div>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 p-1">
                  {mediaItems.map((item) => {
                    const thumb = item.thumbnailUrl || item.url;
                    const isSelected = item.id === selectedMediaId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectMedia(item.id)}
                        title={item.filename}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer group ${
                          isSelected
                            ? "border-primary ring-2 ring-primary/30"
                            : "border-stone-200 hover:border-primary/50"
                        }`}
                      >
                        <img src={thumb} alt={item.altText || item.filename} className="w-full h-full object-cover" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 text-white" />
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Selected image alt text override */}
            {selectedMedia && (
              <div className="shrink-0 border-t border-stone-100 pt-3 space-y-2">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedMedia.thumbnailUrl || selectedMedia.url}
                    alt={selectedMedia.altText || selectedMedia.filename}
                    className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-stone-700 truncate">{selectedMedia.filename}</p>
                    {selectedMedia.width && selectedMedia.height && (
                      <p className="text-xs text-stone-400">{selectedMedia.width} × {selectedMedia.height}px</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-stone-600">Alt Text</Label>
                  <Input
                    value={libraryAlt}
                    onChange={(e) => setLibraryAlt(e.target.value)}
                    placeholder="Describe the image for accessibility..."
                    className="mt-1"
                  />
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4 shrink-0">
          <Button variant="outline" onClick={handleClose} className="cursor-pointer">
            Cancel
          </Button>
          {tab === "upload" && (
            <Button
              onClick={handleUploadAndInsert}
              disabled={!selectedFile || uploadMutation.isPending}
              className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
            >
              {uploadMutation.isPending ? (
                <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" />Uploading...</>
              ) : (
                <><Upload className="w-4 h-4 mr-1.5" />Upload & Insert</>
              )}
            </Button>
          )}
          {tab === "url" && (
            <Button
              onClick={handleUrlInsert}
              disabled={!imageUrl.trim()}
              className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 mr-1.5" />
              Insert Image
            </Button>
          )}
          {tab === "library" && (
            <Button
              onClick={handleLibraryInsert}
              disabled={!selectedMediaId}
              className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 mr-1.5" />
              Insert Selected
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
