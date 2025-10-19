"use client";

import dynamic from 'next/dynamic'

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
  return <SiteCrawlerContent />
}
