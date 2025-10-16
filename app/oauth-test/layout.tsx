import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OAuth Test - Development Only',
  description: 'OAuth testing page for development purposes.',
  robots: {
    index: false,
    follow: false
  }
}

export default function OAuthTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}