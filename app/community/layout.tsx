import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Community - Connect & Learn | AI SEO Turbo',
  description: 'Join the AI SEO Turbo community to connect with SEO professionals, share insights, learn from experts, and stay updated with the latest SEO trends and best practices.',
  keywords: ['SEO community', 'SEO professionals', 'SEO networking', 'SEO insights'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/community'
  },
  openGraph: {
    title: 'SEO Community - Connect & Learn | AI SEO Turbo',
    description: 'Join the AI SEO Turbo community to connect with SEO professionals, share insights, learn from experts, and stay updated with the latest SEO trends and best practices.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Community - Connect & Learn | AI SEO Turbo',
    description: 'Join the AI SEO Turbo community to connect with SEO professionals, share insights, learn from experts, and stay updated with the latest SEO trends and best practices.',
  }
}

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}