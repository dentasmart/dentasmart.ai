import TreatmentPageTemplate, { TreatmentPageData } from "./TreatmentPageTemplate";

const data: TreatmentPageData = {
  slug: "dental-crown-procedure",
  procedureName: "Dental Crown",
  heroTitle: "Understanding the",
  heroHighlight: "Dental Crown Procedure",
  heroDescription: "A dental crown is a custom-made cap that covers a tooth to restore its shape, size, strength, and appearance. Think of it as a new, protective outer layer for a damaged tooth.",
  metaTitle: "Dental Crown Procedure: What to Expect | DentaSmart",
  metaDescription: "Getting a dental crown? Learn the full procedure step by step, how long it takes, what materials are used, recovery tips, and how to make your crown last.",
  keywords: "dental crown, dental crown procedure, tooth cap, dental restoration",
  statsStrip: [
    { value: "10-15 Years", label: "Average Lifespan" },
    { value: "2 Visits", label: "Typical Procedure" },
    { value: "95%+", label: "Success Rate" },
  ],
  whyNeededTitle: "Why You Might Need a",
  whyNeededHighlight: "Dental Crown",
  whyNeededDescription: "Your dentist might recommend a crown for several reasons. If you have a large cavity that's too big for a filling, a crown can save the tooth. It's also used to protect a weak tooth from breaking, restore a broken tooth, or cover a dental implant.",
  whyNeededDescription2: "Crowns are also placed on teeth that have had a root canal, since those teeth can become brittle. They can also be used for cosmetic reasons to improve the look of a discolored or misshapen tooth.",
  warningSignsTitle: "Signs You Might Need a Dental Crown",
  warningSigns: [
    "A large cavity or filling",
    "A cracked or broken tooth",
    "A tooth that is very worn down",
    "A discolored or poorly shaped tooth",
    "Pain when you bite or chew",
  ],
  timelineSteps: [
    {
      step: "1",
      title: "Consultation and X-rays",
      description: "Your dentist will examine your tooth, take X-rays, and discuss if a crown is the best option for you. This is a good time to ask any questions you have.",
      duration: "30-60 minutes",
    },
    {
      step: "2",
      title: "Tooth Preparation",
      description: "The dentist will numb the area and then reshape your tooth to make room for the crown. An impression of your tooth is taken and sent to a dental lab.",
      duration: "60-90 minutes",
    },
    {
      step: "3",
      title: "Temporary Crown",
      description: "A temporary crown is placed over your prepared tooth to protect it while your permanent crown is being made. This temporary crown is not as strong, so you'll need to be a bit careful with it.",
      duration: "Part of the tooth preparation appointment",
    },
    {
      step: "4",
      title: "Placing the Permanent Crown",
      description: "About two weeks later, you'll return to have your permanent crown fitted. The dentist will check the fit and your bite before cementing it in place.",
      duration: "30-60 minutes",
    },
  ],
  timelineNote: "The entire process usually takes two appointments spaced about two weeks apart.",
  risks: [
    {
      risk: "Sensitivity",
      detail: "You might feel some sensitivity to hot or cold after the procedure. This usually goes away on its own after a few weeks. Using a toothpaste for sensitive teeth can help.",
    },
    {
      risk: "Chipped Crown",
      detail: "Porcelain crowns can sometimes chip. If the chip is small, it can be repaired. If it's large, the crown might need to be replaced.",
    },
    {
      risk: "Loose Crown",
      detail: "Sometimes the cement that holds the crown can wash out. If your crown feels loose, contact your dentist right away. It can usually be re-cemented easily if you act fast.",
    },
    {
      risk: "Gum Irritation",
      detail: "The edge of the crown can sometimes irritate your gums if the fit needs adjustment. Regular brushing and flossing help keep the surrounding gums healthy.",
    },
  ],
  recoveryTitle: "Crown Recovery and Aftercare",
  recoveryDescription: "Taking care of your new crown is pretty simple. For the first day or two, try to chew on the other side of your mouth. Your new crown and the area around it might be a little sensitive, but this will fade.",
  recoveryTimeline: "1-2 days",
  recoveryTips: [
    {
      title: "Avoid Sticky, Hard Foods",
      description: "For the first 24 hours, stay away from chewy or hard foods that could pull off or damage the temporary or new permanent crown.",
    },
    {
      title: "Be Gentle When Flossing",
      description: "When you floss, slide the floss out from the side of the tooth instead of pulling it up. This prevents you from accidentally pulling off your temporary crown.",
    },
    {
      title: "Maintain Good Oral Hygiene",
      description: "Brush and floss your crown just like you would your other teeth. Keeping the area clean helps prevent decay and gum disease.",
    },
  ],
  faqs: [
    {
      q: "How long does a dental crown last?",
      a: "A dental crown can last between 5 and 15 years, or even longer. The lifespan depends on the material used, your oral hygiene habits, and how much wear and tear it's exposed to.",
    },
    {
      q: "Does getting a crown hurt?",
      a: "No, your dentist will numb your tooth and the surrounding area before the procedure. You might feel some pressure, but you shouldn't feel any pain. Your tooth might be a little sensitive for a few days afterward.",
    },
    {
      q: "Can a crowned tooth still get a cavity?",
      a: "Yes, the tooth underneath the crown can still get a cavity. That's why it's so important to brush and floss around the crown, especially at the gum line.",
    },
    {
      q: "What are crowns made of?",
      a: "Crowns can be made from several materials, including porcelain, ceramic, metal alloys, or a combination. Your dentist will help you choose the best material based on the tooth's location, your budget, and your preference.",
    },
    {
      q: "How much does a dental crown cost?",
      a: "The cost of a dental crown varies depending on the material and your location. It can range from $800 to $2,500 or more per tooth. Dental insurance often covers a portion of the cost.",
    },
  ],
  relatedTreatmentPages: [
    { name: "Root Canal Procedure", slug: "root-canal-procedure", tagline: "Save an infected tooth from extraction." },
    { name: "Dental Implant Procedure", slug: "dental-implant-procedure", tagline: "A permanent solution for missing teeth." },
    { name: "Veneers Procedure", slug: "veneers-procedure", tagline: "Transform your smile with thin porcelain shells." },
    { name: "Dental Cleaning Procedure", slug: "dental-cleaning-procedure", tagline: "Maintain your oral health with regular cleanings." },
  ],
  relatedCostPage: { name: "Dental Crown Cost", slug: "dental-crown-cost" },
};

export default function DentalCrownProcedure() {
  return <TreatmentPageTemplate data={data} />;
}
