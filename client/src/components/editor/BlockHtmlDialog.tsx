/**
 * BlockHtmlDialog
 *
 * Lets the user edit the HTML of a single block-level node (heading, paragraph,
 * table, list, image, blockquote, code block, etc.) without opening the full
 * HTML source view.
 *
 * Usage:
 *   <BlockHtmlDialog
 *     open={showBlockHtml}
 *     onOpenChange={setShowBlockHtml}
 *     editor={editor}
 *   />
 *
 * The dialog:
 *  1. On open  – serialises the block node at the current selection into HTML.
 *  2. On save  – validates the new HTML, then replaces the original node via a
 *                ProseMirror transaction.
 *  3. On cancel / Escape – closes without applying any changes.
 */

import { useEffect, useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import { DOMParser as ProseMirrorDOMParser, DOMSerializer } from "@tiptap/pm/model";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// ─── Security: allowed block-level tags ─────────────────────────────────────

const ALLOWED_BLOCK_TAGS = new Set([
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "ul", "ol", "li",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td",
  "blockquote", "pre", "code",
  "img", "figure", "figcaption",
  "div", "section", "article",
  "hr", "br",
  // inline tags are fine inside blocks
  "a", "strong", "em", "u", "s", "span", "mark",
  "sup", "sub",
]);

const FORBIDDEN_TAGS = new Set(["script", "style", "iframe", "object", "embed", "form", "input", "button", "select", "textarea", "link", "meta", "base"]);
const FORBIDDEN_ATTR_PATTERN = /^on[a-z]+$/i; // onclick, onload, etc.

interface ValidationResult {
  ok: boolean;
  error?: string;
}

function validateHtml(html: string): ValidationResult {
  const trimmed = html.trim();
  if (!trimmed) return { ok: false, error: "HTML cannot be empty." };

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<body>${trimmed}</body>`, "text/html");

  // Check for parse errors
  const parseError = doc.querySelector("parseerror");
  if (parseError) return { ok: false, error: "Invalid HTML syntax." };

  const body = doc.body;

  // Forbidden tags
  const forbiddenTagList = Array.from(FORBIDDEN_TAGS);
  for (let i = 0; i < forbiddenTagList.length; i++) {
    const tag = forbiddenTagList[i];
    if (body.querySelector(tag)) {
      return { ok: false, error: `<${tag}> is not allowed for security reasons.` };
    }
  }

  // Forbidden attributes (event handlers)
  const allElements = Array.from(body.querySelectorAll("*"));
  for (let i = 0; i < allElements.length; i++) {
    const el = allElements[i];
    const attrs = Array.from(el.attributes);
    for (let j = 0; j < attrs.length; j++) {
      const attr = attrs[j];
      if (FORBIDDEN_ATTR_PATTERN.test(attr.name)) {
        return { ok: false, error: `Event handler attribute "${attr.name}" is not allowed.` };
      }
      if (attr.name === "href" && /^javascript:/i.test(attr.value)) {
        return { ok: false, error: 'javascript: URLs are not allowed in href.' };
      }
    }
  }

  // Must have at least one child element
  if (body.children.length === 0) {
    return { ok: false, error: "HTML must contain at least one block element." };
  }

  return { ok: true };
}

// ─── Serialise a ProseMirror node → HTML string ──────────────────────────────

function nodeToHtml(editor: Editor, pos: number): string {
  const node = editor.state.doc.nodeAt(pos);
  if (!node) return "";
  const serializer = DOMSerializer.fromSchema(editor.schema);
  const fragment = serializer.serializeFragment(node.content, { document });
  const wrapper = document.createElement(node.type.name === "heading" ? `h${node.attrs.level}` : "div");
  // For heading nodes, build the full tag with attributes
  if (node.type.name === "heading") {
    if (node.attrs.id) wrapper.setAttribute("id", node.attrs.id);
    if (node.attrs.textAlign) wrapper.setAttribute("data-text-align", node.attrs.textAlign);
    wrapper.appendChild(fragment);
    return wrapper.outerHTML;
  }
  // For other nodes, use the serializer's full output
  const fullSerializer = DOMSerializer.fromSchema(editor.schema);
  const domNode = fullSerializer.serializeNode(node, { document });
  const tmp = document.createElement("div");
  tmp.appendChild(domNode);
  return tmp.innerHTML;
}

// ─── Find the nearest block ancestor position ────────────────────────────────

function getActiveBlockPos(editor: Editor): number | null {
  const { selection, doc } = editor.state;
  const { $from } = selection;

  // Walk up the depth levels to find the nearest block node
  for (let d = $from.depth; d >= 0; d--) {
    const node = $from.node(d);
    if (node.isBlock && node.type.name !== "doc") {
      return $from.before(d);
    }
  }
  return null;
}

// ─── Component ───────────────────────────────────────────────────────────────

interface BlockHtmlDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editor: Editor;
}

export default function BlockHtmlDialog({ open, onOpenChange, editor }: BlockHtmlDialogProps) {
  const [htmlValue, setHtmlValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [blockPos, setBlockPos] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // On open: serialise the current block to HTML
  useEffect(() => {
    if (!open) return;
    setError(null);
    const pos = getActiveBlockPos(editor);
    setBlockPos(pos);
    if (pos === null) {
      setHtmlValue("");
      return;
    }
    const html = nodeToHtml(editor, pos);
    setHtmlValue(html);
    // Focus the textarea after render
    setTimeout(() => textareaRef.current?.focus(), 50);
  }, [open, editor]);

  // Escape key: close without saving
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onOpenChange(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [open, onOpenChange]);

  const handleSave = () => {
    setError(null);
    const validation = validateHtml(htmlValue);
    if (!validation.ok) {
      setError(validation.error ?? "Invalid HTML.");
      return;
    }

    if (blockPos === null) {
      setError("Could not locate the block to replace.");
      return;
    }

    try {
      // Parse the new HTML into a ProseMirror fragment
      const domParser = new DOMParser();
      const parsedDoc = domParser.parseFromString(`<body>${htmlValue.trim()}</body>`, "text/html");
      const body = parsedDoc.body;

      const pmParser = ProseMirrorDOMParser.fromSchema(editor.schema);
      const slice = pmParser.parseSlice(body, { preserveWhitespace: true });

      if (!slice.content.childCount) {
        setError("Parsed HTML produced no content.");
        return;
      }

      // Replace the original block node
      const originalNode = editor.state.doc.nodeAt(blockPos);
      if (!originalNode) {
        setError("Original block no longer exists.");
        return;
      }

      const from = blockPos;
      const to = blockPos + originalNode.nodeSize;

      const { tr } = editor.state;
      tr.replaceWith(from, to, slice.content);
      editor.view.dispatch(tr);

      // Notify parent so onChange fires and the post saves the new HTML
      const newHtml = editor.getHTML();
      // The editor's onUpdate will fire automatically after dispatch,
      // but we close the dialog immediately for snappy UX.
      onOpenChange(false);
    } catch (err) {
      setError(`Failed to apply HTML: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleCancel = () => {
    setError(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl"
        onEscapeKeyDown={(e) => {
          e.preventDefault();
          onOpenChange(false);
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-stone-900">
            Edit HTML for this block
          </DialogTitle>
          <p className="text-xs text-stone-500 mt-0.5">
            Edit the raw HTML of the selected block. Changes apply when you click Save.
            <br />
            Allowed tags: headings, paragraphs, tables, lists, images, blockquotes, code blocks.
            Scripts and event handlers are not allowed.
          </p>
        </DialogHeader>

        <div className="mt-2">
          <textarea
            ref={textareaRef}
            value={htmlValue}
            onChange={(e) => {
              setHtmlValue(e.target.value);
              setError(null);
            }}
            spellCheck={false}
            rows={12}
            className="w-full font-mono text-xs bg-stone-900 text-green-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y border border-stone-700"
            placeholder="<h2 id='my-section'>Heading text</h2>"
          />
          {error && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>
          )}
        </div>

        <DialogFooter className="mt-2 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCancel}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90 text-white cursor-pointer"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
