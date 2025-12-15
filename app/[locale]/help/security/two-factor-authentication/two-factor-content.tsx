"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Shield,
  Smartphone,
  Key,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function TwoFactorContent() {
  const t = useTranslations("helpCenter.categories.twoFactor");

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/help/security"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("backToSecurity")}
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              {t("title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl"
            >
              {t("subtitle")}
            </motion.p>
          </div>

          {/* Why 2FA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t("introduction.title")}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t("whyEnable.enhancedSecurity.title")}
                  </h3>
                  <p className="text-gray-600">{t("whyEnable.enhancedSecurity.description")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t("whyEnable.accountProtection.title")}
                  </h3>
                  <p className="text-gray-600">{t("whyEnable.accountProtection.description")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Setup Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t("availableMethods.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Smartphone className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t("availableMethods.authenticatorApp.title")}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {t("availableMethods.authenticatorApp.description")}
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  {t
                    .raw("availableMethods.authenticatorApp.features")
                    .map((feature: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Key className="w-6 h-6 text-purple-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t("availableMethods.smsAuth.title")}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{t("availableMethods.smsAuth.description")}</p>
                <div className="space-y-2 text-sm text-gray-600">
                  {t
                    .raw("availableMethods.smsAuth.features")
                    .map((feature: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  <div className="flex items-center">
                    <AlertTriangle className="w-4 h-4 text-orange-600 mr-2" />
                    <span>{t("availableMethods.smsAuth.limitation")}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Setup Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t("setupSteps.title")}</h2>
            <div className="space-y-6">
              {t.raw("setupSteps.steps").map((step: any, index: number) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-semibold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Backup Codes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 mb-8"
          >
            <div className="flex items-start gap-4">
              <Key className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                  {t("backupCodes.title")}
                </h3>
                <p className="text-yellow-800 mb-3">{t("backupCodes.description")}</p>
                <ul className="text-yellow-800 text-sm space-y-1">
                  {t.raw("backupCodes.tips").map((tip: string, index: number) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Additional Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t("relatedArticles.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/help/security"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  {t("relatedArticles.securityPrivacy.title")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("relatedArticles.securityPrivacy.description")}
                </p>
              </Link>
              <Link
                href="/help/security/best-practices"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  {t("relatedArticles.bestPractices.title")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("relatedArticles.bestPractices.description")}
                </p>
              </Link>
              <Link
                href="/contact"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <ArrowRight className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  {t("relatedArticles.securitySupport.title")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("relatedArticles.securitySupport.description")}
                </p>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
