import TreatmentPageTemplate, { TreatmentPageData } from "./TreatmentPageTemplate";

const data: TreatmentPageData = {
  slug: "tooth-extraction-procedure",
  procedureName: "Tooth Extraction",
  heroTitle: "What to Expect During a",
  heroHighlight: "Tooth Extraction",
  heroDescription: "Sometimes a tooth can't be saved. We'll walk you through why an extraction might be needed and what the process is like, from start to finish.",
  metaTitle: "Tooth Extraction Procedure: A Simple Guide | DentaSmart",
  metaDescription: "Need a tooth pulled? Learn the full extraction process step by step, recovery timeline, pain management tips, and aftercare instructions for a smooth recovery.",
  keywords: "tooth extraction, dental extraction, tooth removal, extraction procedure, oral surgery",
  statsStrip: [
    { value: "10 Million", label: "Extractions performed annually in the U.S." },
    { value: "90%", label: "Success rate for simple extractions." },
    { value: "1-2 Weeks", label: "Typical initial healing time." },
  ],
  whyNeededTitle: "Why You Might Need a",
  whyNeededHighlight: "Tooth Extraction",
  whyNeededDescription: "A tooth extraction is usually a last resort, but sometimes it's the best way to protect your overall oral health. This can happen if a tooth is severely decayed, broken beyond repair, or causing crowding. Impacted wisdom teeth are another common reason for removal.",
  whyNeededDescription2: "Infections, advanced gum disease, or preparing for orthodontic work can also make an extraction necessary. Removing a problem tooth can prevent pain and more serious issues down the road.",
  warningSignsTitle: "Signs You Might Need a Tooth Extraction",
  warningSigns: [
    "Severe, persistent toothache that doesn't go away.",
    "A tooth that is visibly broken or has a large cavity.",
    "Pain and swelling in your gums or jaw.",
    "Crowded teeth causing pressure or bite problems.",
    "An impacted wisdom tooth causing pain or infection.",
  ],
  timelineSteps: [
    {
      step: "1",
      title: "Consultation & X-Ray",
      description: "Your dentist examines the tooth and takes an X-ray to plan the extraction.",
      duration: "15-30 minutes",
    },
    {
      step: "2",
      title: "Numbing the Area",
      description: "Local anesthetic is applied to completely numb the tooth and surrounding gums. You'll feel pressure, but not pain.",
      duration: "5-10 minutes",
    },
    {
      step: "3",
      title: "The Extraction",
      description: "The dentist gently loosens and removes the tooth from its socket.",
      duration: "10-20 minutes",
    },
    {
      step: "4",
      title: "Closing the Site",
      description: "The area is cleaned, and gauze is placed to help a blood clot form. Stitches may be used if needed.",
      duration: "5 minutes",
    },
  ],
  risks: [
    {
      risk: "Dry Socket",
      detail: "This happens if the blood clot dislodges, exposing bone and nerves. It can be painful but is treatable.",
    },
    {
      risk: "Infection",
      detail: "Though uncommon with proper aftercare, signs include fever, swelling, and pus. Contact your dentist if this occurs.",
    },
    {
      risk: "Nerve Injury",
      detail: "Rarely, a nerve near the extraction site can be bruised, causing temporary numbness in the lip or chin.",
    },
    {
      risk: "Sinus Issues",
      detail: "For upper back teeth, there's a small chance of an opening into the sinus cavity, which usually heals on its own.",
    },
  ],
  recoveryTitle: "Your Recovery Plan",
  recoveryDescription: "Taking it easy for a couple of days is key. Follow these simple tips to help your mouth heal quickly and without issues.",
  recoveryTimeline: "1-2 weeks",
  recoveryTips: [
    {
      title: "Rest Up",
      description: "Avoid strenuous activity for the first 24-48 hours. Rest helps your body focus on healing the extraction site.",
    },
    {
      title: "Eat Soft Foods",
      description: "Stick to liquids and soft foods like yogurt, soup, and smoothies for a few days. Avoid chewing near the extraction site.",
    },
    {
      title: "Keep it Clean",
      description: "After 24 hours, you can gently rinse your mouth with warm salt water a few times a day to prevent infection.",
    },
  ],
  faqs: [
    {
      q: "Will the extraction hurt?",
      a: "You won't feel pain during the extraction because the area will be completely numb. You may feel some pressure, but your dentist will make sure you're comfortable.",
    },
    {
      q: "How long does it take to recover?",
      a: "Initial healing takes about 1-2 weeks for the gum tissue to close. The bone underneath will continue to heal for a few months.",
    },
    {
      q: "What can I eat after a tooth extraction?",
      a: "Stick to soft foods and liquids for the first few days. Things like yogurt, applesauce, and lukewarm soup are good choices.",
    },
    {
      q: "Can I brush my teeth after an extraction?",
      a: "Yes, you can brush your teeth, but be very gentle around the extraction site. Avoid spitting forcefully for the first 24 hours.",
    },
    {
      q: "Do I need to replace the extracted tooth?",
      a: "It depends on the tooth. Your dentist will discuss replacement options like dental implants or bridges if it's necessary to maintain your bite.",
    },
  ],
  relatedTreatmentPages: [
    { name: "Root Canal", slug: "root-canal-procedure", tagline: "Save a damaged tooth from extraction." },
    { name: "Dental Implant", slug: "dental-implant-procedure", tagline: "A permanent solution for a missing tooth." },
    { name: "Wisdom Teeth Removal", slug: "wisdom-teeth-removal", tagline: "Prevent future crowding and pain." },
    { name: "Dental Crown", slug: "dental-crown-procedure", tagline: "Protect and restore a weak or broken tooth." },
  ],
  relatedCostPage: { name: "Tooth Extraction Cost", slug: "tooth-extraction-cost" },
};

export default function ToothExtractionProcedure() {
  return <TreatmentPageTemplate data={data} />;
}
