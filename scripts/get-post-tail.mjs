import mysql from 'mysql2/promise';
const url = process.env.DATABASE_URL;
const conn = await mysql.createConnection(url);
const [rows] = await conn.execute(
  `SELECT id, slug, RIGHT(bodyHtml, 500) as bodyTail
   FROM blog_posts 
   WHERE id = 1170003`
);
console.log(rows[0].bodyTail);
await conn.end();
process.exit(0);
