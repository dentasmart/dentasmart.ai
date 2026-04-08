import LifestyleTemplate, { LifestylePageData } from "./LifestyleTemplate";

const data: LifestylePageData = {
  slug: "diet-and-teeth",
  topic: "Diet and Your Teeth",
  heroTitle: "Your Food Choices and",
  heroHighlight: "Your Smile's Future",
  heroDescription: "What you eat and drink has a huge impact on your oral health. Let's explore how simple dietary changes can protect your teeth for years to come, keeping your smile bright and healthy.",
  metaTitle: "Diet & Oral Health: How Food Affects Your Teeth | DentaSmart",
  metaDescription: "Discover how your diet impacts your teeth. Learn about sugar, acid erosion, and foods that strengthen enamel to prevent cavities and gum disease.",
  keywords: "diet and oral health, food for teeth, sugar and cavities, acid erosion, healthy teeth diet, DentaSmart",

  statsStrip: [
    { value: "92%", label: "of adults have had cavities in their permanent teeth" },
    { value: "Top 7", label: "Sugar-sweetened beverages are a top 7 source of sugar for Americans" },
    { value: "2X", label: "Acids in modern diets have doubled erosion rates in recent decades" },
  ],

  overviewTitle: "Fueling Your Body,",
  overviewHighlight: "Fortifying Your Teeth",
  overviewDescription: "Think of your mouth as a busy ecosystem. Every time you eat or drink, you're feeding that system. The right foods build strong teeth and healthy gums, while the wrong ones can lead to decay and disease. It's not about cutting out everything you love. It's about understanding the connection and making smarter choices.",
  overviewDescription2: "From the sugar in your soda to the calcium in your cheese, your diet directly influences your risk for cavities, enamel strength, and gum health. A few small adjustments can make a world of difference, and DentaSmart is here to guide you.",

  impacts: [
    {
      area: "Sugar & Cavities",
      detail: "Bacteria in your mouth feed on sugar, producing acids that eat away at your tooth enamel. This is the primary cause of cavities.",
    },
    {
      area: "Acid Erosion",
      detail: "Acidic foods and drinks like citrus, tomatoes, and soda can directly dissolve enamel, making teeth weak, sensitive, and prone to decay.",
    },
    {
      area: "Gum Health",
      detail: "A diet lacking key nutrients can weaken your gums' ability to fight off bacteria, leading to inflammation (gingivitis) and more serious gum disease.",
    },
    {
      area: "Enamel Strength",
      detail: "Foods rich in calcium and phosphorus, like dairy and nuts, help remineralize and strengthen your tooth enamel against acid attacks.",
    },
    {
      area: "Staining",
      detail: "Frequent consumption of coffee, tea, red wine, and dark berries can lead to stubborn surface stains on your teeth over time.",
    },
  ],

  doList: [
    { text: "Drink plenty of water, especially after meals, to rinse away food particles and acids." },
    { text: "Eat calcium-rich foods like milk, cheese, and yogurt to build strong teeth." },
    { text: "Choose crunchy fruits and vegetables like apples and carrots that naturally scrub your teeth." },
    { text: "Include phosphorus-rich foods like eggs, fish, and lean meat to protect enamel." },
    { text: "Chew sugar-free gum after eating to stimulate saliva flow, your body's natural defense." },
  ],

  dontList: [
    { text: "Sip on sugary or acidic drinks throughout the day. This creates a constant acid attack on your teeth." },
    { text: "Snack frequently on crackers, chips, and other starchy foods that get stuck in your teeth." },
    { text: "Forget to rinse with water after having coffee, tea, or red wine to minimize staining." },
    { text: "Eat sticky, sugary candies and dried fruits that cling to your teeth for long periods." },
    { text: "Go to bed without brushing, allowing plaque and acids to work on your teeth all night." },
  ],

  protectionTips: [
    {
      title: "Wait to Brush",
      description: "After eating or drinking something acidic, wait at least 30 minutes before brushing. Brushing too soon can scrub the acid deeper into your weakened enamel.",
    },
    {
      title: "Use a Straw",
      description: "When drinking soda, juice, or iced coffee, use a straw to minimize contact with your teeth.",
    },
    {
      title: "Pair Your Foods",
      description: "Eat acidic foods as part of a larger meal to buffer the acids. For example, have cheese with your wine.",
    },
    {
      title: "Smart Snacking",
      description: "If you need to snack, choose tooth-friendly options like nuts, cheese, or plain yogurt instead of sugary or starchy items.",
    },
    {
      title: "Hydration is Key",
      description: "A dry mouth is a breeding ground for bacteria. Drink water consistently throughout the day to keep your mouth clean and healthy.",
    },
  ],

  warningSignsTitle: "When to See a Dentist",
  warningSignsDescription: "Your body often signals when there's a problem. If you notice any of these signs, it's a good idea to schedule a check-up.",
  warningSigns: [
    "New or worsening tooth sensitivity to hot, cold, or sweet things.",
    "Gums that are red, swollen, tender, or bleed when you brush.",
    "A persistent bad taste in your mouth or bad breath.",
    "Visible pits, holes, or dark spots on your teeth.",
    "Pain when you bite or chew.",
    "Teeth that look shorter or have a yellowish, translucent appearance.",
  ],

  faqs: [
    {
      q: "Is diet soda better for my teeth than regular soda?",
      a: "While diet soda doesn't have sugar, it is still highly acidic and can erode your tooth enamel. It's best to limit all types of soda and drink more water instead.",
    },
    {
      q: "Are natural sugars like honey or maple syrup bad for my teeth?",
      a: "Yes, your mouth's bacteria can't tell the difference. All types of sugar, whether natural or processed, can contribute to tooth decay. It's all about how much and how often you consume them.",
    },
    {
      q: "How can I protect my teeth if I love snacking?",
      a: "Try to snack less often and choose healthier options like vegetables, nuts, or cheese. After snacking, rinse your mouth with water or chew sugar-free gum to help neutralize acids.",
    },
    {
      q: "Does drinking coffee through a straw really help?",
      a: "It can! Using a straw helps the liquid bypass your front teeth, reducing the direct contact that leads to staining and acid exposure. It's a small change that can make a difference.",
    },
    {
      q: "What are the best foods for strengthening my teeth?",
      a: "Focus on foods rich in calcium and phosphorus. Dairy products (milk, cheese, yogurt), lean proteins (meat, fish, eggs), and nuts are all excellent choices for building and maintaining strong enamel.",
    },
  ],

  relatedLifestylePages: [
    { name: "Smoking & Oral Health", slug: "smoking-and-oral-health", tagline: "The impact of tobacco on your smile." },
    { name: "Diabetes & Dental Care", slug: "diabetes-and-dental-care", tagline: "Managing your oral health with diabetes." },
    { name: "Sports Mouthguards", slug: "sports-mouthguards", tagline: "Protecting your teeth during physical activity." },
    { name: "Oral Piercing Risks", slug: "oral-piercing-risks", tagline: "What to know before you get a piercing." },
  ],

  relatedCostPage: { name: "Dental Cleaning Cost", slug: "dental-cleaning-cost" },
  relatedTreatmentPage: { name: "Teeth Whitening Procedure", slug: "teeth-whitening-procedure" },
};

export default function DietAndTeeth() {
  return <LifestyleTemplate data={data} />;
}
