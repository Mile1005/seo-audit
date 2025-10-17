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

        {/* SEO Content Section */}
        <section className="py-20 bg-slate-900">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                See What Our AI SEO Audit <span className="text-purple-400">Uncovers</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Our free demo reveals critical SEO issues that could be costing you rankings and traffic.
                Experience the power of AI-driven analysis in just 60 seconds.
              </p>
            </div>

            <div className="prose prose-lg prose-invert mx-auto">
              <h3>What Makes Our AI SEO Audit Different?</h3>
              <p>
                Traditional SEO tools provide basic checklists, but our AI-powered platform goes deeper. We analyze your website
                the same way Google does, identifying nuanced issues that impact search rankings and user experience.
              </p>

              <h4>47-Point Technical Analysis</h4>
              <p>
                Our comprehensive audit covers every aspect of technical SEO, from crawlability and indexation to performance
                and mobile optimization. Each check is powered by machine learning algorithms trained on millions of websites.
              </p>
              <ul>
                <li><strong>Site Structure Analysis:</strong> Detects navigation issues, internal linking problems, and URL structure flaws</li>
                <li><strong>Content Optimization:</strong> Identifies keyword gaps, content depth issues, and semantic SEO opportunities</li>
                <li><strong>Performance Metrics:</strong> Core Web Vitals assessment, page speed analysis, and loading optimization</li>
                <li><strong>Mobile Experience:</strong> Responsive design validation, touch targets, and mobile usability testing</li>
                <li><strong>Security & Technical:</strong> HTTPS implementation, schema markup, and technical SEO best practices</li>
              </ul>

              <h4>Competitor Intelligence Included</h4>
              <p>
                See how your website stacks up against competitors. Our AI analyzes their SEO strategies, backlink profiles,
                and content approaches to identify opportunities for competitive advantage.
              </p>

              <h4>Actionable Recommendations with Priority Scoring</h4>
              <p>
                Not all SEO issues are created equal. Our AI prioritizes recommendations based on their potential impact
                on your search rankings, helping you focus on fixes that deliver the biggest results first.
              </p>

              <div className="bg-purple-900/30 border border-purple-500/30 p-6 rounded-lg my-8">
                <h4 className="text-purple-200 font-semibold mb-3">What Our Users Discover</h4>
                <p className="text-purple-100 mb-4">
                  "The demo revealed 23 critical issues our previous SEO tool missed. Within 30 days of implementing
                  the recommendations, our organic traffic increased by 180%." - Sarah Chen, E-commerce Director
                </p>
                <p className="text-purple-100">
                  "As a web developer, I was skeptical of AI SEO tools. The demo proved me wrong - it caught technical
                  issues that would have taken me hours to find manually." - Mike Rodriguez, Freelance Developer
                </p>
              </div>

              <h3>Ready to Transform Your SEO Performance?</h3>
              <p>
                Our free demo is the fastest way to see how AI SEO Turbo can revolutionize your search optimization strategy.
                Whether you're a business owner, SEO professional, or web developer, you'll gain insights that lead to measurable improvements
                in search rankings and organic traffic.
              </p>
              <p>
                No credit card required, no signup needed. Just enter any website URL and watch our AI work its magic.
                Experience the future of SEO analysis today.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <InteractiveDemo />
      </div>
    </MainLayout>
  )
}
