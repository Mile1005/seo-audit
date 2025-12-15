"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  User,
  CheckCircle,
  Database,
  Key,
  Webhook,
  Code,
  Shield,
  Zap,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default function APIOverviewPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: "Home", url: "https://www.aiseoturbo.com" },
            { name: "Help", url: "https://www.aiseoturbo.com/help" },
            { name: "API Integration", url: "https://www.aiseoturbo.com/help/api" },
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
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-3">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-orange-400 text-sm font-medium">API Integration</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    API Integration Guide
                  </h1>
                </div>
              </div>

              <p className="text-xl text-gray-400 mb-8">
                Integrate AI SEO Turbo's powerful SEO tools into your applications with our
                comprehensive REST API. Automate audits, access real-time data, and build custom
                workflows.
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
                <h2 className="text-3xl font-bold text-white mb-4">API Overview</h2>
                <p className="text-gray-300 text-lg">
                  Our REST API provides programmatic access to all AI SEO Turbo features, allowing
                  you to integrate SEO analysis, monitoring, and optimization into your existing
                  workflows and applications.
                </p>
              </div>

              {/* API Topics */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">API Documentation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link
                    href="/help/api/authentication"
                    className="group bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-3 flex-shrink-0">
                        <Key className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          API Authentication
                        </h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Learn how to authenticate with our API using API keys, OAuth, and secure
                          token management. Includes code examples and best practices.
                        </p>
                        <span className="text-blue-400 text-sm group-hover:text-blue-300 transition-colors">
                          Learn more →
                        </span>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/help/api/webhooks"
                    className="group bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 p-3 flex-shrink-0">
                        <Webhook className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                          Webhooks & Real-time Updates
                        </h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Set up webhooks to receive real-time notifications about audit
                          completions, keyword ranking changes, and other events.
                        </p>
                        <span className="text-purple-400 text-sm group-hover:text-purple-300 transition-colors">
                          Learn more →
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3 flex-shrink-0">
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2">
                          REST API Reference
                        </h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Complete API documentation with endpoints for SEO audits, keyword
                          tracking, backlink analysis, and more.
                        </p>
                        <span className="text-green-400 text-sm">Coming Soon →</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-3 flex-shrink-0">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2">
                          Rate Limits & Security
                        </h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Understanding API rate limits, security best practices, and how to handle
                          API errors and responses.
                        </p>
                        <span className="text-orange-400 text-sm">Coming Soon →</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Getting Started */}
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Getting Started with the API</h3>
                <p className="text-gray-300 mb-6">
                  Ready to integrate AI SEO Turbo into your application? Follow these steps to get
                  started with our API and begin automating your SEO workflows.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Create an API Key</h4>
                      <p className="text-gray-300 text-sm">
                        Generate secure API keys in your dashboard settings to authenticate your
                        requests.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Review Authentication Guide</h4>
                      <p className="text-gray-300 text-sm">
                        Learn about different authentication methods and security best practices.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Start with a Test Request</h4>
                      <p className="text-gray-300 text-sm">
                        Make your first API call and verify everything is working correctly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Code Examples */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Quick Start Examples</h3>
                <div className="space-y-6">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Start an SEO Audit</h4>
                    <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm">
                      <code className="text-gray-300">
                        {`curl -X POST https://api.aiseoturbo.com/v1/seo-audit/start \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com",
    "options": {
      "crawl_depth": 2,
      "include_competitors": true
    }
  }'`}
                      </code>
                    </pre>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Check Audit Status</h4>
                    <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm">
                      <code className="text-gray-300">
                        {`curl -X GET https://api.aiseoturbo.com/v1/seo-audit/status/AUDIT_ID \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* SDKs & Libraries */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">SDKs & Libraries</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-3 mx-auto mb-4">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">JavaScript SDK</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      Official SDK for Node.js and browser environments
                    </p>
                    <span className="text-blue-400 text-sm">Coming Soon</span>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3 mx-auto mb-4">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Python SDK</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      Python library for easy API integration
                    </p>
                    <span className="text-green-400 text-sm">Coming Soon</span>
                  </div>

                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 p-3 mx-auto mb-4">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">PHP SDK</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      PHP library for WordPress and other CMS integrations
                    </p>
                    <span className="text-purple-400 text-sm">Coming Soon</span>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Need API Support?</h3>
                  <p className="text-gray-300 mb-6">
                    Our developer support team is here to help you integrate our API successfully.
                    Get technical assistance and integration guidance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/help/api/api-integrations"
                      className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                    >
                      API Integration Guide
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                    >
                      Developer Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
