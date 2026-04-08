import LifestyleTemplate, { LifestylePageData } from "./LifestyleTemplate";

const data: LifestylePageData = {
  slug: "oral-piercing-risks",
  topic: "Oral Piercing Risks",
  heroTitle: "That Cool Piercing",
  heroHighlight: "Could Cost You Your Smile",
  heroDescription: "Tongue, lip, and cheek piercings look cool, but they can cause serious dental problems. We will help you understand the risks so you can protect your oral health.",
  metaTitle: "Oral Piercing Risks: How They Damage Teeth & Gums | DentaSmart",
  metaDescription: "Learn how tongue, lip, and cheek piercings can lead to chipped teeth, gum recession, infections, and nerve damage. Protect your smile with DentaSmart.",
  keywords: "oral piercing risks, tongue piercing teeth damage, lip piercing gum recession, chipped tooth from piercing, dental problems from piercings",
  statsStrip: [
    { value: "47%", label: "of people with tongue piercings have tooth damage" },
    { value: "1 in 4", label: "lip piercings leads to gum recession" },
    { value: "Up to 20%", label: "of oral piercings result in infection" },
  ],
  overviewTitle: "The Hidden Dangers",
  overviewHighlight: "of Oral Piercings",
  overviewDescription: "You love your new piercing, and it’s a great way to express yourself. But the jewelry in your mouth is a foreign object, and it’s constantly rubbing against your teeth and gums. This can lead to problems you might not expect, from small chips to serious infections.",
  overviewDescription2: "Understanding these risks is the first step toward enjoying your piercing without sacrificing your smile. We are here to guide you on how to keep your mouth healthy.",
  impacts: [
    { area: "Chipped or Cracked Teeth", detail: "Constantly clicking or biting on metal jewelry can fracture your teeth. This might require a filling or even a crown." },
    { area: "Gum Recession", detail: "Jewelry rubbing against your gums can cause them to pull away from your teeth, exposing the root and increasing sensitivity." },
    { area: "Infection and Swelling", detail: "Your mouth is full of bacteria. A new piercing is an open wound, making it easy for infections to start, which can be painful and serious." },
    { area: "Nerve Damage", detail: "A piercing, especially in the tongue, can damage a nerve. This could lead to temporary or even permanent numbness or changes in taste." },
    { area: "Allergic Reactions", detail: "Some people are allergic to the metals used in jewelry, like nickel. This can cause redness, itching, and irritation around the piercing site." },
    { area: "Interference with Dental Care", detail: "Jewelry can block X-rays and make it harder for your dentist to spot problems during an exam." },
  ],
  doList: [
    { text: "Choose a reputable and licensed piercing professional." },
    { text: "Follow all aftercare instructions carefully to prevent infection." },
    { text: "Use smaller, lighter jewelry made from high-quality, non-toxic materials like titanium or surgical steel." },
    { text: "Check the tightness of your jewelry daily to ensure it does not become a choking hazard." },
    { text: "Maintain excellent oral hygiene by brushing and flossing daily." },
    { text: "Schedule regular dental check-ups to monitor for any potential issues." },
  ],
  dontList: [
    { text: "Don't play with the jewelry or click it against your teeth." },
    { text: "Don't get a piercing if you have a history of gum disease or other oral health problems." },
    { text: "Don't use alcohol-based mouthwash, which can irritate the piercing site." },
    { text: "Don't ignore signs of infection like increased pain, swelling, or discharge." },
    { text: "Don't change the jewelry until the piercing is fully healed." },
    { text: "Don't share drinks or utensils while your piercing is healing." },
  ],
  protectionTips: [
    { title: "Opt for Plastic Jewelry", description: "Consider using jewelry made of acrylic or Bioplast instead of metal to reduce the risk of tooth damage." },
    { title: "Remove Jewelry During Sports", description: "Take out your piercing before playing sports or any activity where it might get caught or cause injury." },
    { title: "Be Gentle When Eating", description: "Eat slowly and carefully to avoid biting down on the jewelry." },
    { title: "Downsize the Jewelry Post", description: "Once the initial swelling goes down, ask your piercer to switch to a shorter post to minimize contact with teeth and gums." },
    { title: "Check for Tightness", description: "Regularly check that the balls on your jewelry are screwed on tight to prevent swallowing or inhaling them." },
  ],
  warningSignsTitle: "When to See a Dentist or Doctor",
  warningSignsDescription: "If you notice any of these signs, don\'t wait. Contact your dentist or doctor right away to prevent more serious complications.",
  warningSigns: [
    "Persistent pain, redness, or swelling around the piercing.",
    "Yellow or green discharge from the piercing site.",
    "A fever, chills, or other signs of a body-wide infection.",
    "Noticeable changes in your gums, like pulling away from your teeth.",
    "A chip, crack, or new sensitivity in any of your teeth.",
    "Numbness or loss of taste that doesn\'t go away.",
  ],
  faqs: [
    { q: "Can I get a piercing if I have braces?", a: "It\'s generally not recommended. The jewelry can get caught on the brackets and wires, increasing the risk of injury to your mouth and damage to your braces." },
    { q: "How long does an oral piercing take to heal?", a: "Healing times vary. Tongue piercings can take 4 to 6 weeks, while lip piercings may take 6 to 8 weeks. Complete healing can sometimes take up to 6 months." },
    { q: "What should I eat after getting a tongue piercing?", a: "Stick to soft, cold foods for the first few days, like yogurt, ice cream, and smoothies. Avoid spicy, salty, or acidic foods that can irritate the new piercing." },
    { q: "Will a tongue piercing affect my speech?", a: "You might have a slight lisp or difficulty with certain sounds at first. Most people adapt quickly, and speech returns to normal as the swelling subsides and you get used to the jewelry." },
    { q: "Is it possible for the piercing hole to close up?", a: "Yes, especially if the jewelry is removed for an extended period. The mouth heals quickly, and the hole can close up in a matter of hours or days, depending on how long you\'ve had the piercing." },
  ],
  relatedLifestylePages: [
    { name: "Smoking & Oral Health", slug: "smoking-and-oral-health", tagline: "How smoking impacts your teeth and gums." },
    { name: "Diabetes & Dental Care", slug: "diabetes-and-dental-care", tagline: "Managing your oral health with diabetes." },
    { name: "Diet & Your Teeth", slug: "diet-and-teeth", tagline: "The best and worst foods for your smile." },
    { name: "Mouthguards for Sports", slug: "sports-mouthguards", tagline: "Protecting your teeth during physical activity." },
  ],
  relatedCostPage: { name: "Dental Crown Cost", slug: "dental-crown-cost" },
  relatedTreatmentPage: { name: "Dental Crown Procedure", slug: "dental-crown-procedure" },
};

export default function OralPiercingRisks() {
  return <LifestyleTemplate data={data} />;
}
