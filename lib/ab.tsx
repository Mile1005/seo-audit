"use client"

import React, { createContext, useContext, useMemo, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface VariantConfig {
  id: string
  variants: string[]
  weights?: number[]
}

interface VariantContextValue {
  getVariant: (testId: string) => string
  isVariant: (testId: string, variant: string) => boolean
}

// A/B test configurations
const AB_TESTS: Record<string, VariantConfig> = {
  hero_headline: {
    id: 'hero_headline',
    variants: ['control', 'ai_powered', 'results_focused'],
    weights: [0.33, 0.33, 0.34]
  },
  cta_text: {
    id: 'cta_text', 
    variants: ['control', 'urgent', 'benefit_focused'],
    weights: [0.33, 0.33, 0.34]
  },
  pricing_display: {
    id: 'pricing_display',
    variants: ['monthly', 'annual_discount'],
    weights: [0.5, 0.5]
  }
}

const VariantContext = createContext<VariantContextValue | null>(null)

/**
 * Stable hash function for consistent bucketing
 * Uses a simple string hash to ensure users see consistent variants
 */
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

/**
 * Get user identifier for bucketing
 * Uses pathname + user agent as identifier for consistent experience
 */
function getUserId(): string {
  if (typeof window === 'undefined') return 'ssr'
  
  // Use combination of user agent and localStorage ID for stable bucketing
  let userId = localStorage.getItem('ab_user_id')
  if (!userId) {
    userId = Math.random().toString(36).substring(2, 15)
    localStorage.setItem('ab_user_id', userId)
  }
  
  return userId
}

/**
 * Determine which variant a user should see
 */
function getVariantForTest(testId: string, pathname: string): string {
  const config = AB_TESTS[testId]
  if (!config) return 'control'

  const userId = getUserId()
  const bucketKey = `${testId}_${userId}_${pathname}`
  const hash = hashString(bucketKey)
  const bucket = hash % 100 / 100 // Convert to 0-1 range

  // Use weights to determine variant
  const weights = config.weights || config.variants.map(() => 1 / config.variants.length)
  let cumulativeWeight = 0

  for (let i = 0; i < config.variants.length; i++) {
    cumulativeWeight += weights[i]
    if (bucket <= cumulativeWeight) {
      return config.variants[i]
    }
  }

  return config.variants[0] // Fallback to first variant
}

interface VariantProviderProps {
  children: ReactNode
}

/**
 * Provider component that handles A/B test bucketing
 */
export function VariantProvider({ children }: VariantProviderProps) {
  const pathname = usePathname()

  const contextValue = useMemo(() => {
    const getVariant = (testId: string): string => {
      // Always return control during SSR and initial client render to prevent hydration mismatch
      if (typeof window === 'undefined') return 'control'
      return 'control' // Temporarily disable A/B testing to fix hydration
    }

    const isVariant = (testId: string, variant: string): boolean => {
      return getVariant(testId) === variant
    }

    return { getVariant, isVariant }
  }, [])

  return (
    <VariantContext.Provider value={contextValue}>
      {children}
    </VariantContext.Provider>
  )
}

/**
 * Hook to get the current variant for a test
 */
export function useVariant(testId: string): string {
  const context = useContext(VariantContext)
  if (!context) {
    throw new Error('useVariant must be used within a VariantProvider')
  }
  return context.getVariant(testId)
}

/**
 * Hook to check if user is in a specific variant
 */
export function useIsVariant(testId: string, variant: string): boolean {
  const context = useContext(VariantContext)
  if (!context) {
    throw new Error('useIsVariant must be used within a VariantProvider')
  }
  return context.isVariant(testId, variant)
}

/**
 * Get all available A/B tests
 */
export function getAvailableTests(): string[] {
  return Object.keys(AB_TESTS)
}

/**
 * Get test configuration
 */
export function getTestConfig(testId: string): VariantConfig | null {
  return AB_TESTS[testId] || null
}
