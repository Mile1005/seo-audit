"use client"

import React, { ReactNode, useState, useEffect } from "react"
import { handleCTAClick } from "@/lib/cta-utils"
import { useVariant } from '@/lib/ab'
import { track } from '@/lib/analytics'

interface ABSlotProps {
  testId: string
  variants: Record<string, ReactNode>
  trackExposure?: boolean
  className?: string
  dataTestId?: string // For data-testid attribute
}

/**
 * Component that renders different variants based on A/B test bucketing
 */
export function ABSlot({ 
  testId, 
  variants, 
  trackExposure = true, 
  className,
  dataTestId 
}: ABSlotProps) {
  const variant = useVariant(testId)
  const [isHydrated, setIsHydrated] = useState(false)
  
  // Fix hydration mismatch by waiting for client-side hydration
  useEffect(() => {
    setIsHydrated(true)
  }, [])
  
  // Track exposure to this variant
  React.useEffect(() => {
    if (trackExposure && typeof window !== 'undefined' && isHydrated) {
      track('ab_exposure', {
        test_id: testId,
        variant: variant,
        timestamp: Date.now()
      })
    }
  }, [testId, variant, trackExposure, isHydrated])

  // Always render control variant during SSR to prevent hydration mismatch
  const displayVariant = isHydrated ? variant : 'control'
  const content = variants[displayVariant] || variants.control || Object.values(variants)[0]

  return (
    <div 
      className={className}
      data-testid={dataTestId || `ab-${testId}-${displayVariant}`}
      data-ab-test={testId}
      data-ab-variant={displayVariant}
    >
      {content}
    </div>
  )
}

/**
 * Hero headline variants for A/B testing
 */
export function HeroHeadlineAB() {
  return (
    <ABSlot
      testId="hero_headline"
      trackExposure={true}
      dataTestId="hero-headline"
      variants={{
        control: (
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Professional
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> SEO Audits </span>
            Made Simple
          </h1>
        ),
        ai_powered: (
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI-Powered </span>
            SEO Audits That
            <span className="block">Drive Real Results</span>
          </h1>
        ),
        results_focused: (
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Get More Traffic with
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Expert SEO </span>
            <span className="block">Recommendations</span>
          </h1>
        )
      }}
    />
  )
}

/**
 * CTA button text variants for A/B testing
 */
export function CTATextAB({ 
  baseClassName = "",
  onClick,
  size = "default" 
}: { 
  baseClassName?: string
  onClick?: () => void
  size?: "default" | "large"
}) {
  const buttonClasses = `
    ${baseClassName}
    ${size === "large" ? "px-8 py-4 text-lg" : "px-6 py-3 text-base"}
    bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl
    hover:from-purple-700 hover:to-purple-800 transform hover:scale-105
    transition-all duration-200 font-semibold shadow-lg hover:shadow-xl
  `.trim()

  const handleClick = (e: React.MouseEvent, variant: string) => {
    e.preventDefault()
    // Call the provided onClick for analytics tracking
    if (onClick) onClick()
    // Navigate to the audit page
    handleCTAClick('START_AUDIT', `CTA Variant: ${variant}`, 'hero')
  }

  return (
    <ABSlot
      testId="cta_text"
      trackExposure={true}
      dataTestId="cta-button"
      variants={{
        control: (
          <a
            href="/dashboard"
            className={buttonClasses}
            onClick={(e) => handleClick(e, 'control')}
            data-event="cta_click"
            data-cta-variant="control"
          >
            Start Free Audit
          </a>
        ),
        urgent: (
          <a
            href="/dashboard"
            className={buttonClasses}
            onClick={(e) => handleClick(e, 'urgent')}
            data-event="cta_click"
            data-cta-variant="urgent"
          >
            Get Instant SEO Report →
          </a>
        ),
        benefit_focused: (
          <a
            href="/dashboard"
            className={buttonClasses}
            onClick={(e) => handleClick(e, 'benefit_focused')}
            data-event="cta_click"
            data-cta-variant="benefit_focused"
          >
            Boost Your Rankings Now
          </a>
        )
      }}
    />
  )
}

/**
 * Pricing display variants
 */
export function PricingDisplayAB() {
  return (
    <ABSlot
      testId="pricing_display"
      trackExposure={true}
      dataTestId="pricing-display"
      variants={{
        monthly: (
          <div className="text-center">
            <div className="text-5xl font-bold text-white">$49</div>
            <div className="text-lg text-gray-400">/month</div>
            <div className="text-sm text-gray-500 mt-1">Billed monthly</div>
          </div>
        ),
        annual_discount: (
          <div className="text-center">
            <div className="text-lg text-purple-400 mb-1">Save 20%</div>
            <div className="text-5xl font-bold text-white">$39</div>
            <div className="text-lg text-gray-400">/month</div>
            <div className="text-sm text-gray-500 mt-1">
              <span className="line-through">$49/month</span> • Billed annually
            </div>
          </div>
        )
      }}
    />
  )
}
