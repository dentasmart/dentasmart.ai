import mysql from 'mysql2/promise';

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const conn = await mysql.createConnection(url);

const [rows] = await conn.execute(
  `SELECT id, slug, title, LEFT(bodyHtml, 200) as bodyStart FROM blog_posts 
   WHERE slug LIKE '%bone-loss%' OR slug LIKE '%dentist-cost%' OR slug LIKE '%gums-hurt%' 
   OR slug LIKE '%filling-without%' OR slug LIKE '%plaque%' OR slug LIKE '%mouth-numbness%' 
   OR slug LIKE '%swollen-lymph%' OR slug LIKE '%leukoplakia%' OR slug LIKE '%mouth-sores%'
   ORDER BY slug`
);

console.log(JSON.stringify(rows, null, 2));
await conn.end();
