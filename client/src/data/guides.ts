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
    title: "How to Actually Brush Your Teeth Right",
    metaTitle: "How to Brush Your Teeth The Right Way | DentaSmart Guide",
    metaDescription:
      "You're probably brushing your teeth wrong. It's super common. Here's a simple guide on how to brush correctly, for how long, and the mistakes to stop making.",
    primaryKeyword: "how to brush teeth",
    secondaryKeywords: ["proper brushing technique", "how long to brush teeth", "brushing mistakes", "best way to brush teeth"],
    heroHeading: "Are You Brushing Your Teeth Wrong?",
    heroSubheading: "You've been doing it your whole life, but there's a good chance you're making some classic mistakes. Let's fix your technique for good.",
    introduction:
      "Brushing your teeth is obviously the key to good oral health. But get this: studies show most of us only brush for about 45 seconds, not the two minutes we're supposed to. And lots of people use a rough back-and-forth sawing motion that hurts their gums and misses a bunch of spots. The funny thing is, the right way to do it takes the same amount of time but works so much better. This guide will show you how, one step at a time.",
    steps: [
      {
        title: "First, Get the Right Toothbrush",
        content: "You'll want a soft-bristled toothbrush. Make sure the head is small enough to get into all the nooks and crannies of your mouth. Those medium and hard bristles? They can actually wreck your enamel and gums over the years. Electric toothbrushes are a bit better than manual ones, especially if you know your technique isn't perfect.",
        tip: "Swap out your toothbrush (or the brush head) every 3 months. If the bristles look all bent and messy, change it sooner.",
      },
      {
        title: "Use Just a Pea-Sized Dab of Toothpaste",
        content: "Just squeeze a little pea-sized blob of fluoride toothpaste on your brush. You don't need that giant wave of toothpaste you see in the ads. That's just for show. The fluoride is what strengthens your enamel and stops cavities. And for kids under 3, a tiny smear the size of a grain of rice is plenty.",
        tip: "Don't rinse with water when you're done! Just spit. Leaving the fluoride on your teeth helps it keep working.",
      },
      {
        title: "The 45-Degree Angle is Everything",
        content: "Hold your brush at a 45-degree angle, pointing toward your gumline. Seriously, this is the most important part. You want the bristles to get right into that little pocket between your tooth and gum where all the plaque loves to hang out. It's the spot most of us miss.",
      },
      {
        title: "Go Easy with Short, Gentle Strokes",
        content: "You're not scrubbing a floor. Move the brush in short, gentle circles or wiggles (about as wide as a single tooth). Let the bristles do the cleaning. Pushing too hard just bends the bristles, making them useless, and it can really tear up your gums.",
        tip: "If your toothbrush looks like a squashed bug after a month, you're definitely pressing way too hard.",
      },
      {
        title: "Clean Every Surface, Every Time",
        content: "Think of your mouth in four sections (top right, top left, bottom right, bottom left). Spend about 30 seconds on each one. In each section, make sure you brush the outside (by your cheek), the inside (by your tongue), and the tops where you chew. Oh, and don't forget the very back of your last molars!",
      },
      {
        title: "Don't Forget to Brush Your Tongue",
        content: "Gently brush your tongue from back to front. Your tongue is like a shag carpet for bacteria that cause bad breath. So, cleaning it off can make your breath way fresher. Simple.",
      },
      {
        title: "Two. Full. Minutes.",
        content: "You have to time yourself. We all think we brush for two minutes, but it's usually more like 45 seconds. So use your phone's timer, put on a song, or get an electric toothbrush that has a timer built in. Two minutes is how long it takes for the fluoride to do its job and for you to actually clean every tooth.",
      },
    ],
    commonMistakes: [
      { mistake: "Scrubbing way too hard", correction: "Be gentle. If your gums are bleeding or your brush gets wrecked fast, you're pushing too hard." },
      { mistake: "Brushing right after acidic stuff", correction: "Hold up. Wait 30 minutes after you have things like citrus, soda, or wine. The acid makes your enamel soft for a bit, and brushing can scrape it away." },
      { mistake: "Only brushing the front teeth", correction: "The inside surfaces and the chewing tops need love, too. That's where a lot of cavities decide to show up." },
      { mistake: "Using a hard-bristled brush", correction: "Every dentist will tell you: use soft bristles. Hard ones don't clean any better and they just damage your mouth." },
      { mistake: "Rinsing with water afterward", correction: "Spit, don't rinse. You want that fluoride to stick around and protect your teeth for as long as possible." },
      { mistake: "Totally skipping the gumline", correction: "Remember that 45-degree angle? It's to clean where your tooth and gum meet. That's where plaque has its biggest parties." },
    ],
    keyTakeaways: [
      "That 45-degree angle to the gumline? It's the one change that makes the biggest difference for most people.",
      "Brush for a full 2 minutes, twice a day. Use a timer. You'll get used to it.",
      "Be gentle and always use a soft brush. Pushing harder doesn't mean cleaner.",
      "Spit out the extra toothpaste but don't rinse. Let the fluoride do its thing.",
    ],
    faqs: [
      { question: "Should I brush before or after breakfast?", answer: "It's actually better to brush before breakfast to get rid of all the gunk that built up overnight. But if you have to brush after, just wait about 30 minutes, especially if you had something acidic like orange juice." },
      { question: "Is an electric toothbrush really worth the money?", answer: "They can be! Studies show they're a little better at removing plaque, and they're great for people who have trouble with the motions. But a manual brush works just fine if you use it right." },
      { question: "How often do I need a new toothbrush?", answer: "Every 3 months. Or sooner if the bristles are all frayed and gross. You should also get a new one after you've been sick." },
      { question: "Can I actually brush my teeth too much?", answer: "Yep. Brushing more than three times a day or being too aggressive can wear down your enamel and bug your gums. Twice a day for two minutes is the sweet spot." },
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
  title: "Your Step-by-Step Guide to Flossing the Right Way",
  metaTitle: "How to Floss Like a Pro | DentaSmart",
  metaDescription: "Get the simple steps to floss right. It's easier than you think and protects the spots your toothbrush misses. Let's make it a habit.",
  primaryKeyword: "how to floss",
  secondaryKeywords: ["proper flossing technique", "flossing tips", "how to floss correctly", "why flossing matters"],
  heroHeading: "Finally, Learn How to Floss Right",
  heroSubheading: "Your toothbrush is only doing half the job. Seriously. Flossing gets the other 40% your brush can't.",
  introduction: "Let's be real, flossing can feel like a chore. It gets rid of all the gunk your toothbrush misses between your teeth and under your gums. Think about it: not flossing is like only washing half your body. Gross, right? But only 3 out of 10 adults do it every day. Why? Because most of us were never shown how to do it right, so it just feels weird or even hurts. We're going to fix that. Right now.",
  steps: [
    {
      title: "Get the Right Amount of Floss",
      content: "Grab about 18 inches of floss. Yeah, it sounds like a lot. But you'll want a clean piece for each tooth gap. Wrap most of it around one middle finger and just a little around your other middle finger. That leaves your thumbs and index fingers free to do the real work.",
    },
    {
      title: "Get a Good Grip",
      content: "Pinch the floss between your thumbs and index fingers, leaving just an inch or two of floss pulled tight between them. This little bit of taut floss gives you way more control. If it's too loose, you won't be able to aim it well and it might snap your gums. Ouch.",
      tip: "If you hate string floss, no worries. Try floss picks, a water flosser, or those little interdental brushes. Anything is better than nothing!",
    },
    {
      title: "Slide it in Gently",
      content: "Ease the floss between your teeth with a little back-and-forth sawing motion. Whatever you do, don't just snap it down. That's a quick way to cut your gums. If it's a tight squeeze, just be patient and keep wiggling it.",
    },
    {
      title: "Hug Each Tooth (This is the Secret!)",
      content: "Okay, this is the part everyone messes up. Once you're between the teeth, make a \"C\" shape with the floss, hugging one of the teeth. Now slide it up and down, getting just a little bit under your gumline. Then, do the exact same thing for the other tooth in the gap.",
      tip: "Remember, every gap has two sides you need to clean. Don't just pop the floss in and out.",
    },
    {
      title: "Use a Clean Piece for Each Tooth",
      content: "As you move to the next gap, unroll a fresh bit of floss from your 'clean' finger and wrap the used, gunky bit onto your other finger. You don't want to just move plaque from one tooth to another.",
    },
    {
      title: "Don't Forget the Very Back",
      content: "Make sure you get the back side of your very last molar on the top and bottom. It's easy to forget, but it's a favorite hiding spot for plaque and trouble.",
    },
  ],
  commonMistakes: [
    { mistake: "Snapping the floss down hard", correction: "Just guide it gently. Snapping it hurts, and if it hurts, you're not going to want to do it." },
    { mistake: "Just popping it in and out", correction: "You have to make that \"C\" shape and actually scrape the sides of your teeth. That's the whole point!" },
    { mistake: "Freaking out when your gums bleed", correction: "A little bleeding at first is totally normal. It just means your gums are inflamed and *really* need you to floss. Stick with it, and the bleeding should stop in a week or two." },
    { mistake: "Flossing way too hard", correction: "Be nice to your gums. You're trying to gently wipe plaque off, not saw your gums in half." },
    { mistake: "Only flossing when you feel something stuck", correction: "Nope. You have to floss every day. Plaque is invisible and sticky, and it's always building up in there." },
  ],
  keyTakeaways: [
    "The \"C-shape\" hug around each tooth is what really works.",
    "Try to floss once a day, maybe before you brush at night. Just being consistent is huge.",
    "If your gums bleed, don't stop! They'll get healthier and stop bleeding within a couple of weeks.",
    "String floss, picks, water flosser... it doesn't matter what you use, just use something!",
  ],
  faqs: [
    { question: "So, should I floss before or after I brush?", answer: "Floss before you brush. It clears out all the junk so your toothbrush and toothpaste can actually get in there and do their job. Plus, studies show more fluoride gets absorbed that way." },
    { question: "Are water flossers actually any good?", answer: "They're great! Especially if you have braces, bridges, or just find regular floss tricky. They're really good at blasting out food and making your gums healthier. For some people, they work just as well as string floss." },
    { question: "Is it too late for me to start flossing?", answer: "Never! Your gums will thank you, and you'll see an improvement in just a few weeks. They might bleed a bit when you start, but that just means it's working. Keep it up." },
    { question: "My teeth are super tight. What can I do?", answer: "Try a waxed floss or one of those smooth, tape-like flosses (the package might say PTFE). They slide in much easier. If that still doesn't work, a water flosser or interdental brushes are your best friends." },
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
    title: "Your Guide to a Dental Visit: What Really Happens?",
    metaTitle: "What to Expect at a Dental Visit | DentaSmart Guide",
    metaDescription:
      "Feeling nervous about your dental appointment? We get it. Here's a breakdown of what happens, what to ask, and how to get ready.",
    primaryKeyword: "what to expect at dental visit",
    secondaryKeywords: ["dental appointment", "first dental visit", "dental checkup", "dental anxiety", "questions to ask dentist"],
    heroHeading: "A Guide to Your Dental Visit",
    heroSubheading: "Knowing what's coming can make dental appointments way less stressful. Here’s a step-by-step look at what goes down.",
    introduction:
      "If you get anxious about the dentist, you're not alone. A lot of adults do—about 36% feel nervous, and 12% are actually terrified. A big reason for this is just the fear of the unknown. But when you know what's going to happen, why they're doing it, and what you should ask, it all gets a lot easier. This guide will walk you through a standard dental visit, so there are no surprises.",
    steps: [
      {
        title: "Getting Ready for Your Appointment",
        content: "Don't forget your insurance card, a list of any meds you're taking, and old dental records if you have them. If the dentist's chair makes you nervous, give the office a call beforehand. Lots of places have ways to help you feel more comfortable. And if you use DentaSmart, bring your scan history to show your dentist.",
        tip: "Jot down any questions you have before you go. It's super easy to forget everything once you're actually sitting in the chair.",
      },
      {
        title: "Chatting About Your Medical History",
        content: "You'll have to fill out or update a medical history form. Be totally honest here. Things like diabetes, heart problems, or being pregnant can change how your dental treatment goes. Also, stuff like blood thinners can affect procedures. Your dentist needs the full picture to keep you safe.",
      },
      {
        title: "Time for X-Rays (If You Need Them)",
        content: "If you're a new patient, you'll probably get a full set of X-rays. If you've been there before, you might just get a few bitewing X-rays (the ones that show the tops of your teeth) every year or two. X-rays are great because they spot things you can't see, like cavities hiding between teeth, bone loss, or infections. And don't worry, modern digital X-rays use very little radiation.",
      },
      {
        title: "The Professional Cleaning",
        content: "A dental hygienist will use special tools to clean your teeth. They'll start by scraping off hardened plaque, which is called tartar, from above and below your gumline. Then they'll polish your teeth to make them smooth and get rid of surface stains. A good flossing finishes it off. The whole thing usually takes about 30 to 60 minutes, depending on how much gunk they have to get through.",
        tip: "Haven't had a cleaning in a while? It might take a bit longer and feel a little more intense. That's totally normal.",
      },
      {
        title: "The Dentist's Exam",
        content: "Now it's the dentist's turn. They'll check out your teeth, gums, tongue, throat, and jaw. They're looking for cavities, gum disease, signs of oral cancer, bite issues, and checking on any fillings or crowns you already have. They'll also look at your X-rays and tell you what they see. This is the perfect time to ask about anything you've been wondering about.",
      },
      {
        title: "Talking About a Treatment Plan",
        content: "If the dentist finds any problems, they'll explain what's going on, how serious it is, and what your options are. You should ask about how much it'll cost, how long it'll take, and if there are other choices. You don't have to say yes to anything right away. It's fine to go home and think it over or even get a second opinion.",
        tip: "A great question to ask is, 'What happens if I wait?' This helps you figure out what's urgent and what can wait, especially if you're on a budget.",
      },
      {
        title: "Scheduling Your Next Visit",
        content: "Before you head out, book your next appointment. Most people should get a cleaning and checkup every 6 months. If you need any treatment, get those appointments on the calendar too. You're much more likely to actually go if it's already scheduled.",
      },
    ],
    commonMistakes: [
      { mistake: "Putting off the dentist because you're scared", correction: "Just tell your dentist you're anxious. They can change how they do things, explain everything, and offer ways to make you comfortable. Waiting only makes problems bigger and more stressful to fix." },
      { mistake: "Not asking questions", correction: "Seriously, ask away. Your dentist wants you to. Ask about what they found, your treatment choices, how much it costs, and the timeline. When you understand what's going on, you'll feel less anxious and make smarter choices." },
      { mistake: "Agreeing to something you don't get", correction: "Ask your dentist to explain it in simple terms. Ask what happens if you put it off. Get a written estimate of the cost. You have a right to know what you're agreeing to." },
      { mistake: "Skipping visits because nothing hurts", correction: "Lots of dental problems, like cavities, gum disease, and even oral cancer, don't hurt at first. Regular checkups catch these things early when they're way easier and cheaper to fix." },
      { mistake: "Forgetting to mention health updates", correction: "Always let your dentist know about new medications, health issues, or if you're pregnant. This stuff can really affect your treatment and safety." },
    ],
    keyTakeaways: [
      "A normal dental visit involves a health history update, maybe some X-rays, a cleaning, an exam, and a chat about any needed treatment.",
      "It's okay to be nervous about the dentist. Let them know so they can help you feel more comfortable.",
      "Don't be afraid to ask questions, especially about cost and how urgent something is. You can take time to decide on treatment.",
      "Use DentaSmart between appointments to keep an eye on your oral health and show up to your visit with more info.",
    ],
    faqs: [
      { question: "How often do I really need to go to the dentist?", answer: "For most people, every 6 months for a cleaning and checkup is about right. But if you have gum disease, smoke, or have diabetes, your dentist might want to see you every 3-4 months. DentaSmart can help you keep track of things between those visits." },
      { question: "What's a dental visit going to cost me?", answer: "Without insurance, a basic cleaning and exam is usually somewhere between $150 and $350. X-rays can add another $25 to $250, depending on what kind you get. The good news is that most dental insurance covers these preventive visits completely." },
      { question: "What if I haven't been to the dentist in forever?", answer: "It's all good. Your dentist isn't there to judge you. They'll just give you a thorough checkup and make a plan to get your mouth healthy again. Your first visit might just take a little longer, and the cleaning could be more involved." },
      { question: "Can I show my DentaSmart results to my dentist?", answer: "Yep! Sharing your DentaSmart scan history gives your dentist a better idea of how your oral health has been changing over time. It helps you both have a smarter conversation about your care." },
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
