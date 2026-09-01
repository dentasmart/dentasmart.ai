/**
 * Symptom Quiz data: questions, answer options, scoring, and result mappings.
 * Each answer carries a risk weight (0-3) and optional condition tags.
 */

export interface QuizOption {
  label: string;
  value: string;
  riskWeight: number;
  tags: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  subtitle: string;
  options: QuizOption[];
  multiSelect?: boolean;
}

export interface QuizResult {
  level: "low" | "moderate" | "high";
  title: string;
  summary: string;
  recommendations: string[];
  matchedConditions: { name: string; slug: string; description: string }[];
  urgency: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "pain",
    question: "Are you experiencing any tooth or mouth pain?",
    subtitle: "Describe what you notice. The quiz cannot diagnose the cause.",
    options: [
      { label: "No pain at all", value: "none", riskWeight: 0, tags: [] },
      { label: "Mild discomfort that comes and goes", value: "mild", riskWeight: 1, tags: ["sensitivity"] },
      { label: "Moderate pain when eating or drinking", value: "moderate", riskWeight: 2, tags: ["cavities", "sensitivity", "cracked-tooth"] },
      { label: "Severe or constant pain", value: "severe", riskWeight: 3, tags: ["toothache", "dental-abscess", "root-canal"] },
    ],
  },
  {
    id: "bleeding",
    question: "Do your gums bleed when you brush or floss?",
    subtitle: "Record how often bleeding occurs. A dentist can evaluate the cause.",
    options: [
      { label: "Never", value: "never", riskWeight: 0, tags: [] },
      { label: "Rarely, only when I floss hard", value: "rarely", riskWeight: 1, tags: ["gum-disease"] },
      { label: "Sometimes when brushing", value: "sometimes", riskWeight: 2, tags: ["gum-disease", "bleeding-gums"] },
      { label: "Frequently or every time", value: "frequently", riskWeight: 3, tags: ["gum-disease", "bleeding-gums", "swollen-gums"] },
    ],
  },
  {
    id: "sensitivity",
    question: "Do hot or cold foods/drinks cause discomfort?",
    subtitle: "Sensitivity can have several causes that require professional evaluation.",
    options: [
      { label: "No sensitivity at all", value: "none", riskWeight: 0, tags: [] },
      { label: "Only with very cold things like ice cream", value: "cold-only", riskWeight: 1, tags: ["sensitive-teeth"] },
      { label: "Both hot and cold cause discomfort", value: "both", riskWeight: 2, tags: ["sensitive-teeth", "cavities", "cracked-tooth"] },
      { label: "Lingering pain after hot or cold", value: "lingering", riskWeight: 3, tags: ["root-canal", "dental-abscess", "cavities"] },
    ],
  },
  {
    id: "appearance",
    question: "Have you noticed any changes in how your teeth or gums look?",
    subtitle: "Record visible changes so you can describe them to a dental professional.",
    options: [
      { label: "Everything looks normal", value: "normal", riskWeight: 0, tags: [] },
      { label: "Some staining or discoloration", value: "staining", riskWeight: 1, tags: ["teeth-whitening", "tooth-discoloration"] },
      { label: "Swollen, red, or receding gums", value: "gum-changes", riskWeight: 2, tags: ["gum-disease", "swollen-gums"] },
      { label: "Dark spots, chips, or a loose tooth", value: "damage", riskWeight: 3, tags: ["cavities", "cracked-tooth", "loose-tooth"] },
    ],
  },
  {
    id: "habits",
    question: "Which of these habits apply to you?",
    subtitle: "Daily habits have a big impact on your oral health over time.",
    options: [
      { label: "I brush twice daily and floss regularly", value: "good", riskWeight: 0, tags: [] },
      { label: "I brush daily but rarely floss", value: "ok", riskWeight: 1, tags: [] },
      { label: "I often skip brushing or use tobacco", value: "poor", riskWeight: 2, tags: ["gum-disease", "bad-breath"] },
      { label: "I grind my teeth or clench my jaw", value: "grinding", riskWeight: 2, tags: ["teeth-grinding", "tmj-disorder", "cracked-tooth"] },
    ],
  },
  {
    id: "dental-history",
    question: "When was your last dental visit?",
    subtitle: "Visit timing depends on your history, symptoms, age, and risk factors.",
    options: [
      { label: "Within the last 6 months", value: "recent", riskWeight: 0, tags: [] },
      { label: "6 to 12 months ago", value: "moderate", riskWeight: 1, tags: [] },
      { label: "1 to 2 years ago", value: "overdue", riskWeight: 2, tags: [] },
      { label: "More than 2 years or I can't remember", value: "long", riskWeight: 3, tags: [] },
    ],
  },
  {
    id: "urgency",
    question: "How would you describe your main concern right now?",
    subtitle: "This helps organize the summary but does not determine urgency.",
    options: [
      { label: "Just curious about my oral health", value: "curious", riskWeight: 0, tags: [] },
      { label: "I want to prevent future problems", value: "prevention", riskWeight: 0, tags: [] },
      { label: "I have a specific symptom I'm worried about", value: "symptom", riskWeight: 2, tags: [] },
      { label: "I'm in pain and need help now", value: "urgent", riskWeight: 3, tags: ["toothache", "dental-abscess"] },
    ],
  },
  {
    id: "insurance",
    question: "Do you currently have dental insurance?",
    subtitle: "This helps us show general affordability resources when relevant.",
    options: [
      { label: "Yes, I have dental insurance", value: "insured", riskWeight: 0, tags: [] },
      { label: "No, I don't have dental insurance", value: "uninsured", riskWeight: 0, tags: [] },
      { label: "I'm not sure what my plan covers", value: "unsure", riskWeight: 0, tags: [] },
      { label: "I have insurance but it feels limited", value: "limited", riskWeight: 0, tags: [] },
    ],
  },
];

// Condition detail mapping for results
const conditionDetails: Record<string, { name: string; slug: string; description: string }> = {
  toothache: { name: "Toothache", slug: "/conditions/toothache", description: "Persistent tooth pain that may indicate decay, infection, or damage." },
  cavities: { name: "Cavities", slug: "/conditions/cavities", description: "Tooth decay that creates holes in the enamel and can worsen over time." },
  "gum-disease": { name: "Gum Disease", slug: "/conditions/gum-disease", description: "Infection of the gums that can lead to tooth loss if untreated." },
  "sensitive-teeth": { name: "Sensitive Teeth", slug: "/conditions/sensitive-teeth", description: "Sharp discomfort triggered by hot, cold, or sweet foods and drinks." },
  "cracked-tooth": { name: "Cracked Tooth", slug: "/conditions/cracked-tooth", description: "A fracture in the tooth that can cause pain and lead to infection." },
  "dental-abscess": { name: "Dental Abscess", slug: "/conditions/dental-abscess", description: "A pocket of pus caused by bacterial infection, often very painful." },
  "root-canal": { name: "Root Canal Issues", slug: "/conditions/root-canal", description: "Infection or inflammation of the tooth's inner pulp requiring treatment." },
  "teeth-grinding": { name: "Teeth Grinding (Bruxism)", slug: "/conditions/teeth-grinding", description: "Unconscious clenching or grinding that wears down teeth over time." },
  "tmj-disorder": { name: "TMJ Disorder", slug: "/conditions/tmj-disorder", description: "Jaw joint problems causing pain, clicking, or difficulty opening your mouth." },
  "teeth-whitening": { name: "Teeth Whitening", slug: "/conditions/teeth-whitening", description: "Cosmetic options to address tooth staining and discoloration." },
  "bleeding-gums": { name: "Bleeding Gums", slug: "/symptoms/bleeding-gums", description: "Gums that bleed during brushing or flossing, often a sign of gum disease." },
  "swollen-gums": { name: "Swollen Gums", slug: "/symptoms/swollen-gums", description: "Puffy, tender gums that may indicate infection or inflammation." },
  "bad-breath": { name: "Bad Breath", slug: "/symptoms/bad-breath", description: "Persistent bad breath that may signal gum disease or other oral issues." },
  "loose-tooth": { name: "Loose Tooth", slug: "/symptoms/loose-tooth", description: "A tooth that moves or feels unstable, often due to advanced gum disease." },
  "tooth-discoloration": { name: "Tooth Discoloration", slug: "/symptoms/tooth-discoloration", description: "Changes in tooth color from staining, decay, or internal damage." },
  sensitivity: { name: "Tooth Sensitivity", slug: "/symptoms/tooth-sensitivity", description: "Sharp pain when teeth are exposed to temperature changes or pressure." },
};

export function calculateQuizResult(answers: Record<string, string>): QuizResult {
  let totalRisk = 0;
  const allTags: string[] = [];

  for (const question of quizQuestions) {
    const answer = answers[question.id];
    if (!answer) continue;
    const option = question.options.find((o) => o.value === answer);
    if (option) {
      totalRisk += option.riskWeight;
      allTags.push(...option.tags);
    }
  }

  // Count tag frequency to find top conditions
  const tagCounts: Record<string, number> = {};
  for (const tag of allTags) {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  }

  // Sort by frequency, take top 3-4
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([tag]) => tag);

  const matchedConditions = topTags
    .map((tag) => conditionDetails[tag])
    .filter(Boolean);

  // Determine risk level
  const maxPossible = quizQuestions.length * 3; // 24
  const riskPercent = totalRisk / maxPossible;

  const isUrgent = answers.urgency === "urgent" || answers.pain === "severe";
  const insuranceStatus = answers.insurance;

  if (riskPercent >= 0.45 || isUrgent) {
    return {
      level: "high",
      title: "Your Answers Include Warning Signs",
      summary:
        "Your answers include symptoms that may need prompt professional evaluation. This quiz cannot diagnose the cause or determine urgency.",
      recommendations: [
        "Contact a dental professional promptly and describe your symptoms",
        "Seek urgent dental or medical care for severe pain, facial swelling, uncontrolled bleeding, trauma, fever, or trouble breathing or swallowing",
        "Document your symptoms (when they started, what triggers them) to share with your dentist",
        ...(insuranceStatus === "uninsured"
          ? ["Check our guide on finding affordable dental care without insurance"]
          : []),
      ],
      matchedConditions,
      urgency: isUrgent
        ? "Contact a dental professional now. Trouble breathing or swallowing, severe facial swelling, or uncontrolled bleeding needs emergency medical care."
        : "Arrange a dental appointment promptly, especially if symptoms persist or worsen.",
    };
  }

  if (riskPercent >= 0.2) {
    return {
      level: "moderate",
      title: "Your Answers Include Symptoms to Review",
      summary:
        "Your answers include symptoms or habits worth discussing with a dental professional. This quiz cannot rule out a condition or confirm that a symptom is harmless.",
      recommendations: [
        "Arrange a dental checkup if symptoms persist, worsen, or concern you",
        "Use DentaSmart to organize educational information between visits",
        "Focus on consistent brushing (2 min, twice daily) and daily flossing",
        "Consider a sensitivity toothpaste if hot/cold foods bother you",
      ],
      matchedConditions,
      urgency: "Contact a dental professional sooner if symptoms worsen or urgent warning signs appear.",
    };
  }

  return {
    level: "low",
    title: "No High-Weight Warning Pattern Reported",
    summary:
      "Your answers did not include the quiz's higher-weight warning pattern. This does not rule out dental problems or replace routine professional care.",
    recommendations: [
      "Keep up your brushing and flossing routine",
      "Use DentaSmart to organize educational information between visits",
      "Follow the examination schedule recommended by your dentist",
      "Contact a dentist if new, persistent, or worsening symptoms appear",
    ],
    matchedConditions,
    urgency: "This quiz cannot confirm that no concern is present. Seek professional advice when you are unsure.",
  };
}
