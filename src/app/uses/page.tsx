// import { Card } from '@/components/Card'
// import { Section } from '@/components/Section'
// import { SimpleLayout } from '@/components/SimpleLayout'
// import { getUsesPageData } from '@/data/loaders'
// import { Metadata } from 'next'

// function ToolsSection({
//   children,
//   ...props
// }: React.ComponentPropsWithoutRef<typeof Section>) {
//   return (
//     <Section {...props}>
//       <ul role="list" className="space-y-16">
//         {children}
//       </ul>
//     </Section>
//   )
// }

// function Tool({
//   title,
//   href,
//   children,
// }: {
//   title: string
//   href?: string
//   children: React.ReactNode
// }) {
//   return (
//     <Card as="li">
//       <Card.Title as="h3" href={href}>
//         {title}
//       </Card.Title>
//       <Card.Description>{children}</Card.Description>
//     </Card>
//   )
// }

// export let metadata: Metadata

// export default async function Uses() {
//   const strapiData = await getUsesPageData()
//   const { title, description, Tools, seo } = strapiData

//   metadata = {
//     title: seo.seoTitle,
//     description: seo.seoDescription,
//   }

//   return (
//     <SimpleLayout title={title} intro={description}>
//       <div className="space-y-20">
//         {Tools.map((section: any) => (
//           <ToolsSection key={section.title} title={section.title}>
//             {section.tools.data.map((tool: any) => (
//               <Tool key={tool.title} title={tool.title}>
//                 {tool.description}
//               </Tool>
//             ))}
//           </ToolsSection>
//         ))}
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