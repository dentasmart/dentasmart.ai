import ComparisonPageTemplate, { ComparisonPageData } from "./ComparisonPageTemplate";
import { Link } from "wouter";

const data: ComparisonPageData = {
  slug: "braces-vs-invisalign",
  optionAName: "Braces",
  optionBName: "Invisalign",
  heroTitle: "Braces vs. Invisalign:",
  heroHighlight: "Which is Right for Your Smile?",
  heroDescription: "Compare how braces and clear aligners differ in daily use, cost, timing, and the types of tooth movement they may address.",
  metaTitle: "Braces vs Invisalign: Cost & Results | DentaSmart",
  metaDescription: "Compare braces and Invisalign by cost, treatment time, daily care, appearance, and the orthodontic needs each option may address.",
  keywords: "braces vs invisalign, braces vs invisalign cost, invisalign vs braces for adults, clear aligners vs braces",
  statsStrip: [
    { value: "Fixed", label: "Braces" },
    { value: "Removable", label: "Clear Aligners" },
    { value: "Individual", label: "Treatment Plan" },
  ],
  introTitle: "Compare Your",
  introHighlight: "Treatment Priorities",
  introDescription: "The choice depends on the tooth and bite changes needed, your budget, and how each option fits your routine. Braces stay fixed to the teeth throughout treatment.",
  introDescription2: "Clear aligners are removable and less visible, but they must be worn as directed. An orthodontist can explain which option can produce the planned movement.",
  introNote: (
    <>
      Before braces go on, some patients need{" "}
      <Link href="/oral-health-hub/spacers-for-teeth/" className="text-primary underline hover:text-primary/80">
        spacers for teeth
      </Link>{" "}
      to create room between molars for the metal bands.
    </>
  ),
  comparisonTable: [
    { factor: "Average Cost", optionA: "$2,500 - $7,000", optionB: "$3,000 - $8,000", winner: "A" },
    { factor: "Treatment Time", optionA: "18 - 24 months", optionB: "12 - 18 months", winner: "B" },
    { factor: "Clinical Fit", optionA: "Can address a broad range of tooth and bite movements", optionB: "May suit many mild to moderate cases; fit depends on the movement needed", winner: "tie" },
    { factor: "Appearance", optionA: "Visible metal or ceramic brackets", optionB: "Nearly invisible clear plastic aligners", winner: "B" },
    { factor: "Lifestyle Impact", optionA: "Food restrictions; can affect sports", optionB: "Removable for eating, drinking, and activities", winner: "B" },
    { factor: "Maintenance", optionA: "Requires careful brushing and flossing around brackets", optionB: "Aligners must be cleaned daily; easy to brush teeth", winner: "tie" },
    { factor: "Comfort", optionA: "Can cause soreness and irritation from brackets or wires", optionB: "Can cause pressure and soreness when trays change", winner: "tie" },
    { factor: "Appointments", optionA: "Adjustment schedule varies by treatment plan", optionB: "Check-in schedule varies by treatment plan", winner: "tie" },
    { factor: "Daily Routine", optionA: "Fixed appliance with food and cleaning adjustments", optionB: "Removable appliance that depends on consistent wear", winner: "tie" },
  ],
  optionAProsCons: [
    { text: "Can address a broad range of tooth and bite movements.", type: "pro" },
    { text: "No need to remember to put them in or take them out.", type: "pro" },
    { text: "Often more affordable than Invisalign for similar cases.", type: "pro" },
    { text: "Visible appearance can make some people feel self-conscious.", type: "con" },
    { text: "Requires avoiding certain hard, sticky, or chewy foods.", type: "con" },
    { text: "Cleaning around wires and brackets can be challenging.", type: "con" },
  ],
  optionBProsCons: [
    { text: "Aligners are nearly invisible, offering a discreet treatment.", type: "pro" },
    { text: "You can remove them to eat, drink, brush, and floss normally.", type: "pro" },
    { text: "Remote or less frequent check-ins may be available in some treatment plans.", type: "pro" },
    { text: "Requires discipline to wear for 20-22 hours per day.", type: "con" },
    { text: "Can be more expensive than traditional braces.", type: "con" },
    { text: "Not always the best option for very complex or severe cases.", type: "con" },
  ],
  whoShouldChooseA: {
    title: "Who Should Choose Braces?",
    description: "Braces may suit people who need a fixed appliance or tooth movements that an orthodontist believes are better managed with brackets and wires.",
    bestFor: [
      "People with complex or severe bite issues",
      "Younger teenagers who might lack discipline for aligners",
      "People whose orthodontist recommends a fixed appliance",
      "Individuals on a slightly tighter budget",
      "Patients who do not want to worry about removing aligners",
    ],
  },
  whoShouldChooseB: {
    title: "Who Should Choose Invisalign?",
    description: "Clear aligners may suit adults and teens who want a less visible, removable appliance and can follow the daily wear schedule.",
    bestFor: [
      "Adults and professionals who want a discreet option",
      "People with mild to moderate alignment issues",
      "Disciplined individuals who will wear aligners as directed",
      "Those who want to eat and drink without restrictions",
      "Athletes or musicians who find braces intrusive",
    ],
  },
  bottomLine: "Braces and clear aligners can both move teeth, but they do not fit every case in the same way. An orthodontist can compare the planned movement, daily routine, risks, timing, and total cost for your teeth.",
  faqs: [
    { q: "Is Invisalign faster than braces?", a: "Not necessarily. Treatment time depends on the tooth movement, bite, treatment plan, and how consistently aligners are worn." },
    { q: "Which is more painful, braces or Invisalign?", a: "Both can cause some discomfort, especially after adjustments or when switching to a new aligner. Many people report that the initial soreness from braces and potential irritation from wires is more intense than the pressure from new Invisalign trays." },
    { q: "Can you eat with Invisalign?", a: "No, you must remove your Invisalign aligners before eating or drinking anything other than cool water. This prevents damage to the aligners and keeps them from getting stained. It is a key part of the daily routine with this treatment." },
    { q: "How much more expensive is Invisalign than braces?", a: "Either option may cost more depending on the case, provider, location, treatment length, and insurance. Compare itemized estimates for the full treatment and retainers." },
    { q: "Do I have to wear a retainer after both treatments?", a: "Retention is commonly part of orthodontic care after braces or clear aligners. Your orthodontist will recommend a schedule based on your treatment." },
    { q: "Is it easier to keep teeth clean with braces or Invisalign?", a: "Clear aligners can be removed for brushing and flossing. Braces require cleaning around brackets and wires. Both options need a consistent routine." },
  ],
  relatedPages: [
    { name: "Crown vs Veneer", href: "/comparisons/crown-vs-veneer/", tagline: "Which restoration fits your needs?" },
    { name: "Implants vs Dentures", href: "/comparisons/dental-implants-vs-dentures/", tagline: "Permanent vs removable tooth replacement." },
    { name: "Braces Cost Guide", href: "/dental-costs/braces-cost/", tagline: "Review braces cost factors and estimate questions." },
    { name: "Braces Treatment Guide", href: "/treatments/braces-treatment/", tagline: "What to expect during orthodontic treatment." },
    { name: "Symptom Quiz", href: "/symptom-quiz/", tagline: "Check your symptoms with our AI-powered tool." },
  ],
};

export default function BracesVsInvisalign() {
  return <ComparisonPageTemplate data={data} />;
}
