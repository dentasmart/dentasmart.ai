import CostPageTemplate, { CostPageData } from "./CostPageTemplate";

const data: CostPageData = {
  slug: "tooth-extraction-cost",
  procedureName: "Tooth Extraction",
  heroTitle: "The Real Cost of a",
  heroHighlight: "Tooth Extraction",
  heroDescription: "A tooth extraction might sound a little intimidating, but it is a very routine dental procedure. Knowing the costs involved can make the whole process feel much more manageable. We will break down what you can expect to pay, the factors that influence the price, and how you can save.",
  metaTitle: "Tooth Extraction Cost in 2025 | DentaSmart",
  metaDescription: "How much does a tooth extraction cost? Prices range from $50 to $500. Learn about the factors that affect the final price and ways to save on your procedure.",
  keywords: "tooth extraction cost, how much is a tooth extraction, tooth removal cost, simple extraction cost, surgical extraction cost",
  statsStrip: [
    { value: "$50-$200", label: "Simple Extraction" },
    { value: "$200-$500", label: "Surgical Extraction" },
    { value: "1-2 Weeks", label: "Typical Recovery" },
  ],
  problemTitle: "More Than Just a",
  problemHighlight: "Missing Tooth",
  problemDescription: "Losing a tooth is not just about the gap in your smile. It can lead to other dental problems down the road. Nearby teeth can shift, causing issues with your bite and making it harder to chew. This can even affect your confidence in social situations.",
  problemDescription2: "That is why it is important to deal with a problematic tooth sooner rather than later. An extraction can be the first step towards a healthier mouth, preventing future complications and preparing for a replacement like an implant or bridge.",
  costBreakdown: [
    { type: "Simple Extraction (erupted tooth)", range: "$50 - $200", average: "$125", notes: "For a tooth that is visible and easily accessible above the gumline." },
    { type: "Surgical Extraction (impacted tooth)", range: "$200 - $500", average: "$350", notes: "For a tooth that is partially or fully trapped beneath the gumline." },
    { type: "Wisdom Tooth Extraction (impacted)", range: "$225 - $600", average: "$400", notes: "Often more complex, especially for lower wisdom teeth near the nerve." },
    { type: "Anesthesia (Local)", range: "$20 - $90", average: "$50", notes: "Often included in the extraction fee, but sometimes itemized separately." },
    { type: "X-Rays (Panoramic)", range: "$75 - $150", average: "$110", notes: "Required to see the tooth root, jawbone, and surrounding structures." },
  ],
  costFactors: [
    { factor: "Type of Extraction", impact: "A simple extraction for a front tooth might be around $125, whereas a surgical extraction for an impacted molar could cost $350 or more.", tip: "Your dentist will determine the type of extraction needed based on the tooth's condition and position." },
    { factor: "Anesthesia Used", impact: "Local anesthetic is the most affordable and is often included. IV sedation, if needed for anxiety, can add $250 to $450 to the total cost.", tip: "Discuss your anxiety levels with your dentist. For many, local anesthetic is perfectly sufficient." },
    { factor: "Location of Tooth", impact: "Front teeth are generally easier and less expensive to remove than molars. A molar extraction can cost $150-$300, while a front tooth might be $75-$150.", tip: "Molars have larger, multiple roots, making them more complex to extract." },
    { factor: "Dentist's Experience", impact: "A general dentist may charge $200 for a surgical extraction, while an oral surgeon with specialized training might charge $400 for the same procedure.", tip: "For complex cases like deeply impacted wisdom teeth, seeing an oral surgeon is often the best choice." },
  ],
  insuranceTips: [
    { title: "Check Your Coverage", description: "Most dental insurance plans cover a significant portion of tooth extractions, often up to 80% for a basic extraction after your deductible is met." },
    { title: "In-Network vs. Out-of-Network", description: "You will almost always pay less by visiting a dentist who is in your insurance network. Check your provider's directory before booking." },
    { title: "Waiting Periods", description: "Some insurance plans have a waiting period for major procedures. Confirm with your provider if your extraction is covered immediately." },
    { title: "Use Your FSA or HSA", description: "You can use funds from your Flexible Spending Account (FSA) or Health Savings Account (HSA) to pay for your extraction tax-free." },
  ],
  savingsWithDentaSmart: [
    { title: "Find Affordable Dentists", description: "Use the DentaSmart app to search for in-network dentists in your area and compare their prices for tooth extractions." },
    { title: "Understand Your Bill", description: "Our cost estimator tool helps you understand the different parts of your dental bill, so you know exactly what you are paying for." },
    { title: "Flexible Payment Options", description: "DentaSmart helps you find providers that offer payment plans, making it easier to manage the cost of your dental care without stress." },
  ],
  faqs: [
    { q: "How long does a tooth extraction take?", a: "A simple extraction can be as quick as 20-40 minutes. A surgical extraction may take closer to an hour, depending on the complexity." },
    { q: "Is a tooth extraction painful?", a: "You will not feel pain during the extraction because the area will be completely numb. You can expect some soreness and discomfort for a few days afterward, which is manageable with pain relievers." },
    { q: "What is recovery like after a tooth extraction?", a: "Recovery usually takes a few days. It is important to follow your dentist's aftercare instructions, like eating soft foods and avoiding smoking, to prevent complications like dry socket." },
    { q: "Do I need to replace the extracted tooth?", a: "It depends on the tooth. If a molar is extracted, it is often recommended to replace it with a dental implant or bridge to prevent other teeth from shifting." },
    { q: "Can I go to work after a tooth extraction?", a: "Most people take the rest of the day off after an extraction. You can typically return to work the next day, but you should avoid strenuous activity for a few days." },
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
