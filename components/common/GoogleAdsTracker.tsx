"use client";

import { useEffect } from "react";

// Exact Conversion Action Labels from client Google Ads setup
const GOOGLE_ADS_ID = "AW-11098887425";
const PHONE_CONVERSION_LABELS = ["dqHrCLCxk44YEIGqrqwp", "g_xzCMuK5_IYEIGqrqwp"];
const WHATSAPP_CONVERSION_LABEL = "_C5xCM6K5_IYEIGqrqwp";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export default function GoogleAdsTracker() {
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Track Phone Clicks (triggers conversion actions for phone lead)
      if (href.startsWith("tel:")) {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          PHONE_CONVERSION_LABELS.forEach((label) => {
            window.gtag!("event", "conversion", {
              send_to: `${GOOGLE_ADS_ID}/${label}`,
            });
          });
        }
      }

      // Track WhatsApp Clicks (triggers conversion action for WhatsApp lead)
      if (href.includes("wa.me") || href.includes("whatsapp.com") || href.includes("api.whatsapp.com")) {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "conversion", {
            send_to: `${GOOGLE_ADS_ID}/${WHATSAPP_CONVERSION_LABEL}`,
          });
        }
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, []);

  return null;
}
