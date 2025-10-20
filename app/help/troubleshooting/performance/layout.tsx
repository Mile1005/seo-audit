import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Performance Issues - Speed Up AI SEO Turbo | AI SEO Turbo',
  description: 'Resolve performance problems in AI SEO Turbo. Learn to fix slow loading, optimize audits, improve dashboard speed, and enhance platform performance.',
  keywords: ['performance issues', 'slow loading', 'speed optimization', 'dashboard performance', 'audit speed', 'platform optimization'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/troubleshooting/performance'
  },
  openGraph: {
    images: ['/logo.png'],
    title: 'Performance Issues - Speed Up AI SEO Turbo | AI SEO Turbo',
    description: 'Resolve performance problems in AI SEO Turbo. Learn to fix slow loading, optimize audits, improve dashboard speed, and enhance platform performance.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Performance Issues - Speed Up AI SEO Turbo | AI SEO Turbo',
    description: 'Resolve performance problems in AI SEO Turbo. Learn to fix slow loading, optimize audits, improve dashboard speed, and enhance platform performance.',
  }
}

export default function PerformanceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}