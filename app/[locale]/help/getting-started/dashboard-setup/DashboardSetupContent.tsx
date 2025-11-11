"use client"

import { motion } from 'framer-motion'
import { CheckCircle, Settings, Target, Monitor, Smartphone, Palette, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function DashboardSetupContent() {
  return (
    <section className="pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg prose-invert max-w-none"
        >

          <h1 className="sr-only">Dashboard Setup Guide - Customize Your Workspace</h1>

          {/* Introduction */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <Target className="w-6 h-6 text-blue-400 mt-1" aria-hidden="true" />
              <div>
                <h2 className="text-white text-lg font-semibold mb-2">What you'll learn</h2>
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
                  <li>• <strong>Export Settings:</strong> Backup your custom configurations for easy migration</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-6 mt-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mt-1" aria-hidden="true" />
              <div>
                <h3 className="text-yellow-400 text-lg font-semibold mb-4">Common questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium">Can I reset my dashboard to default settings?</h4>
                    <p className="text-gray-300 text-sm">Yes, go to Settings → Reset → Restore Defaults. This won't affect your audit data.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Do settings sync across devices?</h4>
                    <p className="text-gray-300 text-sm">Yes, your preferences are saved to your account and sync automatically.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Can I create multiple dashboard layouts?</h4>
                    <p className="text-gray-300 text-sm">Currently, you can save one custom layout per account, but we're working on multiple layouts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <h3 className="text-2xl font-bold text-white mt-12 mb-6">Next steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/help/getting-started/seo-scores"
              className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
              aria-label="Learn about SEO scores and what they mean"
            >
              <h4 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                Understanding SEO scores
              </h4>
              <p className="text-gray-400 text-sm">
                Learn what your SEO score means and how to improve it
              </p>
            </Link>

            <Link
              href="/help/getting-started/first-audit"
              className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
              aria-label="Learn how to run your first SEO audit"
            >
              <h4 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                Running your first audit
              </h4>
              <p className="text-gray-400 text-sm">
                Step-by-step guide to launching and understanding your first SEO audit
              </p>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}