declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const GOOGLE_ADS_ID = "AW-11098887425";

// TODO: Ask client for the dedicated Form Lead Submission conversion action label
// in Google Ads -> Goals -> Conversions -> Summary if different from g_xzCMuK5_IYEIGqrqwp
const FORM_LEAD_CONVERSION_LABEL = "g_xzCMuK5_IYEIGqrqwp";

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

    // Trigger lead conversion event
    window.gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${FORM_LEAD_CONVERSION_LABEL}`,
    });
  }
};
