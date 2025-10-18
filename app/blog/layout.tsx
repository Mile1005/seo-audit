import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Blog - Tips & Strategies | AI SEO Turbo',
  description: 'Latest SEO tips, strategies, and best practices. Learn from expert insights on technical SEO, content optimization, and search engine algorithms.',
  keywords: 'SEO blog, SEO tips, SEO strategies, search engine optimization, SEO best practices',
  alternates: {
    canonical: 'https://www.aiseoturbo.com/blog'
  },
  openGraph: {
    title: 'SEO Blog - Tips & Strategies | AI SEO Turbo',
    description: 'Latest SEO tips, strategies, and best practices. Learn from expert insights on technical SEO, content optimization, and search engine algorithms.',
    url: 'https://www.aiseoturbo.com/blog',
    type: 'website',
    locale: 'en_US',
    siteName: 'AISEOTurbo',
    images: [
      {
        url: 'https://www.aiseoturbo.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'AISEOTurbo - AI-Powered SEO Audits',
      }
    ]
  }
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
