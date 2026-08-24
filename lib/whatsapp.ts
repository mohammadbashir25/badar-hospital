// Single source of truth for the hospital's WhatsApp appointment link.
// Replace WHATSAPP_NUMBER with the hospital's number (country code, digits only, no +/spaces).
const WHATSAPP_NUMBER = "93765196369";
const WHATSAPP_MESSAGE =
  "Hello, I would like to book an appointment at Badar Medical Hospital.";

export const WHATSAPP_APPOINTMENT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;