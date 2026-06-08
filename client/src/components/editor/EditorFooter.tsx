import type { Editor } from "@tiptap/react";

interface EditorFooterProps {
  editor: Editor | null;
  autoSaveStatus?: "idle" | "saving" | "saved" | "error";
  lastSaved?: Date | null;
}

export default function EditorFooter({ editor, autoSaveStatus = "idle", lastSaved }: EditorFooterProps) {
  if (!editor) return null;

  // Character count from extension
  const charCount = (editor as any).storage?.characterCount?.characters?.() ?? 0;
  const wordCount = (editor as any).storage?.characterCount?.words?.() ?? 0;

  // Reading time (avg 200 wpm)
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 200));

  const formatLastSaved = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return "just now";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex items-center justify-between px-4 py-1.5 bg-stone-50 border-t border-stone-200 text-xs text-stone-400 select-none">
      <div className="flex items-center gap-4">
        <span>{wordCount.toLocaleString()} words</span>
        <span>{charCount.toLocaleString()} chars</span>
        <span>~{readingMinutes} min read</span>
      </div>

      <div className="flex items-center gap-2">
        {autoSaveStatus === "saving" && (
          <span className="text-stone-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block" />
            Saving…
          </span>
        )}
        {autoSaveStatus === "saved" && lastSaved && (
          <span className="text-green-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            Saved {formatLastSaved(lastSaved)}
          </span>
        )}
        {autoSaveStatus === "error" && (
          <span className="text-red-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
            Could not save — retrying…
          </span>
        )}
      </div>
    </div>
  );
}
