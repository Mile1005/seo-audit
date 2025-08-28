"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Play, Zap, Clock, Users } from "lucide-react"
import { DesktopHeroMockup } from "./desktop-hero-mockup"

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const floatingShapeVariants = {
    floating: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          variants={floatingShapeVariants}
          animate="floating"
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
          style={{ animationDelay: "0s" }}
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

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  AI-Powered SEO Audits{" "}
                </span>
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  That Actually Move the Needle
                </span>
              </h1>
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center space-x-2"
                id="hero-start-audit-cta"
              >
                <span>Start Free Audit</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 backdrop-blur-sm flex items-center justify-center space-x-2"
                id="hero-demo-cta"
              >
                <Play className="w-5 h-5" />
                <span>See Live Demo</span>
              </motion.button>
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
            <DesktopHeroMockup />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
