/**
 * Server-Side Content Injection for SEO
 *
 * Problem: SPA pages serve only `<div id="root"></div>` in raw HTML.
 * Crawlers that don't execute JS (SEMrush, some Googlebot passes) see empty pages,
 * resulting in "low text-to-HTML ratio" warnings on 279+ pages.
 *
 * Solution: Inject a hidden <noscript>-style content block into the HTML template
 * BEFORE the React root div. This content is real, visible text that crawlers index.
 * When React hydrates, it renders over this content (the SSR block is inside #ssr-content
 * which gets display:none once JS runs).
 *
 * The content includes: H1, intro paragraph, key sections with H2s, internal links,
 * and breadcrumb navigation  -  all the signals crawlers need.
 */

import { listBlogPosts } from "./blogDb";

const SITE_URL = "https://dentasmart.ai";

interface SSRContent {
  html: string;
}

// ─── Content generators by page type ─────────────────────────────────

function generateHomepageContent(): string {
  return `
<article>
  <h1>DentaSmart  -  Your Personal AI Dentist in Your Pocket</h1>
  <p>Upload supported mouth photos or dental X-rays and receive educational insights, an Oral Health Score when included, and plain-language information. DentaSmart helps you organize questions for a dental professional and does not provide a diagnosis.</p>
  <h2>How DentaSmart Works</h2>
  <p>Add supported photos, X-rays, symptoms, or treatment documents. DentaSmart organizes the information, provides an educational report and Oral Health Score when included, and helps you prepare questions for professional care.</p>
  <h2>Why People Choose DentaSmart</h2>
  <ul>
    <li>Educational review of supported dental photos and X-rays</li>
    <li>Personalized Oral Health Score tracking over time</li>
    <li>Plain-language cost context for supported treatment information</li>
    <li>Dr. Din guidance for report language, findings, history, and common dental terms</li>
    <li>Treatment Plan Review for supported dentist treatment plans</li>
    <li>Family profiles for up to 4 members</li>
  </ul>
  <h2>Explore Dental Health Resources</h2>
  <nav>
    <ul>
      <li><a href="/conditions">Dental Conditions Guide</a></li>
      <li><a href="/symptoms">Dental Symptoms Checker</a></li>
      <li><a href="/dental-costs">Dental Cost Guides</a></li>
      <li><a href="/treatments">Treatment Guides</a></li>
      <li><a href="/guides">Oral Health Guides</a></li>
      <li><a href="/comparisons">Treatment Comparisons</a></li>
      <li><a href="/oral-health-hub">Oral Health Hub</a></li>
    </ul>
  </nav>
  <h2>Download DentaSmart</h2>
  <p>Start with unlimited Free Quick Checks using supported mouth photos, supported X-rays, or both. Mouth photos do not require an X-ray. Full Quick Check, Treatment Plan Review, and Complete Care are paid services with prices shown before purchase.</p>
  <p><a href="/download">Download the App</a> | <a href="/pricing">View Pricing</a> | <a href="/how-it-works">How It Works</a></p>
</article>`;
}

function generateConditionContent(slug: string): string {
  const titles: Record<string, string> = {
    "toothache": "Toothache: Causes, Relief & When to See a Dentist",
    "cavities": "Cavities: Signs, Prevention & Treatment Options",
    "gum-disease": "Gum Disease: Stages, Symptoms & Treatment",
    "wisdom-teeth-pain": "Wisdom Teeth Pain: Causes, Symptoms & Removal Guide",
    "teeth-whitening": "Teeth Whitening: Methods, Safety & Results",
    "sensitive-teeth": "Sensitive Teeth: Causes, Remedies & When to See a Dentist",
    "cracked-tooth": "Cracked Tooth: Types, Symptoms & Treatment",
    "dental-abscess": "Dental Abscess: Symptoms, Causes & Emergency Treatment",
    "root-canal": "Root Canal: What to Expect, Cost & Recovery",
    "dental-crown": "Dental Crown: Types, Process & Care",
    "teeth-grinding": "Teeth Grinding (Bruxism): Causes, Damage & Treatment",
    "dental-implants": "Dental Implants: Process, Cost & Recovery",
    "dry-socket": "Dry Socket: Prevention, Symptoms & Treatment After Extraction",
    "oral-thrush": "Oral Thrush: Causes, Symptoms & Treatment",
    "tmj-disorder": "TMJ Disorder: Causes, Symptoms & Relief",
    "periodontitis": "Periodontitis: Advanced Gum Disease Treatment",
    "gingivitis-vs-periodontitis": "Gingivitis vs Periodontitis: Key Differences Explained",
  };
  const title = titles[slug] || `${slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} Guide`;
  const readableSlug = slug.replace(/-/g, ' ');
  return `
<article>
  <nav aria-label="breadcrumb"><a href="/">Home</a> &gt; <a href="/conditions">Conditions</a> &gt; ${title.split(':')[0]}</nav>
  <h1>${title}</h1>
  <p>Learn about ${readableSlug}  -  what causes it, how to recognize the symptoms, available treatment options, and when you should see a dentist. This guide provides clear, easy-to-understand information to help you make informed decisions about your oral health.</p>
  <h2>What Is ${title.split(':')[0]}?</h2>
  <p>Dental conditions can affect people differently. This general guide can help you recognize common topics to discuss with a dentist, but it cannot determine what is causing your symptoms.</p>
  <h2>Common Symptoms</h2>
  <p>Symptoms related to ${readableSlug} can have different causes and levels of urgency. A dentist can assess your situation, and severe or worsening symptoms may need prompt professional care.</p>
  <h2>Treatment Options</h2>
  <p>Treatment for ${readableSlug} varies by the cause and your specific situation. A dentist can evaluate your needs and recommend appropriate care. DentaSmart can help you organize educational information before your appointment.</p>
  <h2>Review Educational Information</h2>
  <p>Use DentaSmart to review supported photos and organize educational observations before discussing concerns with a dentist. DentaSmart does not diagnose conditions.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/conditions">Browse All Conditions</a> | <a href="/symptom-quiz">Take the Symptom Quiz</a></p>
</article>`;
}

function generateSymptomContent(slug: string): string {
  const readableSlug = slug.replace(/-/g, ' ');
  const title = readableSlug.replace(/\b\w/g, c => c.toUpperCase());
  return `
<article>
  <nav aria-label="breadcrumb"><a href="/">Home</a> &gt; <a href="/symptoms">Symptoms</a> &gt; ${title}</nav>
  <h1>${title}: Causes & What to Do</h1>
  <p>Experiencing ${readableSlug}? This guide helps you understand the possible causes, when it is serious, and what steps you should take next. Get clear information so you can make confident decisions about your dental health.</p>
  <h2>What Causes ${title}?</h2>
  <p>There are several possible causes for ${readableSlug}. Some are minor and resolve on their own, while others may need professional attention. Understanding the difference helps you decide when to see a dentist.</p>
  <h2>When to See a Dentist</h2>
  <p>If your ${readableSlug} persists for more than a few days, is severe, or is accompanied by other symptoms like swelling or fever, you should see a dentist promptly.</p>
  <h2>How DentaSmart Can Help</h2>
  <p>Use DentaSmart's educational tools to organize supported information and prepare questions before a dental appointment. A licensed dentist must diagnose the cause of symptoms.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/symptoms">Browse All Symptoms</a> | <a href="/symptom-quiz">Take the Symptom Quiz</a></p>
</article>`;
}

function generateCostContent(slug: string): string {
  const readableSlug = slug.replace(/-cost$/, '').replace(/-/g, ' ');
  const title = readableSlug.replace(/\b\w/g, c => c.toUpperCase());
  return `
<article>
  <nav aria-label="breadcrumb"><a href="/">Home</a> &gt; <a href="/dental-costs">Dental Costs</a> &gt; ${title} Cost</nav>
  <h1>${title} Cost: Average Prices With & Without Insurance</h1>
  <p>How much does a ${readableSlug} cost? This guide breaks down average prices, what affects the cost, insurance coverage options, and ways to save money on your ${readableSlug} treatment.</p>
  <h2>Average Cost Breakdown</h2>
  <p>The cost of a ${readableSlug} varies depending on your location, the complexity of the procedure, the materials used, and whether you have dental insurance. We provide typical price ranges to help you plan.</p>
  <h2>With vs Without Insurance</h2>
  <p>Dental insurance can significantly reduce your out-of-pocket costs for a ${readableSlug}. Learn what typical coverage looks like and what you might pay with and without a plan.</p>
  <h2>Ways to Save</h2>
  <p>There are several strategies to reduce the cost of your ${readableSlug}, including dental schools, payment plans, discount plans, and comparing quotes from multiple providers.</p>
  <h2>Get a Cost Estimate</h2>
  <p>DentaSmart can organize supported treatment information and provide educational cost context. Confirm treatment needs and actual prices with a licensed dental professional.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/dental-costs">Browse All Cost Guides</a> | <a href="/pricing">DentaSmart Pricing</a></p>
</article>`;
}

function generateTreatmentContent(slug: string): string {
  const readableSlug = slug.replace(/-procedure$|-treatment$/g, '').replace(/-/g, ' ');
  const title = readableSlug.replace(/\b\w/g, c => c.toUpperCase());
  return `
<article>
  <nav aria-label="breadcrumb"><a href="/">Home</a> &gt; <a href="/treatments">Treatments</a> &gt; ${title}</nav>
  <h1>${title} Procedure: Step-by-Step Guide & Recovery</h1>
  <p>Learn exactly what happens during a ${readableSlug} procedure, from your first consultation to full recovery. This guide covers what to expect, how long it takes, pain management, and aftercare tips.</p>
  <h2>What to Expect</h2>
  <p>A ${readableSlug} procedure typically involves several steps. Understanding the process beforehand can help reduce anxiety and prepare you for a smooth experience.</p>
  <h2>Recovery & Aftercare</h2>
  <p>Recovery time varies depending on the complexity of your ${readableSlug}. Follow your dentist's aftercare instructions for the best outcome.</p>
  <h2>Cost Information</h2>
  <p>The cost of a ${readableSlug} depends on several factors. DentaSmart can help you understand typical prices and compare options.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/treatments">Browse All Treatments</a> | <a href="/dental-costs">Cost Guides</a></p>
</article>`;
}

function generateComparisonContent(slug: string): string {
  const readableSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return `
<article>
  <nav aria-label="breadcrumb"><a href="/">Home</a> &gt; <a href="/comparisons">Comparisons</a> &gt; ${readableSlug}</nav>
  <h1>${readableSlug}: Complete Comparison Guide</h1>
  <p>Trying to decide between dental treatment options? This side-by-side comparison covers cost, comfort, durability, treatment time, and results to help you make the right choice for your situation.</p>
  <h2>Key Differences</h2>
  <p>Understanding the key differences between these options helps you have a more informed conversation with your dentist and choose the treatment that best fits your needs and budget.</p>
  <h2>Cost Comparison</h2>
  <p>Cost is often a major factor in dental treatment decisions. We compare typical prices for each option with and without insurance coverage.</p>
  <h2>Which Is Right for You?</h2>
  <p>The best choice depends on your dental situation, budget, and preferences. DentaSmart can help you organize educational comparison questions, while a licensed dentist must recommend treatment.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/comparisons">Browse All Comparisons</a> | <a href="/dental-costs">Cost Guides</a></p>
</article>`;
}

function generateGuideContent(slug: string): string {
  const readableSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return `
<article>
  <nav aria-label="breadcrumb"><a href="/">Home</a> &gt; <a href="/guides">Guides</a> &gt; ${readableSlug}</nav>
  <h1>${readableSlug}: Oral Health Guide</h1>
  <p>Read practical information about ${slug.replace(/-/g, ' ')}, including care options, prevention steps, and signs that may need professional attention.</p>
  <h2>Why This Matters</h2>
  <p>Use this guide to understand common concerns, keep notes, and prepare questions for a dentist.</p>
  <h2>Practical Tips</h2>
  <p>Review the recommendations below and choose the steps that fit your routine. A dentist can advise you based on your health history and symptoms.</p>
  <h2>Get Personalized Guidance</h2>
  <p>DentaSmart provides educational reports and tracking tools for supported information. Use them to organize questions and records for professional care.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/guides">Browse All Guides</a> | <a href="/oral-health-hub">Oral Health Hub</a></p>
</article>`;
}

function generateLifeStageContent(slug: string): string {
  const readableSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return `
<article>
  <nav aria-label="breadcrumb"><a href="/">Home</a> &gt; <a href="/life-stages">Life Stages</a> &gt; ${readableSlug}</nav>
  <h1>${readableSlug}: Dental Care Guide</h1>
  <p>Dental care needs change at every stage of life. This guide covers what you need to know about oral health for this life stage, including common concerns, preventive care, and when to see a dentist.</p>
  <h2>Key Dental Concerns</h2>
  <p>Understanding the unique dental challenges at this life stage helps you take proactive steps to maintain a healthy smile.</p>
  <h2>Preventive Care Tips</h2>
  <p>Prevention is always better than treatment. Learn the habits and routines that protect oral health during this important stage.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/life-stages">Browse All Life Stages</a> | <a href="/guides">Oral Health Guides</a></p>
</article>`;
}

function generateEmergencyContent(slug: string): string {
  const readableSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return `
<article>
  <nav aria-label="breadcrumb"><a href="/">Home</a> &gt; <a href="/dental-emergencies">Dental Emergencies</a> &gt; ${readableSlug}</nav>
  <h1>${readableSlug}: Emergency Dental Care Guide</h1>
  <p>A dental emergency requires quick action. This guide tells you exactly what to do, how to manage pain, and when you need to see a dentist immediately.</p>
  <h2>What to Do Right Now</h2>
  <p>If you are experiencing a dental emergency, follow these steps immediately while you arrange to see a dentist.</p>
  <h2>When to Go to the ER</h2>
  <p>Some dental emergencies require emergency room care. Learn the signs that indicate you need immediate medical attention.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/dental-emergencies">All Dental Emergencies</a> | <a href="/find-a-dentist">Find a Dentist</a></p>
</article>`;
}

function generateLifestyleContent(slug: string): string {
  const readableSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return `
<article>
  <nav aria-label="breadcrumb"><a href="/">Home</a> &gt; <a href="/lifestyle">Lifestyle & Oral Health</a> &gt; ${readableSlug}</nav>
  <h1>${readableSlug}: How It Affects Your Oral Health</h1>
  <p>Your lifestyle choices directly impact your dental health. This guide explains the connection between ${slug.replace(/-/g, ' ')} and oral health, with practical tips for protecting your smile.</p>
  <h2>The Connection</h2>
  <p>Understanding how ${slug.replace(/-/g, ' ')} affects your teeth and gums helps you make better choices for your overall health.</p>
  <h2>Practical Tips</h2>
  <p>Small changes in your daily habits can make a big difference for your oral health. Here is what you can do starting today.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/lifestyle">All Lifestyle Guides</a> | <a href="/guides">Oral Health Guides</a></p>
</article>`;
}

function generateStaticPageContent(path: string): string | null {
  const pages: Record<string, string> = {
    "/how-it-works": `
<article>
  <h1>How DentaSmart Works in 4 Simple Steps</h1>
  <p>DentaSmart helps you organize supported dental information, review educational insights, and prepare questions for professional care. It does not diagnose conditions or replace a dentist.</p>
  <h2>Step 1: Add Your Information</h2>
  <p>Add the supported photos, X-rays, symptoms, or treatment documents needed for the service you choose.</p>
  <h2>Step 2: DentaSmart Reviews the Information</h2>
  <p>DentaSmart organizes the submitted information and highlights details that may be worth discussing.</p>
  <h2>Step 3: Review Your Educational Report</h2>
  <p>Review the plain-language insights and report contents included with your selected service.</p>
  <h2>Step 4: Prepare Questions and Monitor Records</h2>
  <p>Use the report to prepare questions for a dentist and keep relevant records organized over time.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/features">See All Features</a> | <a href="/pricing">View Pricing</a></p>
</article>`,
    "/features": `
<article>
  <h1>DentaSmart Features: Oral Health Reports and Tracking</h1>
  <p>DentaSmart provides educational tools for supported mouth photos, dental X-rays, symptoms, and treatment documents. Use the reports to organize questions for a dental professional.</p>
  <h2>Photo and X-Ray Review</h2>
  <p>Upload supported mouth photos or dental X-rays. DentaSmart can highlight visible areas and explain why they may be worth discussing.</p>
  <h2>Oral Health Score</h2>
  <p>Review a 0-100 educational summary and compare it with your earlier DentaSmart records over time.</p>
  <h2>Dr. Din AI Oral Health Guide</h2>
  <p>Ask Dr. Din to explain report language, findings, history, and common dental terms. It does not diagnose conditions or replace professional care.</p>
  <h2>Treatment Plan Review</h2>
  <p>Upload a treatment plan for an educational comparison with cost ranges and questions to discuss with your dentist.</p>
  <h2>Family Profiles</h2>
  <p>Monitor oral health for up to 4 family members under one account. Track everyone's dental health in one place.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/pricing">View Pricing</a> | <a href="/how-it-works">How It Works</a></p>
</article>`,
    "/pricing": `
<article>
  <h1>DentaSmart Pricing: Plans for Every Need</h1>
  <p>Start with unlimited Free Quick Checks using supported mouth photos, supported X-rays, or both. Choose Full Quick Check, Treatment Plan Review, or annual Complete Care only when you need those services.</p>
  <h2>Quick Check  -  Free for mouth photos</h2>
  <p>A free educational analysis of supported mouth photos. No X-ray is required, and it does not provide a diagnosis.</p>
  <h2>Full Quick Check - $19.99 per case</h2>
  <p>A one-time educational analysis of a supported dental X-ray. A licensed dentist must interpret X-rays for diagnosis and treatment decisions.</p>
  <h2>Treatment Plan Review - $29.99 per case</h2>
  <p>A $29.99 educational plain-language review for one supported treatment-plan case, with context and questions to discuss with a licensed dentist.</p>
  <h2>Complete Care  -  $74.99/year (Individual) or $149.99/year (Family)</h2>
  <p>Complete Care is $74.99/year for one person or $149.99/year for up to 4 family members. It includes year-round access to applicable reports, Oral Health Score tracking, guided self-examination, record organization, monitoring tools, and Dr. Din. It does not replace professional diagnosis or treatment.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/features">See All Features</a> | <a href="/how-it-works">How It Works</a></p>
</article>`,
    "/download": `
<article>
  <h1>Download DentaSmart: iOS & Android App</h1>
  <p>Download the DentaSmart app on iOS or Android and start with unlimited Free Quick Checks using supported mouth photos, supported X-rays, or both. Full Quick Check, Treatment Plan Review, and Complete Care are paid services.</p>
  <h2>iOS  -  Available Now</h2>
  <p>Download DentaSmart from the Apple App Store, then review the paid service options before purchase.</p>
  <h2>Android  -  Available Now</h2>
  <p>Download DentaSmart from Google Play, then review the paid service options before purchase.</p>
  <p><a href="/pricing">View Pricing</a> | <a href="/features">See All Features</a> | <a href="/how-it-works">How It Works</a></p>
</article>`,
    "/best-ai-dental-apps": `
<article>
  <h1>Best AI Dental Apps in 2026: How to Compare Without Guessing</h1>
</article>`,
    "/free-ai-teeth-scanner": `
<article>
  <h1>Start with a Free AI Mouth Photo Check No X-Ray Required</h1>
</article>`,
    "/faqs": `
<article>
  <h1>DentaSmart FAQs: Common Questions Answered</h1>
  <p>Find answers to frequently asked questions about DentaSmart, including educational reports, pricing, privacy, professional-care boundaries, and app availability.</p>
  <h2>How does DentaSmart work?</h2>
  <p>Add supported mouth photos or dental X-rays. DentaSmart can provide educational observations, an Oral Health Score when included, and plain-language information to discuss with a dental professional.</p>
  <h2>Is DentaSmart a replacement for a dentist?</h2>
  <p>No. DentaSmart is an educational tool that helps you understand your oral health. Always consult a licensed dentist for diagnosis and treatment.</p>
  <h2>How much does DentaSmart cost?</h2>
  <p>Free Quick Check is unlimited. Full Quick Check is $19.99 per case. Treatment Plan Review is $29.99 per case. Complete Care is $74.99/year for individuals or $149.99/year for families of up to 4 members.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/pricing">View Pricing</a> | <a href="/features">See All Features</a></p>
</article>`,
    "/employers": `
<article>
  <h1>DentaSmart for Employers: Oral Health Education and Decision Support</h1>
  <p>Explore DentaSmart as an educational oral health resource that can help employees organize information and prepare questions for professional care. DentaSmart is not dental insurance.</p>
  <h2>Plan a Responsible Pilot</h2>
  <p>Confirm eligibility, employer pricing, implementation timing, support, privacy responsibilities, professional-care boundaries, and success measures during discovery.</p>
  <h2>What Employees Can Use</h2>
  <p>Depending on the agreed service access, employees can use plain-language reports, treatment-plan comparison tools, Oral Health Score history, and record organization features.</p>
  <p><a href="/team">Meet the Team</a> | <a href="/features">See Product Features</a> | <a href="/pricing">View Consumer Pricing</a></p>
</article>`,
    "/team": `
<article>
  <h1>Meet the DentaSmart Team</h1>
  <p>DentaSmart is built by product, technology, and dental professionals working to make oral health information easier to understand. Leadership, strategic advisory, and content-review roles are identified separately.</p>
  <p><a href="/how-it-works">How DentaSmart Works</a> | <a href="/features">Our Features</a> | <a href="/download">Download the App</a></p>
</article>`,
    "/editorial-policy": `
<article>
  <h1>Editorial Policy</h1>
  <p>DentaSmart publishes plain-language oral health education to help people prepare for conversations with dental professionals. Website content is educational and does not replace diagnosis or treatment by a licensed professional.</p>
  <h2>Sources, review, and updates</h2>
  <p>Where a page includes sources or review information, the display is governed by available page data. AI assistance is not clinical review, and AI-generated blog content is saved as a draft before manual publication.</p>
  <p><a href="/ai-use-disclosure">AI Use Disclosure</a> | <a href="/corrections-policy">Corrections Policy</a> | <a href="/product-facts">Product Facts</a></p>
</article>`,
    "/corrections-policy": `
<article>
  <h1>Corrections Policy</h1>
  <p>To report a suspected content error, contact DentaSmart Support with the page URL and helpful context. Material errors may lead to a content update when appropriate.</p>
  <h2>Review labels and dates</h2>
  <p>Review labels and dates are displayed only when page governance data supports them. DentaSmart does not publish a fixed response or correction timeline.</p>
  <p><a href="mailto:support@dentasmart.ai">Contact DentaSmart Support</a> | <a href="/editorial-policy">Editorial Policy</a></p>
</article>`,
    "/ai-use-disclosure": `
<article>
  <h1>AI Use Disclosure</h1>
  <p>DentaSmart uses AI in parts of its product and may use AI tools to assist with editorial drafting. AI assistance does not itself constitute clinical review.</p>
  <h2>Educational boundary</h2>
  <p>DentaSmart website content is educational and does not replace diagnosis or treatment by a licensed professional. AI-generated blog content is saved as a draft and is not automatically published.</p>
  <p><a href="/editorial-policy">Editorial Policy</a> | <a href="/product-facts">Product Facts</a></p>
</article>`,
    "/product-facts": `
<article>
  <h1>Product Facts</h1>
  <p>DentaSmart Free Quick Check is unlimited and accepts supported mouth photos, supported X-rays, or both. Mouth photos do not require an X-ray. Full Quick Check, Treatment Plan Review, and Complete Care are paid services.</p>
  <h2>Verified pricing</h2>
  <ul><li>Free Quick Check: $0, unlimited checks</li><li>Full Quick Check: $19.99 per case</li><li>Treatment Plan Review: $29.99 per case</li><li>Complete Care: $74.99/year individual or $149.99/year family, up to four family members</li><li>Additional family members: $19.99/year</li></ul>
  <p>DentaSmart provides educational outputs and does not diagnose conditions or replace a licensed dental professional.</p>
  <p><a href="/pricing">View Pricing</a> | <a href="/download">Download DentaSmart</a> | <a href="/features">See Features</a></p>
</article>`,
    "/instant-scan": `
<article>
  <h1>Dental Photo Review: Upload Supported Images</h1>
  <p>Upload supported mouth photos or dental X-rays for educational observations through a selected DentaSmart service. DentaSmart does not diagnose conditions or replace a dental examination.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/pricing">View Service Pricing</a> | <a href="/photo-guide">Photo Guide</a></p>
</article>`,
    "/photo-guide": `
<article>
  <h1>Photo Guide: How to Take the Best Dental Photos</h1>
  <p>Learn how to take clear, well-lit mouth photos for supported DentaSmart services. Follow practical tips for lighting, angles, and what to capture.</p>
  <p><a href="/pricing">View Service Pricing</a> | <a href="/download">Download DentaSmart</a> | <a href="/how-it-works">How It Works</a></p>
</article>`,
    "/oral-health-hub": `
<article>
  <h1>Oral Health Hub: Dental Education & Guides</h1>
  <p>Browse DentaSmart's Oral Health Hub for expert dental guides, symptom explanations, treatment information, cost breakdowns, and preventive care tips. Clear, accessible information to help you understand your oral health.</p>
  <nav>
    <ul>
      <li><a href="/conditions">Dental Conditions</a></li>
      <li><a href="/symptoms">Dental Symptoms</a></li>
      <li><a href="/treatments">Treatment Guides</a></li>
      <li><a href="/dental-costs">Cost Guides</a></li>
      <li><a href="/guides">Oral Health Guides</a></li>
      <li><a href="/comparisons">Treatment Comparisons</a></li>
    </ul>
  </nav>
  <p><a href="/download">Download DentaSmart</a> | <a href="/symptom-quiz">Take the Symptom Quiz</a></p>
</article>`,
    "/oral-health-hub/conditions": `
<article>
  <h1>Something wrong with your teeth? Learn what to watch for.</h1>
</article>`,
    "/oral-health-hub/symptoms": `
<article>
  <h1>What is your mouth trying to tell you?</h1>
</article>`,
    "/privacy-policy": `
<article>
  <h1>Privacy Policy</h1>
</article>`,
    "/terms-of-service": `
<article>
  <h1>Terms and Conditions</h1>
</article>`,
    "/vs/dental-com": `
<article>
  <h1>DentaSmart vs Dental.com: How Should You Compare Them?</h1>
</article>`,
    "/vs/dentistry-one": `
<article>
  <h1>DentaSmart vs Dentistry.One: How Should You Compare Them?</h1>
</article>`,
    "/symptom-quiz": `
<article>
  <h1>Dental Symptom Quiz: Check Your Oral Health</h1>
  <p>Use DentaSmart's free dental symptom quiz to organize what you are experiencing and review general educational guidance. It does not diagnose the cause of discomfort. Seek professional care for severe, worsening, or urgent symptoms.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/symptoms">Browse Symptoms</a> | <a href="/conditions">Dental Conditions</a></p>
</article>`,
    "/find-a-dentist": `
<article>
  <h1>Find a Dentist Near You</h1>
  <p>Find a trusted dentist near you with DentaSmart's dentist finder. Search by location, specialty, and insurance acceptance. Get the care you need from a provider you can trust.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/guides/dental-visit-guide">Dental Visit Guide</a></p>
</article>`,
    "/answers": `
<article>
  <h1>Dental Answers: Educational Dental Q&amp;A</h1>
  <p>Review general educational information about dental symptoms, treatments, costs, and oral health. DentaSmart does not diagnose conditions or replace advice from a dental professional.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/oral-health-hub">Oral Health Hub</a> | <a href="/symptom-quiz">Symptom Quiz</a></p>
</article>`,
    "/stories": `
<article>
  <h1>Ways to Use DentaSmart</h1>
  <p>Explore product-use examples for Free Quick Check, Full Quick Check, Treatment Plan Review, or ongoing Complete Care monitoring. These examples are not customer testimonials. DentaSmart provides educational guidance and does not diagnose conditions or replace a dentist.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/how-it-works">How It Works</a> | <a href="/pricing">View Pricing</a></p>
</article>`,
    "/conditions": `
<article>
  <h1>Dental Conditions Guide: Common Oral Health Issues</h1>
  <p>Learn about common dental conditions including toothaches, cavities, gum disease, wisdom teeth pain, and more. Get clear explanations and know when to see a dentist.</p>
  <nav>
    <ul>
      <li><a href="/conditions/toothache">Toothache</a></li>
      <li><a href="/conditions/cavities">Cavities</a></li>
      <li><a href="/conditions/gum-disease">Gum Disease</a></li>
      <li><a href="/conditions/wisdom-teeth-pain">Wisdom Teeth Pain</a></li>
      <li><a href="/conditions/sensitive-teeth">Sensitive Teeth</a></li>
      <li><a href="/conditions/cracked-tooth">Cracked Tooth</a></li>
      <li><a href="/conditions/dental-abscess">Dental Abscess</a></li>
      <li><a href="/conditions/root-canal">Root Canal</a></li>
      <li><a href="/conditions/dental-crown">Dental Crown</a></li>
      <li><a href="/conditions/teeth-grinding">Teeth Grinding</a></li>
      <li><a href="/conditions/dental-implants">Dental Implants</a></li>
    </ul>
  </nav>
  <p><a href="/download">Download DentaSmart</a> | <a href="/symptoms">Symptoms Checker</a> | <a href="/treatments">Treatment Guides</a></p>
</article>`,
    "/symptoms": `
<article>
  <h1>Dental Symptoms Checker: Identify Your Oral Health Issues</h1>
  <p>Browse common dental symptoms like tooth pain, bleeding gums, jaw pain, and more. Learn what they mean and when to see a dentist.</p>
  <nav>
    <ul>
      <li><a href="/symptoms/tooth-pain-when-biting">Tooth Pain When Biting</a></li>
      <li><a href="/symptoms/bleeding-gums">Bleeding Gums</a></li>
      <li><a href="/symptoms/tooth-sensitivity">Tooth Sensitivity</a></li>
      <li><a href="/symptoms/jaw-pain">Jaw Pain</a></li>
      <li><a href="/symptoms/bad-breath">Bad Breath</a></li>
      <li><a href="/symptoms/swollen-gums">Swollen Gums</a></li>
      <li><a href="/symptoms/loose-tooth">Loose Tooth</a></li>
      <li><a href="/symptoms/dry-mouth">Dry Mouth</a></li>
    </ul>
  </nav>
  <p><a href="/download">Download DentaSmart</a> | <a href="/symptom-quiz">Take the Symptom Quiz</a> | <a href="/conditions">Dental Conditions</a></p>
</article>`,
    "/dental-costs": `
<article>
  <h1>Dental Costs Guide: How Much Do Dental Procedures Cost?</h1>
  <p>Find out how much common dental procedures cost, from cleanings to implants. Compare prices with and without insurance and learn how to save.</p>
  <nav>
    <ul>
      <li><a href="/dental-costs/root-canal-cost">Root Canal Cost</a></li>
      <li><a href="/dental-costs/dental-implant-cost">Dental Implant Cost</a></li>
      <li><a href="/dental-costs/braces-cost">Braces Cost</a></li>
      <li><a href="/dental-costs/veneers-cost">Veneers Cost</a></li>
      <li><a href="/dental-costs/wisdom-teeth-removal-cost">Wisdom Teeth Removal Cost</a></li>
      <li><a href="/dental-costs/dental-crown-cost">Dental Crown Cost</a></li>
      <li><a href="/dental-costs/dental-cleaning-cost">Dental Cleaning Cost</a></li>
    </ul>
  </nav>
  <p><a href="/download">Download DentaSmart</a> | <a href="/treatments">Treatment Guides</a> | <a href="/pricing">DentaSmart Pricing</a></p>
</article>`,
    "/treatments": `
<article>
  <h1>Dental Treatment Guides: What to Expect</h1>
  <p>Learn about common dental treatments including root canals, implants, crowns, and more. Understand what to expect, recovery time, and costs.</p>
  <nav>
    <ul>
      <li><a href="/treatments/root-canal-procedure">Root Canal</a></li>
      <li><a href="/treatments/dental-implant-procedure">Dental Implants</a></li>
      <li><a href="/treatments/dental-crown-procedure">Dental Crowns</a></li>
      <li><a href="/treatments/braces-treatment">Braces</a></li>
      <li><a href="/treatments/teeth-whitening-procedure">Teeth Whitening</a></li>
      <li><a href="/treatments/veneers-procedure">Veneers</a></li>
      <li><a href="/treatments/wisdom-teeth-removal">Wisdom Teeth Removal</a></li>
    </ul>
  </nav>
  <p><a href="/download">Download DentaSmart</a> | <a href="/dental-costs">Cost Guides</a> | <a href="/comparisons">Compare Treatments</a></p>
</article>`,
    "/comparisons": `
<article>
  <h1>Dental Comparisons: Side-by-Side Treatment Guides</h1>
  <p>Compare popular dental treatments side by side. Braces vs Invisalign, implants vs dentures, crowns vs veneers, and more. Make informed decisions about your dental care.</p>
  <nav>
    <ul>
      <li><a href="/comparisons/braces-vs-invisalign">Braces vs Invisalign</a></li>
      <li><a href="/comparisons/dental-implants-vs-dentures">Implants vs Dentures</a></li>
      <li><a href="/comparisons/crown-vs-veneer">Crown vs Veneer</a></li>
      <li><a href="/comparisons/electric-vs-manual-toothbrush">Electric vs Manual Toothbrush</a></li>
    </ul>
  </nav>
  <p><a href="/download">Download DentaSmart</a> | <a href="/treatments">Treatment Guides</a> | <a href="/dental-costs">Cost Guides</a></p>
</article>`,
    "/guides": `
<article>
  <h1>Oral Health Guides: Expert Dental Care Tips</h1>
  <p>Browse DentaSmart's expert oral health guides covering brushing, flossing, dental visits, affordable care, second opinions, and more. Practical advice for better dental health.</p>
  <nav>
    <ul>
      <li><a href="/guides/brushing-guide">Brushing Guide</a></li>
      <li><a href="/guides/flossing-guide">Flossing Guide</a></li>
      <li><a href="/guides/dental-visit-guide">Dental Visit Guide</a></li>
      <li><a href="/guides/affordable-dental-care">Affordable Dental Care</a></li>
      <li><a href="/guides/when-to-get-dental-second-opinion">When to Get a Second Opinion</a></li>
      <li><a href="/guides/preventing-expensive-dental-problems">Preventing Expensive Problems</a></li>
    </ul>
  </nav>
  <p><a href="/download">Download DentaSmart</a> | <a href="/oral-health-hub">Oral Health Hub</a> | <a href="/conditions">Dental Conditions</a></p>
</article>`,
    "/life-stages": `
<article>
  <h1>Dental Care by Life Stage: Baby to Senior Guide</h1>
  <p>Dental care needs change as you age. Browse our life-stage guides for babies, children, teens, pregnant women, and seniors.</p>
  <nav>
    <ul>
      <li><a href="/life-stages/baby-teething-guide">Baby Teething</a></li>
      <li><a href="/life-stages/childrens-dental-health">Children's Dental Health</a></li>
      <li><a href="/life-stages/teen-braces-guide">Teen Braces</a></li>
      <li><a href="/life-stages/pregnancy-dental-care">Pregnancy Dental Care</a></li>
      <li><a href="/life-stages/senior-dental-care">Senior Dental Care</a></li>
    </ul>
  </nav>
  <p><a href="/download">Download DentaSmart</a> | <a href="/guides">Oral Health Guides</a></p>
</article>`,
    "/dental-emergencies": `
<article>
  <h1>Dental Emergencies: What to Do & When to Get Help</h1>
  <p>Know what to do in a dental emergency. Quick guides for knocked-out teeth, broken teeth, severe toothaches, and dental abscesses.</p>
  <nav>
    <ul>
      <li><a href="/dental-emergencies/knocked-out-tooth">Knocked Out Tooth</a></li>
      <li><a href="/dental-emergencies/broken-tooth">Broken Tooth</a></li>
      <li><a href="/dental-emergencies/severe-toothache">Severe Toothache</a></li>
      <li><a href="/dental-emergencies/dental-abscess">Dental Abscess</a></li>
      <li><a href="/dental-emergencies/dental-emergency-guide">Emergency Guide</a></li>
    </ul>
  </nav>
  <p><a href="/find-a-dentist">Find a Dentist</a> | <a href="/download">Download DentaSmart</a></p>
</article>`,
    "/lifestyle": `
<article>
  <h1>Lifestyle & Oral Health: How Habits Affect Your Teeth</h1>
  <p>Learn how lifestyle choices like smoking, diet, diabetes, and sports affect your oral health. Practical tips for protecting your smile.</p>
  <nav>
    <ul>
      <li><a href="/lifestyle/smoking-and-oral-health">Smoking & Oral Health</a></li>
      <li><a href="/lifestyle/diabetes-and-dental-care">Diabetes & Dental Care</a></li>
      <li><a href="/lifestyle/diet-and-teeth">Diet & Your Teeth</a></li>
      <li><a href="/lifestyle/sports-mouthguards">Sports Mouthguards</a></li>
      <li><a href="/lifestyle/oral-piercing-risks">Oral Piercing Risks</a></li>
    </ul>
  </nav>
  <p><a href="/download">Download DentaSmart</a> | <a href="/guides">Oral Health Guides</a></p>
</article>`,
  };
  return pages[path] || null;
}

// ─── Blog post content from DB ───────────────────────────────────────
let blogContentCache: Map<string, string> = new Map();
let blogContentCacheTime = 0;
const BLOG_CONTENT_CACHE_TTL = 60 * 60 * 1000; // 1 hour

async function refreshBlogContentCache(): Promise<void> {
  try {
    const result = await listBlogPosts({ publishedOnly: true, limit: 1000 });
    const newCache = new Map<string, string>();
    for (const post of result.posts) {
      const path = `/oral-health-hub/${post.slug}`;
      const title = post.title || post.slug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
      // Extract first 500 chars of content as plain text for SSR
      let excerpt = "";
      if ((post as any).content) {
        excerpt = (post as any).content
          .replace(/<[^>]+>/g, '') // strip HTML
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 500);
      }
      newCache.set(path, `
<article>
  <nav aria-label="breadcrumb"><a href="/">Home</a> &gt; <a href="/oral-health-hub">Oral Health Hub</a> &gt; ${title}</nav>
  <h1>${title}</h1>
  <p>${excerpt || `Read about ${title} on DentaSmart's Oral Health Hub. Expert dental health information and guidance to help you understand your oral health.`}</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/oral-health-hub">Browse All Articles</a> | <a href="/symptom-quiz">Take the Symptom Quiz</a></p>
</article>`);
    }
    blogContentCache = newCache;
    blogContentCacheTime = Date.now();
  } catch (e) {
    console.error("[SSRContent] Failed to refresh blog content cache:", e);
  }
}

// ─── Main resolver ───────────────────────────────────────────────────
export async function resolveSSRContent(urlPath: string): Promise<SSRContent | null> {
  const cleanPath = urlPath.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";

  // Homepage
  if (cleanPath === "/") {
    return { html: generateHomepageContent() };
  }

  // Static pages
  const staticContent = generateStaticPageContent(cleanPath);
  if (staticContent) {
    return { html: staticContent };
  }

  // Condition pages
  if (cleanPath.startsWith("/conditions/")) {
    const slug = cleanPath.replace("/conditions/", "");
    if (slug) return { html: generateConditionContent(slug) };
  }

  // Symptom pages
  if (cleanPath.startsWith("/symptoms/")) {
    const slug = cleanPath.replace("/symptoms/", "");
    if (slug) return { html: generateSymptomContent(slug) };
  }

  // Cost pages
  if (cleanPath.startsWith("/dental-costs/")) {
    const slug = cleanPath.replace("/dental-costs/", "");
    if (slug) return { html: generateCostContent(slug) };
  }

  // Treatment pages
  if (cleanPath.startsWith("/treatments/")) {
    const slug = cleanPath.replace("/treatments/", "");
    if (slug) return { html: generateTreatmentContent(slug) };
  }

  // Comparison pages
  if (cleanPath.startsWith("/comparisons/")) {
    const slug = cleanPath.replace("/comparisons/", "");
    if (slug) return { html: generateComparisonContent(slug) };
  }
  if (cleanPath.startsWith("/compare/")) {
    const slug = cleanPath.replace("/compare/", "");
    if (slug) return { html: generateComparisonContent(slug) };
  }

  // Guide pages
  if (cleanPath.startsWith("/guides/")) {
    const slug = cleanPath.replace("/guides/", "");
    if (slug) return { html: generateGuideContent(slug) };
  }

  // Life stage pages
  if (cleanPath.startsWith("/life-stages/")) {
    const slug = cleanPath.replace("/life-stages/", "");
    if (slug) return { html: generateLifeStageContent(slug) };
  }

  // Emergency pages
  if (cleanPath.startsWith("/dental-emergencies/")) {
    const slug = cleanPath.replace("/dental-emergencies/", "");
    if (slug) return { html: generateEmergencyContent(slug) };
  }

  // Lifestyle pages
  if (cleanPath.startsWith("/lifestyle/")) {
    const slug = cleanPath.replace("/lifestyle/", "");
    if (slug) return { html: generateLifestyleContent(slug) };
  }

  // Blog posts (from DB)
  if (cleanPath.startsWith("/oral-health-hub/")) {
    const subPath = cleanPath.replace("/oral-health-hub/", "");
    // Skip hub landing pages (already handled as static)
    if (subPath && !["affordability", "second-opinion", "prevention", "conditions", "symptoms"].includes(subPath)) {
      if (Date.now() - blogContentCacheTime > BLOG_CONTENT_CACHE_TTL) {
        await refreshBlogContentCache();
      }
      const blogContent = blogContentCache.get(cleanPath);
      if (blogContent) return { html: blogContent };
      // Fallback for blog posts not in cache yet
      const readableTitle = subPath.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
      return { html: `
<article>
  <nav aria-label="breadcrumb"><a href="/">Home</a> &gt; <a href="/oral-health-hub">Oral Health Hub</a> &gt; ${readableTitle}</nav>
  <h1>${readableTitle}</h1>
  <p>Read about ${readableTitle.toLowerCase()} on DentaSmart's Oral Health Hub. Expert dental health information and guidance to help you understand your oral health and make informed decisions.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/oral-health-hub">Browse All Articles</a> | <a href="/symptom-quiz">Take the Symptom Quiz</a></p>
</article>` };
    }
  }

  // Hub landing pages
  if (cleanPath === "/oral-health-hub/affordability") {
    return { html: `
<article>
  <h1>Affordable Dental Care Hub</h1>
  <p>Explore resources for affordable dental care. Find tips on saving money, insurance alternatives, and low-cost dental options near you.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/dental-costs">Cost Guides</a> | <a href="/guides/affordable-dental-care">Affordable Care Guide</a></p>
</article>` };
  }
  if (cleanPath === "/oral-health-hub/second-opinion") {
    return { html: `
<article>
  <h1>Dental Second Opinion Hub</h1>
  <p>Not sure about your dental diagnosis? Browse our second opinion resources to understand your options and make informed decisions about your treatment.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/guides/when-to-get-dental-second-opinion">Second Opinion Guide</a></p>
</article>` };
  }
  if (cleanPath === "/oral-health-hub/prevention") {
    return { html: `
<article>
  <h1>Dental Prevention Hub</h1>
  <p>Prevention is the best dental care. Browse guides on brushing, flossing, diet, and habits that keep your teeth and gums healthy.</p>
  <p><a href="/download">Download DentaSmart</a> | <a href="/guides">Oral Health Guides</a></p>
</article>` };
  }

  return null;
}
