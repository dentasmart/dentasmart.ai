import CostPageTemplate, { CostPageData } from "./CostPageTemplate";

const data: CostPageData = {
  slug: "wisdom-teeth-removal-cost",
  procedureName: "Wisdom Teeth Removal",
  heroTitle: "What Does Wisdom Teeth Removal",
  heroHighlight: "Cost?",
  heroDescription: "The estimate depends on the number and position of the teeth, the procedure, anesthesia, imaging, and provider. Use these planning ranges to prepare questions for an oral surgery consultation.",
  metaTitle: "Wisdom Teeth Removal Cost | DentaSmart",
  metaDescription: "Review wisdom teeth removal cost factors, possible charges, insurance questions, and what to ask before an oral surgery consultation.",
  keywords: "wisdom teeth removal cost, wisdom tooth extraction cost, oral surgery cost, impacted wisdom teeth cost, how much to remove wisdom teeth, wisdom teeth removal without insurance",

  statsStrip: [
    { value: "Varies", label: "By Tooth Position" },
    { value: "Per Tooth", label: "Or Package Estimate" },
    { value: "Confirm", label: "Anesthesia and Coverage" },
  ],

  problemTitle: "Wisdom Teeth Need",
  problemHighlight: "Individual Evaluation",
  problemDescription: "A wisdom tooth that lacks room to erupt can remain partly or fully below the gum or bone. Some cause pain, infection, cysts, or damage to a nearby tooth, while others can be monitored.",
  problemDescription2: "A dentist or oral surgeon can review symptoms and imaging, then explain whether monitoring or removal is appropriate and how timing may affect the procedure.",

  costBreakdown: [
    {
      type: "Simple Extraction (Erupted Tooth)",
      range: "$200-$400",
      average: "$300",
      notes: "Tooth has fully grown in and is not stuck. The most straightforward removal. Usually done with local anesthetic.",
    },
    {
      type: "Soft Tissue Impaction",
      range: "$300-$600",
      average: "$450",
      notes: "Tooth is covered by gum tissue. The surgeon makes a small incision to access and remove it.",
    },
    {
      type: "Partial Bony Impaction",
      range: "$450-$850",
      average: "$650",
      notes: "Tooth is partially stuck in the jawbone. Some bone must be removed to get the tooth out.",
    },
    {
      type: "Full Bony Impaction",
      range: "$650-$1,100+",
      average: "$875",
      notes: "Most complex type. Tooth is completely encased in bone. Requires significant bone removal and longer surgery.",
    },
    {
      type: "All Four Teeth (Package)",
      range: "$800-$4,400",
      average: "$2,200",
      notes: "Most surgeons offer a lower per-tooth price when removing all four at once. Saves on setup and anesthesia costs.",
    },
    {
      type: "Anesthesia (IV Sedation)",
      range: "$200-$800",
      average: "$500",
      notes: "Added cost for IV sedation or general anesthesia. Local anesthetic is included in the extraction price.",
    },
  ],

  costFactors: [
    {
      factor: "Impaction Level",
      impact: "A fully erupted tooth costs $200-$400 to remove. A full bony impaction costs $650-$1,100+. The deeper the tooth, the higher the price.",
      tip: "Ask how the tooth position and root development affect the recommended procedure and estimate.",
    },
    {
      factor: "Number of Teeth",
      impact: "Removing more than one tooth in one visit can change anesthesia, facility, and package fees.",
      tip: "If several teeth are involved, ask for an itemized estimate and the reason for the proposed timing.",
    },
    {
      factor: "Anesthesia Choice",
      impact: "Local anesthesia, IV sedation, and general anesthesia have different clinical uses and costs.",
      tip: "Ask which option is recommended, why, who will provide it, and whether it is included in the estimate.",
    },
    {
      factor: "Surgeon vs General Dentist",
      impact: "A general dentist and an oral surgeon may charge differently and may handle different levels of complexity.",
      tip: "Ask who will perform the procedure and whether specialist care is recommended for your case.",
    },
  ],

  insuranceTips: [
    {
      title: "Surgical vs Basic Coverage",
      description: "Plans may classify wisdom teeth removal as oral surgery or extraction. Ask how your plan classifies the procedure and what limits apply.",
    },
    {
      title: "Stay In-Network",
      description: "Network status can change the allowed fee and your share of the bill. Confirm the provider's status with both the insurer and the office.",
    },
    {
      title: "Get a Pre-Treatment Estimate",
      description: "Ask whether the office can submit a pre-treatment estimate. It can help you plan, but final coverage can change after the claim is reviewed.",
    },
    {
      title: "Use HSA or FSA Funds",
      description: "If you have an HSA or FSA, confirm whether the procedure is an eligible expense under your plan.",
    },
  ],

  savingsWithDentaSmart: [
    {
      title: "Prepare Questions About Removal",
      description: "Use supported information to prepare questions about symptoms, position, monitoring, and removal. A dentist or oral surgeon must examine you and recommend whether treatment is appropriate.",
    },
    {
      title: "Understand Your Case Before the Consult",
      description: "Use the guide to prepare questions about tooth position, symptoms, monitoring, anesthesia, and the written estimate. Imaging and a professional exam determine the clinical details.",
    },
    {
      title: "Track Your Recovery",
      description: "Keep your aftercare instructions and questions together. Contact the dental team if pain, swelling, bleeding, fever, or other symptoms concern you.",
    },
  ],

  faqs: [
    {
      q: "How much does it cost to remove all 4 wisdom teeth?",
      a: "The total depends on tooth position, procedure type, anesthesia, imaging, provider, and location. Ask for an itemized estimate that separates each tooth and any anesthesia or facility fee.",
    },
    {
      q: "Does wisdom teeth removal hurt?",
      a: "The area is numbed, and some procedures use sedation. Soreness and swelling can occur afterward. Follow the medication and aftercare instructions from your dental team.",
    },
    {
      q: "How long is recovery after wisdom teeth removal?",
      a: "Recovery varies by the number and position of the teeth, the procedure, and your health. Follow the surgeon's instructions on food, activity, cleaning, smoking, and when to seek help.",
    },
    {
      q: "Do I have to remove all four wisdom teeth?",
      a: "Not always. If a wisdom tooth is healthy, fully erupted, and not causing problems, it may not need removal. Your dentist will evaluate each tooth individually with X-rays. Some people only need one or two removed.",
    },
    {
      q: "Is it better to be awake or asleep for wisdom teeth removal?",
      a: "The anesthesia plan depends on tooth position, procedure complexity, health history, anxiety, and provider setting. Ask the clinician to explain the recommendation and risks.",
    },
    {
      q: "What happens if I do not get my wisdom teeth removed?",
      a: "Some impacted wisdom teeth cause infection, cysts, damage to nearby teeth, or pain; others can be monitored. A dentist can review symptoms and imaging and recommend follow-up.",
    },
  ],

  relatedCostPages: [
    { name: "Tooth Extraction", slug: "tooth-extraction-cost", price: "$50-$500" },
    { name: "Root Canal", slug: "root-canal-cost", price: "$700-$1,500" },
    { name: "Dental Implant", slug: "dental-implant-cost", price: "$3,000-$6,000" },
    { name: "Dental Cleaning", slug: "dental-cleaning-cost", price: "$75-$200" },
  ],
  relatedTreatmentPage: { name: "Wisdom Teeth Removal", slug: "wisdom-teeth-removal" },
};

export default function WisdomTeethCost() {
  return <CostPageTemplate data={data} />;
}
