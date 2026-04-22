
import AgeSpecificTemplate, { AgeSpecificPageData } from "./AgeSpecificTemplate";

const data: AgeSpecificPageData = {
  slug: "baby-teething-guide",
  ageGroup: "Babies & Toddlers (0-3)",
  heroTitle: "Your Baby's First Smile",
  heroHighlight: "from the First Tooth",
  heroDescription: "Your baby's first tooth is a big moment! This guide helps you understand teething, how to care for new teeth, and when to see a dentist. We'll make it simple and stress-free.",
  metaTitle: "Baby Teething Guide: Ages 0-3 | DentaSmart",
  metaDescription: "Baby teething can start as early as 4 months. Learn the signs, safe remedies for sore gums, what to avoid, and when to schedule your baby's first dentist visit.",
  keywords: "baby teething, teething timeline, first dental visit, baby dental care, bottle tooth decay, thumb sucking, infant oral health",
  statsStrip: [
    { value: "6-12", label: "Months for First Tooth" },
    { value: "By Age 1", label: "First Dental Visit" },
    { value: "40%", label: "of kids have decay by kindergarten" },
  ],
  overviewTitle: "A Foundation for",
  overviewHighlight: "a Lifetime of Healthy Teeth",
  overviewDescription: "Taking care of your baby's teeth right from the start is one of the best things you can do for their long-term health. It sets them up for a future of healthy smiles. We'll show you how to gently clean their new teeth and gums.",
  overviewDescription2: "This early care helps prevent cavities and teaches good habits. Your role is so important, and we're here to support you every step of the way.",
  keyTips: [
    {
      title: "Wipe Gums Daily",
      description: "Before teeth come in, gently wipe your baby's gums with a clean, damp cloth after feedings.",
    },
    {
      title: "First Tooth, First Brush",
      description: "Once the first tooth appears, use a tiny smear of fluoride toothpaste (the size of a grain of rice) and a soft baby toothbrush.",
    },
    {
      title: "First Visit by First Birthday",
      description: "The American Academy of Pediatrics recommends a dental check-up by age 1 to catch any potential issues early.",
    },
    {
      title: "Avoid Bedtime Bottles",
      description: "Don't put your baby to bed with a bottle of milk or juice. This can cause serious tooth decay.",
    },
    {
      title: "Soothe Teething Pain Safely",
      description: "Offer a chilled (not frozen) teething ring or gently rub their gums with a clean finger. Avoid numbing gels.",
    },
  ],
  milestones: [
    {
      age: "0-6 Mos",
      title: "Gums Only, Big Smiles",
      description: "Your baby is all gums! Clean their mouth with a soft, damp cloth daily to get them used to it.",
    },
    {
      age: "6-10 Mos",
      title: "First Tooth Arrives!",
      description: "The first teeth, usually the bottom front ones, will start to pop through. Teething symptoms may begin.",
    },
    {
      age: "1 Year",
      title: "Time for a Check-up",
      description: "Schedule their first dental visit. The dentist will check their teeth and answer your questions.",
    },
    {
      age: "1-2 Yrs",
      title: "More Teeth & Molars",
      description: "More teeth, including their first molars, will appear. Keep brushing twice a day.",
    },
    {
      age: "2-3 Yrs",
      title: "A Full Set of Baby Teeth",
      description: "By age 3, your child will likely have all 20 primary teeth. They can start learning to spit out toothpaste.",
    },
  ],
  milestonesNote: "Remember, every child is different! These are just general timelines.",
  commonConcerns: [
    {
      concern: "My baby is so fussy and drooling. Is it teething?",
      detail: "Yes, that's very common. Fussiness, drooling, and a low-grade fever can all be signs of teething. A chilled teething toy can help.",
    },
    {
      concern: "What is bottle tooth decay?",
      detail: "It's tooth decay caused by the sugars in milk or juice sitting on the teeth for a long time, especially from a bottle at night.",
    },
    {
      concern: "Is thumb sucking bad for my baby's teeth?",
      detail: "Most children stop on their own. If it continues past age 3 or 4, it can affect how their adult teeth come in. We can talk about gentle ways to stop.",
    },
    {
      concern: "When should I start using fluoride toothpaste?",
      detail: "The American Dental Association (ADA) recommends using a rice-grain-sized amount of fluoride toothpaste as soon as the first tooth appears.",
    },
    {
      concern: "I can't see any problems. Why go to the dentist so early?",
      detail: "Early visits are for prevention. The dentist can spot issues you can't see and give you personalized advice for your child.",
    },
  ],
  preventionTitle: "Simple Steps for a Healthy Start",
  preventionDescription: "Preventing dental problems in babies is easier than you think. A few simple habits can make a huge difference for their future oral health.",
  preventionTips: [
    {
      title: "Clean Teeth Twice a Day",
      description: "Start brushing with a soft brush and a tiny bit of fluoride toothpaste as soon as the first tooth erupts.",
    },
    {
      title: "Water is Best",
      description: "Once they are old enough for drinks other than milk, offer water between meals instead of juice.",
    },
    {
      title: "No Sugary Drinks in Bottles",
      description: "Never put juice, soda, or other sweet drinks in your baby's bottle. Stick to formula, breast milk, or water.",
    },
    {
      title: "Transition to a Cup",
      description: "Encourage your child to drink from a cup by their first birthday to reduce the risk of bottle tooth decay.",
    },
    {
      title: "Regular Dental Check-ups",
      description: "Visiting the dentist regularly allows us to catch and prevent problems before they become serious.",
    },
  ],
  faqs: [
    {
      q: "What order do baby teeth come in?",
      a: "Usually, the bottom two front teeth come in first, followed by the top two front teeth. Molars and canines come in later.",
    },
    {
      q: "How do I clean my baby's teeth?",
      a: "Use a soft baby toothbrush and a tiny smear of fluoride toothpaste (the size of a grain of rice). Brush gently all around their teeth and along the gumline.",
    },
    {
      q: "Are teething gels with benzocaine safe?",
      a: "No, the FDA advises against using over-the-counter teething products with benzocaine for infants, as they can cause rare but serious side effects.",
    },
    {
      q: "My baby doesn't like having their teeth brushed. What can I do?",
      a: "Try to make it fun! Sing a song, let them hold their toothbrush, or brush your teeth at the same time. Be gentle and quick.",
    },
    {
      q: "Does my baby need fluoride supplements?",
      a: "It depends on your water supply. Your pediatrician or dentist can tell you if your baby needs fluoride drops or supplements.",
    },
  ],
  relatedLifeStagePages: [
    { name: "Children's Dental Health", slug: "childrens-dental-health", tagline: "Ages 4-12" },
    { name: "Teen Braces Guide", slug: "teen-braces-guide", tagline: "Ages 13-17" },
    { name: "Pregnancy & Dental Care", slug: "pregnancy-dental-care", tagline: "For Expecting Mothers" },
  ],
  relatedCostPage: { name: "Dental Cleaning Cost", slug: "dental-cleaning-cost" },
  relatedTreatmentPage: { name: "Dental Cleaning Procedure", slug: "dental-cleaning-procedure" },
};

export default function BabyTeethingGuide() {
  return <AgeSpecificTemplate data={data} />;
}
