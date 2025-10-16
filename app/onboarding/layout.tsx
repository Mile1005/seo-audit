import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Onboarding - Get Started | AI SEO Turbo',
  description: 'Complete your AI SEO Turbo setup and start optimizing your website for better search rankings.',
  keywords: ['onboarding', 'setup', 'SEO setup', 'get started'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/onboarding'
  },
  robots: {
    index: false,
    follow: false
  }
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}