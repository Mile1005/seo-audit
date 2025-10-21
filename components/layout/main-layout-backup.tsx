"use client"

import React, { useEffect } from "react"
import { AdaptiveNavigation } from "@/components/navigation/adaptive-navigation"
import Footer from "@/components/layout/Footer"
import { VariantProvider } from '@/lib/ab'
import { pageview } from '@/lib/analytics'
import { usePathname } from 'next/navigation'

export interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

export function MainLayout({ children, className = "" }: MainLayoutProps) {
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

  return (
    <VariantProvider>
      <div className={`min-h-screen bg-slate-950 ${className}`}>
        {/* Screen reader announcements region */}
        <div 
          id="announcements" 
          aria-live="polite" 
          aria-atomic="true" 
          className="sr-only"
        ></div>
        
        {/* Navigation */}
        <AdaptiveNavigation />
        
        {/* Main Content with top padding for fixed nav */}
        <main id="main-content" className="pt-16" tabIndex={-1} role="main">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </VariantProvider>
  )
}
