export type BlogCardHero = {
  url: string;
  alt: string;
  source: "featured" | "top-body-image";
};

type BlogCardHeroInput = {
  title: string;
  featuredImage?: string | null;
  topBodyMarkup?: string | null;
};

const ALLOWED_IMAGE_URL = /^(?:https?:\/\/|\/)/i;

function imageUrl(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed && ALLOWED_IMAGE_URL.test(trimmed) ? trimmed : null;
}

function imageAttribute(attributes: string, name: "src" | "alt"): string | null {
  const match = attributes.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return match ? (match[1] ?? match[2] ?? match[3] ?? "") : null;
}

/**
 * Returns an image only when article markup begins with an image or an
 * image-only presentational wrapper. This intentionally excludes images after
 * headings, paragraphs, or other body content, so section illustrations do not
 * become Hub card heroes.
 */
export function selectBlogCardHero({ title, featuredImage, topBodyMarkup }: BlogCardHeroInput): BlogCardHero | null {
  const explicitHero = imageUrl(featuredImage);
  if (explicitHero) {
    return { url: explicitHero, alt: title, source: "featured" };
  }

  const markup = topBodyMarkup?.trimStart();
  if (!markup) return null;

  const topImage = markup.match(/^(?:(?:<figure\b[^>]*>\s*)?(?:<picture\b[^>]*>\s*)?|<p\b[^>]*>\s*)<img\b([^>]*)>/i);
  if (!topImage) return null;

  const url = imageUrl(imageAttribute(topImage[1], "src"));
  if (!url) return null;

  return {
    url,
    alt: imageAttribute(topImage[1], "alt") || title,
    source: "top-body-image",
  };
}
