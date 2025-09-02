"use client"

import React, { useState, useEffect } from "react"
import { ArrowRight, Play, Zap, Clock, Users } from "lucide-react"
import { trackCTA, trackDemo } from "@/lib/analytics"
import { handleCTAClick } from "@/lib/cta-utils"

// Mobile-optimized hero with minimal animations
export function MobileOptimizedHero() {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    // Critical loading state with minimal HTML
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Professional SEO
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Audit Tool
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Get comprehensive SEO analysis, identify critical issues, and receive actionable recommendations to boost your search rankings.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section 
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Simplified background for mobile */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Professional SEO
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Audit Tool
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Get comprehensive SEO analysis, identify critical issues, and receive actionable recommendations to boost your search rankings.
            </p>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 mb-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="text-sm">10,000+ users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm">2-min audit</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span className="text-sm">Instant results</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  handleCTAClick('START_AUDIT', 'Start Free Audit', 'hero')
                }}
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:from-cyan-400 hover:to-blue-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 flex items-center justify-center"
              >
                Start Free Audit
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  trackDemo('hero-demo-click')
                }}
                className="group bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border border-slate-600 hover:border-slate-500 flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Content - Simplified for mobile */}
          <div className="relative lg:block hidden">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl scale-110" />
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 shadow-2xl p-6">
                <div className="space-y-4">
                  <div className="h-4 bg-slate-600 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-600 rounded w-1/2"></div>
                  <div className="h-20 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded border border-green-500/30"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-12 bg-slate-700 rounded"></div>
                    <div className="h-12 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
