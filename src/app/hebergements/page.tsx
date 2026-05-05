import type { Metadata } from 'next'
import ServicePage from '@/components/service/ServicePage'

export const metadata: Metadata = {
  title: "Hébergement à Dakhla | Palm d'Or",
  description: "Appartements propres, bien équipés et adaptés à tous les séjours à Dakhla. Chambres spacieuses, idéales pour couples, familles ou groupes. Réservez via WhatsApp.",
}

export default function HebergementsPage() {
  return (
    <ServicePage
      title="Hébergement confortable à Dakhla"
      subtitle="Appartements propres, bien équipés et adaptés à tous les séjours"
      points={[
        'Chambres spacieuses et propres',
        'Idéal pour couples, familles ou groupes',
        'Emplacement pratique à Dakhla',
        'Réservation simple via WhatsApp',
      ]}
      images={[
        {
          src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1920&q=80',
          alt: 'Chambre confortable Palm d\'Or Dakhla',
        },
        {
          src: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80',
          alt: 'Chambre avec plusieurs lits Palm d\'Or Dakhla',
        },
      ]}
      service="accommodation"
      ctaLabel="Vérifier disponibilité"
    />
  )
}
