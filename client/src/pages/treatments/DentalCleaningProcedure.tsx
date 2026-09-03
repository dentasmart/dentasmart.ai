import TreatmentPageTemplate, { TreatmentPageData } from "./TreatmentPageTemplate";

const data: TreatmentPageData = {
  slug: "dental-cleaning-procedure",
  procedureName: "Dental Cleaning",
  heroTitle: "What to Expect During a",
  heroHighlight: "Dental Cleaning",
  heroDescription: "A professional dental cleaning is one of the simplest ways to keep your smile healthy and bright. We'll gently remove plaque and tartar buildup that your toothbrush can't reach, leaving your teeth feeling smooth and fresh.",
  metaTitle: "Dental Cleaning Procedure: What to Expect | DentaSmart",
  metaDescription: "What happens during a dental cleaning? Learn the step-by-step process, how long it takes, what deep cleaning involves, and why regular cleanings matter.",
  keywords: "dental cleaning, teeth cleaning, dental hygiene, professional teeth cleaning, dental checkup",

  statsStrip: [
    { value: "Every 6 Months", label: "Recommended Frequency" },
    { value: "Up to 80%", label: "Reduction in Harmful Bacteria" },
    { value: "Under 1 Hour", label: "Typical Appointment Time" },
  ],

  whyNeededTitle: "Why You Might Need a",
  whyNeededHighlight: "Professional Dental Cleaning",
  whyNeededDescription: "Even if you brush and floss every day, plaque can harden into tartar, which you can't remove on your own. A professional cleaning gets rid of tartar, helps prevent cavities, and stops gum disease before it starts.",
  whyNeededDescription2: "Think of it as a reset for your mouth. It helps maintain your overall health, keeps your breath fresh, and can even remove some surface stains to brighten your smile.",
  warningSignsTitle: "Signs You Might Need a Dental Cleaning",
  warningSigns: [
    "Your gums bleed when you brush or floss.",
    "You have persistent bad breath.",
    "You can see yellow or brown buildup (tartar) on your teeth.",
    "Your teeth feel rough or fuzzy.",
    "It has been more than six months since your last visit.",
  ],

  timelineSteps: [
    {
      step: "01",
      title: "The Initial Check-up",
      description: "First, the hygienist will use a small mirror to look at your teeth and gums. They are checking for any obvious issues like inflammation or tartar buildup.",
      duration: "5-10 minutes",
    },
    {
      step: "02",
      title: "Removing Plaque and Tartar",
      description: "Using a small tool called a scaler, the hygienist will gently scrape away plaque and tartar from your tooth surfaces and around your gum line. You'll hear some scraping sounds, which is normal.",
      duration: "10-20 minutes",
    },
    {
      step: "03",
      title: "Gritty Toothpaste Polish",
      description: "Next, your teeth get a polish with a high-powered electric brush and a special gritty toothpaste. This helps remove any remaining tartar and surface stains.",
      duration: "5 minutes",
    },
    {
      step: "04",
      title: "Expert Flossing",
      description: "The hygienist will floss your teeth to get deep between them and locate any potential trouble spots where your gums might bleed.",
      duration: "2-3 minutes",
    },
    {
      step: "05",
      title: "Fluoride Treatment",
      description: "As a final step, you'll get a fluoride treatment. It's a gel or foam that sits on your teeth for a minute to help fight against cavities for several months.",
      duration: "1-2 minutes",
    },
  ],

  risks: [
    {
      risk: "Gum Sensitivity",
      detail: "It's common for your gums to feel a little tender or sore for a day after the cleaning, especially if there was a lot of tartar to remove.",
    },
    {
      risk: "Minor Bleeding",
      detail: "A small amount of bleeding during or after the cleaning is normal. This usually happens if you have some gum inflammation (gingivitis).",
    },
    {
      risk: "Tooth Sensitivity",
      detail: "Your teeth might feel sensitive to hot or cold temperatures for a few days. This happens because removing tartar exposes parts of the tooth that were covered.",
    },
    {
      risk: "Accidental Nicks",
      detail: "Though very rare, the metal tools can sometimes nick the gums or soft tissues. These are usually tiny and heal very quickly on their own.",
    },
  ],

  recoveryTitle: "What to Do After Your Cleaning",
  recoveryDescription: "Your mouth will feel great. To keep it that way, just follow a few simple tips for the rest of the day.",
  recoveryTimeline: "A few hours to a day",
  recoveryTips: [
    {
      title: "Avoid Staining Foods",
      description: "For the first 24 hours, try to avoid dark-colored foods and drinks like coffee, tea, or red wine that could stain your newly polished teeth.",
    },
    {
      title: "Brush Gently",
      description: "When you brush your teeth tonight, use a soft-bristled brush and be gentle, especially around the gum line if it feels a little tender.",
    },
    {
      title: "Manage Sensitivity",
      description: "If your teeth are sensitive, avoid very hot or cold drinks for a day. Using a toothpaste designed for sensitive teeth can also provide relief.",
    },
  ],

  faqs: [
    {
      q: "Does a dental cleaning hurt?",
      a: "For most people, a dental cleaning is painless. You might feel some pressure or scraping, but it shouldn't be painful. If you have sensitive teeth, let your hygienist know.",
    },
    {
      q: "How often should I get a professional cleaning?",
      a: "Most dentists recommend a professional cleaning every six months. If you have gum disease or are prone to plaque, your dentist might suggest more frequent visits.",
    },
    {
      q: "Will a cleaning make my teeth whiter?",
      a: "A cleaning removes surface stains, which can make your teeth appear brighter. However, it does not change the natural shade of your teeth like a whitening treatment does.",
    },
    {
      q: "Is it safe to get a dental cleaning while pregnant?",
      a: "Yes, it is not only safe but also recommended. Pregnancy can cause hormonal changes that increase the risk of gum disease, so regular cleanings are very helpful.",
    },
    {
      q: "What if I haven't had a cleaning in years?",
      a: "That's okay, it's never too late to start. The process is the same, but it might just take a little longer to remove the extra tartar buildup. Your hygienist will take good care of you.",
    },
  ],

  relatedTreatmentPages: [
    { name: "Teeth Whitening", slug: "teeth-whitening-procedure", tagline: "Brighten your smile professionally." },
    { name: "Braces", slug: "braces-treatment", tagline: "Straighten teeth and address alignment concerns." },
    { name: "Dental Crowns", slug: "dental-crown-procedure", tagline: "Protect and restore damaged teeth." },
    { name: "Root Canal", slug: "root-canal-procedure", tagline: "Save a tooth that is badly decayed or infected." },
  ],
  relatedCostPage: { name: "Dental Cleaning Cost", slug: "dental-cleaning-cost" },
};

export default function DentalCleaningProcedure() {
  return <TreatmentPageTemplate data={data} />;
}
