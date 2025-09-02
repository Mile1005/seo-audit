"use client"

import { useState, useEffect, useRef, ReactNode } from 'react'

interface MobileOptimizedLoaderProps {
  children: ReactNode
  fallback?: ReactNode
  threshold?: number
  rootMargin?: string
  mobileOnly?: boolean
  priority?: 'high' | 'medium' | 'low'
}

export function MobileOptimizedLoader({
  children,
  fallback = <div className="h-32 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />,
  threshold = 0.1,
  rootMargin = "50px",
  mobileOnly = false,
  priority = 'medium'
}: MobileOptimizedLoaderProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if mobile and should apply mobile optimizations
    const isMobile = window.innerWidth < 768
    
    if (mobileOnly && !isMobile) {
      setShouldLoad(true)
      return
    }

    // For high priority items on mobile, load immediately
    if (isMobile && priority === 'high') {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          
          // For mobile, add a small delay for low priority items to reduce main thread blocking
          if (isMobile && priority === 'low') {
            setTimeout(() => setShouldLoad(true), 100)
          } else {
            setShouldLoad(true)
          }
          
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin, mobileOnly, priority])

  return (
    <div ref={ref}>
      {shouldLoad ? children : fallback}
    </div>
  )
}

// Mobile-specific component wrapper for better performance
export function MobilePerformanceWrapper({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    // Delay mounting of non-critical components on mobile
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      const timer = setTimeout(() => setIsMounted(true), 150)
      return () => clearTimeout(timer)
    } else {
      setIsMounted(true)
    }
  }, [])

  if (!isMounted) {
    return <div className="h-8" />
  }

  return <>{children}</>
}
