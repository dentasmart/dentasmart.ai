CREATE TABLE `page_meta_overrides` (
	`id` int AUTO_INCREMENT NOT NULL,
	`path` varchar(500) NOT NULL,
	`metaTitle` varchar(200),
	`metaDesc` text,
	`canonical` varchar(1000),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `page_meta_overrides_id` PRIMARY KEY(`id`),
	CONSTRAINT `page_meta_overrides_path_unique` UNIQUE(`path`)
);
