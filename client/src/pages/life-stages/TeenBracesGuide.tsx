import AgeSpecificTemplate, { AgeSpecificPageData } from "./AgeSpecificTemplate";

const data: AgeSpecificPageData = {
  slug: "teen-braces-guide",
  ageGroup: "Teens (12-18)",
  heroTitle: "Your Guide to a Straighter Smile",
  heroHighlight: "Your Guide to Teen Braces",
  heroDescription: "Getting braces is a big step. This guide helps you understand your options, from traditional braces to Invisalign, and how to care for your teeth during treatment.",
  metaTitle: "Teen Braces Guide: Types, Cost, and Care | DentaSmart",
  metaDescription: "Is your teen ready for braces? Learn about the best age to start, types of braces, costs, insurance coverage, and how to help your teenager through treatment.",
  keywords: "teen braces, invisalign for teens, braces cost, braces care, orthodontic treatment, straight teeth, teen dental health",
  statsStrip: [
    { value: "~4 Million", label: "People in the U.S. wear braces" },
    { value: "24 Months", label: "Average treatment time" },
    { value: "75%", label: "of orthodontic patients are under 18" },
  ],
  overviewTitle: "Choosing the Right Path",
  overviewHighlight: "to a Confident Smile",
  overviewDescription: "Orthodontic treatment is more than just straightening teeth. It's about improving your overall oral health and boosting your confidence. For teens, this is a common journey, and today's options make it easier than ever. We'll walk you through the types of braces, what to expect, and how to manage life with them.",
  overviewDescription2: "From playing sports to eating your favorite foods, we've got you covered. Your orthodontist will create a personalized plan, but this guide provides the essential information you need to start the conversation and feel prepared for your treatment.",
  keyTips: [
    { title: "Brush and Floss Daily", description: "Food gets trapped easily. Use special flossers or a water flosser to clean around brackets and wires." },
    { title: "Wear Your Mouthguard", description: "If you play sports, a custom orthodontic mouthguard is essential to protect your braces and your mouth." },
    { title: "Follow Food Rules", description: "Avoid hard, sticky, and chewy foods that can break brackets or bend wires. This prevents emergency visits." },
    { title: "Keep Your Appointments", description: "Regular adjustment appointments are important for keeping your treatment on track." },
    { title: "Use Your Retainer", description: "After braces come off, your retainer is key to keeping your teeth in their new positions. Wear it as instructed." },
    { title: "Communicate with Your Orthodontist", description: "If something feels loose, broken, or painful, call your orthodontist right away." },
  ],
  milestones: [
    { age: "Age 12-14", title: "Initial Consultation & Treatment Start", description: "Most permanent teeth are in, making it an ideal time for orthodontic evaluation and starting treatment." },
    { age: "Age 14-16", title: "Active Treatment & Adjustments", description: "Regular visits to the orthodontist to adjust wires and monitor progress. Oral hygiene is critical during this phase." },
    { age: "Age 16-18", title: "Wisdom Teeth Evaluation", description: "Your dentist will monitor the development of wisdom teeth, which can sometimes impact your newly straightened smile." },
    { age: "Age 17-18+", title: "Braces Off & Retainer Phase", description: "The exciting day your braces are removed! You'll be fitted for a retainer to maintain your results." },
    { age: "Ongoing", title: "Lifetime Retention", description: "Wearing your retainer as prescribed, often at night, becomes a lifelong habit to protect your investment." },
  ],
  milestonesNote: "Timelines can vary for each person. Your orthodontist will provide a specific plan for you.",
  commonConcerns: [
    { concern: "Braces Types", detail: "You can choose from metal braces, ceramic (clear) braces, or Invisalign. Each has its own pros and cons regarding appearance, cost, and care." },
    { concern: "Invisalign for Teens", detail: "Clear aligners are a popular choice. They are removable, making cleaning easier, but require discipline to wear them 20-22 hours a day." },
    { concern: "Oral Hygiene", detail: "Brushing and flossing with braces takes extra time. We recommend special tools like floss threaders or a water flosser to keep your gums healthy." },
    { concern: "Wisdom Teeth", detail: "They usually emerge between 17 and 25. Your orthodontist will track their growth to ensure they don't crowd your newly aligned teeth." },
    { concern: "Playing Sports", detail: "You can still play sports! A custom-fitted orthodontic mouthguard is essential to protect your teeth and braces from injury." },
    { concern: "Foods to Avoid", detail: "Stay away from hard candy, nuts, popcorn, and sticky things like caramel. These can damage your braces and prolong treatment." },
  ],
  preventionTitle: "Protecting Your Smile During Treatment",
  preventionDescription: "Keeping your teeth healthy with braces is a team effort between you and your orthodontist. Following these tips will help you get the best results.",
  preventionTips: [
    { title: "Master Your Brushing", description: "Brush after every meal to remove food particles. Use a soft-bristled brush and angle it to clean above and below the brackets." },
    { title: "Floss, Floss, Floss", description: "Daily flossing is non-negotiable. A water flosser or orthodontic flosser can make this much easier and more effective." },
    { title: "Use Fluoride Rinse", description: "An alcohol-free fluoride mouthwash helps prevent cavities and strengthens enamel in hard-to-reach spots." },
    { title: "See Your General Dentist", description: "Continue with your regular dental checkups and cleanings every six months to keep your teeth and gums in top shape." },
    { title: "Protect Your Lips", description: "Your lips can get dry or irritated as they adjust to the braces. Keep lip balm handy to prevent chapping." },
  ],
  faqs: [
    { q: "Do braces hurt?", a: "You might feel some soreness or discomfort for a few days after getting them on or after an adjustment. This is normal and can be managed with over-the-counter pain relievers. It gets better quickly!" },
    { q: "How much do braces for a teen cost?", a: "The cost varies depending on the type of braces and treatment length. On average, it can range from $3,000 to $7,000. Dental insurance often covers a portion of this cost." },
    { q: "Can I get Invisalign instead of metal braces?", a: "Many teens are great candidates for Invisalign. Your orthodontist will determine if it's the right choice for your specific needs based on the complexity of your case." },
    { q: "How long will I have to wear braces?", a: "The average time is about 18 to 24 months, but it really depends on your individual needs. Some treatments are shorter, and some are longer." },
    { q: "What happens if a bracket or wire breaks?", a: "Don't panic! If a wire is poking you, you can use orthodontic wax to cover the sharp end. Call your orthodontist's office as soon as possible to schedule a repair." },
    { q: "Do I have to wear a retainer forever?", a: "Pretty much, yes. Teeth have a memory and want to shift back. Most people wear their retainer full-time for a few months, then switch to wearing it only at night for the long term." },
  ],
  relatedLifeStagePages: [
    { name: "Children's Dental Health", slug: "childrens-dental-health", tagline: "Building a foundation for a healthy smile." },
    { name: "Pregnancy Dental Care", slug: "pregnancy-dental-care", tagline: "Oral health tips for expecting mothers." },
    { name: "Senior Dental Care", slug: "senior-dental-care", tagline: "Maintaining your smile through the golden years." },
  ],
  relatedCostPage: { name: "Braces Cost", slug: "braces-cost" },
  relatedTreatmentPage: { name: "Braces Treatment", slug: "braces-treatment" },
};

export default function TeenBracesGuide() {
  return <AgeSpecificTemplate data={data} />;
}
