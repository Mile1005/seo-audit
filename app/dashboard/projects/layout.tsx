import { Metadata } from 'next'
import { generateSEOMeta, pageSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEOMeta(pageSEO['dashboard/projects'])

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <h1 className="sr-only">Projects - Manage SEO Audits</h1>
      {children}
    </>
  )
}