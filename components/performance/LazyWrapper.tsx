'use client'

import { useEffect, useRef, useState } from 'react'

interface LazyWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  rootMargin?: string
  threshold?: number
}

export function LazyWrapper({ 
  children, 
  fallback = null, 
  rootMargin = '100px',
  threshold = 0.1 
}: LazyWrapperProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold
      }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [rootMargin, threshold])

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  )
}
