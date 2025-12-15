"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  User,
  Key,
  Shield,
  Lock,
  AlertTriangle,
  CheckCircle,
  Smartphone,
  Mail,
  Code,
  Settings,
} from "lucide-react";
import Link from "next/link";

export default function AuthenticationPage() {
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
              <Link
                href="/help/api/api-integrations"
                className="text-gray-400 hover:text-white transition-colors"
              >
                API
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white">Authentication</span>
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
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Help Center
              </Link>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-3">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-blue-400 text-sm font-medium">API</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">API Authentication</h1>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>10 min read</span>
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
                  <Shield className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <h2 className="text-white text-lg font-semibold mb-2">Secure API access</h2>
                    <p className="text-gray-300 mb-0">
                      Learn how to authenticate with our API using API keys and implement secure
                      authentication patterns for your applications.
                    </p>
                  </div>
                </div>
              </div>

              {/* Authentication Methods */}
              <h2 className="text-2xl font-bold text-white mb-6">Authentication methods</h2>

              <div className="space-y-6 mb-8">
                {/* API Keys */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3 flex items-center gap-2">
                        <Key className="w-5 h-5 text-blue-400" />
                        API Keys
                      </h3>
                      <p className="text-gray-300 mb-4">
                        Use API keys to authenticate your requests. Each key is unique to your
                        account and can be managed in your dashboard.
                      </p>

                      <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
                        <h4 className="text-blue-400 font-medium mb-2">How to get your API key:</h4>
                        <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
                          <li>Log in to your account</li>
                          <li>Go to Settings → API Keys</li>
                          <li>Click "Generate new key"</li>
                          <li>Copy and store securely</li>
                        </ol>
                      </div>

                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <h4 className="text-green-400 font-medium mb-2">
                          Using API keys in requests:
                        </h4>
                        <div className="bg-slate-950 rounded p-3 font-mono text-sm text-gray-300">
                          <div className="text-gray-500 mb-1"># Header method</div>
                          <div>Authorization: Bearer your_api_key_here</div>
                          <div className="text-gray-500 mt-2 mb-1">
                            # Query parameter (less secure)
                          </div>
                          <div>GET /api/audits?api_key=your_api_key_here</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* OAuth 2.0 */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-semibold mb-3 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-green-400" />
                        OAuth 2.0 (Coming Soon)
                      </h3>
                      <p className="text-gray-300 mb-4">
                        OAuth 2.0 authentication will be available for enterprise customers
                        requiring more advanced access control and user delegation.
                      </p>

                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 font-medium">Coming Soon</span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          OAuth 2.0 support is planned for Q2 2025. Contact our sales team for
                          enterprise requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* API Key Management */}
              <h3 className="text-2xl font-bold text-white mb-6">Managing API keys</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-400" />
                    Key Permissions
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Read-only access</li>
                    <li>• Full audit access</li>
                    <li>• Account management</li>
                    <li>• Billing information</li>
                    <li>• Custom permissions</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    Security Features
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Rate limiting per key</li>
                    <li>• IP address restrictions</li>
                    <li>• Expiration dates</li>
                    <li>• Usage monitoring</li>
                    <li>• Instant revocation</li>
                  </ul>
                </div>
              </div>

              {/* Best Practices */}
              <h3 className="text-2xl font-bold text-white mb-6">Security best practices</h3>

              <div className="space-y-4 mb-8">
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Store keys securely</h4>
                      <p className="text-gray-300 text-sm">
                        Never commit API keys to version control. Use environment variables or
                        secure key management services.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Use read-only keys when possible</h4>
                      <p className="text-gray-300 text-sm">
                        Create separate read-only API keys for applications that only need to
                        retrieve data.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Rotate keys regularly</h4>
                      <p className="text-gray-300 text-sm">
                        Generate new keys periodically and revoke old ones to maintain security.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Monitor API usage</h4>
                      <p className="text-gray-300 text-sm">
                        Regularly check your API usage logs for suspicious activity or unauthorized
                        access.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rate Limiting */}
              <h3 className="text-2xl font-bold text-white mb-6">Rate limiting</h3>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-3">
                      Understanding rate limits
                    </h3>
                    <p className="text-gray-300">
                      API requests are subject to rate limiting to ensure fair usage and system
                      stability. Different endpoints have different limits based on their resource
                      requirements.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">100</div>
                      <div className="text-gray-300 text-sm">Requests per minute</div>
                      <div className="text-gray-500 text-xs">Basic plan</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">500</div>
                      <div className="text-gray-300 text-sm">Requests per minute</div>
                      <div className="text-gray-500 text-xs">Pro plan</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-400 mb-1">2000</div>
                      <div className="text-gray-300 text-sm">Requests per minute</div>
                      <div className="text-gray-500 text-xs">Enterprise plan</div>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h4 className="text-blue-400 font-medium mb-2">Rate limit headers</h4>
                    <div className="bg-slate-950 rounded p-3 font-mono text-sm text-gray-300">
                      <div>X-RateLimit-Limit: 100</div>
                      <div>X-RateLimit-Remaining: 95</div>
                      <div>X-RateLimit-Reset: 1640995200</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Handling */}
              <h3 className="text-2xl font-bold text-white mb-6">Authentication errors</h3>

              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">401 Unauthorized</h4>
                      <p className="text-gray-300 text-sm">
                        Invalid or missing API key. Check your Authorization header.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">403 Forbidden</h4>
                      <p className="text-gray-300 text-sm">
                        API key doesn't have permission for this endpoint or action.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">429 Too Many Requests</h4>
                      <p className="text-gray-300 text-sm">
                        Rate limit exceeded. Wait for the reset time or upgrade your plan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Code Examples */}
              <h3 className="text-2xl font-bold text-white mb-6">Code examples</h3>

              <div className="space-y-6 mb-8">
                {/* JavaScript/Node.js */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-yellow-400" />
                    JavaScript/Node.js
                  </h3>
                  <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-gray-300">
                    <div className="text-gray-500 mb-2">{"// Using fetch"}</div>
                    <div>
                      const response = await fetch('https://api.seo-audit.com/v1/audits', {"{"}'
                    </div>
                    <div className="ml-4">method: 'GET',</div>
                    <div className="ml-4">headers: {"{"}'</div>
                    <div className="ml-8">'Authorization': 'Bearer YOUR_API_KEY',</div>
                    <div className="ml-8">'Content-Type': 'application/json'</div>
                    <div className="ml-4">{"}"}</div>
                    <div>{"}"});</div>
                    <div className="text-gray-500 mt-2 mb-2">{"// Using axios"}</div>
                    <div>const axios = require('axios');</div>
                    <div>
                      const response = await axios.get('https://api.seo-audit.com/v1/audits', {"{"}'
                    </div>
                    <div className="ml-4">headers: {"{"}'</div>
                    <div className="ml-8">'Authorization': 'Bearer YOUR_API_KEY'</div>
                    <div className="ml-4">{"}"}</div>
                    <div>{"}"});</div>
                  </div>
                </div>

                {/* Python */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-400" />
                    Python
                  </h3>
                  <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-gray-300">
                    <div className="text-gray-500 mb-2"># Using requests</div>
                    <div>import requests</div>
                    <div>headers = {"{"}'</div>
                    <div className="ml-4">'Authorization': 'Bearer YOUR_API_KEY',</div>
                    <div className="ml-4">'Content-Type': 'application/json'</div>
                    <div>{"}"}</div>
                    <div>
                      response = requests.get('https://api.seo-audit.com/v1/audits',
                      headers=headers)
                    </div>
                  </div>
                </div>

                {/* cURL */}
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-400" />
                    cURL
                  </h3>
                  <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-gray-300">
                    <div>curl -X GET "https://api.seo-audit.com/v1/audits" \</div>
                    <div className="ml-4">-H "Authorization: Bearer YOUR_API_KEY" \</div>
                    <div className="ml-4">-H "Content-Type: application/json"</div>
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mt-8">
                <h3 className="text-white text-lg font-semibold mb-3">
                  Need help with authentication?
                </h3>
                <p className="text-gray-300 mb-4">
                  If you're having trouble with API authentication or need help setting up your
                  integration, our developer support team is here to help.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Contact Developer Support
                  </Link>
                  <Link
                    href="/help/api/api-integrations"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    API Documentation
                  </Link>
                  <Link
                    href="/help/api/webhooks"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Webhooks Guide
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
