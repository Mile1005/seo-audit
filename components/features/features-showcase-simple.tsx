'use client'

import React from "react"
import { motion } from "framer-motion"

// Simple features data without external dependencies
const simpleFeatures = [
  {
    id: 1,
    title: "AI-Powered Analysis",
    description: "Advanced AI algorithms analyze your website for comprehensive SEO insights.",
    icon: "🚀",
    category: "Analysis"
  },
  {
    id: 2,
    title: "Real-Time Monitoring",
    description: "Track your SEO performance with live monitoring and alerts.",
    icon: "📊",
    category: "Monitoring"
  },
  {
    id: 3,
    title: "Competitor Analysis",
    description: "Compare your performance against competitors and identify opportunities.",
    icon: "🎯",
    category: "Research"
  }
]

export function FeaturesShowcaseSimple() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Powerful SEO
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to optimize your website and dominate search rankings
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {simpleFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300 group"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-4">
                <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full">
                  {feature.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
