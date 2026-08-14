declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Sends first-party user data for Google Ads Enhanced Conversions
 * ONLY upon successful lead / booking form submission.
 */
export const trackLeadConversion = (userData: { phone?: string; email?: string }) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    const payload: Record<string, string> = {};
    
    if (userData.phone && userData.phone.trim()) {
      payload.phone_number = userData.phone.trim();
    }
    if (userData.email && userData.email.trim()) {
      payload.email = userData.email.trim();
    }

    // Pass user_data for Google Ads Enhanced Conversions
    if (Object.keys(payload).length > 0) {
      window.gtag("set", "user_data", payload);
    }

    // Trigger lead conversion event
    window.gtag("event", "conversion", {
      send_to: "AW-11098887425/g_xzCMuK5_IYEIGqrqwp",
    });
  }
};
