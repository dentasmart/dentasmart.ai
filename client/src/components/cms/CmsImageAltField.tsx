/**
 * Keep alt on the specific CMS image placement and maintain a reusable Media
 * Library default. Only a deliberate field edit saves the library default;
 * selecting an image or marking this placement decorative does not overwrite it.
 */
import { useEffect, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { CmsImage } from "@shared/cmsBlocks";
import { shouldSaveMediaAltDefault } from "@shared/mediaAltPolicy";

export default function CmsImageAltField({ image, onChange, label = "Image alt text" }: {
  image: CmsImage;
  onChange: (image: CmsImage) => void;
  label?: string;
}) {
  const utils = trpc.useUtils();
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const saved = useRef({ key: image.mediaId + ":" + image.url, alt: image.altText });
  const update = trpc.media.update.useMutation();

  useEffect(() => {
    const key = image.mediaId + ":" + image.url;
    if (saved.current.key !== key) {
      saved.current = { key, alt: image.altText };
      setState("idle");
    }
  }, [image.mediaId, image.url]);

  const saveDefault = async () => {
    // URL-only images have no library record. Decorative status belongs to the
    // placement, not the shared file, and must not erase a useful library default.
    if (!shouldSaveMediaAltDefault(image.mediaId, saved.current.alt, image.altText, image.decorative)) return;
    const altText = image.altText;
    setState("saving");
    try {
      // Avoid bumping this open draft's revision: the editor will save its
      // own snapshot. Other saved drafts are synchronized by the server.
      const query = new URLSearchParams(window.location.search);
      const slug = query.get("slug");
      const originCms = slug ? { hubId: query.get("hub") || "conditions", slug } : undefined;
      const payload = { id: image.mediaId!, altText, originCms };
      try {
        await update.mutateAsync(payload);
      } catch (error) {
        if (!(error instanceof Error) || !error.message.includes("MULTIPLE_USE_CONFIRMATION_REQUIRED") ||
          !window.confirm("This image is used in more than one page. Update its alt text in all saved drafts?")) throw error;
        await update.mutateAsync({ ...payload, confirmMultiple: true });
      }
      saved.current.alt = altText;
      setState("saved");
      await utils.media.list.invalidate();
      toast.success("Alt text saved to Media Library");
    } catch (error) {
      setState("error");
      toast.error(error instanceof Error ? error.message : "Could not save alt text to Media Library");
    }
  };

  return <div className="space-y-1">
    <Label className="text-sm text-stone-600">{label}</Label>
    <Input value={image.altText} maxLength={500} disabled={state === "saving"}
      placeholder="Describe what the image shows"
      onChange={event => {
        const altText = event.target.value;
        setState("idle");
        // Do not add decorative:false to an ordinary image: that would make
        // a pure alt edit look like an unsaved CMS draft change.
        onChange({ ...image, altText,
          ...(altText.trim() && image.decorative ? { decorative: false } : {}),
        });
      }}
      onBlur={() => { void saveDefault(); }} />
    {image.mediaId && !image.decorative && <p className="text-xs text-stone-500">
      {state === "saving" ? "Saving to Media Library…" : state === "saved" ? "Saved in Media Library" :
        state === "error" ? "Could not save to Media Library. Edit and leave the field to retry." :
        "Changes save to the Media Library when you leave this field."}
    </p>}
    {!image.mediaId && <p className="text-xs text-stone-500">
      URL image: alt text saves with this page only (not linked to the Media Library).
    </p>}
  </div>;
}
