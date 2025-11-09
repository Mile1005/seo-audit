"use client"

import { MainLayout } from '@/components/layout/main-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, CheckCircle, BarChart, Search, AlertTriangle, TrendingUp, Settings, FileText } from 'lucide-react'
import Link from 'next/link'

export default function SEOAuditWalkthroughPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.aiseoturbo.com' },
            { name: 'Help', url: 'https://www.aiseoturbo.com/help' },
            { name: 'Features', url: 'https://www.aiseoturbo.com/help/seo-tools-features' },
            { name: 'SEO Audit Walkthrough', url: 'https://www.aiseoturbo.com/help/features/seo-audit' }
          ]}
        />

        {/* Article Header */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/help/seo-tools-features"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to SEO Tools & Features
              </Link>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-3">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-blue-400 text-sm font-medium">Feature Guide</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    SEO Audit Walkthrough
                  </h1>
                </div>
              </div>

              <p className="text-xl text-gray-400 mb-8">
                Master our comprehensive SEO audit feature with this step-by-step guide. Learn how to analyze websites,
                interpret results, and implement actionable recommendations.
              </p>

              <div className="flex items-center gap-6 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Written by AI SEO Turbo Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Last updated: March 2025</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {/* Introduction */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Understanding SEO Audits</h2>
                <p className="text-gray-300 text-lg">
                  An SEO audit is a comprehensive analysis of your website's search engine optimization performance.
                  Our AI-powered audit examines 47 different factors across technical SEO, content quality, user experience,
                  and competitive positioning to provide actionable insights for improvement.
                </p>
              </div>

              {/* What Gets Audited */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">What Our Audit Analyzes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      🔧 Technical SEO
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Page speed and Core Web Vitals</li>
                      <li>• Mobile-friendliness</li>
                      <li>• SSL certificate and security</li>
                      <li>• XML sitemap and robots.txt</li>
                      <li>• Structured data markup</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      📝 Content Quality
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Title tags and meta descriptions</li>
                      <li>• Heading structure (H1-H6)</li>
                      <li>• Keyword optimization</li>
                      <li>• Content length and readability</li>
                      <li>• Internal linking structure</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      🔗 Backlinks & Authority
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Domain authority metrics</li>
                      <li>• Backlink profile analysis</li>
                      <li>• Toxic link detection</li>
                      <li>• Link building opportunities</li>
                      <li>• Competitor backlink analysis</li>
                    </ul>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      📊 User Experience
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Page load times</li>
                      <li>• Mobile responsiveness</li>
                      <li>• Navigation and usability</li>
                      <li>• Bounce rate analysis</li>
                      <li>• Conversion optimization</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How to Run an Audit */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Running Your First SEO Audit</h3>
                <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    🚀 Step-by-Step Process
                  </h4>
                  <ol className="space-y-4">
                    <li className="flex gap-4">
                      <span className="text-blue-400 font-bold text-lg min-w-fit">1.</span>
                      <div>
                        <p className="text-white font-semibold mb-1">Access the Audit Tool</p>
                        <p className="text-gray-300">Navigate to the "SEO Audit" section from your dashboard or click "Run Audit" from the main menu.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-blue-400 font-bold text-lg min-w-fit">2.</span>
                      <div>
                        <p className="text-white font-semibold mb-1">Enter Your Website URL</p>
                        <p className="text-gray-300">Input your domain name (e.g., www.example.com) or a specific page URL for targeted analysis.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-blue-400 font-bold text-lg min-w-fit">3.</span>
                      <div>
                        <p className="text-white font-semibold mb-1">Configure Audit Settings</p>
                        <p className="text-gray-300">Choose crawl depth, include/exclude patterns, and select specific checks to run.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-blue-400 font-bold text-lg min-w-fit">4.</span>
                      <div>
                        <p className="text-white font-semibold mb-1">Start the Analysis</p>
                        <p className="text-gray-300">Click "Start Audit" and wait for our AI to crawl and analyze your website (typically 2-5 minutes).</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-blue-400 font-bold text-lg min-w-fit">5.</span>
                      <div>
                        <p className="text-white font-semibold mb-1">Review Results</p>
                        <p className="text-gray-300">Examine the comprehensive report with prioritized recommendations and actionable fixes.</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>

              {/* Understanding Results */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Interpreting Your Audit Results</h3>
                <p className="text-gray-300 mb-6">
                  Our audit results are designed to be clear and actionable. Here's how to understand what you're seeing:
                </p>

                <div className="space-y-6">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      📊 Overall SEO Score
                    </h4>
                    <p className="text-gray-300 mb-4">
                      Your website receives an overall score from 0-100 based on how well it performs across all SEO factors.
                      Scores are categorized as follows:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="text-red-400 font-bold text-lg">0-49</div>
                        <div className="text-red-300 text-sm">Poor</div>
                      </div>
                      <div className="text-center p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                        <div className="text-orange-400 font-bold text-lg">50-69</div>
                        <div className="text-orange-300 text-sm">Needs Work</div>
                      </div>
                      <div className="text-center p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <div className="text-yellow-400 font-bold text-lg">70-84</div>
                        <div className="text-yellow-300 text-sm">Good</div>
                      </div>
                      <div className="text-center p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="text-green-400 font-bold text-lg">85-100</div>
                        <div className="text-green-300 text-sm">Excellent</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      ⚠️ Issue Severity Levels
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-red-500"></div>
                        <div>
                          <p className="text-white font-semibold">Critical</p>
                          <p className="text-gray-300 text-sm">Issues that significantly impact search rankings and should be fixed immediately</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                        <div>
                          <p className="text-white font-semibold">Warning</p>
                          <p className="text-gray-300 text-sm">Important issues that should be addressed but won't cause immediate ranking drops</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        <div>
                          <p className="text-white font-semibold">Notice</p>
                          <p className="text-gray-300 text-sm">Minor issues or suggestions for optimization</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Issues */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Most Common SEO Issues Found</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      🏷️ Missing Meta Tags
                    </h4>
                    <p className="text-gray-300 mb-4">
                      Title tags and meta descriptions are missing or not optimized for target keywords.
                    </p>
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                      <p className="text-red-300 text-sm font-semibold">Impact: High</p>
                      <p className="text-gray-300 text-sm">Fix: Add unique, keyword-rich title tags (50-60 characters) and meta descriptions (150-160 characters)</p>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      🐌 Slow Page Speed
                    </h4>
                    <p className="text-gray-300 mb-4">
                      Pages load too slowly, affecting user experience and search rankings.
                    </p>
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                      <p className="text-red-300 text-sm font-semibold">Impact: High</p>
                      <p className="text-gray-300 text-sm">Fix: Optimize images, minify code, use caching, and improve server response times</p>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      📱 Mobile Issues
                    </h4>
                    <p className="text-gray-300 mb-4">
                      Website not properly optimized for mobile devices.
                    </p>
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded p-3">
                      <p className="text-orange-300 text-sm font-semibold">Impact: Medium</p>
                      <p className="text-gray-300 text-sm">Fix: Implement responsive design, ensure touch-friendly elements, and test on mobile devices</p>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      🔗 Broken Links
                    </h4>
                    <p className="text-gray-300 mb-4">
                      Internal or external links pointing to non-existent pages.
                    </p>
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded p-3">
                      <p className="text-orange-300 text-sm font-semibold">Impact: Medium</p>
                      <p className="text-gray-300 text-sm">Fix: Regularly audit links, update broken URLs, and implement proper redirects</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Implementing Fixes */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Implementing Audit Recommendations</h3>
                <p className="text-gray-300 mb-6">
                  Our audit provides specific, actionable recommendations for each issue found. Here's how to prioritize and implement fixes:
                </p>

                <div className="bg-green-600/10 border border-green-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    🎯 Implementation Strategy
                  </h4>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <span className="text-green-400 font-bold text-lg">1.</span>
                      <div>
                        <p className="text-white font-semibold mb-1">Start with Critical Issues</p>
                        <p className="text-gray-300">Fix high-impact problems first (missing meta tags, broken links, page speed)</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-green-400 font-bold text-lg">2.</span>
                      <div>
                        <p className="text-white font-semibold mb-1">Create an Action Plan</p>
                        <p className="text-gray-300">Prioritize fixes based on effort vs. impact, and set realistic timelines</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-green-400 font-bold text-lg">3.</span>
                      <div>
                        <p className="text-white font-semibold mb-1">Test Changes</p>
                        <p className="text-gray-300">Use our re-audit feature to verify fixes and measure improvements</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-green-400 font-bold text-lg">4.</span>
                      <div>
                        <p className="text-white font-semibold mb-1">Monitor Progress</p>
                        <p className="text-gray-300">Track ranking improvements and organic traffic growth over time</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Features */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Advanced Audit Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      📈 Competitor Analysis
                    </h4>
                    <p className="text-gray-300 mb-4">
                      Compare your SEO performance against competitors to identify opportunities.
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Keyword gap analysis</li>
                      <li>• Backlink comparison</li>
                      <li>• Content strategy insights</li>
                      <li>• SERP feature opportunities</li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      📊 Historical Tracking
                    </h4>
                    <p className="text-gray-300 mb-4">
                      Monitor SEO improvements over time with detailed historical data.
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li>• Score trend analysis</li>
                      <li>• Issue resolution tracking</li>
                      <li>• Ranking position changes</li>
                      <li>• Traffic correlation data</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Best Practices */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">SEO Audit Best Practices</h3>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">✅ Do's</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Run audits regularly (monthly)</li>
                        <li>• Focus on user experience improvements</li>
                        <li>• Implement changes gradually</li>
                        <li>• Document your SEO strategy</li>
                        <li>• Combine technical and content fixes</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">❌ Don'ts</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Don't ignore critical issues</li>
                        <li>• Don't make changes without testing</li>
                        <li>• Don't focus only on high scores</li>
                        <li>• Don't neglect mobile optimization</li>
                        <li>• Don't stop after one audit</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-20 bg-slate-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-white mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/help/features/site-crawler"
                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-2 flex-shrink-0">
                    <BarChart className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      Site Crawler Guide
                    </h4>
                    <p className="text-gray-400 mb-3">
                      Learn how to use our advanced site crawler for comprehensive website analysis.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>8 min read</span>
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/help/getting-started/quick-start"
                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-2 flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                      Quick Start Guide
                    </h4>
                    <p className="text-gray-400 mb-3">
                      Get up and running with AI SEO Turbo in under 10 minutes.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>10 min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}