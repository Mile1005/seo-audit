import { Metadata } from 'next'
import { generateSEOMeta, pageSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEOMeta(pageSEO['terms'])

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}