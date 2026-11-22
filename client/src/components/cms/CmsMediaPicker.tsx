import { useRef, useState } from "react";
import { ImagePlus, Search, AlertCircle, Check, Image as ImageIcon, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { CmsImage } from "@shared/cmsBlocks";

interface Props { onSelect: (image: CmsImage) => void; buttonText?: string; editAltText?: boolean }
const allowed = ["image/jpeg", "image/png", "image/webp"];
async function imageBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read this file."));
    reader.onload = () => {
      const data = typeof reader.result === "string" ? reader.result : "";
      const encoded = data.split(",")[1];
      if (!encoded) return reject(new Error("Image contents are empty."));
      resolve(encoded);
    };
    reader.readAsDataURL(file);
  });
}

export default function CmsMediaPicker({ onSelect, buttonText = "Choose from Media Library", editAltText = false }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [uploadAltText, setUploadAltText] = useState("");
  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null);
  const [selectedAltText, setSelectedAltText] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const utils = trpc.useUtils();
  const media = trpc.media.list.useQuery({ search: query.trim() || undefined, limit: 60, offset: 0 },
    { enabled: open, retry: false, refetchOnWindowFocus: false });
  const availability = trpc.cms.getMediaUploadAvailability.useQuery(
    undefined,
    { enabled: open, retry: false, refetchOnWindowFocus: false }
  );
  const upload = trpc.cms.uploadTestImage.useMutation();
  const privateUpload = trpc.cms.uploadPrivateImage.useMutation();
  const mediaUpdate = trpc.media.update.useMutation();
  const items = (media.data?.items ?? []).filter(item => item.mimeType.startsWith("image/"));
  const selectedMedia = items.find(item => item.id === selectedMediaId);
  const select = (image: CmsImage) => {
    onSelect(image);
    setOpen(false);
    setQuery("");
    setError("");
    setSelectedMediaId(null);
    setSelectedAltText("");
  };
  const chooseExisting = async () => {
    if (!selectedMedia || mediaUpdate.isPending) return;
    setError("");
    const edited = selectedAltText.trim();
    try {
      if (edited !== (selectedMedia.altText || "")) {
        try {
          await mediaUpdate.mutateAsync({ id: selectedMedia.id, altText: edited });
        } catch (error) {
          if (!(error instanceof Error) || !error.message.includes("MULTIPLE_USE_CONFIRMATION_REQUIRED") ||
              !window.confirm("This image is used on several pages. Update ALT text in their saved drafts?")) throw error;
          await mediaUpdate.mutateAsync({ id: selectedMedia.id, altText: edited, confirmMultiple: true });
        }
        await Promise.all([utils.media.list.invalidate(), utils.media.findByUrl.invalidate()]);
        toast.success("Media Library ALT text saved.");
      }
      select({ url: selectedMedia.url, altText: edited, mediaId: selectedMedia.id });
    } catch (error) {
      setError(error instanceof Error ? error.message : "ALT text could not be saved. The image was not selected.");
    }
  };
  const uploadFile = async (file: File | undefined) => {
    if (!file) return;
    setError("");

    if (!availability.data?.enabled) {
      setError("CMS image uploads require verified private storage.");
      return;
    }
    if (!allowed.includes(file.type) || file.size > 8 * 1024 * 1024 || file.size === 0) {
      setError("Choose a JPG, PNG or WebP image smaller than 8 MB.");
      return;
    }
    try {
      const fileBase64 = await imageBase64(file);
      const altText = editAltText ? uploadAltText.trim() : "";
      const payload = { fileName: file.name, mimeType: file.type as "image/jpeg" | "image/png" | "image/webp", fileBase64, ...(editAltText ? { altText } : {}) };
      const isPrivate = availability.data?.mode === "private-storage";
      const result = isPrivate ? await privateUpload.mutateAsync(payload) : await upload.mutateAsync(payload);
      await Promise.all([utils.media.list.invalidate(), utils.media.findByUrl.invalidate()]);
      select({ url: result.url, altText, mediaId: result.id });
      setUploadAltText("");
      toast.success(availability.data?.mode === "private-storage"
        ? "Private image and ALT text saved. Save your private CMS draft to keep the selection."
        : "Test image and its Media Library ALT text saved. Save your private draft to keep the image selection.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed.");
    }
  };
  return <>
    <Button type="button" size="sm" variant="outline" onClick={() => setOpen(true)}>
      <ImagePlus className="mr-2 h-4 w-4" />{buttonText}
    </Button>
    <Dialog open={open} onOpenChange={value => {if (!upload.isPending && !privateUpload.isPending && !mediaUpdate.isPending) setOpen(value);}}>
      <DialogContent className="flex max-h-[88vh] max-w-4xl flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>Select or upload an image</DialogTitle>
          <DialogDescription>
          {availability.data?.enabled
            ? (availability.data.mode === "private-storage"
              ? "Choose from the Media Library or upload to verified private CMS storage. Private images cannot be used on published pages."
              : "Choose an image from the test Media Library or upload a new one. Uploads remain in isolated test storage.")
            : "Choose an existing Media Library image. New CMS uploads require verified private storage."}
        </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[230px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-stone-400"/>
            <Input value={query} className="pl-9" placeholder="Search images by name…" onChange={event => setQuery(event.target.value)}/>
          </div>
          <Button type="button" disabled={upload.isPending || privateUpload.isPending || !availability.data?.enabled}
            onClick={() => fileRef.current?.click()}>
            {upload.isPending || privateUpload.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Upload className="mr-2 h-4 w-4"/>}
            {upload.isPending || privateUpload.isPending ? "Uploading…" : "Upload image"}
          </Button>
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden"
            onChange={async event => {
              const file = event.target.files?.[0];
              event.target.value = "";
              await uploadFile(file);
            }}/>
        </div>
        <p className="text-xs text-stone-500">JPG, PNG or WebP · up to 8 MB. {availability.data?.enabled
          ? (availability.data.mode === "private-storage" ? "Private uploads are stored as WebP in a restricted bucket." : "Test files are converted to WebP and stored locally.")
          : "New uploads are currently disabled. Existing Media Library images can still be selected."}</p>
        {editAltText && <div className="rounded-lg border border-stone-200 bg-stone-50 p-3 space-y-1">
          <Label htmlFor="cms-picker-upload-alt" className="text-sm font-medium">ALT text for a new upload (optional)</Label>
          <Input id="cms-picker-upload-alt" value={uploadAltText} maxLength={500}
            onChange={event => setUploadAltText(event.target.value)} disabled={upload.isPending || privateUpload.isPending}
            placeholder="Describe what the image shows..." />
          <p className="text-xs text-stone-500">Enter this before clicking Upload image. It will be saved as the Media Library ALT default.</p>
        </div>}
        {error && <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0"/>{error}</div>}
        {media.error && <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-900" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0"/>Cannot load the Media Library: {media.error.message}.
        </div>}
        <div className="min-h-28 overflow-y-auto">
          {media.isLoading && <p className="p-8 text-center text-sm text-stone-500">Loading images…</p>}
          {!media.isLoading && !media.error && !items.length && <div className="py-10 text-center">
            <ImageIcon className="mx-auto mb-2 h-7 w-7 text-stone-400"/>
            <p className="text-sm font-medium text-stone-700">No matching images found</p>
            <p className="mt-1 text-xs text-stone-500">{availability.data?.enabled
              ? "Use Upload image above to add your first test image."
              : "No images match this search."}</p>
          </div>}
          <div className="grid grid-cols-2 gap-3 pb-2 sm:grid-cols-3 lg:grid-cols-4">
            {items.map(item => <button type="button" key={item.id}
              onClick={() => editAltText
                ? (setSelectedMediaId(item.id), setSelectedAltText(item.altText || ""), setError(""))
                : select({ url: item.url, altText: item.altText || "", mediaId: item.id })}
              aria-pressed={editAltText ? selectedMediaId === item.id : undefined}
              className={`group overflow-hidden rounded-lg border bg-white text-left transition-all hover:border-teal-500 hover:shadow-md focus-visible:outline-teal-600 ${editAltText && selectedMediaId === item.id ? "border-teal-600 ring-2 ring-teal-100" : "border-stone-200"}`}>
              <div className="relative flex aspect-[4/3] items-center justify-center bg-stone-100">
                {item.url ? <img src={item.thumbnailUrl || item.url} alt={item.altText || item.filename || "Media preview"}
                  loading="lazy" className="h-full w-full object-contain"/> :
                  <ImageIcon className="h-8 w-8 text-stone-400"/>}
                <Check className="absolute right-2 top-2 hidden h-6 w-6 rounded-full bg-teal-600 p-1 text-white group-hover:block"/>
              </div>
              <div className="p-2">
                <p className="truncate text-xs font-semibold text-stone-800" title={item.title || item.filename}>{item.title || item.filename}</p>
                <p className="mt-1 text-[11px] text-stone-500">
                  {item.width && item.height ? item.width + " × " + item.height : "Size unknown"} · {item.mimeType.replace("image/","").toUpperCase()}
                </p>
                {!item.altText && <p className="mt-1 text-[11px] text-amber-700">Alt text not set</p>}
              </div>
            </button>)}
          </div>
        </div>
        {editAltText && selectedMedia && <div className="space-y-2 rounded-lg border border-teal-200 bg-teal-50/40 p-3">
          <Label htmlFor="cms-picker-existing-alt" className="text-sm font-medium">Selected image ALT text (Media Library default)</Label>
          <Input id="cms-picker-existing-alt" maxLength={500} value={selectedAltText}
            onChange={event => setSelectedAltText(event.target.value)}
            placeholder="Describe what the selected image shows..." disabled={mediaUpdate.isPending} />
          <p className="text-xs text-stone-600">The existing ALT value is loaded from Media Library. Editing it updates the library and eligible saved drafts, not published content. Reused images may require confirmation.</p>
          <Button type="button" size="sm" onClick={() => void chooseExisting()} disabled={mediaUpdate.isPending}>
            {mediaUpdate.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Check className="mr-2 h-4 w-4"/>}
            {mediaUpdate.isPending ? "Saving ALT text…" : "Use selected image"}
          </Button>
        </div>}
        <p className="border-t pt-2 text-xs text-stone-500">Selecting an image updates the editor. Save the article as a private draft afterward. Media Library ALT changes save separately and do not publish anything.</p>
      </DialogContent>
    </Dialog>
  </>;
}
