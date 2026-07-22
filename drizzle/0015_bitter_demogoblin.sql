CREATE TABLE `not_found_log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pathHash` varchar(64) NOT NULL,
	`path` varchar(2000) NOT NULL,
	`hitCount` int NOT NULL DEFAULT 1,
	`isDryRun` boolean NOT NULL DEFAULT true,
	`firstSeenAt` timestamp NOT NULL DEFAULT (now()),
	`lastSeenAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastReferrer` varchar(2000),
	CONSTRAINT `not_found_log_id` PRIMARY KEY(`id`),
	CONSTRAINT `not_found_log_pathHash_unique` UNIQUE(`pathHash`)
);
