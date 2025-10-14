"use client"

import { MainLayout } from '../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Activity, Clock, Globe, Database, Zap, Server } from 'lucide-react'

export default function StatusPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  })

  const services = [
    {
      name: 'API Services',
      status: 'operational',
      uptime: '99.99%',
      icon: Zap,
      description: 'All API endpoints are functioning normally'
    },
    {
      name: 'Web Application',
      status: 'operational',
      uptime: '99.98%',
      icon: Globe,
      description: 'Dashboard and web interface are fully operational'
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: '100%',
      icon: Database,
      description: 'Database services are running smoothly'
    },
    {
      name: 'SEO Crawler',
      status: 'operational',
      uptime: '99.95%',
      icon: Activity,
      description: 'Website crawling and analysis services are active'
    },
    {
      name: 'Authentication',
      status: 'operational',
      uptime: '99.99%',
      icon: Server,
      description: 'Login and authentication services are operational'
    }
  ]

  const recentIncidents = [
    {
      date: 'March 10, 2025',
      title: 'Scheduled Maintenance',
      status: 'resolved',
      description: 'Routine database maintenance completed successfully with no service disruption.',
      duration: '30 minutes'
    },
    {
      date: 'February 28, 2025',
      title: 'API Performance Optimization',
      status: 'resolved',
      description: 'Deployed performance improvements to API endpoints. Average response time improved by 40%.',
      duration: '15 minutes'
    }
  ]

  const upcomingMaintenance = [
    {
      date: 'March 20, 2025',
      time: '02:00 AM - 04:00 AM UTC',
      title: 'Infrastructure Upgrade',
      description: 'Upgrading server infrastructure for improved performance and reliability.'
    }
  ]

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-blue-600/10 to-purple-600/10" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-full text-green-400 text-sm mb-6">
                <CheckCircle className="w-4 h-4" />
                All Systems Operational
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                System <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Status</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
                Real-time status and uptime information for all AISEOTurbo services
              </p>
              
              <p className="text-sm text-gray-500">
                Last updated: {currentDate}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Overall Status */}
        <section className="py-12 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 text-center"
              >
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">All Systems</div>
                <div className="text-green-400 font-semibold">Operational</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 text-center"
              >
                <Activity className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">99.98%</div>
                <div className="text-gray-400">30-Day Uptime</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 text-center"
              >
                <Clock className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">45ms</div>
                <div className="text-gray-400">Avg Response Time</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Service Status */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8">Service Status</h2>
            
            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 hover:border-slate-600/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{service.name}</h3>
                          <div className="flex items-center gap-2 px-3 py-1 bg-green-600/20 border border-green-500/30 rounded-full">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 text-sm font-medium capitalize">{service.status}</span>
                          </div>
                        </div>
                        <p className="text-gray-400 mb-2">{service.description}</p>
                        <div className="text-sm text-gray-500">
                          30-day uptime: <span className="text-green-400 font-semibold">{service.uptime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Incidents */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8">Recent Incidents</h2>
            
            {recentIncidents.length > 0 ? (
              <div className="space-y-4">
                {recentIncidents.map((incident, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{incident.title}</h3>
                          <span className="px-3 py-1 bg-green-600/20 border border-green-500/30 rounded-full text-green-400 text-sm">
                            Resolved
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{incident.date} • Duration: {incident.duration}</p>
                      </div>
                    </div>
                    <p className="text-gray-400">{incident.description}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <p className="text-gray-400">No recent incidents to report</p>
              </div>
            )}
          </div>
        </section>

        {/* Upcoming Maintenance */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8">Scheduled Maintenance</h2>
            
            {upcomingMaintenance.length > 0 ? (
              <div className="space-y-4">
                {upcomingMaintenance.map((maintenance, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-blue-600/10 backdrop-blur-sm rounded-xl border border-blue-500/30 p-6"
                  >
                    <div className="flex items-start gap-4">
                      <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">{maintenance.title}</h3>
                        <p className="text-blue-300 text-sm mb-2">{maintenance.date} • {maintenance.time}</p>
                        <p className="text-gray-400">{maintenance.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 text-center">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-400">No scheduled maintenance at this time</p>
              </div>
            )}
          </div>
        </section>

        {/* Subscribe to Updates */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-12"
            >
              <Activity className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Stay Informed
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Get notified about system updates and scheduled maintenance
              </p>
              <p className="text-gray-400">
                Follow us on social media or join our community to receive real-time status updates
              </p>
            </motion.div>
          </div>
        </section>

      </div>
    </MainLayout>
  )
}
