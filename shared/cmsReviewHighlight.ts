export interface CmsTextSpan { from: number; to: number }

/** Locate a review excerpt in editor-visible text. Never mutate saved HTML. */
export function findCmsReviewTextSpan(text: string, excerpt: string): CmsTextSpan | null {
  const exact = excerpt.trim();
  if (!exact) return null;
  const start = text.indexOf(exact);
  if (start >= 0) return { from: start, to: start + exact.length };
  // Match the entire excerpt despite normalized HTML whitespace, preserving
  // offsets into TipTap's original text (including spaces and newlines).
  const normalize = (value: string) => value.replace(/\s+/g, " ").trim();
  const needle = normalize(exact);
  const normalizedChars: string[] = [];
  const originalOffsets: number[] = [];
  let inSpace = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/\s/.test(char)) {
      if (!inSpace && normalizedChars.length) {
        normalizedChars.push(" ");
        originalOffsets.push(i);
      }
      inSpace = true;
    } else {
      normalizedChars.push(char);
      originalOffsets.push(i);
      inSpace = false;
    }
  }
  const at = normalizedChars.join("").indexOf(needle);
  if (at !== -1 && needle.length) {
    return { from: originalOffsets[at], to: originalOffsets[at + needle.length - 1] + 1 };
  }
  // Only when the full passage cannot be found, fall back to a distinctive prefix.
  const prefix = exact.slice(0, 90).trim();
  if (prefix.length < 18) return null;
  const prefixStart = text.indexOf(prefix);
  if (prefixStart < 0) return null;
  return { from: prefixStart, to: prefixStart + prefix.length };
}
