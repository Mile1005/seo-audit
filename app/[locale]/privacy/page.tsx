"use client"

import { MainLayout } from "../../../components/layout/main-layout"
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Database, Settings, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'

export default function PrivacyPage() {
  const t = useTranslations('privacy')
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-x-hidden">
        {/* Breadcrumbs */}
        <div className="pt-8 pb-4 px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Privacy Policy', url: 'https://www.aiseoturbo.com/privacy' }
            ]}
            includeHome={true}
          />
        </div>

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
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
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
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/20">
                <Shield className="w-4 h-4 mr-2" />
                {t('hero.badge')}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('hero.title')}</h1>
              <p className="text-xl text-gray-300 mb-4">
                {t('hero.description')}
              </p>
              <p className="text-sm text-gray-400">{t('hero.lastUpdated')}</p>
            </motion.div>
          </div>
        </section>

        

        {/* Content Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-2xl p-8 md:p-12"
            >
              <div className="space-y-12">
                
                <motion.section 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h2 className="text-2xl font-semibold text-foreground flex items-center">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mr-4 border border-blue-500/20">
                      <Database className="w-5 h-5 text-blue-400" />
                    </div>
                    {t('sections.informationWeCollect.title')}
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>{t('sections.informationWeCollect.description')}</p>
                    <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                      <h4 className="font-semibold text-foreground mb-2">{t('sections.informationWeCollect.dataTypes.title')}</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>{t('sections.informationWeCollect.dataTypes.email')}</li>
                        <li>{t('sections.informationWeCollect.dataTypes.urls')}</li>
                        <li>{t('sections.informationWeCollect.dataTypes.usage')}</li>
                        <li>{t('sections.informationWeCollect.dataTypes.device')}</li>
                      </ul>
                    </div>
                  </div>
                </motion.section>

                <motion.section 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h2 className="text-2xl font-semibold text-foreground flex items-center">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mr-4 border border-purple-500/20">
                      <Settings className="w-5 h-5 text-purple-400" />
                    </div>
                    {t('sections.howWeUse.title')}
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>{t('sections.howWeUse.description')}</p>
                    <div className="grid gap-4">
                      <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                        <h4 className="font-semibold text-foreground mb-2">{t('sections.howWeUse.serviceProvision.title')}</h4>
                        <p>{t('sections.howWeUse.serviceProvision.description')}</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                        <h4 className="font-semibold text-foreground mb-2">{t('sections.howWeUse.communication.title')}</h4>
                        <p>{t('sections.howWeUse.communication.description')}</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                        <h4 className="font-semibold text-foreground mb-2">{t('sections.howWeUse.improvement.title')}</h4>
                        <p>{t('sections.howWeUse.improvement.description')}</p>
                      </div>
                    </div>
                  </div>
                </motion.section>

                <motion.section 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h2 className="text-2xl font-semibold text-foreground flex items-center">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mr-4 border border-emerald-500/20">
                      <Lock className="w-5 h-5 text-emerald-400" />
                    </div>
                    {t('sections.dataSecurity.title')}
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>{t('sections.dataSecurity.description')}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-emerald-500/5 rounded-lg p-4 border border-emerald-500/20">
                        <div className="flex items-center mb-2">
                          <Lock className="w-4 h-4 text-emerald-400 mr-2" />
                          <span className="font-semibold text-foreground">{t('sections.dataSecurity.encryption.title')}</span>
                        </div>
                        <p className="text-sm">{t('sections.dataSecurity.encryption.description')}</p>
                      </div>
                      <div className="bg-blue-500/5 rounded-lg p-4 border border-blue-500/20">
                        <div className="flex items-center mb-2">
                          <Shield className="w-4 h-4 text-blue-400 mr-2" />
                          <span className="font-semibold text-foreground">{t('sections.dataSecurity.accessControl.title')}</span>
                        </div>
                        <p className="text-sm">{t('sections.dataSecurity.accessControl.description')}</p>
                      </div>
                    </div>
                  </div>
                </motion.section>

                <motion.section 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h2 className="text-2xl font-semibold text-foreground flex items-center">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center mr-4 border border-orange-500/20">
                      <Eye className="w-5 h-5 text-orange-400" />
                    </div>
                    {t('sections.yourRights.title')}
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>{t('sections.yourRights.description')}</p>
                    <div className="space-y-3">
                      {[
                        { title: t('sections.yourRights.rights.access.title'), description: t('sections.yourRights.rights.access.description') },
                        { title: t('sections.yourRights.rights.correction.title'), description: t('sections.yourRights.rights.correction.description') },
                        { title: t('sections.yourRights.rights.deletion.title'), description: t('sections.yourRights.rights.deletion.description') },
                        { title: t('sections.yourRights.rights.portability.title'), description: t('sections.yourRights.rights.portability.description') }
                      ].map((right, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <span className="font-semibold text-foreground">{right.title}:</span>
                            <span className="ml-2">{right.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.section>

                <motion.section 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <h2 className="text-2xl font-semibold text-foreground flex items-center">
                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center mr-4 border border-red-500/20">
                      <Users className="w-5 h-5 text-red-400" />
                    </div>
                    {t('sections.contactUs.title')}
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>{t('sections.contactUs.description')}</p>
                    <div className="bg-muted/50 rounded-lg p-6 border border-border/50">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">{t('sections.contactUs.email.title')}</h4>
                          <a href="mailto:support@aiseoturbo.com" className="text-primary hover:underline">support@aiseoturbo.com</a>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">{t('sections.contactUs.responseTime.title')}</h4>
                          <p>{t('sections.contactUs.responseTime.description')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>

              </div>
            </motion.div>
          </div>
        </section>

        {/* Additional Sections aligned to card style */}
        <section className="py-4 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-2xl p-8 md:p-12"
            >
              <div className="space-y-12">
                <motion.section 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.85 }}
                >
                  <h2 className="text-2xl font-semibold text-foreground flex items-center">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mr-4 border border-emerald-500/20">
                      <Shield className="w-5 h-5 text-emerald-400" />
                    </div>
                    {t('sections.privacyInSeoTools.title')}
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>
                      {t('sections.privacyInSeoTools.description')}
                    </p>
                  </div>
                </motion.section>

                <motion.section 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <h2 className="text-2xl font-semibold text-foreground flex items-center">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mr-4 border border-blue-500/20">
                      <Lock className="w-5 h-5 text-blue-400" />
                    </div>
                    Our Privacy Commitments
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>{t('sections.privacyCommitments.dataMinimization.title')}:</strong> {t('sections.privacyCommitments.dataMinimization.description')}</li>
                      <li><strong>{t('sections.privacyCommitments.purposeLimitation.title')}:</strong> {t('sections.privacyCommitments.purposeLimitation.description')}</li>
                      <li><strong>{t('sections.privacyCommitments.securityFirst.title')}:</strong> {t('sections.privacyCommitments.securityFirst.description')}</li>
                      <li><strong>{t('sections.privacyCommitments.transparency.title')}:</strong> {t('sections.privacyCommitments.transparency.description')}</li>
                      <li><strong>{t('sections.privacyCommitments.userControl.title')}:</strong> {t('sections.privacyCommitments.userControl.description')}</li>
                    </ul>
                  </div>
                </motion.section>

                <motion.section 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.95 }}
                >
                  <h2 className="text-2xl font-semibold text-foreground flex items-center">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mr-4 border border-purple-500/20">
                      <Database className="w-5 h-5 text-purple-400" />
                    </div>
                    Data Processing & What We Analyze
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>
                      {t('sections.dataProcessing.description')}
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>{t('sections.dataProcessing.analysis.publicContent')}</li>
                      <li>{t('sections.dataProcessing.analysis.technicalElements')}</li>
                      <li>{t('sections.dataProcessing.analysis.siteStructure')}</li>
                      <li>{t('sections.dataProcessing.analysis.performance')}</li>
                      <li>{t('sections.dataProcessing.analysis.mobile')}</li>
                      <li>{t('sections.dataProcessing.analysis.visibility')}</li>
                    </ul>
                  </div>
                </motion.section>

                <motion.section 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <h2 className="text-2xl font-semibold text-foreground flex items-center">
                    <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center mr-4 border border-indigo-500/20">
                      <Settings className="w-5 h-5 text-indigo-400" />
                    </div>
                    Security Measures & Technologies
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>
                      {t('sections.securityMeasures.description')}
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>{t('sections.securityMeasures.measures.encryption.title')}:</strong> {t('sections.securityMeasures.measures.encryption.description')}</li>
                      <li><strong>{t('sections.securityMeasures.measures.zeroTrust.title')}:</strong> {t('sections.securityMeasures.measures.zeroTrust.description')}</li>
                      <li><strong>{t('sections.securityMeasures.measures.audits.title')}:</strong> {t('sections.securityMeasures.measures.audits.description')}</li>
                      <li><strong>{t('sections.securityMeasures.measures.incident.title')}:</strong> {t('sections.securityMeasures.measures.incident.description')}</li>
                      <li><strong>{t('sections.securityMeasures.measures.residency.title')}:</strong> {t('sections.securityMeasures.measures.residency.description')}</li>
                    </ul>
                  </div>
                </motion.section>

                <motion.section 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.05 }}
                >
                  <h2 className="text-2xl font-semibold text-foreground flex items-center">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mr-4 border border-emerald-500/20">
                      <Shield className="w-5 h-5 text-emerald-400" />
                    </div>
                    Compliance & Legal Framework
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>
                      {t('sections.compliance.description')}
                    </p>
                  </div>
                </motion.section>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
