import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fix Login Issues - Troubleshoot Account Access | AI SEO Turbo',
  description: 'Solve login problems with AI SEO Turbo. Learn to fix password issues, account lockouts, email verification problems, and access your account.',
  keywords: ['login issues', 'account access', 'password problems', 'login troubleshooting', 'account lockout', 'authentication issues'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/troubleshooting/login-issues'
  },
  openGraph: {
    title: 'Fix Login Issues - Troubleshoot Account Access | AI SEO Turbo',
    description: 'Solve login problems with AI SEO Turbo. Learn to fix password issues, account lockouts, email verification problems, and access your account.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix Login Issues - Troubleshoot Account Access | AI SEO Turbo',
    description: 'Solve login problems with AI SEO Turbo. Learn to fix password issues, account lockouts, email verification problems, and access your account.',
  }
}

export default function LoginIssuesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}