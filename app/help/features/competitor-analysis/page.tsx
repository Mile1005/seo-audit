"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, CheckCircle, Target, Users, TrendingUp, Search, BarChart, Zap } from 'lucide-react'
import Link from 'next/link'

export default function CompetitorAnalysisGuidePage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">

        {/* Breadcrumb */}
        <section className="bg-slate-900/50 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
              <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                Help Center
              </Link>
              <span className="text-gray-600">/</span>
              <Link href="/help/category/seo-tools-features" className="text-gray-400 hover:text-white transition-colors">
                SEO Tools & Features
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white">Competitor analysis guide</span>
            </nav>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/help"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Help Center
              </Link>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-blue-400 text-sm font-medium">SEO Tools & Features</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Competitor analysis guide
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>8 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Last updated: March 2025</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg prose-invert max-w-none"
            >

              {/* Introduction */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Target className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">What you'll learn</h2>
                    <p className="text-gray-300 mb-0">
                      Discover how to identify your SEO competitors, analyze their strategies, and find opportunities
                      to outperform them in search rankings. Learn to turn competitor insights into actionable SEO tactics.
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Competitor Analysis Matters */}
              <h2 className="text-2xl font-bold text-white mb-6">Why competitor analysis matters</h2>

              <p className="text-gray-300 mb-6">
                Understanding what your competitors are doing right (and wrong) gives you a roadmap for SEO success.
                Our AI-powered competitor analysis reveals their keyword strategies, backlink profiles, and content approaches.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
                  <Search className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Keyword Opportunities</h3>
                  <p className="text-gray-400 text-sm">Find keywords your competitors rank for that you're missing</p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
                  <BarChart className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Content Gaps</h3>
                  <p className="text-gray-400 text-sm">Identify topics your competitors cover that you don't</p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Backlink Strategies</h3>
                  <p className="text-gray-400 text-sm">Discover their link-building tactics and opportunities</p>
                </div>
              </div>

              {/* Step-by-step Guide */}
              <h3 className="text-2xl font-bold text-white mb-6">How to perform competitor analysis</h3>

              <div className="space-y-8">

                {/* Step 1 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Identify your competitors</h3>
                      <p className="text-gray-300 mb-4">
                        Start by finding websites that rank for your target keywords. Use tools like Google Search,
                        SEMrush, or Ahrefs to identify who appears on the first page for your important keywords.
                      </p>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-white font-medium mb-2">How to find competitors:</h4>
                        <ul className="space-y-1 text-gray-300 text-sm">
                          <li>• Search for your main keywords and note top 10 results</li>
                          <li>• Check "Related searches" and "People also ask"</li>
                          <li>• Look at your Google Analytics referral sources</li>
                          <li>• Use competitor research tools</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Run competitor analysis</h3>
                      <p className="text-gray-300 mb-4">
                        In your AISEOTurbo dashboard, navigate to the Competitor Analysis tool. Enter up to 5 competitor URLs
                        and let our AI analyze their SEO strategies, keyword targeting, and backlink profiles.
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                        <p className="text-sm text-blue-400 mb-2"><strong>Pro tip:</strong></p>
                        <p className="text-gray-300 text-sm">
                          Choose competitors that are similar in size and niche to yours for the most relevant insights.
                          Mix direct competitors with aspirational ones (sites you'd like to emulate).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Analyze keyword gaps</h3>
                      <p className="text-gray-300 mb-4">
                        Review the keyword gap analysis to find terms your competitors rank for that you're not targeting.
                        Focus on keywords with high search volume and low competition that align with your business.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-green-400 font-medium mb-1">High Priority</div>
                          <div className="text-gray-300 text-sm">Keywords with 1K+ monthly searches that competitors rank for</div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-yellow-400 font-medium mb-1">Medium Priority</div>
                          <div className="text-gray-300 text-sm">Long-tail keywords with commercial intent</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Study content strategies</h3>
                      <p className="text-gray-300 mb-4">
                        Analyze what types of content your competitors create, their content depth, and how they structure their pages.
                        Look for content gaps and opportunities to create better, more comprehensive content.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">Content types and formats they use</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">Content depth and comprehensiveness</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">User engagement metrics</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      5
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Analyze backlink profiles</h3>
                      <p className="text-gray-300 mb-4">
                        Examine your competitors' backlink profiles to understand their link-building strategies.
                        Identify high-quality sites that link to them and look for similar opportunities.
                      </p>
                      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <Zap className="w-5 h-5 text-purple-400" />
                          <span className="text-purple-400 font-medium">Link building opportunities</span>
                        </div>
                        <ul className="space-y-1 text-gray-300 text-sm">
                          <li>• Guest posting opportunities</li>
                          <li>• Industry partnerships</li>
                          <li>• Resource page mentions</li>
                          <li>• Broken link building</li>
                          <li>• Local business citations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      6
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Create action plan</h3>
                      <p className="text-gray-300 mb-4">
                        Based on your analysis, create a prioritized action plan. Focus on high-impact, low-competition opportunities first.
                        Set realistic timelines and track your progress over time.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-lg font-bold text-red-400 mb-1">Week 1-2</div>
                          <div className="text-gray-400 text-sm">Quick wins & easy fixes</div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-lg font-bold text-yellow-400 mb-1">Month 1</div>
                          <div className="text-gray-400 text-sm">Content & keyword targeting</div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-lg font-bold text-green-400 mb-1">Months 2-3</div>
                          <div className="text-gray-400 text-sm">Link building & advanced SEO</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Best Practices */}
              <h3 className="text-2xl font-bold text-white mb-6">Best practices for competitor analysis</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Do's
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Analyze 3-5 direct competitors</li>
                    <li>• Look at both ranking and non-ranking competitors</li>
                    <li>• Focus on actionable insights, not just data</li>
                    <li>• Monitor competitor changes regularly</li>
                    <li>• Combine competitor data with your own analytics</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-red-400" />
                    Don'ts
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Copy competitors exactly - innovate instead</li>
                    <li>• Obsess over competitors larger than you</li>
                    <li>• Ignore your unique value proposition</li>
                    <li>• Make changes without testing first</li>
                    <li>• Focus only on ranking positions</li>
                  </ul>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">Ready to analyze your competitors?</h3>
                <p className="text-gray-300 mb-4">
                  Start with our competitor analysis tool to gain insights that will help you outperform your competition in search results.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/dashboard"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Start Competitor Analysis
                  </Link>
                  <Link
                    href="/help/features/site-crawler"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Learn About Site Crawler
                  </Link>
                </div>
              </div>

            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
