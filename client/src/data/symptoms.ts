export interface SymptomData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  heroHeading: string;
  heroSubheading: string;
  directAnswer: string;
  detailedExplanation: string[];
  possibleCauses: { title: string; description: string; urgency: "low" | "medium" | "high" }[];
  selfCareSteps: string[];
  whenToSeeDentist: string[];
  keyTakeaways: string[];
  faqs: { question: string; answer: string }[];
  relatedConditions: { slug: string; title: string }[];
  relatedSymptoms: { slug: string; title: string }[];
  relatedGuides: { slug: string; title: string }[];
  reviewedBy: string;
  reviewedByCredentials: string;
  lastReviewed: string;
}

export const symptomsData: Record<string, SymptomData> = {
  "tooth-pain-when-biting": {
    slug: "tooth-pain-when-biting",
    title: "Tooth Pain When Biting: What It Means and What to Do",
    metaTitle: "Tooth Pain When Biting: Causes & Solutions | DentaSmart",
    metaDescription:
      "Experiencing tooth pain when you bite down? Learn the common causes, when to worry, and what steps to take next.",
    primaryKeyword: "tooth pain when biting",
    secondaryKeywords: ["pain when chewing", "tooth hurts when I bite down", "cracked tooth pain", "sharp tooth pain biting"],
    heroHeading: "Tooth Pain When Biting",
    heroSubheading: "Sharp pain when you bite down is your tooth sending a clear signal. Here is what it could mean and what you should do.",
    directAnswer:
      "Pain when biting usually indicates a cracked tooth, a failing filling, tooth decay reaching the nerve, or a dental abscess. The pain happens because biting puts pressure on a damaged area. Mild, occasional pain may not be urgent, but sharp, consistent pain when biting needs dental evaluation soon.",
    detailedExplanation: [
      "When you bite down and feel a sharp or aching pain in a specific tooth, it means something is wrong with that tooth's structure or the tissues around it. Healthy teeth should not hurt when you chew. The pain is caused by pressure being applied to a weakened, cracked, or infected area.",
      "The most common cause is a cracked tooth. Cracks can be invisible to the naked eye but cause sharp pain when biting because the crack flexes under pressure, irritating the nerve inside. This type of pain often comes and goes and may be hard to pinpoint to a specific tooth.",
      "Other common causes include a cavity that has grown deep enough to affect the nerve, a filling that has cracked or come loose, or an abscess (infection) at the root of the tooth. In some cases, the pain is caused by a high bite on a new filling or crown that needs adjustment.",
      "If the pain is mild and happens only occasionally, you can monitor it for a few days. But if the pain is sharp, happens every time you bite, is getting worse, or is accompanied by swelling, you should see a dentist soon. DentaSmart can help you assess the situation with a photo or X-ray analysis.",
    ],
    possibleCauses: [
      { title: "Cracked Tooth", description: "A crack in the tooth flexes under biting pressure, irritating the nerve. Often invisible to the eye.", urgency: "medium" },
      { title: "Deep Cavity", description: "Decay that has reached near or into the nerve causes pain when pressure is applied.", urgency: "medium" },
      { title: "Failing Filling", description: "An old or damaged filling can crack, loosen, or develop gaps where bacteria enter.", urgency: "medium" },
      { title: "Dental Abscess", description: "An infection at the tooth root creates pressure and inflammation that worsens with biting.", urgency: "high" },
      { title: "High Bite (Occlusal Issue)", description: "A new filling or crown that sits too high puts extra pressure on that tooth when you bite.", urgency: "low" },
      { title: "Periodontal Ligament Inflammation", description: "The ligament holding the tooth in its socket becomes inflamed from grinding, trauma, or infection.", urgency: "medium" },
    ],
    selfCareSteps: [
      "Avoid chewing on the painful side until you can see a dentist",
      "Take ibuprofen to reduce pain and inflammation",
      "Rinse with warm saltwater (half teaspoon of salt in a cup of warm water)",
      "Avoid very hot, cold, or hard foods that might trigger the pain",
      "Do not try to test the tooth by repeatedly biting on it",
      "Upload a photo to DentaSmart for an initial assessment",
    ],
    whenToSeeDentist: [
      "Pain happens every time you bite on that tooth",
      "The pain is getting worse over time",
      "You notice swelling around the tooth or in your face",
      "The pain is accompanied by a fever",
      "You can see a crack, hole, or dark spot on the tooth",
      "A piece of tooth or filling has broken off",
    ],
    keyTakeaways: [
      "Pain when biting is not normal and usually means the tooth is cracked, decayed, or infected.",
      "A cracked tooth is the most common cause and can be hard to see without dental tools.",
      "Avoid chewing on the painful side and take ibuprofen while you arrange a dental visit.",
      "DentaSmart can help you assess the situation with a photo or X-ray before your appointment.",
    ],
    faqs: [
      { question: "Can a cracked tooth heal on its own?", answer: "No. Unlike bones, teeth cannot heal themselves. A cracked tooth needs dental treatment (bonding, crown, or root canal depending on severity) to prevent the crack from spreading and the tooth from breaking." },
      { question: "Why does the pain come and go?", answer: "With a cracked tooth, pain happens when the crack flexes under pressure. When you release the bite, the crack closes and the pain stops. This on-off pattern is a classic sign of a cracked tooth." },
      { question: "How much does it cost to fix?", answer: "It depends on the cause. A bite adjustment is often free. A filling costs $150-300. A crown costs $800-1,500. A root canal costs $700-1,500. Early treatment is almost always cheaper." },
    ],
    relatedConditions: [
      { slug: "toothache", title: "Toothache" },
      { slug: "cavities", title: "Cavities" },
    ],
    relatedSymptoms: [
      { slug: "tooth-sensitivity", title: "Tooth Sensitivity" },
      { slug: "jaw-pain", title: "Jaw Pain" },
    ],
    relatedGuides: [
      { slug: "dental-visit-guide", title: "What to Expect at a Dental Visit" },
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },

  "bleeding-gums": {
    slug: "bleeding-gums",
    title: "Bleeding Gums: Why It Happens and How to Stop It",
    metaTitle: "Bleeding Gums: Causes & Treatment | DentaSmart",
    metaDescription:
      "Gums bleeding when you brush or floss? Learn why it happens, what it means, and how to get your gums healthy again.",
    primaryKeyword: "bleeding gums",
    secondaryKeywords: ["gums bleed when brushing", "why do my gums bleed", "bleeding gums treatment", "gingivitis bleeding"],
    heroHeading: "Bleeding Gums",
    heroSubheading: "Bleeding gums are not normal. They are usually the first sign that something needs your attention. Here is what to know.",
    directAnswer:
      "Bleeding gums are most commonly caused by plaque buildup along the gumline, leading to gingivitis (early gum disease). Other causes include aggressive brushing, hormonal changes, blood-thinning medications, and vitamin deficiencies. In most cases, improving your brushing and flossing routine will stop the bleeding within 1-2 weeks.",
    detailedExplanation: [
      "When you see blood on your toothbrush or when flossing, it is easy to think you are brushing too hard. But in most cases, bleeding gums are a sign of inflammation caused by bacteria in plaque. Your gums are telling you they need better care, not less care.",
      "Gingivitis is the most common cause. When plaque builds up along the gumline, bacteria irritate the gum tissue, causing it to become red, swollen, and prone to bleeding. The good news is that gingivitis is completely reversible. Consistent brushing, daily flossing, and a professional cleaning can resolve it.",
      "Other causes include hormonal changes (pregnancy gingivitis affects up to 75% of pregnant women), blood-thinning medications (aspirin, warfarin), vitamin C or K deficiency, and using a toothbrush with bristles that are too hard. In rare cases, persistent bleeding can indicate a blood disorder.",
      "The worst thing you can do when your gums bleed is stop brushing and flossing. This allows more plaque to build up and makes the problem worse. Instead, switch to a soft-bristled brush, be gentle but thorough, and floss daily. If bleeding persists after 2 weeks of improved care, see a dentist.",
    ],
    possibleCauses: [
      { title: "Gingivitis (Early Gum Disease)", description: "Plaque buildup causes gum inflammation. The most common cause of bleeding gums.", urgency: "medium" },
      { title: "Aggressive Brushing", description: "Using a hard-bristled brush or brushing too vigorously can damage gum tissue.", urgency: "low" },
      { title: "Hormonal Changes", description: "Pregnancy, menstruation, and puberty can make gums more sensitive and prone to bleeding.", urgency: "low" },
      { title: "Blood-Thinning Medications", description: "Aspirin, warfarin, and other blood thinners can make gums bleed more easily.", urgency: "low" },
      { title: "Vitamin Deficiency", description: "Low vitamin C or vitamin K can affect gum health and blood clotting.", urgency: "medium" },
      { title: "Periodontitis (Advanced Gum Disease)", description: "If gingivitis progresses, it can cause deep pockets, bone loss, and more significant bleeding.", urgency: "high" },
    ],
    selfCareSteps: [
      "Switch to a soft-bristled toothbrush and brush gently in circular motions",
      "Floss daily, even if it causes bleeding at first (it should stop within 1-2 weeks)",
      "Rinse with warm saltwater after brushing to reduce inflammation",
      "Avoid smoking, which worsens gum disease",
      "Eat a balanced diet with adequate vitamin C (citrus, peppers, broccoli)",
      "Monitor your gum health with DentaSmart to track improvement",
    ],
    whenToSeeDentist: [
      "Bleeding does not improve after 2 weeks of better oral care",
      "Gums are very red, swollen, or painful",
      "You notice gums pulling away from your teeth",
      "You have persistent bad breath",
      "Teeth feel loose or are shifting",
      "You are pregnant and experiencing significant gum bleeding",
    ],
    keyTakeaways: [
      "Bleeding gums are usually the first sign of gingivitis, which is completely reversible.",
      "Do not stop brushing or flossing when gums bleed. Improve your technique instead.",
      "Most bleeding gums resolve within 1-2 weeks of consistent, proper oral care.",
      "If bleeding persists, see a dentist. It could indicate a more serious condition.",
    ],
    faqs: [
      { question: "Is it normal for gums to bleed?", answer: "No. Healthy gums do not bleed. Bleeding is a sign of inflammation, usually from plaque buildup. Think of it like a warning light on your dashboard. It is common, but it is not normal." },
      { question: "Should I stop flossing if my gums bleed?", answer: "No. If your gums bleed when you floss, it usually means you need to floss more, not less. The bleeding should stop within 1-2 weeks of daily flossing as the inflammation resolves." },
      { question: "Can bleeding gums lead to tooth loss?", answer: "If left untreated, gingivitis can progress to periodontitis, which destroys the bone supporting your teeth and can lead to tooth loss. This is why treating bleeding gums early is so important." },
    ],
    relatedConditions: [
      { slug: "gum-disease", title: "Gum Disease" },
      { slug: "cavities", title: "Cavities" },
    ],
    relatedSymptoms: [
      { slug: "bad-breath", title: "Bad Breath" },
      { slug: "tooth-sensitivity", title: "Tooth Sensitivity" },
    ],
    relatedGuides: [
      { slug: "flossing-guide", title: "How to Floss Correctly" },
      { slug: "brushing-guide", title: "How to Brush Your Teeth Properly" },
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },

  "tooth-sensitivity": {
    slug: "tooth-sensitivity",
    title: "Tooth Sensitivity: Why Your Teeth Hurt and How to Fix It",
    metaTitle: "Tooth Sensitivity: Causes & Relief | DentaSmart",
    metaDescription:
      "Teeth sensitive to hot, cold, or sweet? Learn what causes tooth sensitivity and how to find relief.",
    primaryKeyword: "tooth sensitivity",
    secondaryKeywords: ["sensitive teeth", "teeth hurt cold water", "tooth sensitivity treatment", "why are my teeth sensitive"],
    heroHeading: "Tooth Sensitivity",
    heroSubheading: "That sharp zing when you drink something cold or hot is not something you have to live with. Here is what is happening and how to fix it.",
    directAnswer:
      "Tooth sensitivity happens when the protective enamel wears down or gums recede, exposing the underlying dentin layer. Dentin contains tiny tubes that lead to the nerve, so temperature and sweet stimuli cause a sharp, brief pain. Sensitivity toothpaste, fluoride treatments, and addressing the root cause can provide relief.",
    detailedExplanation: [
      "Tooth sensitivity (dentin hypersensitivity) affects about 1 in 8 adults. It is that sharp, sudden pain you feel when your teeth are exposed to hot, cold, sweet, or acidic foods and drinks. The pain is usually brief but can be intense enough to make you avoid certain foods.",
      "The outer layer of your tooth (enamel) protects the softer dentin underneath. Dentin contains thousands of microscopic tubes (tubules) that lead directly to the tooth's nerve. When enamel wears down or gums recede, these tubules are exposed, allowing stimuli to reach the nerve and cause pain.",
      "Common causes include enamel erosion from acidic foods and drinks, aggressive brushing that wears down enamel, gum recession that exposes root surfaces, teeth grinding (bruxism), recent dental work, and tooth decay. Whitening products can also cause temporary sensitivity.",
      "Treatment depends on the cause. Sensitivity toothpaste (containing potassium nitrate or stannous fluoride) can block the tubules and reduce pain over 2-4 weeks of regular use. Your dentist may apply fluoride varnish, dental bonding, or recommend a night guard if grinding is the cause. DentaSmart can help you identify potential causes by analyzing photos of your teeth and gums.",
    ],
    possibleCauses: [
      { title: "Enamel Erosion", description: "Acidic foods, drinks, and stomach acid wear down the protective enamel layer.", urgency: "medium" },
      { title: "Gum Recession", description: "Gums pulling back expose the root surface, which has no enamel protection.", urgency: "medium" },
      { title: "Aggressive Brushing", description: "Brushing too hard or with a hard-bristled brush wears down enamel over time.", urgency: "low" },
      { title: "Teeth Grinding (Bruxism)", description: "Grinding wears down enamel and can cause cracks that expose dentin.", urgency: "medium" },
      { title: "Tooth Decay", description: "A cavity exposes the dentin layer and can cause sensitivity before pain develops.", urgency: "medium" },
      { title: "Recent Dental Work", description: "Fillings, crowns, and whitening can cause temporary sensitivity that usually resolves in days to weeks.", urgency: "low" },
    ],
    selfCareSteps: [
      "Use a sensitivity toothpaste (with potassium nitrate or stannous fluoride) for at least 2-4 weeks",
      "Switch to a soft-bristled toothbrush and use gentle, circular motions",
      "Avoid highly acidic foods and drinks (citrus, soda, wine) or rinse with water after consuming them",
      "Do not brush immediately after eating acidic foods (wait 30 minutes)",
      "Consider using a fluoride mouthwash to strengthen enamel",
      "If you grind your teeth, ask your dentist about a night guard",
    ],
    whenToSeeDentist: [
      "Sensitivity persists after 4 weeks of using sensitivity toothpaste",
      "Sensitivity is severe or getting worse",
      "Only one tooth is sensitive (may indicate a cavity or crack)",
      "Sensitivity is accompanied by pain, swelling, or discoloration",
      "You notice your gums are receding",
      "Sensitivity started after dental work and has not improved after 2 weeks",
    ],
    keyTakeaways: [
      "Tooth sensitivity is caused by exposed dentin, usually from enamel wear or gum recession.",
      "Sensitivity toothpaste works, but you need to use it consistently for 2-4 weeks to see results.",
      "If only one tooth is sensitive, it may indicate a cavity or crack that needs dental attention.",
      "DentaSmart can help you identify potential causes by analyzing your teeth and gum photos.",
    ],
    faqs: [
      { question: "Will sensitivity toothpaste really work?", answer: "Yes, for most people. Ingredients like potassium nitrate block the nerve signals in the tubules. It takes 2-4 weeks of twice-daily use to build up enough protection. Use it as your regular toothpaste, not just occasionally." },
      { question: "Can sensitive teeth be a sign of something serious?", answer: "Sometimes. While general sensitivity is usually manageable, sensitivity in a single tooth can indicate a cavity, crack, or failing filling. Sudden onset of sensitivity across multiple teeth could indicate enamel erosion or grinding issues." },
      { question: "Does whitening cause permanent sensitivity?", answer: "No. Whitening-related sensitivity is temporary and usually resolves within a few days to a week after stopping treatment. Using sensitivity toothpaste before and during whitening can minimize it." },
    ],
    relatedConditions: [
      { slug: "cavities", title: "Cavities" },
      { slug: "gum-disease", title: "Gum Disease" },
      { slug: "teeth-whitening", title: "Teeth Whitening" },
    ],
    relatedSymptoms: [
      { slug: "tooth-pain-when-biting", title: "Tooth Pain When Biting" },
      { slug: "bleeding-gums", title: "Bleeding Gums" },
    ],
    relatedGuides: [
      { slug: "brushing-guide", title: "How to Brush Your Teeth Properly" },
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },

  "jaw-pain": {
    slug: "jaw-pain",
    title: "Jaw Pain: Common Causes and When to Get Help",
    metaTitle: "Jaw Pain: Causes, TMJ & Treatment | DentaSmart",
    metaDescription:
      "Jaw pain, clicking, or stiffness? Learn about TMJ disorders, teeth grinding, and other common causes. Find out when to see a dentist.",
    primaryKeyword: "jaw pain",
    secondaryKeywords: ["TMJ pain", "jaw clicking", "jaw stiffness", "teeth grinding jaw pain", "TMD treatment"],
    heroHeading: "Jaw Pain",
    heroSubheading: "Jaw pain can affect eating, sleeping, and daily life. Understanding the cause is the first step to finding relief.",
    directAnswer:
      "Jaw pain is most commonly caused by TMJ (temporomandibular joint) disorders, teeth grinding (bruxism), or dental infections. TMJ disorders cause pain, clicking, and limited jaw movement. Treatment ranges from self-care (soft diet, warm compresses, stress management) to dental interventions (night guards, physical therapy). Severe or worsening jaw pain needs professional evaluation.",
    detailedExplanation: [
      "The temporomandibular joint (TMJ) connects your jawbone to your skull on each side of your face. It is one of the most complex joints in your body, allowing you to open and close your mouth, chew, speak, and yawn. When something goes wrong with this joint or the muscles around it, it is called a TMJ disorder (TMD).",
      "TMJ disorders are the most common cause of jaw pain. Symptoms include pain or tenderness in the jaw, aching pain around the ear, difficulty or discomfort while chewing, clicking or popping sounds when opening or closing the mouth, and locking of the joint. Stress, teeth grinding, arthritis, and jaw injuries can all contribute.",
      "Teeth grinding (bruxism) is another major cause, often happening during sleep without you knowing it. Signs include jaw soreness in the morning, headaches, worn-down teeth, and sometimes cracked or chipped teeth. A night guard from your dentist can protect your teeth and reduce jaw strain.",
      "Other causes of jaw pain include dental infections (abscesses), wisdom teeth problems, sinus infections (which can cause referred pain to the jaw), and in rare cases, heart problems (jaw pain can be a symptom of a heart attack, especially in women). DentaSmart can help you assess dental causes through photo and X-ray analysis.",
    ],
    possibleCauses: [
      { title: "TMJ Disorder (TMD)", description: "Problems with the jaw joint itself, causing pain, clicking, and limited movement.", urgency: "medium" },
      { title: "Teeth Grinding (Bruxism)", description: "Grinding or clenching, especially during sleep, strains the jaw muscles and joint.", urgency: "medium" },
      { title: "Dental Infection/Abscess", description: "An infection at a tooth root can cause pain that radiates to the jaw.", urgency: "high" },
      { title: "Wisdom Teeth", description: "Impacted or erupting wisdom teeth can cause pain in the back of the jaw.", urgency: "medium" },
      { title: "Stress and Tension", description: "Stress causes jaw clenching and muscle tension, leading to pain and fatigue.", urgency: "low" },
      { title: "Arthritis", description: "Osteoarthritis or rheumatoid arthritis can affect the TMJ, causing pain and stiffness.", urgency: "medium" },
    ],
    selfCareSteps: [
      "Eat soft foods and avoid hard, chewy, or crunchy items temporarily",
      "Apply warm compresses to the jaw area for 15-20 minutes several times a day",
      "Practice jaw relaxation: lips together, teeth apart, tongue on the roof of your mouth",
      "Avoid wide yawning, gum chewing, and resting your chin on your hand",
      "Take over-the-counter anti-inflammatory medication (ibuprofen)",
      "Manage stress through relaxation techniques, as stress worsens jaw clenching",
    ],
    whenToSeeDentist: [
      "Jaw pain persists for more than a week despite self-care",
      "You cannot open or close your mouth fully",
      "Pain is severe or getting worse",
      "You hear grinding sounds or your jaw locks",
      "You have swelling in your face or jaw",
      "Jaw pain is accompanied by chest pain, shortness of breath, or arm pain (seek emergency care)",
    ],
    keyTakeaways: [
      "TMJ disorders and teeth grinding are the most common causes of jaw pain.",
      "Self-care (soft diet, warm compresses, stress management) resolves most mild jaw pain.",
      "A night guard from your dentist can protect your teeth and reduce grinding-related jaw pain.",
      "Sudden, severe jaw pain with chest symptoms needs emergency medical attention.",
    ],
    faqs: [
      { question: "Will TMJ pain go away on its own?", answer: "Many cases of TMJ pain improve with self-care within a few weeks. However, if the underlying cause (grinding, stress, misalignment) is not addressed, the pain tends to come back. See a dentist if it persists." },
      { question: "How do I know if I grind my teeth at night?", answer: "Signs include jaw soreness or headaches when you wake up, worn or flattened teeth, cracked teeth, and your partner hearing grinding sounds. Your dentist can also see wear patterns on your teeth." },
      { question: "How much does a night guard cost?", answer: "A custom night guard from your dentist costs $300-800. Over-the-counter options cost $20-50 but are less comfortable and effective. A custom guard is a worthwhile investment if you grind regularly." },
    ],
    relatedConditions: [
      { slug: "toothache", title: "Toothache" },
      { slug: "wisdom-teeth-pain", title: "Wisdom Teeth Pain" },
    ],
    relatedSymptoms: [
      { slug: "tooth-pain-when-biting", title: "Tooth Pain When Biting" },
      { slug: "tooth-sensitivity", title: "Tooth Sensitivity" },
    ],
    relatedGuides: [
      { slug: "dental-visit-guide", title: "What to Expect at a Dental Visit" },
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },

  "bad-breath": {
    slug: "bad-breath",
    title: "Bad Breath: Causes, Solutions, and When to Worry",
    metaTitle: "Bad Breath (Halitosis): Causes & Remedies | DentaSmart",
    metaDescription:
      "Struggling with bad breath that will not go away? Learn the real causes of halitosis and effective solutions that actually work.",
    primaryKeyword: "bad breath",
    secondaryKeywords: ["halitosis", "chronic bad breath", "bad breath causes", "how to fix bad breath", "bad breath treatment"],
    heroHeading: "Bad Breath",
    heroSubheading: "Bad breath can be embarrassing and isolating. But understanding the cause is the first step to solving it for good.",
    directAnswer:
      "Bad breath (halitosis) is most commonly caused by bacteria on the tongue, gum disease, dry mouth, or food particles trapped between teeth. In about 90% of cases, the source is in the mouth, not the stomach. Improving oral hygiene (especially tongue cleaning and flossing) resolves most cases. Persistent bad breath despite good hygiene may indicate gum disease or other health conditions.",
    detailedExplanation: [
      "Bad breath affects about 25% of people on a regular basis. It is one of the most common reasons people feel self-conscious about their oral health. The good news is that in the vast majority of cases, the cause is identifiable and treatable.",
      "The tongue is the biggest culprit. Its rough surface traps bacteria, dead cells, and food debris, especially toward the back. These bacteria break down proteins and produce volatile sulfur compounds (VSCs) that smell like rotten eggs. Simply brushing or scraping your tongue can make a dramatic difference.",
      "Gum disease is the second most common cause. The bacteria in infected gum pockets produce strong odors. If your breath does not improve with better brushing, flossing, and tongue cleaning, gum disease is a likely cause. Other oral causes include cavities, dry mouth (from medications, mouth breathing, or dehydration), and poorly fitting dental work.",
      "In about 10% of cases, bad breath comes from outside the mouth: sinus infections, acid reflux, diabetes, liver or kidney problems, or certain medications. If thorough oral care does not resolve the issue, see both your dentist and doctor. DentaSmart can help you assess your oral health to determine if the cause is dental.",
    ],
    possibleCauses: [
      { title: "Tongue Bacteria", description: "Bacteria on the tongue surface produce foul-smelling sulfur compounds. The most common cause.", urgency: "low" },
      { title: "Gum Disease", description: "Infected gum pockets harbor odor-producing bacteria that brushing alone cannot reach.", urgency: "medium" },
      { title: "Dry Mouth", description: "Saliva naturally cleanses the mouth. Reduced saliva (from medications, mouth breathing) allows bacteria to thrive.", urgency: "low" },
      { title: "Food Particles", description: "Food trapped between teeth or in cavities breaks down and produces odor.", urgency: "low" },
      { title: "Cavities and Dental Infections", description: "Decayed teeth and abscesses can produce a persistent bad smell.", urgency: "medium" },
      { title: "Medical Conditions", description: "Sinus infections, acid reflux, diabetes, and liver/kidney issues can cause bad breath from non-oral sources.", urgency: "medium" },
    ],
    selfCareSteps: [
      "Clean your tongue daily with a tongue scraper or your toothbrush (focus on the back of the tongue)",
      "Floss daily to remove food particles and plaque between teeth",
      "Stay hydrated and drink water throughout the day to prevent dry mouth",
      "Chew sugar-free gum to stimulate saliva production",
      "Avoid strong-smelling foods (garlic, onions) when it matters",
      "Replace your toothbrush every 3 months",
    ],
    whenToSeeDentist: [
      "Bad breath persists despite thorough oral hygiene for 2+ weeks",
      "You have bleeding, swollen, or receding gums",
      "You notice a persistent bad taste in your mouth",
      "You have dry mouth that does not improve with hydration",
      "Others have commented on your breath despite your best efforts",
      "You suspect a cavity or dental infection",
    ],
    keyTakeaways: [
      "90% of bad breath originates in the mouth, most often from the tongue and gum disease.",
      "Tongue cleaning is the single most effective step most people are missing.",
      "Persistent bad breath despite good oral care usually points to gum disease.",
      "DentaSmart can help you assess your oral health to identify potential dental causes.",
    ],
    faqs: [
      { question: "Can mouthwash fix bad breath?", answer: "Mouthwash provides temporary relief (30-60 minutes) but does not address the root cause. Alcohol-based mouthwashes can actually worsen bad breath by drying out your mouth. Focus on tongue cleaning and flossing first." },
      { question: "Does bad breath come from the stomach?", answer: "Rarely. About 90% of bad breath comes from the mouth. Stomach-related bad breath (from acid reflux or H. pylori infection) is possible but much less common than people think." },
      { question: "How can I tell if I have bad breath?", answer: "Lick the back of your wrist, let it dry for 10 seconds, then smell it. Or ask a trusted friend or family member. You cannot reliably smell your own breath because your nose adapts to constant odors." },
    ],
    relatedConditions: [
      { slug: "gum-disease", title: "Gum Disease" },
      { slug: "cavities", title: "Cavities" },
    ],
    relatedSymptoms: [
      { slug: "bleeding-gums", title: "Bleeding Gums" },
      { slug: "tooth-sensitivity", title: "Tooth Sensitivity" },
    ],
    relatedGuides: [
      { slug: "brushing-guide", title: "How to Brush Your Teeth Properly" },
      { slug: "flossing-guide", title: "How to Floss Correctly" },
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
     lastReviewed: "2026-02-21",
  },
  "swollen-gums": {
    slug: "swollen-gums",
    title: "Swollen Gums: What Your Body Is Telling You",
    metaTitle: "Swollen Gums Causes & Treatment | DentaSmart",
    metaDescription: "Swollen gums can signal anything from poor brushing to a serious infection. Learn the common causes, home care tips, and when to see a dentist.",
    primaryKeyword: "swollen gums",
    secondaryKeywords: ["puffy gums causes", "gum inflammation treatment", "why are my gums swollen", "gingivitis symptoms"],
    heroHeading: "Swollen gums are a warning sign worth listening to.",
    heroSubheading: "They might look minor, but puffy, tender gums are often the first sign of something that needs attention.",
    directAnswer: "Swollen gums are usually caused by plaque buildup along the gum line, leading to inflammation called gingivitis. Other causes include hormonal changes, vitamin deficiencies, infections, or poorly fitting dental work. Mild swelling often responds to improved brushing and flossing, but persistent or severe swelling should be evaluated by a dentist to rule out gum disease or infection.",
    detailedExplanation: [
      "Healthy gums are firm, pale pink, and fit snugly around your teeth. When they become swollen, red, or puffy, it means your body is responding to irritation or infection. The most common trigger is plaque, the sticky film of bacteria that forms on teeth every day.",
      "When plaque is not removed through regular brushing and flossing, it hardens into tartar and irritates the gum tissue. This early stage of gum disease is called gingivitis, and it is reversible with good oral care. But if ignored, it can progress to periodontitis, which damages the bone supporting your teeth.",
      "Swollen gums can also appear during pregnancy, puberty, or menstruation due to hormonal changes that increase blood flow to the gums. Certain medications, vitamin C deficiency, and viral or fungal infections can also cause gum swelling."
    ],
    possibleCauses: [
      { title: "Plaque and tartar buildup", description: "The most common cause. Bacteria in plaque irritate the gum tissue, causing inflammation and swelling.", urgency: "medium" },
      { title: "Gingivitis", description: "Early-stage gum disease caused by plaque accumulation. Reversible with improved oral hygiene.", urgency: "medium" },
      { title: "Hormonal changes", description: "Pregnancy, puberty, and menstrual cycles can increase gum sensitivity and swelling.", urgency: "low" },
      { title: "Infection", description: "A dental abscess or other infection can cause localized, painful gum swelling.", urgency: "high" },
      { title: "Vitamin deficiency", description: "Low vitamin C (scurvy) or vitamin K can cause gums to swell and bleed easily.", urgency: "medium" },
      { title: "Medication side effects", description: "Some blood pressure medications, anti-seizure drugs, and immunosuppressants can cause gum overgrowth.", urgency: "low" }
    ],
    selfCareSteps: [
      "Brush gently twice a day with a soft-bristled toothbrush, paying extra attention to the gum line.",
      "Floss daily to remove plaque between teeth where your brush cannot reach.",
      "Rinse with warm salt water (half teaspoon of salt in a glass of warm water) to reduce inflammation.",
      "Avoid tobacco products, which irritate gums and slow healing.",
      "Stay hydrated and eat a balanced diet rich in vitamin C."
    ],
    whenToSeeDentist: [
      "Swelling persists for more than two weeks despite improved oral hygiene",
      "You have severe pain, fever, or pus coming from the gums",
      "Swelling is spreading to your face, jaw, or neck",
      "Your gums bleed heavily or spontaneously",
      "You notice your teeth feel loose or are shifting position"
    ],
    keyTakeaways: [
      "Swollen gums are usually your body's early warning system. Catching it early means simpler treatment.",
      "Improved brushing and flossing resolves most mild gum swelling within one to two weeks.",
      "Persistent swelling, especially with pain or bleeding, should be checked by a dentist to rule out infection or advancing gum disease."
    ],
    faqs: [
      { question: "How long does it take for swollen gums to heal?", answer: "With improved brushing and flossing, mild gum swelling from gingivitis usually improves within one to two weeks. If the swelling is caused by an infection or other underlying condition, it may take longer and require professional treatment." },
      { question: "Can swollen gums be a sign of something serious?", answer: "In most cases, swollen gums are caused by plaque buildup and are easily treatable. However, persistent swelling can indicate advancing gum disease, an abscess, or rarely, systemic conditions. If swelling does not improve with home care, see a dentist." },
      { question: "Is it normal for gums to swell during pregnancy?", answer: "Yes, pregnancy gingivitis is common due to hormonal changes that increase blood flow to the gums. Good oral hygiene and regular dental cleanings during pregnancy can help manage it." },
      { question: "Can DentaSmart help me monitor my gum health?", answer: "Yes. DentaSmart can help you track changes in your gum appearance over time and identify early signs of inflammation. Regular photo monitoring gives you a clear picture of whether your gum health is improving or needs professional attention." }
    ],
    relatedConditions: [
      { slug: "gum-disease", title: "Gum Disease" },
      { slug: "dental-abscess", title: "Dental Abscess" }
    ],
    relatedSymptoms: [
      { slug: "bleeding-gums", title: "Bleeding Gums" },
      { slug: "bad-breath", title: "Bad Breath" }
    ],
    relatedGuides: [
      { slug: "brushing-guide", title: "How to Brush Your Teeth Properly" },
      { slug: "flossing-guide", title: "How to Floss Correctly" }
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },
  "loose-tooth": {
    slug: "loose-tooth",
    title: "Loose Tooth in Adults: Causes and What to Do",
    metaTitle: "Loose Tooth in Adults: Causes & Treatment | DentaSmart",
    metaDescription: "A loose tooth as an adult is not normal. Learn the most common causes, what you can do right now, and when you need to see a dentist urgently.",
    primaryKeyword: "loose tooth adult",
    secondaryKeywords: ["why is my tooth loose", "loose tooth treatment", "wobbly tooth adult", "tooth mobility causes"],
    heroHeading: "A loose tooth as an adult is your mouth asking for help.",
    heroSubheading: "Unlike childhood, a loose tooth in adulthood is not normal. Here is what might be causing it and what to do next.",
    directAnswer: "A loose tooth in an adult is usually caused by gum disease (periodontitis), which destroys the bone and tissue supporting the teeth. Other causes include teeth grinding, injury, or infection. This is not something to ignore. Early treatment can often save the tooth, but waiting too long may lead to tooth loss. See a dentist as soon as possible.",
    detailedExplanation: [
      "Your teeth are held in place by a complex system of bone, ligaments, and gum tissue. When any part of this support system is compromised, teeth can become mobile. The most common cause in adults is periodontitis, an advanced form of gum disease.",
      "Periodontitis happens when gingivitis goes untreated. Bacteria work their way below the gum line, forming deep pockets and destroying the bone that holds teeth in place. This process is often painless, which is why many people do not realize they have it until a tooth starts to feel loose.",
      "The good news is that if caught early enough, the progression can be stopped and sometimes partially reversed. But a tooth that has lost significant bone support may not be saveable, which is why acting quickly matters."
    ],
    possibleCauses: [
      { title: "Periodontitis (advanced gum disease)", description: "The most common cause. Bacteria destroy the bone and ligaments that hold teeth in place.", urgency: "high" },
      { title: "Teeth grinding (bruxism)", description: "Chronic grinding puts excessive force on teeth and can loosen them over time.", urgency: "medium" },
      { title: "Trauma or injury", description: "A blow to the face or mouth can loosen teeth by damaging the supporting structures.", urgency: "high" },
      { title: "Dental abscess", description: "An infection at the root of a tooth can destroy surrounding bone, causing looseness.", urgency: "high" },
      { title: "Osteoporosis", description: "This bone-weakening condition can affect the jawbone, reducing the support for teeth.", urgency: "medium" },
      { title: "Pregnancy", description: "Hormonal changes during pregnancy can temporarily affect the ligaments supporting teeth, causing slight mobility.", urgency: "low" }
    ],
    selfCareSteps: [
      "Avoid wiggling or touching the loose tooth with your tongue or fingers.",
      "Eat soft foods and avoid biting directly on the loose tooth.",
      "Maintain gentle oral hygiene. Do not stop brushing and flossing, but be gentle around the affected area.",
      "Avoid hard, crunchy, or sticky foods that could worsen the looseness.",
      "Schedule a dental appointment as soon as possible. This is not a wait-and-see situation."
    ],
    whenToSeeDentist: [
      "Any adult tooth that feels loose or wiggly, even slightly",
      "A tooth became loose after an injury or fall",
      "You have pain, swelling, or bleeding around the loose tooth",
      "Multiple teeth feel loose or you notice your bite changing",
      "You have a history of gum disease or have not had a dental cleaning in over a year"
    ],
    keyTakeaways: [
      "A loose tooth in an adult always needs professional evaluation. Do not wait for it to get worse.",
      "Gum disease is the most common cause, and it is treatable if caught early enough.",
      "The sooner you see a dentist, the better your chances of saving the tooth."
    ],
    faqs: [
      { question: "Can a loose tooth tighten back up?", answer: "It depends on the cause and severity. If the looseness is mild and caused by treatable conditions like early gum disease or grinding, treatment can allow the supporting structures to heal and the tooth to firm up. However, if significant bone has been lost, the tooth may not fully stabilize." },
      { question: "Should I pull out a loose tooth myself?", answer: "No. Never try to remove a loose tooth yourself. A dentist can determine whether the tooth can be saved and, if extraction is needed, can do it safely to prevent infection and preserve the bone for future options like implants." },
      { question: "How does gum disease cause loose teeth?", answer: "Gum disease bacteria create deep pockets between your teeth and gums. Over time, these bacteria destroy the bone and connective tissue that hold your teeth in place. As bone loss progresses, teeth lose their foundation and become mobile." },
      { question: "Can DentaSmart detect signs of gum disease before teeth get loose?", answer: "DentaSmart can help you monitor your gum health and identify early warning signs like redness, swelling, and recession. Catching these signs early, before bone loss occurs, gives you the best chance of preventing tooth looseness." }
    ],
    relatedConditions: [
      { slug: "gum-disease", title: "Gum Disease" },
      { slug: "dental-abscess", title: "Dental Abscess" }
    ],
    relatedSymptoms: [
      { slug: "bleeding-gums", title: "Bleeding Gums" },
      { slug: "swollen-gums", title: "Swollen Gums" }
    ],
    relatedGuides: [
      { slug: "flossing-guide", title: "How to Floss Correctly" },
      { slug: "dental-visit-guide", title: "What to Expect at a Dental Visit" }
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },
  "dry-mouth": {
    slug: "dry-mouth",
    title: "Dry Mouth: Why It Happens and Why It Matters for Your Teeth",
    metaTitle: "Dry Mouth Causes & Dental Impact | DentaSmart",
    metaDescription: "Dry mouth is more than just uncomfortable. It can increase your risk of cavities and gum disease. Learn the causes, remedies, and when to get help.",
    primaryKeyword: "dry mouth",
    secondaryKeywords: ["xerostomia causes", "dry mouth remedies", "dry mouth and cavities", "what causes dry mouth"],
    heroHeading: "Dry mouth is not just uncomfortable. It puts your teeth at risk.",
    heroSubheading: "Saliva does more than you think. When your mouth is dry, your teeth lose a critical layer of protection.",
    directAnswer: "Dry mouth (xerostomia) occurs when your salivary glands do not produce enough saliva. Saliva is essential for washing away food particles, neutralizing acids, and fighting bacteria. Without adequate saliva, your risk of cavities, gum disease, and oral infections increases significantly. Common causes include medications, dehydration, mouth breathing, and certain medical conditions.",
    detailedExplanation: [
      "Saliva is one of your mouth's most important defense systems. It constantly washes away food debris, neutralizes the acids that bacteria produce, and delivers minerals that help repair early tooth damage. When saliva production drops, all of these protective functions are compromised.",
      "More than 400 commonly prescribed medications list dry mouth as a side effect, including antihistamines, antidepressants, blood pressure medications, and pain relievers. This makes dry mouth extremely common, especially among older adults who take multiple medications.",
      "The dental consequences of chronic dry mouth can be significant. Without saliva's protective buffering, acid attacks on tooth enamel last longer and cause more damage. People with dry mouth often develop cavities in unusual locations, like along the gum line or on the biting surfaces of front teeth."
    ],
    possibleCauses: [
      { title: "Medications", description: "Over 400 medications can cause dry mouth, including antihistamines, antidepressants, diuretics, and pain medications.", urgency: "medium" },
      { title: "Dehydration", description: "Not drinking enough water, excessive caffeine, or alcohol consumption can reduce saliva production.", urgency: "low" },
      { title: "Mouth breathing", description: "Breathing through your mouth, especially during sleep, dries out oral tissues and reduces saliva's protective effects.", urgency: "low" },
      { title: "Medical conditions", description: "Diabetes, Sjogren's syndrome, HIV/AIDS, and other conditions can affect salivary gland function.", urgency: "medium" },
      { title: "Cancer treatment", description: "Radiation therapy to the head and neck can damage salivary glands, sometimes permanently.", urgency: "high" },
      { title: "Aging", description: "While aging alone does not cause dry mouth, the increased use of medications and higher rates of chronic conditions make it more common in older adults.", urgency: "low" }
    ],
    selfCareSteps: [
      "Sip water frequently throughout the day to keep your mouth moist.",
      "Chew sugar-free gum or suck on sugar-free candies to stimulate saliva production.",
      "Use a humidifier in your bedroom, especially if you breathe through your mouth at night.",
      "Avoid caffeine, alcohol, and tobacco, which can worsen dry mouth.",
      "Use an alcohol-free mouthwash designed for dry mouth.",
      "Talk to your doctor about whether any of your medications could be causing dry mouth."
    ],
    whenToSeeDentist: [
      "Dry mouth persists despite home remedies and increased water intake",
      "You are developing cavities more frequently than usual",
      "You have difficulty swallowing, speaking, or tasting food",
      "You notice a burning or tingling sensation in your mouth",
      "You have cracked lips, sores at the corners of your mouth, or a coated tongue"
    ],
    keyTakeaways: [
      "Dry mouth significantly increases your risk of cavities and gum disease. It is more than just discomfort.",
      "If you take medications that cause dry mouth, extra oral hygiene care and regular dental visits are essential.",
      "Simple strategies like sipping water, chewing sugar-free gum, and using a humidifier can make a real difference."
    ],
    faqs: [
      { question: "Can dry mouth cause cavities?", answer: "Yes. Saliva is your mouth's natural defense against cavities. It washes away food, neutralizes acids, and delivers minerals that strengthen enamel. Without adequate saliva, bacteria thrive and acid attacks last longer, leading to more cavities." },
      { question: "Should I change my toothpaste if I have dry mouth?", answer: "Consider using a toothpaste with extra fluoride and avoiding ones with sodium lauryl sulfate (SLS), which can irritate dry tissues. Your dentist may also prescribe a high-fluoride toothpaste for extra protection." },
      { question: "Is dry mouth a sign of diabetes?", answer: "Dry mouth can be a symptom of diabetes, especially if it is accompanied by increased thirst, frequent urination, and unexplained weight loss. If you have these symptoms, see your doctor for a blood sugar test." },
      { question: "Can DentaSmart help me manage dry mouth?", answer: "DentaSmart can help you track your oral health and identify patterns that suggest dry mouth is affecting your teeth. By monitoring changes over time, you can see whether your management strategies are working and when to seek professional help." }
    ],
    relatedConditions: [
      { slug: "cavities", title: "Cavities" },
      { slug: "gum-disease", title: "Gum Disease" }
    ],
    relatedSymptoms: [
      { slug: "bad-breath", title: "Bad Breath" },
      { slug: "tooth-sensitivity", title: "Tooth Sensitivity" }
    ],
    relatedGuides: [
      { slug: "brushing-guide", title: "How to Brush Your Teeth Properly" },
      { slug: "dental-visit-guide", title: "What to Expect at a Dental Visit" }
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },
  "tooth-discoloration": {
    slug: "tooth-discoloration",
    title: "Tooth Discoloration: Types, Causes, and How to Restore Your Smile",
    metaTitle: "Tooth Discoloration Causes & Solutions | DentaSmart",
    metaDescription: "Yellow, brown, or gray teeth? Learn what causes tooth discoloration, which types respond to whitening, and when you should see a dentist.",
    primaryKeyword: "tooth discoloration",
    secondaryKeywords: ["yellow teeth causes", "brown spots on teeth", "teeth staining treatment", "intrinsic vs extrinsic stains"],
    heroHeading: "Your tooth color is telling you something.",
    heroSubheading: "Some stains are cosmetic. Others hint at something deeper. Here is how to tell the difference.",
    directAnswer: "Tooth discoloration falls into two categories: extrinsic stains on the surface (from coffee, tea, wine, or tobacco) and intrinsic stains within the tooth (from medications, trauma, or aging). Extrinsic stains usually respond well to professional cleaning and whitening. Intrinsic stains may require veneers, bonding, or crowns. A dentist can identify the type and recommend the most effective treatment.",
    detailedExplanation: [
      "The color of your teeth is determined by a combination of the enamel's thickness and translucency, the color of the dentin underneath, and any stains on or within the tooth. Understanding which factor is causing your discoloration helps determine the best approach to treatment.",
      "Extrinsic stains sit on the outer surface of the enamel. They are caused by pigmented foods and drinks, tobacco, and poor oral hygiene. These stains are the easiest to address because they have not penetrated the tooth structure.",
      "Intrinsic stains are embedded within the tooth itself. They can result from childhood exposure to certain antibiotics (like tetracycline), excessive fluoride during tooth development, trauma that damages the nerve, or simply the natural darkening of dentin as you age. These stains do not respond to surface whitening."
    ],
    possibleCauses: [
      { title: "Coffee, tea, and red wine", description: "These beverages contain chromogens that attach to enamel and build up over time, causing yellow or brown surface stains.", urgency: "low" },
      { title: "Tobacco use", description: "Tar and nicotine in tobacco products create stubborn brown and yellow stains that penetrate enamel.", urgency: "low" },
      { title: "Poor oral hygiene", description: "Inadequate brushing and flossing allows plaque and tartar to accumulate, giving teeth a yellow or brown appearance.", urgency: "medium" },
      { title: "Aging", description: "Enamel naturally thins with age, revealing the darker dentin underneath. This is a normal process.", urgency: "low" },
      { title: "Medications", description: "Tetracycline antibiotics taken during childhood can cause gray-brown banding. Some antihistamines and blood pressure medications can also cause discoloration.", urgency: "low" },
      { title: "Trauma", description: "A blow to a tooth can damage the nerve, causing the tooth to darken over time. This may indicate the tooth needs treatment.", urgency: "medium" }
    ],
    selfCareSteps: [
      "Brush twice daily with a whitening toothpaste that has the ADA Seal of Acceptance.",
      "Rinse your mouth with water after consuming staining beverages like coffee or red wine.",
      "Use a straw for dark-colored drinks to minimize contact with your front teeth.",
      "Quit or reduce tobacco use, which is one of the most significant causes of tooth staining.",
      "Maintain regular dental cleanings to remove surface stains and tartar buildup."
    ],
    whenToSeeDentist: [
      "A single tooth has become noticeably darker than the others (may indicate nerve damage)",
      "Discoloration appeared after an injury to the tooth or face",
      "Over-the-counter whitening products are not improving the stains",
      "You have gray, blue, or black discoloration that is not from food or drink",
      "Discoloration is accompanied by pain, sensitivity, or a bad taste"
    ],
    keyTakeaways: [
      "Most surface stains from food and drink can be managed with good hygiene and professional cleaning.",
      "A single darkened tooth may indicate nerve damage and should be evaluated by a dentist.",
      "Not all discoloration responds to whitening. Your dentist can identify the type and recommend the right treatment."
    ],
    faqs: [
      { question: "Does whitening toothpaste actually work?", answer: "Whitening toothpastes can help remove mild surface stains, but they cannot change the natural color of your teeth or address intrinsic stains. For more significant whitening, professional treatments are more effective." },
      { question: "Why did my tooth turn dark after being hit?", answer: "When a tooth is injured, the nerve inside can be damaged. As the nerve tissue breaks down, it can cause the tooth to darken from the inside. This may happen weeks or even months after the injury. A darkened tooth should be evaluated by a dentist." },
      { question: "Is teeth whitening safe?", answer: "Professional whitening and ADA-approved over-the-counter products are generally safe when used as directed. Some temporary sensitivity is normal. Overuse of whitening products can damage enamel, so follow the recommended guidelines." },
      { question: "Can DentaSmart track changes in my tooth color?", answer: "Yes. By taking regular photos with DentaSmart, you can monitor changes in tooth color over time. This helps you see whether stains are getting better or worse and gives you useful information to share with your dentist." }
    ],
    relatedConditions: [
      { slug: "cavities", title: "Cavities" },
      { slug: "teeth-whitening", title: "Teeth Whitening" }
    ],
    relatedSymptoms: [
      { slug: "tooth-sensitivity", title: "Tooth Sensitivity" },
      { slug: "bad-breath", title: "Bad Breath" }
    ],
    relatedGuides: [
      { slug: "brushing-guide", title: "How to Brush Your Teeth Properly" }
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },
  "mouth-sores": {
    slug: "mouth-sores",
    title: "Mouth Sores: Types, Causes, and When to Worry",
    metaTitle: "Mouth Sores Causes & Treatment | DentaSmart",
    metaDescription: "Canker sores, cold sores, or something else? Learn about the different types of mouth sores, what causes them, and when you should see a dentist or doctor.",
    primaryKeyword: "mouth sores",
    secondaryKeywords: ["canker sore treatment", "oral ulcer causes", "sore in mouth that won't heal", "mouth lesions"],
    heroHeading: "Most mouth sores are harmless. But some need attention.",
    heroSubheading: "Knowing the difference between a canker sore and something more serious can save you worry and help you act when it matters.",
    directAnswer: "Mouth sores are common and usually harmless. Canker sores (aphthous ulcers) are the most frequent type, appearing as small, round, white or yellow sores with a red border inside the mouth. Cold sores (fever blisters) appear on or around the lips and are caused by the herpes simplex virus. Most mouth sores heal on their own within one to two weeks. However, a sore that does not heal within three weeks should be evaluated by a dentist or doctor.",
    detailedExplanation: [
      "Your mouth is one of the most active parts of your body. Between eating, talking, and breathing, the soft tissues inside are constantly exposed to friction, temperature changes, and bacteria. It is no surprise that sores develop from time to time.",
      "Canker sores are the most common type. They are not contagious and usually appear after stress, minor injuries (like biting your cheek), acidic foods, or hormonal changes. They are painful but heal on their own within 7 to 14 days.",
      "Cold sores are different. They are caused by the herpes simplex virus (HSV-1), are contagious, and typically appear on the lips or around the mouth. Once you have the virus, it stays in your body and can reactivate during stress, illness, or sun exposure."
    ],
    possibleCauses: [
      { title: "Canker sores (aphthous ulcers)", description: "Small, painful sores inside the mouth triggered by stress, minor injuries, acidic foods, or immune factors. Not contagious.", urgency: "low" },
      { title: "Cold sores (herpes simplex)", description: "Fluid-filled blisters on or around the lips caused by HSV-1. Contagious and recurring.", urgency: "low" },
      { title: "Irritation or trauma", description: "Biting your cheek, sharp tooth edges, ill-fitting dentures, or braces can cause sores from friction.", urgency: "low" },
      { title: "Oral thrush", description: "A fungal infection causing white patches that can be wiped away, leaving red, sore tissue underneath.", urgency: "medium" },
      { title: "Vitamin deficiencies", description: "Low levels of iron, B12, folate, or zinc can make you more prone to mouth sores.", urgency: "medium" },
      { title: "Oral cancer", description: "A sore or lump that does not heal within three weeks, especially if painless, should be evaluated. Early detection is critical.", urgency: "high" }
    ],
    selfCareSteps: [
      "Rinse with warm salt water several times a day to reduce pain and promote healing.",
      "Apply over-the-counter topical treatments like benzocaine gel to numb the area.",
      "Avoid spicy, acidic, or rough-textured foods that can irritate the sore.",
      "Use a soft-bristled toothbrush and be gentle when brushing near the sore.",
      "For cold sores, over-the-counter antiviral creams can help if applied at the first tingling sensation."
    ],
    whenToSeeDentist: [
      "A mouth sore has not healed within three weeks",
      "The sore is unusually large (larger than a pencil eraser)",
      "You have a fever along with mouth sores",
      "Sores keep coming back frequently",
      "You notice a painless lump, thickening, or white/red patch that does not go away",
      "You have difficulty eating, drinking, or swallowing due to sores"
    ],
    keyTakeaways: [
      "Most mouth sores are harmless and heal within one to two weeks without treatment.",
      "A sore that does not heal within three weeks should always be checked by a professional.",
      "Knowing the difference between canker sores and cold sores helps you manage them better and know when they are contagious."
    ],
    faqs: [
      { question: "Are canker sores contagious?", answer: "No. Canker sores are not caused by a virus and cannot be spread to others. Cold sores, on the other hand, are caused by the herpes simplex virus and are contagious, especially when blisters are present." },
      { question: "When should I worry about a mouth sore?", answer: "See a dentist or doctor if a sore does not heal within three weeks, is unusually large, keeps coming back, or is accompanied by fever, difficulty swallowing, or a painless lump. A non-healing sore can rarely be a sign of oral cancer." },
      { question: "Can stress cause mouth sores?", answer: "Yes. Stress is one of the most common triggers for canker sores. It can also reactivate the herpes virus, causing cold sore outbreaks. Managing stress through sleep, exercise, and relaxation techniques can help reduce frequency." },
      { question: "Can DentaSmart help me monitor mouth sores?", answer: "DentaSmart can help you photograph and track mouth sores over time. This is especially useful for monitoring whether a sore is healing as expected or if it needs professional evaluation." }
    ],
    relatedConditions: [
      { slug: "gum-disease", title: "Gum Disease" }
    ],
    relatedSymptoms: [
      { slug: "swollen-gums", title: "Swollen Gums" },
      { slug: "bad-breath", title: "Bad Breath" }
    ],
    relatedGuides: [
      { slug: "brushing-guide", title: "How to Brush Your Teeth Properly" },
      { slug: "dental-visit-guide", title: "What to Expect at a Dental Visit" }
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },
};
export const symptomsList = Object.values(symptomsData);
