import CostPageTemplate, { CostPageData } from "./CostPageTemplate";

const data: CostPageData = {
  slug: "tooth-extraction-cost",
  procedureName: "Tooth Extraction",
  heroTitle: "What Does a",
  heroHighlight: "Tooth Extraction",
  heroDescription: "An extraction estimate can change based on the tooth, procedure, imaging, anesthesia, and provider. Review the charges and questions to ask before treatment.",
  metaTitle: "Tooth Extraction Cost | DentaSmart",
  metaDescription: "Review the parts of a tooth-extraction estimate, factors that affect the total, insurance questions, and common follow-up costs.",
  keywords: "tooth extraction cost, how much is a tooth extraction, tooth removal cost, simple extraction cost, surgical extraction cost",
  statsStrip: [
    { value: "$50-$200", label: "Simple Extraction" },
    { value: "$200-$500", label: "Surgical Extraction" },
    { value: "1-2 Weeks", label: "Typical Recovery" },
  ],
  problemTitle: "An Extraction Can Affect",
  problemHighlight: "Later Treatment Costs",
  problemDescription: "After some teeth are removed, nearby teeth can shift and chewing may change. Replacement options such as a bridge, implant, or denture add separate procedures and costs.",
  problemDescription2: "Ask whether the tooth can be treated, why extraction is recommended, and whether you may need a replacement afterward.",
  costBreakdown: [
    { type: "Simple Extraction (erupted tooth)", range: "$50 - $200", average: "$125", notes: "For a tooth that is visible and easily accessible above the gumline." },
    { type: "Surgical Extraction (impacted tooth)", range: "$200 - $500", average: "$350", notes: "For a tooth that is partially or fully trapped beneath the gumline." },
    { type: "Wisdom Tooth Extraction (impacted)", range: "$225 - $600", average: "$400", notes: "Often more complex, especially for lower wisdom teeth near the nerve." },
    { type: "Anesthesia (Local)", range: "$20 - $90", average: "$50", notes: "Often included in the extraction fee, but sometimes itemized separately." },
    { type: "X-Rays (Panoramic)", range: "$75 - $150", average: "$110", notes: "May be used to assess the root, jawbone, and nearby structures." },
  ],
  costFactors: [
    { factor: "Type of Extraction", impact: "A simple extraction for a front tooth might be around $125, whereas a surgical extraction for an impacted molar could cost $350 or more.", tip: "Your dentist will determine the type of extraction needed based on the tooth's condition and position." },
    { factor: "Anesthesia Used", impact: "The type of anesthesia or sedation can change the total cost and may be billed separately.", tip: "Ask which option is recommended, why, and whether it is included in the estimate." },
    { factor: "Location of Tooth", impact: "Front teeth are generally easier and less expensive to remove than molars. A molar extraction can cost $150-$300, while a front tooth might be $75-$150.", tip: "Molars have larger, multiple roots, making them more complex to extract." },
    { factor: "Provider Type", impact: "A general dentist and an oral surgeon may charge differently for the same procedure.", tip: "Ask who will perform the extraction and whether specialist care is recommended for your case." },
  ],
  insuranceTips: [
    { title: "Check Your Coverage", description: "Extraction coverage varies by plan, procedure type, deductible, annual maximum, waiting period, and network status." },
    { title: "In-Network vs. Out-of-Network", description: "Ask your insurer how network status changes the allowed fee and your expected share." },
    { title: "Waiting Periods", description: "Some insurance plans have a waiting period for major procedures. Confirm with your provider if your extraction is covered immediately." },
    { title: "Check FSA or HSA Eligibility", description: "If you have an FSA or HSA, confirm whether your extraction is an eligible expense under your plan." },
  ],
  savingsWithDentaSmart: [
    { title: "Understand the Estimate", description: "Use DentaSmart cost guides to review common extraction charges and prepare questions for the dental office." },
    { title: "Compare Treatment Documents", description: "Keep supported treatment documents together when you are comparing recommendations or requesting a second opinion." },
    { title: "Prepare Cost Questions", description: "Write down questions about imaging, anesthesia, follow-up care, replacement options, and payment terms." },
  ],
  faqs: [
    { q: "How long does a tooth extraction take?", a: "A simple extraction can be as quick as 20-40 minutes. A surgical extraction may take closer to an hour, depending on the complexity." },
    { q: "Is a tooth extraction painful?", a: "The area is usually numbed before an extraction. Soreness can occur afterward, and your dental team can explain how to manage it safely." },
    { q: "What is recovery like after a tooth extraction?", a: "Initial recovery often takes several days, but timing varies. Follow your dentist's aftercare instructions to lower the risk of problems such as dry socket." },
    { q: "Do I need to replace the extracted tooth?", a: "It depends on the tooth. If a molar is extracted, it is often recommended to replace it with a dental implant or bridge to prevent other teeth from shifting." },
    { q: "Can I go to work after a tooth extraction?", a: "Time away from work depends on the extraction, anesthesia, discomfort, and your job. Ask your dental team what they recommend for you." },
  ],
  relatedCostPages: [
    { name: "Wisdom Teeth Removal Cost", slug: "wisdom-teeth-removal-cost", price: "$225 - $600" },
    { name: "Root Canal Cost", slug: "root-canal-cost", price: "$700 - $2,000" },
    { name: "Dental Implant Cost", slug: "dental-implant-cost", price: "$3,000 - $6,000" },
    { name: "Dental Cleaning Cost", slug: "dental-cleaning-cost", price: "$75 - $200" },
  ],
  relatedTreatmentPage: { name: "Tooth Extraction Procedure", slug: "tooth-extraction-procedure" },
};

export default function ToothExtractionCostPage() {
  return <CostPageTemplate data={data} />;
}
