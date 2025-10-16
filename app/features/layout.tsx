import { Metadata } from 'next'
import { generateSEOMeta, pageSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEOMeta(pageSEO['features'])

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}