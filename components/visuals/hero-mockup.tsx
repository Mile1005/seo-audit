"use client";

import React, { useState } from "react";
import { Play, Pause, Maximize2, Minimize2 } from "lucide-react";
import { HeroImage } from "@/components/ui/optimized-image";
import { useTranslations } from "next-intl";

export interface HeroMockupProps {
  className?: string;
}

export function HeroMockup({ className = "" }: HeroMockupProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const t = useTranslations();

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      {/* Laptop Mockup Container */}
      <div className="relative">
        {/* Screen Container */}
        <div className="relative bg-slate-900 rounded-t-2xl p-6 shadow-2xl">
          {/* Browser Chrome */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 bg-slate-700 rounded px-4 py-1 text-slate-300 text-sm ml-4">
              https://aiseoturbo.com
            </div>
          </div>

          {/* Main Content Area - Fixed dimensions to prevent layout shift */}
          <div className="relative bg-white rounded-lg overflow-hidden w-full h-0 pb-[62.5%]">
            {/* Dashboard Content */}
            <HeroImage
              src="/images/hero/hero-laptop-dashboard.svg"
              alt={t("home.images.heroDashboard")}
              className="absolute inset-0 w-full h-full object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              width={1200}
              height={750}
            />

            {/* Status Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10" />

            {/* Performance Badges */}
            <div className="absolute top-4 left-4 bg-emerald-500 rounded px-3 py-1 text-white text-sm font-medium">
              ● LIVE SEO SCAN
            </div>

            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-semibold shadow-lg">
              ✓ 98 SEO Score
            </div>

            <div className="absolute bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
              🚀 Performance: 95/100
            </div>

            {/* Control Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20">
              <div className="flex space-x-4">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause demo" : "Play demo"}
                  className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>

                <button
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-5 w-5" />
                  ) : (
                    <Maximize2 className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Laptop Base */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-3xl" />
        </div>
      </div>

      {/* Floating Elements with CSS Animations */}
      <div className="absolute -top-8 -right-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
        🎯 AI-Powered Analysis
      </div>

      {/* Additional floating notifications */}
      <div className="absolute -bottom-4 -right-12 bg-orange-500 text-white px-3 py-1 rounded-lg text-xs font-medium shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
        💡 27 Recommendations
      </div>

      <div className="absolute top-1/3 -left-8 bg-cyan-500 text-white px-3 py-1 rounded-lg text-xs font-medium shadow-lg transform rotate-6 hover:rotate-0 transition-transform duration-300">
        ⚡ Real-time Updates
      </div>
    </div>
  );
}
