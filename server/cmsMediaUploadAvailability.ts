/**
 * Fail-closed CMS image upload availability.
 * Production requires a separately verified private storage integration.
 */
export function cmsMediaUploadAvailability(
  localTest: boolean,
  isolatedQa: boolean,
  privateStorageReady = false
) {
  if (localTest || isolatedQa) {
    return {
      enabled: true,
      mode: "isolated-test" as const,
    };
  }

  if (privateStorageReady) {
    return { enabled: true, mode: "private-storage" as const };
  }

  return {
    enabled: false,
    mode: "storage-not-verified" as const,
  };
}
