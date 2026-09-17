CREATE TABLE `governance_approvals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`approvalKey` varchar(191) NOT NULL,
	`contentKey` varchar(300) NOT NULL,
	`contentRoute` varchar(1000),
	`contentType` varchar(100) NOT NULL,
	`intentOwnerId` varchar(120),
	`contentVersionHash` varchar(128) NOT NULL,
	`finalApprovedVersionHash` varchar(128),
	`publicationState` enum('draft','pending_review','approved_for_publish','published','unpublished','archived') NOT NULL DEFAULT 'draft',
	`riskLevel` enum('LOW','MEDIUM','HIGH','CRITICAL') NOT NULL,
	`claimIdsReviewed` json NOT NULL,
	`sourceIdsReviewed` json NOT NULL,
	`reviewScope` text,
	`changeSummary` text,
	`reReviewRequired` boolean NOT NULL DEFAULT true,
	`decisionMakerName` varchar(300) NOT NULL,
	`decisionMakerRole` varchar(300) NOT NULL,
	`clinicalReviewerReference` varchar(300),
	`clinicalReviewerCredentialsReference` varchar(500),
	`verifiedReviewerProfileReference` varchar(300),
	`publicDisplayAllowed` boolean NOT NULL DEFAULT false,
	`clinicalDecision` enum('APPROVED','APPROVED_WITH_CHANGES','REJECTED','REVIEW_NOT_REQUIRED','PENDING') NOT NULL DEFAULT 'PENDING',
	`clinicalReviewedAt` timestamp,
	`productBusinessDecision` enum('APPROVED','APPROVED_WITH_CHANGES','REJECTED','REVIEW_NOT_REQUIRED','PENDING') NOT NULL DEFAULT 'PENDING',
	`legalPrivacyDecision` enum('APPROVED','APPROVED_WITH_CHANGES','REJECTED','REVIEW_NOT_REQUIRED','PENDING') NOT NULL DEFAULT 'PENDING',
	`editorialDecision` enum('APPROVED','APPROVED_WITH_CHANGES','REJECTED','REVIEW_NOT_REQUIRED','PENDING') NOT NULL DEFAULT 'PENDING',
	`approvedAt` timestamp,
	`publicationAuthority` varchar(300),
	`nextReviewAt` timestamp,
	`supersededByApprovalId` int,
	`correctionReference` varchar(300),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `governance_approvals_id` PRIMARY KEY(`id`),
	CONSTRAINT `governance_approvals_approvalKey_unique` UNIQUE(`approvalKey`)
);
--> statement-breakpoint
CREATE TABLE `governance_candidates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`candidateKey` varchar(191) NOT NULL,
	`workingQuestion` text NOT NULL,
	`targetAudience` varchar(300) NOT NULL,
	`funnelStage` varchar(80) NOT NULL,
	`queryFamily` varchar(300) NOT NULL,
	`intentOwnerId` varchar(120) NOT NULL,
	`cmsCategory` enum('Dentist Problems','Dental Problems','Insurance Problems','Symptoms','Gums','Cavities','X-Rays','Costs') NOT NULL,
	`existingRoute` varchar(1000),
	`proposedRoute` varchar(1000),
	`informationGain` text,
	`overlapScores` json NOT NULL,
	`overlapScoreTotal` int NOT NULL DEFAULT 0,
	`overlapEvidence` text,
	`performanceEvidence` enum('AVAILABLE','UNAVAILABLE') NOT NULL DEFAULT 'UNAVAILABLE',
	`sourceFeasibility` enum('VERIFIED','PENDING','NOT_FEASIBLE') NOT NULL DEFAULT 'PENDING',
	`claimIds` json NOT NULL,
	`sourceIds` json NOT NULL,
	`riskLevel` enum('LOW','MEDIUM','HIGH','CRITICAL') NOT NULL,
	`requiredReviewerRoles` json NOT NULL,
	`ctaDestination` varchar(1000),
	`canonicalPlan` varchar(1000),
	`internalLinkPlan` json NOT NULL,
	`decision` enum('KEEP','IMPROVE','REFRESH','MERGE','REDIRECT','NOINDEX','REMOVE','CREATE_CANDIDATE','DEFER') NOT NULL DEFAULT 'CREATE_CANDIDATE',
	`decisionReason` text,
	`approvalState` enum('PENDING','APPROVED','REJECTED','BLOCKED') NOT NULL DEFAULT 'PENDING',
	`blocker` text,
	`plannedWindow` varchar(120),
	`status` enum('OPEN','APPROVED','BLOCKED','ARCHIVED') NOT NULL DEFAULT 'OPEN',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `governance_candidates_id` PRIMARY KEY(`id`),
	CONSTRAINT `governance_candidates_candidateKey_unique` UNIQUE(`candidateKey`)
);
--> statement-breakpoint
CREATE TABLE `governance_claim_sources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`claimId` int NOT NULL,
	`sourceId` int NOT NULL,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `governance_claim_sources_id` PRIMARY KEY(`id`),
	CONSTRAINT `governance_claim_sources_claim_source_unique` UNIQUE(`claimId`,`sourceId`)
);
--> statement-breakpoint
CREATE TABLE `governance_claim_uses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`claimId` int NOT NULL,
	`contentKey` varchar(300) NOT NULL,
	`routePath` varchar(1000) NOT NULL,
	`channel` enum('visible_body','title','meta_description','open_graph','faq','direct_answer','schema','llms') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `governance_claim_uses_id` PRIMARY KEY(`id`),
	CONSTRAINT `governance_claim_uses_claim_content_channel_unique` UNIQUE(`claimId`,`contentKey`,`channel`)
);
--> statement-breakpoint
CREATE TABLE `governance_claims` (
	`id` int AUTO_INCREMENT NOT NULL,
	`claimKey` varchar(191) NOT NULL,
	`claimText` text NOT NULL,
	`approvedWording` text NOT NULL,
	`claimClass` enum('PRODUCT_FACT','CLINICAL_EDUCATION','URGENT_CARE','TREATMENT_INFORMATION','COST_INFORMATION','EXTERNAL_COMPARISON','POLICY','TESTIMONIAL_OR_USER_CLAIM','BUSINESS_ROI','REGULATORY','PRIVACY') NOT NULL,
	`riskLevel` enum('LOW','MEDIUM','HIGH','CRITICAL') NOT NULL,
	`status` enum('VERIFIED','PENDING','RETIRED','RESTRICTED','REJECTED') NOT NULL DEFAULT 'PENDING',
	`productEntity` varchar(300),
	`audience` varchar(300),
	`geography` varchar(120),
	`allowedParaphrase` boolean NOT NULL DEFAULT false,
	`allowedChannels` json NOT NULL,
	`prohibitedChannels` json,
	`qualification` text,
	`effectiveAt` timestamp,
	`reviewedAt` timestamp,
	`expiresAt` timestamp,
	`retiredAt` timestamp,
	`replacementClaimId` int,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `governance_claims_id` PRIMARY KEY(`id`),
	CONSTRAINT `governance_claims_claimKey_unique` UNIQUE(`claimKey`)
);
--> statement-breakpoint
CREATE TABLE `governance_sources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sourceKey` varchar(191) NOT NULL,
	`sourceType` enum('government_public_health','professional_dental_organization','peer_reviewed_journal','academic_health_system','official_regulatory_product','commercial_health_reference','external_product_provider','other','unknown') NOT NULL,
	`publisher` varchar(500),
	`title` varchar(1000) NOT NULL,
	`location` varchar(2000) NOT NULL,
	`sourceDate` varchar(64),
	`accessedAt` timestamp,
	`verifiedAt` timestamp,
	`verificationStatus` enum('verified','legacy_existing','pending_verification','not_applicable') NOT NULL DEFAULT 'pending_verification',
	`scope` text,
	`publicDisplayAllowed` boolean NOT NULL DEFAULT false,
	`snapshotHash` varchar(128),
	`sourceVersion` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `governance_sources_id` PRIMARY KEY(`id`),
	CONSTRAINT `governance_sources_sourceKey_unique` UNIQUE(`sourceKey`)
);
--> statement-breakpoint
ALTER TABLE `agent_runs` ADD `governanceCandidateId` int;--> statement-breakpoint
ALTER TABLE `agent_runs` ADD `intentOwnerId` varchar(120);--> statement-breakpoint
ALTER TABLE `agent_runs` ADD `governanceVersion` varchar(128);--> statement-breakpoint
ALTER TABLE `agent_runs` ADD `governanceRiskLevel` enum('LOW','MEDIUM','HIGH','CRITICAL');--> statement-breakpoint
ALTER TABLE `agent_runs` ADD `requiredReviewerRoles` json;--> statement-breakpoint
ALTER TABLE `agent_runs` ADD `claimContextIds` json;--> statement-breakpoint
ALTER TABLE `agent_runs` ADD `sourceContextIds` json;--> statement-breakpoint
ALTER TABLE `agent_runs` ADD `contentVersionHash` varchar(128);--> statement-breakpoint
ALTER TABLE `agent_runs` ADD `validationResult` json;--> statement-breakpoint
ALTER TABLE `agent_runs` ADD `governanceApprovalState` enum('PENDING','APPROVED','BLOCKED');--> statement-breakpoint
ALTER TABLE `agent_runs` ADD `governanceBlockReason` text;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `governanceCandidateId` int;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD `governanceIntentOwnerId` varchar(120);