"use client";

import { useTranslations } from "next-intl";
import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Clock, Shield, CreditCard } from "lucide-react";

export default function CancellationContent() {
  const t = useTranslations("helpCenter.categories.cancellation");

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
                href="/help/billing"
                className="text-gray-400 hover:text-white transition-colors"
              >
                {t("breadcrumb.billing")}
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-white">{t("breadcrumb.cancellation")}</span>
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
              {t("backToBilling")}
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

          {/* Important Notice */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="bg-amber-900/20 border border-amber-800 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-amber-100 mb-2">
                    {t("importantNotice.title")}
                  </h3>
                  <p className="text-amber-200">{t("importantNotice.description")}</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Cancellation Process */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">{t("process.title")}</h2>

            <div className="space-y-6">
              {t.raw("process.steps").map((step: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="bg-slate-800/50 rounded-lg p-6 border border-slate-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-gray-300 mb-4">{step.description}</p>
                      {step.details && (
                        <ul className="space-y-2">
                          {step.details.map((detail: string, detailIndex: number) => (
                            <li key={detailIndex} className="flex items-center text-gray-300">
                              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* What Happens After Cancellation */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">{t("afterCancellation.title")}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {t.raw("afterCancellation.items").map((item: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="bg-slate-800/50 rounded-lg p-6 border border-slate-700"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {item.icon === "clock" && <Clock className="w-5 h-5 text-blue-400" />}
                    {item.icon === "shield" && <Shield className="w-5 h-5 text-green-400" />}
                    {item.icon === "credit-card" && (
                      <CreditCard className="w-5 h-5 text-purple-400" />
                    )}
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Refund Policy */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">{t("refundPolicy.title")}</h2>

            <div className="space-y-6">
              {t.raw("refundPolicy.scenarios").map((scenario: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className={`rounded-lg p-6 border ${
                    scenario.eligible
                      ? "bg-green-900/20 border-green-800"
                      : "bg-red-900/20 border-red-800"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">{scenario.title}</h3>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        scenario.eligible
                          ? "bg-green-800 text-green-100"
                          : "bg-red-800 text-red-100"
                      }`}
                    >
                      {scenario.eligible
                        ? t("refundPolicy.eligible")
                        : t("refundPolicy.notEligible")}
                    </span>
                  </div>
                  <p className={`${scenario.eligible ? "text-green-200" : "text-red-200"}`}>
                    {scenario.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Need Help */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">{t("needHelp.title")}</h2>
              <p className="text-xl mb-6 opacity-90">{t("needHelp.description")}</p>

              <div className="flex flex-wrap gap-4">
                {t.raw("needHelp.contacts").map((contact: any, index: number) => (
                  <a
                    key={index}
                    href={contact.href}
                    className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                  >
                    {contact.text}
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
