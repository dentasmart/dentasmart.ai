import { createConnection } from 'mysql2/promise';
import { config } from 'dotenv';
config();

const conn = await createConnection(process.env.DATABASE_URL);

const sql = `CREATE TABLE IF NOT EXISTS \`not_found_log\` (
  \`id\` int AUTO_INCREMENT NOT NULL,
  \`pathHash\` varchar(64) NOT NULL,
  \`path\` varchar(2000) NOT NULL,
  \`hitCount\` int NOT NULL DEFAULT 1,
  \`isDryRun\` boolean NOT NULL DEFAULT true,
  \`firstSeenAt\` timestamp NOT NULL DEFAULT (now()),
  \`lastSeenAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  \`lastReferrer\` varchar(2000),
  CONSTRAINT \`not_found_log_id\` PRIMARY KEY(\`id\`),
  CONSTRAINT \`not_found_log_pathHash_unique\` UNIQUE(\`pathHash\`)
)`;

await conn.execute(sql);
console.log('not_found_log created (or already exists)');

const [rows] = await conn.execute('DESCRIBE not_found_log');
console.log('Columns:');
for (const row of rows) {
  console.log(`  ${row.Field} ${row.Type} ${row.Null === 'NO' ? 'NOT NULL' : 'NULL'} ${row.Key ? '[' + row.Key + ']' : ''}`);
}

await conn.end();
