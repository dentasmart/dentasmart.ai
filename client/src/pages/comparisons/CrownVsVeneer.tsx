import ComparisonPageTemplate, { ComparisonPageData } from "./ComparisonPageTemplate";

const data: ComparisonPageData = {
  slug: "crown-vs-veneer",
  optionAName: "Dental Crown",
  optionBName: "Veneer",
  heroTitle: "Dental Crown vs Veneer:",
  heroHighlight: "Which is Right for Your Smile?",
  heroDescription: "Crowns and veneers both restore teeth, but they work very differently. We will help you understand the key differences in cost, durability, and purpose to make a confident choice.",
  metaTitle: "Crown vs Veneer: Cost, Durability & Which is Better for You",
  metaDescription: "Confused about dental crowns vs veneers? See a side-by-side comparison of cost, durability, tooth preparation, and when each is the right choice for your dental needs.",
  keywords: "crown vs veneer, dental crown vs veneer, crown vs veneer cost, when to get a crown vs veneer, veneer vs crown",
  statsStrip: [
    { value: "$800 - $2,500", label: "Cost Per Tooth" },
    { value: "10-20 Years", label: "Average Lifespan" },
    { value: "22,200", label: "Monthly Searches" },
  ],
  introTitle: "The Big Question:",
  introHighlight: "Cover or Correct?",
  introDescription: "Choosing between a crown and a veneer comes down to one main thing: are you trying to fix a tooth\
s underlying structural problems or just improve its appearance? A crown is a full cap that covers the entire tooth, giving it new strength and shape. A veneer is a very thin shell that only covers the front surface to fix cosmetic issues.",
  introDescription2: "Think of it like this: a crown is like a helmet for your tooth, offering full protection and support. A veneer is more like a press-on nail, focused purely on looks. Both are great options, but they solve different problems.",
  comparisonTable: [
    { factor: "Purpose", optionA: "Restores a damaged, weak, or broken tooth's function and appearance", optionB: "Improves the appearance of a tooth with cosmetic issues like chips, gaps, or discoloration", winner: "tie" },
    { factor: "Tooth Preparation", optionA: "Requires significant removal of the tooth's natural structure on all sides", optionB: "Requires minimal removal of enamel from the front of the tooth only", winner: "B" },
    { factor: "Cost", optionA: "$1,000 - $2,500 per tooth", optionB: "$800 - $2,000 per tooth", winner: "B" },
    { factor: "Durability", optionA: "Very high. Protects the entire tooth from further damage", optionB: "Good, but the underlying tooth is still vulnerable to decay", winner: "A" },
    { factor: "Lifespan", optionA: "10-15 years, sometimes longer with excellent care", optionB: "10-20 years, depending on material and habits", winner: "B" },
    { factor: "Material", optionA: "Porcelain, ceramic, zirconia, metal alloys", optionB: "Porcelain or composite resin", winner: "tie" },
    { factor: "Treatment Time", optionA: "Usually two visits: one for preparation and one for fitting the final crown", optionB: "Can often be done in two visits, sometimes one for composite veneers", winner: "B" },
    { factor: "Aesthetics", optionA: "Can look very natural and match other teeth perfectly", optionB: "Excellent, provides a highly realistic and ideal cosmetic result", winner: "B" },
  ],
  optionAProsCons: [
    { text: "Provides full 360-degree protection for a weak tooth.", type: "pro" },
    { text: "Can fix major structural and cosmetic problems.", type: "pro" },
    { text: "Extremely durable and long-lasting.", type: "pro" },
    { text: "Requires removing a significant amount of healthy tooth structure.", type: "con" },
    { text: "Generally more expensive than a veneer.", type: "con" },
    { text: "The process takes at least two dental visits.", type: "neutral" },
  ],
  optionBProsCons: [
    { text: "Preserves more of your natural tooth structure.", type: "pro" },
    { text: "Excellent for fixing cosmetic issues like color, shape, and gaps.", type: "pro" },
    { text: "The process is quicker and less invasive.", type: "pro" },
    { text: "Does not strengthen the underlying tooth.", type: "con" },
    { text: "Can be more prone to chipping than a crown.", type: "con" },
    { text: "May not be an option for severely damaged or crooked teeth.", type: "neutral" },
  ],
  whoShouldChooseA: {
    title: "Who Should Choose a Dental Crown?",
    description: "A dental crown is the best choice when the tooth has a structural problem. If your tooth is badly decayed, cracked, or has had a root canal, a crown provides the necessary protection and support.",
    bestFor: ["Teeth with large fillings", "Cracked or broken teeth", "Teeth that have had a root canal", "Severely worn or misshapen teeth", "Covering a dental implant"],
  },
  whoShouldChooseB: {
    title: "Who Should Choose a Veneer?",
    description: "A veneer is the ideal solution for cosmetic concerns. If your tooth is healthy but you want to improve its color, shape, or close a small gap, a veneer offers a beautiful result with minimal tooth alteration.",
    bestFor: ["Stained or discolored teeth", "Minor chips or cracks", "Small gaps between teeth", "Slightly crooked teeth", "Improving overall smile aesthetics"],
  },
  bottomLine: "The choice is clear: if your tooth is structurally compromised, a crown is the answer. If you are focused on cosmetic improvements for a healthy tooth, a veneer is your best bet. A consultation with your dentist will confirm the right path for your specific situation.",
  faqs: [
    { q: "Can you get a veneer on a tooth that has a crown?", a: "No, you cannot place a veneer on top of an existing crown. A crown already covers the entire tooth, so there is no surface to bond a veneer to. If you are unhappy with your crown, it would need to be replaced entirely." },
    { q: "Is a crown or veneer better for front teeth?", a: "It depends on the tooth's health. Veneers are often preferred for front teeth for cosmetic changes because they require less tooth removal and look very natural. However, if a front tooth is weak or damaged, a crown is the better, more durable option." },
    { q: "What lasts longer, a crown or a veneer?", a: "Veneers, particularly porcelain ones, often have a longer potential lifespan, lasting up to 20 years. Crowns typically last 10-15 years. However, longevity for both depends heavily on your oral hygiene, diet, and avoiding bad habits like grinding.", },
    { q: "Is the process painful?", a: "No, neither procedure should be painful. Your dentist will use local anesthesia to completely numb the area before preparing the tooth. You might feel some mild sensitivity or gum soreness for a few days afterward, but this is temporary.", },
    { q: "Can I get a cavity under a crown or veneer?", a: "Yes, the underlying tooth is still susceptible to decay. While the restoration itself cannot decay, cavities can form at the margin where the crown or veneer meets the tooth. Excellent brushing and flossing are essential to prevent this.", },
    { q: "How much do crowns and veneers cost?", a: "A veneer typically costs between $800 and $2,000 per tooth. A crown is slightly more, usually ranging from $1,000 to $2,500. Prices vary based on your location, the dentist's experience, and the material used.", },
  ],
  relatedPages: [
    { name: "Dental Crown Cost", href: "/dental-costs/dental-crown-cost", tagline: "Understand the factors that determine price." },
    { name: "Dental Veneers", href: "/treatments/veneers", tagline: "A deep dive into the procedure and benefits." },
    { name: "Symptom Quiz", href: "/symptom-quiz", tagline: "Find out what your dental symptoms could mean." },
    { name: "Invisalign vs Braces", href: "/comparisons/invisalign-vs-braces", tagline: "Compare two popular teeth straightening options." },
  ],
};

export default function CrownVsVeneer() {
  return <ComparisonPageTemplate data={data} />;
}
