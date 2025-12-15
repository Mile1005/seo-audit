#!/usr/bin/env node

/**
 * Title Optimizer - FULL Localization for ALL Pages
 * Creates properly localized SEO-optimized page titles for all locales
 */

import { readFileSync, writeFileSync } from "fs";

// Location targeting suffixes based on research
const LOCATION_TARGETING = {
  en: "", // No suffix for English (global)
  fr: " - France",
  de: " - Deutschland",
  es: " - España",
  it: " - Italia",
  id: " - Indonesia",
};

// FULLY LOCALIZED PAGE TITLES FOR ALL LOCALES
const LOCALIZED_TITLES = {
  // HOMEPAGES - Already optimized
  homepage: {
    en: "AI SEO Audit Tool - Boost Rankings 300% Faster | AI SEO Turbo",
    fr: "Outil d'Audit SEO IA - Améliorez vos Classements 300% Plus Rapidement | AI SEO Turbo - France",
    de: "KI-SEO-Audit-Tool - Rankings um 300% Schneller Steigern | AI SEO Turbo - Deutschland",
    es: "Herramienta de Auditoría SEO IA - Mejora Rankings 300% Más Rápido | AI SEO Turbo - España",
    it: "Strumento di Audit SEO IA - Migliora i Ranking 300% Più Velocemente | AI SEO Turbo - Italia",
    id: "Alat Audit SEO AI - Tingkatkan Ranking 300% Lebih Cepat | AI SEO Turbo - Indonesia",
  },

  // PRICING PAGES
  pricing: {
    en: "SEO Audit Pricing - Plans From $29/month | AI SEO Turbo",
    fr: "Tarifs SEO Audit - Plans Dès 29$/mois | AI SEO Turbo - France",
    de: "SEO Audit Preise - Pläne Ab 29$/Monat | AI SEO Turbo - Deutschland",
    es: "Precios Auditoría SEO - Planes Desde 29$/mes | AI SEO Turbo - España",
    it: "Prezzi Audit SEO - Piani Da 29$/mese | AI SEO Turbo - Italia",
    id: "Harga Audit SEO - Paket Dari $29/bulan | AI SEO Turbo - Indonesia",
  },

  // FEATURES PAGES
  features: {
    en: "SEO Features - Complete Audit & Analysis | AI SEO Turbo",
    fr: "Fonctionnalités SEO - Audit Complet & Analyse | AI SEO Turbo - France",
    de: "SEO Funktionen - Vollständige Audit & Analyse | AI SEO Turbo - Deutschland",
    es: "Características SEO - Auditoría Completa & Análisis | AI SEO Turbo - España",
    it: "Funzionalità SEO - Audit Completo & Analisi | AI SEO Turbo - Italia",
    id: "Fitur SEO - Audit Lengkap & Analisis | AI SEO Turbo - Indonesia",
  },

  "features/seo-audit": {
    en: "SEO Audit Tool - Comprehensive Website Analysis | AI SEO Turbo",
    fr: "Outil d'Audit SEO - Analyse Complète du Site | AI SEO Turbo - France",
    de: "SEO Audit Tool - Umfassende Website-Analyse | AI SEO Turbo - Deutschland",
    es: "Herramienta de Auditoría SEO - Análisis Completo del Sitio | AI SEO Turbo - España",
    it: "Strumento Audit SEO - Analisi Completa del Sito | AI SEO Turbo - Italia",
    id: "Alat Audit SEO - Analisis Website Lengkap | AI SEO Turbo - Indonesia",
  },

  "features/site-crawler": {
    en: "Site Crawler - Technical SEO Analysis | AI SEO Turbo",
    fr: "Crawleur de Site - Analyse SEO Technique | AI SEO Turbo - France",
    de: "Site Crawler - Technische SEO-Analyse | AI SEO Turbo - Deutschland",
    es: "Rastreador de Sitio - Análisis SEO Técnico | AI SEO Turbo - España",
    it: "Crawler del Sito - Analisi SEO Tecnica | AI SEO Turbo - Italia",
    id: "Site Crawler - Analisis SEO Teknis | AI SEO Turbo - Indonesia",
  },

  "features/keyword-tracking": {
    en: "Keyword Tracking - Monitor Search Rankings | AI SEO Turbo",
    fr: "Suivi des Mots-Clés - Surveillez vos Classements | AI SEO Turbo - France",
    de: "Keyword Tracking - Rankings überwachen | AI SEO Turbo - Deutschland",
    es: "Seguimiento de Palabras Clave - Monitorea Rankings | AI SEO Turbo - España",
    it: "Monitoraggio Keywords - Monitora i Ranking | AI SEO Turbo - Italia",
    id: "Pelacakan Kata Kunci - Pantau Ranking Pencarian | AI SEO Turbo - Indonesia",
  },

  "features/competitor-analysis": {
    en: "Competitor Analysis - SEO Intelligence & Insights | AI SEO Turbo",
    fr: "Analyse Concurrentielle - Intelligence SEO | AI SEO Turbo - France",
    de: "Wettbewerbsanalyse - SEO Intelligence | AI SEO Turbo - Deutschland",
    es: "Análisis de Competidores - Inteligencia SEO | AI SEO Turbo - España",
    it: "Analisi Competitor - Intelligence SEO | AI SEO Turbo - Italia",
    id: "Analisis Kompetitor - Intelijen SEO | AI SEO Turbo - Indonesia",
  },

  "features/ai-assistant": {
    en: "AI SEO Assistant - Smart Recommendations | AI SEO Turbo",
    fr: "Assistant SEO IA - Recommandations Intelligentes | AI SEO Turbo - France",
    de: "KI-SEO-Assistent - Intelligente Empfehlungen | AI SEO Turbo - Deutschland",
    es: "Asistente SEO IA - Recomendaciones Inteligentes | AI SEO Turbo - España",
    it: "Assistente SEO IA - Raccomandazioni Intelligenti | AI SEO Turbo - Italia",
    id: "Asisten SEO AI - Rekomendasi Pintar | AI SEO Turbo - Indonesia",
  },

  // ABOUT & CONTACT
  about: {
    en: "About AI SEO Turbo - Expert SEO Team & AI Innovation | AI SEO Turbo",
    fr: "À Propos d'AI SEO Turbo - Équipe SEO Experte | AI SEO Turbo - France",
    de: "Über AI SEO Turbo - Experten SEO Team | AI SEO Turbo - Deutschland",
    es: "Acerca de AI SEO Turbo - Equipo SEO Experto | AI SEO Turbo - España",
    it: "Chi Siamo AI SEO Turbo - Team SEO Esperto | AI SEO Turbo - Italia",
    id: "Tentang AI SEO Turbo - Tim SEO Ahli | AI SEO Turbo - Indonesia",
  },

  contact: {
    en: "Contact AI SEO Turbo - Expert SEO Support & Consultation | AI SEO Turbo",
    fr: "Contact AI SEO Turbo - Support SEO Expert | AI SEO Turbo - France",
    de: "Kontakt AI SEO Turbo - SEO Experten Support | AI SEO Turbo - Deutschland",
    es: "Contacto AI SEO Turbo - Soporte SEO Experto | AI SEO Turbo - España",
    it: "Contatto AI SEO Turbo - Supporto SEO Esperto | AI SEO Turbo - Italia",
    id: "Kontak AI SEO Turbo - Dukungan SEO Ahli | AI SEO Turbo - Indonesia",
  },

  // BLOG & CASE STUDIES
  blog: {
    en: "SEO Blog - Latest SEO Tips & Strategies | AI SEO Turbo",
    fr: "Blog SEO - Conseils & Stratégies SEO | AI SEO Turbo - France",
    de: "SEO Blog - Neueste SEO Tipps & Strategien | AI SEO Turbo - Deutschland",
    es: "Blog SEO - Últimos Consejos SEO | AI SEO Turbo - España",
    it: "Blog SEO - Ultimi Consigli SEO | AI SEO Turbo - Italia",
    id: "Blog SEO - Tips & Strategi SEO Terbaru | AI SEO Turbo - Indonesia",
  },

  "case-studies": {
    en: "SEO Case Studies - Real Results & Success Stories | AI SEO Turbo",
    fr: "Études de Cas SEO - Résultats Réels | AI SEO Turbo - France",
    de: "SEO Fallstudien - Reale Ergebnisse | AI SEO Turbo - Deutschland",
    es: "Casos de Estudio SEO - Resultados Reales | AI SEO Turbo - España",
    it: "Casi Studio SEO - Risultati Reali | AI SEO Turbo - Italia",
    id: "Studi Kasus SEO - Hasil Nyata | AI SEO Turbo - Indonesia",
  },
};

// Blog post specific titles (localized)
const BLOG_TITLES = {
  "ai-powered-seo-future": {
    en: "AI-Powered SEO: The Future is Here | AI SEO Turbo Blog",
    fr: "SEO Alimenté par IA: L'Avenir est Là | AI SEO Turbo Blog - France",
    de: "KI-gestützte SEO: Die Zukunft ist da | AI SEO Turbo Blog - Deutschland",
    es: "SEO Impulsado por IA: El Futuro está Aquí | AI SEO Turbo Blog - España",
    it: "SEO Potenziato dall'IA: Il Futuro è Qui | AI SEO Turbo Blog - Italia",
    id: "SEO Bertenaga AI: Masa Depan Telah Tiba | AI SEO Turbo Blog - Indonesia",
  },
  "complete-seo-audit-checklist-2025": {
    en: "Complete SEO Audit Checklist 2025 | AI SEO Turbo Blog",
    fr: "Liste de Contrôle Audit SEO Complet 2025 | AI SEO Turbo Blog - France",
    de: "Vollständige SEO Audit Checkliste 2025 | AI SEO Turbo Blog - Deutschland",
    es: "Lista de Verificación Completa de Auditoría SEO 2025 | AI SEO Turbo Blog - España",
    it: "Elenco Completo Audit SEO 2025 | AI SEO Turbo Blog - Italia",
    id: "Checklist Audit SEO Lengkap 2025 | AI SEO Turbo Blog - Indonesia",
  },
  "content-seo-creating-search-friendly-content": {
    en: "Content SEO: Creating Search-Friendly Content | AI SEO Turbo Blog",
    fr: "SEO de Contenu: Créer du Contenu Optimisé | AI SEO Turbo Blog - France",
    de: "Content SEO: Suchmaschinenfreundlichen Content erstellen | AI SEO Turbo Blog - Deutschland",
    es: "SEO de Contenido: Crear Contenido Amigable para Búsquedas | AI SEO Turbo Blog - España",
    it: "SEO dei Contenuti: Creare Contenuti Ottimizzati | AI SEO Turbo Blog - Italia",
    id: "SEO Konten: Membuat Konten Ramah Pencarian | AI SEO Turbo Blog - Indonesia",
  },
  "core-web-vitals-optimization-guide": {
    en: "Core Web Vitals Optimization Guide - Improve Page Experience | AI SEO Turbo Blog",
    fr: "Guide d'Optimisation Core Web Vitals - Améliorez l'Expérience | AI SEO Turbo Blog - France",
    de: "Core Web Vitals Optimierung Guide - Seiten-Erlebnis verbessern | AI SEO Turbo Blog - Deutschland",
    es: "Guía de Optimización Core Web Vitals - Mejora la Experiencia | AI SEO Turbo Blog - España",
    it: "Guida Ottimizzazione Core Web Vitals - Migliora l'Esperienza | AI SEO Turbo Blog - Italia",
    id: "Panduan Optimasi Core Web Vitals - Tingkatkan Pengalaman | AI SEO Turbo Blog - Indonesia",
  },
  "local-seo-strategies-that-work": {
    en: "Local SEO Strategies That Work | AI SEO Turbo Blog",
    fr: "Stratégies SEO Locales Qui Fonctionnent | AI SEO Turbo Blog - France",
    de: "Lokale SEO Strategien die funktionieren | AI SEO Turbo Blog - Deutschland",
    es: "Estrategias SEO Locales que Funcionan | AI SEO Turbo Blog - España",
    it: "Strategie SEO Locali che Funzionano | AI SEO Turbo Blog - Italia",
    id: "Strategi SEO Lokal yang Efektif | AI SEO Turbo Blog - Indonesia",
  },
  "technical-seo-best-practices-2025": {
    en: "Technical SEO Best Practices 2025 | AI SEO Turbo Blog",
    fr: "Meilleures Pratiques SEO Technique 2025 | AI SEO Turbo Blog - France",
    de: "Technische SEO Best Practices 2025 | AI SEO Turbo Blog - Deutschland",
    es: "Mejores Prácticas SEO Técnico 2025 | AI SEO Turbo Blog - España",
    it: "Migliori Pratiche SEO Tecnico 2025 | AI SEO Turbo Blog - Italia",
    id: "Praktik Terbaik SEO Teknis 2025 | AI SEO Turbo Blog - Indonesia",
  },
};

// Case study specific titles (localized)
const CASE_STUDY_TITLES = {
  "cloudsync-pro": {
    en: "CloudSync Pro Case Study - 312% Organic Traffic Increase",
    fr: "Étude de Cas CloudSync Pro - 312% de Trafic Organique",
    de: "CloudSync Pro Fallstudie - 312% organischer Traffic",
    es: "Caso de Estudio CloudSync Pro - 312% Tráfico Orgánico",
    it: "Caso Studio CloudSync Pro - 312% Traffico Organico",
    id: "Studi Kasus CloudSync Pro - Peningkatan Traffic Organik 312%",
  },
  "digital-growth-agency": {
    en: "Digital Growth Agency Case Study - 245% Client Acquisition",
    fr: "Étude de Cas Agence Croissance Digitale - 245% Acquisition Clients",
    de: "Digital Growth Agency Fallstudie - 245% Kundenakquise",
    es: "Caso de Estudio Agencia Crecimiento Digital - 245% Adquisición Clientes",
    it: "Caso Studio Agenzia Crescita Digitale - 245% Acquisizione Clienti",
    id: "Studi Kasus Digital Growth Agency - Akuisisi Klien 245%",
  },
  "gearhub-pro": {
    en: "GearHub Pro Case Study - #1 Rankings in 4 Months",
    fr: "Étude de Cas GearHub Pro - #1 en 4 Mois",
    de: "GearHub Pro Fallstudie - #1 Rankings in 4 Monaten",
    es: "Caso de Estudio GearHub Pro - #1 Rankings en 4 Meses",
    it: "Caso Studio GearHub Pro - #1 Ranking in 4 Mesi",
    id: "Studi Kasus GearHub Pro - Ranking #1 dalam 4 Bulan",
  },
  "peak-performance": {
    en: "Peak Performance Case Study - 189% Revenue Growth",
    fr: "Étude de Cas Peak Performance - 189% Croissance Revenus",
    de: "Peak Performance Fallstudie - 189% Umsatzwachstum",
    es: "Caso de Estudio Peak Performance - 189% Crecimiento Ingresos",
    it: "Caso Studio Peak Performance - 189% Crescita Ricavi",
    id: "Studi Kasus Peak Performance - Pertumbuhan Pendapatan 189%",
  },
  "stylecraft-boutique": {
    en: "StyleCraft Boutique Case Study - 427% Organic Traffic",
    fr: "Étude de Cas StyleCraft Boutique - 427% Trafic Organique",
    de: "StyleCraft Boutique Fallstudie - 427% organischer Traffic",
    es: "Caso de Estudio StyleCraft Boutique - 427% Tráfico Orgánico",
    it: "Caso Studio StyleCraft Boutique - 427% Traffico Organico",
    id: "Studi Kasus StyleCraft Boutique - Traffic Organik 427%",
  },
  "techflow-solutions": {
    en: "TechFlow Solutions Case Study - Enterprise SEO Success",
    fr: "Étude de Cas TechFlow Solutions - Succès SEO Entreprise",
    de: "TechFlow Solutions Fallstudie - Enterprise SEO Erfolg",
    es: "Caso de Estudio TechFlow Solutions - Éxito SEO Empresarial",
    it: "Caso Studio TechFlow Solutions - Successo SEO Enterprise",
    id: "Studi Kasus TechFlow Solutions - Kesuksesan SEO Enterprise",
  },
};

// Help center titles (localized)
const HELP_TITLES = {
  help: {
    en: "Help Center - SEO Support & Guides | AI SEO Turbo",
    fr: "Centre d'Aide - Support SEO & Guides | AI SEO Turbo - France",
    de: "Hilfe Center - SEO Support & Anleitungen | AI SEO Turbo - Deutschland",
    es: "Centro de Ayuda - Soporte SEO & Guías | AI SEO Turbo - España",
    it: "Centro Assistenza - Supporto SEO & Guide | AI SEO Turbo - Italia",
    id: "Pusat Bantuan - Dukungan SEO & Panduan | AI SEO Turbo - Indonesia",
  },
  "help/getting-started": {
    en: "Getting Started - AI SEO Turbo Setup Guide",
    fr: "Premiers Pas - Guide de Configuration AI SEO Turbo - France",
    de: "Erste Schritte - AI SEO Turbo Setup Anleitung - Deutschland",
    es: "Primeros Pasos - Guía de Configuración AI SEO Turbo - España",
    it: "Primi Passi - Guida Setup AI SEO Turbo - Italia",
    id: "Memulai - Panduan Setup AI SEO Turbo - Indonesia",
  },
  "help/getting-started/quick-start": {
    en: "Quick Start Guide - AISEOTurbo Setup in 10 Minutes",
    fr: "Guide Démarrage Rapide - Configuration en 10 Minutes - France",
    de: "Schnellstart Anleitung - Setup in 10 Minuten - Deutschland",
    es: "Guía Inicio Rápido - Configuración en 10 Minutos - España",
    it: "Guida Avvio Rapido - Setup in 10 Minuti - Italia",
    id: "Panduan Mulai Cepat - Setup dalam 10 Menit - Indonesia",
  },
  "help/getting-started/first-audit": {
    en: "First SEO Audit - Complete Step-by-Step Guide",
    fr: "Premier Audit SEO - Guide Étape par Étape - France",
    de: "Erste SEO Audit - Vollständige Schritt-für-Schritt Anleitung - Deutschland",
    es: "Primera Auditoría SEO - Guía Paso a Paso Completa - España",
    it: "Prima Audit SEO - Guida Completa Passo-Passo - Italia",
    id: "Audit SEO Pertama - Panduan Lengkap Langkah-demi-Langkah - Indonesia",
  },
  "help/getting-started/seo-scores": {
    en: "Understanding SEO Scores - Performance Metrics Guide",
    fr: "Comprendre les Scores SEO - Guide Métriques Performance - France",
    de: "SEO Scores verstehen - Performance Metriken Leitfaden - Deutschland",
    es: "Entender Puntuaciones SEO - Guía Métricas Rendimiento - España",
    it: "Capire i Punteggi SEO - Guida Metriche Performance - Italia",
    id: "Memahami Skor SEO - Panduan Metrik Performa - Indonesia",
  },
  "help/seo-tools-features": {
    en: "SEO Tools Features - Complete Guide | AI SEO Turbo",
    fr: "Fonctionnalités Outils SEO - Guide Complet | AI SEO Turbo - France",
    de: "SEO Tools Funktionen - Vollständiger Leitfaden | AI SEO Turbo - Deutschland",
    es: "Características Herramientas SEO - Guía Completa | AI SEO Turbo - España",
    it: "Funzionalità Strumenti SEO - Guida Completa | AI SEO Turbo - Italia",
    id: "Fitur Alat SEO - Panduan Lengkap | AI SEO Turbo - Indonesia",
  },
  "help/features/seo-audit": {
    en: "SEO Audit Feature Guide - Comprehensive Analysis",
    fr: "Guide Fonction Audit SEO - Analyse Complète - France",
    de: "SEO Audit Feature Leitfaden - Umfassende Analyse - Deutschland",
    es: "Guía Función Auditoría SEO - Análisis Completo - España",
    it: "Guida Funzione Audit SEO - Analisi Completa - Italia",
    id: "Panduan Fitur Audit SEO - Analisis Komprehensif - Indonesia",
  },
  "help/features/site-crawler": {
    en: "Site Crawler Feature - Technical SEO Analysis Guide",
    fr: "Fonction Crawleur Site - Guide Analyse SEO Technique - France",
    de: "Site Crawler Funktion - Technische SEO Analyse Leitfaden - Deutschland",
    es: "Función Rastreador Sitio - Guía Análisis SEO Técnico - España",
    it: "Funzione Crawler Sito - Guida Analisi SEO Tecnica - Italia",
    id: "Fitur Site Crawler - Panduan Analisis SEO Teknis - Indonesia",
  },
  "help/features/competitor-analysis": {
    en: "Competitor Analysis Feature - SEO Intelligence Guide",
    fr: "Fonction Analyse Concurrentielle - Guide Intelligence SEO - France",
    de: "Wettbewerbsanalyse Funktion - SEO Intelligence Leitfaden - Deutschland",
    es: "Función Análisis Competidores - Guía Inteligencia SEO - España",
    it: "Funzione Analisi Competitor - Guida Intelligence SEO - Italia",
    id: "Fitur Analisis Kompetitor - Panduan Intelijen SEO - Indonesia",
  },
  "help/features/ai-assistant": {
    en: "AI Assistant Feature - Smart SEO Recommendations",
    fr: "Fonction Assistant IA - Recommandations SEO Intelligentes - France",
    de: "KI-Assistent Funktion - Intelligente SEO Empfehlungen - Deutschland",
    es: "Función Asistente IA - Recomendaciones SEO Inteligentes - España",
    it: "Funzione Assistente IA - Raccomandazioni SEO Intelligenti - Italia",
    id: "Fitur Asisten AI - Rekomendasi SEO Pintar - Indonesia",
  },
  "help/account-billing": {
    en: "Account & Billing - Subscription Management Guide",
    fr: "Compte & Facturation - Guide Gestion Abonnement - France",
    de: "Konto & Abrechnung - Abonnement Verwaltung Leitfaden - Deutschland",
    es: "Cuenta & Facturación - Guía Gestión Suscripción - España",
    it: "Account & Fatturazione - Guida Gestione Abbonamento - Italia",
    id: "Akun & Penagihan - Panduan Manajemen Langganan - Indonesia",
  },
  "help/billing/payment-methods": {
    en: "Payment Methods - Secure Billing Options",
    fr: "Modes de Paiement - Options Facturation Sécurisée - France",
    de: "Zahlungsmethoden - Sichere Abrechnungsoptionen - Deutschland",
    es: "Métodos de Pago - Opciones de Facturación Segura - España",
    it: "Metodi di Pagamento - Opzioni Fatturazione Sicura - Italia",
    id: "Metode Pembayaran - Opsi Penagihan Aman - Indonesia",
  },
  "help/billing/upgrade-plan": {
    en: "Upgrade Plan - Choose Your SEO Solution",
    fr: "Mettre à Niveau - Choisissez Votre Solution SEO - France",
    de: "Plan Upgraden - Wählen Sie Ihre SEO Lösung - Deutschland",
    es: "Actualizar Plan - Elija Su Solución SEO - España",
    it: "Aggiorna Piano - Scegli La Tua Soluzione SEO - Italia",
    id: "Upgrade Paket - Pilih Solusi SEO Anda - Indonesia",
  },
  "help/billing/invoices": {
    en: "Invoices & Billing History - Account Management",
    fr: "Factures & Historique - Gestion du Compte - France",
    de: "Rechnungen & Abrechnungshistorie - Kontoverwaltung - Deutschland",
    es: "Facturas & Historial - Gestión de Cuenta - España",
    it: "Fatture & Storico - Gestione Account - Italia",
    id: "Faktur & Riwayat - Manajemen Akun - Indonesia",
  },
  "help/billing/cancellation": {
    en: "Cancellation Policy - Account Management Guide",
    fr: "Politique d'Annulation - Guide Gestion Compte - France",
    de: "Kündigungsrichtlinie - Kontoverwaltung Leitfaden - Deutschland",
    es: "Política de Cancelación - Guía Gestión Cuenta - España",
    it: "Politica Cancellazione - Guida Gestione Account - Italia",
    id: "Kebijakan Pembatalan - Panduan Manajemen Akun - Indonesia",
  },
  "help/security-privacy": {
    en: "Security & Privacy - Data Protection Guide",
    fr: "Sécurité & Confidentialité - Guide Protection Données - France",
    de: "Sicherheit & Datenschutz - Datenschutz Leitfaden - Deutschland",
    es: "Seguridad & Privacidad - Guía Protección Datos - España",
    it: "Sicurezza & Privacy - Guida Protezione Dati - Italia",
    id: "Keamanan & Privasi - Panduan Perlindungan Data - Indonesia",
  },
  "help/security/privacy": {
    en: "Privacy Policy - Data Protection & GDPR Compliance",
    fr: "Politique de Confidentialité - Protection Données & RGPD - France",
    de: "Datenschutzrichtlinie - Datenschutz & DSGVO Konformität - Deutschland",
    es: "Política de Privacidad - Protección Datos & Cumplimiento RGPD - España",
    it: "Politica Privacy - Protezione Dati & Conformità GDPR - Italia",
    id: "Kebijakan Privasi - Perlindungan Data & Kepatuhan GDPR - Indonesia",
  },
  "help/security/gdpr": {
    en: "GDPR Compliance - Data Protection Guide",
    fr: "Conformité RGPD - Guide Protection des Données - France",
    de: "DSGVO Konformität - Datenschutz Leitfaden - Deutschland",
    es: "Cumplimiento RGPD - Guía Protección de Datos - España",
    it: "Conformità GDPR - Guida Protezione Dati - Italia",
    id: "Kepatuhan GDPR - Panduan Perlindungan Data - Indonesia",
  },
  "help/security/two-factor-authentication": {
    en: "Two-Factor Authentication - Account Security",
    fr: "Authentification à Deux Facteurs - Sécurité Compte - France",
    de: "Zwei-Faktor-Authentifizierung - Kontosicherheit - Deutschland",
    es: "Autenticación de Dos Factores - Seguridad Cuenta - España",
    it: "Autenticazione Due Fattori - Sicurezza Account - Italia",
    id: "Autentikasi Dua Faktor - Keamanan Akun - Indonesia",
  },
  "help/security/best-practices": {
    en: "Security Best Practices - Account Protection Guide",
    fr: "Meilleures Pratiques Sécurité - Guide Protection Compte - France",
    de: "Sicherheitsbest Practices - Kontoschutz Leitfaden - Deutschland",
    es: "Mejores Prácticas Seguridad - Guía Protección Cuenta - España",
    it: "Migliori Pratiche Sicurezza - Guida Protezione Account - Italia",
    id: "Praktik Terbaik Keamanan - Panduan Perlindungan Akun - Indonesia",
  },
  "help/troubleshooting": {
    en: "Troubleshooting - Common Issues & Solutions",
    fr: "Dépannage - Problèmes Courants & Solutions - France",
    de: "Fehlerbehebung - Häufige Probleme & Lösungen - Deutschland",
    es: "Solución de Problemas - Problemas Comunes & Soluciones - España",
    it: "Risoluzione Problemi - Problemi Comuni & Soluzioni - Italia",
    id: "Pemecahan Masalah - Masalah Umum & Solusi - Indonesia",
  },
  "help/troubleshooting/login-issues": {
    en: "Login Issues Troubleshooting - AISEOTurbo Help",
    fr: "Problèmes Connexion - Dépannage AISEOTurbo - France",
    de: "Anmeldeprobleme Fehlerbehebung - AISEOTurbo Hilfe - Deutschland",
    es: "Problemas Inicio Sesión - Solución AISEOTurbo - España",
    it: "Problemi Accesso - Risoluzione AISEOTurbo - Italia",
    id: "Masalah Login - Pemecahan AISEOTurbo - Indonesia",
  },
  "help/troubleshooting/audit-issues": {
    en: "Audit Issues Troubleshooting - SEO Analysis Help",
    fr: "Problèmes Audit - Dépannage Analyse SEO - France",
    de: "Audit Probleme Fehlerbehebung - SEO Analyse Hilfe - Deutschland",
    es: "Problemas Auditoría - Solución Análisis SEO - España",
    it: "Problemi Audit - Risoluzione Analisi SEO - Italia",
    id: "Masalah Audit - Pemecahan Analisis SEO - Indonesia",
  },
  "help/troubleshooting/performance": {
    en: "Performance Issues Troubleshooting - AISEOTurbo Help",
    fr: "Problèmes Performance - Dépannage AISEOTurbo - France",
    de: "Performance Probleme Fehlerbehebung - AISEOTurbo Hilfe - Deutschland",
    es: "Problemas Rendimiento - Solución AISEOTurbo - España",
    it: "Problemi Performance - Risoluzione AISEOTurbo - Italia",
    id: "Masalah Performa - Pemecahan AISEOTurbo - Indonesia",
  },
  "help/troubleshooting/sync-issues": {
    en: "Sync Issues Troubleshooting - AISEOTurbo Help",
    fr: "Problèmes Synchronisation - Dépannage AISEOTurbo - France",
    de: "Synchronisationsprobleme Fehlerbehebung - AISEOTurbo Hilfe - Deutschland",
    es: "Problemas Sincronización - Solución AISEOTurbo - España",
    it: "Problemi Sincronizzazione - Risoluzione AISEOTurbo - Italia",
    id: "Masalah Sinkronisasi - Pemecahan AISEOTurbo - Indonesia",
  },
  "help/api-integrations": {
    en: "API & Integrations - Developer Documentation",
    fr: "API & Intégrations - Documentation Développeur - France",
    de: "API & Integrationen - Entwickler Dokumentation - Deutschland",
    es: "API & Integraciones - Documentación Desarrollador - España",
    it: "API & Integrazioni - Documentazione Sviluppatore - Italia",
    id: "API & Integrasi - Dokumentasi Pengembang - Indonesia",
  },
  "help/api/authentication": {
    en: "API Authentication - Developer Guide",
    fr: "Authentification API - Guide Développeur - France",
    de: "API Authentifizierung - Entwickler Leitfaden - Deutschland",
    es: "Autenticación API - Guía Desarrollador - España",
    it: "Autenticazione API - Guida Sviluppatore - Italia",
    id: "Autentikasi API - Panduan Pengembang - Indonesia",
  },
  "help/api/webhooks": {
    en: "Webhooks API - Integration Guide",
    fr: "API Webhooks - Guide d'Intégration - France",
    de: "Webhooks API - Integrationsleitfaden - Deutschland",
    es: "API Webhooks - Guía de Integración - España",
    it: "API Webhooks - Guida Integrazione - Italia",
    id: "API Webhooks - Panduan Integrasi - Indonesia",
  },
};

class FullLocalizationOptimizer {
  constructor() {
    this.csvData = [];
    this.optimizedTitles = new Map();
    this.duplicateCount = 0;
  }

  loadCSV() {
    const csvContent = readFileSync("all-page-titles.csv", "utf8");
    const lines = csvContent.split("\n");

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const parts = line.split(",");
      if (parts.length >= 6) {
        const url = parts[0];
        const locale = parts[1];
        const localeName = parts[2];
        const title = parts[3].replace(/^"|"$/g, "");
        const htmlLang = parts[4];
        const status = parts[5];
        const error = parts.slice(6).join(",");

        this.csvData.push({
          url,
          locale,
          localeName,
          title,
          htmlLang,
          status,
          error,
          optimizedTitle: null,
        });
      }
    }

    console.log(`Loaded ${this.csvData.length} rows from CSV`);
  }

  extractPageType(url) {
    let path = url.replace("https://www.aiseoturbo.com", "");

    // Check for root domain (English homepage)
    if (path === "" || path === "/") {
      return "homepage";
    }

    // Check for locale homepages (e.g., /fr, /de, /es, /it, /id)
    if (/^\/(fr|de|es|it|id)$/.test(path)) {
      return "homepage";
    }

    // Remove locale prefix if present
    if (
      path.startsWith("/fr/") ||
      path.startsWith("/de/") ||
      path.startsWith("/es/") ||
      path.startsWith("/it/") ||
      path.startsWith("/id/")
    ) {
      path = path.substring(4);
    }

    if (path === "" || path === "/") return "homepage";

    // Remove leading slash
    path = path.startsWith("/") ? path.substring(1) : path;

    // Check for exact matches first
    if (LOCALIZED_TITLES[path]) return path;
    if (HELP_TITLES[`help/${path}`]) return `help/${path}`;
    if (BLOG_TITLES[path]) return `blog/${path}`;
    if (CASE_STUDY_TITLES[path]) return `case-studies/${path}`;

    // Check for blog posts
    if (path.startsWith("blog/")) {
      const blogSlug = path.replace("blog/", "");
      if (BLOG_TITLES[blogSlug]) return `blog/${blogSlug}`;
      return "blog";
    }

    // Check for case studies
    if (path.startsWith("case-studies/")) {
      const caseSlug = path.replace("case-studies/", "");
      if (CASE_STUDY_TITLES[caseSlug]) return `case-studies/${caseSlug}`;
      return "case-studies";
    }

    // Check for help pages
    if (path.startsWith("help/")) {
      const helpPath = `help/${path.replace("help/", "")}`;
      if (HELP_TITLES[helpPath]) return helpPath;
      return "help";
    }

    return path;
  }

  generateOptimizedTitle(row) {
    const { url, locale, status } = row;

    // Skip error pages
    if (status === "ERROR") {
      return row.title;
    }

    const pageType = this.extractPageType(url);

    let baseTitle = "";

    // Get localized title based on page type and locale
    if (LOCALIZED_TITLES[pageType] && LOCALIZED_TITLES[pageType][locale]) {
      baseTitle = LOCALIZED_TITLES[pageType][locale];
    } else if (HELP_TITLES[pageType] && HELP_TITLES[pageType][locale]) {
      baseTitle = HELP_TITLES[pageType][locale];
    } else if (pageType.startsWith("blog/")) {
      const blogSlug = pageType.replace("blog/", "");
      if (BLOG_TITLES[blogSlug] && BLOG_TITLES[blogSlug][locale]) {
        baseTitle = BLOG_TITLES[blogSlug][locale];
      } else if (LOCALIZED_TITLES.blog && LOCALIZED_TITLES.blog[locale]) {
        baseTitle = LOCALIZED_TITLES.blog[locale];
      }
    } else if (pageType.startsWith("case-studies/")) {
      const caseSlug = pageType.replace("case-studies/", "");
      if (CASE_STUDY_TITLES[caseSlug] && CASE_STUDY_TITLES[caseSlug][locale]) {
        baseTitle = CASE_STUDY_TITLES[caseSlug][locale];
      } else if (LOCALIZED_TITLES["case-studies"] && LOCALIZED_TITLES["case-studies"][locale]) {
        baseTitle = LOCALIZED_TITLES["case-studies"][locale];
      }
    } else {
      // Fallback for unknown pages - create localized version
      const cleanPageType = pageType.replace(/[-/]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
      const localizedFallbacks = {
        en: `AI SEO Turbo - ${cleanPageType} | AI SEO Turbo`,
        fr: `AI SEO Turbo - ${cleanPageType} | AI SEO Turbo - France`,
        de: `AI SEO Turbo - ${cleanPageType} | AI SEO Turbo - Deutschland`,
        es: `AI SEO Turbo - ${cleanPageType} | AI SEO Turbo - España`,
        it: `AI SEO Turbo - ${cleanPageType} | AI SEO Turbo - Italia`,
        id: `AI SEO Turbo - ${cleanPageType} | AI SEO Turbo - Indonesia`,
      };
      baseTitle = localizedFallbacks[locale] || `AI SEO Turbo - ${cleanPageType} | AI SEO Turbo`;
    }

    // Ensure uniqueness
    let uniqueTitle = baseTitle;
    let counter = 1;
    while (this.optimizedTitles.has(uniqueTitle)) {
      this.duplicateCount++;
      if (uniqueTitle.includes(" | AI SEO Turbo")) {
        uniqueTitle = uniqueTitle.replace(" | AI SEO Turbo", ` ${counter} | AI SEO Turbo`);
      } else {
        uniqueTitle = `${uniqueTitle} ${counter}`;
      }
      counter++;
    }

    this.optimizedTitles.set(uniqueTitle, url);
    return uniqueTitle;
  }

  validateTitleLength(title) {
    return title.length <= 70;
  }

  optimizeAllTitles() {
    console.log("🌍 Starting FULL LOCALIZATION optimization process...\n");

    let processed = 0;
    let optimized = 0;
    let keptOriginal = 0;

    for (const row of this.csvData) {
      const originalTitle = row.title;
      const optimizedTitle = this.generateOptimizedTitle(row);

      row.optimizedTitle = optimizedTitle;

      if (optimizedTitle !== originalTitle) {
        optimized++;
      } else {
        keptOriginal++;
      }

      processed++;

      if (processed % 50 === 0) {
        console.log(`   Processed ${processed}/${this.csvData.length} titles...`);
      }
    }

    console.log(`\n✅ Full localization optimization complete!`);
    console.log(`   Total processed: ${processed}`);
    console.log(`   Titles optimized: ${optimized}`);
    console.log(`   Titles kept original: ${keptOriginal}`);
    console.log(`   Duplicate resolutions: ${this.duplicateCount}`);
  }

  generateUpdatedCSV() {
    const header = "URL,Locale,Locale Name,Original Title,Optimized Title,HTML Lang,Status,Error\n";

    const rows = this.csvData.map((row) => {
      const escapedOriginal = `"${row.title.replace(/"/g, '""')}"`;
      const escapedOptimized = `"${row.optimizedTitle.replace(/"/g, '""')}"`;
      const escapedError = row.error ? `"${row.error.replace(/"/g, '""')}"` : "";

      return `${row.url},${row.locale},${row.localeName},${escapedOriginal},${escapedOptimized},${row.htmlLang},${row.status},${escapedError}`;
    });

    return header + rows.join("\n");
  }

  printSummary() {
    console.log("\n📊 FULL LOCALIZATION OPTIMIZATION SUMMARY");
    console.log("===========================================\n");

    // Count by locale
    const localeStats = {};
    this.csvData.forEach((row) => {
      if (!localeStats[row.locale]) {
        localeStats[row.locale] = { total: 0, optimized: 0, errors: 0 };
      }
      localeStats[row.locale].total++;

      if (row.status === "ERROR") {
        localeStats[row.locale].errors++;
      } else if (row.optimizedTitle !== row.title) {
        localeStats[row.locale].optimized++;
      }
    });

    console.log("🌍 OPTIMIZATION BY LOCALE:");
    Object.entries(localeStats).forEach(([locale, stats]) => {
      const localeName = this.csvData.find((r) => r.locale === locale)?.localeName || locale;
      console.log(
        `   ${localeName} (${locale}): ${stats.total} pages, ${stats.optimized} fully localized, ${stats.errors} errors`
      );
    });

    // Title length validation
    const validLengths = this.csvData.filter(
      (row) => row.status !== "ERROR" && this.validateTitleLength(row.optimizedTitle)
    ).length;

    const totalValid = this.csvData.filter((row) => row.status !== "ERROR").length;

    console.log(`\n📏 TITLE LENGTH VALIDATION:`);
    console.log(`   Valid length (≤70 chars): ${validLengths}/${totalValid} titles`);
    console.log(
      `   Average length: ${Math.round(this.csvData.filter((r) => r.status !== "ERROR").reduce((sum, r) => sum + r.optimizedTitle.length, 0) / totalValid)} characters`
    );

    // Uniqueness check
    const uniqueTitles = new Set(this.csvData.map((r) => r.optimizedTitle));
    console.log(`\n🎯 UNIQUENESS CHECK:`);
    console.log(`   Unique titles: ${uniqueTitles.size}/${this.csvData.length}`);
    console.log(`   Duplicate count: ${this.duplicateCount}`);

    console.log(`\n💾 OUTPUT FILES:`);
    console.log(`   Original: all-page-titles.csv`);
    console.log(`   Fully Localized: all-page-titles-fully-localized.csv`);
  }

  run() {
    this.loadCSV();
    this.optimizeAllTitles();
    this.printSummary();

    // Save fully localized CSV
    const localizedCSV = this.generateUpdatedCSV();
    writeFileSync("all-page-titles-fully-localized.csv", localizedCSV, "utf8");

    console.log(
      `\n🎉 Full localization complete! Check 'all-page-titles-fully-localized.csv' for results.`
    );
  }
}

// Run the full localization optimizer
const fullOptimizer = new FullLocalizationOptimizer();
fullOptimizer.run();
