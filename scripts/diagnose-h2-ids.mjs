import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// 1. Get the post metadata and bodyHtml length
const [meta] = await conn.execute(
  `SELECT id, slug, title, LENGTH(bodyHtml) as bodyHtml_length FROM blog_posts WHERE slug = 'top-10-best-ai-dental-apps' LIMIT 1`
);
console.log('=== POST METADATA ===');
console.log(JSON.stringify(meta[0], null, 2));

// 2. Get the full bodyHtml
const [rows] = await conn.execute(
  `SELECT bodyHtml FROM blog_posts WHERE slug = 'top-10-best-ai-dental-apps' LIMIT 1`
);

const bodyHtml = rows[0]?.bodyHtml ?? '';

// 3. Extract all H2 tags (opening tags only)
const h2Regex = /<h2[^>]*>/gi;
const h2Tags = [];
let match;
while ((match = h2Regex.exec(bodyHtml)) !== null) {
  h2Tags.push({ index: match.index, tag: match[0] });
}

console.log('\n=== ALL H2 OPENING TAGS ===');
console.log(`Total H2 tags found: ${h2Tags.length}`);
h2Tags.forEach((t, i) => {
  console.log(`\n[${i + 1}] Position ${t.index}: ${t.tag}`);
});

// 4. Check which H2s have id attributes
const h2WithId = h2Tags.filter(t => /\bid\s*=/i.test(t.tag));
const h2WithoutId = h2Tags.filter(t => !/\bid\s*=/i.test(t.tag));

console.log(`\n=== H2 TAGS WITH id= ATTRIBUTE ===`);
console.log(`Count: ${h2WithId.length}`);
h2WithId.forEach((t, i) => console.log(`  [${i + 1}] ${t.tag}`));

console.log(`\n=== H2 TAGS WITHOUT id= ATTRIBUTE ===`);
console.log(`Count: ${h2WithoutId.length}`);
h2WithoutId.forEach((t, i) => console.log(`  [${i + 1}] ${t.tag}`));

// 5. Show anchor links that reference #1, #2, etc.
const anchorRegex = /<a[^>]+href\s*=\s*["']#[^"']*["'][^>]*>.*?<\/a>/gi;
const anchors = [];
while ((match = anchorRegex.exec(bodyHtml)) !== null) {
  anchors.push(match[0]);
}
console.log(`\n=== INTERNAL ANCHOR LINKS (#...) ===`);
console.log(`Count: ${anchors.length}`);
anchors.forEach((a, i) => console.log(`  [${i + 1}] ${a.substring(0, 200)}`));

// 6. Show first 2000 chars of bodyHtml for context
console.log('\n=== FIRST 2000 CHARS OF bodyHtml ===');
console.log(bodyHtml.substring(0, 2000));

await conn.end();
