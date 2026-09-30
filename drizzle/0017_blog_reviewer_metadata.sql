ALTER TABLE `blog_posts` ADD `reviewerShortBio` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `reviewerProfileUrl` varchar(1000);--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `lastReviewed` varchar(10);--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `reviewerJsonLd` text;
