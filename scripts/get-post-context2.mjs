import mysql from 'mysql2/promise';
const url = process.env.DATABASE_URL;
const conn = await mysql.createConnection(url);
const [rows] = await conn.execute(
  `SELECT id, slug, title, LEFT(bodyHtml, 800) as bodyStart
   FROM blog_posts 
   WHERE id = 1170003`
);
console.log(JSON.stringify(rows[0], null, 2));
await conn.end();
process.exit(0);
