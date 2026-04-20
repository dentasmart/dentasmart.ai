import 'dotenv/config';
import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);

// ============================================================
// PART 1: Add missing meta descriptions (13 posts)
// Each description is 150-160 chars, SEO-optimized, 8th-grade reading level
// ============================================================
const metaDescriptions = [
  {
    id: 240001,
    metaDescription: "Learn how AI detects cavities in dental X-rays. Understand the technology behind AI-powered cavity detection and how it helps you catch decay early.",
    metaTitle: "How AI Detects Cavities in Dental X-Rays"
  },
  {
    id: 390001,
    metaDescription: "Not sure if you need dental implants? Learn the key signs like bone loss, loose teeth, and gaps that mean it may be time to consider implants.",
    metaTitle: "Signs You May Need Dental Implants"
  },
  {
    id: 390002,
    metaDescription: "Find out when your child should visit the dentist for the first time. Learn what to expect and why early dental visits matter for healthy teeth.",
    metaTitle: "When Should Your Child First See a Dentist?"
  },
  {
    id: 840001,
    metaDescription: "Is at-home teeth whitening safe for your enamel? Learn which products work, which to avoid, and how to whiten your teeth without causing damage.",
    metaTitle: "Is At-Home Teeth Whitening Safe?"
  },
  {
    id: 960001,
    metaDescription: "Thinking about braces as an adult? Learn why it is never too late, what options are available, how long treatment takes, and what results to expect.",
    metaTitle: "Adult Braces: Is It Too Late?"
  },
  {
    id: 960002,
    metaDescription: "White gums can signal gum disease, infection, or other oral health issues. Learn the common causes, warning signs, and when to see a dentist.",
    metaTitle: "White Gums: Causes and Warning Signs"
  },
  {
    id: 990001,
    metaDescription: "Grinding your teeth at night? Learn why bruxism happens, how to tell if you need a mouthguard or retainer, and simple ways to protect your teeth.",
    metaTitle: "Teeth Grinding at Night: Do You Need Help?"
  },
  {
    id: 1050001,
    metaDescription: "Is dental insurance actually worth the cost? Compare premiums vs. out-of-pocket savings and discover affordable alternatives for dental care in 2026.",
    metaTitle: "Is Dental Insurance Worth It in 2026?"
  },
  {
    id: 1080001,
    metaDescription: "Considering pop-on veneers? Learn if snap-on veneers are safe, how they compare to professional veneers, and the risks you should know about first.",
    metaTitle: "Are Pop-On Veneers Safe for Your Teeth?"
  },
  {
    id: 1170001,
    metaDescription: "Can a cavity heal on its own? Learn why tooth decay does not reverse itself, how to spot early signs, and what happens if you wait too long to treat it.",
    metaTitle: "Do Cavities Go Away on Their Own?"
  },
  {
    id: 1470002,
    metaDescription: "Wondering why your teeth are so sensitive? Learn the top causes of tooth sensitivity, whether it goes away, and proven ways to find lasting relief.",
    metaTitle: "Why Are My Teeth Sensitive? Causes & Relief"
  },
  {
    id: 1890001,
    metaDescription: "A white tongue can mean poor hygiene, dehydration, or oral thrush. Learn the common causes, when to worry, and how to get your tongue healthy again.",
    metaTitle: "White Tongue: Causes and What to Do"
  },
  {
    id: 2310001,
    metaDescription: "Good oral health protects more than your teeth. Learn why it matters for your whole body and how to monitor your dental health from home with AI tools.",
    metaTitle: "Why Oral Health Matters and How to Track It"
  }
];

console.log('=== UPDATING 13 MISSING META DESCRIPTIONS ===\n');
for (const post of metaDescriptions) {
  const [result] = await connection.execute(
    `UPDATE blog_posts SET metaDescription = ?, metaTitle = ? WHERE id = ?`,
    [post.metaDescription, post.metaTitle, post.id]
  );
  console.log(`✓ ID ${post.id}: metaTitle="${post.metaTitle}" (${post.metaTitle.length} chars)`);
  console.log(`  metaDesc="${post.metaDescription}" (${post.metaDescription.length} chars)`);
  console.log(`  Rows affected: ${result.affectedRows}`);
}

// ============================================================
// PART 2: Shorten long meta titles (posts where rendered title > 70 chars)
// Only update posts that ALREADY have a metaTitle set (not the 13 above)
// Target: metaTitle under 57 chars so "| DentaSmart" suffix stays under 70
// ============================================================
const titleFixes = [
  // 76 chars → need to shorten
  { id: 9, metaTitle: "Dentist-Patient Communication Gap" },
  // 70 chars → borderline, shorten to be safe
  { id: 28, metaTitle: "No Dental Insurance? Your Options" },
  // 69 chars
  { id: 26, metaTitle: "Dental Pre-Authorization Explained" },
  // 68 chars
  { id: 480001, metaTitle: "Electric vs. Manual Toothbrush Guide" },
  // 67 chars
  { id: 23, metaTitle: "Why Dental Insurance Has Low Limits" },
  // 66 chars
  { id: 24, metaTitle: "What In-Network Means for Dental" },
  // 78 chars
  { id: 300001, metaTitle: "Tooth Pain: Causes, Relief & Next Steps" },
  // 64 chars
  { id: 25, metaTitle: "Dental Insurance Waiting Periods" },
  // 75 chars
  { id: 300003, metaTitle: "Tooth Sensitivity: Causes & Relief" },
  // 74 chars
  { id: 300006, metaTitle: "Cavity Symptoms: Spot Decay Early" },
  // 74 chars
  { id: 300008, metaTitle: "Tooth Abscess: Signs & When to Act" },
  // 73 chars
  { id: 300009, metaTitle: "Wisdom Tooth Pain: Causes & Relief" },
  // 74 chars
  { id: 300010, metaTitle: "Bad Breath: Causes & Solutions" },
  // 74 chars
  { id: 1170003, metaTitle: "How to Remove Plaque at Home Safely" },
  // 61 chars
  { id: 3, metaTitle: "Why Patients Question Dental Advice" },
  // 61 chars
  { id: 8, metaTitle: "Why Dentists Skip Prevention" },
  // 74 chars
  { id: 1950001, metaTitle: "Braces with Baby Teeth: Is It Safe?" },
  // 73 chars
  { id: 1620057, metaTitle: "AI Dental Check at Home: How It Works" },
  // 74 chars
  { id: 300007, metaTitle: "Cracked Tooth: Signs & What to Do" },
  // 71 chars
  { id: 600001, metaTitle: "Dental Emergency? First Aid Steps" },
  // 72 chars
  { id: 1920001, metaTitle: "Is Fluoride Good or Bad for Teeth?" },
  // 62 chars
  { id: 17, metaTitle: "Bad Breath After Brushing: Why?" },
  // 65 chars
  { id: 19, metaTitle: "Missing Tooth Risks If Not Replaced" },
  // 65 chars
  { id: 27, metaTitle: "Cosmetic vs. Necessary Dental Work" },
  // 66 chars
  { id: 1620047, metaTitle: "Affordable Dental Treatment Options" },
  // 66 chars
  { id: 2100001, metaTitle: "Find a Dentist You Can Trust" },
  // 63 chars
  { id: 1140001, metaTitle: "Tooth Infection Spreading: Warning Signs" },
];

console.log('\n=== SHORTENING LONG META TITLES ===\n');
for (const fix of titleFixes) {
  const fullTitle = fix.metaTitle.includes('DentaSmart') ? fix.metaTitle : `${fix.metaTitle} | DentaSmart`;
  const [result] = await connection.execute(
    `UPDATE blog_posts SET metaTitle = ? WHERE id = ?`,
    [fix.metaTitle, fix.id]
  );
  console.log(`✓ ID ${fix.id}: "${fix.metaTitle}" → full: "${fullTitle}" (${fullTitle.length} chars)`);
  console.log(`  Rows affected: ${result.affectedRows}`);
}

// ============================================================
// PART 3: Verify results
// ============================================================
console.log('\n=== VERIFICATION ===\n');

const [stillMissing] = await connection.execute(
  `SELECT COUNT(*) as cnt FROM blog_posts WHERE (metaDescription IS NULL OR metaDescription = '') AND status = 'published'`
);
console.log(`Posts still missing meta descriptions: ${stillMissing[0].cnt}`);

const [stillLong] = await connection.execute(
  `SELECT COUNT(*) as cnt FROM blog_posts WHERE status = 'published' AND CHAR_LENGTH(COALESCE(metaTitle, title)) > 57`
);
console.log(`Posts still with titles > 57 chars: ${stillLong[0].cnt}`);

await connection.end();
console.log('\nDone!');
