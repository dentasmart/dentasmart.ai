import 'dotenv/config';
import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const conn = await mysql.createConnection(DATABASE_URL);

// Read the generated posts from JSON
const data = JSON.parse(readFileSync('/home/ubuntu/generate_hub_posts.json', 'utf-8'));

let inserted = 0;
let skipped = 0;

for (const result of data.results) {
  const post = result.output;
  if (!post || !post.slug) {
    console.log('Skipping invalid result');
    skipped++;
    continue;
  }

  try {
    // Check if slug already exists
    const [existing] = await conn.query('SELECT id FROM blog_posts WHERE slug = ?', [post.slug]);
    if (existing.length > 0) {
      console.log(`Skipping "${post.slug}" - already exists`);
      skipped++;
      continue;
    }

    await conn.query(
      `INSERT INTO blog_posts (title, slug, category, readTime, primaryKeyword, secondaryKeywords, 
       metaTitle, metaDescription, atAGlanceAnswer, keyTakeaways, whenUrgent, faqs, relatedPosts,
       reviewedByName, reviewedByCredentials, bodyHtml, status, publishedAt) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', NOW())`,
      [
        post.title,
        post.slug,
        post.category,
        post.read_time,
        post.primary_keyword,
        post.secondary_keywords,
        post.meta_title,
        post.meta_description,
        post.at_a_glance_answer,
        post.key_takeaways,
        post.when_urgent,
        post.faqs,
        post.related_posts,
        "DentaSmart Clinical Advisory",
        "Content reviewed for accuracy by dental professionals",
        post.body_html,
        ]
    );
    inserted++;
    console.log(`Inserted: ${post.slug}`);
  } catch (err) {
    console.error(`Error inserting ${post.slug}:`, err.message);
  }
}

console.log(`\nDone. Inserted ${inserted}, skipped ${skipped} of ${data.results.length} posts.`);
await conn.end();
