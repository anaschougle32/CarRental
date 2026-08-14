declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}



/**
 * Formats a phone number to strict E.164 format (+[country code][number] without spaces/dashes)
 * per Google Ads Enhanced Conversions requirements.
 */
export const formatPhoneE164 = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  return phone.startsWith("+") ? phone.replace(/\s+/g, "") : `+${digits}`;
};

/**
 * Sends first-party user data for Google Ads Enhanced Conversions
 * ONLY upon successful lead / booking form submission.
 * Note: Does not trigger a conversion event because there is no confirmed
 * Website Form Lead conversion label in the client's Google Ads account.
 */
export const trackLeadConversion = (userData: { phone?: string; email?: string }) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    const payload: Record<string, string> = {};
    
    if (userData.phone && userData.phone.trim()) {
      payload.phone_number = formatPhoneE164(userData.phone);
    }
    if (userData.email && userData.email.trim()) {
      payload.email = userData.email.trim().toLowerCase();
    }

    // Pass normalized user_data for Google Ads Enhanced Conversions
    if (Object.keys(payload).length > 0) {
      window.gtag("set", "user_data", payload);
    }
  }
};
