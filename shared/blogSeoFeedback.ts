import type { CmsSeoCheck } from "./cmsSeoAnalysis";
import type { BlogSeoDraft } from "./blogSeoAdapter";

// Presentation-only feedback for the original Blog Editor.
// Does not change the Advanced CMS analyzer's shared scoring weights.
const FOCUS_DEPENDENT = new Set([
  "h1", "url", "intro", "subheading", "body", "density",
  "seo-title-phrase", "description-phrase",
]);

export function formatBlogSeoChecks(checks: readonly CmsSeoCheck[], draft: BlogSeoDraft): CmsSeoCheck[] {
  const noFocus = !draft.primaryKeyword.trim();
  const noTitle = !draft.metaTitle.trim();
  const noDescription = !draft.metaDescription.trim();
  const noSecondary = !draft.secondaryKeywords.trim();

  return checks.map((check) => {
    if (check.id === "focus" && noFocus) return {
      ...check, detail: "No primary keyphrase entered. Please enter a primary focus keyphrase.",
    };
    if (check.id === "seo-title-length" && noTitle) return {
      ...check, detail: "Please enter a meta title. The character count will appear after you add one.",
    };
    if (check.id === "description-length" && noDescription) return {
      ...check, detail: "Please enter a meta description. The character count will appear after you add one.",
    };
    if (check.id === "secondary" && noSecondary) return {
      ...check, status: "info" as const,
      detail: "No secondary keyphrases entered (optional). This check is not evaluated.",
    };
    if (check.id === "seo-title-phrase" && noTitle) return {
      ...check, status: "info" as const, points: 0,
      detail: "Please enter a meta title before evaluating keyphrase usage.",
    };
    if (check.id === "description-phrase" && noDescription) return {
      ...check, status: "info" as const, points: 0,
      detail: "Please enter a meta description before evaluating keyphrase usage.",
    };
    if (noFocus && FOCUS_DEPENDENT.has(check.id)) return {
      ...check, status: "info" as const, points: 0,
      detail: "No primary keyphrase entered. This check is not evaluated.",
    };
    return check;
  });
}
