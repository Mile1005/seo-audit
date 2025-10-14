"use client"

import { MainLayout } from '../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { 
  Search, 
  MessageCircle, 
  BookOpen, 
  CreditCard, 
  Settings, 
  Users, 
  Shield, 
  BarChart, 
  Bot, 
  ArrowRight,
  HelpCircle,
  Phone,
  Mail,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
  Zap,
  Globe,
  Target,
  TrendingUp,
  Database,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const helpCategories = [
  {
    title: "Getting Started",
    description: "Learn the basics and set up your account",
    icon: Lightbulb,
    color: "from-green-500 to-emerald-500",
    articles: [
      { title: "How to create your first SEO audit", href: "/help/getting-started/first-audit", time: "5 min" },
      { title: "Setting up your dashboard", href: "/help/getting-started/dashboard-setup", time: "3 min" },
      { title: "Understanding SEO scores", href: "/help/getting-started/seo-scores", time: "7 min" },
      { title: "Quick start guide", href: "/help/getting-started/quick-start", time: "10 min" }
    ]
  },
  {
    title: "SEO Tools & Features",
    description: "Master our AI-powered SEO toolkit",
    icon: BarChart,
    color: "from-blue-500 to-cyan-500",
    articles: [
      { title: "Complete SEO audit walkthrough", href: "/help/features/seo-audit", time: "12 min" },
      { title: "Competitor analysis guide", href: "/help/features/competitor-analysis", time: "8 min" },
      { title: "Site crawler configuration", href: "/help/features/site-crawler", time: "6 min" },
      { title: "AI assistant best practices", href: "/help/features/ai-assistant", time: "9 min" }
    ]
  },
  {
    title: "Account & Billing",
    description: "Manage your subscription and payments",
    icon: CreditCard,
    color: "from-purple-500 to-violet-500",
    articles: [
      { title: "Upgrading your plan", href: "/help/billing/upgrade-plan", time: "4 min" },
      { title: "Managing payment methods", href: "/help/billing/payment-methods", time: "5 min" },
      { title: "Understanding your invoice", href: "/help/billing/invoices", time: "4 min" },
      { title: "Cancellation and refunds", href: "/help/billing/cancellation", time: "5 min" }
    ]
  },
  {
    title: "API & Integrations",
    description: "Connect AISEOTurbo with your tools",
    icon: Database,
    color: "from-orange-500 to-red-500",
    articles: [
      { title: "API authentication", href: "/help/api/authentication", time: "6 min" },
      { title: "Webhook configuration", href: "/help/api/webhooks", time: "7 min" }
    ]
  },
  {
    title: "Troubleshooting",
    description: "Resolve common issues and errors",
    icon: Settings,
    color: "from-yellow-500 to-amber-500",
    articles: [
      { title: "Login and access problems", href: "/help/troubleshooting/login-issues", time: "6 min" },
      { title: "Data synchronization issues", href: "/help/troubleshooting/sync-issues", time: "5 min" },
      { title: "Performance optimization", href: "/help/troubleshooting/performance", time: "6 min" }
    ]
  },
  {
    title: "Security & Privacy",
    description: "Data protection and account security",
    icon: Shield,
    color: "from-indigo-500 to-purple-500",
    articles: [
      { title: "Two-factor authentication", href: "/help/security/two-factor-authentication", time: "7 min" },
      { title: "Privacy settings", href: "/help/security/privacy", time: "8 min" },
      { title: "GDPR compliance", href: "/help/security/gdpr", time: "10 min" },
      { title: "Security best practices", href: "/help/security/best-practices", time: "9 min" }
    ]
  }
]

const quickHelp = [
  {
    question: "How do I run my first SEO audit?",
    answer: "Simply enter your website URL in the audit tool, and our AI will analyze 200+ SEO factors within minutes.",
    icon: Target,
    type: "popular"
  },
  {
    question: "What's included in the free plan?",
    answer: "The free plan includes 3 audits per month, basic reporting, and access to our knowledge base.",
    icon: Star,
    type: "billing"
  },
  {
    question: "How accurate is the AI analysis?",
    answer: "Our AI has 95%+ accuracy rate, trained on millions of websites and constantly updated with latest SEO best practices.",
    icon: Bot,
    type: "features"
  },
  {
    question: "Can I export my reports?",
    answer: "Yes! Export detailed PDF reports, CSV data, and use our API for custom integrations.",
    icon: TrendingUp,
    type: "features"
  },
  {
    question: "How often should I audit my site?",
    answer: "We recommend weekly audits for active sites, monthly for stable sites, and immediate audits after major changes.",
    icon: Clock,
    type: "popular"
  },
  {
    question: "Do you offer customer support?",
    answer: "Yes! We provide 24/7 chat support, email support, and video calls for Pro+ customers.",
    icon: MessageCircle,
    type: "support"
  }
]

const contactOptions = [
  {
    title: "Live Chat",
    description: "Get instant help from our support team",
    icon: MessageCircle,
    availability: "24/7 Available",
    color: "from-green-500 to-emerald-500",
    action: "Start Chat",
    href: "#chat"
  },
  {
    title: "Email Support",
    description: "Send us a detailed message",
    icon: Mail,
    availability: "Response in 2-4 hours",
    color: "from-blue-500 to-cyan-500",
    action: "Send Email",
    href: "mailto:support@aiseoturbo.com"
  },
  {
    title: "Phone Support",
    description: "Speak directly with our experts",
    icon: Phone,
    availability: "Mon-Fri 9AM-6PM EST",
    color: "from-purple-500 to-violet-500",
    action: "Call Now",
    href: "tel:+1-555-0123"
  },
  {
    title: "Community Forum",
    description: "Connect with other users",
    icon: Users,
    availability: "Community Driven",
    color: "from-orange-500 to-red-500",
    action: "Join Forum",
    href: "/community"
  }
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredQuickHelp = selectedCategory === "all" 
    ? quickHelp 
    : quickHelp.filter(item => item.type === selectedCategory)

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <HelpCircle className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">help</span> you?
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
                Find answers, tutorials, and expert support for all your SEO needs
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help articles, tutorials, or ask a question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  aria-label="Search help articles"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Help Section */}
        <section className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Quick <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Answers</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">Most common questions answered instantly</p>
              
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {[
                  { key: "all", label: "All Questions" },
                  { key: "popular", label: "Popular" },
                  { key: "features", label: "Features" },
                  { key: "billing", label: "Billing" },
                  { key: "support", label: "Support" }
                ].map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category.key
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : "bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white"
                    }`}
                    aria-label={`Filter by ${category.label}`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {filteredQuickHelp.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <item.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {item.question}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Category</span>
              </h2>
              <p className="text-xl text-gray-400">Detailed guides and tutorials organized by topic</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {helpCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300"
                >
                  <div className="mb-6">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-400 mb-6">{category.description}</p>
                  </div>

                  <div className="space-y-3">
                    {category.articles.slice(0, 4).map((article, articleIndex) => (
                      <Link
                        key={articleIndex}
                        href={article.href}
                        className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 hover:bg-slate-900 transition-colors group/article"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-300 group-hover/article:text-white transition-colors">
                            {article.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{article.time}</span>
                          <ChevronRight className="w-4 h-4 text-gray-500 group-hover/article:text-blue-400 transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>

                  <Link
                    href={`/help/category/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-2 mt-6 text-blue-400 hover:text-blue-300 font-medium group/link"
                  >
                    View all articles
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Still need <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">help</span>?
              </h2>
              <p className="text-xl text-gray-400">Get in touch with our expert support team</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group"
                >
                  <Link
                    href={option.href}
                    className="block bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 h-full"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${option.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <option.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {option.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{option.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{option.availability}</span>
                      <span className="text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
                        {option.action}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Status & Community */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* System Status */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">System Status</h3>
                    <p className="text-gray-400">All systems operational</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { service: "SEO Audit Engine", status: "operational", uptime: "99.9%" },
                    { service: "API Services", status: "operational", uptime: "99.8%" },
                    { service: "Dashboard", status: "operational", uptime: "100%" },
                    { service: "Data Processing", status: "operational", uptime: "99.7%" }
                  ].map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-gray-300">{service.service}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 text-sm font-medium">Operational</div>
                        <div className="text-gray-500 text-xs">{service.uptime} uptime</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link
                  href="/status"
                  className="inline-flex items-center gap-2 mt-6 text-blue-400 hover:text-blue-300 font-medium group"
                >
                  View detailed status
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Community */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500 p-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Join Our Community</h3>
                    <p className="text-gray-400">Connect with 10,000+ SEO professionals</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg">
                    <MessageCircle className="w-8 h-8 text-blue-400" />
                    <div>
                      <h4 className="text-white font-medium">Community Forum</h4>
                      <p className="text-gray-400 text-sm">Ask questions and share knowledge</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg">
                    <Zap className="w-8 h-8 text-yellow-400" />
                    <div>
                      <h4 className="text-white font-medium">Feature Requests</h4>
                      <p className="text-gray-400 text-sm">Suggest new features and improvements</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg">
                    <BookOpen className="w-8 h-8 text-green-400" />
                    <div>
                      <h4 className="text-white font-medium">SEO Tutorials</h4>
                      <p className="text-gray-400 text-sm">Learn from expert guides and tutorials</p>
                    </div>
                  </div>
                </div>
                
                <Link
                  href="/community"
                  className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-violet-700 transition-all duration-300 group"
                >
                  Join Community
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
