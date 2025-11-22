"use client"

import { MainLayout } from '../../../../components/layout/main-layout'
import { Breadcrumbs } from '../../../../components/navigation/breadcrumbs'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, ThumbsUp, Eye, TrendingUp, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  author: string
  authorRole?: string
  featured: boolean
  image: string
  tags: string[]
  views: string
  likes: number
}

interface BlogPostClientProps {
  post: BlogPost
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Reading progress tracking
  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrolled / height) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  // Smooth scroll for anchor links
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]')
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const target = document.querySelector(
          link.getAttribute('href') as string
        )
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    })
  }, [post.content])

  const getRelatedPosts = (currentPost: BlogPost) => {
    const allPosts = [
      {
        id: '1',
        slug: 'complete-seo-audit-checklist-2025',
        title: 'Complete SEO Audit Checklist 2025',
        excerpt: 'Comprehensive checklist for conducting thorough SEO audits in 2025.',
        category: 'SEO Audit',
        readTime: '8 min read',
        image: '/blog/seo-audit.jpg'
      },
      {
        id: '2',
        slug: 'core-web-vitals-optimization-guide',
        title: 'Core Web Vitals Optimization Guide',
        excerpt: 'Complete guide to optimizing Core Web Vitals for better search rankings.',
        category: 'Performance',
        readTime: '12 min read',
        image: '/blog/core-web-vitals.jpg'
      },
      {
        id: '3',
        slug: 'technical-seo-best-practices-2025',
        title: 'Technical SEO Best Practices 2025',
        excerpt: 'Essential technical SEO practices for 2025 and beyond.',
        category: 'Technical SEO',
        readTime: '10 min read',
        image: '/blog/technical-seo.jpg'
      }
    ]

    return allPosts
      .filter(p => p.slug !== currentPost.slug)
      .slice(0, 3)
  }

  const relatedPosts = getRelatedPosts(post)

  const sharePost = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const text = post.title
    
    const shareUrls: { [key: string]: string } = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    }
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    }
    setShowShareMenu(false)
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        {/* Reading Progress Bar */}
        <div className="reading-progress">
          <motion.div 
            className="reading-progress-fill"
            style={{ scaleX }}
          />
        </div>

        {/* Article Header */}
        <article className="relative">
          <div className="relative max-w-4xl mx-auto px-6 pt-24 pb-12">
            {/* Breadcrumbs */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Breadcrumbs
                items={[
                  { name: 'Blog', url: '/blog' },
                  { name: post.title, url: `/blog/${post.slug}` }
                ]}
                darkMode={true}
                className="mb-8"
              />
            </motion.div>

            {/* Back Button */}
            <Link href="/blog">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                whileHover={{ x: -4 }}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </motion.button>
            </Link>

            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
                {post.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {post.title}
            </motion.h1>

            {/* Meta Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-white">{post.author}</span>
                {post.authorRole && (
                  <span className="text-gray-500">• {post.authorRole}</span>
                )}
              </div>
              <span className="text-gray-600">•</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <span className="text-gray-600">•</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <span className="text-gray-600">•</span>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{post.views} views</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isLiked 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-800/50 hover:bg-slate-700/50 text-gray-300'
                }`}
              >
                <ThumbsUp className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{isLiked ? post.likes + 1 : post.likes}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSaved(!isSaved)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isSaved 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-800/50 hover:bg-slate-700/50 text-gray-300'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                <span>Save</span>
              </motion.button>
              
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 rounded-lg transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </motion.button>
                
                {showShareMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-10 min-w-[150px]"
                  >
                    <button
                      onClick={() => sharePost('twitter')}
                      className="w-full px-4 py-2 text-left text-gray-300 hover:bg-slate-700 transition-colors"
                    >
                      Twitter
                    </button>
                    <button
                      onClick={() => sharePost('linkedin')}
                      className="w-full px-4 py-2 text-left text-gray-300 hover:bg-slate-700 transition-colors"
                    >
                      LinkedIn
                    </button>
                    <button
                      onClick={() => sharePost('facebook')}
                      className="w-full px-4 py-2 text-left text-gray-300 hover:bg-slate-700 transition-colors"
                    >
                      Facebook
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Progress Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 text-sm text-gray-400"
            >
              <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-out"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
              <span className="text-xs font-medium">{Math.round(scrollProgress)}%</span>
            </motion.div>
          </div>
        </article>

        {/* Article Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto px-6 pb-20"
        >
          <div className="prose-blog">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </motion.div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="max-w-4xl mx-auto px-6 pb-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2"
            >
              {post.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-full text-sm text-gray-300 hover:border-blue-500/50 hover:text-blue-400 transition-all cursor-pointer"
                >
                  #{tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-20 bg-slate-900/30 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white mb-12"
              >
                Continue Reading
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <motion.div
                        whileHover={{ y: -8 }}
                        className="group h-full bg-slate-800/30 rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all"
                      >
                        <div className="p-6">
                          <p className="inline-block px-2 py-1 text-xs font-medium text-blue-400 bg-blue-500/10 rounded mb-3">
                            {relatedPost.category}
                          </p>
                          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                            {relatedPost.title}
                          </h3>
                          <p className="text-gray-400 mb-4 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-1.5 text-gray-500">
                              <Clock className="w-4 h-4" />
                              {relatedPost.readTime}
                            </span>
                            <span className="text-blue-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                              Read More
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  )
}
