import type { CmsDocument, CmsImage } from "./cmsBlocks";

/**
 * Alt text is the ONLY property synchronized. Neither the file, image URLs,
 * captions, titles, nor filenames are changed here.
 */
export type MediaIdentity = { id: number; urls: readonly string[] };

function isLinked(image: CmsImage | null | undefined, media: MediaIdentity): boolean {
  return !!image && (image.mediaId === media.id || media.urls.includes(image.url));
}

export function syncHtmlImageAlt(html: string, media: MediaIdentity, altText: string) {
  let references = 0;
  let changed = false;
  // Quoted attributes may include >; never rewrite non-image tags or text.
  const output = html.replace(/<img\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi, tag => {
    const src = tag.match(/(?:^|\s)src\s*=\s*(?:(["'])(.*?)\1|([^\s>]+))/i);
    const url = (src?.[2] || src?.[3] || "").replace(/&amp;/g, "&");
    if (!media.urls.includes(url)) return tag;
    references++;
    const alt = tag.match(/(\s+alt\s*=\s*)(["'])(.*?)\2/i);
    // Preserve quote style, escape special HTML characters.
    const quote = alt?.[2] || '"';
    const escaped = altText.replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    const next = alt
      ? tag.replace(alt[0], alt[1] + quote + escaped + quote)
      : tag.replace(/(\s*\/?>)$/, " alt=\"" + escaped + "\"$1");
    if (next !== tag) changed = true;
    return next;
  });
  return { html: output, references, changed };
}

export function syncCmsDocumentAlt(document: CmsDocument, media: MediaIdentity, altText: string) {
  let references = 0;
  let changed = false;
  const patchImage = (image: CmsImage | null | undefined) => {
    if (!isLinked(image, media)) return image;
    references++;
    // A decorative placement must retain alt=""; do not overwrite it.
    if (!image || image.decorative || image.altText === altText) return image;
    changed = true;
    return { ...image, altText };
  };
  const images = { ...document.images,
    featured: patchImage(document.images.featured),
    hero: patchImage(document.images.hero),
    og: patchImage(document.images.og),
  };
  const blocks: CmsDocument["blocks"] = document.blocks.map(block => {
    if (block.type === "image") {
      return { ...block, image: patchImage(block.image) ?? null };
    }
    if (block.type === "rich_text") {
      const result = syncHtmlImageAlt(block.html, media, altText);
      references += result.references;
      changed ||= result.changed;
      return result.changed ? { ...block, html: result.html } : block;
    }
    return block;
  });
  return {
    document: changed ? { ...document, images, blocks } as CmsDocument : document,
    references,
    changed,
  };
}


/** Alt attributes auto-save independently; every other CMS edit remains a draft edit. */
export function isOnlyCmsAltChange(previous: CmsDocument, next: CmsDocument): boolean {
  const normalize = (doc: CmsDocument) => ({
    ...doc,
    images: Object.fromEntries(Object.entries(doc.images).map(([slot, image]) => [
      slot, image ? { ...image, altText: "" } : image,
    ])),
    blocks: doc.blocks.map(block => block.type === "image"
      ? { ...block, image: block.image ? { ...block.image, altText: "" } : block.image }
      : block),
  });
  return JSON.stringify(previous) !== JSON.stringify(next) &&
    JSON.stringify(normalize(previous)) === JSON.stringify(normalize(next));
}
