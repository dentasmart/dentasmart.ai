import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CharacterCount from "@tiptap/extension-character-count";
import Typography from "@tiptap/extension-typography";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Youtube from "@tiptap/extension-youtube";
import { createLowlight, all } from "lowlight";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Link as LinkIcon,
  Image as ImageIcon,
  Highlighter,
  Undo,
  Redo,
  Minus,
  Type,
  Palette,
  Code,
  Code2,
  Table as TableIcon,
  Youtube as YoutubeIcon,
  Search,
  ListTree,
  Eye,
  FileCode,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ImageUploadModal from "./ImageUploadModal";
import EditorBubbleMenu from "./editor/EditorBubbleMenu";
import EditorLinkDialog from "./editor/EditorLinkDialog";
import FindReplaceBar from "./editor/FindReplaceBar";
import EditorFooter from "./editor/EditorFooter";
import { createSlashCommandExtension } from "./editor/SlashCommandMenu";
import { trpc } from "@/lib/trpc";

// ─── Types ──────────────────────────────────────────────────────────────────

interface BlogEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  postId?: number;
  postStatus?: string;
  postTitle?: string;
  onAutoSave?: (html: string) => Promise<void>;
}

// ─── Lowlight setup ─────────────────────────────────────────────────────────

const lowlight = createLowlight(all);

// ─── Main Component ─────────────────────────────────────────────────────────

export default function BlogEditor({
  content,
  onChange,
  placeholder,
  postId,
  postStatus,
  postTitle,
  onAutoSave,
}: BlogEditorProps) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [htmlMode, setHtmlMode] = useState(false);
  const [htmlSource, setHtmlSource] = useState("");
  const [autoSaveStatus, setAutoSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedContent = useRef<string>("");
  const uploadMutation = trpc.blog.uploadImage.useMutation();

  // ─── Upload helper for paste/drop ──────────────────────────────────────
  const uploadFile = useCallback(
    async (file: File): Promise<string | null> => {
      if (!file.type.startsWith("image/")) return null;
      if (file.size > 5 * 1024 * 1024) return null;
      try {
        const reader = new FileReader();
        return await new Promise((resolve, reject) => {
          reader.onload = async (e) => {
            try {
              const base64 = (e.target?.result as string).split(",")[1];
              const result = await uploadMutation.mutateAsync({
                fileName: file.name,
                fileBase64: base64,
                mimeType: file.type,
              });
              resolve(result.url);
            } catch (err) {
              reject(err);
            }
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      } catch {
        return null;
      }
    },
    [uploadMutation]
  );

  // ─── Auto-save logic ───────────────────────────────────────────────────
  const scheduleAutoSave = useCallback(
    (html: string) => {
      if (!onAutoSave) return;
      if (postStatus !== "draft") return; // Only auto-save drafts
      if (!postTitle?.trim()) return; // Skip if title is empty

      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);

      autoSaveTimer.current = setTimeout(async () => {
        if (html === lastSavedContent.current) return; // No change
        setAutoSaveStatus("saving");
        try {
          await onAutoSave(html);
          lastSavedContent.current = html;
          setAutoSaveStatus("saved");
          setLastSaved(new Date());
        } catch {
          setAutoSaveStatus("error");
          // Retry once after 10s
          setTimeout(() => {
            if (autoSaveStatus !== "saving") {
              setAutoSaveStatus("idle");
            }
          }, 10000);
        }
      }, 30000); // 30s debounce
    },
    [onAutoSave, postStatus, postTitle, autoSaveStatus]
  );

  // ─── Editor setup ──────────────────────────────────────────────────────
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        codeBlock: false, // Replaced by CodeBlockLowlight
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline hover:text-primary/80",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full mx-auto",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: { class: "rounded px-1" },
      }),
      TextStyle,
      Color,
      Placeholder.configure({
        placeholder: placeholder || "Start writing your article… or type / for commands",
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({ nested: true }),
      CharacterCount,
      Typography,
      Subscript,
      Superscript,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "plaintext",
        HTMLAttributes: { class: "code-block" },
      }),
      Youtube.configure({
        controls: true,
        nocookie: true,
        HTMLAttributes: { class: "youtube-embed" },
      }),
      createSlashCommandExtension(() => setShowImageModal(true)),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      scheduleAutoSave(html);
    },
    editorProps: {
      attributes: {
        class: "blog-content editor-mode min-h-[400px] p-8 focus:outline-none max-w-3xl mx-auto",
      },
      // Drag-drop image upload
      handleDrop(view, event, _slice, moved) {
        if (moved) return false;
        const files = event.dataTransfer?.files;
        if (!files || files.length === 0) return false;
        const imageFile = Array.from(files).find((f) => f.type.startsWith("image/"));
        if (!imageFile) return false;

        event.preventDefault();
        const { schema } = view.state;
        const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });

        uploadFile(imageFile).then((url) => {
          if (!url) return;
          const node = schema.nodes.image.create({ src: url, alt: imageFile.name });
          const transaction = view.state.tr.insert(coordinates?.pos ?? 0, node);
          view.dispatch(transaction);
        });
        return true;
      },
      // Clipboard paste image upload
      handlePaste(view, event) {
        const items = event.clipboardData?.items;
        if (!items) return false;

        const imageItem = Array.from(items).find((item) => item.type.startsWith("image/"));
        if (!imageItem) return false;

        const file = imageItem.getAsFile();
        if (!file) return false;

        event.preventDefault();
        uploadFile(file).then((url) => {
          if (!url) return;
          const { schema } = view.state;
          const node = schema.nodes.image.create({ src: url, alt: "Pasted image" });
          const transaction = view.state.tr.replaceSelectionWith(node);
          view.dispatch(transaction);
        });
        return true;
      },
    },
  });

  // ─── Keyboard shortcuts ────────────────────────────────────────────────
  useEffect(() => {
    if (!editor) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (mod && e.key === "k") {
        e.preventDefault();
        setShowLinkDialog(true);
      }
      if (mod && e.key === "f") {
        e.preventDefault();
        setShowFindReplace((v) => !v);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [editor]);

  // ─── Sync content prop → editor ───────────────────────────────────────
  useEffect(() => {
    if (editor && content !== undefined && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // ─── HTML source mode ─────────────────────────────────────────────────
  const enterHtmlMode = useCallback(() => {
    if (!editor) return;
    setHtmlSource(editor.getHTML());
    setHtmlMode(true);
  }, [editor]);

  const exitHtmlMode = useCallback(() => {
    if (!editor) return;
    editor.commands.setContent(htmlSource);
    onChange(htmlSource);
    setHtmlMode(false);
  }, [editor, htmlSource, onChange]);

  // ─── TOC generator ────────────────────────────────────────────────────
  const insertTOC = useCallback(() => {
    if (!editor) return;
    const headings: { level: number; text: string; id: string }[] = [];
    editor.state.doc.descendants((node) => {
      if (node.type.name === "heading") {
        const text = node.textContent;
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        headings.push({ level: node.attrs.level, text, id });
      }
    });

    if (headings.length === 0) return;

    const tocHtml = `<div class="toc-block"><p><strong>Table of Contents</strong></p><ul>${headings
      .map((h) => `<li style="margin-left:${(h.level - 1) * 16}px"><a href="#${h.id}">${h.text}</a></li>`)
      .join("")}</ul></div>`;

    editor.chain().focus().insertContent(tocHtml).run();
  }, [editor]);

  // ─── Image insert handler ─────────────────────────────────────────────
  const handleImageInsert = useCallback(
    (url: string, alt?: string) => {
      if (!editor) return;
      editor.chain().focus().setImage({ src: url, alt: alt || "" }).run();
    },
    [editor]
  );

  if (!editor) return null;

  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
      {/* ── Toolbar ─────────────────────────────────────────────────────── */}
      <div className="border-b border-stone-200 bg-stone-50 p-2 flex flex-wrap gap-1">

        {/* Text formatting */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-stone-200">
          <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold (⌘B)">
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic (⌘I)">
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline (⌘U)">
            <UnderlineIcon className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
            <Strikethrough className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline Code (⌘E)">
            <Code className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleSubscript().run()} active={editor.isActive("subscript")} title="Subscript">
            <SubscriptIcon className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleSuperscript().run()} active={editor.isActive("superscript")} title="Superscript">
            <SuperscriptIcon className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-stone-200">
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1">
            <Heading1 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">
            <Heading2 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">
            <Heading3 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} active={editor.isActive("heading", { level: 4 })} title="Heading 4">
            <Heading4 className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-stone-200">
          <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align Left">
            <AlignLeft className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Align Center">
            <AlignCenter className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align Right">
            <AlignRight className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-stone-200">
          <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List">
            <List className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered List">
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleTaskList().run()} active={editor.isActive("taskList")} title="Task List">
            <CheckSquare className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* StoryBrand Callout */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-stone-200">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="StoryBrand Callout"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              editor.isActive("blockquote")
                ? "bg-primary/15 text-primary border border-primary/30"
                : "text-stone-600 hover:bg-stone-200 hover:text-stone-900 border border-transparent"
            }`}
          >
            <Quote className="w-4 h-4" />
            <span>Callout</span>
          </button>
        </div>

        {/* Code Block */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-stone-200">
          <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code Block">
            <Code2 className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Table */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-stone-200">
          <ToolbarButton
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            title="Insert Table"
          >
            <TableIcon className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Colors & Highlight */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-stone-200">
          <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight({ color: "#21B9C620" }).run()} active={editor.isActive("highlight")} title="Brand Highlight">
            <Highlighter className="w-4 h-4 text-primary" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().setColor("#21B9C6").run()} active={editor.isActive("textStyle", { color: "#21B9C6" })} title="Brand Color Text">
            <Palette className="w-4 h-4 text-primary" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().unsetColor().run()} title="Reset Color">
            <Type className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Insert */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-stone-200">
          <ToolbarButton onClick={() => setShowLinkDialog(true)} active={editor.isActive("link")} title="Insert Link (⌘K)">
            <LinkIcon className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => setShowImageModal(true)} title="Insert Image">
            <ImageIcon className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
            <Minus className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => {
              const url = window.prompt("YouTube URL:");
              if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
            }}
            title="Embed YouTube Video"
          >
            <YoutubeIcon className="w-4 h-4" />
          </ToolbarButton>
        </div>

        {/* Utilities */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-stone-200">
          <ToolbarButton onClick={() => setShowFindReplace((v) => !v)} active={showFindReplace} title="Find & Replace (⌘F)">
            <Search className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={insertTOC} title="Insert Table of Contents">
            <ListTree className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={htmlMode ? exitHtmlMode : enterHtmlMode} active={htmlMode} title={htmlMode ? "Back to Visual Editor" : "View HTML Source"}>
            {htmlMode ? <Eye className="w-4 h-4" /> : <FileCode className="w-4 h-4" />}
          </ToolbarButton>
        </div>

        {/* Undo/Redo */}
        <div className="flex items-center gap-0.5">
          <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo (⌘Z)">
            <Undo className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo (⌘⇧Z)">
            <Redo className="w-4 h-4" />
          </ToolbarButton>
        </div>
      </div>

      {/* ── Find & Replace Bar ──────────────────────────────────────────── */}
      {showFindReplace && (
        <FindReplaceBar editor={editor} onClose={() => setShowFindReplace(false)} />
      )}

      {/* ── Editor Content / HTML Source ───────────────────────────────── */}
      {htmlMode ? (
        <div className="relative">
          <textarea
            value={htmlSource}
            onChange={(e) => setHtmlSource(e.target.value)}
            className="w-full min-h-[400px] p-6 font-mono text-sm text-stone-700 bg-stone-900 text-green-300 focus:outline-none resize-y"
            spellCheck={false}
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              size="sm"
              onClick={exitHtmlMode}
              className="bg-primary hover:bg-primary/90 text-white text-xs cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 mr-1" />
              Apply & Return to Visual
            </Button>
          </div>
        </div>
      ) : (
        <>
          <EditorBubbleMenu editor={editor} onOpenLinkDialog={() => setShowLinkDialog(true)} />
          <EditorContent editor={editor} />
        </>
      )}

      {/* ── Footer (word count, auto-save status) ──────────────────────── */}
      <EditorFooter editor={editor} autoSaveStatus={autoSaveStatus} lastSaved={lastSaved} />

      {/* ── Modals ─────────────────────────────────────────────────────── */}
      <ImageUploadModal
        open={showImageModal}
        onClose={() => setShowImageModal(false)}
        onInsert={handleImageInsert}
      />

      <EditorLinkDialog
        open={showLinkDialog}
        onOpenChange={setShowLinkDialog}
        editor={editor}
      />
    </div>
  );
}

// ─── Toolbar Button ──────────────────────────────────────────────────────────

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded-md transition-colors cursor-pointer ${
        active ? "bg-primary/10 text-primary" : "text-stone-600 hover:bg-stone-200 hover:text-stone-900"
      } ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}
