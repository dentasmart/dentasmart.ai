import { ExternalLink } from "lucide-react";
import type { ContentSourceRef } from "@shared/contentGovernance";
import { isExternalEvidenceUrl } from "@shared/contentGovernance";

interface Source {
  name: string;
  url: string;
}

const defaultSources: Source[] = [
  { name: "American Dental Association", url: "https://www.ada.org/resources/research/science-and-research-institute/oral-health-topics" },
  { name: "National Institute of Dental and Craniofacial Research", url: "https://www.nidcr.nih.gov/health-info" },
  { name: "MouthHealthy.org (ADA)", url: "https://www.mouthhealthy.org/" },
];

const costSources: Source[] = [
  { name: "ADA Health Policy Institute", url: "https://www.ada.org/resources/research/health-policy-institute" },
  { name: "Fair Health Consumer", url: "https://www.fairhealthconsumer.org/" },
  { name: "CareCredit", url: "https://www.carecredit.com/dentistry/" },
];

const emergencySources: Source[] = [
  { name: "American Dental Association (Emergency)", url: "https://www.ada.org/resources/research/science-and-research-institute/oral-health-topics/dental-emergencies" },
  { name: "National Institute of Dental and Craniofacial Research", url: "https://www.nidcr.nih.gov/health-info" },
  { name: "MedlinePlus (Dental)", url: "https://medlineplus.gov/dentalhealth.html" },
];

const lifeStageSources: Source[] = [
  { name: "American Academy of Pediatric Dentistry", url: "https://www.aapd.org/resources/parent/" },
  { name: "National Institute of Dental and Craniofacial Research", url: "https://www.nidcr.nih.gov/health-info" },
  { name: "MouthHealthy.org (ADA)", url: "https://www.mouthhealthy.org/" },
];

export type SourceCategory = "default" | "cost" | "emergency" | "life-stage";

const sourceMap: Record<SourceCategory, Source[]> = {
  default: defaultSources,
  cost: costSources,
  emergency: emergencySources,
  "life-stage": lifeStageSources,
};

export default function ExternalSources({ category = "default", governedSources }: { category?: SourceCategory; governedSources?: readonly ContentSourceRef[] }) {
  const sources = governedSources
    ? governedSources
      .filter((source) => source.publicDisplayAllowed !== false && isExternalEvidenceUrl(source.url))
      .map((source) => ({ name: source.publisher ? `${source.title} (${source.publisher})` : source.title, url: source.url }))
    : sourceMap[category];

  if (sources.length === 0) return null;

  return (
    <div className="mt-6 pt-4 border-t border-stone-200">
      <p className="text-xs text-stone-500 mb-2 font-medium">Sources & References</p>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {sources.map((source, idx) => (
          <a
            key={idx}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-primary transition-colors"
          >
            {source.name}
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        ))}
      </div>
    </div>
  );
}
