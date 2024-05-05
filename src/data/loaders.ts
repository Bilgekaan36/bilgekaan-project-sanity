import qs from 'qs'
import { unstable_noStore as noStore } from 'next/cache'
import { flattenAttributes, getStrapiURL } from '@/lib/utils'

const baseUrl = getStrapiURL()

async function fetchData(url: string) {
  const authToken = null
  const headers = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  }

  try {
    const response = await fetch(url, authToken ? headers : {})
    const data = await response.json()
    return flattenAttributes(data)
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error // or return null;
  }
}

export async function getHomePageData() {
  // const url = new URL('/api/home-page', baseUrl)

  // url.search = qs.stringify({
  //   populate: {
  //     blocks: {
  //       on: {
  //         'layout.hero-section': {
  //           populate: {
  //             socialLinks: true,
  //           },
  //         },
  //         'layout.photos-section': {
  //           populate: {
  //             photos: {
  //               populate: {
  //                 fields: ['url', 'alternativeText'],
  //               },
  //             },
  //           },
  //         },
  //         'layout.information-section': {
  //           populate: {
  //             newsletter: true,
  //             resumes: true,
  //           },
  //         },
  //       },
  //     },
  //   },
  // })

  // return await fetchData(url.href)
  return {}
}

export async function getHeaderData() {
  // noStore()

  // const url = new URL('/api/header', baseUrl)

  // url.search = qs.stringify({
  //   populate: {
  //     headerLink: {
  //       populate: true,
  //     },
  //     avatar: {
  //       fields: ['url', 'alternativeText'],
  //     },
  //   },
  // })

  // return await fetchData(url.href)
  return {}
}

export async function getFooterData() {
  // noStore()

  // const url = new URL('/api/footer', baseUrl)

  // url.search = qs.stringify({
  //   populate: {
  //     footerLink: {
  //       populate: true,
  //     },
  //   },
  // })

  // return await fetchData(url.href)
  return {}
}

export async function getProjectsPageData() {
  // noStore()

  // const url = new URL('/api/projects-page', baseUrl)

  // url.search = qs.stringify({
  //   populate: {
  //     githubProjects: {
  //       populate: '*',
  //     },
  //     seo: true,
  //   },
  // })

  // return await fetchData(url.href)
  return {}
}

export async function getAboutPageData() {
  // noStore()

  // const url = new URL('/api/about-page', baseUrl)

  // url.search = qs.stringify({
  //   populate: {
  //     socialLinks: true,
  //     portrait: {
  //       fields: ['url', 'alternativeText', 'width', 'height'],
  //     },
  //     seo: true,
  //   },
  // })

  // return await fetchData(url.href)
  return {}
}

export async function getSeoConfigData() {
  // noStore()

  // const url = new URL('/api/seo-config', baseUrl)

  // url.search = qs.stringify({
  //   populate: '*',
  // })

  // return await fetchData(url.href)
  return {}
}

export async function getUsesPageData() {
  // noStore()

  // const url = new URL('/api/uses-page', baseUrl)

  // url.search = qs.stringify({
  //   populate: {
  //     Tools: {
  //       populate: '*',
  //     },
  //     seo: true,
  //   },
  // })

  // return await fetchData(url.href)
  return {}
}

export async function getArticlesPageData() {
  // noStore()

  // const url = new URL('/api/articles-page', baseUrl)

  // url.search = qs.stringify({
  //   populate: {
  //     articles: {
  //       populate: '*',
  //     },
  //     seo: true,
  //   },
  // })

  // return await fetchData(url.href)
  return {}
}

export async function getArticlesData() {
  // noStore()

  // const url = new URL('/api/articles', baseUrl)

  // url.search = qs.stringify({
  //   populate: '*',
  // })

  // return await fetchData(url.href)
  return {}
}

export async function getArticleData(id: string) {
  // noStore()

  // const url = new URL(`/api/articles/${id}`, baseUrl)

  // url.search = qs.stringify({
  //   populate: '*',
  // })

  // return await fetchData(url.href)
  return {}
}

export async function getMediaData() {
  // noStore()

  // const url = new URL(
  //   `/file-system/folder?path=${process.env.NEXT_PUBLIC_STRAPI_URL}/uploads/`,
  //   baseUrl,
  // )

  // url.search = qs.stringify({
  //   populate: '*',
  // })

  // return await fetchData(url.href)
  return {}
}
