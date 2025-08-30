"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { Feature } from "../../data/features"

interface FeatureCardProps {
  feature: Feature
  index: number
}

export function FeatureCard({ feature, index }: FeatureCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const IconComponent = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      className="group cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10">
        {/* Icon */}
        <div className="mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <IconComponent 
              className="w-6 h-6 text-white" 
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors duration-200">
            {feature.title}
          </h3>

          {/* Benefit */}
          <p className="text-gray-300 text-sm leading-relaxed">
            {feature.benefit}
          </p>

          {/* Expand Button */}
          <button
            className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors duration-200 min-h-[44px] -ml-2 pl-2 pr-4 py-2 rounded-lg hover:bg-cyan-500/10"
            aria-expanded={isExpanded}
            aria-controls={`feature-details-${feature.id}`}
          >
            <span>Learn more</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {/* Expanded Details */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                id={`feature-details-${feature.id}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-2 border-t border-slate-700/50">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.details}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
