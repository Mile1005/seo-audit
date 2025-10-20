import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Community - Connect & Learn | AI SEO Turbo',
  description: 'Join the AI SEO Turbo community to connect with SEO professionals, share insights, learn from experts, and stay updated with latest trends.',
  keywords: ['SEO community', 'SEO professionals', 'SEO networking', 'SEO insights'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/community'
  },
  openGraph: {
    images: ['/logo.png'],
    url: 'https://www.aiseoturbo.com/community',
    siteName: 'AI SEO Turbo',
    title: 'SEO Community - Connect & Learn | AI SEO Turbo',
    description: 'Join the AI SEO Turbo community to connect with SEO professionals, share insights, learn from experts, and stay updated with latest trends.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Community - Connect & Learn | AI SEO Turbo',
    description: 'Join the AI SEO Turbo community to connect with SEO professionals, share insights, learn from experts, and stay updated with latest trends.',
  }
}

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}