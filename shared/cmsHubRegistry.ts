import { oralHealthHubResourceGroups } from "./oralHealthHub";
import type { CmsContentType, CmsDocument } from "./cmsBlocks";

/**
 * Exactly the 15 first-party destinations listed in the Oral Health Hub.
 * This is an administrative navigation and DRAFT namespace registry.
 * A hub does not imply that the static public route is CMS-publishable.
 */
export const cmsHubDefinitions = [
  { id: "conditions", label: "Conditions", contentType: "condition", sourcePath: "/conditions/", importMode: "structured", icon: "heart-pulse" },
  { id: "symptoms", label: "Symptoms", contentType: "symptom", sourcePath: "/symptoms/", importMode: "structured", icon: "activity" },
  { id: "life-stages", label: "Life Stages", contentType: "other", sourcePath: "/life-stages/", importMode: "listing", icon: "users" },
  { id: "symptom-checker", label: "Symptom Checker", contentType: "other", sourcePath: "/symptom-quiz/", importMode: "utility", icon: "clipboard-check" },
  { id: "treatments", label: "Treatments", contentType: "treatment", sourcePath: "/treatments/", importMode: "listing", icon: "stethoscope" },
  { id: "costs", label: "Dental Costs", contentType: "cost", sourcePath: "/dental-costs/", importMode: "listing", icon: "wallet" },
  { id: "comparisons", label: "Comparisons", contentType: "other", sourcePath: "/comparisons/", importMode: "listing", icon: "git-compare" },
  { id: "prevention", label: "Prevention", contentType: "other", sourcePath: "/oral-health-hub/prevention/", importMode: "listing", icon: "shield-check" },
  { id: "lifestyle", label: "Lifestyle", contentType: "other", sourcePath: "/lifestyle/", importMode: "listing", icon: "leaf" },
  { id: "guides", label: "Dental Guides", contentType: "guide", sourcePath: "/guides/", importMode: "structured", icon: "book-open" },
  { id: "articles", label: "Blogs & Articles", contentType: "blog", sourcePath: "/oral-health-hub/", importMode: "listing", icon: "newspaper" },
  { id: "emergencies", label: "Dental Emergencies", contentType: "other", sourcePath: "/dental-emergencies/", importMode: "listing", icon: "alert-triangle" },
  { id: "affordability", label: "Affordability", contentType: "other", sourcePath: "/oral-health-hub/affordability/", importMode: "listing", icon: "badge-dollar-sign" },
  { id: "second-opinion", label: "Second Opinion", contentType: "other", sourcePath: "/oral-health-hub/second-opinion/", importMode: "listing", icon: "messages-square" },
  { id: "faqs", label: "FAQs", contentType: "other", sourcePath: "/faqs/", importMode: "utility", icon: "circle-help" },
] as const satisfies ReadonlyArray<{
  id: string; label: string; contentType: CmsContentType;
  sourcePath: string; importMode: "structured" | "listing" | "utility"; icon: string;
}>;

/** Admin-only hubs. Blogs remain in the existing Blog Management editor; public 15-hub registry is unchanged. */
export const cmsAdminHubDefinitions = cmsHubDefinitions.filter(hub => hub.id !== "articles");

export type CmsHubId = (typeof cmsHubDefinitions)[number]["id"];
export type CmsHubDefinition = (typeof cmsHubDefinitions)[number];

const hubById = new Map<string, CmsHubDefinition>(cmsHubDefinitions.map((hub) => [hub.id, hub]));

export function getCmsHub(value: string): CmsHubDefinition | undefined {
  return hubById.get(value);
}

export function isCmsAdminHub(value: string): boolean {
  return cmsAdminHubDefinitions.some(hub => hub.id === value);
}

export function cmsDraftStoragePath(hubId: CmsHubId, slug: string, knownCondition = false): string {
  if (knownCondition && hubId === "conditions") return "/conditions/" + slug;
  return "/cms-workspace/" + hubId + "/" + slug;
}

/** Matches the exact 15 Oral Health Hub directory destinations, without changing them. */
export function cmsHubCoverage(): Array<{ id: CmsHubId; label: string; destination: string; importMode: CmsHubDefinition["importMode"] }> {
  const links = oralHealthHubResourceGroups.flatMap((group) => [...group.links]);
  if (links.length !== cmsHubDefinitions.length) {
    throw new Error("Oral Health Hub navigation changed. Reconcile the CMS hub registry before release.");
  }
  return cmsHubDefinitions.map((hub, index) => ({
    id: hub.id,
    label: hub.label,
    destination: links[index].href,
    importMode: hub.importMode,
  }));
}

export function createCmsBlankDocument(
  hubId: CmsHubId, slug: string, title: string,
): CmsDocument {
  const hub = getCmsHub(hubId);
  if (!hub) throw new Error("Unknown CMS hub.");
  const medical = hub.contentType === "condition" || hub.contentType === "symptom";
  // Explicit mutable block typing: the editor needs to update urgent-care items.
  const medicalBlocks: CmsDocument["blocks"] = medical ? [
    { id: "quick", type: "quick_answer", heading: "Quick Answer", answer: "" },
    { id: "urgent", type: "urgent_care", heading: "When to Seek Urgent Care", items: [""] },
  ] : [];
  return {
    hubId,
    contentType: hub.contentType,
    slug,
    title,
    templateKey: hub.contentType + "-draft",
    templateVersion: 1,
    blocks: [
      { id: "hero", type: "hero", heading: title, subheading: "" },
      { id: "main", type: "rich_text", heading: "Overview", html: "<p></p>" },
      ...medicalBlocks,
      { id: "related", type: "related_links", heading: "Related Reading", links: [] },
    ],
    images: {},
    seo: { focusKeyword: "", secondaryKeywords: [], metaTitle: title, metaDescription: "" },
    tags: [],
  };
}
