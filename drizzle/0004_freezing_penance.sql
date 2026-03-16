CREATE TABLE `quiz_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320),
	`answers` json NOT NULL,
	`riskLevel` enum('low','moderate','high') NOT NULL,
	`matchedConditions` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quiz_submissions_id` PRIMARY KEY(`id`)
);
