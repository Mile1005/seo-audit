"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function DesktopHeroMockup() {
  return (
    <div className="relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl scale-110" />
      
      {/* Main Mockup Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        whileHover={{ 
          rotateY: 5,
          rotateX: 5,
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        className="relative transform-gpu perspective-1000"
      >
        {/* Browser Window Frame */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-t-xl border border-slate-700 shadow-2xl">
          {/* Browser Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-slate-700 rounded-md px-3 py-1 text-xs text-gray-400 max-w-xs">
                aiseoturbo.com/audit
              </div>
            </div>
            <div className="w-16"></div>
          </div>

          {/* Mockup Content */}
          <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-950">
            {/* Header */}
            <div className="mb-6">
              <div className="h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded w-48 mb-3"></div>
              <div className="h-8 bg-slate-700 rounded w-full mb-2"></div>
              <div className="h-8 bg-slate-700 rounded w-3/4"></div>
            </div>

            {/* Stats Grid */}
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

            {/* Issues List */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <div className="flex-1">
                  <div className="h-3 bg-slate-600 rounded w-3/4 mb-1"></div>
                  <div className="h-2 bg-slate-700 rounded w-1/2"></div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <div className="flex-1">
                  <div className="h-3 bg-slate-600 rounded w-2/3 mb-1"></div>
                  <div className="h-2 bg-slate-700 rounded w-1/3"></div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <div className="flex-1">
                  <div className="h-3 bg-slate-600 rounded w-5/6 mb-1"></div>
                  <div className="h-2 bg-slate-700 rounded w-2/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [0, 2, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-4 -right-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-3 shadow-lg"
        >
          <div className="w-6 h-6 bg-white rounded opacity-90"></div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 8, 0],
            rotate: [0, -2, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-4 -left-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-3 shadow-lg"
        >
          <div className="w-6 h-6 bg-white rounded opacity-90"></div>
        </motion.div>
      </motion.div>
    </div>
  )
}
