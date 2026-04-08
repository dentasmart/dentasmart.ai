import EmergencyPageTemplate, { EmergencyPageData } from './EmergencyPageTemplate';

const data: EmergencyPageData = {
  slug: 'dental-emergency-guide',
  emergencyName: 'Dental Emergency Guide',
  heroTitle: 'Is It a Real Dental Emergency?',
  heroHighlight: 'How to Know When to Act Fast',
  heroDescription: "Figuring out if you need immediate dental care can be stressful. This guide helps you decide between the ER and a dentist, and tells you what to do while you wait for help.",
  metaTitle: 'Dental Emergency Guide: When to See a Dentist or Go to the ER',
  metaDescription: 'Learn how to identify a true dental emergency, what steps to take immediately, and whether to visit a dentist or an emergency room. Your guide to fast, effective care.',
  keywords: 'dental emergency, when to go to er for tooth pain, emergency dentist, urgent dental care, dental emergency guide',
  urgencyBanner: 'In pain? Unsure what to do? Call us for immediate guidance.',

  statsStrip: [
    { value: '500,000+', label: 'ER Visits for Dental Issues Annually in the U.S.' },
    { value: 'Under 30 Min', label: 'Is The Goal For Re-Implanting A Knocked-Out Tooth' },
    { value: '79%', label: 'Of Dental Emergencies Happen Outside Business Hours' },
  ],

  whatHappenedTitle: "What is a Dental Emergency?",
  whatHappenedHighlight: "Not all dental problems are emergencies.",
  whatHappenedDescription: "A dental emergency is any issue that needs immediate treatment to stop bleeding, save a tooth, or relieve severe pain. This includes problems like a knocked-out tooth, a dental abscess, or uncontrolled bleeding after a procedure. Issues like a small chip or a lost filling can usually wait for a regular appointment.",
  whatHappenedDescription2: "Knowing the difference helps you get the right care quickly without unnecessary trips to the ER. If you have severe pain, swelling, or a fever, it's a sign you need to act fast. When in doubt, it's always best to call a dental professional for advice.",

  immediateSteps: [
    {
      step: '1',
      title: 'Stay Calm and Assess',
      description: "Take a deep breath. Look in your mouth. Can you see where the pain or problem is? Is there bleeding? A loose or broken tooth?",
    },
    {
      step: '2',
      title: 'Call a Dentist First',
      description: "Even if it's after hours, call a dentist's office. Their voicemail often has instructions for emergencies. They can tell you if you need to go to the ER or if you can wait to see them.",
    },
    {
      step: '3',
      title: 'Manage Pain and Swelling',
      description: "For pain, you can take over-the-counter pain relievers like ibuprofen. A cold compress on your cheek can help reduce swelling. Don't put pain medication directly on your gums.",
    },
    {
      step: '4',
      title: 'Control Any Bleeding',
      description: "If there's bleeding, bite down gently on a clean piece of gauze or a wet tea bag for 15-20 minutes. If bleeding is heavy and won't stop, go to the ER.",
    },
  ],
  immediateStepsNote: "These steps are a temporary guide. Professional dental care is essential.",

  warningSignsTitle: "ER or Dentist?",
  warningSigns: [
    {
      sign: 'Go to the ER Now',
      detail: 'Uncontrolled bleeding, difficulty breathing or swallowing, or a facial injury along with your dental problem.',
      severity: 'urgent',
    },
    {
      sign: 'Call an Emergency Dentist',
      detail: 'Severe pain, a knocked-out tooth, a painful abscess (pimple on the gum), or swelling in your jaw or face.',
      severity: 'moderate',
    },
    {
      sign: 'Schedule a Regular Visit',
      detail: 'A lost filling, a chipped tooth with no pain, or dull toothache that comes and goes.',
      severity: 'watch',
    },
  ],

  dosDonts: {
    dos: [
      "Call your dentist, even if it's after hours.",
      "Use a cold compress for swelling.",
      "Rinse your mouth with warm salt water.",
      "Try to find any broken tooth pieces.",
    ],
    donts: [
      "Don't ignore severe pain or swelling.",
      "Don't put aspirin directly on your gums.",
      "Don't try to glue a crown back in yourself.",
      "Don't wait to see if a serious problem gets better on its own.",
    ],
  },

  whenToSeeTitle: "When to Seek Professional Care",
  whenToSeeDescription: "It's always better to be safe than sorry. Contact a professional if you experience any of these:",
  whenToSeeItems: [
    "Pain that is severe or doesn't get better with medication.",
    "Swelling in your face, gums, or jaw.",
    "A tooth that has been knocked out or is very loose.",
    "Bleeding from the mouth that won't stop.",
    "A pimple-like bump on your gums, which could be an abscess.",
  ],

  faqs: [
    {
      q: "How can I tell if my toothache is an emergency?",
      a: "If your toothache is severe, constant, and throbbing, it's an emergency. Pain that wakes you up at night or is accompanied by fever or swelling needs immediate attention. A minor ache that comes and goes can likely wait for a regular appointment.",
    },
    {
      q: "What if my emergency happens at night or on a weekend?",
      a: "Many dental offices have an after-hours number for emergencies. Call your dentist first. If you can't reach them and your symptoms are severe (like major swelling or bleeding), you may need to go to an urgent care center or the ER.",
    },
    {
      q: "Will the ER pull a tooth?",
      a: "Usually, no. Hospital emergency rooms are not equipped for dental procedures like fillings or extractions. They can provide antibiotics for an infection and pain medication, but they will refer you to a dentist for definitive treatment.",
    },
    {
      q: "How much does an emergency dental visit cost?",
      a: "Costs vary widely. An emergency exam can range from $100 to $300. Treatment for the actual problem, like a root canal or extraction, will be an additional cost. Dental insurance may cover a portion of these fees.",
    },
    {
      q: "What should I have in a dental emergency kit?",
      a: "A good kit includes gauze, a small container with a lid (for a knocked-out tooth), over-the-counter pain medication (like ibuprofen), and your dentist's contact information. A tea bag can also help with bleeding.",
    },
  ],

  relatedEmergencyPages: [
    { name: "Knocked-Out Tooth", slug: "knocked-out-tooth", tagline: "What to do when you've lost a tooth." },
    { name: "Broken or Chipped Tooth", slug: "broken-tooth", tagline: "Repairing damage and relieving pain." },
    { name: "Severe Toothache", slug: "severe-toothache", tagline: "Finding the cause of intense tooth pain." },
    { name: "Dental Abscess", slug: "dental-abscess", tagline: "Treating a dangerous dental infection." },
  ],
};

export default function DentalEmergencyGuide() {
  return <EmergencyPageTemplate data={data} />;
}
