import ComparisonPageTemplate, { ComparisonPageData } from "./ComparisonPageTemplate";

const data: ComparisonPageData = {
  slug: "dental-implants-vs-dentures",
  optionAName: "Dental Implants",
  optionBName: "Dentures",

  // SEO & Metadata
  metaTitle: "Dental Implants vs Dentures Compared | DentaSmart",
  metaDescription: "Compare dental implants and dentures by cost, procedure, daily care, fit, and the clinical factors a dentist reviews.",
  keywords: "dental implants vs dentures, implants vs dentures cost, are dental implants worth it, tooth replacement options, denture alternatives",

  // Hero Section
  heroTitle: "Dental Implants vs. Dentures:",
  heroHighlight: "Which is Right for You?",
  heroDescription: "Compare dental implants and dentures by treatment process, cost, daily care, fit, and the health factors that affect candidacy.",

  // Stats Strip
  statsStrip: [
    { value: "Fixed", label: "Dental Implants" },
    { value: "Removable", label: "Dentures" },
    { value: "Individual", label: "Treatment Recommendation" },
  ],

  // Intro Section
  introTitle: "Compare the",
  introHighlight: "Treatment Trade-offs",
  introDescription: "Dental implants are fixed in the jaw and require surgery. Dentures are removable and usually avoid implant surgery, but their fit can change as the mouth changes.",
  introDescription2: "The choice depends on your mouth, health history, treatment goals, budget, and willingness to manage surgery or a removable appliance.",

  // Comparison Table
  comparisonTable: [
    {
      factor: "Upfront Cost",
      optionA: "$3,000 - $6,000 per tooth",
      optionB: "$600 - $8,000 per set (full or partial)",
      winner: "B",
    },
    {
      factor: "Longevity",
      optionA: "Designed for long-term use; the crown and implant still need monitoring",
      optionB: "Fit and materials change over time, so adjustment or replacement may be needed",
      winner: "tie",
    },
    {
      factor: "Bone Health",
      optionA: "Transfers chewing forces to bone and may help maintain bone at the site",
      optionB: "Rests on the gums and does not replace stimulation from a tooth root",
      winner: "A",
    },
    {
      factor: "Eating & Speaking",
      optionA: "Fixed replacement; chewing comfort depends on healing and fit",
      optionB: "May require practice and food adjustments, especially at first",
      winner: "tie",
    },
    {
      factor: "Comfort & Fit",
      optionA: "Fixed in the jaw; comfort depends on the implant, crown, gums, and bite",
      optionB: "Removable; may need adjustments if sore spots or looseness develop",
      winner: "tie",
    },
    {
      factor: "Maintenance",
      optionA: "Brush and floss like natural teeth",
      optionB: "Requires daily removal for cleaning and soaking overnight",
      winner: "A",
    },
    {
      factor: "Appearance",
      optionA: "Crown is made to match the general shape and shade of nearby teeth",
      optionB: "Teeth and base can be made to suit the mouth and appearance goals",
      winner: "tie",
    },
    {
      factor: "Candidacy",
      optionA: "Requires surgical and bone-healing assessment",
      optionB: "Requires assessment of gums, jaw shape, dexterity, and fit",
      winner: "tie",
    },
  ],

  // Pros and Cons
  optionAProsCons: [
    { text: "Fixed replacement that does not need daily removal.", type: "pro" },
    { text: "Transfers chewing forces to bone at the implant site.", type: "pro" },
    { text: "May provide stable chewing after healing and adjustment.", type: "pro" },
    { text: "High initial investment.", type: "con" },
    { text: "Requires surgery and a healing period.", type: "con" },
    { text: "Not everyone is a candidate due to bone density.", type: "con" },
  ],
  optionBProsCons: [
    { text: "Lower upfront cost compared to implants.", type: "pro" },
    { text: "Non-invasive procedure with no surgery required.", type: "pro" },
    { text: "May avoid implant surgery and a long implant-healing period.", type: "pro" },
    { text: "May need relining, adjustment, repair, or replacement as the mouth changes.", type: "con" },
    { text: "Can be uncomfortable and may affect taste and speech.", type: "con" },
    { text: "Does not prevent bone loss in the jaw.", type: "con" },
  ],

  // Who Should Choose
  whoShouldChooseA: {
    title: "Who Should Choose Dental Implants?",
    description: "Implants may suit people who want a fixed replacement and whose health, gums, bone, and treatment plan support implant surgery.",
    bestFor: [
      "People considering a fixed replacement.",
      "People willing to complete surgery, healing, and follow-up care.",
      "People whose dentist confirms the site can support an implant.",
      "Patients with sufficient jawbone to support the implant.",
    ],
  },
  whoShouldChooseB: {
    title: "Who Should Choose Dentures?",
    description: "Dentures may suit people who want a removable replacement, need to replace several teeth, or are not pursuing implant surgery.",
    bestFor: [
      "Those on a tighter budget.",
      "Individuals who are not candidates for dental surgery.",
      "People replacing several or all teeth in an arch.",
      "Patients who are okay with a removable appliance.",
    ],
  },

  // Bottom Line
  bottomLine: "Implants involve surgery and a longer treatment process but provide a fixed replacement. Dentures are removable and may have a lower initial cost, but they need daily removal and periodic fit checks. A dentist can compare both options for your mouth and health history.",

  // FAQs
  faqs: [
    {
      q: "Are dental implants worth the cost?",
      a: "The value depends on your treatment goals, health, implant site, total cost, alternatives, and follow-up needs. Ask for itemized plans for every option you are considering.",
    },
    {
      q: "How long do dentures last compared to implants?",
      a: "Both need ongoing care. Dentures may need adjustments or replacement as the mouth changes. Implants and their crowns also need monitoring and may require repair or replacement over time.",
    },
    {
      q: "Can I eat normally with dentures?",
      a: "Dentures often require practice and may make some foods harder to manage. Implant-supported crowns are fixed, but chewing comfort still depends on healing, fit, bite, and oral health.",
    },
    {
      q: "Does getting dental implants hurt?",
      a: "The area is usually numbed before implant placement. Soreness can occur afterward, and your dental team can explain how to manage it safely.",
    },
    {
      q: "Why do dentures become loose?",
      a: "Dentures rest on your gums and jawbone. Over time, the jawbone shrinks from lack of stimulation, causing the denture to lose its fit. This is why dentures need frequent adjustments and eventual replacement.",
    },
    {
      q: "Am I a good candidate for dental implants?",
      a: "A dentist must review your health history, medications, gums, jawbone, smoking, and healing risks. Imaging may be used to assess the site, and grafting is only appropriate in some cases.",
    },
  ],

  // Related Pages
  relatedPages: [
    { name: "Crown vs Veneer", href: "/comparisons/crown-vs-veneer", tagline: "Which restoration fits your needs?" },
    { name: "Braces vs Invisalign", href: "/comparisons/braces-vs-invisalign", tagline: "Compare two popular straightening options." },
    { name: "Dental Implant Cost", href: "/dental-costs/dental-implant-cost", tagline: "A full breakdown of implant expenses." },
    { name: "Dental Implant Procedure", href: "/treatments/dental-implant-procedure", tagline: "What to expect from the implant process." },
    { name: "Dentures Cost Guide", href: "/dental-costs/dentures-cost", tagline: "Review denture cost factors and estimate questions." },
  ],
};

export default function DentalImplantsVsDentures() {
  return <ComparisonPageTemplate data={data} />;
}
