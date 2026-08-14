"use client";

import { useEffect } from "react";

// Verified Google Ads Conversion ID & Labels from Client Account
const GOOGLE_ADS_ID = "AW-11098887425";

// Verified Action 2: Call Now Button Click
const CALL_NOW_BUTTON_CONVERSION_LABEL = "g_xzCMuK5_IYEIGqrqwp";

// Verified Action 3: WhatsApp Button Click
const WHATSAPP_BUTTON_CONVERSION_LABEL = "_C5xCM6K5_IYEIGqrqwp";

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

      // Track Call Now Button Clicks (AW-11098887425/g_xzCMuK5_IYEIGqrqwp)
      if (href.startsWith("tel:")) {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "conversion", {
            send_to: `${GOOGLE_ADS_ID}/${CALL_NOW_BUTTON_CONVERSION_LABEL}`,
          });
        }
      }

      // Track WhatsApp Button Clicks (AW-11098887425/_C5xCM6K5_IYEIGqrqwp)
      if (href.includes("wa.me") || href.includes("whatsapp.com") || href.includes("api.whatsapp.com")) {
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("event", "conversion", {
            send_to: `${GOOGLE_ADS_ID}/${WHATSAPP_BUTTON_CONVERSION_LABEL}`,
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
