import { type Metadata } from 'next'
import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import '@/styles/tailwind.css'
import { getSeoConfigData } from '@/data/loaders'

export let metadata: Metadata

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const { defaultSeo } = await getSeoConfigData()
  // const { seoTitle, seoDescription } = defaultSeo

  // Define metadata with seoTitle and seoDescription
  // metadata = {
  //   title: {
  //     template: `%s - ${seoTitle}`,
  //     default: seoTitle,
  //   },
  //   description: seoDescription,
  // }

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
