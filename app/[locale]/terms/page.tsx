"use client";

import { MainLayout } from "../../../components/layout/main-layout";
import { motion } from "framer-motion";
import { Shield, FileText, Users, AlertCircle, CheckCircle, Scale } from "lucide-react";
import { useTranslations } from "next-intl";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";

export default function TermsPage() {
  const t = useTranslations("terms");
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-x-hidden">
        {/* Breadcrumbs */}
        <div className="pt-8 pb-4 px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[{ name: "Terms of Service", url: "https://www.aiseoturbo.com/terms" }]}
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
                ease: "easeInOut",
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
                ease: "easeInOut",
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
                {t("hero.badge")}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t("hero.title")}</h1>
              <p className="text-xl text-gray-300 mb-4">{t("hero.subtitle")}</p>
              <p className="text-sm text-gray-400">{t("hero.lastUpdated")}</p>
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
                    {t("sections.acceptance.title")}
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>{t("sections.acceptance.content.0")}</p>
                    <p>{t("sections.acceptance.content.1")}</p>
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
                    {t("sections.license.title")}
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>{t("sections.license.content.0")}</p>
                    <p>{t("sections.license.content.1")}</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>{t("sections.license.restrictions.0")}</li>
                      <li>{t("sections.license.restrictions.1")}</li>
                      <li>{t("sections.license.restrictions.2")}</li>
                      <li>{t("sections.license.restrictions.3")}</li>
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
                    {t("sections.privacy.title")}
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>{t("sections.privacy.content.0")}</p>
                    <p>{t("sections.privacy.content.1")}</p>
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
                    {t("sections.limitations.title")}
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>{t("sections.limitations.content.0")}</p>
                    <p>{t("sections.limitations.content.1")}</p>
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
                    {t("sections.contact.title")}
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>{t("sections.contact.content")}</p>
                    <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                      <p>
                        <strong>Email:</strong>{" "}
                        <a
                          href="mailto:support@aiseoturbo.com"
                          className="text-primary hover:underline"
                        >
                          {t("sections.contact.email")}
                        </a>
                      </p>
                      <p>
                        <strong>Address:</strong> {t("sections.contact.address")}
                      </p>
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
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mr-4 border border-blue-500/20">
                      <CheckCircle className="w-5 h-5 text-blue-400" />
                    </div>
                    {t("sections.overview.title")}
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>{t("sections.overview.content.0")}</p>
                    <p>{t("sections.overview.content.1")}</p>
                  </div>
                </motion.section>

                <motion.section
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <h2 className="text-2xl font-semibold text-foreground flex items-center">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mr-4 border border-green-500/20">
                      <Shield className="w-5 h-5 text-green-400" />
                    </div>
                    {t("sections.aiInsights.title")}
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>{t("sections.aiInsights.intro")}</p>
                    <h3 className="text-lg font-semibold text-foreground">
                      {t("sections.aiInsights.limitationsTitle")}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>{t("sections.aiInsights.limitations.0")}</li>
                      <li>{t("sections.aiInsights.limitations.1")}</li>
                      <li>{t("sections.aiInsights.limitations.2")}</li>
                      <li>{t("sections.aiInsights.limitations.3")}</li>
                      <li>{t("sections.aiInsights.limitations.4")}</li>
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
                      <Users className="w-5 h-5 text-purple-400" />
                    </div>
                    {t("sections.acceptableUse.title")}
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>{t("sections.acceptableUse.intro")}</p>
                    <h3 className="text-lg font-semibold text-foreground">
                      {t("sections.acceptableUse.permittedTitle")}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>{t("sections.acceptableUse.permitted.0")}</li>
                      <li>{t("sections.acceptableUse.permitted.1")}</li>
                      <li>{t("sections.acceptableUse.permitted.2")}</li>
                      <li>{t("sections.acceptableUse.permitted.3")}</li>
                      <li>{t("sections.acceptableUse.permitted.4")}</li>
                    </ul>
                    <h3 className="text-lg font-semibold text-foreground">
                      {t("sections.acceptableUse.prohibitedTitle")}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>{t("sections.acceptableUse.prohibited.0")}</li>
                      <li>{t("sections.acceptableUse.prohibited.1")}</li>
                      <li>{t("sections.acceptableUse.prohibited.2")}</li>
                      <li>{t("sections.acceptableUse.prohibited.3")}</li>
                      <li>{t("sections.acceptableUse.prohibited.4")}</li>
                      <li>{t("sections.acceptableUse.prohibited.5")}</li>
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
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mr-4 border border-blue-500/20">
                      <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    {t("sections.dataOwnership.title")}
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>{t("sections.dataOwnership.intro")}</p>
                    <h3 className="text-lg font-semibold text-foreground">
                      {t("sections.dataOwnership.yourRightsTitle")}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>{t("sections.dataOwnership.yourRights.0")}</li>
                      <li>{t("sections.dataOwnership.yourRights.1")}</li>
                      <li>{t("sections.dataOwnership.yourRights.2")}</li>
                      <li>{t("sections.dataOwnership.yourRights.3")}</li>
                    </ul>
                    <h3 className="text-lg font-semibold text-foreground">
                      {t("sections.dataOwnership.ourRightsTitle")}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>{t("sections.dataOwnership.ourRights.0")}</li>
                      <li>{t("sections.dataOwnership.ourRights.1")}</li>
                      <li>{t("sections.dataOwnership.ourRights.2")}</li>
                      <li>{t("sections.dataOwnership.ourRights.3")}</li>
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
                    <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center mr-4 border border-yellow-500/20">
                      <Scale className="w-5 h-5 text-yellow-400" />
                    </div>
                    {t("sections.serviceLevels.title")}
                  </h2>
                  <div className="pl-14 space-y-4 text-muted-foreground">
                    <p>{t("sections.serviceLevels.content.0")}</p>
                    <p>{t("sections.serviceLevels.content.1")}</p>
                  </div>
                </motion.section>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
