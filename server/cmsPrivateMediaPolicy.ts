/** Private draft images are not public website assets. */
export function isPrivateCmsMediaRecord(item: {
  fileKey?: string | null;
  url?: string | null;
}): boolean {
  return !!item.fileKey?.startsWith("cms-private-drafts/") ||
    !!item.url?.startsWith("/api/cms-private-media/");
}

export function containsPrivateCmsMediaReference(
  fields: object
): boolean {
  return Object.values(fields).some(
    value => typeof value === "string" &&
      value.includes("/api/cms-private-media/")
  );
}

export function shouldRejectPublicPrivateMedia(
  published: boolean,
  fields: object
): boolean {
  return published && containsPrivateCmsMediaReference(fields);
}
