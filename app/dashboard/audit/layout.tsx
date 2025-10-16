import { Metadata } from 'next'
import { generateSEOMeta, pageSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEOMeta(pageSEO['dashboard/audit'])

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}