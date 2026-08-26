import { conditionsData } from "../client/src/data/conditions";
import { symptomsData } from "../client/src/data/symptoms";

export interface VerifiedReviewMetadata {
  lastReviewed: string;
  reviewedBy: string;
  reviewedByCredentials: string;
}

function toVerifiedMetadata(record: {
  lastReviewed: string;
  reviewedBy: string;
  reviewedByCredentials: string;
}): VerifiedReviewMetadata {
  return {
    lastReviewed: record.lastReviewed,
    reviewedBy: record.reviewedBy,
    reviewedByCredentials: record.reviewedByCredentials,
  };
}

/**
 * Returns review metadata only where existing condition or symptom source
 * records explicitly provide it. All other route families intentionally omit it.
 */
export function getVerifiedReviewMetadata(urlPath: string): VerifiedReviewMetadata | undefined {
  const cleanPath = urlPath.split("?")[0].split("#")[0].replace(/\/+$/, "");
  const conditionMatch = cleanPath.match(/^\/conditions\/([^/]+)$/);
  if (conditionMatch) {
    const condition = conditionsData[conditionMatch[1]];
    return condition ? toVerifiedMetadata(condition) : undefined;
  }

  const symptomMatch = cleanPath.match(/^\/symptoms\/([^/]+)$/);
  if (symptomMatch) {
    const symptom = symptomsData[symptomMatch[1]];
    return symptom ? toVerifiedMetadata(symptom) : undefined;
  }

  return undefined;
}
