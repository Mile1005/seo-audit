"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, CheckCircle, Settings, AlertTriangle, Target, Monitor, Smartphone, Palette } from 'lucide-react'
import Link from 'next/link'

export default function DashboardSetupPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        
        {/* JSON-LD Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to Set Up Your AISEOTurbo Dashboard",
              "description": "Complete guide to customizing and optimizing your AISEOTurbo dashboard for maximum productivity and efficiency.",
              "image": "https://aiseoturbo.com/help/dashboard-setup.jpg",
              "totalTime": "PT3M",
              "estimatedCost": {
                "@type": "MonetaryAmount",
                "currency": "USD",
                "value": "0"
              },
              "supply": [
                {
                  "@type": "HowToSupply",
                  "name": "AISEOTurbo Account"
                }
              ],
              "tool": [
                {
                  "@type": "HowToTool",
                  "name": "Web Browser"
                }
              ],
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Access Dashboard Settings",
                  "text": "Navigate to your dashboard and click the settings icon in the top right corner.",
                  "image": "https://aiseoturbo.com/help/dashboard-settings.jpg"
                },
                {
                  "@type": "HowToStep", 
                  "name": "Customize Layout",
                  "text": "Choose between grid, list, or card view for your projects and audit results.",
                  "image": "https://aiseoturbo.com/help/dashboard-layout.jpg"
                },
                {
                  "@type": "HowToStep",
                  "name": "Set Up Notifications",
                  "text": "Configure email and in-app notifications for audit completion and issue alerts.",
                  "image": "https://aiseoturbo.com/help/dashboard-notifications.jpg"
                }
              ],
              "author": {
                "@type": "Organization",
                "name": "AISEOTurbo",
                "url": "https://aiseoturbo.com"
              },
              "publisher": {
                "@type": "Organization", 
                "name": "AISEOTurbo",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://aiseoturbo.com/logo.png"
                }
              }
            })
          }}
        />

        {/* Breadcrumb */}
        <section className="bg-slate-900/50 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
              <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                Help Center
              </Link>
              <span className="text-gray-600" aria-hidden="true">/</span>
              <Link href="/help/category/getting-started" className="text-gray-400 hover:text-white transition-colors">
                Getting Started
              </Link>
              <span className="text-gray-600" aria-hidden="true">/</span>
              <span className="text-white">Setting up your dashboard</span>
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
                aria-label="Return to Help Center"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                Back to Help Center
              </Link>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3" aria-hidden="true">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-blue-400 text-sm font-medium">Getting Started</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Setting up your dashboard
                  </h1>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>3 min read</span>
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
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Target className="w-6 h-6 text-blue-400 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-2">What you'll learn</h3>
                    <p className="text-gray-300 mb-0">
                      Customize your AISEOTurbo dashboard for maximum productivity. Learn how to organize your workspace, 
                      set up notifications, and configure display preferences to match your workflow.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step-by-step Guide */}
              <h2 className="text-2xl font-bold text-white mb-6">Dashboard customization guide</h2>
              
              <div className="space-y-8">
                
                {/* Step 1 */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">Access dashboard settings</h3>
                      <p className="text-gray-300 mb-4">
                        Once logged in, navigate to your dashboard and look for the settings gear icon in the top-right corner. 
                        This opens your personalization panel where you can customize every aspect of your workspace.
                      </p>
                      <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 mb-4">
                        <h4 className="text-green-400 font-medium mb-2">✓ Quick Access Tip</h4>
                        <p className="text-gray-300 text-sm mb-0">
                          Use keyboard shortcut <kbd className="bg-slate-700 px-2 py-1 rounded text-xs">Ctrl + ,</kbd> to quickly open settings
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">Choose your layout preference</h3>
                      <p className="text-gray-300 mb-4">
                        Select the layout that works best for your workflow. Each option is designed for different use cases:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Monitor className="w-5 h-5 text-blue-400" aria-hidden="true" />
                            <h4 className="text-white font-medium">Grid View</h4>
                          </div>
                          <p className="text-gray-300 text-sm">Best for visual overview of multiple projects</p>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Smartphone className="w-5 h-5 text-green-400" aria-hidden="true" />
                            <h4 className="text-white font-medium">List View</h4>
                          </div>
                          <p className="text-gray-300 text-sm">Ideal for detailed project information</p>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Palette className="w-5 h-5 text-purple-400" aria-hidden="true" />
                            <h4 className="text-white font-medium">Card View</h4>
                          </div>
                          <p className="text-gray-300 text-sm">Perfect balance of visual and detailed info</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">Configure notification preferences</h3>
                      <p className="text-gray-300 mb-4">
                        Stay informed about important events without being overwhelmed. Customize your notification settings:
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" aria-hidden="true" />
                          <div>
                            <h4 className="text-white font-medium">Audit Completion</h4>
                            <p className="text-gray-400 text-sm">Get notified when your SEO audits finish processing</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5" aria-hidden="true" />
                          <div>
                            <h4 className="text-white font-medium">Critical Issues</h4>
                            <p className="text-gray-400 text-sm">Immediate alerts for urgent SEO problems</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" aria-hidden="true" />
                          <div>
                            <h4 className="text-white font-medium">Weekly Reports</h4>
                            <p className="text-gray-400 text-sm">Summary of your site's SEO performance</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">Organize your workspace</h3>
                      <p className="text-gray-300 mb-4">
                        Create a workflow that matches your needs by organizing projects and setting up custom filters:
                      </p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                          <span><strong>Project Groups:</strong> Organize sites by client, priority, or category</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                          <span><strong>Custom Tags:</strong> Label projects for easy filtering and search</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                          <span><strong>Quick Actions:</strong> Set up shortcuts for frequent tasks</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                          <span><strong>Default Views:</strong> Save your preferred filters and sorting options</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Tips */}
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-6 mt-12">
                <div className="flex items-start gap-4">
                  <Settings className="w-6 h-6 text-blue-400 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-blue-400 text-lg font-semibold mb-2">Advanced customization tips</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• <strong>Keyboard Shortcuts:</strong> Enable advanced shortcuts for power users in Settings → Accessibility</li>
                      <li>• <strong>API Integration:</strong> Connect your dashboard to external tools via our REST API</li>
                      <li>• <strong>Team Collaboration:</strong> Share custom dashboard layouts with team members</li>
                      <li>• <strong>Dark/Light Mode:</strong> Switch themes based on time of day or personal preference</li>
                      <li>• <strong>Export Settings:</strong> Backup your configuration for easy restoration</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Troubleshooting */}
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-6 mt-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-yellow-400 text-lg font-semibold mb-2">Common issues & solutions</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-white font-medium">Settings not saving?</h4>
                        <p className="text-gray-300 text-sm">Clear your browser cache and ensure you have a stable internet connection.</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Layout looks broken?</h4>
                        <p className="text-gray-300 text-sm">Try refreshing the page or resetting to default layout in Settings → Reset.</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Missing notifications?</h4>
                        <p className="text-gray-300 text-sm">Check your browser's notification permissions and email spam folder.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <h2 className="text-2xl font-bold text-white mt-12 mb-6">Next steps</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link 
                  href="/help/getting-started/first-audit"
                  className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
                  aria-label="Learn how to create your first SEO audit"
                >
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    Create your first audit
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Now that your dashboard is set up, learn how to run your first comprehensive SEO audit
                  </p>
                </Link>
                
                <Link 
                  href="/help/getting-started/seo-scores"
                  className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
                  aria-label="Understand SEO scoring system"
                >
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    Understanding SEO scores
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Learn how we calculate scores and what each metric means for your website
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
