"use client";

import { useEffect } from "react";

// Replace these conversion labels with the exact labels from Google Ads conversion actions
const GOOGLE_ADS_ID = "AW-11098887425";
const PHONE_CONVERSION_LABEL = "phone_conversion"; // e.g. "g_xzCMuK5_IYEIGqrqwp" or active label
const WHATSAPP_CONVERSION_LABEL = "whatsapp_conversion"; // e.g. "dqHrCLCxk44YEIGqrqwp" or active label

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

      // Track Phone Clicks
      if (href.startsWith("tel:")) {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "conversion", {
            send_to: `${GOOGLE_ADS_ID}/${PHONE_CONVERSION_LABEL}`,
          });
        }
      }

      // Track WhatsApp Clicks
      if (href.includes("wa.me") || href.includes("whatsapp.com")) {
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
