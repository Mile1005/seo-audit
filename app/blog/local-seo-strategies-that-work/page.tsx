import { Metadata } from 'next'
import { generateSEOMeta } from '@/lib/seo'
import BlogPostClient from '../[slug]/blog-post-client'

export const metadata: Metadata = generateSEOMeta({
  title: 'Local SEO Strategies That Work | AI SEO Turbo Blog',
  description: 'Boost your local search rankings with these proven strategies for local businesses and service providers.',
  canonical: 'https://www.aiseoturbo.com/blog/local-seo-strategies-that-work',
  ogType: 'article',
  keywords: ['Local SEO', 'Local Search', 'Business', 'Optimization']
})

const post = {
  id: '5',
  slug: 'local-seo-strategies-that-work',
  title: 'Local SEO Strategies That Work',
  excerpt: 'Boost your local search rankings with these proven strategies for local businesses and service providers.',
  content: `
    <h2>Why Local SEO Matters</h2>
    <p>Local SEO is essential for businesses serving specific geographic areas. With 46% of all Google searches looking for local information, optimizing for local search can significantly impact your business growth.</p>

    <h2>Core Local SEO Strategies</h2>

    <h3>1. Google Business Profile Optimization</h3>
    <p>Your Google Business Profile (formerly Google My Business) is crucial for local SEO.</p>

    <h3>2. Local Citations</h3>
    <p>Ensure your NAP (Name, Address, Phone) is consistent across the web.</p>

    <h3>3. Local Content Creation</h3>
    <p>Create content that resonates with your local audience.</p>

    <h2>Conclusion</h2>
    <p>Local SEO requires consistent effort and attention to detail. By implementing these strategies, you can improve your local search visibility and drive more qualified traffic to your business.</p>
  `,
  date: 'February 15, 2025',
  readTime: '11 min read',
  category: 'Local SEO',
  author: 'Jennifer Liu',
  authorRole: 'Local SEO Specialist',
  featured: false,
  image: '/blog/local-seo.jpg',
  tags: ['Local SEO', 'Business', 'Google My Business'],
  views: '1.9k',
  likes: 76
}

export default function LocalSEOStrategiesPage() {
  return <BlogPostClient post={post} />
}