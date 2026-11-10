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
import { editorLinkHasNoFollow, editorLinkRel, isExternalEditorLink, validEditorLinkHref } from "@shared/editorLinkPolicy";

interface EditorLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editor: Editor | null;
}

export default function EditorLinkDialog({ open, onOpenChange, editor }: EditorLinkDialogProps) {
  const [url, setUrl] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [openInNewTab, setOpenInNewTab] = useState(false);
  const [nofollow, setNofollow] = useState(false);

  const [error, setError] = useState("");
  const [nofollowEdited, setNofollowEdited] = useState(false);
  const [tabEdited, setTabEdited] = useState(false);
  const [wasExisting, setWasExisting] = useState(false);

  // Read the mark ONCE when opened; changing the URL must not overwrite a
  // person's custom nofollow/new-tab choices on an existing link.
  useEffect(() => {
    if (!open || !editor) return;
    const existing = editor.isActive("link");
    const attrs = existing ? editor.getAttributes("link") : {};
    const existingUrl: string = attrs.href || "";
    setWasExisting(existing);
    setUrl(existingUrl);
    setNofollow(existing ? editorLinkHasNoFollow(attrs.rel) : false);
    setOpenInNewTab(existing ? attrs.target === "_blank" : false);
    setNofollowEdited(existing);
    setTabEdited(existing);
    setError("");
    const { from, to } = editor.state.selection;
    setDisplayText(editor.state.doc.textBetween(from, to, "") || "");
  }, [open, editor]);

  const handleUrlChange = (value: string) => {
    setUrl(value);
    setError("");
    if (!wasExisting) {
      // External nofollow is a suggestion, never mandatory.
      if (!nofollowEdited) setNofollow(isExternalEditorLink(value));
      if (!tabEdited) setOpenInNewTab(isExternalEditorLink(value));
    }
  };

  const handleSubmit = () => {
    if (!editor) return;
    const href = validEditorLinkHref(url);
    if (!url.trim()) {
      if (wasExisting) editor.chain().focus().extendMarkRange("link").unsetLink().run();
      onOpenChange(false);
      resetState();
      return;
    }
    if (!href) {
      setError("Enter a valid https:// URL, a website-relative /path, or a #section link.");
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({
      href,
      target: openInNewTab ? "_blank" : null,
      rel: editorLinkRel(nofollow, openInNewTab),
    }).run();
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
    setNofollowEdited(false);
    setTabEdited(false);
    setWasExisting(false);
    setError("");
  };

  const handleClose = () => {
    onOpenChange(false);
    resetState();
  };

  const isExisting = wasExisting;

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
              onChange={(e) => handleUrlChange(e.target.value)}
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

          {error && <p role="alert" className="text-xs text-red-700">{error}</p>}

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
                onChange={(e) => { setTabEdited(true); setOpenInNewTab(e.target.checked); }}
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
                onChange={(e) => { setNofollowEdited(true); setNofollow(e.target.checked); }}
                className="w-4 h-4 mt-0.5 rounded border-stone-300 text-primary accent-primary cursor-pointer"
              />
              <div>
                <span className="text-sm text-stone-700 group-hover:text-stone-900 block">
                  Add rel="nofollow" to this link
                </span>
                {url && isExternalEditorLink(url) && (
                  <span className="text-xs text-amber-600">
                    Suggested for external links; you can turn it off.
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
