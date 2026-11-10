/**
 * TEST DATABASE ONLY.
 * Creates the two isolated CMS draft tables without modifying existing tables.
 *
 * The URL and secrets are read from the local .env; never print them.
 * Guard both database name and Docker-forwarded port before any SQL.
 */
import "dotenv/config";
import mysql from "mysql2/promise";

const raw = process.env.DATABASE_URL;
if (!raw) throw new Error("DATABASE_URL missing from local environment.");
const url = new URL(raw);
const dbName = decodeURIComponent(url.pathname.slice(1));
if (dbName !== "dentasmart_test" || url.port !== "3307" ||
    !["localhost", "127.0.0.1"].includes(url.hostname)) {
  throw new Error("REFUSED: CMS schema installer only runs against localhost:3307/dentasmart_test.");
}

const statements = [
  `CREATE TABLE IF NOT EXISTS \`cms_pages\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`routePath\` varchar(500) NOT NULL,
    \`contentType\` enum('blog','condition','symptom','guide','treatment','cost','other') NOT NULL,
    \`slug\` varchar(200) NOT NULL,
    \`draftContent\` json NOT NULL,
    \`draftRevision\` int NOT NULL DEFAULT 0,
    \`publishedContent\` json NULL,
    \`publishedRevision\` int NULL,
    \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`cms_pages_routePath_unique\` (\`routePath\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
  `CREATE TABLE IF NOT EXISTS \`cms_page_revisions\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`pageId\` int NOT NULL,
    \`revision\` int NOT NULL,
    \`action\` enum('baseline','draft_saved','restored','published') NOT NULL,
    \`content\` json NOT NULL,
    \`adminId\` int NULL,
    \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`cms_page_revisions_page_revision_unique\` (\`pageId\`,\`revision\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
];

const connection = await mysql.createConnection(raw);
try {
  const [rows] = await connection.query<Array<mysql.RowDataPacket>>("SELECT DATABASE() AS name, @@port AS serverPort");
  if (rows[0]?.name !== "dentasmart_test") {
    throw new Error("REFUSED: actual MySQL connection is not using dentasmart_test.");
  }
  // Check tables beforehand to avoid quietly accepting partially incompatible schemas.
  for (const name of ["cms_pages", "cms_page_revisions"]) {
    const [existing] = await connection.query<Array<mysql.RowDataPacket>>(
      "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?",
      [name],
    );
    if (existing.length > 0) throw new Error("REFUSED: " + name + " already exists. No schema changes were made.");
  }
  for (const statement of statements) await connection.query(statement);
  console.log("Success: CMS draft tables created in local dentasmart_test only.");
  console.log("No existing tables, published pages, or content were changed.");
} finally {
  await connection.end();
}
