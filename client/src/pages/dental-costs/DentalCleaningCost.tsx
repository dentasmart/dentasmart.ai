import CostPageTemplate, { CostPageData } from "./CostPageTemplate";

const data: CostPageData = {
  slug: "dental-cleaning-cost",
  procedureName: "Dental Cleaning",
  heroTitle: "How Much Does a",
  heroHighlight: "Dental Cleaning Cost?",
  heroDescription: "A professional dental cleaning is one of the most common and important procedures for maintaining good oral health. But how much should you expect to pay? We break down the costs so you can smile brighter.",
  metaTitle: "Dental Cleaning Cost | DentaSmart",
  metaDescription: "How much does a dental cleaning cost in 2025-2026? See a full breakdown of prices for routine cleanings, deep cleanings, and what factors impact your final bill.",
  keywords: "dental cleaning cost, teeth cleaning cost, how much is a dental cleaning, deep cleaning cost",
  statsStrip: [
    { value: "$75-$200", label: "Typical Range for a Routine Cleaning" },
    { value: "2x", label: "Recommended Cleanings Per Year" },
    { value: "91%", label: "of Adults Have Had Cavities" },
  ],
  problemTitle: "Plaque Happens.",
  problemHighlight: "Ignoring it is the expensive part.",
  problemDescription: "Every day, a sticky film of bacteria called plaque builds up on your teeth. If it is not removed, it hardens into tartar, which you can not get rid of on your own. This can lead to cavities, gum disease, and even tooth loss. Regular cleanings are not just about a polished smile; they are a critical investment in your long-term health.",
  problemDescription2: "Postponing a simple cleaning can allow minor issues to become major procedures. A small cavity can turn into a root canal. Mild gum inflammation can progress to serious periodontal disease. The cost of prevention is always lower than the cost of treatment.",
  costBreakdown: [
    { type: "Adult Routine Cleaning", range: "$75 - $200", average: "$125", notes: "Includes scaling, polishing, and a basic exam. Most common type of cleaning." },
    { type: "Child Routine Cleaning", range: "$65 - $150", average: "$100", notes: "Similar to an adult cleaning but for patients under 14." },
    { type: "Deep Cleaning (Scaling & Root Planing)", range: "$200 - $450", average: "$300", notes: "Per quadrant. Necessary for treating gum disease. You may need 1-4 quadrants treated." },
    { type: "Full Mouth Debridement", range: "$150 - $300", average: "$225", notes: "A more intensive cleaning for patients with severe tartar buildup that prevents a proper exam." },
    { type: "Fluoride Treatment", range: "$20 - $50", average: "$35", notes: "Often an optional add-on to help strengthen tooth enamel and prevent cavities." }
  ],
  costFactors: [
    { factor: "Type of Cleaning", impact: "A routine adult cleaning averages around $125, while a deep cleaning for gum disease can cost $200-$450 per quadrant.", tip: "Ask your dentist which type of cleaning is right for you based on your current oral health." },
    { factor: "Geographic Location", impact: "Costs in major metropolitan areas like New York or San Francisco can be 20-30% higher than in smaller towns or rural areas.", tip: "Use the DentaSmart app to compare prices from dentists in your specific zip code." },
    { factor: "Dentist's Experience", impact: "A highly experienced dentist or a specialist like a periodontist may charge more for their services.", tip: "Check reviews and credentials, but remember that a standard cleaning is a routine procedure for any general dentist." },
    { factor: "Dental Insurance", impact: "Most dental insurance plans cover preventive care like cleanings at 80-100%. Without insurance, you will pay the full cost out-of-pocket.", tip: "Always confirm your coverage with your insurance provider before your appointment to avoid surprises." }
  ],
  insuranceTips: [
    { title: "Understand Your Plan", description: "Most dental insurance plans consider cleanings as preventive care, which is often covered at a high percentage, sometimes even 100%. However, know your plan's specifics, like frequency limitations (e.g., two cleanings per year)." },
    { title: "Check for In-Network Dentists", description: "You will almost always pay less by visiting a dentist who is in-network with your insurance provider. DentaSmart makes it easy to find in-network options near you." },
    { title: "Deep Cleaning Coverage", description: "Deep cleanings (scaling and root planing) are considered a basic or major procedure, not preventive. This means your insurance may cover it at a lower percentage, like 50-80%, and it will likely count towards your annual maximum." },
    { title: "Ask for a Pre-Treatment Estimate", description: "For anything beyond a routine cleaning, ask your dental office to submit a pre-treatment estimate to your insurance. This document will outline exactly what your plan will pay and what your out-of-pocket cost will be." }
  ],
  savingsWithDentaSmart: [
    { title: "Price Transparency", description: "Use the DentaSmart app to see what dentists in your area charge for cleanings before you book. No more guessing games." },
    { title: "Book In-Network", description: "Filter for dentists that accept your specific insurance plan to maximize your benefits and minimize your out-of-pocket costs." },
    { title: "Flexible Payment Options", description: "Many DentaSmart providers offer payment plans or financing options to help you manage the cost of care, especially for more expensive procedures." }
  ],
  faqs: [
    { q: "How often should I get a dental cleaning?", a: "For most people, the American Dental Association recommends a professional cleaning every six months. Your dentist may suggest a different schedule based on your individual oral health needs." },
    { q: "Does a dental cleaning hurt?", a: "A routine cleaning should be a comfortable, painless experience. You might feel some scraping or pressure, but it should not be painful. If you have sensitive teeth or gum inflammation, you might experience some discomfort." },
    { q: "What is the difference between a regular cleaning and a deep cleaning?", a: "A regular cleaning removes plaque and tartar from above the gumline. A deep cleaning, or scaling and root planing, is a treatment for gum disease that cleans below the gumline to remove buildup from the roots of your teeth." },
    { q: "Can I just brush and floss really well instead of getting a cleaning?", a: "Brushing and flossing are essential, but they can not remove hardened tartar. Only a professional cleaning with special tools can remove tartar and clean hard-to-reach areas, preventing more serious problems." },
    { q: "How long does a dental cleaning take?", a: "A routine dental cleaning appointment usually lasts between 30 minutes to an hour. It includes the cleaning itself, polishing, and a brief examination by the dentist." }
  ],
  relatedCostPages: [
    { name: "Teeth Whitening", slug: "teeth-whitening-cost", price: "$300 - $800" },
    { name: "Root Canal", slug: "root-canal-cost", price: "$700 - $2,000" },
    { name: "Dental Crown", slug: "dental-crown-cost", price: "$800 - $2,500" },
    { name: "Tooth Extraction", slug: "tooth-extraction-cost", price: "$150 - $600" }
  ]
};

export default function DentalCleaningCostPage() {
  return <CostPageTemplate data={data} />;
}
