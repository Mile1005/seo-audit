'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // Reset loading state on route change
    setIsLoading(true)
    
    // Simulate component loading then fade in
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 150) // Quick fade-in

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div className={`page-transition ${!isLoading ? 'loaded' : ''}`}>
      {children}
    </div>
  )
}

export function ComponentLoader({ children, delay = 100 }: { 
  children: React.ReactNode 
  delay?: number 
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  if (!isLoaded) {
    return (
      <div className="component-loading">
        <div className="animate-pulse">
          <div className="h-20 bg-muted rounded-md"></div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
