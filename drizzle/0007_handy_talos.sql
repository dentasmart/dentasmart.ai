CREATE TABLE `conversion_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventName` varchar(100) NOT NULL,
	`eventCategory` enum('download','cta_click','page_view','quiz','lead','engagement') NOT NULL,
	`sourcePage` varchar(500) NOT NULL,
	`sourcePageTitle` varchar(500),
	`referrer` varchar(1000),
	`utmSource` varchar(200),
	`utmMedium` varchar(200),
	`utmCampaign` varchar(200),
	`deviceType` enum('desktop','tablet','mobile') DEFAULT 'desktop',
	`userAgent` varchar(500),
	`sessionId` varchar(100),
	`metadata` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `conversion_events_id` PRIMARY KEY(`id`)
);
