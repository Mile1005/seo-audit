import { Metadata } from 'next'
import { generateSEOMeta } from '@/lib/seo'
import BlogPostClient from '../[slug]/blog-post-client'

export const metadata: Metadata = generateSEOMeta({
  title: 'Complete SEO Audit Checklist for 2025 | AI SEO Turbo Blog',
  description: 'A comprehensive 47-point checklist to audit your website for SEO issues and opportunities. Used by 1000+ websites to increase organic traffic.',
  canonical: 'https://www.aiseoturbo.com/blog/complete-seo-audit-checklist-2025',
  ogType: 'article',
  keywords: ['SEO', 'Audit', 'Technical', 'Checklist', '2025']
})

const post = {
  id: '1',
  slug: 'complete-seo-audit-checklist-2025',
  title: 'Complete SEO Audit Checklist for 2025',
  excerpt: 'A comprehensive 47-point checklist to audit your website for SEO issues and opportunities. Used by 1000+ websites to increase organic traffic.',
  content: `
    <h2>Introduction</h2>
    <p>In 2025, SEO audits have become more sophisticated than ever. With the rise of AI-powered search algorithms and Core Web Vitals, it's crucial to have a comprehensive checklist to ensure your website is optimized for maximum visibility.</p>
    
    <h2>Why SEO Audits Matter</h2>
    <p>Regular SEO audits help you:</p>
    <ul>
      <li>Identify technical issues that may be hurting your rankings</li>
      <li>Discover new keyword opportunities</li>
      <li>Stay ahead of algorithm updates</li>
      <li>Improve user experience and conversion rates</li>
      <li>Monitor your competitors' strategies</li>
    </ul>

    <h2>The 47-Point SEO Audit Checklist</h2>
    
    <h3>1. Technical SEO (15 Points)</h3>
    <ul>
      <li>Check site speed and Core Web Vitals</li>
      <li>Verify mobile responsiveness</li>
      <li>Ensure proper SSL implementation</li>
      <li>Review XML sitemap</li>
      <li>Check robots.txt configuration</li>
      <li>Analyze internal linking structure</li>
      <li>Identify and fix broken links</li>
      <li>Review canonical tags</li>
      <li>Check for duplicate content</li>
      <li>Verify structured data implementation</li>
      <li>Test site architecture and crawlability</li>
      <li>Review URL structure</li>
      <li>Check for redirect chains</li>
      <li>Analyze server response codes</li>
      <li>Review JavaScript rendering</li>
    </ul>

    <h3>2. On-Page SEO (12 Points)</h3>
    <ul>
      <li>Optimize title tags</li>
      <li>Improve meta descriptions</li>
      <li>Use proper header hierarchy (H1-H6)</li>
      <li>Optimize images (alt text, compression)</li>
      <li>Improve content quality and relevance</li>
      <li>Check keyword optimization</li>
      <li>Review internal linking</li>
      <li>Optimize URL slugs</li>
      <li>Add schema markup</li>
      <li>Improve readability scores</li>
      <li>Check content freshness</li>
      <li>Optimize for featured snippets</li>
    </ul>

    <h3>3. Content Audit (10 Points)</h3>
    <ul>
      <li>Analyze content performance</li>
      <li>Identify thin content</li>
      <li>Find content gaps</li>
      <li>Review content structure</li>
      <li>Check for plagiarism</li>
      <li>Analyze user engagement metrics</li>
      <li>Review multimedia usage</li>
      <li>Check content accuracy</li>
      <li>Evaluate content uniqueness</li>
      <li>Assess content depth</li>
    </ul>

    <h3>4. Off-Page SEO (10 Points)</h3>
    <ul>
      <li>Analyze backlink profile</li>
      <li>Check for toxic backlinks</li>
      <li>Review domain authority</li>
      <li>Monitor brand mentions</li>
      <li>Assess social signals</li>
      <li>Review local citations</li>
      <li>Check Google My Business optimization</li>
      <li>Analyze competitor backlinks</li>
      <li>Review guest posting opportunities</li>
      <li>Monitor online reputation</li>
    </ul>

    <h2>Conclusion</h2>
    <p>Implementing this 47-point checklist will help you identify and fix SEO issues that could be holding your website back. Regular audits are essential for maintaining and improving your search rankings in 2025's competitive landscape.</p>
    
    <p>Start with the technical aspects, move to on-page optimization, audit your content, and finally review your off-page factors. Remember, SEO is an ongoing process, not a one-time task.</p>
  `,
  date: 'March 15, 2025',
  readTime: '12 min read',
  category: 'Technical SEO',
  author: 'Sarah Johnson',
  authorRole: 'Senior SEO Strategist',
  featured: true,
  image: '/blog/seo-audit-checklist.jpg',
  tags: ['SEO', 'Audit', 'Technical', 'Checklist'],
  views: '2.4k',
  likes: 156
}

export default function CompleteSEOAuditChecklistPage() {
  return <BlogPostClient post={post} />
}