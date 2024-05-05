import HeroSection from '@/components/custom/HeroSection'
import { InformationSection } from '@/components/custom/InformationSection'
import { PhotosSection } from '@/components/custom/PhotosSection'
import { getHomePageData } from '@/data/loaders'
import { sanityFetch } from '@/sanity/sanity.client'
import { SanityDocument } from 'next-sanity'

function componentRenderer(event: any) {
  switch (event._type) {
    case 'heroSection':
      return <HeroSection key={event._id} data={event} />
    case 'informationSection':
      return <InformationSection key={event._id} data={event} />
    case 'photosSection':
      return <PhotosSection key={event._id} data={event} />
    default:
      return null
  }
}

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
      <HeroSection key={heroSection._id} data={heroSection} />
      <InformationSection
        key={informationSection._id}
        data={informationSection}
      />
    </main>
  )
}
