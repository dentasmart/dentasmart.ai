import ComparisonPageTemplate, { ComparisonPageData } from "./comparisons/ComparisonPageTemplate";

const data: ComparisonPageData = {
  slug: "vs-dentistry-one",
  optionAName: "DentaSmart",
  optionBName: "Dentistry.One SmileScan",
  heroTitle: "DentaSmart vs Dentistry.One:",
  heroHighlight: "Which AI Scanner Gives You More?",
  heroDescription: "Dentistry.One SmileScan and DentaSmart both use AI to check your teeth. We compared features, accuracy, and pricing to help you decide.",
  metaTitle: "DentaSmart vs Dentistry.One SmileScan (2026) | Full Comparison",
  metaDescription: "Compare DentaSmart and Dentistry.One SmileScan side by side. See which AI dental scanner offers better X-ray analysis, tracking, and value.",
  keywords: "dentasmart vs dentistry.one, smilescan review, dentistry one vs dentasmart, best ai dental app comparison",
  statsStrip: [
    { value: "5.0", label: "DentaSmart App Store Rating" },
    { value: "X-rays + Photos", label: "DentaSmart Scan Types" },
    { value: "Photos Only", label: "SmileScan Scan Types" },
  ],
  introTitle: "Same Category,",
  introHighlight: "Different Depth",
  introDescription: "Dentistry.One SmileScan is a photo-based AI tool that checks your visible teeth and gums for signs of common issues. It gives you a quick report and can connect you with a dentist for a virtual consultation.",
  introDescription2: "DentaSmart goes further by also analyzing dental X-rays, scoring your oral health on a 0-100 scale, tracking changes over time, and giving you a prioritized care plan with estimated costs. It is built for people who want ongoing clarity, not just a one-time check.",
  comparisonTable: [
    { factor: "Photo analysis", optionA: "Yes, guided self-exam with multiple angles", optionB: "Yes, front-facing smile photo", winner: "A" },
    { factor: "X-ray analysis", optionA: "Yes, panoramic and bitewing X-rays", optionB: "No", winner: "A" },
    { factor: "Health score", optionA: "0-100 score with historical trend", optionB: "Risk level (low/medium/high)", winner: "A" },
    { factor: "Care plan", optionA: "Yes, prioritized treatments with cost estimates", optionB: "General recommendations only", winner: "A" },
    { factor: "Progress tracking", optionA: "Yes, timeline of all scans", optionB: "No history between sessions", winner: "A" },
    { factor: "Virtual dentist consultation", optionA: "No (provides report to bring to your dentist)", optionB: "Yes, paid video consultation available", winner: "B" },
    { factor: "Report formats", optionA: "Patient version + dentist version (PDF)", optionB: "Single summary report", winner: "A" },
    { factor: "Free scan", optionA: "Yes, first scan free", optionB: "Yes, basic scan free", winner: "tie" },
    { factor: "Platform", optionA: "iOS (Android early access)", optionB: "Web-based", winner: "B" },
  ],
  optionAProsCons: [
    { text: "X-ray analysis catches hidden problems photos cannot show", type: "pro" },
    { text: "Numerical health score makes progress measurable", type: "pro" },
    { text: "Care plan with cost estimates helps you budget before visiting a dentist", type: "pro" },
    { text: "Dual reports let you share findings with your dentist easily", type: "pro" },
    { text: "iOS only for now (Android waitlist open)", type: "con" },
    { text: "Does not offer live video consultations", type: "con" },
  ],
  optionBProsCons: [
    { text: "Works in any browser without downloading an app", type: "pro" },
    { text: "Offers paid video consultations with licensed dentists", type: "pro" },
    { text: "Quick and simple for a basic visible check", type: "pro" },
    { text: "Cannot analyze X-rays", type: "con" },
    { text: "No health score or progress tracking", type: "con" },
    { text: "Limited detail without paying for a consultation", type: "con" },
  ],
  whoShouldChooseA: {
    title: "Choose DentaSmart if you want",
    description: "Deep analysis of both photos and X-rays, a health score you can track over time, and a care plan with cost estimates to bring to any dentist.",
    bestFor: [
      "People who have X-rays and want to understand what they show",
      "Anyone who wants to track oral health changes month to month",
      "Patients preparing for a dental visit who want cost clarity",
      "People without insurance who need to prioritize treatments by urgency",
    ],
  },
  whoShouldChooseB: {
    title: "Choose Dentistry.One if you want",
    description: "A quick photo check with the option to speak to a dentist on video right away.",
    bestFor: [
      "People who want immediate access to a licensed dentist via video",
      "Anyone who prefers a browser-based tool over a mobile app",
      "Users looking for a fast visual check without detailed analysis",
    ],
  },
  bottomLine: "Dentistry.One SmileScan is a good starting point if you want a quick photo check and the option to talk to a dentist on video. DentaSmart is the better choice if you want thorough analysis (including X-rays), a trackable health score, and a care plan with real cost numbers. For ongoing oral health monitoring, DentaSmart gives you significantly more information to work with.",
  faqs: [
    { q: "Is Dentistry.One SmileScan free?", a: "The basic photo scan is free. A detailed report or video consultation with a dentist requires payment, typically starting around $20-40." },
    { q: "Can DentaSmart replace a dentist visit?", a: "No. DentaSmart is a screening and monitoring tool. It helps you understand your oral health and prepare for dental visits, but it does not diagnose conditions or provide treatment." },
    { q: "Which one is better for X-rays?", a: "DentaSmart is the only option that reads dental X-rays. SmileScan only works with visible photos of your teeth and gums." },
    { q: "How accurate are these AI scanners?", a: "AI dental scanners typically achieve 85-95% sensitivity for common conditions according to published research. Both tools are useful for early detection but should not replace professional examination." },
    { q: "Can I use both?", a: "Yes. Some people use SmileScan for a quick check and DentaSmart for deeper ongoing monitoring. There is no conflict between using both." },
  ],
  relatedPages: [
    { name: "Free AI Teeth Scanner", href: "/free-ai-teeth-scanner", tagline: "How AI teeth scanning works" },
    { name: "Best AI Dental Apps", href: "/best-ai-dental-apps", tagline: "Full roundup of all options" },
    { name: "DentaSmart vs Dental.com", href: "/vs/dental-com", tagline: "Another popular competitor" },
    { name: "How DentaSmart Works", href: "/how-it-works", tagline: "See the scanning process" },
  ],
};

export default function VsDentistryOne() {
  return <ComparisonPageTemplate data={data} />;
}
