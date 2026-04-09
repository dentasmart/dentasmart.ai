import EmergencyPageTemplate, { EmergencyPageData } from "./EmergencyPageTemplate";

const data: EmergencyPageData = {
  slug: "broken-tooth",
  emergencyName: "Broken Tooth",
  heroTitle: "First Aid for a",
  heroHighlight: "Broken Tooth",
  heroDescription: "A chipped or fractured tooth is a dental emergency. Follow these instructions for pain relief and to save your tooth.",
  metaTitle: "Broken Tooth: What to Do Right Now | DentaSmart",
  metaDescription: "Broke a tooth? Here is what to do right now, step by step. Learn when it is a real emergency, what a dentist can do, and how much treatment typically costs.",
  keywords: "broken tooth, chipped tooth, cracked tooth, fractured tooth, dental emergency, toothache",
  urgencyBanner: "A broken tooth needs immediate care. Call us now for guidance.",
  statsStrip: [
    { value: "5 per 100", label: "Adults experience a tooth fracture each year (PMC)" },
    { value: "80%", label: "Of people over 40 have at least one cracked tooth (NY Endodontist)" },
    { value: "Most Common", label: "Back teeth (molars) are the most likely to crack (Touro Dental)" },
  ],
  whatHappenedTitle: "Your Tooth is Broken.",
  whatHappenedHighlight: "What does that mean?",
  whatHappenedDescription: "A broken tooth can range from a small chip to a severe split. The type of break determines how urgent it is. A minor chip might just be a cosmetic issue. A deep fracture, however, can expose the nerve and lead to pain or infection. It’s crucial to know what to do right away.",
  whatHappenedDescription2: "The break could be a small chip, a larger fracture, a crack that runs down the tooth, or a full split. Each type requires different care, but the first steps are always the same: stay calm and manage the situation.",
  immediateSteps: [
    {
      step: "1",
      title: "Rinse Your Mouth",
      description: "Gently rinse your mouth with warm salt water (1/2 teaspoon of salt in a glass of water). This cleans the area and helps reduce swelling.",
      timing: "Immediately"
    },
    {
      step: "2",
      title: "Control Bleeding",
      description: "If there's bleeding, apply gentle pressure with a piece of sterile gauze or a wet tea bag for about 10 minutes.",
    },
    {
      step: "3",
      title: "Manage Pain",
      description: "Apply a cold compress to your cheek or lip over the broken tooth to reduce swelling and pain. Over-the-counter pain relievers can also help.",
    },
    {
      step: "4",
      title: "Save the Piece",
      description: "If you can find the broken piece of your tooth, save it. Rinse it with water and store it in a small container with milk or your own saliva.",
    },
    {
      step: "5",
      title: "Call a Dentist",
      description: "Contact a dentist immediately. Even if it doesn't hurt, the tooth is weakened and needs professional care to prevent further damage or infection.",
      timing: "ASAP"
    }
  ],
  warningSignsTitle: "How serious is it?",
  warningSigns: [
    { 
      sign: "Severe Pain", 
      detail: "Constant, throbbing pain could mean the nerve is exposed.",
      severity: "urgent"
    },
    { 
      sign: "Large Piece Missing", 
      detail: "A large fracture exposes the inner layers of the tooth, increasing infection risk.",
      severity: "urgent"
    },
    { 
      sign: "Numbness", 
      detail: "Numbness in the tooth or surrounding area can indicate nerve damage.",
      severity: "urgent"
    },
    { 
      sign: "Sharp Edges", 
      detail: "The remaining tooth is sharp and cutting your tongue or cheek.",
      severity: "moderate"
    },
    { 
      sign: "Minor Chip, No Pain", 
      detail: "A small chip without pain is less urgent, but still needs to be checked.",
      severity: "watch"
    }
  ],
  dosDonts: {
    dos: [
      "Keep the area clean with gentle rinsing.",
      "Use a cold compress to reduce swelling.",
      "Save any broken tooth fragments.",
      "Eat soft foods and avoid chewing on the affected side.",
      "Call your dentist as soon as possible."
    ],
    donts: [
      "Don't use superglue to try and reattach the piece.",
      "Don't chew hard or sticky foods.",
      "Don't poke or wiggle the broken tooth.",
      "Don't ignore it, even if there is no pain.",
      "Don't wait to see a dentist. Delay can lead to more complex problems."
    ]
  },
  whenToSeeTitle: "When to Get Help for a Broken Tooth",
  whenToSeeDescription: "Any broken tooth is a reason to see a dentist. Here’s how to know if you need an emergency appointment.",
  whenToSeeItems: [
    "You are in severe pain.",
    "The tooth is bleeding and it won't stop.",
    "A large piece of the tooth has broken off.",
    "You see a red or pink spot on the broken tooth (the pulp).",
    "The tooth is now loose or has shifted."
  ],
  faqs: [
    {
      q: "Can a broken tooth heal on its own?",
      a: "No, a broken tooth cannot heal itself. It requires professional dental treatment to repair the structure and prevent infection. Ignoring it can lead to bigger problems later."
    },
    {
      q: "What will a dentist do for a broken tooth?",
      a: "Treatment depends on the severity. It can range from simple bonding for a small chip, to a dental crown for a larger fracture, or a root canal if the nerve is damaged."
    },
    {
      q: "How can I protect my tooth until I see the dentist?",
      a: "You can cover the sharp edge with dental wax, which you can find at most pharmacies. Avoid chewing on that side of your mouth and stick to soft foods."
    },
    {
      q: "Is a cracked tooth the same as a broken tooth?",
      a: "They are similar. A crack is a split that hasn't fully broken off a piece of the tooth yet. Both are serious and need dental attention. Sometimes a crack is invisible."
    },
    {
      q: "How much will it cost to fix a broken tooth?",
      a: "The cost varies widely based on the treatment needed. A simple bonding is less expensive than a root canal and crown. Check our dental cost pages for more information."
    }
  ],
  relatedEmergencyPages: [
    { name: "Knocked-Out Tooth", slug: "knocked-out-tooth", tagline: "What to do when a tooth is completely out." },
    { name: "Severe Toothache", slug: "severe-toothache", tagline: "Pain is a signal you can't ignore." },
    { name: "Dental Abscess", slug: "dental-abscess", tagline: "A serious infection that needs immediate care." },
    { name: "Emergency Guide", slug: "dental-emergency-guide", tagline: "Your main resource for all dental emergencies." }
  ],
  relatedCostPage: { name: "Dental Crown Cost", slug: "dental-crown-cost" },
  relatedTreatmentPage: { name: "Dental Crown Procedure", slug: "dental-crown-procedure" }
};

export default function BrokenTooth() {
  return <EmergencyPageTemplate data={data} />;
}
