import Image from 'next/image'
import clsx from 'clsx'
import { sanityFetch } from '@/sanity/sanity.client'
import { SanityDocument } from 'next-sanity'

const PHOTOS_QUERY = `*[_type == "photosSection"]{
    title,
      "photos": photos[] {
      asset->{
      url,
      originalFilename,
      metadata{
        dimensions{
            width,
            height
                }
            }
        }
    }
  }`

export async function PhotosSection() {
  const data = (await sanityFetch<SanityDocument[]>({ query: PHOTOS_QUERY }))[0]
  const { photos } = data

  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {photos.map((photo: any, photoIndex: number) => (
          <div
            key={photo.asset.url}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
              rotations[photoIndex % rotations.length],
            )}
          >
            <Image
              src={photo.asset.url}
              alt={photo.asset.originalFilename || 'Photo'}
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
              width={photo.asset.metadata.dimensions.width}
              height={photo.asset.metadata.dimensions.height}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
