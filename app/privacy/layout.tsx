import { Metadata } from 'next'
import { generateSEOMeta, pageSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEOMeta(pageSEO['privacy'])

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}