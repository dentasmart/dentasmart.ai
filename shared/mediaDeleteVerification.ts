/**
 * Deletion is fail-closed until a fresh, successful server usage check
 * has completed. In-use items require an explicit extra acknowledgement.
 * The server still rechecks usage inside the deletion transaction.
 */
export function canConfirmVerifiedMediaDelete(
  verifiedUsageCount: number | null,
  acknowledgedInUse: boolean,
  busy: boolean,
): boolean {
  return verifiedUsageCount !== null && verifiedUsageCount >= 0 && !busy &&
    (verifiedUsageCount === 0 || acknowledgedInUse);
}
