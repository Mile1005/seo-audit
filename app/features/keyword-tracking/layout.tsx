import { Metadata } from 'next'
import { generateSEOMeta, pageSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEOMeta(pageSEO['features/keyword-tracking'])

export default function KeywordTrackingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}