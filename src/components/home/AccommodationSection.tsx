import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const rooms = [
  {
    type: 'Appartement Standard',
    detail: '1 chambre · à partir de 500 DH / nuit',
    image: '/assets/photos-client/chambre-double.jpg',
    alt: 'Chambre avec grand lit — Appartement Standard Palm d\'Or Dakhla',
  },
  {
    type: 'Appartement 2 chambres',
    detail: '2 chambres · à partir de 650 DH / nuit',
    image: '/assets/photos-client/de (199).jpg',
    alt: 'Chambre avec 2 lits d\'un appartement Palm d\'Or Dakhla',
  },
  {
    type: 'Grande capacité',
    detail: '2 chambres · à partir de 750 DH / nuit',
    image: '/assets/photos-client/de (218).jpg',
    alt: 'Chambre grande capacité d\'un appartement Palm d\'Or Dakhla',
  },
]

const amenities = [
  { icon: '✦', label: '6 appartements disponibles' },
  { icon: '✦', label: 'Cuisine équipée' },
  { icon: '✦', label: 'Dès 500 DH / nuit' },
  { icon: '✦', label: 'Réservation WhatsApp' },
]

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

export default function AccommodationSection() {
  return (
    <section className="bg-palm-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-14">
          <SectionLabel>Hébergements</SectionLabel>
          <h2 className="font-display font-light italic text-4xl md:text-5xl text-palm-blue">
            Vos appartements au cœur de Dakhla
          </h2>
        </div>

        {/* Room cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-14">
          {rooms.map((room) => (
            <Link
              key={room.type}
              href="/hebergements"
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                <Image
                  src={room.image}
                  alt={room.alt}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Bottom label overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-palm-blue/70 to-transparent">
                  <p className="font-display font-light italic text-white text-xl leading-tight">
                    {room.type}
                  </p>
                  <p className="text-[10px] tracking-[0.15em] text-white/65 mt-0.5">
                    {room.detail}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-12">
          {amenities.map((a) => (
            <div key={a.label} className="flex items-center gap-2">
              <span className="text-palm-gold text-[8px]">{a.icon}</span>
              <span className="text-[11px] tracking-[0.12em] uppercase text-palm-blue/55">
                {a.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <WhatsAppButton className="group flex items-center gap-2.5 border border-[#25D366] text-[#1a9e51] hover:bg-[#25D366] hover:text-white
              text-[11px] tracking-[0.14em] uppercase font-medium
              px-7 py-3.5 rounded-full transition-all duration-300">
            <WhatsAppIcon className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
            Demander une disponibilité
          </WhatsAppButton>
        </div>
      </div>
    </section>
  )
}
