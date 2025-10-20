"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { Breadcrumbs } from '../../../../components/navigation/breadcrumbs'
import { StructuredData, generateHowToSchema } from '../../../../components/seo/StructuredData'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, CheckCircle, Zap, AlertTriangle, Target, Play, Rocket, Globe, BarChart3, Settings, Star } from 'lucide-react'
import Link from 'next/link'

export default function QuickStartPage() {
  const howToSchema = generateHowToSchema({
    name: "AISEOTurbo Quick Start Guide: Complete Setup in 10 Minutes",
    description: "Get started with AISEOTurbo's AI-powered SEO tools in just 10 minutes. Complete guide from account setup to your first audit results.",
    totalTime: "PT10M", // 10 minutes
    url: "https://www.aiseoturbo.com/help/getting-started/quick-start",
    datePublished: "2025-03-01T10:00:00+00:00",
    steps: [
      {
        name: "Create Your Account",
        text: "Sign up for AISEOTurbo with your email and verify your account."
      },
      {
        name: "Add Your First Website",
        text: "Enter your website URL and configure basic settings."
      },
      {
        name: "Run Your First Audit",
        text: "Launch a comprehensive SEO audit and wait for AI analysis to complete."
      },
      {
        name: "Review Results",
        text: "Analyze your SEO score and prioritize recommended improvements."
      }
    ]
  });

  return (
    <MainLayout>
      <StructuredData data={howToSchema} />
      <div className="min-h-screen bg-slate-950">
        
        {/* Breadcrumb */}
        <section className="bg-slate-900/50 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: 'Help Center', url: 'https://www.aiseoturbo.com/help' },
                { name: 'Getting Started', url: 'https://www.aiseoturbo.com/help/getting-started' },
                { name: 'Quick start guide', url: 'https://www.aiseoturbo.com/help/getting-started/quick-start' }
              ]}
              darkMode={true}
            />
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
                aria-label="Return to Help Center"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                Back to Help Center
              </Link>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3" aria-hidden="true">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-blue-400 text-sm font-medium">Getting Started</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Quick start guide
                  </h1>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>10 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" aria-hidden="true" />
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
              <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border border-green-700/50 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Target className="w-8 h-8 text-green-400 mt-1" aria-hidden="true" />
                  <div>
                    <h2 className="text-white text-xl font-bold mb-3">Get started in 10 minutes</h2>
                    <p className="text-gray-300 mb-4">
                      Welcome to AISEOTurbo! This quick start guide will have you running your first AI-powered SEO audit in just 10 minutes. 
                      Follow these simple steps to unlock powerful insights about your website's search performance.
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Play className="w-4 h-4 text-green-400" aria-hidden="true" />
                        <span className="text-green-300">4 simple steps</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-400" aria-hidden="true" />
                        <span className="text-yellow-300">Instant results</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-blue-400" aria-hidden="true" />
                        <span className="text-blue-300">No technical knowledge required</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <h3 className="text-white text-lg font-semibold mb-4">Your journey to SEO success</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold">1</div>
                    <div>
                      <div className="text-white font-medium text-sm">Sign Up</div>
                      <div className="text-gray-400 text-xs">2 minutes</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">2</div>
                    <div>
                      <div className="text-white font-medium text-sm">Add Website</div>
                      <div className="text-gray-400 text-xs">1 minute</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">3</div>
                    <div>
                      <div className="text-white font-medium text-sm">Run Audit</div>
                      <div className="text-gray-400 text-xs">3 minutes</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white text-sm font-bold">4</div>
                    <div>
                      <div className="text-white font-medium text-sm">Get Results</div>
                      <div className="text-gray-400 text-xs">4 minutes</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step-by-step Guide */}
              <h2 className="text-2xl font-bold text-white mb-8">Let's get started!</h2>
              
              <div className="space-y-8">
                
                {/* Step 1 */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">Create your account (2 minutes)</h3>
                      <p className="text-gray-300 mb-4">
                        Start your SEO journey by creating a free AISEOTurbo account. You'll get immediate access to our powerful audit tools.
                      </p>
                      
                      <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 mb-4">
                        <h4 className="text-white font-medium mb-3">What you'll need:</h4>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                            <span>A valid email address</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                            <span>Your website URL</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                            <span>2 minutes of your time</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-blue-900/30 border border-blue-600/30 rounded-lg p-4">
                        <h4 className="text-blue-400 font-medium mb-2">💡 Pro tip</h4>
                        <p className="text-gray-300 text-sm">
                          Use your business email for better organization and to receive important audit notifications.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">Add your website (1 minute)</h3>
                      <p className="text-gray-300 mb-4">
                        Once logged in, add your website to start monitoring its SEO health. Our AI will immediately begin analyzing your site structure.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">Enter your website details:</h4>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Globe className="w-5 h-5 text-blue-400" aria-hidden="true" />
                              <div>
                                <span className="text-gray-300 text-sm">Website URL:</span>
                                <code className="ml-2 text-green-400 bg-slate-800 px-2 py-1 rounded text-sm">https://yoursite.com</code>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Settings className="w-5 h-5 text-purple-400" aria-hidden="true" />
                              <span className="text-gray-300 text-sm">Choose audit frequency (optional)</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <BarChart3 className="w-5 h-5 text-orange-400" aria-hidden="true" />
                              <span className="text-gray-300 text-sm">Set up competitor tracking (optional)</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-yellow-900/30 border border-yellow-600/30 rounded-lg p-4">
                          <h4 className="text-yellow-400 font-medium mb-2">⚠️ Important</h4>
                          <p className="text-gray-300 text-sm">
                            Make sure your website is publicly accessible. Private or password-protected sites need special configuration.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">Run your first audit (3 minutes)</h3>
                      <p className="text-gray-300 mb-4">
                        Launch a comprehensive SEO audit with one click. Our AI will analyze over 200 SEO factors and provide actionable insights.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-3">What happens during the audit:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span className="text-gray-300 text-sm">Page structure analysis</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span className="text-gray-300 text-sm">Content optimization check</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                <span className="text-gray-300 text-sm">Technical SEO review</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                <span className="text-gray-300 text-sm">Performance metrics</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span className="text-gray-300 text-sm">Mobile optimization</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                <span className="text-gray-300 text-sm">Security assessment</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-green-900/30 border border-green-600/30 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <Zap className="w-5 h-5 text-green-400" aria-hidden="true" />
                            <h4 className="text-green-400 font-medium">Real-time progress</h4>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Watch as our AI processes your site in real-time. You'll see progress indicators for each analysis phase.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">Review your results (4 minutes)</h3>
                      <p className="text-gray-300 mb-4">
                        Congratulations! Your first audit is complete. Now let's understand what the results mean and how to prioritize improvements.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-3">Your audit dashboard includes:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <BarChart3 className="w-5 h-5 text-blue-400 mt-0.5" aria-hidden="true" />
                                <div>
                                  <h5 className="text-white font-medium text-sm">Overall SEO Score</h5>
                                  <p className="text-gray-400 text-xs">Your site's health rating (0-100)</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" aria-hidden="true" />
                                <div>
                                  <h5 className="text-white font-medium text-sm">Critical Issues</h5>
                                  <p className="text-gray-400 text-xs">Urgent problems to fix first</p>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" aria-hidden="true" />
                                <div>
                                  <h5 className="text-white font-medium text-sm">Optimization Wins</h5>
                                  <p className="text-gray-400 text-xs">Quick improvements you can make</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <Target className="w-5 h-5 text-purple-400 mt-0.5" aria-hidden="true" />
                                <div>
                                  <h5 className="text-white font-medium text-sm">Action Plan</h5>
                                  <p className="text-gray-400 text-xs">Prioritized list of improvements</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-purple-900/30 border border-purple-600/30 rounded-lg p-4">
                          <h4 className="text-purple-400 font-medium mb-2">🎯 Focus on impact</h4>
                          <p className="text-gray-300 text-sm">
                            Start with high-impact, low-effort improvements. Our AI ranks suggestions by potential SEO benefit and implementation difficulty.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Next Section */}
              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700/50 rounded-xl p-8 mt-12">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">🎉 Congratulations! You're all set!</h2>
                <p className="text-gray-300 text-center mb-8">
                  You've successfully completed your first SEO audit. Here's what you can do next to maximize your results:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3 mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Implement Quick Fixes</h3>
                    <p className="text-gray-400 text-sm">Start with the easiest improvements for immediate SEO gains</p>
                  </div>
                  
                  <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-3 mx-auto mb-3">
                      <BarChart3 className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Monitor Progress</h3>
                    <p className="text-gray-400 text-sm">Schedule regular audits to track your SEO improvements</p>
                  </div>
                  
                  <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 p-3 mx-auto mb-3">
                      <Rocket className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Explore Advanced Features</h3>
                    <p className="text-gray-400 text-sm">Discover competitor analysis, keyword tracking, and more</p>
                  </div>
                </div>
              </div>

              {/* Common Questions */}
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-6 mt-12">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-yellow-400 text-lg font-semibold mb-4">Common first-time questions</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium">How often should I run audits?</h4>
                        <p className="text-gray-300 text-sm">For active sites: weekly. For stable sites: monthly. After major changes: immediately.</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Can I audit multiple websites?</h4>
                        <p className="text-gray-300 text-sm">Yes! Add as many sites as your plan allows. Each gets its own dashboard and tracking.</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">What if my score is low?</h4>
                        <p className="text-gray-300 text-sm">Don't worry! Follow our recommendations step-by-step. Most users see 20+ point improvements within 30 days.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <h2 className="text-2xl font-bold text-white mt-12 mb-6">Recommended next steps</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link 
                  href="/help/getting-started/dashboard-setup"
                  className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
                  aria-label="Learn how to set up your dashboard"
                >
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    Customize your dashboard
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Personalize your workspace for maximum productivity and efficiency
                  </p>
                </Link>
                
                <Link 
                  href="/help/features/seo-audit"
                  className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
                  aria-label="Learn about advanced audit features"
                >
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    Advanced audit features
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Discover powerful tools for deep SEO analysis and optimization
                  </p>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
