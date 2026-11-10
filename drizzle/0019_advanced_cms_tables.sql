CREATE TABLE IF NOT EXISTS `cms_pages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`routePath` varchar(500) NOT NULL,
	`contentType` enum('blog','condition','symptom','guide','treatment','cost','other') NOT NULL,
	`slug` varchar(200) NOT NULL,
	`draftContent` json NOT NULL,
	`draftRevision` int NOT NULL DEFAULT 0,
	`publishedContent` json,
	`publishedRevision` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cms_pages_id` PRIMARY KEY(`id`),
	CONSTRAINT `cms_pages_routePath_unique` UNIQUE(`routePath`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `cms_page_revisions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pageId` int NOT NULL,
	`revision` int NOT NULL,
	`action` enum('baseline','draft_saved','restored','published') NOT NULL,
	`content` json NOT NULL,
	`adminId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `cms_page_revisions_id` PRIMARY KEY(`id`),
	CONSTRAINT `cms_page_revisions_page_revision_unique` UNIQUE(`pageId`,`revision`)
);
