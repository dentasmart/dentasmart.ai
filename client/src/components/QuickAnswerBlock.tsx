import { isExternalEvidenceUrl, type DirectAnswerData } from "@shared/contentGovernance";

interface QuickAnswerBlockProps {
  question: string;
  answer: string;
  /** Optional legacy citation. Internal DentaSmart URLs are not displayed as medical evidence. */
  sourceUrl?: string;
  sourceLabel?: string;
  governance?: Pick<DirectAnswerData, "definition" | "intendedAudience">;
}

export default function QuickAnswerBlock({ question, answer, sourceUrl, sourceLabel, governance }: QuickAnswerBlockProps) {
  const showExternalSource = Boolean(sourceUrl && isExternalEvidenceUrl(sourceUrl));

  return (
    <div 
      className="bg-[#f0fafb] border-l-4 border-primary rounded-r-lg px-5 py-4 my-6 max-w-3xl"
      role="region"
      aria-label="Quick Answer"
    >
      <p className="text-sm font-semibold text-action uppercase tracking-wide mb-1">Quick Answer</p>
      <h2 className="text-lg font-semibold text-[#232020] mb-2">{question}</h2>
      <p className="text-[#232020] text-base leading-relaxed">{answer}</p>
      {governance?.definition && (
        <p className="text-sm text-stone-700 mt-3 leading-relaxed"><span className="font-medium">Definition:</span> {governance.definition}</p>
      )}
      {governance?.intendedAudience && (
        <p className="text-xs text-stone-500 mt-2">For: {governance.intendedAudience}</p>
      )}
      {showExternalSource && sourceUrl && (
        <p className="text-xs text-gray-500 mt-2">
          Source: <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-action hover:underline">{sourceLabel || sourceUrl}</a>
        </p>
      )}
    </div>
  );
}
