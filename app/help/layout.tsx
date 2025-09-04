import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Help Center | AISEOTurbo - Get Support & Find Answers',
  description: 'Get help with AISEOTurbo AI-powered SEO tools. Find answers to common questions, tutorials, guides, and contact our support team for assistance.',
  keywords: ['help', 'support', 'faq', 'tutorials', 'customer service', 'seo help', 'aiseoturbo support'],
  openGraph: {
    title: 'Help Center | AISEOTurbo',
    description: 'Get help with AISEOTurbo AI-powered SEO tools. Find answers, tutorials, and expert support.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Help Center | AISEOTurbo',
    description: 'Get help with AISEOTurbo AI-powered SEO tools. Find answers, tutorials, and expert support.',
  }
}

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
