import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { urlFor } from '@/lib/utils'
import { sanityFetch } from '@/sanity/sanity.client'
import { SanityDocument } from 'next-sanity'

export interface Header {
  headerLinks: {
    url: string
    text: string
    isExternal: boolean
  }[]
  avatar: {
    url: string
    originalFilename: string
  }
}

export interface Footer {
  footerLink: {
    url: string
    text: string
    isExternal: boolean
  }[]
  footerText: string
}

const HEADER_QUERY = `*[_type == "header"]{
  headerLinks,
  avatar{
    asset->{
      url,
      originalFilename
    }
  }
}`

export async function Layout({ children }: { children: React.ReactNode }) {
  const header = (
    await sanityFetch<SanityDocument[]>({ query: HEADER_QUERY })
  )[0]

  // const footer: Readonly<Footer> = await getFooterData()
  const url = urlFor(header.avatar)?.url()
  if (url) {
    header.avatar.url = url
  }

  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        {/* @ts-ignore */}
        <Header data={header} />
        <main className="flex-auto">{children}</main>
        {/* <Footer data={footer} /> */}
      </div>
    </>
  )
}
