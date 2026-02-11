/**
 * Migration script: Convert StoryBrand structured content into bodyHtml
 * so that the public blog page renders using the same blog-content CSS
 * as the WYSIWYG editor, ensuring visual parity.
 */
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const conn = await mysql.createConnection(process.env.DATABASE_URL);

  // Get all posts that have structured content but no bodyHtml
  const [rows] = await conn.execute(
    `SELECT id, title, problemHeading, problemContent, empathyHeading, empathyContent,
            solutionHeading, solutionContent, changeHeading, changeContent,
            resultHeading, resultContent, bodyHtml
     FROM blog_posts`
  );

  let updated = 0;
  for (const row of rows) {
    // Skip if bodyHtml already has content
    if (row.bodyHtml && row.bodyHtml.trim().length > 0) {
      console.log(`  Skipping "${row.title}" - already has bodyHtml`);
      continue;
    }

    // Check if there's any structured content to convert
    const hasStructured = row.problemContent || row.empathyContent || 
                          row.solutionContent || row.changeContent || row.resultContent;
    if (!hasStructured) {
      console.log(`  Skipping "${row.title}" - no structured content`);
      continue;
    }

    // Build HTML from StoryBrand sections
    const sections = [];

    if (row.problemHeading || row.problemContent) {
      sections.push(`<h2>${row.problemHeading || "The Problem"}</h2>`);
      if (row.problemContent) sections.push(`<p>${row.problemContent}</p>`);
    }

    if (row.empathyHeading || row.empathyContent) {
      sections.push(`<h3>${row.empathyHeading || "Why This Feels Frustrating"}</h3>`);
      if (row.empathyContent) sections.push(`<blockquote><p>${row.empathyContent}</p></blockquote>`);
    }

    if (row.solutionHeading || row.solutionContent) {
      sections.push(`<h2>${row.solutionHeading || "The Simple Truth"}</h2>`);
      if (row.solutionContent) sections.push(`<p>${row.solutionContent}</p>`);
    }

    if (row.changeHeading || row.changeContent) {
      sections.push(`<h3>${row.changeHeading || "What Should Happen Instead"}</h3>`);
      if (row.changeContent) sections.push(`<p>${row.changeContent}</p>`);
    }

    if (row.resultHeading || row.resultContent) {
      sections.push(`<h2>${row.resultHeading || "How DentaSmart Helps"}</h2>`);
      if (row.resultContent) sections.push(`<p>${row.resultContent}</p>`);
    }

    const bodyHtml = sections.join("\n");

    await conn.execute(
      `UPDATE blog_posts SET bodyHtml = ? WHERE id = ?`,
      [bodyHtml, row.id]
    );

    console.log(`  ✅ Updated "${row.title}" with bodyHtml (${bodyHtml.length} chars)`);
    updated++;
  }

  console.log(`\nDone! Updated ${updated} articles with bodyHtml.`);
  await conn.end();
}

main().catch(console.error);
