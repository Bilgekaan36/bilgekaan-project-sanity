import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { urlFor } from '@/lib/utils'
import { sanityFetch } from '@/sanity/sanity.client'
import { SanityDocument } from 'next-sanity'

const HEADER_QUERY = `*[_type == "header"]{
  headerLinks,
  avatar{
    asset->{
      url,
      originalFilename
    }
  }
}`

const FOOTER_QUERY = `*[_type == "footer"]{
  footerLinks,
  footerText
  }`

export async function Layout({ children }: { children: React.ReactNode }) {
  const headerData = (
    await sanityFetch<SanityDocument[]>({ query: HEADER_QUERY })
  )[0]

  const footerData = (
    await sanityFetch<SanityDocument[]>({
      query: FOOTER_QUERY,
    })
  )[0]

  const url = urlFor(headerData.avatar)?.url()
  if (url) {
    headerData.avatar.url = url
  }

  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <Header data={headerData} />
        <main className="flex-auto">{children}</main>
        <Footer data={footerData} />
      </div>
    </>
  )
}
