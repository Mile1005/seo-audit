import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Two-Factor Authentication - Secure Your Account | AI SEO Turbo',
  description: 'Set up and manage two-factor authentication (2FA) for your AI SEO Turbo account. Learn to enable 2FA, use authenticator apps, and secure your SEO data.',
  keywords: ['two-factor authentication', '2FA setup', 'account security', 'authenticator app', 'login security', 'account protection'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/security/two-factor-authentication'
  },
  openGraph: {
    title: 'Two-Factor Authentication - Secure Your Account | AI SEO Turbo',
    description: 'Set up and manage two-factor authentication (2FA) for your AI SEO Turbo account. Learn to enable 2FA, use authenticator apps, and secure your SEO data.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Two-Factor Authentication - Secure Your Account | AI SEO Turbo',
    description: 'Set up and manage two-factor authentication (2FA) for your AI SEO Turbo account. Learn to enable 2FA, use authenticator apps, and secure your SEO data.',
  }
}

export default function TwoFactorAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}