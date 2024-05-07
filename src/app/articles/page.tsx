import { type Metadata } from 'next'
import Link from 'next/link'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { sanityFetch } from '@/lib/utils'
import { SanityDocument } from 'next-sanity'

export interface Article {
  title: string
  description: string
  content: string
  author: string
  date: string
}

export interface ArticleWithId extends Article {
  id: string
}

const ARTICLESPAGE_QUERY = `*[_type == "articlesPage"]{
  title,
  description,
  "articles": articles[]->{
    _id,
    title,
    description,
    date
  },
  seoInformation->{
    seoTitle,
    seoDescription
  }
}`

async function Article({ article }: { article: any }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Link href="/articles/[id]" as={`/articles/${article._id}`}>
          <Card.Title>{article.title}</Card.Title>
          <Card.Eyebrow
            as="time"
            dateTime={article.date}
            className="md:hidden"
            decorate
          >
            {article.date.split('T')[0]}
          </Card.Eyebrow>
          <Card.Description>{article.description}</Card.Description>
          <Card.Cta>Read article</Card.Cta>
        </Link>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {article.date.split('T')[0]}
      </Card.Eyebrow>
    </article>
  )
}

export let metadata: Metadata

export default async function ArticlesIndex() {
  const articlesPageData = (
    await sanityFetch<SanityDocument[]>({
      query: ARTICLESPAGE_QUERY,
    })
  )[0]
  const { title, description, articles, seoInformation } = articlesPageData

  metadata = {
    title: seoInformation.seoTitle,
    description: seoInformation.seoDescription,
  }
  return (
    <SimpleLayout title={title} intro={description}>
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article: any) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
