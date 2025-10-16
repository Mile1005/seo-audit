import { Metadata } from 'next'
import { generateSEOMeta, pageSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEOMeta(pageSEO['dashboard/backlinks'])

export default function BacklinksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}