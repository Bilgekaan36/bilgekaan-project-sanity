import '@/styles/tailwind.css'

import { type Metadata } from 'next'
import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { sanityFetch } from '@/lib/utils'
import { SanityDocument } from 'next-sanity'

export let metadata: Metadata

const SEO_QUERY = `*[_type == "seoInformation" && title == "defaultSeo"]{
  seoTitle,
  seoDescription
}`

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const defaultSeo = (
    await sanityFetch<SanityDocument[]>({ query: SEO_QUERY })
  )[0]
  const { seoTitle, seoDescription } = defaultSeo

  //Define metadata with seoTitle and seoDescription
  metadata = {
    title: {
      template: `%s - ${seoTitle}`,
      default: seoTitle,
    },
    description: seoDescription,
  }

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
