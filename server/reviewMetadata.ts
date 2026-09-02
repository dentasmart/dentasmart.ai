import { conditionsData } from "../client/src/data/conditions";
import { symptomsData } from "../client/src/data/symptoms";
import { publicReviewerProfiles } from "../shared/contentGovernance";

export interface VerifiedReviewMetadata {
  lastReviewed: string;
  reviewedBy: string;
  reviewedByCredentials: string;
}

function toVerifiedMetadata(record: {
  lastReviewed: string;
  reviewedBy: string;
  reviewedByCredentials: string;
}): VerifiedReviewMetadata | undefined {
  const publicProfile = publicReviewerProfiles.find((profile) =>
    profile.verificationStatus === "verified" &&
    profile.publicDisplayAllowed &&
    profile.displayName === record.reviewedBy &&
    profile.credentials === record.reviewedByCredentials,
  );

  if (!publicProfile || !publicProfile.displayName || !publicProfile.credentials) return undefined;

  return {
    lastReviewed: record.lastReviewed,
    reviewedBy: publicProfile.displayName,
    reviewedByCredentials: publicProfile.credentials,
  };
}

/**
 * Returns review metadata only after a legacy source record matches a verified,
 * publicly displayable reviewer profile. Until then, all review proof is omitted.
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
