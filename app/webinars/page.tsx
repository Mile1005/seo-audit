import { MainLayout } from "@/components/layout/main-layout"
import { generateSEOMeta } from "@/lib/seo"
import { Metadata } from 'next'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Clock,
  Users,
  Play,
  ArrowRight,
  CheckCircle,
  Star,
  Download,
  ExternalLink
} from "lucide-react"

// SEO metadata
export const metadata: Metadata = generateSEOMeta({
  title: "SEO Webinars - Free Training & Education",
  description: "Join our free SEO webinars and master advanced techniques. Learn from industry experts about AI-powered SEO, technical optimization, and growth strategies.",
  keywords: ["SEO webinars", "SEO training", "SEO education", "SEO courses", "SEO workshops"],
  canonical: "/webinars"
})

const upcomingWebinars = [
  {
    id: "ai-seo-masterclass",
    title: "AI-Powered SEO: The Future of Search Optimization",
    date: "2025-10-25",
    time: "2:00 PM EST",
    duration: "90 minutes",
    speaker: "Dr. Sarah Chen",
    role: "AI Research Director",
    description: "Discover how artificial intelligence is revolutionizing SEO strategies and learn to leverage AI tools for competitive advantage.",
    topics: [
      "Latest AI developments in SEO",
      "Machine learning for keyword research",
      "AI-powered content optimization",
      "Predictive SEO analytics"
    ],
    spotsLeft: 45,
    difficulty: "Intermediate"
  },
  {
    id: "technical-seo-deep-dive",
    title: "Technical SEO Mastery: Core Web Vitals & Beyond",
    date: "2025-11-02",
    time: "11:00 AM EST",
    duration: "75 minutes",
    speaker: "Mike Rodriguez",
    role: "Technical SEO Expert",
    description: "Master the technical foundations of SEO including Core Web Vitals, site speed optimization, and advanced crawling techniques.",
    topics: [
      "Core Web Vitals optimization",
      "Advanced site speed techniques",
      "Schema markup implementation",
      "Mobile SEO best practices"
    ],
    spotsLeft: 28,
    difficulty: "Advanced"
  },
  {
    id: "local-seo-blueprint",
    title: "Local SEO Blueprint: Dominate Your Local Market",
    date: "2025-11-08",
    time: "1:00 PM EST",
    duration: "60 minutes",
    speaker: "Jennifer Walsh",
    role: "Local SEO Specialist",
    description: "Learn proven strategies to dominate local search results and drive more foot traffic and phone calls to your business.",
    topics: [
      "Google Business Profile optimization",
      "Local keyword targeting",
      "Review management strategies",
      "Local link building tactics"
    ],
    spotsLeft: 67,
    difficulty: "Beginner"
  }
]

const recordedWebinars = [
  {
    id: "content-seo-revolution",
    title: "Content SEO Revolution: Creating Search-Winning Content",
    date: "2025-09-15",
    duration: "85 minutes",
    speaker: "Emma Thompson",
    role: "Content Strategy Director",
    views: "2.3K",
    rating: 4.8,
    description: "Learn how to create content that ranks higher and converts better using data-driven content strategies.",
    topics: [
      "Search intent analysis",
      "Content gap identification",
      "SERP feature optimization",
      "Content performance tracking"
    ]
  },
  {
    id: "ecommerce-seo-mastery",
    title: "E-commerce SEO: From Product Pages to Profit",
    date: "2025-08-28",
    duration: "70 minutes",
    speaker: "David Park",
    role: "E-commerce SEO Expert",
    views: "1.8K",
    rating: 4.9,
    description: "Discover the secrets of optimizing e-commerce websites for maximum organic revenue and customer acquisition.",
    topics: [
      "Product page optimization",
      "Category page SEO",
      "E-commerce site structure",
      "Conversion rate optimization"
    ]
  },
  {
    id: "competitor-analysis-pro",
    title: "Competitor Analysis Pro: Spy Like a Pro Marketer",
    date: "2025-08-10",
    duration: "65 minutes",
    speaker: "Alex Rivera",
    role: "Competitive Intelligence Lead",
    views: "3.1K",
    rating: 4.7,
    description: "Master the art of competitor analysis to uncover opportunities and stay ahead of the competition.",
    topics: [
      "Advanced competitor research",
      "Gap analysis techniques",
      "Backlink opportunity identification",
      "Content strategy from competitors"
    ]
  }
]

const resources = [
  {
    title: "SEO Webinar Toolkit",
    description: "Downloadable slides, checklists, and templates from our popular webinars",
    downloads: "500+",
    type: "Toolkit"
  },
  {
    title: "SEO Best Practices Guide",
    description: "Comprehensive guide covering all aspects of modern SEO",
    downloads: "1.2K",
    type: "Guide"
  },
  {
    title: "Webinar Recording Archive",
    description: "Access all our past webinar recordings in one place",
    downloads: "800+",
    type: "Archive"
  }
]

export default function WebinarsPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-full mb-6">
              <Play className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Free SEO Webinars
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Join thousands of marketers learning advanced SEO techniques from industry experts.
              Master AI-powered SEO, technical optimization, and proven growth strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#upcoming">
                <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-purple-600/25 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 border border-purple-500/20">
                  <Calendar className="w-5 h-5 mr-2" />
                  View Upcoming Webinars
                </Button>
              </Link>
              <Link href="#recorded">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Recorded Sessions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section id="upcoming" className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Upcoming Webinars</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Reserve your spot in our upcoming live sessions. Each webinar includes Q&A time
              with the expert presenter and downloadable resources.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {upcomingWebinars.map((webinar) => (
              <div key={webinar.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 hover:border-slate-700 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    webinar.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400' :
                    webinar.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {webinar.difficulty}
                  </span>
                  <span className="text-sm text-gray-400">{webinar.spotsLeft} spots left</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {webinar.title}
                </h3>
                <div className="flex items-center text-gray-400 text-sm mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(webinar.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  <Clock className="w-4 h-4 ml-4 mr-2" />
                  {webinar.time} ({webinar.duration})
                </div>
                <div className="mb-4">
                  <p className="text-purple-400 font-medium text-sm mb-1">
                    {webinar.speaker} - {webinar.role}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {webinar.description}
                  </p>
                </div>
                <div className="mb-6">
                  <h4 className="text-white font-medium text-sm mb-2">What You'll Learn:</h4>
                  <ul className="space-y-1">
                    {webinar.topics.map((topic) => (
                      <li key={topic} className="flex items-center text-gray-400 text-sm">
                        <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-300 hover:scale-105">
                  Reserve Your Spot
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recorded Webinars */}
      <section id="recorded" className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">On-Demand Webinars</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Missed a live session? Watch our recorded webinars anytime. Each recording includes
              the full presentation, Q&A, and downloadable resources.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recordedWebinars.map((webinar) => (
              <div key={webinar.id} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-all duration-300 group">
                <div className="aspect-video bg-slate-700 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Click to watch</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {webinar.title}
                  </h3>
                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <Users className="w-4 h-4 mr-1" />
                    {webinar.views} views
                    <Star className="w-4 h-4 ml-3 mr-1 text-yellow-400" />
                    {webinar.rating}
                  </div>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {webinar.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-white font-medium text-sm mb-2">Key Topics:</h4>
                    <ul className="space-y-1">
                      {webinar.topics.slice(0, 3).map((topic) => (
                        <li key={topic} className="flex items-center text-gray-400 text-xs">
                          <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:text-white hover:border-slate-500">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Recording
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Free Resources</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Download our comprehensive SEO resources to accelerate your learning and implementation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <div key={resource.title} className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center hover:border-slate-700 transition-all duration-300 group">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{resource.title}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {resource.description}
                </p>
                <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
                  <Download className="w-4 h-4 mr-1" />
                  {resource.downloads} downloads
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105">
                  Download Free
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-6">
              <Users className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Master SEO?</h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
              Join thousands of marketers who have transformed their SEO skills through our webinars.
              Start your journey to SEO mastery today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-green-600/25 hover:shadow-xl hover:shadow-green-500/30 hover:scale-105 border border-green-500/20">
                  <Calendar className="w-5 h-5 mr-2" />
                  Get Webinar Notifications
                </Button>
              </Link>
              <Link href="/features/seo-audit">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Try AI SEO Turbo Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}