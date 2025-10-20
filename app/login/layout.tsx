import { Metadata } from 'next'
import { generateSEOMeta, pageSEO } from '@/lib/seo'

// Use shared SEO config and enforce noindex for the login route
export const metadata: Metadata = {
  ...generateSEOMeta(pageSEO['login']),
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}