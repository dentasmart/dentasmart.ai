CREATE TABLE `media_replacement_log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`mediaItemId` int NOT NULL,
	`oldUrl` varchar(1000) NOT NULL,
	`newUrl` varchar(1000) NOT NULL,
	`postsUpdated` int NOT NULL DEFAULT 0,
	`replacedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `media_replacement_log_id` PRIMARY KEY(`id`)
);
