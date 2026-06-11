CREATE TABLE `media_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`url` varchar(1000) NOT NULL,
	`fileKey` varchar(500) NOT NULL,
	`filename` varchar(500) NOT NULL,
	`mimeType` varchar(100) NOT NULL DEFAULT 'image/jpeg',
	`fileSizeBytes` int,
	`width` int,
	`height` int,
	`altText` varchar(500),
	`caption` text,
	`title` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `media_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media_tag_assignments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`mediaItemId` int NOT NULL,
	`mediaTagId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `media_tag_assignments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media_tags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `media_tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `media_tags_name_unique` UNIQUE(`name`)
);
