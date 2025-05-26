import { sanityFetch } from '@/lib/utils'
import type { SanityDocument } from '@sanity/client'

export async function fetchBlogById(params: any) {
  const BLOG_QUERY = `*[_type == "blog" && _id == $id][0]`

  return await sanityFetch<SanityDocument[]>({ query: BLOG_QUERY, params })
}
