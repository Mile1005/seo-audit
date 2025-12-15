"use client";

import { useTranslations } from "next-intl";
import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function GdprContent() {
  const t = useTranslations("helpCenter.categories.gdpr");
  const tRaw = useTranslations("helpCenter.categories.gdpr").raw;

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
              <span className="text-white">{t("breadcrumb.gdpr")}</span>
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
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">{t("introduction.title")}</h2>
            <p className="text-lg text-gray-300 mb-8">{t("introduction.description")}</p>

            <div className="grid md:grid-cols-2 gap-6">
              {tRaw("introduction.keyRequirements").map((req: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-slate-800/50 rounded-lg p-6 border border-slate-700"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">{req.title}</h3>
                  <p className="text-gray-300">{req.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* What is Personal Data */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">{t("personalData.title")}</h2>

            <div className="space-y-8">
              {/* Directly Identifiable */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-blue-900/20 rounded-lg p-6 border border-blue-800"
              >
                <h3 className="text-xl font-semibold text-blue-100 mb-4">
                  {t("personalData.directlyIdentifiable.title")}
                </h3>
                <ul className="grid md:grid-cols-2 gap-2">
                  {tRaw("personalData.directlyIdentifiable.items").map(
                    (item: string, index: number) => (
                      <li key={index} className="flex items-center text-blue-200">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </motion.div>

              {/* Online Identifiers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-green-900/20 rounded-lg p-6 border border-green-800"
              >
                <h3 className="text-xl font-semibold text-green-100 mb-4">
                  {t("personalData.onlineIdentifiers.title")}
                </h3>
                <ul className="grid md:grid-cols-2 gap-2">
                  {tRaw("personalData.onlineIdentifiers.items").map(
                    (item: string, index: number) => (
                      <li key={index} className="flex items-center text-green-200">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </motion.div>

              {/* Sensitive Data */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-red-900/20 rounded-lg p-6 border border-red-800"
              >
                <h3 className="text-xl font-semibold text-red-100 mb-4">
                  {t("personalData.sensitiveData.title")}
                </h3>
                <ul className="grid md:grid-cols-2 gap-2">
                  {tRaw("personalData.sensitiveData.items").map((item: string, index: number) => (
                    <li key={index} className="flex items-center text-red-200">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-3 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Business Data */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-purple-900/20 rounded-lg p-6 border border-purple-800"
              >
                <h3 className="text-xl font-semibold text-purple-100 mb-4">
                  {t("personalData.businessData.title")}
                </h3>
                <ul className="grid md:grid-cols-2 gap-2">
                  {tRaw("personalData.businessData.items").map((item: string, index: number) => (
                    <li key={index} className="flex items-center text-purple-200">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.section>

          {/* Getting Started */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">{t("gettingStarted.title")}</h2>
              <p className="text-xl mb-6 opacity-90">{t("gettingStarted.description")}</p>

              <div className="flex flex-wrap gap-4">
                {tRaw("gettingStarted.links").map((link: any, index: number) => (
                  <a
                    key={index}
                    href={link.href}
                    className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </MainLayout>
  );
}
