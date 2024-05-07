import Link from 'next/link'
import { ImageProps } from 'next/image'
import { SanityDocument } from 'next-sanity'
import { sanityFetch } from '@/sanity/sanity.client'
import { Container } from '@/components/Container'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import logoWorkDigital from '@/images/logos/workdigital.svg'
import logoInitGroup from '@/images/logos/initgroup.svg'
import logoPlanetaria from '@/images/logos/planetaria.svg'
import DynamicImage from '../DynamicImage'

interface NewsletterProps {
  id: number
  title: string
  description: string
  buttonText: string
}

interface ResumeProps {
  id: number
  company: string
  title: string
  logo: string
  end: string
  endData: {
    label: string
    dateTime: string
  }
  start: string
}

function BriefcaseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function Article({ article }: { article: any }) {
  return (
    <Card as="article">
      <Link href="/articles/[id]" as={`/articles/${article._id}`}>
        <Card.Title>{article.title}</Card.Title>
        <Card.Eyebrow as="time" dateTime={article.date} decorate>
          {article.date.split('T')[0]}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Link>
    </Card>
  )
}

interface Role {
  company: string
  title: string
  logo: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string
  endData: { label: string; dateTime: string }
}

function Role({ role }: { role: Role }) {
  let startLabel =
    typeof role.start === 'object' ? role.start.label : role.start
  let startDate =
    typeof role.start === 'object' ? role.start.dateTime : role.start

  let endLabel = typeof role.end === 'number' ? role.end : role.endData?.label
  let endDate = typeof role.end === 'number' ? role.end : role.endData?.dateTime

  const logos = {
    logoWorkDigital: logoWorkDigital,
    logoInitGroup: logoInitGroup,
    logoPlanetaria: logoPlanetaria,
  }

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <DynamicImage
          imageName={role.logo}
          alt={role.logo}
          className="h-7 w-7"
          unoptimized
        />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}

function Newsletter({
  title,
  description,
  buttonText,
}: Readonly<NewsletterProps>) {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">{title}</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      <div className="mt-6 flex">
        <Button
          href={'https://calendly.com/bilgekaan-yilmaz'}
          target="_blank"
          className="w-full flex-none"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}

function Resume({
  resumes,
  resumeTitle,
  downloadButtonText,
}: Readonly<{
  resumes: ResumeProps[]
  resumeTitle: string
  downloadButtonText: string
}>) {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">{resumeTitle}</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resumes.map((role: ResumeProps, roleIndex: number) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button
        href="./bilgekaan-cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        download
        variant="secondary"
        className="group mt-6 w-full"
      >
        {downloadButtonText}
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

const ARTICLES_QUERY = `*[_type == "article"]`

export async function InformationSection({ data }: { data: SanityDocument }) {
  const articles = (
    await sanityFetch<SanityDocument[]>({ query: ARTICLES_QUERY })
  ).slice(0, 4)

  const { newsletter, resumes, downloadButtonText, resumeTitle } = data
  return (
    <Container className="mt-24 md:mt-28">
      <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
        <div className="flex flex-col gap-16">
          {articles.map((article: any) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
        <div className="space-y-10 lg:pl-16 xl:pl-24">
          <Newsletter {...newsletter} />
          <Resume
            resumes={resumes}
            downloadButtonText={downloadButtonText}
            resumeTitle={resumeTitle}
          />
        </div>
      </div>
    </Container>
  )
}
