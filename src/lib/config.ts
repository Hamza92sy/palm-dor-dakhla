export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''

// +212 722 653 259 — format display (12 digits: 3 country + 3 + 3 + 3)
export const WHATSAPP_PHONE_DISPLAY = WHATSAPP_NUMBER.length === 12
  ? `+${WHATSAPP_NUMBER.slice(0, 3)} ${WHATSAPP_NUMBER.slice(3, 6)} ${WHATSAPP_NUMBER.slice(6, 9)} ${WHATSAPP_NUMBER.slice(9)}`
  : WHATSAPP_NUMBER ? `+${WHATSAPP_NUMBER}` : ''

export const WHATSAPP_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite faire une réservation à Palm d'Or Dakhla.")}`
  : '#'
