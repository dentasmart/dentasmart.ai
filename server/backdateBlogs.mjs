import mysql from 'mysql2/promise';

async function main() {
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  
  // Get all existing blog posts ordered by id
  const [rows] = await conn.execute('SELECT id FROM blog_posts ORDER BY id');
  
  // Spread 30 articles from Dec 1, 2025 to Feb 8, 2026 (~70 days)
  // That's roughly every 2-3 days
  const startDate = new Date('2025-12-01T10:00:00Z');
  const endDate = new Date('2026-02-08T10:00:00Z');
  const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
  const interval = totalDays / (rows.length - 1); // days between each article
  
  for (let i = 0; i < rows.length; i++) {
    const publishDate = new Date(startDate.getTime() + (i * interval * 24 * 60 * 60 * 1000));
    // Add some hour variation (between 8am and 4pm)
    publishDate.setHours(8 + Math.floor(Math.random() * 8));
    publishDate.setMinutes(Math.floor(Math.random() * 60));
    
    const dateStr = publishDate.toISOString().slice(0, 19).replace('T', ' ');
    
    await conn.execute(
      'UPDATE blog_posts SET publishedAt = ?, createdAt = ? WHERE id = ?',
      [dateStr, dateStr, rows[i].id]
    );
    
    console.log(`Article ${rows[i].id}: ${dateStr}`);
  }
  
  console.log(`\nUpdated ${rows.length} articles with dates from Dec 1, 2025 to Feb 8, 2026`);
  await conn.end();
}

main().catch(console.error);
