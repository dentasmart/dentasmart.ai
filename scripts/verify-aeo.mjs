import mysql from 'mysql2/promise';
const url = process.env.DATABASE_URL;
const conn = await mysql.createConnection(url);
const [rows] = await conn.execute(
  `SELECT id, slug, atAGlanceAnswer, faqs, whenUrgent FROM blog_posts WHERE id IN (1260001, 1170003, 2910001) ORDER BY id`
);
for (const row of rows) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`POST ${row.id} - ${row.slug}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`\n📝 At-a-Glance (${row.atAGlanceAnswer.split(/\s+/).length} words):`);
  console.log(row.atAGlanceAnswer);
  const faqs = JSON.parse(row.faqs);
  console.log(`\n❓ FAQs (${faqs.length} items):`);
  faqs.forEach((f, i) => console.log(`  ${i+1}. ${f.question}`));
  const urgent = JSON.parse(row.whenUrgent);
  console.log(`\n🚨 When Urgent (${urgent.length} items):`);
  urgent.forEach((u, i) => console.log(`  ${i+1}. ${u}`));
}
await conn.end();
process.exit(0);
