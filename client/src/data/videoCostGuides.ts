import type { GuideData } from "./guides";

export const videoCostGuides: Record<string, GuideData> = {
  "how-to-read-dental-treatment-plan": {
    slug: "how-to-read-dental-treatment-plan",
    category: "affordability",
    title: "How to Read a Dental Treatment Plan and Written Estimate",
    metaTitle: "How to Read a Dental Treatment Plan | DentaSmart",
    metaDescription:
      "Learn how to check dental procedure codes, tooth numbers, treatment phases, alternatives, insurance estimates, and expected costs before care.",
    primaryKeyword: "how to read a dental treatment plan",
    secondaryKeywords: [
      "dental treatment estimate",
      "itemized dental treatment plan",
      "dental procedure codes",
      "questions to ask before dental work",
      "dental second opinion",
    ],
    heroHeading: "How to Read a Dental Treatment Plan",
    heroSubheading:
      "Turn a list of codes, teeth, and estimated charges into clear questions you can take back to the dental office.",
    introduction:
      "A dental treatment plan should tell you what the office recommends, where the work would be done, how the care may be sequenced, and what the office currently expects it to cost. It is still an estimate. Coverage, clinical findings, and the services ultimately provided can change the final amount. Before you agree, ask the office to walk through each line and put the answers in writing.",
    steps: [
      {
        title: "Match each line to a tooth or area",
        content:
          "Start with the tooth number, surface, arch, or area listed beside each service. Ask the dental team to show you the same location on an image, diagram, or mirror. This makes it easier to understand the recommendation and compare another dentist's assessment later.",
        tip: "Write your main concern beside the matching line, such as pain when biting, a broken edge, or no current symptoms.",
      },
      {
        title: "Ask what each procedure code describes",
        content:
          "Dental claims commonly use CDT procedure codes. A code identifies the service being proposed or billed, but it does not explain why the service fits your situation. Ask for the plain-language name of every code and what finding supports it.",
        tip: "If a line combines several services, ask whether the office can show each service and fee separately.",
      },
      {
        title: "Separate diagnosis from the proposed treatment",
        content:
          "Ask the dentist to name the finding first, then explain the treatment being recommended for it. Two treatment options can address the same problem in different ways. Understanding the finding helps you ask about alternatives without assuming that the least expensive option is suitable.",
      },
      {
        title: "Sort the plan by urgency",
        content:
          "Ask which items need prompt attention, which can be monitored, and which are elective. The answer should be tied to your symptoms, examination, and images. If you have facial swelling, trouble breathing or swallowing, uncontrolled bleeding, major trauma, or rapidly worsening symptoms, seek urgent professional care rather than delaying for price comparison.",
        tip: "A useful question is: What could change if I wait, and what symptoms would mean I should call sooner?",
      },
      {
        title: "Review treatment alternatives and tradeoffs",
        content:
          "Ask whether there are reasonable alternatives, including monitoring when appropriate. Compare expected durability, maintenance, number of visits, effect on nearby teeth, and what may happen if no treatment is chosen. A lower initial fee does not always mean a lower total cost, and a higher fee does not prove that a treatment is necessary.",
      },
      {
        title: "Check what the estimate includes",
        content:
          "Look for exam fees, imaging, temporary work, laboratory charges, anesthesia or sedation, follow-up visits, and any separate specialist fee. Ask whether the estimate assumes an in-network rate, a plan payment, or a discount. Make sure the estimate identifies what could cause the total to change.",
      },
      {
        title: "Treat insurance figures as estimates",
        content:
          "A dental office may estimate what a plan will pay using the information available that day. The plan document and final claim processing control the benefit. Ask whether a pre-treatment estimate is available, whether the service has a waiting period or frequency limit, and how much of your annual maximum remains.",
      },
      {
        title: "Compare written plans on the same basis",
        content:
          "When comparing two plans, line up the diagnosis, tooth or area, procedure code, material, number of visits, and included follow-up. A total-price comparison can be misleading when one plan includes services that the other leaves out.",
      },
      {
        title: "Keep the plan, estimate, EOB, and final bill together",
        content:
          "Save the version you agreed to and any updates made during care. When the plan processes the claim, compare the Explanation of Benefits with the final itemized bill. If a code, date, or amount differs, ask the office or plan to explain the specific line.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Reading only the total",
        correction:
          "Review each tooth, code, fee, and treatment phase. Two plans with similar totals may include different services.",
      },
      {
        mistake: "Treating an insurance estimate as a guarantee",
        correction:
          "Ask which assumptions were used and confirm the plan's current rules, remaining benefit, and final claim decision.",
      },
      {
        mistake: "Assuming every recommendation has the same urgency",
        correction:
          "Ask the dentist to rank the plan and explain the clinical reason for that order.",
      },
      {
        mistake: "Comparing prices without comparing scope",
        correction:
          "Compare the same codes, materials, visits, and follow-up before judging the difference.",
      },
      {
        mistake: "Leaving with unanswered questions",
        correction:
          "Ask for a written copy and note the questions that still need an answer before you consent.",
      },
    ],
    keyTakeaways: [
      "Match every proposed service to a tooth, area, and plain-language reason.",
      "Ask which care is urgent, which can be monitored, and what could change if you wait.",
      "Compare alternatives by clinical tradeoffs, visits, maintenance, and total scope, not price alone.",
      "Confirm what the written estimate includes and what could change the final amount.",
      "Treat a pre-treatment insurance estimate as useful planning information, not a payment guarantee.",
      "Keep the plan, EOB, and final bill so you can compare codes, dates, and amounts later.",
    ],
    faqs: [
      {
        question: "What should a dental treatment plan include?",
        answer:
          "A useful plan identifies the proposed services, the tooth or area involved, procedure codes when available, expected sequence, estimated fees, and any insurance assumptions. Ask the office to explain anything that is grouped or unclear.",
      },
      {
        question: "Is a dental treatment estimate the final price?",
        answer:
          "No. It reflects the information available when the office prepared it. The final amount can change with claim processing, remaining benefits, network rules, or a change in the services provided.",
      },
      {
        question: "Can I ask which dental treatment is most urgent?",
        answer:
          "Yes. Ask the dentist to explain the clinical reason for the order, what can be monitored, what could happen if you wait, and which symptoms should prompt an earlier call.",
      },
      {
        question: "Can I ask for alternatives to a recommended dental procedure?",
        answer:
          "Yes. Ask which alternatives are clinically reasonable for your situation and compare their likely durability, maintenance, visits, effect on nearby teeth, and expected cost.",
      },
      {
        question: "What is a dental pre-treatment estimate?",
        answer:
          "It is a plan's advance estimate of how proposed services may be processed under your current benefits. It can help with planning, but it is not a guarantee of payment.",
      },
      {
        question: "When should I consider a dental second opinion?",
        answer:
          "Another licensed dentist may be helpful when a major recommendation remains unclear, the options have different long-term tradeoffs, or you want an independent assessment before non-urgent care. Do not postpone urgent evaluation for severe or rapidly worsening symptoms.",
      },
    ],
    relatedConditions: [],
    relatedSymptoms: [],
    relatedGuides: [
      { slug: "when-to-get-dental-second-opinion", title: "When to Get a Dental Second Opinion" },
      { slug: "how-to-read-dental-eob", title: "How to Read a Dental EOB" },
      { slug: "dental-bill-higher-than-expected", title: "When a Dental Bill Is Higher Than Expected" },
      { slug: "affordable-dental-care", title: "How to Find Affordable Dental Care" },
    ],
    relatedResources: [
      { href: "/dental-costs/", title: "Dental Cost Guides", description: "Review cost factors for common dental procedures." },
      { href: "/oral-health-hub/affordability/", title: "Affordability Hub", description: "Find more ways to prepare for dental costs." },
    ],
    sources: [
      {
        organization: "Delta Dental",
        title: "Understanding your Explanation of Benefits",
        url: "https://www.deltadental.com/protect-my-smile/dental-insurance-101/explanation-of-benefits-eob/",
        note: "Explains procedure codes, submitted amounts, allowed amounts, plan payments, and patient responsibility.",
      },
      {
        organization: "FAIR Health Consumer",
        title: "Dental cost information",
        url: "https://www.fairhealthconsumer.org/",
        note: "Provides independent geographic cost estimates and explains why charges and allowed amounts can differ.",
      },
      {
        organization: "Consumer Financial Protection Bureau",
        title: "Medical credit cards and payment plans",
        url: "https://www.consumerfinance.gov/ask-cfpb/what-should-i-know-about-medical-credit-cards-and-payment-plans-for-medical-bills-en-1827/",
        note: "Explains why treatment cost and financing terms should be understood before signing a credit agreement.",
      },
    ],
    ctaHeading: "Organize your questions before the next visit",
    ctaButton: "Explore DentaSmart",
  },

  "dental-insurance-annual-maximum": {
    slug: "dental-insurance-annual-maximum",
    category: "affordability",
    title: "Dental Insurance Annual Maximum Explained",
    metaTitle: "Dental Insurance Annual Maximum Explained | DentaSmart",
    metaDescription:
      "Learn how a dental annual maximum works, what may count toward it, where to find your remaining benefit, and which plan details to verify.",
    primaryKeyword: "dental insurance annual maximum",
    secondaryKeywords: [
      "dental annual maximum",
      "remaining dental benefit",
      "dental benefit period",
      "dental insurance coverage limit",
      "dental EOB annual maximum",
    ],
    heroHeading: "Dental Insurance Annual Maximum, Explained",
    heroSubheading:
      "See what the limit applies to, where to find your remaining benefit, and which plan details can change the answer.",
    introduction:
      "A dental insurance annual maximum is the most a plan will pay toward covered dental services during a benefit period. It is not the most you can spend out of pocket. Once plan payments reach the maximum, you may owe more for additional care until the benefit period resets. Your plan document controls which services count, when the period starts, and whether any exceptions apply.",
    steps: [
      {
        title: "Confirm the benefit-period dates",
        content:
          "Do not assume the limit resets on January 1. Check the member portal, plan document, or customer-service response for the exact start and end dates. If coverage began midyear or changed recently, ask how that affects the current period.",
      },
      {
        title: "Find the annual maximum amount",
        content:
          "Look for terms such as annual maximum, benefit maximum, or calendar-year maximum. The amount can differ by plan and may apply only to covered services. Orthodontic or other benefits may use a separate limit, so confirm which maximum applies to the proposed care.",
      },
      {
        title: "Check how much has already been used",
        content:
          "Your member portal or most recent Explanation of Benefits may show the annual maximum used and the amount remaining. Pending claims may not appear immediately, so ask whether recently completed care has been included in the balance.",
        tip: "When calling the plan, record the date, representative, and reference number for the benefit information you receive.",
      },
      {
        title: "Ask which services count toward the maximum",
        content:
          "Plan rules differ. Some preventive services may reduce the available maximum, while another plan may handle them differently. Confirm how exams, cleanings, X-rays, fillings, major services, and specialist care are treated under your plan rather than relying on a general rule.",
      },
      {
        title: "Keep the deductible separate",
        content:
          "A deductible is an amount you may have to pay before the plan contributes to certain covered services. The annual maximum limits plan payments. Ask how both figures apply to each proposed procedure because they answer different questions.",
      },
      {
        title: "Request a pre-treatment estimate for planned care",
        content:
          "For non-urgent planned work, ask whether the dental office can submit the proposed codes to the plan. The response can show the plan's current estimate, deductible application, and effect on the remaining maximum. It still does not guarantee final payment.",
      },
      {
        title: "Ask about waiting periods, frequency limits, and exclusions",
        content:
          "A remaining annual maximum does not mean every service will be covered. A plan may limit how often a service is covered, require a waiting period, exclude a service, or pay an alternate benefit. Ask which rule applies to each code on the treatment plan.",
      },
      {
        title: "Discuss timing without delaying urgent care",
        content:
          "If treatment is not urgent, ask the dentist whether clinically reasonable phasing would cross benefit periods and what the tradeoffs are. Benefit timing should not override professional advice for infection, trauma, severe pain, swelling, or rapidly worsening symptoms.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Treating the annual maximum as an out-of-pocket maximum",
        correction:
          "Remember that the annual maximum limits what the dental plan pays, not necessarily what you may owe.",
      },
      {
        mistake: "Assuming the benefit resets in January",
        correction: "Confirm the exact benefit-period dates in your own plan.",
      },
      {
        mistake: "Looking only at the remaining maximum",
        correction:
          "Also check deductibles, covered-service rules, frequency limits, waiting periods, and exclusions.",
      },
      {
        mistake: "Counting on a pre-treatment estimate as final",
        correction:
          "Use it for planning, then compare the final EOB with the office bill after the claim is processed.",
      },
      {
        mistake: "Scheduling around benefits without asking about clinical risk",
        correction:
          "Ask whether a delay is clinically reasonable and which symptoms should prompt earlier care.",
      },
    ],
    keyTakeaways: [
      "The annual maximum is the most the plan pays during a defined benefit period.",
      "It is different from a medical out-of-pocket maximum.",
      "The member portal or EOB may show how much of the maximum has been used.",
      "A remaining balance does not prove that a particular service is covered.",
      "A pre-treatment estimate can help with planning but does not guarantee payment.",
      "Your plan document and final claim processing control the benefit.",
    ],
    faqs: [
      {
        question: "What is a dental insurance annual maximum?",
        answer:
          "It is the most a dental plan will pay toward covered services during a benefit period. The exact amount and rules come from your plan document.",
      },
      {
        question: "Is a dental annual maximum the most I can pay?",
        answer:
          "No. It generally limits what the plan pays. Your own cost can also depend on deductibles, coinsurance, excluded services, frequency limits, network status, and fees after the maximum is reached.",
      },
      {
        question: "How can I find my remaining dental benefit?",
        answer:
          "Check the plan's member portal or a recent EOB, or call the number on your plan card. Ask whether pending claims are already reflected in the balance.",
      },
      {
        question: "Do cleanings count toward the annual maximum?",
        answer:
          "It depends on the plan. Ask how preventive services are handled under your specific coverage rather than assuming they are included or excluded.",
      },
      {
        question: "Does unused dental insurance roll over?",
        answer:
          "Some plans may offer a rollover feature, while others do not. Check the plan document for eligibility rules, caps, and deadlines.",
      },
      {
        question: "Can I split dental treatment across benefit years?",
        answer:
          "Ask the dentist whether phasing is clinically appropriate and ask the plan how it processes each service date. Do not delay urgent care to preserve benefits.",
      },
    ],
    relatedConditions: [],
    relatedSymptoms: [],
    relatedGuides: [
      { slug: "how-to-read-dental-eob", title: "How to Read a Dental EOB" },
      { slug: "how-to-read-dental-treatment-plan", title: "How to Read a Dental Treatment Plan" },
      { slug: "dental-insurance-alternatives", title: "Dental Insurance Alternatives" },
      { slug: "dental-bill-higher-than-expected", title: "When a Dental Bill Is Higher Than Expected" },
    ],
    relatedResources: [
      { href: "/oral-health-hub/affordability/", title: "Affordability Hub", description: "Browse practical dental-cost resources." },
      { href: "/dental-costs/", title: "Dental Cost Guides", description: "See the factors that shape common procedure costs." },
    ],
    sources: [
      {
        organization: "Delta Dental",
        title: "What is a dental insurance annual maximum?",
        url: "https://www.deltadental.com/protect-my-smile/dental-insurance-101/what-is-dental-insurance-annual-maximum/",
        note: "Defines the annual maximum and explains what can happen after the plan reaches it.",
      },
      {
        organization: "National Association of Dental Plans",
        title: "Understanding Dental Benefits",
        url: "https://www.nadp.org/about-dental-plans-care/understanding-dental-benefits/",
        note: "Explains common dental plan types, coverage levels, and benefit-design terms.",
      },
      {
        organization: "Delta Dental",
        title: "Understanding your Explanation of Benefits",
        url: "https://www.deltadental.com/protect-my-smile/dental-insurance-101/explanation-of-benefits-eob/",
        note: "Shows where an EOB may report the annual maximum used and other claim details.",
      },
    ],
    ctaHeading: "Bring clearer benefit questions to your next call",
    ctaButton: "Explore DentaSmart",
  },

  "how-to-read-dental-eob": {
    slug: "how-to-read-dental-eob",
    category: "affordability",
    title: "How to Read a Dental Explanation of Benefits",
    metaTitle: "How to Read a Dental EOB | DentaSmart",
    metaDescription:
      "Learn what a dental EOB means, how to read submitted and allowed amounts, and how to compare patient responsibility with the office bill.",
    primaryKeyword: "how to read a dental EOB",
    secondaryKeywords: [
      "dental explanation of benefits",
      "dental EOB versus bill",
      "dental allowed amount",
      "dental patient responsibility",
      "dental adjustment code",
    ],
    heroHeading: "How to Read a Dental EOB",
    heroSubheading:
      "Use the procedure codes, plan payments, and patient-responsibility fields to understand how a dental claim was processed.",
    introduction:
      "A dental Explanation of Benefits, often called an EOB, is a statement from a dental plan that explains how it processed a claim. It is not a bill. The EOB can show the services submitted, the amount the dentist charged, the amount recognized by the plan, the plan payment, and the amount the plan says may be your responsibility. Compare it with the dental office's itemized bill before deciding that two totals match or conflict.",
    steps: [
      {
        title: "Match the patient, provider, and claim",
        content:
          "Check the member name, dental office, claim number, and service date. If several family members or visits appear in the portal, matching these fields prevents you from comparing the wrong documents.",
      },
      {
        title: "Review the tooth, surface, and procedure code",
        content:
          "The EOB may identify the tooth or surface treated and the CDT code submitted by the office. Compare these fields with the itemized bill and your treatment plan. Ask for a plain-language description if a code is unfamiliar.",
      },
      {
        title: "Read the submitted amount",
        content:
          "The submitted amount is what the dental office reported for the service. It is not automatically the amount you owe. Claim processing, network agreements, deductibles, coverage percentages, and plan limits can change the next figures on the EOB.",
      },
      {
        title: "Find the approved or allowed amount",
        content:
          "Plans may use terms such as approved amount, maximum approved fee, contract allowed amount, or allowed amount. Definitions can vary by plan. This figure is the plan's recognized amount for processing the service, not a universal market price.",
      },
      {
        title: "Separate the plan payment from patient responsibility",
        content:
          "Find the amount paid by the plan and the amount assigned to the member. Patient responsibility may include a deductible, coinsurance, noncovered service, or an amount beyond a benefit limit. Read the explanation or reference code before assuming why the plan assigned it to you.",
      },
      {
        title: "Check deductible and annual-maximum fields",
        content:
          "The EOB may show how much was applied to a deductible and how much of the annual maximum has been used. These are different figures. The deductible is an amount you may pay before certain benefits begin, while the annual maximum limits plan payments during a benefit period.",
      },
      {
        title: "Read every adjustment or reference code",
        content:
          "A short code can explain a denied line, a frequency limit, a request for more information, or another plan rule. Use the legend on the EOB or call the plan for the exact meaning. Do not guess from the code alone.",
      },
      {
        title: "Compare the EOB with the office bill",
        content:
          "Line up the service dates, tooth numbers, codes, and patient-responsibility amounts. If the office bill differs, ask whether a payment, updated claim, corrected code, additional service, or network adjustment has not yet been reflected.",
        tip: "Ask the office to identify the exact line behind the difference instead of discussing only the total balance.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Paying the EOB as if it were an invoice",
        correction: "Use the EOB to understand claim processing. The dental office sends the bill.",
      },
      {
        mistake: "Assuming the submitted amount is what you owe",
        correction: "Read the allowed, plan-paid, adjustment, and patient-responsibility fields first.",
      },
      {
        mistake: "Ignoring a short adjustment code",
        correction: "Look up the code or ask the plan to explain the exact claim rule it represents.",
      },
      {
        mistake: "Comparing only the totals",
        correction: "Match each date, tooth or area, procedure code, and amount across both documents.",
      },
      {
        mistake: "Assuming a difference proves an error",
        correction: "Ask whether either document is pending an updated claim, payment, or adjustment.",
      },
    ],
    keyTakeaways: [
      "An EOB explains how a dental plan processed a claim; it is not a bill.",
      "The submitted amount is not automatically the amount you owe.",
      "The allowed amount is a plan-processing figure, not a universal price.",
      "Adjustment codes can explain why a line was limited, denied, or assigned to you.",
      "Deductible and annual maximum are separate benefit concepts.",
      "Compare the EOB and office bill line by line before focusing on the total.",
    ],
    faqs: [
      {
        question: "Is a dental EOB a bill?",
        answer:
          "No. It is a statement from the dental plan explaining how a claim was processed. The dental office sends any bill for an outstanding balance.",
      },
      {
        question: "What does submitted amount mean on a dental EOB?",
        answer:
          "It is the amount the dental office submitted for the service. It may differ from the amount recognized by the plan and from the amount assigned to you.",
      },
      {
        question: "What is the allowed amount on a dental EOB?",
        answer:
          "It is the amount the plan recognizes when processing a covered service under its rules or provider agreement. Your EOB may use a slightly different label, so check its definitions.",
      },
      {
        question: "Why did my dental plan pay less than the estimate?",
        answer:
          "Possible reasons include deductible application, an annual maximum, a frequency limit, an exclusion, network status, a different code, or a request for more information. The EOB's reference code should identify the plan's stated reason.",
      },
      {
        question: "Should my dental bill equal the patient-responsibility amount?",
        answer:
          "The amounts often align after all payments and adjustments are posted, but timing or a corrected claim can create a temporary difference. Ask the office to reconcile the specific lines if they do not match.",
      },
      {
        question: "Who should I call about a dental EOB question?",
        answer:
          "Call the dental plan about benefit rules and claim-processing codes. Call the dental office about the services, codes, fees, payments, and balance shown on its statement.",
      },
    ],
    relatedConditions: [],
    relatedSymptoms: [],
    relatedGuides: [
      { slug: "dental-bill-higher-than-expected", title: "When a Dental Bill Is Higher Than Expected" },
      { slug: "dental-insurance-annual-maximum", title: "Dental Insurance Annual Maximum Explained" },
      { slug: "how-to-read-dental-treatment-plan", title: "How to Read a Dental Treatment Plan" },
      { slug: "dental-insurance-alternatives", title: "Dental Insurance Alternatives" },
    ],
    relatedResources: [
      { href: "/dental-costs/", title: "Dental Cost Guides", description: "Review common procedure cost factors." },
      { href: "/oral-health-hub/affordability/", title: "Affordability Hub", description: "Browse more ways to prepare for dental costs." },
    ],
    sources: [
      {
        organization: "Delta Dental",
        title: "Understanding your Explanation of Benefits",
        url: "https://www.deltadental.com/protect-my-smile/dental-insurance-101/explanation-of-benefits-eob/",
        note: "Defines common dental EOB fields and explains that an EOB is not a bill.",
      },
      {
        organization: "Centers for Medicare & Medicaid Services",
        title: "How to read an Explanation of Benefits",
        url: "https://www.cms.gov/initiatives/your-patient-rights/medical-bill-rights/get-help/medical-bill-guides-resources/how-read-health-insurance-explanation-benefits",
        note: "Provides a general consumer framework for reading EOB totals, plan payments, and patient responsibility.",
      },
      {
        organization: "FAIR Health Consumer",
        title: "Dental cost information",
        url: "https://www.fairhealthconsumer.org/",
        note: "Explains billed charges and allowed amounts and provides geographic cost-estimate tools.",
      },
    ],
    ctaHeading: "Keep your dental documents in context",
    ctaButton: "Explore DentaSmart",
  },

  "dental-payment-plans-and-financing": {
    slug: "dental-payment-plans-and-financing",
    category: "affordability",
    title: "Dental Payment Plans and Medical Credit Cards",
    metaTitle: "Dental Payment Plans & Medical Credit Cards | DentaSmart",
    metaDescription:
      "Compare dental payment plans and medical credit cards by APR, deferred interest, fees, term, total repayment, and late-payment rules.",
    primaryKeyword: "dental payment plans",
    secondaryKeywords: [
      "dental financing",
      "medical credit card dental",
      "deferred interest dental financing",
      "paying for dental work",
      "dental payment plan questions",
    ],
    heroHeading: "Dental Payment Plans and Medical Credit Cards",
    heroSubheading:
      "Compare the full repayment terms before turning a dental estimate into a credit agreement.",
    introduction:
      "Dental payment plans and medical credit cards can spread a treatment cost over time, but the monthly payment does not show the full cost of borrowing. Before signing, identify the lender, APR, fees, promotional deadline, total repayment, and what happens after a missed payment. Confirm the clinical plan and written estimate first so you do not finance services you still do not understand.",
    steps: [
      {
        title: "Confirm who is providing the financing",
        content:
          "An office may offer an internal payment arrangement or an application through a third-party lender. Ask who owns the account, who receives your payments, and who handles questions or disputes. The answer affects where you find the controlling terms.",
      },
      {
        title: "Find the APR and whether it can change",
        content:
          "The annual percentage rate describes the borrowing cost. Read the standard APR, any promotional APR, whether the rate is fixed or variable, and the event that changes it. Do not rely on a monthly-payment quote without the rate and total repayment.",
      },
      {
        title: "Distinguish deferred interest from a true zero-interest offer",
        content:
          "With deferred interest, interest may be calculated from the original purchase date and charged if the balance is not fully paid by the promotion deadline or if another term is broken. Read the agreement for the exact trigger and amount. A promotional label alone does not answer this question.",
        tip: "Ask the lender to show the sentence that explains what happens to accrued interest at the deadline.",
      },
      {
        title: "List every fee",
        content:
          "Check for application, origination, annual, processing, late, returned-payment, and prepayment fees. Not every product has each fee. Add the applicable fees to the borrowing cost before comparing options.",
      },
      {
        title: "Calculate total repayment, not only the monthly amount",
        content:
          "Multiply the scheduled payment by the number of payments, then include fees or other charges stated in the agreement. Compare that total with the amount being financed. A longer term can lower the monthly payment while increasing the total cost.",
      },
      {
        title: "Check the late-payment and credit-reporting terms",
        content:
          "Ask what happens after one missed or late payment, whether a promotional term can end, when a fee applies, and whether account activity may be reported to credit bureaus. These rules vary, so use the written agreement rather than a verbal summary.",
      },
      {
        title: "Understand the dental office's role",
        content:
          "The office may help with an application, but the financing agreement is separate from the clinical recommendation. The Consumer Financial Protection Bureau notes that providers can benefit from faster payment when financing is used. Review the treatment plan and credit terms as separate decisions.",
      },
      {
        title: "Compare available alternatives",
        content:
          "Ask about an in-house arrangement, staged care when clinically appropriate, community or teaching clinics, plan benefits, and other credit options available to you. Compare APR, fees, term, total repayment, and consequences of a missed payment on the same page.",
      },
      {
        title: "Keep copies before you sign",
        content:
          "Save the treatment plan, credit disclosure, payment schedule, promotional deadline, and contact information for the lender. If a term is missing or unclear, pause and request the complete agreement.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Choosing by monthly payment alone",
        correction: "Compare the APR, fees, number of payments, and total repayment.",
      },
      {
        mistake: "Assuming every zero-percent promotion forgives interest",
        correction: "Check whether interest is deferred and what happens if any balance remains at the deadline.",
      },
      {
        mistake: "Signing before the treatment plan is clear",
        correction: "Understand the proposed services and written estimate before choosing how to pay.",
      },
      {
        mistake: "Relying on a verbal description of the terms",
        correction: "Read and keep the lender's written disclosures and payment schedule.",
      },
      {
        mistake: "Ignoring one late payment",
        correction: "Check whether a late payment changes the rate, adds a fee, ends a promotion, or affects credit reporting.",
      },
    ],
    keyTakeaways: [
      "Identify whether the plan comes from the dental office or a separate lender.",
      "Compare APR, fees, term length, and total repayment, not only the monthly payment.",
      "Deferred interest can operate differently from a true zero-interest loan.",
      "Read the late-payment and credit-reporting terms before signing.",
      "Review the clinical treatment plan and the financing agreement as separate decisions.",
      "Keep the complete agreement and promotional deadline with your dental records.",
    ],
    faqs: [
      {
        question: "What is a medical credit card for dental care?",
        answer:
          "It is a credit product that can be used for eligible healthcare services, including some dental care. The lender pays the provider, and you repay the lender under the card agreement.",
      },
      {
        question: "What does deferred interest mean?",
        answer:
          "Deferred interest may accumulate from the purchase date and become due if the balance is not fully paid by a promotional deadline or another condition is not met. Read the specific agreement because terms vary.",
      },
      {
        question: "Is an in-house dental payment plan the same as a medical credit card?",
        answer:
          "Not necessarily. An in-house arrangement may be managed by the dental office, while a medical credit card is issued by a lender. Ask who owns the account and which written terms apply.",
      },
      {
        question: "Can dental financing affect my credit?",
        answer:
          "A credit application, account balance, or missed payment may affect your credit depending on the product and reporting terms. Check the agreement and ask the lender how it reports the account.",
      },
      {
        question: "What should I compare between dental financing options?",
        answer:
          "Compare APR, fees, promotional rules, term length, total repayment, payment dates, late-payment consequences, prepayment terms, and who services the account.",
      },
      {
        question: "Should I finance dental work before getting a second opinion?",
        answer:
          "If the care is non-urgent and the recommendation remains unclear, consider resolving the clinical questions first. Seek prompt professional care for severe pain, swelling, trauma, or other urgent symptoms.",
      },
    ],
    relatedConditions: [],
    relatedSymptoms: [],
    relatedGuides: [
      { slug: "affordable-dental-care", title: "How to Find Affordable Dental Care" },
      { slug: "dental-insurance-alternatives", title: "Dental Insurance Alternatives" },
      { slug: "how-to-read-dental-treatment-plan", title: "How to Read a Dental Treatment Plan" },
      { slug: "when-to-get-dental-second-opinion", title: "When to Get a Dental Second Opinion" },
    ],
    relatedResources: [
      { href: "/dental-costs/", title: "Dental Cost Guides", description: "Understand common procedure cost factors before financing." },
      { href: "/oral-health-hub/affordability/", title: "Affordability Hub", description: "Compare other ways to prepare for dental costs." },
    ],
    sources: [
      {
        organization: "Consumer Financial Protection Bureau",
        title: "What should I know about medical credit cards and payment plans for medical bills?",
        url: "https://www.consumerfinance.gov/ask-cfpb/what-should-i-know-about-medical-credit-cards-and-payment-plans-for-medical-bills-en-1827/",
        note: "Explains deferred interest, fees, payment-plan differences, credit effects, and questions to consider before signing.",
      },
      {
        organization: "Consumer Financial Protection Bureau",
        title: "Medical Credit Cards and Financing Plans",
        url: "https://www.consumerfinance.gov/data-research/research-reports/medical-credit-cards-and-financing-plans/",
        note: "Reviews the consumer risks and provider incentives associated with healthcare financing products.",
      },
    ],
    ctaHeading: "Understand the care before choosing how to pay",
    ctaButton: "Explore DentaSmart",
  },

  "dental-bill-higher-than-expected": {
    slug: "dental-bill-higher-than-expected",
    category: "affordability",
    title: "What to Do When a Dental Bill Is Higher Than Expected",
    metaTitle: "Dental Bill Higher Than Expected? What to Check",
    metaDescription:
      "Compare your dental treatment plan, itemized bill, claim, and EOB to understand an unexpected balance and ask focused billing questions.",
    primaryKeyword: "dental bill higher than expected",
    secondaryKeywords: [
      "unexpected dental bill",
      "dental EOB versus bill",
      "itemized dental bill",
      "dental billing discrepancy",
      "dental claim question",
    ],
    heroHeading: "When a Dental Bill Is Higher Than Expected",
    heroSubheading:
      "Compare four documents before you assume the office, the plan, or the original estimate has the final answer.",
    introduction:
      "A higher-than-expected dental bill can come from a changed service, a different procedure code, deductible or annual-maximum rules, network processing, an excluded service, or a payment that has not posted yet. Gather the treatment plan, itemized bill, claim information, and Explanation of Benefits, then compare the same dates and codes across all four. Ask the dental office and plan to explain the specific line that changed.",
    steps: [
      {
        title: "Gather the four records",
        content:
          "Collect the written treatment plan or estimate, the dental office's itemized bill, the claim record, and the plan's EOB. If one is missing, request it before trying to reconcile the total.",
      },
      {
        title: "Match the patient, office, and service date",
        content:
          "Confirm that every document concerns the same patient, dental office, and date of service. A claim may combine lines from one visit, while an office statement may include an older balance or a recent payment.",
      },
      {
        title: "Compare each procedure code and tooth",
        content:
          "Line up the CDT code, tooth or area, description, and fee. Mark any service that appears on the final bill but not on the estimate, any changed code, and any code that the plan processed differently from what you expected.",
      },
      {
        title: "Read the plan's reason for each adjustment",
        content:
          "The EOB may explain deductible application, an annual maximum, a frequency limit, a noncovered service, missing information, or another plan rule. Use the EOB legend or call the plan for the exact meaning of each reference code.",
      },
      {
        title: "Check network status and allowed amounts",
        content:
          "Confirm whether the dentist was treated as in-network for your specific plan on the service date. Ask the plan how it calculated the allowed amount and ask the dental office how the corresponding adjustment appears on the bill. Network and plan rules vary, so do not assume the same result applies to every service.",
      },
      {
        title: "Ask whether the claim is final",
        content:
          "A payment, corrected claim, additional documentation, or coordination with another plan may still be pending. Ask both the office and plan whether the claim shown is final and whether the current bill already reflects all posted payments and adjustments.",
      },
      {
        title: "Ask the office to explain the exact difference",
        content:
          "Use the documents in front of you. Name the service date and code, then ask why the estimate, EOB, and bill differ on that line. A focused question is easier to resolve than a disagreement about the total balance.",
        tip: "Ask whether the office can place the disputed portion on hold while it reviews the account, but do not assume that a due date has changed unless the office confirms it.",
      },
      {
        title: "Document the response",
        content:
          "Record the date, representative, reference number, and promised next step for each call. Save corrected statements, updated EOBs, and written explanations. This creates a clear timeline if more follow-up is needed.",
      },
      {
        title: "Use the plan's review process if needed",
        content:
          "If the disagreement is about claim processing, ask the plan for its appeal or review instructions and deadlines. If the office and plan cannot resolve the issue, a state insurance or consumer-protection office may explain which agency handles the question. Requirements vary by state and plan.",
      },
    ],
    commonMistakes: [
      {
        mistake: "Comparing only the estimate and final total",
        correction: "Match service dates, tooth numbers, codes, and amounts line by line.",
      },
      {
        mistake: "Treating the EOB as a bill",
        correction: "Use the EOB to understand claim processing; use the office statement to identify the amount billed.",
      },
      {
        mistake: "Assuming a difference proves wrongdoing",
        correction: "Ask whether a claim, payment, code, or adjustment is pending or needs correction.",
      },
      {
        mistake: "Ignoring the payment deadline during a review",
        correction: "Ask whether the office will place the questioned amount on hold and get the answer in writing.",
      },
      {
        mistake: "Ending a call without a reference number",
        correction: "Record who you spoke with, the date, the explanation, and the next step.",
      },
    ],
    keyTakeaways: [
      "Use the treatment plan, itemized bill, claim record, and EOB together.",
      "Match dates, tooth numbers, and procedure codes before comparing totals.",
      "Read the plan's adjustment or reference code for each unexpected line.",
      "Ask whether the claim and office statement are final or still being updated.",
      "Keep the conversation neutral and focused on one documented difference at a time.",
      "Confirm any payment hold or appeal deadline in writing.",
    ],
    faqs: [
      {
        question: "Why can a dental bill be higher than the estimate?",
        answer:
          "Possible reasons include a changed service or code, deductible application, an annual maximum, a frequency limit, network processing, an excluded service, or a pending claim adjustment. The office and plan should explain the line involved.",
      },
      {
        question: "What documents should I compare for an unexpected dental bill?",
        answer:
          "Compare the written treatment plan or estimate, the itemized office bill, the claim record, and the EOB for the same patient and service date.",
      },
      {
        question: "What should an itemized dental bill show?",
        answer:
          "Ask for the date of service, tooth or area, procedure code, description, fee, plan payment, office adjustment, prior payment, and current balance for each line.",
      },
      {
        question: "What if the dental bill and EOB show different patient amounts?",
        answer:
          "Ask whether either record is awaiting a payment, corrected claim, or adjustment. If both are final, ask the office and plan to reconcile the specific code and service date.",
      },
      {
        question: "Should I ignore a dental bill while it is being reviewed?",
        answer:
          "No. Ask the office whether it will place the questioned amount on hold and whether any undisputed amount remains due. Keep written confirmation of the arrangement.",
      },
      {
        question: "Where can I find an independent dental cost reference?",
        answer:
          "FAIR Health Consumer offers geographic dental cost estimates based on claims data. An estimate is a reference point, not a quote, coverage decision, or determination that a service is appropriate.",
      },
    ],
    relatedConditions: [],
    relatedSymptoms: [],
    relatedGuides: [
      { slug: "how-to-read-dental-eob", title: "How to Read a Dental EOB" },
      { slug: "how-to-read-dental-treatment-plan", title: "How to Read a Dental Treatment Plan" },
      { slug: "dental-insurance-annual-maximum", title: "Dental Insurance Annual Maximum Explained" },
      { slug: "affordable-dental-care", title: "How to Find Affordable Dental Care" },
    ],
    relatedResources: [
      { href: "/dental-costs/", title: "Dental Cost Guides", description: "Review cost factors for common procedures." },
      { href: "/oral-health-hub/affordability/", title: "Affordability Hub", description: "Find more help preparing for dental costs." },
    ],
    sources: [
      {
        organization: "Delta Dental",
        title: "Understanding your Explanation of Benefits",
        url: "https://www.deltadental.com/protect-my-smile/dental-insurance-101/explanation-of-benefits-eob/",
        note: "Defines common dental EOB fields and explains how they can be used to compare plan processing with an office bill.",
      },
      {
        organization: "Centers for Medicare & Medicaid Services",
        title: "How to read an Explanation of Benefits",
        url: "https://www.cms.gov/initiatives/your-patient-rights/medical-bill-rights/get-help/medical-bill-guides-resources/how-read-health-insurance-explanation-benefits",
        note: "Provides general consumer guidance for matching EOB charges, plan payments, and patient responsibility.",
      },
      {
        organization: "FAIR Health Consumer",
        title: "Dental cost information",
        url: "https://www.fairhealthconsumer.org/",
        note: "Provides independent geographic dental cost estimates and explains billed charges and allowed amounts.",
      },
    ],
    ctaHeading: "Turn a confusing bill into specific questions",
    ctaButton: "Explore DentaSmart",
  },
};
