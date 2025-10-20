"use client"

import { MainLayout } from '../../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, BookOpen, Lightbulb, ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const categoryArticles = [
  {
    title: "How to create your first SEO audit",
    href: "/help/getting-started/first-audit",
    time: "5 min",
    description: "Get started with your first comprehensive SEO audit in just a few clicks.",
    icon: BookOpen
  },
  {
    title: "Setting up your dashboard",
    href: "/help/getting-started/dashboard-setup",
    time: "3 min",
    description: "Customize your dashboard and learn the interface for optimal workflow.",
    icon: BookOpen
  },
  {
    title: "Understanding SEO scores",
    href: "/help/getting-started/seo-scores",
    time: "7 min",
    description: "Learn what your SEO scores mean and how to interpret audit results.",
    icon: BookOpen
  },
  {
    title: "Quick start guide",
    href: "/help/getting-started/quick-start",
    time: "10 min",
    description: "Complete guide to get up and running with AISEOTurbo in under 10 minutes.",
    icon: BookOpen
  }
]

export default function GettingStartedCategoryPage() {
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
              <span className="text-white">Getting Started</span>
            </nav>
          </div>
        </section>

        {/* Category Header */}
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-green-400 text-sm font-medium">Category</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Getting Started
                  </h1>
                </div>
              </div>

              <h2 className="text-xl text-gray-400 mb-8">
                Learn the basics and set up your account with step-by-step guides.
              </h2>

              <div className="flex items-center gap-6 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{categoryArticles.length} articles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Last updated: March 2025</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {/* Main Intro */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Your Complete Guide to Getting Started with AI SEO Turbo</h2>
                <p className="text-gray-300 text-lg">
                  Welcome to AI SEO Turbo! Whether you're new to SEO or an experienced professional looking to enhance your toolkit,
                  this comprehensive guide will help you get up and running quickly. Our AI-powered platform makes advanced SEO
                  analysis accessible to everyone, from beginners to enterprise teams.
                </p>
              </div>

              {/* Value Proposition */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Understanding AI SEO Turbo's Value Proposition</h3>
                <p className="text-gray-300 mb-6">
                  Before diving into the technical details, it's important to understand what makes AI SEO Turbo different from
                  traditional SEO tools. Our platform combines artificial intelligence with proven SEO methodologies to deliver
                  insights that would typically require years of experience to develop.
                </p>

                <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    ✨ What Sets Us Apart
                  </h4>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <span className="text-green-400">✓</span>
                      <p className="text-gray-300"><strong>AI-Powered Analysis:</strong> Machine learning algorithms that continuously learn</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-green-400">✓</span>
                      <p className="text-gray-300"><strong>47-Point Audits:</strong> Comprehensive analysis covering every aspect of SEO</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-green-400">✓</span>
                      <p className="text-gray-300"><strong>Actionable Recommendations:</strong> Clear, prioritized fixes with expected impact</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-green-400">✓</span>
                      <p className="text-gray-300"><strong>Real-Time Monitoring:</strong> Continuous tracking of your SEO performance</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-green-400">✓</span>
                      <p className="text-gray-300"><strong>Expert-Level Insights:</strong> Professional-grade analysis at any skill level</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Creation */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Creating Your Account</h3>
                <p className="text-gray-300 mb-6">
                  Getting started is simple and takes less than 2 minutes. Choose the plan that best fits your needs and start
                  optimizing immediately.
                </p>

                <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    🚀 Account Setup Steps
                  </h4>
                  <ol className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold min-w-fit">1.</span>
                      <p className="text-gray-300"><strong>Choose Your Plan:</strong> Select from Free, Pro, Agency, or Enterprise plans</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold min-w-fit">2.</span>
                      <p className="text-gray-300"><strong>Create Account:</strong> Sign up with email or social authentication</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold min-w-fit">3.</span>
                      <p className="text-gray-300"><strong>Verify Email:</strong> Confirm your email address for security</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold min-w-fit">4.</span>
                      <p className="text-gray-300"><strong>Complete Profile:</strong> Add your website and business information</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400 font-bold min-w-fit">5.</span>
                      <p className="text-gray-300"><strong>Connect Integrations:</strong> Link Google Search Console, Google Analytics</p>
                    </li>
                  </ol>
                </div>
              </div>

              {/* First Audit */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Your First SEO Audit</h3>
                <p className="text-gray-300 mb-6">
                  Running your first audit is the best way to see AI SEO Turbo in action. Our platform will analyze your website
                  and provide detailed insights within minutes.
                </p>

                <div className="bg-cyan-600/10 border border-cyan-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    🔍 How to Run Your First Audit
                  </h4>
                  <ol className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-cyan-400 font-bold min-w-fit">1.</span>
                      <p className="text-gray-300"><strong>Navigate to Dashboard:</strong> Access your dashboard after logging in</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyan-400 font-bold min-w-fit">2.</span>
                      <p className="text-gray-300"><strong>Click "Run Audit":</strong> Find the audit button in the main navigation</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyan-400 font-bold min-w-fit">3.</span>
                      <p className="text-gray-300"><strong>Enter Website URL:</strong> Provide your domain or specific page URL</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyan-400 font-bold min-w-fit">4.</span>
                      <p className="text-gray-300"><strong>Configure Settings:</strong> Choose crawl depth and analysis options</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-cyan-400 font-bold min-w-fit">5.</span>
                      <p className="text-gray-300"><strong>Start Analysis:</strong> Click start and wait for AI-powered results</p>
                    </li>
                  </ol>
                </div>
              </div>

              {/* Audit Results */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Understanding Your Audit Results</h3>
                <p className="text-gray-300 mb-6">
                  Our audit results are designed to be clear and actionable, even for SEO beginners. Each issue includes
                  an explanation, severity level, and step-by-step fix instructions.
                </p>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                  <h4 className="text-white font-semibold mb-4 flex items-center gap-2">📊 Reading Your Audit Report</h4>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <span className="text-indigo-400">→</span>
                      <p className="text-gray-300"><strong>Overall Score:</strong> Your website's SEO health on a 0-100 scale</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-indigo-400">→</span>
                      <p className="text-gray-300"><strong>Issue Categories:</strong> Critical, Warning, and Notice level problems</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-indigo-400">→</span>
                      <p className="text-gray-300"><strong>Priority Recommendations:</strong> Most impactful fixes to implement first</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-indigo-400">→</span>
                      <p className="text-gray-300"><strong>Technical Details:</strong> Specific code changes and implementations</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-indigo-400">→</span>
                      <p className="text-gray-300"><strong>Progress Tracking:</strong> Monitor improvements over time</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Keyword Tracking */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Setting Up Keyword Tracking</h3>
                <p className="text-gray-300 mb-6">
                  Keyword tracking helps you monitor your search engine rankings and identify optimization opportunities.
                </p>

                <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    📈 Keyword Setup Process
                  </h4>
                  <ol className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-purple-400 font-bold min-w-fit">1.</span>
                      <p className="text-gray-300"><strong>Access Keywords Section:</strong> Navigate to the Keywords tab</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-400 font-bold min-w-fit">2.</span>
                      <p className="text-gray-300"><strong>Add Target Keywords:</strong> Enter keywords relevant to your business</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-400 font-bold min-w-fit">3.</span>
                      <p className="text-gray-300"><strong>Set Location Targeting:</strong> Choose geographic areas for local SEO</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-400 font-bold min-w-fit">4.</span>
                      <p className="text-gray-300"><strong>Configure Alerts:</strong> Set up notifications for ranking changes</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-400 font-bold min-w-fit">5.</span>
                      <p className="text-gray-300"><strong>Monitor Performance:</strong> Track rankings and search volume trends</p>
                    </li>
                  </ol>
                </div>
              </div>

              {/* Integrations */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Connecting External Accounts</h3>
                <p className="text-gray-300 mb-6">
                  Integrating with Google Search Console, Google Analytics, and other tools provides richer insights and
                  more accurate analysis.
                </p>

                <div className="bg-orange-600/10 border border-orange-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    🔗 Recommended Integrations
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-orange-400">→</span>
                      <p className="text-gray-300"><strong>Google Search Console:</strong> Import search data and verify ownership</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-orange-400">→</span>
                      <p className="text-gray-300"><strong>Google Analytics:</strong> Access traffic and conversion metrics</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-orange-400">→</span>
                      <p className="text-gray-300"><strong>Google Business Profile:</strong> Monitor local search performance</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-orange-400">→</span>
                      <p className="text-gray-300"><strong>Webmaster Tools:</strong> Connect Bing Webmaster Tools</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-orange-400">→</span>
                      <p className="text-gray-300"><strong>CMS Platforms:</strong> Direct integration with WordPress, Shopify</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Strategy */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Building Your SEO Strategy</h3>
                <p className="text-gray-300 mb-6">
                  With your audit results and keyword data, you can now build a comprehensive SEO strategy.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Quick Wins</h4>
                      <p className="text-gray-300 text-sm">Focus on high-impact, low-effort fixes first</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">📊</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Set Goals</h4>
                      <p className="text-gray-300 text-sm">Establish measurable SEO objectives</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">📝</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Content Calendar</h4>
                      <p className="text-gray-300 text-sm">Plan content around target keywords</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">⚔️</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Monitor Competitors</h4>
                      <p className="text-gray-300 text-sm">Analyze strategies and find opportunities</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Plan Benefits */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Maximizing Your Plan Benefits</h3>
                <p className="text-gray-300 mb-6">
                  Each AI SEO Turbo plan includes specific features and limits. Understanding your plan helps you make
                  the most of your investment.
                </p>

                <div className="bg-gradient-to-r from-pink-600/10 to-rose-600/10 border border-pink-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    💡 Plan Optimization Tips
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <p className="text-white font-semibold mb-1">🆓 Free Plan</p>
                      <p className="text-gray-300 text-sm">Perfect for testing - upgrade when needed</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <p className="text-white font-semibold mb-1">⭐ Pro Plan</p>
                      <p className="text-gray-300 text-sm">Ideal for small businesses and freelancers</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <p className="text-white font-semibold mb-1">🏢 Agency Plan</p>
                      <p className="text-gray-300 text-sm">Built for SEO agencies managing clients</p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <p className="text-white font-semibold mb-1">🚀 Enterprise</p>
                      <p className="text-gray-300 text-sm">Custom solutions for large organizations</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Getting Help and Support</h3>
                <p className="text-gray-300 mb-6">
                  Our comprehensive support system ensures you never get stuck. From detailed documentation to personal
                  assistance, we're here to help you succeed.
                </p>

                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">📚</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Help Center</h4>
                      <p className="text-gray-300 text-sm">Comprehensive guides and tutorials</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">🎥</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Video Tutorials</h4>
                      <p className="text-gray-300 text-sm">Step-by-step visual guides</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">👥</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Community Forum</h4>
                      <p className="text-gray-300 text-sm">Connect with other users and experts</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">💬</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Live Chat</h4>
                      <p className="text-gray-300 text-sm">Instant support for urgent questions</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">📧</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Email Support</h4>
                      <p className="text-gray-300 text-sm">Detailed assistance for complex issues</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Metrics */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Measuring Success and ROI</h3>
                <p className="text-gray-300 mb-6">
                  Track your SEO progress and demonstrate the value of your optimization efforts.
                </p>

                <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    📈 Key Metrics to Monitor
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-emerald-400">▲</span>
                      <p className="text-gray-300"><strong>Organic Traffic:</strong> Monitor increases in search-driven visits</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-emerald-400">▲</span>
                      <p className="text-gray-300"><strong>Keyword Rankings:</strong> Track position improvements for target terms</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-emerald-400">▲</span>
                      <p className="text-gray-300"><strong>Conversion Rates:</strong> Measure improvements in goal completions</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-emerald-400">▲</span>
                      <p className="text-gray-300"><strong>Technical Health:</strong> Monitor audit score improvements</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-emerald-400">▲</span>
                      <p className="text-gray-300"><strong>ROI Calculation:</strong> Compare SEO investment to revenue impact</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Closing CTA */}
              <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700/50">
                <h3 className="text-2xl font-bold text-white mb-4">Your SEO Success Journey Begins Now</h3>
                <p className="text-gray-300 mb-4">
                  Congratulations on taking the first step toward better SEO performance! AI SEO Turbo provides everything
                  you need to optimize your website, track your progress, and achieve measurable results. Whether you're
                  just starting your SEO journey or looking to enhance your existing strategy, our platform grows with you.
                </p>
                <p className="text-gray-300">
                  Remember: SEO is a long-term investment that compounds over time. Consistent use of AI SEO Turbo,
                  combined with implementation of our recommendations, will lead to sustainable growth in organic traffic
                  and search rankings. Start small, stay consistent, and watch your SEO performance soar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Articles List */}
        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {categoryArticles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300"
                >
                  <Link href={article.href} className="block">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-2 flex-shrink-0">
                          <article.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-gray-400 mb-4">
                            {article.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{article.time} read</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-green-400 transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Related Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Related Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/help/seo-tools-features"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-blue-400 transition-colors">SEO Tools & Features</div>
                    <div className="text-gray-400 text-sm">Master our AI-powered SEO toolkit</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                </Link>
                <Link
                  href="/help/account-billing"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-purple-400 transition-colors">Account & Billing</div>
                    <div className="text-gray-400 text-sm">Manage your subscription and payments</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                </Link>
              </div>
            </motion.div>

            {/* Need More Help */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 bg-green-500/10 border border-green-500/20 rounded-xl p-8 text-center"
            >
              <h3 className="text-white text-xl font-bold mb-4">Ready to get started?</h3>
              <p className="text-gray-400 mb-6">
                Follow our quick start guide to begin your SEO journey with AISEOTurbo.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/help/getting-started/quick-start"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Quick Start Guide
                </Link>
                <Link
                  href="/help"
                  className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Browse All Help
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
