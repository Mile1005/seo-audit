'use client'

import { useEffect, useState } from 'react'

/**
 * Hook to detect if the device is mobile
 * Used to conditionally disable heavy animations and features on mobile for better LCP
 * 
 * @returns boolean - true if viewport width < 1024px (Tailwind lg breakpoint)
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Set initial state after hydration to avoid mismatch
    setIsHydrated(true)
    
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    // Initial check
    checkIfMobile()

    // Add resize listener
    const handleResize = () => {
      checkIfMobile()
    }

    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Prevent hydration mismatch - return false until client-side hydration complete
  return isHydrated && isMobile
}
