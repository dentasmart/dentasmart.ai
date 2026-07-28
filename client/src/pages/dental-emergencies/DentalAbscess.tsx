import React from "react";
import EmergencyPageTemplate, { EmergencyPageData } from "./EmergencyPageTemplate";
import { Link } from "wouter";

const data: EmergencyPageData = {
  slug: "dental-abscess",
  emergencyName: "Dental Abscess",
  heroTitle: "Severe Tooth Infection:",
  heroHighlight: "Act Fast to Stop It Spreading",
  heroDescription: "A dental abscess is a pocket of pus caused by a bacterial infection. It can spread to your jaw, neck, or brain if left untreated. Do not ignore this pain.",
  metaTitle: "Dental Abscess: Symptoms, Risks & Emergency Treatment",
  metaDescription: "A dental abscess will not go away on its own. Learn the warning signs, what to do before you can see a dentist, and why fast treatment prevents serious harm.",
  keywords: "dental abscess, tooth infection, swollen jaw, tooth abscess, emergency dentist, root canal, tooth extraction, sepsis from tooth",
  urgencyBanner: "Swelling in your face, neck, or trouble breathing? Go to the nearest ER immediately.",
  statsStrip: [
    { value: "2M+", label: "Dental ER Visits Yearly" },
    { value: "27%", label: "Adults with Untreated Decay" },
    { value: "100%", label: "Require Professional Care" }
  ],
  whatHappenedTitle: "What is a",
  whatHappenedHighlight: "Dental Abscess?",
  whatHappenedDescription: "An abscess forms when bacteria infect the center of your tooth (the pulp) or the gums. This creates a painful pocket of pus. The infection will not go away on its own.",
  whatHappenedDescription2: "Without treatment, the infection can spread to your jawbone, surrounding tissues, and even your bloodstream, causing a life-threatening condition called sepsis.",
  whatHappenedNote: (
    <>
      Most abscesses start with decay that was caught too late. Understanding what causes <Link href="/oral-health-hub/what-causes-rotten-teeth/" className="text-primary underline hover:text-primary/80">rotten teeth</Link> can help you spot the warning signs earlier. Interestingly, <Link href="/oral-health-hub/what-are-white-spots-on-teeth/" className="text-primary underline hover:text-primary/80">white spots on teeth</Link> are often the first visible sign of enamel breakdown before decay sets in. If you've been putting off a filling because you're unsure what's involved, our guide to <Link href="/oral-health-hub/is-getting-a-tooth-filling-really-that-big-of-a-deal/" className="text-primary underline hover:text-primary/80">tooth fillings</Link> explains why acting early is almost always the simpler and cheaper option.
    </>
  ),
  immediateSteps: [
    {
      step: "1",
      title: "Call an Emergency Dentist",
      description: "You need professional treatment to drain the infection and prescribe antibiotics. Call right away.",
      timing: "Immediately"
    },
    {
      step: "2",
      title: "Rinse with Salt Water",
      description: "Mix half a teaspoon of salt in warm water. Rinse gently to help draw out pus and soothe the area.",
      timing: "Every few hours"
    },
    {
      step: "3",
      title: "Take Pain Relievers",
      description: "Use over-the-counter pain medicine like ibuprofen or acetaminophen to manage the pain.",
      timing: "As needed"
    },
    {
      step: "4",
      title: "Apply a Cold Compress",
      description: "If your face is swollen, hold an ice pack wrapped in a towel to your cheek for 15 minutes at a time.",
      timing: "15 mins on/off"
    },
    {
      step: "5",
      title: "Keep Your Head Elevated",
      description: "Prop your head up with pillows when resting to reduce pressure and throbbing pain.",
      timing: "While resting"
    }
  ],
  immediateStepsNote: "Do not try to pop or drain the abscess yourself. This can push the infection deeper.",
  warningSignsTitle: "Signs the Infection is Spreading",
  warningSigns: [
    {
      sign: "Difficulty Breathing or Swallowing",
      detail: "The infection may be blocking your airway. Go to the ER now.",
      severity: "urgent"
    },
    {
      sign: "Severe Facial or Neck Swelling",
      detail: "Swelling that spreads beyond your mouth is a sign of a dangerous infection.",
      severity: "urgent"
    },
    {
      sign: "Fever and Chills",
      detail: "A high fever indicates the infection has entered your system.",
      severity: "urgent"
    },
    {
      sign: "Rapid Heart Rate or Confusion",
      detail: "These are warning signs of sepsis, a life-threatening response to infection.",
      severity: "urgent"
    },
    {
      sign: "Foul Taste or Sudden Pain Relief",
      detail: "The abscess may have ruptured. You still need immediate dental care to clean the area.",
      severity: "moderate"
    }
  ],
  dosDonts: {
    dos: [
      "Call a dentist immediately",
      "Rinse with warm salt water",
      "Take over-the-counter pain relievers",
      "Use a cold compress for swelling",
      "Eat soft foods on the opposite side"
    ],
    donts: [
      "Do not try to pop or drain the abscess",
      "Do not put aspirin directly on your gums",
      "Do not ignore the pain or swelling",
      "Do not eat hard, crunchy, or hot foods",
      "Do not stop taking prescribed antibiotics early"
    ]
  },
  whenToSeeTitle: "When to Seek Emergency Care",
  whenToSeeDescription: "A dental abscess is always an emergency. Knowing where to go can save your life.",
  whenToSeeItems: [
    "Go to the ER if you have trouble breathing or swallowing.",
    "Go to the ER if swelling spreads to your neck or eye.",
    "Go to the ER if you have a high fever or feel confused.",
    "See an emergency dentist today for severe, throbbing tooth pain.",
    "See a dentist even if the abscess ruptures and the pain stops."
  ],
  faqs: [
    {
      q: "Will a dental abscess go away on its own?",
      a: "No. The infection will not heal without professional treatment. Even if the pain stops, the infection is still there and can spread."
    },
    {
      q: "Do I need a root canal or an extraction?",
      a: "It depends on the damage. A root canal can save the tooth by removing the infected pulp. If the tooth cannot be saved, it must be extracted."
    },
    {
      q: "Can I just take antibiotics?",
      a: "Antibiotics alone will not cure an abscess. The source of the infection must be removed by draining the pus and treating the tooth."
    },
    {
      q: "What are the signs of sepsis from a tooth infection?",
      a: "Signs include a high fever, rapid heart rate, confusion, shortness of breath, and extreme pain. Sepsis is a medical emergency."
    },
    {
      q: "How can I prevent a dental abscess?",
      a: "Brush twice a day, floss daily, and see your dentist for regular checkups. Treat cavities early before they reach the center of the tooth."
    }
  ],
  relatedEmergencyPages: [
    { name: "Severe Toothache", slug: "severe-toothache", tagline: "Stop the pain now" },
    { name: "Broken Tooth", slug: "broken-tooth", tagline: "Save your damaged tooth" },
    { name: "Knocked Out Tooth", slug: "knocked-out-tooth", tagline: "Act within 30 minutes" }
  ],
  relatedCostPage: { name: "Root Canal Cost", slug: "root-canal-cost" },
  relatedTreatmentPage: { name: "Root Canal Procedure", slug: "root-canal-procedure" }
};

export default function DentalAbscess() {
  return <EmergencyPageTemplate data={data} />;
}
