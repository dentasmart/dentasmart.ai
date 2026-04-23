import 'dotenv/config';
import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);
const [rows] = await conn.execute('SELECT id, slug, bodyHtml FROM blog_posts WHERE status = "published"');

let totalFixes = 0;

for (const row of rows) {
  if (!row.bodyHtml) continue;
  
  let modified = false;
  let html = row.bodyHtml;
  
  // Find <p>...</p> blocks with more than 200 words and split them
  const pRegex = /<p([^>]*)>([\s\S]*?)<\/p>/gi;
  let newHtml = html.replace(pRegex, (match, attrs, content) => {
    const text = content.replace(/<[^>]+>/g, '').trim();
    const words = text.split(/\s+/).length;
    
    if (words > 200) {
      // Split at a sentence boundary near the middle
      const sentences = content.split(/(?<=\.)\s+/);
      if (sentences.length >= 2) {
        const midpoint = Math.ceil(sentences.length / 2);
        const firstHalf = sentences.slice(0, midpoint).join(' ');
        const secondHalf = sentences.slice(midpoint).join(' ');
        modified = true;
        totalFixes++;
        return `<p${attrs}>${firstHalf}</p>\n<p${attrs}>${secondHalf}</p>`;
      }
    }
    return match;
  });
  
  if (modified) {
    await conn.execute('UPDATE blog_posts SET bodyHtml = ? WHERE id = ?', [newHtml, row.id]);
    console.log(`Fixed: ${row.slug}`);
  }
}

console.log(`Total fixes: ${totalFixes}`);
await conn.end();
