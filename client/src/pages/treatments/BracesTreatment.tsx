import TreatmentPageTemplate, { TreatmentPageData } from "./TreatmentPageTemplate";
import { Link } from "wouter";

const data: TreatmentPageData = {
  slug: "braces-treatment",
  procedureName: "Braces",
  heroTitle: "Straighten Your Smile with",
  heroHighlight: "Braces",
  heroDescription: "Braces are a time-tested way to correct crooked or crowded teeth, fix bite issues, and improve your overall oral health. Let's walk through what you can expect.",
  metaTitle: "Braces Treatment: What to Expect | DentaSmart",
  metaDescription: "Thinking about braces? Learn about the step-by-step process, what they feel like, potential risks, and how to care for them. Get all your questions answered.",
  keywords: "braces, orthodontic treatment, teeth straightening, crooked teeth, braces process",

  statsStrip: [
    { value: "2-3 Years", label: "Average Treatment Time" },
    { value: "4 Million", label: "People in the U.S. with Braces" },
    { value: "75%", label: "of brace-wearers are under 18" },
  ],

  whyNeededTitle: "Why You Might",
  whyNeededHighlight: "Need Braces",
  whyNeededDescription: "If your teeth are crooked, crowded, or you have a noticeable overbite or underbite, braces can help. Straightening your teeth isn't just about looks. It also makes cleaning easier, which reduces your risk of cavities and gum disease.",
  whyNeededDescription2: "Correcting your bite can also relieve jaw pain and prevent uneven wear on your teeth over time. It's a long-term investment in your health and confidence.",
  whyNeededNote: (
    <>
      Before your braces go on, your orthodontist may place{" "}
      <Link href="/oral-health-hub/spacers-for-teeth/" className="text-primary underline hover:text-primary/80">
        spacers for teeth
      </Link>{" "}
      to prepare your molars for the bands.
    </>
  ),

  warningSignsTitle: "Signs You Might Need Braces",
  warningSigns: [
    "Teeth that are visibly crooked or crowded",
    "Difficulty flossing or brushing around certain teeth",
    "Frequently biting your cheek or tongue",
    "Your jaw makes sounds or shifts when you chew",
    "Teeth that don't meet comfortably when you close your mouth",
  ],

  timelineSteps: [
    {
      step: "1",
      title: "Initial Consultation",
      description: "You'll meet with an orthodontist who will examine your teeth, take X-rays, and create a 3D model of your mouth. This helps them create a personalized treatment plan.",
      duration: "45-60 minutes",
    },
    {
      step: "2",
      title: "Getting Your Braces On",
      description: "The orthodontist will glue brackets to your teeth and connect them with a wire. You might feel some pressure, but it shouldn't be painful. This appointment is usually the longest.",
      duration: "1-2 hours",
    },
    {
      step: "3",
      title: "Regular Adjustments",
      description: "Every 4-8 weeks, you'll visit your orthodontist to have your wires tightened or adjusted. This is what moves your teeth into the right position. Your teeth might be sore for a day or two after.",
      duration: "20-30 minutes per visit",
    },
    {
      step: "4",
      title: "Getting Your Braces Off",
      description: "Once your teeth are in the perfect spot, the orthodontist will remove the brackets and wires. They'll clean and polish your teeth, and you'll get to see your new smile!",
      duration: "About 1 hour",
    },
    {
      step: "5",
      title: "Retainer Time",
      description: "To keep your teeth from moving back, you'll need to wear a retainer. At first, you might wear it all the time, then just at night. This is a critical step for lasting results.",
      duration: "Lifelong nightly wear is often recommended",
    },
  ],

  risks: [
    {
      risk: "Initial Discomfort and Sores",
      detail: "For the first week, the brackets can irritate your cheeks and lips, causing small sores. Your teeth will also feel sore after adjustments. Saltwater rinses and dental wax can help a lot.",
    },
    {
      risk: "Difficulty Cleaning",
      detail: "Food gets trapped in braces easily, which can lead to plaque buildup and cavities if you're not careful. You'll need to be extra diligent with brushing and flossing.",
    },
    {
      risk: "Root Resorption",
      detail: "In some cases, the movement of the teeth can cause the roots to shorten slightly. This is usually not a major problem, but your orthodontist will monitor it with X-rays.",
    },
    {
      risk: "Relapse",
      detail: "If you don't wear your retainer as instructed, your teeth can shift back toward their original positions. Consistency with your retainer is key to protecting your investment.",
    },
  ],

  recoveryTitle: "Caring for Your Braces",
  recoveryDescription: "Living with braces requires a few adjustments to your daily routine, but it quickly becomes second nature. Here’s how to keep your teeth healthy during treatment.",
  recoveryTimeline: "18-36 months",

  recoveryTips: [
    {
      title: "Brush and Floss Carefully",
      description: "Use a soft-bristled brush and consider a water flosser or floss threaders to clean around the brackets and wires. Do this after every meal if you can.",
    },
    {
      title: "Avoid Hard and Sticky Foods",
      description: "Things like hard candy, nuts, popcorn, and chewing gum can damage your braces. Cut up hard fruits like apples instead of biting directly into them.",
    },
    {
      title: "Use Dental Wax for Sores",
      description: "If a bracket or wire is poking you, you can cover it with a small piece of dental wax. This creates a smooth barrier and gives your mouth time to heal.",
    },
  ],

  faqs: [
    {
      q: "Do braces hurt?",
      a: "You'll likely feel some soreness or pressure for a few days after they are put on and after each adjustment. Over-the-counter pain relievers can help manage this discomfort.",
    },
    {
      q: "How much do braces cost?",
      a: "The cost varies widely depending on your location and the complexity of your case, but typically ranges from $3,000 to $7,000. Many orthodontists offer payment plans to make it more affordable.",
    },
    {
      q: "Can I still play sports with braces?",
      a: "Yes, but you should wear a mouthguard to protect your mouth and your braces from any impact. Your orthodontist can recommend a specific type that fits well over your braces.",
    },
    {
      q: "How long will I have to wear braces?",
      a: "The average treatment time is about two years, but it can be shorter or longer depending on your specific needs. Your orthodontist will give you a personalized estimate.",
    },
    {
      q: "What happens after my braces come off?",
      a: "You will need to wear a retainer to keep your teeth in their new positions. Most people need to wear their retainer nightly for many years, or even for life, to prevent teeth from shifting.",
    },
  ],

  relatedTreatmentPages: [
    { name: "Dental Cleaning", slug: "dental-cleaning-procedure", tagline: "Keep your smile healthy and bright." },
    { name: "Wisdom Teeth Removal", slug: "wisdom-teeth-removal", tagline: "Prevent future crowding and pain." },
    { name: "Teeth Whitening", slug: "teeth-whitening-procedure", tagline: "Brighten your smile after braces." },
    { name: "Dental Crowns", slug: "dental-crown-procedure", tagline: "Restore the shape and function of a tooth." },
  ],
  relatedCostPage: { name: "Braces Cost", slug: "braces-cost" },
};

export default function BracesTreatment() {
  return <TreatmentPageTemplate data={data} />;
}
