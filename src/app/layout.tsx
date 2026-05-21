import type { Metadata } from 'next'
import Script from 'next/script'
import { Geist, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { GAPageTracker } from '@/components/analytics/GAPageTracker'
import {
  BUSINESS_ADDRESS_LINE_1,
  BUSINESS_ADDRESS_LINE_2,
  BUSINESS_EMAIL,
  BUSINESS_FULL_NAME,
  BUSINESS_LATITUDE,
  BUSINESS_LONGITUDE,
  GOOGLE_MAPS_URL,
  GOOGLE_BUSINESS_URL,
  INSTAGRAM_URL,
  SITE_URL,
  WHATSAPP_PHONE_DISPLAY,
} from '@/lib/config'
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from '@/lib/google-reviews'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Palm d'Or Dakhla — Hébergements, Restaurant & Café à Dakhla",
  description:
    "Palm d'Or Dakhla — 6 appartements meublés dès 500 DH/nuit, restaurant et café, au cœur de Dakhla (AV Al Walaa). Réservation en ligne.",
  keywords: [
    "Palm d'Or Dakhla",
    'Dakhla',
    'AV Al Walaa',
    'hébergement Dakhla',
    'appartement Dakhla',
    'appartement meublé Dakhla',
    'location appartement Dakhla',
    'résidence Dakhla',
    'restaurant Dakhla',
    'café Dakhla',
  ],
  alternates: {
    canonical: '/',
  },
  verification: {
    google: '4r6l05c_AQIeAeAm7K1OGJZ5gD8VZNGNa8wYNwoQHss',
  },
  openGraph: {
    title: "Palm d'Or Dakhla — Hébergements, Restaurant & Café à Dakhla",
    description:
      "Palm d'Or Dakhla — 6 appartements meublés dès 500 DH/nuit, restaurant et café, au cœur de Dakhla (AV Al Walaa). Réservation en ligne.",
    url: '/',
    siteName: BUSINESS_FULL_NAME,
    locale: 'fr_MA',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Palm d'Or Dakhla — Résidence, Restaurant & Café à Dakhla",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Palm d'Or Dakhla — Hébergements, Restaurant & Café à Dakhla",
    description:
      "Palm d'Or Dakhla — 6 appartements meublés dès 500 DH/nuit, restaurant et café, au cœur de Dakhla (AV Al Walaa). Réservation en ligne.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const GA_ID    = process.env.NEXT_PUBLIC_GA_ID
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LodgingBusiness', 'FoodEstablishment'],
  name: BUSINESS_FULL_NAME,
  description:
    "Résidence proposant 6 appartements meublés dès 500 DH/nuit, un restaurant et un café à Dakhla (AV Al Walaa). Réservation par formulaire en ligne.",
  url: SITE_URL,
  telephone: WHATSAPP_PHONE_DISPLAY,
  email: BUSINESS_EMAIL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS_ADDRESS_LINE_1,
    addressLocality: 'Dakhla',
    postalCode: '73000',
    addressCountry: 'MA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS_LATITUDE,
    longitude: BUSINESS_LONGITUDE,
  },
  hasMap: GOOGLE_BUSINESS_URL || GOOGLE_MAPS_URL,
  areaServed: 'Dakhla',
  knowsLanguage: ['fr', 'ar'],
  keywords: 'Dakhla, AV Al Walaa, résidence, restaurant, café',
  sameAs: [INSTAGRAM_URL, ...(GOOGLE_BUSINESS_URL ? [GOOGLE_BUSINESS_URL] : [])],
  priceRange: 'DH 500–750',
  image: `${SITE_URL}/og-image.jpg`,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: GOOGLE_RATING,
    bestRating: 5,
    worstRating: 1,
    reviewCount: parseInt(GOOGLE_REVIEW_COUNT, 10),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-palm-cream text-foreground">

        {/* Meta Pixel — noscript fallback */}
        {PIXEL_ID && (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}

        <GAPageTracker />
        <Navbar />
        <main className="flex-1 pt-20 md:pt-24">{children}</main>
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        {/* ─── Meta Pixel ─────────────────────────────────────────────── */}
        {PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');
fbq('track','PageView');`}
          </Script>
        )}

        {/* ─── Google Analytics 4 ─────────────────────────────────────── */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}

      </body>
    </html>
  )
}
