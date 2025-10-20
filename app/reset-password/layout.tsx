import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reset Password - Account Recovery | AI SEO Turbo',
  description: 'Securely reset your AI SEO Turbo password and regain account access.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
