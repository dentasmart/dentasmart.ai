import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

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
 * Supports full CRUD, SEO metadata, status management, and categorization.
 */
export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  
  // Content fields
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  category: mysqlEnum("category", ["Dentist Problems", "Dental Problems", "Insurance Problems"]).notNull(),
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
