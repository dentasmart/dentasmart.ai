import { Extension } from "@tiptap/react";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { ReactRenderer } from "@tiptap/react";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Code,
  Minus,
  Image as ImageIcon,
  Table,
  Youtube,
  Type,
} from "lucide-react";

// ─── Command definitions ────────────────────────────────────────────────────

export interface SlashCommand {
  title: string;
  description: string;
  icon: React.ReactNode;
  keywords: string[];
  command: (props: { editor: any; range: any; openImageModal?: () => void }) => void;
}

const COMMANDS: SlashCommand[] = [
  {
    title: "Heading 1",
    description: "Large section heading",
    icon: <Heading1 className="w-4 h-4" />,
    keywords: ["h1", "heading", "title"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run();
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading",
    icon: <Heading2 className="w-4 h-4" />,
    keywords: ["h2", "heading", "subtitle"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run();
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading",
    icon: <Heading3 className="w-4 h-4" />,
    keywords: ["h3", "heading"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run();
    },
  },
  {
    title: "Heading 4",
    description: "Smallest heading",
    icon: <Heading4 className="w-4 h-4" />,
    keywords: ["h4", "heading"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 4 }).run();
    },
  },
  {
    title: "Bullet List",
    description: "Unordered list",
    icon: <List className="w-4 h-4" />,
    keywords: ["bullet", "list", "ul", "unordered"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Numbered List",
    description: "Ordered list",
    icon: <ListOrdered className="w-4 h-4" />,
    keywords: ["numbered", "ordered", "list", "ol"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Task List",
    description: "Checkbox list",
    icon: <CheckSquare className="w-4 h-4" />,
    keywords: ["task", "todo", "checkbox", "check"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "Callout",
    description: "StoryBrand callout block",
    icon: <Quote className="w-4 h-4" />,
    keywords: ["callout", "quote", "blockquote", "storybrand"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    title: "Code Block",
    description: "Syntax-highlighted code",
    icon: <Code className="w-4 h-4" />,
    keywords: ["code", "pre", "syntax", "highlight"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
  {
    title: "Divider",
    description: "Horizontal rule",
    icon: <Minus className="w-4 h-4" />,
    keywords: ["hr", "divider", "rule", "line", "separator"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
  {
    title: "Image",
    description: "Upload or embed an image",
    icon: <ImageIcon className="w-4 h-4" />,
    keywords: ["image", "photo", "picture", "img", "upload"],
    command: ({ editor, range, openImageModal }) => {
      editor.chain().focus().deleteRange(range).run();
      if (openImageModal) openImageModal();
    },
  },
  {
    title: "Table",
    description: "Insert a 3×3 table",
    icon: <Table className="w-4 h-4" />,
    keywords: ["table", "grid", "rows", "columns"],
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
    },
  },
  {
    title: "YouTube",
    description: "Embed a YouTube video",
    icon: <Youtube className="w-4 h-4" />,
    keywords: ["youtube", "video", "embed", "yt"],
    command: ({ editor, range }) => {
      const url = window.prompt("YouTube URL:");
      if (url) {
        editor.chain().focus().deleteRange(range).setYoutubeVideo({ src: url }).run();
      }
    },
  },
  {
    title: "Paragraph",
    description: "Plain text paragraph",
    icon: <Type className="w-4 h-4" />,
    keywords: ["paragraph", "text", "plain", "p"],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setParagraph().run();
    },
  },
];

// ─── Slash Command List Component ───────────────────────────────────────────

export interface SlashCommandListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

interface SlashCommandListProps {
  items: SlashCommand[];
  command: (item: SlashCommand) => void;
}

export const SlashCommandList = forwardRef<SlashCommandListRef, SlashCommandListProps>(
  ({ items, command }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = useCallback(
      (index: number) => {
        const item = items[index];
        if (item) command(item);
      },
      [items, command]
    );

    useEffect(() => {
      setSelectedIndex(0);
    }, [items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: KeyboardEvent }) => {
        if (event.key === "ArrowUp") {
          setSelectedIndex((i) => (i - 1 + items.length) % items.length);
          return true;
        }
        if (event.key === "ArrowDown") {
          setSelectedIndex((i) => (i + 1) % items.length);
          return true;
        }
        if (event.key === "Enter") {
          selectItem(selectedIndex);
          return true;
        }
        return false;
      },
    }));

    if (items.length === 0) return null;

    return (
      <div className="slash-menu bg-white border border-stone-200 rounded-xl shadow-xl overflow-hidden w-64 max-h-80 overflow-y-auto z-50">
        <div className="px-2 py-1.5 border-b border-stone-100">
          <span className="text-xs text-stone-400 font-medium uppercase tracking-wide">
            Insert block
          </span>
        </div>
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => selectItem(index)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors cursor-pointer ${
              index === selectedIndex
                ? "bg-primary/5 text-primary"
                : "text-stone-700 hover:bg-stone-50"
            }`}
          >
            <span
              className={`flex-shrink-0 ${
                index === selectedIndex ? "text-primary" : "text-stone-400"
              }`}
            >
              {item.icon}
            </span>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">{item.title}</div>
              <div className="text-xs text-stone-400 truncate">{item.description}</div>
            </div>
          </button>
        ))}
      </div>
    );
  }
);

SlashCommandList.displayName = "SlashCommandList";

// ─── TipTap Extension ───────────────────────────────────────────────────────

export function createSlashCommandExtension(openImageModal?: () => void) {
  return Extension.create({
    name: "slashCommand",

    addProseMirrorPlugins() {
      const editor = this.editor;
      let component: ReactRenderer | null = null;
      let popup: HTMLDivElement | null = null;

      const destroyPopup = () => {
        if (popup) {
          popup.remove();
          popup = null;
        }
        if (component) {
          component.destroy();
          component = null;
        }
      };

      return [
        new Plugin({
          key: new PluginKey("slashCommand"),
          props: {
            handleKeyDown(view, event) {
              if (component) {
                const ref = (component as any).ref as SlashCommandListRef | null;
                if (ref?.onKeyDown({ event })) return true;
                if (event.key === "Escape") {
                  destroyPopup();
                  return true;
                }
              }
              return false;
            },
          },
          view() {
            return {
              update(view, prevState) {
                const { state } = view;
                const { selection } = state;
                const { $from } = selection;

                // Only trigger in paragraph nodes
                if ($from.parent.type.name !== "paragraph") {
                  destroyPopup();
                  return;
                }

                const textBefore = $from.parent.textContent.slice(0, $from.parentOffset);

                // Check if we just typed "/"
                const slashMatch = textBefore.match(/\/([^/\s]*)$/);

                if (!slashMatch) {
                  destroyPopup();
                  return;
                }

                const query = slashMatch[1].toLowerCase();
                const filtered = COMMANDS.filter(
                  (cmd) =>
                    cmd.title.toLowerCase().includes(query) ||
                    cmd.keywords.some((k) => k.includes(query))
                );

                if (filtered.length === 0) {
                  destroyPopup();
                  return;
                }

                // Get cursor position
                const { from } = selection;
                const start = from - slashMatch[0].length;
                const coords = view.coordsAtPos(from);

                // Create or update popup
                if (!popup) {
                  popup = document.createElement("div");
                  popup.style.position = "fixed";
                  popup.style.zIndex = "9999";
                  document.body.appendChild(popup);
                }

                popup.style.top = `${coords.bottom + 8}px`;
                popup.style.left = `${coords.left}px`;

                const range = { from: start, to: from };

                if (!component) {
                  component = new ReactRenderer(SlashCommandList, {
                    props: {
                      items: filtered,
                      command: (item: SlashCommand) => {
                        item.command({ editor, range, openImageModal });
                        destroyPopup();
                      },
                    },
                    editor,
                  });
                  popup.appendChild(component.element);
                } else {
                  component.updateProps({
                    items: filtered,
                    command: (item: SlashCommand) => {
                      item.command({ editor, range, openImageModal });
                      destroyPopup();
                    },
                  });
                }
              },
              destroy() {
                destroyPopup();
              },
            };
          },
        }),
      ];
    },
  });
}
