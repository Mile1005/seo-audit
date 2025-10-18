import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fix Audit Issues - Troubleshoot SEO Audits | AI SEO Turbo',
  description: 'Solve common SEO audit problems in AI SEO Turbo. Learn to fix stuck audits, timeouts, incomplete scans, and other audit-related issues.',
  keywords: ['audit issues', 'troubleshoot audits', 'SEO audit problems', 'audit errors', 'audit timeouts', 'audit fixes'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/troubleshooting/audit-issues'
  },
  openGraph: {
    title: 'Fix Audit Issues - Troubleshoot SEO Audits | AI SEO Turbo',
    description: 'Solve common SEO audit problems in AI SEO Turbo. Learn to fix stuck audits, timeouts, incomplete scans, and other audit-related issues.',
    url: 'https://www.aiseoturbo.com/help/troubleshooting/audit-issues',
    type: 'article',
    locale: 'en_US',
    siteName: 'AISEOTurbo',
    images: [
      {
        url: 'https://www.aiseoturbo.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'AISEOTurbo - AI-Powered SEO Audits',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix Audit Issues - Troubleshoot SEO Audits | AI SEO Turbo',
    description: 'Solve common SEO audit problems in AI SEO Turbo. Learn to fix stuck audits, timeouts, incomplete scans, and other audit-related issues.',
  }
}

export default function AuditIssuesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}