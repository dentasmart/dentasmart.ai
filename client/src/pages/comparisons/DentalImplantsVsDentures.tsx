import ComparisonPageTemplate, { ComparisonPageData } from "./ComparisonPageTemplate";

const data: ComparisonPageData = {
  slug: "dental-implants-vs-dentures",
  optionAName: "Dental Implants",
  optionBName: "Dentures",

  // SEO & Metadata
  metaTitle: "Dental Implants vs Dentures Compared | DentaSmart's Best for You",
  metaDescription: "Compare dental implants and dentures on cost, comfort, and bone health. See which tooth replacement option is the right choice for your long-term oral health.",
  keywords: "dental implants vs dentures, implants vs dentures cost, are dental implants worth it, tooth replacement options, denture alternatives",

  // Hero Section
  heroTitle: "Dental Implants vs. Dentures:",
  heroHighlight: "Which is Right for You?",
  heroDescription: "Choosing between dental implants and dentures is a big decision. We'll break down the real differences in cost, comfort, and daily life to help you find the best fit for your smile.",

  // Stats Strip
  statsStrip: [
    { value: "Lifetime", label: "Implant Lifespan" },
    { value: "5-10 Years", label: "Denture Lifespan" },
    { value: "33K+", label: "Searches Per Month" },
  ],

  // Intro Section
  introTitle: "Beyond the Price Tag",
  introHighlight: "What really matters in the long run?",
  introDescription: "When you're missing teeth, you want a solution that feels natural and lasts. Dental implants offer a permanent, fixed solution that protects your jawbone. Dentures are a more affordable, removable option.",
  introDescription2: "This guide looks at the key trade-offs, from eating your favorite foods with confidence to long-term health, so you can make an informed choice.",

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
      optionA: "Can last a lifetime with proper care",
      optionB: "5-10 years before needing replacement",
      winner: "A",
    },
    {
      factor: "Bone Health",
      optionA: "Stimulates and preserves jawbone, preventing bone loss",
      optionB: "Does not stimulate the jaw, leading to bone deterioration over time",
      winner: "A",
    },
    {
      factor: "Eating & Speaking",
      optionA: "Functions like natural teeth with no restrictions",
      optionB: "May slip or click; requires adjusting to certain foods",
      winner: "A",
    },
    {
      factor: "Comfort & Fit",
      optionA: "Permanent and stable, feels like your own teeth",
      optionB: "Removable, can cause sore spots and require adhesives",
      winner: "A",
    },
    {
      factor: "Maintenance",
      optionA: "Brush and floss like natural teeth",
      optionB: "Requires daily removal for cleaning and soaking overnight",
      winner: "A",
    },
    {
      factor: "Appearance",
      optionA: "Custom-made to look and feel like your natural teeth",
      optionB: "Can look natural, but may not feel as integrated",
      winner: "tie",
    },
    {
      factor: "Candidacy",
      optionA: "Requires sufficient jawbone density and good overall health",
      optionB: "Fewer requirements, suitable for most patients",
      winner: "B",
    },
  ],

  // Pros and Cons
  optionAProsCons: [
    { text: "Permanent solution that can last a lifetime.", type: "pro" },
    { text: "Prevents jawbone loss and preserves your facial structure.", type: "pro" },
    { text: "No restrictions on eating or speaking.", type: "pro" },
    { text: "High initial investment.", type: "con" },
    { text: "Requires surgery and a healing period.", type: "con" },
    { text: "Not everyone is a candidate due to bone density.", type: "con" },
  ],
  optionBProsCons: [
    { text: "Lower upfront cost compared to implants.", type: "pro" },
    { text: "Non-invasive procedure with no surgery required.", type: "pro" },
    { text: "Can be a quick solution for missing teeth.", type: "pro" },
    { text: "Need to be replaced every 5-10 years.", type: "con" },
    { text: "Can be uncomfortable and may affect taste and speech.", type: "con" },
    { text: "Does not prevent bone loss in the jaw.", type: "con" },
  ],

  // Who Should Choose
  whoShouldChooseA: {
    title: "Who Should Choose Dental Implants?",
    description: "Implants are the gold standard for a reason. They are best for people who want a permanent, no-fuss solution that feels and functions just like natural teeth.",
    bestFor: [
      "Those prioritizing long-term health and bone preservation.",
      "People who want to eat anything without worry.",
      "Individuals looking for a permanent, fixed solution.",
      "Patients with sufficient jawbone to support the implant.",
    ],
  },
  whoShouldChooseB: {
    title: "Who Should Choose Dentures?",
    description: "Dentures are a practical and affordable choice, especially if you are missing multiple teeth. They offer a fast way to restore your smile and basic function.",
    bestFor: [
      "Those on a tighter budget.",
      "Individuals who are not candidates for dental surgery.",
      "People needing a solution for multiple missing teeth quickly.",
      "Patients who are okay with a removable appliance.",
    ],
  },

  // Bottom Line
  bottomLine: "Dental implants are a long-term investment in your health and quality of life, offering unmatched stability and bone preservation. Dentures provide a functional and affordable solution that can restore your smile quickly, but they require more maintenance and do not stop bone loss.",

  // FAQs
  faqs: [
    {
      q: "Are dental implants worth the cost?",
      a: "Yes, for many people they are. While the upfront cost is higher, their longevity and ability to prevent bone loss can make them more cost-effective over a lifetime. They also provide a better quality of life with fewer eating restrictions.",
    },
    {
      q: "How long do dentures last compared to implants?",
      a: "Dentures typically need to be replaced every 5 to 10 years due to wear and changes in your jaw shape. Dental implants, with proper care, can last a lifetime, as the titanium post integrates with your bone.",
    },
    {
      q: "Can I eat normally with dentures?",
      a: "You can eat most foods, but it takes practice. Chewy or hard foods can be challenging, and food particles can get trapped underneath. Implants allow you to eat anything you would with natural teeth.",
    },
    {
      q: "Does getting dental implants hurt?",
      a: "The procedure is done under local anesthesia, so you will not feel pain during the surgery. Most people report some soreness and discomfort for a few days afterward, which is manageable with over-the-counter pain medication.",
    },
    {
      q: "Why do dentures become loose?",
      a: "Dentures rest on your gums and jawbone. Over time, the jawbone shrinks from lack of stimulation, causing the denture to lose its fit. This is why dentures need frequent adjustments and eventual replacement.",
    },
    {
      q: "Am I a good candidate for dental implants?",
      a: "A good candidate has healthy gums and enough jawbone to anchor the implant. Your dentist will use a 3D scan to check your bone density. Even if you have some bone loss, a bone graft can often make implants possible.",
    },
  ],

  // Related Pages
  relatedPages: [
    { name: "Crown vs Veneer", href: "/comparisons/crown-vs-veneer", tagline: "Which restoration fits your needs?" },
    { name: "Braces vs Invisalign", href: "/comparisons/braces-vs-invisalign", tagline: "Compare two popular straightening options." },
    { name: "Dental Implant Cost", href: "/dental-costs/dental-implant-cost", tagline: "A full breakdown of implant expenses." },
    { name: "Dental Implant Procedure", href: "/treatments/dental-implant-procedure", tagline: "What to expect from the implant process." },
    { name: "Dentures Cost Guide", href: "/dental-costs/dentures-cost", tagline: "What dentures cost in 2026." },
  ],
};

export default function DentalImplantsVsDentures() {
  return <ComparisonPageTemplate data={data} />;
}
