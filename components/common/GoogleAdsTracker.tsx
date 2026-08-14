"use client";

import { useEffect } from "react";

// Exact Conversion Action Labels from client Google Ads setup
const GOOGLE_ADS_ID = "AW-11098887425";

// TODO: Verify in Google Ads -> Goals -> Conversions -> Summary:
// - 'g_xzCMuK5_IYEIGqrqwp' is used for website phone click leads
// - 'dqHrCLCxk44YEIGqrqwp' is used in app/layout.tsx for Google Call Forwarding Number replacement
const PHONE_CLICK_CONVERSION_LABEL = "g_xzCMuK5_IYEIGqrqwp";
const WHATSAPP_CLICK_CONVERSION_LABEL = "_C5xCM6K5_IYEIGqrqwp";

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

      // Track Phone Clicks (triggers exactly ONE conversion event per click)
      if (href.startsWith("tel:")) {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "conversion", {
            send_to: `${GOOGLE_ADS_ID}/${PHONE_CLICK_CONVERSION_LABEL}`,
          });
        }
      }

      // Track WhatsApp Clicks (triggers exactly ONE conversion event per click)
      if (href.includes("wa.me") || href.includes("whatsapp.com") || href.includes("api.whatsapp.com")) {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "conversion", {
            send_to: `${GOOGLE_ADS_ID}/${WHATSAPP_CLICK_CONVERSION_LABEL}`,
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
