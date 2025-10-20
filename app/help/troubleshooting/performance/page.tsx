"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { Breadcrumbs } from '../../../../components/navigation/breadcrumbs'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, Zap, AlertTriangle, CheckCircle, Monitor, Smartphone, Wifi, Database, Settings, Cpu } from 'lucide-react'
import Link from 'next/link'

export default function PerformancePage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.aiseoturbo.com' },
            { name: 'Help', url: 'https://www.aiseoturbo.com/help' },
            { name: 'Troubleshooting', url: 'https://www.aiseoturbo.com/help/troubleshooting' },
            { name: 'Performance Issues', url: 'https://www.aiseoturbo.com/help/troubleshooting/performance' }
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-green-400 text-sm font-medium">Troubleshooting</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Performance issues
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>6 min read</span>
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
                  <Cpu className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">Slow performance troubleshooting</h2>
                    <p className="text-gray-300 mb-0">
                      Experiencing slow loading times, lag, or poor responsiveness? This guide helps you identify
                      and resolve common performance issues across devices and platforms.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Performance Checks */}
              <h2 className="text-2xl font-bold text-white mb-6">Quick performance checks</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Wifi className="w-6 h-6 text-blue-400" />
                    <h3 className="text-white font-semibold">Network connection</h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• Test internet speed (fast.com)</div>
                    <div>• Check ping to our servers</div>
                    <div>• Try different networks</div>
                    <div>• Disable VPN temporarily</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Monitor className="w-6 h-6 text-green-400" />
                    <h3 className="text-white font-semibold">Device resources</h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• Check CPU and memory usage</div>
                    <div>• Close unnecessary applications</div>
                    <div>• Free up disk space</div>
                    <div>• Restart your device</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Settings className="w-6 h-6 text-purple-400" />
                    <h3 className="text-white font-semibold">Browser optimization</h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• Clear browser cache and cookies</div>
                    <div>• Disable browser extensions</div>
                    <div>• Update to latest browser version</div>
                    <div>• Try incognito/private mode</div>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="w-6 h-6 text-orange-400" />
                    <h3 className="text-white font-semibold">Application updates</h3>
                  </div>
                  <div className="space-y-3 text-gray-300 text-sm">
                    <div>• Check for app updates</div>
                    <div>• Update operating system</div>
                    <div>• Clear app cache/data</div>
                    <div>• Reinstall if necessary</div>
                  </div>
                </div>

              </div>

              {/* Common Performance Issues */}
              <h3 className="text-2xl font-bold text-white mb-6">Common performance problems</h3>

              <div className="space-y-6 mb-8">

                {/* Slow Loading */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Zap className="w-6 h-6 text-yellow-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Slow page loading</h3>
                      <p className="text-gray-300 mb-4">
                        Pages are taking longer than usual to load or become interactive.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-white font-medium">Network issues</span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Slow internet, high latency, or network congestion can cause loading delays.
                            Try a speed test and consider switching networks.
                          </p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-white font-medium">Browser cache</span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            Old cached files can slow down loading. Clear your browser cache and hard refresh (Ctrl+F5).
                          </p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-white font-medium">Server load</span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            High server load during peak times can slow responses. Check our status page for incidents.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lag and Responsiveness */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-red-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Interface lag and unresponsiveness</h3>
                      <p className="text-gray-300 mb-4">
                        The interface feels sluggish, buttons don't respond immediately, or animations are choppy.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-red-400 font-medium mb-1">Device Performance:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Close other resource-intensive applications</li>
                            <li>• Check available RAM and CPU usage</li>
                            <li>• Restart your device to clear memory</li>
                            <li>• Update device drivers and firmware</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-red-400 font-medium mb-1">Browser Issues:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Disable browser extensions temporarily</li>
                            <li>• Reduce number of open tabs</li>
                            <li>• Update browser to latest version</li>
                            <li>• Try a different browser</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SEO Audit Speed */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Database className="w-6 h-6 text-blue-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">Slow SEO audits</h3>
                      <p className="text-gray-300 mb-4">
                        Website audits are taking much longer than expected to complete.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-blue-400 font-medium mb-1">Audit Factors:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Large websites take longer to crawl</li>
                            <li>• Slow target website response times</li>
                            <li>• High crawl depth settings</li>
                            <li>• Current server load and queue</li>
                            <li>• Network connectivity issues</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-blue-400 font-medium mb-1">Optimization Tips:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Reduce crawl depth for faster results</li>
                            <li>• Audit during off-peak hours</li>
                            <li>• Consider upgrading to Pro plan for faster processing</li>
                            <li>• Check target website performance first</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Memory Issues */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Cpu className="w-6 h-6 text-purple-400 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3">High memory usage</h3>
                      <p className="text-gray-300 mb-4">
                        The application is using excessive memory, causing slowdowns or crashes.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-purple-400 font-medium mb-1">Memory Management:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Close other memory-intensive applications</li>
                            <li>• Clear browser cache and temporary files</li>
                            <li>• Restart the application or browser</li>
                            <li>• Check for memory leaks in browser dev tools</li>
                            <li>• Consider using a lighter browser</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3">
                          <div className="text-purple-400 font-medium mb-1">Device Resources:</div>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Ensure adequate RAM for your usage</li>
                            <li>• Close unnecessary background processes</li>
                            <li>• Update device firmware and drivers</li>
                            <li>• Consider hardware upgrades if needed</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Platform-Specific Issues */}
              <h3 className="text-2xl font-bold text-white mb-6">Platform-specific optimizations</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-blue-400" />
                    Desktop Browsers
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Use Chrome or Firefox for best performance</li>
                    <li>• Enable hardware acceleration in settings</li>
                    <li>• Keep browser updated automatically</li>
                    <li>• Use browser task manager to identify issues</li>
                    <li>• Consider using beta versions for latest features</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-green-400" />
                    Mobile Devices
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Ensure stable cellular/WiFi connection</li>
                    <li>• Close background apps to free memory</li>
                    <li>• Clear app cache regularly</li>
                    <li>• Update device OS and apps</li>
                    <li>• Consider using desktop site for complex tasks</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-purple-400" />
                    Network Optimization
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Use wired connection when possible</li>
                    <li>• Avoid public WiFi for sensitive work</li>
                    <li>• Check for network interference</li>
                    <li>• Use a VPN only if necessary</li>
                    <li>• Monitor network latency and packet loss</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Database className="w-5 h-5 text-orange-400" />
                    Data Management
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Regularly archive old audit data</li>
                    <li>• Clean up unused keyword lists</li>
                    <li>• Optimize database queries</li>
                    <li>• Use data compression features</li>
                    <li>• Monitor storage usage and limits</li>
                  </ul>
                </div>

              </div>

              {/* Performance Monitoring */}
              <h3 className="text-2xl font-bold text-white mb-6">Monitoring performance</h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <h3 className="text-white font-semibold mb-4">Tools to monitor and diagnose performance:</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Browser Developer Tools</h4>
                      <p className="text-gray-300 text-sm">
                        Use Network and Performance tabs in browser dev tools to identify bottlenecks.
                        Look for slow requests, large files, and rendering issues.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">System Monitoring</h4>
                      <p className="text-gray-300 text-sm">
                        Monitor CPU, memory, disk, and network usage with system tools.
                        Identify resource-intensive processes and optimize accordingly.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Network Testing</h4>
                      <p className="text-gray-300 text-sm">
                        Use tools like ping, traceroute, and speed tests to diagnose network issues.
                        Check for packet loss, high latency, or bandwidth limitations.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Application Metrics</h4>
                      <p className="text-gray-300 text-sm">
                        Review audit completion times, error rates, and usage patterns.
                        Compare performance across different times and conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pro Tips */}
              <h3 className="text-2xl font-bold text-white mb-6">Advanced performance tips</h3>

              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Optimize audit settings</h4>
                      <p className="text-gray-300 text-sm">
                        Adjust crawl depth, frequency, and scope based on your needs.
                        More comprehensive audits take longer but provide better insights.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Schedule strategically</h4>
                      <p className="text-gray-300 text-sm">
                        Run large audits during off-peak hours when server load is lower.
                        Use scheduling features to automate routine audits.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Use appropriate plans</h4>
                      <p className="text-gray-300 text-sm">
                        Higher-tier plans offer faster processing, more concurrent audits,
                        and priority queuing for better performance.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Monitor and optimize</h4>
                      <p className="text-gray-300 text-sm">
                        Regularly review performance metrics and adjust your usage patterns.
                        Identify bottlenecks and optimize your workflow accordingly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* When to Contact Support */}
              <h3 className="text-2xl font-bold text-white mb-6">When to contact support</h3>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-8 h-8 text-blue-400 mt-1" />
                  <div>
                    <h3 className="text-blue-400 text-lg font-semibold mb-3">Persistent performance issues</h3>
                    <p className="text-gray-300 mb-4">
                      If performance problems persist after trying all troubleshooting steps,
                      our technical support team can investigate server-side issues or account-specific problems.
                    </p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-white font-medium mb-1">What to include in your report:</h4>
                        <ul className="text-gray-300 text-sm space-y-1">
                          <li>• Device and browser information</li>
                          <li>• Network speed test results</li>
                          <li>• Screenshots of performance issues</li>
                          <li>• Timeline of when problems occur</li>
                          <li>• Steps to reproduce the issue</li>
                          <li>• Any error messages or console logs</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prevention */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">Maintaining optimal performance</h3>
                <p className="text-gray-300 mb-4">
                  Regular maintenance and best practices can prevent most performance issues.
                  Keep your systems updated and monitor performance proactively.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Report Performance Issue
                  </Link>
                  <Link
                    href="/help/troubleshooting/sync-issues"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Sync Issues
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
