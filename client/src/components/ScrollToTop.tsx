import { useEffect } from "react";
import { useLocation } from "wouter";
import { isTreatmentPlanReviewHash } from "@/lib/treatmentPlanReviewHash";

export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (isTreatmentPlanReviewHash(window.location.hash)) return;
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
