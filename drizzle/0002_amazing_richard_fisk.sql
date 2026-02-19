CREATE TABLE `android_waitlist` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `android_waitlist_id` PRIMARY KEY(`id`),
	CONSTRAINT `android_waitlist_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `blog_posts` MODIFY COLUMN `category` enum('Dentist Problems','Dental Problems','Insurance Problems','Symptoms','Gums','Cavities','X-Rays','Costs') NOT NULL;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `primaryKeyword` varchar(200);--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `secondaryKeywords` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `atAGlanceAnswer` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `keyTakeaways` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `whenUrgent` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `faqs` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `relatedPosts` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `reviewedByName` varchar(200);--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `reviewedByCredentials` varchar(500);