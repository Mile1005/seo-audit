import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sync Issues - Fix Data Synchronization | AI SEO Turbo',
  description: 'Resolve data synchronization problems in AI SEO Turbo. Learn to fix sync errors, reconnect accounts, and ensure your SEO data stays up to date.',
  keywords: ['sync issues', 'data synchronization', 'sync errors', 'data connection', 'account sync', 'data refresh'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/troubleshooting/sync-issues'
  },
  openGraph: {
    images: ['/logo.png'],
    url: 'https://www.aiseoturbo.com/help/troubleshooting/sync-issues',
    siteName: 'AI SEO Turbo',
    title: 'Sync Issues - Fix Data Synchronization | AI SEO Turbo',
    description: 'Resolve data synchronization problems in AI SEO Turbo. Learn to fix sync errors, reconnect accounts, and ensure your SEO data stays up to date.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sync Issues - Fix Data Synchronization | AI SEO Turbo',
    description: 'Resolve data synchronization problems in AI SEO Turbo. Learn to fix sync errors, reconnect accounts, and ensure your SEO data stays up to date.',
  }
}

export default function SyncIssuesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}