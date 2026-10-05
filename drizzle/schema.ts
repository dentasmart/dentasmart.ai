import { index, int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json, uniqueIndex } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Blog posts table for the Oral Health Hub Management system.
 * Supports full CRUD, SEO metadata, status management, categorization,
 * and extended CMS fields for hub architecture (SEO/GEO).
 */
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  
  // Content fields
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  category: mysqlEnum("category", [
    "Dentist Problems", "Dental Problems", "Insurance Problems",
    "Symptoms", "Gums", "Cavities", "X-Rays", "Costs"
  ]).notNull(),
  readTime: varchar("readTime", { length: 50 }).default("3 min read"),
  
  // Structured content sections (StoryBrand format)
  problemHeading: varchar("problemHeading", { length: 500 }),
  problemContent: text("problemContent"),
  empathyHeading: varchar("empathyHeading", { length: 500 }),
  empathyContent: text("empathyContent"),
  solutionHeading: varchar("solutionHeading", { length: 500 }),
  solutionContent: text("solutionContent"),
  changeHeading: varchar("changeHeading", { length: 500 }),
  changeContent: text("changeContent"),
  resultHeading: varchar("resultHeading", { length: 500 }),
  resultContent: text("resultContent"),
  
  // Rich content (WYSIWYG HTML body - alternative to structured sections)
  bodyHtml: text("bodyHtml"),
  
  // SEO fields
  metaTitle: varchar("metaTitle", { length: 200 }),
  metaDescription: text("metaDescription"),
  metaKeywords: text("metaKeywords"),
  ogTitle: varchar("ogTitle", { length: 200 }),
  ogDescription: text("ogDescription"),
  ogImage: varchar("ogImage", { length: 1000 }),
  canonicalUrl: varchar("canonicalUrl", { length: 1000 }),
  
  // Extended SEO/GEO CMS fields
  primaryKeyword: varchar("primaryKeyword", { length: 200 }),
  secondaryKeywords: text("secondaryKeywords"), // comma-separated
  atAGlanceAnswer: text("atAGlanceAnswer"), // 80-120 word summary
  keyTakeaways: text("keyTakeaways"), // JSON array of 3 bullet strings
  whenUrgent: text("whenUrgent"), // JSON array of red flag strings
  faqs: text("faqs"), // JSON array of {question, answer} pairs
  relatedPosts: text("relatedPosts"), // JSON array of slug strings
  
  // Review/authority fields
  reviewedByName: varchar("reviewedByName", { length: 200 }),
  reviewedByCredentials: varchar("reviewedByCredentials", { length: 500 }),
  reviewerShortBio: text("reviewerShortBio"),
  reviewerProfileUrl: varchar("reviewerProfileUrl", { length: 1000 }),
  // Explicit editorial review date. It is never derived from post updates.
  lastReviewed: varchar("lastReviewed", { length: 10 }),
  // Optional supplemental schema. Core BlogPosting and reviewer schema stay generated server-side.
  reviewerJsonLd: text("reviewerJsonLd"),
  // Set only by the governed agent at draft creation. This prevents a new governed
  // draft from being mistaken for legacy content before its run audit is finalized.
  governanceCandidateId: int("governanceCandidateId"),
  governanceIntentOwnerId: varchar("governanceIntentOwnerId", { length: 120 }),

  // Category references (new hierarchical system)
  categoryId: int("categoryId"),
  subcategoryId: int("subcategoryId"),
  
  // Status management
  status: mysqlEnum("status", ["draft", "published", "unpublished"]).default("draft").notNull(),
  
  // Featured image
  featuredImage: varchar("featuredImage", { length: 1000 }),
  
  // Timestamps
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

/**
 * Android waitlist for email capture.
 */
export const androidWaitlist = mysqlTable("android_waitlist", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }),
  email: varchar("email", { length: 320 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AndroidWaitlistEntry = typeof androidWaitlist.$inferSelect;

/**
 * Benefits plan waitlist for email capture.
 * Captures leads from the "Join Waitlist" popup on the Pricing page.
 */
export const benefitsWaitlist = mysqlTable("benefits_waitlist", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }),
  email: varchar("email", { length: 320 }).notNull().unique(),
  phone: varchar("phone", { length: 50 }),
  message: text("message"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BenefitsWaitlistEntry = typeof benefitsWaitlist.$inferSelect;

/**
 * Recipient-controlled audit records for voluntary transactional and
 * customer-care SMS opt-ins. This table intentionally stores no dental or
 * health information.
 */
export const smsConsentRecords = mysqlTable("sms_consent_records", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("fullName", { length: 200 }),
  email: varchar("email", { length: 320 }),
  phoneE164: varchar("phoneE164", { length: 16 }).notNull(),
  consentGranted: boolean("consentGranted").notNull(),
  consentAt: timestamp("consentAt").notNull(),
  consentSource: varchar("consentSource", { length: 64 }).notNull(),
  sourcePath: varchar("sourcePath", { length: 255 }).notNull(),
  consentWordingVersion: varchar("consentWordingVersion", { length: 32 }).notNull(),
  consentWording: text("consentWording").notNull(),
  privacyPolicyVersion: varchar("privacyPolicyVersion", { length: 32 }).notNull(),
  termsOfServiceVersion: varchar("termsOfServiceVersion", { length: 32 }).notNull(),
  sourceIp: varchar("sourceIp", { length: 64 }),
  userAgent: varchar("userAgent", { length: 512 }),
  idempotencyKey: varchar("idempotencyKey", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  phoneE164Index: index("sms_consent_records_phone_e164_idx").on(table.phoneE164),
  idempotencyKeyUnique: uniqueIndex("sms_consent_records_idempotency_key_unique").on(table.idempotencyKey),
}));
export type SmsConsentRecord = typeof smsConsentRecords.$inferSelect;
export type InsertSmsConsentRecord = typeof smsConsentRecords.$inferInsert;

/**
 * Admin users table for blog management authentication.
 * Separate from OAuth users - uses username/password auth.
 */
export const adminUsers = mysqlTable("admin_users", {
  id: int("id").autoincrement().primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  displayName: varchar("displayName", { length: 200 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = typeof adminUsers.$inferInsert;

/**
 * Blog categories table for hierarchical category/subcategory management.
 * Supports parent-child relationships for organizing blog content.
 */
export const blogCategories = mysqlTable("blog_categories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  parentId: int("parentId"),
  description: text("description"),
  color: varchar("color", { length: 50 }).default("stone"),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BlogCategory = typeof blogCategories.$inferSelect;
export type InsertBlogCategory = typeof blogCategories.$inferInsert;

/**
 * Quiz submissions table for symptom quiz lead capture.
 * Stores email, answers, risk level, and matched conditions.
 */
export const quizSubmissions = mysqlTable("quiz_submissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 200 }),
  email: varchar("email", { length: 320 }),
  answers: json("answers").notNull(), // Record<string, string>
  riskLevel: mysqlEnum("riskLevel", ["low", "moderate", "high"]).notNull(),
  matchedConditions: json("matchedConditions"), // string[]
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type QuizSubmission = typeof quizSubmissions.$inferSelect;
export type InsertQuizSubmission = typeof quizSubmissions.$inferInsert;

/**
 * AI Blog Agent run history.
 * Tracks each automated or manual blog generation run.
 */
export const agentRuns = mysqlTable("agent_runs", {
  id: int("id").autoincrement().primaryKey(),
  status: mysqlEnum("status", ["running", "success", "draft", "failed"]).default("running").notNull(),
  title: varchar("title", { length: 500 }),
  slug: varchar("slug", { length: 500 }),
  primaryKeyword: varchar("primaryKeyword", { length: 200 }),
  postId: int("postId"),
  error: text("error"),
  triggerType: mysqlEnum("triggerType", ["manual", "scheduled"]).default("manual").notNull(),
  durationMs: int("durationMs"),
  // Phase 2 governance audit context. These fields remain null for historic runs.
  governanceCandidateId: int("governanceCandidateId"),
  intentOwnerId: varchar("intentOwnerId", { length: 120 }),
  governanceVersion: varchar("governanceVersion", { length: 128 }),
  governanceRiskLevel: mysqlEnum("governanceRiskLevel", ["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  requiredReviewerRoles: json("requiredReviewerRoles"),
  claimContextIds: json("claimContextIds"),
  sourceContextIds: json("sourceContextIds"),
  contentVersionHash: varchar("contentVersionHash", { length: 128 }),
  validationResult: json("validationResult"),
  governanceApprovalState: mysqlEnum("governanceApprovalState", ["PENDING", "APPROVED", "BLOCKED"]),
  governanceBlockReason: text("governanceBlockReason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AgentRun = typeof agentRuns.$inferSelect;
export type InsertAgentRun = typeof agentRuns.$inferInsert;

/**
 * Governance evidence sources. These records are not public citations by default
 * and never contain uploaded clinical records or private user data.
 */
export const governanceSources = mysqlTable("governance_sources", {
  id: int("id").autoincrement().primaryKey(),
  sourceKey: varchar("sourceKey", { length: 191 }).notNull().unique(),
  sourceType: mysqlEnum("sourceType", [
    "government_public_health",
    "professional_dental_organization",
    "peer_reviewed_journal",
    "academic_health_system",
    "official_regulatory_product",
    "commercial_health_reference",
    "external_product_provider",
    "other",
    "unknown",
  ]).notNull(),
  publisher: varchar("publisher", { length: 500 }),
  title: varchar("title", { length: 1000 }).notNull(),
  location: varchar("location", { length: 2000 }).notNull(),
  sourceDate: varchar("sourceDate", { length: 64 }),
  accessedAt: timestamp("accessedAt"),
  verifiedAt: timestamp("verifiedAt"),
  verificationStatus: mysqlEnum("verificationStatus", [
    "verified",
    "legacy_existing",
    "pending_verification",
    "not_applicable",
  ]).notNull().default("pending_verification"),
  scope: text("scope"),
  publicDisplayAllowed: boolean("publicDisplayAllowed").notNull().default(false),
  snapshotHash: varchar("snapshotHash", { length: 128 }),
  sourceVersion: varchar("sourceVersion", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GovernanceSource = typeof governanceSources.$inferSelect;
export type InsertGovernanceSource = typeof governanceSources.$inferInsert;

/**
 * Reusable claims for new governed work. Existing public content is not
 * automatically imported or marked verified by this table.
 */
export const governanceClaims = mysqlTable("governance_claims", {
  id: int("id").autoincrement().primaryKey(),
  claimKey: varchar("claimKey", { length: 191 }).notNull().unique(),
  claimText: text("claimText").notNull(),
  approvedWording: text("approvedWording").notNull(),
  claimClass: mysqlEnum("claimClass", [
    "PRODUCT_FACT",
    "CLINICAL_EDUCATION",
    "URGENT_CARE",
    "TREATMENT_INFORMATION",
    "COST_INFORMATION",
    "EXTERNAL_COMPARISON",
    "POLICY",
    "TESTIMONIAL_OR_USER_CLAIM",
    "BUSINESS_ROI",
    "REGULATORY",
    "PRIVACY",
  ]).notNull(),
  riskLevel: mysqlEnum("riskLevel", ["LOW", "MEDIUM", "HIGH", "CRITICAL"]).notNull(),
  status: mysqlEnum("status", ["VERIFIED", "PENDING", "RETIRED", "RESTRICTED", "REJECTED"]).notNull().default("PENDING"),
  productEntity: varchar("productEntity", { length: 300 }),
  audience: varchar("audience", { length: 300 }),
  geography: varchar("geography", { length: 120 }),
  allowedParaphrase: boolean("allowedParaphrase").notNull().default(false),
  allowedChannels: json("allowedChannels").notNull(),
  prohibitedChannels: json("prohibitedChannels"),
  qualification: text("qualification"),
  effectiveAt: timestamp("effectiveAt"),
  reviewedAt: timestamp("reviewedAt"),
  expiresAt: timestamp("expiresAt"),
  retiredAt: timestamp("retiredAt"),
  replacementClaimId: int("replacementClaimId"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GovernanceClaim = typeof governanceClaims.$inferSelect;
export type InsertGovernanceClaim = typeof governanceClaims.$inferInsert;

/**
 * Normalized evidence association. A claim may require several sources and an
 * evidence source may be reused by several governed claims.
 */
export const governanceClaimSources = mysqlTable("governance_claim_sources", {
  id: int("id").autoincrement().primaryKey(),
  claimId: int("claimId").notNull(),
  sourceId: int("sourceId").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("governance_claim_sources_claim_source_unique").on(table.claimId, table.sourceId),
]);

export type GovernanceClaimSource = typeof governanceClaimSources.$inferSelect;
export type InsertGovernanceClaimSource = typeof governanceClaimSources.$inferInsert;

/**
 * Declared use of a governed claim. This records content identity and a clean
 * route path only, never query strings, user input, images, or health records.
 */
export const governanceClaimUses = mysqlTable("governance_claim_uses", {
  id: int("id").autoincrement().primaryKey(),
  claimId: int("claimId").notNull(),
  contentKey: varchar("contentKey", { length: 300 }).notNull(),
  routePath: varchar("routePath", { length: 1000 }).notNull(),
  channel: mysqlEnum("channel", [
    "visible_body",
    "title",
    "meta_description",
    "open_graph",
    "faq",
    "direct_answer",
    "schema",
    "llms",
  ]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("governance_claim_uses_claim_content_channel_unique").on(table.claimId, table.contentKey, table.channel),
]);

export type GovernanceClaimUse = typeof governanceClaimUses.$inferSelect;
export type InsertGovernanceClaimUse = typeof governanceClaimUses.$inferInsert;

/**
 * Append-only review records bind approved evidence to a deterministic content
 * version. A reviewer display still requires the existing verified profile gate.
 */
export const governanceApprovals = mysqlTable("governance_approvals", {
  id: int("id").autoincrement().primaryKey(),
  approvalKey: varchar("approvalKey", { length: 191 }).notNull().unique(),
  contentKey: varchar("contentKey", { length: 300 }).notNull(),
  contentRoute: varchar("contentRoute", { length: 1000 }),
  contentType: varchar("contentType", { length: 100 }).notNull(),
  intentOwnerId: varchar("intentOwnerId", { length: 120 }),
  contentVersionHash: varchar("contentVersionHash", { length: 128 }).notNull(),
  finalApprovedVersionHash: varchar("finalApprovedVersionHash", { length: 128 }),
  publicationState: mysqlEnum("publicationState", ["draft", "pending_review", "approved_for_publish", "published", "unpublished", "archived"]).notNull().default("draft"),
  riskLevel: mysqlEnum("riskLevel", ["LOW", "MEDIUM", "HIGH", "CRITICAL"]).notNull(),
  claimIdsReviewed: json("claimIdsReviewed").notNull(),
  sourceIdsReviewed: json("sourceIdsReviewed").notNull(),
  reviewScope: text("reviewScope"),
  changeSummary: text("changeSummary"),
  reReviewRequired: boolean("reReviewRequired").notNull().default(true),
  decisionMakerName: varchar("decisionMakerName", { length: 300 }).notNull(),
  decisionMakerRole: varchar("decisionMakerRole", { length: 300 }).notNull(),
  clinicalReviewerReference: varchar("clinicalReviewerReference", { length: 300 }),
  clinicalReviewerCredentialsReference: varchar("clinicalReviewerCredentialsReference", { length: 500 }),
  verifiedReviewerProfileReference: varchar("verifiedReviewerProfileReference", { length: 300 }),
  publicDisplayAllowed: boolean("publicDisplayAllowed").notNull().default(false),
  clinicalDecision: mysqlEnum("clinicalDecision", ["APPROVED", "APPROVED_WITH_CHANGES", "REJECTED", "REVIEW_NOT_REQUIRED", "PENDING"]).notNull().default("PENDING"),
  clinicalReviewedAt: timestamp("clinicalReviewedAt"),
  productBusinessDecision: mysqlEnum("productBusinessDecision", ["APPROVED", "APPROVED_WITH_CHANGES", "REJECTED", "REVIEW_NOT_REQUIRED", "PENDING"]).notNull().default("PENDING"),
  legalPrivacyDecision: mysqlEnum("legalPrivacyDecision", ["APPROVED", "APPROVED_WITH_CHANGES", "REJECTED", "REVIEW_NOT_REQUIRED", "PENDING"]).notNull().default("PENDING"),
  editorialDecision: mysqlEnum("editorialDecision", ["APPROVED", "APPROVED_WITH_CHANGES", "REJECTED", "REVIEW_NOT_REQUIRED", "PENDING"]).notNull().default("PENDING"),
  approvedAt: timestamp("approvedAt"),
  publicationAuthority: varchar("publicationAuthority", { length: 300 }),
  nextReviewAt: timestamp("nextReviewAt"),
  supersededByApprovalId: int("supersededByApprovalId"),
  correctionReference: varchar("correctionReference", { length: 300 }),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type GovernanceApproval = typeof governanceApprovals.$inferSelect;
export type InsertGovernanceApproval = typeof governanceApprovals.$inferInsert;

/**
 * A governance decision record, not a direct publication, redirect, canonical,
 * sitemap, noindex, or deletion action.
 */
export const governanceCandidates = mysqlTable("governance_candidates", {
  id: int("id").autoincrement().primaryKey(),
  candidateKey: varchar("candidateKey", { length: 191 }).notNull().unique(),
  workingQuestion: text("workingQuestion").notNull(),
  targetAudience: varchar("targetAudience", { length: 300 }).notNull(),
  funnelStage: varchar("funnelStage", { length: 80 }).notNull(),
  queryFamily: varchar("queryFamily", { length: 300 }).notNull(),
  intentOwnerId: varchar("intentOwnerId", { length: 120 }).notNull(),
  cmsCategory: mysqlEnum("cmsCategory", ["Dentist Problems", "Dental Problems", "Insurance Problems", "Symptoms", "Gums", "Cavities", "X-Rays", "Costs"]).notNull(),
  existingRoute: varchar("existingRoute", { length: 1000 }),
  proposedRoute: varchar("proposedRoute", { length: 1000 }),
  informationGain: text("informationGain"),
  overlapScores: json("overlapScores").notNull(),
  overlapScoreTotal: int("overlapScoreTotal").notNull().default(0),
  overlapEvidence: text("overlapEvidence"),
  performanceEvidence: mysqlEnum("performanceEvidence", ["AVAILABLE", "UNAVAILABLE"]).notNull().default("UNAVAILABLE"),
  sourceFeasibility: mysqlEnum("sourceFeasibility", ["VERIFIED", "PENDING", "NOT_FEASIBLE"]).notNull().default("PENDING"),
  claimIds: json("claimIds").notNull(),
  sourceIds: json("sourceIds").notNull(),
  riskLevel: mysqlEnum("riskLevel", ["LOW", "MEDIUM", "HIGH", "CRITICAL"]).notNull(),
  requiredReviewerRoles: json("requiredReviewerRoles").notNull(),
  ctaDestination: varchar("ctaDestination", { length: 1000 }),
  canonicalPlan: varchar("canonicalPlan", { length: 1000 }),
  internalLinkPlan: json("internalLinkPlan").notNull(),
  decision: mysqlEnum("decision", ["KEEP", "IMPROVE", "REFRESH", "MERGE", "REDIRECT", "NOINDEX", "REMOVE", "CREATE_CANDIDATE", "DEFER"]).notNull().default("CREATE_CANDIDATE"),
  decisionReason: text("decisionReason"),
  approvalState: mysqlEnum("approvalState", ["PENDING", "APPROVED", "REJECTED", "BLOCKED"]).notNull().default("PENDING"),
  blocker: text("blocker"),
  plannedWindow: varchar("plannedWindow", { length: 120 }),
  status: mysqlEnum("status", ["OPEN", "APPROVED", "BLOCKED", "ARCHIVED"]).notNull().default("OPEN"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GovernanceCandidate = typeof governanceCandidates.$inferSelect;
export type InsertGovernanceCandidate = typeof governanceCandidates.$inferInsert;

/**
 * Conversion events table for tracking user interactions.
 * Stores download clicks, CTA clicks, page views, and funnel events
 * with full attribution (source page, device, referrer, UTM params).
 */
export const conversionEvents = mysqlTable("conversion_events", {
  id: int("id").autoincrement().primaryKey(),
  
  // Event identification
  eventName: varchar("eventName", { length: 100 }).notNull(), // e.g. download_ios_click, cta_get_score_click
  eventCategory: mysqlEnum("eventCategory", [
    "download", "cta_click", "page_view", "quiz", "lead", "engagement"
  ]).notNull(),
  
  // Attribution
  sourcePage: varchar("sourcePage", { length: 500 }).notNull(), // URL path where event fired
  sourcePageTitle: varchar("sourcePageTitle", { length: 500 }),
  referrer: varchar("referrer", { length: 1000 }),
  
  // UTM tracking
  utmSource: varchar("utmSource", { length: 200 }),
  utmMedium: varchar("utmMedium", { length: 200 }),
  utmCampaign: varchar("utmCampaign", { length: 200 }),
  
  // Device info
  deviceType: mysqlEnum("deviceType", ["desktop", "tablet", "mobile"]).default("desktop"),
  userAgent: varchar("userAgent", { length: 500 }),
  
  // Session tracking
  sessionId: varchar("sessionId", { length: 100 }),
  
  // Extra event-specific data (JSON)
  metadata: json("metadata"),
  
  // Timestamp
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ConversionEvent = typeof conversionEvents.$inferSelect;
export type InsertConversionEvent = typeof conversionEvents.$inferInsert;

/**
 * Site settings table for key-value configuration.
 * Used for admin-configurable settings like blog agent auto-publish.
 */
export const siteSettings = mysqlTable("site_settings", {
  id: int("id").autoincrement().primaryKey(),
  settingKey: varchar("settingKey", { length: 100 }).notNull().unique(),
  settingValue: text("settingValue").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = typeof siteSettings.$inferInsert;

/**
 * Media library: stores metadata for every image uploaded through the blog editor.
 * The actual file bytes live in S3 (via Manus storage proxy); this table is the
 * catalogue layer that makes images searchable, reusable, and auditable.
 */
export const mediaItems = mysqlTable("media_items", {
  id: int("id").autoincrement().primaryKey(),

  // Storage reference
  url: varchar("url", { length: 1000 }).notNull(),
  fileKey: varchar("fileKey", { length: 500 }).notNull(),

  // File metadata
  filename: varchar("filename", { length: 500 }).notNull(),
  mimeType: varchar("mimeType", { length: 100 }).notNull().default("image/jpeg"),
  fileSizeBytes: int("fileSizeBytes"),
  width: int("width"),
  height: int("height"),

  // Image variants (generated by Sharp during upload)
  thumbnailUrl: varchar("thumbnailUrl", { length: 1000 }),
  mediumUrl: varchar("mediumUrl", { length: 1000 }),
  webpUrl: varchar("webpUrl", { length: 1000 }),

  // Editorial metadata
  altText: varchar("altText", { length: 500 }),
  caption: text("caption"),
  title: varchar("title", { length: 500 }),

  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type MediaItem = typeof mediaItems.$inferSelect;
export type InsertMediaItem = typeof mediaItems.$inferInsert;

/**
 * Tags for organising media items (e.g. "hero", "blog", "screenshot").
 */
export const mediaTags = mysqlTable("media_tags", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MediaTag = typeof mediaTags.$inferSelect;
export type InsertMediaTag = typeof mediaTags.$inferInsert;

/**
 * Many-to-many join between media items and tags.
 */
export const mediaTagAssignments = mysqlTable("media_tag_assignments", {
  id: int("id").autoincrement().primaryKey(),
  mediaItemId: int("mediaItemId").notNull(),
  mediaTagId: int("mediaTagId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MediaTagAssignment = typeof mediaTagAssignments.$inferSelect;
export type InsertMediaTagAssignment = typeof mediaTagAssignments.$inferInsert;

/**
 * Audit log for image replacements.
 * Records every time an image URL is replaced across blog posts.
 */
export const mediaReplacementLog = mysqlTable("media_replacement_log", {
  id: int("id").autoincrement().primaryKey(),
  mediaItemId: int("mediaItemId").notNull(),
  oldUrl: varchar("oldUrl", { length: 1000 }).notNull(),
  newUrl: varchar("newUrl", { length: 1000 }).notNull(),
  postsUpdated: int("postsUpdated").notNull().default(0),
  replacedAt: timestamp("replacedAt").defaultNow().notNull(),
});
export type MediaReplacementLog = typeof mediaReplacementLog.$inferSelect;
export type InsertMediaReplacementLog = typeof mediaReplacementLog.$inferInsert;

/**
 * Admin-managed meta overrides for static pages.
 * Takes precedence over hardcoded staticMeta in metaTags.ts.
 * Canonical is auto-computed from path if left null.
 */
export const pageMetaOverrides = mysqlTable("page_meta_overrides", {
  id:        int("id").autoincrement().primaryKey(),
  path:      varchar("path", { length: 500 }).notNull().unique(),
  metaTitle: varchar("metaTitle", { length: 200 }),
  metaDesc:  text("metaDesc"),
  canonical: varchar("canonical", { length: 1000 }),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type PageMetaOverride = typeof pageMetaOverrides.$inferSelect;
export type InsertPageMetaOverride = typeof pageMetaOverrides.$inferInsert;

/**
 * DB-backed server-side redirects.
 * Replaces the hardcoded serverRedirects dict in server/_core/index.ts.
 * The dict is kept as a cold-start fallback — do not delete it.
 */
export const redirects = mysqlTable("redirects", {
  id:         int("id").autoincrement().primaryKey(),
  // 768 × 4 bytes fits the full utf8mb4 unique-index limit used in production.
  sourcePath: varchar("sourcePath", { length: 768 }).notNull().unique(),
  targetPath: varchar("targetPath", { length: 1000 }).notNull(),
  statusCode: int("statusCode").notNull().default(301),
  isEnabled:  boolean("isEnabled").notNull().default(true),
  hitCount:   int("hitCount").notNull().default(0),
  lastHitAt:  timestamp("lastHitAt"),
  note:       text("note"),
  createdAt:  timestamp("createdAt").defaultNow().notNull(),
  updatedAt:  timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type Redirect = typeof redirects.$inferSelect;
export type InsertRedirect = typeof redirects.$inferInsert;

/**
 * Not-found log: tracks paths that would 404 (dry-run) or do 404 (enforce).
 *
 * pathHash is a SHA-256 hex digest of the normalised path — used as the unique
 * key to avoid InnoDB's 3072-byte key-length limit on long varchar columns.
 * path stores the full URL for display purposes (no index needed).
 *
 * isDryRun=true  → logged but server still returned 200 (dry-run mode)
 * isDryRun=false → logged and server returned 404 (enforce mode)
 */
export const notFoundLog = mysqlTable("not_found_log", {
  id:           int("id").autoincrement().primaryKey(),
  pathHash:     varchar("pathHash", { length: 64 }).notNull().unique(),  // SHA-256 hex
  path:         varchar("path", { length: 2000 }).notNull(),
  hitCount:     int("hitCount").default(1).notNull(),
  isDryRun:     boolean("isDryRun").default(true).notNull(),
  firstSeenAt:  timestamp("firstSeenAt").defaultNow().notNull(),
  lastSeenAt:   timestamp("lastSeenAt").defaultNow().onUpdateNow().notNull(),
  lastReferrer: varchar("lastReferrer", { length: 2000 }),
});
export type NotFoundLog = typeof notFoundLog.$inferSelect;
export type InsertNotFoundLog = typeof notFoundLog.$inferInsert;
