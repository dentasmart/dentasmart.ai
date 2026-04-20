import 'dotenv/config';
import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);

console.log('=== BLOG POSTS WITH MISSING META DESCRIPTIONS ===\n');
const [missingDesc] = await connection.execute(
  `SELECT id, title, slug, metaTitle, metaDescription, status 
   FROM blog_posts 
   WHERE (metaDescription IS NULL OR metaDescription = '') 
   AND status = 'published'
   ORDER BY id`
);
console.log(`Found ${missingDesc.length} published posts with missing meta descriptions:\n`);
for (const post of missingDesc) {
  console.log(`ID: ${post.id}`);
  console.log(`  Title: ${post.title}`);
  console.log(`  Slug: ${post.slug}`);
  console.log(`  MetaTitle: ${post.metaTitle || '(none)'}`);
  console.log(`  MetaDesc: ${post.metaDescription || '(MISSING)'}`);
  console.log('');
}

console.log('\n=== BLOG POSTS WITH LONG TITLES (>57 chars) ===\n');
const [longTitles] = await connection.execute(
  `SELECT id, title, slug, metaTitle, CHAR_LENGTH(COALESCE(metaTitle, title)) as titleLen, status
   FROM blog_posts 
   WHERE status = 'published'
   AND CHAR_LENGTH(COALESCE(metaTitle, title)) > 57
   ORDER BY CHAR_LENGTH(COALESCE(metaTitle, title)) DESC`
);
console.log(`Found ${longTitles.length} published posts with titles > 57 chars:\n`);
for (const post of longTitles) {
  const displayTitle = post.metaTitle || post.title;
  const fullTitle = displayTitle.includes('DentaSmart') ? displayTitle : `${displayTitle} | DentaSmart`;
  console.log(`ID: ${post.id}`);
  console.log(`  Title: ${post.title}`);
  console.log(`  MetaTitle: ${post.metaTitle || '(using title)'}`);
  console.log(`  Full rendered: ${fullTitle} (${fullTitle.length} chars)`);
  console.log(`  Slug: ${post.slug}`);
  console.log('');
}

await connection.end();
