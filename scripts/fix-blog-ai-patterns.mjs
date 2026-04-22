import 'dotenv/config';
import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Text columns that contain content
const TEXT_COLS = [
  'title', 'metaTitle', 'metaDescription', 'bodyHtml',
  'problemContent', 'empathyContent', 'solutionContent',
  'changeContent', 'resultContent', 'atAGlanceAnswer',
  'keyTakeaways', 'whenUrgent', 'faqs', 'problemHeading',
  'empathyHeading', 'solutionHeading', 'changeHeading', 'resultHeading'
];

// Get all published posts
const [posts] = await conn.execute(
  `SELECT id, slug, ${TEXT_COLS.join(', ')} FROM blog_posts WHERE status = "published"`
);

console.log(`Processing ${posts.length} published blog posts...\n`);

// AI word replacements - context-aware
// Each entry: [pattern, replacement_function_or_string]
// We need to be careful: some words are fine in certain contexts
function replaceAiPatterns(text) {
  if (!text) return { text, changes: [] };
  
  let result = text;
  const changes = [];
  
  // 1. Em dashes -> commas, periods, or "or" depending on context
  // Em dash between words in a sentence -> comma or semicolon
  const emDashBefore = result;
  // Replace em dashes used as parenthetical asides with commas
  result = result.replace(/(\w)\s*—\s*(\w)/g, (match, before, after) => {
    return `${before}, ${after}`;
  });
  // Replace em dashes at start of clauses
  result = result.replace(/\s*—\s*/g, ', ');
  // Clean up double commas
  result = result.replace(/,\s*,/g, ',');
  if (result !== emDashBefore) {
    const count = (emDashBefore.match(/—/g) || []).length;
    changes.push(`Replaced ${count} em dashes with commas`);
  }
  
  // 2. En dashes (used as em dashes) -> commas
  const enDashBefore = result;
  result = result.replace(/(\w)\s*–\s*(\w)/g, '$1, $2');
  result = result.replace(/\s*–\s*/g, ', ');
  result = result.replace(/,\s*,/g, ',');
  if (result !== enDashBefore) {
    const count = (enDashBefore.match(/–/g) || []).length;
    changes.push(`Replaced ${count} en dashes`);
  }
  
  // 3. "crucial" -> "important" or "essential" or "key" (rotate)
  let crucialCount = 0;
  const crucialAlts = ['important', 'essential', 'key'];
  result = result.replace(/\bcrucial(?:ly)?\b/gi, (match) => {
    const alt = crucialAlts[crucialCount % crucialAlts.length];
    crucialCount++;
    if (match.toLowerCase() === 'crucially') {
      return alt === 'key' ? 'especially' : alt.charAt(0) + alt.slice(1); // keep case
    }
    // Preserve case
    if (match[0] === match[0].toUpperCase()) {
      return alt.charAt(0).toUpperCase() + alt.slice(1);
    }
    return alt;
  });
  if (crucialCount > 0) changes.push(`Replaced ${crucialCount} "crucial" instances`);
  
  // 4. "comprehensive" -> "complete" or "full" or "thorough"
  let compCount = 0;
  const compAlts = ['complete', 'full', 'thorough'];
  result = result.replace(/\bcomprehensive\b/gi, (match) => {
    const alt = compAlts[compCount % compAlts.length];
    compCount++;
    if (match[0] === match[0].toUpperCase()) {
      return alt.charAt(0).toUpperCase() + alt.slice(1);
    }
    return alt;
  });
  if (compCount > 0) changes.push(`Replaced ${compCount} "comprehensive" instances`);
  
  // 5. "groundbreaking" -> "new" or "advanced"
  let gbCount = 0;
  result = result.replace(/\bgroundbreaking\b/gi, (match) => {
    gbCount++;
    const alt = gbCount % 2 === 1 ? 'advanced' : 'new';
    if (match[0] === match[0].toUpperCase()) {
      return alt.charAt(0).toUpperCase() + alt.slice(1);
    }
    return alt;
  });
  if (gbCount > 0) changes.push(`Replaced ${gbCount} "groundbreaking" instances`);
  
  // 6. "profoundly" -> "deeply" or "significantly"
  let profCount = 0;
  result = result.replace(/\bprofound(?:ly)?\b/gi, (match) => {
    profCount++;
    if (match.toLowerCase() === 'profoundly') {
      return match[0] === match[0].toUpperCase() ? 'Significantly' : 'significantly';
    }
    const alt = 'deep';
    return match[0] === match[0].toUpperCase() ? 'Deep' : 'deep';
  });
  if (profCount > 0) changes.push(`Replaced ${profCount} "profound" instances`);
  
  // 7. "meticulous/meticulously" -> "careful/carefully" or "thorough/thoroughly"
  let metCount = 0;
  result = result.replace(/\bmeticulous(?:ly)?\b/gi, (match) => {
    metCount++;
    if (match.toLowerCase() === 'meticulously') {
      return match[0] === match[0].toUpperCase() ? 'Carefully' : 'carefully';
    }
    return match[0] === match[0].toUpperCase() ? 'Careful' : 'careful';
  });
  if (metCount > 0) changes.push(`Replaced ${metCount} "meticulous" instances`);
  
  // 8. Sentence starters: "Additionally," -> varied alternatives
  let addCount = 0;
  const addAlts = ['Also,', 'On top of that,', 'Beyond that,'];
  result = result.replace(/(^|\. )Additionally,/gm, (match, prefix) => {
    const alt = addAlts[addCount % addAlts.length];
    addCount++;
    return prefix + alt;
  });
  if (addCount > 0) changes.push(`Replaced ${addCount} "Additionally," starters`);
  
  // 9. "Furthermore," -> "What's more," or "On top of that,"
  let furCount = 0;
  result = result.replace(/(^|\. )Furthermore,/gm, (match, prefix) => {
    furCount++;
    return prefix + "What's more,";
  });
  if (furCount > 0) changes.push(`Replaced ${furCount} "Furthermore," starters`);
  
  // 10. "Setting the Stage for" -> "Preparing for" or "Leading to"
  let stageCount = 0;
  result = result.replace(/\bSetting the [Ss]tage for\b/g, (match) => {
    stageCount++;
    return 'Preparing for';
  });
  result = result.replace(/\bsetting the stage for\b/g, (match) => {
    stageCount++;
    return 'preparing for';
  });
  if (stageCount > 0) changes.push(`Replaced ${stageCount} "setting the stage" instances`);
  
  return { text: result, changes };
}

let totalUpdated = 0;
let totalChanges = 0;

for (const post of posts) {
  const updates = {};
  const allChanges = [];
  
  for (const col of TEXT_COLS) {
    if (!post[col]) continue;
    
    const { text: fixed, changes } = replaceAiPatterns(post[col]);
    if (changes.length > 0) {
      updates[col] = fixed;
      allChanges.push(...changes.map(c => `  ${col}: ${c}`));
    }
  }
  
  if (Object.keys(updates).length > 0) {
    // Build UPDATE query
    const setClauses = Object.keys(updates).map(col => `${col} = ?`).join(', ');
    const values = [...Object.values(updates), post.id];
    
    await conn.execute(
      `UPDATE blog_posts SET ${setClauses} WHERE id = ?`,
      values
    );
    
    totalUpdated++;
    totalChanges += allChanges.length;
    console.log(`Fixed: ${post.slug}`);
    allChanges.forEach(c => console.log(c));
    console.log();
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Posts updated: ${totalUpdated}`);
console.log(`Total changes: ${totalChanges}`);

await conn.end();
