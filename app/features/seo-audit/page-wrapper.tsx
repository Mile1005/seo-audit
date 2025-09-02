"use client";

import dynamic from 'next/dynamic'

// Dynamically import the main SEO audit component to prevent lambda tracing issues
const SEOAuditFeaturePage = dynamic(() => import('./seo-audit-content'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading SEO Audit Tool...</p>
      </div>
    </div>
  )
})

export default function SEOAuditPage() {
  return <SEOAuditFeaturePage />
}
