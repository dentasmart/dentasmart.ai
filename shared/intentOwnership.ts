import { staticRoutes } from "./routes";

export const INTENT_GOVERNANCE_STATUSES = [
  "CONFIRMED_OWNER",
  "SUPPORTING_PAGE",
  "OWNER_NEEDS_CLARIFICATION",
  "OVERLAP_RISK",
  "MERGE_CANDIDATE",
  "NEW_OWNER_CANDIDATE",
  "DEFER",
  "REJECT",
] as const;

export type IntentGovernanceStatus = (typeof INTENT_GOVERNANCE_STATUSES)[number];

export const INTENT_OWNER_ROLES = [
  "PRIMARY_OWNER",
  "SUPPORTING_PAGE",
  "HUB_OWNER",
  "TRUST_OWNER",
] as const;

export type IntentOwnerRole = (typeof INTENT_OWNER_ROLES)[number];

export const INTENT_FUNNEL_STAGES = [
  "AWARENESS",
  "CONSIDERATION",
  "CONVERSION",
  "RETENTION",
  "TRUST",
] as const;

export type IntentFunnelStage = (typeof INTENT_FUNNEL_STAGES)[number];

export interface IntentOwnershipRecord {
  intentId: string;
  intentName: string;
  audience: string;
  funnelStage: IntentFunnelStage;
  queryFamily: string;
  primaryRoute: string;
  supportingRoutes: readonly string[];
  ownerRole: IntentOwnerRole;
  primaryCtaDestination?: string;
  entity?: string;
  overlapNotes?: string;
  governanceStatus: IntentGovernanceStatus;
  riskNotes?: string;
}

export type IntentRegistryIssueCode =
  | "DUPLICATE_INTENT_ID"
  | "INVALID_PRIMARY_ROUTE"
  | "INVALID_SUPPORTING_ROUTE"
  | "PRIMARY_OWNER_CONFLICT";

export interface IntentRegistryIssue {
  code: IntentRegistryIssueCode;
  intentId: string;
  message: string;
}

const routePathSet = new Set(staticRoutes.map((route) => route.path));

/**
 * This registry records content ownership. It does not create, register, redirect,
 * canonicalize, noindex, or add sitemap routes. Route membership stays in routes.ts.
 */
export const intentOwnershipRegistry: readonly IntentOwnershipRecord[] = [
  {
    intentId: "brand-category",
    intentName: "DentaSmart oral-health guide",
    audience: "Consumers with broad oral-health questions",
    funnelStage: "AWARENESS",
    queryFamily: "dentasmart-ai-oral-health-guide",
    primaryRoute: "/",
    supportingRoutes: ["/how-it-works", "/features", "/pricing", "/download"],
    ownerRole: "PRIMARY_OWNER",
    primaryCtaDestination: "/free-ai-teeth-scanner",
    entity: "DentaSmart",
    governanceStatus: "CONFIRMED_OWNER",
    overlapNotes: "The home page routes visitors to narrower commercial and educational owners.",
  },
  {
    intentId: "free-quick-check",
    intentName: "Free Quick Check and mouth-photo entry",
    audience: "Consumers seeking a free mouth-photo starting point",
    funnelStage: "CONVERSION",
    queryFamily: "free-mouth-photo-ai-teeth-check",
    primaryRoute: "/free-ai-teeth-scanner",
    supportingRoutes: ["/download", "/how-it-works", "/instant-scan", "/pricing"],
    ownerRole: "PRIMARY_OWNER",
    primaryCtaDestination: "/download",
    entity: "Free Quick Check",
    governanceStatus: "CONFIRMED_OWNER",
    riskNotes: "Use verified educational limits. Do not imply diagnosis, universal detection, or a paid X-ray output.",
  },
  {
    intentId: "instant-scan-education",
    intentName: "Instant Scan image and X-ray education",
    audience: "Consumers learning about supported dental image workflows",
    funnelStage: "CONSIDERATION",
    queryFamily: "dental-photo-and-xray-education",
    primaryRoute: "/instant-scan",
    supportingRoutes: ["/free-ai-teeth-scanner", "/pricing", "/how-it-works"],
    ownerRole: "SUPPORTING_PAGE",
    primaryCtaDestination: "/pricing",
    entity: "Full Quick Check",
    governanceStatus: "OWNER_NEEDS_CLARIFICATION",
    overlapNotes: "This page must remain educational and must not duplicate Free Quick Check or Pricing commercial ownership.",
  },
  {
    intentId: "pricing",
    intentName: "DentaSmart pricing and plan comparison",
    audience: "Consumers comparing DentaSmart plans and current fees",
    funnelStage: "CONVERSION",
    queryFamily: "dentasmart-pricing-and-plans",
    primaryRoute: "/pricing",
    supportingRoutes: ["/", "/free-ai-teeth-scanner", "/how-it-works", "/download"],
    ownerRole: "PRIMARY_OWNER",
    entity: "DentaSmart plans",
    governanceStatus: "CONFIRMED_OWNER",
    riskNotes: "Current price, billing, package limits, and checkout detail belong to this owner only.",
  },
  {
    intentId: "download",
    intentName: "DentaSmart app download",
    audience: "Consumers ready to install the app",
    funnelStage: "CONVERSION",
    queryFamily: "download-dentasmart-app",
    primaryRoute: "/download",
    supportingRoutes: ["/", "/free-ai-teeth-scanner", "/features", "/how-it-works"],
    ownerRole: "PRIMARY_OWNER",
    entity: "DentaSmart app",
    governanceStatus: "CONFIRMED_OWNER",
    overlapNotes: "Store acquisition is owned here. Supporting pages may route users here without becoming competing download pages.",
  },
  {
    intentId: "how-it-works",
    intentName: "How DentaSmart works",
    audience: "Consumers evaluating the shared service process",
    funnelStage: "CONSIDERATION",
    queryFamily: "how-dentasmart-works",
    primaryRoute: "/how-it-works",
    supportingRoutes: ["/", "/features", "/pricing", "/download"],
    ownerRole: "PRIMARY_OWNER",
    primaryCtaDestination: "/free-ai-teeth-scanner",
    entity: "DentaSmart",
    governanceStatus: "CONFIRMED_OWNER",
  },
  {
    intentId: "treatment-plan-review",
    intentName: "Treatment Plan Review",
    audience: "Consumers seeking educational context for a dentist-provided treatment plan",
    funnelStage: "CONVERSION",
    queryFamily: "understand-dental-treatment-plan",
    primaryRoute: "/pricing",
    supportingRoutes: ["/oral-health-hub/second-opinion", "/how-it-works", "/oral-health-hub/affordability"],
    ownerRole: "PRIMARY_OWNER",
    entity: "Treatment Plan Review",
    governanceStatus: "CONFIRMED_OWNER",
    riskNotes: "The public product name is Treatment Plan Review. It is educational and does not determine treatment necessity or replace a licensed dentist's clinical opinion.",
  },
  {
    intentId: "oral-health-score",
    intentName: "Oral Health Score educational capability",
    audience: "Users seeking educational context about an Oral Health Score",
    funnelStage: "CONSIDERATION",
    queryFamily: "oral-health-score-explanation",
    primaryRoute: "/features",
    supportingRoutes: ["/how-it-works", "/pricing"],
    ownerRole: "SUPPORTING_PAGE",
    entity: "Oral Health Score",
    governanceStatus: "OWNER_NEEDS_CLARIFICATION",
    riskNotes: "Do not present the score as a diagnosis, predictive clinical risk measure, or treatment recommendation.",
  },
  {
    intentId: "complete-care-individual",
    intentName: "Complete Care Individual",
    audience: "Consumers comparing individual annual monitoring options",
    funnelStage: "CONVERSION",
    queryFamily: "complete-care-individual-plan",
    primaryRoute: "/pricing",
    supportingRoutes: ["/features", "/how-it-works"],
    ownerRole: "PRIMARY_OWNER",
    entity: "Complete Care Individual",
    governanceStatus: "CONFIRMED_OWNER",
  },
  {
    intentId: "complete-care-family",
    intentName: "Complete Care Family",
    audience: "Families comparing annual monitoring options",
    funnelStage: "CONVERSION",
    queryFamily: "complete-care-family-plan",
    primaryRoute: "/pricing",
    supportingRoutes: ["/features", "/life-stages"],
    ownerRole: "PRIMARY_OWNER",
    entity: "Complete Care Family",
    governanceStatus: "CONFIRMED_OWNER",
    riskNotes: "Do not infer family data sharing, insurance, employer access, savings, or clinical outcomes.",
  },
  {
    intentId: "dr-din",
    intentName: "Dr Din educational AI guide capability",
    audience: "Users seeking plain-language oral-health explanations",
    funnelStage: "CONSIDERATION",
    queryFamily: "dr-din-ai-oral-health-guide",
    primaryRoute: "/features",
    supportingRoutes: ["/how-it-works", "/pricing"],
    ownerRole: "SUPPORTING_PAGE",
    entity: "Dr Din",
    governanceStatus: "SUPPORTING_PAGE",
    riskNotes: "Do not represent Dr Din as a clinician, diagnostic service, prescriber, or replacement for professional care.",
  },
  {
    intentId: "employer-discovery",
    intentName: "Employer discovery",
    audience: "Employers exploring oral-health education and decision support",
    funnelStage: "CONSIDERATION",
    queryFamily: "employer-oral-health-decision-support",
    primaryRoute: "/employers",
    supportingRoutes: ["/features", "/how-it-works"],
    ownerRole: "PRIMARY_OWNER",
    entity: "DentaSmart for Employers",
    governanceStatus: "DEFER",
    riskNotes: "No benefits plan, broker, PEO, association, self-insured, partner, network, savings, ROI, outcome, eligibility, or employer health-data-access claim is approved by this registry.",
  },
  {
    intentId: "affordability",
    intentName: "Affordable dental-care education",
    audience: "Uninsured or cost-confused dental patients",
    funnelStage: "CONSIDERATION",
    queryFamily: "affordable-dental-care-without-insurance",
    primaryRoute: "/oral-health-hub/affordability",
    supportingRoutes: ["/dental-costs", "/pricing", "/oral-health-hub/second-opinion"],
    ownerRole: "PRIMARY_OWNER",
    entity: "Affordability education",
    governanceStatus: "CONFIRMED_OWNER",
    riskNotes: "Do not claim DentaSmart savings, financing, insurance, or discount-network access without separately approved evidence.",
  },
  {
    intentId: "symptoms",
    intentName: "Dental symptoms",
    audience: "Consumers seeking symptom context and next steps",
    funnelStage: "AWARENESS",
    queryFamily: "dental-symptoms",
    primaryRoute: "/symptoms",
    supportingRoutes: ["/conditions", "/dental-emergencies", "/download"],
    ownerRole: "HUB_OWNER",
    governanceStatus: "CONFIRMED_OWNER",
    riskNotes: "Urgent-care guidance must appear before optional conversion surfaces.",
  },
  {
    intentId: "conditions",
    intentName: "Dental conditions",
    audience: "Consumers seeking condition education",
    funnelStage: "AWARENESS",
    queryFamily: "dental-conditions",
    primaryRoute: "/conditions",
    supportingRoutes: ["/symptoms", "/treatments", "/dental-emergencies"],
    ownerRole: "HUB_OWNER",
    governanceStatus: "CONFIRMED_OWNER",
  },
  {
    intentId: "treatments",
    intentName: "Dental treatment education",
    audience: "Consumers preparing for or understanding a treatment discussion",
    funnelStage: "CONSIDERATION",
    queryFamily: "dental-treatment-guides",
    primaryRoute: "/treatments",
    supportingRoutes: ["/dental-costs", "/comparisons", "/oral-health-hub/second-opinion"],
    ownerRole: "HUB_OWNER",
    governanceStatus: "CONFIRMED_OWNER",
    riskNotes: "Educational treatment content must not determine whether treatment is needed.",
  },
  {
    intentId: "dental-costs",
    intentName: "Dental procedure-cost education",
    audience: "Consumers comparing procedure-cost context",
    funnelStage: "CONSIDERATION",
    queryFamily: "dental-procedure-costs",
    primaryRoute: "/dental-costs",
    supportingRoutes: ["/oral-health-hub/affordability", "/pricing", "/treatments"],
    ownerRole: "HUB_OWNER",
    governanceStatus: "CONFIRMED_OWNER",
  },
  {
    intentId: "comparisons",
    intentName: "Dental treatment and product comparisons",
    audience: "Consumers comparing options",
    funnelStage: "CONSIDERATION",
    queryFamily: "dental-comparisons",
    primaryRoute: "/comparisons",
    supportingRoutes: ["/treatments", "/dental-costs", "/pricing"],
    ownerRole: "HUB_OWNER",
    governanceStatus: "CONFIRMED_OWNER",
  },
  {
    intentId: "guides",
    intentName: "Oral-health guides",
    audience: "Consumers seeking prevention and care guidance",
    funnelStage: "AWARENESS",
    queryFamily: "oral-health-guides",
    primaryRoute: "/guides",
    supportingRoutes: ["/oral-health-hub", "/symptoms", "/conditions"],
    ownerRole: "HUB_OWNER",
    governanceStatus: "CONFIRMED_OWNER",
  },
  {
    intentId: "oral-health-hub",
    intentName: "Oral Health Hub",
    audience: "Consumers seeking article discovery and answer-led education",
    funnelStage: "AWARENESS",
    queryFamily: "oral-health-hub-articles",
    primaryRoute: "/oral-health-hub",
    supportingRoutes: ["/guides", "/symptoms", "/conditions"],
    ownerRole: "HUB_OWNER",
    governanceStatus: "CONFIRMED_OWNER",
  },
  {
    intentId: "life-stages",
    intentName: "Dental care by life stage",
    audience: "Consumers seeking age- or life-stage-specific education",
    funnelStage: "AWARENESS",
    queryFamily: "dental-care-by-age",
    primaryRoute: "/life-stages",
    supportingRoutes: ["/guides", "/oral-health-hub"],
    ownerRole: "HUB_OWNER",
    governanceStatus: "CONFIRMED_OWNER",
  },
  {
    intentId: "dental-emergencies",
    intentName: "Dental emergencies",
    audience: "Consumers seeking urgent dental-care guidance",
    funnelStage: "AWARENESS",
    queryFamily: "dental-emergency-guidance",
    primaryRoute: "/dental-emergencies",
    supportingRoutes: ["/symptoms", "/conditions", "/download"],
    ownerRole: "HUB_OWNER",
    governanceStatus: "CONFIRMED_OWNER",
    riskNotes: "Emergency action and escalation guidance remain ahead of conversion content.",
  },
  {
    intentId: "lifestyle",
    intentName: "Lifestyle and oral health",
    audience: "Consumers seeking habit and oral-health education",
    funnelStage: "AWARENESS",
    queryFamily: "lifestyle-and-oral-health",
    primaryRoute: "/lifestyle",
    supportingRoutes: ["/guides", "/oral-health-hub"],
    ownerRole: "HUB_OWNER",
    governanceStatus: "CONFIRMED_OWNER",
  },
  {
    intentId: "editorial-policy",
    intentName: "Editorial Policy",
    audience: "Readers evaluating DentaSmart editorial standards",
    funnelStage: "TRUST",
    queryFamily: "dentasmart-editorial-policy",
    primaryRoute: "/editorial-policy",
    supportingRoutes: ["/corrections-policy", "/ai-use-disclosure", "/product-facts"],
    ownerRole: "TRUST_OWNER",
    governanceStatus: "CONFIRMED_OWNER",
  },
  {
    intentId: "ai-use-disclosure",
    intentName: "AI Use Disclosure",
    audience: "Readers evaluating DentaSmart AI use",
    funnelStage: "TRUST",
    queryFamily: "dentasmart-ai-use-disclosure",
    primaryRoute: "/ai-use-disclosure",
    supportingRoutes: ["/editorial-policy", "/product-facts"],
    ownerRole: "TRUST_OWNER",
    governanceStatus: "CONFIRMED_OWNER",
  },
  {
    intentId: "corrections-policy",
    intentName: "Corrections Policy",
    audience: "Readers reporting or evaluating content corrections",
    funnelStage: "TRUST",
    queryFamily: "dentasmart-corrections-policy",
    primaryRoute: "/corrections-policy",
    supportingRoutes: ["/editorial-policy", "/product-facts"],
    ownerRole: "TRUST_OWNER",
    governanceStatus: "CONFIRMED_OWNER",
  },
  {
    intentId: "product-facts",
    intentName: "Product Facts",
    audience: "Readers verifying DentaSmart product boundaries",
    funnelStage: "TRUST",
    queryFamily: "dentasmart-product-facts",
    primaryRoute: "/product-facts",
    supportingRoutes: ["/pricing", "/features", "/how-it-works"],
    ownerRole: "TRUST_OWNER",
    governanceStatus: "CONFIRMED_OWNER",
  },
  {
    intentId: "privacy",
    intentName: "Privacy Policy",
    audience: "Readers evaluating privacy terms",
    funnelStage: "TRUST",
    queryFamily: "dentasmart-privacy-policy",
    primaryRoute: "/privacy-policy",
    supportingRoutes: ["/terms-of-service"],
    ownerRole: "TRUST_OWNER",
    governanceStatus: "OWNER_NEEDS_CLARIFICATION",
    riskNotes: "Current legal and privacy claims require legal/privacy reconciliation before they are reusable governance claims.",
  },
  {
    intentId: "terms",
    intentName: "Terms of Service",
    audience: "Readers evaluating DentaSmart terms",
    funnelStage: "TRUST",
    queryFamily: "dentasmart-terms-of-service",
    primaryRoute: "/terms-of-service",
    supportingRoutes: ["/privacy-policy"],
    ownerRole: "TRUST_OWNER",
    governanceStatus: "CONFIRMED_OWNER",
  },
  {
    intentId: "team-about",
    intentName: "DentaSmart team and advisors",
    audience: "Readers evaluating company and advisor information",
    funnelStage: "TRUST",
    queryFamily: "dentasmart-team-and-advisors",
    primaryRoute: "/team",
    supportingRoutes: ["/editorial-policy", "/product-facts"],
    ownerRole: "TRUST_OWNER",
    governanceStatus: "CONFIRMED_OWNER",
    riskNotes: "Advisor status does not create clinical-review provenance.",
  },
] as const;

function primaryOwnerKey(record: IntentOwnershipRecord): string {
  return [record.queryFamily.trim().toLowerCase(), record.audience.trim().toLowerCase(), record.funnelStage].join("|");
}

export function validateIntentOwnershipRegistry(
  records: readonly IntentOwnershipRecord[] = intentOwnershipRegistry,
  validRoutePaths: ReadonlySet<string> = routePathSet,
): IntentRegistryIssue[] {
  const issues: IntentRegistryIssue[] = [];
  const intentIds = new Set<string>();
  const primaryOwners = new Map<string, IntentOwnershipRecord>();

  for (const record of records) {
    if (intentIds.has(record.intentId)) {
      issues.push({
        code: "DUPLICATE_INTENT_ID",
        intentId: record.intentId,
        message: `Intent ID ${record.intentId} appears more than once.`,
      });
    }
    intentIds.add(record.intentId);

    if (!validRoutePaths.has(record.primaryRoute)) {
      issues.push({
        code: "INVALID_PRIMARY_ROUTE",
        intentId: record.intentId,
        message: `Primary route ${record.primaryRoute} is not present in the static route authority.`,
      });
    }

    for (const supportingRoute of record.supportingRoutes) {
      if (!validRoutePaths.has(supportingRoute)) {
        issues.push({
          code: "INVALID_SUPPORTING_ROUTE",
          intentId: record.intentId,
          message: `Supporting route ${supportingRoute} is not present in the static route authority.`,
        });
      }
    }

    if (record.ownerRole !== "PRIMARY_OWNER") continue;
    const key = primaryOwnerKey(record);
    const existing = primaryOwners.get(key);
    if (existing && existing.primaryRoute !== record.primaryRoute) {
      issues.push({
        code: "PRIMARY_OWNER_CONFLICT",
        intentId: record.intentId,
        message: `Primary owner conflict between ${existing.intentId} and ${record.intentId} for ${record.queryFamily}.`,
      });
    }
    primaryOwners.set(key, record);
  }

  return issues;
}

export function assertValidIntentOwnershipRegistry(
  records: readonly IntentOwnershipRecord[] = intentOwnershipRegistry,
  validRoutePaths: ReadonlySet<string> = routePathSet,
): void {
  const issues = validateIntentOwnershipRegistry(records, validRoutePaths);
  if (issues.length === 0) return;
  throw new Error(issues.map((issue) => issue.message).join("\n"));
}

export function getIntentOwner(intentId: string): IntentOwnershipRecord | undefined {
  return intentOwnershipRegistry.find((record) => record.intentId === intentId);
}

export function getOwnersForSupportingRoute(routePath: string): readonly IntentOwnershipRecord[] {
  return intentOwnershipRegistry.filter((record) => record.supportingRoutes.includes(routePath));
}

export function getStaticRoutePaths(): ReadonlySet<string> {
  return new Set(routePathSet);
}

assertValidIntentOwnershipRegistry();
