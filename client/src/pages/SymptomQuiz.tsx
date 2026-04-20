import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { trackEvent, trackAppDownload, getAppStoreUrl } from "@/lib/analytics";
import { quizQuestions, calculateQuizResult, type QuizResult } from "@/lib/quizData";
import { trpc } from "@/lib/trpc";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Sparkles,
  Mail,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { Link } from "wouter";

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────

// 1. Quiz schema. Google requires acceptedAnswer to be a SINGLE Answer object (not an array).
// We use the most informative answer option as the canonical accepted answer for each question.
const quizJsonLd = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  name: "Free Dental Symptom Checker. Oral Health Quiz",
  description:
    "Answer 8 questions about your dental symptoms and habits to get a personalized oral health risk assessment with AI-powered recommendations.",
  url: "https://dentasmart.ai/symptom-quiz",
  educationalLevel: "beginner",
  timeRequired: "PT2M",
  provider: {
    "@type": "Organization",
    name: "DentaSmart",
    url: "https://dentasmart.ai",
    logo: {
      "@type": "ImageObject",
      url: "https://dentasmart.ai/images/logo.png",
    },
  },
  hasPart: [
    {
      "@type": "Question",
      name: "Are you experiencing any tooth or mouth pain?",
      suggestedAnswer: [
        { "@type": "Answer", text: "No pain at all" },
        { "@type": "Answer", text: "Mild discomfort that comes and goes" },
        { "@type": "Answer", text: "Moderate pain when eating or drinking" },
      ],
      acceptedAnswer: { "@type": "Answer", text: "Severe or constant pain may indicate an infection or abscess and should be evaluated by a dentist promptly." },
    },
    {
      "@type": "Question",
      name: "Do your gums bleed when you brush or floss?",
      suggestedAnswer: [
        { "@type": "Answer", text: "Never" },
        { "@type": "Answer", text: "Rarely, only when I floss hard" },
      ],
      acceptedAnswer: { "@type": "Answer", text: "Gums that bleed frequently when brushing or flossing are a common early sign of gum disease (gingivitis) and should be checked by a dentist." },
    },
    {
      "@type": "Question",
      name: "Do hot or cold foods or drinks cause discomfort?",
      suggestedAnswer: [
        { "@type": "Answer", text: "No sensitivity at all" },
        { "@type": "Answer", text: "Only with very cold things like ice cream" },
        { "@type": "Answer", text: "Both hot and cold cause discomfort" },
      ],
      acceptedAnswer: { "@type": "Answer", text: "Lingering pain after exposure to hot or cold can indicate nerve involvement and should be evaluated by a dentist." },
    },
    {
      "@type": "Question",
      name: "Have you noticed any changes in how your teeth or gums look?",
      suggestedAnswer: [
        { "@type": "Answer", text: "Everything looks normal" },
        { "@type": "Answer", text: "Some staining or discoloration" },
        { "@type": "Answer", text: "Swollen, red, or receding gums" },
      ],
      acceptedAnswer: { "@type": "Answer", text: "Dark spots on teeth, chips, or a loose tooth are signs of decay or structural damage that require professional dental evaluation." },
    },
    {
      "@type": "Question",
      name: "Which of these habits apply to you?",
      suggestedAnswer: [
        { "@type": "Answer", text: "I brush twice daily and floss regularly" },
        { "@type": "Answer", text: "I brush daily but rarely floss" },
      ],
      acceptedAnswer: { "@type": "Answer", text: "Brushing twice daily and flossing once daily is the gold standard for preventing cavities and gum disease." },
    },
    {
      "@type": "Question",
      name: "When was your last dental visit?",
      suggestedAnswer: [
        { "@type": "Answer", text: "Within the last 6 months" },
        { "@type": "Answer", text: "6 to 12 months ago" },
        { "@type": "Answer", text: "1 to 2 years ago" },
      ],
      acceptedAnswer: { "@type": "Answer", text: "Dental professionals recommend a checkup and cleaning every 6 months to catch problems early before they become painful or expensive." },
    },
    {
      "@type": "Question",
      name: "How would you describe your main concern right now?",
      suggestedAnswer: [
        { "@type": "Answer", text: "Just curious about my oral health" },
        { "@type": "Answer", text: "I want to prevent future problems" },
        { "@type": "Answer", text: "I have a specific symptom I'm worried about" },
      ],
      acceptedAnswer: { "@type": "Answer", text: "If you are in pain, you should contact a dentist as soon as possible. DentaSmart's symptom checker can help you assess urgency while you arrange an appointment." },
    },
    {
      "@type": "Question",
      name: "Do you currently have dental insurance?",
      suggestedAnswer: [
        { "@type": "Answer", text: "Yes, I have dental insurance" },
        { "@type": "Answer", text: "I'm not sure what my plan covers" },
        { "@type": "Answer", text: "I have insurance but it feels limited" },
      ],
      acceptedAnswer: { "@type": "Answer", text: "If you do not have dental insurance, community health centers, dental schools, and discount plans can provide affordable care. DentaSmart can help you understand what treatment you may need before you visit." },
    },
  ],
};

// 2. FAQPage schema. Targets "People Also Ask" and voice search
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I know if my tooth pain is serious?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tooth pain that is severe, constant, or accompanied by swelling, fever, or a bad taste in your mouth may indicate an infection or abscess and needs prompt dental attention. Mild, occasional sensitivity is less urgent but still worth monitoring. DentaSmart's free symptom quiz can help you assess your risk level in under 2 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "What are the early signs of gum disease?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Early signs of gum disease (gingivitis) include gums that bleed when you brush or floss, red or swollen gums, persistent bad breath, and gums that appear to be pulling away from your teeth. If caught early, gum disease is reversible with proper brushing, flossing, and a professional cleaning.",
      },
    },
    {
      "@type": "Question",
      name: "Should I see a dentist if I have tooth sensitivity?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, tooth sensitivity that is new, worsening, or accompanied by pain that lingers after exposure to hot or cold should be evaluated by a dentist. It can signal a cavity, cracked tooth, or exposed root. Mild sensitivity to very cold items alone is common and may be managed with a sensitivity toothpaste.",
      },
    },
    {
      "@type": "Question",
      name: "How often should I visit the dentist?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most dental professionals recommend a checkup and cleaning every 6 months. If you have a history of gum disease, cavities, or other oral health issues, your dentist may recommend more frequent visits. Regular checkups catch problems early when they are easier and less expensive to treat.",
      },
    },
    {
      "@type": "Question",
      name: "What does a dental symptom checker do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A dental symptom checker asks you questions about your pain, gum health, sensitivity, and habits to estimate your oral health risk level. DentaSmart's free quiz takes about 2 minutes and gives you a personalized risk assessment. Low, moderate, or high. Along with matched conditions and specific next steps. It does not replace a professional dental diagnosis.",
      },
    },
    {
      "@type": "Question",
      name: "Can I check my dental symptoms online for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. DentaSmart offers a free online dental symptom checker quiz at dentasmart.ai/symptom-quiz. Answer 8 questions about your symptoms and habits to receive a personalized oral health risk assessment with AI-powered recommendations. No account or credit card required.",
      },
    },
    {
      "@type": "Question",
      name: "What causes sudden tooth pain?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sudden tooth pain can be caused by a cavity reaching the nerve, a cracked tooth, an exposed root, a dental abscess, or a lost filling. If the pain is severe or accompanied by swelling, you should see a dentist as soon as possible. Use DentaSmart's symptom quiz to assess your risk and get guidance on next steps.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a dentist if my teeth don't hurt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Many dental problems. Including cavities, early gum disease, and oral cancer. Have no pain in their early stages. Regular checkups every 6 months allow your dentist to catch and treat issues before they become painful and expensive. Prevention is always cheaper than treatment.",
      },
    },
  ],
};

// 3. SoftwareApplication schema with aggregateRating (required by Google for rich results).
const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DentaSmart - AI Oral Health Guide",
  url: "https://dentasmart.ai/symptom-quiz",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web, iOS, Android",
  description:
    "Free dental symptom checker and AI-powered oral health assessment. Answer 8 questions to get your personalized risk score and next steps.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
  featureList: "Free dental symptom checker, Personalized oral health risk assessment, AI-powered condition matching, Tailored next-step recommendations, No account required",
  author: {
    "@type": "Organization",
    name: "DentaSmart",
    url: "https://dentasmart.ai",
  },
};

// 4. BreadcrumbList schema
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://dentasmart.ai",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Dental Symptom Checker",
      item: "https://dentasmart.ai/symptom-quiz",
    },
  ],
};

// 5. MedicalWebPage schema. Use audience property (not medicalAudience.audienceType which is not a Google-supported field).
const medicalPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Free Dental Symptom Checker. Oral Health Quiz",
  url: "https://dentasmart.ai/symptom-quiz",
  description:
    "A free online dental symptom checker. Answer 8 questions about tooth pain, gum health, sensitivity, and habits to get a personalized oral health risk assessment.",
  audience: {
    "@type": "MedicalAudience",
    name: "Patients",
  },
  about: [
    { "@type": "MedicalCondition", name: "Toothache" },
    { "@type": "MedicalCondition", name: "Gum Disease" },
    { "@type": "MedicalCondition", name: "Tooth Sensitivity" },
    { "@type": "MedicalCondition", name: "Dental Abscess" },
    { "@type": "MedicalCondition", name: "Cavities" },
  ],
  lastReviewed: "2026-03-23",
  publisher: {
    "@type": "Organization",
    name: "DentaSmart",
    url: "https://dentasmart.ai",
  },
};

// Combined JSON-LD array
const allJsonLd = [quizJsonLd, faqJsonLd, webAppJsonLd, breadcrumbJsonLd, medicalPageJsonLd];

// Risk level color and icon mapping
const riskConfig = {
  low: {
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: CheckCircle2,
    barColor: "bg-emerald-500",
    label: "Low Risk",
  },
  moderate: {
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: Shield,
    barColor: "bg-amber-500",
    label: "Moderate Risk",
  },
  high: {
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    icon: AlertTriangle,
    barColor: "bg-red-500",
    label: "High Risk",
  },
};

export default function SymptomQuiz() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1-8 = questions, 9 = email, 10 = results
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [result, setResult] = useState<QuizResult | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const submitQuiz = trpc.quiz.submit.useMutation();

  useEffect(() => {
    trackEvent("page_view");
  }, []);

  const totalQuestions = quizQuestions.length;
  const progress =
    currentStep === 0
      ? 0
      : currentStep <= totalQuestions
        ? (currentStep / totalQuestions) * 100
        : 100;

  const handleAnswer = useCallback(
    (questionId: string, value: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
      // Auto-advance after a short delay
      setTimeout(() => {
        if (currentStep < totalQuestions) {
          setCurrentStep(currentStep + 1);
        } else {
          // Last question answered, go to email capture
          setCurrentStep(totalQuestions + 1);
        }
      }, 300);
    },
    [currentStep, totalQuestions],
  );

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const handleEmailSubmit = useCallback(async () => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Please enter your email to see your results.");
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");

    // Calculate result
    const quizResult = calculateQuizResult(answers);
    setResult(quizResult);

    // Submit to backend
    try {
      await submitQuiz.mutateAsync({
        name: name.trim() || undefined,
        email: email.trim(),
        answers,
        riskLevel: quizResult.level,
        matchedConditions: quizResult.matchedConditions.map((c) => c.name),
      });
    } catch {
      // Silently fail. Don't block the user from seeing results
      console.error("Failed to submit quiz");
    }

    setSubmitted(true);
    setCurrentStep(totalQuestions + 2); // Go to results
    trackEvent("cta_get_score_click", { source: "symptom_quiz_complete" });
  }, [email, answers, submitQuiz, totalQuestions]);

  const handleSkipEmail = useCallback(() => {
    const quizResult = calculateQuizResult(answers);
    setResult(quizResult);
    setSubmitted(true);
    setCurrentStep(totalQuestions + 2);
  }, [answers, totalQuestions]);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-black">
      <SEO
        title="Free Dental Symptom Checker | DentaSmart"
        description="Not sure if your tooth pain or gum symptoms need a dentist? Take our free 2-minute dental symptom quiz and get a personalized oral health risk score."
        canonical="https://dentasmart.ai/symptom-quiz"
        keywords="dental symptom checker, tooth pain quiz, do I need a dentist quiz, dental symptoms checker, oral health quiz, gum disease quiz, tooth sensitivity quiz, free dental assessment, online dental check"
        ogType="website"
        jsonLd={allJsonLd}
      />
      <Navigation />

      {/* Progress Bar */}
      {currentStep > 0 && currentStep <= totalQuestions + 1 && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {/* Step 0: Intro */}
          {currentStep === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <IntroSection onStart={() => setCurrentStep(1)} />
            </motion.div>
          )}

          {/* Steps 1-8: Questions */}
          {currentStep >= 1 && currentStep <= totalQuestions && (
            <motion.div
              key={`question-${currentStep}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionStep
                question={quizQuestions[currentStep - 1]}
                currentAnswer={answers[quizQuestions[currentStep - 1].id]}
                onAnswer={handleAnswer}
                onBack={handleBack}
                stepNumber={currentStep}
                totalSteps={totalQuestions}
              />
            </motion.div>
          )}

          {/* Step 9: Email Capture */}
          {currentStep === totalQuestions + 1 && !submitted && (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <EmailCapture
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                emailError={emailError}
                onSubmit={handleEmailSubmit}
                onSkip={handleSkipEmail}
                isLoading={submitQuiz.isPending}
                onBack={handleBack}
              />
            </motion.div>
          )}

          {/* Step 10: Results */}
          {currentStep === totalQuestions + 2 && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ResultsSection result={result} insuranceAnswer={answers.insurance} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

/* ─── Intro Section ──────────────────────────────────────────────────── */
function IntroSection({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/10" />
      </div>
      <div className="container relative z-10 px-4 mx-auto max-w-6xl pt-40 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Free Dental Symptom Checker
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-black mb-6 leading-tight">
              Do your dental symptoms <br />
              <span className="italic text-primary">need a dentist?</span>
            </h1>
            <p className="text-xl text-stone-600 mb-8 font-light leading-relaxed max-w-lg">
              Answer 8 quick questions about your tooth pain, gum health, and
              habits. Get a free personalized oral health risk score with clear
              next steps. No account required.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Takes less than 2 minutes",
                "Personalized risk assessment",
                "Matched conditions & recommendations",
                "100% free, no strings attached",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-stone-700">{item}</span>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 rounded-full px-10 py-7 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer"
              onClick={onStart}
            >
              Start My Free Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Decorative cards */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-stone-100">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-black">Oral Health Score</div>
                      <div className="text-sm text-stone-500">Personalized assessment</div>
                    </div>
                  </div>

                  {/* Simulated progress bars */}
                  <div className="space-y-4">
                    {[
                      { label: "Pain & Discomfort", width: "20%", color: "bg-emerald-400" },
                      { label: "Gum Health", width: "55%", color: "bg-amber-400" },
                      { label: "Dental Habits", width: "80%", color: "bg-emerald-400" },
                      { label: "Prevention Score", width: "65%", color: "bg-primary" },
                    ].map((bar, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-stone-600">{bar.label}</span>
                        </div>
                        <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${bar.color} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: bar.width }}
                            transition={{ duration: 1, delay: 0.5 + idx * 0.2 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-stone-100">
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      AI-powered analysis based on your answers
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Question Step ──────────────────────────────────────────────────── */
function QuestionStep({
  question,
  currentAnswer,
  onAnswer,
  onBack,
  stepNumber,
  totalSteps,
}: {
  question: (typeof quizQuestions)[number];
  currentAnswer?: string;
  onAnswer: (questionId: string, value: string) => void;
  onBack: () => void;
  stepNumber: number;
  totalSteps: number;
}) {
  return (
    <section className="min-h-screen flex items-center">
      <div className="container px-4 mx-auto max-w-2xl pt-24 pb-12">
        {/* Step counter and back */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-stone-500 hover:text-stone-800 transition-colors text-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-sm text-stone-400 font-medium">
            {stepNumber} of {totalSteps}
          </span>
        </div>

        {/* Question */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-normal text-black mb-3 leading-snug">
            {question.question}
          </h2>
          <p className="text-stone-500 text-base">{question.subtitle}</p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, idx) => {
            const isSelected = currentAnswer === option.value;
            return (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                onClick={() => onAnswer(question.id, option.value)}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-stone-200 hover:border-primary/40 hover:bg-stone-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? "border-primary bg-primary" : "border-stone-300"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2.5 h-2.5 rounded-full bg-white"
                      />
                    )}
                  </div>
                  <span
                    className={`text-base ${isSelected ? "text-black font-medium" : "text-stone-700"}`}
                  >
                    {option.label}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Email Capture ──────────────────────────────────────────────────── */
function EmailCapture({
  name,
  setName,
  email,
  setEmail,
  emailError,
  onSubmit,
  onSkip,
  isLoading,
  onBack,
}: {
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  emailError: string;
  onSubmit: () => void;
  onSkip: () => void;
  isLoading: boolean;
  onBack: () => void;
}) {
  return (
    <section className="min-h-screen flex items-center">
      <div className="container px-4 mx-auto max-w-lg pt-24 pb-12">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-stone-500 hover:text-stone-800 transition-colors text-sm mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-stone-100 p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-normal text-black mb-3">
              Your results are ready!
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Enter your email to get your personalized oral health assessment,
              plus tips to save on dental care delivered to your inbox.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-5 py-4 rounded-xl border-2 text-base transition-colors outline-none border-stone-200 focus:border-primary"
              />
            </div>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmail(e.target.value);
                }}
                placeholder="your@email.com"
                className={`w-full px-5 py-4 rounded-xl border-2 text-base transition-colors outline-none ${
                  emailError
                    ? "border-red-300 focus:border-red-500"
                    : "border-stone-200 focus:border-primary"
                }`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSubmit();
                }}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-2">{emailError}</p>
              )}
            </div>

            <Button
              size="lg"
              className="w-full bg-primary text-white hover:bg-primary/90 rounded-xl py-6 text-base font-medium cursor-pointer"
              onClick={onSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  See My Results
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>

            <button
              onClick={onSkip}
              className="w-full text-center text-sm text-stone-400 hover:text-stone-600 transition-colors py-2 cursor-pointer"
            >
              Skip and see results without email
            </button>
          </div>

          <p className="text-xs text-stone-400 text-center mt-6">
            We respect your privacy. No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Results Section ────────────────────────────────────────────────── */
function ResultsSection({
  result,
  insuranceAnswer,
}: {
  result: QuizResult;
  insuranceAnswer?: string;
}) {
  const config = riskConfig[result.level];
  const RiskIcon = config.icon;

  return (
    <section className="pt-32 pb-16">
      <div className="container px-4 mx-auto max-w-3xl">
        {/* Risk Level Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${config.bg} ${config.border} border-2 rounded-3xl p-8 md:p-10 mb-8`}
        >
          <div className="flex items-start gap-4 mb-6">
            <div
              className={`w-14 h-14 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}
            >
              <RiskIcon className={`w-7 h-7 ${config.color}`} />
            </div>
            <div>
              <div
                className={`text-sm font-medium uppercase tracking-wider ${config.color} mb-1`}
              >
                {config.label}
              </div>
              <h1 className="text-2xl md:text-3xl font-normal text-black">
                {result.title}
              </h1>
            </div>
          </div>
          <p className="text-stone-700 text-lg leading-relaxed">
            {result.summary}
          </p>
          <div className={`mt-4 p-4 rounded-xl bg-white/60 border ${config.border}`}>
            <p className={`text-sm font-medium ${config.color}`}>
              {result.urgency}
            </p>
          </div>
        </motion.div>

        {/* Matched Conditions */}
        {result.matchedConditions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl shadow-lg border border-stone-100 p-8 mb-8"
          >
            <h2 className="text-xl font-medium text-black mb-5">
              Conditions to Watch For
            </h2>
            <div className="space-y-4">
              {result.matchedConditions.map((condition, idx) => (
                <Link
                  key={idx}
                  href={condition.slug}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-black group-hover:text-primary transition-colors">
                      {condition.name}
                    </div>
                    <p className="text-sm text-stone-500 mt-1">
                      {condition.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-primary transition-colors mt-1 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-lg border border-stone-100 p-8 mb-8"
        >
          <h2 className="text-xl font-medium text-black mb-5">
            What We Recommend
          </h2>
          <div className="space-y-4">
            {result.recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">
                    {idx + 1}
                  </span>
                </div>
                <p className="text-stone-700">{rec}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA: Download App */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-10 text-white"
        >
          <h2 className="text-2xl md:text-3xl font-normal mb-4">
            Get a deeper look with DentaSmart
          </h2>
          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            Upload a photo of your teeth or X-rays and get an AI-powered
            analysis with your Oral Health Score, matched conditions, and a
            personalized care plan. All in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={getAppStoreUrl("symptom_quiz_results")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackAppDownload("ios", "symptom_quiz_results")
              }
            >
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-7 text-base font-medium w-full sm:w-auto cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current mr-2"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.74-3.03 1.59-.67.79-1.25 2.05-1.09 3.2 1.17.09 2.35-.84 3.05-1.68" />
                </svg>
                Download for iOS
              </Button>
            </a>
            <Link href="/download">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-7 text-base font-medium w-full sm:w-auto cursor-pointer"
              >
                All Download Options
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Affordability link for uninsured */}
        {(insuranceAnswer === "uninsured" || insuranceAnswer === "limited") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 bg-stone-50 rounded-2xl p-6 border border-stone-100"
          >
            <h3 className="font-medium text-black mb-2">
              Worried about dental costs?
            </h3>
            <p className="text-stone-600 text-sm mb-4">
              We have resources to help you find affordable dental care, even
              without insurance.
            </p>
            <Link href="/guides/affordable-dental-care">
              <span className="text-primary font-medium text-sm hover:underline cursor-pointer">
                Read our guide to affordable dental care &rarr;
              </span>
            </Link>
          </motion.div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-stone-400 max-w-lg mx-auto leading-relaxed">
            This quiz provides general educational information only and is not a
            substitute for professional dental advice, diagnosis, or treatment.
            Always consult a qualified dentist for concerns about your oral
            health.
          </p>
        </div>
      </div>
    </section>
  );
}
