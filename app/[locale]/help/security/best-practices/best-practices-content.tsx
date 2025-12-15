"use client";

import { useTranslations } from "next-intl";
import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BestPracticesContent() {
  const t = useTranslations("helpCenter.categories.bestPractices");

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        {/* Breadcrumb */}
        <section className="bg-slate-900/50 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
              <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                {t("breadcrumb.help")}
              </Link>
              <span className="text-gray-600">/</span>
              <Link
                href="/help/security"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t("breadcrumb.security")}
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white">{t("breadcrumb.bestPractices")}</span>
            </nav>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/help/security"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {t("backToSecurity")}
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-white mb-4">{t("title")}</h1>
              <p className="text-xl text-gray-300 max-w-3xl">{t("subtitle")}</p>
            </motion.div>
          </div>

          {/* Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-slate-800/50 rounded-xl p-8 mb-8 border border-slate-700"
          >
            <h2 className="text-2xl font-bold text-white mb-4">{t("introduction.title")}</h2>
            <p className="text-gray-300 leading-relaxed">{t("introduction.description")}</p>
          </motion.section>

          {/* Account Security */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t("accountSecurity.title")}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {t.raw("accountSecurity.practices").map((practice: any, index: number) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
                  >
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-3">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {practice.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {practice.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Password Management */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t("passwordManagement.title")}
              </h2>
              <div className="space-y-4">
                {t.raw("passwordManagement.tips").map((tip: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-0.5">
                      <svg
                        className="w-4 h-4 text-green-600 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Data Protection */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t("dataProtection.title")}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {t.raw("dataProtection.measures").map((measure: any, index: number) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {measure.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {measure.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Monitoring and Alerts */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t("monitoring.title")}
              </h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-3">
                  {t("monitoring.alerts.title")}
                </h3>
                <ul className="list-disc list-inside text-blue-700 dark:text-blue-300 space-y-2">
                  {t.raw("monitoring.alerts.items").map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Contact Support */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t("contactSupport.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                {t("contactSupport.description")}
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                {t("contactSupport.buttonText")}
              </button>
            </div>
          </motion.section>
        </div>
      </div>
    </MainLayout>
  );
}
