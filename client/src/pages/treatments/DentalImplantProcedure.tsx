import TreatmentPageTemplate, { TreatmentPageData } from "./TreatmentPageTemplate";

const data: TreatmentPageData = {
  slug: "dental-implant-procedure",
  procedureName: "Dental Implant",
  heroTitle: "The Full Story on a",
  heroHighlight: "Dental Implant",
  heroDescription: "Missing a tooth? A dental implant is the closest thing to getting your natural tooth back. It's a permanent solution that looks and feels real.",
  metaTitle: "Dental Implant Procedure: What to Expect | DentaSmart",
  metaDescription: "Get a clear, step-by-step guide to the dental implant procedure. Understand the timeline, risks, recovery, and what to expect from start to finish.",
  keywords: "dental implant procedure, tooth implant process, dental implant steps, what to expect dental implant",
  statsStrip: [
    { value: "95-98%", label: "Success Rate" },
    { value: "20+ Years", label: "Average Lifespan" },
    { value: "3-9 Months", label: "Typical Process Time" },
  ],
  whyNeededTitle: "Why You Might Need a",
  whyNeededHighlight: "Dental Implant",
  whyNeededDescription: "If you've lost a tooth due to injury, decay, or gum disease, a dental implant can fill the gap. Unlike dentures, an implant is a fixed, long-term solution that doesn't slip or require removal. It helps you chew properly, speak clearly, and smile with confidence again.",
  whyNeededDescription2: "Implants also protect your jawbone. When a tooth is missing, the bone in that area starts to shrink. An implant stimulates the bone just like a natural tooth root, keeping your jaw strong and your face looking full.",
  warningSignsTitle: "Signs You're a Good Candidate",
  warningSigns: [
    "You have one or more missing teeth.",
    "Your jawbone is fully grown.",
    "You have healthy gums and enough bone to secure the implant.",
    "You don't have health conditions that will affect bone healing.",
  ],
  timelineSteps: [
    {
      step: "1",
      title: "Consultation & Planning",
      description: "Your dentist will take x-rays and 3D images of your jaw to create a precise treatment plan tailored to your mouth.",
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
      description: "Over the next few months, your jawbone will naturally grow around and fuse with the implant, creating a super strong base.",
      duration: "3-6 months",
    },
    {
      step: "4",
      title: "Abutment & Crown",
      description: "Once healed, a small connector (the abutment) is attached. Then, your new, custom-made crown is placed on top, perfectly matching your other teeth.",
      duration: "1-2 appointments",
    },
  ],
  timelineNote: "The total time can vary. If you need a bone graft to build up your jawbone first, the process will take a bit longer.",
  risks: [
    {
      risk: "Infection at the implant site",
      detail: "Like any surgery, there's a small risk of infection. We prevent this with sterile tools and provide clear aftercare instructions.",
    },
    {
      risk: "Nerve Damage",
      detail: "Very rarely, the nerve that runs through the jaw can be bruised, causing temporary numbness in your lip or chin. Careful 3D planning makes this highly unlikely.",
    },
    {
      risk: "Implant Failure",
      detail: "In rare cases (about 2-5%), the implant doesn't fuse properly with the bone. This is more common in smokers or those with certain health conditions.",
    },
    {
      risk: "Sinus Issues",
      detail: "For upper jaw implants, there's a slight chance the implant could poke into the sinus cavity. We use precise imaging to map out your anatomy and avoid this.",
    },
  ],
  recoveryTitle: "Your Recovery Plan",
  recoveryDescription: "Recovery is usually smoother than people expect. You'll be able to get back to your normal routine quickly with a few simple care steps.",
  recoveryTimeline: "3-7 days for initial healing",
  recoveryTips: [
    {
      title: "Stick to Soft Foods",
      description: "For the first few days, eat things like yogurt, smoothies, and soup. This gives the area time to heal without any pressure.",
    },
    {
      title: "Keep it Clean",
      description: "Gently rinse your mouth with salt water a few times a day to keep the surgical site clean and help it heal faster.",
    },
    {
      title: "Take it Easy",
      description: "Avoid heavy lifting or intense exercise for 2-3 days after the surgery. A little rest goes a long way in helping your body recover.",
    },
  ],
  faqs: [
    {
      q: "Does getting a dental implant hurt?",
      a: "You won't feel any pain during the procedure because the area will be completely numb. Afterwards, most people say it feels like a dull ache, easily managed with over-the-counter pain relievers for a few days.",
    },
    {
      q: "How long do dental implants last?",
      a: "With proper care, dental implants can last a lifetime. The crown attached to it may need to be replaced after 15-20 years due to normal wear and tear.",
    },
    {
      q: "Can I get an implant right after a tooth is pulled?",
      a: "Sometimes, yes. This is called immediate implant placement. Your dentist will decide if it's a good option for you based on your bone density and the location of the tooth.",
    },
    {
      q: "How do I take care of my dental implant?",
      a: "You care for it just like a natural tooth. Brush twice a day, floss daily, and see your dentist for regular check-ups and cleanings.",
    },
    {
      q: "Am I too old for a dental implant?",
      a: "Age is not usually a barrier. As long as you are in good general health and have enough jawbone, you can be a great candidate for a dental implant.",
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
