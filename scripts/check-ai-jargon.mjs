import mysql from 'mysql2/promise';
const url = process.env.DATABASE_URL;
const conn = await mysql.createConnection(url);
const jargon = ['AI-powered', 'AI-driven', 'leverages', 'seamlessly', 'empowers', 'delve', 'comprehensive', 'robust'];
for (const word of jargon) {
  const [rows] = await conn.execute(
    `SELECT id, slug FROM blog_posts 
     WHERE id IN (1260001, 1170003, 2910001)
     AND (atAGlanceAnswer LIKE ? OR faqs LIKE ? OR whenUrgent LIKE ?)`,
    [`%${word}%`, `%${word}%`, `%${word}%`]
  );
  if (rows.length > 0) {
    console.log(`❌ "${word}" found in:`, rows.map(r => r.slug));
  }
}
console.log("✅ AI jargon check complete");
await conn.end();
process.exit(0);
