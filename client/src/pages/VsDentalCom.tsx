import ComparisonPageTemplate, { ComparisonPageData } from "./comparisons/ComparisonPageTemplate";

const data: ComparisonPageData = {
  slug: "vs-dental-com",
  optionAName: "DentaSmart",
  optionBName: "Dental.com SmartScan",
  heroTitle: "DentaSmart vs Dental.com:",
  heroHighlight: "Which AI Teeth Scanner Is Better?",
  heroDescription: "Both apps let you scan your teeth with your phone camera. We compared them side by side on accuracy, features, and value so you can pick the right one.",
  metaTitle: "DentaSmart vs Dental.com SmartScan (2026) | Honest Comparison",
  metaDescription: "A detailed comparison of DentaSmart and Dental.com SmartScan. See which AI teeth scanner offers better analysis, X-ray support, and value for your money.",
  keywords: "dentasmart vs dental.com, dental.com smartscan review, best ai teeth scanner, dental.com vs dentasmart comparison",
  statsStrip: [
    { value: "5.0", label: "DentaSmart App Store Rating" },
    { value: "$0", label: "First Scan Cost (Both)" },
  ],
  introTitle: "Two AI Scanners,",
  introHighlight: "Very Different Approaches",
  introDescription: "Dental.com SmartScan is a web-based tool that lets you upload a selfie of your teeth and get a quick assessment of visible issues. It focuses on connecting you with a dentist in their network afterward.",
  introDescription2: "DentaSmart is a mobile app that analyzes both photos and dental X-rays, gives you an oral health score out of 100, tracks changes over time, and provides a full care plan with cost estimates. It is designed to help you understand your mouth before you visit a dentist.",
  comparisonTable: [
    { factor: "Photo analysis", optionA: "Yes, mouth photos with guided self-exam", optionB: "Yes, selfie-based scan", winner: "tie" },
    { factor: "X-ray analysis", optionA: "Yes, reads dental X-rays", optionB: "No X-ray support", winner: "A" },
    { factor: "Oral health score", optionA: "Yes, 0-100 score with trend tracking", optionB: "No numerical score", winner: "A" },
    { factor: "Care plan with cost estimates", optionA: "Yes, treatment priorities and costs", optionB: "No cost estimates", winner: "A" },
    { factor: "Progress tracking", optionA: "Yes, historical timeline", optionB: "No history between scans", winner: "A" },
    { factor: "Dual reports (patient + dentist)", optionA: "Yes, shareable PDF", optionB: "Basic summary only", winner: "A" },
    { factor: "Dentist referral network", optionA: "Find-a-dentist directory", optionB: "Yes, integrated booking", winner: "B" },
    { factor: "Free tier", optionA: "First scan free, then $19.99+ per report", optionB: "Free scan, then paid consultation", winner: "tie" },
    { factor: "Platform", optionA: "iOS and Android apps", optionB: "Web-based (any browser)", winner: "B" },
  ],
  optionAProsCons: [
    { text: "Analyzes both photos and X-rays for a complete picture", type: "pro" },
    { text: "Oral health score makes it easy to track improvement", type: "pro" },
    { text: "Detailed care plan with cost estimates before you visit a dentist", type: "pro" },
    { text: "Guided self-examination walks you through each area of your mouth", type: "pro" },
    { text: "Requires app download (iOS and Android)", type: "con" },
    { text: "Not a diagnostic tool and does not replace a dentist visit", type: "neutral" },
  ],
  optionBProsCons: [
    { text: "Works in any browser, no app download needed", type: "pro" },
    { text: "Integrated dentist booking makes follow-up easy", type: "pro" },
    { text: "Quick results for a basic visible-issue check", type: "pro" },
    { text: "No X-ray analysis capability", type: "con" },
    { text: "No progress tracking or health score over time", type: "con" },
    { text: "Limited detail in the free report", type: "con" },
  ],
  whoShouldChooseA: {
    title: "Choose DentaSmart if you want",
    description: "A thorough understanding of your oral health with X-ray analysis, progress tracking, and a care plan you can bring to any dentist.",
    bestFor: [
      "People who want to understand their X-rays before a dental visit",
      "Anyone tracking oral health over time (monthly or quarterly scans)",
      "Patients who want cost estimates before committing to treatment",
      "People without dental insurance who need clarity on priorities",
    ],
  },
  whoShouldChooseB: {
    title: "Choose Dental.com if you want",
    description: "A quick browser-based check with an easy path to booking a dentist in their network.",
    bestFor: [
      "People who want a fast visual check without downloading an app",
      "Anyone looking to book a dentist appointment immediately after scanning",
      "Users who prefer web-based tools over mobile apps",
    ],
  },
  bottomLine: "Dental.com SmartScan is a solid quick-check tool if you just want a fast look and a dentist referral. DentaSmart goes deeper: X-ray analysis, a scored health timeline, and a care plan with cost estimates give you real understanding of what is happening in your mouth. If you want clarity before spending money at the dentist, DentaSmart is the stronger choice.",
  faqs: [
    { q: "Is Dental.com SmartScan free?", a: "The initial scan is free. After that, Dental.com focuses on connecting you with a paid dental consultation through their network." },
    { q: "Can DentaSmart read my dental X-rays?", a: "Yes. You can upload panoramic or bitewing X-rays and DentaSmart will highlight findings like bone loss, hidden decay, root issues, and impacted teeth." },
    { q: "Which app is more accurate?", a: "Both use AI trained on dental images. DentaSmart covers more ground because it analyzes X-rays in addition to photos, which reveals issues invisible to the naked eye." },
    { q: "Do I still need to see a dentist?", a: "Yes. Neither app replaces a licensed dentist. Both are screening tools that help you understand your situation before or between dental visits." },
    { q: "Does DentaSmart work on Android?", a: "Yes. DentaSmart is available on both iOS (App Store) and Android (Google Play)." },
  ],
  relatedPages: [
    { name: "Free AI Teeth Scanner", href: "/free-ai-teeth-scanner", tagline: "Learn how AI teeth scanning works" },
    { name: "Best AI Dental Apps", href: "/best-ai-dental-apps", tagline: "Compare all the top options" },
    { name: "DentaSmart vs Dentistry.One", href: "/vs/dentistry-one", tagline: "Another popular competitor" },
    { name: "How DentaSmart Works", href: "/how-it-works", tagline: "See the full scanning process" },
  ],
};

export default function VsDentalCom() {
  return <ComparisonPageTemplate data={data} />;
}
