"use client"

import { MainLayout } from '../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, ArrowRight, Search, Tag, TrendingUp, BookOpen, Star } from 'lucide-react'
import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    title: 'Complete SEO Audit Checklist for 2025',
    excerpt: 'A comprehensive 47-point checklist to audit your website for SEO issues and opportunities. Used by 1000+ websites to increase organic traffic.',
    content: 'Learn the essential steps to perform a thorough SEO audit that will boost your search rankings...',
    date: 'March 15, 2025',
    readTime: '12 min read',
    category: 'Technical SEO',
    author: 'Sarah Johnson',
    featured: true,
    image: '/blog/seo-audit-checklist.jpg',
    tags: ['SEO', 'Audit', 'Technical', 'Checklist'],
    views: '2.4k',
    likes: 156
  },
  {
    id: 2,
    title: 'AI-Powered SEO: The Future is Here',
    excerpt: 'Discover how artificial intelligence is revolutionizing search engine optimization and how to leverage AI for better rankings.',
    content: 'Artificial intelligence is transforming the SEO landscape. Here\'s how to stay ahead...',
    date: 'March 10, 2025',
    readTime: '8 min read',
    category: 'AI & SEO',
    author: 'Mike Chen',
    featured: false,
    image: '/blog/ai-seo-future.jpg',
    tags: ['AI', 'Machine Learning', 'SEO', 'Future'],
    views: '1.8k',
    likes: 89
  },
  {
    id: 3,
    title: 'Core Web Vitals Optimization Guide',
    excerpt: 'Master Google Core Web Vitals with our step-by-step guide to improve page speed and user experience.',
    content: 'Core Web Vitals are crucial for SEO success. Learn how to optimize each metric...',
    date: 'March 5, 2025',
    readTime: '10 min read',
    category: 'Performance',
    author: 'Emily Rodriguez',
    featured: false,
    image: '/blog/core-web-vitals.jpg',
    tags: ['Performance', 'Core Web Vitals', 'Speed', 'UX'],
    views: '3.2k',
    likes: 203
  },
  {
    id: 4,
    title: 'Technical SEO Best Practices',
    excerpt: 'Essential technical SEO strategies that every website owner should implement to improve search visibility.',
    content: 'Technical SEO forms the foundation of your organic search success...',
    date: 'February 28, 2025',
    readTime: '15 min read',
    category: 'Technical SEO',
    author: 'David Kim',
    featured: false,
    image: '/blog/technical-seo.jpg',
    tags: ['Technical SEO', 'Best Practices', 'Implementation'],
    views: '1.9k',
    likes: 127
  },
  {
    id: 5,
    title: 'Local SEO Strategies That Work',
    excerpt: 'Boost your local search rankings with these proven strategies for local businesses and service providers.',
    content: 'Local SEO is essential for businesses serving specific geographic areas...',
    date: 'February 20, 2025',
    readTime: '9 min read',
    category: 'Local SEO',
    author: 'Lisa Thompson',
    featured: false,
    image: '/blog/local-seo.jpg',
    tags: ['Local SEO', 'Google My Business', 'Local Rankings'],
    views: '2.1k',
    likes: 144
  },
  {
    id: 6,
    title: 'Content SEO: Creating Search-Friendly Content',
    excerpt: 'Learn how to create content that both users and search engines love with our comprehensive content SEO guide.',
    content: 'Content is king, but only when it\'s optimized for search engines and users...',
    date: 'February 15, 2025',
    readTime: '11 min read',
    category: 'Content SEO',
    author: 'Alex Morgan',
    featured: false,
    image: '/blog/content-seo.jpg',
    tags: ['Content', 'SEO Writing', 'User Experience'],
    views: '2.7k',
    likes: 189
  }
]

const categories = [
  { name: 'All Posts', count: blogPosts.length, color: 'blue' },
  { name: 'Technical SEO', count: 3, color: 'purple' },
  { name: 'AI & SEO', count: 1, color: 'emerald' },
  { name: 'Performance', count: 1, color: 'orange' },
  { name: 'Local SEO', count: 1, color: 'red' },
  { name: 'Content SEO', count: 1, color: 'yellow' }
]

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 border border-blue-500/20">
                <BookOpen className="w-4 h-4 mr-2" />
                SEO Knowledge Hub
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Expert SEO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Insights</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Stay ahead with the latest SEO strategies, AI-powered insights, and expert tips to boost your search rankings and drive more organic traffic.
              </p>
              
              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-md mx-auto relative"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 mb-16"
            >
              {categories.map((category, index) => (
                <button
                  key={category.name}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    index === 0 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                      : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <div className="flex items-center mb-6">
                  <Star className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="text-yellow-400 font-semibold">Featured Article</span>
                </div>
                
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Content */}
                    <div className="p-8 lg:p-12">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium border border-blue-500/20">
                          {featuredPost.category}
                        </span>
                        <div className="flex items-center text-gray-400 text-sm">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {featuredPost.views} views
                        </div>
                      </div>
                      
                      <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 group-hover:text-blue-400 transition-colors">
                        {featuredPost.title}
                      </h2>
                      
                      <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            {featuredPost.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {featuredPost.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {featuredPost.readTime}
                          </div>
                        </div>
                      </div>
                      
                      <Link 
                        href={`/blog/${featuredPost.id}`}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-600/25"
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                    
                    {/* Image Placeholder */}
                    <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center min-h-[300px] lg:min-h-full">
                      <div className="text-center text-white/60">
                        <BookOpen className="w-16 h-16 mx-auto mb-4" />
                        <p className="text-lg font-medium">Featured Article</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Regular Posts Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group hover:scale-105"
                >
                  {/* Image Placeholder */}
                  <div className="bg-gradient-to-br from-gray-700 to-gray-800 h-48 flex items-center justify-center">
                    <div className="text-center text-white/40">
                      <Tag className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">{post.category}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        post.category === 'Technical SEO' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                        post.category === 'AI & SEO' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        post.category === 'Performance' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                        post.category === 'Local SEO' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {post.category}
                      </span>
                      <div className="flex items-center text-gray-400 text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {post.views}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <Link 
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center mt-4 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-20 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Stay Updated with SEO Trends
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Get the latest SEO insights, tips, and strategies delivered to your inbox weekly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-600/25">
                  Subscribe
                </button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-4">
                No spam. Unsubscribe at any time.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
