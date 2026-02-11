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
import { Upload, Link as LinkIcon, Loader2, ImageIcon, X } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface ImageUploadModalProps {
  open: boolean;
  onClose: () => void;
  onInsert: (url: string, alt?: string) => void;
}

export default function ImageUploadModal({ open, onClose, onInsert }: ImageUploadModalProps) {
  const [tab, setTab] = useState("upload");
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = trpc.blog.uploadImage.useMutation();

  const resetState = useCallback(() => {
    setImageUrl("");
    setAltText("");
    setPreview(null);
    setSelectedFile(null);
    setDragOver(false);
    setTab("upload");
  }, []);

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
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
    } catch (err) {
      // Error handled by mutation
    }
  };

  const handleUrlInsert = () => {
    if (!imageUrl.trim()) return;
    onInsert(imageUrl.trim(), altText || undefined);
    handleClose();
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            Insert Image
          </DialogTitle>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab} className="mt-2">
          <TabsList className="w-full">
            <TabsTrigger value="upload" className="flex-1 cursor-pointer">
              <Upload className="w-4 h-4 mr-1.5" />
              Upload File
            </TabsTrigger>
            <TabsTrigger value="url" className="flex-1 cursor-pointer">
              <LinkIcon className="w-4 h-4 mr-1.5" />
              Paste URL
            </TabsTrigger>
          </TabsList>

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
                <p className="text-sm font-medium text-stone-700">
                  Drag and drop an image here
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  or click to browse from your computer
                </p>
                <p className="text-xs text-stone-400 mt-2">
                  PNG, JPG, GIF, WebP up to 5MB
                </p>
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
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-48 mx-auto object-contain"
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-stone-500 truncate max-w-[200px]">
                    {selectedFile?.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFile}
                    className="text-stone-500 hover:text-red-600 cursor-pointer"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            )}

            <div>
              <Label className="text-sm text-stone-600">Alt Text (optional)</Label>
              <Input
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Describe the image for accessibility..."
                className="mt-1"
              />
            </div>
          </TabsContent>

          <TabsContent value="url" className="mt-4 space-y-4">
            <div>
              <Label className="text-sm text-stone-600">Image URL</Label>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="mt-1"
              />
            </div>

            {imageUrl && (
              <div className="rounded-xl overflow-hidden border border-stone-200 bg-stone-50 p-2">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="max-h-48 mx-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}

            <div>
              <Label className="text-sm text-stone-600">Alt Text (optional)</Label>
              <Input
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Describe the image for accessibility..."
                className="mt-1"
              />
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={handleClose} className="cursor-pointer">
            Cancel
          </Button>
          {tab === "upload" ? (
            <Button
              onClick={handleUploadAndInsert}
              disabled={!selectedFile || uploadMutation.isPending}
              className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
            >
              {uploadMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-1.5" />
                  Upload & Insert
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleUrlInsert}
              disabled={!imageUrl.trim()}
              className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 mr-1.5" />
              Insert Image
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
