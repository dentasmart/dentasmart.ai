
import CostPageTemplate, { CostPageData } from "./CostPageTemplate";

const data: CostPageData = {
  slug: "dental-crown-cost",
  procedureName: "Dental Crown",
  heroTitle: "The Real Cost of a",
  heroHighlight: "Dental Crown",
  heroDescription: "A dental crown is a custom-made cap that covers a damaged tooth. It restores the tooth’s shape, size, strength, and improves its appearance. Think of it as a fresh start for a tooth that has seen better days.",
  metaTitle: "Dental Crown Cost | DentaSmart",
  metaDescription: "Curious about dental crown costs in 2025-2026? Our guide breaks down prices, from $800 to $2,500, and explains the factors that influence the final cost.",
  keywords: "dental crown cost, cost of a crown, tooth cap price, dental crown price, ceramic crown cost",

  statsStrip: [
    {
      value: "10-15 Years",
      label: "Average Lifespan",
    },
    {
      value: "95%+",
      label: "Success Rate at 5 Years",
    },
    {
      value: "$1,500",
      label: "Typical Average Cost",
    },
  ],

  problemTitle: "When a Simple Filling Is Not Enough",
  problemHighlight: "Protecting Your Tooth for the Long Haul",
  problemDescription: "A large cavity, a cracked tooth, or a root canal can leave a tooth weak and vulnerable. A simple filling might not be strong enough to handle the daily pressure of chewing. This is where a dental crown comes in. It acts like a helmet, protecting the weakened tooth structure underneath.",
  problemDescription2: "Without a crown, a damaged tooth is at a higher risk of fracturing completely, which could lead to needing an extraction. A crown provides the necessary reinforcement to save the tooth, allowing you to chew comfortably and smile with confidence for years to come.",

  costBreakdown: [
    {
      type: "Porcelain-Fused-to-Metal (PFM)",
      range: "$800 - $2,000",
      average: "$1,100",
      notes: "Good strength and aesthetics, but a metal line can sometimes be visible at the gumline."
    },
    {
      type: "All-Porcelain / All-Ceramic",
      range: "$1,000 - $2,500",
      average: "$1,400",
      notes: "The best option for a natural look, making them ideal for front teeth."
    },
    {
      type: "Zirconia",
      range: "$1,200 - $2,500",
      average: "$1,600",
      notes: "Extremely strong and durable with a good cosmetic appearance. A popular modern choice."
    },
    {
      type: "Gold & Metal Alloys",
      range: "$900 - $2,500",
      average: "$1,300",
      notes: "Highly durable and requires less tooth removal, but the metallic color is a drawback for visible teeth."
    }
  ],

  costFactors: [
    {
      factor: "Material Choice",
      impact: "Zirconia and all-porcelain crowns often cost more, ranging from $1,200 to $2,500, while PFM crowns are more affordable at $800 to $2,000.",
      tip: "Discuss the best material for your specific tooth with your dentist. A molar does not need the same aesthetics as a front tooth."
    },
    {
      factor: "Tooth Location",
      impact: "Crowns for front teeth can be more expensive due to the higher aesthetic requirements, costing $1,200-$2,500, while molars might be in the $1,000-$2,000 range.",
      tip: "Ask if different materials have different prices for front versus back teeth."
    },
    {
      factor: "Dentist's Location & Experience",
      impact: "A specialist in a major city like New York might charge $2,500 or more, while a general dentist in a smaller town could charge closer to $1,000.",
      tip: "It is okay to get quotes from a few different dental offices to compare prices."
    },
    {
      factor: "Additional Procedures",
      impact: "If you need a root canal before the crown, that can add $700-$2,000 to the total bill. A core buildup might add another $200-$400.",
      tip: "Request a detailed treatment plan that itemizes every single cost before you begin."
    }
  ],

  insuranceTips: [
    {
      title: "Check Your Coverage Level",
      description: "Most dental insurance plans cover crowns at around 50%, but only after you have met your deductible. Confirm your plan’s specific percentage for major restorative procedures."
    },
    {
      title: "Understand the 'Why'",
      description: "Insurance is more likely to approve a crown if it is deemed medically necessary (e.g., for a cracked tooth or after a root canal) rather than for purely cosmetic reasons."
    },
    {
      title: "Ask About Annual Maximums",
      description: "A crown can easily use up a significant portion of your annual insurance maximum, which is often between $1,500 and $2,000. Plan your treatments accordingly."
    },
    {
      title: "Get a Pre-Treatment Estimate",
      description: "Always ask your dentist to submit a pre-treatment estimate to your insurance company. This document will confirm exactly what your plan will pay and what your out-of-pocket cost will be."
    }
  ],

  savingsWithDentaSmart: [
    {
      title: "Find Fair Prices",
      description: "Use the DentaSmart app to check fair market prices for dental crowns in your area. This knowledge helps you know if the quote you received is reasonable."
    },
    {
      title: "Payment Plan Options",
      description: "DentaSmart can help you find dentists who offer flexible payment plans, so you do not have to pay the full cost of the crown all at once."
    },
    {
      title: "Preventative Care Reminders",
      description: "The best way to save money is to avoid needing a crown in the first place. DentaSmart helps you stay on top of your oral health to prevent major problems."
    }
  ],

  faqs: [
    {
      q: "How long does a dental crown last?",
      a: "With proper care, a dental crown can last between 5 and 15 years, and sometimes even longer. The lifespan depends on the material, your oral hygiene habits, and how much wear and tear it is exposed to."
    },
    {
      q: "Does getting a crown hurt?",
      a: "No, your dentist will numb the tooth and surrounding area with local anesthesia before starting the procedure. You might feel some pressure, but you should not feel any pain. Your tooth may be sensitive for a few days afterward."
    },
    {
      q: "How many appointments does it take to get a crown?",
      a: "Typically, it takes two appointments. The first visit is to prepare the tooth, take impressions, and place a temporary crown. The second visit, a few weeks later, is to permanently cement the final, custom-made crown."
    },
    {
      q: "Can a crowned tooth still get a cavity?",
      a: "Yes, the tooth underneath the crown can still decay. The area where the crown meets the tooth is a common spot for cavities to form, so it is very important to brush and floss around the crown carefully."
    },
    {
      q: "What is the difference between a crown and a veneer?",
      a: "A crown covers the entire tooth, while a veneer is a thin shell that only covers the front surface. Crowns are used for protection and restoration, while veneers are primarily for cosmetic improvements."
    }
  ],

  relatedCostPages: [
    {
      name: "Root Canal Cost",
      slug: "root-canal-cost",
      price: "$700 - $2,000"
    },
    {
      name: "Dental Implant Cost",
      slug: "dental-implant-cost",
      price: "$3,000 - $6,000"
    },
    {
      name: "Veneers Cost",
      slug: "veneers-cost",
      price: "$925 - $2,500"
    },
    {
      name: "Tooth Extraction Cost",
      slug: "tooth-extraction-cost",
      price: "$150 - $500"
    }
  ]
};

export default function DentalCrownCostPage() {
  return <CostPageTemplate data={data} />;
}
