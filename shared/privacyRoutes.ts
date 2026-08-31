export const EMAIL_UNSUBSCRIBE_PATH_PATTERN = /^\/email\/unsubscribe\/[^/]+\/?$/;

export function isEmailUnsubscribePath(path: string): boolean {
  const cleanPath = path.split(/[?#]/, 1)[0];
  return EMAIL_UNSUBSCRIBE_PATH_PATTERN.test(cleanPath);
}
