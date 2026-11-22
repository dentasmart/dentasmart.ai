/**
 * Draft-only organization and reviewer input helpers.
 * Nothing here establishes a verified clinical review or publish permission.
 */
export const CMS_MAX_LABELS = 30;
export const CMS_MAX_LABEL_LENGTH = 100;

/** Only Blogs & Articles has editor-managed taxonomy; other hubs organize by hub and title. */
export function cmsUsesManualCategoriesAndTags(hubId: string | undefined, contentType: string): boolean {
  return hubId === "articles" && contentType === "blog";
}

export function appendCmsLabels(
  current: readonly string[],
  input: string,
  maxLabels = CMS_MAX_LABELS,
): string[] {
  const next = [...current];
  const seen = new Set(next.map(value => value.trim().toLocaleLowerCase("en-US")));
  for (const part of input.split(",")) {
    const candidate = part.trim().replace(/\s+/g, " ").slice(0, CMS_MAX_LABEL_LENGTH);
    const key = candidate.toLocaleLowerCase("en-US");
    if (!candidate || seen.has(key) || next.length >= maxLabels) continue;
    seen.add(key);
    next.push(candidate);
  }
  return next;
}

export type CmsReviewerDraft = {
  name?: string;
  credentials?: string;
  shortBio?: string;
  profileUrl?: string;
  lastReviewed?: string;
};

function validHttpsUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && !!url.hostname &&
      !url.username && !url.password;
  } catch {
    return false;
  }
}

function isPastOrPresentDate(value: string, today: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value > today) return false;
  const parsed = new Date(value + "T00:00:00.000Z");
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export function assessCmsReviewerDraft(
  reviewer?: CmsReviewerDraft,
  today: string = new Date().toISOString().slice(0, 10),
): { fieldsComplete: boolean; issues: string[] } {
  const issues: string[] = [];
  if (!reviewer?.name?.trim()) issues.push("Enter the reviewer's name.");
  if (!reviewer?.credentials?.trim()) issues.push("Enter professional credentials or qualifications.");
  if (!reviewer?.profileUrl?.trim()) {
    issues.push("Provide a public professional profile URL for independent verification.");
  } else if (!validHttpsUrl(reviewer.profileUrl.trim())) {
    issues.push("Use a valid HTTPS profile URL without embedded login details.");
  }
  if (!reviewer?.lastReviewed?.trim()) {
    issues.push("Enter the actual clinical review date when confirmed.");
  } else if (!isPastOrPresentDate(reviewer.lastReviewed.trim(), today)) {
    issues.push("Use a real review date that is not in the future.");
  }
  return { fieldsComplete: issues.length === 0, issues };
}
