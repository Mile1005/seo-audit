import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Assistant - Smart SEO Recommendations | AI SEO Turbo',
  description: 'Master the AI assistant feature in AI SEO Turbo. Learn best practices for SEO recommendations, content optimization, and automated insights.',
  keywords: ['AI assistant', 'SEO recommendations', 'content optimization', 'AI insights', 'automated SEO', 'smart suggestions'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/features/ai-assistant'
  },
  openGraph: {
    title: 'AI Assistant Guide - Smart SEO Recommendations | AI SEO Turbo',
    description: 'Master the AI assistant feature in AI SEO Turbo. Learn best practices for SEO recommendations, content optimization, and automated insights.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Assistant Guide - Smart SEO Recommendations | AI SEO Turbo',
    description: 'Master the AI assistant feature in AI SEO Turbo. Learn best practices for SEO recommendations, content optimization, and automated insights.',
  }
}

export default function AIAssistantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}