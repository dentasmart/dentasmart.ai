/**
 * QuickAnswerBlock - AEO-optimized answer block for AI engine extraction.
 * 
 * Displays a 40-70 word definition-style answer near the top of a page.
 * Designed to be directly quotable by ChatGPT, Perplexity, Gemini, 
 * Google AI Overviews, Copilot, and Claude.
 * 
 * Usage:
 *   <QuickAnswerBlock
 *     question="What is DentaSmart?"
 *     answer="DentaSmart is an AI-powered oral health app..."
 *   />
 */

interface QuickAnswerBlockProps {
  question: string;
  answer: string;
  /** Optional: show a source citation link */
  sourceUrl?: string;
  sourceLabel?: string;
}

export default function QuickAnswerBlock({ question, answer, sourceUrl, sourceLabel }: QuickAnswerBlockProps) {
  return (
    <div 
      className="bg-[#f0fafb] border-l-4 border-primary rounded-r-lg px-5 py-4 my-6 max-w-3xl"
      role="region"
      aria-label="Quick Answer"
    >
      <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">Quick Answer</p>
      <h2 className="text-lg font-semibold text-[#232020] mb-2">{question}</h2>
      <p className="text-[#232020] text-base leading-relaxed">{answer}</p>
      {sourceUrl && (
        <p className="text-xs text-gray-500 mt-2">
          Source: <a href={sourceUrl} className="text-primary hover:underline">{sourceLabel || sourceUrl}</a>
        </p>
      )}
    </div>
  );
}
