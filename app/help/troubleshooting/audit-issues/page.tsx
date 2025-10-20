"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { Breadcrumbs } from '../../../../components/navigation/breadcrumbs'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, User, CheckCircle, AlertTriangle, Target, Zap, RefreshCw, Globe, Search, Bug, HelpCircle } from 'lucide-react'
import Link from 'next/link'

export default function AuditIssuesPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        
        {/* JSON-LD Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Fix SEO Audit Issues - AISEOTurbo Troubleshooting",
                "description": "Complete troubleshooting guide for fixing SEO audit issues in AISEOTurbo. Solutions for stuck audits, timeout errors, and technical problems.",
                "image": {
                  "@type": "ImageObject",
                  "url": "https://aiseoturbo.com/help/troubleshooting-audits.jpg",
                  "width": 1200,
                  "height": 630
                },
                "step": [
                  {
                    "@type": "HowToStep",
                    "name": "Check if audit is stuck",
                    "text": "If your audit appears stuck at 'Analyzing...', this may be due to large site size, server response delays, or network connectivity issues.",
                    "url": "https://www.aiseoturbo.com/help/troubleshooting/audit-issues#stuck"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Refresh or restart the audit",
                    "text": "Try refreshing the page or restarting the audit to resolve temporary connectivity issues.",
                    "url": "https://www.aiseoturbo.com/help/troubleshooting/audit-issues#restart"
                  },
                  {
                    "@type": "HowToStep",
                    "name": "Handle timeout errors",
                    "text": "For timeout errors on large websites, try limiting the audit scope to specific pages or contact support for enterprise solutions.",
                    "url": "https://www.aiseoturbo.com/help/troubleshooting/audit-issues#timeout"
                  }
                ],
                "author": {
                  "@type": "Organization",
                  "name": "AISEOTurbo",
                  "url": "https://aiseoturbo.com"
                },
                "datePublished": "2025-03-01",
                "dateModified": "2025-03-15"
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Why is my SEO audit stuck at 'Analyzing...'?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Audits may appear stuck due to large site size, server response delays, or network connectivity issues. Try refreshing the page or restarting the audit."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What should I do if my audit times out?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Audit timeouts usually occur with very large websites. Try limiting the audit scope to specific pages or contact support for enterprise solutions."
                    }
                  }
                ]
              }
            ])
          }}
        />

        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: 'Home', url: 'https://www.aiseoturbo.com' },
            { name: 'Help', url: 'https://www.aiseoturbo.com/help' },
            { name: 'Troubleshooting', url: 'https://www.aiseoturbo.com/help/troubleshooting' },
            { name: 'Audit Issues', url: 'https://www.aiseoturbo.com/help/troubleshooting/audit-issues' }
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
                aria-label="Return to Help Center"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
                Back to Help Center
              </Link>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 p-3" aria-hidden="true">
                  <Bug className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-blue-400 text-sm font-medium">Troubleshooting</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Audit not completing
                  </h1>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>6 min read</span>
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
                    <h2 className="text-white text-lg font-semibold mb-2">Quick resolution guide</h2>
                    <p className="text-gray-300 mb-0">
                      Having trouble with stuck or incomplete audits? This guide covers the most common issues and their solutions. 
                      Most problems can be resolved in just a few minutes with the right approach.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Diagnostics */}
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-6 mb-8">
                <h3 className="text-blue-400 text-lg font-semibold mb-4">🔍 Quick diagnostics checklist</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" aria-hidden="true" />
                      <span className="text-gray-300 text-sm">Is your website publicly accessible?</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" aria-hidden="true" />
                      <span className="text-gray-300 text-sm">Is your internet connection stable?</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" aria-hidden="true" />
                      <span className="text-gray-300 text-sm">Have you waited at least 5 minutes?</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" aria-hidden="true" />
                      <span className="text-gray-300 text-sm">Does your site respond quickly (&lt;10s)?</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" aria-hidden="true" />
                      <span className="text-gray-300 text-sm">Are you using the correct URL format?</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" aria-hidden="true" />
                      <span className="text-gray-300 text-sm">Have you tried refreshing the page?</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Issues & Solutions */}
              <h2 className="text-2xl font-bold text-white mb-6">Common issues & solutions</h2>
              
              <div className="space-y-8">
                
                {/* Issue 1: Stuck at Analyzing */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 p-2">
                      <RefreshCw className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">🔄 Audit stuck at "Analyzing..."</h3>
                      <p className="text-gray-300 mb-4">
                        This is the most common issue, usually caused by network delays or large site complexity.
                      </p>
                      
                      <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 mb-4">
                        <h4 className="text-white font-medium mb-3">Step-by-step solution:</h4>
                        <ol className="space-y-2 text-gray-300 list-decimal list-inside">
                          <li>Wait 5-10 minutes (large sites take longer)</li>
                          <li>Refresh your browser page (Ctrl+F5 or Cmd+R)</li>
                          <li>Check if the audit status changed</li>
                          <li>If still stuck, cancel and restart the audit</li>
                          <li>Try auditing during off-peak hours (early morning/late evening)</li>
                        </ol>
                      </div>

                      <div className="bg-green-900/30 border border-green-600/30 rounded-lg p-4">
                        <h4 className="text-green-400 font-medium mb-2">💡 Pro tip</h4>
                        <p className="text-gray-300 text-sm">
                          Enable audit notifications in your settings to get alerts when audits complete, even if you close the browser.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Issue 2: Timeout Errors */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 p-2">
                      <AlertTriangle className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">⏰ Audit timeout errors</h3>
                      <p className="text-gray-300 mb-4">
                        Timeout errors occur when your website takes too long to respond or when auditing very large sites.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-3">Immediate solutions:</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400 font-bold">•</span>
                              <span><strong>Limit audit scope:</strong> Focus on specific pages instead of the entire site</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400 font-bold">•</span>
                              <span><strong>Check server performance:</strong> Ensure your website loads quickly</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400 font-bold">•</span>
                              <span><strong>Optimize before auditing:</strong> Enable caching and CDN if available</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400 font-bold">•</span>
                              <span><strong>Contact hosting provider:</strong> Ask about server resource limits</span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-yellow-900/30 border border-yellow-600/30 rounded-lg p-4">
                          <h4 className="text-yellow-400 font-medium mb-2">⚠️ For large sites (&gt;1000 pages)</h4>
                          <p className="text-gray-300 text-sm">
                            Consider upgrading to our Pro plan for extended timeout limits and priority processing, or contact support for enterprise solutions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Issue 3: Access Denied */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 p-2">
                      <Globe className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">🚫 "Access denied" or "Site not reachable"</h3>
                      <p className="text-gray-300 mb-4">
                        These errors indicate that our crawlers cannot access your website due to security restrictions or misconfigurations.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-3">Common causes & fixes:</h4>
                          <div className="space-y-3">
                            <div className="border-l-4 border-blue-500 pl-4">
                              <h5 className="text-white font-medium">Password protection</h5>
                              <p className="text-gray-300 text-sm">Remove password protection or whitelist our crawler IPs</p>
                            </div>
                            <div className="border-l-4 border-green-500 pl-4">
                              <h5 className="text-white font-medium">Firewall blocking</h5>
                              <p className="text-gray-300 text-sm">Configure firewall to allow AISEOTurbo crawler access</p>
                            </div>
                            <div className="border-l-4 border-yellow-500 pl-4">
                              <h5 className="text-white font-medium">robots.txt restrictions</h5>
                              <p className="text-gray-300 text-sm">Check if robots.txt is blocking legitimate crawlers</p>
                            </div>
                            <div className="border-l-4 border-red-500 pl-4">
                              <h5 className="text-white font-medium">Server downtime</h5>
                              <p className="text-gray-300 text-sm">Verify your website is online and accessible</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-900/30 border border-blue-600/30 rounded-lg p-4">
                          <h4 className="text-blue-400 font-medium mb-2">🔧 Testing your site accessibility</h4>
                          <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                            <li>Open an incognito/private browser window</li>
                            <li>Try accessing your site from the exact URL you provided</li>
                            <li>Check if any login prompts or error pages appear</li>
                            <li>Test from different devices or networks</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Issue 4: Partial Results */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 p-2">
                      <Search className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">📊 Incomplete or partial results</h3>
                      <p className="text-gray-300 mb-4">
                        Sometimes audits complete but show incomplete data or missing sections.
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-3">Why this happens:</h4>
                          <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-2">
                              <span className="text-orange-400 font-bold">•</span>
                              <span>Some pages were inaccessible during crawling</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-orange-400 font-bold">•</span>
                              <span>JavaScript-heavy content couldn't be fully analyzed</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-orange-400 font-bold">•</span>
                              <span>Rate limiting or server restrictions kicked in</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-orange-400 font-bold">•</span>
                              <span>Network interruptions during the audit process</span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-green-900/30 border border-green-600/30 rounded-lg p-4">
                          <h4 className="text-green-400 font-medium mb-2">✅ Solutions</h4>
                          <ul className="text-gray-300 text-sm space-y-1">
                            <li>• Re-run the audit during low-traffic periods</li>
                            <li>• Enable server-side rendering for JavaScript content</li>
                            <li>• Increase server resources temporarily during audits</li>
                            <li>• Check your sitemap.xml for accuracy and completeness</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Troubleshooting */}
              <h2 className="text-2xl font-bold text-white mt-12 mb-6">Advanced troubleshooting</h2>
              
              <div className="bg-purple-900/20 border border-purple-600/30 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <Zap className="w-6 h-6 text-purple-400 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-purple-400 text-lg font-semibold mb-4">For technical users</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white font-medium mb-2">Check server logs</h4>
                        <p className="text-gray-300 text-sm mb-2">Look for crawler requests from AISEOTurbo IP ranges:</p>
                        <code className="block bg-slate-800 p-3 rounded text-green-400 text-sm">
                          grep "AISEOTurbo" /var/log/apache2/access.log<br/>
                          # or<br/>
                          grep "185.199.108.0/22" /var/log/nginx/access.log
                        </code>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-medium mb-2">Test robots.txt compliance</h4>
                        <p className="text-gray-300 text-sm mb-2">Verify our crawler is allowed:</p>
                        <code className="block bg-slate-800 p-3 rounded text-green-400 text-sm">
                          curl -I https://yoursite.com/robots.txt<br/>
                          # Check for "Disallow: /" or bot restrictions
                        </code>
                      </div>

                      <div>
                        <h4 className="text-white font-medium mb-2">Validate SSL certificate</h4>
                        <p className="text-gray-300 text-sm mb-2">Ensure HTTPS is properly configured:</p>
                        <code className="block bg-slate-800 p-3 rounded text-green-400 text-sm">
                          openssl s_client -connect yoursite.com:443 -servername yoursite.com
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* When to Contact Support */}
              <div className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-blue-400 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-blue-400 text-lg font-semibold mb-4">When to contact support</h3>
                    <p className="text-gray-300 mb-4">
                      If you've tried the solutions above and still experiencing issues, contact our support team with:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                          <span className="text-gray-300 text-sm">Your website URL</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                          <span className="text-gray-300 text-sm">Exact error messages</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                          <span className="text-gray-300 text-sm">Time when the issue occurred</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                          <span className="text-gray-300 text-sm">Steps you've already tried</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                          <span className="text-gray-300 text-sm">Your browser and device info</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                          <span className="text-gray-300 text-sm">Screenshots of error screens</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prevention Tips */}
              <div className="bg-green-900/20 border border-green-600/30 rounded-xl p-6 mt-12">
                <div className="flex items-start gap-4">
                  <Target className="w-6 h-6 text-green-400 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-green-400 text-lg font-semibold mb-2">Prevention is better than cure</h3>
                    <p className="text-gray-300 mb-4">
                      Avoid future audit issues by following these best practices:
                    </p>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Ensure your website loads consistently in under 5 seconds</li>
                      <li>• Use a reliable hosting provider with good uptime guarantees</li>
                      <li>• Keep your robots.txt file simple and permissive for legitimate crawlers</li>
                      <li>• Implement proper error handling for 404s and server errors</li>
                      <li>• Schedule audits during low-traffic periods</li>
                      <li>• Monitor your site's performance regularly</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <h2 className="text-2xl font-bold text-white mt-12 mb-6">Related help articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link 
                  href="/help/getting-started/first-audit"
                  className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
                  aria-label="Learn how to create your first SEO audit"
                >
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    How to create your first audit
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Step-by-step guide to running successful SEO audits from the start
                  </p>
                </Link>
                
                <Link 
                  href="/help/troubleshooting/performance"
                  className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
                  aria-label="Learn about performance optimization"
                >
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    Performance optimization
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Optimize your website's performance for better audit results
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
