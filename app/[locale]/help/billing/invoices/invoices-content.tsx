'use client';

import { useTranslations } from 'next-intl';
import { MainLayout } from '@/components/layout/main-layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, FileText, Download, Calendar, CreditCard, Mail } from 'lucide-react';

export default function InvoicesContent() {
  const t = useTranslations('helpCenter.categories.invoices');

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        {/* Breadcrumb */}
        <section className="bg-slate-900/50 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
              <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                {t('breadcrumb.help')}
              </Link>
              <span className="text-gray-600">/</span>
              <Link href="/help/billing" className="text-gray-400 hover:text-white transition-colors">
                {t('breadcrumb.billing')}
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white">{t('breadcrumb.invoices')}</span>
            </nav>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/help/billing"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {t('backToBilling')}
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-white mb-4">{t('title')}</h1>
              <p className="text-xl text-gray-300 max-w-3xl">{t('subtitle')}</p>
            </motion.div>
          </div>

          {/* Access Invoices Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-slate-900/50 rounded-lg p-8 border border-slate-800">
              <div className="flex items-start gap-4 mb-6">
                <FileText className="w-8 h-8 text-blue-400 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('accessInvoices.title')}</h2>
                  <p className="text-gray-300 mb-6">{t('accessInvoices.description')}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {t.raw('accessInvoices.steps').map((step: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="bg-slate-800/50 rounded-lg p-6 border border-slate-700"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="text-gray-300">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Invoice Details Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <div className="bg-slate-900/50 rounded-lg p-8 border border-slate-800">
              <div className="flex items-start gap-4 mb-6">
                <Download className="w-8 h-8 text-green-400 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('invoiceDetails.title')}</h2>
                  <p className="text-gray-300 mb-6">{t('invoiceDetails.description')}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {t.raw('invoiceDetails.items').map((item: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="bg-slate-800/50 rounded-lg p-6 border border-slate-700"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <item.icon className="w-6 h-6 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="text-gray-300">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Billing History Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <div className="bg-slate-900/50 rounded-lg p-8 border border-slate-800">
              <div className="flex items-start gap-4 mb-6">
                <Calendar className="w-8 h-8 text-purple-400 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('billingHistory.title')}</h2>
                  <p className="text-gray-300 mb-6">{t('billingHistory.description')}</p>
                </div>
              </div>

              <div className="space-y-4">
                {t.raw('billingHistory.features').map((feature: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700"
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Need Help Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12"
          >
            <div className="bg-slate-900/50 rounded-lg p-8 border border-slate-800">
              <div className="flex items-start gap-4 mb-6">
                <Mail className="w-8 h-8 text-orange-400 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('needHelp.title')}</h2>
                  <p className="text-gray-300 mb-6">{t('needHelp.description')}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {t.raw('needHelp.contacts').map((contact: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                    className="bg-slate-800/50 rounded-lg p-6 border border-slate-700"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <contact.icon className="w-6 h-6 text-orange-400" />
                      <h3 className="text-lg font-semibold text-white">{contact.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-3">{contact.description}</p>
                    <a
                      href={contact.link}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {contact.linkText}
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </MainLayout>
  );
}