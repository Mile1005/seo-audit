import { Metadata } from 'next'
import { generateSEOMeta, pageSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEOMeta(pageSEO['features/site-crawler'])

export default function SiteCrawlerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}