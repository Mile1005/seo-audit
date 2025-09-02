"use client"

import { MainLayout } from "../../components/layout/main-layout"
import { InteractiveDemo } from "../../components/demo/interactive-demo"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        {/* Header */}
        <section className="pt-24 pb-12 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Link 
                href="/"
                className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors duration-200 mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Try Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">AI-Powered</span> SEO Audit
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience how our advanced AI analyzes websites and provides actionable SEO recommendations. 
                Try it with any URL to see instant results.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Interactive Demo */}
        <InteractiveDemo />
      </div>
    </MainLayout>
  )
}
