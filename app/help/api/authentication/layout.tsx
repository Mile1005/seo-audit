import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Authentication - Secure Access Tokens | AI SEO Turbo',
  description: 'Complete guide to API authentication for AI SEO Turbo. Learn to generate, manage, and secure your API access tokens for SEO audits and integrations.',
  keywords: ['API authentication', 'access tokens', 'API security', 'OAuth tokens', 'API keys', 'secure authentication', 'token management'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/api/authentication'
  },
  openGraph: {
    title: 'API Authentication - Secure Access Tokens | AI SEO Turbo',
    description: 'Complete guide to API authentication for AI SEO Turbo. Learn to generate, manage, and secure your API access tokens for SEO audits and integrations.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Authentication - Secure Access Tokens | AI SEO Turbo',
    description: 'Complete guide to API authentication for AI SEO Turbo. Learn to generate, manage, and secure your API access tokens for SEO audits and integrations.',
  }
}

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}