import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import { GALLERY_IMAGES } from '@/lib/gallery'

export default function GallerySection() {
  const images = GALLERY_IMAGES.slice(0, 5).map((image, index) => ({
    src: image.src,
    alt: image.alt,
    span: index === 0 ? 'md:col-span-2 md:row-span-2' : '',
  }))

  return (
    <section className="bg-palm-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <SectionLabel>Galerie</SectionLabel>
          <h2 className="font-display font-light italic text-4xl md:text-5xl text-palm-blue">
            L&apos;atmosphère Palm d&apos;Or
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-auto md:grid-rows-2 gap-2 md:gap-3 mb-10">
          {images.map((img, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-sm ${img.span} ${i === 0 ? 'aspect-[4/3] md:aspect-auto' : 'aspect-square'}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-palm-blue/0 group-hover:bg-palm-blue/20 transition-colors duration-500" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link
            href="/galerie"
            className="text-[11px] tracking-[0.25em] uppercase text-palm-blue/60 hover:text-palm-gold transition-colors duration-200
              flex items-center gap-2.5 group"
          >
            Voir toute la galerie
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
