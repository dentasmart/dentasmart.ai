import { BubbleMenu } from "@tiptap/react/menus";
import type { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Heading3,
  FileCode,
} from "lucide-react";
import { useState } from "react";
import BlockHtmlDialog from "./BlockHtmlDialog";

interface EditorBubbleMenuProps {
  editor: Editor;
  onOpenLinkDialog: () => void;
}

export default function EditorBubbleMenu({ editor, onOpenLinkDialog }: EditorBubbleMenuProps) {
  const [showBlockHtml, setShowBlockHtml] = useState(false);

  return (
    <>
      <BubbleMenu
        editor={editor}
        className="flex items-center gap-0.5 bg-white border border-stone-200 rounded-lg shadow-lg p-1 z-50"
      >
        {/* Text formatting */}
        <BubbleButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold (⌘B)"
        >
          <Bold className="w-3.5 h-3.5" />
        </BubbleButton>
        <BubbleButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic (⌘I)"
        >
          <Italic className="w-3.5 h-3.5" />
        </BubbleButton>
        <BubbleButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Underline (⌘U)"
        >
          <Underline className="w-3.5 h-3.5" />
        </BubbleButton>
        <BubbleButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Strikethrough"
        >
          <Strikethrough className="w-3.5 h-3.5" />
        </BubbleButton>
        <BubbleButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
          title="Inline Code (⌘E)"
        >
          <Code className="w-3.5 h-3.5" />
        </BubbleButton>

        {/* Divider */}
        <div className="w-px h-5 bg-stone-200 mx-0.5" />

        {/* Headings */}
        <BubbleButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
        >
          <Heading1 className="w-3.5 h-3.5" />
        </BubbleButton>
        <BubbleButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="w-3.5 h-3.5" />
        </BubbleButton>
        <BubbleButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <Heading3 className="w-3.5 h-3.5" />
        </BubbleButton>

        {/* Divider */}
        <div className="w-px h-5 bg-stone-200 mx-0.5" />

        {/* Link */}
        <BubbleButton
          onClick={onOpenLinkDialog}
          active={editor.isActive("link")}
          title="Insert Link (⌘K)"
        >
          <LinkIcon className="w-3.5 h-3.5" />
        </BubbleButton>

        {/* Divider */}
        <div className="w-px h-5 bg-stone-200 mx-0.5" />

        {/* Edit block HTML */}
        <BubbleButton
          onClick={() => setShowBlockHtml(true)}
          title="Edit block HTML"
        >
          <FileCode className="w-3.5 h-3.5" />
        </BubbleButton>
      </BubbleMenu>

      {/* Per-block HTML editor dialog */}
      <BlockHtmlDialog
        open={showBlockHtml}
        onOpenChange={setShowBlockHtml}
        editor={editor}
      />
    </>
  );
}

function BubbleButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded transition-colors cursor-pointer ${
        active
          ? "bg-primary/10 text-primary"
          : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
      }`}
    >
      {children}
    </button>
  );
}
