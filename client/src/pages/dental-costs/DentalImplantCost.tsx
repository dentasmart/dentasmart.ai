import CostPageTemplate, { CostPageData } from './CostPageTemplate';

const data: CostPageData = {
  slug: 'dental-implant-cost',
  procedureName: 'Dental Implant',
  heroTitle: 'What Does a',
  heroHighlight: 'Dental Implant?',
  heroDescription: 'A dental implant estimate may include the implant post, abutment, crown, imaging, and related procedures. Review each part before treatment.',
  metaTitle: 'Dental Implant Cost 2026: Breakdown | DentaSmart',
  metaDescription: 'Review the parts of a dental implant estimate, factors that affect the total, insurance questions, and possible related procedures.',
  keywords: 'dental implant cost, cost of dental implant, single tooth implant cost, full mouth dental implants cost',
  statsStrip: [
    { value: 'Multi-part', label: 'Treatment Estimate' },
    { value: 'Varies', label: 'By Case and Provider' },
    { value: 'Confirm', label: 'Coverage Before Treatment' },
  ],
  problemTitle: 'A Missing Tooth Can Affect',
  problemHighlight: 'Your Bite and Jawbone',
  problemDescription: 'A missing tooth can cause your other teeth to shift, leading to bite problems and even bone loss in your jaw. It can make it harder to eat and speak clearly. Plus, many people feel self-conscious about a gap in their smile.',
  problemDescription2: 'The final cost depends on your mouth, the replacement plan, and whether you need procedures such as an extraction or bone graft. A dentist can compare an implant with a bridge or removable denture.',
  costBreakdown: [
    { type: 'Implant Post (Titanium Screw)', range: '$1,000 - $3,000', average: '$2,000', notes: 'This is the part that goes into your jawbone.' },
    { type: 'Abutment (Connector)', range: '$500 - $1,000', average: '$750', notes: 'Connects the implant post to the crown.' },
    { type: 'Crown (The \'Tooth\')', range: '$800 - $3,000', average: '$1,750', notes: 'The visible part that looks like a tooth.' },
    { type: 'Initial Consultation & 3D Scan', range: '$400 - $950', average: '$675', notes: 'Used to assess the site and plan the procedure.' },
    { type: 'Tooth Extraction (if needed)', range: '$150 - $500', average: '$325', notes: 'To remove a damaged tooth before placing the implant.' },
  ],
  costFactors: [
    { factor: 'Geographic Location', impact: 'Fees vary by region, practice, and local operating costs.', tip: 'Request written estimates from more than one qualified provider if you want to compare prices.' },
    { factor: 'Dentist\'s Experience', impact: 'A specialist may charge differently from a general dentist.', tip: 'Ask who will perform each part of treatment and what follow-up care is included.' },
    { factor: 'Implant System', impact: 'The implant system, laboratory work, and crown material can affect the estimate.', tip: 'Ask which system and materials are included and why they were recommended.' },
    { factor: 'Bone Grafting', impact: 'A bone graft can add another procedure, healing period, and fee.', tip: 'Ask whether imaging shows enough bone and whether grafting is included in the estimate.' },
  ],
  insuranceTips: [
    { title: 'Check Your Coverage', description: 'Implant coverage varies by plan. Ask about exclusions, deductibles, annual maximums, waiting periods, and network rules.' },
    { title: 'Use Your FSA or HSA', description: 'You can use pre-tax dollars from your Flexible Spending Account (FSA) or Health Savings Account (HSA) to pay for dental implants.' },
    { title: 'Ask About Payment Plans', description: 'Some dental offices offer financing or work with third-party lenders. Review the total cost, fees, interest, and repayment terms.' },
    { title: 'Look for Dental Schools', description: 'Dental schools can offer lower-cost implants as part of their training programs. The work is done by students but supervised by experienced dentists.' },
  ],
  savingsWithDentaSmart: [
    { title: 'Understand the Estimate', description: 'Use DentaSmart cost guides to review common implant charges and prepare questions for the dental office.' },
    { title: 'Compare Treatment Documents', description: 'Keep supported treatment documents together when you are comparing recommendations or requesting a second opinion.' },
    { title: 'Prepare Cost Questions', description: 'Write down questions about imaging, grafting, the implant system, the crown, follow-up care, and financing terms.' },
  ],
  faqs: [
    { q: 'How long do dental implants last?', a: 'Dental implants are designed for long-term use, but lifespan varies. The implant, crown, gums, and surrounding bone need ongoing care and monitoring.' },
    { q: 'Is the procedure painful?', a: 'The area is usually numbed before implant placement. Soreness can occur afterward, and your dental team can explain how to manage it safely.' },
    { q: 'How long does the process take?', a: 'The process often takes several months because the implant site needs time to heal. Your timeline depends on the site and any related procedures.' },
    { q: 'Am I a good candidate for dental implants?', a: 'A dentist must review your health history, gums, jawbone, medications, and healing risks before recommending an implant.' },
    { q: 'How predictable is dental implant treatment?', a: 'Results vary by the implant site, bone and gum health, medical history, smoking, home care, and follow-up. Ask your dentist what risks apply to you.' },
  ],
  relatedCostPages: [
    { name: 'Root Canal Cost', slug: 'root-canal-cost', price: '$700 - $2,000' },
    { name: 'Dental Crown Cost', slug: 'dental-crown-cost', price: '$800 - $2,500' },
    { name: 'Dentures Cost', slug: 'dentures-cost', price: '$1,500 - $4,000' },
    { name: 'Tooth Extraction Cost', slug: 'tooth-extraction-cost', price: '$150 - $500' },
  ],
  relatedTreatmentPage: { name: "Dental Implant Procedure", slug: "dental-implant-procedure" },
};

const DentalImplantCostPage = () => {
  return <CostPageTemplate data={data} />;
};

export default DentalImplantCostPage;
