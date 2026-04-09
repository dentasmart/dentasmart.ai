import 'dotenv/config';
import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

// Parse the DATABASE_URL
const url = new URL(DATABASE_URL);
const connection = await mysql.createConnection({
  host: url.hostname,
  port: parseInt(url.port || '3306'),
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  ssl: { rejectUnauthorized: true },
});

console.log('Connected to database. Auditing blog posts for "Second Review"...\n');

// Text columns that could contain "Second Review"
const textColumns = [
  'title', 'problemHeading', 'problemContent', 'empathyHeading', 'empathyContent',
  'solutionHeading', 'solutionContent', 'changeHeading', 'changeContent',
  'resultHeading', 'resultContent', 'bodyHtml', 'metaTitle', 'metaDescription',
  'metaKeywords', 'ogTitle', 'ogDescription', 'atAGlanceAnswer', 'keyTakeaways',
  'whenUrgent', 'faqs', 'primaryKeyword', 'secondaryKeywords'
];

// Step 1: Audit - find all posts with "Second Review" in any column
let totalMatches = 0;
const matchDetails = [];

for (const col of textColumns) {
  const [rows] = await connection.execute(
    `SELECT id, title, ${col} as colValue FROM blog_posts WHERE ${col} LIKE '%Second Review%'`
  );
  if (rows.length > 0) {
    for (const row of rows) {
      totalMatches++;
      matchDetails.push({ id: row.id, title: row.title, column: col, snippet: String(row.colValue).substring(0, 100) });
      console.log(`  Found in post #${row.id} "${row.title}" → column: ${col}`);
    }
  }
}

// Also check case-insensitive "second review" (lowercase)
for (const col of textColumns) {
  const [rows] = await connection.execute(
    `SELECT id, title, ${col} as colValue FROM blog_posts WHERE LOWER(${col}) LIKE '%second review%' AND ${col} NOT LIKE '%Second Review%'`
  );
  if (rows.length > 0) {
    for (const row of rows) {
      totalMatches++;
      matchDetails.push({ id: row.id, title: row.title, column: col, snippet: String(row.colValue).substring(0, 100) });
      console.log(`  Found (lowercase) in post #${row.id} "${row.title}" → column: ${col}`);
    }
  }
}

console.log(`\nAudit complete: ${totalMatches} occurrences found across ${matchDetails.length} column matches.\n`);

if (totalMatches === 0) {
  console.log('No "Second Review" references found in any blog posts. Database is clean.');
  await connection.end();
  process.exit(0);
}

// Step 2: Bulk update - replace "Second Review" with "Second Opinion" in all text columns
console.log('Performing bulk update...\n');
let updateCount = 0;

for (const col of textColumns) {
  // Case-sensitive replace: "Second Review" → "Second Opinion"
  const [result1] = await connection.execute(
    `UPDATE blog_posts SET ${col} = REPLACE(${col}, 'Second Review', 'Second Opinion') WHERE ${col} LIKE '%Second Review%'`
  );
  if (result1.affectedRows > 0) {
    console.log(`  Updated ${result1.affectedRows} rows in column: ${col} (Second Review → Second Opinion)`);
    updateCount += result1.affectedRows;
  }

  // Also handle "second review" (lowercase) → "second opinion"
  const [result2] = await connection.execute(
    `UPDATE blog_posts SET ${col} = REPLACE(${col}, 'second review', 'second opinion') WHERE LOWER(${col}) LIKE '%second review%'`
  );
  if (result2.affectedRows > 0) {
    console.log(`  Updated ${result2.affectedRows} rows in column: ${col} (second review → second opinion)`);
    updateCount += result2.affectedRows;
  }
}

console.log(`\nBulk update complete: ${updateCount} total row-column updates applied.`);

// Step 3: Verify - re-check for any remaining "Second Review"
console.log('\nVerifying no remaining "Second Review" references...');
let remaining = 0;
for (const col of textColumns) {
  const [rows] = await connection.execute(
    `SELECT id FROM blog_posts WHERE LOWER(${col}) LIKE '%second review%'`
  );
  remaining += rows.length;
}
console.log(remaining === 0 ? 'Verification passed: zero remaining references.' : `WARNING: ${remaining} references still remain.`);

await connection.end();
console.log('\nDone.');
