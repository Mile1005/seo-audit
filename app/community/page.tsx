"use client"

import { MainLayout } from '../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { Users, MessageSquare, Heart, TrendingUp, Award, BookOpen, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function CommunityPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm mb-6">
                <Users className="w-4 h-4" />
                Join 10,000+ SEO Professionals
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                AISEOTurbo <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Community</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Connect with other users, share insights, get help, and stay updated with the latest SEO trends and platform updates.
              </p>
              
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link href="https://discord.gg/aiseoturbo" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                  >
                    Join Discord Server
                    <ExternalLink className="w-5 h-5" />
                  </motion.button>
                </Link>
                
                <Link href="/help">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-slate-800 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-slate-700 transition-all"
                  >
                    Visit Help Center
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-16 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: Users, label: 'Active Members', value: '10,000+' },
                { icon: MessageSquare, label: 'Discussions', value: '5,000+' },
                { icon: Heart, label: 'Support Tickets Resolved', value: '15,000+' },
                { icon: TrendingUp, label: 'Daily Active Users', value: '1,500+' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 text-center"
                >
                  <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Join Our Community?
              </h2>
              <p className="text-xl text-gray-400">
                Get the most out of AISEOTurbo with help from our community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: MessageSquare,
                  title: 'Get Expert Help',
                  description: 'Ask questions and get answers from our team and experienced community members.',
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  icon: BookOpen,
                  title: 'Share Knowledge',
                  description: 'Share your SEO insights, tips, and best practices with fellow professionals.',
                  color: 'from-purple-500 to-purple-600'
                },
                {
                  icon: Award,
                  title: 'Stay Updated',
                  description: 'Be the first to know about new features, updates, and SEO industry trends.',
                  color: 'from-pink-500 to-pink-600'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Community Guidelines
              </h2>
              <p className="text-gray-400">
                Help us maintain a friendly and productive environment
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8">
              <ul className="space-y-4">
                {[
                  'Be respectful and professional in all interactions',
                  'Share helpful, accurate, and relevant information',
                  'Avoid spam, self-promotion, and off-topic discussions',
                  'Protect privacy - don\'t share sensitive information',
                  'Report inappropriate content or behavior to moderators',
                  'Help others learn and grow their SEO knowledge'
                ].map((guideline, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    </div>
                    <span className="text-gray-300">{guideline}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-12"
            >
              <Users className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Join?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Connect with thousands of SEO professionals today
              </p>
              <Link href="https://discord.gg/aiseoturbo" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/50 transition-all mx-auto"
                >
                  Join Our Discord Community
                  <ExternalLink className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

      </div>
    </MainLayout>
  )
}
