import Hero from '@/components/home/Hero'
import ExperienceSection from '@/components/home/ExperienceSection'
import SignatureSection from '@/components/home/SignatureSection'
import AccommodationSection from '@/components/home/AccommodationSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import GallerySection from '@/components/home/GallerySection'
import LeadForm from '@/components/home/LeadForm'
import FinalCTA from '@/components/home/FinalCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ExperienceSection />
      <SignatureSection />
      <AccommodationSection />
      <TestimonialsSection />
      <GallerySection />
      <LeadForm />
      <FinalCTA />
    </>
  )
}
