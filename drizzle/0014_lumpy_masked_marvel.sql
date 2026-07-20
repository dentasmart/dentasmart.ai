CREATE TABLE `redirects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sourcePath` varchar(1000) NOT NULL,
	`targetPath` varchar(1000) NOT NULL,
	`statusCode` int NOT NULL DEFAULT 301,
	`isEnabled` boolean NOT NULL DEFAULT true,
	`hitCount` int NOT NULL DEFAULT 0,
	`lastHitAt` timestamp,
	`note` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `redirects_id` PRIMARY KEY(`id`),
	CONSTRAINT `redirects_sourcePath_unique` UNIQUE(`sourcePath`)
);

-- Seed: migrate all 49 hardcoded serverRedirects entries into the DB.
-- The hardcoded dict in server/_core/index.ts is kept as a cold-start fallback.
INSERT INTO `redirects` (`sourcePath`, `targetPath`, `statusCode`, `isEnabled`, `note`) VALUES
  -- Article URL changes
  ('/oral-health-hub/best-ai-dental-apps', '/oral-health-hub/top-10-best-ai-dental-apps/', 301, true, 'Article URL change'),
  ('/oral-health-hub/dental-crown', '/oral-health-hub/what-is-a-dental-crown/', 301, true, 'Article URL change'),
  ('/oral-health-hub/dental-crown/', '/oral-health-hub/what-is-a-dental-crown/', 301, true, 'Article URL change (trailing slash)'),
  -- Comparison pages consolidated
  ('/comparisons/veneers-vs-crowns', '/comparisons/', 301, true, 'Comparison page consolidated'),
  ('/comparisons/veneers-vs-crowns/', '/comparisons/', 301, true, 'Comparison page consolidated (trailing slash)'),
  -- Old hub articles to dedicated pages
  ('/oral-health-hub/oral-health-score-explained', '/conditions/toothache', 301, true, 'Old hub article to dedicated page'),
  ('/oral-health-hub/dental-benefits-utilization-guide', '/conditions/gum-disease', 301, true, 'Old hub article to dedicated page'),
  -- Hub category redirects
  ('/hub/understanding-dental-conditions', '/conditions', 301, true, 'Hub category redirect'),
  ('/hub/treatment-guides', '/treatments', 301, true, 'Hub category redirect'),
  ('/hub/prevention-tips', '/oral-health-hub/prevention', 301, true, 'Hub category redirect'),
  ('/hub/dental-technology', '/features', 301, true, 'Hub category redirect'),
  ('/hub/cost-and-insurance', '/dental-costs', 301, true, 'Hub category redirect'),
  ('/hub/affordability', '/oral-health-hub/affordability', 301, true, 'Hub category redirect'),
  ('/hub/second-opinion', '/oral-health-hub/second-opinion', 301, true, 'Hub category redirect'),
  ('/hub/prevention', '/oral-health-hub/prevention', 301, true, 'Hub category redirect'),
  -- Short-path redirects
  ('/affordability', '/oral-health-hub/affordability', 301, true, 'Short-path alias'),
  ('/prevention', '/oral-health-hub/prevention', 301, true, 'Short-path alias'),
  ('/second-opinion', '/oral-health-hub/second-opinion', 301, true, 'Short-path alias'),
  ('/symptom-checker', '/symptom-quiz', 301, true, 'Short-path alias'),
  -- Symptom aliases to conditions
  ('/symptoms/toothache', '/conditions/toothache', 301, true, 'Symptom alias'),
  ('/symptoms/cracked-tooth', '/conditions/cracked-tooth', 301, true, 'Symptom alias'),
  ('/symptoms/sensitive-teeth', '/conditions/sensitive-teeth', 301, true, 'Symptom alias'),
  -- Treatment aliases
  ('/treatments/veneers', '/treatments/veneers-procedure', 301, true, 'Treatment alias'),
  ('/treatments/invisalign', '/treatments/braces-treatment', 301, true, 'Treatment alias'),
  ('/treatments/teeth-whitening', '/treatments/teeth-whitening-procedure', 301, true, 'Treatment alias'),
  ('/treatments/dental-crowns', '/treatments/dental-crown-procedure', 301, true, 'Treatment alias'),
  ('/treatments/bone-grafting', '/treatments', 301, true, 'Treatment alias'),
  ('/treatments/full-mouth-dental-implants', '/treatments/dental-implant-procedure', 301, true, 'Treatment alias'),
  ('/treatments/gingivitis', '/conditions/gum-disease', 301, true, 'Treatment alias to condition'),
  -- Cost aliases
  ('/dental-costs/dental-cleaning', '/dental-costs/dental-cleaning-cost', 301, true, 'Cost alias'),
  ('/dental-costs/dental-implants-cost', '/dental-costs/dental-implant-cost', 301, true, 'Cost alias'),
  -- Comparison aliases
  ('/comparisons/invisalign-vs-braces', '/compare/braces-vs-invisalign', 301, true, 'Comparison alias'),
  -- Guide aliases
  ('/guides/teeth-whitening', '/conditions/teeth-whitening', 301, true, 'Guide alias'),
  ('/guides/when-to-get-second-opinion', '/guides/when-to-get-dental-second-opinion', 301, true, 'Guide alias'),
  -- Legacy PHP URLs
  ('/index.php', '/', 301, true, 'Legacy PHP URL'),
  ('/employers.php', '/employers', 301, true, 'Legacy PHP URL'),
  ('/teams.php', '/team', 301, true, 'Legacy PHP URL'),
  ('/features.php', '/features', 301, true, 'Legacy PHP URL'),
  ('/privacy-policy.php', '/privacy-policy', 301, true, 'Legacy PHP URL'),
  ('/terms-and-condition.php', '/terms-of-service', 301, true, 'Legacy PHP URL'),
  ('/faqs.php', '/faqs', 301, true, 'Legacy PHP URL'),
  ('/how-it-works.php', '/how-it-works', 301, true, 'Legacy PHP URL'),
  ('/DentaSmart', '/', 301, true, 'Legacy URL'),
  -- Typo slug corrections
  ('/oral-health-hub/wwhat-are-dental-implants-cost', '/oral-health-hub/what-are-dental-implants-cost', 301, true, 'Typo slug correction'),
  ('/oral-health-hub/cclear-aligners-vs-braces', '/oral-health-hub/clear-aligners-vs-braces', 301, true, 'Typo slug correction'),
  -- Wisdom teeth article consolidation
  ('/oral-health-hub/wisdom-teeth-confusion', '/oral-health-hub/when-do-wisdom-teeth-come-in/', 301, true, 'Wisdom teeth consolidation'),
  ('/oral-health-hub/wisdom-teeth-confusion/', '/oral-health-hub/when-do-wisdom-teeth-come-in/', 301, true, 'Wisdom teeth consolidation (trailing slash)'),
  ('/oral-health-hub/wisdom-tooth-infection-symptoms', '/oral-health-hub/when-do-wisdom-teeth-come-in/', 301, true, 'Wisdom teeth consolidation'),
  ('/oral-health-hub/wisdom-tooth-infection-symptoms/', '/oral-health-hub/when-do-wisdom-teeth-come-in/', 301, true, 'Wisdom teeth consolidation (trailing slash)');
