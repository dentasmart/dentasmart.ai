export interface OralHealthHubLink {
  title: string;
  description: string;
  href: string;
}

export interface OralHealthHubResourceGroup {
  id: "understand" | "treatment" | "healthy" | "help";
  title: string;
  description: string;
  links: readonly OralHealthHubLink[];
}

/**
 * The main Hub is the directory for existing Learn destinations. Keep these
 * first-party paths in one place so the rendered page and crawler-visible
 * fallback expose the same resource map.
 */
export const oralHealthHubResourceGroups: readonly OralHealthHubResourceGroup[] = [
  {
    id: "understand",
    title: "Understand Your Mouth",
    description: "Understand common dental conditions, symptoms, and changes in oral health.",
    links: [
      { title: "Conditions Guide", description: "Common dental conditions explained", href: "/oral-health-hub/conditions/" },
      { title: "Symptoms Guide", description: "Understand what different symptoms may mean", href: "/oral-health-hub/symptoms/" },
      { title: "Life Stages", description: "Oral health guidance for different ages and life stages", href: "/life-stages/" },
      { title: "Symptom Checker", description: "Educational tool to help organize dental concerns", href: "/symptom-quiz/" },
    ],
  },
  {
    id: "treatment",
    title: "Treatment & Cost",
    description: "Explore dental procedures, treatment choices, and costs.",
    links: [
      { title: "Treatment Guides", description: "Understand dental treatment options", href: "/treatments/" },
      { title: "Dental Costs", description: "Explore treatment pricing and cost factors", href: "/dental-costs/" },
      { title: "Comparison Guides", description: "Compare dental procedures and options", href: "/comparisons/" },
    ],
  },
  {
    id: "healthy",
    title: "Stay Healthy",
    description: "Discover prevention tips, healthy habits, and practical oral health education.",
    links: [
      { title: "Prevention Hub", description: "Preventive oral health information", href: "/oral-health-hub/prevention/" },
      { title: "Lifestyle & Oral Health", description: "How everyday habits affect oral health", href: "/lifestyle/" },
      { title: "Dental Guides", description: "Step-by-step educational dental guides", href: "/guides/" },
      { title: "Blog", description: "Browse oral health articles and educational content", href: "/oral-health-hub/#articles" },
    ],
  },
  {
    id: "help",
    title: "Get Help",
    description: "Find guidance for dental concerns, emergencies, and treatment decisions.",
    links: [
      { title: "Dental Emergencies", description: "Learn about urgent dental situations", href: "/dental-emergencies/" },
      { title: "Affordability Guide", description: "Understand options for managing dental costs", href: "/oral-health-hub/affordability/" },
      { title: "Second Opinion Hub", description: "Understand when another professional opinion may help", href: "/oral-health-hub/second-opinion/" },
      { title: "FAQs", description: "Answers to common oral health questions", href: "/faqs/" },
    ],
  },
];

export const oralHealthHubPopularTopics = [
  { title: "Cavities", description: "Signs, prevention, and treatment information", href: "/conditions/cavities/", search: "cavities" },
  { title: "Gum Disease", description: "Learn about gum health concerns", href: "/conditions/gum-disease/", search: "gum disease" },
  { title: "Tooth Pain", description: "Understand common pain concerns", href: "/symptoms/tooth-pain-when-biting/", search: "tooth pain" },
  { title: "Tooth Sensitivity", description: "Explore sensitivity and next steps", href: "/symptoms/tooth-sensitivity/", search: "tooth sensitivity" },
  { title: "Wisdom Teeth", description: "Read about wisdom tooth discomfort", href: "/conditions/wisdom-teeth-pain/", search: "wisdom teeth" },
  { title: "Root Canal", description: "Review the procedure and questions to ask", href: "/treatments/root-canal-procedure/", search: "root canal" },
  { title: "Buck Teeth / Overjet", description: "Understand overjet and treatment conversations", href: "/oral-health-hub/buck-teeth/", search: "buck teeth" },
  { title: "Dental Crowns", description: "Learn how crowns are used and cared for", href: "/treatments/dental-crown-procedure/", search: "dental crown" },
  { title: "Dental Emergencies", description: "Know when prompt care may be needed", href: "/dental-emergencies/", search: "dental emergency" },
] as const;

export const oralHealthHubSearchTopics = [
  "Tooth Pain",
  "Cavities",
  "Gum Disease",
  "Root Canal",
  "Braces",
  "Dental Costs",
] as const;
