import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";

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
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AgentRun = typeof agentRuns.$inferSelect;
export type InsertAgentRun = typeof agentRuns.$inferInsert;

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
