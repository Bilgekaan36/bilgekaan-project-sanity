import { type Metadata } from 'next'
import Link from 'next/link'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { sanityFetch } from '@/lib/utils'
import { SanityDocument } from 'next-sanity'

export interface Blog {
  title: string
  description: string
  content: string
  author: string
  date: string
}

export interface BlogWithId extends Blog {
  id: string
}

const BLOGSPAGE_QUERY = `*[_type == "blogsPage"]{
  title,
  description,
  "blogs": blogs[]->{
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

async function BlogCard({ blog }: { blog: any }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Link href={`/blogs/${blog._id}`}>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Eyebrow
            as="time"
            dateTime={blog.date}
            className="md:hidden"
            decorate
          >
            {blog.date.split('T')[0]}
          </Card.Eyebrow>
          <Card.Description>{blog.description}</Card.Description>
          <Card.Cta>Read blog</Card.Cta>
        </Link>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={blog.date}
        className="mt-1 hidden md:block"
      >
        {blog.date.split('T')[0]}
      </Card.Eyebrow>
    </article>
  )
}

export let metadata: Metadata

export default async function BlogsIndex() {
  const blogsPageData = (
    await sanityFetch<SanityDocument[]>({
      query: BLOGSPAGE_QUERY,
    })
  )[0]

  const { title, description, blogs, seoInformation } = blogsPageData

  metadata = {
    title: seoInformation?.seoTitle || title,
    description: seoInformation?.seoDescription || description,
  }

  return (
    <SimpleLayout title={title} intro={description}>
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {blogs?.map((blog: any) => <BlogCard key={blog._id} blog={blog} />)}
        </div>
      </div>
    </SimpleLayout>
  )
}
