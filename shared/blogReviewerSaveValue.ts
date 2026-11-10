/**
 * Persisting an explicitly cleared reviewer field is different from omitting
 * it from a partial database update. Drizzle ignores undefined, while the
 * nullable reviewer columns accept null to remove old values.
 *
 * This conversion is presentation-only; reviewer verification and public
 * schema eligibility remain guarded on the server.
 */
export function reviewerValueForSave(value: string): string | null {
  return value.trim() || null;
}
