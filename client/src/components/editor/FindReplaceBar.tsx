import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, ChevronUp, ChevronDown, Replace } from "lucide-react";
import type { Editor } from "@tiptap/react";

interface FindReplaceBarProps {
  editor: Editor | null;
  onClose: () => void;
}

export default function FindReplaceBar({ editor, onClose }: FindReplaceBarProps) {
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [matchCount, setMatchCount] = useState(0);
  const [currentMatch, setCurrentMatch] = useState(0);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const findInputRef = useRef<HTMLInputElement>(null);

  // Focus find input on mount
  useEffect(() => {
    findInputRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Find all matches in the document text
  const findMatches = useCallback(
    (query: string): { from: number; to: number }[] => {
      if (!editor || !query) return [];
      const matches: { from: number; to: number }[] = [];
      const doc = editor.state.doc;
      const flags = caseSensitive ? "g" : "gi";
      const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), flags);

      doc.descendants((node, pos) => {
        if (!node.isText || !node.text) return;
        let match;
        while ((match = regex.exec(node.text)) !== null) {
          matches.push({ from: pos + match.index, to: pos + match.index + match[0].length });
        }
      });
      return matches;
    },
    [editor, caseSensitive]
  );

  // Update match count when find text changes
  useEffect(() => {
    if (!findText.trim()) {
      setMatchCount(0);
      setCurrentMatch(0);
      return;
    }
    const matches = findMatches(findText);
    setMatchCount(matches.length);
    setCurrentMatch(matches.length > 0 ? 1 : 0);
  }, [findText, caseSensitive, findMatches]);

  const navigateMatch = useCallback(
    (direction: "next" | "prev") => {
      if (!editor || !findText.trim()) return;
      const matches = findMatches(findText);
      if (matches.length === 0) return;

      let next: number;
      if (direction === "next") {
        next = currentMatch % matches.length;
      } else {
        next = (currentMatch - 2 + matches.length) % matches.length;
      }

      const match = matches[next];
      editor.chain().focus().setTextSelection({ from: match.from, to: match.to }).run();
      setCurrentMatch(next + 1);
    },
    [editor, findText, currentMatch, findMatches]
  );

  const handleReplace = useCallback(() => {
    if (!editor || !findText.trim()) return;
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to);
    const flags = caseSensitive ? "" : "i";
    const regex = new RegExp(`^${findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, flags);

    if (regex.test(selectedText)) {
      editor.chain().focus().insertContent(replaceText).run();
      // Move to next match
      navigateMatch("next");
    } else {
      navigateMatch("next");
    }
  }, [editor, findText, replaceText, caseSensitive, navigateMatch]);

  const handleReplaceAll = useCallback(() => {
    if (!editor || !findText.trim()) return;
    const matches = findMatches(findText);
    if (matches.length === 0) return;

    // Replace from end to start to preserve positions
    const sorted = [...matches].sort((a, b) => b.from - a.from);
    editor.chain().focus().run();

    let tr = editor.state.tr;
    for (const match of sorted) {
      tr = tr.replaceWith(match.from, match.to, editor.schema.text(replaceText));
    }
    editor.view.dispatch(tr);
    setMatchCount(0);
    setCurrentMatch(0);
    setFindText("");
  }, [editor, findText, replaceText, findMatches]);

  return (
    <div className="find-replace-bar flex items-center gap-2 px-4 py-2 bg-stone-50 border-b border-stone-200 flex-wrap">
      {/* Find */}
      <div className="flex items-center gap-1.5 flex-1 min-w-48">
        <Input
          ref={findInputRef}
          value={findText}
          onChange={(e) => setFindText(e.target.value)}
          placeholder="Find..."
          className="h-7 text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              navigateMatch(e.shiftKey ? "prev" : "next");
            }
          }}
        />
        <span className="text-xs text-stone-400 whitespace-nowrap min-w-[40px]">
          {matchCount > 0 ? `${currentMatch}/${matchCount}` : findText ? "0/0" : ""}
        </span>
        <button
          type="button"
          onClick={() => navigateMatch("prev")}
          disabled={matchCount === 0}
          className="p-1 rounded hover:bg-stone-200 disabled:opacity-40 cursor-pointer"
          title="Previous match (Shift+Enter)"
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => navigateMatch("next")}
          disabled={matchCount === 0}
          className="p-1 rounded hover:bg-stone-200 disabled:opacity-40 cursor-pointer"
          title="Next match (Enter)"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Replace */}
      <div className="flex items-center gap-1.5 flex-1 min-w-48">
        <Input
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
          placeholder="Replace with..."
          className="h-7 text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleReplace();
            }
          }}
        />
        <Button
          size="sm"
          variant="outline"
          onClick={handleReplace}
          disabled={matchCount === 0}
          className="h-7 px-2 text-xs cursor-pointer"
        >
          Replace
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleReplaceAll}
          disabled={matchCount === 0}
          className="h-7 px-2 text-xs cursor-pointer"
        >
          All
        </Button>
      </div>

      {/* Options */}
      <label className="flex items-center gap-1.5 cursor-pointer text-xs text-stone-600">
        <input
          type="checkbox"
          checked={caseSensitive}
          onChange={(e) => setCaseSensitive(e.target.checked)}
          className="w-3.5 h-3.5 accent-primary cursor-pointer"
        />
        Aa
      </label>

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="p-1 rounded hover:bg-stone-200 text-stone-500 cursor-pointer"
        title="Close (Escape)"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
