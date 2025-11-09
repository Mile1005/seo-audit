"use client"

import { MainLayout } from "../../../components/layout/main-layout"
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Database, Settings, Users } from 'lucide-react'

export default function PrivacyPage() {
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
                Privacy & Security
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">AI SEO Turbo Privacy Policy</h1>
              <p className="text-xl text-gray-300 mb-4">
                This Privacy Policy describes how AI SEO Turbo (“the tool”, “we”, “us”, or “our”) collects, uses, and protects your information when you use our website and services.
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
                      <Database className="w-5 h-5 text-blue-400" />
                    </div>
                    Information We Collect
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us.</p>
                    <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                      <h4 className="font-semibold text-foreground mb-2">Types of data we collect:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Email address and contact information</li>
                        <li>Website URLs you submit for analysis</li>
                        <li>Usage data and analytics</li>
                        <li>Device and browser information</li>
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
                    How We Use Your Information
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>We use the information we collect to provide, maintain, and improve our services.</p>
                    <div className="grid gap-4">
                      <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                        <h4 className="font-semibold text-foreground mb-2">Service Provision</h4>
                        <p>To perform SEO audits, generate reports, and provide technical analysis of your websites.</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                        <h4 className="font-semibold text-foreground mb-2">Communication</h4>
                        <p>To send you service updates, security alerts, and support messages.</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                        <h4 className="font-semibold text-foreground mb-2">Improvement</h4>
                        <p>To analyze usage patterns and improve our algorithms and user experience.</p>
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
                    Data Security
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>We implement appropriate technical and organizational measures to protect your personal information.</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-emerald-500/5 rounded-lg p-4 border border-emerald-500/20">
                        <div className="flex items-center mb-2">
                          <Lock className="w-4 h-4 text-emerald-400 mr-2" />
                          <span className="font-semibold text-foreground">Encryption</span>
                        </div>
                        <p className="text-sm">All data is encrypted in transit and at rest using industry-standard protocols.</p>
                      </div>
                      <div className="bg-blue-500/5 rounded-lg p-4 border border-blue-500/20">
                        <div className="flex items-center mb-2">
                          <Shield className="w-4 h-4 text-blue-400 mr-2" />
                          <span className="font-semibold text-foreground">Access Control</span>
                        </div>
                        <p className="text-sm">Strict access controls ensure only authorized personnel can access your data.</p>
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
                    Your Rights
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>You have several rights regarding your personal information:</p>
                    <div className="space-y-3">
                      {[
                        { title: "Access", description: "Request a copy of your personal data" },
                        { title: "Correction", description: "Update or correct inaccurate information" },
                        { title: "Deletion", description: "Request deletion of your personal data" },
                        { title: "Portability", description: "Receive your data in a machine-readable format" }
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
                    Contact Us
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>If you have any questions about this Privacy Policy or want to exercise your rights, please contact us:</p>
                    <div className="bg-muted/50 rounded-lg p-6 border border-border/50">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Email</h4>
                          <a href="mailto:support@aiseoturbo.com" className="text-primary hover:underline">support@aiseoturbo.com</a>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Response Time</h4>
                          <p>We respond within 30 days</p>
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
                    Privacy in SEO Tools
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>
                      Privacy and data security are paramount when analyzing websites and business intelligence. Our commitment goes beyond
                      legal compliance—it’s fundamental to building trust. We handle web data, analytics information, and user-generated content
                      with enterprise-grade security and strict handling protocols.
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
                      <li><strong>Data Minimization:</strong> We collect only what’s necessary to provide SEO analysis services.</li>
                      <li><strong>Purpose Limitation:</strong> Your data is used solely for the purposes stated in this policy.</li>
                      <li><strong>Security First:</strong> Encryption and access controls protect your information.</li>
                      <li><strong>Transparency:</strong> Clear communication about how we handle and protect your data.</li>
                      <li><strong>User Control:</strong> You control your data and can request deletion at any time.</li>
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
                      Our AI-powered audits process website data to surface SEO opportunities. We analyze public web content, technical structure,
                      and performance metrics while maintaining strict privacy boundaries. We don’t collect or store personally identifiable
                      information from your website visitors.
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Public website content and metadata</li>
                      <li>Technical SEO elements (meta tags, headers, schema markup)</li>
                      <li>Site structure and internal linking patterns</li>
                      <li>Performance metrics and loading speeds</li>
                      <li>Mobile-friendliness and accessibility features</li>
                      <li>Search engine visibility and indexing status</li>
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
                      We protect data throughout its lifecycle with layered controls and monitoring.
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>End‑to‑End Encryption:</strong> AES‑256 in transit and at rest.</li>
                      <li><strong>Zero‑Trust Architecture:</strong> Every request is verified and authorized.</li>
                      <li><strong>Regular Security Audits:</strong> Independent third‑party assessments.</li>
                      <li><strong>Incident Response:</strong> 24/7 monitoring with rapid response.</li>
                      <li><strong>Data Residency:</strong> Secure, SOC 2 compliant data centers.</li>
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
                      We comply with GDPR, CCPA, and other applicable privacy regulations. Our practices are reviewed regularly to align with
                      evolving standards and best practices, with guidance from legal experts in data protection.
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
