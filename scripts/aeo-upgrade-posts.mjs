import mysql from 'mysql2/promise';

const url = process.env.DATABASE_URL;
const conn = await mysql.createConnection(url);

// ============================================================
// POST 1260001 - dentist-cost-without-insurance
// Needs: atAGlanceAnswer, faqs, whenUrgent
// ============================================================

const post1260001_answer = `A routine dental visit without insurance typically costs between $75 and $200 for a cleaning and exam. X-rays add $25 to $250 depending on the type. More involved procedures like fillings run $150 to $450 each, while root canals can cost $700 to $1,500. According to the American Dental Association, about 68.5 million Americans lack dental insurance. The good news: dental schools, community health centers, and discount plans can cut your out-of-pocket costs by 20% to 50%.`;

const post1260001_faqs = JSON.stringify([
  {
    question: "What is the cheapest way to see a dentist without insurance?",
    answer: "Dental schools offer cleanings and exams at 50% to 80% less than private offices. Community health centers (FQHCs) use sliding-scale fees based on your income. Many private dentists also offer in-house membership plans starting around $200 to $400 per year that cover two cleanings, exams, and X-rays."
  },
  {
    question: "Do dentists offer payment plans for uninsured patients?",
    answer: "Yes. Many dental offices offer in-house payment plans or work with third-party financing like CareCredit or Sunbit. These let you split larger bills into monthly payments, often with 0% interest if paid within 6 to 12 months. Always ask before your appointment."
  },
  {
    question: "Can I negotiate dental costs without insurance?",
    answer: "You can. Many dentists offer a cash-pay discount of 10% to 20% when you pay in full at the time of service. Ask the front desk about their self-pay rate before scheduling. Some offices also price-match or offer bundled discounts for multiple procedures."
  },
  {
    question: "How much does a dental cleaning cost without insurance in 2026?",
    answer: "A standard prophylaxis (routine cleaning) costs $75 to $200 without insurance in 2026. A deep cleaning (scaling and root planing) costs $150 to $350 per quadrant. Prices vary by location, with urban areas typically charging 15% to 30% more than rural practices."
  },
  {
    question: "Is it worth getting a dental discount plan instead of insurance?",
    answer: "For many people, yes. Dental discount plans cost $80 to $200 per year and give you 10% to 60% off most procedures with no waiting periods, no annual maximums, and no claim forms. They work best if you need basic preventive care or a single procedure and want to avoid monthly insurance premiums."
  }
]);

const post1260001_whenUrgent = JSON.stringify([
  "Severe toothache that keeps you awake at night",
  "Facial swelling near your jaw or cheek",
  "Fever combined with tooth or gum pain",
  "A broken or knocked-out tooth",
  "Bleeding that does not stop after 15 minutes of pressure",
  "Pus or a bad taste coming from around a tooth"
]);

await conn.execute(
  `UPDATE blog_posts SET atAGlanceAnswer = ?, faqs = ?, whenUrgent = ? WHERE id = 1260001`,
  [post1260001_answer, post1260001_faqs, post1260001_whenUrgent]
);
console.log("✅ Post 1260001 (dentist-cost-without-insurance) updated with all AEO fields");

// ============================================================
// POST 1170003 - how-to-remove-plaque-at-home
// Needs: atAGlanceAnswer, faqs, whenUrgent + stronger CTA
// ============================================================

const post1170003_answer = `You can remove plaque at home by brushing for two full minutes twice a day with a soft-bristled or electric toothbrush, angling bristles at 45 degrees toward your gumline. Floss daily to clean the tight spaces between teeth where your brush cannot reach. An antimicrobial or fluoride mouthwash helps kill remaining bacteria. The key is consistency: plaque starts forming again within 4 to 12 hours after brushing. Once plaque hardens into tartar (usually within 24 to 72 hours), only a dental professional can remove it.`;

const post1170003_faqs = JSON.stringify([
  {
    question: "Can you remove hardened plaque (tartar) at home?",
    answer: "No. Once plaque mineralizes into tartar (also called calculus), it bonds to your enamel and can only be removed safely by a dentist or hygienist using professional scaling tools. Home remedies like baking soda or charcoal toothpaste cannot break this bond. Trying to scrape tartar yourself risks damaging your enamel or gums."
  },
  {
    question: "How long does it take for plaque to turn into tartar?",
    answer: "Plaque can begin hardening into tartar in as little as 24 to 72 hours if it is not removed. This is why brushing twice daily and flossing once daily is so important. Missing even one day gives plaque a head start toward becoming tartar."
  },
  {
    question: "Does mouthwash remove plaque?",
    answer: "Mouthwash alone does not physically remove plaque, but antimicrobial rinses (like those containing cetylpyridinium chloride or essential oils) kill bacteria that form plaque. Think of mouthwash as a supplement to brushing and flossing, not a replacement. It reaches areas your brush might miss, reducing new plaque formation."
  },
  {
    question: "Is an electric toothbrush better for removing plaque?",
    answer: "Research shows electric toothbrushes remove 21% more plaque than manual brushes on average, according to a Cochrane review. Oscillating-rotating heads are especially effective. However, a manual brush used with proper technique (45-degree angle, gentle circles, two minutes) still does a good job."
  },
  {
    question: "What foods help prevent plaque buildup?",
    answer: "Crunchy fruits and vegetables like apples, carrots, and celery stimulate saliva production, which naturally rinses away food particles. Cheese and yogurt contain calcium that strengthens enamel. Green tea has polyphenols that reduce bacterial growth. Avoid sticky, sugary snacks that feed plaque-causing bacteria."
  }
]);

const post1170003_whenUrgent = JSON.stringify([
  "Gums that bleed every time you brush or floss",
  "Visible yellowish or brown buildup along your gumline that will not brush off",
  "Persistent bad breath even after brushing",
  "Gums that are red, swollen, or pulling away from your teeth",
  "Loose teeth or teeth that feel like they are shifting"
]);

// Also append a proper CTA block to the bodyHtml
const ctaBlock = `<h2>Take the Guesswork Out of Your Oral Health</h2><p>Wondering if your brushing routine is actually working? DentaSmart lets you snap a photo of your teeth and get a personalized oral health score in minutes. You will see exactly where plaque is building up and get a clear plan to stay ahead of it.</p><p><a target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-primary/80" href="https://apps.apple.com/app/dentasmart-ai-dental-care/id6738029498"><strong>Try DentaSmart free on the App Store</strong></a></p>`;

await conn.execute(
  `UPDATE blog_posts SET atAGlanceAnswer = ?, faqs = ?, whenUrgent = ?, bodyHtml = CONCAT(bodyHtml, ?) WHERE id = 1170003`,
  [post1170003_answer, post1170003_faqs, post1170003_whenUrgent, ctaBlock]
);
console.log("✅ Post 1170003 (how-to-remove-plaque-at-home) updated with all AEO fields + CTA");

// ============================================================
// POST 2910001 - filling-without-insurance-options
// Needs: whenUrgent only
// ============================================================

const post2910001_whenUrgent = JSON.stringify([
  "Sharp pain when biting down on food",
  "Sensitivity to hot or cold that lingers more than 30 seconds",
  "A visible hole, crack, or dark spot on your tooth",
  "Throbbing pain that wakes you up at night",
  "Swelling in your gums near the affected tooth",
  "A piece of your tooth breaks off"
]);

await conn.execute(
  `UPDATE blog_posts SET whenUrgent = ? WHERE id = 2910001`,
  [post2910001_whenUrgent]
);
console.log("✅ Post 2910001 (filling-without-insurance-options) updated with whenUrgent");

// ============================================================
// POSTS 330007 and 330008 - already complete
// Just verify they have CTAs (confirmed above - they do)
// ============================================================
console.log("✅ Posts 330007 and 330008 already have all AEO fields and CTAs - no changes needed");

// ============================================================
// VERIFICATION
// ============================================================
const [verify] = await conn.execute(
  `SELECT id, slug, 
   CASE WHEN atAGlanceAnswer IS NOT NULL AND atAGlanceAnswer != '' THEN 'YES' ELSE 'NO' END as hasAnswer,
   CASE WHEN faqs IS NOT NULL AND faqs != '' AND faqs != '[]' THEN 'YES' ELSE 'NO' END as hasFaqs,
   CASE WHEN whenUrgent IS NOT NULL AND whenUrgent != '' AND whenUrgent != '[]' THEN 'YES' ELSE 'NO' END as hasUrgent
   FROM blog_posts 
   WHERE id IN (330007, 1260001, 2910001, 330008, 1170003)
   ORDER BY slug`
);
console.log("\n📊 Verification - All posts should now show YES for all fields:");
console.table(verify);

await conn.end();
process.exit(0);
