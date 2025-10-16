import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - AI SEO Turbo Control Center',
  description: 'Access your comprehensive SEO dashboard to monitor rankings, track keywords, analyze competitors, and optimize your website performance.',
  keywords: ['SEO dashboard', 'ranking monitor', 'keyword tracking', 'SEO analytics', 'website optimization'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/dashboard'
  },
  robots: {
    index: false,
    follow: false
  }
}

export default function DashboardPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}