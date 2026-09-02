import CostPageTemplate, { CostPageData } from "./CostPageTemplate";
import { Link } from "wouter";
import { governanceSourceRegistry, type ContentGovernance } from "@shared/contentGovernance";

const data: CostPageData = {
  slug: "root-canal-cost",
  procedureName: "Root Canal",
  heroTitle: "The Real Cost of a",
  heroHighlight: "Root Canal",
  heroDescription: "Root canal costs can vary. This guide helps you understand common factors, prepare questions, and discuss your options with a dental professional.",
  metaTitle: "Root Canal Cost | DentaSmart",
  metaDescription: "Learn why root canal costs vary, which questions to ask about estimates and coverage, and how to prepare for a dental visit.",
  keywords: "root canal cost, root canal price, dental insurance, endodontist cost, tooth infection treatment",
  statsStrip: [
    { value: "Costs vary", label: "By location, provider, and treatment needs" },
    { value: "Ask questions", label: "About your estimate and options" },
    { value: "Plan ahead", label: "Review your coverage with your provider" },
  ],
  problemTitle: "That Throbbing Pain Isn't Just a",
  problemHighlight: "Toothache",
  problemDescription: "When the soft pulp inside your tooth becomes infected, it can cause serious pain. This infection won't go away on its own. Ignoring it can lead to an abscess, bone loss, or even the need to have the tooth pulled entirely.",
  problemDescription2: "A root canal cleans out the infection, removes the damaged pulp, and seals the tooth to protect it. It's a way to save your natural tooth and stop the infection from spreading.",
  problemNote: (
    <>
      Understanding what leads to a root canal can help you avoid one. <Link href="/oral-health-hub/what-causes-rotten-teeth/" className="text-primary underline hover:text-primary/80">Rotten teeth</Link> are often the end result of untreated decay that could have been caught earlier. After a root canal, most teeth need a protective cap. Our guide to <Link href="/oral-health-hub/what-is-a-dental-crown/" className="text-primary underline hover:text-primary/80">what is a dental crown</Link> explains what that involves. If the infection started with a cavity that was ignored, learning about <Link href="/oral-health-hub/is-getting-a-tooth-filling-really-that-big-of-a-deal/" className="text-primary underline hover:text-primary/80">tooth fillings</Link> early on is one of the best ways to prevent needing more extensive treatment.
    </>
  ),
  costBreakdown: [
    { type: "Consultation and X-rays", range: "Varies", average: "Ask for an estimate", notes: "A dentist can explain which evaluation steps apply to your situation." },
    { type: "Front tooth treatment", range: "Varies", average: "Ask for an estimate", notes: "Treatment details can affect the total cost." },
    { type: "Premolar treatment", range: "Varies", average: "Ask for an estimate", notes: "Treatment details can affect the total cost." },
    { type: "Molar treatment", range: "Varies", average: "Ask for an estimate", notes: "Treatment details can affect the total cost." },
    { type: "Restoration after treatment", range: "Varies", average: "Ask for an estimate", notes: "Ask your dentist whether an additional restoration is recommended." },
  ],
  costFactors: [
    { factor: "Tooth Location", impact: "High", tip: "Molars cost more than front teeth because they have more canals and are harder to reach." },
    { factor: "Dentist vs. Endodontist", impact: "Medium", tip: "Endodontists are specialists and may charge more, but are recommended for complex cases." },
    { factor: "Geographic Location", impact: "Medium", tip: "Costs are higher in major metropolitan areas compared to smaller towns." },
    { factor: "Severity of Infection", impact: "Low", tip: "A more complex infection might require more appointments, slightly increasing the cost." },
  ],
  insuranceTips: [
    { title: "Check Your Coverage", description: "Call your plan provider to understand your current benefits, limits, and out-of-pocket responsibility." },
    { title: "Compare Network Details", description: "Ask your plan and dental office how network status may affect the estimate for your situation." },
    { title: "Use Your FSA or HSA", description: "A Flexible Spending Account (FSA) or Health Savings Account (HSA) allows you to pay for your root canal with pre-tax dollars." },
    { title: "Ask About Payment Plans", description: "Many dental offices offer payment plans to help you manage the cost. Don't be afraid to ask about your options." },
  ],
  savingsWithDentaSmart: [
    { title: "Organize Your Questions", description: "Keep treatment-plan and cost questions together before discussing them with a dental office." },
    { title: "Review Cost Context", description: "Use educational context to prepare questions about an estimate, coverage, and treatment options." },
    { title: "Prepare for the Visit", description: "Bring your questions, records, and plan details to a dental professional who can advise you." },
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
  governance: {
    contentId: "cost:root-canal-cost",
    contentVersion: "legacy",
    riskClass: "health",
    claimClasses: ["COST_INFORMATION", "CLINICAL_EDUCATION"],
    directAnswer: {
      question: "How much does a root canal cost?",
      answer: "Root canal costs vary by location, provider, treatment needs, and insurance coverage. Ask a dental office for an estimate for your situation.",
      intendedAudience: "People preparing questions about dental treatment costs",
      sourceRefIds: [
        governanceSourceRegistry["ada-health-policy"].id,
        governanceSourceRegistry["carecredit-dentistry"].id,
        governanceSourceRegistry["fair-health-consumer"].id,
      ],
    },
    sourceRefs: [
      governanceSourceRegistry["ada-health-policy"],
      governanceSourceRegistry["carecredit-dentistry"],
      governanceSourceRegistry["fair-health-consumer"],
    ],
    ctaPolicy: {
      placement: "after_educational_context",
      requiresProfessionalCareBoundary: true,
    },
    exceptions: [{
      code: "legacy_source_mapping",
      reason: "Existing cost references are retained as legacy-existing sources, not as verified clinical approval.",
    }],
  } satisfies ContentGovernance,
};

const RootCanalCostPage = () => {
  return <CostPageTemplate data={data} />;
};

export default RootCanalCostPage;
