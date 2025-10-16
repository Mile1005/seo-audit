"use client";

import dynamic from 'next/dynamic'

// Dynamically import the content to prevent lambda tracing issues
const SiteCrawlerContent = dynamic(() => import('./site-crawler-content'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading Site Crawler</h2>
        <p className="text-gray-600">Preparing your website crawling tool...</p>
      </div>
    </div>
  )
})

export default function SiteCrawlerPage() {
  return <SiteCrawlerContent />
}
