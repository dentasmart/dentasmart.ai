/**
 * Server-side meta tag injection for SEO crawlers.
 *
 * SPA crawlers (SemRush, Google, etc.) see the raw HTML before JavaScript runs.
 * Without SSR, every page shares the same default <title> and <meta description>
 * from index.html, causing "duplicate meta description" issues.
 *
 * This module provides a URL → {title, description} mapping so the Express
 * catch-all can inject the correct tags into the HTML template before sending.
 */

import { listBlogPosts } from "./blogDb";

// ─── Types ───────────────────────────────────────────────────────────
interface MetaInfo {
  title: string;
  description: string;
  canonical?: string;
}

// ─── Static page meta tags ───────────────────────────────────────────
// Every page that has a unique <SEO> component in the React tree should
// have a matching entry here so crawlers see the same meta in raw HTML.
const staticMeta: Record<string, MetaInfo> = {
  "/": {
    title: "DentaSmart | Your Personal AI Oral Health Guide",
    description:
      "Dentasmart provides instant AI-powered dental insights. Upload your teeth photo for personalized care, clear education, and quick oral health clarity.",
  },
  "/how-it-works": {
    title: "How DentaSmart Works | AI Dental Analysis in 3 Steps",
    description:
      "Upload a photo of your teeth, get AI-powered analysis in seconds, and follow a personalized care plan. See how DentaSmart makes dental health simple.",
  },
  "/features": {
    title: "DentaSmart Features | AI Dental Scan, Oral Health Score & More",
    description:
      "Discover DentaSmart features: AI-powered photo analysis, personalized Oral Health Score, cost estimates, care reminders, and second opinion tools.",
  },
  "/pricing": {
    title: "DentaSmart Pricing | Free, Starter, Pro & Family Plans",
    description:
      "Compare DentaSmart plans: Free symptom quiz, Starter at $4.99/mo, Pro at $9.99/mo with unlimited scans, and Family at $14.99/mo for up to 5 members.",
  },
  "/employers": {
    title: "DentaSmart for Employers | AI Dental Benefits for Your Team",
    description:
      "Offer DentaSmart as an employee benefit. Reduce dental emergencies, improve oral health literacy, and lower dental costs for your workforce.",
  },
  "/team": {
    title: "Meet the DentaSmart Team | Our Mission & People",
    description:
      "Meet the team behind DentaSmart. Learn about our mission to make oral health accessible and the people building your AI dental guide.",
  },
  "/faqs": {
    title: "DentaSmart FAQs | Common Questions Answered",
    description:
      "Find answers to frequently asked questions about DentaSmart, including how AI analysis works, pricing, privacy, and app availability.",
  },
  "/download": {
    title: "Download DentaSmart | iOS App & Android Waitlist",
    description:
      "Download DentaSmart for iOS or join the Android waitlist. Get AI-powered dental analysis, personalized care plans, and oral health tracking on your phone.",
  },
  "/instant-scan": {
    title: "Instant Dental Scan | Upload a Photo for AI Analysis",
    description:
      "Try DentaSmart's instant dental scan. Upload a photo of your teeth and get AI-powered insights about your oral health in seconds.",
  },
  "/photo-guide": {
    title: "Photo Guide | How to Take the Best Dental Photos",
    description:
      "Learn how to take clear photos of your teeth for the best AI analysis results. Simple tips for lighting, angles, and what to capture.",
  },
  "/oral-health-hub": {
    title: "Oral Health Hub | Dental Education & Guides | DentaSmart",
    description:
      "Browse DentaSmart's Oral Health Hub for expert dental guides, symptom explanations, treatment information, and preventive care tips.",
  },
  "/answers": {
    title: "Dental Answers | AI-Powered Dental Q&A | DentaSmart",
    description:
      "Get instant answers to your dental questions with DentaSmart's AI-powered Q&A. Ask about symptoms, treatments, costs, and oral health.",
  },
  "/find-a-dentist": {
    title: "Find a Dentist Near You | DentaSmart Dentist Finder",
    description:
      "Find a trusted dentist near you with DentaSmart's dentist finder. Search by location, specialty, and insurance acceptance.",
  },
  "/symptom-quiz": {
    title: "Dental Symptom Quiz | Check Your Oral Health | DentaSmart",
    description:
      "Take DentaSmart's free dental symptom quiz. Answer a few questions about your symptoms and get personalized insights about your oral health.",
  },
  "/stories": {
    title: "DentaSmart User Stories | Real People, Real Results",
    description:
      "Read real stories from DentaSmart users who gained clarity about their oral health through AI-powered dental analysis.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | DentaSmart",
    description:
      "Read DentaSmart's privacy policy. Learn how we protect your personal data, dental photos, and health information.",
  },
  "/terms-of-service": {
    title: "Terms of Service | DentaSmart",
    description:
      "Read DentaSmart's terms of service. Understand the terms and conditions for using our AI dental health platform.",
  },

  // ─── Comparison pages ──────────────────────────────────────────────
  "/compare/dentasmart-vs-chatgpt-dental": {
    title: "DentaSmart vs ChatGPT for Dental Questions | Comparison",
    description:
      "Compare DentaSmart and ChatGPT for dental health questions. See why a purpose-built dental AI outperforms general chatbots for oral health.",
  },
  "/compare/dentasmart-vs-teledentistry": {
    title: "DentaSmart vs Teledentistry | Cost & Feature Comparison",
    description:
      "Compare DentaSmart with teledentistry services. See how AI dental analysis compares to virtual dentist visits in cost, speed, and convenience.",
  },
  "/compare/dentasmart-vs-dental-insurance": {
    title: "DentaSmart vs Dental Insurance | What's Right for You?",
    description:
      "Compare DentaSmart with traditional dental insurance. Learn how AI dental analysis can complement or replace expensive insurance plans.",
  },

  // ─── Conditions pages ──────────────────────────────────────────────
  "/conditions": {
    title: "Dental Conditions Guide | Common Oral Health Issues | DentaSmart",
    description:
      "Learn about common dental conditions including toothaches, cavities, gum disease, and more. Get clear explanations and know when to see a dentist.",
  },
  "/conditions/toothache": {
    title: "Toothache Guide | Causes, Relief & When to See a Dentist",
    description:
      "Your ultimate toothache guide to identify causes, find home relief, and know when to see a dentist for lasting comfort.",
  },
  "/conditions/cavities": {
    title: "Cavities Guide | Signs, Prevention & Treatment Options",
    description:
      "Find out what cavities are, how to spot the early signs, and what you can do about them. Simple, clear info from DentaSmart.",
  },
  "/conditions/gum-disease": {
    title: "Gum Disease Guide | Stages, Symptoms & Treatment",
    description:
      "Worried about bleeding gums? Learn about the stages of gum disease, what causes it, and simple ways you can protect your smile.",
  },
  "/conditions/wisdom-teeth-pain": {
    title: "Wisdom Teeth Pain | Causes, Symptoms & Removal Guide",
    description:
      "Wondering about wisdom teeth pain? Learn what causes it, what an impacted tooth is, and figure out if you need to get them removed.",
  },
  "/conditions/teeth-whitening": {
    title: "Teeth Whitening Guide | Methods, Safety & Results",
    description:
      "Thinking about teeth whitening? We compare everything from strips to pro treatments so you know what works, what's safe, and what to expect.",
  },
  "/conditions/sensitive-teeth": {
    title: "Sensitive Teeth | Causes, Remedies & When to See a Dentist",
    description:
      "Tired of wincing from hot or cold foods? Find out what causes sensitive teeth and how to get relief. Simple fixes and when to see a dentist.",
  },
  "/conditions/cracked-tooth": {
    title: "Cracked Tooth Guide | Types, Symptoms & Treatment",
    description:
      "Got a cracked tooth? We'll help you figure out what kind of crack you might have, what to look for, and when it's time to call the dentist.",
  },
  "/conditions/dental-abscess": {
    title: "Dental Abscess | Symptoms, Causes & Emergency Treatment",
    description:
      "Learn about dental abscess symptoms, causes, and why prompt dental care is essential to prevent serious infections. Act now for your oral health.",
  },
  "/conditions/root-canal": {
    title: "Root Canal Guide | What to Expect, Cost & Recovery",
    description:
      "Nervous about getting a root canal? Find out what really happens, why you might need one, and how it's way easier than you've heard.",
  },
  "/conditions/dental-crown": {
    title: "Dental Crown Guide | Types, Process & Care",
    description:
      "Thinking about a dental crown? Get the scoop on different types, the whole process, how long they last, and the best way to care for them.",
  },
  "/conditions/teeth-grinding": {
    title: "Teeth Grinding (Bruxism) | Causes, Damage & Treatment",
    description:
      "Do you grind your teeth at night? Find out what causes bruxism, the damage it can do, and simple ways you can protect your teeth and jaw.",
  },
  "/conditions/dental-implants": {
    title: "Dental Implants Guide | Process, Cost & Recovery",
    description:
      "Thinking about dental implants? Find out how the process works, what they cost, how long recovery takes, and if they're the right choice for you.",
  },
  "/conditions/dry-socket": {
    title: "Dry Socket | Prevention, Symptoms & Treatment After Extraction",
    description:
      "Learn everything about dry socket: causes, prevention tips, and treatment options to protect your healing after tooth extraction.",
  },
  "/conditions/oral-thrush": {
    title: "Oral Thrush Guide | Causes, Symptoms & Treatment",
    description:
      "Got white stuff in your mouth? It could be oral thrush. Here's a simple guide to what causes it, how to treat it, and when you should see a doctor.",
  },
  "/conditions/tmj-disorder": {
    title: "TMJ Disorder Guide | Causes, Symptoms & Relief",
    description:
      "Is your jaw clicking, popping, or just plain hurting? It could be TMJ disorder. Here's a simple guide to what causes it and how to find relief.",
  },
  "/conditions/periodontitis": {
    title: "Periodontitis Guide | Advanced Gum Disease Treatment",
    description:
      "Learn about periodontitis, an advanced form of gum disease. Find out about the causes, symptoms, and treatment options available to protect your smile.",
  },
  "/conditions/gingivitis-vs-periodontitis": {
    title: "Gingivitis vs Periodontitis | Key Differences Explained",
    description:
      "Learn the key differences between gingivitis and periodontitis. Understand the signs of early and advanced gum disease to protect your smile.",
  },
  "/conditions/tooth-sensitivity": {
    title: "Tooth Sensitivity Guide | Causes, Relief & Prevention Tips",
    description:
      "Dealing with tooth sensitivity? Learn what triggers it, simple home remedies, and when you should visit a dentist for lasting relief.",
  },

  // ─── Symptoms pages ────────────────────────────────────────────────
  "/symptoms": {
    title: "Dental Symptoms Checker | Identify Your Oral Health Issues",
    description:
      "Browse common dental symptoms like tooth pain, bleeding gums, jaw pain, and more. Learn what they mean and when to see a dentist.",
  },
  "/symptoms/tooth-pain-when-biting": {
    title: "Tooth Pain When Biting | Causes & What to Do",
    description:
      "Got tooth pain when you bite or chew? It could be a few things. Here are the most common causes and what you should do next.",
  },
  "/symptoms/tooth-pain": {
    title: "Tooth Pain | Common Causes, Home Relief & When to See a Dentist",
    description:
      "Experiencing tooth pain? Learn the most common causes from cavities to infections, quick relief options, and when it's time to see a dentist.",
  },
  "/symptoms/bleeding-gums": {
    title: "Bleeding Gums | Causes, Treatment & Prevention",
    description:
      "Seeing blood when you brush or floss? It's a sign from your gums. Find out what causes bleeding gums and the simple ways you can get them healthy again.",
  },
  "/symptoms/tooth-sensitivity": {
    title: "Tooth Sensitivity | Why Your Teeth Hurt & How to Fix It",
    description:
      "Do your teeth hurt with hot, cold, or sweet stuff? Find out what causes tooth sensitivity and how you can fix it.",
  },
  "/symptoms/jaw-pain": {
    title: "Jaw Pain | TMJ, Grinding & Other Causes Explained",
    description:
      "Is your jaw sore, clicking, or stiff? It could be TMJ, teeth grinding, or something else. Here's how to tell and when you should see a dentist.",
  },
  "/symptoms/bad-breath": {
    title: "Bad Breath (Halitosis) | Real Causes & How to Fix It",
    description:
      "Got bad breath that just won't quit? Find out the real reasons for halitosis and how to actually fix it for good.",
  },
  "/symptoms/swollen-gums": {
    title: "Swollen Gums | Causes, Home Remedies & When to See a Dentist",
    description:
      "Swollen gums can indicate infection or irritation. Learn the causes and when to see a dentist to keep your gums healthy.",
  },
  "/symptoms/loose-tooth": {
    title: "Loose Tooth in Adults | Causes & What to Do",
    description:
      "It's not normal for an adult tooth to be loose. Find out the common reasons why it happens, what you can do about it, and when you need to see a dentist.",
  },
  "/symptoms/dry-mouth": {
    title: "Dry Mouth (Xerostomia) | Causes, Risks & Relief",
    description:
      "Struggling with dry mouth (xerostomia)? Learn causes, remedies, and when to see a dentist to protect your oral health.",
  },
  "/symptoms/tooth-discoloration": {
    title: "Tooth Discoloration | Causes & Whitening Options",
    description:
      "Got yellow, brown, or even gray teeth? Find out what's causing it, see what whitening can and can't fix, and know when it's time to call the dentist.",
  },
  "/symptoms/mouth-sores": {
    title: "Mouth Sores | Types, Causes & When to See a Doctor",
    description:
      "Got a canker sore or a cold sore? We'll help you figure out what kind of mouth sore you have, what's causing it, and when it's time to see a doctor.",
  },
  "/symptoms/gum-bleeding-after-brushing": {
    title: "Gums Bleeding After Brushing | Causes & Solutions",
    description:
      "Gums bleeding after brushing? Discover causes, tips to stop it, and when to see a dentist for healthy, bleeding-free gums.",
  },
  "/symptoms/mouth-ulcers": {
    title: "Mouth Ulcers | Causes, Treatment & Home Remedies",
    description:
      "Annoying mouth ulcers got you down? Learn what causes them, how to treat them at home, and when it's time to see a dentist for those pesky sores.",
  },
  "/symptoms/canker-sores": {
    title: "Canker Sores | Causes, Treatment & Quick Relief",
    description:
      "Annoying canker sores got you down? Learn what causes canker sores and how to treat them fast. Get tips from DentaSmart for quick relief.",
  },
  "/symptoms/tongue-pain": {
    title: "Tongue Pain | Common Causes & When to See a Dentist",
    description:
      "Experiencing tongue pain? Learn about the common causes of a sore tongue and find out when it's time to see a dentist for your tongue pain.",
  },
  "/symptoms/cheek-biting": {
    title: "Cheek Biting | Why It Happens & How to Stop",
    description:
      "Learn why you might be biting your cheek, what causes chronic cheek biting, and when it's time to see a dentist for help.",
  },
  "/symptoms/teeth-grinding": {
    title: "Teeth Grinding (Bruxism) | Signs, Causes & Protection",
    description:
      "Waking up with a sore jaw? You might be grinding your teeth. Learn about the common causes of teeth grinding and what you can do to protect your smile.",
  },
  "/symptoms/jaw-clicking": {
    title: "Jaw Clicking & Popping | Causes & TMJ Relief",
    description:
      "Is your jaw clicking? Learn about the common causes of jaw popping and clicking, and find out when it's time to see a dentist for your TMJ.",
  },
  "/symptoms/gum-itching": {
    title: "Itchy Gums | Common Causes & How to Find Relief",
    description:
      "Got that nagging, itchy feeling in your gums? We'll help you figure out the common causes of itchy gums and what you can do to find relief fast.",
  },
  "/symptoms/tooth-staining": {
    title: "Tooth Staining | Causes & How to Get a Brighter Smile",
    description:
      "Learn about the common causes of tooth staining and how to get your bright, white smile back. Find out when it's time to see a dentist about stained teeth.",
  },
  "/symptoms/enamel-erosion": {
    title: "Enamel Erosion | Causes, Symptoms & Treatment",
    description:
      "Concerned about enamel erosion? Learn the causes of tooth enamel loss, recognize the symptoms, and discover effective treatments to protect your smile.",
  },
  "/symptoms/root-exposure": {
    title: "Exposed Tooth Root | Causes, Symptoms & Treatment",
    description:
      "Learn about exposed tooth roots, a common sign of gum recession. Discover what causes it and how to treat it to protect your smile.",
  },
  "/symptoms/gum-inflammation": {
    title: "Gum Inflammation | Causes & Treatment Options",
    description:
      "Struggling with gum inflammation? Discover causes and signs that indicate when to see a dentist for swollen, irritated gums.",
  },
  "/symptoms/persistent-metallic-taste": {
    title: "Metallic Taste in Mouth | Causes & When to See a Dentist",
    description:
      "Discover causes of a metallic taste in mouth and learn when to see a dentist. Find relief from this common issue today.",
  },
  "/symptoms/swollen-lymph-nodes-dental": {
    title: "Swollen Lymph Nodes from Dental Issues | Causes & Treatment",
    description:
      "Concerned about swollen lymph nodes and dental issues? Learn what causes swollen glands from tooth infections and when you should see a dentist.",
  },
  "/symptoms/facial-swelling": {
    title: "Facial Swelling from Dental Problems | Causes & When to Act",
    description:
      "Concerned about facial swelling? Learn how dental issues like tooth infections can cause a swollen face and when you need to see a dentist right away.",
  },
  "/symptoms/tooth-migration": {
    title: "Tooth Migration | Why Teeth Shift & What to Do",
    description:
      "Experiencing tooth migration? Learn about the common causes of teeth shifting in adults and discover effective treatments to keep your smile in place.",
  },
  "/symptoms/bite-changes": {
    title: "Bite Changes | Why Your Bite Feels Off & What to Do",
    description:
      "Experiencing bite changes? Learn what causes your bite to feel off and when you should see a dentist. Get tips for managing malocclusion.",
  },
  "/symptoms/mouth-numbness": {
    title: "Mouth Numbness | Causes of Oral Paresthesia & Treatment",
    description:
      "Experiencing mouth numbness? Learn about the common causes of a numb mouth and when it's time to see a dentist for your oral health.",
  },
  "/symptoms/gum-tenderness": {
    title: "Tender Gums | Causes & How to Get Relief",
    description:
      "Dealing with tender gums? Learn what causes gum tenderness and find effective ways to get relief. Your guide to healthier gums from DentaSmart.",
  },
  "/symptoms/tmj-disorder": {
    title: "TMJ Disorder Symptoms | Jaw Pain, Clicking & Treatment",
    description:
      "Experiencing jaw pain or a clicking sound? Learn about the symptoms and causes of TMJ disorder and find out when it's time to see a dentist for relief.",
  },
  "/symptoms/periodontal-disease": {
    title: "Periodontal Disease | Stages, Symptoms & Treatment",
    description:
      "Learn about periodontal disease, also known as gum disease. Understand the stages, symptoms, and treatment options to protect your oral health.",
  },
  "/symptoms/gingivitis": {
    title: "Gingivitis | Early Gum Disease Symptoms & Treatment",
    description:
      "Concerned about gingivitis? Learn about early gum disease symptoms, causes, and what you can do to get your healthy smile back.",
  },
  "/symptoms/dental-caries": {
    title: "Dental Caries (Tooth Decay) | Symptoms, Causes & Prevention",
    description:
      "Learn about dental caries, including common symptoms, causes, and what to do if you think you have a cavity. Find out how to prevent tooth decay.",
  },
  "/symptoms/enamel-hypersensitivity": {
    title: "Enamel Hypersensitivity | Causes & Solutions for Sensitive Teeth",
    description:
      "Struggling with enamel hypersensitivity? Learn what causes sensitive teeth and find real solutions to stop the pain. Get relief today.",
  },
  "/symptoms/oral-thrush": {
    title: "Oral Thrush Symptoms | White Patches in Mouth Explained",
    description:
      "Dealing with white patches in your mouth? It could be oral thrush. Learn about the causes, symptoms, and treatments for this common fungal infection.",
  },
  "/symptoms/aphthous-ulcers": {
    title: "Aphthous Ulcers | Canker Sore Causes & Treatment",
    description:
      "Learn about aphthous ulcers, also known as canker sores. Find out what causes them, how to treat them, and when to see a dentist.",
  },
  "/symptoms/leukoplakia": {
    title: "Leukoplakia | White Patches in Mouth - Causes & Treatment",
    description:
      "Seeing white patches in your mouth? It could be leukoplakia. Learn about the common causes and when you should see a dentist.",
  },
  "/symptoms/oral-lichen-planus": {
    title: "Oral Lichen Planus | Causes, Symptoms & Management",
    description:
      "Seeing white, lacy patterns in your mouth? It could be oral lichen planus. Learn about the causes, symptoms, and what you can do about this condition.",
  },
  "/symptoms/dental-headache": {
    title: "Dental Headaches | When Your Teeth Cause Head Pain",
    description:
      "Headaches can come from dental problems like teeth grinding, TMJ, or an infected tooth. Learn how to tell if your teeth are causing your headaches.",
  },
  "/symptoms/receding-gums": {
    title: "Receding Gums | Causes, Treatment & Prevention",
    description:
      "Noticing your gums pulling back from your teeth? Receding gums can lead to sensitivity and tooth loss. Learn the causes and when to see a dentist.",
  },
  "/symptoms/white-tongue": {
    title: "White Tongue | Causes & When to See a Doctor",
    description:
      "A white coating on your tongue is usually harmless but can signal oral thrush or dehydration. Learn what causes white tongue and when to see a doctor.",
  },

  // ─── Guides pages ──────────────────────────────────────────────────
  "/guides": {
    title: "Oral Health Guides | Expert Dental Care Tips | DentaSmart",
    description:
      "Browse DentaSmart's expert oral health guides covering brushing, flossing, dental visits, affordable care, and more.",
  },
  "/guides/brushing-guide": {
    title: "How to Brush Your Teeth Properly | Complete Guide",
    description:
      "You're probably brushing your teeth wrong. Here's a simple guide on how to brush correctly, for how long, and the mistakes to stop making.",
  },
  "/guides/flossing-guide": {
    title: "How to Floss Correctly | Simple Step-by-Step Guide",
    description:
      "Get the simple steps to floss right. It's easier than you think and protects the spots your toothbrush misses. Let's make it a habit.",
  },
  "/guides/dental-visit-guide": {
    title: "Dental Visit Guide | What to Expect & How to Prepare",
    description:
      "Feeling nervous about your dental appointment? Here's a breakdown of what happens, what to ask, and how to get ready.",
  },
  "/guides/affordable-dental-care": {
    title: "Affordable Dental Care Guide | Save on Dental Costs",
    description:
      "Don't let cost be a barrier to a healthy smile. Our guide shows you how to find affordable dental care, from community clinics to payment plans.",
  },
  "/guides/dental-insurance-alternatives": {
    title: "Dental Insurance Alternatives | Affordable Options Guide",
    description:
      "Tired of expensive dental insurance? Explore affordable alternatives like discount plans, dental schools, and payment options.",
  },
  "/guides/diy-dental-care": {
    title: "DIY Dental Care | Safe Home Teeth Cleaning & Whitening",
    description:
      "Want to manage your dental care at home? Learn which DIY teeth cleaning and whitening methods are safe and when you need to see a dentist.",
  },
  "/guides/preventing-expensive-dental-problems": {
    title: "Prevent Expensive Dental Problems | Money-Saving Guide",
    description:
      "Learn how to prevent expensive dental problems with our comprehensive guide. A roadmap to a healthier smile and a happier wallet.",
  },
  "/guides/dental-emergencies-on-a-budget": {
    title: "Dental Emergencies on a Budget | Affordable Emergency Care",
    description:
      "Don't let cost stop you from treating a dental emergency. Our guide helps you find affordable care, manage pain, and know when to seek help.",
  },
  "/guides/when-to-get-dental-second-opinion": {
    title: "When to Get a Dental Second Opinion | Complete Guide",
    description:
      "Feeling unsure about a dental diagnosis? Learn the signs you need a second opinion, how to find the right dentist, and how to compare treatment plans.",
  },
  "/guides/do-you-need-root-canal": {
    title: "Do You Need a Root Canal? | Signs & Alternatives",
    description:
      "Worried you might need a root canal? Learn the signs, explore alternatives, and understand the costs before you commit.",
  },
  "/guides/crowns-vs-fillings": {
    title: "Dental Crown vs Filling | Cost, Pros & Cons Compared",
    description:
      "Confused about whether you need a dental crown or a filling? Our guide breaks down the costs, longevity, and pros and cons.",
  },
  "/guides/implants-vs-bridges": {
    title: "Dental Implants vs Bridges | Complete Comparison Guide",
    description:
      "Explore the pros and cons of dental implants and bridges. Compare cost, longevity, and who is a good candidate.",
  },
  "/guides/complete-oral-health-routine": {
    title: "Complete Oral Health Routine | Daily Dental Care Guide",
    description:
      "A complete oral health routine is the key to a healthy smile. Learn how to build a daily dental care routine that works for you.",
  },
  "/guides/how-to-prevent-cavities": {
    title: "How to Prevent Cavities | Science-Backed Tips & Habits",
    description:
      "Tired of hearing you have another cavity? Learn how to prevent cavities with science-backed tips on diet, fluoride, and daily habits.",
  },
  "/guides/gum-disease-prevention": {
    title: "Gum Disease Prevention | Complete Guide to Healthy Gums",
    description:
      "Learn how to prevent gum disease with our complete guide. From daily habits to professional cleanings, everything you need for healthy gums.",
  },
  "/guides/natural-teeth-whitening": {
    title: "Natural Teeth Whitening | Safe Methods That Actually Work",
    description:
      "Discover safe and effective natural teeth whitening methods you can do at home. Learn what to use, what to avoid, and how to maintain a brighter smile.",
  },
  "/guides/oral-health-life-stages": {
    title: "Oral Health by Life Stage | Baby to Senior Dental Care",
    description:
      "Discover expert tips to improve your oral health by life stage, from childhood to senior care. Perfect your routine at every age for a healthier smile.",
  },

  // ─── Dental Cost pages ─────────────────────────────────────────────
  "/dental-costs": {
    title: "Dental Costs Guide | How Much Do Dental Procedures Cost?",
    description:
      "Find out how much common dental procedures cost, from cleanings to implants. Compare prices with and without insurance.",
  },
  "/dental-costs/root-canal-cost": {
    title: "Root Canal Cost | Average Prices With & Without Insurance",
    description:
      "How much does a root canal cost? Compare average prices by tooth type, with and without insurance, and learn how to save.",
  },
  "/dental-costs/dental-implant-cost": {
    title: "Dental Implant Cost | Full Price Breakdown & Financing",
    description:
      "How much do dental implants cost? Get a full price breakdown including the implant, abutment, and crown, plus financing options.",
  },
  "/dental-costs/braces-cost": {
    title: "Braces Cost | Average Prices for Metal, Ceramic & Invisalign",
    description:
      "How much do braces cost? Compare prices for metal braces, ceramic braces, and Invisalign with and without insurance.",
  },
  "/dental-costs/veneers-cost": {
    title: "Veneers Cost | Porcelain vs Composite Price Comparison",
    description:
      "How much do dental veneers cost? Compare porcelain and composite veneer prices, insurance coverage, and financing options.",
  },
  "/dental-costs/wisdom-teeth-removal-cost": {
    title: "Wisdom Teeth Removal Cost | Average Prices & Insurance",
    description:
      "How much does wisdom teeth removal cost? Compare prices for simple vs surgical extraction with and without insurance.",
  },
  "/dental-costs/teeth-whitening-cost": {
    title: "Teeth Whitening Cost | Professional vs At-Home Prices",
    description:
      "How much does teeth whitening cost? Compare professional in-office whitening with at-home kits and strips.",
  },
  "/dental-costs/dental-crown-cost": {
    title: "Dental Crown Cost | Average Prices by Material & Type",
    description:
      "How much does a dental crown cost? Compare prices for porcelain, metal, and zirconia crowns with and without insurance.",
  },
  "/dental-costs/tooth-extraction-cost": {
    title: "Tooth Extraction Cost | Simple vs Surgical Prices",
    description:
      "How much does a tooth extraction cost? Compare prices for simple and surgical extractions with and without insurance.",
  },
  "/dental-costs/dental-cleaning-cost": {
    title: "Dental Cleaning Cost | Regular vs Deep Cleaning Prices",
    description:
      "How much does a dental cleaning cost? Compare regular cleaning and deep cleaning prices with and without insurance.",
  },
  "/dental-costs/dentures-cost": {
    title: "Dentures Cost | Full & Partial Denture Price Guide",
    description:
      "How much do dentures cost? Compare full and partial denture prices, insurance coverage, and affordable alternatives.",
  },

  // ─── Treatment pages ───────────────────────────────────────────────
  "/treatments": {
    title: "Dental Treatment Guides | What to Expect | DentaSmart",
    description:
      "Learn about common dental treatments including root canals, implants, crowns, and more. Understand what to expect, recovery time, and costs.",
  },
  "/treatments/root-canal-procedure": {
    title: "Root Canal Procedure | Step-by-Step Guide & Recovery",
    description:
      "Learn exactly what happens during a root canal procedure, from start to finish. Understand recovery time, pain management, and aftercare.",
  },
  "/treatments/dental-implant-procedure": {
    title: "Dental Implant Procedure | Complete Guide & Timeline",
    description:
      "Learn about the dental implant procedure from consultation to final crown. Understand the timeline, recovery, and what to expect.",
  },
  "/treatments/wisdom-teeth-removal": {
    title: "Wisdom Teeth Removal | Procedure, Recovery & Tips",
    description:
      "Everything you need to know about wisdom teeth removal: the procedure, recovery timeline, pain management, and aftercare tips.",
  },
  "/treatments/dental-crown-procedure": {
    title: "Dental Crown Procedure | What to Expect & Aftercare",
    description:
      "Learn about the dental crown procedure, from preparation to placement. Understand what to expect, recovery, and how to care for your crown.",
  },
  "/treatments/braces-treatment": {
    title: "Braces Treatment Guide | Types, Timeline & Care",
    description:
      "Everything you need to know about braces: types available, treatment timeline, what to expect, and how to care for your braces.",
  },
  "/treatments/teeth-whitening-procedure": {
    title: "Professional Teeth Whitening | Procedure & Results Guide",
    description:
      "Learn about professional teeth whitening procedures, from in-office treatments to take-home kits. Understand results and maintenance.",
  },
  "/treatments/tooth-extraction-procedure": {
    title: "Tooth Extraction Procedure | What to Expect & Recovery",
    description:
      "Learn about the tooth extraction procedure, from preparation to recovery. Understand what to expect and how to heal properly.",
  },
  "/treatments/dental-cleaning-procedure": {
    title: "Dental Cleaning Procedure | What Happens & Why It Matters",
    description:
      "Learn what happens during a dental cleaning, why regular cleanings matter, and the difference between regular and deep cleaning.",
  },
  "/treatments/veneers-procedure": {
    title: "Dental Veneers Procedure | Process, Types & Results",
    description:
      "Learn about the dental veneers procedure, from consultation to final placement. Understand types, costs, and expected results.",
  },
  "/treatments/dentures-treatment": {
    title: "Dentures Treatment Guide | Types, Fitting & Care",
    description:
      "Everything you need to know about dentures: types available, the fitting process, adjustment period, and daily care tips.",
  },

  // ─── Comparison pages ──────────────────────────────────────────────
  "/comparisons": {
    title: "Dental Comparisons | Side-by-Side Treatment Guides",
    description:
      "Compare popular dental treatments side by side. Braces vs Invisalign, implants vs dentures, crowns vs veneers, and more.",
  },
  "/comparisons/braces-vs-invisalign": {
    title: "Braces vs Invisalign | Cost, Comfort & Results Compared",
    description:
      "Compare braces and Invisalign side by side. See the differences in cost, comfort, treatment time, and results to make the right choice.",
  },
  "/comparisons/dental-implants-vs-dentures": {
    title: "Dental Implants vs Dentures | Which Is Right for You?",
    description:
      "Compare dental implants and dentures. Understand the pros, cons, costs, and who is the best candidate for each option.",
  },
  "/comparisons/crown-vs-veneer": {
    title: "Crown vs Veneer | Differences, Cost & Which to Choose",
    description:
      "Compare dental crowns and veneers. Learn the key differences in purpose, cost, durability, and which option is right for your situation.",
  },
  "/comparisons/electric-vs-manual-toothbrush": {
    title: "Electric vs Manual Toothbrush | Which Cleans Better?",
    description:
      "Compare electric and manual toothbrushes. See which cleans better, the cost difference, and which dentists recommend.",
  },
  "/comparisons/fluoride-vs-fluoride-free-toothpaste": {
    title: "Fluoride vs Fluoride-Free Toothpaste | Which Is Better?",
    description:
      "Compare fluoride and fluoride-free toothpaste. Understand the science, benefits, risks, and which is right for you.",
  },
  "/comparisons/veneers-vs-crowns": {
    title: "Veneers vs Crowns | Differences, Cost & Which Is Right for You",
    description:
      "Compare dental veneers and crowns side by side. Learn the differences in cost, durability, appearance, and which option suits your needs.",
  },

  // ─── Life Stages pages ─────────────────────────────────────────────
  "/life-stages": {
    title: "Dental Care by Life Stage | Baby to Senior Guide",
    description:
      "Dental care needs change as you age. Browse our life-stage guides for babies, children, teens, pregnant women, and seniors.",
  },
  "/life-stages/baby-teething-guide": {
    title: "Baby Teething Guide | Timeline, Symptoms & Relief",
    description:
      "Everything parents need to know about baby teething: when teeth come in, common symptoms, and safe ways to soothe your baby's pain.",
  },
  "/life-stages/childrens-dental-health": {
    title: "Children's Dental Health | Guide for Parents",
    description:
      "A parent's guide to children's dental health. Learn about first dental visits, cavity prevention, and building healthy habits early.",
  },
  "/life-stages/teen-braces-guide": {
    title: "Teen Braces Guide | What Parents & Teens Need to Know",
    description:
      "Everything teens and parents need to know about braces: types, timeline, cost, and tips for making the experience easier.",
  },
  "/life-stages/pregnancy-dental-care": {
    title: "Pregnancy Dental Care | Safe Treatments & Tips",
    description:
      "Dental care during pregnancy is important for both mom and baby. Learn which treatments are safe and how to maintain oral health.",
  },
  "/life-stages/senior-dental-care": {
    title: "Senior Dental Care | Oral Health Tips for Older Adults",
    description:
      "Dental care needs change as you age. Learn about common senior dental issues, denture care, and maintaining oral health in your golden years.",
  },

  // ─── Dental Emergency pages ────────────────────────────────────────
  "/dental-emergencies": {
    title: "Dental Emergencies | What to Do & When to Get Help",
    description:
      "Know what to do in a dental emergency. Quick guides for knocked-out teeth, broken teeth, severe toothaches, and dental abscesses.",
  },
  "/dental-emergencies/knocked-out-tooth": {
    title: "Knocked Out Tooth | Emergency Steps to Save Your Tooth",
    description:
      "Knocked out a tooth? Act fast. Follow these emergency steps to save your tooth and get the best chance of successful reimplantation.",
  },
  "/dental-emergencies/dental-emergency-guide": {
    title: "Dental Emergency Guide | When to Go to the ER vs Dentist",
    description:
      "Not sure if it's a dental emergency? Learn when to go to the ER, when to call your dentist, and what to do while you wait.",
  },
  "/dental-emergencies/broken-tooth": {
    title: "Broken Tooth | Emergency Care & Treatment Options",
    description:
      "Broke a tooth? Learn what to do immediately, how to manage pain, and what treatment options are available to fix your broken tooth.",
  },
  "/dental-emergencies/severe-toothache": {
    title: "Severe Toothache | Emergency Relief & When to See a Dentist",
    description:
      "Dealing with a severe toothache? Get emergency relief tips and learn when a toothache means you need to see a dentist right away.",
  },
  "/dental-emergencies/dental-abscess": {
    title: "Dental Abscess Emergency | Signs You Need Immediate Care",
    description:
      "A dental abscess can be dangerous. Learn the warning signs that you need immediate care and what to do before you reach the dentist.",
  },

  // ─── Lifestyle pages ───────────────────────────────────────────────
  "/lifestyle": {
    title: "Lifestyle & Oral Health | How Habits Affect Your Teeth",
    description:
      "Learn how lifestyle choices like smoking, diet, diabetes, and sports affect your oral health. Practical tips for protecting your smile.",
  },
  "/lifestyle/smoking-and-oral-health": {
    title: "Smoking & Oral Health | How Tobacco Damages Your Mouth",
    description:
      "Learn how smoking and tobacco use damage your oral health, from stained teeth to gum disease and oral cancer. Tips for quitting.",
  },
  "/lifestyle/diabetes-and-dental-care": {
    title: "Diabetes & Dental Care | Managing Oral Health with Diabetes",
    description:
      "Diabetes affects your oral health. Learn the connection between diabetes and dental problems, and how to manage both effectively.",
  },
  "/lifestyle/diet-and-teeth": {
    title: "Diet & Your Teeth | Foods That Help & Hurt Oral Health",
    description:
      "What you eat affects your teeth. Learn which foods strengthen enamel, which cause cavities, and how to build a tooth-friendly diet.",
  },
  "/lifestyle/sports-mouthguards": {
    title: "Sports Mouthguards | Protecting Your Teeth During Sports",
    description:
      "Protect your teeth during sports with the right mouthguard. Learn about types, fitting, and why every athlete needs one.",
  },
  "/lifestyle/oral-piercing-risks": {
    title: "Oral Piercing Risks | How Piercings Affect Dental Health",
    description:
      "Thinking about a tongue or lip piercing? Learn about the dental risks including chipped teeth, gum damage, and infection.",
  },

  // ─── Hub landing pages ─────────────────────────────────────────────
  "/oral-health-hub/affordability": {
    title: "Affordable Dental Care Hub | Save on Dental Costs",
    description:
      "Explore resources for affordable dental care. Find tips on saving money, insurance alternatives, and low-cost dental options.",
  },
  "/oral-health-hub/second-opinion": {
    title: "Dental Second Opinion Hub | Get Clarity on Your Diagnosis",
    description:
      "Not sure about your dental diagnosis? Browse our second opinion resources to understand your options and make informed decisions.",
  },
  "/oral-health-hub/prevention": {
    title: "Dental Prevention Hub | Keep Your Smile Healthy",
    description:
      "Prevention is the best dental care. Browse guides on brushing, flossing, diet, and habits that keep your teeth and gums healthy.",
  },
  "/oral-health-hub/conditions": {
    title: "Dental Conditions Hub | Understand Your Oral Health Issues",
    description:
      "Browse common dental conditions with clear explanations, symptoms, and treatment options. Understand what's happening in your mouth.",
  },
  "/oral-health-hub/symptoms": {
    title: "Dental Symptoms Hub | Identify What's Wrong",
    description:
      "Experiencing dental symptoms? Browse our symptom guides to understand what might be causing your discomfort and when to see a dentist.",
  },
  // ─── Additional pages missing from original map ───────────────────
  "/symptoms/headache": {
    title: "Dental Headaches: Are Your Teeth Causing Head Pain?",
    description:
      "Dental headaches: are your teeth causing head pain? Discover common dental issues like grinding, TMJ, or infections that may be behind your headaches.",
  },
  "/hub": {
    title: "Oral Health Hub | DentaSmart",
    description:
      "Browse dental health articles, guides, and resources organized by topic. From symptoms to costs, get clear answers about your oral health.",
  },
  "/hub/symptoms": {
    title: "Dental Symptoms Explained | DentaSmart Oral Health Hub",
    description:
      "Understand what your dental symptoms mean. From tooth pain to sensitivity, get clear answers about common oral health issues.",
  },
  "/hub/gums": {
    title: "Gum Health Guide | DentaSmart Oral Health Hub",
    description:
      "Learn about gum health, bleeding gums, gum recession, and gum disease. Simple explanations and steps to protect your gums.",
  },
  "/hub/cavities": {
    title: "Cavity & Tooth Decay Guide | DentaSmart Oral Health Hub",
    description:
      "Everything you need to know about cavities, tooth decay, and dental fillings. Spot the signs early and protect your teeth.",
  },
  "/hub/xrays": {
    title: "Dental X-Ray Guide | DentaSmart Oral Health Hub",
    description:
      "Understand your dental X-rays. Learn what dentists look for, what findings mean, and how AI can help you read your own X-rays.",
  },
  "/hub/costs": {
    title: "Dental Costs & Savings Guide | DentaSmart Oral Health Hub",
    description:
      "Understand dental treatment costs, insurance options, and ways to save money. Make informed decisions about your oral health spending.",
  },
  "/oral-health-hub/black-line-on-tooth": {
    title: "Black Line on Tooth | Causes & Treatment | DentaSmart",
    description:
      "Learn the causes, symptoms, and solutions for the black line on tooth. Expert tips from DentaSmart's Oral Health Hub to maintain your dental health.",
  },
  "/oral-health-hub/gum-boil": {
    title: "Gum Boil | Causes & Treatment | DentaSmart",
    description:
      "Learn about gum boils, causes, symptoms, and treatments to maintain healthy gums. DentaSmart's Oral Health Hub provides expert dental insights.",
  },
  "/oral-health-hub/loose-tooth-adult": {
    title: "Loose Tooth in Adults | Causes & What to Do | DentaSmart",
    description:
      "Worried about a loose tooth as an adult? Discover causes, treatment options, and when to see a dentist for loose teeth.",
  },
  "/oral-health-hub/mouth-ulcer-not-healing": {
    title: "Mouth Ulcer Not Healing | When to Worry | DentaSmart",
    description:
      "Is your mouth ulcer not healing? Learn when a persistent sore needs attention and what conditions may cause slow healing.",
  },
  "/oral-health-hub/white-spots-on-teeth": {
    title: "White Spots on Teeth | Causes & Removal | DentaSmart",
    description:
      "Notice white spots on your teeth? Find out what causes them, prevention tips, and effective treatment options available.",
  },
};

// ─── Dynamic meta resolution ─────────────────────────────────────────
// Blog posts stored in the database need a DB lookup.
// Cache results for 1 hour to avoid per-request queries.
let blogMetaCache: Map<string, MetaInfo> = new Map();
let blogMetaCacheTime = 0;
const BLOG_META_CACHE_TTL = 60 * 60 * 1000; // 1 hour

async function refreshBlogMetaCache(): Promise<void> {
  try {
    const result = await listBlogPosts({ publishedOnly: true, limit: 1000 });
    const newCache = new Map<string, MetaInfo>();
    for (const post of result.posts) {
      const path = `/oral-health-hub/${post.slug}`;
      newCache.set(path, {
        title: (post as any).metaTitle || post.title || "DentaSmart | Oral Health Hub",
        description:
          (post as any).metaDescription ||
          `Read about ${post.title} on DentaSmart's Oral Health Hub. Expert dental health information and guidance.`,
      });
    }
    blogMetaCache = newCache;
    blogMetaCacheTime = Date.now();
  } catch (e) {
    console.error("[MetaTags] Failed to refresh blog meta cache:", e);
  }
}

const BASE_URL = "https://dentasmart.ai";

/**
 * Resolve the correct <title>, <meta description>, and canonical URL for a given URL path.
 * Returns null if no specific meta is found (will use index.html defaults).
 */
export async function resolveMetaTags(urlPath: string): Promise<MetaInfo | null> {
  // 1. Check static pages first (instant, no DB)
  const cleanPath = urlPath.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  // Canonical uses trailing slash for non-root paths to match infrastructure behavior
  const canonicalPath = cleanPath === "/" ? "/" : `${cleanPath}/`;
  const staticHit = staticMeta[cleanPath];
  if (staticHit) return { ...staticHit, canonical: `${BASE_URL}${canonicalPath}` };

  // 2. Check blog posts (cached DB lookup)
  if (cleanPath.startsWith("/oral-health-hub/")) {
    if (Date.now() - blogMetaCacheTime > BLOG_META_CACHE_TTL) {
      await refreshBlogMetaCache();
    }
    const blogHit = blogMetaCache.get(cleanPath);
    if (blogHit) return { ...blogHit, canonical: `${BASE_URL}${canonicalPath}` };
  }

  // 3. No match — return null (index.html defaults will be used)
  return null;
}

/**
 * Inject resolved meta tags into the HTML template string.
 *
 * Strategy: index.html uses unique placeholder strings (__PAGE_TITLE__, __PAGE_DESCRIPTION__,
 * __PAGE_CANONICAL__) instead of real values. The server replaces these placeholders with
 * per-page values using simple string replacement — completely immune to Vite build
 * transformations that may change tag formats (e.g., /> vs >).
 *
 * Fallback: If placeholders are not found (e.g., old built index.html), falls back to
 * regex-based replacement that handles both /> and > tag endings.
 */
export function injectMetaTags(html: string, meta: MetaInfo): string {
  const title = escapeHtml(meta.title);
  const desc = escapeHtml(meta.description);
  const canonicalUrl = meta.canonical ? escapeHtml(meta.canonical) : "https://dentasmart.ai/";

  // ── Primary: placeholder-based replacement (format-agnostic) ──────────────
  // These placeholders are set in client/index.html and survive Vite builds unchanged.
  if (html.includes("__PAGE_TITLE__")) {
    html = html.split("__PAGE_TITLE__").join(title);
    html = html.split("__PAGE_DESCRIPTION__").join(desc);
    html = html.split("__PAGE_CANONICAL__").join(canonicalUrl);
    return html;
  }

  // ── Fallback: regex-based replacement (handles old built index.html) ──────
  // Handles both self-closing (/>) and non-self-closing (>) tag variants.

  // Replace <title>...</title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${title}</title>`
  );

  // Replace <meta name="description" content="...">
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${desc}" />`
  );

  // Replace OG title
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${title}" />`
  );

  // Replace OG description
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${desc}" />`
  );

  // Replace OG URL and canonical link
  if (meta.canonical) {
    html = html.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );
  }

  // Replace Twitter title
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${title}" />`
  );

  // Replace Twitter description
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${desc}" />`
  );
  return html;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
