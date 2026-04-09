import CostPageTemplate, { CostPageData } from "./CostPageTemplate";

const data: CostPageData = {
  slug: "braces-cost",
  procedureName: "Braces",
  heroTitle: "How much do braces cost",
  heroHighlight: "in 2026?",
  heroDescription:
    "Braces cost between $2,500 and $7,000 for most people. The price depends on the type you choose, how long you need them, and where you live. Here is a full breakdown so you know what to expect before your first orthodontist visit.",
  metaTitle: "How Much Do Braces Cost in 2026? | DentaSmart",
  metaDescription:
    "How much do braces cost in 2026? Expect to pay between $3,000 and $7,000. See a full breakdown by type, insurance coverage options, and ways to save money.",
  keywords:
    "how much do braces cost, braces cost without insurance, invisalign cost, metal braces price, ceramic braces cost, orthodontic treatment cost 2026, braces payment plan, affordable braces",
  statsStrip: [
    { value: "$5,000", label: "Average Braces Cost (Metal)" },
    { value: "12-24 mo", label: "Typical Treatment Time" },
    { value: "4M+", label: "Americans Get Braces Each Year" },
  ],
  problemTitle: "The real cost of braces isn't just the brackets.",
  problemHighlight: "It's the confusion around pricing.",
  problemDescription:
    "You call three orthodontists and get three wildly different quotes. One says $3,200, another says $6,500, and the third wants $4,800 but includes retainers. It is nearly impossible to compare when every office bundles things differently.",
  problemDescription2:
    "On top of that, most dental insurance plans cap orthodontic coverage at $1,000 to $2,000, which barely dents the total. And if you are over 18, some plans do not cover braces at all. Knowing the real numbers upfront saves you from sticker shock and helps you negotiate.",
  costBreakdown: [
    {
      type: "Traditional Metal Braces",
      range: "$2,500-$6,000",
      average: "$4,500",
      notes: "Most common and affordable option. Stainless steel brackets and wires. Works for all complexity levels.",
    },
    {
      type: "Ceramic (Clear) Braces",
      range: "$3,500-$7,000",
      average: "$5,500",
      notes: "Tooth-colored brackets that blend in. Same effectiveness as metal but cost 20-40% more.",
    },
    {
      type: "Lingual Braces",
      range: "$6,000-$13,000",
      average: "$9,000",
      notes: "Brackets go behind your teeth so they are invisible. Requires specialized training. Limited availability.",
    },
    {
      type: "Invisalign / Clear Aligners",
      range: "$3,000-$8,000",
      average: "$5,500",
      notes: "Removable clear trays changed every 1-2 weeks. Best for mild to moderate cases. Not ideal for complex bite issues.",
    },
    {
      type: "Self-Ligating Braces (Damon)",
      range: "$3,000-$7,000",
      average: "$5,000",
      notes: "Use clips instead of elastic bands. Fewer adjustment visits. Slightly faster treatment for some cases.",
    },
    {
      type: "Retainers (Post-Treatment)",
      range: "$100-$1,000",
      average: "$300",
      notes: "Required after braces come off. Permanent bonded retainers cost $150-$500. Removable ones cost $100-$300 each.",
    },
  ],
  costFactors: [
    {
      factor: "Case Complexity",
      impact: "Simple spacing issues cost $2,500-$4,000. Severe crowding or bite correction pushes costs to $5,000-$7,000+.",
      tip: "Ask your orthodontist to rate your case as mild, moderate, or severe. Mild cases often qualify for cheaper short-term treatment options.",
    },
    {
      factor: "Treatment Duration",
      impact: "Every extra 6 months adds $500-$1,500 to total cost. Average treatment is 18-24 months.",
      tip: "Follow your orthodontist's instructions exactly. Broken brackets and missed appointments extend treatment time and cost.",
    },
    {
      factor: "Geographic Location",
      impact: "Braces in New York or San Francisco cost 40-60% more than in smaller cities or rural areas.",
      tip: "If you live near a state border, check prices in the neighboring state. A 30-minute drive can save $1,000+.",
    },
    {
      factor: "Orthodontist vs General Dentist",
      impact: "Orthodontists charge 10-20% more but have 2-3 years of specialized training beyond dental school.",
      tip: "For simple cases, a general dentist offering Invisalign may be fine. For complex bite issues, see a board-certified orthodontist.",
    },
  ],
  insuranceTips: [
    {
      title: "Orthodontic Coverage Limits",
      description:
        "Most dental plans cover 50% of orthodontic costs up to a lifetime maximum of $1,000-$2,000. Some plans only cover patients under 18. Check your specific plan before starting treatment.",
    },
    {
      title: "In-Office Payment Plans",
      description:
        "Nearly every orthodontist offers monthly payment plans with zero interest. Typical structure: $500-$1,000 down payment, then $100-$300 per month for the duration of treatment.",
    },
    {
      title: "HSA and FSA Accounts",
      description:
        "Braces qualify as a medical expense under HSA and FSA plans. You can save 20-35% by paying with pre-tax dollars. Set your annual FSA contribution to match your expected orthodontic costs.",
    },
    {
      title: "Dental Schools and Teaching Clinics",
      description:
        "University orthodontic programs offer braces at 30-50% below private practice rates. Treatment is provided by residents under faculty supervision. Expect longer appointments but significant savings.",
    },
  ],
  savingsWithDentaSmart: [
    {
      title: "Know If You Actually Need Braces",
      description:
        "Upload a photo of your teeth and get a free AI assessment. DentaSmart can help you understand if your alignment issue is cosmetic or functional, so you do not spend $5,000 on something you might not need.",
    },
    {
      title: "Understand Your Options Before the Consultation",
      description:
        "Walking into an orthodontist office informed changes the conversation. When you already know your case complexity and typical price range, you can ask better questions and spot inflated quotes.",
    },
    {
      title: "Track Your Progress During Treatment",
      description:
        "Use DentaSmart to monitor your teeth throughout treatment. Catch issues early, stay on schedule, and avoid the costly extensions that come from missed problems or broken brackets.",
    },
  ],
  faqs: [
    {
      q: "How much do braces cost without insurance?",
      a: "Without insurance, metal braces cost $2,500-$6,000, ceramic braces cost $3,500-$7,000, and Invisalign costs $3,000-$8,000. Most orthodontists offer payment plans that break this into $100-$300 monthly payments with a down payment of $500-$1,000.",
    },
    {
      q: "Are braces cheaper for kids than adults?",
      a: "Not necessarily. The treatment itself costs roughly the same. The difference is that dental insurance is more likely to cover orthodontics for children under 18. Adult orthodontic coverage is less common, which means adults pay more out of pocket even though the base price is similar.",
    },
    {
      q: "Is Invisalign more expensive than metal braces?",
      a: "Invisalign typically costs $500-$2,000 more than traditional metal braces. The average Invisalign case runs $5,500 compared to $4,500 for metal braces. For simple cases, Invisalign Express or Lite options can cost as little as $2,000-$3,000.",
    },
    {
      q: "How long do you have to wear braces?",
      a: "Most people wear braces for 12 to 24 months. Simple spacing issues may only need 6-12 months. Severe crowding or bite problems can take 24-36 months. Your orthodontist will give you an estimate at your first consultation.",
    },
    {
      q: "Can I get braces on just my top or bottom teeth?",
      a: "Yes, single-arch treatment is possible for minor issues and costs 40-60% less than full treatment. A single arch of metal braces runs $1,500-$3,500. Your orthodontist will evaluate whether single-arch treatment will work without causing bite problems.",
    },
    {
      q: "Do braces hurt?",
      a: "Braces cause mild soreness for 3-5 days after placement and after each adjustment. Most people manage it with over-the-counter pain relievers. The discomfort fades quickly. Modern braces use lighter forces than older designs, so they are more comfortable than they used to be.",
    },
  ],
  relatedCostPages: [
    { name: "Veneers", slug: "veneers-cost", price: "$800-$2,500" },
    { name: "Teeth Whitening", slug: "teeth-whitening-cost", price: "$100-$1,000" },
    { name: "Dental Cleaning", slug: "dental-cleaning-cost", price: "$75-$200" },
    { name: "Dental Crown", slug: "dental-crown-cost", price: "$800-$2,500" },
  ],
};

export default function BracesCost() {
  return <CostPageTemplate data={data} />;
}
