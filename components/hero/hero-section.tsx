"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Play, Zap, Clock, Users } from "lucide-react"
import { useIsMobile } from "@/hooks/use-is-mobile"
import { DesktopHeroMockupOptimized } from "./desktop-hero-mockup-optimized"
import { HeroHeadlineAB, CTATextAB } from "@/components/ab/ab-slot"
import { trackCTA, trackDemo } from "@/lib/analytics"
import { handleCTAClick } from "@/lib/cta-utils"

export function HeroSection() {
  const isMobile = useIsMobile()
  const [showBackgroundAnimations, setShowBackgroundAnimations] = useState(false)

  useEffect(() => {
    // Defer background animations until after LCP completes
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(() => {
        setShowBackgroundAnimations(true)
      }, { timeout: 2500 })
      return () => cancelIdleCallback(id)
    } else {
      const timer = setTimeout(() => {
        setShowBackgroundAnimations(true)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [])

  // Always use animations but control rendering
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  const floatingShapeVariants = {
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
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Main H1 - For SEO */}
      <h1 className="sr-only">AI SEO Turbo - Professional SEO Audits & Analysis Tool</h1>
      
      {/* Background Elements - Skip expensive rendering on mobile, defer animations until after LCP */}
      {!isMobile && (
        <div className="absolute inset-0">
          {/* Gradient Orbs - Only animate after LCP */}
          {showBackgroundAnimations && (
            <>
              <motion.div
                variants={floatingShapeVariants}
                animate="floating"
                className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
              />
              <motion.div
                variants={floatingShapeVariants}
                animate="floating"
                className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl"
              />
            </>
          )}
          
          {/* Grid Pattern - Always render but it's cheap */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>
      )}
      
      {/* Mobile background: Static gradient for contrast (no animations) */}
      {isMobile && (
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl" />
        </div>
      )}

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content Column */}
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
                data-event="demo_click"
                data-location="hero"
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

          {/* Mockup Column - Desktop Only */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:block"
          >
            <DesktopHeroMockupOptimized deferAnimation={true} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
