"use client";

import dynamic from 'next/dynamic'

// Simple wrapper to prevent lambda tracing issues while preserving your original design
const SEOAuditContent = dynamic(() => import('./seo-audit-original'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-white mb-4">Loading SEO Audit Tool</h2>
        <p className="text-gray-300">Preparing your advanced SEO analysis tool...</p>
      </div>
    </div>
  )
})

export default function SEOAuditPage() {
  return <SEOAuditContent />
}
