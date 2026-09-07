import type { AEOBlock } from "./aeoContent";

export const videoCostAeo: Record<string, AEOBlock> = {
  "how-to-read-dental-treatment-plan": {
    inOneSentence:
      "A dental treatment plan should connect each proposed service to a tooth or area, explain its purpose and urgency, and show the current cost and coverage assumptions in writing.",
    whatToDoToday: [
      "Ask for an itemized copy showing the tooth or area, procedure code, description, and fee for each service.",
      "Mark which recommendations the dentist considers urgent, monitorable, or elective, and ask why.",
      "Write down any unresolved questions about alternatives, insurance assumptions, or services not included in the estimate.",
    ],
    dentistQuestions: [
      "Which finding supports each recommended procedure?",
      "Which items need prompt care, and what could happen if I wait?",
      "What clinically reasonable alternatives should I compare?",
      "What is included in this estimate, and what could change the total?",
      "Would another licensed dentist need any additional images or records to review this plan?",
    ],
  },
  "dental-insurance-annual-maximum": {
    inOneSentence:
      "A dental annual maximum limits what the plan pays during a benefit period, so it should be reviewed alongside deductibles, covered-service rules, waiting periods, and frequency limits.",
    whatToDoToday: [
      "Confirm the exact start and end dates of your current benefit period.",
      "Check the amount of your annual maximum that the plan says has been used and ask whether pending claims are included.",
      "Ask how the plan handles the specific procedure codes on your treatment plan.",
    ],
    dentistQuestions: [
      "Which proposed services are expected to count toward my annual maximum?",
      "How much of my maximum remains after pending claims?",
      "Does my plan use a separate maximum for any of these services?",
      "Can the office request a pre-treatment estimate for this plan?",
      "If treatment is not urgent, is clinical phasing reasonable?",
    ],
  },
  "how-to-read-dental-eob": {
    inOneSentence:
      "A dental EOB is not a bill; it explains how the plan processed each submitted service and what amount it currently assigns to the plan and the member.",
    whatToDoToday: [
      "Find the dental office bill and the matching EOB for the same patient and service date.",
      "Compare each procedure code, allowed amount, plan payment, adjustment, and patient-responsibility line.",
      "Write down any mismatch and ask the office or plan to explain that specific line.",
    ],
    dentistQuestions: [
      "What does this procedure code describe in plain language?",
      "Is this claim final, corrected, or still waiting for information?",
      "What does this adjustment or reference code mean under my plan?",
      "Does the office bill already include every plan payment and network adjustment?",
      "Why does this line differ between the EOB and the office statement?",
    ],
  },
  "dental-payment-plans-and-financing": {
    inOneSentence:
      "A dental financing offer should be compared by APR, deferred-interest rules, fees, term, total repayment, late-payment consequences, and who owns the account.",
    whatToDoToday: [
      "Request the complete written financing agreement before submitting an application.",
      "Find the standard APR, promotional deadline, applicable fees, and total scheduled repayment.",
      "Compare the offer with any in-house arrangement or other option available to you using the same fields.",
    ],
    dentistQuestions: [
      "Is this payment plan managed by the dental office or a separate lender?",
      "What happens to accrued interest if a balance remains after the promotional deadline?",
      "Which fees and late-payment consequences can apply?",
      "What is the total scheduled repayment, not only the monthly payment?",
      "Can I take the agreement home and review it before deciding?",
    ],
  },
  "dental-bill-higher-than-expected": {
    inOneSentence:
      "To understand an unexpected dental balance, compare the treatment plan, itemized bill, claim record, and EOB for the same service dates, tooth numbers, codes, and amounts.",
    whatToDoToday: [
      "Gather the written treatment plan, itemized bill, claim record, and matching EOB.",
      "Mark every code or amount that differs across the documents.",
      "Call with one documented difference at a time and record the explanation and next step.",
    ],
    dentistQuestions: [
      "Can you provide an itemized statement for this service date?",
      "Why does this procedure code or fee differ from the original estimate?",
      "Is the claim final, or is a correction, payment, or adjustment still pending?",
      "Can the questioned amount be placed on hold while it is reviewed?",
      "What written appeal or review process applies if the claim-processing issue remains unresolved?",
    ],
  },
};
