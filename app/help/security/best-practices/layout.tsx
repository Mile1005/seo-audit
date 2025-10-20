import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security Best Practices - Account Protection | AI SEO Turbo',
  description: 'Essential security best practices for AI SEO Turbo users. Learn to protect your account, use strong passwords, enable 2FA, and secure your SEO data.',
  keywords: ['security best practices', 'account protection', 'password security', 'data protection', 'account safety', 'security tips'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/security/best-practices'
  },
  openGraph: {
    images: ['/logo.png'],
    url: 'https://www.aiseoturbo.com/help/security/best-practices',
    siteName: 'AI SEO Turbo',
    title: 'Security Best Practices - Protect Your Account | AI SEO Turbo',
    description: 'Essential security best practices for AI SEO Turbo users. Learn to protect your account, use strong passwords, enable 2FA, and secure your SEO data.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security Best Practices - Protect Your Account | AI SEO Turbo',
    description: 'Essential security best practices for AI SEO Turbo users. Learn to protect your account, use strong passwords, enable 2FA, and secure your SEO data.',
  }
}

export default function BestPracticesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}