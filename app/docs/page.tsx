import { MainLayout } from "@/components/layout/main-layout"
import { generateSEOMeta } from "@/lib/seo"
import { Metadata } from 'next'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Code,
  Zap,
  Shield,
  ArrowRight,
  ExternalLink,
  FileText,
  Settings,
  BarChart3
} from "lucide-react"

// SEO metadata
export const metadata: Metadata = generateSEOMeta({
  title: "Documentation - AI SEO Turbo",
  description: "Comprehensive documentation for AI SEO Turbo. Learn how to use our API, integrate with your workflow, and maximize your SEO performance.",
  keywords: ["SEO documentation", "API docs", "integration guide", "developer resources"],
  canonical: "/docs"
})

const docSections = [
  {
    title: "Getting Started",
    icon: Zap,
    description: "Quick start guide and basic setup",
    items: [
      { title: "Quick Start Guide", href: "/docs/quick-start", description: "Get up and running in 5 minutes" },
      { title: "Installation", href: "/docs/installation", description: "How to install and configure" },
      { title: "Authentication", href: "/docs/authentication", description: "API keys and authentication" }
    ]
  },
  {
    title: "API Reference",
    icon: Code,
    description: "Complete API documentation",
    items: [
      { title: "SEO Audit API", href: "/docs/api/seo-audit", description: "Audit websites for SEO issues" },
      { title: "Keyword Research API", href: "/docs/api/keyword-research", description: "Find profitable keywords" },
      { title: "Backlink Analysis API", href: "/docs/api/backlinks", description: "Analyze backlink profiles" },
      { title: "Competitor Analysis API", href: "/docs/api/competitor-analysis", description: "Compare with competitors" }
    ]
  },
  {
    title: "Integration Guides",
    icon: Settings,
    description: "Integrate with your tools",
    items: [
      { title: "WordPress Plugin", href: "/docs/integrations/wordpress", description: "WordPress integration" },
      { title: "Shopify App", href: "/docs/integrations/shopify", description: "Shopify integration" },
      { title: "Google Analytics", href: "/docs/integrations/google-analytics", description: "GA4 integration" },
      { title: "Zapier", href: "/docs/integrations/zapier", description: "Automate workflows" }
    ]
  },
  {
    title: "Analytics & Reporting",
    icon: BarChart3,
    description: "Track and analyze performance",
    items: [
      { title: "Dashboard Overview", href: "/docs/analytics/dashboard", description: "Understanding your dashboard" },
      { title: "Custom Reports", href: "/docs/analytics/reports", description: "Create custom reports" },
      { title: "Data Export", href: "/docs/analytics/export", description: "Export your data" },
      { title: "API Webhooks", href: "/docs/analytics/webhooks", description: "Real-time notifications" }
    ]
  }
]

const quickLinks = [
  { title: "Changelog", href: "/docs/changelog", description: "Latest updates and features" },
  { title: "Status Page", href: "https://status.aiseoturbo.com", external: true, description: "System status and uptime" },
  { title: "Community Forum", href: "https://community.aiseoturbo.com", external: true, description: "Get help from the community" },
  { title: "Support Center", href: "/help", description: "Contact our support team" }
]

export default function DocsPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-6">
              <BookOpen className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Documentation
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Everything you need to know about AI SEO Turbo. From getting started to advanced integrations,
              our comprehensive documentation has you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs/quick-start">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 border border-blue-500/20">
                  <Zap className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
              </Link>
              <Link href="/docs/api">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                  <Code className="w-5 h-5 mr-2" />
                  API Reference
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {docSections.map((section) => {
              const Icon = section.icon
              return (
                <div key={section.title} className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:border-slate-700 transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mr-4">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{section.title}</h3>
                      <p className="text-gray-400 text-sm">{section.description}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block p-4 rounded-lg hover:bg-slate-800/50 transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Quick Links</h2>
            <p className="text-gray-400">Additional resources and support</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-slate-600 transition-all duration-300 group ${
                  link.external ? 'hover:bg-slate-800/70' : ''
                }`}
                {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {link.title}
                  </h3>
                  {link.external && (
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
                  )}
                </div>
                <p className="text-sm text-gray-400">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-6">
              <Shield className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Need Help?</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Can't find what you're looking for? Our support team is here to help you succeed with AI SEO Turbo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-green-600/25 hover:shadow-xl hover:shadow-green-500/30 hover:scale-105 border border-green-500/20">
                  <FileText className="w-5 h-5 mr-2" />
                  Contact Support
                </Button>
              </Link>
              <Link href="/help">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Help Center
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}