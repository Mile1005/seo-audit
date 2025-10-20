"use client";

import dynamic from 'next/dynamic'
import { StructuredData, generateFeatureSchema, generateFAQSchema } from '../../../components/seo/StructuredData'

// Dynamically import the content to prevent lambda tracing issues
const SiteCrawlerContent = dynamic(() => import('./site-crawler-content'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-slate-950">
      <div className="text-center">
        <h1 className="sr-only">Comprehensive Site Crawling & Analysis Tool</h1>
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 dark:border-cyan-500 mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-foreground dark:text-white mb-4">Loading Site Crawler</h2>
        <p className="text-muted-foreground dark:text-gray-400">Preparing your website crawling tool...</p>
      </div>
    </div>
  )
})

export default function SiteCrawlerPage() {
  const featureSchema = generateFeatureSchema({
    name: "Advanced Site Crawler",
    description: "Powerful website crawler that discovers all pages, analyzes site structure, identifies broken links, and maps your entire website architecture for comprehensive SEO analysis.",
    url: "https://www.aiseoturbo.com/features/site-crawler",
    features: [
      "Comprehensive Site Crawling",
      "Broken Link Detection",
      "Redirect Chain Analysis",
      "XML Sitemap Generation",
      "Site Architecture Mapping",
      "URL Structure Analysis",
      "Internal Linking Analysis",
      "Crawl Budget Optimization",
      "Duplicate Content Detection",
      "Robots.txt Validation"
    ],
    category: "Site Crawling"
  });

  const faqSchema = generateFAQSchema([
    {
      question: "How many pages can the crawler analyze?",
      answer: "The number of pages depends on your plan. Starter allows up to 100 pages, Professional up to 10,000 pages, and Enterprise offers unlimited crawling."
    },
    {
      question: "How long does a site crawl take?",
      answer: "Crawl speed depends on site size and complexity. A typical 100-page site takes 2-3 minutes, while larger sites may take 10-30 minutes."
    },
    {
      question: "Will crawling affect my website performance?",
      answer: "No. Our crawler is designed to be respectful and follows your robots.txt file. We use intelligent rate-limiting to avoid overwhelming your server."
    },
    {
      question: "Can I schedule automatic crawls?",
      answer: "Yes! Professional and Enterprise plans include scheduled crawls so you can monitor your site regularly without manual intervention."
    },
    {
      question: "What types of issues does the crawler detect?",
      answer: "The crawler detects broken links (404s), redirect chains, duplicate content, missing meta tags, orphaned pages, slow-loading pages, and much more."
    }
  ]);

  return (
    <>
      <StructuredData data={featureSchema} />
      <StructuredData data={faqSchema} />
      <SiteCrawlerContent />
    </>
  );
}