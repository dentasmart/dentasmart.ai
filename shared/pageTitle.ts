export const SITE_TITLE_PHRASE = "Your Personal AI Dentist in Your Pocket";
const SITE_TITLE_SUFFIX = "DentaSmart";

const OLD_HOME_TITLE = "DentaSmart | Your Personal AI Oral Health Guide";
const CURRENT_HOME_TITLE = `DentaSmart | ${SITE_TITLE_PHRASE}`;
const LEGACY_BRAND_SUFFIX = /\s*\|\s*(?:Your Personal AI Dentist in Your Pocket|DentaSmart(?:\s+Oral Health Hub)?)\s*$/i;

function removeTrailingBrandSuffixes(title: string): string {
  let topic = title.trim();

  while (LEGACY_BRAND_SUFFIX.test(topic)) {
    topic = topic.replace(LEGACY_BRAND_SUFFIX, "").trim();
  }

  return topic;
}

export function formatPageTitle(title: string): string {
  const trimmedTitle = title.trim();

  if (
    !trimmedTitle ||
    trimmedTitle === "DentaSmart" ||
    trimmedTitle === OLD_HOME_TITLE ||
    trimmedTitle === CURRENT_HOME_TITLE
  ) {
    return CURRENT_HOME_TITLE;
  }

  const topic = removeTrailingBrandSuffixes(trimmedTitle);

  if (!topic || topic === "DentaSmart") {
    return CURRENT_HOME_TITLE;
  }

  return `${topic} | ${SITE_TITLE_SUFFIX}`;
}
