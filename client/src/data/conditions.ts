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
      "Figuring out what's causing your toothache is the first step. We'll help you understand the reasons, find some relief at home, and know when it's time to see a dentist.",
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
      "A toothache is your body sending a clear signal that something's wrong. Let's figure out what it means and what you can do.",
    directAnswer:
      "A toothache is just pain in or near a tooth. It's usually from a cavity, an infection, gum problems, or even a cracked tooth. For minor pain, you can try things like ibuprofen and saltwater rinses. But if the pain is bad, won't go away, or keeps getting worse, you need to see a dentist. Fast.",
    detailedExplanation: [
      "Almost everyone gets a toothache at some point. The pain can be a real pain (pun intended), ranging from a dull throb to a sharp, stabbing feeling that makes it impossible to think about anything else. Knowing what might be causing it helps you figure out your next move.",
      "So, what's the most common culprit? A good old-fashioned cavity. Bacteria make acid that eats through your tooth's tough outer shell (the enamel). Once it gets to the softer layer inside, called dentin, things start to hurt. And if it gets all the way to the nerve? That's when you get the really bad pain that might mean a root canal is in your future.",
      "But it's not always cavities. Gum disease can make your whole mouth ache. You could have a cracked tooth, a bad filling, or maybe you grind your teeth at night (that's called bruxism). Sometimes, it isn't even your tooth! A sinus infection can feel a lot like a toothache. Weird, right?",
      "While you're waiting for your dental appointment, you can do a few things to feel better. Rinsing with warm salt water (about half a teaspoon of salt in a glass of water) can calm down some of the swelling. An over-the-counter painkiller like ibuprofen is a good choice because it fights both pain and inflammation. A cold pack on your cheek can help numb things up, too.",
    ],
    causes: [
      {
        title: "Tooth Decay (Cavities)",
        description:
          "This is the big one. Bacteria create acid that just eats away at your tooth until it hits the nerve. Ouch.",
      },
      {
        title: "Gum Disease",
        description:
          "If your gums are infected, they can ache and throb, especially when you're trying to eat.",
      },
      {
        title: "Cracked or Fractured Tooth",
        description:
          "A tiny crack can let hot or cold sensations get right to the nerve, causing a super sharp pain.",
      },
      {
        title: "Dental Abscess",
        description:
          "This is a pocket of pus from an infection. It's a serious problem and you need to see a dentist right away. Don't wait.",
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
      "The pain just won't quit after a day or two, or it's getting worse.",
      "You're running a fever.",
      "Your face or jaw is swollen.",
      "It's hard to breathe or swallow. (Go to the ER for this one!)",
      "The pain is so bad that normal painkillers aren't helping.",
      "You see pus or have a gross taste coming from the tooth.",
    ],
    keyTakeaways: [
      "A toothache is usually from a cavity, infection, or a damaged tooth.",
      "Things like saltwater rinses and ibuprofen can help for a little while, but they won't fix the actual problem.",
      "If you have bad pain, swelling, or a fever, you need to call your dentist. It's an emergency.",
      "Using a tool like DentaSmart can help you spot issues before they turn into a full-blown, painful toothache.",
    ],
    faqs: [
      {
        question: "Will a toothache just go away by itself?",
        answer:
          "Not usually. The pain might fade for a bit, but the cavity or infection that's causing it is still there. Actually, if the pain suddenly stops, it could be a bad sign—it might mean the nerve has died, and that's a bigger problem.",
      },
      {
        question: "What's the quickest way to make a toothache stop hurting?",
        answer:
          "For temporary relief, your best bet is ibuprofen (it helps with swelling), a warm saltwater rinse, and a cold pack on your cheek. But remember, this is just a temporary fix until you can see your dentist.",
      },
      {
        question: "How much will it cost to fix my toothache?",
        answer:
          "It really depends on what's wrong. A simple filling might be $150-$300. A root canal can be $700-$1,500. And taking the tooth out could be $150-$650. This is why catching things early is so much better for your wallet.",
      },
      {
        question: "Can DentaSmart tell me what's wrong with my tooth?",
        answer:
          "DentaSmart can look at your photos and X-rays to give you an idea of what might be going on. It's a great starting point, but you still need to see a real dentist to get a final diagnosis and a treatment plan.",
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
      "Yep, cavities are the most common dental issue on the planet. But here's the good news: you can prevent them, and they're totally treatable if you catch them early.",
    directAnswer:
      "So, what is a cavity? It's a little hole that forms in your tooth when the hard outer layer gets damaged. This happens because of bacteria, snacking a lot, sipping on sugary drinks, and not cleaning your teeth well. If you catch it super early, you can sometimes reverse it with fluoride. But once a hole actually forms, a dentist has to put in a filling.",
    detailedExplanation: [
      "Cavities (your dentist might call them 'dental caries') get started when bacteria in your mouth make acids that literally eat away at your tooth enamel. It doesn't happen overnight. It all begins with a little white spot on your tooth where minerals have been lost. At this stage, you can still turn things around with fluoride and by being really good with your brushing and flossing.",
      "But if the decay keeps going, it chews through the enamel and gets to the softer part of your tooth inside, called dentin. That's when you'll probably start to feel some sensitivity or a little pain. The cavity might look like a brown or black spot, and you could see a tiny hole. At that point, you'll need a dentist to put in a filling to fix it up.",
      "If you just ignore it, the decay can get all the way to the nerve of the tooth (the pulp). And that's when you get some serious pain and maybe even an infection, called an abscess. Fixing it then means a root canal or even pulling the tooth, which is way more expensive and a much bigger deal than a simple filling.",
      "The best way to deal with cavities is to not get them in the first place. It's pretty simple: brush twice a day with a fluoride toothpaste, floss once a day, don't go crazy with sugary snacks and drinks, and see your dentist for regular checkups. DentaSmart can help you keep an eye on things between visits and spot trouble before it turns into a real pain.",
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
          "Your spit is actually your friend—it helps rinse away food and calm down acid. If your mouth is dry because of a medical condition or medicine you're taking, your risk for cavities goes up.",
      },
      {
        title: "Old Fillings or Dental Work",
        description:
          "Sometimes, old fillings get worn down and can have tiny gaps or rough spots. These are perfect hiding places for bacteria to start new cavities.",
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
      "Cavities start out small and don't hurt. By the time you feel pain, the problem is already pretty serious.",
      "You can sometimes reverse super early cavities (the white spot stage) with fluoride.",
      "A simple filling might cost you $150-$300. But if you wait, it could turn into a $700-$1,500 root canal. Ouch.",
      "Keeping an eye on your teeth with DentaSmart can help you catch decay before it gets painful and expensive.",
    ],
    faqs: [
      {
        question: "How can I tell if I have a cavity?",
        answer:
          "Honestly, early on you probably can't. They don't have symptoms. As they get bigger, you might feel sensitivity to sugar or temperature, or see a dark spot or a hole. DentaSmart can often spot early signs in your photos and X-rays before you feel a thing.",
      },
      {
        question: "Can I get rid of a cavity myself?",
        answer:
          "Only if you catch it at the very, very beginning (when it's just a white spot). Using fluoride toothpaste and getting fluoride treatments can help your enamel heal. But once there's an actual hole, a dentist has to place a filling. No way around it.",
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
      "Worried about bleeding gums? Learn about the stages of gum disease, what causes it, and simple ways you can protect your smile. It's easier than you think!",
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
      "Think of your gums as the foundation for your teeth. If they're not in good shape, your whole smile is at risk. Here’s what you need to know.",
    directAnswer:
      "Gum disease is basically an infection in the tissues holding your teeth. It usually starts with gingivitis—that's when your gums get red, puffy, and bleed when you brush. If you don't deal with it, it can turn into periodontitis, which is way more serious and can lead to bone and tooth loss. The main culprit? Plaque buildup. The good news is you can totally reverse the early stages with good habits.",
    detailedExplanation: [
      "Did you know nearly half of all adults over 30 have some form of gum disease? It all starts with plaque, which is a sticky film of bacteria that loves to hang out along your gumline. If you don't brush and floss it away, it hardens into tartar. And tartar isn't something you can remove on your own; you'll need a dental pro for that.",
      "The first stage is called gingivitis. You might notice your gums are a bit red or swollen. Or maybe they bleed when you brush. The great thing is, at this point, no permanent damage has been done to the bone holding your teeth. Gingivitis is 100% reversible with better brushing and flossing, plus a professional cleaning.",
      "But if you let gingivitis slide, it can get worse and become periodontitis. This is when your gums start to pull away from your teeth, creating little pockets that get infected. Your body's immune system tries to fight the infection, but this process (along with the bacteria) starts to break down the actual bone and tissue that support your teeth. This is when teeth can get loose and might even need to be pulled. Scary stuff.",
      "So what puts you at risk? Smoking is the biggest one, by far. But other things like diabetes, hormone shifts (hello, pregnancy!), certain meds that cause dry mouth, and even your genes can play a part. Your best defense is simple: see your dentist regularly and keep up with your brushing and flossing at home. Using DentaSmart can also help you spot any changes in your gums between those visits.",
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
          "Honestly, this is the worst thing you can do for your gums. Smoking messes with your immune system and makes it way harder for your gums to heal.",
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
      "Gum disease is the #1 reason adults lose teeth, but you can completely reverse the early stages.",
      "Bleeding gums are never normal. Think of it as a warning sign.",
      "If you smoke, quitting is the single best thing you can do for your gum health.",
      "Using DentaSmart helps you keep an eye on your gums so you can catch problems before they get serious.",
    ],
    faqs: [
      {
        question: "Can you actually cure gum disease?",
        answer:
          "Yep, the early stage (gingivitis) is totally reversible with good home care and a dental cleaning. But once it gets to the advanced stage (periodontitis), you can only manage it. The bone you lose, unfortunately, doesn't grow back.",
      },
      {
        question: "Can I catch gum disease from someone?",
        answer:
          "Well, the bacteria that cause it can be passed through saliva—so, kissing or sharing a fork. But just because you get the bacteria doesn't mean you'll get the disease. It really comes down to your own immune system and how well you take care of your teeth.",
      },
      {
        question: "What's the cost for gum disease treatment?",
        answer:
          "A standard cleaning is usually $75 to $200. If you need a deep cleaning, that's more like $150-$350 for each quarter of your mouth. And if you need surgery, it can get expensive, from $500 to over $10,000. So, catching it early will save you a ton of money.",
      },
      {
        question: "Does DentaSmart know if I have gum disease?",
        answer:
          "DentaSmart is pretty smart! It can spot visual clues like red gums or recession by analyzing your photos over time. It's a great way to track your gum health between appointments, but you still need a dentist to make the official call.",
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
      "Wondering about wisdom teeth pain? Learn what causes it, what an 'impacted' tooth is, and figure out if you need to get them removed. We'll help you know what to do.",
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
      "Your wisdom teeth can be a real pain if your mouth doesn't have enough space for them. Here's how to tell if yours are becoming a problem.",
    directAnswer:
      "That pain in the back of your mouth? It's likely your wisdom teeth trying to come in. This usually happens between 17 and 25. When there's no room, they get 'impacted' and can cause pain, swelling, and even mess up other teeth. You don't always have to get them out, but if they're bugging you, a dentist should definitely take a look.",
    detailedExplanation: [
      "So, what's the deal with wisdom teeth? They're your third and final set of molars, and they usually show up fashionably late to the party, somewhere between 17 and 25. You might get all four, or you might get none. It varies! The trouble starts when your jaw is too crowded for them to come in straight.",
      "If a wisdom tooth gets stuck and can't pop through the gums all the way, it's called 'impacted.' These troublemakers can grow in all sorts of weird directions—sideways, angled, you name it. And when they do, you'll know it. Think pain, a swollen jaw, and good luck opening your mouth all the way.",
      "A really common issue is something called pericoronitis. It’s a fancy word for an infection in the gum flap over a tooth that's only partway out. Food and germs get stuck under there and cause a real stink (literally) and a lot of pain. Your dentist will probably give you antibiotics, and it's a big hint that the tooth might need to come out.",
      "But do you HAVE to get them removed? Not always. If your wisdom teeth come in straight, are healthy, and you can brush them properly, they can just hang out. Your dentist will keep an eye on them with X-rays. DentaSmart can even help you see what your dentist sees on those X-rays, so you're in the loop.",
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
      "Using DentaSmart to check out your X-rays can help you spot issues early on.",
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
          "You bet. DentaSmart can check out your X-rays and show you what's going on. It can point out if a tooth looks impacted or if there are other problems. That way, you'll know what to ask your dentist.",
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
      "Thinking about teeth whitening? We compare everything from strips to pro treatments so you know what works, what's safe, and what to expect.",
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
      "A brighter smile can make you feel great. But what actually works? Here's how to figure out the best and safest option for you.",
    directAnswer:
      "Basically, teeth whitening uses a bleach (usually hydrogen or carbamide peroxide) to make your teeth lighter. Getting it done at the dentist is the fastest way to see big results. At-home stuff like strips and trays work too, they just take longer. Most of the time it's perfectly safe, but your teeth might feel a little sensitive for a bit.",
    detailedExplanation: [
      "It's just a fact of life. Teeth get darker as we get older. Things like coffee, tea, red wine, and smoking don't help either. Whitening treatments use peroxide to get into your tooth enamel and break up the stains. It's a simple chemical reaction.",
      "Getting it done by a pro? They use stronger stuff (like 25-40% hydrogen peroxide) and sometimes special lights to speed things up. You can walk out with teeth 3-8 shades lighter in just one visit. It'll cost you, though—anywhere from $300 to $1,000.",
      "If you'd rather do it yourself, you've got options. Whitening strips have about 6-14% peroxide. Or your dentist can make you custom trays with a gel that's a bit stronger. Even whitening toothpastes can help a little, but they mostly just scrub off surface stains. With strips and trays, you should see a difference in a week or two if you stick with it.",
      "But is it for everyone? Not really. Whitening won't change the color of crowns, veneers, or fillings. And if you have sensitive teeth, gum problems, or thin enamel, you should definitely talk to your dentist first. Don't overdo it, or you could hurt your enamel. The DentaSmart app can be a cool way to see how your tooth shade changes over time.",
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
      "You want the fastest, most dramatic results—go pro.",
      "You have sensitive teeth and want to make sure you whiten safely.",
      "The stains seem to be inside your tooth (kind of grayish), which surface whitening won't fix.",
      "You have crowns, veneers, or big fillings on your front teeth.",
      "You tried an over-the-counter kit and it's making your teeth hurt.",
    ],
    keyTakeaways: [
      "A dentist will get you the fastest results, but whitening strips are pretty good for lighter stains.",
      "Remember, whitening only works on natural teeth. It won't change the color of crowns or fillings.",
      "It's normal for your teeth to be a little sensitive afterward. It usually goes away in a day or two.",
      "You can use the DentaSmart app to take pictures and see if your whitening is actually working.",
    ],
    faqs: [
      {
        question: "How long will my teeth stay white?",
        answer:
          "If you get it done professionally, you can expect it to last 1-3 years. It really depends on what you eat and drink. You can do touch-ups every 6-12 months to keep things bright. And obviously, avoiding coffee and red wine helps a lot.",
      },
      {
        question: "Is teeth whitening bad for my enamel?",
        answer:
          "Nope, not if you do it right. As long as you use products approved by dental associations and follow the directions, you're good. Just don't go crazy with it. When in doubt, ask your dentist.",
      },
      {
        question: "Why are my teeth so sensitive after whitening?",
        answer:
          "The whitening gel opens up tiny pores in your enamel for a little while. This lets things get to the nerve layer easier. It's totally normal and should stop within a day or two. Try using a sensitivity toothpaste before and after.",
      },
      {
        question: "Can the DentaSmart app help me track my progress?",
        answer:
          "It sure can. The app can analyze your tooth photos over time, giving you a clear, unbiased look at how much your tooth color is changing.",
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
    heroHeading: "That sudden 'zing' in your tooth isn't normal.",
    heroSubheading: "You know the feeling. A sip of hot coffee or a bite of ice cream, and bam! A sharp pain. Let's figure out what your teeth are trying to tell you.",
    directAnswer: "Got sensitive teeth? It's usually because the hard outer layer of your tooth (the enamel) has worn thin, or your gums have pulled back. This exposes a softer layer called dentin, which has tiny tunnels that lead right to the nerve. So when you eat something hot, cold, or sweet, it zaps the nerve and you feel that pain. For most people, using a special toothpaste for sensitivity and brushing gently does the trick. But if the pain just won't quit, you should definitely have a dentist take a look.",
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
      "You don't have to just put up with sensitive teeth. It's a common problem and there are fixes.",
      "First thing to try: grab a soft toothbrush and some desensitizing toothpaste. It often works wonders.",
      "If it keeps getting worse or just won't go away, let a dentist check it out. They need to make sure it isn't something more serious like a cavity or gum disease."
    ],
    faqs: [
      { question: "Will my sensitive teeth get better on their own?", answer: "Sometimes! If it's from something temporary like a teeth whitening session, it'll probably fade in a few weeks. But if it's from worn-down enamel or receding gums, it won't fix itself. You'll need to do something about it." },
      { question: "Does sensitivity mean I have a cavity?", answer: "It could. A cavity is basically a hole that exposes the sensitive part of your tooth. If the pain is just in one spot and seems to be getting worse, you should get it checked for decay. Better safe than sorry." },
      { question: "Does that special toothpaste for sensitive teeth really work?", answer: "Yep, for a lot of people it does. It has ingredients that help block those tiny tubes in your dentin, so the nerve doesn't get zapped. You have to be patient, though—it can take 2 to 4 weeks of using it every day to notice a real difference." },
      { question: "How can DentaSmart help with my sensitive teeth?", answer: "DentaSmart is a great tool for keeping track of your symptoms. You can see what triggers the pain and get a better idea of what might be causing it. It won't replace a trip to the dentist, but it gives you some solid info to bring to your appointment." }
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
    metaDescription: "Got a cracked tooth? It can be scary. We'll help you figure out what kind of crack you might have, what to look for, and when it's time to call the dentist. Simple advice for a not-so-simple problem.",
    primaryKeyword: "cracked tooth",
    secondaryKeywords: ["cracked tooth symptoms", "fractured tooth treatment", "hairline crack in tooth", "craze lines teeth"],
    heroHeading: "A cracked tooth isn't always a disaster.",
    heroSubheading: "Some cracks are no big deal. Others? They need a dentist, fast. Here’s how you can tell the difference and figure out your next move.",
    directAnswer: "So, you think you have a cracked tooth? It could be anything from a tiny, harmless line to a deep crack that puts the whole tooth at risk. You might feel a zing when you bite down, have a tooth that's suddenly sensitive to hot and cold, or just a pain that shows up and disappears. What the dentist does depends on how bad the crack is. For a little one, some bonding might be all it takes. For a deeper crack, you might be looking at a crown or even a root canal. If you think you have a crack, get it checked out. Sooner is always better.",
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
      "Don't panic! Not all cracks are a big deal. Craze lines are just cosmetic, but deeper cracks need a pro.",
      "That on-and-off pain is a huge clue. Don't ignore it just because it stops for a while.",
      "Getting it treated early is the key. If you wait, a simple fix can turn into losing the tooth. Nobody wants that."
    ],
    faqs: [
      { question: "Can a cracked tooth heal by itself?", answer: "Nope. Your teeth can't heal themselves like bones can. A crack won't get better on its own, and it can actually get worse if bacteria get in there and cause an infection." },
      { question: "How do I know if my tooth is cracked or just sensitive?", answer: "A cracked tooth usually gives you a sharp, sudden pain when you bite down. General sensitivity is more of a dull ache that you feel when you have something hot or cold. But really, the only way to know for sure is to have a dentist check it out." },
      { question: "Does a cracked tooth always mean I need a crown?", answer: "Not at all. For tiny cracks, a little bonding or a filling might be all you need. If the crack is deep and has reached the tooth’s pulp, you might need a root canal and then a crown. Your dentist will tell you the best way to fix it." },
      { question: "Can DentaSmart tell me if my tooth is cracked?", answer: "DentaSmart can help you figure out if your symptoms point to a cracked tooth and how urgent it is. But since cracks can be tricky to spot, you'll need to see a dentist in person to be 100% sure." }
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
      "So how does this happen? When bacteria sneak into a tooth (usually through a cavity, a crack, or your gums), your body goes on the attack. It sends in the troops—white blood cells—to fight the infection. This battle creates pus. If that pus gets trapped with nowhere to go, boom. You've got an abscess.",
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
      { question: "How long do I have before an abscess gets dangerous?", answer: "It can get dangerous fast—we're talking days. If your face is swelling, you have a fever, or you're having trouble breathing, that's a sign the infection is spreading. You should head to an emergency room right away." },
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
    "Your tooth isn't solid all the way through. There's a soft center called the pulp, which is where the nerves and blood vessels live. If that pulp gets infected—from a bad cavity, a crack in the tooth, or even an old injury—it's got to be dealt with. And a root canal is usually the best way to do that without pulling the whole tooth.",
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
      "A crown can save a tooth that you might otherwise have to get pulled. Think of it as an investment in keeping your own teeth.",
      "Today's crowns look super natural and can last a long time, like 10-15 years or even more if you take care of them.",
      "You still have to brush and floss around your crown! A crown protects the top, but you can still get a cavity where the crown meets the tooth."
    ],
    faqs: [
      { question: "How long do dental crowns actually last?", answer: "If you're good about brushing and seeing your dentist, a crown can last 10-15 years. Some people have them for 25 years or more. It really depends on the material, how hard you bite, and how well you take care of it." },
      { question: "Is getting a crown going to hurt?", answer: "Your dentist will numb the area, so you won't feel any pain during the actual procedure. You might have some mild sensitivity for a few days after, but that's totally normal and it usually goes away pretty fast." },
      { question: "How do I know if I need a crown or just a filling?", answer: "It's a judgment call. But usually, if more than half of your tooth is gone or damaged, a crown is a better bet for the long run. If the damage is smaller, a filling might be all you need. Your dentist will tell you what they think is best." },
      { question: "Can DentaSmart tell me if I need a crown?", answer: "DentaSmart can definitely help you figure out what's going on with your teeth and understand why a dentist might suggest a crown. Our AI can spot the kind of major damage that usually means a crown is needed, so you'll have a better idea of what to expect before you even go to the dentist." }
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
    directAnswer: "Teeth grinding, or bruxism, is when you clench or grind your teeth without meaning to, mostly while you're asleep. It's pretty common—affecting about 10-15% of adults—and can mess with your teeth, jaw, and even face muscles. The main ways to stop it are getting a custom night guard, managing stress, and figuring out what's causing it in the first place.",
    detailedExplanation: [
      "Ever heard of bruxism? It's the official name for teeth grinding, where you clench or grind your teeth without thinking about it, usually in your sleep. A lot of people don't even know they do it until their partner says something or their dentist spots the tell-tale signs on their teeth.",
      "So, what kicks it off? It's usually stress and anxiety. But it can also be linked to things like sleep apnea, a bite that's a little off, or even certain meds (like some antidepressants). Lifestyle choices matter too, so things like too much coffee or alcohol can make it worse. And since it all goes down while you're sleeping, the damage can pile up for a long time before you notice anything is wrong.",
      "If you let it go, grinding can wear down your tooth enamel, crack or chip your teeth, lead to nagging jaw pain, and even cause headaches or TMJ problems. But here's the good news: it's totally treatable. A custom-fit night guard is a game-changer for protecting your teeth. Then, you can focus on what's causing the grinding to begin with (like stress or a sleep issue) for a real, long-term fix.",
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
      "Getting a custom night guard from your dentist is the best way to stop your teeth from getting worn down.",
      "For a long-term fix, you have to get to the bottom of what's causing it—whether that's stress, a sleep problem, or something else."
    ],
    faqs: [
      { question: "How can I tell if I grind my teeth at night?", answer: "Waking up with a sore jaw or a headache is a big clue. Or maybe you've noticed your teeth look a bit worn down. Sometimes, the first person to notice is the one sleeping next to you! The DentaSmart app can also help you track changes to your teeth." },
      { question: "Can teeth grinding actually cause permanent damage?", answer: "Yep. If you don't do anything about it, chronic grinding can wear away your enamel for good, crack your teeth, mess up dental work, and lead to TMJ issues. Getting a night guard early on prevents almost all of that." },
      { question: "Are the night guards from the drugstore any good?", answer: "They're better than nothing, but they don't fit nearly as well as one your dentist makes for you. A bad fit can actually make your jaw problems worse. If you grind your teeth regularly, it's worth getting a custom one." }
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
    heroHeading: "Implants are as close as you can get to having your real teeth back.",
    heroSubheading: "They look and feel so natural, and with good care, they can last forever. Here's what you need to know.",
    directAnswer: "A dental implant is just a small titanium post that a surgeon puts into your jawbone where a tooth root used to be. After it heals and bonds with the bone, your dentist attaches a custom-made crown on top. People love implants because they save your jawbone, don't mess with the teeth next door, and can easily last 20+ years if you take care of them.",
    detailedExplanation: [
      "If you're missing teeth, dental implants are hands-down the most natural and durable way to replace them. What makes them so great? Unlike dentures or a bridge, an implant actually replaces the root of the tooth. This is a big deal because it keeps your jawbone strong and prevents that sunken-in look that can happen when a tooth is gone.",
      "The whole process does take a few months, so it's good to know what to expect. It starts with a minor surgery to place the titanium post in your jaw. Then you wait. For the next 3 to 6 months, your bone actually grows around the implant, making it super secure. This is called osseointegration. Once that's done, your dentist will put on a little connector piece (an abutment) and then your new, custom-matched crown.",
      "And get this—the success rate for modern implants is over 95%. That's because they're made of titanium, which the body almost never rejects. If you brush, floss, and see your dentist for checkups, the implant itself should last your entire life. The crown on top might need to be replaced every 10-15 years from normal wear and tear, but the foundation is permanent.",
      "So, is everyone a good fit for implants? Not exactly. You'll need to have enough bone in your jaw for the implant to grip onto (though a bone graft can sometimes fix that). You also need healthy gums and to be in pretty good health overall. And, just a heads up, smoking can really hurt the chances of success. Your dentist will be able to tell you for sure if implants are a good option for you."
    ],
    causes: [
      { title: "A really bad cavity", description: "Sometimes a cavity is just too big to fix with a filling, crown, or even a root canal. The tooth has to come out, and an implant is a great way to fill that space." },
      { title: "Gum disease", description: "If gum disease gets bad enough, it can wreck the bone that holds your teeth in place, causing them to fall out. Once the gum disease is under control, an implant can replace what was lost." },
      { title: "An accident or injury", description: "It happens. A tooth gets knocked out playing sports or in some kind of accident. An implant is a perfect fix for that." },
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
      "Implants are the best option out there for a replacement tooth that looks and feels real.",
      "It's a multi-month process, for sure, but the result is a tooth that can last the rest of your life.",
      "They aren't for everybody. You need a healthy jawbone and good health in general to be a good candidate."
    ],
    faqs: [
      { question: "What's the real cost of a dental implant?", answer: "Okay, so for a single implant, you're usually looking at somewhere between $3,000 and $6,000. That price includes the implant post, the abutment (the connector), and the crown. But the final bill can change depending on where you live, how tricky the surgery is, and if you need a bone graft first. A lot of dentists offer payment plans to make it more manageable." },
      { question: "Does getting a dental implant hurt?", answer: "During the actual procedure? Nope. You'll be numbed up with local anesthesia, so you won't feel any pain. Afterwards, you can expect some soreness, but most people say it's nothing that over-the-counter pain meds can't handle. It usually feels much better in just a few days." },
      { question: "How long do dental implants actually last?", answer: "Forever, hopefully! If you take good care of them, the implant post itself should last your whole life. The crown that sits on top will get a lot of wear and tear, so you might need to replace it after about 10 or 15 years. But the implant in your jawbone is there to stay." }
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
    heroSubheading: "But here's the good news: you can prevent it. And if it does happen, we can fix it. Let's break it down.",
    directAnswer: "A dry socket, or alveolar osteitis, is what happens when the blood clot that's supposed to form in the hole after a tooth extraction gets knocked out or dissolves too soon. This leaves the bone and nerves underneath exposed. Ouch. It causes some pretty intense pain that usually kicks in about 2 to 4 days after you get the tooth pulled. It only happens in about 2-5% of regular extractions, but that number jumps to 30% for wisdom teeth. It hurts a lot, but it's not dangerous and your dentist can treat it easily.",
    detailedExplanation: [
      "Think of it like this: after a tooth comes out, your body makes a little blood clot in the socket. That clot is like a natural bandage. It protects the raw bone and nerves underneath while everything heals. It's also the foundation for new bone and gum tissue to grow back. A dry socket is what happens when that protective clot is gone too soon.",
      "So what causes it to disappear? Smoking is the biggest one, by far. Sucking on a straw or spitting really hard can also do it. Even a really tough extraction can increase your risk. And, believe it or not, women on birth control pills have a slightly higher risk because of how hormones can affect clotting.",
      "The main sign of a dry socket is a deep, throbbing pain that starts a few days *after* the extraction. The pain doesn't get better; it gets worse. It can even radiate up towards your ear or eye. You might also see the empty socket with the bone visible, or notice a bad taste or smell. Normal pain after an extraction gets better after a day or two. Dry socket pain is a whole different beast.",
      "Getting it treated is simple. Your dentist will gently clean out the socket and place a special medicated dressing inside. This stuff brings relief almost instantly. You might have to come back in a few days to have the dressing changed out. With treatment, the whole thing usually heals up in about a week to 10 days."
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
      "Dry socket hurts a lot, but it won't kill you. It's just the most common hiccup after getting a tooth pulled.",
      "The two best things you can do to avoid it? Don't smoke and don't use straws.",
      "If you do get it, don't panic. Your dentist can pack it with some medicated gauze that will make it feel better right away."
    ],
    faqs: [
      { question: "How long does dry socket last?", answer: "Once your dentist treats it, the pain gets way better in a day or two. The socket itself takes about a week to 10 days to heal up completely. If you don't get it treated, the pain can drag on for much longer. Don't do that to yourself." },
      { question: "Can a dry socket just heal on its own?", answer: "Well, technically, yes, it would eventually. But it would be a really, really painful and slow process. Just go to the dentist. The medicated dressing gives you quick relief and helps prevent infection. It's a no-brainer." },
      { question: "How can I tell if it's dry socket or just normal pain?", answer: "Normal pain after an extraction is worst on day 1 or 2 and then starts to fade. Dry socket pain is the opposite—it shows up a few days later and gets much worse. If the pain is throbbing and spreading, or you can see bone, it's almost definitely a dry socket." }
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
    heroSubheading: "It's common, it's treatable, and it's usually not a big deal. But you do need to take care of it.",
    directAnswer: "Oral thrush is just a fungal infection that happens when a yeast called Candida gets a little out of control in your mouth. You'll probably see creamy white bumps on your tongue, cheeks, or gums. It pops up more often in babies, older folks, or anyone whose immune system is a bit weak. Taking antibiotics can also trigger it. The good news? It's usually easy to fix with antifungal medicine.",
    detailedExplanation: [
      "Everyone has a tiny bit of Candida yeast in their mouth and gut. It's totally normal. Your body's immune system and all the good bacteria usually keep it from growing too much. But sometimes, that balance gets thrown off, and the yeast takes over. That's when you get thrush.",
      "So what throws off the balance? A few things. Antibiotics are a big one because they can wipe out the good bacteria that keep the yeast in line. Using a steroid inhaler for asthma can do it too. And if you have a weaker immune system, dry mouth, or dentures that don't fit right, you're more likely to get it. It's also why babies and the elderly get it more often—their immune systems just aren't as strong.",
      "The classic sign of thrush is those white patches. If you wipe them away, the skin underneath will look red and sore. Some people also say it feels like they have cotton in their mouth, or they can't taste things properly. It can even make it tough to swallow and cause little cracks at the corners of your lips.",
      "Your doctor or dentist will likely prescribe an antifungal medicine to clear it up. For a really mild case, you might get by with just salt water rinses or eating probiotic yogurt. Oh, and if you use an asthma inhaler, make sure to rinse your mouth with water right after. If you keep getting thrush over and over, it might be a sign that something else is going on with your health, so you'll want to get that checked out."
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
      { question: "Can the DentaSmart app spot oral thrush?", answer: "The DentaSmart app is great for taking pictures of things like white patches in your mouth so you can see how they change over time. It can't diagnose thrush for you, but it gives you a perfect record to show your dentist." }
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
    directAnswer: "TMJ disorder (or TMD) is really just a catch-all term for problems with your jaw joint and the muscles that move it. You might notice jaw pain, weird clicking or popping sounds, a stiff jaw, or even headaches. The good news? Most TMJ issues don't last and get better with some simple self-care. Surgery is almost never the answer.",
    detailedExplanation: [
      "Your jawbone connects to your skull on both sides of your face with the temporomandibular joint (TMJ). It's a fancy name for one of the busiest joints in your body—it lets you talk, chew, and yawn. When this joint or the muscles around it act up, that's what we call TMJ disorder, or TMD.",
      "So what causes it? It can be a few things. Grinding your teeth at night (that's called bruxism), a direct hit to the jaw, arthritis, or even just stress making you clench your jaw all the time. For a lot of people, stress is the main trigger, even if the joint itself is perfectly fine.",
      "Symptoms can be all over the place. Sometimes it's just a mild click when you open your mouth (which is often no big deal). Other times, it's serious pain, your jaw might lock up, or you can barely eat. The pain can even spread to your ear, temple, or neck, which can be confusing.",
      "But don't worry, most TMJ problems get better with some easy at-home care. Think soft foods, warm compresses, and gentle jaw exercises. Learning to manage stress helps a ton, too. If you're a grinder, a custom night guard from your dentist can be a game-changer. Surgery? That's a last resort. We only even think about it after trying everything else."
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
      "Most of the time, you can fix TMJ problems yourself with things like soft foods and warm compresses.",
      "Grinding your teeth is a huge reason people get TMJ disorder.",
      "Seriously, surgery is almost never needed. Most people get better without it."
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
};
export const conditionsList = Object.values(conditionsData);
