import { ExternalLink } from "lucide-react";
import type { ContentSourceRef } from "@shared/contentGovernance";
import type { PublicEvidenceSource } from "@shared/evidenceRegistry";
import { getDisplayableEvidenceSources, resolvePublicEvidenceSources } from "@shared/evidenceRegistry";

type DisplaySource = {
  id: string;
  title: string;
  publisher?: string;
  url: string;
  sourceDate?: string;
  accessedOn?: string;
  scope?: string;
};

function formatDate(value?: string): string | undefined {
  if (!value) return undefined;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(date);
}

function isPublicEvidenceUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function toDisplaySource(source: ContentSourceRef | PublicEvidenceSource): DisplaySource | undefined {
  if (source.publicDisplayAllowed !== true || !isPublicEvidenceUrl(source.url)) return undefined;
  const evidence = source as PublicEvidenceSource;
  return {
    id: source.id,
    title: source.title,
    publisher: source.publisher,
    url: source.url,
    sourceDate: source.publicationDate,
    accessedOn: source.accessedOn ?? evidence.verifiedAt,
    scope: source.notes ?? evidence.sourceScope,
  };
}

/** Displays only source records explicitly marked safe for public display. */
export default function ExternalSources({
  sources,
  governedSources,
  route,
  heading = "Sources",
}: {
  sources?: readonly PublicEvidenceSource[];
  governedSources?: readonly ContentSourceRef[];
  route?: string;
  heading?: string;
}) {
  const sourceRecords = getDisplayableEvidenceSources(resolvePublicEvidenceSources({ sources, governedSources, route }));
  const visibleSources = sourceRecords
    .map(toDisplaySource)
    .filter((source): source is DisplaySource => Boolean(source));

  if (visibleSources.length === 0) return null;

  return (
    <section className="mt-8 border-t border-stone-200 pt-5" aria-label={heading}>
      <h2 className="text-sm font-medium text-stone-800 mb-3">{heading}</h2>
      <ul className="space-y-3">
        {visibleSources.map((source) => {
          const sourceDate = formatDate(source.sourceDate);
          const accessedOn = formatDate(source.accessedOn);
          return (
            <li key={source.id} className="text-sm text-stone-600 leading-relaxed">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-action hover:underline"
              >
                {source.title}
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              {source.publisher && <span> · {source.publisher}</span>}
              {(sourceDate || accessedOn) && (
                <span className="text-stone-500"> · {sourceDate ? `Published ${sourceDate}` : `Checked ${accessedOn}`}</span>
              )}
              {source.scope && <p className="mt-0.5 text-xs text-stone-500">Applies to: {source.scope}</p>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
