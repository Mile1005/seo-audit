import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import SEOToolsPage from "./page-translated";
import { generateSEOMeta, pageSEO } from "@/lib/seo";
import { type Locale } from "@/i18n";
import { generateAlternates } from "@/lib/metadata-utils";
import { getTranslations } from "next-intl/server";

// SEO metadata for the seo tools help page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // Define translations directly for metadata
  const translations = {
    en: {
      title: "SEO Tools Overview - Complete Feature Guide | AI SEO Turbo",
      description:
        "Explore our comprehensive suite of SEO tools designed to boost your search rankings, analyze competitors, and optimize your website performance.",
      keywords: [
        "SEO tools",
        "SEO features",
        "search rankings",
        "competitor analysis",
        "website optimization",
        "SEO toolkit",
        "technical SEO",
        "keyword research",
        "site audit",
      ],
    },
    it: {
      title: "Strumenti SEO: Guida Completa alle Funzionalità e Uso﻿",
      description:
        "Strumenti SEO. Dagli audit all'analisi competitor. Scopri funzioni potenti per ottimizzare il traffico organico.",
      keywords: [
        "strumenti SEO",
        "funzionalità SEO",
        "ranking di ricerca",
        "analisi concorrenti",
        "ottimizzazione sito web",
        "toolkit SEO",
        "SEO tecnico",
        "ricerca parole chiave",
        "audit sito",
      ],
    },
    de: {
      title: "SEO-Tools Übersicht - Komplette Funktionsanleitung | AI SEO Turbo",
      description:
        "SEO-Tools Entdecken. Von Audits bis Konkurrenzanalyse. Optimieren Sie Ihre Website und steigern Sie den Traffic.",
      keywords: [
        "SEO-Tools",
        "SEO-Funktionen",
        "Suchrankings",
        "Wettbewerberanalyse",
        "Website-Optimierung",
        "SEO-Toolkit",
        "technisches SEO",
        "Keyword-Recherche",
        "Site-Audit",
      ],
    },
    fr: {
      title: "Outils SEO : Aperçu Complet et Guide des Fonctionnalités",
      description:
        "Outils SEO. Des audits à l'analyse concurrentielle. Découvrez nos fonctionnalités pour optimiser votre site et trafic.",
      keywords: [
        "outils SEO",
        "fonctionnalités SEO",
        "classements de recherche",
        "analyse concurrents",
        "optimisation site web",
        "boîte à outils SEO",
        "SEO technique",
        "recherche mots-clés",
        "audit site",
      ],
    },
    es: {
      title: "Herramientas SEO: Resumen y Guía de Características",
      description:
        "Herramientas SEO. Desde auditorías hasta análisis de competencia. Descubre funciones para optimizar tu tráfico.",
      keywords: [
        "herramientas SEO",
        "características SEO",
        "rankings de búsqueda",
        "análisis competidores",
        "optimización sitio web",
        "toolkit SEO",
        "SEO técnico",
        "investigación palabras clave",
        "auditoría sitio",
      ],
    },
    id: {
      title: "Ringkasan Alat SEO - Panduan Lengkap Fitur | AI SEO Turbo",
      description:
        "Jelajahi rangkaian lengkap alat SEO kami yang dirancang untuk meningkatkan peringkat pencarian Anda, menganalisis pesaing, dan mengoptimalkan kinerja situs web.",
      keywords: [
        "alat SEO",
        "fitur SEO",
        "peringkat pencarian",
        "analisis pesaing",
        "optimasi situs web",
        "toolkit SEO",
        "SEO teknis",
        "penelitian kata kunci",
        "audit situs",
      ],
    },
  };

  const localeTranslations = translations[locale as keyof typeof translations] || translations.en;

  return {
    ...generateSEOMeta({
      description: localeTranslations.description,
      keywords: localeTranslations.keywords,
      locale: locale as Locale,
      path: "help/seo-tools",
    }),
    alternates: generateAlternates("/help/seo-tools", locale as Locale),
  };
}

type Props = { params: Promise<{ locale: string }> };

export default async function LocalizedSEOToolsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SEOToolsPage />;
}
