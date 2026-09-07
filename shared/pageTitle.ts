export const SITE_TITLE_PHRASE = "Your Personal AI Dentist in Your Pocket";

const OLD_HOME_TITLE = "DentaSmart | Your Personal AI Oral Health Guide";
const CURRENT_HOME_TITLE = `DentaSmart | ${SITE_TITLE_PHRASE}`;

export function formatPageTitle(title: string): string {
  const trimmedTitle = title.trim();

  if (!trimmedTitle || trimmedTitle === "DentaSmart" || trimmedTitle === OLD_HOME_TITLE) {
    return CURRENT_HOME_TITLE;
  }

  if (trimmedTitle.includes(SITE_TITLE_PHRASE)) {
    return trimmedTitle;
  }

  const topic = trimmedTitle
    .replace(/\s*\|\s*DentaSmart(?:\s+Oral Health Hub)?\s*$/i, "")
    .trim();

  if (!topic || topic === "DentaSmart") {
    return CURRENT_HOME_TITLE;
  }

  return `${topic} | ${SITE_TITLE_PHRASE}`;
}
