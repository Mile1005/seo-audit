import { MainLayout } from "@/components/layout/main-layout"
import { generateSEOMeta, pageSEO } from "@/lib/seo"
import { Metadata } from 'next'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  Users,
  Target,
  ArrowRight,
  CheckCircle,
  Star,
  Calendar,
  Award
} from "lucide-react"

// SEO metadata
export const metadata: Metadata = generateSEOMeta(pageSEO['case-studies'])

const caseStudies = [
  {
    id: "digital-growth-agency",
    title: "Digital Growth Agency: 340% Traffic Increase",
    client: "Digital Growth Agency",
    industry: "Digital Marketing",
    duration: "6 months",
    results: {
      traffic: "+340%",
      rankings: "150+ keywords in top 10",
      conversions: "+280%",
      roi: "450%"
    },
    challenge: "Struggling with manual SEO processes and inconsistent results across client campaigns.",
    solution: "Implemented AI SEO Turbo for automated audits, competitor analysis, and content optimization recommendations.",
    testimonial: {
      quote: "AI SEO Turbo transformed our agency workflow. We now deliver consistent results and have increased our client retention by 85%.",
      author: "Sarah Chen",
      role: "CEO, Digital Growth Agency",
      avatar: "/images/testimonials/sarah-chen.jpg"
    },
    metrics: [
      { label: "Organic Traffic", value: "340%", change: "increase" },
      { label: "Keyword Rankings", value: "150+", change: "increase" },
      { label: "Client Satisfaction", value: "95%", change: "increase" },
      { label: "Time Saved", value: "60%", change: "increase" }
    ]
  },
  {
    id: "techflow-solutions",
    title: "TechFlow Solutions: Enterprise SEO Transformation",
    client: "TechFlow Solutions",
    industry: "SaaS",
    duration: "8 months",
    results: {
      traffic: "+520%",
      rankings: "200+ keywords in top 5",
      conversions: "+390%",
      roi: "680%"
    },
    challenge: "Enterprise-level website with complex technical SEO issues and poor search visibility.",
    solution: "Comprehensive technical audit, site crawler implementation, and ongoing AI-powered optimization.",
    testimonial: {
      quote: "The depth of analysis and actionable insights from AI SEO Turbo are unparalleled. We've seen results that exceeded our wildest expectations.",
      author: "Michael Rodriguez",
      role: "CTO, TechFlow Solutions",
      avatar: "/images/testimonials/michael-rodriguez.jpg"
    },
    metrics: [
      { label: "Organic Traffic", value: "+520%", change: "increase" },
      { label: "Enterprise Keywords", value: "200+", change: "increase" },
      { label: "Lead Quality", value: "85%", change: "increase" },
      { label: "Cost per Lead", value: "-65%", change: "decrease" }
    ]
  },
  {
    id: "stylecraft-boutique",
    title: "StyleCraft Boutique: E-commerce SEO Success",
    client: "StyleCraft Boutique",
    industry: "E-commerce",
    duration: "4 months",
    results: {
      traffic: "+280%",
      rankings: "300+ product pages ranked",
      conversions: "+420%",
      roi: "380%"
    },
    challenge: "E-commerce site with poor product page optimization and high bounce rates.",
    solution: "AI-powered product page optimization, technical SEO fixes, and conversion rate optimization.",
    testimonial: {
      quote: "Our online sales have never been better. AI SEO Turbo helped us understand exactly what our customers were searching for.",
      author: "Emma Thompson",
      role: "Owner, StyleCraft Boutique",
      avatar: "/images/testimonials/emma-thompson.jpg"
    },
    metrics: [
      { label: "Online Sales", value: "+420%", change: "increase" },
      { label: "Product Rankings", value: "300+", change: "increase" },
      { label: "Bounce Rate", value: "-45%", change: "decrease" },
      { label: "Avg Order Value", value: "+25%", change: "increase" }
    ]
  },
  {
    id: "cloudsync-pro",
    title: "CloudSync Pro: B2B Lead Generation",
    client: "CloudSync Pro",
    industry: "B2B SaaS",
    duration: "5 months",
    results: {
      traffic: "+410%",
      rankings: "180+ long-tail keywords",
      conversions: "+350%",
      roi: "520%"
    },
    challenge: "B2B company struggling with lead generation and brand awareness in competitive market.",
    solution: "Advanced keyword research, content strategy optimization, and technical SEO implementation.",
    testimonial: {
      quote: "AI SEO Turbo gave us the competitive edge we needed. Our lead quality and quantity have dramatically improved.",
      author: "David Park",
      role: "VP of Marketing, CloudSync Pro",
      avatar: "/images/testimonials/david-park.jpg"
    },
    metrics: [
      { label: "Qualified Leads", value: "+350%", change: "increase" },
      { label: "Brand Awareness", value: "+290%", change: "increase" },
      { label: "Cost per Lead", value: "-55%", change: "decrease" },
      { label: "Sales Cycle", value: "-30%", change: "decrease" }
    ]
  },
  {
    id: "peak-performance",
    title: "Peak Performance: Local SEO Domination",
    client: "Peak Performance",
    industry: "Local Services",
    duration: "3 months",
    results: {
      traffic: "+190%",
      rankings: "Local pack #1 for 15 services",
      conversions: "+310%",
      roi: "290%"
    },
    challenge: "Local service business invisible in local search results despite quality service.",
    solution: "Local SEO optimization, Google Business Profile management, and local citation building.",
    testimonial: {
      quote: "We went from being invisible to dominating our local market. AI SEO Turbo's local SEO insights were game-changing.",
      author: "Jennifer Walsh",
      role: "Marketing Director, Peak Performance",
      avatar: "/images/testimonials/jennifer-walsh.jpg"
    },
    metrics: [
      { label: "Local Searches", value: "+190%", change: "increase" },
      { label: "Phone Calls", value: "+310%", change: "increase" },
      { label: "Local Rankings", value: "#1 in 15", change: "increase" },
      { label: "Customer Acquisition", value: "+280%", change: "increase" }
    ]
  },
  {
    id: "gearhub-pro",
    title: "GearHub Pro: Niche Market Leadership",
    client: "GearHub Pro",
    industry: "Niche E-commerce",
    duration: "7 months",
    results: {
      traffic: "+380%",
      rankings: "250+ niche keywords",
      conversions: "+290%",
      roi: "410%"
    },
    challenge: "Niche e-commerce store struggling to compete with larger players in specialized market.",
    solution: "Niche keyword targeting, technical optimization, and content marketing strategy.",
    testimonial: {
      quote: "AI SEO Turbo helped us carve out our space in a competitive niche. We've become the go-to resource for our specialty.",
      author: "Alex Rivera",
      role: "Founder, GearHub Pro",
      avatar: "/images/testimonials/alex-rivera.jpg"
    },
    metrics: [
      { label: "Niche Traffic", value: "+380%", change: "increase" },
      { label: "Market Share", value: "+45%", change: "increase" },
      { label: "Brand Authority", value: "+320%", change: "increase" },
      { label: "Repeat Customers", value: "+65%", change: "increase" }
    ]
  }
]

const industries = [
  "All Industries",
  "Digital Marketing",
  "SaaS",
  "E-commerce",
  "B2B SaaS",
  "Local Services",
  "Niche E-commerce"
]

export default function CaseStudiesPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-6">
              <Award className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              See how businesses across industries achieved remarkable results with AI SEO Turbo.
              From traffic explosions to revenue growth, these case studies prove the power of AI-driven SEO.
            </p>
            <Link href="/features/seo-audit">
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-green-600/25 hover:shadow-xl hover:shadow-green-500/30 hover:scale-105 border border-green-500/20">
                <Target className="w-5 h-5 mr-2" />
                Start Your Success Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Industry Filter */}
      <section className="py-12 bg-slate-950 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry) => (
              <button
                key={industry}
                className="px-4 py-2 rounded-full bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white transition-all duration-300 text-sm font-medium"
              >
                {industry}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <div key={study.id} className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all duration-300 group">
                {/* Header */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium">
                      {study.industry}
                    </span>
                    <span className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {study.duration}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {study.challenge}
                  </p>

                  {/* Key Results */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">{study.results.traffic}</div>
                      <div className="text-sm text-gray-400">Traffic Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">{study.results.conversions}</div>
                      <div className="text-sm text-gray-400">Conversion Increase</div>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="px-8 pb-8">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {study.metrics.slice(0, 4).map((metric) => (
                      <div key={metric.label} className="text-center p-4 bg-slate-800/50 rounded-lg">
                        <div className={`text-lg font-bold mb-1 ${
                          metric.change === 'increase' ? 'text-green-400' :
                          metric.change === 'decrease' ? 'text-red-400' : 'text-blue-400'
                        }`}>
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link href={`/case-studies/${study.id}`}>
                    <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 hover:border-slate-500">
                      Read Full Case Study
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-6">
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Join These Success Stories?</h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
              These results aren't outliers—they're what happens when you combine AI-powered insights
              with proven SEO strategies. Start your transformation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/features/seo-audit">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 border border-blue-500/20">
                  <Target className="w-5 h-5 mr-2" />
                  Get Your Free SEO Audit
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                  <Users className="w-5 h-5 mr-2" />
                  Talk to Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
