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
            <div className="prose prose-lg prose-invert mx-auto">
              <h2>AI SEO Turbo API: Power Your Applications with AI-Driven SEO Intelligence</h2>
              <p>
                Our comprehensive API suite enables developers, agencies, and enterprises to integrate AI-powered SEO
                capabilities directly into their applications, workflows, and platforms. From automated audits to real-time
                keyword tracking, our APIs provide the same advanced intelligence that powers our dashboard.
              </p>

              <h3>Getting Started with AI SEO Turbo API</h3>
              <p>
                Integrating with our API is straightforward, whether you're building custom SEO tools, automating client
                workflows, or creating white-label solutions. Our RESTful API follows industry standards and includes
                comprehensive documentation and SDKs.
              </p>

              <h4>API Access Requirements:</h4>
              <ul>
                <li><strong>API Key:</strong> Secure API key authentication for all requests</li>
                <li><strong>Rate Limits:</strong> Generous rate limits starting at 1,000 requests per hour</li>
                <li><strong>HTTPS Only:</strong> All API communication secured with TLS 1.3</li>
                <li><strong>JSON Format:</strong> Consistent JSON request/response format</li>
              </ul>

              <h3>Core API Endpoints</h3>
              <p>
                Our API provides access to all major SEO analysis and tracking features through well-documented endpoints.
              </p>

              <h4>SEO Audit API:</h4>
              <ul>
                <li><strong>Site Audit:</strong> Comprehensive technical SEO analysis with 47+ checks</li>
                <li><strong>Page Analysis:</strong> Individual page SEO evaluation and recommendations</li>
                <li><strong>Crawler Control:</strong> Customizable crawling parameters and depth control</li>
                <li><strong>Report Generation:</strong> Automated PDF and JSON report creation</li>
              </ul>

              <h4>Keyword Research API:</h4>
              <ul>
                <li><strong>Keyword Discovery:</strong> Volume, competition, and trend analysis</li>
                <li><strong>SERP Analysis:</strong> Search results examination and opportunity identification</li>
                <li><strong>Competitor Keywords:</strong> Analyze competitor keyword strategies</li>
                <li><strong>Long-tail Suggestions:</strong> AI-powered long-tail keyword generation</li>
              </ul>

              <h4>Backlink Analysis API:</h4>
              <ul>
                <li><strong>Backlink Discovery:</strong> Comprehensive backlink profile analysis</li>
                <li><strong>Link Quality Scoring:</strong> Toxic link detection and quality assessment</li>
                <li><strong>Competitor Backlinks:</strong> Compare backlink profiles across domains</li>
                <li><strong>Link Monitoring:</strong> Real-time backlink acquisition tracking</li>
              </ul>

              <h3>Advanced Integration Features</h3>
              <p>
                For enterprise and agency clients, we offer advanced integration capabilities that go beyond basic API access.
              </p>

              <h4>Webhook Integrations:</h4>
              <ul>
                <li><strong>Real-time Notifications:</strong> Instant alerts for audit completions and ranking changes</li>
                <li><strong>Automated Workflows:</strong> Trigger actions based on SEO events</li>
                <li><strong>Custom Callbacks:</strong> Define custom webhook endpoints for your applications</li>
                <li><strong>Retry Logic:</strong> Automatic retry for failed webhook deliveries</li>
              </ul>

              <h4>White-label Solutions:</h4>
              <ul>
                <li><strong>Custom Branding:</strong> Remove AI SEO Turbo branding from reports and interfaces</li>
                <li><strong>API Reselling:</strong> Resell our API under your own branding</li>
                <li><strong>Custom Domains:</strong> Host solutions on your own domains</li>
                <li><strong>Priority Support:</strong> Dedicated support for white-label partners</li>
              </ul>

              <h3>SDKs and Development Tools</h3>
              <p>
                Speed up your integration with our official SDKs and development tools for popular programming languages.
              </p>

              <h4>Available SDKs:</h4>
              <ul>
                <li><strong>JavaScript/Node.js:</strong> Complete SDK with TypeScript support</li>
                <li><strong>Python:</strong> Async/await support and comprehensive error handling</li>
                <li><strong>PHP:</strong> Framework-agnostic library with Laravel integration</li>
                <li><strong>Java:</strong> Enterprise-grade SDK with Spring Boot support</li>
                <li><strong>Go:</strong> High-performance SDK optimized for concurrent requests</li>
                <li><strong>Ruby:</strong> Rails integration with ActiveSupport compatibility</li>
              </ul>

              <h3>API Rate Limits and Quotas</h3>
              <p>
                Our flexible rate limiting ensures fair access while allowing high-volume usage for enterprise applications.
              </p>

              <h4>Rate Limit Tiers:</h4>
              <ul>
                <li><strong>Free Tier:</strong> 100 requests/hour, 1,000/month</li>
                <li><strong>Pro Tier:</strong> 1,000 requests/hour, 50,000/month</li>
                <li><strong>Agency Tier:</strong> 5,000 requests/hour, 250,000/month</li>
                <li><strong>Enterprise Tier:</strong> Custom limits with dedicated infrastructure</li>
              </ul>

              <h3>Security and Compliance</h3>
              <p>
                Enterprise-grade security ensures your data and API communications are protected at all times.
              </p>

              <h4>Security Features:</h4>
              <ul>
                <li><strong>OAuth 2.0:</strong> Secure authentication with refresh token support</li>
                <li><strong>API Key Rotation:</strong> Automatic key rotation for enhanced security</li>
                <li><strong>Audit Logging:</strong> Complete API usage logs for compliance</li>
                <li><strong>GDPR Compliance:</strong> Data processing compliant with privacy regulations</li>
                <li><strong>SOC 2 Type II:</strong> Certified security and compliance standards</li>
              </ul>

              <h3>API Documentation and Support</h3>
              <p>
                Comprehensive documentation and dedicated support ensure successful integrations.
              </p>

              <h4>Developer Resources:</h4>
              <ul>
                <li><strong>Interactive API Explorer:</strong> Test endpoints directly in your browser</li>
                <li><strong>Code Examples:</strong> Sample implementations in multiple languages</li>
                <li><strong>Video Tutorials:</strong> Step-by-step integration guides</li>
                <li><strong>Community Forums:</strong> Developer-to-developer support and discussions</li>
                <li><strong>24/7 Support:</strong> Technical support for API integration issues</li>
              </ul>

              <h3>Use Cases and Success Stories</h3>
              <p>
                See how organizations are leveraging our API to build innovative SEO solutions.
              </p>

              <h4>Popular Use Cases:</h4>
              <ul>
                <li><strong>SEO Agencies:</strong> Automate client audits and reporting workflows</li>
                <li><strong>CMS Platforms:</strong> Built-in SEO analysis for content management systems</li>
                <li><strong>E-commerce Platforms:</strong> Automated product page optimization</li>
                <li><strong>Marketing Automation:</strong> SEO-triggered campaign optimization</li>
                <li><strong>Competitor Monitoring:</strong> Automated competitive intelligence gathering</li>
              </ul>

              <h2>Building the Future of SEO Automation</h2>
              <p>
                Our API empowers developers and organizations to create innovative SEO solutions that were previously
                impossible. Whether you're building the next generation of SEO tools or integrating AI-powered analysis
                into existing platforms, AI SEO Turbo API provides the foundation you need.
              </p>
              <p>
                Ready to start building? Explore our comprehensive documentation and SDKs below, or contact our developer
                relations team for personalized integration support.
              </p>
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
