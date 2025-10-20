"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { Breadcrumbs } from '../../../../components/navigation/breadcrumbs'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, RefreshCw, AlertTriangle, CheckCircle, Wifi, Database, Settings, Zap, Monitor, Smartphone } from 'lucide-react'
import Link from 'next/link'

export default function SyncIssuesPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.aiseoturbo.com' },
            { name: 'Help', url: 'https://www.aiseoturbo.com/help' },
            { name: 'Troubleshooting', url: 'https://www.aiseoturbo.com/help/troubleshooting' },
            { name: 'Sync Issues', url: 'https://www.aiseoturbo.com/help/troubleshooting/sync-issues' }
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
                href="/help"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Help Center
              </Link>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 p-3">
                  <RefreshCw className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-yellow-400 text-sm font-medium">Troubleshooting</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Sync issues
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>5 min read</span>
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
                  <Database className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">Data synchronization problems</h2>
                    <p className="text-gray-300 mb-0">
                      Having trouble with data not syncing between devices or seeing outdated information?
                      This guide covers common sync issues and how to resolve them.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Checks */}
              <h2 className="text-2xl font-bold text-white mb-6">Quick checks to try first</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Wifi className="w-6 h-6 text-green-400" />
                    <h3 className="text-white font-semibold">Check your connection</h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• Ensure stable internet connection</div>
                    <div>• Try switching networks (WiFi/cellular)</div>
                    <div>• Check if other apps are working</div>
                    <div>• Restart your router if needed</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <RefreshCw className="w-6 h-6 text-blue-400" />
                    <h3 className="text-white font-semibold">Manual sync</h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• Look for sync/refresh buttons</div>
                    <div>• Pull down to refresh (mobile)</div>
                    <div>• Force refresh browser (Ctrl+F5)</div>
                    <div>• Wait a few minutes and try again</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Monitor className="w-6 h-6 text-purple-400" />
                    <h3 className="text-white font-semibold">Restart applications</h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• Close and reopen the app</div>
                    <div>• Clear app cache if available</div>
                    <div>• Restart your device</div>
                    <div>• Update to latest version</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="w-6 h-6 text-orange-400" />
                    <h3 className="text-white font-semibold">Check sync settings</h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• Verify sync is enabled</div>
                    <div>• Check sync frequency settings</div>
                    <div>• Ensure background sync is on</div>
                    <div>• Review account permissions</div>
                  </div>
                </div>

              </div>

              {/* Common Sync Issues */}
              <h3 className="text-2xl font-bold text-white mb-6">Common sync problems</h3>

              <div className="space-y-6 mb-8">

                {/* Outdated Data */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <RefreshCw className="w-6 h-6 text-blue-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Data appears outdated</h3>
                      <p className="text-gray-300 mb-4">
                        You're seeing old information that hasn't updated with recent changes.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-white font-medium">Force refresh</span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Use Ctrl+F5 (Windows) or Cmd+Shift+R (Mac) to hard refresh your browser.
                          </p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-white font-medium">Check sync status</span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Look for sync indicators in the app. Some changes may take a few minutes to propagate.
                          </p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-white font-medium">Clear cache</span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Clear your browser cache and cookies, then log back in to force a fresh sync.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sync Errors */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-red-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Sync errors or failures</h3>
                      <p className="text-gray-300 mb-4">
                        Sync is failing with error messages or not completing successfully.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-red-400 font-medium mb-1">Error Messages:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• "Network timeout" - Check internet connection</li>
                            <li>• "Authentication failed" - Re-login to refresh tokens</li>
                            <li>• "Storage quota exceeded" - Free up space or upgrade plan</li>
                            <li>• "Rate limit exceeded" - Wait and try again later</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-green-400 font-medium mb-1">Solutions:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Check error details for specific guidance</li>
                            <li>• Retry the sync operation</li>
                            <li>• Contact support if errors persist</li>
                            <li>• Check service status page</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Device Sync Issues */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Smartphone className="w-6 h-6 text-purple-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Not syncing between devices</h3>
                      <p className="text-gray-300 mb-4">
                        Changes made on one device aren't appearing on others.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-purple-400 font-medium mb-1">Cross-Device Sync:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Ensure all devices are logged into same account</li>
                            <li>• Check that sync is enabled on all devices</li>
                            <li>• Verify devices have internet access</li>
                            <li>• Restart apps on all devices</li>
                            <li>• Check for app updates on all devices</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-purple-400 font-medium mb-1">Account Verification:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Confirm same email address on all devices</li>
                            <li>• Check account status and permissions</li>
                            <li>• Verify billing status (sync may be limited on free accounts)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slow Sync */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Zap className="w-6 h-6 text-yellow-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Sync is very slow</h3>
                      <p className="text-gray-300 mb-4">
                        Synchronization is taking much longer than usual.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-yellow-400 font-medium mb-1">Performance Factors:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Large amounts of data to sync</li>
                            <li>• Slow internet connection</li>
                            <li>• High server load (check status page)</li>
                            <li>• Many devices syncing simultaneously</li>
                            <li>• Background processes interfering</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-yellow-400 font-medium mb-1">Optimization Tips:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Sync during off-peak hours</li>
                            <li>• Close other bandwidth-intensive apps</li>
                            <li>• Ensure stable, fast internet connection</li>
                            <li>• Consider upgrading your plan for faster sync</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Advanced Troubleshooting */}
              <h3 className="text-2xl font-bold text-white mb-6">Advanced troubleshooting</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Database className="w-5 h-5 text-blue-400" />
                    Account Settings
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Verify account is in good standing</li>
                    <li>• Check billing status</li>
                    <li>• Ensure account hasn't been suspended</li>
                    <li>• Confirm email verification status</li>
                    <li>• Check for any account flags</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-green-400" />
                    Application Settings
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Reset sync settings to defaults</li>
                    <li>• Clear all application data</li>
                    <li>• Reinstall the application</li>
                    <li>• Check for conflicting applications</li>
                    <li>• Verify system permissions</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-purple-400" />
                    Network Issues
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Test with different networks</li>
                    <li>• Check firewall/proxy settings</li>
                    <li>• Verify DNS resolution</li>
                    <li>• Test with VPN on/off</li>
                    <li>• Check for ISP restrictions</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-orange-400" />
                    Device Issues
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Check available storage space</li>
                    <li>• Verify system compatibility</li>
                    <li>• Update operating system</li>
                    <li>• Check for malware/viruses</li>
                    <li>• Test on different devices</li>
                  </ul>
                </div>

              </div>

              {/* Sync Status Dashboard */}
              <h3 className="text-2xl font-bold text-white mb-6">Checking sync status</h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <h3 className="text-white font-semibold mb-4">How to check your sync status:</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Dashboard Indicator</h4>
                      <p className="text-gray-300 text-sm">
                        Look for sync status indicators in your account dashboard or app settings.
                        Green usually means healthy, yellow/orange means issues, red means errors.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Last Sync Time</h4>
                      <p className="text-gray-300 text-sm">
                        Check when your last successful sync occurred. If it's been more than a few hours,
                        there may be an issue that needs attention.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Error Logs</h4>
                      <p className="text-gray-300 text-sm">
                        Review any error messages or logs that might provide clues about what's going wrong.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Service Status</h4>
                      <p className="text-gray-300 text-sm">
                        Check our status page for any ongoing service issues that might affect sync.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prevention */}
              <h3 className="text-2xl font-bold text-white mb-6">Preventing sync issues</h3>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Maintain stable connections</h4>
                      <p className="text-gray-300 text-sm">
                        Use reliable internet connections and avoid switching networks frequently during sync operations.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Keep apps updated</h4>
                      <p className="text-gray-300 text-sm">
                        Regularly update your applications to ensure you have the latest sync improvements and bug fixes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Monitor storage space</h4>
                      <p className="text-gray-300 text-sm">
                        Keep adequate free space on your devices and accounts to prevent sync interruptions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Regular maintenance</h4>
                      <p className="text-gray-300 text-sm">
                        Periodically clear caches, restart applications, and check sync settings to keep everything running smoothly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Still Having Issues */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">Still experiencing sync problems?</h3>
                <p className="text-gray-300 mb-4">
                  If the troubleshooting steps above don't resolve your sync issues, our technical support team can help investigate further.
                  Please provide details about your setup and the specific problems you're experiencing.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Contact Technical Support
                  </Link>
                  <Link
                    href="/help/troubleshooting/performance"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Performance Issues
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
