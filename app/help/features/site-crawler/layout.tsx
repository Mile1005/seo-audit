import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Site Crawler Guide - Index Website Pages | AI SEO Turbo',
  description: 'Configure and use the site crawler in AI SEO Turbo. Learn to crawl websites, discover pages, analyze site structure, and identify indexing issues.',
  keywords: ['site crawler', 'website crawling', 'page discovery', 'site structure', 'indexing issues', 'crawl configuration', 'SEO crawler'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/features/site-crawler'
  },
  openGraph: {
    title: 'Site Crawler Guide - Index Website Pages | AI SEO Turbo',
    description: 'Configure and use the site crawler in AI SEO Turbo. Learn to crawl websites, discover pages, analyze site structure, and identify indexing issues.',
    url: 'https://www.aiseoturbo.com/help/features/site-crawler',
    type: 'article',
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Site Crawler Guide - Index Website Pages | AI SEO Turbo',
    description: 'Configure and use the site crawler in AI SEO Turbo. Learn to crawl websites, discover pages, analyze site structure, and identify indexing issues.',
  }
}

export default function SiteCrawlerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}