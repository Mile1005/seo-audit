"use client"

import React, { useState } from "react"
import { Play, Pause, Maximize2, Minimize2 } from "lucide-react"
import { HeroImage } from "@/components/ui/optimized-image"

export interface HeroMockupProps {
  className?: string
  showControls?: boolean
  priority?: boolean
}

export function HeroMockup({ 
  className = "", 
  showControls = true,
  priority = true 
}: HeroMockupProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying)
    // TODO: Implement video/animation controls when final assets are ready
  }

  const handleFullscreen = () => {
    setIsFullscreen(true)
    // TODO: Implement fullscreen modal for hero mockup
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Hero Mockup Container */}
      <div className="relative aspect-[16/10] w-full max-w-4xl mx-auto">
        {/* Laptop Frame Container */}
        <div className="relative w-full h-full">
          {/* TODO: Replace with actual hero laptop mockup */}
          {/* Placeholder: Laptop frame with dashboard screenshot */}
          <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-4 shadow-2xl">
            {/* Laptop Screen */}
            <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden">
              {/* Screen Content */}
              <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                {/* Optimized Hero Image */}
                <HeroImage
                  src="/images/hero/hero-laptop-dashboard.svg"
                  alt="AISEOTurbo dashboard interface showing comprehensive SEO audit results with actionable insights and performance metrics"
                  priority={priority}
                  className="object-cover object-top"
                  fill
                />
                
                {/* Fallback content when image fails to load */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">AISEOTurbo Dashboard</h3>
                    <p className="text-gray-300 text-sm">
                      Comprehensive SEO insights and actionable recommendations
                    </p>
                  </div>
                </div>
              </div>

              {/* Screen Reflection Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Laptop Base */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-3xl" />
          </div>

          {/* Floating UI Elements */}
          <div
            className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-semibold shadow-lg animate-bounce"
          >
            ✓ 98 SEO Score
          </div>

          <motion.div
            animate={{ 
              y: isPlaying ? [0, 8, 0] : 0,
              x: isPlaying ? [0, -5, 5, 0] : 0
            }}
            transition={{ 
              duration: 4, 
              repeat: isPlaying ? Infinity : 0,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute -bottom-6 -left-6 bg-blue-500 text-white px-4 py-3 rounded-xl shadow-lg"
          >
            <div className="text-xs text-blue-100">Traffic Increase</div>
            <div className="text-lg font-bold">+142%</div>
          </motion.div>

          <motion.div
            animate={{ 
              scale: isPlaying ? [1, 1.05, 1] : 1,
              rotate: isPlaying ? [0, -2, 2, 0] : 0
            }}
            transition={{ 
              duration: 2.5, 
              repeat: isPlaying ? Infinity : 0,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-1/4 -left-8 bg-purple-500 text-white px-3 py-2 rounded-lg text-sm shadow-lg"
          >
            🎯 Issues Fixed: 23
          </motion.div>
        </div>

        {/* Controls Overlay */}
        {showControls && (
          <div className="absolute bottom-4 right-4 flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePlayToggle}
              className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={isPlaying ? "Pause animation" : "Play animation"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFullscreen}
              className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="View fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </div>

      {/* Mobile UI Insert */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute -bottom-12 -right-8 w-32 md:w-40 lg:w-48"
      >
        <div className="relative aspect-[9/16] bg-slate-900 rounded-3xl p-1 shadow-2xl">
          <div className="relative w-full h-full bg-black rounded-[20px] overflow-hidden">
            {/* Optimized Mobile Image */}
            <HeroImage
              src="/images/mockups/mobile-audit-interface.svg"
              alt="Mobile SEO audit interface showing quick insights and optimization recommendations"
              sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
              className="object-cover object-top"
              fill
            />
            
            {/* Fallback content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white p-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm">📱</span>
                </div>
                <div className="text-xs font-medium mb-1">Mobile Audit</div>
                <div className="text-xs text-gray-400">TODO: Mobile UI</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
