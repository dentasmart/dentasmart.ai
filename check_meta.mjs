import 'dotenv/config';
import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Check for empty meta descriptions
const [empty] = await conn.execute(`SELECT id, slug, title, metaDescription FROM blog_posts WHERE metaDescription IS NULL OR metaDescription = '' ORDER BY id`);
console.log(`\n=== Blog posts with EMPTY meta descriptions: ${empty.length} ===`);
for (const row of empty) {
  console.log(`  - [${row.id}] ${row.slug}: "${row.metaDescription || '(null)'}"`);
}

// Check for duplicate meta descriptions
const [dupes] = await conn.execute(`
  SELECT metaDescription, COUNT(*) as cnt, GROUP_CONCAT(slug SEPARATOR ', ') as slugs 
  FROM blog_posts 
  WHERE metaDescription IS NOT NULL AND metaDescription != '' 
  GROUP BY metaDescription 
  HAVING COUNT(*) > 1
  ORDER BY cnt DESC
`);
console.log(`\n=== Duplicate meta descriptions: ${dupes.length} groups ===`);
for (const row of dupes) {
  console.log(`  - "${row.metaDescription.substring(0, 80)}..." (${row.cnt}x): ${row.slugs}`);
}

// Total blog posts
const [total] = await conn.execute(`SELECT COUNT(*) as cnt FROM blog_posts`);
console.log(`\n=== Total blog posts: ${total[0].cnt} ===`);

await conn.end();
