"use client"

import { MainLayout } from '../../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, ArrowLeft, Tag, Share2, Bookmark, ThumbsUp, Eye } from 'lucide-react'
import Link from 'next/link'

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
  // Related posts (same category, excluding current post) - simplified for now
  const relatedPosts: BlogPost[] = []

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">

        {/* Article Header */}
        <article className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent h-96" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
            {/* Back Button */}
            <Link href="/blog">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Blog
              </motion.button>
            </Link>

            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
                {post.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {post.title}
            </motion.h1>

            {/* Meta Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-6 text-gray-400 mb-8"
            >
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
                {post.authorRole && <span className="text-gray-600">• {post.authorRole}</span>}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span>{post.views} views</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-4 mb-12"
            >
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 rounded-lg transition-colors">
                <ThumbsUp className="w-5 h-5" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 rounded-lg transition-colors">
                <Bookmark className="w-5 h-5" />
                <span>Save</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </motion.div>
          </div>
        </article>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 md:p-12">
            <div
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="px-3 py-1 bg-slate-800/50 border border-slate-700/50 rounded-full text-sm text-gray-300"
                >
                  #{tag}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-20 bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden hover:border-blue-500/50 transition-all group">
                        <div className="p-6">
                          <div className="flex items-center gap-2 text-sm text-blue-400 mb-3">
                            <span className="px-2 py-1 bg-blue-600/20 rounded">
                              {relatedPost.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                            {relatedPost.title}
                          </h3>
                          <p className="text-gray-400 mb-4 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {relatedPost.readTime}
                            </span>
                            <span className="text-blue-400 group-hover:translate-x-1 transition-transform">
                              Read More →
                            </span>
                          </div>
                        </div>
                      </div>
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