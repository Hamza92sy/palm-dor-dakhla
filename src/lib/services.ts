export type ServiceType = 'accommodation' | 'restaurant' | 'cafe' | 'car_rental'

export const SERVICE_LABELS: Record<ServiceType, string> = {
  accommodation: 'Hébergement',
  restaurant:    'Restaurant',
  cafe:          'Café',
  car_rental:    'Location de voiture',
}

const WA_MESSAGES: Record<ServiceType, string> = {
  accommodation: "Bonjour, je souhaite connaître la disponibilité de vos appartements à Dakhla (de 500 à 750 DH/nuit). Quelles dates sont disponibles ?",
  restaurant:    "Bonjour, j'ai une question sur le restaurant Palm d'Or Dakhla.",
  cafe:          "Bonjour, je souhaite venir au café Palm d'Or Dakhla.",
  car_rental:    "Bonjour, je souhaite louer une voiture via Palm d'Or Dakhla.",
}

export function getServiceWhatsAppUrl(service: ServiceType): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  if (!number) return '#'
  return `https://wa.me/${number}?text=${encodeURIComponent(WA_MESSAGES[service])}`
}
