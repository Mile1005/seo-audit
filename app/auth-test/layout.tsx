import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Auth Test - Development Only',
  description: 'Authentication testing page for development purposes.',
  robots: {
    index: false,
    follow: false
  }
}

export default function AuthTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}