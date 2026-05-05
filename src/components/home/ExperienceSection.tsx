import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'

const experiences = [
  {
    label: 'Restaurant',
    tagline: 'Cuisine gastronomique face à la lagune',
    href: '/restaurant',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    alt: 'Salle du restaurant Palm d\'Or',
  },
  {
    label: 'Café',
    tagline: 'Un espace de douceur et de saveurs',
    href: '/cafe',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    alt: 'Café Palm d\'Or',
  },
  {
    label: 'Hébergements',
    tagline: 'Suites & chambres avec vue sur la lagune',
    href: '/hebergements',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    alt: 'Hébergements Palm d\'Or',
  },
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="bg-palm-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-14 md:mb-18">
          <SectionLabel>L&apos;expérience</SectionLabel>
          <h2 className="font-display font-light italic text-4xl md:text-5xl text-palm-blue">
            Un lieu, trois univers
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {experiences.map((exp) => (
            <Link
              key={exp.href}
              href={exp.href}
              className="group block"
            >
              {/* Image container */}
              <div className="relative aspect-[4/3] md:aspect-[2/3] overflow-hidden rounded-sm mb-5">
                <Image
                  src={exp.image}
                  alt={exp.alt}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-palm-blue/0 group-hover:bg-palm-blue/15 transition-colors duration-500" />
              </div>

              {/* Text */}
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display font-light italic text-2xl text-palm-blue group-hover:text-palm-gold transition-colors duration-300">
                    {exp.label}
                  </h3>
                  <p className="text-xs tracking-[0.05em] text-palm-blue/50 leading-relaxed">
                    {exp.tagline}
                  </p>
                </div>
                {/* Arrow */}
                <span className="text-palm-gold/60 group-hover:text-palm-gold mt-1 transition-all duration-300 group-hover:translate-x-1 shrink-0 ml-4">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
