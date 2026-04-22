import 'dotenv/config';
import mysql from 'mysql2/promise';

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Get all published blog posts
const [posts] = await conn.execute(
  'SELECT id, slug, title, metaTitle, metaDescription, bodyHtml, problemContent, empathyContent, solutionContent, changeContent, resultContent, atAGlanceAnswer, keyTakeaways, whenUrgent, faqs FROM blog_posts WHERE status = "published" ORDER BY slug'
);

console.log(`\nScanning ${posts.length} published blog posts...\n`);

const AI_WORDS = [
  /\bdelve[sd]?\b/gi, /\bdelving\b/gi,
  /\bcrucial(?:ly)?\b/gi,
  /\bpivotal\b/gi,
  /\btapestry\b/gi,
  /\btestament\b/gi,
  /\bunderscore[sd]?\b/gi,
  /\bintricate\b/gi, /\bintricacies\b/gi,
  /\bvibrant\b/gi,
  /\bmeticulous(?:ly)?\b/gi,
  /\bgarnere?d?\b/gi,
  /\bbolstered\b/gi,
  /\binterplay\b/gi,
  /\bfoster(?:s|ed|ing)?\b/gi,
  /\bshowcase[sd]?\b/gi, /\bshowcasing\b/gi,
  /\bgroundbreaking\b/gi,
  /\bdiverse array\b/gi,
  /\bprofound(?:ly)?\b/gi,
  /\bexemplif(?:y|ies|ied)\b/gi,
  /\bnestled\b/gi,
  /\bin the heart of\b/gi,
  /\brobust\b/gi,
  /\bcomprehensive\b/gi,
  /\bharness(?:es|ed|ing)?\b/gi,
  /\brealm\b/gi,
  /\bindelible\b/gi,
  /\benduring\b/gi,
];

const SENTENCE_STARTERS = [
  /(?:^|\. )Additionally,/gim,
  /(?:^|\. )Moreover,/gim,
  /(?:^|\. )Furthermore,/gim,
  /(?:^|\. )In conclusion,/gim,
  /It['']?s important to note/gi,
  /It['']?s worth noting/gi,
  /In today['']?s world/gi,
  /In the realm of/gi,
];

const STRUCTURAL = [
  /plays? a (?:crucial|vital|pivotal|key) role/gi,
  /reflects? broader/gi,
  /setting the stage for/gi,
  /evolving landscape/gi,
  /deeply rooted/gi,
  /serves? as a\b/gi,
  /stands? as a\b/gi,
];

let totalEmDashes = 0;
let totalAiWords = 0;
let totalStarters = 0;
let totalStructural = 0;
let postsWithIssues = 0;

const summary = [];

for (const post of posts) {
  const text = `${post.title || ''} ${post.metaTitle || ''} ${post.metaDescription || ''} ${post.bodyHtml || ''} ${post.problemContent || ''} ${post.empathyContent || ''} ${post.solutionContent || ''} ${post.changeContent || ''} ${post.resultContent || ''} ${post.atAGlanceAnswer || ''} ${post.keyTakeaways || ''} ${post.whenUrgent || ''} ${post.faqs || ''}`;
  
  // Count em dashes
  const emDashCount = (text.match(/—/g) || []).length;
  const enDashCount = (text.match(/–/g) || []).length;
  const dashCount = emDashCount + enDashCount;
  
  // Count AI words
  let aiWordMatches = [];
  for (const pattern of AI_WORDS) {
    pattern.lastIndex = 0;
    const matches = text.match(pattern);
    if (matches) aiWordMatches.push(...matches);
  }
  
  // Count sentence starters
  let starterMatches = [];
  for (const pattern of SENTENCE_STARTERS) {
    pattern.lastIndex = 0;
    const matches = text.match(pattern);
    if (matches) starterMatches.push(...matches);
  }
  
  // Count structural
  let structMatches = [];
  for (const pattern of STRUCTURAL) {
    pattern.lastIndex = 0;
    const matches = text.match(pattern);
    if (matches) structMatches.push(...matches);
  }
  
  const totalForPost = dashCount + aiWordMatches.length + starterMatches.length + structMatches.length;
  
  if (totalForPost > 0) {
    postsWithIssues++;
    totalEmDashes += dashCount;
    totalAiWords += aiWordMatches.length;
    totalStarters += starterMatches.length;
    totalStructural += structMatches.length;
    
    summary.push({
      slug: post.slug,
      id: post.id,
      emDashes: dashCount,
      aiWords: aiWordMatches.length,
      aiWordList: [...new Set(aiWordMatches.map(w => w.toLowerCase()))],
      starters: starterMatches.length,
      starterList: [...new Set(starterMatches.map(s => s.trim()))],
      structural: structMatches.length,
      structList: [...new Set(structMatches.map(s => s.trim()))],
      total: totalForPost,
    });
  }
}

// Sort by total issues descending
summary.sort((a, b) => b.total - a.total);

console.log(`=== BLOG POST AI PATTERN SCAN ===`);
console.log(`Posts with issues: ${postsWithIssues} / ${posts.length}`);
console.log(`Total em/en dashes: ${totalEmDashes}`);
console.log(`Total AI words: ${totalAiWords}`);
console.log(`Total bad starters: ${totalStarters}`);
console.log(`Total structural patterns: ${totalStructural}`);
console.log(`\nTop 30 posts by issue count:`);

for (const s of summary.slice(0, 30)) {
  console.log(`\n  ${s.slug} (${s.total} issues)`);
  if (s.emDashes > 0) console.log(`    Em dashes: ${s.emDashes}`);
  if (s.aiWords > 0) console.log(`    AI words: ${s.aiWordList.join(', ')}`);
  if (s.starters > 0) console.log(`    Bad starters: ${s.starterList.join(', ')}`);
  if (s.structural > 0) console.log(`    Structural: ${s.structList.join(', ')}`);
}

console.log(`\n\nAll ${summary.length} posts with issues (slug, total):`);
for (const s of summary) {
  console.log(`  ${s.slug}: ${s.total}`);
}

await conn.end();
