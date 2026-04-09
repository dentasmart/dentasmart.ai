import CostPageTemplate, { CostPageData } from "./CostPageTemplate";

const data: CostPageData = {
  slug: "dentures-cost",
  procedureName: "Dentures",
  heroTitle: "How Much Do",
  heroHighlight: "Dentures Really Cost?",
  heroDescription: "Dentures are a popular way to replace missing teeth and bring back your smile. The price can swing widely depending on what you need. We will break down the real costs to help you understand what to expect.",
  metaTitle: "Dentures Cost in 2026 | DentaSmart",
  metaDescription: "How much do dentures cost in 2026? Prices range from $600 to $8,000 depending on the type. See a full cost breakdown and ways to make them affordable.",
  keywords: "dentures cost, cost of dentures, full dentures cost, partial dentures cost, affordable dentures",
  statsStrip: [
    { value: "$1,800", label: "Average Full Set" },
    { value: "7-10", label: "Years They Last" },
    { value: "90%", label: "Of people who have lost all their teeth choose dentures" },
  ],
  problemTitle: "The Hidden Costs",
  problemHighlight: "Behind a New Smile",
  problemDescription: "Getting dentures seems straightforward, but the final bill can be a surprise. The price tag is not just for the teeth themselves. It often includes initial consultations, tooth extractions, fittings, and future adjustments. Each step adds to the overall expense, making it hard to budget accurately from the start.",
  problemDescription2: "Beyond the initial fitting, dentures require ongoing care. Relining to refit the dentures as your gums change, repairs for accidental breaks, and specialized cleaning solutions are all part of the long-term cost. These are not one-time expenses, but they are necessary to keep your dentures comfortable and functional.",
  costBreakdown: [
    { type: "Economy Full Dentures (Upper or Lower)", range: "$600 - $1,200", average: "$800", notes: "A basic, no-frills option. Often made from less expensive materials and with a more generic fit." },
    { type: "Conventional Full Dentures", range: "$1,500 - $3,500", average: "$2,500", notes: "A mid-range option with a better fit and more natural look. These are the most common type of dentures." },
    { type: "Premium Full Dentures", range: "$4,000 - $8,000", average: "$6,000", notes: "Top-of-the-line dentures with the most customized fit and appearance. Made from high-end materials for maximum comfort and durability." },
    { type: "Partial Dentures", range: "$500 - $2,500", average: "$1,500", notes: "Used when some natural teeth remain. The cost varies based on the number of teeth being replaced and the materials used." },
    { type: "Implant-Supported Dentures (per arch)", range: "$7,000 - $15,000", average: "$10,000", notes: "These dentures snap onto dental implants for a more secure fit. The price includes the implants and the dentures." },
  ],
  costFactors: [
    { factor: "Material", impact: "Acrylic dentures can cost as little as $600 per arch, while high-end porcelain dentures can be over $4,000.", tip: "Discuss material trade-offs with your dentist. A slightly more expensive material might offer better durability and a more natural look." },
    { factor: "Full vs. Partial", impact: "A full set of dentures to replace all teeth costs between $1,200 and $8,000, while partial dentures for a few teeth range from $500 to $2,500.", tip: "If you only need a few teeth replaced, a partial denture is a more affordable option than a full set." },
    { factor: "Geographic Location", impact: "Denture costs in major metropolitan areas can be 20-30% higher than in smaller towns. For example, a full set might cost $2,500 in a rural area but $3,500 in a big city.", tip: "Check with dental offices in nearby smaller towns. The travel could be worth the savings." },
    { factor: "Extractions", impact: "If you need teeth pulled before getting dentures, each extraction can add $150 to $400 to your bill.", tip: "Ask your dentist for a package deal that includes extractions and the dentures to lower the overall cost." },
  ],
  insuranceTips: [
    { title: "Check Your Coverage", description: "Many dental insurance plans cover up to 50% of the cost of dentures. Call your provider to understand your specific benefits and limitations." },
    { title: "Use Your FSA or HSA", description: "Flexible Spending Accounts (FSA) and Health Savings Accounts (HSA) let you use pre-tax dollars to pay for medical expenses, including dentures." },
    { title: "Ask About Payment Plans", description: "Most dental offices offer financing options or payment plans to help you spread out the cost of your dentures over time." },
    { title: "Look into Dental Schools", description: "Dental schools often provide dentures at a lower cost as part of their training programs. The work is done by students but supervised by experienced dentists." },
  ],
  savingsWithDentaSmart: [
    { title: "Find Affordable Dentists", description: "Our app helps you locate and compare prices from dentists in your area, ensuring you get the best deal on your dentures." },
    { title: "Personalized Cost Estimates", description: "Get a more accurate idea of what you will pay. The DentaSmart app provides tailored cost estimates based on your specific needs and location." },
    { title: "Track Your Dental Expenses", description: "Keep all your dental-related costs in one place. This makes it easier to manage your budget and see where your money is going." },
  ],
  faqs: [
    { q: "How long do dentures last?", a: "With proper care, dentures can last between 7 and 10 years. Over time, they may need to be relined or replaced as your mouth changes." },
    { q: "Can I eat normally with dentures?", a: "It takes some practice, but you will be able to eat most foods with dentures. Start with soft foods and cut them into small pieces." },
    { q: "How do I clean my dentures?", a: "You should brush your dentures daily with a soft-bristle brush and a non-abrasive denture cleaner. Soaking them overnight helps to remove stains and bacteria." },
    { q: "Do dentures hurt?", a: "It is normal to experience some soreness and irritation in the first few weeks. If the discomfort continues, your dentist can make adjustments for a better fit." },
    { q: "Is it hard to talk with dentures?", a: "You might have a slight lisp at first, but this usually goes away as you get used to them. Practicing reading aloud can help you adapt more quickly." },
    { q: "Can I sleep with my dentures in?", a: "It is generally recommended to remove your dentures at night to give your gums a rest. This also allows you to clean them properly." },
  ],
  relatedCostPages: [
    { name: "Dental Implant Cost", slug: "dental-implant-cost", price: "$3,000 - $6,000" },
    { name: "Tooth Extraction Cost", slug: "tooth-extraction-cost", price: "$150 - $400" },
    { name: "Dental Crown Cost", slug: "dental-crown-cost", price: "$800 - $2,000" },
    { name: "Dental Cleaning Cost", slug: "dental-cleaning-cost", price: "$100 - $200" },
  ],
};

export default function DenturesCostPage() {
  return <CostPageTemplate data={data} />;
}
