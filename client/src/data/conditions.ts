export interface ConditionData {
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
  causes: { title: string; description: string }[];
  symptoms: { text: string; severity: "mild" | "moderate" | "severe" }[];
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

export const conditionsData: Record<string, ConditionData> = {
  toothache: {
    slug: "toothache",
    title: "Toothache: Causes, Relief, and When to See a Dentist",
    metaTitle: "Toothache Causes, Relief & Treatment | DentaSmart",
    metaDescription:
      "Understand what causes toothaches, how to get relief at home, and when you need to see a dentist. Clear, simple guidance from DentaSmart.",
    primaryKeyword: "toothache",
    secondaryKeywords: [
      "tooth pain",
      "toothache causes",
      "toothache relief",
      "tooth pain home remedy",
      "when to see dentist for toothache",
    ],
    heroHeading: "Toothache",
    heroSubheading:
      "A toothache is your body telling you something needs attention. Here is what it could mean and what you can do about it.",
    directAnswer:
      "A toothache is pain in or around a tooth, usually caused by decay, infection, gum disease, or a cracked tooth. Mild pain may respond to over-the-counter pain relievers and saltwater rinses. Severe, persistent, or worsening pain needs professional dental care as soon as possible.",
    detailedExplanation: [
      "Toothaches are one of the most common reasons people seek dental care. The pain can range from a dull, constant ache to sharp, stabbing sensations that make it hard to eat, sleep, or concentrate. Understanding the possible causes helps you decide how urgently you need to act.",
      "The most common cause of toothache is tooth decay (cavities). When bacteria break through the hard outer enamel and reach the softer dentin layer underneath, the tooth becomes sensitive and painful. If decay reaches the pulp (the nerve center of the tooth), the pain becomes severe and may require a root canal.",
      "Other common causes include gum disease (which can cause aching around multiple teeth), cracked or fractured teeth, damaged fillings, teeth grinding (bruxism), and impacted wisdom teeth. Sometimes what feels like a toothache is actually referred pain from a sinus infection or jaw joint problem.",
      "Home remedies can provide temporary relief while you arrange a dental visit. Saltwater rinses (half a teaspoon of salt in warm water) help reduce inflammation. Over-the-counter pain relievers like ibuprofen work well because they reduce both pain and swelling. Applying a cold compress to the outside of your cheek can also help numb the area.",
    ],
    causes: [
      {
        title: "Tooth Decay (Cavities)",
        description:
          "The most common cause. Bacteria produce acid that eats through enamel and dentin, eventually reaching the nerve.",
      },
      {
        title: "Gum Disease",
        description:
          "Infection of the gums can cause aching, throbbing pain around affected teeth, especially when chewing.",
      },
      {
        title: "Cracked or Fractured Tooth",
        description:
          "A crack in the tooth can expose the nerve to temperature changes and pressure, causing sharp pain.",
      },
      {
        title: "Dental Abscess",
        description:
          "A pocket of pus caused by bacterial infection. This is a dental emergency that needs immediate treatment.",
      },
      {
        title: "Impacted Wisdom Teeth",
        description:
          "Wisdom teeth that cannot fully emerge can push against other teeth and cause pain in the back of the mouth.",
      },
      {
        title: "Teeth Grinding (Bruxism)",
        description:
          "Grinding or clenching, especially at night, can cause tooth pain, jaw soreness, and headaches.",
      },
    ],
    symptoms: [
      { text: "Dull, constant ache in or around a tooth", severity: "mild" },
      { text: "Sharp pain when biting or chewing", severity: "moderate" },
      { text: "Sensitivity to hot, cold, or sweet foods", severity: "mild" },
      { text: "Swelling around the tooth or in the jaw", severity: "severe" },
      { text: "Fever or headache accompanying tooth pain", severity: "severe" },
      { text: "Bad taste in the mouth (possible abscess)", severity: "severe" },
    ],
    whenToSeeDentist: [
      "Pain lasts more than 1-2 days or is getting worse",
      "You have a fever along with tooth pain",
      "There is swelling in your face, jaw, or around the tooth",
      "You have trouble breathing or swallowing",
      "Pain is severe and not controlled by over-the-counter medication",
      "You notice pus or a bad taste coming from the area",
    ],
    keyTakeaways: [
      "Toothaches are usually caused by decay, infection, or damage to the tooth.",
      "Home remedies like saltwater rinses and ibuprofen provide temporary relief, not a cure.",
      "Severe pain, swelling, or fever with a toothache means you need to see a dentist urgently.",
      "Early detection with tools like DentaSmart can catch problems before they become painful emergencies.",
    ],
    faqs: [
      {
        question: "Can a toothache go away on its own?",
        answer:
          "Sometimes the pain may temporarily subside, but the underlying cause (like a cavity or infection) does not heal on its own. If a toothache stops hurting suddenly, it could mean the nerve has died, which actually makes the situation more urgent.",
      },
      {
        question: "What is the fastest way to stop a toothache?",
        answer:
          "Take ibuprofen (which reduces both pain and inflammation), rinse with warm saltwater, and apply a cold compress to the outside of your cheek. These provide temporary relief while you arrange a dental appointment.",
      },
      {
        question: "How much does it cost to treat a toothache?",
        answer:
          "It depends on the cause. A simple filling costs $150-300. A root canal costs $700-1,500. An extraction costs $150-650. Catching problems early with regular monitoring keeps costs lower.",
      },
      {
        question: "Can DentaSmart help diagnose my toothache?",
        answer:
          "DentaSmart can analyze photos and X-rays of the affected area to help you understand what might be causing the pain. It provides a starting point, but you should always see a dentist for a proper diagnosis and treatment.",
      },
    ],
    relatedConditions: [
      { slug: "cavities", title: "Cavities" },
      { slug: "gum-disease", title: "Gum Disease" },
      { slug: "wisdom-teeth-pain", title: "Wisdom Teeth Pain" },
    ],
    relatedSymptoms: [
      { slug: "tooth-pain-when-biting", title: "Tooth Pain When Biting" },
      { slug: "tooth-sensitivity", title: "Tooth Sensitivity" },
      { slug: "jaw-pain", title: "Jaw Pain" },
    ],
    relatedGuides: [
      { slug: "dental-visit-guide", title: "What to Expect at a Dental Visit" },
      { slug: "brushing-guide", title: "How to Brush Your Teeth Properly" },
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },

  cavities: {
    slug: "cavities",
    title: "Cavities: What They Are, How to Spot Them, and What to Do",
    metaTitle: "Cavities: Causes, Symptoms & Treatment | DentaSmart",
    metaDescription:
      "Learn what cavities are, how to spot early signs, and what treatment options are available. Simple, clear guidance from DentaSmart.",
    primaryKeyword: "cavities",
    secondaryKeywords: [
      "tooth decay",
      "cavity symptoms",
      "how to prevent cavities",
      "cavity treatment",
      "filling cost",
    ],
    heroHeading: "Cavities",
    heroSubheading:
      "Cavities are the most common dental problem in the world. The good news is they are preventable and treatable when caught early.",
    directAnswer:
      "A cavity is a permanently damaged area in the hard surface of your tooth that develops into a tiny hole. Cavities are caused by bacteria, frequent snacking, sugary drinks, and poor oral hygiene. Early cavities can sometimes be reversed with fluoride. Once a hole forms, you need a filling from a dentist.",
    detailedExplanation: [
      "Cavities (also called dental caries or tooth decay) happen when bacteria in your mouth produce acids that eat away at your tooth enamel. This process is gradual. It starts with a white spot on the tooth surface where minerals have been lost. At this stage, the damage can still be reversed with fluoride and good oral care.",
      "If the decay continues, it breaks through the enamel and reaches the softer dentin layer. This is when you might start feeling sensitivity or pain. The cavity appears as a brown or black spot, and a small hole may form. At this point, you need a dental filling to repair the damage.",
      "Left untreated, the decay reaches the pulp (nerve) of the tooth, causing severe pain and potentially an infection (abscess). Treatment at this stage requires a root canal or extraction, which is significantly more expensive and uncomfortable than a simple filling.",
      "Prevention is straightforward: brush twice daily with fluoride toothpaste, floss once daily, limit sugary snacks and drinks, and visit your dentist regularly. DentaSmart can help you monitor your teeth between visits and catch early signs of decay before they become painful problems.",
    ],
    causes: [
      {
        title: "Bacteria and Plaque",
        description:
          "Bacteria in your mouth feed on sugars and produce acid. This acid, combined with saliva and food particles, forms plaque that clings to teeth.",
      },
      {
        title: "Frequent Snacking and Sugary Drinks",
        description:
          "Every time you eat or drink something sugary, bacteria produce acid for about 20 minutes. Frequent snacking means constant acid attacks on your teeth.",
      },
      {
        title: "Poor Oral Hygiene",
        description:
          "Not brushing and flossing regularly allows plaque to build up and harden into tartar, which is much harder to remove.",
      },
      {
        title: "Dry Mouth",
        description:
          "Saliva helps wash away food and neutralize acid. Conditions or medications that reduce saliva increase cavity risk.",
      },
      {
        title: "Worn Fillings or Dental Devices",
        description:
          "Old fillings can develop rough edges or gaps where bacteria can accumulate and new decay can start.",
      },
    ],
    symptoms: [
      { text: "White spots on tooth surface (early stage)", severity: "mild" },
      { text: "Brown or black staining on teeth", severity: "moderate" },
      { text: "Sensitivity to sweet, hot, or cold foods", severity: "moderate" },
      { text: "Visible holes or pits in teeth", severity: "severe" },
      { text: "Pain when biting down", severity: "moderate" },
      { text: "Spontaneous toothache without obvious trigger", severity: "severe" },
    ],
    whenToSeeDentist: [
      "You notice a dark spot or hole in a tooth",
      "You have persistent sensitivity to sweets, hot, or cold",
      "You experience pain when biting or chewing",
      "A toothache develops and does not go away",
      "You have not had a dental checkup in over 6 months",
    ],
    keyTakeaways: [
      "Cavities start small and painless. By the time they hurt, they are already advanced.",
      "Early-stage cavities (white spots) can sometimes be reversed with fluoride treatment.",
      "A simple filling costs $150-300. Waiting can turn it into a $700-1,500 root canal.",
      "Regular monitoring with DentaSmart helps catch decay before it becomes a painful, expensive problem.",
    ],
    faqs: [
      {
        question: "How do I know if I have a cavity?",
        answer:
          "Early cavities often have no symptoms. As they grow, you may notice sensitivity to sweets or temperature, visible dark spots, or holes in teeth. DentaSmart can detect early signs in photos and X-rays before you feel anything.",
      },
      {
        question: "Can I reverse a cavity?",
        answer:
          "Only at the very earliest stage (white spot lesion) before a hole has formed. Fluoride toothpaste, fluoride treatments, and good hygiene can help remineralize the enamel. Once a hole forms, you need a filling.",
      },
      {
        question: "How long does a filling take?",
        answer:
          "A typical filling appointment takes 30-60 minutes. The procedure is done under local anesthesia, so you should not feel pain during the process. You can usually eat normally within a few hours.",
      },
      {
        question: "Are some people more prone to cavities?",
        answer:
          "Yes. Genetics, saliva composition, diet, oral hygiene habits, and even the shape of your teeth all play a role. Some people are more cavity-prone despite good habits, which makes regular monitoring even more important.",
      },
    ],
    relatedConditions: [
      { slug: "toothache", title: "Toothache" },
      { slug: "gum-disease", title: "Gum Disease" },
      { slug: "teeth-whitening", title: "Teeth Whitening" },
    ],
    relatedSymptoms: [
      { slug: "tooth-sensitivity", title: "Tooth Sensitivity" },
      { slug: "tooth-pain-when-biting", title: "Tooth Pain When Biting" },
      { slug: "bad-breath", title: "Bad Breath" },
    ],
    relatedGuides: [
      { slug: "brushing-guide", title: "How to Brush Your Teeth Properly" },
      { slug: "flossing-guide", title: "How to Floss Correctly" },
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },

  "gum-disease": {
    slug: "gum-disease",
    title: "Gum Disease: Signs, Stages, and How to Protect Your Gums",
    metaTitle: "Gum Disease: Signs, Stages & Treatment | DentaSmart",
    metaDescription:
      "Learn about gum disease stages from gingivitis to periodontitis. Understand the signs, causes, and how to protect your gums.",
    primaryKeyword: "gum disease",
    secondaryKeywords: [
      "gingivitis",
      "periodontitis",
      "bleeding gums",
      "gum disease treatment",
      "gum recession",
    ],
    heroHeading: "Gum Disease",
    heroSubheading:
      "Your gums are the foundation of your smile. When they are not healthy, everything else is at risk. Here is what you need to know.",
    directAnswer:
      "Gum disease is an infection of the tissues that hold your teeth in place. It starts as gingivitis (red, swollen, bleeding gums) and can progress to periodontitis (bone loss and tooth loss). It is caused by plaque buildup and is the leading cause of tooth loss in adults. Early-stage gum disease is reversible with proper care.",
    detailedExplanation: [
      "Gum disease (periodontal disease) affects nearly half of adults over 30. It begins when plaque, a sticky film of bacteria, builds up along and under the gumline. If not removed through regular brushing and flossing, plaque hardens into tartar, which can only be removed by a dental professional.",
      "The earliest stage is gingivitis. Your gums may be red, swollen, and bleed easily when you brush or floss. At this stage, the bone and connective tissue that hold teeth in place are not yet affected. Gingivitis is completely reversible with improved oral hygiene and professional cleaning.",
      "If gingivitis is not treated, it can advance to periodontitis. The gums pull away from the teeth, forming pockets that become infected. The body's immune response, combined with bacterial toxins, starts breaking down the bone and connective tissue. Teeth may become loose and eventually need to be removed.",
      "Risk factors include smoking (the most significant), diabetes, hormonal changes, medications that reduce saliva, genetics, and poor nutrition. Regular dental visits and consistent home care are the best defense. DentaSmart helps you monitor gum health between visits by tracking visual changes over time.",
    ],
    causes: [
      {
        title: "Plaque and Tartar Buildup",
        description:
          "The primary cause. Bacteria in plaque produce toxins that irritate the gums and trigger inflammation.",
      },
      {
        title: "Smoking and Tobacco Use",
        description:
          "The single biggest risk factor. Smoking weakens your immune system and makes it harder for gums to heal.",
      },
      {
        title: "Poor Oral Hygiene",
        description:
          "Not brushing and flossing regularly allows plaque to accumulate and harden into tartar.",
      },
      {
        title: "Hormonal Changes",
        description:
          "Pregnancy, menstruation, and menopause can make gums more sensitive and vulnerable to gum disease.",
      },
      {
        title: "Diabetes",
        description:
          "People with diabetes are at higher risk because the condition reduces the body's ability to fight infection.",
      },
    ],
    symptoms: [
      { text: "Red, swollen, or tender gums", severity: "mild" },
      { text: "Bleeding when brushing or flossing", severity: "mild" },
      { text: "Gums pulling away from teeth (recession)", severity: "moderate" },
      { text: "Persistent bad breath", severity: "moderate" },
      { text: "Loose or shifting teeth", severity: "severe" },
      { text: "Changes in how your teeth fit together when you bite", severity: "severe" },
    ],
    whenToSeeDentist: [
      "Your gums bleed regularly when brushing or flossing",
      "You notice your gums pulling away from your teeth",
      "You have persistent bad breath that does not improve",
      "Your teeth feel loose or are shifting position",
      "You notice pus between your teeth and gums",
      "You have pain when chewing",
    ],
    keyTakeaways: [
      "Gum disease is the leading cause of tooth loss in adults, but early stages are completely reversible.",
      "Bleeding gums are not normal. They are usually the first sign of gum disease.",
      "Smoking is the single biggest risk factor for gum disease.",
      "Regular monitoring with DentaSmart helps you track gum health and catch changes early.",
    ],
    faqs: [
      {
        question: "Can gum disease be cured?",
        answer:
          "Gingivitis (early gum disease) is fully reversible with proper brushing, flossing, and professional cleaning. Periodontitis (advanced gum disease) can be managed and controlled, but bone loss cannot be fully reversed.",
      },
      {
        question: "Is gum disease contagious?",
        answer:
          "The bacteria that cause gum disease can be transferred through saliva (kissing, sharing utensils), but having the bacteria does not mean you will develop gum disease. Your immune response and oral hygiene play the biggest roles.",
      },
      {
        question: "How much does gum disease treatment cost?",
        answer:
          "A professional cleaning costs $75-200. Deep cleaning (scaling and root planing) costs $150-350 per quadrant. Gum surgery can cost $500-10,000 depending on severity. Catching it early saves significant money.",
      },
      {
        question: "Can DentaSmart detect gum disease?",
        answer:
          "DentaSmart can identify visual signs of gum inflammation, recession, and changes over time through photo analysis. It helps you monitor your gum health between dental visits, but a dentist is needed for definitive diagnosis.",
      },
    ],
    relatedConditions: [
      { slug: "toothache", title: "Toothache" },
      { slug: "cavities", title: "Cavities" },
      { slug: "wisdom-teeth-pain", title: "Wisdom Teeth Pain" },
    ],
    relatedSymptoms: [
      { slug: "bleeding-gums", title: "Bleeding Gums" },
      { slug: "bad-breath", title: "Bad Breath" },
      { slug: "jaw-pain", title: "Jaw Pain" },
    ],
    relatedGuides: [
      { slug: "flossing-guide", title: "How to Floss Correctly" },
      { slug: "brushing-guide", title: "How to Brush Your Teeth Properly" },
      { slug: "dental-visit-guide", title: "What to Expect at a Dental Visit" },
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },

  "wisdom-teeth-pain": {
    slug: "wisdom-teeth-pain",
    title: "Wisdom Teeth Pain: What to Expect and When to Act",
    metaTitle: "Wisdom Teeth Pain: Causes & Treatment | DentaSmart",
    metaDescription:
      "Understand wisdom teeth pain, impaction, and when removal is necessary. Clear guidance to help you make informed decisions.",
    primaryKeyword: "wisdom teeth pain",
    secondaryKeywords: [
      "impacted wisdom teeth",
      "wisdom tooth removal",
      "wisdom teeth symptoms",
      "wisdom tooth infection",
      "wisdom teeth cost",
    ],
    heroHeading: "Wisdom Teeth Pain",
    heroSubheading:
      "Wisdom teeth can cause real problems when there is not enough room. Here is how to know if yours need attention.",
    directAnswer:
      "Wisdom teeth pain is caused by these third molars emerging (usually between ages 17-25) when there is not enough room in the jaw. Impacted wisdom teeth can cause pain, swelling, infection, and damage to neighboring teeth. Not all wisdom teeth need removal, but those causing problems should be evaluated by a dentist.",
    detailedExplanation: [
      "Wisdom teeth are the last molars to emerge, typically appearing between ages 17 and 25. Most people have four, but some have fewer or none at all. Problems arise when the jaw does not have enough space for them to fully emerge and align properly with the other teeth.",
      "When a wisdom tooth cannot fully emerge, it becomes impacted. It may grow at an angle toward the next tooth, toward the back of the mouth, or even sideways within the jawbone. Impacted wisdom teeth can cause pain, swelling, jaw stiffness, and difficulty opening your mouth.",
      "One of the most common complications is pericoronitis, an infection of the gum tissue around a partially emerged wisdom tooth. Food and bacteria get trapped under the gum flap, causing inflammation, pain, and sometimes a bad taste or smell. This often requires antibiotics and may be a sign that removal is needed.",
      "Not all wisdom teeth need to be removed. If they emerge fully, are positioned correctly, can be cleaned properly, and are not causing problems, they can stay. Your dentist can monitor them with regular X-rays. DentaSmart can help you track changes and understand X-ray findings related to your wisdom teeth.",
    ],
    causes: [
      {
        title: "Impaction",
        description:
          "The tooth cannot fully emerge because there is not enough room in the jaw, causing it to grow at an angle.",
      },
      {
        title: "Pericoronitis (Gum Infection)",
        description:
          "Bacteria get trapped under the gum flap covering a partially emerged wisdom tooth, causing infection and pain.",
      },
      {
        title: "Pressure on Adjacent Teeth",
        description:
          "Emerging wisdom teeth can push against the second molars, causing pain and potential damage.",
      },
      {
        title: "Cyst Formation",
        description:
          "In rare cases, a fluid-filled cyst can form around an impacted wisdom tooth, potentially damaging the jawbone.",
      },
    ],
    symptoms: [
      { text: "Pain or tenderness at the back of the mouth", severity: "mild" },
      { text: "Swollen, red gums behind the last molar", severity: "moderate" },
      { text: "Jaw stiffness or difficulty opening mouth", severity: "moderate" },
      { text: "Bad breath or unpleasant taste", severity: "mild" },
      { text: "Swelling in the jaw or cheek area", severity: "severe" },
      { text: "Fever or difficulty swallowing", severity: "severe" },
    ],
    whenToSeeDentist: [
      "Pain at the back of your mouth lasts more than a few days",
      "You have swelling in your jaw or cheek",
      "You have difficulty opening your mouth fully",
      "You notice a bad taste or smell from the area",
      "You have a fever along with wisdom tooth pain",
      "You feel pressure or shifting in your other teeth",
    ],
    keyTakeaways: [
      "Wisdom teeth problems are common because most jaws do not have room for them.",
      "Not all wisdom teeth need removal. Only those causing problems or at high risk of complications.",
      "Pericoronitis (gum infection around a wisdom tooth) is the most common complication and needs prompt treatment.",
      "Regular X-ray monitoring with DentaSmart helps track wisdom teeth position and catch problems early.",
    ],
    faqs: [
      {
        question: "Do all wisdom teeth need to be removed?",
        answer:
          "No. If your wisdom teeth are fully emerged, properly aligned, healthy, and can be cleaned effectively, they do not need removal. Your dentist can help you decide based on X-rays and examination.",
      },
      {
        question: "How much does wisdom tooth removal cost?",
        answer:
          "Simple extraction costs $150-400 per tooth. Surgical removal of impacted teeth costs $300-800 per tooth. Having all four removed at once under sedation typically costs $1,000-3,000 total.",
      },
      {
        question: "How long is recovery after wisdom tooth removal?",
        answer:
          "Most people recover within 3-5 days for simple extractions and 7-10 days for surgical removal. Swelling peaks at 48-72 hours. Follow your dentist's aftercare instructions carefully to avoid complications.",
      },
      {
        question: "Can DentaSmart help me understand my wisdom teeth X-ray?",
        answer:
          "Yes. DentaSmart can analyze dental X-rays showing your wisdom teeth and explain their position, whether they appear impacted, and if there are signs of problems. This helps you prepare for your dental consultation.",
      },
    ],
    relatedConditions: [
      { slug: "toothache", title: "Toothache" },
      { slug: "gum-disease", title: "Gum Disease" },
      { slug: "cavities", title: "Cavities" },
    ],
    relatedSymptoms: [
      { slug: "jaw-pain", title: "Jaw Pain" },
      { slug: "tooth-pain-when-biting", title: "Tooth Pain When Biting" },
      { slug: "bad-breath", title: "Bad Breath" },
    ],
    relatedGuides: [
      { slug: "dental-visit-guide", title: "What to Expect at a Dental Visit" },
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },

  "teeth-whitening": {
    slug: "teeth-whitening",
    title: "Teeth Whitening: Options, Safety, and What Actually Works",
    metaTitle: "Teeth Whitening: What Works & Is It Safe? | DentaSmart",
    metaDescription:
      "Compare teeth whitening options from strips to professional treatments. Understand what works, what is safe, and what to expect.",
    primaryKeyword: "teeth whitening",
    secondaryKeywords: [
      "teeth whitening options",
      "teeth whitening cost",
      "is teeth whitening safe",
      "teeth whitening at home",
      "professional teeth whitening",
    ],
    heroHeading: "Teeth Whitening",
    heroSubheading:
      "A brighter smile can boost your confidence. Here is what actually works, what is safe, and how to choose the right option.",
    directAnswer:
      "Teeth whitening uses bleaching agents (usually hydrogen peroxide or carbamide peroxide) to lighten tooth color. Professional in-office whitening provides the fastest, most dramatic results. At-home options like whitening strips and custom trays are effective but take longer. Most whitening is safe when used as directed, but it can cause temporary sensitivity.",
    detailedExplanation: [
      "Teeth naturally darken over time due to aging, food and drink stains (coffee, tea, red wine), tobacco use, and certain medications. Whitening treatments work by using peroxide-based agents that penetrate the enamel and break down stain compounds through a chemical reaction called oxidation.",
      "Professional in-office whitening uses higher concentrations of bleaching agents (25-40% hydrogen peroxide) combined with special lights or lasers to accelerate the process. Results are immediate and dramatic, typically lightening teeth 3-8 shades in a single session. The cost ranges from $300 to $1,000.",
      "At-home options include whitening strips (containing 6-14% hydrogen peroxide), custom-fitted trays from your dentist (10-22% carbamide peroxide), and whitening toothpastes (which contain mild abrasives but no bleach). Strips and trays typically show results in 1-2 weeks of consistent use.",
      "Whitening is generally safe but not suitable for everyone. It does not work on crowns, veneers, or fillings. People with sensitive teeth, gum disease, or worn enamel should consult their dentist first. Overuse can damage enamel. DentaSmart can help you assess your tooth color and track whitening progress over time.",
    ],
    causes: [
      {
        title: "Food and Drink Stains",
        description:
          "Coffee, tea, red wine, berries, and dark sauces contain pigments that bind to tooth enamel over time.",
      },
      {
        title: "Tobacco Use",
        description:
          "Tar and nicotine in tobacco create stubborn brown and yellow stains that penetrate enamel.",
      },
      {
        title: "Aging",
        description:
          "Enamel naturally thins with age, revealing the yellowish dentin layer underneath.",
      },
      {
        title: "Medications",
        description:
          "Certain antibiotics (tetracycline), antihistamines, and blood pressure medications can cause tooth discoloration.",
      },
      {
        title: "Fluorosis",
        description:
          "Excessive fluoride during childhood can cause white or brown spots on teeth.",
      },
    ],
    symptoms: [
      { text: "Yellow or brown discoloration of teeth", severity: "mild" },
      { text: "Uneven tooth color (some teeth darker than others)", severity: "mild" },
      { text: "Stains that do not improve with regular brushing", severity: "moderate" },
      { text: "Self-consciousness about smile appearance", severity: "mild" },
    ],
    whenToSeeDentist: [
      "You want professional whitening for the fastest, most reliable results",
      "You have sensitive teeth and want to whiten safely",
      "Your teeth have internal staining (grayish color) that surface whitening cannot fix",
      "You have crowns, veneers, or large fillings on visible teeth",
      "Over-the-counter products are causing pain or sensitivity",
    ],
    keyTakeaways: [
      "Professional whitening is the fastest and most effective option, but at-home strips work well for mild to moderate staining.",
      "Whitening does not work on crowns, veneers, or fillings. Only natural tooth structure responds to bleaching.",
      "Temporary sensitivity is the most common side effect and usually resolves within a few days.",
      "DentaSmart can help you track your tooth color over time and assess whether whitening is right for you.",
    ],
    faqs: [
      {
        question: "How long do whitening results last?",
        answer:
          "Professional whitening results typically last 1-3 years depending on your diet and habits. Touch-up treatments every 6-12 months can maintain results. Avoiding staining foods and drinks helps results last longer.",
      },
      {
        question: "Is teeth whitening safe for enamel?",
        answer:
          "When used as directed, whitening products approved by dental associations are safe. Overuse or misuse can damage enamel. Follow product instructions and consult your dentist if you have concerns.",
      },
      {
        question: "Why are my teeth sensitive after whitening?",
        answer:
          "Whitening agents temporarily open the pores in your enamel, exposing the dentin layer to stimuli. This sensitivity usually resolves within 24-48 hours. Using a sensitivity toothpaste before and after treatment can help.",
      },
      {
        question: "Can DentaSmart help me track whitening progress?",
        answer:
          "Yes. DentaSmart can analyze photos of your teeth over time to help you see color changes and track your whitening progress objectively.",
      },
    ],
    relatedConditions: [
      { slug: "cavities", title: "Cavities" },
      { slug: "gum-disease", title: "Gum Disease" },
      { slug: "toothache", title: "Toothache" },
    ],
    relatedSymptoms: [
      { slug: "tooth-sensitivity", title: "Tooth Sensitivity" },
    ],
    relatedGuides: [
      { slug: "brushing-guide", title: "How to Brush Your Teeth Properly" },
      { slug: "dental-visit-guide", title: "What to Expect at a Dental Visit" },
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },
  "sensitive-teeth": {
    slug: "sensitive-teeth",
    title: "Sensitive Teeth: Why They Hurt and How to Find Relief",
    metaTitle: "Sensitive Teeth Causes & Relief | DentaSmart",
    metaDescription: "Understand why your teeth are sensitive to hot, cold, or sweet foods. Learn the common causes, home remedies, and when to see a dentist for lasting relief.",
    primaryKeyword: "sensitive teeth",
    secondaryKeywords: ["tooth sensitivity causes", "sensitive teeth treatment", "why do my teeth hurt with cold", "dentin hypersensitivity"],
    heroHeading: "Sensitive teeth are trying to tell you something.",
    heroSubheading: "That sharp jolt when you eat ice cream or sip hot coffee is not normal. Here is what causes it and how to make it stop.",
    directAnswer: "Sensitive teeth happen when the protective enamel wears thin or gums recede, exposing the softer dentin layer underneath. This dentin contains tiny tubes that lead to the nerve, so hot, cold, sweet, or acidic foods trigger a sharp, sudden pain. Most sensitivity can be managed with desensitizing toothpaste and gentle brushing habits, but persistent pain should be checked by a dentist.",
    detailedExplanation: [
      "Your teeth have a built-in defense system. The outer enamel layer is the hardest substance in your body, and it shields the sensitive inner layers from temperature and pressure. Below the enamel sits dentin, a porous layer filled with microscopic tubes that connect directly to the nerve inside your tooth.",
      "When enamel thins or gums pull back, those tubes become exposed. Every sip of cold water, every bite of something sweet sends a signal straight to the nerve. That is the sharp, sudden pain you feel. It is your tooth telling you that its protective barrier has been compromised.",
      "Sensitivity can develop gradually over months or appear suddenly after a dental procedure. Either way, it is a signal worth paying attention to. The earlier you address it, the simpler the fix tends to be."
    ],
    causes: [
      { title: "Enamel erosion", description: "Acidic foods, aggressive brushing, or grinding can wear down enamel over time, exposing the dentin underneath." },
      { title: "Gum recession", description: "When gums pull away from teeth, the root surface becomes exposed. Roots do not have enamel protection, making them highly sensitive." },
      { title: "Tooth grinding (bruxism)", description: "Clenching or grinding wears down enamel and can cause micro-cracks that let temperature changes reach the nerve." },
      { title: "Whitening products", description: "Some whitening treatments temporarily increase sensitivity by penetrating the enamel to reach the dentin." },
      { title: "Cracked or chipped teeth", description: "Even small cracks can create pathways for hot and cold to reach the nerve directly." },
      { title: "Recent dental work", description: "Fillings, crowns, or cleanings can temporarily irritate the nerve, causing sensitivity that usually resolves within a few weeks." }
    ],
    symptoms: [
      { text: "Sharp pain when eating or drinking hot or cold items", severity: "moderate" },
      { text: "Discomfort when eating sweet or acidic foods", severity: "mild" },
      { text: "Pain when breathing in cold air", severity: "mild" },
      { text: "Sensitivity when brushing or flossing certain teeth", severity: "moderate" },
      { text: "Lingering pain after the trigger is removed", severity: "severe" }
    ],
    whenToSeeDentist: [
      "Sensitivity lasts more than a few weeks despite using desensitizing toothpaste",
      "Pain is severe or keeps you from eating normally",
      "You notice a visible crack, chip, or dark spot on the sensitive tooth",
      "Sensitivity appeared suddenly without an obvious cause",
      "You also have swelling, bleeding gums, or a bad taste in your mouth"
    ],
    keyTakeaways: [
      "Sensitive teeth are common and usually treatable. You do not have to live with the pain.",
      "Switching to a soft-bristled brush and desensitizing toothpaste is often the first step to relief.",
      "Persistent or worsening sensitivity should be checked by a dentist to rule out cracks, decay, or gum disease."
    ],
    faqs: [
      { question: "Can sensitive teeth heal on their own?", answer: "Mild sensitivity from temporary causes like whitening or a recent dental procedure often resolves on its own within a few weeks. However, sensitivity from enamel erosion or gum recession typically needs treatment because those changes do not reverse naturally." },
      { question: "Is sensitivity a sign of a cavity?", answer: "It can be. Cavities expose the inner layers of your tooth, which causes sensitivity. If your sensitivity is focused on one specific tooth and getting worse, it is worth having a dentist check for decay." },
      { question: "Does desensitizing toothpaste actually work?", answer: "Yes, for many people. These toothpastes contain compounds that block the tiny tubes in dentin, reducing the signals that reach the nerve. They usually take 2 to 4 weeks of consistent use to show results." },
      { question: "Can DentaSmart help me understand my tooth sensitivity?", answer: "DentaSmart can help you track your symptoms, identify patterns, and understand possible causes. While it does not replace a dental exam, it gives you a clear starting point for a conversation with your dentist." }
    ],
    relatedConditions: [
      { slug: "cavities", title: "Cavities" },
      { slug: "gum-disease", title: "Gum Disease" },
      { slug: "cracked-tooth", title: "Cracked Tooth" }
    ],
    relatedSymptoms: [
      { slug: "tooth-pain-when-biting", title: "Tooth Pain When Biting" },
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
  "cracked-tooth": {
    slug: "cracked-tooth",
    title: "Cracked Tooth: Types, Symptoms, and What to Do Next",
    metaTitle: "Cracked Tooth Symptoms & Treatment | DentaSmart",
    metaDescription: "Learn about the different types of cracked teeth, what symptoms to watch for, and when you need to see a dentist. Clear guidance for a stressful situation.",
    primaryKeyword: "cracked tooth",
    secondaryKeywords: ["cracked tooth symptoms", "fractured tooth treatment", "hairline crack in tooth", "craze lines teeth"],
    heroHeading: "A cracked tooth does not always mean the worst.",
    heroSubheading: "Some cracks are harmless. Others need fast attention. Here is how to tell the difference and what to do next.",
    directAnswer: "A cracked tooth can range from a harmless surface craze line to a deep fracture that threatens the tooth. Symptoms often include sharp pain when biting, sensitivity to temperature, and intermittent discomfort that comes and goes. Treatment depends on the type and depth of the crack, from simple bonding for minor cracks to crowns or root canals for deeper ones. See a dentist promptly if you suspect a crack, because early treatment usually saves the tooth.",
    detailedExplanation: [
      "Teeth are incredibly strong, but they are not indestructible. Years of chewing, grinding, temperature changes, and the occasional hard food can create cracks that range from cosmetic to serious.",
      "The tricky thing about cracked teeth is that they do not always show up on X-rays, and the pain can be inconsistent. You might feel a sharp jolt when you bite down on something, then nothing for days. This on-and-off pattern is actually a hallmark of cracked teeth.",
      "Not all cracks are emergencies. Craze lines, those tiny vertical lines you can see on the surface of most adult teeth, are purely cosmetic and need no treatment. But deeper cracks that extend into the dentin or pulp need professional attention before they worsen."
    ],
    causes: [
      { title: "Biting hard objects", description: "Ice, hard candy, popcorn kernels, and pen caps are common culprits. One wrong bite can crack a healthy tooth." },
      { title: "Teeth grinding (bruxism)", description: "Chronic grinding puts enormous pressure on teeth, especially molars, creating stress fractures over time." },
      { title: "Large fillings", description: "Teeth with large fillings have less natural structure to absorb force, making them more vulnerable to cracking." },
      { title: "Age", description: "Teeth naturally become more brittle with age. Most cracked teeth occur in people over 50." },
      { title: "Sudden temperature changes", description: "Eating something very hot followed immediately by something very cold can stress the enamel and cause cracks." },
      { title: "Trauma or injury", description: "A fall, sports injury, or car accident can crack teeth, sometimes without immediate symptoms." }
    ],
    symptoms: [
      { text: "Sharp pain when biting or chewing that comes and goes", severity: "moderate" },
      { text: "Sensitivity to hot, cold, or sweet foods", severity: "moderate" },
      { text: "Pain that appears and disappears unpredictably", severity: "mild" },
      { text: "Swelling of the gum around the affected tooth", severity: "severe" },
      { text: "A visible line or chip on the tooth surface", severity: "mild" }
    ],
    whenToSeeDentist: [
      "You feel a sharp pain when biting that keeps coming back",
      "A piece of your tooth has broken off",
      "You notice swelling around a specific tooth",
      "The pain is getting worse over days or weeks",
      "You had a recent injury to your face or jaw"
    ],
    keyTakeaways: [
      "Not all cracks are serious. Craze lines are cosmetic and harmless, but deeper cracks need professional care.",
      "The on-and-off pain pattern is a classic sign of a cracked tooth. Do not ignore it just because it goes away.",
      "Early treatment usually saves the tooth. Waiting too long can turn a simple fix into an extraction."
    ],
    faqs: [
      { question: "Can a cracked tooth heal on its own?", answer: "No. Unlike bones, teeth cannot repair themselves. A crack will not get better without treatment, and it can get worse over time as bacteria enter the crack and cause infection." },
      { question: "How can I tell if my tooth is cracked or just sensitive?", answer: "Cracked teeth typically cause sharp, sudden pain when you bite down or release, and the pain tends to come and go. General sensitivity is usually triggered by temperature and affects a broader area. A dentist can use special tests and dyes to confirm a crack." },
      { question: "Will a cracked tooth always need a crown?", answer: "Not always. Minor cracks may only need bonding or a filling. Deeper cracks that reach the pulp may need a root canal and crown. Your dentist will recommend the least invasive option that protects the tooth long-term." },
      { question: "Can DentaSmart detect a cracked tooth?", answer: "DentaSmart can help you identify symptoms that suggest a cracked tooth and guide you on urgency. However, cracked teeth often require hands-on dental examination with special tools, so a dentist visit is important for confirmation." }
    ],
    relatedConditions: [
      { slug: "toothache", title: "Toothache" },
      { slug: "sensitive-teeth", title: "Sensitive Teeth" },
      { slug: "dental-abscess", title: "Dental Abscess" }
    ],
    relatedSymptoms: [
      { slug: "tooth-pain-when-biting", title: "Tooth Pain When Biting" },
      { slug: "jaw-pain", title: "Jaw Pain" }
    ],
    relatedGuides: [
      { slug: "dental-visit-guide", title: "What to Expect at a Dental Visit" }
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },
  "dental-abscess": {
    slug: "dental-abscess",
    title: "Dental Abscess: Signs, Risks, and When to Get Help Fast",
    metaTitle: "Dental Abscess Symptoms & Treatment | DentaSmart",
    metaDescription: "A dental abscess is a serious infection that needs prompt attention. Learn the warning signs, what causes it, and why you should not wait to see a dentist.",
    primaryKeyword: "dental abscess",
    secondaryKeywords: ["tooth abscess symptoms", "abscessed tooth treatment", "tooth infection signs", "periapical abscess"],
    heroHeading: "A dental abscess is your body asking for help.",
    heroSubheading: "This is one situation where waiting is not an option. Here is what you need to know and what to do right now.",
    directAnswer: "A dental abscess is a pocket of pus caused by a bacterial infection in or around a tooth. It typically causes throbbing pain, swelling, fever, and a bad taste in the mouth. Abscesses do not go away on their own and can spread to other parts of the body if left untreated. This is a dental emergency that requires professional treatment, usually drainage of the infection and antibiotics.",
    detailedExplanation: [
      "When bacteria get inside a tooth through a deep cavity, crack, or gum pocket, your body fights back by sending white blood cells to the area. The battle between bacteria and your immune system creates pus, and when that pus has nowhere to drain, it forms an abscess.",
      "There are two main types. A periapical abscess forms at the tip of the tooth root, usually from an untreated cavity or crack. A periodontal abscess forms in the gum tissue, often related to gum disease. Both are serious and both need professional treatment.",
      "The pain from an abscess can be intense, throbbing, and constant. Some people describe it as the worst toothache they have ever had. But here is the important part: sometimes the pain suddenly stops. That does not mean the infection is gone. It may mean the abscess has ruptured, which provides temporary relief but allows the infection to spread."
    ],
    causes: [
      { title: "Untreated cavities", description: "When decay reaches the inner pulp of the tooth, bacteria can infect the nerve and create an abscess at the root tip." },
      { title: "Cracked or broken teeth", description: "Cracks give bacteria a direct path to the inner tooth, bypassing the protective enamel layer." },
      { title: "Advanced gum disease", description: "Deep gum pockets trap bacteria against the tooth root, leading to periodontal abscesses." },
      { title: "Failed dental work", description: "Old fillings or crowns that develop gaps can allow bacteria to re-enter the tooth." },
      { title: "Weakened immune system", description: "Conditions like diabetes or medications that suppress immunity can make you more susceptible to dental infections." }
    ],
    symptoms: [
      { text: "Severe, throbbing toothache that may radiate to the jaw, ear, or neck", severity: "severe" },
      { text: "Swelling in the face, cheek, or under the jaw", severity: "severe" },
      { text: "Fever and general feeling of being unwell", severity: "severe" },
      { text: "Foul taste in the mouth or sudden rush of salty fluid", severity: "moderate" },
      { text: "Sensitivity to pressure, hot, and cold", severity: "moderate" },
      { text: "Swollen, red lymph nodes under the jaw or in the neck", severity: "severe" }
    ],
    whenToSeeDentist: [
      "You have facial swelling, especially if it is spreading or affecting your eye or throat",
      "You have a fever along with tooth pain",
      "You have difficulty breathing or swallowing",
      "The pain is severe and not responding to over-the-counter pain medication",
      "You notice a pimple-like bump on your gum that may be draining pus"
    ],
    keyTakeaways: [
      "A dental abscess is a serious infection that will not resolve on its own. Professional treatment is essential.",
      "If pain suddenly stops without treatment, the abscess may have ruptured. You still need to see a dentist urgently.",
      "Prevention is the best approach. Regular dental visits and treating cavities early can prevent most abscesses."
    ],
    faqs: [
      { question: "Can I treat a dental abscess at home?", answer: "No. While salt water rinses and over-the-counter pain medication can provide temporary relief, they cannot cure the infection. A dental abscess requires professional drainage and often antibiotics. Delaying treatment can lead to the infection spreading to your jaw, head, neck, or even your bloodstream." },
      { question: "How long can you have an abscess before it becomes dangerous?", answer: "An abscess can become dangerous within days. If you develop facial swelling, fever, difficulty breathing or swallowing, or the swelling spreads to your eye area, go to an emergency room immediately. These are signs the infection is spreading." },
      { question: "Will antibiotics alone cure a dental abscess?", answer: "Antibiotics help control the infection, but they cannot eliminate the source. The abscess needs to be drained, and the underlying cause (cavity, crack, or gum disease) needs to be treated. Without addressing the source, the infection will return." },
      { question: "Can DentaSmart help identify an abscess?", answer: "DentaSmart can help you recognize symptoms that suggest an abscess and understand the urgency. If our AI analysis flags signs of infection, we will recommend you see a dentist immediately. This is one situation where speed matters." }
    ],
    relatedConditions: [
      { slug: "toothache", title: "Toothache" },
      { slug: "gum-disease", title: "Gum Disease" },
      { slug: "cracked-tooth", title: "Cracked Tooth" }
    ],
    relatedSymptoms: [
      { slug: "tooth-pain-when-biting", title: "Tooth Pain When Biting" },
      { slug: "jaw-pain", title: "Jaw Pain" },
      { slug: "bad-breath", title: "Bad Breath" }
    ],
    relatedGuides: [
      { slug: "dental-visit-guide", title: "What to Expect at a Dental Visit" }
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },
  "root-canal": {
    slug: "root-canal",
    title: "Root Canal: What It Is, When You Need One, and What to Expect",
    metaTitle: "Root Canal Treatment Explained | DentaSmart",
    metaDescription: "Worried about a root canal? Learn what the procedure involves, why it is needed, and why modern root canals are much less scary than their reputation suggests.",
    primaryKeyword: "root canal",
    secondaryKeywords: ["root canal treatment", "root canal procedure", "do I need a root canal", "root canal pain"],
    heroHeading: "Root canals have a bad reputation they do not deserve.",
    heroSubheading: "Modern root canals are routine, effective, and far less painful than the toothache that leads to them. Here is what actually happens.",
    directAnswer: "A root canal is a procedure that removes infected or damaged tissue from inside a tooth, saving the tooth from extraction. The dentist removes the pulp (nerve and blood vessels), cleans and shapes the inside of the tooth, then fills and seals it. With modern techniques and anesthesia, most patients report the procedure feels similar to getting a filling. The tooth is then usually protected with a crown.",
    detailedExplanation: [
      "Inside every tooth is a soft tissue called pulp that contains nerves, blood vessels, and connective tissue. When this pulp becomes infected or inflamed due to deep decay, repeated dental procedures, cracks, or trauma, a root canal is often the best way to save the tooth.",
      "The procedure itself is straightforward. Your dentist numbs the area, creates a small opening in the top of the tooth, removes the infected pulp, cleans and shapes the canals inside the roots, then fills them with a biocompatible material. The whole process usually takes one to two visits.",
      "The biggest misconception about root canals is that they are extremely painful. In reality, the procedure relieves pain. The toothache you feel before the root canal is caused by the infection. Once that infection is removed, the pain goes away. Most patients say the procedure itself felt no worse than getting a filling."
    ],
    causes: [
      { title: "Deep decay", description: "When a cavity goes untreated long enough to reach the pulp, bacteria infect the nerve tissue inside the tooth." },
      { title: "Repeated dental procedures", description: "Multiple fillings or other work on the same tooth can irritate the pulp over time, eventually causing inflammation." },
      { title: "Cracks or chips", description: "A crack that extends into the pulp gives bacteria direct access to the nerve, often leading to infection." },
      { title: "Trauma", description: "A blow to a tooth can damage the pulp even if the tooth looks fine on the outside. Symptoms may appear weeks or years later." },
      { title: "Large fillings", description: "Very large fillings leave less natural tooth structure, and the remaining tooth may not adequately protect the pulp." }
    ],
    symptoms: [
      { text: "Severe, persistent toothache, especially when chewing or applying pressure", severity: "severe" },
      { text: "Prolonged sensitivity to hot or cold that lingers after the source is removed", severity: "moderate" },
      { text: "Darkening or discoloration of the tooth", severity: "moderate" },
      { text: "Swelling and tenderness in nearby gums", severity: "severe" },
      { text: "A persistent pimple on the gums near the affected tooth", severity: "moderate" }
    ],
    whenToSeeDentist: [
      "You have a toothache that does not go away with over-the-counter pain medication",
      "A tooth has become noticeably darker than the teeth around it",
      "You have swelling in your face or gums",
      "You notice a bump or pimple on your gum that keeps coming back",
      "You have prolonged sensitivity to hot or cold that lasts minutes, not seconds"
    ],
    keyTakeaways: [
      "A root canal saves your natural tooth. Keeping your own tooth is almost always better than replacing it.",
      "Modern root canals are routine and comfortable. The procedure relieves pain rather than causing it.",
      "After a root canal, your tooth will need a crown to protect it long-term. Follow through with this step."
    ],
    faqs: [
      { question: "Is a root canal painful?", answer: "With modern anesthesia, most patients feel little to no pain during the procedure. Many say it is comparable to getting a filling. The pain you feel before the root canal, from the infected tooth, is usually much worse than the procedure itself." },
      { question: "How long does a root canal take?", answer: "Most root canals take 60 to 90 minutes and can be completed in one visit. More complex cases, like molars with multiple canals, may require a second visit." },
      { question: "What happens if I do not get a root canal?", answer: "The infection will not go away on its own. Without treatment, it can spread to surrounding bone and tissue, form an abscess, and eventually lead to tooth loss. In rare cases, untreated dental infections can become life-threatening." },
      { question: "Can DentaSmart tell me if I need a root canal?", answer: "DentaSmart can help you identify symptoms that suggest you may need a root canal and understand the urgency. However, only a dentist can confirm the diagnosis with X-rays and clinical testing." }
    ],
    relatedConditions: [
      { slug: "toothache", title: "Toothache" },
      { slug: "dental-abscess", title: "Dental Abscess" },
      { slug: "dental-crown", title: "Dental Crown" }
    ],
    relatedSymptoms: [
      { slug: "tooth-pain-when-biting", title: "Tooth Pain When Biting" },
      { slug: "tooth-sensitivity", title: "Tooth Sensitivity" }
    ],
    relatedGuides: [
      { slug: "dental-visit-guide", title: "What to Expect at a Dental Visit" }
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },
  "dental-crown": {
    slug: "dental-crown",
    title: "Dental Crowns: Types, Process, and What to Know Before You Get One",
    metaTitle: "Dental Crowns Guide & What to Expect | DentaSmart",
    metaDescription: "Considering a dental crown? Learn about the different types, what the process involves, how long they last, and how to take care of them.",
    primaryKeyword: "dental crown",
    secondaryKeywords: ["dental crown types", "tooth crown procedure", "how long do dental crowns last", "crown vs filling"],
    heroHeading: "A crown gives your tooth a second chance.",
    heroSubheading: "When a filling is not enough but extraction is too much, a crown restores your tooth to full strength. Here is everything you need to know.",
    directAnswer: "A dental crown is a custom-made cap that covers a damaged or weakened tooth, restoring its shape, size, strength, and appearance. Crowns are recommended when a tooth is too damaged for a filling but healthy enough to save. They are made from materials like porcelain, ceramic, metal, or a combination. The process typically takes two visits, and a well-maintained crown can last 10 to 15 years or longer.",
    detailedExplanation: [
      "Think of a crown as a protective helmet for your tooth. When a tooth has been weakened by a large cavity, a crack, a root canal, or significant wear, a filling alone may not provide enough support. A crown covers the entire visible portion of the tooth above the gum line, holding everything together.",
      "The process starts with your dentist reshaping the tooth to make room for the crown. They take impressions or digital scans, which are sent to a lab where your crown is custom-made to match your other teeth. You wear a temporary crown while the permanent one is being made, which usually takes one to two weeks.",
      "Modern crowns look and feel remarkably natural. Porcelain and ceramic crowns can be color-matched to blend perfectly with your surrounding teeth. Most people cannot tell the difference between a crowned tooth and a natural one."
    ],
    causes: [
      { title: "After a root canal", description: "A tooth that has had a root canal loses its blood supply and becomes more brittle. A crown protects it from cracking." },
      { title: "Large cavities", description: "When decay destroys more than half the tooth structure, a filling may not hold. A crown provides full coverage and strength." },
      { title: "Cracked or fractured teeth", description: "A crown holds the pieces of a cracked tooth together and prevents the crack from spreading further." },
      { title: "Worn-down teeth", description: "Grinding, acid erosion, or age can wear teeth down significantly. Crowns restore the original shape and function." },
      { title: "Cosmetic improvement", description: "Crowns can improve the appearance of severely discolored, misshapen, or poorly aligned teeth." }
    ],
    symptoms: [
      { text: "Pain or sensitivity in a crowned tooth, especially when biting", severity: "moderate" },
      { text: "A crown that feels loose or wobbly", severity: "moderate" },
      { text: "Dark line at the gum line of an older crown", severity: "mild" },
      { text: "Chipped or cracked crown material", severity: "moderate" },
      { text: "Recurring decay at the margin where crown meets tooth", severity: "severe" }
    ],
    whenToSeeDentist: [
      "Your crown feels loose, moves, or falls off",
      "You feel pain when biting on a crowned tooth",
      "You notice a gap between the crown and your gum line",
      "The crown chips, cracks, or breaks",
      "You have persistent sensitivity or a bad taste around the crowned tooth"
    ],
    keyTakeaways: [
      "A crown saves a damaged tooth that would otherwise need extraction. It is an investment in keeping your natural tooth.",
      "Modern crowns look natural and can last 10 to 15 years or more with proper care.",
      "Good oral hygiene around crowned teeth is essential. Crowns protect the top, but the tooth underneath can still develop decay at the margins."
    ],
    faqs: [
      { question: "How long do dental crowns last?", answer: "With good oral hygiene and regular dental visits, most crowns last 10 to 15 years. Some last 25 years or more. The lifespan depends on the material, your bite forces, and how well you care for the tooth." },
      { question: "Does getting a crown hurt?", answer: "The procedure is done under local anesthesia, so you should not feel pain during the appointment. Some patients experience mild sensitivity or discomfort for a few days after, which is normal and usually resolves quickly." },
      { question: "Crown or filling, how do I know which I need?", answer: "Generally, if more than half the tooth structure is damaged or missing, a crown provides better long-term protection. If the damage is smaller and the remaining tooth is strong, a filling may be sufficient. Your dentist will recommend the best option based on your specific situation." },
      { question: "Can DentaSmart help me understand if I need a crown?", answer: "DentaSmart can help you assess the condition of your teeth and understand when a crown might be recommended. Our AI analysis can identify signs of significant damage that typically warrant a crown, giving you useful context before your dental visit." }
    ],
    relatedConditions: [
      { slug: "root-canal", title: "Root Canal" },
      { slug: "cracked-tooth", title: "Cracked Tooth" },
      { slug: "cavities", title: "Cavities" }
    ],
    relatedSymptoms: [
      { slug: "tooth-pain-when-biting", title: "Tooth Pain When Biting" },
      { slug: "tooth-sensitivity", title: "Tooth Sensitivity" }
    ],
    relatedGuides: [
      { slug: "dental-visit-guide", title: "What to Expect at a Dental Visit" }
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },
  "teeth-grinding": {
    slug: "teeth-grinding",
    title: "Teeth Grinding (Bruxism): Causes, Damage, and How to Stop",
    metaTitle: "Teeth Grinding (Bruxism): Causes & Treatment | DentaSmart",
    metaDescription: "Grinding your teeth at night? Learn what causes bruxism, the damage it can do, and practical ways to protect your teeth and jaw.",
    primaryKeyword: "teeth grinding",
    secondaryKeywords: ["bruxism treatment", "grinding teeth at night", "jaw clenching causes", "night guard for teeth"],
    heroHeading: "Teeth grinding happens silently. The damage does not.",
    heroSubheading: "Most people who grind their teeth do not even know it. But over time, the wear and tear adds up.",
    directAnswer: "Teeth grinding (bruxism) is the involuntary clenching or grinding of teeth, most commonly during sleep. It affects about 10-15% of adults and can damage teeth, jaw joints, and facial muscles over time. A custom night guard, stress management, and treating underlying causes are the main approaches to stopping it.",
    detailedExplanation: [
      "Teeth grinding, also called bruxism, is a condition where you clench or grind your teeth unconsciously, usually during sleep. Many people do not realize they grind until a partner mentions it or a dentist notices the wear patterns on their teeth.",
      "The most common triggers include stress and anxiety, sleep disorders like sleep apnea, a misaligned bite, certain medications (especially SSRIs), and lifestyle factors like excessive caffeine or alcohol. Because it happens during sleep, the damage can accumulate for months or years before symptoms become noticeable.",
      "Over time, grinding can wear down enamel, crack or chip teeth, cause chronic jaw pain, trigger headaches, and contribute to TMJ disorders. The good news is that treatment is straightforward. A custom night guard protects your teeth while you sleep, and addressing the root cause (stress, sleep disorder, medication) provides long-term improvement.",
      "If you suspect you grind your teeth, DentaSmart can help you monitor changes in your tooth surfaces over time. Tracking these changes gives you useful information to share with your dentist."
    ],
    causes: [
      { title: "Stress and anxiety", description: "Emotional stress is the most common trigger for teeth grinding, especially during sleep when you cannot consciously control jaw muscles." },
      { title: "Sleep disorders", description: "Sleep apnea and other sleep disturbances are strongly linked to nocturnal bruxism." },
      { title: "Misaligned bite", description: "When upper and lower teeth do not fit together properly, the jaw may try to find a comfortable position through grinding." },
      { title: "Medications", description: "Certain antidepressants (SSRIs), stimulants, and recreational drugs can trigger or worsen grinding." },
      { title: "Lifestyle factors", description: "Excessive caffeine, alcohol, and tobacco use are associated with increased grinding." }
    ],
    symptoms: [
      { text: "Worn, flattened, or chipped teeth", severity: "moderate" },
      { text: "Jaw pain or tightness, especially in the morning", severity: "moderate" },
      { text: "Headaches that start at the temples", severity: "mild" },
      { text: "Tooth sensitivity from worn enamel", severity: "moderate" },
      { text: "Disrupted sleep (your partner may hear the grinding)", severity: "mild" },
      { text: "Earache-like pain that is not actually from the ear", severity: "mild" }
    ],

    whenToSeeDentist: [
      "You wake up with jaw pain, headaches, or sore teeth regularly",
      "Your partner tells you they hear you grinding at night",
      "You notice your teeth are getting shorter, flatter, or more sensitive",
      "You have difficulty opening or closing your mouth fully"
    ],
    keyTakeaways: [
      "Teeth grinding often happens during sleep, so you may not know you are doing it until damage appears.",
      "A custom night guard is the most effective way to protect your teeth from grinding damage.",
      "Addressing the root cause (stress, sleep disorder, medication) is key to long-term improvement."
    ],
    faqs: [
      { question: "How do I know if I grind my teeth at night?", answer: "Common signs include waking up with jaw pain or headaches, noticing worn or flattened teeth, or having a partner who hears the grinding. DentaSmart can help you monitor changes in your tooth surfaces over time." },
      { question: "Can teeth grinding cause permanent damage?", answer: "Yes. Chronic grinding can wear down enamel, crack teeth, damage dental work, and contribute to TMJ disorders. Early intervention with a night guard can prevent most of this damage." },
      { question: "Do over-the-counter night guards work?", answer: "Store-bought guards provide some protection but do not fit as well as custom-made ones. A poorly fitting guard can sometimes make jaw problems worse. A dentist-made guard is recommended for regular grinders." }
    ],
    relatedConditions: [
      { slug: "cracked-tooth", title: "Cracked Tooth" },
      { slug: "sensitive-teeth", title: "Sensitive Teeth" }
    ],
    relatedSymptoms: [
      { slug: "jaw-pain", title: "Jaw Pain" },
      { slug: "tooth-pain-when-biting", title: "Tooth Pain When Biting" },
      { slug: "tooth-sensitivity", title: "Tooth Sensitivity" }
    ],
    relatedGuides: [
      { slug: "dental-visit-guide", title: "What to Expect at a Dental Visit" }
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },
  "dental-implants": {
    slug: "dental-implants",
    title: "Dental Implants: What to Know Before, During, and After",
    metaTitle: "Dental Implants Guide: Cost, Process & Recovery | DentaSmart",
    metaDescription: "Considering dental implants? Learn about the process, costs, recovery timeline, and how to know if you are a good candidate.",
    primaryKeyword: "dental implants",
    secondaryKeywords: ["dental implant cost", "dental implant procedure", "are dental implants worth it", "implant recovery time"],
    heroHeading: "Dental implants are the closest thing to getting your real teeth back.",
    heroSubheading: "They look natural, feel natural, and can last a lifetime with proper care. Here is everything you need to know.",
    directAnswer: "A dental implant is a titanium post surgically placed into the jawbone to replace a missing tooth root. Once it fuses with the bone, a custom crown is attached on top. Implants are the gold standard for tooth replacement because they preserve jawbone, do not affect neighboring teeth, and can last 20 years or more with good care.",
    detailedExplanation: [
      "Dental implants are the most natural-looking and longest-lasting option for replacing missing teeth. Unlike bridges or dentures, implants replace the tooth root itself, which helps preserve the jawbone and prevents the bone loss that normally happens after a tooth is lost.",
      "The process typically takes several months from start to finish. First, the titanium post is surgically placed into the jawbone. Over the next 3-6 months, the implant fuses with the bone in a process called osseointegration. Once the implant is stable, an abutment (connector) is placed, and finally a custom crown is attached.",
      "Modern implants have a success rate above 95%. They are made from biocompatible titanium that the body accepts naturally. With proper oral hygiene and regular dental checkups, an implant can last a lifetime, though the crown on top may need replacement after 10-15 years.",
      "Not everyone is a candidate for implants. You need adequate jawbone density (though bone grafting can help), healthy gums, and good overall health. Smoking significantly reduces implant success rates. Your dentist can evaluate whether implants are right for you."
    ],
    causes: [
      { title: "Tooth loss from decay", description: "Severe cavities that cannot be saved with a filling, crown, or root canal may require extraction, leaving a gap that an implant can fill." },
      { title: "Gum disease", description: "Advanced periodontitis can destroy the bone supporting teeth, leading to tooth loss. Implants can replace lost teeth once the gum disease is treated." },
      { title: "Trauma or injury", description: "A knocked-out tooth from an accident or sports injury is a common reason for implant placement." },
      { title: "Failed dental work", description: "A bridge or denture that is no longer functional may be replaced with implant-supported options." },
      { title: "Congenitally missing teeth", description: "Some people are born without certain permanent teeth. Implants provide a permanent solution." }
    ],
    symptoms: [
      { text: "Missing one or more teeth", severity: "severe" },
      { text: "Loose or failing dental bridge", severity: "moderate" },
      { text: "Uncomfortable or ill-fitting dentures", severity: "moderate" },
      { text: "Jawbone loss from missing teeth", severity: "severe" },
      { text: "Difficulty chewing or speaking due to missing teeth", severity: "moderate" }
    ],

    whenToSeeDentist: [
      "You are missing one or more teeth and want a permanent replacement",
      "Your dentures are uncomfortable or do not fit well",
      "You have been told you need a tooth extracted",
      "You want to understand your options and costs before deciding"
    ],
    keyTakeaways: [
      "Dental implants are the most natural-looking and longest-lasting tooth replacement option available.",
      "The process takes several months from start to finish, but the results can last a lifetime.",
      "Not everyone is a candidate. Adequate jawbone and good overall health are important factors."
    ],
    faqs: [
      { question: "How much do dental implants cost?", answer: "A single dental implant typically costs between $3,000 and $6,000, including the implant, abutment, and crown. Costs vary by location, complexity, and whether bone grafting is needed. Many dental offices offer payment plans." },
      { question: "Are dental implants painful?", answer: "The procedure is done under local anesthesia, so you should not feel pain during placement. Post-surgery discomfort is usually manageable with over-the-counter pain medication and typically resolves within a few days." },
      { question: "How long do dental implants last?", answer: "With proper care, dental implants can last 20 years or more. The crown on top may need replacement after 10-15 years due to normal wear, but the implant post itself can last a lifetime." }
    ],
    relatedConditions: [
      { slug: "gum-disease", title: "Gum Disease" },
      { slug: "dental-crown", title: "Dental Crown" }
    ],
    relatedSymptoms: [
      { slug: "loose-tooth", title: "Loose Tooth" },
      { slug: "tooth-pain-when-biting", title: "Tooth Pain When Biting" }
    ],
    relatedGuides: [
      { slug: "dental-visit-guide", title: "What to Expect at a Dental Visit" }
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },
  "dry-socket": {
    slug: "dry-socket",
    title: "Dry Socket After Tooth Extraction: Prevention and Treatment",
    metaTitle: "Dry Socket: Causes, Prevention & Treatment | DentaSmart",
    metaDescription: "Worried about dry socket after a tooth extraction? Learn what causes it, how to prevent it, and what to do if it happens.",
    primaryKeyword: "dry socket",
    secondaryKeywords: ["dry socket symptoms", "dry socket after extraction", "alveolar osteitis", "how to prevent dry socket"],
    heroHeading: "Dry socket is the complication everyone worries about after an extraction.",
    heroSubheading: "The good news: it is preventable. And if it does happen, it is treatable. Here is what you need to know.",
    directAnswer: "Dry socket (alveolar osteitis) occurs when the blood clot that forms after a tooth extraction is dislodged or dissolves too early, exposing the underlying bone and nerves. It causes intense pain starting 2-4 days after extraction. It affects about 2-5% of all extractions and up to 30% of wisdom tooth removals. While painful, it is treatable and not dangerous.",
    detailedExplanation: [
      "After a tooth is extracted, a blood clot forms in the empty socket. This clot serves as a protective layer over the bone and nerve endings, and it provides the foundation for new tissue growth. Dry socket happens when this clot is lost too early.",
      "The most common risk factors are smoking (the single biggest risk factor), using straws, spitting forcefully, and difficult extractions. Women taking oral contraceptives also have a higher risk due to hormonal effects on blood clotting.",
      "The hallmark symptom is severe, throbbing pain that starts 2-4 days after extraction and radiates to the ear, eye, or temple. You may also notice visible bone in the socket, bad breath, and an unpleasant taste. Normal post-extraction pain peaks on days 1-2 and improves, while dry socket pain gets worse.",
      "Treatment is straightforward. Your dentist will clean the socket and place a medicated dressing that provides almost immediate relief. The dressing may need to be changed every few days. Complete healing takes about 7-10 days with treatment."
    ],
    causes: [
      { title: "Blood clot dislodgement", description: "Sucking through a straw, spitting forcefully, or smoking can dislodge the protective blood clot from the extraction site." },
      { title: "Smoking", description: "Tobacco use is the single biggest risk factor. The sucking motion and chemicals in smoke both interfere with healing." },
      { title: "Oral contraceptives", description: "High estrogen levels can interfere with normal blood clotting and healing." },
      { title: "Poor oral hygiene", description: "Bacteria around the extraction site can break down the blood clot prematurely." },
      { title: "Difficult extraction", description: "Complicated or traumatic extractions, especially impacted wisdom teeth, have higher rates of dry socket." }
    ],
    symptoms: [
      { text: "Severe, throbbing pain starting 2-4 days after extraction", severity: "severe" },
      { text: "Pain that radiates to the ear, eye, or temple on the same side", severity: "severe" },
      { text: "Visible bone in the empty socket (the clot is missing)", severity: "severe" },
      { text: "Bad breath or unpleasant taste in the mouth", severity: "moderate" },
      { text: "Pain that is not adequately controlled by prescribed pain medication", severity: "severe" }
    ],

    whenToSeeDentist: [
      "You develop severe pain 2-4 days after a tooth extraction",
      "Pain medication is not controlling your discomfort",
      "You can see bone in the extraction site",
      "You have a bad taste or smell coming from the extraction area",
      "You develop a fever after extraction"
    ],
    keyTakeaways: [
      "Dry socket is painful but not dangerous. It is the most common complication after tooth extraction.",
      "Not smoking and avoiding straws are the two most important things you can do to prevent it.",
      "If you develop dry socket, your dentist can provide immediate relief with a medicated dressing."
    ],
    faqs: [
      { question: "How long does dry socket last?", answer: "With treatment, dry socket pain usually improves significantly within 24-48 hours. Complete healing of the socket takes about 7-10 days. Without treatment, the pain can last much longer." },
      { question: "Can dry socket heal on its own?", answer: "Technically yes, but it is very painful and takes much longer without treatment. Seeing your dentist for a medicated dressing provides faster relief and reduces the risk of infection." },
      { question: "How do I know if I have dry socket or normal healing pain?", answer: "Normal post-extraction pain peaks around day 1-2 and gradually improves. Dry socket pain typically starts or worsens on days 2-4 and is much more intense. If you can see bone in the socket or have severe radiating pain, it is likely dry socket." }
    ],
    relatedConditions: [
      { slug: "wisdom-teeth-pain", title: "Wisdom Teeth Pain" },
      { slug: "dental-abscess", title: "Dental Abscess" }
    ],
    relatedSymptoms: [
      { slug: "tooth-pain-when-biting", title: "Tooth Pain When Biting" },
      { slug: "bad-breath", title: "Bad Breath" }
    ],
    relatedGuides: [
      { slug: "dental-visit-guide", title: "What to Expect at a Dental Visit" }
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },
  "oral-thrush": {
    slug: "oral-thrush",
    title: "Oral Thrush: Causes, Symptoms, and Treatment",
    metaTitle: "Oral Thrush: Causes & Treatment Guide | DentaSmart",
    metaDescription: "White patches in your mouth? Learn about oral thrush, a common fungal infection, its causes, home remedies, and when you need medical treatment.",
    primaryKeyword: "oral thrush",
    secondaryKeywords: ["white patches in mouth", "oral candidiasis treatment", "thrush in adults", "mouth fungal infection"],
    heroHeading: "White patches in your mouth? It might be oral thrush.",
    heroSubheading: "Oral thrush is common, treatable, and usually not serious. But it does need attention.",
    directAnswer: "Oral thrush is a fungal infection caused by an overgrowth of Candida yeast in the mouth. It appears as creamy white patches on the tongue, inner cheeks, gums, or roof of the mouth. It is more common in babies, older adults, people with weakened immune systems, and those taking antibiotics or inhaled corticosteroids. It is usually easy to treat with antifungal medication.",
    detailedExplanation: [
      "Candida yeast naturally lives in small amounts in your mouth, gut, and on your skin. Normally, your immune system and beneficial bacteria keep it in check. Oral thrush happens when something disrupts this balance and allows Candida to overgrow.",
      "The most common triggers include antibiotics (which kill the good bacteria that keep Candida under control), inhaled corticosteroids for asthma, a weakened immune system, dry mouth, and poorly fitting dentures. Babies and older adults are more susceptible because their immune systems are either not fully developed or declining.",
      "The hallmark sign is creamy white patches that can be wiped away, leaving red, sore tissue underneath. You may also notice a cottony feeling in your mouth, loss of taste, difficulty swallowing, and cracking at the corners of your mouth.",
      "Treatment usually involves antifungal medication prescribed by your doctor or dentist. Mild cases may respond to home remedies like salt water rinses and probiotic yogurt. If you use an asthma inhaler, always rinse your mouth with water afterward to reduce your risk. Recurring thrush may signal an underlying health condition that needs attention."
    ],
    causes: [
      { title: "Weakened immune system", description: "Conditions like HIV/AIDS, diabetes, or cancer treatment can reduce your body's ability to keep Candida in check." },
      { title: "Antibiotics", description: "Antibiotics kill beneficial bacteria that normally keep Candida under control, allowing it to overgrow." },
      { title: "Inhaled corticosteroids", description: "Asthma inhalers containing steroids can promote fungal growth in the mouth if you do not rinse after use." },
      { title: "Dry mouth", description: "Reduced saliva flow creates an environment where Candida can thrive." },
      { title: "Dentures", description: "Poorly fitting dentures or not cleaning dentures properly can create conditions for thrush to develop." }
    ],
    symptoms: [
      { text: "Creamy white patches on the tongue, cheeks, gums, or palate", severity: "moderate" },
      { text: "Patches that can be wiped away, leaving red, sore tissue underneath", severity: "moderate" },
      { text: "Cottony feeling in the mouth", severity: "mild" },
      { text: "Loss of taste or an unpleasant taste", severity: "mild" },
      { text: "Redness or soreness that may cause difficulty eating or swallowing", severity: "moderate" },
      { text: "Cracking at the corners of the mouth", severity: "mild" }
    ],

    whenToSeeDentist: [
      "You notice white patches in your mouth that do not go away",
      "You have pain or difficulty eating or swallowing",
      "You suspect thrush and have a weakened immune system",
      "Symptoms do not improve after a week of home care",
      "Thrush keeps coming back after treatment"
    ],
    keyTakeaways: [
      "Oral thrush is a common fungal infection that is usually easy to treat.",
      "If you use an asthma inhaler, always rinse your mouth afterward to reduce your risk.",
      "Recurring thrush may indicate an underlying health condition that needs attention."
    ],
    faqs: [
      { question: "Is oral thrush contagious?", answer: "Oral thrush is not typically contagious between adults. However, a mother with thrush can pass it to a nursing baby, and vice versa." },
      { question: "Can oral thrush go away on its own?", answer: "Mild cases in healthy adults may resolve on their own, but treatment speeds recovery and prevents the infection from spreading. People with weakened immune systems should always seek treatment." },
      { question: "Can DentaSmart detect oral thrush?", answer: "DentaSmart can help you photograph and monitor white patches or unusual changes in your mouth. While it cannot diagnose thrush, tracking changes over time gives you useful information to share with your dentist or doctor." }
    ],
    relatedConditions: [
      { slug: "gum-disease", title: "Gum Disease" }
    ],
    relatedSymptoms: [
      { slug: "mouth-sores", title: "Mouth Sores" },
      { slug: "dry-mouth", title: "Dry Mouth" },
      { slug: "bad-breath", title: "Bad Breath" }
    ],
    relatedGuides: [
      { slug: "brushing-guide", title: "How to Brush Your Teeth Properly" }
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },
  "tmj-disorder": {
    slug: "tmj-disorder",
    title: "TMJ Disorder: Understanding Jaw Joint Pain and Treatment",
    metaTitle: "TMJ Disorder: Causes, Symptoms & Treatment | DentaSmart",
    metaDescription: "Jaw clicking, popping, or pain? Learn about TMJ disorder, what causes it, and the most effective treatments from self-care to professional options.",
    primaryKeyword: "TMJ disorder",
    secondaryKeywords: ["TMJ treatment", "jaw clicking and popping", "temporomandibular joint pain", "TMD causes"],
    heroHeading: "Your jaw joint is one of the most complex in your body. When it hurts, everything hurts.",
    heroSubheading: "TMJ disorder affects millions of people. Understanding it is the first step to finding relief.",
    directAnswer: "TMJ disorder (also called TMD) refers to a group of conditions affecting the jaw joint and the muscles that control jaw movement. Symptoms include jaw pain, clicking or popping sounds, difficulty opening the mouth, and headaches. Most TMJ problems are temporary and respond well to self-care and conservative treatment. Surgery is rarely needed.",
    detailedExplanation: [
      "The temporomandibular joint (TMJ) connects your jawbone to your skull on each side of your face. It is one of the most complex joints in the body, allowing you to open and close your mouth, chew, speak, and yawn. When something goes wrong with this joint or the muscles around it, it is called TMJ disorder or TMD.",
      "The most common causes include teeth grinding (bruxism), jaw injury, arthritis, stress-related jaw clenching, and displacement of the disc that cushions the joint. Many people develop TMJ symptoms during periods of high stress without any structural problem in the joint itself.",
      "Symptoms can range from mild clicking when you open your mouth (which is often harmless) to severe pain, jaw locking, and difficulty eating. The pain may radiate to the ear, temple, or neck, making it easy to confuse with other conditions.",
      "The good news is that most TMJ problems improve with conservative self-care: eating soft foods, applying warm compresses, practicing jaw relaxation exercises, and managing stress. A custom night guard can help if grinding is a factor. Surgery is rarely needed and is considered only after all other options have been exhausted."
    ],
    causes: [
      { title: "Teeth grinding (bruxism)", description: "Chronic grinding puts excessive stress on the jaw joint and surrounding muscles, leading to inflammation and pain." },
      { title: "Jaw injury", description: "A blow to the jaw or whiplash can damage the joint, disc, or surrounding muscles." },
      { title: "Arthritis", description: "Osteoarthritis or rheumatoid arthritis can affect the TMJ just like any other joint in the body." },
      { title: "Stress and tension", description: "Stress often leads to jaw clenching and muscle tension, which can trigger or worsen TMJ symptoms." },
      { title: "Disc displacement", description: "The soft disc that cushions the jaw joint can slip out of position, causing clicking, popping, or locking." }
    ],
    symptoms: [
      { text: "Pain or tenderness in the jaw, especially when chewing", severity: "moderate" },
      { text: "Clicking, popping, or grating sounds when opening or closing the mouth", severity: "mild" },
      { text: "Difficulty opening the mouth wide or jaw locking", severity: "severe" },
      { text: "Headaches, especially in the temple area", severity: "moderate" },
      { text: "Earache or ringing in the ears (tinnitus)", severity: "mild" },
      { text: "Facial pain or fatigue in the jaw muscles", severity: "moderate" }
    ],

    whenToSeeDentist: [
      "Jaw pain persists for more than a week",
      "You cannot open or close your mouth fully",
      "Your jaw locks in an open or closed position",
      "Pain is severe enough to affect eating, speaking, or sleeping",
      "You hear persistent clicking or popping with pain"
    ],
    keyTakeaways: [
      "Most TMJ problems improve with conservative self-care like soft foods, warm compresses, and jaw relaxation.",
      "Teeth grinding is one of the most common contributors to TMJ disorder.",
      "Surgery is rarely needed. Most people find relief with non-invasive treatments."
    ],
    faqs: [
      { question: "Does TMJ disorder go away on its own?", answer: "Many cases of TMJ disorder improve on their own with self-care within a few weeks. However, chronic or severe cases may need professional treatment. If symptoms persist beyond two weeks, see a dentist." },
      { question: "Is jaw clicking always a problem?", answer: "Not necessarily. Occasional jaw clicking without pain is common and usually harmless. But if clicking is accompanied by pain, locking, or difficulty opening your mouth, it should be evaluated." },
      { question: "Can DentaSmart help with TMJ disorder?", answer: "While DentaSmart focuses on visual oral health assessment, tracking your symptoms and jaw function over time can provide valuable information for your dentist when discussing TMJ treatment options." }
    ],
    relatedConditions: [
      { slug: "teeth-grinding", title: "Teeth Grinding (Bruxism)" }
    ],
    relatedSymptoms: [
      { slug: "jaw-pain", title: "Jaw Pain" },
      { slug: "tooth-pain-when-biting", title: "Tooth Pain When Biting" }
    ],
    relatedGuides: [
      { slug: "dental-visit-guide", title: "What to Expect at a Dental Visit" }
    ],
    reviewedBy: "Areeba Aslam",
    reviewedByCredentials: "General Dentist at DentaSmart",
    lastReviewed: "2026-02-21",
  },
};

export const conditionsList = Object.values(conditionsData);
