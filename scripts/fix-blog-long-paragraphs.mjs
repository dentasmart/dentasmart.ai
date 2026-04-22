/**
 * Fix long paragraphs in blog posts stored in the database.
 * Splits paragraphs over 200 words at natural sentence boundaries.
 * Blog post content uses markdown, so paragraphs are separated by \n\n.
 */
import 'dotenv/config';
import mysql from 'mysql2/promise';

const MAX_WORDS = 200;

// Flagged blog posts from Semrush audit
const FLAGGED_SLUGS = [
  'how-to-find-a-dentist-uninsured',
  'what-to-do-when-your-dentist-recommends-expensive-treatment-you-cant-afford',
  'wwhat-are-dental-implants-cost', // Note: typo in URL from Semrush, check actual slug
];

function splitParagraph(text) {
  const words = text.split(/\s+/);
  if (words.length <= MAX_WORDS) return text;
  
  // Split at sentence boundaries
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z])/);
  if (sentences.length < 2) return text;
  
  const targetWords = Math.floor(words.length / 2);
  let currentWords = 0;
  let splitIdx = 0;
  
  for (let i = 0; i < sentences.length; i++) {
    currentWords += sentences[i].split(/\s+/).length;
    if (currentWords >= targetWords && i < sentences.length - 1) {
      splitIdx = i + 1;
      break;
    }
  }
  
  if (splitIdx === 0) splitIdx = 1;
  
  const part1 = sentences.slice(0, splitIdx).join(' ');
  const part2 = sentences.slice(splitIdx).join(' ');
  
  // Recursively split if still too long
  return splitParagraph(part1) + '\n\n' + splitParagraph(part2);
}

function fixContent(content) {
  if (!content) return { content, changes: 0 };
  
  const paragraphs = content.split('\n\n');
  let changes = 0;
  
  const newParagraphs = paragraphs.map(para => {
    // Skip headings, lists, images, code blocks
    if (para.startsWith('#') || para.startsWith('-') || para.startsWith('*') || 
        para.startsWith('!') || para.startsWith('```') || para.startsWith('>') ||
        para.startsWith('|')) {
      return para;
    }
    
    const words = para.split(/\s+/);
    if (words.length > MAX_WORDS) {
      changes++;
      return splitParagraph(para);
    }
    return para;
  });
  
  return { content: newParagraphs.join('\n\n'), changes };
}

async function main() {
  const conn = await mysql.createConnection(process.env.DATABASE_URL);
  
  // Blog posts have content in multiple fields: problemContent, empathyContent, solutionContent, changeContent, resultContent, bodyHtml
  const contentFields = ['problemContent', 'empathyContent', 'solutionContent', 'changeContent', 'resultContent', 'bodyHtml'];
  const [posts] = await conn.execute(
    `SELECT id, slug, ${contentFields.join(', ')} FROM blog_posts`
  );
  
  console.log(`Checking ${posts.length} blog posts for long paragraphs...`);
  
  let totalChanges = 0;
  let postsFixed = 0;
  
  for (const post of posts) {
    let postChanges = 0;
    const updates = {};
    
    for (const field of contentFields) {
      if (!post[field]) continue;
      const { content: newContent, changes } = fixContent(post[field]);
      if (changes > 0) {
        updates[field] = newContent;
        postChanges += changes;
      }
    }
    
    if (postChanges > 0) {
      const setClauses = Object.keys(updates).map(k => `${k} = ?`).join(', ');
      const values = [...Object.values(updates), post.id];
      await conn.execute(
        `UPDATE blog_posts SET ${setClauses} WHERE id = ?`,
        values
      );
      postsFixed++;
      totalChanges += postChanges;
      console.log(`  Fixed ${post.slug}: ${postChanges} paragraphs split across ${Object.keys(updates).length} fields`);
    }
  }
  
  console.log(`\nDone: ${postsFixed} posts fixed, ${totalChanges} total paragraph splits`);
  
  // Verify: check for remaining long paragraphs
  const [verifyPosts] = await conn.execute(
    `SELECT slug, ${contentFields.join(', ')} FROM blog_posts`
  );
  
  let remaining = 0;
  for (const post of verifyPosts) {
    for (const field of contentFields) {
      if (!post[field]) continue;
      const paragraphs = post[field].split('\n\n');
      for (const para of paragraphs) {
        if (para.startsWith('#') || para.startsWith('-') || para.startsWith('*') || 
            para.startsWith('!') || para.startsWith('```') || para.startsWith('>') ||
            para.startsWith('|')) continue;
        const words = para.split(/\s+/);
        if (words.length > MAX_WORDS) {
          remaining++;
          console.log(`  Still long: ${post.slug}.${field} (${words.length} words)`);
        }
      }
    }
  }
  
  console.log(`Remaining long paragraphs: ${remaining}`);
  
  await conn.end();
}

main().catch(console.error);
