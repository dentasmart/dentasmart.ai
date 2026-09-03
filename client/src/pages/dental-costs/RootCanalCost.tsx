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
  problemTitle: "Infected Tooth Pulp Can Cause",
  problemHighlight: "Pain and Swelling",
  problemDescription: "Inflamed or infected pulp inside a tooth can cause pain and may lead to an abscess or bone changes around the root. The tooth may need root canal treatment or extraction.",
  problemDescription2: "Root canal treatment removes damaged tissue, cleans the inside of the tooth, and seals it. The goal is to treat the infection and preserve the tooth when possible.",
  problemNote: (
    <>
      Tooth decay is one reason a tooth may need root canal treatment. Learn how decay can progress in our guide to <Link href="/oral-health-hub/what-causes-rotten-teeth/" className="text-primary underline hover:text-primary/80">damaged and decayed teeth</Link>. A dentist may also recommend a crown after treatment; our guide to <Link href="/oral-health-hub/what-is-a-dental-crown/" className="text-primary underline hover:text-primary/80">dental crowns</Link> explains the purpose. For earlier-stage decay, read how <Link href="/oral-health-hub/is-getting-a-tooth-filling-really-that-big-of-a-deal/" className="text-primary underline hover:text-primary/80">tooth fillings</Link> are used.
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
    { factor: "Tooth Location", impact: "High", tip: "Molars often have more canals, which can make treatment more complex than treatment for a front tooth." },
    { factor: "Dentist vs. Endodontist", impact: "Medium", tip: "An endodontist is a root canal specialist and may charge differently from a general dentist." },
    { factor: "Geographic Location", impact: "Medium", tip: "Fees vary by region, practice, and local operating costs." },
    { factor: "Treatment Complexity", impact: "Varies", tip: "A complex tooth or infection may require additional appointments or specialist care." },
  ],
  insuranceTips: [
    { title: "Check Your Coverage", description: "Call your plan provider to understand your current benefits, limits, and out-of-pocket responsibility." },
    { title: "Compare Network Details", description: "Ask your plan and dental office how network status may affect the estimate for your situation." },
    { title: "Use Your FSA or HSA", description: "A Flexible Spending Account (FSA) or Health Savings Account (HSA) allows you to pay for your root canal with pre-tax dollars." },
    { title: "Ask About Payment Plans", description: "Some dental offices offer payment plans. Review the total cost, fees, interest, and repayment terms before enrolling." },
  ],
  savingsWithDentaSmart: [
    { title: "Organize Your Questions", description: "Keep treatment-plan and cost questions together before discussing them with a dental office." },
    { title: "Review Cost Context", description: "Use educational context to prepare questions about an estimate, coverage, and treatment options." },
    { title: "Prepare for the Visit", description: "Bring your questions, records, and plan details to a dental professional who can advise you." },
  ],
  faqs: [
    { q: "Is a root canal painful?", a: "The area is numbed before treatment. Some people have soreness afterward, and your dentist can explain how to manage it." },
    { q: "How long does a root canal take?", a: "A root canal procedure usually takes one or two appointments, each lasting about 90 minutes. The exact time depends on the complexity of the tooth." },
    { q: "What happens after a root canal?", a: "The tooth may feel sensitive for a few days. A dentist may recommend a crown or another restoration to protect it." },
    { q: "Can I have the tooth pulled instead?", a: "Extraction may be an option in some cases. Ask your dentist to compare the risks, follow-up treatment, and total cost of preserving or replacing the tooth." },
    { q: "How long does a root canal last?", a: "A treated tooth can remain functional for many years. Results depend on the tooth, final restoration, oral hygiene, and follow-up care." },
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
