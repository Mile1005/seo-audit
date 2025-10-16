import { Metadata } from 'next'
import { generateSEOMeta } from '@/lib/seo'
import BlogPostClient from '../[slug]/blog-post-client'

export const metadata: Metadata = generateSEOMeta({
  title: 'Content SEO: Search-Friendly Content | AI SEO Turbo Blog',
  description: 'Learn how to create content that ranks well in search engines and provides value to your audience.',
  canonical: 'https://www.aiseoturbo.com/blog/content-seo-creating-search-friendly-content',
  ogType: 'article',
  keywords: ['Content SEO', 'Writing', 'User Experience', 'Search']
})

const post = {
  id: '6',
  slug: 'content-seo-creating-search-friendly-content',
  title: 'Content SEO: Creating Search-Friendly Content',
  excerpt: 'Learn how to create content that ranks well in search engines and provides value to your audience.',
  content: `
    <h2>The Importance of Content SEO</h2>
    <p>Content is the foundation of SEO. Creating high-quality, search-friendly content is essential for attracting organic traffic and engaging your audience.</p>

    <h2>Content SEO Best Practices</h2>

    <h3>1. Keyword Research</h3>
    <p>Start with thorough keyword research to understand what your audience is searching for.</p>

    <h3>2. User Intent</h3>
    <p>Create content that matches user intent and provides real value to your readers.</p>

    <h3>3. Content Structure</h3>
    <p>Use proper heading hierarchy, bullet points, and formatting to improve readability.</p>

    <h2>Measuring Content Performance</h2>
    <p>Track these metrics to evaluate your content SEO:</p>
    <ul>
      <li>Organic traffic</li>
      <li>Keyword rankings</li>
      <li>Engagement metrics</li>
      <li>Social shares</li>
      <li>Backlinks earned</li>
    </ul>

    <h2>Conclusion</h2>
    <p>Great content SEO combines creativity with strategy. By understanding your audience, researching keywords, and following best practices, you can create content that ranks well and provides real value.</p>
  `,
  date: 'February 15, 2025',
  readTime: '11 min read',
  category: 'Content SEO',
  author: 'Alex Morgan',
  authorRole: 'Content Strategy Director',
  featured: false,
  image: '/blog/content-seo.jpg',
  tags: ['Content', 'SEO Writing', 'User Experience'],
  views: '2.7k',
  likes: 189
}

export default function ContentSEOContentPage() {
  return <BlogPostClient post={post} />
}