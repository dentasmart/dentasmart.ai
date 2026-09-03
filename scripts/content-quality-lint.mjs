import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const publicRoots = [
  "client/src",
  "client/index.html",
  "server/metaTags.ts",
  "server/ssrContent.ts",
  "server/seo.ts",
  "shared",
];
const textExtensions = new Set([".ts", ".tsx", ".html"]);

function collectFiles(path) {
  const fullPath = join(root, path);
  const stat = statSync(fullPath);
  if (stat.isFile()) return textExtensions.has(path.slice(path.lastIndexOf("."))) ? [fullPath] : [];
  return readdirSync(fullPath, { withFileTypes: true }).flatMap((entry) => {
    const nested = join(path, entry.name);
    return entry.isDirectory() ? collectFiles(nested) : (textExtensions.has(nested.slice(nested.lastIndexOf("."))) ? [join(root, nested)] : []);
  });
}

const files = [...new Set(publicRoots.flatMap(collectFiles))];
const excludedNonCustomerFacingFiles = new Set([
  join(root, "shared/routes.ts"),
]);
const activePublicEmDashMatches = [];
const nonCustomerFacingEmDashMatches = [];
const activeCustomerFiles = files.filter((file) =>
  !file.includes("/pages/Admin") &&
  !file.includes("/components/editor/") &&
  !excludedNonCustomerFacingFiles.has(file)
);
const renderedClaimFiles = activeCustomerFiles.filter((file) => !file.endsWith("/shared/facts.ts"));
const readabilityTargets = ["client/src/pages/governance/GovernancePage.tsx"];

function withoutNonRenderedComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
}

for (const file of files) {
  const content = readFileSync(file, "utf8");
  const renderedContent = withoutNonRenderedComments(content);
  const count = [...renderedContent].filter((character) => character === "—").length;
  if (!count) continue;
  const match = { file: relative(root, file), count };
  if (excludedNonCustomerFacingFiles.has(file) || file.includes("/pages/Admin") || file.includes("/components/editor/")) {
    nonCustomerFacingEmDashMatches.push(match);
  } else {
    activePublicEmDashMatches.push(match);
  }
}

function approximateGrade(text) {
  const sentences = Math.max(1, (text.match(/[.!?]+/g) || []).length);
  const words = Math.max(1, (text.match(/[A-Za-z]{2,}/g) || []).length);
  const syllables = Math.max(1, (text.match(/[aeiouy]+/gi) || []).length);
  return Number((0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59).toFixed(1));
}

function extractVisibleProse(source) {
  return [...source.matchAll(/["']([^"'\n]+)["']/g)]
    .map((match) => match[1])
    .filter((value) => {
      const words = value.match(/[A-Za-z]{2,}/g) || [];
      return words.length >= 4 && /[.!? ]/.test(value) && !value.includes("/") && !/^(text|bg|border|mt|mb|px|py|grid|flex|hover|sm:|md:|lg:)/.test(value);
    })
    .join(". ");
}

const readability = readabilityTargets.map((path) => {
  const content = readFileSync(join(root, path), "utf8");
  const grade = approximateGrade(extractVisibleProse(content));
  return {
    path: "client/src/pages/governance/*",
    approximateGrade: grade,
    status: grade <= 10 ? "PASS" : "WARNING",
    reason: grade <= 10 ? "Approximate new public-governance copy is near the intended reading level." : "Review wording during editorial approval; this report does not block technical terms or historic content.",
  };
});

function findMatches(paths, pattern) {
  return paths.flatMap((file) => {
    const content = withoutNonRenderedComments(readFileSync(file, "utf8"));
    const count = [...content.matchAll(pattern)].length;
    return count ? [{ file: relative(root, file), count }] : [];
  });
}

const staleAndroidMatches = findMatches(activeCustomerFiles, /Android (early access|waitlist)|waitlist.*Android|join.*Android/gi);
const internalSelfCitationMatches = findMatches(activeCustomerFiles, /sourceUrl\s*=\s*(?:\{?`?https?:\/\/)?(?:www\.)?dentasmart\.ai/gi);
const genericReviewDatePaths = [
  "client/src/pages/treatments/TreatmentPageTemplate.tsx",
  "client/src/pages/dental-costs/CostPageTemplate.tsx",
  "client/src/pages/dental-emergencies/EmergencyPageTemplate.tsx",
  "client/src/pages/life-stages/AgeSpecificTemplate.tsx",
  "client/src/pages/lifestyle/LifestyleTemplate.tsx",
];
const genericReviewDateMatches = findMatches(genericReviewDatePaths.map((path) => join(root, path)), /lastReviewed:\s*["']20\d\d-/g);
const agentSource = readFileSync(join(root, "server/blogAgent.ts"), "utf8");
const aiDraftOnly = agentSource.includes("const shouldPublish = false") && agentSource.includes('status: "draft"') && agentSource.includes("publishedAt: null");
const prohibitedClaimMatches = findMatches(renderedClaimFiles, /50K\+|100%\s*(?:detection|accuracy)|free\s+(?:AI\s+)?second opinion|bank[- ](?:grade|level)|HIPAA[- ]compliant/gi);
const noAiSlopPatternMatches = findMatches(
  activeCustomerFiles,
  /\b(?:here(?:'|’)s the thing|let(?:'|’)s be honest|the truth is|think about it|you(?:'|’)re not alone|you are not alone|what most people get wrong|what nobody tells you|game[- ]changer|paradigm shift|cutting-edge|delve|tapestry|ever-evolving|supercharge|set it and forget it)\b/gi
);

const errors = [
  ...activePublicEmDashMatches,
  ...staleAndroidMatches,
  ...internalSelfCitationMatches,
  ...genericReviewDateMatches,
  ...prohibitedClaimMatches,
  ...noAiSlopPatternMatches,
];
if (!aiDraftOnly) errors.push({ file: "server/blogAgent.ts", count: 1 });

console.log(JSON.stringify({
  activePublicEmDashCount: activePublicEmDashMatches.reduce((sum, item) => sum + item.count, 0),
  activePublicEmDashMatches,
  nonCustomerFacingEmDashCount: nonCustomerFacingEmDashMatches.reduce((sum, item) => sum + item.count, 0),
  nonCustomerFacingEmDashMatches,
  readability,
  staleAndroidMatches,
  internalSelfCitationMatches,
  genericReviewDateMatches,
  aiDraftOnly,
  prohibitedClaimMatches,
  noAiSlopPatternMatches,
  result: errors.length === 0 ? "PASS" : "FAIL",
}, null, 2));

if (errors.length) process.exitCode = 1;
