import mysql from 'mysql2/promise';
const url = process.env.DATABASE_URL;
const conn = await mysql.createConnection(url);
const [rows] = await conn.execute(
  `SELECT id, slug, 
   CASE WHEN atAGlanceAnswer IS NOT NULL AND atAGlanceAnswer != '' THEN 'YES' ELSE 'NO' END as hasAnswer,
   CASE WHEN faqs IS NOT NULL AND faqs != '' AND faqs != '[]' THEN 'YES' ELSE 'NO' END as hasFaqs,
   CASE WHEN whenUrgent IS NOT NULL AND whenUrgent != '' AND whenUrgent != '[]' THEN 'YES' ELSE 'NO' END as hasUrgent
   FROM blog_posts 
   WHERE id IN (330007, 1260001, 2910001, 330008, 1170003)
   ORDER BY slug`
);
console.log(JSON.stringify(rows, null, 2));
await conn.end();
process.exit(0);
