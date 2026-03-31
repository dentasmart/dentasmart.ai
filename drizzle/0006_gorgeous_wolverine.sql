CREATE TABLE `agent_runs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`status` enum('running','success','draft','failed') NOT NULL DEFAULT 'running',
	`title` varchar(500),
	`slug` varchar(500),
	`primaryKeyword` varchar(200),
	`postId` int,
	`error` text,
	`triggerType` enum('manual','scheduled') NOT NULL DEFAULT 'manual',
	`durationMs` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `agent_runs_id` PRIMARY KEY(`id`)
);
