import { Metadata } from 'next'
import { generateSEOMeta, pageSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEOMeta(pageSEO['login'])

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}