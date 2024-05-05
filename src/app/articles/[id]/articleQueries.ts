import { sanityFetch } from '@/sanity/sanity.client'
import type { SanityDocument } from '@sanity/client'

export async function fetchArticleById(params: any) {
  const ARTICLES_QUERY = `*[_type == "article" && _id == $id][0]`

  return await sanityFetch<SanityDocument[]>({ query: ARTICLES_QUERY, params })
}
