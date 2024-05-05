// import { type Metadata } from 'next'

// import { Card } from '@/components/Card'
// import { SimpleLayout } from '@/components/SimpleLayout'
// import { formatDate } from '@/lib/formatDate'
// import Link from 'next/link'
// import { getArticlesPageData } from '@/data/loaders'

// export interface Article {
//   title: string
//   description: string
//   content: string
//   author: string
//   date: string
// }

// export interface ArticleWithId extends Article {
//   id: string
// }

// async function Article({ article }: { article: ArticleWithId }) {
//   return (
//     <article className="md:grid md:grid-cols-4 md:items-baseline">
//       <Card className="md:col-span-3">
//         <Link href="/articles/[id]" as={`/articles/${article.id}`}>
//           <Card.Title>{article.title}</Card.Title>
//           <Card.Eyebrow
//             as="time"
//             dateTime={article.date}
//             className="md:hidden"
//             decorate
//           >
//             {formatDate(article.date)}
//           </Card.Eyebrow>
//           <Card.Description>{article.description}</Card.Description>
//           <Card.Cta>Read article</Card.Cta>
//         </Link>
//       </Card>
//       <Card.Eyebrow
//         as="time"
//         dateTime={article.date}
//         className="mt-1 hidden md:block"
//       >
//         {formatDate(article.date)}
//       </Card.Eyebrow>
//     </article>
//   )
// }

// export let metadata: Metadata

// export default async function ArticlesIndex() {
//   const strapiData = await getArticlesPageData()
//   const { title, description, articles, seo } = strapiData

//   metadata = {
//     title: seo.seoTitle,
//     description: seo.seoDescription,
//   }
//   return (
//     <SimpleLayout title={title} intro={description}>
//       <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
//         <div className="flex max-w-3xl flex-col space-y-16">
//           {articles.data.map((article: any) => (
//             <Article key={article.slug} article={article} />
//           ))}
//         </div>
//       </div>
//     </SimpleLayout>
//   )
// }

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page