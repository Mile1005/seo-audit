import { Metadata } from 'next'
import { generateSEOMeta, pageSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEOMeta(pageSEO.blog)

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
