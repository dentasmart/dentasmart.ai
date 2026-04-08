import TreatmentPageTemplate, { TreatmentPageData } from "./TreatmentPageTemplate";

const data: TreatmentPageData = {
  slug: "dentures-treatment",
  procedureName: "Dentures",
  heroTitle: "Understanding the Process for",
  heroHighlight: "Dentures",
  heroDescription: "Dentures are a custom-made solution to replace missing teeth. They help you eat, speak, and smile with confidence again. Let's walk through how they work.",
  metaTitle: "Dentures Procedure: What to Expect | DentaSmart",
  metaDescription: "Learn about the dentures process, from consultation to fitting. Understand the timeline, risks, recovery, and what to expect. Your guide to getting new dentures.",
  keywords: "dentures, false teeth, getting dentures, denture process, partial dentures, full dentures",
  statsStrip: [
    { value: "90%", label: "of people with no teeth who get dentures report an improved quality of life." },
    { value: "2-4", label: "visits are typically needed to complete the entire denture process." },
    { value: "5-10", label: "years is the average lifespan of a set of well-maintained dentures." },
  ],
  whyNeededTitle: "Why You Might Need",
  whyNeededHighlight: "Dentures",
  whyNeededDescription: "If you've lost several or all of your teeth due to decay, gum disease, or injury, dentures can be a great option. They restore the function of your mouth and the appearance of your smile. Missing teeth can cause your facial muscles to sag, making you look older, and can also lead to problems with speaking and eating.",
  whyNeededDescription2: "Dentures provide support for your cheeks and lips, and can make it much easier to enjoy the foods you love and communicate clearly.",
  warningSignsTitle: "Signs You Might Need Dentures",
  warningSigns: [
    "You have several missing teeth or large gaps.",
    "Your remaining teeth are loose or shifting.",
    "You have chronic toothaches or severe decay.",
    "You find it difficult or painful to chew food.",
    "You feel self-conscious about your smile.",
  ],
  timelineSteps: [
    {
      step: "1",
      title: "Consultation & Impressions",
      description: "Your dentist will examine your mouth, discuss your options (full or partial), and take precise measurements and impressions of your gums and any remaining teeth.",
      duration: "1-2 hours",
    },
    {
      step: "2",
      title: "Bite Molds & Wax Models",
      description: "You'll try on wax models of the dentures. This step is for checking the fit, bite, and appearance. The dentist will make adjustments to the shape and color of the teeth.",
      duration: "30-60 mins",
    },
    {
      step: "3",
      title: "Casting the Final Dentures",
      description: "The lab uses the final models to create your permanent dentures. This process involves carefully setting the artificial teeth in an acrylic base that matches your gum color.",
      duration: "1-2 weeks",
    },
    {
      step: "4",
      title: "Final Fitting & Adjustments",
      description: "You'll receive your finished dentures. Your dentist will check the fit and make any necessary final adjustments for comfort. You'll get instructions on how to care for them.",
      duration: "30-60 mins",
    },
  ],
  timelineNote: "The entire process from consultation to final fitting usually takes about 3 to 6 weeks.",
  risks: [
    {
      risk: "Sore Spots",
      detail: "It's common to develop sore spots on your gums as you get used to the dentures. Your dentist can make adjustments to relieve this pressure.",
    },
    {
      risk: "Difficulty Speaking or Eating",
      detail: "At first, it can feel awkward to talk or eat. Practicing reading aloud and starting with soft foods will help you adapt more quickly.",
    },
    {
      risk: "Denture Slippage",
      detail: "Your dentures might feel loose, especially when you laugh or cough. Over time, your mouth muscles will learn to hold them in place.",
    },
    {
      risk: "Bone Loss",
      detail: "Over many years, the jawbone can shrink where teeth are missing, which may require your dentures to be refitted or replaced.",
    },
  ],
  recoveryTitle: "Adjusting to Your New Dentures",
  recoveryDescription: "Getting used to dentures takes a little time and patience. Here are a few tips to make the transition smoother and more comfortable.",
  recoveryTimeline: "2-4 weeks",
  recoveryTips: [
    {
      title: "Start with Soft Foods",
      description: "Cut your food into small pieces and chew on both sides of your mouth. Avoid hard, sticky, or chewy foods for the first couple of weeks.",
    },
    {
      title: "Practice Speaking",
      description: "Read a book or magazine out loud for a few minutes each day. This helps you get used to speaking clearly with your new dentures.",
    },
    {
      title: "Clean Them Daily",
      description: "Brush your dentures every day with a soft brush and denture cleaner. This removes food particles and plaque, keeping your mouth healthy.",
    },
  ],
  faqs: [
    {
      q: "How long does it take to get used to dentures?",
      a: "Most people feel comfortable with their dentures within a few weeks to a couple of months. The initial adjustment period involves getting used to the feel and function.",
    },
    {
      q: "Can I sleep with my dentures in?",
      a: "It's best to remove your dentures at night to give your gums a rest. Soaking them overnight also helps keep them clean and retain their shape.",
    },
    {
      q: "Will people be able to tell I have dentures?",
      a: "Today's dentures are very natural-looking. They are custom-made to match your gums and the shape of your face, so they are not obvious.",
    },
    {
      q: "How often do I need to replace my dentures?",
      a: "With proper care, dentures typically last between 5 and 10 years. Your dentist will check their fit and condition during your regular checkups.",
    },
    {
      q: "Do I still need to see a dentist if I have full dentures?",
      a: "Yes, you should still have regular dental checkups. Your dentist will examine your gums and jaw, and check the fit of your dentures.",
    },
  ],
  relatedTreatmentPages: [
    { name: "Dental Implants", slug: "dental-implant-procedure", tagline: "A permanent solution for missing teeth." },
    { name: "Dental Crowns", slug: "dental-crown-procedure", tagline: "Cap a damaged tooth to restore its shape." },
    { name: "Tooth Extractions", slug: "tooth-extraction-procedure", tagline: "Removing a tooth that can't be saved." },
    { name: "Dental Cleaning", slug: "dental-cleaning-procedure", tagline: "Routine cleaning for optimal oral health." },
  ],
  relatedCostPage: { name: "Dentures Cost", slug: "dentures-cost" },
};

export default function DenturesTreatment() {
  return <TreatmentPageTemplate data={data} />;
}
