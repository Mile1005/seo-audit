"use client"

import React from "react"
import { motion } from "framer-motion"

export function TrustLogos() {
  // Mock logo data - replace with real logos later
  const logos = [
    { name: "TechCrunch", width: 120 },
    { name: "Forbes", width: 100 },
    { name: "Entrepreneur", width: 140 },
    { name: "Inc", width: 80 },
    { name: "Product Hunt", width: 130 },
    { name: "Mashable", width: 110 },
    { name: "VentureBeat", width: 120 },
    { name: "The Next Web", width: 140 }
  ]

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos]

  return (
    <section className="py-12 bg-slate-950/50 border-t border-slate-800/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-gray-400 text-sm uppercase tracking-wider font-medium">
            Trusted by leading companies
          </p>
        </motion.div>

        {/* Logo Strip Container */}
        <div className="relative overflow-hidden">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-slate-950 to-transparent z-10"></div>

          {/* Scrolling Logos */}
          <motion.div
            animate={{
              x: [0, -50 * logos.length + "%"]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex items-center space-x-8 hover:pause"
            style={{ width: `${200}%` }}
          >
            {duplicatedLogos.map((logo, index) => (
              <motion.div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center h-12 opacity-60 hover:opacity-100 transition-opacity duration-200"
                style={{ width: `${logo.width}px` }}
                whileHover={{ scale: 1.1 }}
              >
                {/* Placeholder logo - replace with actual images */}
                <div 
                  className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg flex items-center justify-center text-white text-xs font-medium px-3 py-2"
                  style={{ width: `${logo.width}px`, height: "40px" }}
                >
                  {logo.name}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-8 text-center"
        >
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full border-2 border-slate-950 flex items-center justify-center text-white text-xs font-bold"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="text-gray-400 text-sm">
              Join <span className="text-cyan-400 font-semibold">1,000+ marketers</span>
            </span>
          </div>

          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-gray-400 text-sm ml-2">
              <span className="text-white font-semibold">4.9/5</span> from 500+ reviews
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
