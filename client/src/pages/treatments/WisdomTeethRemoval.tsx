import TreatmentPageTemplate, { TreatmentPageData } from "./TreatmentPageTemplate";

const data: TreatmentPageData = {
  slug: "wisdom-teeth-removal",
  procedureName: "Wisdom Teeth Removal",
  heroTitle: "Understanding Your",
  heroHighlight: "Wisdom Teeth Removal",
  heroDescription: "Getting your wisdom teeth out is a common dental procedure. This guide explains what to expect from start to finish, so you can feel prepared.",
  metaTitle: "Wisdom Teeth Removal: A Simple Guide to the Procedure",
  metaDescription: "Learn about the wisdom teeth removal process, from initial consultation to recovery. Find out what to expect, the risks, and how to care for yourself afterward.",
  keywords: "wisdom teeth removal, third molar extraction, dental surgery, oral surgery",
  statsStrip: [
    { value: "90%", label: "of people have at least one impacted wisdom tooth" },
    { value: "5 million", label: "people have their wisdom teeth removed each year in the U.S." },
    { value: "7 days", label: "is the typical initial recovery time" },
  ],
  whyNeededTitle: "Why You Might Need a",
  whyNeededHighlight: "Wisdom Teeth Removal",
  whyNeededDescription: "Wisdom teeth, or third molars, are the last adult teeth to come into your mouth. Most people have four, one in each back corner. When they don't have enough room to grow properly, they can cause problems. This is called being 'impacted'.",
  whyNeededDescription2: "Impacted wisdom teeth can lead to pain, damage to other teeth, cysts, and gum problems. Removing them can prevent these issues before they start or fix them if they've already begun.",
  warningSignsTitle: "Signs You Might Need Your Wisdom Teeth Out",
  warningSigns: [
    "Pain or jaw stiffness near the back of your mouth.",
    "Irritation or pain from a tooth coming in at an odd angle.",
    "A flap of gum tissue growing over the tooth, trapping food and germs.",
    "Crowding of your other teeth.",
    "Swollen or tender gums in the back of your mouth.",
  ],
  timelineSteps: [
    {
      step: "1",
      title: "Consultation and X-rays",
      description: "Your dentist will examine your mouth and take x-rays to see the position of your wisdom teeth.",
      duration: "30-45 minutes",
    },
    {
      step: "2",
      title: "Anesthesia",
      description: "You'll receive anesthesia so you won't feel pain. This could be local anesthesia, sedation, or general anesthesia, depending on your case.",
      duration: "10-15 minutes",
    },
    {
      step: "3",
      title: "The Extraction",
      description: "The dentist or oral surgeon will open the gum tissue over the tooth and remove any bone that is covering it. They will then remove the tooth, sometimes in sections.",
      duration: "20-60 minutes",
    },
    {
      step: "4",
      title: "Stitching the Site",
      description: "The site will be stitched closed to help it heal. These stitches usually dissolve on their own after a few days.",
      duration: "5-10 minutes",
    },
    {
      step: "5",
      title: "Initial Recovery",
      description: "You'll rest in a recovery room as the anesthesia wears off. You'll get instructions for care at home before you leave.",
      duration: "20-30 minutes",
    },
  ],
  risks: [
    {
      risk: "Dry Socket",
      detail: "This happens if the blood clot that forms in the socket dislodges. It can be painful, but your dentist can treat it easily.",
    },
    {
      risk: "Nerve Injury",
      detail: "It's rare, but the nerve near the wisdom tooth can be bruised. This can cause temporary numbness in your lip, chin, or tongue.",
    },
    {
      risk: "Infection",
      detail: "Signs include fever, swelling that gets worse, and pus from the socket. Following your dentist's aftercare instructions helps prevent this.",
    },
    {
      risk: "Sinus Issues",
      detail: "If upper wisdom teeth are removed, it can sometimes open a small hole into the sinus cavity, which usually heals on its own.",
    },
  ],
  recoveryTitle: "Your Recovery Plan",
  recoveryDescription: "Taking care of yourself after the procedure is key to a smooth recovery. Here are a few things to keep in mind.",
  recoveryTimeline: "1-2 weeks",
  recoveryTips: [
    {
      title: "Eat Soft Foods",
      description: "Stick to liquids and soft foods like soup, yogurt, and mashed potatoes for the first few days. Avoid hard, crunchy, or spicy foods.",
    },
    {
      title: "Keep it Clean",
      description: "Don't brush the area for the first 24 hours. After that, you can gently rinse your mouth with warm salt water a few times a day.",
    },
    {
      title: "Manage Swelling",
      description: "Use an ice pack on your cheek for 20 minutes on, then 20 minutes off, for the first day. This will help reduce swelling and bruising.",
    },
  ],
  faqs: [
    {
      q: "How long does the procedure take?",
      a: "The extraction itself usually takes 20 to 60 minutes. Your total time at the office will be longer to account for check-in and recovery.",
    },
    {
      q: "Will I be in pain?",
      a: "You won't feel pain during the procedure because of the anesthesia. You will have some soreness and swelling afterward, which can be managed with pain medication.",
    },
    {
      q: "When can I go back to work or school?",
      a: "Most people take 2-3 days off to rest and recover. You should avoid strenuous activity for about a week to prevent dislodging the blood clot.",
    },
    {
      q: "Do I have to be put to sleep?",
      a: "Not always. Many people just get local anesthesia, which numbs the area. Your dentist will discuss the best option for you based on your situation.",
    },
    {
      q: "What if I don't get my wisdom teeth removed?",
      a: "If your wisdom teeth are impacted and causing problems, leaving them in can lead to more serious issues like infection, cysts, and damage to nearby teeth.",
    },
  ],
  relatedTreatmentPages: [
    { name: "Root Canal Procedure", slug: "root-canal-procedure", tagline: "Save your natural tooth." },
    { name: "Dental Implant Procedure", slug: "dental-implant-procedure", tagline: "A permanent solution for missing teeth." },
    { name: "Dental Crown Procedure", slug: "dental-crown-procedure", tagline: "Restore the shape and strength of a tooth." },
    { name: "Tooth Extraction Procedure", slug: "tooth-extraction-procedure", tagline: "When a tooth needs to be removed." },
  ],
  relatedCostPage: { name: "Wisdom Teeth Removal Cost", slug: "wisdom-teeth-removal-cost" },
};

export default function WisdomTeethRemoval() {
  return <TreatmentPageTemplate data={data} />;
}
