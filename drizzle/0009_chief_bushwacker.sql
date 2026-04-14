CREATE TABLE `benefits_waitlist` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200),
	`email` varchar(320) NOT NULL,
	`phone` varchar(50),
	`message` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `benefits_waitlist_id` PRIMARY KEY(`id`),
	CONSTRAINT `benefits_waitlist_email_unique` UNIQUE(`email`)
);
