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
    title: "Why Does My Tooth Hurt When I Bite Down?",
    metaTitle: "Tooth Pain When Biting Down? Here's What It Could Be | DentaSmart",
    metaDescription:
      "Ouch! Got tooth pain when you bite or chew? It could be a few things. Here are the most common causes and what you should do next.",
    primaryKeyword: "tooth pain when biting",
    secondaryKeywords: ["pain when chewing", "tooth hurts when I bite down", "cracked tooth pain", "sharp tooth pain biting"],
    heroHeading: "That Sharp Pain When You Bite Down",
    heroSubheading: "Yep, that's your tooth trying to tell you something isn't right. Let's figure out what's going on and what to do about it.",
    directAnswer:
      "Most of the time, pain when you bite down means you've got a cracked tooth, a bad filling, a deep cavity, or maybe even an infection (called an abscess). It hurts because the pressure from biting is hitting a weak spot. If it's just a little twinge now and then, it might not be a huge deal, but if it's a sharp pain every time, you should get it checked out.",
    detailedExplanation: [
      "Healthy teeth shouldn't hurt. Period. So if you feel a sharp pain or a dull ache in one spot when you bite, something's up with the tooth or the gums around it. The pressure from chewing is basically squeezing a damaged part of your tooth, and it doesn't like that.",
      "A cracked tooth is the usual suspect. These cracks can be so small you can't even see them, but when you bite, the crack opens up just enough to irritate the nerve inside. Ouch. The weird thing is, the pain can come and go, which makes it tricky to know exactly which tooth is the problem.",
      "But it's not always a crack. It could also be a cavity that's gotten deep enough to tick off the nerve. Or maybe an old filling has decided to retire—it might be cracked, loose, or have tiny gaps where gunk can get in. Sometimes, it's an infection at the root of the tooth, which is no fun at all. And hey, sometimes it's just a new filling or crown that's a little too high and needs to be filed down.",
      "So, what to do? If the pain is minor and doesn't happen often, you can wait and see for a couple of days. But if it's a sharp pain that shows up every time you bite, it's getting worse, or you see any swelling, it's time to call the dentist. Don't wait for it to get worse. You can even send a photo to DentaSmart to get a quick look first.",
    ],
    possibleCauses: [
      { title: "Cracked Tooth", description: "A tiny, often invisible crack in the tooth flexes when you bite, bugging the nerve inside.", urgency: "medium" },
      { title: "Deep Cavity", description: "A cavity has gotten close to the tooth's nerve, and pressure makes it hurt.", urgency: "medium" },
      { title: "Bad Filling", description: "Your filling is old, cracked, or loose, letting bacteria sneak in and cause trouble.", urgency: "medium" },
      { title: "Dental Abscess", description: "This is an infection at the root of the tooth. Biting down puts pressure on it, causing pain.", urgency: "high" },
      { title: "Uneven Bite", description: "A new filling or crown is a bit too high, so it takes all the pressure when you bite.", urgency: "low" },
      { title: "Sore Ligament", description: "The little ligament that holds your tooth in place can get sore from grinding, a knock to the mouth, or an infection.", urgency: "medium" },
    ],
    selfCareSteps: [
      "Try not to chew on the side that hurts until you see a dentist.",
      "Ibuprofen can help with the pain and any swelling.",
      "Rinse your mouth with warm salt water. Just mix half a teaspoon of salt in a cup of warm water.",
      "Stay away from foods that are super hot, cold, or hard. They can make it worse.",
      "Don't keep biting down on the tooth to see if it still hurts. You'll just make it angrier.",
      "You can upload a photo to DentaSmart to get a first opinion.",
    ],
    whenToSeeDentist: [
      "It hurts every single time you bite down.",
      "The pain is definitely getting worse.",
      "You notice your cheek or gums are getting puffy or swollen.",
      "You have a fever along with the tooth pain.",
      "You can actually see a crack, a hole, or a dark spot on your tooth.",
      "A chunk of your tooth or an old filling broke off.",
    ],
    keyTakeaways: [
      "Pain when you bite isn't normal. It's a sign your tooth is probably cracked, has a cavity, or is infected.",
      "A cracked tooth is the most common reason, and you often can't see the crack yourself.",
      "While you wait for your dental appointment, just chew on the other side and take some ibuprofen.",
      "DentaSmart can take a look at a photo or X-ray to give you an idea of what's going on.",
    ],
    faqs: [
      { question: "Can a cracked tooth just heal by itself?", answer: "Nope. Teeth can't heal themselves like bones do. A cracked tooth needs a dentist to fix it with bonding, a crown, or maybe a root canal. If you ignore it, the crack can get bigger and the tooth could break for good." },
      { question: "Why does the pain come and go?", answer: "That on-and-off pain is a classic sign of a cracked tooth. When you bite, the crack flexes open and hurts. When you stop biting, it closes, and the pain goes away. Annoying, right?" },
      { question: "What's this going to cost me?", answer: "It really depends. If it's just a bite adjustment, that's often free. A filling might be $150-$300. A crown can run you $800-$1,500, and a root canal is usually $700-$1,500. The sooner you get it fixed, the cheaper it almost always is." },
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
  title: "Why Are My Gums Bleeding? Here's How to Stop It",
  metaTitle: "Bleeding Gums When Brushing: Causes & How to Stop It | DentaSmart",
  metaDescription:
    "Seeing blood when you brush or floss? It's a sign from your gums. Find out what causes bleeding gums and the simple ways you can get them healthy again.",
  primaryKeyword: "bleeding gums",
  secondaryKeywords: ["gums bleed when brushing", "why do my gums bleed", "bleeding gums treatment", "gingivitis bleeding"],
  heroHeading: "Bleeding Gums",
  heroSubheading: "Seeing a little pink on your toothbrush isn't normal. It's your body's way of telling you to pay attention to your gums. Here's what you need to know.",
  directAnswer:
    "Most of the time, bleeding gums are a classic sign of gingivitis (that's early-stage gum disease) from plaque hanging out on your gumline. But it can also happen if you're brushing way too hard, because of hormone shifts, from blood-thinning meds, or if you're low on certain vitamins. The good news? For most people, just getting better at brushing and flossing makes the bleeding stop in a week or two.",
  detailedExplanation: [
    "If you see blood in the sink after brushing, your first thought might be, 'Oops, I was too rough.' But that's usually not the case. Bleeding gums are actually a sign of inflammation, which is your body's reaction to plaque bacteria. So, your gums are asking for more attention, not less.",
    "The number one cause is gingivitis. Plaque builds up, the bacteria in it irritate your gums, and then they get red, puffy, and bleed easily. Sounds bad, but it's totally reversible. All it takes is brushing twice a day, flossing every day, and getting a cleaning from your dentist.",
    "But other things can cause it, too. Hormones are a big one—up to 75% of pregnant women get what's called 'pregnancy gingivitis.' Taking medications like aspirin or warfarin can make you bleed more easily. Not getting enough Vitamin C or K can also be a factor. And sometimes, it really is just your toothbrush being too stiff. In very rare situations, if the bleeding just won't stop, it could point to a blood disorder.",
    "The absolute worst thing you can do is to stop brushing or flossing. That just lets more plaque move in and makes everything worse. What you should do is grab a soft-bristled brush, be gentle with it, and make sure you're flossing every single day. If you're still seeing blood after a couple of weeks, it's time to call the dentist.",
  ],
  possibleCauses: [
    { title: "Gingivitis (Early Gum Disease)", description: "This is the big one. Plaque buildup makes your gums inflamed and likely to bleed.", urgency: "medium" },
    { title: "Brushing Too Hard", description: "You might just be using a brush that's too firm or putting too much muscle into it.", urgency: "low" },
    { title: "Hormone Changes", description: "Things like pregnancy, your period, or puberty can make your gums extra sensitive.", urgency: "low" },
    { title: "Blood-Thinning Meds", description: "Aspirin and other blood thinners can make it easier for your gums to bleed.", urgency: "low" },
    { title: "Vitamin Deficiencies", description: "Not getting enough Vitamin C or K can mess with your gum health.", urgency: "medium" },
    { title: "Periodontitis (Advanced Gum Disease)", description: "This is what happens if gingivitis is ignored. It can lead to serious bleeding and bone loss.", urgency: "high" },
  ],
  selfCareSteps: [
    "Get a soft-bristled toothbrush and use gentle, circular motions.",
    "Floss every day. It might bleed at first, but that should clear up in a week or two.",
    "Try rinsing with warm salt water after you brush to calm down inflammation.",
    "If you smoke, try to quit. It makes gum disease so much worse.",
    "Eat a healthy diet. Make sure you get lots of Vitamin C from stuff like oranges, peppers, and broccoli.",
    "You can use the DentaSmart app to keep an eye on your gum health and see how you're improving.",
  ],
  whenToSeeDentist: [
    "The bleeding isn't getting better after 2 weeks of good home care.",
    "Your gums are super red, swollen, or just plain hurt.",
    "You notice your gums look like they're pulling back from your teeth.",
    "You have bad breath that just won't go away.",
    "Your teeth feel a little loose.",
    "You're pregnant and your gums are bleeding a lot.",
  ],
  keyTakeaways: [
    "Bleeding gums are usually the first sign of gingivitis. Don't panic, it's reversible.",
    "Don't stop brushing or flossing! That's the most important thing you can do.",
    "Most of the time, a little bleeding will go away in 1-2 weeks with better habits.",
    "If it doesn't stop, see a dentist. It's better to be safe.",
  ],
  faqs: [
    { question: "Is it normal for my gums to bleed?", answer: "Nope. Healthy gums shouldn't bleed. Think of it as a little red flag from your mouth that something's up, usually plaque. It's common, but it's not normal." },
    { question: "Should I stop flossing if it makes my gums bleed?", answer: "Definitely not. Bleeding when you floss is a sign you need to be doing it more often, not less. Stick with it for a week or two, and the bleeding should stop as your gums get healthier." },
    { question: "Can I lose my teeth from bleeding gums?", answer: "So, the bleeding itself won't make you lose teeth. But if you ignore it, the underlying gingivitis can turn into periodontitis, a much more serious gum disease that destroys the bone holding your teeth in. That can lead to tooth loss. So, you want to take care of it early." },
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
    title: "Got Sensitive Teeth? Why They Hurt and What to Do About It",
    metaTitle: "Tooth Sensitivity Causes & Relief | DentaSmart",
    metaDescription:
      "Do your teeth hurt with hot, cold, or sweet stuff? Find out what causes tooth sensitivity and how you can fix it.",
    primaryKeyword: "tooth sensitivity",
    secondaryKeywords: ["sensitive teeth", "teeth hurt cold water", "tooth sensitivity treatment", "why are my teeth sensitive"],
    heroHeading: "Ouch! Sensitive Teeth?",
    heroSubheading: "That sharp zing you get from cold or hot drinks isn't normal, but you don't have to live with it. Here’s what’s going on and how to make it stop.",
    directAnswer:
      "Tooth sensitivity is what happens when your enamel gets thin or your gums pull back, showing a layer called dentin. This dentin has tiny tubes that go right to the nerve. So when you eat or drink something hot, cold, or sweet, you feel a sharp, quick pain. The fix? Usually a mix of using sensitivity toothpaste, getting fluoride treatments, and figuring out what’s causing it in the first place.",
    detailedExplanation: [
      "If you've ever felt a sudden, sharp pain in your teeth from hot or cold drinks, you know what tooth sensitivity is. It’s super common—it happens to about 1 in 8 adults. The pain is quick, but it can be a real pain (pun intended) and make you skip foods you love.",
      "So what's happening? Your tooth has a tough outer layer called enamel. Underneath that is a softer layer called dentin, which has thousands of tiny little tubes that connect straight to the tooth's nerve. If your enamel wears thin or your gums recede, those tubes get exposed. Then, bam! Stimuli hit the nerve and you feel that zing.",
      "What causes this? A few things. It could be from acidic foods and drinks eating away at your enamel. Or maybe you're brushing too hard. Gums pulling back, grinding your teeth at night (that's called bruxism), a new filling, or even a cavity can all be culprits. Oh, and teeth whitening can make them sensitive for a little while, too.",
      "How you fix it really depends on the 'why'. For a lot of people, just switching to a sensitivity toothpaste does the trick. The stuff in it (like potassium nitrate or stannous fluoride) helps block those little tubes. Give it a solid 2-4 weeks to work. If that doesn't cut it, your dentist might put on a fluoride varnish or even do some bonding. And if you're a grinder, a night guard is probably in your future. DentaSmart can actually help you figure out what’s going on by looking at pictures of your teeth and gums.",
    ],
    possibleCauses: [
      { title: "Enamel Erosion", description: "When acidic stuff (food, drinks, even stomach acid) wears down that tough outer layer of your teeth.", urgency: "medium" },
      { title: "Gum Recession", description: "Your gums can pull away from your teeth, leaving the root exposed. That part has no enamel to protect it.", urgency: "medium" },
      { title: "Brushing Too Hard", description: "Using a hard brush or just going to town on your teeth can wear down enamel. Easy does it!", urgency: "low" },
      { title: "Teeth Grinding (Bruxism)", description: "Grinding your teeth wears them down and can even cause tiny cracks, exposing the sensitive dentin layer.", urgency: "medium" },
      { title: "A Cavity", description: "Sometimes, a cavity is the reason for sensitivity. It’s a hole that goes right through the enamel to the dentin.", urgency: "medium" },
      { title: "Recent Dental Work", description: "It’s pretty normal to have some sensitivity after a filling, crown, or whitening. It usually goes away in a few days or weeks.", urgency: "low" },
    ],
    selfCareSteps: [
      "Grab a sensitivity toothpaste and use it for at least 2-4 weeks. Be patient!",
      "Get a soft-bristled toothbrush and brush gently. Think circles, not scrubbing.",
      "Try to cut back on acidic foods and drinks like citrus, soda, and wine. If you do have them, rinse with water right after.",
      "Don't brush your teeth right after eating something acidic. Wait about 30 minutes.",
      "A fluoride mouthwash can help make your enamel stronger.",
      "If you think you grind your teeth, a night guard from your dentist can be a game-changer.",
    ],
    whenToSeeDentist: [
      "You've been using sensitivity toothpaste for a month and nothing's changed.",
      "The sensitivity is really bad or seems to be getting worse.",
      "It's just one tooth that's sensitive. That could mean a cavity or a crack.",
      "You also have pain, swelling, or your tooth looks discolored.",
      "You can see that your gums are pulling back from your teeth.",
      "The sensitivity started after some dental work and hasn't gotten better after a couple of weeks.",
    ],
    keyTakeaways: [
      "Tooth sensitivity is just exposed dentin, which happens when enamel wears away or gums recede.",
      "Sensitivity toothpaste is great, but it's not a quick fix. You have to use it for 2-4 weeks straight.",
      "If it’s just one tooth bugging you, that’s a sign you should probably see a dentist. Could be a cavity.",
      "Not sure what the deal is? DentaSmart can help you get some clues by analyzing photos of your teeth.",
    ],
    faqs: [
      { question: "Does sensitivity toothpaste actually work?", answer: "Yep, for most people it does. The active ingredients work by blocking the nerve signals. But you have to be consistent. Use it twice a day for at least two to four weeks to really feel a difference. Make it your new go-to toothpaste." },
      { question: "Could my sensitive teeth be a sign of something serious?", answer: "It can be. If it's just general sensitivity, it's usually no big deal. But if the sensitivity is all in one tooth, it might be a cavity, a cracked tooth, or an old filling that's failing. If it comes on suddenly all over, it could be a sign of enamel erosion or a grinding habit." },
      { question: "Is sensitivity from teeth whitening permanent?", answer: "Nope! That kind of sensitivity is just temporary. It almost always goes away a few days after you stop whitening. Pro tip: use a sensitivity toothpaste before and during your whitening treatment to help keep it at bay." },
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
    title: "Jaw Pain: What's Causing It and When to Get Help",
    metaTitle: "Jaw Pain: Causes, TMJ & Treatment | DentaSmart",
    metaDescription:
      "Is your jaw sore, clicking, or stiff? It could be TMJ, teeth grinding, or something else. Here’s how to tell and when you should see a dentist.",
    primaryKeyword: "jaw pain",
    secondaryKeywords: ["TMJ pain", "jaw clicking", "jaw stiffness", "teeth grinding jaw pain", "TMD treatment"],
    heroHeading: "Jaw Pain",
    heroSubheading: "A sore jaw can mess with your eating, sleeping, and just about everything else. Figuring out the cause is the first step to feeling better.",
    directAnswer:
      "Most of the time, jaw pain comes from either TMJ problems, grinding your teeth (especially at night), or a dental issue like an infection. TMJ can cause pain, clicking sounds, and make it hard to move your jaw. You can try some things at home to help, like eating soft foods, using a warm compress, and trying to relax your jaw. But if the pain is really bad or isn't going away, it's time to see a professional.",
    detailedExplanation: [
      "Your jawbone connects to your skull with the temporomandibular joint (TMJ). You have one on each side of your face, and they're pretty complex. They let you do all sorts of things, like talk, chew, and yawn. When something’s off with this joint or the muscles around it, doctors call it a TMJ disorder (or TMD).",
      "TMD is the number one reason for jaw pain. You might feel tenderness in your jaw, an ache near your ear, or have a tough time chewing. Sometimes you'll hear a clicking or popping sound when you open your mouth, or your jaw might even lock up. What causes it? All sorts of things. Stress, grinding your teeth, arthritis, or even an old jaw injury can be the culprit.",
      "Grinding your teeth is another big one. A lot of people do it in their sleep and have no idea. Waking up with a sore jaw or a headache is a classic sign. You might also notice your teeth look worn down, or you might have even chipped a tooth. A night guard from your dentist can be a real lifesaver here. It protects your teeth and helps your jaw muscles relax.",
      "But that's not all. Jaw pain can also come from a tooth infection (like an abscess), problems with your wisdom teeth, or even a sinus infection. And in some rare cases, jaw pain can be a sign of a heart attack, especially for women. So it's good to get it checked out.",
    ],
    possibleCauses: [
      { title: "TMJ Disorder (TMD)", description: "The jaw joint itself is acting up, causing pain, clicking, and stiffness.", urgency: "medium" },
      { title: "Teeth Grinding (Bruxism)", description: "Clenching or grinding your teeth (especially at night) puts a lot of strain on your jaw.", urgency: "medium" },
      { title: "Dental Infection/Abscess", description: "A nasty infection in a tooth root can send pain shooting up into your jaw.", urgency: "high" },
      { title: "Wisdom Teeth", description: "When wisdom teeth don't have room to grow in, they can make the back of your jaw hurt.", urgency: "medium" },
      { title: "Stress and Tension", description: "Feeling stressed? You might be clenching your jaw without realizing it.", urgency: "low" },
      { title: "Arthritis", description: "Just like in other joints, arthritis can affect your TMJ and make it painful and stiff.", urgency: "medium" },
    ],
    selfCareSteps: [
      "Stick to soft foods for a bit. No hard, chewy, or crunchy stuff.",
      "Put a warm compress on your jaw for 15-20 minutes a few times a day.",
      "Try to relax your jaw. Keep your lips together but your teeth apart.",
      "Don't yawn too wide, and try not to chew gum.",
      "Ibuprofen can help with the inflammation and pain.",
      "Find ways to de-stress. The less you clench, the better your jaw will feel.",
    ],
    whenToSeeDentist: [
      "The pain isn't getting better after a week of trying these tips.",
      "You can't open or close your mouth all the way.",
      "The pain is severe or seems to be getting worse.",
      "You hear a grinding sound or your jaw locks up.",
      "Your face or jaw is swollen.",
      "Your jaw pain comes with chest pain or shortness of breath. (Go to the ER for this!)",
    ],
    keyTakeaways: [
      "Jaw pain is usually from TMJ issues or teeth grinding.",
      "Most of the time, you can fix mild jaw pain at home with some simple self-care.",
      "A night guard is a great way to stop grinding-related jaw pain.",
      "If you have jaw pain plus chest pain, it could be serious. Get help right away.",
    ],
    faqs: [
      { question: "Will my TMJ pain just go away by itself?", answer: "Sometimes it does, especially if you're careful with it for a few weeks. But if you don't deal with what's causing it (like stress or grinding), it'll probably come back. If it sticks around, see a dentist." },
      { question: "How can I tell if I'm grinding my teeth at night?", answer: "Waking up with a sore jaw or a headache is a big clue. Your teeth might also look worn down or even cracked. Your dentist can spot the signs, too." },
      { question: "How much is a night guard?", answer: "A custom one from your dentist can run you $300-$800. You can get cheaper ones at the drugstore for $20-$50, but they don't work as well. If you grind your teeth a lot, the custom one is worth it." },
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
    title: "Bad Breath: What Causes It, How to Fix It, and When to Worry",
    metaTitle: "Bad Breath (Halitosis): Why You Have It & How to Fix It | DentaSmart",
    metaDescription:
      "Got bad breath that just won't quit? Find out the real reasons for halitosis and how to actually fix it for good.",
    primaryKeyword: "bad breath",
    secondaryKeywords: ["halitosis", "chronic bad breath", "bad breath causes", "how to fix bad breath", "bad breath treatment"],
    heroHeading: "Bad Breath",
    heroSubheading: "Bad breath is embarrassing. It can make you feel alone. But figuring out the cause is the first step to getting rid of it for good.",
    directAnswer:
      "Most of the time, bad breath (the official term is halitosis) comes from bacteria on your tongue, gum disease, a dry mouth, or food stuck in your teeth. About 9 times out of 10, the problem is in your mouth, not your stomach. If you get better with your brushing, and especially with cleaning your tongue and flossing, that usually does the trick. But if you're doing all that and the bad breath sticks around? It might be gum disease or something else going on.",
    detailedExplanation: [
      "Bad breath is super common - it affects about 1 in 4 people regularly. It's a huge reason people get self-conscious about their smile. The good news? Most of the time, we can find the cause and treat it.",
      "Your tongue is usually the main suspect. It has a rough surface that's perfect for trapping bacteria, dead cells, and tiny bits of food, especially way in the back. These bacteria release stuff called volatile sulfur compounds (VSCs), which smell like rotten eggs. Seriously. Just brushing or scraping your tongue can make a huge difference.",
      "Gum disease is the next big cause. The bacteria that hang out in infected gum pockets smell really bad. So if your breath doesn't get better even with great brushing, flossing, and tongue cleaning, gum disease is a good bet. Other things in your mouth can cause it too, like cavities, a dry mouth (from meds, breathing through your mouth, or not drinking enough water), or dental work that doesn't fit right.",
      "And then there's the other 10% of cases where bad breath isn't from your mouth at all. It could be sinus infections, acid reflux, diabetes, liver or kidney problems, or even some medications. If you've tried everything with your oral hygiene and nothing helps, it's time to see your dentist and your doctor. DentaSmart can help you figure out if the cause is something in your mouth.",
    ],
    possibleCauses: [
      { title: "Tongue Bacteria", description: "This is the #1 cause. Bacteria on your tongue make smelly sulfur compounds.", urgency: "low" },
      { title: "Gum Disease", description: "Infected gums have pockets of bacteria that smell bad and can't be brushed away.", urgency: "medium" },
      { title: "Dry Mouth", description: "Saliva is your mouth's natural cleaner. If you don't have enough (from meds or mouth breathing), bacteria can go wild.", urgency: "low" },
      { title: "Stuck Food", description: "Little bits of food trapped between your teeth or in cavities will start to smell as they break down.", urgency: "low" },
      { title: "Cavities & Infections", description: "Tooth decay and abscesses can give off a nasty, persistent smell.", urgency: "medium" },
      { title: "Medical Issues", description: "Sometimes, the smell comes from your sinuses, stomach (acid reflux), or other health problems like diabetes.", urgency: 'medium' },
    ],
    selfCareSteps: [
      "Clean your tongue every day. Use a tongue scraper or just your toothbrush. Get way back there.",
      "Floss once a day. You've got to get the gunk out from between your teeth.",
      "Drink lots of water all day. This helps keep your mouth from getting dry.",
      "Chew sugar-free gum. It gets your saliva going.",
      "Try to avoid super smelly foods like garlic and onions when you have a big meeting or a date.",
      "Get a new toothbrush every 3 months. They get worn out.",
    ],
    whenToSeeDentist: [
      "Your breath is still bad after 2 weeks of really good oral hygiene.",
      "Your gums are bleeding, swollen, or look like they're pulling away from your teeth.",
      "You have a gross taste in your mouth that won't go away.",
      "Your mouth feels dry no matter how much water you drink.",
      "Someone you trust tells you your breath is bad, even when you think you've been good about cleaning.",
      "You think you might have a cavity or some other infection.",
    ],
    keyTakeaways: [
      "9 out of 10 times, bad breath starts in the mouth. It's usually your tongue or gum disease.",
      "Cleaning your tongue is the one thing most people forget, and it helps a ton.",
      "If you're doing everything right and your breath still stinks, it's probably gum disease.",
      "DentaSmart can help you check your oral health and see if a dental issue is the problem.",
    ],
    faqs: [
      { question: "Will mouthwash fix my bad breath?", answer: "Not really. Mouthwash is just a temporary fix, like a breath mint. It only lasts for maybe 30-60 minutes and doesn't solve the real problem. The ones with alcohol can even make it worse by drying your mouth out. So, focus on cleaning your tongue and flossing instead." },
      { question: "Does bad breath come from your stomach?", answer: "Almost never. It's a common myth, but about 90% of bad breath comes from your mouth. Sure, it's possible to have bad breath from stomach issues like acid reflux, but it's way less common than people think." },
      { question: "How do I know if I have bad breath?", answer: "It's hard to smell your own breath. Your nose just gets used to it. The best way is to ask someone you trust, like a close friend or family member. If you're too embarrassed, you can try licking the back of your wrist, letting it dry for a few seconds, and then smelling it." },
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
    title: "Swollen Gums? Here's What Your Mouth is Trying to Tell You.",
    metaTitle: "Swollen Gums? Find Out Why & What to Do | DentaSmart",
    metaDescription: "Puffy or swollen gums aren't normal. It could be simple, like how you're brushing, or a sign of infection. We'll show you the causes, home remedies, and when it's time to call the dentist.",
    primaryKeyword: "swollen gums",
    secondaryKeywords: ["puffy gums causes", "gum inflammation treatment", "why are my gums swollen", "gingivitis symptoms"],
    heroHeading: "Don't ignore swollen gums. They're a big warning sign.",
    heroSubheading: "Sure, they might seem like no big deal, but puffy or tender gums are often your body's first signal that something's up.",
    directAnswer: "Most of the time, swollen gums are just your body reacting to plaque—that gross, sticky film of bacteria—building up where your teeth and gums meet. This inflammation is called gingivitis. But other things can cause it too, like hormones going wild, not getting enough vitamins, an infection, or even a bad-fitting crown. You can often fix minor swelling by just brushing and flossing better. If they stay swollen or really hurt, you need to see a dentist to make sure it's not something worse, like gum disease.",
    detailedExplanation: [
      "You know your gums are healthy when they're firm, pink, and hug your teeth tightly. So when they get puffy, red, and swollen? That's your body waving a red flag about irritation or an infection. And the number one cause is almost always plaque, that sticky bacteria film that just loves to hang out on your teeth.",
      "If you don't brush and floss that plaque away, it eventually hardens into tartar, which really irritates your gums. That first stage of trouble is called gingivitis. The good news? You can totally reverse it with better habits. But if you let it go, it can turn into periodontitis, a much bigger problem that can actually destroy the bone that holds your teeth in place.",
      "Sometimes, it's not just about plaque. Your gums can also swell up during pregnancy, puberty, or your period thanks to hormones making your gums extra sensitive. A few medications, not getting enough Vitamin C, or different infections can also be the culprit."
    ],
    possibleCauses: [
      { title: "Plaque and tartar buildup", description: "This is the usual suspect. Bacteria in plaque just irritates your gums, making them swell up.", urgency: "medium" },
      { title: "Gingivitis", description: "The first step of gum disease, all thanks to that plaque buildup. You can fix it with good brushing and flossing.", urgency: "medium" },
      { title: "Hormonal changes", description: "Big life changes like pregnancy, puberty, and periods can make your gums extra sensitive and puffy.", urgency: "low" },
      { title: "Infection", description: "An abscessed tooth or another infection can make one spot on your gums swell up and hurt. A lot.", urgency: "high" },
      { title: "Vitamin deficiency", description: "Not enough Vitamin C (scurvy) or K can make your gums swell and bleed for no good reason.", urgency: "medium" },
      { title: "Medication side effects", description: "Some drugs for blood pressure, seizures, or your immune system can unfortunately cause your gums to overgrow.", urgency: "low" }
    ],
    selfCareSteps: [
      "Be gentle. Brush twice a day with a soft toothbrush and really focus on that line where your teeth and gums meet.",
      "Floss every single day. It gets the gunk out from between your teeth where a brush just can't go.",
      "Try a warm salt water rinse. Just mix half a teaspoon of salt in a glass of warm water. It feels great on sore gums.",
      "Ditch the tobacco. It makes it harder for your gums to heal and just makes everything worse.",
      "Drink lots of water and eat a healthy diet. Foods with lots of Vitamin C are your friend."
    ],
    whenToSeeDentist: [
      "The swelling just won't go away after a couple of weeks, even with great home care",
      "It really hurts, you have a fever, or you see pus (yikes!)",
      "The swelling is starting to spread to your face or neck",
      "Your gums are bleeding a lot or for no reason",
      "You feel like your teeth are getting loose or moving around"
    ],
    keyTakeaways: [
      "Think of swollen gums as an early warning from your body. Listen to it! The sooner you act, the easier it is to fix.",
      "For most minor swelling, just getting better at brushing and flossing can solve it in a week or two.",
      "But if the swelling sticks around, or comes with pain or bleeding, get it checked out. A dentist needs to make sure it's not a serious infection or gum disease."
    ],
    faqs: [
      { question: "How long until my swollen gums feel better?", answer: "If it's just gingivitis, you should see a big improvement in 1-2 weeks just by brushing and flossing better. If something else is causing it, like an infection, it'll take longer and you'll likely need a dentist's help." },
      { question: "Could my swollen gums be a sign of something serious?", answer: "Probably not. Most of the time it's just plaque. But you can't ignore it. Sometimes it can be a sign of deeper gum disease, an abscess, or even other health issues. If home care isn't working, it's time to see a dentist." },
      { question: "Is it normal for gums to swell up when you're pregnant?", answer: "Yep, it's super common. They even call it 'pregnancy gingivitis.' All those extra hormones increase blood flow to your gums. Just be extra good about your oral hygiene and see your dentist for regular cleanings." },
      { question: "Can the DentaSmart app help with my gum health?", answer: "It sure can. DentaSmart helps you keep an eye on how your gums look over time. You can actually see if they're getting better or if you might need to call in a professional. It's like having a progress tracker for your mouth." }
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
    title: "Got a Loose Tooth as an Adult? Here's What to Do",
    metaTitle: "Loose Tooth in Adults: Causes & What to Do | DentaSmart",
    metaDescription: "It's not normal for an adult tooth to be loose. Find out the common reasons why it happens, what you can do about it right now, and when you absolutely need to see a dentist.",
    primaryKeyword: "loose tooth adult",
    secondaryKeywords: ["why is my tooth loose", "loose tooth treatment", "wobbly tooth adult", "tooth mobility causes"],
    heroHeading: "A loose tooth isn't just a little problem. It's a big warning sign.",
    heroSubheading: "Remember losing teeth as a kid? This isn't like that. A loose tooth in an adult is a signal that something's wrong. Let's figure out what's going on.",
    directAnswer: "So, why is your tooth loose? It's usually because of advanced gum disease, also called periodontitis. This disease wrecks the bone and gums that hold your teeth in place. Other culprits could be grinding your teeth, a recent injury, or even an infection. You can't just ignore this. If you get help early, you can often save the tooth. But if you wait, you could lose it. You should really see a dentist as soon as you can.",
    detailedExplanation: [
      "Your teeth are held in place by a whole system of bone, ligaments, and gum tissue. If any part of that system gets messed up, your teeth can get wobbly. The number one reason this happens to adults is periodontitis, which is what happens when gum disease gets serious.",
      "Periodontitis is the result of not treating gingivitis. Nasty bacteria get under your gums, creating deep pockets and eating away at the bone that anchors your teeth. The scary part? It's often painless, so a lot of people have no idea it's happening until a tooth feels loose.",
      "But here's some good news. If you catch it early, you can stop it from getting worse and sometimes even heal some of the damage. A tooth that's lost a ton of bone, though... that one might be a goner. That's why you've got to act fast."
    ],
    possibleCauses: [
      { title: "Periodontitis (advanced gum disease)", description: "This is the big one. Bacteria destroy the bone and ligaments holding your teeth in.", urgency: "high" },
      { title: "Grinding your teeth (bruxism)", description: "Constantly grinding puts a ton of force on your teeth and can loosen them up over time.", urgency: "medium" },
      { title: "Getting hit in the mouth", description: "A knock to the face can definitely loosen a tooth by damaging all the stuff that holds it in place.", urgency: "high" },
      { title: "Dental abscess", description: "An infection at the root of your tooth can eat away the bone around it, making the tooth loose.", urgency: "high" },
      { title: "Osteoporosis", description: "This condition weakens your bones everywhere, including your jaw, which means less support for your teeth.", urgency: "medium" },
      { title: "Pregnancy", description: "Hormone changes during pregnancy can sometimes make the ligaments around your teeth a little stretchy, causing some temporary looseness.", urgency: "low" }
    ],
    selfCareSteps: [
      "Don't wiggle the tooth. Seriously. Leave it alone.",
      "Stick to soft foods for a bit. Don't bite down on the loose tooth.",
      "Keep your mouth clean, but be gentle. You still need to brush and floss, just be careful around that spot.",
      "Stay away from hard, crunchy, or sticky foods. They'll only make it worse.",
      "Call your dentist and make an appointment. Like, right now. This isn't something you should wait on."
    ],
    whenToSeeDentist: [
      "Your adult tooth feels even a tiny bit loose or wiggly.",
      "A tooth got loose after you fell or got hit.",
      "It hurts, or you see swelling or blood around the loose tooth.",
      "You have more than one loose tooth, or your bite feels different.",
      "You know you have gum disease or it's been over a year since your last cleaning."
    ],
    keyTakeaways: [
      "An adult tooth should never be loose. You need a dentist to check it out. Don't put it off.",
      "Most of the time, it's gum disease. The good thing is, it's treatable if you catch it early.",
      "The faster you get to the dentist, the better your shot at saving the tooth."
    ],
    faqs: [
      { question: "Can a loose tooth get firm again on its own?", answer: "Sometimes, yeah! It really depends on why it's loose. If it's just a little loose from something like early-stage gum disease or grinding, getting that treated can let everything heal and tighten back up. But if you've lost a lot of bone, it might not ever get 100% stable again." },
      { question: "Should I just pull my own loose tooth?", answer: "Oh god, no. Don't ever do that. A dentist needs to see if the tooth can be saved. And if it does need to come out, they can do it the right way. This prevents infection and saves the bone for other options down the road, like an implant." },
      { question: "How exactly does gum disease make teeth loose?", answer: "Think of it like this: the bacteria from gum disease dig little tunnels (pockets) between your teeth and gums. As time goes on, those bacteria just chew away the bone and tissue that hold your teeth steady. Once enough bone is gone, your teeth have nothing to hold onto, and they start to get wobbly." },
      { question: "Can DentaSmart tell me if I have gum disease before my teeth get loose?", answer: "DentaSmart is a great tool for keeping an eye on your gum health. It can help you spot the early red flags, like red, swollen, or receding gums. If you catch those signs before bone loss starts, you have a much, much better chance of stopping loose teeth before they even begin." }
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
  title: "Got Dry Mouth? Here's Why It's a Big Deal for Your Teeth",
  metaTitle: "Dry Mouth: What Causes It & Why It's Bad for Your Teeth | DentaSmart",
  metaDescription: "Dry mouth isn't just annoying—it can seriously up your risk for cavities and gum disease. Find out what causes it, how to fix it, and when you should see a dentist.",
  primaryKeyword: "dry mouth",
  secondaryKeywords: ["xerostomia causes", "dry mouth remedies", "dry mouth and cavities", "what causes dry mouth"],
  heroHeading: "That dry, sticky feeling in your mouth? It's not just uncomfortable—it's a problem for your teeth.",
  heroSubheading: "You'd be surprised what saliva does. When it's gone, your teeth are left without their natural bodyguard.",
  directAnswer: "Basically, dry mouth (the fancy term is xerostomia) is what happens when you're not making enough spit. And saliva is a huge deal. It washes away food, fights acid, and battles bacteria. Without enough of it, your chances of getting cavities, gum disease, or other mouth infections go way up. It's often caused by meds, not drinking enough water, breathing through your mouth, or other health issues.",
  detailedExplanation: [
    "Think of saliva as your mouth's built-in cleaning crew. It's always on the job, washing away leftover food bits, neutralizing the acid that bacteria spit out (gross, right?), and even delivering minerals to fix tiny spots of damage on your teeth. So when you don't have enough of it, your mouth's defenses are down.",
    "A ton of common medicines—we're talking over 400 of them—can cause dry mouth. Things like antihistamines, antidepressants, blood pressure pills, and even painkillers. That's why it's so common, especially for older folks who might be taking a few different prescriptions.",
    "When your mouth is always dry, the damage can be pretty bad. The acid from bacteria just sits on your teeth for longer, eating away at the enamel. People with dry mouth often get cavities in weird places, like right at the gum line or even on their front teeth."
  ],
  possibleCauses: [
    { title: "Medications", description: "Yep, over 400 different meds can be the culprit. Antihistamines, antidepressants, diuretics, and pain pills are common ones.", urgency: "medium" },
    { title: "Dehydration", description: "Simple, right? Not drinking enough water is a big one. Too much coffee or booze can do it, too.", urgency: "low" },
    { title: "Mouth breathing", description: "If you breathe through your mouth instead of your nose (especially when you sleep), it'll dry everything out.", urgency: "low" },
    { title: "Medical conditions", description: "Sometimes it's a sign of something else, like Diabetes, Sjogren's syndrome, or HIV/AIDS.", urgency: "medium" },
    { title: "Cancer treatment", description: "Radiation to your head or neck can unfortunately damage the glands that make saliva. Sometimes the damage is permanent.", urgency: "high" },
    { title: "Getting older", description: "It's not aging itself, but older adults tend to take more medications that cause dry mouth, so it happens more often.", urgency: "low" }
  ],
  selfCareSteps: [
    "Keep a water bottle handy and sip on it all day.",
    "Chew sugar-free gum or suck on sugar-free hard candy. This gets your saliva flowing.",
    "Run a humidifier in your room at night. It really helps if you're a mouth-breather.",
    "Try to cut back on caffeine, alcohol, and smoking. They all make it worse.",
    "Look for an alcohol-free mouthwash made specifically for dry mouth.",
    "Ask your doctor if any of your meds might be the cause. Don't just stop taking them, though!"
  ],
  whenToSeeDentist: [
    "You've tried everything and your mouth is still a desert",
    "You suddenly seem to be getting a lot more cavities",
    "It's getting hard to swallow, talk, or even taste your food",
    "You've got a weird burning or tingling feeling in your mouth",
    "Your lips are always cracked, you have sores in the corners of your mouth, or your tongue looks coated"
  ],
  keyTakeaways: [
    "Don't ignore dry mouth. It seriously raises your risk for cavities and gum problems.",
    "If your meds are the cause, you've got to be extra careful with your brushing and flossing. And don't skip your dental checkups.",
    "Little things can help a lot. Sip water, chew sugar-free gum, and use a humidifier."
  ],
  faqs: [
    { question: "Can dry mouth actually cause cavities?", answer: "Oh, absolutely. Saliva is your mouth's best friend for fighting cavities. It rinses away food and neutralizes acid. When it's gone, bacteria have a party and your teeth pay the price." },
    { question: "Should I switch my toothpaste if I have dry mouth?", answer: "It's a good idea. Try a toothpaste with extra fluoride and maybe skip ones with SLS (sodium lauryl sulfate), which can be irritating. Your dentist might even give you a prescription for a high-fluoride paste." },
    { question: "Is dry mouth a sign of diabetes?", answer: "It can be. If you also feel extra thirsty, have to pee all the time, and are losing weight without trying, you should definitely see your doctor to get your blood sugar checked." },
    { question: "How can DentaSmart help with my dry mouth?", answer: "DentaSmart is great for keeping an eye on things. You can track your oral health and see if the dry mouth is causing problems. It helps you figure out if your self-care is working or if it's time to call the dentist." }
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
    title: "Tooth Discoloration: Why It Happens and How to Get Your Bright Smile Back",
    metaTitle: "Why Are My Teeth Yellow? Causes & Fixes | DentaSmart",
    metaDescription: "Got yellow, brown, or even gray teeth? Find out what's causing it, see what whitening can (and can't) fix, and know when it's time to call the dentist.",
    primaryKeyword: "tooth discoloration",
    secondaryKeywords: ["yellow teeth causes", "brown spots on teeth", "teeth staining treatment", "intrinsic vs extrinsic stains"],
    heroHeading: "That color on your teeth? It's trying to tell you something.",
    heroSubheading: "Some stains are just on the surface. Others are a sign of something more. Here's how you can figure out what's what.",
    directAnswer: "Tooth discoloration is basically one of two things. You've got stains on the outside of your teeth (extrinsic), which come from stuff like coffee, tea, wine, or smoking. Then you've got stains on the inside of your tooth (intrinsic), which can be from medicine, an injury, or just getting older. The outside stains? A good cleaning and whitening usually works wonders. But for the inside stains, you might need to look at veneers, bonding, or crowns. A dentist is the one who can tell you for sure what you've got and what'll work best.",
    detailedExplanation: [
      "So, what gives your teeth their color? It's a mix of a few things: how thick and see-through your enamel is, the color of the dentin (that's the layer underneath), and, of course, any stains you have. Figuring out which one is the culprit is the first step to getting your pearly whites back.",
      "Extrinsic stains are the ones on the outside of your enamel. Think of them like a coffee spill on a white shirt. They come from pigmented foods and drinks, smoking, or just not brushing and flossing enough. The good news? These are the easiest to get rid of since they haven't soaked deep into the tooth.",
      "Intrinsic stains are a different beast. They're actually inside the tooth. This can happen for a bunch of reasons. Maybe you took certain antibiotics (like tetracycline) as a kid, got too much fluoride when your teeth were forming, or a tooth got knocked around and the nerve was damaged. Even just getting older can cause the dentin inside to get darker. These kinds of stains won't budge with regular whitening strips."
    ],
    possibleCauses: [
      { title: "Coffee, tea, and red wine", description: "These drinks have little things called chromogens that just love to stick to your enamel. Over time, they build up and make your teeth look yellow or brown.", urgency: "low" },
      { title: "Smoking or chewing tobacco", description: "The tar and nicotine in tobacco are a nightmare for teeth, leaving behind stubborn brown and yellow stains that can really sink in.", urgency: "low" },
      { title: "Not brushing or flossing enough", description: "If you don't clean your teeth well, plaque and tartar can build up. That stuff can make your teeth look pretty yellow or even brownish.", urgency: "medium" },
      { title: "Just getting older", description: "It's a fact of life. As you age, your enamel gets thinner, which lets the darker layer of dentin underneath show through more. Totally normal.", urgency: "low" },
      { title: "Certain medications", description: "If you took tetracycline antibiotics as a kid, you might have grayish-brown bands on your teeth. Some antihistamines and blood pressure meds can cause staining, too.", urgency: "low" },
      { title: "An injury to a tooth", description: "Ever get a tooth knocked? Sometimes the nerve can get damaged and the tooth will slowly turn darker. That's a sign it might need to be checked out.", urgency: "medium" }
    ],
    selfCareSteps: [
      "Brush your teeth twice a day. Look for a whitening toothpaste with the ADA Seal of Acceptance on the box.",
      "After you have coffee, wine, or other staining drinks, swish your mouth out with some water.",
      "Use a straw for dark sodas or iced tea. It helps keep the liquid off your front teeth.",
      "If you smoke or chew tobacco, quitting is one of the best things you can do for your tooth color (and your health!).",
      "Don't skip your regular dental cleanings! They're great for getting rid of surface stains and tartar."
    ],
    whenToSeeDentist: [
      "One of your teeth is way darker than the rest (this could mean nerve damage).",
      "The discoloration showed up after you got hit in the tooth or face.",
      "You've tried whitening strips or gels and they aren't making a difference.",
      "You notice gray, blue, or black spots that aren't from something you ate.",
      "The discolored tooth also hurts, is sensitive, or you have a bad taste in your mouth."
    ],
    keyTakeaways: [
      "Most of the time, stains from food and drinks can be handled with good brushing and regular cleanings.",
      "If just one tooth has gone dark, you should definitely have a dentist take a look. It could be a sign of nerve damage.",
      "Whitening doesn't work on all types of stains. Your dentist can tell you what kind you have and what will actually work."
    ],
    faqs: [
      { question: "Do whitening toothpastes really work?", answer: "They can definitely help with minor surface stains, but they can't change your teeth's natural, inborn color or get rid of deeper stains. For a bigger change, you'll need to go with professional treatments." },
      { question: "Why did my tooth turn dark after I hit it?", answer: "When a tooth gets injured, the nerve inside can get damaged and die. As that nerve tissue breaks down, it releases substances that can stain the tooth from the inside out. It can happen weeks or even months later. A dark tooth is a tooth that needs a dentist's opinion." },
      { question: "Is it safe to whiten my teeth?", answer: "Generally, yes. As long as you use ADA-approved products and follow the directions, you should be fine. It's normal to have some temporary sensitivity. Just don't overdo it, because you can damage your enamel." },
      { question: "Can the DentaSmart app track my tooth color?", answer: "Yep! You can use the DentaSmart app to take regular pictures of your teeth to see if the color is changing. It's a great way to track if stains are getting better or worse and gives you something solid to show your dentist." }
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
    title: "Mouth Sores: What They Are & When to Worry",
    metaTitle: "Mouth Sore Causes & What to Do | DentaSmart",
    metaDescription: "Got a canker sore or a cold sore? Maybe something else? We'll help you figure out what kind of mouth sore you have, what's causing it, and when it's time to see a doctor.",
    primaryKeyword: "mouth sores",
    secondaryKeywords: ["canker sore treatment", "oral ulcer causes", "sore in mouth that won't heal", "mouth lesions"],
    heroHeading: "Most mouth sores are harmless. But some aren't.",
    heroSubheading: "Figuring out if that spot in your mouth is just a canker sore or something more serious can save you a lot of stress. And it helps you know when to act.",
    directAnswer: "Almost everyone gets mouth sores, and they're usually no big deal. The most common kind are canker sores (the technical term is aphthous ulcers). They look like little round, white or yellowish spots inside your mouth with a red ring around them. Then you have cold sores (or fever blisters), which pop up on or near your lips and are caused by the herpes virus. Most of the time, mouth sores go away by themselves in a week or two. But if you have a sore that sticks around for more than three weeks, you should definitely get it checked out by a dentist or doctor.",
    detailedExplanation: [
      "Think about it—your mouth does a lot of work. Eating, talking, breathing... all that activity means the soft tissue inside is always dealing with friction, different temperatures, and tons of bacteria. So, it's really not surprising that a sore pops up now and then.",
      "Canker sores are the ones you'll see most often. They aren't contagious, and they tend to show up when you're stressed, bite your cheek, eat acidic stuff, or even because of hormone shifts. They hurt, for sure, but they'll heal up on their own in about one to two weeks.",
      "But cold sores are a different story. They come from the herpes simplex virus (HSV-1), which means they're contagious. You'll find them on your lips or right around your mouth. And once you have the virus, it just hangs out in your body and can flare up when you're stressed, sick, or get too much sun."
    ],
    possibleCauses: [
      { title: "Canker sores (aphthous ulcers)", description: "Those small, painful sores you get inside your mouth. Often triggered by stress, accidentally biting your cheek, or even acidic foods. The good news? They're not contagious.", urgency: "low" },
      { title: "Cold sores (herpes simplex)", description: "These are little fluid-filled blisters on or around your lips. They're caused by the HSV-1 virus, they are contagious, and they can come back.", urgency: "low" },
      { title: "Irritation or trauma", description: "Ever bite your cheek? Or have a sharp tooth, rough dentures, or braces? That constant rubbing can definitely cause a sore.", urgency: "low" },
      { title: "Oral thrush", description: "This is a fungal infection. It looks like white patches that you can wipe off, but the tissue underneath is red and sore.", urgency: "medium" },
      { title: "Not enough vitamins", description: "If you're low on iron, B12, folate, or zinc, you might find yourself getting mouth sores more often.", urgency: "medium" },
      { title: "Oral cancer", description: "Okay, this is the serious one. If you have a sore or a lump that just won't heal after three weeks (especially if it doesn't hurt), you need to get it checked. Finding it early is everything.", urgency: "high" }
    ],
    selfCareSteps: [
      "Try rinsing with warm salt water a few times a day. It can help with the pain and speed up healing.",
      "You can get over-the-counter gels (like benzocaine) to numb the sore spot.",
      "Stay away from spicy, acidic, or crunchy foods for a bit. They'll just make it hurt more.",
      "Use a toothbrush with soft bristles and be extra careful when you're brushing near the sore.",
      "For cold sores, antiviral creams from the pharmacy can really help, but you have to use them right when you feel that first tingle."
    ],
    whenToSeeDentist: [
      "A mouth sore just isn't healing after three weeks",
      "The sore is really big (think bigger than a pencil eraser)",
      "You've got a fever along with the mouth sores",
      "You just keep getting sores over and over again",
      "You find a lump, a thick patch, or a white/red spot that won't go away, and it doesn't hurt",
      "It's getting hard to eat, drink, or swallow because of the sores"
    ],
    keyTakeaways: [
      "The vast majority of mouth sores are totally harmless and will clear up in a week or two, even if you do nothing.",
      "But any sore that sticks around for more than three weeks is a red flag. Always get that checked by a pro.",
      "Knowing if you have a canker sore or a cold sore is useful. It tells you how to handle it and whether you need to worry about spreading it."
    ],
    faqs: [
      { question: "Can I give my canker sore to someone else?", answer: "Nope. Canker sores aren't caused by a virus, so you can't spread them. Cold sores, though? Those are caused by the herpes virus and they are definitely contagious, especially when you can see the blisters." },
      { question: "So, when is a mouth sore a big deal?", answer: "You should see a dentist or doctor if a sore doesn't heal in three weeks, it's huge, you keep getting them, or you have other symptoms like a fever or trouble swallowing. And a sore that doesn't heal can, in rare cases, be a sign of oral cancer." },
      { question: "Does being stressed out cause mouth sores?", answer: "It sure can. Stress is a huge trigger for canker sores. It can also wake up the herpes virus and cause a cold sore outbreak. So, trying to manage your stress with good sleep, exercise, and relaxation can make a real difference." },
      { question: "Can the DentaSmart app help with this?", answer: "Totally. You can use the DentaSmart app to take pictures and keep a log of any mouth sores. It's a really simple way to see if a sore is healing like it should or if it's time to get it looked at." }
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
    lastReviewed: "2026-02-21"
  },
};

export const symptomsList = Object.values(symptomsData);
