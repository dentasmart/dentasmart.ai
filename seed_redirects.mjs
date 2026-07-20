import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const conn = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(conn);

const rows = [
  { sourcePath: '/oral-health-hub/best-ai-dental-apps', targetPath: '/oral-health-hub/top-10-best-ai-dental-apps/', statusCode: 301, isEnabled: true, note: 'Article URL change' },
  { sourcePath: '/oral-health-hub/dental-crown', targetPath: '/oral-health-hub/what-is-a-dental-crown/', statusCode: 301, isEnabled: true, note: 'Article URL change' },
  { sourcePath: '/oral-health-hub/dental-crown/', targetPath: '/oral-health-hub/what-is-a-dental-crown/', statusCode: 301, isEnabled: true, note: 'Article URL change (trailing slash)' },
  { sourcePath: '/comparisons/veneers-vs-crowns', targetPath: '/comparisons/', statusCode: 301, isEnabled: true, note: 'Comparison page consolidated' },
  { sourcePath: '/comparisons/veneers-vs-crowns/', targetPath: '/comparisons/', statusCode: 301, isEnabled: true, note: 'Comparison page consolidated (trailing slash)' },
  { sourcePath: '/oral-health-hub/oral-health-score-explained', targetPath: '/conditions/toothache', statusCode: 301, isEnabled: true, note: 'Old hub article to dedicated page' },
  { sourcePath: '/oral-health-hub/dental-benefits-utilization-guide', targetPath: '/conditions/gum-disease', statusCode: 301, isEnabled: true, note: 'Old hub article to dedicated page' },
  { sourcePath: '/hub/understanding-dental-conditions', targetPath: '/conditions', statusCode: 301, isEnabled: true, note: 'Hub category redirect' },
  { sourcePath: '/hub/treatment-guides', targetPath: '/treatments', statusCode: 301, isEnabled: true, note: 'Hub category redirect' },
  { sourcePath: '/hub/prevention-tips', targetPath: '/oral-health-hub/prevention', statusCode: 301, isEnabled: true, note: 'Hub category redirect' },
  { sourcePath: '/hub/dental-technology', targetPath: '/features', statusCode: 301, isEnabled: true, note: 'Hub category redirect' },
  { sourcePath: '/hub/cost-and-insurance', targetPath: '/dental-costs', statusCode: 301, isEnabled: true, note: 'Hub category redirect' },
  { sourcePath: '/hub/affordability', targetPath: '/oral-health-hub/affordability', statusCode: 301, isEnabled: true, note: 'Hub category redirect' },
  { sourcePath: '/hub/second-opinion', targetPath: '/oral-health-hub/second-opinion', statusCode: 301, isEnabled: true, note: 'Hub category redirect' },
  { sourcePath: '/hub/prevention', targetPath: '/oral-health-hub/prevention', statusCode: 301, isEnabled: true, note: 'Hub category redirect' },
  { sourcePath: '/affordability', targetPath: '/oral-health-hub/affordability', statusCode: 301, isEnabled: true, note: 'Short-path alias' },
  { sourcePath: '/prevention', targetPath: '/oral-health-hub/prevention', statusCode: 301, isEnabled: true, note: 'Short-path alias' },
  { sourcePath: '/second-opinion', targetPath: '/oral-health-hub/second-opinion', statusCode: 301, isEnabled: true, note: 'Short-path alias' },
  { sourcePath: '/symptom-checker', targetPath: '/symptom-quiz', statusCode: 301, isEnabled: true, note: 'Short-path alias' },
  { sourcePath: '/symptoms/toothache', targetPath: '/conditions/toothache', statusCode: 301, isEnabled: true, note: 'Symptom alias' },
  { sourcePath: '/symptoms/cracked-tooth', targetPath: '/conditions/cracked-tooth', statusCode: 301, isEnabled: true, note: 'Symptom alias' },
  { sourcePath: '/symptoms/sensitive-teeth', targetPath: '/conditions/sensitive-teeth', statusCode: 301, isEnabled: true, note: 'Symptom alias' },
  { sourcePath: '/treatments/veneers', targetPath: '/treatments/veneers-procedure', statusCode: 301, isEnabled: true, note: 'Treatment alias' },
  { sourcePath: '/treatments/invisalign', targetPath: '/treatments/braces-treatment', statusCode: 301, isEnabled: true, note: 'Treatment alias' },
  { sourcePath: '/treatments/teeth-whitening', targetPath: '/treatments/teeth-whitening-procedure', statusCode: 301, isEnabled: true, note: 'Treatment alias' },
  { sourcePath: '/treatments/dental-crowns', targetPath: '/treatments/dental-crown-procedure', statusCode: 301, isEnabled: true, note: 'Treatment alias' },
  { sourcePath: '/treatments/bone-grafting', targetPath: '/treatments', statusCode: 301, isEnabled: true, note: 'Treatment alias' },
  { sourcePath: '/treatments/full-mouth-dental-implants', targetPath: '/treatments/dental-implant-procedure', statusCode: 301, isEnabled: true, note: 'Treatment alias' },
  { sourcePath: '/treatments/gingivitis', targetPath: '/conditions/gum-disease', statusCode: 301, isEnabled: true, note: 'Treatment alias to condition' },
  { sourcePath: '/dental-costs/dental-cleaning', targetPath: '/dental-costs/dental-cleaning-cost', statusCode: 301, isEnabled: true, note: 'Cost alias' },
  { sourcePath: '/dental-costs/dental-implants-cost', targetPath: '/dental-costs/dental-implant-cost', statusCode: 301, isEnabled: true, note: 'Cost alias' },
  { sourcePath: '/comparisons/invisalign-vs-braces', targetPath: '/compare/braces-vs-invisalign', statusCode: 301, isEnabled: true, note: 'Comparison alias' },
  { sourcePath: '/guides/teeth-whitening', targetPath: '/conditions/teeth-whitening', statusCode: 301, isEnabled: true, note: 'Guide alias' },
  { sourcePath: '/guides/when-to-get-second-opinion', targetPath: '/guides/when-to-get-dental-second-opinion', statusCode: 301, isEnabled: true, note: 'Guide alias' },
  { sourcePath: '/index.php', targetPath: '/', statusCode: 301, isEnabled: true, note: 'Legacy PHP URL' },
  { sourcePath: '/employers.php', targetPath: '/employers', statusCode: 301, isEnabled: true, note: 'Legacy PHP URL' },
  { sourcePath: '/teams.php', targetPath: '/team', statusCode: 301, isEnabled: true, note: 'Legacy PHP URL' },
  { sourcePath: '/features.php', targetPath: '/features', statusCode: 301, isEnabled: true, note: 'Legacy PHP URL' },
  { sourcePath: '/privacy-policy.php', targetPath: '/privacy-policy', statusCode: 301, isEnabled: true, note: 'Legacy PHP URL' },
  { sourcePath: '/terms-and-condition.php', targetPath: '/terms-of-service', statusCode: 301, isEnabled: true, note: 'Legacy PHP URL' },
  { sourcePath: '/faqs.php', targetPath: '/faqs', statusCode: 301, isEnabled: true, note: 'Legacy PHP URL' },
  { sourcePath: '/how-it-works.php', targetPath: '/how-it-works', statusCode: 301, isEnabled: true, note: 'Legacy PHP URL' },
  { sourcePath: '/DentaSmart', targetPath: '/', statusCode: 301, isEnabled: true, note: 'Legacy URL' },
  { sourcePath: '/oral-health-hub/wwhat-are-dental-implants-cost', targetPath: '/oral-health-hub/what-are-dental-implants-cost', statusCode: 301, isEnabled: true, note: 'Typo slug correction' },
  { sourcePath: '/oral-health-hub/cclear-aligners-vs-braces', targetPath: '/oral-health-hub/clear-aligners-vs-braces', statusCode: 301, isEnabled: true, note: 'Typo slug correction' },
  { sourcePath: '/oral-health-hub/wisdom-teeth-confusion', targetPath: '/oral-health-hub/when-do-wisdom-teeth-come-in/', statusCode: 301, isEnabled: true, note: 'Wisdom teeth consolidation' },
  { sourcePath: '/oral-health-hub/wisdom-teeth-confusion/', targetPath: '/oral-health-hub/when-do-wisdom-teeth-come-in/', statusCode: 301, isEnabled: true, note: 'Wisdom teeth consolidation (trailing slash)' },
  { sourcePath: '/oral-health-hub/wisdom-tooth-infection-symptoms', targetPath: '/oral-health-hub/when-do-wisdom-teeth-come-in/', statusCode: 301, isEnabled: true, note: 'Wisdom teeth consolidation' },
  { sourcePath: '/oral-health-hub/wisdom-tooth-infection-symptoms/', targetPath: '/oral-health-hub/when-do-wisdom-teeth-come-in/', statusCode: 301, isEnabled: true, note: 'Wisdom teeth consolidation (trailing slash)' },
];

// Insert one by one to avoid multi-statement issues
let inserted = 0;
for (const row of rows) {
  try {
    await conn.execute(
      'INSERT INTO redirects (sourcePath, targetPath, statusCode, isEnabled, note) VALUES (?, ?, ?, ?, ?)',
      [row.sourcePath, row.targetPath, row.statusCode, row.isEnabled ? 1 : 0, row.note]
    );
    inserted++;
  } catch (e) {
    console.error(`FAILED: ${row.sourcePath} — ${e.message}`);
  }
}

const [rows2] = await conn.execute('SELECT COUNT(*) as cnt FROM redirects');
console.log(`Inserted: ${inserted}/49 | Total in DB: ${rows2[0].cnt}`);
await conn.end();
