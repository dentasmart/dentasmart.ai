import CostPageTemplate, { CostPageData } from "./CostPageTemplate";
import { Link } from "wouter";

const data: CostPageData = {
  slug: "root-canal-cost",
  procedureName: "Root Canal",
  heroTitle: "The Real Cost of a",
  heroHighlight: "Root Canal",
  heroDescription: "That throbbing toothache might be more than just a cavity. A root canal can save your natural tooth from extraction when the inner pulp gets infected. It sounds scary, but it's a common procedure to get you out of pain and back to smiling.",
  metaTitle: "Root Canal Cost | DentaSmart",
  metaDescription: "How much does a root canal cost in 2026? Expect to pay $700 to $1,500 per tooth. Learn what affects the price, insurance coverage, and how to save money.",
  keywords: "root canal cost, root canal price, dental insurance, endodontist cost, tooth infection treatment",
  statsStrip: [
    { value: "95%", label: "Success rate of root canal treatments" },
    { value: "15M", label: "Root canals performed in the U.S. annually" },
    { value: "$1,165", label: "Average cost for a root canal procedure" },
  ],
  problemTitle: "That Throbbing Pain Isn't Just a",
  problemHighlight: "Toothache",
  problemDescription: "When the soft pulp inside your tooth becomes infected, it can cause serious pain. This infection won't go away on its own. Ignoring it can lead to an abscess, bone loss, or even the need to have the tooth pulled entirely.",
  problemDescription2: "A root canal cleans out the infection, removes the damaged pulp, and seals the tooth to protect it. It's a way to save your natural tooth and stop the infection from spreading.",
  problemNote: (
    <>
      Understanding what leads to a root canal can help you avoid one. <Link href="/oral-health-hub/what-causes-rotten-teeth/" className="text-primary underline hover:text-primary/80">Rotten teeth</Link> are often the end result of untreated decay that could have been caught earlier. After a root canal, most teeth need a protective cap — our guide to <Link href="/oral-health-hub/what-is-a-dental-crown/" className="text-primary underline hover:text-primary/80">what is a dental crown</Link> explains what that involves. If the infection started with a cavity that was ignored, learning about <Link href="/oral-health-hub/is-getting-a-tooth-filling-really-that-big-of-a-deal/" className="text-primary underline hover:text-primary/80">tooth fillings</Link> early on is one of the best ways to prevent needing more extensive treatment.
    </>
  ),
  costBreakdown: [
    { type: "Initial Consultation & X-Rays", range: "$100 - $350", average: "$225", notes: "To determine if a root canal is necessary." },
    { type: "Front Tooth Root Canal", range: "$700 - $1,200", average: "$950", notes: "Incisors and canines are easier to treat." },
    { type: "Premolar Root Canal", range: "$800 - $1,400", average: "$1,100", notes: "These teeth have more canals than front teeth." },
    { type: "Molar Root Canal", range: "$1,000 - $1,800", average: "$1,400", notes: "Molars are the most complex and costly to treat." },
    { type: "Dental Crown (often required)", range: "$800 - $1,500", average: "$1,150", notes: "A crown protects the tooth after the procedure." },
  ],
  costFactors: [
    { factor: "Tooth Location", impact: "High", tip: "Molars cost more than front teeth because they have more canals and are harder to reach." },
    { factor: "Dentist vs. Endodontist", impact: "Medium", tip: "Endodontists are specialists and may charge more, but are recommended for complex cases." },
    { factor: "Geographic Location", impact: "Medium", tip: "Costs are higher in major metropolitan areas compared to smaller towns." },
    { factor: "Severity of Infection", impact: "Low", tip: "A more complex infection might require more appointments, slightly increasing the cost." },
  ],
  insuranceTips: [
    { title: "Check Your Coverage", description: "Most dental insurance plans cover 50-80% of the cost of a root canal after your deductible. Call your provider to understand your specific benefits." },
    { title: "In-Network vs. Out-of-Network", description: "You'll save a significant amount by visiting a dentist or endodontist who is in your insurance network." },
    { title: "Use Your FSA or HSA", description: "A Flexible Spending Account (FSA) or Health Savings Account (HSA) allows you to pay for your root canal with pre-tax dollars." },
    { title: "Ask About Payment Plans", description: "Many dental offices offer payment plans to help you manage the cost. Don't be afraid to ask about your options." },
  ],
  savingsWithDentaSmart: [
    { title: "Compare Prices Instantly", description: "Use our tools to see what different dentists in your area charge for a root canal, so you can find a great price." },
    { title: "Find In-Network Providers", description: "We make it easy to find a dentist that accepts your insurance, maximizing your savings." },
    { title: "Book Your Appointment Online", description: "Schedule your consultation and treatment with a few clicks, saving you time and hassle." },
  ],
  faqs: [
    { q: "Is a root canal painful?", a: "With modern anesthesia, a root canal is typically no more uncomfortable than getting a filling. You'll likely feel a lot of relief afterward since the source of the pain is removed." },
    { q: "How long does a root canal take?", a: "A root canal procedure usually takes one or two appointments, each lasting about 90 minutes. The exact time depends on the complexity of the tooth." },
    { q: "What happens after a root canal?", a: "Your tooth will be sensitive for a few days. Most people need a dental crown placed on top of the tooth to protect it from breaking in the future." },
    { q: "Can I just have the tooth pulled instead?", a: "You can, but it's usually better to save your natural tooth if possible. Missing teeth can cause other teeth to shift and lead to other dental problems down the road." },
    { q: "How long does a root canal last?", a: "A treated tooth can last a lifetime with proper care. Good oral hygiene and regular dental checkups are key to its longevity." },
  ],
  relatedCostPages: [
    { name: "Dental Implant", slug: "dental-implant-cost", price: "$3,000 - $6,000" },
    { name: "Dental Crown", slug: "dental-crown-cost", price: "$800 - $2,000" },
    { name: "Tooth Extraction", slug: "tooth-extraction-cost", price: "$150 - $500" },
    { name: "Dental Cleaning", slug: "dental-cleaning-cost", price: "$100 - $200" },
  ],
  relatedTreatmentPage: { name: "Root Canal Procedure", slug: "root-canal-procedure" },
};

const RootCanalCostPage = () => {
  return <CostPageTemplate data={data} />;
};

export default RootCanalCostPage;
