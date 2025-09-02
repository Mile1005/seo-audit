"use client";

import dynamic from 'next/dynamic'

// Dynamically import the content to prevent lambda tracing issues
const SEOAuditContent = dynamic(() => import('./seo-audit-content'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading SEO Audit Tool</h2>
        <p className="text-gray-600">Preparing your advanced SEO analysis tool...</p>
      </div>
    </div>
  )
})

export default function SEOAuditPage() {
  return <SEOAuditContent />
}
