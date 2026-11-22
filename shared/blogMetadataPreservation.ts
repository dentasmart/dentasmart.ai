/**
 * Release-only compatibility comparator. It never opens a database connection.
 * Supply two authorized, read-only snapshots of ALL existing blog rows.
 * Use cryptographic digests of each field, not raw private reviewer details.
 */
export const BLOG_PRESERVED_FIELDS = [
  "slug", "status",
  "metaTitle", "metaDescription", "metaKeywords",
  "ogTitle", "ogDescription", "ogImage", "canonicalUrl",
  "primaryKeyword", "secondaryKeywords",
  "reviewedByName", "reviewedByCredentials",
  "reviewerShortBio", "reviewerProfileUrl", "lastReviewed", "reviewerJsonLd",
] as const;

export type BlogPreservedField = (typeof BLOG_PRESERVED_FIELDS)[number];
export type BlogMetadataFingerprint = {
  id: number;
} & Record<BlogPreservedField, string | null>;

export type BlogPreservationIssue = {
  id: number;
  field: BlogPreservedField | "id" | "snapshot";
  issue: "changed" | "missing_post" | "missing_field" | "duplicate_id" | "invalid_id";
};

/** Fail closed when fingerprints are incomplete, duplicate, or any preexisting value changes. */
export function compareBlogMetadataSnapshots(
  before: readonly BlogMetadataFingerprint[],
  after: readonly BlogMetadataFingerprint[],
): BlogPreservationIssue[] {
  const issues: BlogPreservationIssue[] = [];
  const source = new Map<number, BlogMetadataFingerprint>();
  const destination = new Map<number, BlogMetadataFingerprint>();

  const index = (rows: readonly BlogMetadataFingerprint[], result: Map<number, BlogMetadataFingerprint>) => {
    for (const row of rows) {
      if (!Number.isInteger(row.id) || row.id <= 0) {
        issues.push({ id: row.id, field: "id", issue: "invalid_id" });
        continue;
      }
      if (result.has(row.id)) {
        issues.push({ id: row.id, field: "id", issue: "duplicate_id" });
        continue;
      }
      result.set(row.id, row);
      for (const field of BLOG_PRESERVED_FIELDS) {
        if (!Object.prototype.hasOwnProperty.call(row, field) ||
          (row[field] !== null && typeof row[field] !== "string")) {
          issues.push({ id: row.id, field, issue: "missing_field" });
        }
      }
    }
  };
  index(before, source);
  index(after, destination);

  for (const [id, old] of Array.from(source.entries())) {
    const current = destination.get(id);
    if (!current) {
      issues.push({ id, field: "snapshot", issue: "missing_post" });
      continue;
    }
    for (const field of BLOG_PRESERVED_FIELDS) {
      // Missing fields are already errors; avoid counting them as a routine edit.
      if (!Object.prototype.hasOwnProperty.call(old, field) ||
        !Object.prototype.hasOwnProperty.call(current, field)) continue;
      if (old[field] !== current[field]) {
        issues.push({ id, field, issue: "changed" });
      }
    }
  }
  return issues;
}
