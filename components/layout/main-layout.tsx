"use client"

import React, { useEffect } from "react"
import { AdaptiveNavigation } from "@/components/navigation/adaptive-navigation"
import Footer from "@/components/layout/Footer"
import { VariantProvider } from '@/lib/ab'
import { initAnalytics, pageview } from '@/lib/analytics'
import { usePathname } from 'next/navigation'

export interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

export function MainLayout({ children, className = "" }: MainLayoutProps) {
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

  return (
    <VariantProvider>
      <div className={`min-h-screen bg-slate-950 ${className}`}>
        {/* Navigation */}
        <AdaptiveNavigation />
        
        {/* Main Content with top padding for fixed nav */}
        <main className="pt-16">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </VariantProvider>
  )
}
