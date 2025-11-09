/**
 * LCP Optimization Implementation Guide
 * 
 * This file documents the critical optimizations needed to improve
 * Mobile LCP from 5.2s to target 2.8s+ (80+ Lighthouse score)
 */

// ============================================================================
// STEP 1: Create Critical CSS Only - Update app/layout.tsx head section
// ============================================================================

const CRITICAL_HERO_CSS = `
  /* Hero Section - Critical Path Styles (~2.8KB) */
  
  /* Reset critical defaults */
  *,*::before,*::after { box-sizing: border-box; }
  * { margin: 0; }
  html, body { height: 100%; }
  
  /* Typography base */
  body {
    font-family: var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Hero Section - Prevent layout shift */
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
  
  .hero-cta:hover {
    transform: translateY(-2px);
  }
  
  /* Prevent layout shift from animations */
  .hero-background {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  
  /* Mobile-specific rules */
  @media (max-width: 1023px) {
    .desktop-only {
      display: none !important;
    }
    
    /* Simplify hero on mobile */
    .hero-section {
      padding: 2rem 1rem;
    }
    
    .hero-floating-shapes {
      display: none !important;
    }
  }
  
  @media (min-width: 1024px) {
    .mobile-only {
      display: none !important;
    }
  }
`;

// ============================================================================
// STEP 2: Framer Motion Optimization - Update components/hero/hero-section.tsx
// ============================================================================

const HERO_SECTION_OPTIMIZATION = `
"use client"

import React from "react"
import { motion } from "framer-motion"
import { useIsMobile } from '@/hooks/use-is-mobile'
import { DesktopHeroMockup } from "./desktop-hero-mockup"

export function HeroSection() {
  const isMobile = useIsMobile()

  // Disable animations on mobile for faster LCP
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
        repeatType: "loop"
      }
    }
  }

  return (
    <section 
      data-testid="hero-section"
      className="hero-section"
    >
      {/* Background Elements - Skip on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 hero-background">
          {/* Gradient Orbs - Expensive animation, mobile-only skip */}
          <motion.div
            variants={floatingShapeVariants}
            animate="floating"
            className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
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
          {/* Content Column - Always renders on mobile/desktop */}
          <div className="space-y-8">
            {/* Headline */}
            <motion.div variants={itemVariants} className="space-y-4">
              {/* Content here */}
            </motion.div>
          </div>

          {/* Desktop Mockup - Only render on desktop, load below fold on mobile */}
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

// ============================================================================
// STEP 3: Image Preload Strategy - Update app/layout.tsx head
// ============================================================================

const IMAGE_PRELOAD_OPTIMIZATION = `
<head>
  {/* Critical Image Preload - Mobile first (most important) */}
  <link 
    rel="preload" 
    as="image" 
    href="/images/hero/hero-mobile-portrait.webp"
    media="(max-width: 1024px)"
    fetchpriority="high"
    type="image/webp"
  />
  
  {/* WebP Fallback for older browsers */}
  <link 
    rel="preload" 
    as="image"
    href="/images/hero/hero-mobile-portrait.jpg"
    media="(max-width: 1024px)"
    fetchpriority="high"
  />
  
  {/* Desktop image preload */}
  <link 
    rel="preload" 
    as="image" 
    href="/images/hero/hero-desktop-landscape.webp"
    media="(min-width: 1025px)"
    fetchpriority="high"
    type="image/webp"
  />
  
  {/* DNS Prefetch for fonts (only critical fonts) */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
</head>
`;

// ============================================================================
// STEP 4: CSS Deferral Strategy - Create public/css/non-critical.css
// ============================================================================

const NON_CRITICAL_CSS_INSTRUCTIONS = `
INSTRUCTIONS:

1. Create: public/css/non-critical.css
2. Move ALL Tailwind utilities to this file EXCEPT:
   - Layout utilities (grid, flex, display)
   - Typography base (font-size, font-weight, line-height)
   - Color utilities for above-the-fold elements
   - Spacing for hero section

3. Keep in critical CSS (app/layout.tsx <style>):
   - Resets
   - Typography defaults
   - Hero section styles
   - Above-the-fold colors
   
4. Load non-critical CSS with:

<link
  rel="preload"
  as="style"
  href="/css/non-critical.css"
  onLoad="this.onload=null;this.rel='stylesheet'"
/>
<noscript>
  <link rel="stylesheet" href="/css/non-critical.css" />
</noscript>

TARGET: Reduce initial CSS from ~50KB to ~15KB
`;

// ============================================================================
// STEP 5: Defer Heavy JavaScript Modules
// ============================================================================

const DEFER_JAVASCRIPT_STRATEGY = `
In app/page.tsx, ensure all below-the-fold components use dynamic imports:

// CORRECT - Dynamic imports with SSR disabled
const DynamicFeaturesShowcase = dynamic(
  () => import("@/components/dynamic/heavy-components")
    .then(mod => ({ default: mod.DynamicFeaturesShowcase })),
  {
    loading: () => <FeaturesSkeleton />,
    ssr: false  // IMPORTANT: Don't SSR heavy components
  }
)

// Check with:
npm run analyze:build
# Should show minimal unused code, ideally <50KB
`;

// ============================================================================
// STEP 6: Main Thread Work Optimization
// ============================================================================

const MAIN_THREAD_OPTIMIZATION = `
1. For heavy parsing/processing, use Web Worker:

// web/audit-parser.worker.ts
self.onmessage = (event: MessageEvent<any>) => {
  try {
    const results = parseAuditData(event.data)
    self.postMessage({ success: true, data: results })
  } catch (error) {
    self.postMessage({ success: false, error: error.message })
  }
}

2. Load on-demand only:

const parseWorker = new Worker('/web/audit-parser.worker.js')
parseWorker.postMessage(largeAuditData)
parseWorker.onmessage = (e) => {
  if (e.data.success) {
    setResults(e.data.data)
  }
}

3. For analytics, defer to idle time:

if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    loadAnalytics()
  })
} else {
  setTimeout(() => loadAnalytics(), 2000)
}
`;

// ============================================================================
// VERIFICATION CHECKLIST
// ============================================================================

export const LCP_OPTIMIZATION_CHECKLIST = {
  PHASE_1: [
    "✓ Create use-is-mobile hook",
    "✓ Update hero-section.tsx to disable animations on mobile",
    "✓ Create critical hero CSS only (~2.8KB)",
    "✓ Preload hero image with fetchpriority=high",
    "✓ Test with: npm run mobile:audit"
  ],
  
  PHASE_2: [
    "✓ Create WebP/JPG hero images at mobile sizes",
    "✓ Update optimized-image.tsx with mobile quality settings",
    "✓ Verify image loading with DevTools Network tab",
    "✓ Check image sizes: mobile <40KB, desktop <80KB"
  ],
  
  PHASE_3: [
    "✓ Extract non-critical CSS to separate file",
    "✓ Use <link rel='preload'> with onLoad deferral",
    "✓ Verify CSS is deferred: ~15KB initial, ~35KB deferred",
    "✓ Check: DevTools -> Network -> CSS files"
  ],
  
  PHASE_4: [
    "✓ Run npm run analyze:build",
    "✓ Ensure unused JS < 50KB",
    "✓ Verify all below-fold components use dynamic import",
    "✓ Set ssr: false for heavy components"
  ],
  
  VERIFICATION: [
    "✓ Run: npm run mobile:audit",
    "✓ Target LCP < 2.5s (blue), ideally < 2.0s (green)",
    "✓ Check FCP < 1.5s",
    "✓ Verify CLS < 0.1",
    "✓ Monitor TTFB < 200ms"
  ]
};

export default {
  CRITICAL_HERO_CSS,
  HERO_SECTION_OPTIMIZATION,
  IMAGE_PRELOAD_OPTIMIZATION,
  NON_CRITICAL_CSS_INSTRUCTIONS,
  DEFER_JAVASCRIPT_STRATEGY,
  MAIN_THREAD_OPTIMIZATION,
  LCP_OPTIMIZATION_CHECKLIST
};
