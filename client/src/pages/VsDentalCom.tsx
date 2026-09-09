import ComparisonPageTemplate, { ComparisonPageData } from "./comparisons/ComparisonPageTemplate";

const data: ComparisonPageData = {
  slug: "vs-dental-com",
  optionAName: "DentaSmart",
  optionBName: "Dental.com SmartScan",
  heroTitle: "DentaSmart vs Dental.com:",
  heroHighlight: "How Should You Compare Them?",
  heroDescription: "Use this guide to compare your goal, supported inputs, report detail, price, privacy information, and professional-care boundaries. Verify Dental.com details with the provider before deciding.",
  metaTitle: "DentaSmart vs Dental.com SmartScan | Decision Guide",
  metaDescription: "Compare DentaSmart and Dental.com SmartScan using transparent criteria, verified DentaSmart facts, and clear third-party verification boundaries.",
  keywords: "dentasmart vs dental.com, dental.com smartscan review, best ai teeth scanner, dental.com vs dentasmart comparison",
  statsStrip: [
    { value: "iOS + Android", label: "DentaSmart Availability" },
    { value: "Free", label: "Mouth-Photo Quick Check" },
  ],
  introTitle: "Two AI Scanners,",
  introHighlight: "Very Different Approaches",
  introDescription: "Dental.com SmartScan is a third-party service. Its current inputs, output, referral model, pricing, and privacy terms should be confirmed directly with Dental.com.",
  introDescription2: "DentaSmart is an iOS and Android app with mouth-photo and dental X-ray workflows, an Oral Health Score, and educational reports. It does not diagnose or replace professional dental care.",
  comparisonTable: [
    { factor: "Mouth-photo workflow", optionA: "Available with supported DentaSmart services", optionB: "Verify current provider details", winner: "tie" },
    { factor: "Dental X-ray workflow", optionA: "Supported by DentaSmart", optionB: "Verify current provider details", winner: "tie" },
    { factor: "Oral Health Score", optionA: "Included with applicable DentaSmart services", optionB: "Verify current provider details", winner: "tie" },
    { factor: "Progress tracking", optionA: "Included with Complete Care", optionB: "Verify current provider details", winner: "tie" },
    { factor: "Price", optionA: "Free Quick Check unlimited; Full Quick Check $19.99 per case", optionB: "Verify current provider price", winner: "tie" },
    { factor: "Platform", optionA: "iOS and Android apps", optionB: "Verify current provider access", winner: "tie" },
    { factor: "Professional-care boundary", optionA: "Educational tool; not diagnosis or treatment", optionB: "Review the provider's current terms", winner: "tie" },
  ],
  optionAProsCons: [
    { text: "Supports mouth-photo and dental X-ray workflows", type: "pro" },
    { text: "Oral Health Score and progress history are available with applicable services", type: "pro" },
    { text: "Published consumer prices make the next purchase decision visible", type: "pro" },
    { text: "Guided self-examination walks you through each area of your mouth", type: "pro" },
    { text: "Requires app download (iOS and Android)", type: "con" },
    { text: "Not a diagnostic tool and does not replace a dentist visit", type: "neutral" },
  ],
  optionBProsCons: [
    { text: "Confirm current access requirements on the Dental.com website", type: "neutral" },
    { text: "Confirm current image inputs and report details with the provider", type: "neutral" },
    { text: "Confirm referral options, privacy terms, and total price before use", type: "neutral" },
  ],
  whoShouldChooseA: {
    title: "Choose DentaSmart if you want",
    description: "An app-based workflow for supported photos or X-rays, an Oral Health Score, and educational reports you can discuss with a dentist.",
    bestFor: [
      "People who want to understand their X-rays before a dental visit",
      "Anyone tracking oral health over time (monthly or quarterly scans)",
      "People who want cost context before discussing treatment",
      "People without dental insurance who need clarity on priorities",
    ],
  },
  whoShouldChooseB: {
    title: "Choose Dental.com if you want",
    description: "A third-party service whose current workflow and provider options you have verified directly.",
    bestFor: [
      "People who have confirmed the current access method",
      "People who have reviewed the provider's current follow-up options",
      "People who have compared the current price and privacy terms",
    ],
  },
  bottomLine: "Choose based on the image type you have, the output you need, the full price, privacy information, and how each service directs you to professional care. DentaSmart publishes its current consumer prices and supports mouth-photo and dental X-ray workflows. Verify Dental.com details directly before comparing.",
  faqs: [
    { q: "Is Dental.com SmartScan free?", a: "Verify current access and pricing directly with Dental.com. Third-party offers can change and are not controlled by DentaSmart." },
    { q: "Can DentaSmart use my dental X-rays?", a: "DentaSmart supports dental X-ray workflows with applicable services and presents educational observations to discuss with a dentist. It does not diagnose conditions." },
    { q: "How should I compare the apps?", a: "Compare supported image types, report detail, total price, privacy information, and professional-care boundaries. Do not use either app as a substitute for a dental examination." },
    { q: "Do I still need to see a dentist?", a: "Yes. DentaSmart does not replace a licensed dentist's examination, diagnosis, or treatment. Review Dental.com's current professional-care boundaries directly with the provider." },
    { q: "Does DentaSmart work on Android?", a: "Yes. DentaSmart is available on both iOS (App Store) and Android (Google Play)." },
  ],
  relatedPages: [
    { name: "Free AI Teeth Scanner", href: "/free-ai-teeth-scanner/", tagline: "Learn how AI teeth scanning works" },
    { name: "Best AI Dental Apps", href: "/best-ai-dental-apps/", tagline: "Learn how to compare options" },
    { name: "DentaSmart vs Dentistry.One", href: "/vs/dentistry-one/", tagline: "Compare another provider" },
    { name: "How DentaSmart Works", href: "/how-it-works/", tagline: "See the full scanning process" },
  ],
};

export default function VsDentalCom() {
  return <ComparisonPageTemplate data={data} />;
}
