import AgeSpecificTemplate, { AgeSpecificPageData } from "./AgeSpecificTemplate";

const data: AgeSpecificPageData = {
  slug: "childrens-dental-health",
  ageGroup: "Children (3-12)",
  heroTitle: "A Healthy Smile for Your Child:",
  heroHighlight: "Guidance for Ages 3 to 12",
  heroDescription: "Review cavity prevention, tooth development, sports protection, and common reasons to ask a dentist or orthodontist for an evaluation.",
  metaTitle: "Children's Dental Health Guide (Ages 3-12) | DentaSmart",
  metaDescription: "Review dental care for ages 3 to 12, including fluoride toothpaste, sealants, tooth development, sports protection, and orthodontic evaluation.",
  keywords: "childrens dental health, cavity prevention, dental sealants, fluoride treatment, losing baby teeth, pediatric dentist, kids oral hygiene",
  statsStrip: [
    { value: "Daily", label: "children still need adult help with effective cleaning" },
    { value: "Sealants", label: "may protect back teeth based on a child's cavity risk" },
    { value: "Age 7", label: "is a common milestone for an orthodontic screening" },
  ],
  overviewTitle: "Setting Up a Future of Healthy Teeth",
  overviewHighlight: "Habits change as teeth develop.",
  overviewDescription: "Children move from baby teeth to a mixed set of baby and permanent teeth. Brushing support, cleaning between teeth, fluoride, diet, sealants, and dental visits should match the child's age and cavity risk.",
  overviewDescription2: "Regular dental visits help us catch any issues early. We can also protect their teeth during sports and guide their jaw growth. Let's work together to keep their smile bright and healthy for years to come.",
  keyTips: [
    { title: "Brush for Two Minutes, Twice a Day", description: "Use a pea-sized amount of fluoride toothpaste. Make it fun with a song or timer!" },
    { title: "Floss Daily", description: "Once your child's teeth touch, it's time to start flossing to clean between them." },
    { title: "Limit Sugary Snacks and Drinks", description: "Sugar feeds the bacteria that cause cavities. Offer water and healthy snacks instead." },
    { title: "Ask About Sealants", description: "Sealants are a thin, protective coating applied to the chewing surfaces of back teeth." },
    { title: "Wear a Mouthguard for Sports", description: "Protect your child's teeth from injury during contact sports." },
    { title: "Regular Dental Check-ups", description: "Schedule visits every six months for a cleaning and exam." },
  ],
  milestones: [
    { age: "Age 3", title: "All Baby Teeth Are In", description: "Your child should have a full set of 20 baby teeth. Brushing is more important than ever." },
    { age: "Age 4-6", title: "Developing Brushing Skills", description: "Your child may want to brush on their own, but they still need your help to do a thorough job." },
    { age: "Age 6-7", title: "First Baby Teeth Start to Loosen", description: "The lower front teeth are usually the first to go. This is a normal and exciting process!" },
    { age: "Age 7", title: "First Orthodontic Check-up", description: "The American Association of Orthodontists recommends a check-up by age 7 to spot any potential issues with jaw growth or emerging teeth." },
    { age: "Age 6-12", title: "Permanent Teeth Arrive", description: "A mix of baby and permanent teeth is common. Keep up with good hygiene to protect the new teeth." },
    { age: "Age 12", title: "Most Permanent Teeth Are In", description: "By now, your child will have most of their permanent teeth, except for wisdom teeth." },
  ],
  commonConcerns: [
    { concern: "Cavities (Dental Caries)", detail: "Cavities are the most common chronic disease of childhood. We can prevent them with good habits, sealants, and fluoride." },
    { concern: "Thumb Sucking or Pacifier Use", detail: "Most children stop on their own. If it continues past age 4, it can affect how their teeth line up. We can offer gentle guidance." },
    { concern: "Losing Baby Teeth", detail: "It's normal for baby teeth to become loose and fall out. If a permanent tooth comes in before the baby tooth is out, let us know." },
    { concern: "Fear of the Dentist", detail: "We strive to make every visit positive and fun. You can help by talking about the dentist in a friendly way." },
    { concern: "Tooth Grinding (Bruxism)", detail: "Many kids grind their teeth, especially at night. Most outgrow it without any harm to their teeth." },
  ],
  preventionTitle: "Proactive Steps for a Healthy Smile",
  preventionDescription: "Preventive care is the key to avoiding dental problems. A few simple steps at home and in our office can protect your child's teeth for a lifetime.",
  preventionTips: [
    { title: "Dental Sealants", description: "Sealants act like a raincoat for teeth, shielding the grooves of molars from food and germs that cause decay." },
    { title: "Fluoride Treatments", description: "Professional fluoride treatments strengthen tooth enamel, making it more resistant to acid attacks from sugar." },
    { title: "Custom Sports Mouthguards", description: "A custom-fit mouthguard provides the best protection against dental injuries during sports." },
    { title: "Orthodontic Evaluation", description: "An early check-up allows us to identify and address potential bite or alignment issues before they become more complex." },
    { title: "Healthy Diet Counseling", description: "We can help you identify tooth-friendly snacks and drinks to reduce your child's risk of cavities." },
  ],
  faqs: [
    { q: "When should my child have their first dental visit?", a: "The American Academy of Pediatric Dentistry recommends the first visit when the first tooth appears, or no later than their first birthday. For this age group, visits every six months are key." },
    { q: "Are dental X-rays safe for my child?", a: "Yes. We use modern digital X-rays that emit very low levels of radiation. They are a vital tool for seeing what's happening between the teeth and under the gums." },
    { q: "What are dental sealants?", a: "Sealants are a thin, plastic coating painted on the chewing surfaces of molars to prevent cavities. The CDC states they can prevent 80% of cavities." },
    { q: "My child is scared of the dentist. What can I do?", a: "Stay positive! You can read books or watch videos about visiting the dentist. We will explain everything we are doing in a kid-friendly way to make them comfortable." },
    { q: "How can I get my child to brush their teeth properly?", a: "Make it a routine and make it fun. Use a timer, play a song, or brush your teeth together. We can also show you and your child the best techniques at your next visit." },
    { q: "When should my child see an orthodontist?", a: "The American Association of Orthodontists recommends an initial screening at age 7. This doesn't mean your child will get braces right away, but it helps us check on their jaw and tooth development." },
  ],
  relatedLifeStagePages: [
    { name: "Baby Teething Guide", slug: "baby-teething-guide", tagline: "Soothing your baby's gums." },
    { name: "Teen Braces Guide", slug: "teen-braces-guide", tagline: "Understanding orthodontic care." },
    { name: "Pregnancy & Dental Care", slug: "pregnancy-dental-care", tagline: "Oral health for expecting mothers." },
  ],
  relatedCostPage: { name: "Braces Cost", slug: "braces-cost" },
  relatedTreatmentPage: { name: "Braces Treatment", slug: "braces-treatment" },
};

export default function ChildrensDentalHealth() {
  return <AgeSpecificTemplate data={data} />;
}
