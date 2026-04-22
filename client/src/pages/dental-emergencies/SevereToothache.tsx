import EmergencyPageTemplate, { EmergencyPageData } from "./EmergencyPageTemplate";

const data: EmergencyPageData = {
  slug: "severe-toothache",
  emergencyName: "Severe Toothache",
  heroTitle: "What to Do With a Severe Toothache",
  heroHighlight: "That Won't Go Away",
  heroDescription: "Don't ignore a severe toothache. Learn what to do right now for pain relief, what home remedies work, and the warning signs that mean you need urgent dental care.",
  metaTitle: "Severe Toothache: Immediate Steps & When to See a Dentist",
  metaDescription: "Severe toothache keeping you up at night? Learn what causes intense tooth pain, when to see a dentist urgently, and reliable ways to manage pain at home.",
  keywords: "severe toothache, tooth pain relief, dental emergency, toothache what to do, abscessed tooth, tooth infection signs",
  urgencyBanner: "In severe pain? Call our 24/7 dental line for immediate guidance.",

  statsStrip: [
    { value: "40%+", label: "of adults have had mouth pain in the last year" },
    { value: "2M+", label: "ER visits for dental pain annually in the U.S." },
    { value: "25.9%", label: "of adults (20-44) have untreated tooth decay" },
  ],

  whatHappenedTitle: "Why Does My Tooth Hurt So Much?",
  whatHappenedHighlight: "Understanding the Pain",
  whatHappenedDescription: "A severe toothache is your body's alarm system. It's signaling a problem that needs attention. The pain usually comes from the dental pulp, the inner part of your tooth, which is full of nerves and blood vessels. When it gets inflamed or infected, the pressure builds up inside the tooth, causing intense pain.",
  whatHappenedDescription2: "Common causes include deep cavities that have reached the pulp, a cracked tooth that lets bacteria in, advanced gum disease, or a dental abscess, which is a pocket of pus from an infection.",

  immediateSteps: [
    {
      step: "1",
      title: "Rinse with Warm Salt Water",
      description: "Dissolve 1/2 teaspoon of salt in 8 ounces of warm water. Swish it around your mouth for 30 seconds, then spit it out. This can help clean the area and reduce swelling.",
      timing: "Immediately"
    },
    {
      step: "2",
      title: "Take Over-the-Counter Pain Relievers",
      description: "Ibuprofen (Advil, Motrin) is often effective because it reduces inflammation. Acetaminophen (Tylenol) can also help with pain. Follow the package directions and do not exceed the recommended dose.",
      timing: "As needed for pain"
    },
    {
      step: "3",
      title: "Apply a Cold Compress",
      description: "Wrap a bag of ice or a cold pack in a towel and apply it to your cheek outside the painful area for 20 minutes at a time. This can help numb the area and reduce swelling.",
    },
    {
      step: "4",
      title: "Call a Dentist",
      description: "This is the most important step. A severe toothache will not go away on its own. Call a dental office, explain your symptoms, and schedule an emergency appointment.",
      timing: "Key Step"
    },
  ],

  warningSignsTitle: "Pain & Infection Red Flags",
  warningSigns: [
    {
      sign: "Fever, Swelling, or Trouble Breathing",
      detail: "These are signs the infection may be spreading. This is a medical emergency.",
      severity: "urgent",
    },
    {
      sign: "Pimple-like Bump on Your Gum",
      detail: "This could be a fistula, a sign of a dental abscess trying to drain.",
      severity: "urgent",
    },
    {
      sign: "Pain That Suddenly Stops",
      detail: "Don't be fooled. A sudden stop in throbbing pain could mean the nerve has died, but the infection is still present and spreading.",
      severity: "urgent",
    },
    {
      sign: "Pain When You Bite Down",
      detail: "This often points to a problem at the root of the tooth, like an abscess or a crack.",
      severity: "moderate",
    },
    {
      sign: "Constant, Throbbing Pain",
      detail: "Pain that keeps you awake at night needs to be evaluated by a dentist soon.",
      severity: "moderate",
    },
  ],

  dosDonts: {
    dos: [
      "Rinse with warm salt water.",
      "Use a cold compress on your cheek.",
      "Take anti-inflammatory pain medication like ibuprofen.",
      "Keep your head elevated to reduce pressure.",
      "Call your dentist as soon as possible.",
    ],
    donts: [
      "Don't place aspirin directly on the tooth or gums.",
      "Don't use heat, as it can make inflammation worse.",
      "Don't ignore the pain, even if it comes and goes.",
      "Don't eat hard, chewy, or very hot/cold foods.",
      "Don't wait to see if it gets better on its own.",
    ],
  },

  whenToSeeTitle: "When You Must See a Dentist",
  whenToSeeDescription: "A severe toothache always requires a dental visit. Here are the signs that you need to be seen right away.",
  whenToSeeItems: [
    "The pain is severe, throbbing, and hasn't improved with pain medication.",
    "You have swelling in your face, cheek, or gums.",
    "You have a fever or feel generally unwell.",
    "You see a bump on your gum near the painful tooth.",
    "You have a bad taste in your mouth that won't go away.",
  ],

  faqs: [
    {
      q: "What will the dentist do for a severe toothache?",
      a: "The dentist will first take an X-ray to diagnose the problem. Treatment depends on the cause. It could be a filling for a cavity, a root canal if the pulp is infected, or an extraction if the tooth can't be saved. They will also address any infection with antibiotics if needed.",
    },
    {
      q: "Can a severe toothache go away on its own?",
      a: "No. The underlying cause of the pain, like an infection or a deep cavity, will not resolve by itself. While the pain might temporarily fade, the problem will only get worse and can lead to more serious health issues.",
    },
    {
      q: "Is it okay to go to the ER for a toothache?",
      a: "You should go to the ER if you have signs of a spreading infection, like a high fever, facial swelling, or difficulty breathing or swallowing. The ER can manage the infection but cannot fix the tooth. You will still need to see a dentist.",
    },
    {
      q: "How much does an emergency dental visit cost?",
      a: "Costs vary widely based on your location, insurance, and what treatment is needed. An exam and X-ray might cost $100-$300, while treatments like a root canal or extraction will be more. Check our cost pages for more details.",
    },
    {
      q: "What's the best painkiller for a toothache?",
      a: "For most dental pain, non-steroidal anti-inflammatory drugs (NSAIDs) like ibuprofen (Advil, Motrin) are most effective because they target both pain and inflammation. Always follow the dosage on the label.",
    },
  ],

  relatedEmergencyPages: [
    { name: "Dental Abscess", slug: "dental-abscess", tagline: "Pus, pain, and swelling." },
    { name: "Broken or Cracked Tooth", slug: "broken-tooth", tagline: "Repairing chips and fractures." },
    { name: "Knocked-Out Tooth", slug: "knocked-out-tooth", tagline: "Time is critical. Act fast." },
    { name: "Emergency Guide", slug: "dental-emergency-guide", tagline: "Not sure what to do? Start here." },
  ],
  relatedCostPage: { name: "Root Canal Cost", slug: "root-canal-cost" },
  relatedTreatmentPage: { name: "Root Canal Procedure", slug: "root-canal-procedure" },
};

export default function SevereToothachePage() {
  return <EmergencyPageTemplate data={data} />;
}
