import type { CmsDocument } from "./cmsBlocks";
import { getCmsReadabilityStructure } from "./cmsReadabilityStructure";
import { passesCmsLongSentenceRate, passesCmsSectionStructure } from "./cmsReadabilityUiPolicy";

/**
 * Editorial SEO heuristics for the Advanced CMS.
 *
 * No network requests, search-engine ranking claims, or automatic publishing.
 * Designed to run identically in the browser and unit tests. Measurements are
 * estimates; editor judgment and clinical governance remain essential.
 */
export type CmsSeoStatus = "good" | "improve" | "critical" | "info";
export type CmsSeoCategory = "Keyphrase" | "Metadata" | "Content" | "Links" | "Images" | "Readability";
export interface CmsSeoCheck {
  id: string;
  category: CmsSeoCategory;
  title: string;
  detail: string;
  status: CmsSeoStatus;
  points: number;
  maxPoints: number;
}
export interface CmsSeoMetric {
  wordCount: number;
  keywordOccurrences: number;
  keywordDensity: number;
  internalLinks: number;
  externalLinks: number;
  averageSentenceWords: number;
  longSentencePercent: number;
  longParagraphs: number;
  imagesWithoutAlt: number;
  imagesWithAlt: number;
  imagesWeakAlt: number;
  decorativeImages: number;
  imageCount: number;
  headingCount: number;
}
export interface CmsSeoSecondary {
  phrase: string;
  matches: number;
  inHeading: boolean;
}
export interface CmsSeoReport {
  score: number;
  checks: CmsSeoCheck[];
  metrics: CmsSeoMetric;
  secondary: CmsSeoSecondary[];
  synonyms: CmsSeoSecondary[];
}
export interface CmsSeoLinkCandidate { slug: string; title: string; path?: string }
export interface CmsSeoSuggestedLink extends CmsSeoLinkCandidate { url: string; reason: string }

const WORDS = new RegExp(String.raw`[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*`, "gu");
const SITE_HOST = "dentasmart.ai";

function tokenize(text: string): string[] {
  return (text.toLocaleLowerCase("en").match(WORDS) || []).map((word) => word.replace(/[’]/g, "'"));
}

/** Conservative singular/plural matching for placements, not body density. */
function sameKeywordForm(a: string, b: string): boolean {
  if (a === b) return true;
  if (a.length < 4 || b.length < 4) return false;
  const singular = (value: string) => value.endsWith("s") && !/(ss|us|is)$/.test(value)
    ? value.slice(0, -1) : value;
  return singular(a) === singular(b);
}
function containsPhrase(text: string, phrase: string): boolean {
  const terms = tokenize(text);
  const needle = tokenize(phrase);
  if (!needle.length) return false;
  for (let start = 0; start <= terms.length - needle.length; start++) {
    if (needle.every((word, i) => sameKeywordForm(terms[start + i], word))) return true;
  }
  return false;
}
/** Shared word counting for SEO and readability cards. */
export function cmsSeoWords(value: string): string[] { return tokenize(value); }

function countPhrase(haystack: string[], needle: string[]): number {
  if (!needle.length || needle.length > haystack.length) return 0;
  let count = 0;
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    if (needle.every((term, index) => term === haystack[i + index])) count++;
  }
  return count;
}

function decodeEntities(value: string): string {
  return value
    .replace(/&#(x[\da-f]+|\d+);/gi, (match, code: string) => {
      const parsed = code[0].toLowerCase() === "x"
        ? parseInt(code.slice(1), 16) : parseInt(code, 10);
      return parsed > 0 && parsed <= 0x10ffff && !(parsed >= 0xd800 && parsed <= 0xdfff)
        ? String.fromCodePoint(parsed) : match;
    })
    .replace(/&(?:nbsp|amp|quot|apos|lt|gt);/gi, (entity) => {
      const names: Record<string, string> = {
        "&nbsp;": " ", "&amp;": "&", "&quot;": '"', "&apos;": "'", "&lt;": "<", "&gt;": ">",
      };
      return names[entity.toLowerCase()] || entity;
    });
}

/** An approximate text extractor, not an HTML sanitizer or DOM parser. */
export function cmsSeoPlainText(html: string): string {
  return decodeEntities(html
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim());
}

/** Collect images embedded in rich text for editorial analysis, never for rendering. */
function richTextImages(html: string): Array<{ url: string; altText: string }> {
  const safe = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, " ");
  const images: Array<{ url: string; altText: string; decorative?: boolean }> = [];
  const getAttribute = (tag: string, attr: "src" | "alt"): string => {
    const match = attr === "src"
      ? tag.match(/\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i)
      : tag.match(/\balt\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    return decodeEntities(match?.[1] ?? match?.[2] ?? match?.[3] ?? "");
  };
  for (const tag of Array.from(safe.matchAll(/<img\b[^>]*>/gi))) {
    const url = getAttribute(tag[0], "src");
    if (url.trim()) images.push({ url, altText: getAttribute(tag[0], "alt") });
  }
  return images;
}

function richTextHrefs(html: string): string[] {
  const safe = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, " ");
  const matches: string[] = [];
  for (const hit of Array.from(safe.matchAll(/<a\s+[^>]*\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')[^>]*>/gi))) {
    matches.push(decodeEntities(hit[1] ?? hit[2] ?? ""));
  }
  return matches;
}

export function isCmsInternalLink(href: string): boolean {
  const url = href.trim();
  if (url.startsWith("/") && !url.startsWith("//") && !url.startsWith("/\\")) return true;
  try {
    const parsed = new URL(url);
    return (parsed.protocol === "http:" || parsed.protocol === "https:") &&
      (parsed.hostname.toLowerCase() === SITE_HOST || parsed.hostname.toLowerCase() === "www." + SITE_HOST);
  } catch { return false; }
}
function isCmsExternalLink(href: string): boolean {
  try {
    const parsed = new URL(href.trim());
    return (parsed.protocol === "https:" || parsed.protocol === "http:") && !isCmsInternalLink(href);
  } catch { return false; }
}

interface Extracted {
  text: string;
  paragraphs: string[];
  headings: string[];
  links: string[];
  images: Array<{ url: string; altText: string; decorative?: boolean }>;
  intro: string;
}
export function extractCmsSeoContent(document: CmsDocument): Extracted {
  const paragraphs: string[] = [];
  const headings: string[] = [];
  const links: string[] = [];
  const images: Array<{ url: string; altText: string }> = [];
  const add = (text: string | undefined) => { if (text?.trim()) paragraphs.push(text.trim()); };
  for (const block of document.blocks) {
    if (block.type === "hero") { add(block.subheading); continue; }
    if ("heading" in block && block.heading?.trim()) headings.push(block.heading.trim());
    switch (block.type) {
      case "quick_answer": add(block.answer); break;
      case "urgent_care": block.items.forEach(add); break;
      case "rich_text": {
        const html = block.html;
        // Treat explicit paragraph/list elements as independent readability units.
        const pieces = html.split(/<\/(?:p|li|div|blockquote|h[1-6])\s*>/gi);
        for (const piece of pieces) add(cmsSeoPlainText(piece));
        for (const heading of Array.from(html.matchAll(/<h[2-6]\b[^>]*>([\s\S]*?)<\/h[2-6]>/gi))) {
          const label = cmsSeoPlainText(heading[1]);
          if (label) headings.push(label);
        }
        links.push(...richTextHrefs(html));
        images.push(...richTextImages(html));
        break;
      }
      case "causes": block.items.forEach((item) => { headings.push(item.title); add(item.description); }); break;
      case "symptoms": block.items.forEach((item) => add(item.text)); break;
      case "list": block.items.forEach(add); break;
      case "faq": block.items.forEach((item) => { headings.push(item.question); add(item.answer); }); break;
      case "related_links": block.links.forEach((item) => links.push(item.url)); break;
      case "image": if (block.image?.url?.trim()) images.push(block.image); break;
      case "table": {
        block.headers.forEach((header) => headings.push(header));
        block.rows.flat().forEach(add);
        break;
      }
      case "cta": add(block.description); links.push(block.buttonUrl); break;
    }
  }
  // Only actual on-page placements count here: the hero and content images.
  // Featured thumbnails and Open Graph images are metadata placements, not
  // extra article images; counting them would inflate the alt-text denominator.
  if (document.images.hero?.url?.trim()) images.push(document.images.hero);
  return {
    text: paragraphs.join(" "),
    paragraphs,
    headings: headings.filter(Boolean),
    links,
    images,
    intro: paragraphs.join(" ").split(/\s+/).slice(0, 120).join(" "),
  };
}

/** Shared body extraction: heading labels are structure, not prose sentences. */
export function extractCmsReadabilityContent(document: CmsDocument): ReturnType<typeof extractCmsSeoContent> {
  return extractCmsSeoContent({
    ...document,
    blocks: document.blocks.map(block => block.type === "rich_text"
      ? { ...block, html: block.html.replace(/<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]\s*>/gi, " ") }
      : block),
  });
}

/**
 * A fixed 100-point checklist. Scores measure on-page editorial signals only,
 * not ranking, E-E-A-T, technical crawl health or medical correctness.
 */
/** Blog-only editor scoring options; other CMS Hub pages keep their established rubric. */
export function analyzeCmsSeo(document: CmsDocument, options: { requireOnPageImage?: boolean; matchReadabilityPanel?: boolean } = {}): CmsSeoReport {
  const seo = document.seo;
  const focus = seo.focusKeyword.trim();
  const data = extractCmsSeoContent(document);
  const structure = getCmsReadabilityStructure(document);
  // Opt-in for the original Blog Editor: derive sentence and paragraph metrics
  // from the same body-only text as the Readability panel (no embedded headings).
  const readingData = options.matchReadabilityPanel ? extractCmsReadabilityContent(document) : data;
  const readingWordCount = tokenize(readingData.text).length;
  const bodyTokens = tokenize(data.text);
  const frequency = countPhrase(bodyTokens, tokenize(focus));
  const density = bodyTokens.length && focus ? (frequency / bodyTokens.length) * 100 : 0;
  const sentenceLengths = readingData.text.split(/[.!?]+(?:\s+|$)/).map((s) => tokenize(s).length).filter(Boolean);
  const avgSentence = sentenceLengths.length ? sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length : 0;
  const longSentencePercent = sentenceLengths.length
    ? Math.round(1000 * sentenceLengths.filter(length => length > 20).length / sentenceLengths.length) / 10 : 0;
  const longParagraphs = readingData.paragraphs.filter((p) => tokenize(p).length > 75).length;
  const internalLinks = new Set(data.links.filter(isCmsInternalLink).map((link) => {
    const pathname = new URL(link, "https://" + SITE_HOST).pathname;
    return pathname.replace(/\\/g, "/").replace(/\/+$/, "") || "/";
  })).size;
  const externalLinks = new Set(data.links.filter(isCmsExternalLink).map((link) => link.split("#")[0])).size;
  const imagesWithoutAlt = data.images.filter((image) => !image.altText.trim() && !image.decorative).length;
  const imagesWithAlt = data.images.filter((image) => !!image.altText.trim() && !image.decorative).length;
  const imagesWeakAlt = data.images.filter(image =>
    !image.decorative && /^(?:image|photo|picture|pasted image|untitled|screenshot|img[_-]?\d+|[\w-]+\.(?:png|jpe?g|webp))$/i.test(image.altText.trim())
  ).length;
  const decorativeImages = data.images.filter((image) => !!image.decorative).length;
  const synonyms = (seo.synonyms || []).map(phrase => ({
    phrase, matches: countPhrase(bodyTokens, tokenize(phrase)),
    inHeading: data.headings.some(heading => containsPhrase(heading, phrase)),
  }));
  const secondary = seo.secondaryKeywords.map((phrase) => ({
    phrase,
    matches: countPhrase(bodyTokens, tokenize(phrase)),
    inHeading: data.headings.some((heading) => containsPhrase(heading, phrase)),
  }));
  const metrics: CmsSeoMetric = {
    wordCount: bodyTokens.length,
    keywordOccurrences: frequency,
    keywordDensity: Math.round(density * 100) / 100,
    internalLinks, externalLinks,
    averageSentenceWords: Math.round(avgSentence * 10) / 10,
    longSentencePercent, longParagraphs, imagesWithoutAlt, imagesWithAlt, imagesWeakAlt, decorativeImages, imageCount: data.images.length,
    headingCount: data.headings.length,
  };
  const checks: CmsSeoCheck[] = [];
  function add(id: string, category: CmsSeoCategory, title: string, detail: string,
    status: CmsSeoStatus, points: number, maxPoints: number) {
    checks.push({ id, category, title, detail, status, points, maxPoints });
  }
  function test(id: string, category: CmsSeoCategory, title: string, valid: boolean,
    detailGood: string, detailBad: string, weight: number, important = false) {
    add(id, category, title, valid ? detailGood : detailBad, valid ? "good" : important ? "critical" : "improve", valid ? weight : 0, weight);
  }
  test("focus", "Keyphrase", "Primary focus keyphrase", !!focus,
    "One primary keyphrase is configured.", "Add a specific primary search phrase for this page.", 8, true);
  test("h1", "Keyphrase", "Keyphrase in page H1", !!focus && containsPhrase(document.title, focus),
    "The visible page title contains the primary phrase.", "Work the focus phrase naturally into the visible page title if appropriate.", 7);
  const titleLen = seo.metaTitle.trim().length;
  test("seo-title-length", "Metadata", "SEO title length", titleLen >= 30 && titleLen <= 60,
    `SEO title is ${titleLen} characters (guidance: 30–60).`,
    `SEO title is ${titleLen} characters; aim for about 30–60. Search engines may rewrite or truncate titles.`, 8, true);
  test("seo-title-phrase", "Metadata", "Keyphrase in SEO title",
    !!focus && containsPhrase(seo.metaTitle, focus),
    "Primary phrase appears in the SEO title.",
    "Use the primary phrase naturally in the SEO title.", 6);
  const descLen = seo.metaDescription.trim().length;
  test("description-length", "Metadata", "Meta description length", descLen >= 110 && descLen <= 160,
    `Description is ${descLen} characters (guidance: 110–160).`,
    `Description is ${descLen} characters; aim for about 110–160. Snippet display is not guaranteed.`, 8, true);
  test("description-phrase", "Metadata", "Keyphrase in description",
    !!focus && containsPhrase(seo.metaDescription, focus),
    "Description includes the primary phrase naturally.", "Consider including the focus phrase in the description.", 5);
  test("url", "Keyphrase", "Keyphrase in page URL", !!focus && containsPhrase((seo.requestedPath || document.slug).replace(/[/-]/g, " "), focus),
    "The slug contains the primary phrase.",
    "If creating a new page, consider a concise descriptive slug. Do not change existing URLs without redirects.", 5);
  test("intro", "Content", "Keyphrase near the beginning", !!focus && containsPhrase(data.intro, focus),
    "Focus phrase appears within the first 120 words of the body.",
    "Introduce the topic naturally in the opening text or Quick Answer.", 6);
  test("subheading", "Content", "Keyphrase in section headings",
    !!focus && data.headings.some((heading) => containsPhrase(heading, focus)),
    "At least one section heading includes the keyphrase.",
    "Add the keyphrase to a relevant section heading only where it reads naturally.", 5);
  test("body", "Keyphrase", "Keyphrase used in body", !!focus && frequency > 0,
    `Primary phrase appears ${frequency} time(s) in the body.`,
    "The primary phrase was not detected in the page body.", 5);
  const balanced = !!focus && density >= 0.25 && density <= 2.5;
  add("density", "Keyphrase", "Natural keyphrase frequency",
    !focus ? "Choose a keyphrase to evaluate frequency." :
      `${frequency} occurrences across ${bodyTokens.length} words (~${metrics.keywordDensity} per 100 words). Avoid artificial repetition; 0.25–2.5 is an editorial guideline, not a search-engine requirement.`,
    balanced ? "good" : "improve", balanced ? 5 : 0, 5);
  const wordsScore = metrics.wordCount >= 350 ? 8 : metrics.wordCount >= 200 ? 4 : 0;
  add("length", "Content", "Useful content depth",
    `${metrics.wordCount} body words. Coverage and accuracy matter more than length; 350 words is only a review prompt.`,
    wordsScore === 8 ? "good" : "improve", wordsScore, 8);
  test("internal-links", "Links", "Relevant internal links", internalLinks >= 2,
    `${internalLinks} distinct internal links found.`,
    `${internalLinks} internal links found. Add helpful links to genuinely related DentaSmart pages.`, 6);
  const organizedSections = options.matchReadabilityPanel
    ? readingWordCount > 0 && passesCmsSectionStructure(readingWordCount, structure.contentHeadings, structure.emptyHeadings)
    : structure.emptyHeadings === 0 && (structure.contentHeadings >= 2 ||
      (bodyTokens.length < 250 && structure.contentHeadings === 1));
  test("sections", "Content", "Organized section headings", organizedSections,
    `${structure.contentHeadings} populated section heading(s); none empty.`,
    `${structure.contentHeadings} populated section heading(s) and ${structure.emptyHeadings} empty section heading(s). Add useful content under existing headings before treating them as organized sections.`, 2);
  if (data.images.length === 0) {
    add("alt", "Images", "Descriptive image alternative text",
      options.requireOnPageImage
        ? "No image in the article body. Add a relevant on-page image with accurate ALT text to meet DentaSmart\u0027s four-point editorial image goal. Featured and OG images are separate. Google does not require images on every article."
        : "Not applicable: this draft has no images to review. Adding a real image will enable the check.",
      options.requireOnPageImage ? "improve" : "info", 0, 4);
  } else {
    test("alt", "Images", "Descriptive image alternative text", imagesWithoutAlt === 0 && imagesWeakAlt === 0,
       `${imagesWithAlt} of ${data.images.length} on-page images have descriptive alt text${decorativeImages ? ` (plus ${decorativeImages} explicitly decorative)` : ""}. Review descriptions for meaning.`,
      `${imagesWithoutAlt} of ${data.images.length} on-page images have empty alt text; ${imagesWeakAlt} have generic labels needing improvement; ${imagesWithAlt} have alt text; ${decorativeImages} are decorative. Edit the Hero image, image blocks, or embedded Rich Text images.`, 4);
  }
  // Empty body content is not evidence of readable sentences or paragraphs.
  // Keep each check's four-point weight but award no points until there is
  // actual prose. This preserves the 100-point rubric and avoids false passes.
  if (readingWordCount === 0) {
    add("sentences", "Readability", "Readable sentence length",
      "Not evaluated: Please add article body text to check sentence length.",
      "info", 0, 4);
    add("paragraphs", "Readability", "Scannable paragraphs",
      "Not evaluated: Please add article body text to check paragraph length.",
      "info", 0, 4);
  } else {
    test("sentences", "Readability", "Readable sentence length",
      sentenceLengths.length > 0 && (options.matchReadabilityPanel
        ? passesCmsLongSentenceRate(longSentencePercent)
        : avgSentence <= 22 && longSentencePercent <= 25),
      `Average sentence length is ~${metrics.averageSentenceWords} words; ${longSentencePercent}% exceed 20 words.`,
      `Average sentence length is ~${metrics.averageSentenceWords} words; ${longSentencePercent}% exceed 20 words${options.matchReadabilityPanel ? " (review above 25%)" : " (review above 25%, and an average above 22 words)"}. Shorten individual sentences where clarity improves.`, 4);
    test("paragraphs", "Readability", "Scannable paragraphs", longParagraphs === 0,
      "No paragraphs exceed 75 words.",
      `${longParagraphs} paragraph(s) exceed 75 words. Consider splitting where it improves clarity.`, 4);
  }
  const secondaryHit = secondary.filter((entry) => entry.matches > 0 || entry.inHeading).length;
  const secondaryConfigured = secondary.length > 0;
  // Optional means not assessed or scored when no secondary phrases were supplied.
  // Configured secondary phrases are assessed for natural usage as before.
  const secondaryScore = !secondaryConfigured ? 0
    : secondaryHit === secondary.length ? 4
    : secondaryHit >= Math.ceil(secondary.length / 2) ? 2 : 0;
  add("secondary", "Keyphrase", "Secondary keyphrases",
    secondaryConfigured ? `${secondaryHit} of ${secondary.length} configured secondary phrases appear in page content. Never force awkward phrasing.`
      : "Not evaluated: secondary keyphrases are optional and none were configured.",
    !secondaryConfigured ? "info" : secondaryScore === 4 ? "good" : "improve", secondaryScore, 4);

  if (seo.canonicalUrl?.trim()) {
    let status: CmsSeoStatus = "info";
    let detail = "Canonical override supplied; review the URL and ensure it is intended for the public page.";
    try {
      const value = new URL(seo.canonicalUrl);
      if (value.protocol !== "https:" || ![SITE_HOST, "www." + SITE_HOST].includes(value.hostname.toLowerCase())) {
        status = "critical";
        detail = "Canonical must use HTTPS and an intended DentaSmart URL. An incorrect canonical can remove a page from search results.";
      }
    } catch {
      status = "critical";
      detail = "Canonical URL is not a valid absolute HTTPS URL.";
    }
    add("canonical", "Metadata", "Canonical URL review", detail, status, 0, 0);
  } else {
    add("canonical", "Metadata", "Canonical URL review",
      "No override: the website's existing canonical policy remains in control.", "info", 0, 0);
  }
  add("external", "Links", "External source links",
    externalLinks > 0
      ? `${externalLinks} external HTTP(S) link(s) detected. Verify that they are working, relevant and authoritative; counting links does not verify their quality.`
      : "No external source links detected. Consider relevant, authoritative references for factual dental-health claims. This is editorial guidance, not a Google ranking requirement.",
    externalLinks > 0 ? "good" : "improve", 0, 0);

  // Exclude inapplicable criteria from the denominator. CMS hubs do not require images;
  // the Blog Editor deliberately includes four image points as an editorial goal.
  // Missing on-page images count in the Blog Editor only; missing optional secondary phrases never count.
  const applicablePoints = 100 - (data.images.length === 0 && !options.requireOnPageImage ? 4 : 0) - (secondaryConfigured ? 0 : 4);
  const earnedPoints = checks.reduce((sum, check) => sum + check.points, 0);
  return {
    score: Math.max(0, Math.min(100, Math.round(earnedPoints / applicablePoints * 100))),
    checks,
    metrics,
    secondary,
    synonyms,
  };
}

/**
 * Recommend only source-backed URL candidates with a strong topic relationship.
 * Generic terms like "dental", "care" and "dentist" alone are insufficient.
 * These suggestions remain advisory and are never inserted automatically.
 */
export function suggestCmsInternalLinks(
  document: CmsDocument,
  candidates: readonly CmsSeoLinkCandidate[],
): CmsSeoSuggestedLink[] {
  const extracted = extractCmsSeoContent(document);
  const currentPath = "/" + (document.hubId || "conditions") + "/" + document.slug;
  const normalPath = (href: string) => {
    try {
      return new URL(href, "https://" + SITE_HOST).pathname.replace(/\/+$/, "").toLowerCase();
    } catch { return ""; }
  };
  const linked = new Set(extracted.links.filter(isCmsInternalLink).map(normalPath));
  linked.add(normalPath(currentPath));
  const stopWords = new Set(["when","what","which","with","where","who","this","that","from","your",
    "dental","teeth","tooth","dentist","health","care","guide","pain","causes","tips","ways",
    "could","should","know","about","how","does","the","and","for","are","can","you"]);
  const topicTokens = tokenize([document.seo.focusKeyword, document.title].join(" "))
    .filter(word => word.length >= 4 && !stopWords.has(word));
  const keyword = tokenize(document.seo.focusKeyword).filter(word => word.length >= 4);
  const uniq = (values: string[]) => Array.from(new Set(values));
  const titleTerms = uniq(topicTokens);
  return candidates
    .map(candidate => {
      const url = candidate.path || "/conditions/" + candidate.slug;
      if (linked.has(normalPath(url)) || candidate.slug === document.slug) return null;
      const other = uniq(tokenize(candidate.title + " " + candidate.slug.replace(/-/g, " "))
        .filter(word => word.length >= 4 && !stopWords.has(word)));
      const focusHits = keyword.filter(word => other.some(otherWord => sameKeywordForm(word, otherWord))).length;
      const matches = titleTerms.filter(word => other.some(otherWord => sameKeywordForm(word, otherWord)));
      const relevance = focusHits * 6 + matches.length * 2;
      if (!focusHits && matches.length < 2) return null;
      return { slug: candidate.slug, title: candidate.title, url,
        relevance,
        reason: focusHits ? "Matches the main article topic; confirm it adds useful context."
          : "Shares multiple specific topic terms; check relevance before linking." };
    })
    .filter((candidate): candidate is NonNullable<typeof candidate> => candidate !== null)
    .sort((a, b) => b.relevance - a.relevance || a.title.localeCompare(b.title))
    .slice(0, 5)
    .map(({ slug, title, url, reason }) => ({ slug, title, url, reason }));
}
