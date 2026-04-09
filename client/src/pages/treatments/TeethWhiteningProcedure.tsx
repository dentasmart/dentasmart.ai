import TreatmentPageTemplate, { TreatmentPageData } from "./TreatmentPageTemplate";

const data: TreatmentPageData = {
  slug: "teeth-whitening-procedure",
  procedureName: "Teeth Whitening",
  heroTitle: "What to Expect During",
  heroHighlight: "Teeth Whitening",
  heroDescription: "Thinking about brightening your smile? This guide walks you through the entire teeth whitening process, from the first talk with your dentist to seeing the final results.",
  metaTitle: "Teeth Whitening Procedure: What to Expect | DentaSmart",
  metaDescription: "Want whiter teeth? Compare professional in-office whitening, custom take-home trays, and over-the-counter options. Learn what works and what to avoid.",
  keywords: "teeth whitening procedure, professional teeth whitening, dental whitening steps",
  statsStrip: [
    { value: "82.5%", label: "of people see a noticeable difference after one treatment" },
    { value: "1-3", label: "Years results can last with good care" },
    { value: "60-90", label: "Minutes for a typical in-office session" },
  ],
  whyNeededTitle: "Why People Choose",
  whyNeededHighlight: "Teeth Whitening",
  whyNeededDescription: "Most people get their teeth whitened to remove stains from coffee, tea, red wine, or smoking. It can also lighten teeth that have yellowed naturally with age. A brighter smile often makes people feel more confident in their daily lives.",
  whyNeededDescription2: "It's a common cosmetic choice for special events like weddings or job interviews, or just as a personal boost.",
  warningSignsTitle: "Signs You Might Want Teeth Whitening",
  warningSigns: [
    "Your teeth have a yellowish tint.",
    "You have stains from coffee, tea, or soda.",
    "You feel self-conscious about your smile in photos.",
    "Your teeth look dull or discolored compared to how they used to.",
    "You're preparing for a big life event.",
  ],
  timelineSteps: [
    {
      step: "01",
      title: "Initial Consultation",
      description: "You'll talk with your dentist about your goals. They will check your teeth and gums to make sure you're a good candidate for whitening.",
      duration: "20-30 minutes",
    },
    {
      step: "02",
      title: "Preparation",
      description: "Your dentist will clean your teeth. They will place a protective barrier on your gums to prevent the whitening gel from touching them.",
      duration: "15 minutes",
    },
    {
      step: "03",
      title: "Applying the Whitening Gel",
      description: "A professional-strength hydrogen peroxide gel is carefully applied to the surface of your teeth.",
      duration: "10 minutes",
    },
    {
      step: "04",
      title: "Activation",
      description: "A special light is used to activate the gel, helping it break down stains more effectively. This is done in a few 15-20 minute cycles.",
      duration: "45-60 minutes",
    },
    {
      step: "05",
      title: "Rinse and Reveal",
      description: "The gel is rinsed off, and you get to see your new, brighter smile. Your dentist will show you the shade change.",
      duration: "5 minutes",
    },
  ],
  timelineNote: "Some dentists may provide a take-home kit for touch-ups to maintain your results over time.",
  risks: [
    {
      risk: "Tooth Sensitivity",
      detail: "You might feel some sensitivity for a day or two after the treatment. This is normal and usually goes away on its own. Using a toothpaste for sensitive teeth can help.",
    },
    {
      risk: "Gum Irritation",
      detail: "The whitening gel can sometimes irritate your gums if it comes into contact with them. The protective barrier helps, but some mild irritation is possible and temporary.",
    },
    {
      risk: "Uneven Results",
      detail: "Whitening doesn't work on crowns, veneers, or fillings. If you have these, the color difference might be more noticeable after whitening your natural teeth.",
    },
    {
      risk: "Temporary Results",
      detail: "The effects are not permanent. Your teeth will gradually stain again over time, especially if you consume staining foods and drinks. Results can last from a few months to a few years.",
    },
  ],
  recoveryTitle: "After Your Whitening",
  recoveryDescription: "Taking care of your teeth after whitening is simple and helps your results last longer.",
  recoveryTimeline: "1-2 days",
  recoveryTips: [
    {
      title: "Avoid Staining Foods and Drinks",
      description: "For the first 48 hours, stick to a 'white diet.' Avoid coffee, tea, red wine, berries, and dark sauces. This gives your teeth time to adjust.",
    },
    {
      title: "Use a Sensitivity Toothpaste",
      description: "If your teeth feel sensitive, using a toothpaste with potassium nitrate can provide relief. Brush gently with a soft-bristled brush.",
    },
    {
      title: "Maintain Good Oral Hygiene",
      description: "Continue to brush twice a day and floss daily. This not only keeps your teeth healthy but also helps prevent new stains from forming.",
    },
  ],
  faqs: [
    {
      q: "How long does teeth whitening last?",
      a: "Results can last from 1 to 3 years, depending on your diet and oral hygiene habits. Avoiding staining foods and not smoking will help your results last longer.",
    },
    {
      q: "Does teeth whitening hurt?",
      a: "Most people experience little to no pain. The most common side effect is temporary tooth sensitivity, which usually fades within a couple of days.",
    },
    {
      q: "Is professional whitening better than at-home kits?",
      a: "Yes, professional treatments are much stronger and more effective. Your dentist uses a higher concentration of whitening agent and can protect your gums for safer, more even results.",
    },
    {
      q: "Will teeth whitening damage my enamel?",
      a: "When done by a professional, teeth whitening is safe and does not damage your tooth enamel. The materials used are approved for dental use.",
    },
    {
      q: "How much whiter will my teeth get?",
      a: "This varies from person to person, but most people see their teeth get several shades lighter. Your dentist can give you a realistic idea of what to expect during your consultation.",
    },
  ],
  relatedTreatmentPages: [
    { name: "Dental Cleaning", slug: "dental-cleaning-procedure", tagline: "The foundation of a healthy smile." },
    { name: "Veneers", slug: "veneers-procedure", tagline: "For a complete smile makeover." },
    { name: "Braces", slug: "braces-treatment", tagline: "Straighten your teeth for a better smile." },
    { name: "Dental Crowns", slug: "dental-crown-procedure", tagline: "Restore the shape and function of a tooth." },
  ],
  relatedCostPage: { name: "Teeth Whitening Cost", slug: "teeth-whitening-cost" },
};

export default function TeethWhiteningProcedure() {
  return <TreatmentPageTemplate data={data} />;
}
