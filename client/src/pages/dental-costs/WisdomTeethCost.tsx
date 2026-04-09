import CostPageTemplate, { CostPageData } from "./CostPageTemplate";

const data: CostPageData = {
  slug: "wisdom-teeth-removal-cost",
  procedureName: "Wisdom Teeth Removal",
  heroTitle: "How much does wisdom teeth removal",
  heroHighlight: "actually cost?",
  heroDescription: "Wisdom teeth removal costs $200 to $1,100 per tooth depending on how impacted they are. Most people need all four out, which means the total bill runs $800 to $4,400. Here is a full breakdown so you know what to expect before your oral surgery consultation.",
  metaTitle: "Wisdom Teeth Removal Cost 2026 | DentaSmart",
  metaDescription: "How much does wisdom teeth removal cost in 2026? Expect $200 to $600 per tooth. Learn what affects the price, insurance coverage, and how to save money.",
  keywords: "wisdom teeth removal cost, wisdom tooth extraction cost, oral surgery cost, impacted wisdom teeth cost, how much to remove wisdom teeth, wisdom teeth removal without insurance",

  statsStrip: [
    { value: "$200-$1,100", label: "Cost Per Tooth" },
    { value: "5M+", label: "Removed Each Year in the U.S." },
    { value: "85%", label: "Of Adults Need Them Out" },
  ],

  problemTitle: "Ignoring impacted wisdom teeth",
  problemHighlight: "costs more than removing them.",
  problemDescription: "When a wisdom tooth does not have room to grow, it gets stuck in your jawbone or gums. That leads to pain, swelling, cysts, and damage to the teeth next to it. The longer you wait, the worse these problems get.",
  problemDescription2: "Delaying removal means the roots grow longer and the jawbone gets denser. That makes the extraction harder, the recovery longer, and the bill bigger. Early removal is almost always simpler and cheaper.",

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
      tip: "Get your wisdom teeth evaluated in your late teens. Removing them before the roots fully form is simpler and cheaper.",
    },
    {
      factor: "Number of Teeth",
      impact: "Removing all four at once typically costs 10-20% less per tooth than removing them one at a time over separate visits.",
      tip: "If your dentist recommends removing multiple wisdom teeth, doing them all in one session saves money on anesthesia and facility fees.",
    },
    {
      factor: "Anesthesia Choice",
      impact: "Local anesthetic is included in the base price. IV sedation adds $200-$600. General anesthesia adds $300-$800.",
      tip: "Local anesthetic works fine for simple extractions. Save IV sedation for impacted teeth or if you have significant dental anxiety.",
    },
    {
      factor: "Surgeon vs General Dentist",
      impact: "Oral surgeons charge 20-40% more than general dentists but handle complex impactions more safely.",
      tip: "For erupted wisdom teeth, a general dentist can handle the extraction. For impacted teeth, an oral surgeon is worth the extra cost.",
    },
  ],

  insuranceTips: [
    {
      title: "Surgical vs Basic Coverage",
      description: "Wisdom teeth removal is usually classified as oral surgery, not basic extraction. Most plans cover 50-80% of surgical extractions after your deductible. Check which category your plan uses.",
    },
    {
      title: "Stay In-Network",
      description: "Using an in-network oral surgeon cuts your out-of-pocket cost significantly. Out-of-network surgeons can charge whatever they want, and your insurance pays based on their own fee schedule.",
    },
    {
      title: "Get a Pre-Treatment Estimate",
      description: "Ask the surgeon's office to submit a pre-treatment estimate to your insurance before scheduling. This tells you exactly what your plan will cover and what you will owe.",
    },
    {
      title: "Use HSA or FSA Funds",
      description: "Wisdom teeth removal qualifies as a medical expense under HSA and FSA plans. Paying with pre-tax dollars saves you 20-35% compared to paying with after-tax income.",
    },
  ],

  savingsWithDentaSmart: [
    {
      title: "Know If You Actually Need Them Out",
      description: "Not every wisdom tooth needs to come out. Upload a photo or X-ray and get a free AI assessment. DentaSmart helps you understand if removal is necessary or if monitoring is a better option.",
    },
    {
      title: "Understand Your Case Before the Consult",
      description: "Walking into the surgeon's office already knowing your impaction level and typical price range changes the conversation. You can ask better questions and spot inflated quotes.",
    },
    {
      title: "Track Your Recovery",
      description: "Use DentaSmart to monitor your healing after surgery. Catch signs of dry socket or infection early so you can get treatment before a minor issue becomes an expensive emergency.",
    },
  ],

  faqs: [
    {
      q: "How much does it cost to remove all 4 wisdom teeth?",
      a: "Removing all four wisdom teeth costs $800 to $4,400 depending on impaction level. With IV sedation, add $200-$800. Most oral surgeons offer a package price that is 10-20% cheaper per tooth than removing them individually.",
    },
    {
      q: "Does wisdom teeth removal hurt?",
      a: "You will not feel pain during the procedure because of anesthesia. Expect soreness and swelling for 3-5 days afterward. Over-the-counter pain medication and ice packs handle it for most people. Prescription pain meds are available for complex cases.",
    },
    {
      q: "How long is recovery after wisdom teeth removal?",
      a: "Initial recovery takes 3-5 days. Most people feel normal within a week. Full gum healing takes 3-4 weeks. Avoid straws, smoking, and hard foods for the first week to prevent dry socket.",
    },
    {
      q: "Do I have to remove all four wisdom teeth?",
      a: "Not always. If a wisdom tooth is healthy, fully erupted, and not causing problems, it may not need removal. Your dentist will evaluate each tooth individually with X-rays. Some people only need one or two removed.",
    },
    {
      q: "Is it better to be awake or asleep for wisdom teeth removal?",
      a: "For simple extractions of erupted teeth, local anesthetic works fine and costs less. For impacted teeth or if you have dental anxiety, IV sedation is common and keeps you comfortable. General anesthesia is rarely needed.",
    },
    {
      q: "What happens if I do not get my wisdom teeth removed?",
      a: "Impacted wisdom teeth can cause recurring infections, cysts, damage to neighboring teeth, and chronic pain. Not all wisdom teeth cause problems, but the ones that do tend to get worse over time. Regular monitoring with X-rays helps you decide.",
    },
  ],

  relatedCostPages: [
    { name: "Tooth Extraction", slug: "tooth-extraction-cost", price: "$50-$500" },
    { name: "Root Canal", slug: "root-canal-cost", price: "$700-$1,500" },
    { name: "Dental Implant", slug: "dental-implant-cost", price: "$3,000-$6,000" },
    { name: "Dental Cleaning", slug: "dental-cleaning-cost", price: "$75-$200" },
  ],
};

export default function WisdomTeethCost() {
  return <CostPageTemplate data={data} />;
}
