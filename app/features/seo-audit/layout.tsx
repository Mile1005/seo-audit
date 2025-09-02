import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Audit Tool | AI SEO Turbo',
  description: 'Comprehensive SEO audit tool with real-time analysis and actionable insights.',
}

export default function SEOAuditLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
