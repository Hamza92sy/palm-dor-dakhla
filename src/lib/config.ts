export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
export const SITE_URL = 'https://palmdordakhla.com'
export const BUSINESS_NAME = "Restaurant Palm d'Or"
export const BUSINESS_FULL_NAME = "Palm d'Or Dakhla"
export const BUSINESS_ADDRESS_LINE_1 = 'AV Al Walaa'
export const BUSINESS_ADDRESS_LINE_2 = 'Dakhla 73000'
export const BUSINESS_COUNTRY = 'Maroc'
export const BUSINESS_ADDRESS_FULL = `${BUSINESS_NAME}, ${BUSINESS_ADDRESS_LINE_1}, ${BUSINESS_ADDRESS_LINE_2}, ${BUSINESS_COUNTRY}`
export const BUSINESS_LATITUDE = 23.7022636
export const BUSINESS_LONGITUDE = -15.9284674
export const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${BUSINESS_LATITUDE},${BUSINESS_LONGITUDE}`
export const GOOGLE_MAPS_EMBED_URL = `https://www.google.com/maps?q=${BUSINESS_LATITUDE},${BUSINESS_LONGITUDE}&z=16&output=embed`

// Format display : 212661931317 → +212 661 931 317 (12 digits: country 3 + 3 + 3 + 3)
export const WHATSAPP_PHONE_DISPLAY = WHATSAPP_NUMBER.length === 12
  ? `+${WHATSAPP_NUMBER.slice(0, 3)} ${WHATSAPP_NUMBER.slice(3, 6)} ${WHATSAPP_NUMBER.slice(6, 9)} ${WHATSAPP_NUMBER.slice(9)}`
  : WHATSAPP_NUMBER ? `+${WHATSAPP_NUMBER}` : ''

export const WHATSAPP_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour, je souhaite faire une réservation à Palm d'Or Dakhla.")}`
  : '#'

export const INSTAGRAM_URL    = 'https://www.instagram.com/palm_dor_dakhla'
export const INSTAGRAM_HANDLE = '@palm_dor_dakhla'

export const BUSINESS_EMAIL = 'reservation@palmdordakhla.com'

