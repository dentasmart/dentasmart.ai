import { useEffect } from "react";
import { trackAppDownload, getPlayStoreUrl } from "@/lib/analytics";

interface AndroidEarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * AndroidEarlyAccessModal — Android is now live.
 * When triggered, immediately redirect to the Play Store.
 */
export function AndroidEarlyAccessModal({ isOpen, onClose }: AndroidEarlyAccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      trackAppDownload("android", "modal_redirect");
      window.open(getPlayStoreUrl("modal_redirect"), "_blank", "noopener,noreferrer");
      onClose();
    }
  }, [isOpen, onClose]);

  return null;
}
