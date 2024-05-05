import React from 'react'
import Image from 'next/image'

function importAll(r: any) {
  let images: any = {}
  r.keys().map((item: any) => {
    images[item.replace('./', '').replace(/\.\w+$/, '')] = r(item).default
  })
  return images
}

const images = importAll(
  require.context('@/images/logos/', false, /\.(png|jpe?g|svg)$/),
)

const DynamicImage = ({ imageName, alt, ...rest }: any) => {
  const src = images[imageName.toString()]
  if (!src) return null
  return <Image src={src} alt={alt} {...rest} />
}

export default DynamicImage
