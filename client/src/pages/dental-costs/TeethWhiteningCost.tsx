import CostPageTemplate, { CostPageData } from "./CostPageTemplate";

const data: CostPageData = {
  slug: "teeth-whitening-cost",
  procedureName: "Teeth Whitening",
  heroTitle: "The Real Cost of",
  heroHighlight: "a Brighter Smile",
  heroDescription: "Everyone wants a dazzling white smile, but what does it actually cost? From professional treatments to at-home kits, we break down the real prices of teeth whitening. Understanding the options helps you choose the best path to a confident, brighter you.",
  metaTitle: "Teeth Whitening Cost in 2026 | DentaSmart",
  metaDescription: "How much does teeth whitening cost in 2026? Professional whitening runs $300 to $1,000. Compare in-office, at-home kits, and over-the-counter options.",
  keywords: "teeth whitening cost, professional teeth whitening cost, zoom whitening cost, how much is teeth whitening, dental whitening price",
  statsStrip: [
    { value: "$650", label: "Average In-Office Treatment" },
    { value: "8 Shades", label: "Potential Whitening Power" },
    { value: "92%", label: "of people say a great smile is a social asset" },
  ],
  problemTitle: "Stains Happen. Your Smile Doesn't Have to Show It.",
  problemHighlight: "Coffee, tea, and time can dull even the brightest smile.",
  problemDescription: "Daily life takes a toll on our teeth. Things like your morning coffee, red wine, and even healthy foods like berries can leave stains over time. This discoloration can make you feel self-conscious and hesitant to share your smile.",
  problemDescription2: "While surface stains are a natural part of life, you do not have to live with them. Modern whitening treatments can safely and effectively remove years of discoloration, restoring the natural brightness of your teeth and giving you a major confidence boost.",
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
      tip: "Start with a less expensive option like custom trays to see how you like the results before committing to a pricier in-office treatment.",
    },
    {
      factor: "Dentist's Location & Experience",
      impact: "A treatment in a major city like New York could be $1,200, while the same procedure might be $700 in a smaller town.",
      tip: "Check prices from a few well-regarded dentists in your area. Some may offer promotions for new patients.",
    },
    {
      factor: "Severity of Stains",
      impact: "Deep, intrinsic stains from medication may require multiple sessions, potentially costing $1,500 or more, whereas minor coffee stains might be lifted in one $600 session.",
      tip: "Have a consultation first. Your dentist can tell you what kind of results to expect and how many treatments you might need.",
    },
    {
      factor: "Additional Procedures",
      impact: "A preliminary cleaning is often required and adds $100-$200 to the total bill before whitening can even begin.",
      tip: "Ask for a complete cost breakdown that includes any necessary prerequisite treatments so there are no surprises.",
    },
  ],
  insuranceTips: [
    {
      title: "Usually Considered Cosmetic",
      description: "Most dental insurance plans do not cover teeth whitening because it's an elective cosmetic procedure. Always assume you will be paying out-of-pocket.",
    },
    {
      title: "Check Your Plan Details",
      description: "Some higher-tier plans might offer partial coverage or a discount. It is always worth calling your provider to confirm the specifics of your policy.",
    },
    {
      title: "Use FSA or HSA Funds",
      description: "You can often use funds from your Flexible Spending Account (FSA) or Health Savings Account (HSA) to pay for teeth whitening. This allows you to use pre-tax dollars.",
    },
    {
      title: "Ask About Payment Plans",
      description: "Many dental offices offer in-house financing or work with third-party lenders like CareCredit to help you spread the cost over several months.",
    },
  ],
  savingsWithDentaSmart: [
    {
      title: "Find Fair Prices",
      description: "Our AI analyzes local dental prices to show you what a fair cost for teeth whitening is in your area, so you can avoid overpaying.",
    },
    {
      title: "Virtual Consultations",
      description: "Use the DentaSmart app to have a virtual consultation about your whitening goals, saving you the time and cost of an initial in-person visit.",
    },
    {
      title: "Track Your Progress",
      description: "Monitor your whitening journey with our smile tracker. It helps you maintain your results longer, reducing the need for frequent, costly touch-ups.",
    },
  ],
  faqs: [
    {
      q: "How long does teeth whitening last?",
      a: "Results can last from six months to three years. Your diet and habits like smoking play a big role. Avoiding stain-causing foods and drinks will help your results last longer.",
    },
    {
      q: "Is teeth whitening safe?",
      a: "Yes, when done correctly. Professional treatments supervised by a dentist are the safest option. Some people experience temporary tooth sensitivity, but this usually goes away quickly.",
    },
    {
      q: "Does teeth whitening work on crowns or veneers?",
      a: "No, whitening treatments only work on natural tooth enamel. They will not change the color of crowns, veneers, or fillings. It is important to consider this when planning your treatment.",
    },
    {
      q: "How white will my teeth get?",
      a: "This depends on your natural tooth color and the type of treatment. Most professional treatments can lighten teeth by several shades, leading to a noticeably brighter smile.",
    },
    {
      q: "Can I whiten my teeth if I have sensitive teeth?",
      a: "Yes, but you should talk to your dentist first. They can recommend products with lower peroxide levels or desensitizing agents to make the process more comfortable for you.",
    },
  ],
  relatedCostPages: [
    { name: "Veneers", slug: "veneers-cost", price: "$1,000 - $2,500" },
    { name: "Braces", slug: "braces-cost", price: "$3,000 - $7,000" },
    { name: "Dental Cleaning", slug: "dental-cleaning-cost", price: "$75 - $200" },
    { name: "Dental Crown", slug: "dental-crown-cost", price: "$800 - $2,000" },
  ],
};

export default function TeethWhiteningCostPage() {
  return <CostPageTemplate data={data} />;
}
