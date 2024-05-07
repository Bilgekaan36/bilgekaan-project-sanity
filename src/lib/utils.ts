import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { createClient, type QueryParams } from 'next-sanity'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const client = createClient({
  projectId: '8fnf6911',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const { projectId, dataset } = client.config()

export const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: QueryParams
  tags?: string[]
}) {
  return client.fetch<QueryResponse>(query, params, {
    //@ts-ignore
    next: {
      revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600,
      tags,
    },
  })
}
