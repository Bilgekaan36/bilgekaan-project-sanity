import { Container } from '@/components/Container'
import { GlobeComponent } from '@/components/GlobeComponent'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import { SanityDocument } from 'next-sanity'
import Link from 'next/link'

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

const logos = {
  GitHubIcon: GitHubIcon,
  LinkedInIcon: LinkedInIcon,
}

export function HeroSection({ data }: {data: SanityDocument}) {
  const { title, description, socialLinks } = data
  return (
    <Container className="relative mt-9">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          {title}
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
        <div className="mt-6 flex gap-6">
          {socialLinks.map((socialLink: any) => (
            <SocialLink
              href={socialLink.link}
              key={socialLink.socialMedia}
              aria-label={'Follow on' + socialLink.socialMedia}
              target="_blank"
              icon={logos[socialLink.socialMedia as keyof typeof logos]}
            />
          ))}
        </div>
      </div>
      {/* <GlobeComponent /> */}
    </Container>
  )
}

export default HeroSection
