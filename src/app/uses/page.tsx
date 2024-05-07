import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getUsesPageData } from '@/data/loaders'
import { sanityFetch } from '@/sanity/sanity.client'
import { Metadata } from 'next'
import { SanityDocument } from 'next-sanity'

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({
  title,
  href,
  children,
}: {
  title: string
  href?: string
  children: React.ReactNode
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export let metadata: Metadata

const USESPAGE_QUERY = `*[_type == "usesPage"]{
  title,
  description,
  "tools": tools[] {
    title,
    "tools": tools[]-> {
      title,
      description
    }
  },
  seoInformation->{
    seoTitle,
    seoDescription
  }
}`

export default async function Uses() {
  const usesPageData = (
    await sanityFetch<SanityDocument[]>({
      query: USESPAGE_QUERY,
    })
  )[0]

  const { title, description, tools, seoInformation } = usesPageData

  metadata = {
    title: seoInformation.seoTitle,
    description: seoInformation.seoDescription,
  }
  console.log(tools)
  return (
    <SimpleLayout title={title} intro={description}>
      <div className="space-y-20">
        {tools.map((section: any) => (
          <ToolsSection key={section.title} title={section.title}>
            {section.tools.map((tool: any) => (
              <Tool key={tool.title} title={tool.title}>
                {tool.description}
              </Tool>
            ))}
          </ToolsSection>
        ))}
      </div>
    </SimpleLayout>
  )
}
