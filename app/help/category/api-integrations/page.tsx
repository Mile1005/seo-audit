"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, BookOpen, Database, ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const categoryArticles = [
  {
    title: "API authentication",
    href: "/help/api/authentication",
    time: "6 min",
    description: "Set up and manage API keys for secure access to our platform.",
    icon: BookOpen
  },
  {
    title: "Webhook configuration",
    href: "/help/api/webhooks",
    time: "7 min",
    description: "Configure webhooks to receive real-time notifications and automate workflows.",
    icon: BookOpen
  }
]

export default function APIIntegrationsCategoryPage() {
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
              <span className="text-white">API & Integrations</span>
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-3">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-orange-400 text-sm font-medium">Category</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    API & Integrations
                  </h1>
                </div>
              </div>

              <h2 className="text-xl text-gray-400 mb-8">
                Connect AISEOTurbo with your tools and automate workflows using our API and integrations.
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
                <h2 className="text-3xl font-bold text-white mb-4">AI SEO Turbo API: Power Your Applications</h2>
                <p className="text-gray-300 text-lg">
                  Our comprehensive API suite enables developers, agencies, and enterprises to integrate AI-powered SEO
                  capabilities directly into their applications, workflows, and platforms. From automated audits to real-time
                  keyword tracking, our APIs provide the same advanced intelligence that powers our dashboard.
                </p>
              </div>

              {/* Getting Started */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Getting Started with AI SEO Turbo API</h3>
                <p className="text-gray-300 mb-6">
                  Integrating with our API is straightforward, whether you're building custom SEO tools, automating client
                  workflows, or creating white-label solutions. Our RESTful API follows industry standards and includes
                  comprehensive documentation and SDKs.
                </p>

                <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    🔑 API Access Requirements
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-blue-400">✓</span>
                      <p className="text-gray-300"><strong>API Key:</strong> Secure API key authentication for all requests</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400">✓</span>
                      <p className="text-gray-300"><strong>Rate Limits:</strong> Generous rate limits starting at 1,000 requests/hour</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400">✓</span>
                      <p className="text-gray-300"><strong>HTTPS Only:</strong> All API communication secured with TLS 1.3</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-blue-400">✓</span>
                      <p className="text-gray-300"><strong>JSON Format:</strong> Consistent JSON request/response format</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Core Endpoints */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Core API Endpoints</h3>
                <p className="text-gray-300 mb-6">
                  Our API provides access to all major SEO analysis and tracking features through well-documented endpoints.
                </p>

                <div className="space-y-4">
                  {/* Audit API */}
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">🔍 SEO Audit API</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex gap-2">
                        <span className="text-indigo-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>Site Audit:</strong> Technical SEO with 47+ checks</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-indigo-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>Page Analysis:</strong> Individual page evaluation</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-indigo-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>Crawler Control:</strong> Customizable parameters</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-indigo-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>Reports:</strong> Automated PDF & JSON creation</p>
                      </div>
                    </div>
                  </div>

                  {/* Keyword API */}
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">📊 Keyword Research API</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex gap-2">
                        <span className="text-emerald-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>Discovery:</strong> Volume & competition analysis</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-emerald-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>SERP Analysis:</strong> Results examination</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-emerald-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>Competitor Keywords:</strong> Strategy analysis</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-emerald-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>Long-tail:</strong> AI-powered suggestions</p>
                      </div>
                    </div>
                  </div>

                  {/* Backlink API */}
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">🔗 Backlink Analysis API</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex gap-2">
                        <span className="text-orange-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>Discovery:</strong> Profile analysis</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-orange-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>Quality Scoring:</strong> Toxic detection</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-orange-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>Competitor Compare:</strong> Profile comparison</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-orange-400">→</span>
                        <p className="text-gray-300 text-sm"><strong>Monitoring:</strong> Real-time tracking</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Features */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Advanced Integration Features</h3>
                <p className="text-gray-300 mb-6">
                  Enterprise and agency clients can access advanced integration capabilities beyond basic API access.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-5">
                    <h4 className="text-purple-300 font-semibold mb-3 flex items-center gap-2">⚡ Webhooks</h4>
                    <ul className="space-y-2">
                      <li className="text-gray-300 text-sm">Real-time notifications</li>
                      <li className="text-gray-300 text-sm">Automated workflows</li>
                      <li className="text-gray-300 text-sm">Custom callbacks</li>
                      <li className="text-gray-300 text-sm">Automatic retry logic</li>
                    </ul>
                  </div>
                  <div className="bg-pink-600/10 border border-pink-500/30 rounded-lg p-5">
                    <h4 className="text-pink-300 font-semibold mb-3 flex items-center gap-2">🏷️ White-Label</h4>
                    <ul className="space-y-2">
                      <li className="text-gray-300 text-sm">Custom branding</li>
                      <li className="text-gray-300 text-sm">API reselling</li>
                      <li className="text-gray-300 text-sm">Custom domains</li>
                      <li className="text-gray-300 text-sm">Priority support</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SDKs */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">SDKs and Development Tools</h3>
                <p className="text-gray-300 mb-6">
                  Speed up integration with official SDKs for popular programming languages.
                </p>

                <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border border-cyan-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    💻 Available SDKs
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex gap-2">
                      <span className="text-cyan-400 font-bold min-w-fit">JS</span>
                      <p className="text-gray-300">JavaScript/Node.js with TypeScript support</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-cyan-400 font-bold min-w-fit">PY</span>
                      <p className="text-gray-300">Python with async/await support</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-cyan-400 font-bold min-w-fit">PHP</span>
                      <p className="text-gray-300">Framework-agnostic with Laravel integration</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-cyan-400 font-bold min-w-fit">JAVA</span>
                      <p className="text-gray-300">Enterprise SDK with Spring Boot support</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-cyan-400 font-bold min-w-fit">GO</span>
                      <p className="text-gray-300">High-performance for concurrent requests</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-cyan-400 font-bold min-w-fit">RUBY</span>
                      <p className="text-gray-300">Rails integration with ActiveSupport</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rate Limits */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">API Rate Limits and Quotas</h3>
                <p className="text-gray-300 mb-6">
                  Flexible rate limiting ensures fair access while allowing high-volume usage for enterprise applications.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-5">
                    <h4 className="text-blue-300 font-semibold mb-3">🆓 Free Tier</h4>
                    <div className="text-gray-300 text-sm space-y-1">
                      <div>100 req/hour</div>
                      <div>1,000 req/month</div>
                    </div>
                  </div>
                  <div className="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-5">
                    <h4 className="text-emerald-300 font-semibold mb-3">⭐ Pro Tier</h4>
                    <div className="text-gray-300 text-sm space-y-1">
                      <div>1,000 req/hour</div>
                      <div>50,000 req/month</div>
                    </div>
                  </div>
                  <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-5">
                    <h4 className="text-purple-300 font-semibold mb-3">🏢 Agency</h4>
                    <div className="text-gray-300 text-sm space-y-1">
                      <div>5,000 req/hour</div>
                      <div>250,000 req/month</div>
                    </div>
                  </div>
                  <div className="bg-pink-600/10 border border-pink-500/30 rounded-lg p-5">
                    <h4 className="text-pink-300 font-semibold mb-3">🚀 Enterprise</h4>
                    <div className="text-gray-300 text-sm space-y-1">
                      <div>Custom limits</div>
                      <div>Dedicated infrastructure</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Security and Compliance</h3>
                <p className="text-gray-300 mb-6">
                  Enterprise-grade security ensures your data and API communications are protected at all times.
                </p>

                <div className="bg-gradient-to-r from-red-600/10 to-orange-600/10 border border-red-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    🔒 Security Features
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-red-400">✓</span>
                      <p className="text-gray-300"><strong>OAuth 2.0:</strong> Secure authentication with refresh tokens</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-400">✓</span>
                      <p className="text-gray-300"><strong>Key Rotation:</strong> Automatic key rotation for security</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-400">✓</span>
                      <p className="text-gray-300"><strong>Audit Logging:</strong> Complete API usage logs</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-400">✓</span>
                      <p className="text-gray-300"><strong>GDPR Compliance:</strong> Data processing compliance</p>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-400">✓</span>
                      <p className="text-gray-300"><strong>SOC 2 Type II:</strong> Certified standards</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Developer Resources */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">API Documentation and Support</h3>
                <p className="text-gray-300 mb-6">
                  Comprehensive documentation and dedicated support ensure successful integrations.
                </p>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">📖</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Interactive API Explorer</h4>
                      <p className="text-gray-300 text-sm">Test endpoints directly in your browser</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">💡</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Code Examples</h4>
                      <p className="text-gray-300 text-sm">Sample implementations in multiple languages</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">🎥</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Video Tutorials</h4>
                      <p className="text-gray-300 text-sm">Step-by-step integration guides</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">👥</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Community Forums</h4>
                      <p className="text-gray-300 text-sm">Developer-to-developer support</p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex gap-4">
                    <span className="text-2xl">🎧</span>
                    <div>
                      <h4 className="text-white font-semibold mb-1">24/7 Support</h4>
                      <p className="text-gray-300 text-sm">Technical support for integration issues</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Use Cases */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Use Cases and Success Stories</h3>
                <p className="text-gray-300 mb-6">
                  See how organizations are leveraging our API to build innovative SEO solutions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-lg p-5">
                    <h4 className="text-indigo-300 font-semibold mb-2">🏢 SEO Agencies</h4>
                    <p className="text-gray-300 text-sm">Automate audits and reporting workflows</p>
                  </div>
                  <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-lg p-5">
                    <h4 className="text-indigo-300 font-semibold mb-2">📝 CMS Platforms</h4>
                    <p className="text-gray-300 text-sm">Built-in SEO analysis for CMS</p>
                  </div>
                  <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-lg p-5">
                    <h4 className="text-indigo-300 font-semibold mb-2">🛒 E-commerce</h4>
                    <p className="text-gray-300 text-sm">Automated product page optimization</p>
                  </div>
                  <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-lg p-5">
                    <h4 className="text-indigo-300 font-semibold mb-2">🤖 Marketing Automation</h4>
                    <p className="text-gray-300 text-sm">SEO-triggered campaign optimization</p>
                  </div>
                  <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-lg p-5">
                    <h4 className="text-indigo-300 font-semibold mb-2">👁️ Competitor Monitoring</h4>
                    <p className="text-gray-300 text-sm">Automated competitive intelligence</p>
                  </div>
                </div>
              </div>

              {/* Closing CTA */}
              <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700/50">
                <h3 className="text-2xl font-bold text-white mb-4">Building the Future of SEO Automation</h3>
                <p className="text-gray-300 mb-4">
                  Our API empowers developers and organizations to create innovative SEO solutions that were previously
                  impossible. Whether you're building the next generation of SEO tools or integrating AI-powered analysis
                  into existing platforms, AI SEO Turbo API provides the foundation you need.
                </p>
                <p className="text-gray-300">
                  Ready to start building? Explore our comprehensive documentation and SDKs below, or contact our developer
                  relations team for personalized integration support.
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
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-2 flex-shrink-0">
                          <article.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
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
                        <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-orange-400 transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* API Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">API Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/help/api/authentication"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-orange-400 transition-colors">API Authentication</div>
                    <div className="text-gray-400 text-sm">Learn how to authenticate API requests</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition-colors" />
                </Link>
                <Link
                  href="/status"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-orange-400 transition-colors">API Status</div>
                    <div className="text-gray-400 text-sm">Check API availability and uptime</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition-colors" />
                </Link>
              </div>
            </motion.div>

            {/* Related Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Related Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/help/category/troubleshooting"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-yellow-400 transition-colors">Troubleshooting</div>
                    <div className="text-gray-400 text-sm">Resolve common issues and errors</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-yellow-400 transition-colors" />
                </Link>
                <Link
                  href="/help/category/seo-tools-features"
                  className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors group"
                >
                  <div>
                    <div className="text-white font-medium group-hover:text-blue-400 transition-colors">SEO Tools & Features</div>
                    <div className="text-gray-400 text-sm">Master our AI-powered SEO toolkit</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                </Link>
              </div>
            </motion.div>

            {/* Need More Help */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 bg-orange-500/10 border border-orange-500/20 rounded-xl p-8 text-center"
            >
              <h3 className="text-white text-xl font-bold mb-4">Need API support?</h3>
              <p className="text-gray-400 mb-6">
                Our developer support team can help with integrations, API issues, and custom implementations.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/contact"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Developer Support
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
