import { Metadata } from 'next'
import { generateSEOMeta } from '@/lib/seo'
import BlogPostClient from '../[slug]/blog-post-client'

export const metadata: Metadata = generateSEOMeta({
  title: 'Technical SEO Best Practices 2025 | AI SEO Turbo Blog',
  description: 'Stay ahead of the curve with the latest technical SEO best practices for 2025.',
  canonical: 'https://www.aiseoturbo.com/blog/technical-seo-best-practices-2025',
  ogType: 'article',
  keywords: ['Technical SEO', 'Best Practices', '2025', 'Optimization']
})

const post = {
  id: '4',
  slug: 'technical-seo-best-practices-2025',
  title: 'Technical SEO Best Practices for 2025',
  excerpt: 'Stay ahead of the curve with the latest technical SEO best practices for 2025.',
  content: `
    <h2>The Evolution of Technical SEO</h2>
    <p>Technical SEO continues to evolve as search engines become more sophisticated. In 2025, the focus is on user experience, performance, and machine readability.</p>

    <h2>Key Technical SEO Practices</h2>

    <h3>1. Site Speed Optimization</h3>
    <p>Page speed remains a critical ranking factor. Focus on Core Web Vitals and overall performance.</p>

    <h3>2. Mobile-First Indexing</h3>
    <p>Ensure your website is fully optimized for mobile devices and provides an excellent mobile experience.</p>

    <h3>3. Structured Data Implementation</h3>
    <p>Use schema markup to help search engines understand your content better.</p>

    <h2>Conclusion</h2>
    <p>Technical SEO is the foundation of any successful SEO strategy. Regular audits and optimization are essential for maintaining and improving search rankings.</p>
  `,
  date: 'February 20, 2025',
  readTime: '9 min read',
  category: 'Technical SEO',
  author: 'Sarah Johnson',
  authorRole: 'Senior SEO Strategist',
  featured: false,
  image: '/blog/technical-seo.jpg',
  tags: ['Technical SEO', 'Best Practices', '2025'],
  views: '2.1k',
  likes: 98
}

export default function TechnicalSEO2025Page() {
  return <BlogPostClient post={post} />
}