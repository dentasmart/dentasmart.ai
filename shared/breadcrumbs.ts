import { toSchemaUrl } from "./jsonLd";

export interface BreadcrumbItem {
  readonly name: string;
  readonly url: string;
}

const HIERARCHIES = [
  { path: "/conditions", name: "Conditions" },
  { path: "/symptoms", name: "Symptoms" },
  { path: "/treatments", name: "Treatments" },
  { path: "/dental-costs", name: "Dental Costs" },
  { path: "/guides", name: "Guides" },
  { path: "/dental-emergencies", name: "Dental Emergencies" },
  { path: "/life-stages", name: "Life Stages" },
  { path: "/lifestyle", name: "Lifestyle" },
  { path: "/comparisons", name: "Comparisons" },
  { path: "/compare", name: "Comparisons" },
] as const;

function cleanPath(urlPath: string): string {
  return urlPath.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
}

function titleFromPath(path: string): string {
  return path
    .split("/")
    .filter(Boolean)
    .at(-1)
    ?.split("-")
    .map((word) => word.length <= 3 && word === word.toUpperCase() ? word : `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ") || "DentaSmart";
}

function toBreadcrumbPath(path: string): string {
  return path === "/" ? "/" : `${path}/`;
}

/**
 * One pure model for visible breadcrumb navigation and BreadcrumbList JSON-LD.
 * Flat marketing and governance pages intentionally return no breadcrumb.
 */
export function getBreadcrumbs(urlPath: string): BreadcrumbItem[] {
  const path = cleanPath(urlPath);
  if (path === "/oral-health-hub") {
    return [
      { name: "Home", url: "/" },
      { name: "Oral Health Hub", url: "/oral-health-hub/" },
    ];
  }

  const hierarchy = HIERARCHIES.find(({ path: familyPath }) => path === familyPath || path.startsWith(`${familyPath}/`));
  if (!hierarchy) return [];

  const items: BreadcrumbItem[] = [
    { name: "Home", url: "/" },
    { name: hierarchy.name, url: hierarchy.path === "/compare" ? "/comparisons/" : toBreadcrumbPath(hierarchy.path) },
  ];
  if (path !== hierarchy.path) {
    items.push({ name: titleFromPath(path), url: toBreadcrumbPath(path) });
  }
  return items;
}

export function createBreadcrumbListSchema(items: BreadcrumbItem[]): Record<string, unknown> | null {
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toSchemaUrl(item.url),
    })),
  };
}
