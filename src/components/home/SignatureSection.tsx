import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'

export default function SignatureSection() {
  return (
    <section className="bg-palm-cream-dark py-20 md:py-0 overflow-hidden">
      <div className="max-w-7xl mx-auto md:grid md:grid-cols-[3fr_2fr] md:min-h-[720px]">

        {/* Image — left */}
        <div className="relative h-[400px] md:h-auto">
          <Image
            src="/assets/photos-client/reception-lobby.jpg"
            alt="Réception et lobby de la résidence Palm d'Or Dakhla"
            fill
            className="object-cover object-[65%_50%]"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
          {/* Fade to blend with text column — via-transparent keeps PALM D'OR sign visible */}
          <div className="absolute inset-0 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-palm-cream-dark" />
        </div>

        {/* Text — right */}
        <div className="flex flex-col justify-center px-5 sm:px-8 md:px-12 lg:px-16 py-14 md:py-20">
          <div className="flex flex-col gap-5 max-w-sm">
            <SectionLabel>Notre philosophie</SectionLabel>

            <h2 className="font-display font-light italic text-4xl md:text-5xl text-palm-blue leading-tight">
              L&apos;art de recevoir, <br />au cœur de Dakhla
            </h2>

            {/* Gold rule */}
            <div className="w-8 h-px bg-palm-gold" />

            <p className="text-sm text-palm-blue/55 leading-[1.9]">
              Chaque détail est pensé pour vous offrir une expérience unique.
              Cuisine du terroir, hospitalité sincère, cadre exceptionnel.
            </p>

            <p className="text-[10px] tracking-[0.3em] uppercase text-palm-gold mt-2">
              Dakhla · Maroc
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
