import mysql from 'mysql2/promise';
const url = process.env.DATABASE_URL;
const conn = await mysql.createConnection(url);
const [rows] = await conn.execute(
  `SELECT id, slug FROM blog_posts 
   WHERE id IN (1260001, 1170003, 2910001)
   AND (atAGlanceAnswer LIKE '%—%' OR faqs LIKE '%—%' OR whenUrgent LIKE '%—%')`
);
if (rows.length === 0) {
  console.log("✅ No em dashes found in any AEO fields");
} else {
  console.log("❌ Em dashes found in:", rows.map(r => r.slug));
}
await conn.end();
process.exit(0);
