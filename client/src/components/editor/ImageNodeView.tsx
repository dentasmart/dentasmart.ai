/**
 * ImageNodeView.tsx
 *
 * Custom TipTap NodeView for the Image extension.
 * Adds:
 *  - Single-click → floating action bar (Edit Alt, Replace, Caption, Delete, View in Library)
 *  - Double-click → metadata modal (filename, dimensions, size, alt editable, usage count)
 *  - Escape → close action bar
 */

import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pencil,
  RefreshCw,
  Type,
  Trash2,
  ExternalLink,
  X,
  Loader2,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ImageNodeViewProps extends NodeViewProps {
  /** Callback to open the library modal in "replace" mode */
  onOpenLibraryForReplace?: (currentSrc: string, onReplace: (url: string, alt?: string) => void) => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ImageNodeView({ node, updateAttributes, deleteNode, editor }: ImageNodeViewProps) {
  const src: string = node.attrs.src ?? "";
  const alt: string = node.attrs.alt ?? "";

  const [showActionBar, setShowActionBar] = useState(false);
  const [showMetaModal, setShowMetaModal] = useState(false);
  const [showAltEditor, setShowAltEditor] = useState(false);
  const [showCaption, setShowCaption] = useState(!!node.attrs.title);
  const [editingAlt, setEditingAlt] = useState(alt);
  const [editingCaption, setEditingCaption] = useState(node.attrs.title ?? "");
  const [showReplaceModal, setShowReplaceModal] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── Find media item by URL ───────────────────────────────────────────────
  const { data: mediaData } = trpc.media.list.useQuery(
    { limit: 200 },
    { retry: false, staleTime: 60_000, enabled: showMetaModal || showActionBar }
  );
  const mediaItem = mediaData?.items.find(
    (m) => m.url === src || m.mediumUrl === src || m.thumbnailUrl === src || m.webpUrl === src
  );

  const updateMutation = trpc.media.update.useMutation({
    onSuccess: () => toast.success("Alt text saved to library"),
    onError: () => toast.error("Failed to save alt text"),
  });

  // ─── Click handling ───────────────────────────────────────────────────────

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (clickTimer.current) {
      // Second click within 300ms → double-click
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      setShowActionBar(false);
      setShowMetaModal(true);
      return;
    }
    clickTimer.current = setTimeout(() => {
      clickTimer.current = null;
      setShowActionBar((v) => !v);
    }, 300);
  }, []);

  // Close action bar on outside click
  useEffect(() => {
    if (!showActionBar) return;
    const handleOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowActionBar(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [showActionBar]);

  // Escape closes action bar
  useEffect(() => {
    if (!showActionBar) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowActionBar(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [showActionBar]);

  // ─── Action handlers ──────────────────────────────────────────────────────

  const handleSaveAlt = () => {
    updateAttributes({ alt: editingAlt });
    setShowAltEditor(false);
    // Also update library if we found the media item
    if (mediaItem) {
      updateMutation.mutate({ id: mediaItem.id, altText: editingAlt });
    }
  };

  const handleToggleCaption = () => {
    setShowCaption((v) => {
      const next = !v;
      if (!next) updateAttributes({ title: "" });
      return next;
    });
  };

  const handleSaveCaption = () => {
    updateAttributes({ title: editingCaption });
  };

  const handleDelete = () => {
    setShowActionBar(false);
    deleteNode();
  };

  const handleViewInLibrary = () => {
    if (mediaItem) {
      window.open(`/admin/media-library?id=${mediaItem.id}`, "_blank");
    } else {
      window.open("/admin/media-library", "_blank");
    }
  };

  // ─── Meta modal alt save ──────────────────────────────────────────────────

  const [metaAlt, setMetaAlt] = useState(alt);
  const handleSaveMetaAlt = () => {
    updateAttributes({ alt: metaAlt });
    if (mediaItem) {
      updateMutation.mutate({ id: mediaItem.id, altText: metaAlt });
    }
  };

  // ─── Replace modal (opens ImageUploadModal in library tab) ───────────────
  // We render a mini inline library picker here rather than importing the full modal
  // to avoid circular deps. The replace flow opens ImageUploadModal via BlogEditor state.
  // We signal the parent via a custom DOM event.
  const handleReplace = () => {
    setShowActionBar(false);
    // Dispatch a custom event that BlogEditor listens to
    const event = new CustomEvent("editor:image-replace", {
      detail: {
        currentSrc: src,
        onReplace: (url: string, replaceAlt?: string) => {
          updateAttributes({ src: url, alt: replaceAlt ?? alt });
        },
      },
      bubbles: true,
    });
    wrapperRef.current?.dispatchEvent(event);
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <NodeViewWrapper className="relative inline-block my-4 w-full" ref={wrapperRef}>
      {/* ── Action Bar ─────────────────────────────────────────────────── */}
      {showActionBar && (
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-stone-900 text-white rounded-lg shadow-xl px-2 py-1.5 whitespace-nowrap"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* Edit Alt */}
          <ActionBarButton
            onClick={() => { setEditingAlt(alt); setShowAltEditor(true); setShowActionBar(false); }}
            title="Edit Alt Text"
          >
            <Type className="w-3.5 h-3.5" />
            <span className="text-xs">Alt</span>
          </ActionBarButton>
          <div className="w-px h-4 bg-stone-600" />
          {/* Replace */}
          <ActionBarButton onClick={handleReplace} title="Replace Image">
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="text-xs">Replace</span>
          </ActionBarButton>
          <div className="w-px h-4 bg-stone-600" />
          {/* Caption */}
          <ActionBarButton onClick={handleToggleCaption} title="Toggle Caption" active={showCaption}>
            <Pencil className="w-3.5 h-3.5" />
            <span className="text-xs">Caption</span>
          </ActionBarButton>
          <div className="w-px h-4 bg-stone-600" />
          {/* View in Library */}
          <ActionBarButton onClick={handleViewInLibrary} title="View in Media Library">
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="text-xs">Library</span>
          </ActionBarButton>
          <div className="w-px h-4 bg-stone-600" />
          {/* Delete */}
          <ActionBarButton onClick={handleDelete} title="Remove from post" danger>
            <Trash2 className="w-3.5 h-3.5" />
            <span className="text-xs">Delete</span>
          </ActionBarButton>
          {/* Close */}
          <div className="w-px h-4 bg-stone-600" />
          <ActionBarButton onClick={() => setShowActionBar(false)} title="Close">
            <X className="w-3.5 h-3.5" />
          </ActionBarButton>
          {/* Pointer */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-stone-900 rotate-45 rounded-sm" />
        </div>
      )}

      {/* ── Image ──────────────────────────────────────────────────────── */}
      <img
        src={src}
        alt={alt}
        title={node.attrs.title}
        onClick={handleClick}
        className={`rounded-lg max-w-full mx-auto block cursor-pointer transition-all ${
          showActionBar ? "ring-2 ring-primary ring-offset-2" : "hover:ring-2 hover:ring-primary/30 hover:ring-offset-1"
        }`}
        draggable={false}
      />

      {/* ── Caption ────────────────────────────────────────────────────── */}
      {showCaption && (
        <div className="mt-1 text-center">
          <input
            type="text"
            value={editingCaption}
            onChange={(e) => setEditingCaption(e.target.value)}
            onBlur={handleSaveCaption}
            placeholder="Add a caption…"
            className="text-sm text-stone-500 italic text-center w-full bg-transparent border-b border-dashed border-stone-300 focus:outline-none focus:border-primary px-2 py-0.5"
          />
        </div>
      )}

      {/* ── Inline Alt Editor ──────────────────────────────────────────── */}
      {showAltEditor && (
        <div className="mt-2 flex gap-2 items-center bg-stone-50 border border-stone-200 rounded-lg p-2">
          <Label className="text-xs text-stone-600 shrink-0">Alt text:</Label>
          <Input
            autoFocus
            value={editingAlt}
            onChange={(e) => setEditingAlt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveAlt();
              if (e.key === "Escape") setShowAltEditor(false);
            }}
            className="h-7 text-sm flex-1"
          />
          <Button size="sm" onClick={handleSaveAlt} className="h-7 text-xs bg-primary hover:bg-primary/90 text-white cursor-pointer">
            Save
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setShowAltEditor(false)} className="h-7 text-xs cursor-pointer">
            Cancel
          </Button>
        </div>
      )}

      {/* ── Metadata Modal (double-click) ──────────────────────────────── */}
      <Dialog open={showMetaModal} onOpenChange={setShowMetaModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              Image Details
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Preview */}
            <div className="rounded-xl overflow-hidden border border-stone-200 bg-stone-50">
              <img src={src} alt={alt} className="max-h-48 w-full object-contain" />
            </div>

            {/* Metadata grid */}
            {mediaItem ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <span className="text-stone-500">Filename</span>
                <span className="text-stone-800 font-medium truncate">{mediaItem.filename}</span>
                {mediaItem.width && mediaItem.height && (
                  <>
                    <span className="text-stone-500">Dimensions</span>
                    <span className="text-stone-800">{mediaItem.width} × {mediaItem.height}px</span>
                  </>
                )}
                {mediaItem.fileSizeBytes && (
                  <>
                    <span className="text-stone-500">File size</span>
                    <span className="text-stone-800">{formatBytes(mediaItem.fileSizeBytes)}</span>
                  </>
                )}
                {mediaItem.mimeType && (
                  <>
                    <span className="text-stone-500">Type</span>
                    <span className="text-stone-800">{mediaItem.mimeType}</span>
                  </>
                )}
                {mediaItem.createdAt && (
                  <>
                    <span className="text-stone-500">Uploaded</span>
                    <span className="text-stone-800">{new Date(mediaItem.createdAt).toLocaleDateString()}</span>
                  </>
                )}
              </div>
            ) : (
              <div className="text-sm text-stone-500 italic">
                This image is not in the media library (inserted via URL or external source).
              </div>
            )}

            {/* Alt text editor */}
            <div>
              <Label className="text-sm text-stone-600">Alt Text</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  value={metaAlt}
                  onChange={(e) => setMetaAlt(e.target.value)}
                  placeholder="Describe the image for accessibility..."
                  className="flex-1"
                />
                <Button
                  size="sm"
                  onClick={handleSaveMetaAlt}
                  disabled={updateMutation.isPending}
                  className="bg-primary hover:bg-primary/90 text-white cursor-pointer shrink-0"
                >
                  {updateMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Save"}
                </Button>
              </div>
              {mediaItem && (
                <p className="text-xs text-stone-400 mt-1">Saving updates the media library entry.</p>
              )}
            </div>

            {/* View in library link */}
            {mediaItem && (
              <Button
                variant="outline"
                size="sm"
                className="w-full cursor-pointer"
                onClick={() => {
                  window.open(`/admin/media-library?id=${mediaItem.id}`, "_blank");
                  setShowMetaModal(false);
                }}
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                View in Media Library
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </NodeViewWrapper>
  );
}

// ─── Action Bar Button ───────────────────────────────────────────────────────

function ActionBarButton({
  onClick,
  title,
  active,
  danger,
  children,
}: {
  onClick: () => void;
  title: string;
  active?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors cursor-pointer text-xs ${
        danger
          ? "hover:bg-red-500/80 text-red-300 hover:text-white"
          : active
          ? "bg-primary/30 text-primary-foreground"
          : "hover:bg-stone-700 text-stone-200 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
