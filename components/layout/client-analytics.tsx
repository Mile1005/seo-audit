"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initAnalytics, pageview } from '@/lib/analytics'

export function ClientAnalytics() {
  const pathname = usePathname()

  // Initialize analytics on mount
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      initAnalytics(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID)
    }
  }, [])

  // Track page views on route changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      pageview({
        page_path: pathname || '/',
        page_title: document.title,
        page_location: window.location.href
      })
    }
  }, [pathname])

  return null
}
