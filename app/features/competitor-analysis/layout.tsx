import { Metadata } from 'next'
import { generateSEOMeta, pageSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEOMeta(pageSEO['features/competitor-analysis'])

export default function CompetitorAnalysisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}