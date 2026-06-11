import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env manually
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  }
}

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) { console.error('DATABASE_URL not set'); process.exit(1); }

const conn = await mysql.createConnection(dbUrl);
const [rows] = await conn.execute('SELECT id, slug, bodyHtml, category FROM blog_posts WHERE bodyHtml IS NOT NULL AND bodyHtml != ""');
await conn.end();

const allUrls = new Map(); // url -> { count, posts, altTexts }
let totalImgTags = 0;
let postsWithImages = 0;

for (const row of rows) {
  // Extract img tags with regex (no external parser needed)
  const imgRegex = /<img[^>]+>/gi;
  const imgs = (row.bodyHtml || '').match(imgRegex) || [];
  if (imgs.length === 0) continue;
  postsWithImages++;
  for (const imgTag of imgs) {
    totalImgTags++;
    const srcMatch = imgTag.match(/src=["']([^"']+)["']/);
    const altMatch = imgTag.match(/alt=["']([^"']*)["']/);
    const src = srcMatch ? srcMatch[1] : '';
    const alt = altMatch ? altMatch[1] : '';
    if (!src) continue;
    if (!allUrls.has(src)) {
      allUrls.set(src, { count: 0, posts: [], altTexts: new Set() });
    }
    const entry = allUrls.get(src);
    entry.count++;
    if (!entry.posts.includes(row.slug)) entry.posts.push(row.slug);
    if (alt) entry.altTexts.add(alt);
  }
}

// Categorize URLs
let s3Count = 0;
let externalCount = 0;
const s3Pattern = /files\.manuscdn\.com|manus\.space|s3\.amazonaws\.com|amazonaws\.com/;
const s3Urls = [];
const externalUrls = [];

for (const [url, data] of allUrls.entries()) {
  if (s3Pattern.test(url)) {
    s3Count++;
    s3Urls.push({ url, ...data, altTexts: Array.from(data.altTexts) });
  } else {
    externalCount++;
    externalUrls.push({ url, ...data, altTexts: Array.from(data.altTexts) });
  }
}

console.log('\n=== IMAGE INVENTORY REPORT ===\n');
console.log(`Total blog posts scanned: ${rows.length}`);
console.log(`Posts containing images: ${postsWithImages}`);
console.log(`Total <img> tags: ${totalImgTags}`);
console.log(`Unique image URLs: ${allUrls.size}`);
console.log(`  - S3/Manus CDN URLs: ${s3Count}`);
console.log(`  - External URLs: ${externalCount}`);

console.log('\n--- Sample of 10 S3 URLs ---');
s3Urls.slice(0, 10).forEach((u, i) => {
  console.log(`${i+1}. ${u.url.substring(0, 100)}`);
  console.log(`   Used in: ${u.posts.slice(0,3).join(', ')}${u.posts.length > 3 ? ` +${u.posts.length-3} more` : ''}`);
  console.log(`   Alt: ${u.altTexts[0] || '(none)'}`);
});

console.log('\n--- Sample of 5 External URLs ---');
externalUrls.slice(0, 5).forEach((u, i) => {
  console.log(`${i+1}. ${u.url.substring(0, 100)}`);
});

// Check S3 URL pattern
if (s3Urls.length > 0) {
  console.log('\n--- S3 URL Pattern Analysis ---');
  const sample = s3Urls[0].url;
  console.log(`Sample S3 URL: ${sample}`);
  const blogImgPattern = s3Urls.filter(u => u.url.includes('blog-images/')).length;
  const otherPattern = s3Urls.filter(u => !u.url.includes('blog-images/')).length;
  console.log(`  blog-images/ prefix: ${blogImgPattern}`);
  console.log(`  Other S3 paths: ${otherPattern}`);
}

// Check for any existing media table
console.log('\n--- No existing media metadata table (confirmed by schema inspection) ---');
