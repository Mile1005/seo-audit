"use client";

import React, { useState, useEffect } from "react";
import { Clock, Users, Zap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { HomepageAuditSearch } from "./homepage-audit-search";
import { useTranslations } from "next-intl";

// Lazy load framer-motion only for background animations
const LazyFloatingElements = React.lazy(() =>
  import("./hero-floating-elements").then((mod) => ({ default: mod.HeroFloatingElements }))
);

interface HeroTranslations {
  badge: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaSecondary: string;
}

interface KpiTranslations {
  checks: string;
  avgAuditTime: string;
  marketers: string;
}

interface HeroSectionProps {
  heroTranslations?: HeroTranslations;
  kpiTranslations?: KpiTranslations;
}

export function HeroSectionOptimized({ heroTranslations, kpiTranslations }: HeroSectionProps) {
  const isMobile = useIsMobile();
  const [showBackgroundAnimations, setShowBackgroundAnimations] = useState(false);

  const tHero = useTranslations("home.hero");
  const tKpis = useTranslations("home.kpis");

  const badge =
    heroTranslations?.badge && !heroTranslations.badge.includes("home.hero")
      ? heroTranslations.badge
      : tHero("badge") && !tHero("badge").includes("home.hero")
        ? tHero("badge")
        : "AI-Powered SEO Analysis";
  const title =
    heroTranslations?.title && !heroTranslations.title.includes("home.hero")
      ? heroTranslations.title
      : tHero("title") && !tHero("title").includes("home.hero")
        ? tHero("title")
        : "AI SEO Turbo: Professional SEO Audits Made Simple";
  const subtitle =
    heroTranslations?.subtitle && !heroTranslations.subtitle.includes("home.hero")
      ? heroTranslations.subtitle
      : tHero("subtitle") && !tHero("subtitle").includes("home.hero")
        ? tHero("subtitle")
        : "Get actionable insights that <highlight>boost your rankings</highlight> and <highlight>drive organic traffic</highlight>. Join 1,000+ marketers who trust <brand>AI SEO Turbo</brand>'s audits to identify critical SEO issues in minutes.";

  const kpiChecks =
    kpiTranslations?.checks && !kpiTranslations.checks.includes("home.kpis")
      ? kpiTranslations.checks
      : tKpis("checks") && !tKpis("checks").includes("home.kpis")
        ? tKpis("checks")
        : "SEO Checks";
  const kpiAvgAuditTime =
    kpiTranslations?.avgAuditTime && !kpiTranslations.avgAuditTime.includes("home.kpis")
      ? kpiTranslations.avgAuditTime
      : tKpis("avgAuditTime") && !tKpis("avgAuditTime").includes("home.kpis")
        ? tKpis("avgAuditTime")
        : "Avg Audit Time";
  const kpiMarketers =
    kpiTranslations?.marketers && !kpiTranslations.marketers.includes("home.kpis")
      ? kpiTranslations.marketers
      : tKpis("marketers") && !tKpis("marketers").includes("home.kpis")
        ? tKpis("marketers")
        : "Marketers";

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(
        () => {
          setShowBackgroundAnimations(true);
        },
        { timeout: 2500 }
      );
      return () => cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => {
        setShowBackgroundAnimations(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Main H1 - visually hidden for SEO compliance */}
      <h1 className="sr-only">{title}</h1>

      {/* Background Elements - lazy loaded */}
      <div className="absolute inset-0">
        {!isMobile && showBackgroundAnimations && (
          <React.Suspense fallback={null}>
            <LazyFloatingElements />
          </React.Suspense>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto animate-fade-in">
          {/* Content */}
          <div className="text-center mb-12">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full px-4 py-2 text-sm mb-4 animate-slide-up">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-300">{badge}</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-up animation-delay-100">
                {title}
              </h2>
            </div>

            <p
              className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12 animate-slide-up animation-delay-200"
              dangerouslySetInnerHTML={{
                __html: (() => {
                  if (
                    !subtitle ||
                    subtitle.includes("home.hero.subtitle") ||
                    subtitle === "subtitle" ||
                    subtitle === "hero.subtitle" ||
                    subtitle.length < 20
                  ) {
                    return "Get actionable insights that <span class='text-cyan-400 font-semibold'>boost your rankings</span> and <span class='text-cyan-400 font-semibold'>drive organic traffic</span>. Join 1,000+ marketers who trust <span class='font-semibold'>AI SEO Turbo</span>'s audits to identify critical SEO issues in minutes.";
                  }

                  try {
                    return subtitle
                      .replace(/<highlight>/g, '<span class="text-cyan-400 font-semibold">')
                      .replace(/<\/highlight>/g, "</span>")
                      .replace(/<brand>/g, '<span class="font-semibold">')
                      .replace(/<\/brand>/g, "</span>");
                  } catch (error) {
                    return "Get actionable insights that <span class='text-cyan-400 font-semibold'>boost your rankings</span> and <span class='text-cyan-400 font-semibold'>drive organic traffic</span>. Join 1,000+ marketers who trust <span class='font-semibold'>AI SEO Turbo</span>'s audits to identify critical SEO issues in minutes.";
                  }
                })(),
              }}
            />
          </div>

          {/* Interactive Audit Search */}
          <div className="mb-12 animate-slide-up animation-delay-300">
            <HomepageAuditSearch />
          </div>

          {/* KPI Counters */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto pt-8 border-t border-white/10 animate-slide-up animation-delay-400">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span className="text-2xl lg:text-3xl font-bold text-white">47+</span>
              </div>
              <p className="text-gray-400 text-sm">{kpiChecks}</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span className="text-2xl lg:text-3xl font-bold text-white">3m</span>
              </div>
              <p className="text-gray-400 text-sm">{kpiAvgAuditTime}</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <span className="text-2xl lg:text-3xl font-bold text-white">1,000+</span>
              </div>
              <p className="text-gray-400 text-sm">{kpiMarketers}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
