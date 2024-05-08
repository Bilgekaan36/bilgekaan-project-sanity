export function Video({ url }: { url: string }) {
  return (
    <video width="auto" className="!h-full !object-cover" autoPlay loop muted>
      <source src={url} type="video/mp4" />
      {/* <track src={captions} kind="subtitles" srcLang="en" label="English" /> */}
      Your browser does not support the video tag.
    </video>
  )
}
