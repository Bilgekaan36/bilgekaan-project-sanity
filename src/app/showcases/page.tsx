import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { Video } from '@/components/Video'
import { sanityFetch } from '@/lib/utils'
import { SanityDocument } from 'next-sanity'

const SHOWCASES_QUERY = `*[_type == "showcase" && title == "Portfolio Image Showcases"]{
  showcases
}`

export default async function Showcases() {
  const showcasesData = (
    await sanityFetch<SanityDocument[]>({
      query: SHOWCASES_QUERY,
    })
  )[0]

  const { showcases } = showcasesData

  return (
    <div className="flex flex-col overflow-hidden">
      {showcases.map((showcase: any, index: any) => (
        <ContainerScroll
          key={index}
          titleComponent={
            showcase.title && (
              <>
                <h1 className="text-4xl font-semibold text-black dark:text-white">
                  {showcase?.title}
                  <br />
                  <span className="mt-1 text-4xl font-bold leading-none md:text-[6rem]">
                    {showcase?.subtitle}
                  </span>
                </h1>
              </>
            )
          }
        >
          <Link href={showcase.path ? showcase.path : '#'}>
            <Image
              src={showcase.url}
              alt={showcase.url}
              height={720}
              width={1400}
              className="mx-auto h-full rounded-2xl object-cover object-left-top"
              draggable={false}
            />
            {/* @ts-ignore */}
            {/* <Video url={showcase ? showcase.video.videos.asset.url : ''} /> */}
          </Link>
        </ContainerScroll>
      ))}
    </div>
  )
}
