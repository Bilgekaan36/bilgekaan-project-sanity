import { SanityDocument } from 'next-sanity'

import HeroSection from '@/components/custom/HeroSection'
import { InformationSection } from '@/components/custom/InformationSection'
import { PhotosSection } from '@/components/custom/PhotosSection'
import { sanityFetch } from '@/lib/utils'

const HEROSECTION_QUERY = `*[_type == "heroSection"]{
  _type,
  title,
  description,
  "socialLinks": socialLinks[]->{
    socialMedia,
    link,
    description
  }
}`

const INFORMATIONSECTION_QUERY = `*[_type == "informationSection"]{
  newsletter,
  downloadButtonText,
  resumeTitle,
  "resumes": resumes[]->
}`

export default async function Home() {
  const heroSection = (
    await sanityFetch<SanityDocument[]>({ query: HEROSECTION_QUERY })
  )[0]

  const informationSection = (
    await sanityFetch<SanityDocument[]>({ query: INFORMATIONSECTION_QUERY })
  )[0]

  return (
    <main>
      <HeroSection data={heroSection} />
      <PhotosSection />
      <InformationSection data={informationSection} />
    </main>
  )
}
