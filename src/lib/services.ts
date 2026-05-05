export type ServiceType = 'accommodation' | 'restaurant' | 'cafe' | 'car_rental'

export const SERVICE_LABELS: Record<ServiceType, string> = {
  accommodation: 'Hébergement',
  restaurant:    'Restaurant',
  cafe:          'Café',
  car_rental:    'Location de voiture',
}

const WA_MESSAGES: Record<ServiceType, string> = {
  accommodation: "Bonjour, je souhaite vérifier la disponibilité d'un hébergement à Palm d'Or Dakhla.",
  restaurant:    "Bonjour, je souhaite réserver une table au restaurant Palm d'Or Dakhla.",
  cafe:          "Bonjour, je souhaite venir au café Palm d'Or Dakhla.",
  car_rental:    "Bonjour, je souhaite louer une voiture via Palm d'Or Dakhla.",
}

export function getServiceWhatsAppUrl(service: ServiceType): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  if (!number) return '#'
  return `https://wa.me/${number}?text=${encodeURIComponent(WA_MESSAGES[service])}`
}
