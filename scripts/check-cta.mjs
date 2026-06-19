import mysql from 'mysql2/promise';
const url = process.env.DATABASE_URL;
const conn = await mysql.createConnection(url);
const [rows] = await conn.execute(
  `SELECT id, slug, 
   CASE WHEN bodyHtml LIKE '%dentasmart%' OR bodyHtml LIKE '%DentaSmart%' THEN 'YES' ELSE 'NO' END as hasCTA,
   RIGHT(bodyHtml, 300) as tail
   FROM blog_posts 
   WHERE id IN (330007, 330008, 2910001, 1260001, 1170003)
   ORDER BY id`
);
for (const row of rows) {
  console.log(`\n=== ${row.slug} (${row.id}) - CTA: ${row.hasCTA} ===`);
  console.log(row.tail.substring(row.tail.length - 200));
}
await conn.end();
process.exit(0);
