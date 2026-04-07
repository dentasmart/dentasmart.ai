import CostPageTemplate, { CostPageData } from './CostPageTemplate';

const data: CostPageData = {
  slug: 'dental-implant-cost',
  procedureName: 'Dental Implant',
  heroTitle: 'What\'s the Real Cost of a',
  heroHighlight: 'Dental Implant?',
  heroDescription: 'A dental implant is a permanent solution for a missing tooth. It looks and feels like a real tooth, but the price can be confusing. We\'ll break down the real costs so you know what to expect.',
  metaTitle: 'Dental Implant Cost 2026: Full Breakdown | DentaSmart',
  metaDescription: 'How much does a dental implant cost in 2026? Get a full breakdown of costs, from $3,000 to $6,000. Learn about factors that affect the price and how to save.',
  keywords: 'dental implant cost, cost of dental implant, single tooth implant cost, full mouth dental implants cost',
  statsStrip: [
    { value: '$4,500', label: 'Average Single Implant' },
    { value: '98%', label: 'Success Rate' },
    { value: '20+ Years', label: 'Average Lifespan' },
  ],
  problemTitle: 'That missing tooth is more than just a gap in your smile.',
  problemHighlight: 'It\'s a bigger problem.',
  problemDescription: 'A missing tooth can cause your other teeth to shift, leading to bite problems and even bone loss in your jaw. It can make it harder to eat and speak clearly. Plus, many people feel self-conscious about a gap in their smile.',
  problemDescription2: 'Ignoring it won\'t make it go away. In fact, the longer you wait, the more complex and expensive the solution can become. A dental implant is the closest thing to getting your natural tooth back.',
  costBreakdown: [
    { type: 'Implant Post (Titanium Screw)', range: '$1,000 - $3,000', average: '$2,000', notes: 'This is the part that goes into your jawbone.' },
    { type: 'Abutment (Connector)', range: '$500 - $1,000', average: '$750', notes: 'Connects the implant post to the crown.' },
    { type: 'Crown (The \'Tooth\')', range: '$800 - $3,000', average: '$1,750', notes: 'The visible part that looks like a tooth.' },
    { type: 'Initial Consultation & 3D Scan', range: '$400 - $950', average: '$675', notes: 'Essential for planning the procedure.' },
    { type: 'Tooth Extraction (if needed)', range: '$150 - $500', average: '$325', notes: 'To remove a damaged tooth before placing the implant.' },
  ],
  costFactors: [
    { factor: 'Geographic Location', impact: 'Major cities are often 20-50% more expensive.', tip: 'Consider looking at clinics in suburban areas to save.' },
    { factor: 'Dentist\'s Experience', impact: 'Specialists like oral surgeons cost more but have higher success rates.', tip: 'Don\'t just look at the price. Check reviews and ask about their experience with implants.' },
    { factor: 'Implant Material', impact: 'Premium brands like Straumann or Nobel Biocare are more expensive but have a long track record.', tip: 'Ask your dentist what brand they use and why. A cheaper implant might cost you more in the long run.' },
    { factor: 'Bone Grafting', impact: 'If you\'ve lost bone in your jaw, you may need a bone graft, which can add $800 - $3,500 to the cost.', tip: 'The longer you wait to replace a missing tooth, the more likely you are to need a bone graft.' },
  ],
  insuranceTips: [
    { title: 'Check Your Coverage', description: 'Some dental insurance plans cover a portion of implant costs, often up to 50%. Call your provider to understand your specific benefits.' },
    { title: 'Use Your FSA or HSA', description: 'You can use pre-tax dollars from your Flexible Spending Account (FSA) or Health Savings Account (HSA) to pay for dental implants.' },
    { title: 'Ask About Payment Plans', description: 'Many dental offices offer in-house financing or work with third-party lenders like CareCredit to offer payment plans.' },
    { title: 'Look for Dental Schools', description: 'Dental schools can offer lower-cost implants as part of their training programs. The work is done by students but supervised by experienced dentists.' },
  ],
  savingsWithDentaSmart: [
    { title: 'Transparent Pricing', description: 'We show you the real costs upfront, so there are no surprises. You\'ll know exactly what you\'re paying for.' },
    { title: 'Access to Top Dentists', description: 'We\'ve vetted a network of experienced dentists who offer fair pricing. You can be confident you\'re getting quality care.' },
    { title: 'Financing Options', description: 'We can help you find flexible payment options that fit your budget, so you can get the care you need now.' },
  ],
  faqs: [
    { q: 'How long do dental implants last?', a: 'With proper care, dental implants can last a lifetime. The crown may need to be replaced every 15-20 years due to wear and tear.' },
    { q: 'Is the procedure painful?', a: 'The surgery is done under local anesthesia, so you won\'t feel any pain. Most people say it\'s less painful than a tooth extraction.' },
    { q: 'How long does the process take?', a: 'From start to finish, the process can take 3 to 9 months. This includes time for the implant to fuse with your jawbone.' },
    { q: 'Am I a good candidate for dental implants?', a: 'Most people in good general health are candidates. You need to have healthy gums and enough bone to hold the implant.' },
    { q: 'What is the success rate of dental implants?', a: 'Dental implants have a success rate of up to 98%. This makes them one of the most reliable ways to replace missing teeth.' },
  ],
  relatedCostPages: [
    { name: 'Root Canal Cost', slug: 'root-canal-cost', price: '$700 - $2,000' },
    { name: 'Dental Crown Cost', slug: 'dental-crown-cost', price: '$800 - $2,500' },
    { name: 'Dentures Cost', slug: 'dentures-cost', price: '$1,500 - $4,000' },
    { name: 'Tooth Extraction Cost', slug: 'tooth-extraction-cost', price: '$150 - $500' },
  ],
};

const DentalImplantCostPage = () => {
  return <CostPageTemplate data={data} />;
};

export default DentalImplantCostPage;
