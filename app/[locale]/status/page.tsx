"use client"

import { MainLayout } from "../../../components/layout/main-layout"
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Activity, Clock, Globe, Database, Zap, Server, Shield, Users, Zap as Lightning } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function StatusPage() {
  const t = useTranslations('status')
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
      name: t('services.items.apiServices.name'),
      status: 'operational',
      uptime: '99.99%',
      icon: Zap,
      description: t('services.items.apiServices.description')
    },
    {
      name: t('services.items.webApplication.name'),
      status: 'operational',
      uptime: '99.98%',
      icon: Globe,
      description: t('services.items.webApplication.description')
    },
    {
      name: t('services.items.database.name'),
      status: 'operational',
      uptime: '100%',
      icon: Database,
      description: t('services.items.database.description')
    },
    {
      name: t('services.items.seoCrawler.name'),
      status: 'operational',
      uptime: '99.95%',
      icon: Activity,
      description: t('services.items.seoCrawler.description')
    },
    {
      name: t('services.items.authentication.name'),
      status: 'operational',
      uptime: '99.99%',
      icon: Server,
      description: t('services.items.authentication.description')
    }
  ]

  const recentIncidents = [
    {
      date: t('incidents.items.maintenance.date'),
      title: t('incidents.items.maintenance.title'),
      status: 'resolved',
      description: t('incidents.items.maintenance.description'),
      duration: t('incidents.items.maintenance.duration')
    },
    {
      date: t('incidents.items.optimization.date'),
      title: t('incidents.items.optimization.title'),
      status: 'resolved',
      description: t('incidents.items.optimization.description'),
      duration: t('incidents.items.optimization.duration')
    }
  ]

  const upcomingMaintenance = [
    {
      date: t('maintenance.items.infrastructure.date'),
      time: t('maintenance.items.infrastructure.time'),
      title: t('maintenance.items.infrastructure.title'),
      description: t('maintenance.items.infrastructure.description')
    }
  ]

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        
        {/* Breadcrumb */}
        <section className="bg-slate-900/50 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: 'System Status', url: 'https://www.aiseoturbo.com/status' }
              ]}
              includeHome={true}
              darkMode={true}
            />
          </div>
        </section>
        
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
                {t('hero.allSystemsOperational')}
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                {t('hero.title')} <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">{t('hero.titleHighlight')}</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
                {t('hero.description')}
              </p>
              
              <p className="text-sm text-gray-500">
                {t('hero.lastUpdated')}: {currentDate}
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
                <div className="text-2xl font-bold text-white mb-1">{t('overallStatus.allSystems')}</div>
                <div className="text-green-400 font-semibold">{t('overallStatus.operational')}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 text-center"
              >
                <Activity className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">99.98%</div>
                <div className="text-gray-400">{t('overallStatus.thirtyDayUptime')}</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 text-center"
              >
                <Clock className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">45ms</div>
                <div className="text-gray-400">{t('overallStatus.avgResponseTime')}</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Reliability & Transparency Section */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">{t('reliability.title')}</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {t('reliability.description')}
              </p>
            </motion.div>

            {/* Uptime Standards Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 mb-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <Shield className="w-8 h-8 text-green-400" />
                <h3 className="text-2xl font-bold text-white">{t('reliability.uptime.title')}</h3>
              </div>
              <p className="text-gray-300 mb-6">
                {t('reliability.uptime.description')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(t.raw('reliability.uptime.features') as { title: string; description: string }[]).map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold">{feature.title}</div>
                      <div className="text-gray-400 text-sm">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Transparent Communication Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 mb-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <Users className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">{t('reliability.transparency.title')}</h3>
              </div>
              <p className="text-gray-300 mb-6">
                {t('reliability.transparency.description')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(t.raw('reliability.transparency.methods') as { title: string; description: string }[]).map((method, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold">{method.title}</div>
                      <div className="text-gray-400 text-sm">{method.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Proactive Maintenance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 mb-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <Lightning className="w-8 h-8 text-purple-400" />
                <h3 className="text-2xl font-bold text-white">{t('reliability.maintenance.title')}</h3>
              </div>
              <p className="text-gray-300 mb-6">
                {t('reliability.maintenance.description')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(t.raw('reliability.maintenance.philosophy') as { title: string; description: string }[]).map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold">{item.title}</div>
                      <div className="text-gray-400 text-sm">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* SEO Impact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 mb-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">{t('reliability.seoImpact.title')}</h3>
              <p className="text-gray-300 mb-6">
                {t('reliability.seoImpact.description')}
              </p>
              <div className="bg-green-900/30 border border-green-500/30 p-6 rounded-lg">
                <h4 className="text-green-200 font-semibold mb-3">{t('reliability.seoImpact.testimonials.title')}</h4>
                <div className="space-y-4">
                  {(t.raw('reliability.seoImpact.testimonials.items') as { quote: string; author: string }[]).map((testimonial, index) => (
                    <p key={index} className="text-green-100 italic">
                      "{testimonial.quote}" - {testimonial.author}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Enterprise Features Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 mb-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">{t('reliability.enterprise.title')}</h3>
              <p className="text-gray-300 mb-6">
                {t('reliability.enterprise.description')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(t.raw('reliability.enterprise.features') as { title: string; description: string }[]).map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold">{feature.title}</div>
                      <div className="text-gray-400 text-sm">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Success Priority Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-r from-green-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-green-500/30 p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">{t('reliability.success.title')}</h3>
              <div className="space-y-4 text-gray-300">
                <p>{t('reliability.success.description1')}</p>
                <p>{t('reliability.success.description2')}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Service Status */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8">{t('services.title')}</h2>
            
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
                            <span className="text-green-400 text-sm font-medium capitalize">{t('services.statusLabels.operational')}</span>
                          </div>
                        </div>
                        <p className="text-gray-400 mb-2">{service.description}</p>
                        <div className="text-sm text-gray-500">
                          {t('services.uptimeLabel')}: <span className="text-green-400 font-semibold">{service.uptime}</span>
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
            <h2 className="text-3xl font-bold text-white mb-8">{t('incidents.title')}</h2>
            
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
                            {t('incidents.statusLabels.resolved')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{incident.date} • {t('incidents.durationLabel')}: {incident.duration}</p>
                      </div>
                    </div>
                    <p className="text-gray-400">{incident.description}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <p className="text-gray-400">{t('incidents.noIncidents')}</p>
              </div>
            )}
          </div>
        </section>

        {/* Upcoming Maintenance */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8">{t('maintenance.title')}</h2>
            
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
                <p className="text-gray-400">{t('maintenance.noMaintenance')}</p>
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
                {t('subscribe.title')}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {t('subscribe.description')}
              </p>
              <p className="text-gray-400">
                {t('subscribe.followText')}
              </p>
            </motion.div>
          </div>
        </section>

      </div>
    </MainLayout>
  )
}
