/**
 * Phone number validation and WhatsApp redirection helper module
 * for Zio Car Rentals lead forms.
 */

export interface PhoneValidationResult {
  isValid: boolean;
  cleanPhone: string;
  error?: string;
}

/**
 * Validates that a phone number string represents a valid 10-digit Indian mobile number.
 * Automatically handles prefixes (+91, 91, spaces, dashes, parentheses).
 */
export const validateIndianPhone = (phone: string): PhoneValidationResult => {
  if (!phone || !phone.trim()) {
    return {
      isValid: false,
      cleanPhone: "",
      error: "Phone number is required",
    };
  }

  // Strip all non-digit characters
  let digits = phone.replace(/\D/g, "");

  // Handle +91 or 91 country code prefix if user entered 12 digits
  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  }

  // Handle leading 0 if user entered 11 digits (e.g. 09820123456)
  if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  // Must be exactly 10 digits
  if (digits.length !== 10) {
    return {
      isValid: false,
      cleanPhone: digits,
      error: `Phone number must be exactly 10 digits (entered ${digits.length} digits)`,
    };
  }

  // Must start with 6, 7, 8, or 9 for valid Indian mobile numbers
  if (!/^[6-9]/.test(digits)) {
    return {
      isValid: false,
      cleanPhone: digits,
      error: "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9",
    };
  }

  return {
    isValid: true,
    cleanPhone: digits,
  };
};

/**
 * Generates a pre-filled conversational WhatsApp redirect URL for booking inquiries.
 * Formatted as a natural message written by the customer.
 */
export const createBookingWhatsAppUrl = (details: {
  name: string;
  phone: string;
  pickupLocation: string;
  pickupDate: string;
  pickupTime?: string;
  dropLocation: string;
  dropDate: string;
  dropTime?: string;
  durationDays?: number;
  carType?: string;
}): string => {
  const targetPhone = "917977288350"; // Zio Car Rentals WhatsApp Business Number

  const name = details.name ? details.name.trim() : "Customer";
  const duration = details.durationDays && details.durationDays > 0 ? `${details.durationDays} days` : "a few days";
  const carPref = details.carType ? ` for a ${details.carType}` : "";
  
  const pickupTimeStr = details.pickupTime ? ` at ${details.pickupTime}` : "";
  const dropTimeStr = details.dropTime ? ` at ${details.dropTime}` : "";

  const text = `Hi Zio Car Rentals, my name is ${name}. I’m looking for a car rental${carPref} for ${duration}.

I’ll be picking up the car from ${details.pickupLocation.trim()} on ${details.pickupDate}${pickupTimeStr} and dropping it at ${details.dropLocation.trim()} on ${details.dropDate}${dropTimeStr}.

Could you please share the available cars and their rental prices for these dates? Thank you!`;

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
};

/**
 * Generates a pre-filled conversational WhatsApp redirect URL for contact form inquiries.
 */
export const createContactWhatsAppUrl = (details: {
  name: string;
  phone: string;
  email?: string;
  message?: string;
}): string => {
  const targetPhone = "917977288350";
  const name = details.name ? details.name.trim() : "Customer";
  const userMsg = details.message && details.message.trim() ? `\n\n${details.message.trim()}` : "";

  const text = `Hi Zio Car Rentals, my name is ${name}.${userMsg}

My contact number is +91 ${details.phone.trim()}. Could you please share the details for the same? Thank you!`;

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
};
