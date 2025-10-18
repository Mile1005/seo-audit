import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Blog - Tips & Strategies | AI SEO Turbo',
  description: 'Latest SEO tips, strategies, and best practices. Learn from expert insights on technical SEO, content optimization, and search engine algorithms.',
  keywords: 'SEO blog, SEO tips, SEO strategies, search engine optimization, SEO best practices',
  alternates: {
    canonical: 'https://www.aiseoturbo.com/blog'
  }
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
