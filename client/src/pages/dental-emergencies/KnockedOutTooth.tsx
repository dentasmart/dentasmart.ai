import EmergencyPageTemplate, { EmergencyPageData } from "@/pages/dental-emergencies/EmergencyPageTemplate";

const data: EmergencyPageData = {
  slug: "knocked-out-tooth",
  emergencyName: "Knocked Out Tooth",
  heroTitle: "First Aid for a",
  heroHighlight: "Knocked Out Tooth",
  heroDescription: "You have a short window to save your tooth. Follow these instructions carefully. Your quick action can make all the difference.",
  metaTitle: "Knocked Out Tooth Guide: What To Do In The First 30 Minutes",
  metaDescription: "Act fast! Our emergency guide for a knocked-out (avulsed) tooth tells you exactly what to do to save it, including handling, storage, and when to see a dentist.",
  keywords: "knocked out tooth, avulsed tooth, save a tooth, tooth fell out, dental emergency, tooth in milk",
  urgencyBanner: "Knocked out tooth? Call us immediately. Time is critical.",
  statsStrip: [
    { value: "< 30 Mins", label: "To Save The Tooth" },
    { value: "5 Million+", label: "Teeth Knocked Out Annually" },
    { value: "Top 5", label: "Most Common Dental Emergency" },
  ],
  whatHappenedTitle: "Understanding a",
  whatHappenedHighlight: "Knocked Out Tooth",
  whatHappenedDescription:
    "A knocked-out, or avulsed, tooth is a complete displacement of a tooth from its socket in the jawbone. This is a serious dental emergency. The ligaments, nerves, and blood vessels that hold the tooth in place are severed.",
  whatHappenedDescription2:
    "The goal is to get the tooth back into its socket as soon as possible. The cells on the tooth’s root can only survive for a short time. Quick and correct action is your best chance for successful reimplantation.",
  immediateSteps: [
    {
      step: "1",
      title: "Find the Tooth",
      description: "Locate the tooth immediately. Pick it up by the crown (the chewing surface), not the root. Touching the root can damage the cells needed for it to reattach.",
      timing: "Critical"
    },
    {
      step: "2",
      title: "Clean the Tooth Gently",
      description: "If the tooth is dirty, rinse it for a few seconds with cold milk or your own saliva. Do not use water, soap, or scrub it. Don’t wrap it in a tissue or cloth.",
    },
    {
      step: "3",
      title: "Replant the Tooth (If Possible)",
      description: "Try to place the tooth back into its socket. Gently push it in with your fingers, or position it above the socket and close your mouth slowly. Hold it in place by biting down on a clean cloth or gauze.",
      timing: "Within 5-10 Mins"
    },
    {
      step: "4",
      title: "Keep the Tooth Moist",
      description: "If you can't replant it, you must keep it moist. Place it in a small container of milk. If milk isn't available, keep it in your mouth, between your cheek and gum. Do not use water.",
    },
    {
      step: "5",
      title: "See a Dentist Immediately",
      description: "You need to see a dentist within 30-60 minutes. The sooner you get professional help, the higher the chance of saving your tooth. Call for an emergency appointment right away.",
      timing: "Within 30 Mins"
    }
  ],
  immediateStepsNote: "For a baby tooth, do not try to replant it. This can damage the developing permanent tooth underneath. See a dentist, but replanting is not recommended.",
  warningSignsTitle: "Assess the Situation",
  warningSigns: [
    {
      sign: "Loss of Consciousness",
      detail: "If you were hit in the head and lost consciousness, go to the ER first.",
      severity: "urgent",
    },
    {
      sign: "Jaw Fracture",
      detail: "If your jaw is misaligned or you can't close your mouth properly, this is a major issue.",
      severity: "urgent",
    },
    {
      sign: "Uncontrolled Bleeding",
      detail: "If bleeding from the socket won't stop after 10-15 minutes of pressure.",
      severity: "moderate",
    },
    {
      sign: "Other Facial Injuries",
      detail: "Cuts to your lips, gums, or face may need attention.",
      severity: "watch",
    },
  ],
  dosDonts: {
    dos: [
      "Handle the tooth by the crown only.",
      "Keep the tooth moist at all times.",
      "Try to put it back in the socket.",
      "Use milk for storage if you can't replant.",
      "Call an emergency dentist immediately.",
    ],
    donts: [
      "Don't touch the root of the tooth.",
      "Don't let the tooth dry out.",
      "Don't scrub or clean the tooth with soap or chemicals.",
      "Don't store the tooth in water.",
      "Don't wait to see a dentist.",
    ],
  },
  whenToSeeTitle: "When to Get Help for a Knocked Out Tooth",
  whenToSeeDescription: "A knocked-out tooth is always a reason to see a dentist. Here is what to look for.",
  whenToSeeItems: [
    "The tooth is a permanent adult tooth.",
    "You cannot get the tooth back into the socket.",
    "You have other signs of facial trauma, like heavy bleeding or a possible broken jaw.",
    "It is a baby tooth (do not replant, but still see a dentist).",
  ],
  faqs: [
    {
      q: "Why is the 30-minute window so important?",
      a: "The cells on the root of the tooth begin to die quickly once it's out of your mouth. After 30-60 minutes, the chances of successful reimplantation drop significantly. Acting fast is the best way to save your tooth.",
    },
    {
      q: "What will the dentist do?",
      a: "The dentist will assess the tooth and your mouth. If the tooth is viable, they will clean it, place it back in the socket, and use a flexible splint to hold it in place for a few weeks while it heals.",
    },
    {
      q: "What if it's a baby tooth that got knocked out?",
      a: "You should not try to put a baby tooth back in. Doing so can damage the permanent tooth that is still growing under the gums. You should still see a dentist to check for other injuries.",
    },
    {
      q: "What is the long-term prognosis for a replanted tooth?",
      a: "It depends on how quickly and properly the tooth was handled. Many replanted teeth can last for years. However, some may darken or need a root canal later on. Your dentist will monitor the tooth over time.",
    },
    {
      q: "Does it hurt to have a tooth replanted?",
      a: "Your dentist will likely numb the area before they work on it, so you shouldn't feel pain during the procedure. The area will be sore afterwards, and you can manage this with over-the-counter pain relievers.",
    },
  ],
  relatedEmergencyPages: [
    { name: "Broken or Chipped Tooth", slug: "broken-tooth", tagline: "Fractured a tooth? Here is what to do." },
    { name: "Severe Toothache", slug: "severe-toothache", tagline: "Pain can be a sign of a serious problem." },
    { name: "Dental Abscess", slug: "dental-abscess", tagline: "A pocket of pus that can be dangerous." },
    { name: "Emergency Guide", slug: "dental-emergency-guide", tagline: "Not sure what to do? Start here." },
  ],
  relatedCostPage: { name: "Dental Implant Cost", slug: "dental-implant-cost" },
  relatedTreatmentPage: { name: "Root Canal Procedure", slug: "root-canal-procedure" },
};

export default function KnockedOutTooth() {
  return <EmergencyPageTemplate data={data} />;
}
