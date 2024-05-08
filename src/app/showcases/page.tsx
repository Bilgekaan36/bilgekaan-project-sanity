import React from 'react'
import Link from 'next/link'

import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { Video } from '@/components/Video'
import { sanityFetch } from '@/lib/utils'
import { SanityDocument } from 'next-sanity'
import { Container } from '@/components/Container'

const SHOWCASES_QUERY = `*[_type == "showcase"]{
  "showcases": showcases[]{
    title,
    subtitle,
    video->{
      videos{
      asset->{
          url,
          _id
        }
      }
    },
    path
  }
}`

export default async function Showcases() {
  const showcasesData = (
    await sanityFetch<SanityDocument[]>({
      query: SHOWCASES_QUERY,
    })
  )[0]

  const { showcases } = showcasesData

  return (
    <Container className="mt-16 sm:mt-32">
      <>
        <h1 className="text-2xl font-semibold text-black sm:text-4xl dark:text-white">
          Some of my selected
          <br />
          <br />
          <span className="mt-1 text-4xl font-bold leading-none md:text-[6rem]">
            Showcases
          </span>
        </h1>
      </>
      {showcases.map((showcase: any, index: any) => (
        <div key={index} className="my-20">
          <Link href={showcase.path ? showcase.path : '#'}>
            <Video url={showcase ? showcase.video.videos.asset.url : ''} />
          </Link>
        </div>
      ))}
    </Container>
  )
}
