import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/config'
import { APARTMENTS } from '@/lib/apartments'

const lastModified = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  const apartmentPages: MetadataRoute.Sitemap = APARTMENTS.map(apt => ({
    url: `${SITE_URL}/hebergements/${apt.id}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/hebergements`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...apartmentPages,
    {
      url: `${SITE_URL}/restaurant`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/cafe`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/location-voiture`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/galerie`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
}
