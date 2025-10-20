import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verify Email | AI SEO Turbo',
  description: 'Email verification page for AI SEO Turbo accounts.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
