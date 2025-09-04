"use client"

import { MainLayout } from '../../components/layout/main-layout'
import { motion } from 'framer-motion'
import { Shield, FileText, Users, AlertCircle, CheckCircle, Scale } from 'lucide-react'

export default function TermsPage() {
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

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6 border border-blue-500/20">
                <Scale className="w-4 h-4 mr-2" />
                Legal Information
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms of Service</h1>
              <p className="text-xl text-gray-300 mb-4">
                Please read these terms carefully before using our services.
              </p>
              <p className="text-sm text-gray-400">Last updated: August 28, 2025</p>
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
                      <CheckCircle className="w-5 h-5 text-blue-400" />
                    </div>
                    Acceptance of Terms
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>By accessing and using AISEOTurbo (the "Service"), you accept and agree to be bound by the terms and provisions of this agreement.</p>
                    <p>If you do not agree to abide by the above, please do not use this service.</p>
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
                      <FileText className="w-5 h-5 text-purple-400" />
                    </div>
                    Use License
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>Permission is granted to temporarily access AISEOTurbo for personal, non-commercial transitory viewing only.</p>
                    <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>modify or copy the materials</li>
                      <li>use the materials for any commercial purpose or for any public display</li>
                      <li>attempt to decompile or reverse engineer any software contained on our website</li>
                      <li>remove any copyright or other proprietary notations from the materials</li>
                    </ul>
                  </div>
                </motion.section>

                <motion.section 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h2 className="text-2xl font-semibold text-foreground flex items-center">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mr-4 border border-green-500/20">
                      <Shield className="w-5 h-5 text-green-400" />
                    </div>
                    Privacy and Data Protection
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>Your privacy is important to us. We collect and use information about you to provide and improve our services.</p>
                    <p>For detailed information about how we handle your data, please review our Privacy Policy.</p>
                  </div>
                </motion.section>

                <motion.section 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h2 className="text-2xl font-semibold text-foreground flex items-center">
                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center mr-4 border border-red-500/20">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    </div>
                    Limitations
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>In no event shall AISEOTurbo or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.</p>
                    <p>This limitation applies to all damages of any kind, including but not limited to compensatory, direct, indirect or consequential damages.</p>
                  </div>
                </motion.section>

                <motion.section 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <h2 className="text-2xl font-semibold text-foreground flex items-center">
                    <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center mr-4 border border-yellow-500/20">
                      <Users className="w-5 h-5 text-yellow-400" />
                    </div>
                    Contact Information
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>If you have any questions about these Terms of Service, please contact us at:</p>
                    <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                      <p><strong>Email:</strong> legal@aiseoturbo.com</p>
                      <p><strong>Address:</strong> Legal Department, AISEOTurbo</p>
                    </div>
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
