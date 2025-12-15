"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, BookOpen, Shield, Key, Eye, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function SecurityPage() {
  const t = useTranslations("help.categories.security");

  const categoryArticles = [
    {
      title: t("articles.bestPractices.title"),
      href: t("articles.bestPractices.href"),
      time: t("articles.bestPractices.time"),
      description: t("articles.bestPractices.description"),
      icon: Shield,
    },
    {
      title: t("articles.twoFactorAuth.title"),
      href: t("articles.twoFactorAuth.href"),
      time: t("articles.twoFactorAuth.time"),
      description: t("articles.twoFactorAuth.description"),
      icon: Key,
    },
    {
      title: t("articles.privacy.title"),
      href: t("articles.privacy.href"),
      time: t("articles.privacy.time"),
      description: t("articles.privacy.description"),
      icon: Eye,
    },
    {
      title: t("articles.gdpr.title"),
      href: t("articles.gdpr.href"),
      time: t("articles.gdpr.time"),
      description: t("articles.gdpr.description"),
      icon: FileText,
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/help"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("backToHelp")}
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("title")}</h1>
            <p className="text-xl text-gray-600 max-w-3xl">{t("subtitle")}</p>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {categoryArticles.map((article, index) => (
              <motion.div
                key={article.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={article.href}
                  className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <article.icon className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {article.time}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{article.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Additional Resources */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t("additionalResources.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/help/security"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  {t("additionalResources.securityCenter.title")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("additionalResources.securityCenter.description")}
                </p>
              </Link>
              <Link
                href="/privacy"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  {t("additionalResources.privacyPolicy.title")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("additionalResources.privacyPolicy.description")}
                </p>
              </Link>
              <Link
                href="/contact"
                className="text-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <ArrowLeft className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  {t("additionalResources.contactSupport.title")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("additionalResources.contactSupport.description")}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
