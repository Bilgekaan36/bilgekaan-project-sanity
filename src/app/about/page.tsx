import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { MDXRemote } from 'next-mdx-remote/rsc'

import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'

import { sanityFetch } from '@/lib/utils'
import { SanityDocument } from 'next-sanity'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        target="_blank"
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export let metadata: Metadata

const logos = {
  GitHubIcon: GitHubIcon,
  LinkedInIcon: LinkedInIcon,
  MailIcon: MailIcon,
}

const ABOUTPAGE_QUERY = `*[_type == "aboutPage"]{
  title,
  description,
  "socialLinks": socialLinks[]->{
    socialMedia,
    link,
    description
  },
    "portrait": portrait {
      asset->{
        url,
        originalFilename,
        metadata{
          dimensions{
            width,
            height
          }
        }
      }
    },
  seoInformation->{
    seoTitle,
    seoDescription
  }
}`

export default async function About() {
  const aboutPageData = (
    await sanityFetch<SanityDocument[]>({ query: ABOUTPAGE_QUERY })
  )[0]
  const { title, description, socialLinks, portrait, seoInformation } =
    aboutPageData

  metadata = {
    title: seoInformation.seoTitle,
    description: seoInformation.seoDescription,
  }

  const markdown = description

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portrait.asset.url}
              alt={portrait.asset.originalFilename}
              sizes="(min-width: 1024px) 32rem, 20rem"
              width={portrait.asset.metadata.dimensions.width}
              height={portrait.asset.metadata.dimensions.height}
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {title}
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <MDXRemote source={markdown} />
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            {socialLinks.map((link: any) => (
              <SocialLink
                href={link.link}
                key={link.url}
                icon={logos[link.socialMedia as keyof typeof logos]}
                className={
                  link.socialMedia === 'MailIcon'
                    ? 'mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40'
                    : 'mt-4'
                }
              >
                {link.description}
              </SocialLink>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  )
}
