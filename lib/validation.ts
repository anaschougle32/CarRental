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
 * Generates a pre-filled WhatsApp redirect URL for booking inquiries.
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
  const timeInfoPickup = details.pickupTime ? ` (${details.pickupTime})` : "";
  const timeInfoDrop = details.dropTime ? ` (${details.dropTime})` : "";
  const durationInfo = details.durationDays ? `\n⏳ *Rental Duration:* ${details.durationDays} Day(s)` : "";
  const carTypeInfo = details.carType ? `\n🚘 *Car Preference:* ${details.carType}` : "";

  const text = 
`🚗 *New Booking Request - Zio Car Rentals*

👤 *Name:* ${details.name.trim()}
📞 *Phone:* +91 ${details.phone.trim()}
📍 *Pickup:* ${details.pickupLocation.trim()} on ${details.pickupDate}${timeInfoPickup}
🏁 *Drop:* ${details.dropLocation.trim()} on ${details.dropDate}${timeInfoDrop}${durationInfo}${carTypeInfo}

Hello Zio Car Rentals team, I have submitted my booking request on your website. Please share available car models and pricing for these dates.`;

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
};

/**
 * Generates a pre-filled WhatsApp redirect URL for contact form inquiries.
 */
export const createContactWhatsAppUrl = (details: {
  name: string;
  phone: string;
  email?: string;
  message?: string;
}): string => {
  const targetPhone = "917977288350";
  const emailInfo = details.email ? `\n✉️ *Email:* ${details.email.trim()}` : "";
  const messageInfo = details.message ? `\n💬 *Message:* ${details.message.trim()}` : "";

  const text = 
`📩 *New Website Inquiry - Zio Car Rentals*

👤 *Name:* ${details.name.trim()}
📞 *Phone:* +91 ${details.phone.trim()}${emailInfo}${messageInfo}

Hello Zio Car Rentals team, I submitted an inquiry on your website. Please get back to me.`;

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
};
