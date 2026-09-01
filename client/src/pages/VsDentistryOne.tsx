import ComparisonPageTemplate, { ComparisonPageData } from "./comparisons/ComparisonPageTemplate";

const data: ComparisonPageData = {
  slug: "vs-dentistry-one",
  optionAName: "DentaSmart",
  optionBName: "Dentistry.One SmileScan",
  heroTitle: "DentaSmart vs Dentistry.One:",
  heroHighlight: "How Should You Compare Them?",
  heroDescription: "Compare your goal, supported inputs, report detail, price, privacy information, and professional-care boundaries. Verify Dentistry.One details directly before deciding.",
  metaTitle: "DentaSmart vs Dentistry.One SmileScan | Decision Guide",
  metaDescription: "Compare DentaSmart and Dentistry.One SmileScan using transparent criteria, verified DentaSmart facts, and clear third-party verification boundaries.",
  keywords: "dentasmart vs dentistry.one, smilescan review, dentistry one vs dentasmart, best ai dental app comparison",
  statsStrip: [
    { value: "iOS + Android", label: "DentaSmart Availability" },
    { value: "Photos + X-rays", label: "DentaSmart Workflows" },
    { value: "Verify", label: "Dentistry.One Details" },
  ],
  introTitle: "Same Category,",
  introHighlight: "Different Depth",
  introDescription: "Dentistry.One SmileScan is a third-party service. Its current inputs, output, consultation model, pricing, and privacy terms should be confirmed directly with Dentistry.One.",
  introDescription2: "DentaSmart is an iOS and Android app with mouth-photo and dental X-ray workflows, an Oral Health Score, and educational reports. It does not diagnose or replace professional dental care.",
  comparisonTable: [
    { factor: "Mouth-photo workflow", optionA: "Available with supported DentaSmart services", optionB: "Verify current provider details", winner: "tie" },
    { factor: "Dental X-ray workflow", optionA: "Supported by DentaSmart", optionB: "Verify current provider details", winner: "tie" },
    { factor: "Oral Health Score", optionA: "Included with applicable DentaSmart services", optionB: "Verify current provider details", winner: "tie" },
    { factor: "Progress tracking", optionA: "Included with Complete Care", optionB: "Verify current provider details", winner: "tie" },
    { factor: "Price", optionA: "Quick Check $19.99 one-time; other services listed on Pricing", optionB: "Verify current provider price", winner: "tie" },
    { factor: "Platform", optionA: "iOS and Android apps", optionB: "Verify current provider access", winner: "tie" },
    { factor: "Professional-care boundary", optionA: "Educational tool; not diagnosis or treatment", optionB: "Review the provider's current terms", winner: "tie" },
  ],
  optionAProsCons: [
    { text: "Supports mouth-photo and dental X-ray workflows", type: "pro" },
    { text: "Oral Health Score and progress history are available with applicable services", type: "pro" },
    { text: "Published consumer prices make the next purchase decision visible", type: "pro" },
    { text: "Dual reports let you share findings with your dentist easily", type: "pro" },
    { text: "Requires app download (iOS and Android)", type: "con" },
    { text: "Not a diagnostic tool and does not replace a dentist visit", type: "neutral" },
  ],
  optionBProsCons: [
    { text: "Confirm the current access method on the Dentistry.One website", type: "neutral" },
    { text: "Confirm current image inputs, report detail, and consultation options", type: "neutral" },
    { text: "Confirm privacy terms and total price before use", type: "neutral" },
  ],
  whoShouldChooseA: {
    title: "Choose DentaSmart if you want",
    description: "An app-based workflow for supported photos or X-rays, an Oral Health Score, and educational reports you can discuss with a dentist.",
    bestFor: [
      "People who have X-rays and want to understand what they show",
      "Anyone who wants to track oral health changes month to month",
      "People preparing for a dental visit who want cost context",
      "People without insurance who want to organize treatment questions and cost context",
    ],
  },
  whoShouldChooseB: {
    title: "Choose Dentistry.One if you want",
    description: "A third-party service whose current workflow and consultation options you have verified directly.",
    bestFor: [
      "People who have confirmed the current access method",
      "People who have reviewed the provider's current consultation options",
      "People who have compared the current price and privacy terms",
    ],
  },
  bottomLine: "Choose based on the image type you have, the output you need, the full price, privacy information, and how each service directs you to professional care. DentaSmart publishes its current consumer prices and supports mouth-photo and dental X-ray workflows. Verify Dentistry.One details directly before comparing.",
  faqs: [
    { q: "Is Dentistry.One SmileScan free?", a: "Verify current access and pricing directly with Dentistry.One. Third-party offers can change and are not controlled by DentaSmart." },
    { q: "Can DentaSmart replace a dentist visit?", a: "No. DentaSmart is an educational tool that helps organize supported information and prepare questions. It does not diagnose conditions, recommend treatment, or replace a licensed dentist." },
    { q: "Which one supports my image type?", a: "DentaSmart supports mouth-photo and dental X-ray workflows with applicable services. Verify Dentistry.One's current supported inputs directly with the provider." },
    { q: "How should I compare the tools?", a: "Compare supported inputs, report detail, total price, privacy information, and professional-care boundaries. Neither should replace professional examination." },
    { q: "Can I use both?", a: "Using more than one tool can create overlapping outputs. Compare privacy terms and costs first, and bring unresolved questions to a licensed dentist." },
  ],
  relatedPages: [
    { name: "Free AI Teeth Scanner", href: "/free-ai-teeth-scanner", tagline: "How AI teeth scanning works" },
    { name: "Best AI Dental Apps", href: "/best-ai-dental-apps", tagline: "Learn how to compare options" },
    { name: "DentaSmart vs Dental.com", href: "/vs/dental-com", tagline: "Compare another provider" },
    { name: "How DentaSmart Works", href: "/how-it-works", tagline: "See the scanning process" },
  ],
};

export default function VsDentistryOne() {
  return <ComparisonPageTemplate data={data} />;
}
