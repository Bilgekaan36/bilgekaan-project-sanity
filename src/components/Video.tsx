import { getStrapiMedia } from '@/lib/utils'

export function Video({ url }: { url: string }) {
  return (
    <video
      width="auto"
      className="!h-full !object-cover"
      preload="none"
      autoPlay
      loop
      muted
    >
      <source src={getStrapiMedia(url)?.toString()} type="video/mp4" />
      {/* <track src={captions} kind="subtitles" srcLang="en" label="English" /> */}
      Your browser does not support the video tag.
    </video>
  )
}
