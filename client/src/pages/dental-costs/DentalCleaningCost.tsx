import CostPageTemplate, { CostPageData } from "./CostPageTemplate";

const data: CostPageData = {
  slug: "dental-cleaning-cost",
  procedureName: "Dental Cleaning",
  heroTitle: "How Much Does a",
  heroHighlight: "Dental Cleaning Cost?",
  heroDescription: "A professional dental cleaning removes plaque and tartar that home care may miss. Review typical fees, cost factors, and questions to ask before your visit.",
  metaTitle: "Dental Cleaning Cost | DentaSmart",
  metaDescription: "Review typical dental cleaning fees, factors that affect the price, and questions to ask your dentist and insurer before treatment.",
  keywords: "dental cleaning cost, teeth cleaning cost, how much is a dental cleaning, deep cleaning cost",
  statsStrip: [
    { value: "Varies", label: "By Provider and Location" },
    { value: "Routine", label: "Preventive Service" },
    { value: "Confirm", label: "Insurance Before the Visit" },
  ],
  problemTitle: "Plaque Happens.",
  problemHighlight: "Ignoring it is the expensive part.",
  problemDescription: "Plaque that remains on teeth can harden into tartar, which requires professional removal. Tartar buildup can contribute to cavities and gum disease.",
  problemDescription2: "Regular exams and cleanings can help a dental team find problems earlier. Earlier care may be less complex and less expensive than treatment after a problem has progressed.",
  costBreakdown: [
    { type: "Adult Routine Cleaning", range: "$75 - $200", average: "$125", notes: "Includes scaling, polishing, and a basic exam. Most common type of cleaning." },
    { type: "Child Routine Cleaning", range: "$65 - $150", average: "$100", notes: "Similar to an adult cleaning but for patients under 14." },
    { type: "Deep Cleaning (Scaling & Root Planing)", range: "$200 - $450", average: "$300", notes: "Per quadrant. Necessary for treating gum disease. You may need 1-4 quadrants treated." },
    { type: "Full Mouth Debridement", range: "$150 - $300", average: "$225", notes: "A more intensive cleaning for patients with severe tartar buildup that prevents a proper exam." },
    { type: "Fluoride Treatment", range: "$20 - $50", average: "$35", notes: "Often an optional add-on to help strengthen tooth enamel and prevent cavities." }
  ],
  costFactors: [
    { factor: "Type of Cleaning", impact: "A routine adult cleaning averages around $125, while a deep cleaning for gum disease can cost $200-$450 per quadrant.", tip: "Ask your dentist which type of cleaning is right for you based on your current oral health." },
    { factor: "Geographic Location", impact: "Fees vary by region, practice, and local operating costs.", tip: "Ask several local dental offices for written estimates if you are comparing prices." },
    { factor: "Dentist's Experience", impact: "A highly experienced dentist or a specialist like a periodontist may charge more for their services.", tip: "Check reviews and credentials, but remember that a standard cleaning is a routine procedure for any general dentist." },
    { factor: "Dental Insurance", impact: "Coverage for preventive care varies by plan, network, frequency limit, deductible, and annual maximum.", tip: "Confirm your benefits with your insurer before the appointment." }
  ],
  insuranceTips: [
    { title: "Understand Your Plan", description: "Check how your plan classifies routine cleanings, how often they are covered, and whether a deductible or annual maximum applies." },
    { title: "Check the Network", description: "Ask your insurer whether the dentist is in network and request the expected in-network and out-of-network costs." },
    { title: "Deep Cleaning Coverage", description: "Plans may classify scaling and root planing differently from a routine cleaning. Ask how your plan covers each procedure and whether it counts toward your annual maximum." },
    { title: "Ask for a Pre-Treatment Estimate", description: "For anything beyond a routine cleaning, ask your dental office to submit a pre-treatment estimate to your insurance. This document will outline exactly what your plan will pay and what your out-of-pocket cost will be." }
  ],
  savingsWithDentaSmart: [
    { title: "Review Cost Terms", description: "Use DentaSmart cost guides to understand common procedure names and the questions to ask about a written estimate." },
    { title: "Prepare for the Visit", description: "Keep notes about your concerns and insurance questions so you can review them with the dental office." },
    { title: "Organize Documents", description: "Keep supported dental reports and treatment documents together when you are comparing recommendations." }
  ],
  faqs: [
    { q: "How often should I get a dental cleaning?", a: "Cleaning schedules vary. Your dentist or hygienist can recommend timing based on your gums, cavity risk, home care, and treatment history." },
    { q: "Does a dental cleaning hurt?", a: "You may feel pressure, scraping, or some discomfort, especially if your teeth are sensitive or your gums are inflamed. Tell the hygienist if you need a pause." },
    { q: "What is the difference between a regular cleaning and a deep cleaning?", a: "A regular cleaning removes plaque and tartar from above the gumline. A deep cleaning, or scaling and root planing, is a treatment for gum disease that cleans below the gumline to remove buildup from the roots of your teeth." },
    { q: "Can I just brush and floss really well instead of getting a cleaning?", a: "Brushing and flossing remove plaque, but they do not remove hardened tartar. A dental professional can remove tartar and check areas that are difficult to see at home." },
    { q: "How long does a dental cleaning take?", a: "A routine dental cleaning appointment usually lasts between 30 minutes to an hour. It includes the cleaning itself, polishing, and a brief examination by the dentist." }
  ],
  relatedCostPages: [
    { name: "Teeth Whitening", slug: "teeth-whitening-cost", price: "$300 - $800" },
    { name: "Root Canal", slug: "root-canal-cost", price: "$700 - $2,000" },
    { name: "Dental Crown", slug: "dental-crown-cost", price: "$800 - $2,500" },
    { name: "Tooth Extraction", slug: "tooth-extraction-cost", price: "$150 - $600" }
  ],
  relatedTreatmentPage: { name: "Dental Cleaning Procedure", slug: "dental-cleaning-procedure" },
};

export default function DentalCleaningCostPage() {
  return <CostPageTemplate data={data} />;
}
