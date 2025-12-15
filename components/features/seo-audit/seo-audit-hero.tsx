"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Target,
  Zap,
  TrendingUp,
  Shield,
  Play,
  ChevronRight,
  Clock,
  BarChart,
  Users,
  Star,
  AlertTriangle,
  Loader2,
  Search,
} from "lucide-react";

interface SEOAuditHeroProps {
  onAuditSubmit?: (data: { url: string; email?: string; keyword?: string }) => void;
  isSubmitting?: boolean;
  submitError?: string;
}

export function SEOAuditHero({
  onAuditSubmit,
  isSubmitting = false,
  submitError,
}: SEOAuditHeroProps) {
  const t = useTranslations("featurePages.seoAudit");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [keyword, setKeyword] = useState("");
  const [errors, setErrors] = useState<{ url?: string; email?: string }>({});

  const validateForm = () => {
    const newErrors: { url?: string; email?: string } = {};

    if (!url.trim()) {
      newErrors.url = t("form.errors.urlRequired");
    } else {
      const trimmedUrl = url.trim();
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
      const domainPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

      if (!urlPattern.test(trimmedUrl) && !domainPattern.test(trimmedUrl)) {
        newErrors.url = t("form.errors.urlInvalidSimple");
      }
    }

    if (email.trim() && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = t("form.errors.emailInvalid");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (onAuditSubmit) {
      onAuditSubmit({
        url: url.trim(),
        email: email.trim() || undefined,
        keyword: keyword.trim() || undefined,
      });
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Zap className="w-4 h-4 mr-2 animate-pulse" />
                {t("hero.badge")}
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                {t("hero.title")}
                <span className="text-primary block sm:inline"> {t("hero.titleHighlight")}</span>
              </h1>
              <p className="text-xl text-muted-foreground">{t("hero.subtitle")}</p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-muted-foreground">{t("hero.feature1")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-muted-foreground">{t("hero.feature2")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-muted-foreground">{t("hero.feature3")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-muted-foreground">{t("hero.feature4")}</span>
              </div>
            </div>
          </motion.div>

          {/* Audit Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card rounded-2xl shadow-2xl border p-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">{t("form.title")}</h2>
              <p className="text-muted-foreground">{t("form.subtitle")}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="website-url"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {t("form.urlLabel")}
                </label>
                <input
                  type="url"
                  id="website-url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={t("form.urlPlaceholder")}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                    errors.url ? "border-red-500" : "border-muted-foreground/20"
                  }`}
                  required
                />
                {errors.url && <p className="mt-1 text-sm text-red-600">{errors.url}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  {t("form.emailLabel")}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("form.emailPlaceholder")}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
                    errors.email ? "border-red-500" : "border-muted-foreground/20"
                  }`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="keyword" className="block text-sm font-medium text-foreground mb-2">
                  {t("form.keywordLabel")}{" "}
                  <span className="text-muted-foreground">({t("form.optional")})</span>
                </label>
                <input
                  type="text"
                  id="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder={t("form.keywordPlaceholder")}
                  className="w-full px-4 py-3 border border-muted-foreground/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                />
              </div>

              {submitError && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-destructive text-sm">{submitError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t("form.analyzing")}
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    {t("form.startAudit")}
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>{t("form.footer")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
