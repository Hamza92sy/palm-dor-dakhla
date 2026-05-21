'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Photo {
  src: string
  alt: string
}

interface Props {
  cover: Photo
  gallery: Photo[]
}

export default function ApartmentGallery({ cover, gallery }: Props) {
  const allPhotos: Photo[] = [cover, ...gallery]
  const [activeIndex, setActiveIndex] = useState(0)
  const active = allPhotos[activeIndex]

  const thumbCols =
    allPhotos.length <= 4 ? 'grid-cols-4' :
    allPhotos.length === 5 ? 'grid-cols-5' :
    'grid-cols-6'

  return (
    <div className="mb-10">
      {/* Main image — src updated in place, no remount */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-sm mb-2">
        <Image
          src={active.src}
          alt={active.alt}
          fill
          priority={activeIndex === 0}
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 800px"
        />
        <span className="absolute bottom-3 right-3 bg-black/50 text-white text-[10px] tracking-widest px-2.5 py-1 rounded-full">
          {activeIndex + 1} / {allPhotos.length}
        </span>
      </div>

      {/* Thumbnails — grid adapts to actual photo count */}
      <div className={`grid ${thumbCols} gap-1.5 md:gap-2`}>
        {allPhotos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setActiveIndex(i)}
            className={[
              'relative aspect-square overflow-hidden rounded-sm transition-all duration-200',
              i === activeIndex
                ? 'ring-2 ring-palm-gold ring-offset-1'
                : 'opacity-60 hover:opacity-90',
            ].join(' ')}
            aria-label={photo.alt}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="80px"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
