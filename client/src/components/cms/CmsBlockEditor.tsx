import { useEffect, useState, type DragEvent } from "react";
import { ArrowDown, ArrowUp, GripVertical, Plus, Trash2, AlertTriangle, ChevronDown, ChevronUp, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import BlogEditor from "@/components/BlogEditor";
import CmsMediaPicker from "@/components/cms/CmsMediaPicker";
import CmsImageAltField from "@/components/cms/CmsImageAltField";
import {
  moveCmsBlock,
  insertCmsBlock,
  restoreCmsDeletedBlock,
  getCmsHeadingOrderWarnings,
  getCmsUrgentCarePositionWarning,
  resolveCmsSocialImage,
  validateCmsBlockOrder,
  type CmsBlock,
  type CmsDocument,
  type CmsImage,
  type CmsHeadingAlignment,
  type CmsSectionHeadingLevel,
} from "@shared/cmsBlocks";

type BlockType = CmsBlock["type"];

const BLOCK_LABELS: Record<BlockType, string> = {
  hero: "Page Header",
  quick_answer: "Quick Answer",
  urgent_care: "Urgent Care",
  rich_text: "Rich Text",
  causes: "Causes",
  symptoms: "Symptoms",
  list: "Bullet List",
  faq: "FAQs",
  related_links: "Related Links",
  image: "Image",
  table: "Table",
  cta: "Call to Action",
};

function newBlock(type: BlockType): CmsBlock {
  const id = crypto.randomUUID();
  switch (type) {
    case "hero": return { id, type, heading: "", subheading: "" };
    case "quick_answer": return { id, type, heading: "Quick Answer", answer: "" };
    case "urgent_care": return { id, type, heading: "When to Seek Urgent Care", items: [""] };
    case "rich_text": return { id, type, heading: "", html: "<p></p>" };
    case "causes": return { id, type, heading: "Common Causes", items: [] };
    case "symptoms": return { id, type, heading: "Signs and Symptoms", items: [] };
    case "list": return { id, type, heading: "Key Takeaways", items: [] };
    case "faq": return { id, type, heading: "FAQs", items: [] };
    case "related_links": return { id, type, heading: "Related Topics", links: [] };
    case "image": return { id, type, heading: "", image: null };
    case "table": return { id, type, heading: "", headers: ["Column 1", "Column 2"], rows: [] };
    case "cta": return { id, type, heading: "", description: "", buttonLabel: "", buttonUrl: "" };
  }
}

const isMedical = (type: CmsDocument["contentType"]) => type === "condition" || type === "symptom";

function Field({ label, value, onChange, multiline = false, placeholder }: {
  label: string; value: string; onChange: (value: string) => void;
  multiline?: boolean; placeholder?: string;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-sm text-stone-600">{label}</Label>
      {multiline
        ? <Textarea value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} rows={3} />
        : <Input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />}
    </div>
  );
}

/** Visual alignment changes do not modify SEO heading levels or rich text. */
function AlignmentControl({ label, value, onChange }: {
  label: string; value?: CmsHeadingAlignment; onChange: (value: CmsHeadingAlignment) => void;
}) {
  const choices = [
    { value: "left" as const, text: "Left", Icon: AlignLeft },
    { value: "center" as const, text: "Center", Icon: AlignCenter },
    { value: "right" as const, text: "Right", Icon: AlignRight },
  ];
  return <div className="flex flex-wrap items-center justify-between gap-2">
    <Label className="text-xs text-stone-600">{label} alignment</Label>
    <div role="group" aria-label={label + " alignment"} className="inline-flex flex-wrap gap-1">
      {choices.map(({ value: option, text, Icon }) =>
        <Button key={option} type="button" size="sm" variant={(value || "left") === option ? "secondary" : "outline"}
          aria-pressed={(value || "left") === option} onClick={() => onChange(option)}>
          <Icon className="mr-1 h-4 w-4" />{text}
        </Button>)}
    </div>
  </div>;
}

function RepeatedStrings({ items, onChange, addLabel }: {
  items: string[]; onChange: (items: string[]) => void; addLabel: string;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div className="flex items-center gap-2" key={index}>
          <Textarea rows={2} value={item}
            aria-label={"Item " + (index + 1)}
            onChange={(event) => onChange(items.map((value, i) => i === index ? event.target.value : value))} />
          <Button size="icon-sm" variant="ghost" title="Remove item" aria-label="Remove item"
            onClick={() => onChange(items.filter((_, i) => i !== index))}><Trash2 /></Button>
        </div>
      ))}
      <Button size="sm" variant="outline" onClick={() => onChange([...items, ""])}><Plus />{addLabel}</Button>
    </div>
  );
}

function BlockFields({ block, onChange, reviewSelection }: {
  block: CmsBlock;
  onChange: (block: CmsBlock) => void;
  reviewSelection?: { excerpt: string; requestId: number };
}) {
  const heading = "heading" in block ? block.heading || "" : null;
  const headingField = heading !== null
    ? <div className="space-y-2">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-0 flex-1">
            <Field label="Section heading" value={heading}
              onChange={(value) => onChange({ ...block, heading: value } as CmsBlock)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor={"cms-heading-level-" + block.id} className="text-xs text-stone-600">Heading level</Label>
            <select id={"cms-heading-level-" + block.id} aria-label="Section heading level"
              value={block.headingLevel ?? "h2"}
              onChange={(event) => onChange({ ...block, headingLevel: event.target.value as CmsSectionHeadingLevel })}
              className="h-9 rounded-md border border-stone-300 bg-white px-3 text-sm">
              <option value="h2">H2</option>
              <option value="h3">H3</option>
              <option value="h4">H4</option>
            </select>
          </div>
        </div>
        <AlignmentControl label="Section heading" value={block.headingAlign}
          onChange={(headingAlign) => onChange({ ...block, headingAlign })} />
      </div> : null;

  switch (block.type) {
    case "hero":
      return <div className="space-y-3">
        <Field label="Page H1" value={block.heading} onChange={(heading) => onChange({ ...block, heading })} />
        <AlignmentControl label="Page H1" value={block.headingAlign}
          onChange={(headingAlign) => onChange({ ...block, headingAlign })} />
        <Field label="Subheading" value={block.subheading} multiline onChange={(subheading) => onChange({ ...block, subheading })} />
        <AlignmentControl label="Subheading" value={block.subheadingAlign}
          onChange={(subheadingAlign) => onChange({ ...block, subheadingAlign })} />
      </div>;
    case "quick_answer":
      return <div className="space-y-3">{headingField}
        <Field label="Direct answer" value={block.answer} multiline onChange={(answer) => onChange({ ...block, answer })} />
      </div>;
    case "urgent_care":
    case "list":
      return <div className="space-y-3">{headingField}
        <RepeatedStrings items={block.items} addLabel="Add item" onChange={(items) => onChange({ ...block, items })} />
      </div>;
    case "rich_text":
      return <div className="space-y-3">{headingField}
        <p className="text-xs text-stone-500">Uses the same rich-text engine as the Blog editor. This preview does not publish content.</p>
        <BlogEditor content={block.html} onChange={(html) => onChange({ ...block, html })} reviewSelection={reviewSelection} />
      </div>;
    case "causes":
      return <div className="space-y-3">{headingField}
        {block.items.map((item, index) => (
          <div key={index} className="space-y-2 rounded-md border p-3">
            <Field label={"Cause " + (index + 1)} value={item.title}
              onChange={(title) => onChange({ ...block, items: block.items.map((entry, i) => i === index ? { ...entry, title } : entry) })} />
            <AlignmentControl label={"Cause " + (index + 1) + " title"} value={item.titleAlign}
              onChange={(titleAlign) => onChange({ ...block, items: block.items.map((entry, i) => i === index ? { ...entry, titleAlign } : entry) })} />
            <Field label="Explanation" multiline value={item.description}
              onChange={(description) => onChange({ ...block, items: block.items.map((entry, i) => i === index ? { ...entry, description } : entry) })} />
            <Button variant="ghost" size="sm" onClick={() => onChange({ ...block, items: block.items.filter((_, i) => i !== index) })}><Trash2 /> Remove cause</Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => onChange({ ...block, items: [...block.items, { title: "", description: "" }] })}><Plus /> Add cause</Button>
      </div>;
    case "symptoms":
      return <div className="space-y-3">{headingField}
        {block.items.map((item, index) => (
          <div className="flex flex-col sm:flex-row gap-2 items-start" key={index}>
            <div className="flex-1 w-full">
              <Field label={"Symptom " + (index + 1)} value={item.text}
                onChange={(text) => onChange({ ...block, items: block.items.map((entry, i) => i === index ? { ...entry, text } : entry) })} />
            </div>
            <div className="space-y-1">
              <Label className="text-sm text-stone-600">Severity</Label>
              <select className="rounded-md border p-2 text-sm" value={item.severity}
                onChange={(event) => onChange({ ...block, items: block.items.map((entry, i) =>
                  i === index ? { ...entry, severity: event.target.value as "mild" | "moderate" | "severe" } : entry) })}>
                <option value="mild">Mild</option><option value="moderate">Moderate</option><option value="severe">Severe</option>
              </select>
            </div>
            <Button variant="ghost" size="icon-sm" aria-label="Remove symptom" title="Remove symptom"
              onClick={() => onChange({ ...block, items: block.items.filter((_, i) => i !== index) })}><Trash2 /></Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => onChange({ ...block, items: [...block.items, { text: "", severity: "mild" }] })}><Plus /> Add symptom</Button>
      </div>;
    case "faq":
      return <div className="space-y-3">{headingField}
        {block.items.map((item, index) => (
          <div className="space-y-2 rounded-md border p-3" key={index}>
            <Field label={"Question " + (index + 1)} value={item.question}
              onChange={(question) => onChange({ ...block, items: block.items.map((entry, i) => i === index ? { ...entry, question } : entry) })} />
            <Field label="Answer" multiline value={item.answer}
              onChange={(answer) => onChange({ ...block, items: block.items.map((entry, i) => i === index ? { ...entry, answer } : entry) })} />
            <Button variant="ghost" size="sm" onClick={() => onChange({ ...block, items: block.items.filter((_, i) => i !== index) })}><Trash2 /> Remove FAQ</Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => onChange({ ...block, items: [...block.items, { question: "", answer: "" }] })}><Plus /> Add FAQ</Button>
      </div>;
    case "related_links":
      return <div className="space-y-3">{headingField}
        {block.links.map((item, index) => (
          <div className="rounded-md border p-3 space-y-2" key={index}>
            <Field label="Link text" value={item.title} onChange={(title) => onChange({ ...block, links: block.links.map((entry, i) => i === index ? { ...entry, title } : entry) })} />
            <Field label="Internal URL" value={item.url} onChange={(url) => onChange({ ...block, links: block.links.map((entry, i) => i === index ? { ...entry, url } : entry) })} />
            <Button variant="ghost" size="sm" onClick={() => onChange({ ...block, links: block.links.filter((_, i) => i !== index) })}><Trash2 /> Remove link</Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => onChange({ ...block, links: [...block.links, { title: "", url: "" }] })}><Plus /> Add link</Button>
      </div>;
    case "image": {
      const image = block.image;
      const previewUrl = image?.url &&
        (image.url.startsWith("https://") || image.url.startsWith("http://") ||
         (image.url.startsWith("/") && !image.url.startsWith("//"))) ? image.url : "";
      return <div className="space-y-3">{headingField}
        <div className="flex flex-wrap items-center gap-2">
          <CmsMediaPicker buttonText={image?.url ? "Replace image" : "Choose / Upload image"}
            onSelect={selected => onChange({ ...block, image: selected })} />
          {image && <Button type="button" size="sm" variant="outline"
            onClick={() => onChange({ ...block, image: null })}>
            <Trash2 className="mr-1 h-4 w-4" />Remove image
          </Button>}
        </div>
        {previewUrl && <img src={previewUrl} alt={image?.altText || "Selected media preview"}
          className="h-auto max-h-72 w-full rounded-lg border bg-stone-50 object-contain" />}
        {!image && <p className="rounded-md bg-amber-50 p-3 text-xs text-amber-900">
          No image selected. This unfinished block can be saved as a private draft, but cannot be TEST-published.
        </p>}
        {image && <>
          <CmsImageAltField image={image}
            onChange={updated => onChange({ ...block, image: updated })} />
          <label className="flex items-center gap-2 text-xs text-stone-700">
            <input type="checkbox" checked={!!image.decorative}
              onChange={event => onChange({ ...block, image: {
                ...image, decorative: event.target.checked, altText: event.target.checked ? "" : image.altText,
              } })} />
            Purely decorative image (empty alt text is intentional)
          </label>
          <Field label="Caption" value={image.caption || ""}
            onChange={caption => onChange({ ...block, image: { ...image, caption } })} />
        </>}
        <details className="text-sm">
          <summary className="cursor-pointer font-medium text-teal-800">Use approved image URL instead</summary>
          <div className="mt-2">
            <Field label="Image URL" value={image?.url || ""} onChange={url => onChange({
              ...block, image: url.trim() ? { ...(image || { altText: "" }), url: url.trim() } : null,
            })} />
          </div>
        </details>
      </div>;
    }
    case "table":
      return <div className="space-y-3">{headingField}
        <div className="grid gap-2 sm:grid-cols-2">
          {block.headers.map((header, index) => (
            <Field key={index} label={"Column " + (index + 1) + " heading"} value={header}
              onChange={(value) => onChange({ ...block, headers: block.headers.map((entry, i) => i === index ? value : entry) })} />
          ))}
        </div>
        {block.rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap items-end gap-2 rounded-md border p-2">
            {block.headers.map((_, colIndex) => (
              <div className="min-w-32 flex-1" key={colIndex}>
                <Field label={"Row " + (rowIndex + 1) + " cell " + (colIndex + 1)}
                  value={row[colIndex] || ""}
                  onChange={(value) => onChange({ ...block, rows: block.rows.map((r, i) =>
                    i === rowIndex ? block.headers.map((__, j) => j === colIndex ? value : r[j] || "") : r) })} />
              </div>
            ))}
            <Button variant="ghost" size="icon-sm" title="Remove row" aria-label="Remove row"
              onClick={() => onChange({ ...block, rows: block.rows.filter((_, i) => i !== rowIndex) })}><Trash2 /></Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => onChange({ ...block, rows: [...block.rows, block.headers.map(() => "")] })}><Plus /> Add row</Button>
      </div>;
    case "cta":
      return <div className="space-y-3">{headingField}
        <Field label="Description" multiline value={block.description} onChange={(description) => onChange({ ...block, description })} />
        <Field label="Button label" value={block.buttonLabel} onChange={(buttonLabel) => onChange({ ...block, buttonLabel })} />
        <Field label="Button URL" value={block.buttonUrl} onChange={(buttonUrl) => onChange({ ...block, buttonUrl })} />
      </div>;
  }
}

export default function CmsBlockEditor({
  document,
  onChange,
  focusReview,
}: {
  document: CmsDocument;
  onChange: (document: CmsDocument) => void;
  focusReview?: { blockId: string; excerpt: string; requestId: number } | null;
}) {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [newType, setNewType] = useState<BlockType>("rich_text");
  const [error, setError] = useState<string | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  // Session-local undo stack. Does not modify a saved revision until Save Draft.
  const [deletedBlocks, setDeletedBlocks] = useState<Array<{ block: CmsBlock; index: number }>>([]);
  useEffect(() => { setDeletedBlocks([]); setError(null); }, [document.hubId, document.slug]);
  const positionWarning = getCmsUrgentCarePositionWarning(document.blocks, document.contentType);
  const headingWarnings = getCmsHeadingOrderWarnings(document.blocks);
  useEffect(() => {
    if (!focusReview || !document.blocks.some(block => block.id === focusReview.blockId)) return;
    const { blockId, excerpt } = focusReview;
    setExpandedIds(previous => previous.includes(blockId) ? previous : [...previous, blockId]);
    // Wait for the selected CMS block and its fields to mount before scrolling.
    const timeout = window.setTimeout(() => {
      const section = window.document.getElementById("cms-block-" + blockId);
      section?.scrollIntoView({ behavior: "smooth", block: "center" });
      // Standard text controls are selected here; TipTap rich text handles its
      // own transient ProseMirror selection via the reviewSelection prop.
      const inputs = section?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea");
      for (const input of Array.from(inputs || [])) {
        const offset = input.value.indexOf(excerpt);
        if (offset >= 0 && excerpt.trim()) {
          input.focus();
          input.setSelectionRange(offset, offset + excerpt.length);
          break;
        }
      }
    }, 120);
    return () => window.clearTimeout(timeout);
  }, [focusReview?.requestId]);


  const emit = (blocks: CmsBlock[]) => onChange({ ...document, blocks });

  const update = (next: CmsBlock) => {
    const blocks = document.blocks.map((block) => block.id === next.id ? next : block);
    // Page Header H1 and Page title are the same public headline.
    // Keep both fields synchronized for existing snapshots and future editing.
    if (next.type === "hero") {
      onChange({ ...document, title: next.heading, blocks });
    } else {
      emit(blocks);
    }
  };

  const move = (from: number, to: number) => {
    const result = moveCmsBlock(document.blocks, from, to, document.contentType);
    if (!result.ok) { setError(result.reason); return; }
    setError(null);
    emit(result.blocks);
  };

  const add = () => {
    const block = newBlock(newType);
    // Restore the H1 to the saved document title, not a blank hero heading.
    if (block.type === "hero") block.heading = document.title;
    const result = insertCmsBlock(document.blocks, block, document.contentType);
    if (!result.ok) { setError(result.reason); return; }
    setError(null);
    emit(result.blocks);
    setExpandedIds((prev) => [...prev, block.id]);
  };

  const remove = (id: string) => {
    const block = document.blocks.find(entry => entry.id === id);
    if (!block) return;
    if (block.type === "urgent_care" && isMedical(document.contentType) &&
        !window.confirm("Remove Urgent Care from this PRIVATE DRAFT? You can add it back later. Medical TEST publishing will remain blocked until valid emergency guidance is restored.")) return;
    if (block.type === "hero" &&
        !window.confirm("Remove the Page Header section from this PRIVATE DRAFT? The page title/H1 remains; its header subheading and alignment settings will be removed. You can add the section back.")) return;
    const index = document.blocks.findIndex(entry => entry.id === id);
    const blocks = document.blocks.filter(entry => entry.id !== id);
    const issue = validateCmsBlockOrder(blocks, document.contentType);
    if (issue) { setError(issue); return; }
    setError(null);
    setDeletedBlocks(previous => [...previous.slice(-19), { block, index }]);
    emit(blocks);
    setExpandedIds(previous => previous.filter(item => item !== id));
  };

  const undoDelete = () => {
    const last = deletedBlocks[deletedBlocks.length - 1];
    if (!last) return;
    const result = restoreCmsDeletedBlock(document.blocks, last, document.contentType);
    if (!result.ok) { setError(result.reason); return; }
    setError(null);
    emit(result.blocks);
    setDeletedBlocks(previous => previous.slice(0, -1));
    setExpandedIds(previous => [...previous.filter(id => id !== last.block.id), last.block.id]);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>, target: number) => {
    event.preventDefault();
    const source = document.blocks.findIndex((block) => block.id === draggedId);
    setDraggedId(null);
    if (source >= 0 && source !== target) move(source, target);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-stone-500">Drag sections or use the arrows to arrange your private draft. Page title remains the single H1. All section headings default to H2.</p>
      {deletedBlocks.length > 0 && <div role="status" className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-teal-200 bg-teal-50 p-3 text-sm text-teal-900">
        <span>{BLOCK_LABELS[deletedBlocks[deletedBlocks.length - 1].block.type]} removed from this draft ({deletedBlocks.length} undo{deletedBlocks.length === 1 ? "" : "s"} available).</span>
        <Button type="button" variant="outline" size="sm" onClick={undoDelete}>Undo Delete</Button>
      </div>}
      {positionWarning && <div role="status" className="flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" /><span>{positionWarning}</span>
      </div>}
      {headingWarnings.length > 0 && <div role="status" className="space-y-1 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
        <p className="font-medium">Heading structure suggestions (not blocking draft saves)</p>
        {headingWarnings.map((warning, index) => <p key={index}>{warning}</p>)}
      </div>}
      {error && <div role="alert" className="flex gap-2 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
        <AlertTriangle className="h-4 w-4 shrink-0" />{error}
      </div>}
      {document.blocks.map((block, index) => {
        const expanded = expandedIds.includes(block.id);
        const publicationRequired = block.type === "urgent_care" && isMedical(document.contentType);
        return (
          <div id={"cms-block-" + block.id} key={block.id} className={"scroll-mt-28 rounded-xl border bg-white shadow-sm " + (draggedId === block.id ? "opacity-60" : "") + (focusReview?.blockId === block.id ? " ring-2 ring-amber-300" : "")}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => onDrop(event, index)}>
            <div className="flex items-center gap-2 p-3">
              <span draggable onDragStart={() => setDraggedId(block.id)} onDragEnd={() => setDraggedId(null)}
                className="cursor-grab p-1 text-stone-400" title="Drag section" aria-label="Drag section">
                <GripVertical size={18} />
              </span>
              <button type="button" className="flex-1 text-left text-sm font-medium"
                onClick={() => setExpandedIds((prev) => expanded ? prev.filter((id) => id !== block.id) : [...prev, block.id])}>
                {BLOCK_LABELS[block.type]}{block.type === "hero" ? ": " + document.title : "heading" in block && block.heading ? ": " + block.heading : ""}
                {publicationRequired && <span className="ml-2 text-xs font-normal text-amber-700">(required for TEST publication)</span>}
                {block.type === "hero" && <span className="ml-2 text-xs font-normal text-stone-500">(H1 always displays at the top)</span>}
              </button>
              <Button variant="ghost" size="icon-sm" aria-label="Move section up" title="Move section up"
                disabled={index === 0} onClick={() => move(index, index - 1)}><ArrowUp /></Button>
              <Button variant="ghost" size="icon-sm" aria-label="Move section down" title="Move section down"
                disabled={index === document.blocks.length - 1} onClick={() => move(index, index + 1)}><ArrowDown /></Button>
              <Button variant="ghost" size="icon-sm" aria-label={"Remove " + BLOCK_LABELS[block.type] + " section"}
                title="Remove section from private draft" onClick={() => remove(block.id)}><Trash2 /></Button>
              <Button variant="ghost" size="icon-sm" aria-label={expanded ? "Collapse section" : "Expand section"}
                onClick={() => setExpandedIds((prev) => expanded ? prev.filter((id) => id !== block.id) : [...prev, block.id])}>
                {expanded ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
            {expanded && <div className="border-t p-4">
              {focusReview?.blockId === block.id && <div className="mb-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                Flagged passage selected for review where found. Selection does not change your saved content.
              </div>}
              <BlockFields block={block.type === "hero" ? { ...block, heading: document.title } : block}
                onChange={update}
                reviewSelection={focusReview?.blockId === block.id ? { excerpt: focusReview.excerpt, requestId: focusReview.requestId } : undefined}/>
            </div>}
          </div>
        );
      })}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-dashed p-4">
        <Label htmlFor="cms-new-block">Add a section</Label>
        <select id="cms-new-block" className="rounded-md border bg-white p-2 text-sm"
          value={newType} onChange={(event) => setNewType(event.target.value as BlockType)}>
          {Object.entries(BLOCK_LABELS).map(([type, label]) => <option key={type} value={type}>{label}</option>)}
        </select>
        <Button variant="outline" size="sm" onClick={add}><Plus /> Add block</Button>
        <span className="text-xs text-stone-500">New sections appear at the end; arrange them freely afterward.</span>
      </div>
    </div>
  );
}

/** Separate slot controls; no implicit syncing among featured, hero and OG. */
export function CmsImageSlotsEditor({
  value,
  onChange,
}: {
  value: CmsDocument["images"];
  onChange: (value: CmsDocument["images"]) => void;
}) {
  const social = resolveCmsSocialImage(value);
  const types = [
    ["featured", "Featured Image", "Shown on Oral Health Hub cards and listing thumbnails."],
    ["hero", "Hero Image", "Shown in the article header, independent from Featured Image."],
    ["og", "Social / Open Graph Image", "Optional social override; if omitted, the Featured Image is used."],
  ] as const;
  return <div className="space-y-3">
    {types.map(([slot, title, description]) => {
      const image: CmsImage | null | undefined = value[slot];
      const change = (updated: CmsImage | null) => onChange({ ...value, [slot]: updated });
      const safe = image?.url && (image.url.startsWith("https://") || image.url.startsWith("http://") || (image.url.startsWith("/") && !image.url.startsWith("//"))) ? image.url : "";
      return <section key={slot} className="rounded-lg border border-stone-200 bg-white p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div><h3 className="!text-base font-semibold text-stone-900">{title}</h3>
            <p className="mt-1 text-xs text-stone-500">{description}</p></div>
          <div className="flex flex-wrap gap-2">
            <CmsMediaPicker buttonText={image?.url ? "Replace image" : "Select image"} onSelect={change}/>
            {image?.url && <Button type="button" variant="ghost" size="sm" onClick={() => change(null)}>
              <Trash2 className="mr-1 h-4 w-4"/>Remove
            </Button>}
          </div>
        </div>
        {image?.url && <div className="mt-3 flex flex-wrap items-start gap-4 rounded-lg bg-stone-50 p-3">
          {safe && <img src={safe} alt={image.altText || "Selected media preview"} className="h-28 w-44 rounded-md bg-stone-100 object-contain"/>}
          <div className="min-w-[180px] flex-1 space-y-2">
            <div><Label>Image URL</Label><p className="break-all text-xs text-stone-500">{image.url}</p></div>
            <CmsImageAltField image={image} label="Alt text for informative images" onChange={change} />
            <label className="flex items-center gap-2 text-xs text-stone-700">
              <input type="checkbox" checked={!!image.decorative}
                onChange={event => change({...image, decorative:event.target.checked, altText:event.target.checked ? "" : image.altText})}/>
              This image is purely decorative (empty alt text is correct)
            </label>
          </div>
        </div>}
        {!image?.url && <div className="mt-3 rounded-lg border border-dashed border-stone-200 p-4 text-center text-xs text-stone-500">
          No image selected. Choose an image from the Media Library or paste a URL below.
        </div>}
        <details className="mt-3 text-sm">
          <summary className="cursor-pointer font-medium text-teal-800">Use image URL instead</summary>
          <div className="mt-2"><Field label="Image URL" value={image?.url || ""}
            onChange={url => change(url.trim() ? { url: url.trim(), altText: image?.altText || "" } : null)}/></div>
        </details>
      </section>;
    })}
    <p className="rounded-lg bg-teal-50 px-3 py-2 text-xs text-teal-900">
      Social image: {social ? social.url : "No social image selected. The featured image is the fallback; the hero image stays independent."}
    </p>
  </div>;
}
