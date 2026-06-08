import { useState, useEffect } from "react";
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
import { Link as LinkIcon } from "lucide-react";
import type { Editor } from "@tiptap/react";

interface EditorLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editor: Editor | null;
}

function isExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return !parsed.hostname.includes("dentasmart.ai");
  } catch {
    return false;
  }
}

export default function EditorLinkDialog({ open, onOpenChange, editor }: EditorLinkDialogProps) {
  const [url, setUrl] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [openInNewTab, setOpenInNewTab] = useState(false);
  const [nofollow, setNofollow] = useState(false);

  // Populate from existing link when dialog opens
  useEffect(() => {
    if (open && editor) {
      const attrs = editor.getAttributes("link");
      const existingUrl = attrs.href || "";
      setUrl(existingUrl);

      const rel: string = attrs.rel || "";
      setNofollow(rel.includes("nofollow"));
      setOpenInNewTab(attrs.target === "_blank");

      // Get selected text as display text suggestion
      const { from, to } = editor.state.selection;
      const selectedText = editor.state.doc.textBetween(from, to, "");
      setDisplayText(selectedText || "");
    }
  }, [open, editor]);

  // Auto-suggest nofollow for external URLs
  useEffect(() => {
    if (url && isExternalUrl(url)) {
      setNofollow(true);
      setOpenInNewTab(true);
    } else if (url && !isExternalUrl(url)) {
      setNofollow(false);
      setOpenInNewTab(false);
    }
  }, [url]);

  const handleSubmit = () => {
    if (!editor) return;

    if (!url.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      onOpenChange(false);
      return;
    }

    const relParts: string[] = ["noopener", "noreferrer"];
    if (nofollow) relParts.push("nofollow");

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url.trim(),
        target: openInNewTab ? "_blank" : null,
        rel: relParts.join(" "),
      })
      .run();

    onOpenChange(false);
    resetState();
  };

  const handleRemove = () => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    onOpenChange(false);
    resetState();
  };

  const resetState = () => {
    setUrl("");
    setDisplayText("");
    setOpenInNewTab(false);
    setNofollow(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    resetState();
  };

  const isExisting = editor?.isActive("link");

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-primary" />
            {isExisting ? "Edit Link" : "Insert Link"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* URL */}
          <div>
            <Label className="text-sm text-stone-600 mb-1 block">URL *</Label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              autoFocus
            />
          </div>

          {/* Display text (informational — TipTap handles selection) */}
          {displayText && (
            <div>
              <Label className="text-sm text-stone-600 mb-1 block">Selected text</Label>
              <div className="text-sm text-stone-500 bg-stone-50 rounded-md px-3 py-2 border border-stone-200 truncate">
                {displayText}
              </div>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={openInNewTab}
                onChange={(e) => setOpenInNewTab(e.target.checked)}
                className="w-4 h-4 rounded border-stone-300 text-primary accent-primary cursor-pointer"
              />
              <span className="text-sm text-stone-700 group-hover:text-stone-900">
                Open in new tab
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={nofollow}
                onChange={(e) => setNofollow(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-stone-300 text-primary accent-primary cursor-pointer"
              />
              <div>
                <span className="text-sm text-stone-700 group-hover:text-stone-900 block">
                  Add nofollow
                </span>
                {url && isExternalUrl(url) && (
                  <span className="text-xs text-amber-600">
                    Suggested — external link detected
                  </span>
                )}
              </div>
            </label>
          </div>
        </div>

        <DialogFooter className="mt-4">
          {isExisting && (
            <Button
              variant="outline"
              onClick={handleRemove}
              className="text-red-600 border-red-200 hover:bg-red-50 cursor-pointer mr-auto"
            >
              Remove Link
            </Button>
          )}
          <Button variant="outline" onClick={handleClose} className="cursor-pointer">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
          >
            {url.trim() ? (isExisting ? "Update Link" : "Apply Link") : "Remove Link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
