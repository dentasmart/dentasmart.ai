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
  "toothache": {
    slug: "toothache",
    title: "Toothaches: What's Causing It, How to Get Relief, and When to Call a Dentist",
    metaTitle: "Toothache Causes, Relief & Treatment | DentaSmart",
    metaDescription:
      "Learn common causes of tooth pain, ways to manage discomfort temporarily, and signs that call for urgent or routine dental care.",
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
      "Tooth pain can have several causes. The pattern, duration, and other symptoms help a dentist decide what to examine.",
    directAnswer:
      "A toothache is pain in or near a tooth. Possible causes include decay, infection, gum problems, grinding, or a crack. Temporary measures may ease discomfort, but persistent or worsening pain needs a dental evaluation. Facial swelling or trouble breathing or swallowing requires urgent care.",
    detailedExplanation: [
      "Tooth pain can feel dull, throbbing, sharp, or sensitive to pressure and temperature. Note when it started, what triggers it, and whether you also have swelling, fever, drainage, or a bad taste.",
      "Decay is one possible cause. Acid made by plaque bacteria can weaken enamel and reach the softer dentin below. Pain may increase if decay reaches tissue inside the tooth, but symptoms alone cannot show how deep it is.",
      "Gum disease, a cracked tooth, a damaged filling, grinding, and sinus pressure can also cause pain near a tooth. A dental exam is needed to tell these problems apart.",
      "While waiting for care, follow any advice from your dental office. A cold pack on the outside of the cheek may help with swelling. If you use an over-the-counter pain medicine, follow the label and check that it is safe with your health conditions and other medicines.",
    ],
    causes: [
      {
        title: "Tooth Decay (Cavities)",
        description:
          "Plaque bacteria produce acids that weaken enamel. Deeper decay can irritate tissue inside the tooth.",
      },
      {
        title: "Gum Disease",
        description:
          "If your gums are infected, they can ache and throb, especially when you're trying to eat.",
      },
      {
        title: "Cracked or Fractured Tooth",
        description:
          "A crack can expose sensitive tooth layers and cause sharp pain with temperature or biting.",
      },
      {
        title: "Dental Abscess",
        description:
          "An abscess is a pocket of infection. Prompt dental care is important, especially with swelling, fever, or spreading symptoms.",
      },
      {
        title: "Impacted Wisdom Teeth",
        description:
          "When your wisdom teeth don't have room to come in, they can shove against your other teeth and cause a lot of pain back there.",
      },
      {
        title: "Teeth Grinding (Bruxism)",
        description:
          "If you grind or clench your teeth at night, you can wake up with sore teeth, a sore jaw, and even headaches.",
      },
    ],
    symptoms: [
      { text: "A dull, non-stop ache in your tooth", severity: "mild" },
      { text: "Sharp pain when you bite down", severity: "moderate" },
      { text: "Your tooth hurts when you eat or drink something hot, cold, or sweet", severity: "mild" },
      { text: "Swelling in your jaw or around the tooth", severity: "severe" },
      { text: "You have a fever or a headache with the tooth pain", severity: "severe" },
      { text: "There's a nasty taste in your mouth (could be an abscess)", severity: "severe" },
    ],
    whenToSeeDentist: [
      "The pain lasts more than a day or two or is getting worse.",
      "You're running a fever.",
      "Your face or jaw is swollen.",
      "It is hard to breathe or swallow. Seek emergency care now.",
      "The pain is so bad that normal painkillers aren't helping.",
      "You see drainage or have a bad taste coming from the tooth.",
    ],
    keyTakeaways: [
      "A toothache is usually from a cavity, infection, or a damaged tooth.",
      "Things like saltwater rinses and ibuprofen can help for a little while, but they won't fix the actual problem.",
      "Severe pain, swelling, or fever needs prompt dental advice. Trouble breathing or swallowing requires emergency care.",
      "DentaSmart can help you organize symptoms and supported images for a dental conversation. It cannot diagnose the cause of tooth pain.",
    ],
    faqs: [
      {
        question: "Will a toothache just go away by itself?",
        answer:
          "Not usually. The pain might fade for a bit, but the cavity or infection that's causing it is still there. Actually, if the pain suddenly stops, it could be a bad sign: it might mean the nerve has died, and that's a bigger problem.",
      },
      {
        question: "What's the quickest way to make a toothache stop hurting?",
        answer:
          "A cold pack on the outside of the cheek may help temporarily. Follow your dental office's advice, and use over-the-counter medicine only as directed and when it is safe for you.",
      },
      {
        question: "How much will it cost to fix my toothache?",
        answer:
          "The cost depends on the cause, exam, imaging, procedure, provider, location, and insurance. Ask the dental office for an itemized estimate after the tooth has been evaluated.",
      },
      {
        question: "Can DentaSmart tell me what's wrong with my tooth?",
        answer:
          "DentaSmart can provide educational information from supported photos and X-rays and help you prepare questions. A licensed dentist must diagnose the cause and recommend treatment.",
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
      "Find out what cavities are, how to spot the early signs, and what you can do about them. Simple, clear info from DentaSmart.",
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
      "Cavities develop when tooth structure breaks down. Earlier changes may be easier to manage than deeper decay.",
    directAnswer:
      "A cavity is tooth decay that has damaged enamel or deeper tooth structure. Plaque bacteria, frequent sugar exposure, dry mouth, and oral-hygiene habits can affect risk. Early mineral loss may be managed without drilling in some cases, while a formed cavity usually needs professional treatment.",
    detailedExplanation: [
      "Cavities, also called dental caries, begin when acids produced by plaque bacteria remove minerals from enamel. A white spot can be an early sign, but a dentist must examine it to determine whether the surface is still intact.",
      "As decay moves through enamel into dentin, sensitivity or pain may develop. Some cavities have no obvious symptoms, and not every dark spot is decay.",
      "Deeper decay can irritate or infect tissue inside the tooth. Treatment may involve a filling, crown, root canal, or extraction depending on how much tooth structure is affected.",
      "Brushing with fluoride toothpaste, cleaning between teeth, limiting frequent sugar exposure, and following a dentist's recall plan can lower cavity risk. DentaSmart can help you organize supported images and questions between visits, but it does not diagnose decay.",
    ],
    causes: [
      {
        title: "Bacteria and Plaque",
        description:
          "Your mouth has bacteria that love to eat sugar. When they do, they make acid. That acid mixes with your spit and food bits to make a sticky film called plaque that covers your teeth.",
      },
      {
        title: "Snacking and Sugary Drinks",
        description:
          "Every time you eat or drink something with sugar, those bacteria start making acid for the next 20 minutes. So if you're snacking all day, your teeth are under constant attack.",
      },
      {
        title: "Not Brushing or Flossing Enough",
        description:
          "When you don't brush and floss like you should, plaque just sits there and hardens into tartar. And tartar is way tougher to get rid of.",
      },
      {
        title: "Dry Mouth",
        description:
          "Your spit is actually your friend. It helps rinse away food and calm down acid. If your mouth is dry because of a medical condition or medicine you're taking, your risk for cavities goes up.",
      },
      {
        title: "Old Fillings or Dental Work",
        description:
          "Older fillings can wear, chip, or develop edges that are harder to clean. A dentist can check whether repair or replacement is needed.",
      },
    ],
    symptoms: [
      { text: "White spots on your tooth (this is the first sign!)", severity: "mild" },
      { text: "Brown or black stains on a tooth", severity: "moderate" },
      { text: "Ouch! Sensitivity to sweet, hot, or cold stuff", severity: "moderate" },
      { text: "You can actually see a hole or pit in your tooth", severity: "severe" },
      { text: "It hurts when you bite down", severity: "moderate" },
      { text: "A random toothache that just shows up out of nowhere", severity: "severe" },
    ],
    whenToSeeDentist: [
      "You see a dark spot or a hole in one of your teeth.",
      "Your teeth won't stop being sensitive to sweets, hot, or cold.",
      "It hurts when you bite or chew your food.",
      "You get a toothache that just won't quit.",
      "It's been more than 6 months since your last dental checkup.",
    ],
    keyTakeaways: [
      "Early decay may not hurt, so symptoms do not show how deep a cavity is.",
      "You can sometimes reverse super early cavities (the white spot stage) with fluoride.",
      "Treatment cost depends on the extent of decay, procedure, provider, location, and insurance.",
      "DentaSmart can help you keep supported images and questions together for a dental visit. It cannot confirm a cavity.",
    ],
    faqs: [
      {
        question: "How can I tell if I have a cavity?",
        answer:
          "Early cavities may have no symptoms. Sensitivity, a dark spot, or a visible hole can have several causes, so a dental exam and sometimes X-rays are needed.",
      },
      {
        question: "Can I get rid of a cavity myself?",
        answer:
          "Early mineral loss may be managed with fluoride and changes to oral care or diet, but a dentist must confirm the stage. A formed cavity usually needs professional treatment.",
      },
      {
        question: "How long does it take to get a filling?",
        answer:
          "Usually not long at all, maybe 30 to 60 minutes. Your dentist will numb the area, so you shouldn't feel any pain. You can typically go back to eating like normal just a few hours later.",
      },
      {
        question: "Are some people just more likely to get cavities?",
        answer:
          "Totally. It can be your genes, the kind of saliva you have, what you eat, your brushing habits, and even the shape of your teeth. Some people just have bad luck with cavities even if they do everything right, which is why checking on them regularly is a really good idea.",
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
    title: "What Is Gum Disease? (And How to Keep Your Gums Healthy)",
    metaTitle: "Gum Disease 101: From Gingivitis to Healthy Gums | DentaSmart",
    metaDescription:
      "Learn how gingivitis and periodontitis differ, what bleeding or receding gums may mean, and when to arrange a dental evaluation.",
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
      "Gum disease can begin with redness, swelling, or bleeding and can progress to damage around the teeth.",
    directAnswer:
      "Gum disease affects the tissues that support the teeth. Gingivitis can cause red, swollen, or bleeding gums. Periodontitis can damage the supporting bone and may loosen teeth. Plaque is a major cause, but health conditions, smoking, medicines, and oral-care habits can also affect risk.",
    detailedExplanation: [
      "Plaque is a sticky film of bacteria that collects along the gumline. If it remains, it can harden into tartar, which requires professional removal.",
      "Gingivitis affects the gums without the supporting bone loss seen in periodontitis. Improved home care and professional cleaning can often control gingivitis, but a dentist must assess the cause and extent.",
      "Periodontitis can create deeper spaces around teeth and damage supporting tissue and bone. Teeth may become loose as the disease progresses.",
      "Smoking, diabetes, hormonal changes, dry mouth, some medicines, genetics, and oral-care habits can affect risk. DentaSmart can help you document visible changes and questions, but a dental exam and gum measurements are needed for diagnosis.",
    ],
    causes: [
      {
        title: "Plaque and Tartar Buildup",
        description:
          "This is the main cause. The bacteria in plaque create toxins that really irritate your gums and make them swell up.",
      },
      {
        title: "Smoking and Tobacco Use",
        description:
          "Smoking affects immune response and healing and is an important risk factor for gum disease.",
      },
      {
        title: "Not Brushing or Flossing Enough",
        description:
          "If you're not consistent, plaque just sits there and eventually hardens into tartar. Simple as that.",
      },
      {
        title: "Hormonal Changes",
        description:
          "Things like pregnancy, your period, or menopause can make your gums extra sensitive and more likely to have problems.",
      },
      {
        title: "Diabetes",
        description:
          "If you have diabetes, you're at a higher risk because your body has a tougher time fighting off infections, including in your gums.",
      },
    ],
    symptoms: [
      { text: "Gums that look red, puffy, or feel tender", severity: "mild" },
      { text: "Seeing blood when you brush or floss", severity: "mild" },
      { text: "Gums look like they're shrinking away from your teeth", severity: "moderate" },
      { text: "Bad breath that just won't go away", severity: "moderate" },
      { text: "Teeth feeling a little loose or like they've moved", severity: "severe" },
      { text: "Your bite feels different, like your teeth don't fit together the same", severity: "severe" },
    ],
    whenToSeeDentist: [
      "If your gums bleed pretty much every time you brush.",
      "You look in the mirror and notice your gums are pulling back.",
      "You've got bad breath that isn't fixed by brushing or mouthwash.",
      "A tooth feels wobbly or has shifted.",
      "You see any pus coming from between your teeth and gums. (Definitely see a dentist for that!)",
      "It hurts when you chew your food.",
    ],
    keyTakeaways: [
      "Gingivitis and periodontitis are different stages and need different care.",
      "Repeated gum bleeding deserves attention, especially with swelling, recession, bad breath, or loose teeth.",
      "Stopping tobacco use can support gum health and healing.",
      "DentaSmart can help you document visible changes for a dental conversation. It cannot measure gum pockets or diagnose gum disease.",
    ],
    faqs: [
      {
        question: "Can you actually cure gum disease?",
        answer:
          "Gingivitis can often be controlled with improved home care and professional cleaning. Periodontitis needs ongoing professional treatment and monitoring because it involves damage to supporting tissue and bone.",
      },
      {
        question: "Can I catch gum disease from someone?",
        answer:
          "Well, the bacteria that cause it can be passed through saliva, so kissing or sharing a fork. But just because you get the bacteria doesn't mean you'll get the disease. It really comes down to your own immune system and how well you take care of your teeth.",
      },
      {
        question: "What's the cost for gum disease treatment?",
        answer:
          "Cost depends on the diagnosis, cleaning or periodontal procedure, number of visits, provider, location, and insurance. Ask for an itemized estimate after a periodontal evaluation.",
      },
      {
        question: "Does DentaSmart know if I have gum disease?",
        answer:
          "DentaSmart can help you review supported photos and organize questions about visible gum changes. A dentist or hygienist must examine and measure the gums to diagnose gum disease.",
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
      "Learn what can cause pain near a wisdom tooth, what impaction means, and which symptoms need prompt dental care.",
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
      "Pain near a wisdom tooth can come from eruption, trapped food, gum inflammation, decay, or infection. A dental exam can identify the cause.",
    directAnswer:
      "Pain at the back of the mouth may involve a wisdom tooth, but symptoms alone cannot confirm the cause. A partly erupted or impacted tooth can be linked to swelling, infection, decay, or damage nearby. Not every wisdom tooth needs removal, so a dentist should review symptoms and imaging.",
    detailedExplanation: [
      "Wisdom teeth are third molars that often erupt in the late teens or early adulthood. People may have none, some, or all four.",
      "An impacted tooth is partly or fully blocked by gum, bone, or another tooth. It may grow at an angle and can be hard to clean, but not every impacted tooth causes symptoms.",
      "Pericoronitis is inflammation or infection around a partly erupted tooth. Treatment depends on the exam and may include cleaning, symptom care, medicine, or removal.",
      "A dentist can compare monitoring and removal after reviewing the tooth position, symptoms, nearby structures, and ability to keep the area clean. DentaSmart can provide educational context for supported X-rays, but it does not decide whether a tooth needs removal.",
    ],
    causes: [
      {
        title: "Impaction",
        description:
          "Basically, the tooth is stuck. There isn't enough room for it to come out straight, so it gets jammed and grows at a weird angle.",
      },
      {
        title: "Pericoronitis (Gum Infection)",
        description:
          "This happens when germs and food get trapped under the gum flap covering a wisdom tooth that's only partway out. It gets infected and hurts.",
      },
      {
        title: "Pressure on Other Teeth",
        description:
          "A wisdom tooth coming in can shove the tooth next to it. This can cause pain and even damage that neighboring molar. Not cool.",
      },
      {
        title: "Cyst Formation",
        description:
          "This one is rare, but a fluid-filled sac (a cyst) can form around a stuck wisdom tooth. It can do some serious damage to your jawbone.",
      },
    ],
    symptoms: [
      { text: "Pain or just general tenderness way back in your mouth", severity: "mild" },
      { text: "Gums behind your last tooth are swollen and red", severity: "moderate" },
      { text: "Your jaw feels stiff or you can't open your mouth wide", severity: "moderate" },
      { text: "You've got bad breath or a nasty taste that won't go away", severity: "mild" },
      { text: "Your jaw or cheek is starting to look puffy", severity: "severe" },
      { text: "You have a fever or it's getting hard to swallow", severity: "severe" },
    ],
    whenToSeeDentist: [
      "The pain in the back of your mouth just won't quit after a few days",
      "You notice any swelling in your jaw or cheek",
      "It's getting hard to open your mouth all the way",
      "There's a bad taste or smell coming from that area",
      "You're running a fever on top of the tooth pain",
      "It feels like your other teeth are shifting or getting crowded",
    ],
    keyTakeaways: [
      "Wisdom teeth cause problems because our jaws are often just too small for them.",
      "You don't automatically need your wisdom teeth pulled. Only if they're causing trouble.",
      "Pericoronitis (that gum infection) is super common and needs a dentist to check it out.",
      "DentaSmart can help you review supported X-rays and prepare questions; a dentist must interpret them for treatment.",
    ],
    faqs: [
      {
        question: "Do I really have to get my wisdom teeth removed?",
        answer:
          "Nope, not everyone does. If they've come in correctly, are healthy, and you can keep them clean, they can stay. Your dentist will look at your X-rays and let you know what's best for you.",
      },
      {
        question: "What's the cost for getting wisdom teeth out?",
        answer:
          "It depends. A simple pull might be $150-$400 a tooth. But if it's impacted and needs surgery, you're looking at $300-$800 per tooth. Getting all four done with sedation can run from $1,000 to $3,000.",
      },
      {
        question: "How long does it take to recover from wisdom tooth removal?",
        answer:
          "For a simple extraction, you'll probably feel better in 3-5 days. For surgery, give it a good week, maybe 10 days. The swelling is usually worst for the first 2-3 days. Just be sure to follow the dentist's instructions to a T!",
      },
      {
        question: "Can DentaSmart look at my wisdom teeth X-ray?",
        answer:
          "DentaSmart can provide educational context for supported dental X-rays and help you prepare questions. A dentist must interpret the image and recommend monitoring or treatment.",
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
    title: "Teeth Whitening: Your Guide to Options, Safety, and What Really Works",
    metaTitle: "Teeth Whitening: What Works & Is It Safe? | DentaSmart",
    metaDescription:
      "Compare professional and at-home teeth whitening, common causes of discoloration, sensitivity risk, and questions to ask a dentist.",
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
      "Whitening options differ in strength, supervision, cost, and how they affect sensitivity and existing dental work.",
    directAnswer:
      "Many whitening products use hydrogen peroxide or carbamide peroxide to lighten natural tooth structure. Results and sensitivity vary by product and the cause of discoloration. Whitening does not change the shade of crowns, veneers, or fillings.",
    detailedExplanation: [
      "Teeth can darken with age and can develop surface stains from coffee, tea, wine, or tobacco. Peroxide-based products work on some types of discoloration but not every cause.",
      "In-office whitening uses products under professional supervision. Store-bought strips, dentist-provided trays, and whitening toothpastes work differently and require different treatment times.",
      "Whitening toothpaste mainly removes surface stains. Peroxide products can lighten natural tooth structure, but the degree of change varies.",
      "A dentist can check for decay, gum problems, exposed roots, sensitivity, and restorations before whitening. Use DentaSmart for educational context and questions, not to measure or prescribe a whitening result.",
    ],
    causes: [
      {
        title: "Food and Drink Stains",
        description:
          "Your daily coffee, tea, or red wine habit? Those pigments love to stick to your tooth enamel.",
      },
      {
        title: "Tobacco Use",
        description:
          "The tar and nicotine from smoking or chewing creates some really tough brown and yellow stains that sink deep into your teeth.",
      },
      {
        title: "Just Getting Older",
        description:
          "As you age, your enamel gets thinner, which lets the yellowish layer underneath (called dentin) show through more.",
      },
      {
        title: "Some Medications",
        description:
          "Yep, certain drugs like tetracycline antibiotics, antihistamines, and even some blood pressure meds can mess with your tooth color.",
      },
      {
        title: "Too Much Fluoride",
        description:
          "Getting way too much fluoride when you're a kid can actually cause little white or brown spots on your teeth. It's called fluorosis.",
      },
    ],
    symptoms: [
      { text: "Teeth look yellow or brownish", severity: "mild" },
      { text: "Some teeth are darker than others", severity: "mild" },
      { text: "Brushing doesn't get rid of the stains", severity: "moderate" },
      { text: "Feeling a bit shy about your smile", severity: "mild" },
    ],
    whenToSeeDentist: [
      "You want a dentist to assess the cause of discoloration and discuss supervised treatment.",
      "You have sensitive teeth and want to make sure you whiten safely.",
      "The stains seem to be inside your tooth (kind of grayish), which surface whitening won't fix.",
      "You have crowns, veneers, or big fillings on your front teeth.",
      "You tried an over-the-counter kit and it's making your teeth hurt.",
    ],
    keyTakeaways: [
      "Professional and at-home options use different products, strengths, and schedules.",
      "Remember, whitening only works on natural teeth. It won't change the color of crowns or fillings.",
      "Sensitivity and gum irritation can occur, and their duration varies.",
      "DentaSmart can help you keep supported photos and questions together, but it does not measure whitening effectiveness.",
    ],
    faqs: [
      {
        question: "How long will my teeth stay white?",
        answer:
          "Duration varies with the treatment, stain type, diet, tobacco use, oral care, and natural tooth color. Ask a dentist when a touch-up is appropriate.",
      },
      {
        question: "Is teeth whitening bad for my enamel?",
        answer:
          "Whitening can cause sensitivity or gum irritation, and it may not be appropriate for every mouth. Follow the product directions and ask a dentist if you have pain, decay, gum problems, exposed roots, or dental restorations.",
      },
      {
        question: "Why are my teeth so sensitive after whitening?",
        answer:
          "Peroxide can temporarily increase tooth sensitivity in some people. Stop or adjust use according to the product directions and contact a dentist if sensitivity is severe or persistent.",
      },
      {
        question: "Can the DentaSmart app help me track my progress?",
        answer:
          "You can keep supported photos and notes together in DentaSmart, but lighting and camera settings affect color. The app does not provide a clinical shade measurement.",
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
    title: "Why Do My Teeth Hurt? A Guide to Sensitive Teeth",
    metaTitle: "Sensitive Teeth Causes & Relief | DentaSmart",
    metaDescription: "Tired of wincing from hot or cold foods? Find out what causes sensitive teeth and, more importantly, how to get relief. Simple fixes and when it's time to see a dentist.",
    primaryKeyword: "sensitive teeth",
    secondaryKeywords: ["tooth sensitivity causes", "sensitive teeth treatment", "why do my teeth hurt with cold", "dentin hypersensitivity"],
    heroHeading: "Tooth sensitivity has several possible causes.",
    heroSubheading: "Hot, cold, sweet, or pressure can trigger pain when dentin or another sensitive part of a tooth is exposed.",
    directAnswer: "Sensitivity can develop when enamel wears, gums recede, a tooth cracks, decay forms, or dental work irritates a tooth. Desensitizing toothpaste and gentle brushing may help some causes, but new, severe, or persistent pain needs a dental evaluation.",
    detailedExplanation: [
      "Think of your teeth as having their own little suit of armor. That's the enamel. It's super tough and protects the soft stuff inside from all the hot and cold things you eat and drink. Underneath the enamel is the dentin, which is more like a sponge with tiny, microscopic tubes that go straight to the tooth's nerve.",
      "So, what happens when that armor gets a chink in it? If your enamel gets thin or your gums shrink back, those little tubes are left wide open. Now, every cold drink or sugary snack sends a shockwave right to the nerve. Ouch. That's the sharp pain you're feeling. It's basically your tooth's alarm system going off, telling you its defenses are down.",
      "Sometimes sensitivity creeps up on you slowly. Other times it shows up right after you've had dental work done. Either way, don't ignore it. The sooner you figure out what's going on, the easier it is to fix."
    ],
    causes: [
      { title: "Worn-Down Enamel", description: "Things like acidic drinks, brushing way too hard, or grinding your teeth can wear down your enamel, leaving the sensitive dentin layer exposed." },
      { title: "Receding Gums", description: "When your gums pull back from your teeth, they expose the root. And guess what? The root doesn't have any enamel, so it's super sensitive." },
      { title: "Grinding Your Teeth", description: "Also called bruxism. All that clenching and grinding can wear down enamel and even cause tiny cracks that let the ouch in." },
      { title: "Whitening Products", description: "It's pretty common for whitening treatments to make teeth sensitive for a little while. They work by getting into the tooth, which can irritate the nerve." },
      { title: "Cracked or Chipped Teeth", description: "A crack in your tooth is like an open door for hot and cold to get right to the nerve. Even a small one can cause a lot of pain." },
      { title: "Recent Dental Work", description: "It's normal for your teeth to be a bit touchy after a filling, crown, or even a cleaning. This usually goes away on its own in a few weeks." }
    ],
    symptoms: [
      { text: "A sharp, sudden pain with hot or cold food and drinks", severity: "moderate" },
      { text: "That 'zing' when you eat something sweet or sour", severity: "mild" },
      { text: "Ouch-factor when you breathe in cold air", severity: "mild" },
      { text: "Pain when you brush or floss a specific tooth", severity: "moderate" },
      { text: "The pain sticks around for a bit after you eat or drink", severity: "severe" }
    ],
    whenToSeeDentist: [
      "You've been using sensitivity toothpaste for a few weeks and nothing's changed.",
      "The pain is so bad it's making it hard to eat or drink.",
      "You can actually see a crack, chip, or a dark spot on the tooth that hurts.",
      "The sensitivity just popped up out of nowhere.",
      "Your gums are also swollen or bleeding, or you have a gross taste in your mouth."
    ],
    keyTakeaways: [
      "Sensitivity can come from enamel wear, gum recession, whitening, a crack, decay, or recent dental work.",
      "A soft toothbrush and desensitizing toothpaste may help, depending on the cause.",
      "A dentist should evaluate pain that is new, worsening, severe, or limited to one tooth."
    ],
    faqs: [
      { question: "Will my sensitive teeth get better on their own?", answer: "Sometimes! If it's from something temporary like a teeth whitening session, it'll probably fade in a few weeks. But if it's from worn-down enamel or receding gums, it won't fix itself. You'll need to do something about it." },
      { question: "Does sensitivity mean I have a cavity?", answer: "It could. A cavity is basically a hole that exposes the sensitive part of your tooth. If the pain is just in one spot and seems to be getting worse, you should get it checked for decay. Better safe than sorry." },
      { question: "Does that special toothpaste for sensitive teeth really work?", answer: "Yep, for a lot of people it does. It has ingredients that help block those tiny tubes in your dentin, so the nerve doesn't get zapped. You have to be patient, though. It can take 2 to 4 weeks of using it every day to notice a real difference." },
      { question: "How can DentaSmart help with my sensitive teeth?", answer: "DentaSmart can help you record triggers, timing, and supported images for a dental conversation. It cannot determine the cause of sensitivity." }
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
    title: "Cracked Tooth? Here's What to Know and What to Do",
    metaTitle: "Cracked Tooth Symptoms & What to Do | DentaSmart",
    metaDescription: "Learn possible cracked-tooth symptoms, why cracks can be hard to identify, and when to arrange prompt dental care.",
    primaryKeyword: "cracked tooth",
    secondaryKeywords: ["cracked tooth symptoms", "fractured tooth treatment", "hairline crack in tooth", "craze lines teeth"],
    heroHeading: "A cracked tooth needs a dental evaluation.",
    heroSubheading: "A surface line and a deeper crack can look similar at home, but they do not carry the same risk.",
    directAnswer: "A cracked tooth may cause pain when biting, temperature sensitivity, or pain that comes and goes. Some visible lines affect only enamel, while deeper cracks can reach dentin or the pulp. A dentist must locate the crack and decide whether monitoring, bonding, a filling, a crown, root canal treatment, or extraction is appropriate.",
    detailedExplanation: [
      "Your teeth are tough, but they're not invincible. After years of munching, grinding, and going from hot coffee to ice water, cracks can happen. Some are just on the surface, but others can be a real problem.",
      "The weird thing about cracked teeth? They're sneaky. They don't always show up on an X-ray, and the pain can be all over the place. You might get a sharp pain when you bite, and then... nothing. For days. That on-again, off-again pain is a classic sign of a cracked tooth.",
      "But not all cracks are a five-alarm fire. Those tiny vertical lines you see on your teeth? Those are called craze lines. They’re just in the enamel and are totally harmless. It’s the deeper cracks you have to worry about, the ones that go past the enamel. Those need a dentist’s help before they get worse."
    ],
    causes: [
      { title: "Biting on something hard", description: "Chewing on ice, hard candy, or a popcorn kernel the wrong way can do it. Even a healthy tooth can crack." },
      { title: "Grinding your teeth (bruxism)", description: "If you grind your teeth, you're putting a ton of pressure on them, especially your molars. Over time, that can cause little cracks to form." },
      { title: "Big old fillings", description: "When a tooth has a huge filling, there’s less natural tooth left to take the pressure. That makes it easier to crack." },
      { title: "Getting older", description: "It happens to the best of us. Teeth can get more brittle as we age. That’s why most cracked teeth happen to people over 50." },
      { title: "Quick temperature changes", description: "Ever drink ice water right after a hot coffee? That can stress out your tooth enamel and, you guessed it, cause a crack." },
      { title: "Getting hit in the mouth", description: "A fall, a sports injury... stuff happens. An impact to your face can crack a tooth, and you might not even feel it right away." }
    ],
    symptoms: [
      { text: "A sharp pain that zings when you bite or chew", severity: "moderate" },
      { text: "Ouch! Sudden sensitivity to hot, cold, or sweet things", severity: "moderate" },
      { text: "Pain that comes and goes for no reason", severity: "mild" },
      { text: "The gum around one tooth is swollen", severity: "severe" },
      { text: "You can actually see a line or chip on your tooth", severity: "mild" }
    ],
    whenToSeeDentist: [
      "You get a sharp pain when you bite down, and it keeps happening",
      "A chunk of your tooth broke off. (Definitely call.)",
      "You see swelling in the gum around a tooth",
      "The pain is just getting worse",
      "You took a hit to your face or jaw recently"
    ],
    keyTakeaways: [
      "Surface craze lines and deeper cracks are different, and a dentist must assess the depth.",
      "Pain that comes and goes can still need evaluation.",
      "Prompt care may give a dentist more treatment options if the crack is progressing."
    ],
    faqs: [
      { question: "Can a cracked tooth heal by itself?", answer: "Nope. Your teeth can't heal themselves like bones can. A crack won't get better on its own, and it can actually get worse if bacteria get in there and cause an infection." },
      { question: "How do I know if my tooth is cracked or just sensitive?", answer: "A cracked tooth usually gives you a sharp, sudden pain when you bite down. General sensitivity is more of a dull ache that you feel when you have something hot or cold. But really, the only way to know for sure is to have a dentist check it out." },
      { question: "Does a cracked tooth always mean I need a crown?", answer: "Not at all. For tiny cracks, a little bonding or a filling might be all you need. If the crack is deep and has reached the tooth’s pulp, you might need a root canal and then a crown. Your dentist will tell you the best way to fix it." },
      { question: "Can DentaSmart tell me if my tooth is cracked?", answer: "DentaSmart can help you record symptoms and review supported images for educational context. Cracks can be difficult to see, so a dentist must examine the tooth and decide how urgently it needs care." }
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
    title: "That Awful Tooth Pain? It Might Be a Dental Abscess.",
    metaTitle: "Dental Abscess: What It Is and How to Treat It | DentaSmart",
    metaDescription: "Think you have a tooth abscess? Don't wait. Find out what causes this serious infection, what the symptoms feel like, and why you need to see a dentist right away.",
    primaryKeyword: "dental abscess",
    secondaryKeywords: ["tooth abscess symptoms", "abscessed tooth treatment", "tooth infection signs", "periapical abscess"],
    heroHeading: "A tooth abscess is a big deal.",
    heroSubheading: "Seriously, this isn't something you can just ignore. Here’s what you need to know and, more importantly, what to do about it.",
    directAnswer: "A dental abscess is a nasty pocket of pus from a bacterial infection in your tooth or gums. It usually brings on a throbbing pain, swelling, maybe even a fever and a gross taste. The thing is, abscesses don't fix themselves. They can get worse and spread if you don't get them treated. It's a true dental emergency, so a dentist needs to drain it and you'll likely need antibiotics.",
    detailedExplanation: [
      "So how does this happen? When bacteria sneak into a tooth (usually through a cavity, a crack, or your gums), your body goes on the attack. It sends in the troops, white blood cells, to fight the infection. This battle creates pus. If that pus gets trapped with nowhere to go, boom. You've got an abscess.",
      "You'll hear about two main kinds. The first is a periapical abscess, which shows up at the tip of a tooth's root. That's usually because of a cavity or crack that went untreated. The other is a periodontal abscess, which is in the gums and often tied to gum disease. Both are bad news. And both mean you need to see a pro.",
      "The pain can be unreal. A constant, throbbing ache that some people say is the worst pain of their life. But here’s a weird thing that can happen: sometimes the pain just stops. Don't be fooled. That doesn't mean you're in the clear. It probably means the abscess burst, which feels better for a minute but is actually spreading the infection."
    ],
    causes: [
      { title: "Untreated cavities", description: "If a cavity gets deep enough to hit the tooth's pulp, bacteria can infect the nerve and an abscess can form at the root. Simple as that." },
      { title: "Cracked or broken teeth", description: "A crack is like an open door for bacteria to get right inside your tooth, past all the defenses." },
      { title: "Advanced gum disease", description: "When your gums have deep pockets, they can trap bacteria right up against the tooth root. Hello, periodontal abscess." },
      { title: "Failed dental work", description: "Sometimes old fillings or crowns get little gaps, and that's all bacteria need to sneak back in." },
      { title: "Weakened immune system", description: "If you have something like diabetes or are on certain meds, your body has a harder time fighting off infections, including in your mouth." }
    ],
    symptoms: [
      { text: "A really bad, throbbing toothache that you can feel in your jaw, ear, or neck", severity: "severe" },
      { text: "Your face or cheek is swollen, or you feel swelling under your jaw", severity: "severe" },
      { text: "You have a fever and just feel sick all over", severity: "severe" },
      { text: "A gross taste in your mouth, or a sudden rush of salty, nasty fluid", severity: "moderate" },
      { text: "It hurts to chew or press on the tooth, and it's sensitive to hot or cold", severity: "moderate" },
      { text: "The glands under your jaw or in your neck feel swollen and sore", severity: "severe" }
    ],
    whenToSeeDentist: [
      "Your face is swelling up, especially if it's getting near your eye or making it hard to breathe.",
      "You've got a fever on top of the tooth pain.",
      "It's getting difficult to breathe or swallow. (Go to the ER for this one!)",
      "The pain is just awful and nothing you take over-the-counter is touching it.",
      "You see something that looks like a pimple on your gum. It might even be leaking pus."
    ],
    keyTakeaways: [
      "An abscess won't go away by itself. You absolutely have to get it treated by a professional.",
      "If the pain suddenly disappears, don't celebrate. It probably means the infection is spreading. See a dentist ASAP.",
      "The best plan? Don't get one in the first place. Keep up with your dental checkups and get cavities filled early."
    ],
    faqs: [
      { question: "Can I just treat a dental abscess at home?", answer: "Nope. You really can't. Rinsing with salt water might feel a little better for a bit, but it won't kill the infection. A dentist has to drain the abscess and you'll probably need antibiotics. Waiting just gives the infection a chance to spread to your jaw or even into your bloodstream. Not good." },
      { question: "How long do I have before an abscess gets dangerous?", answer: "It can get dangerous fast, sometimes within days. If your face is swelling, you have a fever, or you're having trouble breathing, that's a sign the infection is spreading. You should head to an emergency room right away." },
      { question: "Will antibiotics be enough to cure my abscess?", answer: "They're part of the solution, but not the whole fix. Antibiotics will help get the infection under control, but the source of the problem (the cavity or crack) is still there. The dentist has to drain the pus and fix the tooth. If they don't, the infection will just come right back." },
      { question: "Can DentaSmart tell me if I have an abscess?", answer: "DentaSmart can definitely help you spot the signs of an abscess and understand why it's so urgent. If our AI thinks you might have an infection, we'll tell you to see a dentist immediately. This is one of those times where you just can't wait." }
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
  title: "What's a Root Canal? (And Why It's Not as Scary as You Think)",
  metaTitle: "Root Canal 101: Your Guide to the Procedure | DentaSmart",
  metaDescription: "Nervous about getting a root canal? We get it. Find out what really happens, why you might need one, and how it's way easier than you've heard.",
  primaryKeyword: "root canal",
  secondaryKeywords: ["root canal treatment", "root canal procedure", "do I need a root canal", "root canal pain"],
  heroHeading: "Root canals get a bad rap.",
  heroSubheading: "Honestly, the toothache that sends you to the dentist is way worse. Let's walk through what a modern root canal is actually like.",
  directAnswer: "A root canal is just a deep cleaning inside your tooth. When the soft stuff inside (called pulp, which has nerves and blood vessels) gets infected, a dentist needs to get it out of there to save the tooth. They'll numb you up, take out the bad stuff, clean the area, and then seal it up. Most people say it feels about the same as getting a regular filling. Afterwards, you'll probably get a crown to keep the tooth strong.",
  detailedExplanation: [
    "Your tooth isn't solid all the way through. There's a soft center called the pulp, which is where the nerves and blood vessels live. If that pulp gets infected. From a bad cavity, a crack in the tooth, or even an old injury. It's got to be dealt with. And a root canal is usually the best way to do that without pulling the whole tooth.",
    "So, what happens during the procedure? It's pretty simple, really. First, your dentist will make sure you're completely numb. Then they make a tiny opening in the tooth, clean out all the infected pulp from inside the root canals, and fill it with a safe, rubber-like material. That's it. It might take one visit, or maybe two for a tricky tooth.",
    "Let's clear this up: root canals don't cause pain, they get rid of it. The real pain is the infected tooth before the procedure. Once the source of the infection is gone, you feel better. Seriously, most people say it's no more uncomfortable than getting a standard filling."
  ],
  causes: [
    { title: "Deep Cavities", description: "A cavity that gets deep enough for bacteria to reach the nerve inside your tooth. Ouch." },
    { title: "Lots of Dental Work", description: "Having multiple procedures on one tooth can, over time, just wear out the nerve." },
    { title: "Cracked Tooth", description: "A crack or chip can be like an open door for bacteria to get right to the nerve." },
    { title: "An Old Injury", description: "Sometimes a knock to the tooth can damage the pulp, but you won't feel the effects until much later." },
    { title: "Really Big Fillings", description: "When a filling is very large, there isn't much natural tooth left to protect the sensitive pulp." }
  ],
  symptoms: [
    { text: "A really bad toothache that won't quit, especially when you bite down", severity: "severe" },
    { text: "Your tooth hurts with hot or cold for a long time after you're done eating or drinking", severity: "moderate" },
    { text: "The tooth is starting to look darker than its neighbors", severity: "moderate" },
    { text: "Your gums near the tooth are swollen and sore", severity: "severe" },
    { text: "You have a little pimple on your gums that keeps showing up", severity: "moderate" }
  ],
  whenToSeeDentist: [
    "If you have a toothache that ibuprofen just isn't touching.",
    "When you notice one of your teeth has gone dark.",
    "If you have any swelling in your gums or face.",
    "You spot a recurring bump on your gums. That's not normal.",
    "If a tooth is super sensitive to temperature for more than just a few seconds."
  ],
  keyTakeaways: [
    "A root canal lets you keep your own tooth, and that's almost always the best option.",
    "The whole point of a root canal is to make the pain go away, not cause more of it.",
    "Don't skip the crown! After a root canal, your tooth needs that extra protection to last."
  ],
  faqs: [
    { question: "For real, does a root canal hurt?", answer: "Nope! With today's numbing techniques, you won't feel much at all. It's the infection beforehand that really hurts. The root canal is what makes it stop." },
    { question: "How long will I be in the chair?", answer: "Usually about an hour to 90 minutes. Most are done in one appointment, but a tricky molar might need a second visit to finish up." },
    { question: "What if I just ignore it and hope it goes away?", answer: "It won't. The infection can spread to your jawbone, create a painful abscess, and you could lose the tooth anyway. Don't wait." },
    { question: "Can DentaSmart tell me if I need a root canal?", answer: "Our tools can help you figure out if your symptoms point to a root canal, but you'll need a dentist to be sure. They'll use X-rays to see what's really going on in there." }
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
    title: "Dental Crowns: What They Are, How They Work & What to Expect",
    metaTitle: "Your Guide to Dental Crowns | DentaSmart",
    metaDescription: "Thinking about a dental crown? Get the scoop on different types, the whole process, how long they last, and the best way to care for them.",
    primaryKeyword: "dental crown",
    secondaryKeywords: ["dental crown types", "tooth crown procedure", "how long do dental crowns last", "crown vs filling"],
    heroHeading: "A crown can give your tooth a brand new life.",
    heroSubheading: "Sometimes a filling just won't cut it, but pulling the tooth is going too far. A crown brings your tooth back to its old self. Here’s what you need to know.",
    directAnswer: "A dental crown is a cap that's custom-made to cover a tooth that's been damaged or is just too weak. It brings it back to the right shape, size, and strength, and makes it look good again. Dentists usually suggest a crown when a tooth is too beat up for a filling but you don't need to have it pulled. They can be made of porcelain, ceramic, metal, or a mix. It usually takes a couple of visits to the dentist, and if you take good care of it, a crown can last 10-15 years, maybe even longer.",
    detailedExplanation: [
      "Think of a crown like a little helmet for your tooth. When a tooth gets weak from a big cavity, a crack, a root canal, or just a lot of wear and tear, a filling might not be strong enough. A crown covers up everything you can see above the gum line, holding it all together so you can chew on it again.",
      "So how's it work? First, your dentist will numb you up and shape the tooth a bit to make space for the crown. Then, they'll take an impression or a digital scan. That gets sent off to a dental lab where they make a crown that's a perfect match for your other teeth. You'll get a temporary crown to wear for a week or two while your permanent one is being made.",
      "And don't worry, modern crowns look just like real teeth. The porcelain and ceramic ones are matched to the color of your other teeth. Seriously, most people will never know the difference."
    ],
    causes: [
      { title: "After a root canal", description: "A tooth that's had a root canal is more fragile because it doesn't have a blood supply anymore. The crown is there to keep it from cracking." },
      { title: "Big cavities", description: "When a cavity gets so big it takes out more than half the tooth, a filling probably won't work. A crown covers the whole thing and makes it strong again." },
      { title: "Cracked teeth", description: "A crown can hold a cracked tooth together and stop the crack from getting worse. It's like a little hug for your tooth." },
      { title: "Worn-down teeth", description: "Grinding your teeth, acid from foods, or just getting older can wear your teeth down. Crowns can build them back up to their original shape." },
      { title: "Making teeth look better", description: "Got a tooth that's really discolored or just a weird shape? A crown can cover it up and make it look like a brand new tooth." }
    ],
    symptoms: [
      { text: "Pain or sensitivity in a tooth with a crown, especially when you bite down", severity: "moderate" },
      { text: "The crown feels a little loose or like it's wiggling", severity: "moderate" },
      { text: "You see a dark line right at the gum line on an older crown", severity: "mild" },
      { text: "The crown material itself is chipped or cracked", severity: "moderate" },
      { text: "A cavity is starting again right where the crown meets the tooth", severity: "severe" }
    ],
    whenToSeeDentist: [
      "Your crown feels loose, moves around, or even falls off completely",
      "It hurts when you bite down on that tooth",
      "You can see a gap between the crown and your gums",
      "The crown itself gets chipped, cracked, or breaks",
      "You have a weird taste or sensitivity around that tooth that won't go away"
    ],
    keyTakeaways: [
      "A crown may help restore and protect a tooth when a filling or partial restoration is not appropriate.",
      "Crown appearance and longevity depend on the material, tooth, bite, gum position, home care, and future disease.",
      "You still have to brush and floss around your crown! A crown protects the top, but you can still get a cavity where the crown meets the tooth."
    ],
    faqs: [
      { question: "How long do dental crowns actually last?", answer: "There is no fixed lifespan. Material, bite forces, tooth condition, gum health, home care, and new decay can all affect repair or replacement." },
      { question: "Is getting a crown going to hurt?", answer: "Local anesthesia is used to control pain, but experiences vary. Tell the dentist if you feel pain during treatment and ask which symptoms afterward should prompt a call." },
      { question: "How do I know if I need a crown or just a filling?", answer: "A dentist considers the diagnosis, cracks, location, remaining tooth structure, bite forces, and existing restorations. Ask to see the finding and discuss clinically reasonable options." },
      { question: "Can DentaSmart tell me if I need a crown?", answer: "DentaSmart can provide educational context for supported images and treatment terms. It cannot diagnose the tooth or determine that a crown is needed." }
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
    title: "Teeth Grinding (Bruxism): What It Is, Why It Happens, and How to Stop",
    metaTitle: "Teeth Grinding (Bruxism): Causes & Treatment | DentaSmart",
    metaDescription: "Do you grind your teeth at night? Find out what causes bruxism, the damage it can do, and simple ways you can protect your teeth and jaw.",
    primaryKeyword: "teeth grinding",
    secondaryKeywords: ["bruxism treatment", "grinding teeth at night", "jaw clenching causes", "night guard for teeth"],
    heroHeading: "Teeth grinding is silent. The damage isn't.",
    heroSubheading: "Most people who grind their teeth have no idea they're doing it. But over time, that quiet wear and tear really adds up.",
    directAnswer: "Teeth grinding, or bruxism, is involuntary clenching or grinding that can happen while awake or asleep. It may contribute to tooth wear, damaged restorations, jaw soreness, or headaches, but a dental or medical assessment is needed to identify contributing factors.",
    detailedExplanation: [
      "Ever heard of bruxism? It's the official name for teeth grinding, where you clench or grind your teeth without thinking about it, usually in your sleep. A lot of people don't even know they do it until their partner says something or their dentist spots the tell-tale signs on their teeth.",
      "Bruxism can be associated with stress, sleep disorders, medicines, substances, and other factors. A dentist or clinician should assess the pattern rather than assuming one cause.",
      "Grinding can contribute to tooth wear, cracks, damaged restorations, jaw soreness, or headaches. A dentist may discuss monitoring, habit changes, a custom appliance, or referral depending on the findings; no option stops every episode or prevents every complication.",
      "Think you might be a grinder? The DentaSmart app can help you keep an eye on how your tooth surfaces change over time. It's great info to have when you go see your dentist."
    ],
    causes: [
      { title: "Stress and anxiety", description: "This is the big one. When you're stressed, your jaw muscles can go into overdrive at night, and you can't consciously stop it." },
      { title: "Sleep disorders", description: "Things like sleep apnea are often connected to grinding your teeth at night. It's a package deal sometimes." },
      { title: "A misaligned bite", description: "If your top and bottom teeth don't quite fit together right, your jaw might grind around trying to find a comfy spot." },
      { title: "Medications", description: "Some prescription drugs, like certain antidepressants (SSRIs), and even stimulants can make grinding worse." },
      { title: "Lifestyle factors", description: "Too much caffeine, alcohol, or using tobacco can all make you more likely to grind your teeth." }
    ],
    symptoms: [
      { text: "Teeth that look worn, flat, or chipped", severity: "moderate" },
      { text: "Your jaw feels sore or tight, especially right after you wake up", severity: "moderate" },
      { text: "Dull headaches that seem to start from your temples", severity: "mild" },
      { text: "Teeth suddenly feel sensitive (that's the enamel wearing down)", severity: "moderate" },
      { text: "Your partner complains about grinding noises at night", severity: "mild" },
      { text: "Pain that feels like an earache but isn't", severity: "mild" }
    ],
    whenToSeeDentist: [
      "You often wake up with a sore jaw, headaches, or achy teeth.",
      "Your partner has told you they can hear you grinding your teeth.",
      "You've noticed your teeth look shorter, flatter, or feel more sensitive.",
      "It's tough to open or close your mouth all the way."
    ],
    keyTakeaways: [
      "You probably won't know you're grinding your teeth since it happens when you're asleep. The damage is the first clue.",
      "A custom appliance may protect teeth in some cases but does not treat every cause of grinding.",
      "Ask whether sleep, medicines, substances, stress, bite forces, or another condition needs separate evaluation."
    ],
    faqs: [
      { question: "How can I tell if I grind my teeth at night?", answer: "Waking up with a sore jaw or a headache is a big clue. Or maybe you've noticed your teeth look a bit worn down. Sometimes, the first person to notice is the one sleeping next to you! The DentaSmart app can also help you track changes to your teeth." },
      { question: "Can teeth grinding cause lasting damage?", answer: "Repeated grinding can contribute to tooth wear, cracks, sensitivity, or damaged dental work. The pattern and risk vary, so ask a dentist to examine the teeth and jaw." },
      { question: "Are drugstore night guards appropriate?", answer: "Fit, material, jaw symptoms, and the reason for use matter. Ask a dentist before relying on an over-the-counter guard, especially if pain, locking, bite changes, or sleep symptoms are present." }
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
    lastReviewed: "2026-02-21"
  },
  "dental-implants": {
    slug: "dental-implants",
    title: "Dental Implants: Your Guide to Getting Your Smile Back",
    metaTitle: "Dental Implants Guide: Cost, What to Expect & Recovery | DentaSmart",
    metaDescription: "Thinking about dental implants? Find out how the process works, what they cost, how long recovery takes, and if they're the right choice for you.",
    primaryKeyword: "dental implants",
    secondaryKeywords: ["dental implant cost", "dental implant procedure", "are dental implants worth it", "implant recovery time"],
    heroHeading: "How Dental Implants Replace Missing Teeth",
    heroSubheading: "Learn about surgery, healing, restoration, maintenance, risks, and who may be eligible.",
    directAnswer: "A dental implant is placed in the jawbone to support a crown, bridge, or denture. Treatment involves clinical assessment, surgery, healing, and a final restoration. Eligibility and prognosis depend on anatomy, gum and bone health, medical history, healing factors, bite, and maintenance.",
    detailedExplanation: [
      "An implant supports a restoration without using adjacent teeth in the same way as a traditional bridge. Bone can still change around an implant, and implants require cleaning and professional monitoring.",
      "The whole process does take a few months, so it's good to know what to expect. It starts with a minor surgery to place the titanium post in your jaw. Then you wait. For the next 3 to 6 months, your bone actually grows around the implant, making it super secure. This is called osseointegration. Once that's done, your dentist will put on a little connector piece (an abutment) and then your new, custom-matched crown.",
      "Implants and their restorations can develop infection, bone loss, loosening, fracture, wear, or other complications. Longevity cannot be guaranteed and depends on the site, health, healing, habits, bite, maintenance, and follow-up.",
      "So, is everyone a good fit for implants? Not exactly. You'll need to have enough bone in your jaw for the implant to grip onto (though a bone graft can sometimes fix that). You also need healthy gums and to be in pretty good health overall. And, just a heads up, smoking can really hurt the chances of success. Your dentist will be able to tell you for sure if implants are a good option for you."
    ],
    causes: [
      { title: "A really bad cavity", description: "Sometimes a cavity is just too big to fix with a filling, crown, or even a root canal. The tooth has to come out, and an implant is a great way to fill that space." },
      { title: "Gum disease", description: "If gum disease gets bad enough, it can wreck the bone that holds your teeth in place, causing them to fall out. Once the gum disease is under control, an implant can replace what was lost." },
      { title: "An accident or injury", description: "An implant may be one replacement option after a tooth is lost, depending on healing, bone, age, anatomy, and the treatment plan." },
      { title: "Old dental work giving out", description: "Maybe that old bridge or denture just isn't cutting it anymore. You can often replace it with a much more stable and comfortable implant." },
      { title: "Born without a tooth", description: "It's actually not that uncommon for some people to just be missing a permanent tooth from birth. An implant can fill that spot for good." }
    ],
    symptoms: [
      { text: "You're missing a tooth (or a few)", severity: "severe" },
      { text: "Your dental bridge is loose or just feels wrong", severity: "moderate" },
      { text: "Your dentures are always slipping or feel uncomfortable", severity: "moderate" },
      { text: "Your jaw feels smaller or your face looks sunken in", severity: "severe" },
      { text: "It's hard to talk or chew normally because of missing teeth", severity: "moderate" }
    ],
    whenToSeeDentist: [
      "You've lost a tooth and you want something permanent to replace it.",
      "You're sick and tired of your uncomfortable, loose dentures.",
      "Your dentist told you a tooth needs to be pulled.",
      "You just want to know what all your options are before you make a decision."
    ],
    keyTakeaways: [
      "Implants are one option for supporting a replacement tooth, bridge, or denture.",
      "Treatment can take several stages, and neither the implant nor its restoration has a guaranteed lifespan.",
      "They aren't for everybody. You need a healthy jawbone and good health in general to be a good candidate."
    ],
    faqs: [
      { question: "What's the real cost of a dental implant?", answer: "Okay, so for a single implant, you're usually looking at somewhere between $3,000 and $6,000. That price includes the implant post, the abutment (the connector), and the crown. But the final bill can change depending on where you live, how tricky the surgery is, and if you need a bone graft first. A lot of dentists offer payment plans to make it more manageable." },
      { question: "Does getting a dental implant hurt?", answer: "Anesthesia is used during placement, and recovery varies. Ask the surgeon what discomfort is expected, which medicines are safe for you, and which symptoms require an urgent call." },
      { question: "How long do dental implants last?", answer: "There is no guaranteed lifespan. The implant, connector, and restoration have different risks and may need maintenance, repair, or replacement." }
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
    lastReviewed: "2026-02-21"
  },
  "dry-socket": {
    slug: "dry-socket",
    title: "What is Dry Socket? (And How to Avoid It)",
    metaTitle: "Dry Socket After Tooth Extraction | DentaSmart",
    metaDescription: "Worried about getting a dry socket after your tooth is pulled? Here's what you need to know about what causes it, how to prevent it, and what to do if it happens.",
    primaryKeyword: "dry socket",
    secondaryKeywords: ["dry socket symptoms", "dry socket after extraction", "alveolar osteitis", "how to prevent dry socket"],
    heroHeading: "Everyone worries about dry socket after an extraction. It sounds scary.",
    heroSubheading: "Follow the extraction instructions and contact the dental office if pain worsens instead of improving.",
    directAnswer: "Dry socket, or alveolar osteitis, is a painful complication after an extraction. Pain often increases several days after the procedure and may spread toward the ear or temple. A dentist must distinguish it from infection and other causes of worsening pain.",
    detailedExplanation: [
      "Think of it like this: after a tooth comes out, your body makes a little blood clot in the socket. That clot is like a natural bandage. It protects the raw bone and nerves underneath while everything heals. It's also the foundation for new bone and gum tissue to grow back. A dry socket is what happens when that protective clot is gone too soon.",
      "So what causes it to disappear? Smoking is the biggest one, by far. Sucking on a straw or spitting really hard can also do it. Even a really tough extraction can increase your risk. And, believe it or not, women on birth control pills have a slightly higher risk because of how hormones can affect clotting.",
      "The main sign of a dry socket is a deep, throbbing pain that starts a few days *after* the extraction. The pain doesn't get better; it gets worse. It can even radiate up towards your ear or eye. You might also see the empty socket with the bone visible, or notice a bad taste or smell. Normal pain after an extraction gets better after a day or two. Dry socket pain is a whole different beast.",
      "Treatment depends on the examination and may include cleaning the area, a medicated dressing, pain management, and follow-up. Relief and healing time vary."
    ],
    causes: [
      { title: "Losing the Clot", description: "Using a straw, spitting, or smoking can create enough suction to pull the blood clot right out of the socket." },
      { title: "Smoking", description: "This is the #1 risk factor. The sucking action is bad, and the chemicals in tobacco mess with your body's ability to heal." },
      { title: "Birth Control Pills", description: "It sounds weird, but the high estrogen levels in some oral contraceptives can sometimes interfere with how your blood clots." },
      { title: "Not Keeping it Clean", description: "If bacteria build up around the socket, they can break down the clot before it's done its job." },
      { title: "A Tough Extraction", description: "Sometimes, if a tooth (especially a wisdom tooth) puts up a fight coming out, the trauma can make a dry socket more likely." }
    ],
    symptoms: [
      { text: "Serious, throbbing pain that starts 2-4 days after the tooth was pulled", severity: "severe" },
      { text: "Pain that shoots up to your ear, eye, or temple", severity: "severe" },
      { text: "You look in the socket and see bone instead of a dark blood clot", severity: "severe" },
      { text: "A bad smell or taste coming from the empty socket", severity: "moderate" },
      { text: "The pain pills your dentist gave you aren't touching the pain", severity: "severe" }
    ],

    whenToSeeDentist: [
      "You get hit with bad pain a few days after your extraction.",
      "Your pain medicine isn't doing anything to help.",
      "You look in the mirror and can see bone in the socket.",
      "You notice a funky taste or smell from the extraction site.",
      "You start running a fever."
    ],
    keyTakeaways: [
      "Worsening pain after an extraction needs a call to the treating dental office so dry socket, infection, and other complications can be assessed.",
      "The two best things you can do to avoid it? Don't smoke and don't use straws.",
      "If you do get it, don't panic. Your dentist can pack it with some medicated gauze that will make it feel better right away."
    ],
    faqs: [
      { question: "How long does dry socket last?", answer: "Once your dentist treats it, the pain gets way better in a day or two. The socket itself takes about a week to 10 days to heal up completely. If you don't get it treated, the pain can drag on for much longer. Don't do that to yourself." },
      { question: "Can a dry socket just heal on its own?", answer: "Well, technically, yes, it would eventually. But it would be a really, really painful and slow process. Just go to the dentist. The medicated dressing gives you quick relief and helps prevent infection. It's a no-brainer." },
      { question: "How can I tell if it's dry socket or expected pain?", answer: "Pain that increases instead of improving, spreads toward the ear or temple, or comes with a bad taste or odor deserves a call to the dental office. Only an examination can confirm the cause." }
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
    title: "What Is Oral Thrush? (And How to Deal With It)",
    metaTitle: "Oral Thrush: Causes & Treatment Guide | DentaSmart",
    metaDescription: "Got white stuff in your mouth? It could be oral thrush. Here's a simple guide to what causes it, how to treat it, and when you should see a doctor.",
    primaryKeyword: "oral thrush",
    secondaryKeywords: ["white patches in mouth", "oral candidiasis treatment", "thrush in adults", "mouth fungal infection"],
    heroHeading: "White patches in your mouth? Could be oral thrush.",
    heroSubheading: "White patches have several possible causes, so persistent or painful changes need professional evaluation.",
    directAnswer: "Oral thrush is an overgrowth of Candida yeast in the mouth. It may cause white patches, redness, soreness, taste changes, or cracks at the corners of the mouth. A clinician should confirm the diagnosis and consider medicines, dentures, dry mouth, diabetes, immune status, and other contributing factors.",
    detailedExplanation: [
      "Everyone has a tiny bit of Candida yeast in their mouth and gut. It's totally normal. Your body's immune system and all the good bacteria usually keep it from growing too much. But sometimes, that balance gets thrown off, and the yeast takes over. That's when you get thrush.",
      "So what throws off the balance? A few things. Antibiotics are a big one because they can wipe out the good bacteria that keep the yeast in line. Using a steroid inhaler for asthma can do it too. And if you have a weaker immune system, dry mouth, or dentures that don't fit right, you're more likely to get it. It's also why babies and the elderly get it more often because their immune systems just aren't as strong.",
      "The classic sign of thrush is those white patches. If you wipe them away, the skin underneath will look red and sore. Some people also say it feels like they have cotton in their mouth, or they can't taste things properly. It can even make it tough to swallow and cause little cracks at the corners of your lips.",
      "Treatment depends on the diagnosis and contributing factors and may include prescription antifungal medicine. Repeated episodes or swallowing problems need medical or dental review. Follow the instructions provided with an inhaler and ask the prescriber about mouth rinsing."
    ],
    causes: [
      { title: "Weakened immune system", description: "If you're dealing with something like HIV, diabetes, or cancer treatments, your body has a harder time fighting off the Candida yeast." },
      { title: "Antibiotics", description: "These meds can kill the good bacteria that keep yeast in check, letting the Candida grow wild." },
      { title: "Inhaled corticosteroids", description: "Using a steroid inhaler for asthma can let fungus grow in your mouth. Rinsing after you use it helps a lot." },
      { title: "Dry mouth", description: "Not having enough saliva makes it easier for Candida to set up shop and multiply." },
      { title: "Dentures", description: "Dentures that don't fit well or aren't cleaned regularly can become a breeding ground for thrush." }
    ],
    symptoms: [
      { text: "White, creamy-looking patches on your tongue, cheeks, or gums", severity: "moderate" },
      { text: "If you wipe the patches, the tissue underneath is red and sore", severity: "moderate" },
      { text: "A weird, cottony feeling in your mouth", severity: "mild" },
      { text: "You can't taste things right, or have a bad taste in your mouth", severity: "mild" },
      { text: "Redness and soreness that makes it hard to eat", severity: "moderate" },
      { text: "Little cracks at the corners of your mouth", severity: "mild" }
    ],

    whenToSeeDentist: [
      "You see white patches in your mouth and they aren't going away.",
      "It hurts to eat or swallow.",
      "You think you have thrush and you know your immune system is weak.",
      "You've tried home remedies for a week and nothing's changed.",
      "The thrush clears up but then comes right back."
    ],
    keyTakeaways: [
      "Oral thrush is a super common fungal infection and it's usually simple to treat.",
      "Using an asthma inhaler? Rinse your mouth out with water right after to lower your risk.",
      "If thrush keeps coming back, it might be a clue that there's another health issue you need to look into."
    ],
    faqs: [
      { question: "Can you catch oral thrush from someone?", answer: "Not really, it isn't considered contagious between adults. A mom and a nursing baby can pass it back and forth, though." },
      { question: "Will oral thrush go away by itself?", answer: "Sometimes a very mild case will clear up on its own if you're healthy. But why wait? Treatment makes it go away faster and stops it from spreading. If your immune system is weak, you should always see a doctor." },
      { question: "Can the DentaSmart app spot oral thrush?", answer: "DentaSmart can help you capture supported images and track visible changes. It cannot diagnose thrush, and image quality or location may limit what can be documented." }
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
    title: "TMJ Disorder: Jaw Pain, Clicking, and What to Do About It",
    metaTitle: "TMJ Disorder: Causes, Symptoms & Treatment | DentaSmart",
    metaDescription: "Is your jaw clicking, popping, or just plain hurting? It could be TMJ disorder. Here's a simple guide to what causes it and how to find relief.",
    primaryKeyword: "TMJ disorder",
    secondaryKeywords: ["TMJ treatment", "jaw clicking and popping", "temporomandibular joint pain", "TMD causes"],
    heroHeading: "That jaw of yours is a pretty complex piece of machinery. And when it's not happy, nothing feels right.",
    heroSubheading: "Millions of people deal with TMJ trouble. Figuring out what's going on is your first step toward feeling better.",
    directAnswer: "Temporomandibular disorders, or TMD, affect the jaw joint, chewing muscles, or related structures. Symptoms can include pain, limited movement, locking, or painful clicking. Management depends on the cause, duration, severity, and examination.",
    detailedExplanation: [
      "Your jawbone connects to your skull on both sides of your face with the temporomandibular joint (TMJ). It's a fancy name for one of the busiest joints in your body. It lets you talk, chew, and yawn. When this joint or the muscles around it act up, that's what we call TMJ disorder, or TMD.",
      "So what causes it? It can be a few things. Grinding your teeth at night (that's called bruxism), a direct hit to the jaw, arthritis, or even just stress making you clench your jaw all the time. For a lot of people, stress is the main trigger, even if the joint itself is perfectly fine.",
      "Symptoms can be all over the place. Sometimes it's just a mild click when you open your mouth (which is often no big deal). Other times, it's serious pain, your jaw might lock up, or you can barely eat. The pain can even spread to your ear, temple, or neck, which can be confusing.",
      "A clinician may recommend short-term changes, physical therapy, medicine, an oral appliance, or referral depending on the findings. An appliance is not appropriate for every case, and exercises should match the diagnosis."
    ],
    causes: [
      { title: "Teeth grinding (bruxism)", description: "Constantly grinding your teeth puts a ton of stress on your jaw joint and muscles. It's a recipe for inflammation and pain." },
      { title: "Jaw injury", description: "Getting hit in the jaw or even whiplash from a car accident can mess up the joint, the little disc inside it, or the muscles." },
      { title: "Arthritis", description: "Yep, arthritis can show up in your jaw too. Both osteoarthritis and rheumatoid arthritis can affect the TMJ." },
      { title: "Stress and tension", description: "When you're stressed, you clench. That clenching can either kickstart TMJ pain or just make it a whole lot worse." },
      { title: "Disc displacement", description: "There's a soft little disc that acts as a cushion in your jaw joint. If it slips out of place, you'll get that classic clicking, popping, or even a locked jaw." }
    ],
    symptoms: [
      { text: "Jaw hurts or feels tender, especially when you're chewing", severity: "moderate" },
      { text: "Clicking, popping, or grinding sounds when you open and close your mouth", severity: "mild" },
      { text: "Can't open your mouth all the way, or your jaw gets stuck", severity: "severe" },
      { text: "Headaches, a lot of the time right in your temples", severity: "moderate" },
      { text: "Earaches or a ringing sound in your ears (tinnitus)", severity: "mild" },
      { text: "Your face just aches or your jaw muscles feel tired", severity: "moderate" }
    ],

    whenToSeeDentist: [
      "Your jaw pain just won't quit after a week or so",
      "You literally can't open or close your mouth all the way",
      "Your jaw locks open or shut. That's a big one.",
      "The pain is so bad you can't eat, talk, or sleep normally",
      "You're hearing constant clicking or popping and it hurts"
    ],
    keyTakeaways: [
      "Short-term self-care may help some jaw symptoms, but persistent pain, locking, or limited movement needs professional evaluation.",
      "Grinding can contribute to some TMD symptoms but is not the only possible cause.",
      "Treatment should start with the diagnosis and use the least invasive appropriate option."
    ],
    faqs: [
      { question: "Will my TMJ disorder just go away by itself?", answer: "A lot of the time, yes. Mild cases often clear up in a few weeks with some self-care. But if it's really bad or just won't go away, you should see a dentist." },
      { question: "Is a clicking jaw always a bad sign?", answer: "Not always! A little click now and then with no pain is pretty common and usually nothing to worry about. It's when the clicking comes with pain, locking, or a stiff jaw that you need to get it checked out." },
      { question: "Can DentaSmart do anything for my TMJ?", answer: "DentaSmart is all about seeing what's going on in your mouth. While it can't treat TMJ directly, you can use it to keep track of your symptoms. That info can be super helpful for your dentist when you talk about treatment." }
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
  "periodontitis": {
  slug: "periodontitis",
  title: "Periodontitis: Causes, Symptoms, and Treatment",
  metaTitle: "Periodontitis | DentaSmart.ai",
  metaDescription: "Learn about periodontitis, an advanced form of gum disease. Find out about the causes, symptoms, and treatment options available to protect your smile.",
  primaryKeyword: "periodontitis",
  secondaryKeywords: ["gum disease", "periodontal disease", "bleeding gums", "loose teeth"],
  heroHeading: "Worried About Your Gums? Let's Talk About Periodontitis.",
  heroSubheading: "It's more than just a little bleeding. Advanced gum disease can be serious, but it's treatable. We can help.",
  directAnswer: "Periodontitis is a serious gum infection that damages the soft tissue and, without treatment, can destroy the bone that supports your teeth. It can cause teeth to loosen or lead to tooth loss. It's usually the result of poor oral hygiene.",
  detailedExplanation: [
    "Ever wonder what happens when gum inflammation gets out of hand? That's where periodontitis comes in. It’s the advanced stage of gum disease, a serious infection that doesn't just stay in your gums. It goes deeper, attacking the bone that holds your teeth in place. Think of it as a silent threat to your smile. You might not even know you have it until it's pretty far along.",
    "So, how does this all start? It usually begins with plaque, that sticky film of bacteria that’s always forming on your teeth. If you don't clean it off well, it hardens into tartar. Tartar is tough to get rid of with just a toothbrush and floss. The longer it stays, the more it irritates your gums, causing gingivitis, the early, reversible stage of gum disease.",
    "But if gingivitis isn't treated, it can progress to periodontitis. The gums pull away from the teeth, forming pockets. These pockets get infected, and the infection starts to break down the bone and connective tissue that keep your teeth anchored. It’s a slow process, but it can have some major consequences.",
    "The thing is, your body is trying to fight the infection. Your immune system sends out its defenders, but the combination of the bacteria and your body's own response can end up doing more harm than good. This ongoing inflammation is what ultimately leads to the destruction of your jawbone. The bottom line? Don't ignore bleeding gums. It could be the first sign of a bigger problem."
  ],
  causes: [
    { title: "Plaque Buildup", description: "It all starts here. When that sticky film of bacteria isn't cleaned off your teeth regularly, it sets the stage for trouble." },
    { title: "Smoking", description: "Smoking weakens your body's ability to fight infection, making it a major risk factor for gum disease. It also makes treatment less effective." },
    { title: "Hormonal Changes", description: "Changes in hormones, like those during pregnancy or menopause, can make gums more sensitive and more susceptible to gum disease." },
    { title: "Genetics", description: "Some people are just more prone to gum disease. Thanks, Mom and Dad! If it runs in your family, you need to be extra vigilant." },
    { title: "Poor Nutrition", description: "A diet lacking in important nutrients can make it harder for your body to fight off infection, including periodontitis." },
    { title: "Certain Medications", description: "Some drugs can reduce saliva flow, which helps protect your teeth and gums. Less saliva means a higher risk of plaque and tartar." }
  ],
  symptoms: [
    { text: "Gums that bleed easily", severity: "mild" },
    { text: "Swollen, red, or tender gums", severity: "moderate" },
    { text: "Persistent bad breath", severity: "mild" },
    { text: "Gums pulling away from your teeth", severity: "moderate" },
    { text: "Pus between your teeth and gums", severity: "severe" },
    { text: "Loose or separating teeth", severity: "severe" },
    { text: "A change in the way your teeth fit together when you bite", severity: "severe" }
  ],
  whenToSeeDentist: [
    "If your gums are bleeding when you brush or floss.",
    "If you have persistent bad breath that won't go away.",
    "If your gums are swollen, red, or tender to the touch.",
    "If you notice your teeth are starting to look longer (a sign of receding gums).",
    "If you have any loose teeth or notice a change in your bite.",
    "Basically, if you notice anything unusual with your gums or teeth, it's time to make an appointment. Better safe than sorry!"
  ],
  keyTakeaways: [
    "Periodontitis is advanced gum disease that can lead to tooth loss.",
    "It's caused by plaque buildup and can be made worse by things like smoking and genetics.",
    "Don't ignore bleeding gums. It's an early warning sign.",
    "Treatment is available and can stop the disease from getting worse.",
    "Good oral hygiene is your best defense against periodontitis."
  ],
  faqs: [
    { question: "Can periodontitis be cured?", answer: "Here's the deal: periodontitis can't be fully cured, but it can be managed. Treatment can stop it from progressing and help you keep your teeth. It requires ongoing care from your dentist and a solid home-care routine." },
    { question: "Is periodontitis contagious?", answer: "Not in the way a cold is, but the bacteria that cause it can be passed through saliva. So, it's best not to share toothbrushes or utensils if you have gum disease." },
    { question: "What happens if I don't treat periodontitis?", answer: "If left untreated, periodontitis can lead to tooth loss. The infection can also spread to other parts of your body, and it's been linked to other health problems like heart disease and diabetes." },
    { question: "How can I prevent periodontitis?", answer: "The best way to prevent it is with good old-fashioned brushing and flossing. Seriously. Brush twice a day, floss once a day, and see your dentist for regular checkups and cleanings. It's that simple." }
  ],
  relatedConditions: [
    { slug: "gum-disease", title: "Gum Disease" },
    { slug: "dental-abscess", title: "Dental Abscess" },
    { slug: "dental-implants", title: "Dental Implants" }
  ],
  relatedSymptoms: [
    { slug: "bleeding-gums", title: "Bleeding Gums" },
    { slug: "loose-tooth", title: "Loose Tooth" },
    { slug: "bad-breath", title: "Bad Breath" },
    { slug: "gum-inflammation", title: "Gum Inflammation" },
    { slug: "gum-tenderness", title: "Gum Tenderness" }
  ],
  relatedGuides: [
    { slug: "brushing-guide", title: "Brushing Guide" },
    { slug: "flossing-guide", title: "Flossing Guide" }
  ],
  reviewedBy: "Dr. Sarah Chen, DDS",
  reviewedByCredentials: "Board-Certified Periodontist",
  lastReviewed: "2026-03-15"
},
  "gingivitis-vs-periodontitis": {
  slug: "gingivitis-vs-periodontitis",
  title: "Gingivitis vs. Periodontitis: What's the Difference?",
  metaTitle: "Gingivitis vs. Periodontitis | DentaSmart",
  metaDescription: "Learn the key differences between gingivitis and periodontitis. Understand the signs of early and advanced gum disease to protect your smile.",
  primaryKeyword: "gingivitis vs periodontitis",
  secondaryKeywords: ["periodontitis vs gingivitis", "difference between gingivitis and periodontitis", "early gum disease"],
  heroHeading: "Gingivitis or Periodontitis? Know the Signs.",
  heroSubheading: "Don't let confusion about gum disease cost you your smile. We'll help you understand the difference and what to do next.",
  directAnswer: "Gingivitis is the mild, reversible first stage of gum disease caused by plaque buildup. Periodontitis is the serious, irreversible stage where the infection spreads below the gumline, destroying tissue and bone. The key difference is that periodontitis causes permanent damage, while gingivitis does not.",
  detailedExplanation: [
    "Ever wonder if your bleeding gums are a big deal? Well, they could be. It often starts with something called gingivitis. Think of it as a warning sign from your gums. It’s super common, and it’s your body’s way of saying, 'Hey, there’s too much plaque down here!' The good news? Gingivitis is totally reversible with better brushing and flossing. No permanent harm done. Yet.",
    "But here's the deal: if you ignore that warning, things can get much worse. The infection can dig in deeper, moving from your gums to the bone that holds your teeth in place. This is periodontitis, and it's a whole different ballgame. It's not just about irritated gums anymore. It's about a serious infection that can lead to tooth loss. And unlike gingivitis, the damage from periodontitis is for keeps.",
    "So, what's the dividing line? It's all about the structures that support your teeth. With gingivitis, the inflammation is just in the gums. With periodontitis, the infection has gone past the gums and is actively destroying the ligaments and bone. A dentist can tell the difference by measuring the small pockets between your teeth and gums. Small pockets usually mean gingivitis. Deeper pockets? That's a classic sign of periodontitis.",
    "The bottom line is you can't afford to wait and see. What looks like a little blood in the sink could be the first step toward a much bigger problem. Getting a handle on it early is the key to keeping your teeth for life. That's where we come in. to give you the straight facts so you can take action."
  ],
  causes: [
    { title: "Plaque Buildup", description: "This is the main culprit. When the sticky film of bacteria (plaque) isn't removed daily, it irritates your gums, leading to gingivitis. If it stays there, it hardens into tartar, which makes things even worse." },
    { title: "Smoking & Tobacco Use", description: "Smoking is a big one. It weakens your body's ability to fight infection, making it easier for gum disease to take hold and harder for your gums to heal. It's a major risk factor for periodontitis." },
    { title: "Hormonal Changes", description: "Life changes like pregnancy, puberty, and menopause can make gums more sensitive and prone to inflammation. It's not your fault, but it means you have to be extra careful with your oral hygiene." },
    { title: "Poor Nutrition", description: "Your body needs the right vitamins and minerals to fight off infection. A diet low in nutrients (especially Vitamin C) can make it harder for your gums to stay healthy. It's all connected." },
    { title: "Genetics", description: "Sometimes, it's just in the family. Some people are simply more genetically prone to developing gum disease than others, even if they have good habits. Sound familiar? It means you need to be even more vigilant." }
  ],
  symptoms: [
    { text: "Gums that bleed easily when you brush or floss", severity: "mild" },
    { text: "Red, swollen, or tender gums", severity: "mild" },
    { text: "Persistent bad breath or a bad taste in your mouth", severity: "moderate" },
    { text: "Gums that have pulled away from your teeth (recession)", severity: "moderate" },
    { text: "Pus between your teeth and gums", severity: "severe" },
    { text: "Loose or separating teeth", severity: "severe" },
    { text: "A change in the way your teeth fit together when you bite", severity: "severe" }
  ],
  whenToSeeDentist: [
    "If your gums bleed every time you brush.",
    "If your gums are puffy, sore, or bright red.",
    "If you have bad breath that just won't go away.",
    "If you notice your teeth looking longer (a sign of gum recession).",
    "If your teeth feel loose or have shifted.",
    "Honestly, if you suspect anything is wrong, just book a visit. It's always better to be safe."
  ],
  keyTakeaways: [
    "Gingivitis is reversible; periodontitis involves permanent damage.",
    "The main cause of both is plaque buildup from not brushing and flossing well enough.",
    "Don't ignore bleeding gums. It's the most common early warning sign.",
    "Periodontitis can lead to tooth loss if you don't get it treated.",
    "You can't fix periodontitis on your own; you need professional dental care.",
    "Seeing your dentist regularly is the best way to catch gum disease early."
  ],
  faqs: [
    { question: "Can you have gingivitis and periodontitis at the same time?", answer: "Not really. Think of it as a progression. You have gingivitis first, and if it's not treated, it can turn *into* periodontitis. Once you have periodontitis, the gingivitis is kind of a given. The inflammation is still there, but now there's bone loss, too." },
    { question: "Is periodontitis painful?", answer: "Here's the tricky part: it often isn't, especially in the early stages. That's why it's so sneaky. You might not feel any pain until the disease is very advanced and the damage is severe. This is why regular dental checkups are so important." },
    { question: "Can I reverse periodontitis?", answer: "Unfortunately, you can't reverse the damage it causes to your bone and ligaments. However, with professional treatment and excellent home care, you can stop it from getting worse and manage the condition to keep your teeth healthy for the long run." },
    { question: "How is periodontitis treated?", answer: "Treatment depends on how far it has progressed. It usually starts with a deep cleaning called scaling and root planing to remove tartar from below the gumline. In more advanced cases, surgery might be needed to clean the roots of the teeth and repair the bone." }
  ],
  relatedConditions: [{ slug: "gum-disease", title: "Gum Disease" }, { slug: "periodontitis", title: "Periodontitis" }, { slug: "dental-abscess", title: "Dental Abscess" }],
  relatedSymptoms: [{ slug: "bleeding-gums", title: "Bleeding Gums" }, { slug: "swollen-gums", title: "Swollen Gums" }, { slug: "gum-inflammation", title: "Gum Inflammation" }, { slug: "gum-tenderness", title: "Gum Tenderness" }, { slug: "bad-breath", title: "Bad Breath" }],
  relatedGuides: [{ slug: "brushing-guide", title: "Brushing Guide" }, { slug: "flossing-guide", title: "Flossing Guide" }],
  reviewedBy: "Dr. Sarah Chen, DDS",
  reviewedByCredentials: "Board-Certified Periodontist",
  lastReviewed: "2026-03-15"
},
};
export const conditionsList = Object.values(conditionsData);
