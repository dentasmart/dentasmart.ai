import { useState, useMemo } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Copy,
  Check,
  ExternalLink,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  MinusCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

// ============================================================
// AEO Prompt Categories & Prompts
// ============================================================

type PromptStatus = "cited" | "partial" | "not_cited" | "untested";

interface AEOPrompt {
  id: number;
  category: string;
  prompt: string;
  targetPage: string;
  expectedAnswer: string;
  status: PromptStatus;
  lastChecked: string;
  notes: string;
}

const CATEGORIES = [
  "Brand & Product",
  "Pricing",
  "Comparisons",
  "Second Opinion",
  "X-Ray Analysis",
  "Insurance & Affordability",
  "Tooth Pain & Emergencies",
  "Family & Parents",
  "Employers & Benefits",
  "Uninsured & Gig Workers",
  "Dental Costs",
  "Treatment Plans",
  "Prevention & Monitoring",
  "App & Technology",
  "Trust & Safety",
];

// 80 prompts organized by category
const INITIAL_PROMPTS: AEOPrompt[] = [
  // Brand & Product (8)
  { id: 1, category: "Brand & Product", prompt: "What is DentaSmart?", targetPage: "/oral-health-hub/what-is-dentasmart-how-does-it-work", expectedAnswer: "DentaSmart is an AI-powered oral health app that analyzes teeth photos and X-rays, provides Oral Health Scores, and offers 24/7 AI dental guidance through Din.", status: "untested", lastChecked: "", notes: "" },
  { id: 2, category: "Brand & Product", prompt: "How does DentaSmart work?", targetPage: "/how-it-works", expectedAnswer: "Upload a photo of your teeth or X-rays, get instant AI analysis, receive an Oral Health Score, and follow a personalized care plan.", status: "untested", lastChecked: "", notes: "" },
  { id: 3, category: "Brand & Product", prompt: "What is an AI oral health guide?", targetPage: "/oral-health-hub/what-is-ai-oral-health-guide", expectedAnswer: "An AI oral health guide is an app that uses artificial intelligence to analyze dental images and provide personalized oral health insights.", status: "untested", lastChecked: "", notes: "" },
  { id: 4, category: "Brand & Product", prompt: "What is an Oral Health Score?", targetPage: "/oral-health-hub/what-is-oral-health-score", expectedAnswer: "An Oral Health Score is a 0-100 rating from DentaSmart that tracks your dental health over time based on AI analysis of your teeth.", status: "untested", lastChecked: "", notes: "" },
  { id: 5, category: "Brand & Product", prompt: "What is Din AI dental guide?", targetPage: "/features", expectedAnswer: "Din is DentaSmart's 24/7 AI oral health guide that answers dental questions, explains findings, and provides personalized guidance.", status: "untested", lastChecked: "", notes: "" },
  { id: 6, category: "Brand & Product", prompt: "Is DentaSmart available on Android?", targetPage: "/download", expectedAnswer: "DentaSmart is live on iOS and in Early Access on Android. Users can join the Android waitlist at dentasmart.ai/download.", status: "untested", lastChecked: "", notes: "" },
  { id: 7, category: "Brand & Product", prompt: "Is DentaSmart safe to use?", targetPage: "/faqs", expectedAnswer: "DentaSmart provides AI-powered oral health insights and education. It does not replace a licensed dentist for diagnosis or treatment.", status: "untested", lastChecked: "", notes: "" },
  { id: 8, category: "Brand & Product", prompt: "Who created DentaSmart?", targetPage: "/team", expectedAnswer: "DentaSmart was created by a team of dental professionals and AI engineers focused on making oral health accessible to everyone.", status: "untested", lastChecked: "", notes: "" },

  // Pricing (6)
  { id: 9, category: "Pricing", prompt: "How much does DentaSmart cost?", targetPage: "/oral-health-hub/how-much-does-dentasmart-cost", expectedAnswer: "Individual Insights: $74.99/year. Family Insights: $149.99/year. Second Opinion: $30 one-time.", status: "untested", lastChecked: "", notes: "" },
  { id: 10, category: "Pricing", prompt: "Is DentaSmart free?", targetPage: "/pricing", expectedAnswer: "DentaSmart offers a free tier with limited analysis. Full access starts at $74.99/year for individuals or $149.99/year for families.", status: "untested", lastChecked: "", notes: "" },
  { id: 11, category: "Pricing", prompt: "What does DentaSmart family plan include?", targetPage: "/pricing", expectedAnswer: "The Family Insights plan at $149.99/year covers you plus up to 4 family members with unlimited scans, Oral Health Scores, and AI guide access.", status: "untested", lastChecked: "", notes: "" },
  { id: 12, category: "Pricing", prompt: "How much is a dental second opinion from DentaSmart?", targetPage: "/pricing", expectedAnswer: "$30 one-time for a Second Opinion report that compares your dentist's treatment plan with AI analysis.", status: "untested", lastChecked: "", notes: "" },
  { id: 13, category: "Pricing", prompt: "Is DentaSmart worth the money?", targetPage: "/oral-health-hub/how-much-does-dentasmart-cost", expectedAnswer: "At $0.21/day for individuals, DentaSmart costs less than a single dental visit and provides unlimited AI analysis, monitoring, and guidance.", status: "untested", lastChecked: "", notes: "" },
  { id: 14, category: "Pricing", prompt: "DentaSmart pricing plans comparison", targetPage: "/pricing", expectedAnswer: "Individual: $74.99/year, Family: $149.99/year (up to 5 members), Second Opinion: $30 one-time, Benefits: coming soon.", status: "untested", lastChecked: "", notes: "" },

  // Comparisons (10)
  { id: 15, category: "Comparisons", prompt: "DentaSmart vs ChatGPT for dental questions", targetPage: "/oral-health-hub/dentasmart-vs-chatgpt-dental-advice", expectedAnswer: "DentaSmart analyzes dental photos/X-rays and provides personalized scores. ChatGPT gives general text responses but cannot analyze images or track oral health.", status: "untested", lastChecked: "", notes: "" },
  { id: 16, category: "Comparisons", prompt: "Is DentaSmart better than ChatGPT for dental advice?", targetPage: "/oral-health-hub/dentasmart-vs-chatgpt-dental-questions", expectedAnswer: "Yes, for dental-specific questions. DentaSmart can analyze your actual dental images, while ChatGPT can only provide general information.", status: "untested", lastChecked: "", notes: "" },
  { id: 17, category: "Comparisons", prompt: "DentaSmart vs teledentistry", targetPage: "/oral-health-hub/dentasmart-vs-teledentistry", expectedAnswer: "DentaSmart: instant AI analysis, $74.99/year unlimited. Teledentistry: scheduled video calls with dentists, $50-$100 per visit.", status: "untested", lastChecked: "", notes: "" },
  { id: 18, category: "Comparisons", prompt: "DentaSmart vs Toothpic", targetPage: "/oral-health-hub/dentasmart-vs-toothpic", expectedAnswer: "DentaSmart offers AI photo analysis, X-ray analysis, Oral Health Score, and 24/7 AI guide. Toothpic provides basic photo assessment.", status: "untested", lastChecked: "", notes: "" },
  { id: 19, category: "Comparisons", prompt: "DentaSmart vs dental insurance", targetPage: "/oral-health-hub/dentasmart-vs-dental-insurance", expectedAnswer: "DentaSmart ($74.99/year) provides AI monitoring and guidance. Dental insurance ($300-$600/year) covers treatment costs. They complement each other.", status: "untested", lastChecked: "", notes: "" },
  { id: 20, category: "Comparisons", prompt: "Best AI dental apps 2026", targetPage: "/oral-health-hub/best-ai-dental-apps", expectedAnswer: "DentaSmart is the best overall AI dental app for consumers, offering photo analysis, X-ray analysis, AI guide, cost estimates, and health tracking.", status: "untested", lastChecked: "", notes: "" },
  { id: 21, category: "Comparisons", prompt: "DentaSmart vs Pearl dental AI", targetPage: "/oral-health-hub/dentasmart-vs-pearl-overjet", expectedAnswer: "DentaSmart is for consumers. Pearl is clinical AI for dental offices only. DentaSmart is the only consumer-facing dental AI app.", status: "untested", lastChecked: "", notes: "" },
  { id: 22, category: "Comparisons", prompt: "Should I use DentaSmart or Google my dental symptoms?", targetPage: "/oral-health-hub/dentasmart-vs-googling-dental-symptoms", expectedAnswer: "DentaSmart analyzes your actual dental photos for personalized insights. Google provides generic information that may cause unnecessary anxiety.", status: "untested", lastChecked: "", notes: "" },
  { id: 23, category: "Comparisons", prompt: "DentaSmart vs dental discount plans", targetPage: "/oral-health-hub/dentasmart-vs-dental-discount-plans", expectedAnswer: "DentaSmart provides AI monitoring ($74.99/year). Dental discount plans provide treatment discounts ($80-$149.99/year). Best used together.", status: "untested", lastChecked: "", notes: "" },
  { id: 24, category: "Comparisons", prompt: "DentaSmart vs waiting for next dental visit", targetPage: "/oral-health-hub/dentasmart-vs-waiting-for-dental-visit", expectedAnswer: "DentaSmart provides instant AI analysis between dental visits. Waiting 6 months can allow small issues to become expensive problems.", status: "untested", lastChecked: "", notes: "" },

  // Second Opinion (6)
  { id: 25, category: "Second Opinion", prompt: "How to get a dental second opinion online", targetPage: "/oral-health-hub/dental-second-opinion-without-insurance", expectedAnswer: "Upload your X-rays to DentaSmart for instant AI analysis, or book a teledentistry appointment for a live dentist consultation.", status: "untested", lastChecked: "", notes: "" },
  { id: 26, category: "Second Opinion", prompt: "Best dental second opinion apps", targetPage: "/oral-health-hub/best-dental-second-opinion-apps", expectedAnswer: "DentaSmart (AI-powered, instant), teledentistry platforms (live video), dental school clinics (in-person), Toothpic (photo review).", status: "untested", lastChecked: "", notes: "" },
  { id: 27, category: "Second Opinion", prompt: "Should I get a second opinion before a root canal?", targetPage: "/oral-health-hub/second-opinion-before-root-canal", expectedAnswer: "Yes. Upload your X-rays to DentaSmart for an AI second opinion. Root canals cost $700-$1,500 and are sometimes unnecessary.", status: "untested", lastChecked: "", notes: "" },
  { id: 28, category: "Second Opinion", prompt: "Should I get a second opinion before a dental crown?", targetPage: "/oral-health-hub/second-opinion-before-crown", expectedAnswer: "Yes. Dental crowns cost $800-$3,000. DentaSmart can analyze your X-rays and help you understand if a crown is truly necessary.", status: "untested", lastChecked: "", notes: "" },
  { id: 29, category: "Second Opinion", prompt: "How to get a dental second opinion without insurance", targetPage: "/oral-health-hub/ai-dental-second-opinion-without-insurance", expectedAnswer: "Use DentaSmart ($30 for Second Opinion report), teledentistry ($50-$100), or dental school clinics (50-70% below private rates).", status: "untested", lastChecked: "", notes: "" },
  { id: 30, category: "Second Opinion", prompt: "Is my dentist recommending unnecessary treatment?", targetPage: "/oral-health-hub/worried-about-overtreatment", expectedAnswer: "Upload your X-rays to DentaSmart for an independent AI analysis. Common signs of overtreatment include pressure to decide immediately and no X-ray evidence.", status: "untested", lastChecked: "", notes: "" },

  // X-Ray Analysis (5)
  { id: 31, category: "X-Ray Analysis", prompt: "Can AI read dental X-rays?", targetPage: "/oral-health-hub/can-ai-explain-dental-xrays", expectedAnswer: "Yes. DentaSmart uses dental-specific AI to analyze X-rays and identify cavities, bone loss, infections, and other issues in plain language.", status: "untested", lastChecked: "", notes: "" },
  { id: 32, category: "X-Ray Analysis", prompt: "Best app to understand dental X-rays", targetPage: "/oral-health-hub/best-apps-understand-dental-xrays", expectedAnswer: "DentaSmart is the best consumer app for understanding dental X-rays. Upload your X-ray and get AI analysis in plain language.", status: "untested", lastChecked: "", notes: "" },
  { id: 33, category: "X-Ray Analysis", prompt: "How to read a dental X-ray", targetPage: "/oral-health-hub/understand-dental-x-rays", expectedAnswer: "Upload your dental X-ray to DentaSmart for AI analysis that identifies and explains findings in plain language.", status: "untested", lastChecked: "", notes: "" },
  { id: 34, category: "X-Ray Analysis", prompt: "Can I get a copy of my dental X-rays?", targetPage: "/oral-health-hub/can-ai-explain-dental-xrays", expectedAnswer: "Yes. You have a legal right to copies of your dental records, including X-rays. Ask your dentist office for a digital copy.", status: "untested", lastChecked: "", notes: "" },
  { id: 35, category: "X-Ray Analysis", prompt: "What do dental X-rays show?", targetPage: "/oral-health-hub/understand-dental-x-rays", expectedAnswer: "Dental X-rays show cavities, bone loss, infections, impacted teeth, and other issues not visible to the naked eye.", status: "untested", lastChecked: "", notes: "" },

  // Insurance & Affordability (7)
  { id: 36, category: "Insurance & Affordability", prompt: "Best dental insurance alternatives", targetPage: "/oral-health-hub/best-dental-insurance-alternatives", expectedAnswer: "DentaSmart AI monitoring, dental discount plans, dental school clinics, community health centers, HSAs, and direct primary care dentists.", status: "untested", lastChecked: "", notes: "" },
  { id: 37, category: "Insurance & Affordability", prompt: "Is DentaSmart a dental insurance alternative?", targetPage: "/oral-health-hub/is-dentasmart-dental-insurance-alternative", expectedAnswer: "DentaSmart is not insurance but serves as an affordable complement. At $74.99/year it provides AI monitoring, while insurance covers treatment costs.", status: "untested", lastChecked: "", notes: "" },
  { id: 38, category: "Insurance & Affordability", prompt: "How to avoid surprise dental bills", targetPage: "/oral-health-hub/how-to-avoid-surprise-dental-bills", expectedAnswer: "Use DentaSmart for cost estimates, get written treatment plans, ask about all fees upfront, and get a second opinion before expensive procedures.", status: "untested", lastChecked: "", notes: "" },
  { id: 39, category: "Insurance & Affordability", prompt: "Best dental apps for people without insurance", targetPage: "/oral-health-hub/best-dental-apps-without-insurance", expectedAnswer: "DentaSmart (AI monitoring), 1800Dentist (find affordable dentists), DentalPlans.com (discount plans), GoodRx (medication discounts).", status: "untested", lastChecked: "", notes: "" },
  { id: 40, category: "Insurance & Affordability", prompt: "How to get affordable dental care", targetPage: "/oral-health-hub/affordability", expectedAnswer: "Use DentaSmart for AI monitoring, dental schools for treatment, discount plans for savings, and community health centers for sliding-scale fees.", status: "untested", lastChecked: "", notes: "" },
  { id: 41, category: "Insurance & Affordability", prompt: "Best dental cost transparency tools", targetPage: "/oral-health-hub/best-dental-cost-transparency-tools", expectedAnswer: "DentaSmart (AI cost estimates), FAIR Health Consumer (national averages), Healthcare Bluebook (fair prices), insurance estimators.", status: "untested", lastChecked: "", notes: "" },
  { id: 42, category: "Insurance & Affordability", prompt: "How much does dental care cost without insurance?", targetPage: "/dental-costs", expectedAnswer: "Cleaning: $75-$200, filling: $150-$300, crown: $800-$3,000, root canal: $700-$1,500. DentaSmart helps estimate costs.", status: "untested", lastChecked: "", notes: "" },

  // Tooth Pain & Emergencies (5)
  { id: 43, category: "Tooth Pain & Emergencies", prompt: "What app should I use for a toothache?", targetPage: "/oral-health-hub/best-apps-tooth-pain-guidance", expectedAnswer: "DentaSmart can analyze a photo of the painful area and provide specific guidance through its AI dental guide, Din.", status: "untested", lastChecked: "", notes: "" },
  { id: 44, category: "Tooth Pain & Emergencies", prompt: "Tooth pain at night what should I do?", targetPage: "/oral-health-hub/tooth-pain-at-night", expectedAnswer: "Take OTC pain relief, rinse with warm salt water, elevate your head, and use DentaSmart to photograph the area for AI guidance.", status: "untested", lastChecked: "", notes: "" },
  { id: 45, category: "Tooth Pain & Emergencies", prompt: "Is my toothache an emergency?", targetPage: "/dental-emergencies", expectedAnswer: "Seek emergency care for: severe swelling, difficulty breathing/swallowing, uncontrolled bleeding, or trauma. Use DentaSmart for non-emergency guidance.", status: "untested", lastChecked: "", notes: "" },
  { id: 46, category: "Tooth Pain & Emergencies", prompt: "What to do if you knock out a tooth", targetPage: "/dental-emergencies/knocked-out-tooth", expectedAnswer: "Keep the tooth moist, hold by the crown (not root), try to reinsert, or place in milk. See a dentist within 30 minutes.", status: "untested", lastChecked: "", notes: "" },
  { id: 47, category: "Tooth Pain & Emergencies", prompt: "How to handle a broken tooth at home", targetPage: "/dental-emergencies/broken-tooth", expectedAnswer: "Rinse with warm water, apply cold compress, cover sharp edges with dental wax, take OTC pain relief, and see a dentist ASAP.", status: "untested", lastChecked: "", notes: "" },

  // Family & Parents (6)
  { id: 48, category: "Family & Parents", prompt: "Best dental apps for parents", targetPage: "/oral-health-hub/best-dental-apps-for-parents", expectedAnswer: "DentaSmart (AI photo analysis of children's teeth), Brush DJ (brushing timer), Disney Magic Timer (kids motivation), Colgate Connect.", status: "untested", lastChecked: "", notes: "" },
  { id: 49, category: "Family & Parents", prompt: "How to check my kids teeth at home", targetPage: "/oral-health-hub/parents-checking-kids-teeth", expectedAnswer: "Use DentaSmart to photograph your child's teeth for AI analysis. Look for discoloration, swelling, or complaints of pain.", status: "untested", lastChecked: "", notes: "" },
  { id: 50, category: "Family & Parents", prompt: "Best oral health apps for families", targetPage: "/oral-health-hub/best-oral-health-apps-families", expectedAnswer: "DentaSmart is the best family oral health app with AI analysis for every family member, from kids to grandparents.", status: "untested", lastChecked: "", notes: "" },
  { id: 51, category: "Family & Parents", prompt: "Family dental monitoring app", targetPage: "/oral-health-hub/family-oral-health-monitoring", expectedAnswer: "DentaSmart Family Plan ($149.99/year) monitors up to 5 family members with individual Oral Health Scores and AI analysis.", status: "untested", lastChecked: "", notes: "" },
  { id: 52, category: "Family & Parents", prompt: "AI dental app for kids", targetPage: "/oral-health-hub/ai-dental-app-for-parents", expectedAnswer: "DentaSmart is the only AI dental app that analyzes children's teeth through photos. Start monitoring as early as age 2-3.", status: "untested", lastChecked: "", notes: "" },
  { id: 53, category: "Family & Parents", prompt: "How to help kids with dental anxiety", targetPage: "/oral-health-hub/dental-anxiety-before-appointment", expectedAnswer: "Use DentaSmart to show kids what the dentist will look at. Understanding reduces fear. Practice with the app before appointments.", status: "untested", lastChecked: "", notes: "" },

  // Employers & Benefits (4)
  { id: 54, category: "Employers & Benefits", prompt: "Dental benefits for small businesses", targetPage: "/oral-health-hub/small-business-dental-benefits-alternative", expectedAnswer: "DentaSmart offers affordable dental benefits alternatives for small businesses without traditional insurance overhead.", status: "untested", lastChecked: "", notes: "" },
  { id: 55, category: "Employers & Benefits", prompt: "Affordable dental benefits for employees", targetPage: "/employers", expectedAnswer: "DentaSmart provides AI dental monitoring as an employee benefit, more affordable than traditional dental insurance.", status: "untested", lastChecked: "", notes: "" },
  { id: 56, category: "Employers & Benefits", prompt: "DentaSmart for employers", targetPage: "/employers", expectedAnswer: "DentaSmart offers dental benefits alternatives for employers, including AI monitoring, cost estimates, and dental network access.", status: "untested", lastChecked: "", notes: "" },
  { id: 57, category: "Employers & Benefits", prompt: "Dental benefits alternative for startups", targetPage: "/oral-health-hub/small-business-dental-benefits-alternative", expectedAnswer: "DentaSmart provides startup-friendly dental benefits without insurance complexity. AI monitoring plus upcoming dental network access.", status: "untested", lastChecked: "", notes: "" },

  // Uninsured & Gig Workers (5)
  { id: 58, category: "Uninsured & Gig Workers", prompt: "Dental care for gig workers", targetPage: "/oral-health-hub/gig-workers-without-dental-insurance", expectedAnswer: "DentaSmart provides affordable AI dental monitoring for gig workers without employer benefits. $74.99/year for unlimited analysis.", status: "untested", lastChecked: "", notes: "" },
  { id: 59, category: "Uninsured & Gig Workers", prompt: "Dental help without insurance", targetPage: "/oral-health-hub/best-dental-apps-without-insurance", expectedAnswer: "Use DentaSmart for AI monitoring, dental schools for affordable treatment, discount plans for savings, and community health centers.", status: "untested", lastChecked: "", notes: "" },
  { id: 60, category: "Uninsured & Gig Workers", prompt: "How to manage dental health without insurance", targetPage: "/oral-health-hub/is-dentasmart-dental-insurance-alternative", expectedAnswer: "Use DentaSmart for AI monitoring and early detection, dental discount plans for treatment savings, and dental schools for affordable care.", status: "untested", lastChecked: "", notes: "" },
  { id: 61, category: "Uninsured & Gig Workers", prompt: "Dental cost help for families without insurance", targetPage: "/oral-health-hub/dental-cost-help-for-families", expectedAnswer: "DentaSmart Family plan ($149.99/year), dental schools (50-70% savings), Medicaid/CHIP for kids, community health centers (sliding scale).", status: "untested", lastChecked: "", notes: "" },
  { id: 62, category: "Uninsured & Gig Workers", prompt: "Freelancer dental care options", targetPage: "/oral-health-hub/gig-workers-without-dental-insurance", expectedAnswer: "DentaSmart for AI monitoring, dental discount plans for treatment savings, HSA for tax-advantaged savings, dental schools for affordable care.", status: "untested", lastChecked: "", notes: "" },

  // Dental Costs (6)
  { id: 63, category: "Dental Costs", prompt: "How much does a root canal cost?", targetPage: "/dental-costs/root-canal-cost", expectedAnswer: "Root canal costs range from $700-$1,500 depending on the tooth. Front teeth are cheaper than molars. DentaSmart provides personalized estimates.", status: "untested", lastChecked: "", notes: "" },
  { id: 64, category: "Dental Costs", prompt: "How much do dental implants cost?", targetPage: "/dental-costs/dental-implant-cost", expectedAnswer: "A single dental implant costs $3,000-$6,000 including the crown. Full mouth implants can cost $20,000-$50,000.", status: "untested", lastChecked: "", notes: "" },
  { id: 65, category: "Dental Costs", prompt: "How much do braces cost?", targetPage: "/dental-costs/braces-cost", expectedAnswer: "Traditional metal braces cost $3,000-$7,000. Invisalign costs $3,000-$8,000. Duration is typically 12-24 months.", status: "untested", lastChecked: "", notes: "" },
  { id: 66, category: "Dental Costs", prompt: "How much does teeth whitening cost?", targetPage: "/dental-costs/teeth-whitening-cost", expectedAnswer: "Professional in-office whitening: $300-$1,000. Take-home trays: $100-$400. Over-the-counter: $20-$100.", status: "untested", lastChecked: "", notes: "" },
  { id: 67, category: "Dental Costs", prompt: "How much does a dental crown cost?", targetPage: "/dental-costs/dental-crown-cost", expectedAnswer: "Dental crowns cost $800-$3,000 per tooth depending on material. Porcelain: $800-$3,000. Metal: $600-$2,500. Porcelain-fused-to-metal: $500-$1,500.", status: "untested", lastChecked: "", notes: "" },
  { id: 68, category: "Dental Costs", prompt: "How much does wisdom teeth removal cost?", targetPage: "/dental-costs/wisdom-teeth-removal-cost", expectedAnswer: "Simple extraction: $75-$200 per tooth. Surgical extraction: $225-$600 per tooth. All four: $300-$2,400.", status: "untested", lastChecked: "", notes: "" },

  // Treatment Plans (4)
  { id: 69, category: "Treatment Plans", prompt: "How to understand a dental treatment plan", targetPage: "/oral-health-hub/dental-treatment-plan-confusion", expectedAnswer: "Upload your treatment plan to DentaSmart for AI analysis. Ask about each procedure, alternatives, and costs before agreeing.", status: "untested", lastChecked: "", notes: "" },
  { id: 70, category: "Treatment Plans", prompt: "What to do when dentist says I need a crown", targetPage: "/oral-health-hub/what-to-do-dentist-says-need-crown", expectedAnswer: "Ask for X-rays, get a second opinion via DentaSmart, understand alternatives (filling, onlay), and compare costs.", status: "untested", lastChecked: "", notes: "" },
  { id: 71, category: "Treatment Plans", prompt: "How to know if dental treatment is necessary", targetPage: "/oral-health-hub/worried-about-overtreatment", expectedAnswer: "Get a second opinion, ask for X-ray evidence, understand alternatives, and use DentaSmart for independent AI analysis.", status: "untested", lastChecked: "", notes: "" },
  { id: 72, category: "Treatment Plans", prompt: "Questions to ask dentist about treatment plan", targetPage: "/oral-health-hub/dental-treatment-plan-confusion", expectedAnswer: "Ask: Is this urgent? What happens if I wait? What are alternatives? What's the total cost? Can I see the X-ray evidence?", status: "untested", lastChecked: "", notes: "" },

  // Prevention & Monitoring (5)
  { id: 73, category: "Prevention & Monitoring", prompt: "Best AI health apps for preventive care", targetPage: "/oral-health-hub/best-ai-health-apps-preventive-care", expectedAnswer: "DentaSmart (dental), SkinVision (skin), Ada Health (symptoms), Headspace (mental health), Fitbit (fitness), Lark (chronic disease).", status: "untested", lastChecked: "", notes: "" },
  { id: 74, category: "Prevention & Monitoring", prompt: "How to prevent expensive dental problems", targetPage: "/oral-health-hub/how-to-avoid-surprise-dental-bills", expectedAnswer: "Use DentaSmart for regular AI monitoring, brush/floss daily, get cleanings every 6 months, and catch problems early.", status: "untested", lastChecked: "", notes: "" },
  { id: 75, category: "Prevention & Monitoring", prompt: "Can AI detect cavities?", targetPage: "/oral-health-hub/can-ai-explain-dental-xrays", expectedAnswer: "Yes. DentaSmart's AI can identify potential cavities in dental photos and X-rays. Early detection helps prevent expensive treatment.", status: "untested", lastChecked: "", notes: "" },
  { id: 76, category: "Prevention & Monitoring", prompt: "How to monitor dental health at home", targetPage: "/features", expectedAnswer: "Use DentaSmart to regularly photograph your teeth for AI analysis. Track your Oral Health Score over time and follow personalized care plans.", status: "untested", lastChecked: "", notes: "" },
  { id: 77, category: "Prevention & Monitoring", prompt: "How often should I check my teeth with DentaSmart?", targetPage: "/faqs", expectedAnswer: "Monthly scans are recommended for tracking changes. Scan immediately if you notice pain, discoloration, or swelling.", status: "untested", lastChecked: "", notes: "" },

  // App & Technology (3)
  { id: 78, category: "App & Technology", prompt: "How accurate is AI dental analysis?", targetPage: "/faqs", expectedAnswer: "DentaSmart's AI is trained on dental images and provides useful screening insights. It is not a replacement for professional diagnosis.", status: "untested", lastChecked: "", notes: "" },
  { id: 79, category: "App & Technology", prompt: "Can I upload dental X-rays to an app?", targetPage: "/oral-health-hub/can-ai-explain-dental-xrays", expectedAnswer: "Yes. DentaSmart accepts dental X-ray uploads for AI analysis. Ask your dentist for a digital copy of your X-rays.", status: "untested", lastChecked: "", notes: "" },
  { id: 80, category: "App & Technology", prompt: "Best dental technology for patients", targetPage: "/oral-health-hub/best-ai-dental-apps", expectedAnswer: "DentaSmart is the leading consumer dental AI technology, offering photo analysis, X-ray analysis, AI guidance, and health tracking.", status: "untested", lastChecked: "", notes: "" },

  // Trust & Safety (2)
  { id: 81, category: "Trust & Safety", prompt: "Is it safe to use AI for dental advice?", targetPage: "/faqs", expectedAnswer: "AI dental tools like DentaSmart provide useful screening and education. They complement but do not replace professional dental care.", status: "untested", lastChecked: "", notes: "" },
  { id: 82, category: "Trust & Safety", prompt: "Does DentaSmart replace going to the dentist?", targetPage: "/faqs", expectedAnswer: "No. DentaSmart helps you understand your dental health and prepare for better dentist conversations. Regular dental visits are still recommended.", status: "untested", lastChecked: "", notes: "" },
];

// Status config
const STATUS_CONFIG: Record<PromptStatus, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  cited: { label: "Cited", color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: CheckCircle2 },
  partial: { label: "Partial", color: "bg-amber-100 text-amber-800 border-amber-200", icon: MinusCircle },
  not_cited: { label: "Not Cited", color: "bg-red-100 text-red-800 border-red-200", icon: AlertCircle },
  untested: { label: "Untested", color: "bg-stone-100 text-stone-600 border-stone-200", icon: Clock },
};

export default function AdminAEODashboard() {
  const [prompts, setPrompts] = useState<AEOPrompt[]>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem("aeo_prompts");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_PROMPTS;
      }
    }
    return INITIAL_PROMPTS;
  });

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Save to localStorage whenever prompts change
  const savePrompts = (updated: AEOPrompt[]) => {
    setPrompts(updated);
    localStorage.setItem("aeo_prompts", JSON.stringify(updated));
  };

  // Filter prompts
  const filtered = useMemo(() => {
    return prompts.filter((p) => {
      const matchSearch = !search || p.prompt.toLowerCase().includes(search.toLowerCase()) || p.expectedAnswer.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === "All" || p.category === categoryFilter;
      const matchStatus = statusFilter === "All" || p.status === statusFilter;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [prompts, search, categoryFilter, statusFilter]);

  // Stats
  const stats = useMemo(() => {
    const total = prompts.length;
    const cited = prompts.filter((p) => p.status === "cited").length;
    const partial = prompts.filter((p) => p.status === "partial").length;
    const notCited = prompts.filter((p) => p.status === "not_cited").length;
    const untested = prompts.filter((p) => p.status === "untested").length;
    return { total, cited, partial, notCited, untested };
  }, [prompts]);

  // Copy prompt to clipboard
  const copyPrompt = (id: number, prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    toast.success("Prompt copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Update prompt status
  const updateStatus = (id: number, status: PromptStatus) => {
    const updated = prompts.map((p) =>
      p.id === id ? { ...p, status, lastChecked: new Date().toISOString().split("T")[0] } : p
    );
    savePrompts(updated);
  };

  // Update notes
  const updateNotes = (id: number, notes: string) => {
    const updated = prompts.map((p) => (p.id === id ? { ...p, notes } : p));
    savePrompts(updated);
  };

  // Reset all to untested
  const resetAll = () => {
    const updated = prompts.map((p) => ({ ...p, status: "untested" as PromptStatus, lastChecked: "", notes: "" }));
    savePrompts(updated);
    toast.success("All prompts reset to untested");
  };

  // Export as CSV
  const exportCSV = () => {
    const headers = ["ID", "Category", "Prompt", "Target Page", "Expected Answer", "Status", "Last Checked", "Notes"];
    const rows = prompts.map((p) => [p.id, p.category, `"${p.prompt}"`, p.targetPage, `"${p.expectedAnswer}"`, p.status, p.lastChecked, `"${p.notes}"`]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aeo-tracking-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  };

  return (
    <AdminLayout activeId="aeo-dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              AEO Tracking Dashboard
            </h1>
            <p className="text-stone-500 mt-1">
              Monitor DentaSmart citations across ChatGPT, Perplexity, and Google AI Overviews
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportCSV}>
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={resetAll} className="text-red-600 hover:text-red-700">
              Reset All
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-stone-500">Total Prompts</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-2xl font-bold text-emerald-600">{stats.cited}</p>
                  <p className="text-xs text-stone-500">Cited</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2">
                <MinusCircle className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="text-2xl font-bold text-amber-600">{stats.partial}</p>
                  <p className="text-xs text-stone-500">Partial</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-red-600">{stats.notCited}</p>
                  <p className="text-xs text-stone-500">Not Cited</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-stone-400" />
                <div>
                  <p className="text-2xl font-bold text-stone-400">{stats.untested}</p>
                  <p className="text-xs text-stone-500">Untested</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How to Use */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-primary">How to Use This Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-stone-600 space-y-1">
            <p>1. <strong>Copy</strong> a prompt using the copy button</p>
            <p>2. <strong>Paste</strong> it into ChatGPT, Perplexity, or Google AI Overview</p>
            <p>3. <strong>Check</strong> if DentaSmart is mentioned in the response</p>
            <p>4. <strong>Update</strong> the status: Cited (mentioned by name), Partial (topic covered but not named), Not Cited (not mentioned)</p>
            <p>5. <strong>Add notes</strong> about what the AI said and which competitors were mentioned instead</p>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input
              placeholder="Search prompts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="cited">Cited</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
              <SelectItem value="not_cited">Not Cited</SelectItem>
              <SelectItem value="untested">Untested</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <p className="text-sm text-stone-500">
          Showing {filtered.length} of {prompts.length} prompts
        </p>

        {/* Prompts Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-stone-50">
                <TableHead className="w-[40px]">#</TableHead>
                <TableHead className="w-[140px]">Category</TableHead>
                <TableHead className="min-w-[250px]">Prompt</TableHead>
                <TableHead className="w-[120px]">Target Page</TableHead>
                <TableHead className="w-[120px]">Status</TableHead>
                <TableHead className="w-[100px]">Last Checked</TableHead>
                <TableHead className="w-[60px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((prompt) => {
                const statusCfg = STATUS_CONFIG[prompt.status];
                const StatusIcon = statusCfg.icon;
                return (
                  <TableRow key={prompt.id} className="group">
                    <TableCell className="text-stone-400 text-xs">{prompt.id}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs font-normal whitespace-nowrap">
                        {prompt.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium text-stone-900 text-sm">{prompt.prompt}</p>
                        <p className="text-xs text-stone-400 line-clamp-1">{prompt.expectedAnswer}</p>
                        {prompt.notes && (
                          <p className="text-xs text-blue-600 italic">Note: {prompt.notes}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <a
                        href={`https://dentasmart.ai${prompt.targetPage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        View <ExternalLink className="w-3 h-3" />
                      </a>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={prompt.status}
                        onValueChange={(v) => updateStatus(prompt.id, v as PromptStatus)}
                      >
                        <SelectTrigger className={`h-7 text-xs border ${statusCfg.color}`}>
                          <div className="flex items-center gap-1">
                            <StatusIcon className="w-3 h-3" />
                            <SelectValue />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cited">
                            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Cited</span>
                          </SelectItem>
                          <SelectItem value="partial">
                            <span className="flex items-center gap-1"><MinusCircle className="w-3 h-3 text-amber-600" /> Partial</span>
                          </SelectItem>
                          <SelectItem value="not_cited">
                            <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3 text-red-600" /> Not Cited</span>
                          </SelectItem>
                          <SelectItem value="untested">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-stone-400" /> Untested</span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-xs text-stone-400">
                      {prompt.lastChecked || "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => copyPrompt(prompt.id, prompt.prompt)}
                        >
                          {copiedId === prompt.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Quick Test Links */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quick Test Links</CardTitle>
            <CardDescription className="text-xs">Open these AI platforms to test prompts</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="w-3.5 h-3.5" /> ChatGPT
              </Button>
            </a>
            <a href="https://www.perplexity.ai" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="w-3.5 h-3.5" /> Perplexity
              </Button>
            </a>
            <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="w-3.5 h-3.5" /> Google Gemini
              </Button>
            </a>
            <a href="https://copilot.microsoft.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="w-3.5 h-3.5" /> Copilot
              </Button>
            </a>
            <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="w-3.5 h-3.5" /> Claude
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
