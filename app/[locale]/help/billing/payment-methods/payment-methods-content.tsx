"use client";

import { useTranslations } from "next-intl";
import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CreditCard, Shield, Plus, Edit, Trash2 } from "lucide-react";

export default function PaymentMethodsContent() {
  const t = useTranslations("helpCenter.categories.paymentMethods");

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
              <span className="text-white">{t("breadcrumb.paymentMethods")}</span>
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

          {/* Accepted Payment Methods Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-slate-900/50 rounded-lg p-8 border border-slate-800">
              <div className="flex items-start gap-4 mb-6">
                <CreditCard className="w-8 h-8 text-blue-400 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {t("acceptedMethods.title")}
                  </h2>
                  <p className="text-gray-300 mb-6">{t("acceptedMethods.description")}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {t.raw("acceptedMethods.methods").map((method: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="bg-slate-800/50 rounded-lg p-6 border border-slate-700"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <method.icon className="w-6 h-6 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">{method.name}</h3>
                    </div>
                    <p className="text-gray-300 mb-3">{method.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {method.features.map((feature: string, featureIndex: number) => (
                        <span
                          key={featureIndex}
                          className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Managing Payment Methods Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <div className="bg-slate-900/50 rounded-lg p-8 border border-slate-800">
              <div className="flex items-start gap-4 mb-6">
                <Edit className="w-8 h-8 text-green-400 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {t("managingMethods.title")}
                  </h2>
                  <p className="text-gray-300 mb-6">{t("managingMethods.description")}</p>
                </div>
              </div>

              <div className="space-y-6">
                {t.raw("managingMethods.actions").map((action: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-4 p-6 bg-slate-800/30 rounded-lg border border-slate-700"
                  >
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{action.title}</h3>
                      <p className="text-gray-300 mb-4">{action.description}</p>
                      <div className="space-y-2">
                        {action.steps.map((step: string, stepIndex: number) => (
                          <div key={stepIndex} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-green-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-green-400 text-sm font-semibold">
                                {stepIndex + 1}
                              </span>
                            </div>
                            <p className="text-gray-300 text-sm">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Security & Privacy Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-12"
          >
            <div className="bg-slate-900/50 rounded-lg p-8 border border-slate-800">
              <div className="flex items-start gap-4 mb-6">
                <Shield className="w-8 h-8 text-purple-400 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t("security.title")}</h2>
                  <p className="text-gray-300 mb-6">{t("security.description")}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {t.raw("security.features").map((feature: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    className="bg-slate-800/50 rounded-lg p-6 border border-slate-700"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <feature.icon className="w-6 h-6 text-purple-400" />
                      <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    </div>
                    <p className="text-gray-300">{feature.description}</p>
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
                <Plus className="w-8 h-8 text-orange-400 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t("needHelp.title")}</h2>
                  <p className="text-gray-300 mb-6">{t("needHelp.description")}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {t.raw("needHelp.contacts").map((contact: any, index: number) => (
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
