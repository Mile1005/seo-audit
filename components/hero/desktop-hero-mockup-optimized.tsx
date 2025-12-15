"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface DesktopHeroMockupOptimizedProps {
  deferAnimation?: boolean;
}

export function DesktopHeroMockupOptimized({
  deferAnimation = true,
}: DesktopHeroMockupOptimizedProps) {
  const [showAnimation, setShowAnimation] = useState(!deferAnimation);

  useEffect(() => {
    if (!deferAnimation) return;

    // Defer animation startup to after LCP completes
    // Use requestIdleCallback for low-priority animation setup
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(
        () => {
          setShowAnimation(true);
        },
        { timeout: 2000 }
      );
      return () => cancelIdleCallback(id);
    } else {
      // Fallback: wait 2 seconds for non-supporting browsers
      const timer = setTimeout(() => {
        setShowAnimation(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [deferAnimation]);

  return (
    <div className="relative">
      {/* Background Glow - Only render if animation is active */}
      {showAnimation && (
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl scale-110" />
      )}

      {/* Main Mockup Container - Static Image for fast LCP */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={showAnimation ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={
          showAnimation
            ? {
                rotateY: 5,
                rotateX: 5,
                scale: 1.02,
                transition: { duration: 0.3 },
              }
            : {}
        }
        className="relative transform-gpu perspective-1000"
      >
        {/* Optimized Hero Mockup Image */}
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-t-xl border border-slate-700 shadow-2xl overflow-hidden">
          <Image
            src="/images/hero/desktop-mockup.svg"
            alt="AI SEO Turbo dashboard showing SEO audit results"
            width={800}
            height={500}
            priority={true}
            className="w-full h-auto object-cover"
            sizes="(max-width: 1024px) 100vw, 800px"
          />
          {/* Fallback content in case image fails */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 p-6 hidden">
            <div className="mb-6">
              <div className="h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded w-48 mb-3"></div>
              <div className="h-8 bg-slate-700 rounded w-full mb-2"></div>
              <div className="h-8 bg-slate-700 rounded w-3/4"></div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="h-8 bg-green-500 rounded w-12 mb-2"></div>
                <div className="h-3 bg-slate-600 rounded w-full mb-1"></div>
                <div className="h-3 bg-slate-600 rounded w-2/3"></div>
              </div>
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="h-8 bg-yellow-500 rounded w-12 mb-2"></div>
                <div className="h-3 bg-slate-600 rounded w-full mb-1"></div>
                <div className="h-3 bg-slate-600 rounded w-2/3"></div>
              </div>
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="h-8 bg-red-500 rounded w-12 mb-2"></div>
                <div className="h-3 bg-slate-600 rounded w-full mb-1"></div>
                <div className="h-3 bg-slate-600 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements - Only animate after LCP */}
        {showAnimation && (
          <>
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-4 -right-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-3 shadow-lg"
            >
              <div className="w-6 h-6 bg-white rounded opacity-90"></div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 8, 0],
                rotate: [0, -2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-4 -left-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-3 shadow-lg"
            >
              <div className="w-6 h-6 bg-white rounded opacity-90"></div>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}
