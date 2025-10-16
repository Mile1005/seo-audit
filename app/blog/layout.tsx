import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Blog - Tips & Strategies | AI SEO Turbo',
  description: 'Stay updated with the latest SEO tips, strategies, and best practices. Learn from expert insights on technical SEO, content optimization, and search engine algorithms.',
  keywords: 'SEO blog, SEO tips, SEO strategies, search engine optimization, SEO best practices'
  // Removed canonical to allow individual blog posts to set their own
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
