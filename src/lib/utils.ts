import { client } from '@/sanity/sanity.client'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { QueryParams } from 'next-sanity'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://127.0.0.1:1337'
}

const { projectId, dataset } = client.config()

export const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

export function flattenAttributes(data: any): any {
  // Check if data is a plain object; return as is if not
  if (
    typeof data !== 'object' ||
    data === null ||
    data instanceof Date ||
    typeof data === 'function'
  ) {
    return data
  }

  // If data is an array, apply flattenAttributes to each element and return as array
  if (Array.isArray(data)) {
    return data.map((item) => flattenAttributes(item))
  }

  // Initialize an object with an index signature for the flattened structure
  let flattened: { [key: string]: any } = {}

  // Iterate over each key in the object
  for (let key in data) {
    // Skip inherited properties from the prototype chain
    if (!data.hasOwnProperty(key)) continue

    // If the key is 'attributes' or 'data', and its value is an object, merge their contents
    if (
      (key === 'attributes' || key === 'data') &&
      typeof data[key] === 'object' &&
      !Array.isArray(data[key])
    ) {
      Object.assign(flattened, flattenAttributes(data[key]))
    } else {
      // For other keys, copy the value, applying flattenAttributes if it's an object
      flattened[key] = flattenAttributes(data[key])
    }
  }

  return flattened
}

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
