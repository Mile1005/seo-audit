import { Metadata } from 'next'
import { generateSEOMeta } from '@/lib/seo'
import BlogPostClient from '../[slug]/blog-post-client'

export const metadata: Metadata = generateSEOMeta({
  title: 'Core Web Vitals Optimization Guide | AI SEO Turbo Blog',
  description: 'Master Google Core Web Vitals with our step-by-step guide to improve page speed and user experience.',
  canonical: 'https://www.aiseoturbo.com/blog/core-web-vitals-optimization-guide',
  ogType: 'article',
  keywords: ['Core Web Vitals', 'Page Speed', 'SEO', 'Performance']
})

const post = {
  id: '3',
  slug: 'core-web-vitals-optimization-guide',
  title: 'Core Web Vitals Optimization Guide',
  excerpt: 'Master Google Core Web Vitals with our step-by-step guide to improve page speed and user experience.',
  content: `
    <h2>Understanding Core Web Vitals</h2>
    <p>Core Web Vitals are a set of metrics that Google uses to measure user experience on your website. They focus on three key aspects: loading performance, interactivity, and visual stability.</p>

    <h2>The Three Core Web Vitals</h2>

    <h3>1. Largest Contentful Paint (LCP)</h3>
    <p>LCP measures loading performance. To provide a good user experience, LCP should occur within 2.5 seconds of when the page first starts loading.</p>

    <h3>2. First Input Delay (FID)</h3>
    <p>FID measures interactivity. To provide a good user experience, pages should have an FID of 100 milliseconds or less.</p>

    <h3>3. Cumulative Layout Shift (CLS)</h3>
    <p>CLS measures visual stability. To provide a good user experience, pages should maintain a CLS of 0.1 or less.</p>

    <h2>Conclusion</h2>
    <p>Optimizing Core Web Vitals is essential for both user experience and SEO rankings. Regular monitoring and improvement of these metrics will help your website perform better in search results.</p>
  `,
  date: 'February 28, 2025',
  readTime: '10 min read',
  category: 'Technical SEO',
  author: 'Alex Rivera',
  authorRole: 'Performance Optimization Expert',
  featured: false,
  image: '/blog/core-web-vitals.jpg',
  tags: ['Core Web Vitals', 'Performance', 'SEO', 'Technical'],
  views: '3.2k',
  likes: 145
}

export default function CoreWebVitalsPage() {
  return <BlogPostClient post={post} />
}