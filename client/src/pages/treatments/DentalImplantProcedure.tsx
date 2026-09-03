import TreatmentPageTemplate, { TreatmentPageData } from "./TreatmentPageTemplate";

const data: TreatmentPageData = {
  slug: "dental-implant-procedure",
  procedureName: "Dental Implant",
  heroTitle: "The Full Story on a",
  heroHighlight: "Dental Implant",
  heroDescription: "A dental implant is a fixed replacement for a missing tooth. The implant supports a crown designed to look and function like a tooth.",
  metaTitle: "Dental Implant Procedure: What to Expect | DentaSmart",
  metaDescription: "Learn how dental implant treatment works, from consultation to final crown, including recovery, risks, and candidacy factors.",
  keywords: "dental implant procedure, tooth implant process, dental implant steps, what to expect dental implant",
  statsStrip: [
    { value: "Fixed", label: "Tooth Replacement" },
    { value: "Multi-step", label: "Treatment Process" },
    { value: "Varies", label: "Healing Time" },
  ],
  whyNeededTitle: "Why You Might Need a",
  whyNeededHighlight: "Dental Implant",
  whyNeededDescription: "If you have lost a tooth because of injury, decay, or gum disease, an implant may be one replacement option. It is fixed in the jaw and supports a crown. A dentist can compare it with a bridge or removable denture.",
  whyNeededDescription2: "Bone in a missing-tooth area can shrink over time. An implant transfers chewing forces to the jawbone, which may help maintain bone in that area.",
  warningSignsTitle: "Factors a Dentist Will Review",
  warningSigns: [
    "You have one or more missing teeth.",
    "Your jawbone is fully grown.",
    "The health of your gums and the amount of bone available.",
    "Your health history and factors that may affect healing.",
  ],
  timelineSteps: [
    {
      step: "1",
      title: "Consultation & Planning",
      description: "Your dentist may take X-rays and 3D images of your jaw to plan the implant position and review nearby structures.",
      duration: "1-2 hours",
    },
    {
      step: "2",
      title: "Implant Placement",
      description: "A small, titanium post is surgically placed into your jawbone. This acts as the new root for your tooth.",
      duration: "1-2 hours",
    },
    {
      step: "3",
      title: "Healing (Osseointegration)",
      description: "Over the next few months, bone may grow around and connect with the implant, creating a stable base for the replacement tooth.",
      duration: "3-6 months",
    },
    {
      step: "4",
      title: "Abutment & Crown",
      description: "Once the area has healed, a small connector called an abutment is attached. A crown is then made to match the general shape and shade of nearby teeth.",
      duration: "1-2 appointments",
    },
  ],
  timelineNote: "The total time can vary. If you need a bone graft to build up your jawbone first, the process will take a bit longer.",
  risks: [
    {
      risk: "Infection at the implant site",
      detail: "Like any surgery, implant placement carries a risk of infection. Sterile technique and aftercare help lower that risk.",
    },
    {
      risk: "Nerve Damage",
      detail: "Very rarely, the nerve that runs through the jaw can be bruised, causing temporary numbness in your lip or chin. Careful 3D planning makes this highly unlikely.",
    },
    {
      risk: "Implant Failure",
      detail: "Sometimes an implant does not connect with the bone as planned. Smoking and some health conditions can affect healing.",
    },
    {
      risk: "Sinus Issues",
      detail: "For upper-jaw implants, the sinus is one structure the dentist must consider. Imaging helps the dentist plan around your anatomy.",
    },
  ],
  recoveryTitle: "Your Recovery Plan",
  recoveryDescription: "Initial recovery varies by person and by the extent of the procedure. Follow the care instructions from your dental team.",
  recoveryTimeline: "3-7 days for initial healing",
  recoveryTips: [
    {
      title: "Stick to Soft Foods",
      description: "For the first few days, eat things like yogurt, smoothies, and soup. This gives the area time to heal without any pressure.",
    },
    {
      title: "Keep it Clean",
      description: "Clean the area only as directed by your dental team. They may recommend a gentle rinse during recovery.",
    },
    {
      title: "Take it Easy",
      description: "Avoid heavy lifting or intense exercise for 2-3 days after the surgery. A little rest goes a long way in helping your body recover.",
    },
  ],
  faqs: [
    {
      q: "Does getting a dental implant hurt?",
      a: "The area is usually numbed before implant placement. Soreness can occur afterward, and your dental team can explain how to manage it safely.",
    },
    {
      q: "How long do dental implants last?",
      a: "Dental implants are designed for long-term use, but their lifespan varies. The implant, crown, surrounding gums, and bone all need ongoing care and monitoring.",
    },
    {
      q: "Can I get an implant right after a tooth is pulled?",
      a: "Sometimes, yes. This is called immediate implant placement. Your dentist will decide if it's a good option for you based on your bone density and the location of the tooth.",
    },
    {
      q: "How do I take care of my dental implant?",
      a: "Clean around the implant as your dentist recommends and keep regular checkups so the implant, crown, gums, and bone can be monitored.",
    },
    {
      q: "Am I too old for a dental implant?",
      a: "Age alone does not determine candidacy. A dentist must review your health history, gums, jawbone, medications, and healing risks.",
    },
  ],
  relatedTreatmentPages: [
    { name: "Root Canal", slug: "root-canal-procedure", tagline: "Save a damaged tooth from extraction." },
    { name: "Dental Crown", slug: "dental-crown-procedure", tagline: "Protect and restore a weak or broken tooth." },
    { name: "Wisdom Teeth Removal", slug: "wisdom-teeth-removal", tagline: "Prevent future pain and crowding." },
    { name: "Braces", slug: "braces-treatment", tagline: "Straighten your smile for better health." },
  ],
  relatedCostPage: { name: "Dental Implant Cost", slug: "dental-implant-cost" },
};

export default function DentalImplantProcedure() {
  return <TreatmentPageTemplate data={data} />;
}
