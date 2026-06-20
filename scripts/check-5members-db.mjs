import mysql from 'mysql2/promise';
const url = process.env.DATABASE_URL;
const conn = await mysql.createConnection(url);
const [rows] = await conn.execute(
  `SELECT id, slug FROM blog_posts 
   WHERE bodyHtml LIKE '%5 family member%' OR bodyHtml LIKE '%up to 5 member%' OR bodyHtml LIKE '%5 members%'
   OR atAGlanceAnswer LIKE '%5 family member%' OR atAGlanceAnswer LIKE '%5 members%'
   OR faqs LIKE '%5 family member%' OR faqs LIKE '%5 members%'`
);
if (rows.length === 0) {
  console.log("✅ No blog posts mention '5 family members' or '5 members'");
} else {
  console.log("❌ Found posts with '5 members':", rows.map(r => `${r.id}: ${r.slug}`));
}
await conn.end();
process.exit(0);
