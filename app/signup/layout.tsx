import { Metadata } from 'next'
import { generateSEOMeta, pageSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEOMeta(pageSEO['signup'])

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}