import CostPageTemplate, { CostPageData } from "./CostPageTemplate";

const data: CostPageData = {
  slug: "teeth-whitening-cost",
  procedureName: "Teeth Whitening",
  heroTitle: "What Does",
  heroHighlight: "Teeth Whitening Cost?",
  heroDescription: "Whitening costs vary by product, provider, stain type, and number of treatments. Compare in-office care, dentist-provided trays, and store-bought products.",
  metaTitle: "Teeth Whitening Cost | DentaSmart",
  metaDescription: "Compare common teeth-whitening options, the factors that affect cost, and questions to ask before professional or at-home treatment.",
  keywords: "teeth whitening cost, professional teeth whitening cost, zoom whitening cost, how much is teeth whitening, dental whitening price",
  statsStrip: [
    { value: "In Office", label: "Professional Option" },
    { value: "At Home", label: "Dentist or Store Products" },
    { value: "Varies", label: "By Stain and Treatment" },
  ],
  problemTitle: "Whitening Results Depend on",
  problemHighlight: "The Type of Discoloration",
  problemDescription: "Coffee, tea, tobacco, and some foods can stain the outside of teeth. Medication, injury, age, and dental materials can cause discoloration that responds differently to whitening.",
  problemDescription2: "A dentist can check whether whitening is appropriate and explain how existing crowns, veneers, fillings, cavities, or sensitivity may affect the plan.",
  costBreakdown: [
    {
      type: "Professional In-Office Whitening",
      range: "$400 - $1,200",
      average: "$650",
      notes: "Fastest results, often in a single one-hour visit. Includes treatments like Zoom or laser whitening.",
    },
    {
      type: "Custom Take-Home Trays",
      range: "$250 - $600",
      average: "$400",
      notes: "Custom-fitted trays from your dentist for even, professional-grade results at home over a few weeks.",
    },
    {
      type: "Over-the-Counter Whitening Strips",
      range: "$20 - $100",
      average: "$50",
      notes: "Affordable and accessible, but results are less dramatic and may be uneven. Good for minor touch-ups.",
    },
    {
      type: "Whitening Toothpaste",
      range: "$5 - $20",
      average: "$10",
      notes: "Mainly removes surface stains and helps maintain brightness. Not a deep whitening solution.",
    },
  ],
  costFactors: [
    {
      factor: "Type of Whitening",
      impact: "In-office laser treatments can cost over $1,000, while over-the-counter strips are often under $50.",
      tip: "Compare the active ingredients, treatment time, expected result, and sensitivity risk before choosing an option.",
    },
    {
      factor: "Dentist's Location & Experience",
      impact: "Professional fees vary by region, practice, and the treatment used.",
      tip: "Check prices from a few well-regarded dentists in your area. Some may offer promotions for new patients.",
    },
    {
      factor: "Severity of Stains",
      impact: "Surface and internal stains respond differently, and some discoloration may need a different cosmetic approach.",
      tip: "Have a consultation first. Your dentist can tell you what kind of results to expect and how many treatments you might need.",
    },
    {
      factor: "Additional Procedures",
      impact: "A dentist may recommend an exam, cleaning, or treatment for decay or gum problems before whitening.",
      tip: "Ask for a written breakdown that includes any recommended care before whitening.",
    },
  ],
  insuranceTips: [
    {
      title: "Usually Considered Cosmetic",
      description: "Dental plans often treat whitening as elective cosmetic care, but coverage rules vary. Confirm with your insurer before treatment.",
    },
    {
      title: "Check Your Plan Details",
      description: "Some higher-tier plans might offer partial coverage or a discount. It is always worth calling your provider to confirm the specifics of your policy.",
    },
    {
      title: "Use FSA or HSA Funds",
      description: "If you have an FSA or HSA, confirm whether whitening is an eligible expense under your plan before using those funds.",
    },
    {
      title: "Ask About Payment Plans",
      description: "Some dental offices offer financing or work with third-party lenders. Review the total cost, fees, interest, and repayment terms.",
    },
  ],
  savingsWithDentaSmart: [
    {
      title: "Understand the Options",
      description: "Use DentaSmart cost guides to compare common whitening approaches and prepare questions for a dental office.",
    },
    {
      title: "Organize Questions",
      description: "Keep questions about stain type, sensitivity, existing dental work, expected results, and total cost together before a visit.",
    },
    {
      title: "Review Supported Images",
      description: "Use supported mouth photos for educational context, not as a substitute for a dental exam or whitening recommendation.",
    },
  ],
  faqs: [
    {
      q: "How long does teeth whitening last?",
      a: "Results can last from six months to three years. Your diet and habits like smoking play a big role. Avoiding stain-causing foods and drinks will help your results last longer.",
    },
    {
      q: "Is teeth whitening safe?",
      a: "Whitening can cause tooth sensitivity or gum irritation. A dentist can check for decay, exposed roots, gum problems, and dental restorations before recommending an option.",
    },
    {
      q: "Does teeth whitening work on crowns or veneers?",
      a: "No, whitening treatments only work on natural tooth enamel. They will not change the color of crowns, veneers, or fillings. It is important to consider this when planning your treatment.",
    },
    {
      q: "How white will my teeth get?",
      a: "The result depends on your starting tooth color, the cause of discoloration, existing dental work, and the treatment used. Ask a dentist what change is realistic for your teeth.",
    },
    {
      q: "Can I whiten my teeth if I have sensitive teeth?",
      a: "Talk to a dentist first. They can look for the cause of sensitivity and discuss whether a lower-strength product, desensitizing approach, or different treatment is appropriate.",
    },
  ],
  relatedCostPages: [
    { name: "Veneers", slug: "veneers-cost", price: "$1,000 - $2,500" },
    { name: "Braces", slug: "braces-cost", price: "$3,000 - $7,000" },
    { name: "Dental Cleaning", slug: "dental-cleaning-cost", price: "$75 - $200" },
    { name: "Dental Crown", slug: "dental-crown-cost", price: "$800 - $2,000" },
  ],
  relatedTreatmentPage: { name: "Teeth Whitening Procedure", slug: "teeth-whitening-procedure" },
};

export default function TeethWhiteningCostPage() {
  return <CostPageTemplate data={data} />;
}
