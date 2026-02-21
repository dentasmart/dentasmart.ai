export interface GuideData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  heroHeading: string;
  heroSubheading: string;
  introduction: string;
  steps: { title: string; content: string; tip?: string }[];
  commonMistakes: { mistake: string; correction: string }[];
  keyTakeaways: string[];
  faqs: { question: string; answer: string }[];
  relatedConditions: { slug: string; title: string }[];
  relatedSymptoms: { slug: string; title: string }[];
  relatedGuides: { slug: string; title: string }[];
  reviewedBy: string;
  reviewedByCredentials: string;
  lastReviewed: string;
}

export const guidesData: Record<string, GuideData> = {
  "brushing-guide": {
    slug: "brushing-guide",
    title: "How to Brush Your Teeth Properly: A Complete Guide",
    metaTitle: "How to Brush Your Teeth Properly | DentaSmart Guide",
    metaDescription:
      "Learn the correct brushing technique, how long to brush, and common mistakes to avoid. A simple guide to better oral health.",
    primaryKeyword: "how to brush teeth",
    secondaryKeywords: ["proper brushing technique", "how long to brush teeth", "brushing mistakes", "best way to brush teeth"],
    heroHeading: "How to Brush Your Teeth Properly",
    heroSubheading: "Most people have been brushing their teeth since childhood, but many are doing it wrong. Here is the technique that actually works.",
    introduction:
      "Brushing your teeth is the foundation of good oral health. But studies show that most adults brush for less than a minute (instead of the recommended two) and use a back-and-forth sawing motion that can actually damage gums and miss key areas. The right technique takes the same amount of time but delivers dramatically better results. This guide walks you through the proper method step by step.",
    steps: [
      {
        title: "Choose the Right Toothbrush",
        content: "Use a soft-bristled toothbrush with a head small enough to reach all areas of your mouth. Medium and hard bristles can damage enamel and gums over time. Electric toothbrushes with oscillating or sonic heads are slightly more effective than manual brushes, especially if your technique is not perfect.",
        tip: "Replace your toothbrush (or brush head) every 3 months, or sooner if the bristles are frayed.",
      },
      {
        title: "Use the Right Amount of Fluoride Toothpaste",
        content: "Squeeze a pea-sized amount of fluoride toothpaste onto your brush. You do not need a full strip across the bristles like in commercials. Fluoride strengthens enamel and helps prevent cavities. For children under 3, use a rice-grain-sized smear.",
        tip: "Do not rinse with water after brushing. Just spit out the excess. This lets the fluoride continue protecting your teeth.",
      },
      {
        title: "Angle Your Brush at 45 Degrees",
        content: "Hold your toothbrush at a 45-degree angle to your gumline. This is the most important part of the technique. The bristles should be pointing partly into the gum pocket where plaque accumulates. This is where most people miss.",
      },
      {
        title: "Use Gentle, Short Strokes",
        content: "Move the brush in short, gentle, circular or back-and-forth strokes (about tooth-wide). Do not scrub. Let the bristles do the work. Too much pressure actually bends the bristles and reduces cleaning effectiveness while damaging your gums.",
        tip: "If your toothbrush bristles splay out within a month, you are pressing too hard.",
      },
      {
        title: "Clean All Surfaces Systematically",
        content: "Divide your mouth into four quadrants (upper right, upper left, lower right, lower left). Spend 30 seconds on each quadrant. For each section, brush the outer surfaces (facing your cheek), inner surfaces (facing your tongue), and chewing surfaces. Do not forget the back of your last molars.",
      },
      {
        title: "Brush Your Tongue",
        content: "Gently brush or scrape your tongue from back to front. Your tongue harbors bacteria that cause bad breath. This simple step can dramatically improve the freshness of your breath.",
      },
      {
        title: "Brush for a Full Two Minutes",
        content: "Time yourself. Most people think they brush for two minutes but actually brush for about 45 seconds. Use a timer, play a two-minute song, or use an electric toothbrush with a built-in timer. Two minutes gives the fluoride time to work and ensures you cover all areas.",
      },
    ],
    commonMistakes: [
      { mistake: "Brushing too hard", correction: "Use gentle pressure. If your gums bleed or your bristles splay quickly, you are pressing too hard." },
      { mistake: "Brushing right after eating acidic foods", correction: "Wait 30 minutes after eating acidic foods (citrus, soda, wine). Acid softens enamel temporarily, and brushing can wear it away." },
      { mistake: "Only brushing the front surfaces", correction: "The inner surfaces and chewing surfaces need just as much attention. Cavities often form between teeth and on biting surfaces." },
      { mistake: "Using a hard-bristled brush", correction: "Soft bristles are recommended by every dental association. Hard bristles damage enamel and gums without cleaning better." },
      { mistake: "Rinsing with water after brushing", correction: "Spit out excess toothpaste but do not rinse. This keeps fluoride on your teeth longer for better protection." },
      { mistake: "Skipping the gumline", correction: "Angle your brush at 45 degrees to clean where the tooth meets the gum. This is where plaque builds up most." },
    ],
    keyTakeaways: [
      "Angle your brush at 45 degrees to the gumline. This is the single most important technique change most people can make.",
      "Brush for a full 2 minutes, twice daily. Use a timer until it becomes habit.",
      "Use gentle pressure with a soft-bristled brush. Harder is not better.",
      "Do not rinse after brushing. Spit out the excess and let the fluoride work.",
    ],
    faqs: [
      { question: "Should I brush before or after breakfast?", answer: "Ideally, brush before breakfast. This removes the bacteria that accumulated overnight before they can feed on your breakfast. If you prefer brushing after, wait 30 minutes, especially if you had acidic foods like orange juice." },
      { question: "Is an electric toothbrush worth it?", answer: "Studies show electric toothbrushes remove slightly more plaque than manual brushes, especially for people who do not use perfect technique. They are particularly helpful for people with limited dexterity. Either type works well with proper technique." },
      { question: "How often should I replace my toothbrush?", answer: "Every 3 months, or sooner if the bristles are frayed or splayed. Also replace it after you have been sick to avoid reintroducing bacteria." },
      { question: "Can brushing too much damage my teeth?", answer: "Brushing more than 3 times a day or brushing too aggressively can wear down enamel and irritate gums. Twice daily for 2 minutes each time is the sweet spot." },
    ],
    relatedConditions: [
      { slug: "cavities", title: "Cavities" },
      { slug: "gum-disease", title: "Gum Disease" },
    ],
    relatedSymptoms: [
      { slug: "bleeding-gums", title: "Bleeding Gums" },
      { slug: "bad-breath", title: "Bad Breath" },
      { slug: "tooth-sensitivity", title: "Tooth Sensitivity" },
    ],
    relatedGuides: [
      { slug: "flossing-guide", title: "How to Floss Correctly" },
      { slug: "dental-visit-guide", title: "What to Expect at a Dental Visit" },
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },

  "flossing-guide": {
    slug: "flossing-guide",
    title: "How to Floss Correctly: A Step-by-Step Guide",
    metaTitle: "How to Floss Your Teeth Properly | DentaSmart Guide",
    metaDescription:
      "Learn the correct way to floss, why it matters, and how to make it a habit. A simple guide to protecting the spaces your brush cannot reach.",
    primaryKeyword: "how to floss",
    secondaryKeywords: ["proper flossing technique", "flossing tips", "how to floss correctly", "why flossing matters"],
    heroHeading: "How to Floss Correctly",
    heroSubheading: "Your toothbrush only reaches about 60% of your tooth surfaces. Flossing takes care of the rest.",
    introduction:
      "Flossing removes plaque and food particles from between teeth and under the gumline, areas your toothbrush simply cannot reach. Skipping flossing is like washing only 60% of your body in the shower. Despite knowing this, only about 30% of adults floss daily. The most common reason? They were never taught the right technique, so it feels awkward and painful. This guide makes it simple.",
    steps: [
      {
        title: "Break Off the Right Amount",
        content: "Pull out about 18 inches (45 cm) of floss. This sounds like a lot, but you need a fresh section for each gap between teeth. Wind most of the floss around the middle finger of one hand and a small amount around the middle finger of the other hand. This leaves your index fingers and thumbs free to guide the floss.",
      },
      {
        title: "Hold the Floss Correctly",
        content: "Pinch the floss between your thumbs and index fingers, leaving about 1-2 inches of floss between them. This short section gives you control. Too much slack makes it hard to maneuver and more likely to snap into your gums.",
        tip: "If traditional floss is difficult, try floss picks, a water flosser, or interdental brushes. Any method is better than no method.",
      },
      {
        title: "Guide Gently Between Teeth",
        content: "Slide the floss gently between teeth using a zigzag motion. Do not snap or force it down, as this can cut your gums. If the space is tight, work the floss back and forth gently until it slides through.",
      },
      {
        title: "Curve Around Each Tooth",
        content: "This is the key step most people miss. Once the floss is between two teeth, curve it into a C-shape against one tooth. Slide it gently up and down along the side of the tooth, going slightly under the gumline. Then curve it against the other tooth and repeat.",
        tip: "Each gap between teeth has two surfaces to clean. Do not just pop the floss in and out.",
      },
      {
        title: "Use a Fresh Section Each Time",
        content: "As you move from gap to gap, unwind a fresh section of floss from one finger and wind the used section onto the other. Using the same section just transfers bacteria from one area to another.",
      },
      {
        title: "Do Not Forget the Back Teeth",
        content: "The back of your last molar on each side needs flossing too. Curve the floss around the back surface and clean it the same way. This area is often missed and is a common spot for gum disease to start.",
      },
    ],
    commonMistakes: [
      { mistake: "Snapping floss into the gums", correction: "Guide the floss gently with a zigzag motion. Snapping causes pain and gum damage, which makes people avoid flossing." },
      { mistake: "Just popping floss in and out", correction: "Curve the floss into a C-shape and slide it along each tooth surface. The goal is to scrape plaque off the tooth, not just break through the contact point." },
      { mistake: "Stopping because gums bleed", correction: "Bleeding means your gums are inflamed and need more flossing, not less. The bleeding should stop within 1-2 weeks of daily flossing." },
      { mistake: "Flossing too aggressively", correction: "Be gentle. The floss should glide along the tooth surface, not saw into the gum tissue." },
      { mistake: "Only flossing when food is stuck", correction: "Floss daily regardless. Plaque builds up between teeth even when you cannot see or feel it." },
    ],
    keyTakeaways: [
      "Curve the floss into a C-shape around each tooth. This is the technique that makes flossing actually effective.",
      "Floss once daily, ideally before brushing at night. Consistency matters more than perfection.",
      "If your gums bleed when you start flossing, keep going. The bleeding should stop within 1-2 weeks.",
      "Any interdental cleaning method (floss, picks, water flosser) is better than none.",
    ],
    faqs: [
      { question: "Should I floss before or after brushing?", answer: "Floss before brushing. This loosens plaque and food particles so your toothbrush and fluoride toothpaste can reach more surfaces. Studies show this order results in more fluoride staying between teeth." },
      { question: "Are water flossers as good as regular floss?", answer: "Water flossers are effective at removing food particles and reducing gingivitis. They are especially good for people with braces, bridges, or dexterity issues. Some studies show they are comparable to string floss for gum health." },
      { question: "Is it too late to start flossing?", answer: "It is never too late. Even if you have never flossed regularly, starting now will improve your gum health within weeks. Your gums may bleed at first, but this will stop as the inflammation resolves." },
      { question: "My teeth are too tight to floss. What should I do?", answer: "Try waxed floss or PTFE (Glide-type) floss, which slides more easily between tight contacts. If floss still will not fit, interdental brushes or a water flosser are good alternatives." },
    ],
    relatedConditions: [
      { slug: "gum-disease", title: "Gum Disease" },
      { slug: "cavities", title: "Cavities" },
    ],
    relatedSymptoms: [
      { slug: "bleeding-gums", title: "Bleeding Gums" },
      { slug: "bad-breath", title: "Bad Breath" },
    ],
    relatedGuides: [
      { slug: "brushing-guide", title: "How to Brush Your Teeth Properly" },
      { slug: "dental-visit-guide", title: "What to Expect at a Dental Visit" },
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },

  "dental-visit-guide": {
    slug: "dental-visit-guide",
    title: "What to Expect at a Dental Visit: A Complete Guide",
    metaTitle: "What to Expect at a Dental Visit | DentaSmart Guide",
    metaDescription:
      "Nervous about your dental appointment? Learn exactly what happens during a dental visit, what questions to ask, and how to prepare.",
    primaryKeyword: "what to expect at dental visit",
    secondaryKeywords: ["dental appointment", "first dental visit", "dental checkup", "dental anxiety", "questions to ask dentist"],
    heroHeading: "What to Expect at a Dental Visit",
    heroSubheading: "Knowing what to expect takes the anxiety out of dental appointments. Here is a step-by-step walkthrough.",
    introduction:
      "Dental anxiety affects up to 36% of adults, and about 12% have extreme dental fear. One of the biggest contributors to this anxiety is not knowing what to expect. When you understand what happens during a dental visit, why each step matters, and what questions to ask, the experience becomes much less stressful. This guide walks you through a typical dental appointment from start to finish.",
    steps: [
      {
        title: "Before Your Appointment: Prepare",
        content: "Bring your insurance card, a list of medications you take, and any dental records from previous dentists. If you have dental anxiety, call ahead and let the office know. Many practices offer comfort options. If you use DentaSmart, bring your scan history to share with your dentist.",
        tip: "Write down any questions or concerns beforehand. It is easy to forget things once you are in the chair.",
      },
      {
        title: "Medical History Review",
        content: "You will fill out or update a medical history form. Be honest and thorough. Conditions like diabetes, heart disease, and pregnancy affect dental treatment. Medications like blood thinners change how procedures are done. Your dentist needs this information to treat you safely.",
      },
      {
        title: "X-Rays (If Needed)",
        content: "New patients typically get a full set of X-rays. Returning patients may get bitewing X-rays (showing the tops of upper and lower teeth) every 1-2 years. X-rays reveal cavities between teeth, bone loss, infections, and other issues invisible to the naked eye. Modern digital X-rays use very low radiation.",
      },
      {
        title: "Professional Cleaning",
        content: "A dental hygienist will clean your teeth using specialized instruments. Scaling removes hardened plaque (tartar) above and below the gumline. Polishing smooths the tooth surfaces and removes surface stains. Flossing cleans between teeth. The process takes 30-60 minutes depending on how much buildup there is.",
        tip: "If you have not had a cleaning in a while, there may be more tartar to remove, which can take longer and feel more intense. This is normal.",
      },
      {
        title: "Dental Examination",
        content: "Your dentist will examine your teeth, gums, tongue, throat, and jaw. They check for cavities, gum disease, oral cancer signs, bite problems, and the condition of existing dental work. They will review your X-rays and explain any findings. This is your chance to ask questions about anything you have noticed.",
      },
      {
        title: "Treatment Plan Discussion",
        content: "If any issues are found, your dentist will explain what they are, how urgent they are, and what treatment options are available. Ask about costs, timelines, and alternatives. You do not have to agree to treatment on the spot. It is okay to take time to think about it or get a second opinion.",
        tip: "Ask: 'What happens if I wait?' This helps you understand urgency and prioritize treatments if cost is a concern.",
      },
      {
        title: "Scheduling Follow-Up",
        content: "Before you leave, schedule your next appointment. Most people need a cleaning and checkup every 6 months. If treatment was recommended, schedule those appointments too. Putting it on the calendar now makes it much more likely to happen.",
      },
    ],
    commonMistakes: [
      { mistake: "Avoiding the dentist because of anxiety", correction: "Tell your dentist about your anxiety. They can adjust their approach, explain each step, and offer comfort options. Avoiding care only leads to bigger, more stressful problems later." },
      { mistake: "Not asking questions", correction: "Your dentist expects and welcomes questions. Ask about findings, treatment options, costs, and timelines. Understanding your situation reduces anxiety and helps you make better decisions." },
      { mistake: "Agreeing to treatment you do not understand", correction: "Ask your dentist to explain in plain language. Ask what happens if you wait. Get a cost estimate in writing. You have the right to understand and consent to any treatment." },
      { mistake: "Skipping appointments because nothing hurts", correction: "Many dental problems (cavities, gum disease, oral cancer) are painless in early stages. Regular checkups catch them when treatment is simpler and cheaper." },
      { mistake: "Not mentioning medications or health changes", correction: "Always update your dentist on new medications, health conditions, or pregnancies. These can affect treatment decisions and your safety." },
    ],
    keyTakeaways: [
      "A typical dental visit includes a medical history review, X-rays (if needed), professional cleaning, examination, and treatment discussion.",
      "Dental anxiety is common and manageable. Tell your dentist so they can help.",
      "Ask questions, especially about costs and urgency. You do not have to decide on treatment immediately.",
      "Use DentaSmart between visits to monitor your oral health and come to appointments better prepared.",
    ],
    faqs: [
      { question: "How often should I go to the dentist?", answer: "Most people should go every 6 months for a cleaning and checkup. If you have gum disease, are a smoker, or have diabetes, your dentist may recommend every 3-4 months. DentaSmart helps you monitor between visits." },
      { question: "How much does a dental visit cost?", answer: "A routine cleaning and exam typically costs $150-350 without insurance. X-rays add $25-250 depending on the type. Most dental insurance covers preventive visits at 100%." },
      { question: "What if I have not been to the dentist in years?", answer: "That is okay. Your dentist will not judge you. They will do a thorough assessment and create a plan to get your oral health back on track. The first visit may take longer and the cleaning may be more involved." },
      { question: "Can I use DentaSmart results at my dental appointment?", answer: "Yes. Sharing your DentaSmart scan history gives your dentist additional context about changes in your oral health over time. It helps you have a more informed conversation about your care." },
    ],
    relatedConditions: [
      { slug: "cavities", title: "Cavities" },
      { slug: "gum-disease", title: "Gum Disease" },
      { slug: "toothache", title: "Toothache" },
    ],
    relatedSymptoms: [
      { slug: "tooth-pain-when-biting", title: "Tooth Pain When Biting" },
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
};

export const guidesList = Object.values(guidesData);
