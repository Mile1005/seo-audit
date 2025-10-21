"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { pageview } from '@/lib/analytics'

export function ClientAnalytics() {
  const pathname = usePathname()

  // Track page views on route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      pageview({
        page_path: pathname || '/',
        page_title: document.title,
        page_location: window.location.href
      })
    }
  }, [pathname])

  return null
}
