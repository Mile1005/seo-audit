/**
 * LCP Optimization Implementation Steps
 * 
 * This document provides step-by-step code changes to implement LCP optimization.
 * Follow Phase 1 first for maximum impact with minimum effort.
 */

// ============================================================================
// PHASE 1: IMMEDIATE LCP IMPROVEMENTS (1-2 hours)
// ============================================================================

/**
 * STEP 1: Update app/layout.tsx - Add Preload + Critical CSS
 * 
 * LOCATION: app/layout.tsx - In the <head> section, around line 232
 */

export const PHASE_1_STEP_1_PRELOAD_CRITICAL_CSS = `
<head>
  <link rel="manifest" href="/manifest.json" />
  
  {/* LCP OPTIMIZATION: Resource hints for critical 3rd-party resources only */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  
  {/* Favicon and Touch Icons */}
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="32x32" />
  
  {/* LCP OPTIMIZATION: Preload hero images */}
  <link 
    rel="preload" 
    as="image" 
    href="/images/hero/hero-mobile-portrait.webp"
    media="(max-width: 1024px)"
    fetchpriority="high"
    type="image/webp"
  />
  <link 
    rel="preload" 
    as="image"
    href="/images/hero/hero-mobile-portrait.jpg"
    media="(max-width: 1024px)"
    fetchpriority="high"
  />
  <link 
    rel="preload" 
    as="image" 
    href="/images/hero/hero-desktop-landscape.webp"
    media="(min-width: 1025px)"
    fetchpriority="high"
    type="image/webp"
  />
  
  {/* LCP OPTIMIZATION: Critical CSS - Hero section only */}
  <style dangerouslySetInnerHTML={{
    __html: \`
      /* Critical Hero Styles - ~2.8KB - Load immediately */
      *,*::before,*::after { box-sizing: border-box; }
      * { margin: 0; }
      html,body { height: 100%; }
      
      body {
        font-family: var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
      }
      
      /* Hero Section Container */
      .hero-section {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        overflow: hidden;
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
      }
      
      .hero-section h1 {
        font-size: clamp(1.5rem, 5vw, 3.5rem);
        font-weight: 700;
        line-height: 1.2;
        color: #ffffff;
        margin: 0;
      }
      
      .hero-section p {
        font-size: clamp(1rem, 3vw, 1.25rem);
        color: #cbd5e1;
        line-height: 1.6;
        margin-top: 1rem;
      }
      
      .hero-cta {
        display: inline-block;
        margin-top: 1.5rem;
        padding: 0.75rem 1.5rem;
        background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        text-decoration: none;
        transition: transform 0.2s ease;
      }
      
      .hero-background { position: absolute; inset: 0; pointer-events: none; }
      
      /* Mobile optimizations */
      @media (max-width: 1023px) {
        .desktop-only { display: none !important; }
        .hero-floating-shapes { display: none !important; }
      }
      
      @media (min-width: 1024px) {
        .mobile-only { display: none !important; }
      }
    \`
  }} />
  
  {/* LCP OPTIMIZATION: Defer non-critical CSS */}
  <link
    rel="preload"
    as="style"
    href="/css/non-critical.css"
    onLoad="this.onload=null;this.rel='stylesheet'"
  />
  <noscript>
    <link rel="stylesheet" href="/css/non-critical.css" />
  </noscript>
</head>
`;

/**
 * STEP 2: Update components/hero/hero-section.tsx - Disable animations on mobile
 * 
 * KEY CHANGES:
 * - Import useIsMobile hook
 * - Disable Framer Motion animations on mobile
 * - Don't render desktop mockup on mobile view
 * 
 * LOCATION: components/hero/hero-section.tsx - Replace entire component
 */

export const PHASE_1_STEP_2_OPTIMIZED_HERO_SECTION = `
"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Play, Zap, Clock, Users } from "lucide-react"
import { useIsMobile } from "@/hooks/use-is-mobile"
import { DesktopHeroMockup } from "./desktop-hero-mockup"
import { HeroHeadlineAB, CTATextAB } from "@/components/ab/ab-slot"
import { trackCTA, trackDemo } from "@/lib/analytics"
import { handleCTAClick } from "@/lib/cta-utils"

export function HeroSection() {
  const isMobile = useIsMobile()
  
  // LCP OPTIMIZATION: Disable animations on mobile for faster paint
  const containerVariants = isMobile ? {} : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = isMobile ? {} : {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  const floatingShapeVariants = isMobile ? {} : {
    floating: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  }

  return (
    <section 
      data-testid="hero-section"
      className="hero-section"
    >
      {/* LCP OPTIMIZATION: Skip expensive background animations on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 hero-background">
          {/* Gradient Orbs - Only on desktop */}
          <motion.div
            variants={floatingShapeVariants}
            animate="floating"
            className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
            style={{ animationDelay: "0s" }}
          />
          <motion.div
            variants={floatingShapeVariants}
            animate="floating"
            className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl"
            style={{ animationDelay: "1.5s" }}
          />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>
      )}

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content Column - Always renders */}
          <div className="space-y-8">
            {/* Headline */}
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full px-4 py-2 text-sm"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-300">AI-Powered SEO Analysis</span>
              </motion.div>

              <HeroHeadlineAB />
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl"
            >
              Get actionable insights that <span className="text-cyan-400 font-semibold">boost your rankings</span> and 
              <span className="text-cyan-400 font-semibold"> drive organic traffic</span>. 
              Join 1,000+ marketers who trust our AI-powered audits to identify critical SEO issues in minutes.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <CTATextAB 
                size="large"
                onClick={() => trackCTA('Start Free Audit', 'hero')}
              />

              <motion.a
                href="/demo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 backdrop-blur-sm flex items-center justify-center space-x-2"
                onClick={(e) => {
                  e.preventDefault()
                  trackDemo('view_demo', 'hero')
                  handleCTAClick('/demo', 'See Live Demo', 'hero')
                }}
              >
                <Play className="w-5 h-5" />
                <span>See Live Demo</span>
              </motion.a>
            </motion.div>

            {/* KPI Counters */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10"
            >
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span className="text-2xl lg:text-3xl font-bold text-white">47+</span>
                </div>
                <p className="text-gray-400 text-sm">SEO Checks</p>
              </div>

              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <span className="text-2xl lg:text-3xl font-bold text-white">3m</span>
                </div>
                <p className="text-gray-400 text-sm">Avg Audit Time</p>
              </div>

              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <span className="text-2xl lg:text-3xl font-bold text-white">1,000+</span>
                </div>
                <p className="text-gray-400 text-sm">Marketers</p>
              </div>
            </motion.div>
          </div>

          {/* LCP OPTIMIZATION: Only render desktop mockup on lg+ screens */}
          {!isMobile && (
            <motion.div
              variants={itemVariants}
              className="hidden lg:block"
            >
              <DesktopHeroMockup />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
`;

/**
 * STEP 3: Create the mobile detection hook
 * 
 * LOCATION: hooks/use-is-mobile.ts
 * This file already created in previous step
 */

export const PHASE_1_STEP_3_MOBILE_HOOK = `
'use client'

import { useEffect, useState } from 'react'

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkIfMobile()

    const handleResize = () => {
      checkIfMobile()
    }

    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isHydrated && isMobile
}
`;

// ============================================================================
// PHASE 2: IMAGE OPTIMIZATION (Next Steps)
// ============================================================================

export const PHASE_2_IMAGE_OPTIMIZATION = `
STEP 1: Create optimized hero images
- hero-mobile-portrait.webp (375px × 600px, <40KB)
- hero-mobile-portrait.jpg (fallback, <50KB)
- hero-desktop-landscape.webp (1200px × 750px, <80KB)
- hero-desktop-landscape.jpg (fallback, <100KB)

Use tools like:
- ImageOptim (Mac)
- XnConvert (Windows/Linux)
- TinyPNG.com (online)
- ffmpeg (WebP conversion)

STEP 2: Update components/ui/optimized-image.tsx
Add mobile-specific quality settings:

interface OptimizedImageProps {
  mobileQuality?: number  // Default: 60 for mobile
  desktopQuality?: number // Default: 85 for desktop
  responsiveSizes?: boolean
}

STEP 3: Preload images in app/layout.tsx (done in Phase 1)
`;

// ============================================================================
// PHASE 3: CSS DEFERRAL
// ============================================================================

export const PHASE_3_CSS_DEFERRAL = `
STEP 1: Create public/css/non-critical.css

This file should contain:
- All Tailwind utility classes except those in critical CSS
- Component styles for below-fold elements
- Theme color utilities
- All animations and transitions

Target size: ~35KB (compressed ~10KB)

STEP 2: Update app/layout.tsx to defer this CSS
Already done in Phase 1 Step 1

STEP 3: Verify critical CSS is small
- Critical CSS: ~2.8KB (uncompressed)
- Gzip: ~1.2KB
- Non-critical CSS: ~40KB (uncompressed)
- Gzip: ~10KB

Check with: DevTools -> Network -> filter by CSS
`;

// ============================================================================
// PERFORMANCE TARGETS
// ============================================================================

export const PERFORMANCE_TARGETS = {
  MOBILE: {
    LCP: "< 2.5s (Good) → Target: < 2.0s",
    FCP: "< 1.5s",
    CLS: "< 0.1",
    TBT: "< 100ms",
    TTFB: "< 200ms"
  },
  DESKTOP: {
    LCP: "< 1.2s (Already good)",
    FCP: "< 0.8s",
    CLS: "< 0.05",
    TBT: "< 50ms",
    TTFB: "< 100ms"
  },
  SIZES: {
    CRITICAL_CSS: "< 3KB",
    CRITICAL_JS: "< 50KB",
    HERO_IMAGE_MOBILE: "< 40KB",
    HERO_IMAGE_DESKTOP: "< 80KB"
  }
};

/**
 * VERIFICATION COMMANDS
 */
export const VERIFICATION_COMMANDS = {
  MOBILE_AUDIT: "npm run mobile:audit",
  LIGHTHOUSE_REPORT: "npm run perf:audit",
  ANALYZE_BUNDLE: "npm run analyze:build",
  TEST_BUILD: "npm run build && npm run mobile:audit"
};

export default {
  PHASE_1_STEP_1_PRELOAD_CRITICAL_CSS,
  PHASE_1_STEP_2_OPTIMIZED_HERO_SECTION,
  PHASE_1_STEP_3_MOBILE_HOOK,
  PHASE_2_IMAGE_OPTIMIZATION,
  PHASE_3_CSS_DEFERRAL,
  PERFORMANCE_TARGETS,
  VERIFICATION_COMMANDS
};
