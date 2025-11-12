#!/usr/bin/env node

/**
 * Title Error Recovery - Retry failed URLs to get complete title dataset
 */

import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync } from 'fs';

// Location targeting suffixes based on research
const LOCATION_TARGETING = {
  'en': '', // No suffix for English (global)
  'fr': ' - France',
  'de': ' - Deutschland',
  'es': ' - España',
  'it': ' - Italia',
  'id': ' - Indonesia'
};

// FULLY LOCALIZED PAGE TITLES FOR ALL LOCALES (same as before)
const LOCALIZED_TITLES = {
  // HOMEPAGES - Already optimized
  homepage: {
    'en': 'AI SEO Audit Tool - Boost Rankings 300% Faster | AI SEO Turbo',
    'fr': 'Outil d\'Audit SEO IA - Améliorez vos Classements 300% Plus Rapidement | AI SEO Turbo - France',
    'de': 'KI-SEO-Audit-Tool - Rankings um 300% Schneller Steigern | AI SEO Turbo - Deutschland',
    'es': 'Herramienta de Auditoría SEO IA - Mejora Rankings 300% Más Rápido | AI SEO Turbo - España',
    'it': 'Strumento di Audit SEO IA - Migliora i Ranking 300% Più Velocemente | AI SEO Turbo - Italia',
    'id': 'Alat Audit SEO AI - Tingkatkan Ranking 300% Lebih Cepat | AI SEO Turbo - Indonesia'
  },

  // PRICING PAGES
  pricing: {
    'en': 'SEO Audit Pricing - Plans From $29/month | AI SEO Turbo',
    'fr': 'Tarifs SEO Audit - Plans Dès 29$/mois | AI SEO Turbo - France',
    'de': 'SEO Audit Preise - Pläne Ab 29$/Monat | AI SEO Turbo - Deutschland',
    'es': 'Precios Auditoría SEO - Planes Desde 29$/mes | AI SEO Turbo - España',
    'it': 'Prezzi Audit SEO - Piani Da 29$/mese | AI SEO Turbo - Italia',
    'id': 'Harga Audit SEO - Paket Dari $29/bulan | AI SEO Turbo - Indonesia'
  },

  // FEATURES PAGES
  features: {
    'en': 'SEO Features - Complete Audit & Analysis | AI SEO Turbo',
    'fr': 'Fonctionnalités SEO - Audit Complet & Analyse | AI SEO Turbo - France',
    'de': 'SEO Funktionen - Vollständige Audit & Analyse | AI SEO Turbo - Deutschland',
    'es': 'Características SEO - Auditoría Completa & Análisis | AI SEO Turbo - España',
    'it': 'Funzionalità SEO - Audit Completo & Analisi | AI SEO Turbo - Italia',
    'id': 'Fitur SEO - Audit Lengkap & Analisis | AI SEO Turbo - Indonesia'
  },

  'features/seo-audit': {
    'en': 'SEO Audit Tool - Comprehensive Website Analysis | AI SEO Turbo',
    'fr': 'Outil d\'Audit SEO - Analyse Complète du Site | AI SEO Turbo - France',
    'de': 'SEO Audit Tool - Umfassende Website-Analyse | AI SEO Turbo - Deutschland',
    'es': 'Herramienta de Auditoría SEO - Análisis Completo del Sitio | AI SEO Turbo - España',
    'it': 'Strumento Audit SEO - Analisi Completa del Sito | AI SEO Turbo - Italia',
    'id': 'Alat Audit SEO - Analisis Website Lengkap | AI SEO Turbo - Indonesia'
  },

  'features/site-crawler': {
    'en': 'Site Crawler - Technical SEO Analysis | AI SEO Turbo',
    'fr': 'Crawleur de Site - Analyse SEO Technique | AI SEO Turbo - France',
    'de': 'Site Crawler - Technische SEO-Analyse | AI SEO Turbo - Deutschland',
    'es': 'Rastreador de Sitio - Análisis SEO Técnico | AI SEO Turbo - España',
    'it': 'Crawler del Sito - Analisi SEO Tecnica | AI SEO Turbo - Italia',
    'id': 'Site Crawler - Analisis SEO Teknis | AI SEO Turbo - Indonesia'
  },

  'features/keyword-tracking': {
    'en': 'Keyword Tracking - Monitor Search Rankings | AI SEO Turbo',
    'fr': 'Suivi des Mots-Clés - Surveillez vos Classements | AI SEO Turbo - France',
    'de': 'Keyword Tracking - Rankings überwachen | AI SEO Turbo - Deutschland',
    'es': 'Seguimiento de Palabras Clave - Monitorea Rankings | AI SEO Turbo - España',
    'it': 'Monitoraggio Keywords - Monitora i Ranking | AI SEO Turbo - Italia',
    'id': 'Pelacakan Kata Kunci - Pantau Ranking Pencarian | AI SEO Turbo - Indonesia'
  },

  'features/competitor-analysis': {
    'en': 'Competitor Analysis - SEO Intelligence & Insights | AI SEO Turbo',
    'fr': 'Analyse Concurrentielle - Intelligence SEO | AI SEO Turbo - France',
    'de': 'Wettbewerbsanalyse - SEO Intelligence | AI SEO Turbo - Deutschland',
    'es': 'Análisis de Competidores - Inteligencia SEO | AI SEO Turbo - España',
    'it': 'Analisi Competitor - Intelligence SEO | AI SEO Turbo - Italia',
    'id': 'Analisis Kompetitor - Intelijen SEO | AI SEO Turbo - Indonesia'
  },

  'features/ai-assistant': {
    'en': 'AI SEO Assistant - Smart Recommendations | AI SEO Turbo',
    'fr': 'Assistant SEO IA - Recommandations Intelligentes | AI SEO Turbo - France',
    'de': 'KI-Assistent - Intelligente Empfehlungen | AI SEO Turbo - Deutschland',
    'es': 'Asistente SEO IA - Recomendaciones Inteligentes | AI SEO Turbo - España',
    'it': 'Assistente SEO IA - Raccomandazioni Intelligenti | AI SEO Turbo - Italia',
    'id': 'Asisten SEO AI - Rekomendasi Pintar | AI SEO Turbo - Indonesia'
  },

  // ABOUT & CONTACT
  about: {
    'en': 'About AI SEO Turbo - Expert SEO Team & AI Innovation | AI SEO Turbo',
    'fr': 'À Propos d\'AI SEO Turbo - Équipe SEO Experte | AI SEO Turbo - France',
    'de': 'Über AI SEO Turbo - Experten SEO Team | AI SEO Turbo - Deutschland',
    'es': 'Acerca de AI SEO Turbo - Equipo SEO Experto | AI SEO Turbo - España',
    'it': 'Chi Siamo AI SEO Turbo - Team SEO Esperto | AI SEO Turbo - Italia',
    'id': 'Tentang AI SEO Turbo - Tim SEO Ahli | AI SEO Turbo - Indonesia'
  },

  contact: {
    'en': 'Contact AI SEO Turbo - Expert SEO Support & Consultation | AI SEO Turbo',
    'fr': 'Contact AI SEO Turbo - Support SEO Expert | AI SEO Turbo - France',
    'de': 'Kontakt AI SEO Turbo - SEO Experten Support | AI SEO Turbo - Deutschland',
    'es': 'Contacto AI SEO Turbo - Soporte SEO Experto | AI SEO Turbo - España',
    'it': 'Contatto AI SEO Turbo - Supporto SEO Esperto | AI SEO Turbo - Italia',
    'id': 'Kontak AI SEO Turbo - Dukungan SEO Ahli | AI SEO Turbo - Indonesia'
  },

  // BLOG & CASE STUDIES
  blog: {
    'en': 'SEO Blog - Latest SEO Tips & Strategies | AI SEO Turbo',
    'fr': 'Blog SEO - Conseils & Stratégies SEO | AI SEO Turbo - France',
    'de': 'SEO Blog - Neueste SEO Tipps & Strategien | AI SEO Turbo - Deutschland',
    'es': 'Blog SEO - Últimos Consejos SEO | AI SEO Turbo - España',
    'it': 'Blog SEO - Ultimi Consigli SEO | AI SEO Turbo - Italia',
    'id': 'Blog SEO - Tips & Strategi SEO Terbaru | AI SEO Turbo - Indonesia'
  },

  'case-studies': {
    'en': 'SEO Case Studies - Real Results & Success Stories | AI SEO Turbo',
    'fr': 'Études de Cas SEO - Résultats Réels | AI SEO Turbo - France',
    'de': 'SEO Fallstudien - Reale Ergebnisse | AI SEO Turbo - Deutschland',
    'es': 'Casos de Estudio SEO - Resultados Reales | AI SEO Turbo - España',
    'it': 'Casi Studio SEO - Risultati Reali | AI SEO Turbo - Italia',
    'id': 'Studi Kasus SEO - Hasil Nyata | AI SEO Turbo - Indonesia'
  }
};

// Blog post specific titles (localized)
const BLOG_TITLES = {
  'ai-powered-seo-future': {
    'en': 'AI-Powered SEO: The Future is Here | AI SEO Turbo Blog',
    'fr': 'SEO Alimenté par IA: L\'Avenir est Là | AI SEO Turbo Blog - France',
    'de': 'KI-gestützte SEO: Die Zukunft ist da | AI SEO Turbo Blog - Deutschland',
    'es': 'SEO Impulsado por IA: El Futuro está Aquí | AI SEO Turbo Blog - España',
    'it': 'SEO Potenziato dall\'IA: Il Futuro è Qui | AI SEO Turbo Blog - Italia',
    'id': 'SEO Bertenaga AI: Masa Depan Telah Tiba | AI SEO Turbo Blog - Indonesia'
  },
  'complete-seo-audit-checklist-2025': {
    'en': 'Complete SEO Audit Checklist 2025 | AI SEO Turbo Blog',
    'fr': 'Liste de Contrôle Audit SEO Complet 2025 | AI SEO Turbo Blog - France',
    'de': 'Vollständige SEO Audit Checkliste 2025 | AI SEO Turbo Blog - Deutschland',
    'es': 'Lista de Verificación Completa de Auditoría SEO 2025 | AI SEO Turbo Blog - España',
    'it': 'Elenco Completo Audit SEO 2025 | AI SEO Turbo Blog - Italia',
    'id': 'Checklist Audit SEO Lengkap 2025 | AI SEO Turbo Blog - Indonesia'
  },
  'content-seo-creating-search-friendly-content': {
    'en': 'Content SEO: Creating Search-Friendly Content | AI SEO Turbo Blog',
    'fr': 'SEO de Contenu: Créer du Contenu Optimisé | AI SEO Turbo Blog - France',
    'de': 'Content SEO: Suchmaschinenfreundlichen Content erstellen | AI SEO Turbo Blog - Deutschland',
    'es': 'SEO de Contenido: Crear Contenido Amigable para Búsquedas | AI SEO Turbo Blog - España',
    'it': 'SEO dei Contenuti: Creare Contenuti Ottimizzati | AI SEO Turbo Blog - Italia',
    'id': 'SEO Konten: Membuat Konten Ramah Pencarian | AI SEO Turbo Blog - Indonesia'
  },
  'core-web-vitals-optimization-guide': {
    'en': 'Core Web Vitals Optimization Guide - Improve Page Experience | AI SEO Turbo Blog',
    'fr': 'Guide d\'Optimisation Core Web Vitals - Améliorez l\'Expérience | AI SEO Turbo Blog - France',
    'de': 'Core Web Vitals Optimierung Guide - Seiten-Erlebnis verbessern | AI SEO Turbo Blog - Deutschland',
    'es': 'Guía de Optimización Core Web Vitals - Mejora la Experiencia | AI SEO Turbo Blog - España',
    'it': 'Guida Ottimizzazione Core Web Vitals - Migliora l\'Esperienza | AI SEO Turbo Blog - Italia',
    'id': 'Panduan Optimasi Core Web Vitals - Tingkatkan Pengalaman | AI SEO Turbo Blog - Indonesia'
  },
  'local-seo-strategies-that-work': {
    'en': 'Local SEO Strategies That Work | AI SEO Turbo Blog',
    'fr': 'Stratégies SEO Locales Qui Fonctionnent | AI SEO Turbo Blog - France',
    'de': 'Lokale SEO Strategien die funktionieren | AI SEO Turbo Blog - Deutschland',
    'es': 'Estrategias SEO Locales que Funcionan | AI SEO Turbo Blog - España',
    'it': 'Strategie SEO Locali che Funzionano | AI SEO Turbo Blog - Italia',
    'id': 'Strategi SEO Lokal yang Efektif | AI SEO Turbo Blog - Indonesia'
  },
  'technical-seo-best-practices-2025': {
    'en': 'Technical SEO Best Practices 2025 | AI SEO Turbo Blog',
    'fr': 'Meilleures Pratiques SEO Technique 2025 | AI SEO Turbo Blog - France',
    'de': 'Technische SEO Best Practices 2025 | AI SEO Turbo Blog - Deutschland',
    'es': 'Mejores Prácticas SEO Técnico 2025 | AI SEO Turbo Blog - España',
    'it': 'Migliori Pratiche SEO Tecnico 2025 | AI SEO Turbo Blog - Italia',
    'id': 'Praktik Terbaik SEO Teknis 2025 | AI SEO Turbo Blog - Indonesia'
  }
};

// Case study specific titles (localized)
const CASE_STUDY_TITLES = {
  'cloudsync-pro': {
    'en': 'CloudSync Pro Case Study - 312% Organic Traffic Increase',
    'fr': 'Étude de Cas CloudSync Pro - 312% de Trafic Organique',
    'de': 'CloudSync Pro Fallstudie - 312% organischer Traffic',
    'es': 'Caso de Estudio CloudSync Pro - 312% Tráfico Orgánico',
    'it': 'Caso Studio CloudSync Pro - 312% Traffico Organico',
    'id': 'Studi Kasus CloudSync Pro - Peningkatan Traffic Organik 312%'
  },
  'digital-growth-agency': {
    'en': 'Digital Growth Agency Case Study - 245% Client Acquisition',
    'fr': 'Étude de Cas Agence Croissance Digitale - 245% Acquisition Clients',
    'de': 'Digital Growth Agency Fallstudie - 245% Kundenakquise',
    'es': 'Caso de Estudio Agencia Crecimiento Digital - 245% Adquisición Clientes',
    'it': 'Caso Studio Agenzia Crescita Digitale - 245% Acquisizione Clienti',
    'id': 'Studi Kasus Digital Growth Agency - Akuisisi Klien 245%'
  },
  'gearhub-pro': {
    'en': 'GearHub Pro Case Study - #1 Rankings in 4 Months',
    'fr': 'Étude de Cas GearHub Pro - #1 en 4 Mois',
    'de': 'GearHub Pro Fallstudie - #1 Rankings in 4 Monaten',
    'es': 'Caso de Estudio GearHub Pro - #1 Rankings en 4 Meses',
    'it': 'Caso Studio GearHub Pro - #1 Ranking in 4 Mesi',
    'id': 'Studi Kasus GearHub Pro - Ranking #1 dalam 4 Bulan'
  },
  'peak-performance': {
    'en': 'Peak Performance Case Study - 189% Revenue Growth',
    'fr': 'Étude de Cas Peak Performance - 189% Croissance Revenus',
    'de': 'Peak Performance Fallstudie - 189% Umsatzwachstum',
    'es': 'Caso de Estudio Peak Performance - 189% Crecimiento Ingresos',
    'it': 'Caso Studio Peak Performance - 189% Crescita Ricavi',
    'id': 'Studi Kasus Peak Performance - Pertumbuhan Pendapatan 189%'
  },
  'stylecraft-boutique': {
    'en': 'StyleCraft Boutique Case Study - 427% Organic Traffic',
    'fr': 'Étude de Cas StyleCraft Boutique - 427% Trafic Organique',
    'de': 'StyleCraft Boutique Fallstudie - 427% organischer Traffic',
    'es': 'Caso de Estudio StyleCraft Boutique - 427% Tráfico Orgánico',
    'it': 'Caso Studio StyleCraft Boutique - 427% Traffico Organico',
    'id': 'Studi Kasus StyleCraft Boutique - Traffic Organik 427%'
  },
  'techflow-solutions': {
    'en': 'TechFlow Solutions Case Study - Enterprise SEO Success',
    'fr': 'Étude de Cas TechFlow Solutions - Succès SEO Entreprise',
    'de': 'TechFlow Solutions Fallstudie - Enterprise SEO Erfolg',
    'es': 'Caso de Estudio TechFlow Solutions - Éxito SEO Empresarial',
    'it': 'Caso Studio TechFlow Solutions - Successo SEO Enterprise',
    'id': 'Studi Kasus TechFlow Solutions - Kesuksesan SEO Enterprise'
  }
};

// Help center titles (localized) - keeping only first few for brevity
const HELP_TITLES = {
  'help': {
    'en': 'Help Center - SEO Support & Guides | AI SEO Turbo',
    'fr': 'Centre d\'Aide - Support SEO & Guides | AI SEO Turbo - France',
    'de': 'Hilfe Center - SEO Support & Anleitungen | AI SEO Turbo - Deutschland',
    'es': 'Centro de Ayuda - Soporte SEO & Guías | AI SEO Turbo - España',
    'it': 'Centro Assistenza - Supporto SEO & Guide | AI SEO Turbo - Italia',
    'id': 'Pusat Bantuan - Dukungan SEO & Panduan | AI SEO Turbo - Indonesia'
  }
};

class TitleErrorRecovery {
  constructor() {
    this.csvData = [];
    this.errorUrls = [];
    this.recoveredTitles = 0;
    this.optimizedTitles = new Map();
    this.duplicateCount = 0;
  }

  loadCSV() {
    const csvContent = readFileSync('all-page-titles-fully-localized.csv', 'utf8');
    const lines = csvContent.split('\n');

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const parts = line.split(',');
      if (parts.length >= 7) {
        const url = parts[0];
        const locale = parts[1];
        const localeName = parts[2];
        const originalTitle = parts[3].replace(/^"|"$/g, '');
        const optimizedTitle = parts[4].replace(/^"|"$/g, '');
        const htmlLang = parts[5];
        const status = parts[6];
        const error = parts.slice(7).join(',');

        const row = {
          url,
          locale,
          localeName,
          originalTitle,
          optimizedTitle,
          htmlLang,
          status,
          error,
          recoveredTitle: null,
          finalTitle: optimizedTitle
        };

        this.csvData.push(row);

        // Collect error URLs for retry
        if (status === 'ERROR') {
          this.errorUrls.push(row);
        }
      }
    }

    console.log(`Loaded ${this.csvData.length} rows from CSV`);
    console.log(`Found ${this.errorUrls.length} URLs with errors to retry`);
  }

  extractPageType(url) {
    let path = url.replace('https://www.aiseoturbo.com', '');

    // Check for root domain (English homepage)
    if (path === '' || path === '/') {
      return 'homepage';
    }

    // Check for locale homepages (e.g., /fr, /de, /es, /it, /id)
    if (/^\/(fr|de|es|it|id)$/.test(path)) {
      return 'homepage';
    }

    // Remove locale prefix if present
    if (path.startsWith('/fr/') || path.startsWith('/de/') || path.startsWith('/es/') ||
        path.startsWith('/it/') || path.startsWith('/id/')) {
      path = path.substring(4);
    }

    if (path === '' || path === '/') return 'homepage';

    // Remove leading slash
    path = path.startsWith('/') ? path.substring(1) : path;

    // Check for exact matches first
    if (LOCALIZED_TITLES[path]) return path;
    if (HELP_TITLES[`help/${path}`]) return `help/${path}`;
    if (BLOG_TITLES[path]) return `blog/${path}`;
    if (CASE_STUDY_TITLES[path]) return `case-studies/${path}`;

    // Check for blog posts
    if (path.startsWith('blog/')) {
      const blogSlug = path.replace('blog/', '');
      if (BLOG_TITLES[blogSlug]) return `blog/${blogSlug}`;
      return 'blog';
    }

    // Check for case studies
    if (path.startsWith('case-studies/')) {
      const caseSlug = path.replace('case-studies/', '');
      if (CASE_STUDY_TITLES[caseSlug]) return `case-studies/${caseSlug}`;
      return 'case-studies';
    }

    // Check for help pages
    if (path.startsWith('help/')) {
      const helpPath = `help/${path.replace('help/', '')}`;
      if (HELP_TITLES[helpPath]) return helpPath;
      return 'help';
    }

    return path;
  }

  async retryUrlWithBackoff(url, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      console.log(`   Attempt ${attempt}/${maxRetries} for: ${url.replace('https://www.aiseoturbo.com', '')}`);

      try {
        const browser = await puppeteer.launch({
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-first-run'
          ]
        });

        const page = await browser.newPage();

        // Set user agent and longer timeout
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        await page.setDefaultTimeout(45000);

        // Navigate with longer wait
        await page.goto(url, {
          waitUntil: 'networkidle2',
          timeout: 40000
        });

        // Wait a bit more for dynamic content
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Get title
        const title = await page.evaluate(() => document.title);

        // Get HTML lang attribute
        const htmlLang = await page.evaluate(() => {
          const html = document.querySelector('html');
          return html ? html.getAttribute('lang') : null;
        });

        await browser.close();

        if (title && title.trim()) {
          return {
            success: true,
            title: title.trim(),
            htmlLang,
            attempt
          };
        }

      } catch (error) {
        console.log(`     Attempt ${attempt} failed: ${error.message.substring(0, 100)}...`);

        if (attempt < maxRetries) {
          // Exponential backoff: 2s, 4s, 8s
          const delay = Math.pow(2, attempt) * 1000;
          console.log(`     Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    return {
      success: false,
      title: 'ERROR',
      htmlLang: null,
      attempt: maxRetries,
      error: 'All retry attempts failed'
    };
  }

  generateOptimizedTitle(row) {
    const { url, locale, recoveredTitle } = row;

    // Use recovered title if available, otherwise keep original
    const actualTitle = recoveredTitle && recoveredTitle !== 'ERROR' ? recoveredTitle : row.originalTitle;

    const pageType = this.extractPageType(url);

    let baseTitle = '';

    // Get localized title based on page type and locale
    if (LOCALIZED_TITLES[pageType] && LOCALIZED_TITLES[pageType][locale]) {
      baseTitle = LOCALIZED_TITLES[pageType][locale];
    } else if (HELP_TITLES[pageType] && HELP_TITLES[pageType][locale]) {
      baseTitle = HELP_TITLES[pageType][locale];
    } else if (pageType.startsWith('blog/')) {
      const blogSlug = pageType.replace('blog/', '');
      if (BLOG_TITLES[blogSlug] && BLOG_TITLES[blogSlug][locale]) {
        baseTitle = BLOG_TITLES[blogSlug][locale];
      } else if (LOCALIZED_TITLES.blog && LOCALIZED_TITLES.blog[locale]) {
        baseTitle = LOCALIZED_TITLES.blog[locale];
      }
    } else if (pageType.startsWith('case-studies/')) {
      const caseSlug = pageType.replace('case-studies/', '');
      if (CASE_STUDY_TITLES[caseSlug] && CASE_STUDY_TITLES[caseSlug][locale]) {
        baseTitle = CASE_STUDY_TITLES[caseSlug][locale];
      } else if (LOCALIZED_TITLES['case-studies'] && LOCALIZED_TITLES['case-studies'][locale]) {
        baseTitle = LOCALIZED_TITLES['case-studies'][locale];
      }
    } else {
      // Fallback for unknown pages - create localized version
      const cleanPageType = pageType.replace(/[-/]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const localizedFallbacks = {
        'en': `AI SEO Turbo - ${cleanPageType} | AI SEO Turbo`,
        'fr': `AI SEO Turbo - ${cleanPageType} | AI SEO Turbo - France`,
        'de': `AI SEO Turbo - ${cleanPageType} | AI SEO Turbo - Deutschland`,
        'es': `AI SEO Turbo - ${cleanPageType} | AI SEO Turbo - España`,
        'it': `AI SEO Turbo - ${cleanPageType} | AI SEO Turbo - Italia`,
        'id': `AI SEO Turbo - ${cleanPageType} | AI SEO Turbo - Indonesia`
      };
      baseTitle = localizedFallbacks[locale] || `AI SEO Turbo - ${cleanPageType} | AI SEO Turbo`;
    }

    // Ensure uniqueness
    let uniqueTitle = baseTitle;
    let counter = 1;
    while (this.optimizedTitles.has(uniqueTitle)) {
      this.duplicateCount++;
      if (uniqueTitle.includes(' | AI SEO Turbo')) {
        uniqueTitle = uniqueTitle.replace(' | AI SEO Turbo', ` ${counter} | AI SEO Turbo`);
      } else {
        uniqueTitle = `${uniqueTitle} ${counter}`;
      }
      counter++;
    }

    this.optimizedTitles.set(uniqueTitle, url);
    return uniqueTitle;
  }

  async recoverErrorTitles() {
    console.log('🔄 Starting error recovery process...\n');

    let recovered = 0;
    let stillErrors = 0;

    // Process error URLs in smaller batches
    const batchSize = 5;
    for (let i = 0; i < this.errorUrls.length; i += batchSize) {
      const batch = this.errorUrls.slice(i, i + batchSize);
      console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(this.errorUrls.length / batchSize)} (${batch.length} URLs)`);

      for (const row of batch) {
        console.log(`\nRetrying: ${row.url.replace('https://www.aiseoturbo.com', '')}`);

        const result = await this.retryUrlWithBackoff(row.url);

        if (result.success) {
          row.recoveredTitle = result.title;
          row.finalTitle = this.generateOptimizedTitle(row);
          row.status = 'RECOVERED';
          row.error = `Recovered on attempt ${result.attempt}`;
          recovered++;
          console.log(`   ✅ RECOVERED: "${result.title}"`);
        } else {
          row.finalTitle = row.optimizedTitle; // Keep original optimized
          stillErrors++;
          console.log(`   ❌ STILL ERROR: ${result.error}`);
        }
      }

      // Longer delay between batches to be respectful
      if (i + batchSize < this.errorUrls.length) {
        console.log('Waiting 5 seconds before next batch...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    this.recoveredTitles = recovered;
    console.log(`\n✅ Recovery complete!`);
    console.log(`   Recovered: ${recovered}`);
    console.log(`   Still errors: ${stillErrors}`);
  }

  generateUpdatedCSV() {
    const header = 'URL,Locale,Locale Name,Original Title,Optimized Title,Recovered Title,Final Title,HTML Lang,Status,Error\n';

    const rows = this.csvData.map(row => {
      const escapedOriginal = `"${row.originalTitle.replace(/"/g, '""')}"`;
      const escapedOptimized = `"${row.optimizedTitle.replace(/"/g, '""')}"`;
      const escapedRecovered = row.recoveredTitle ? `"${row.recoveredTitle.replace(/"/g, '""')}"` : '';
      const escapedFinal = `"${row.finalTitle.replace(/"/g, '""')}"`;
      const escapedError = row.error ? `"${row.error.replace(/"/g, '""')}"` : '';

      return `${row.url},${row.locale},${row.localeName},${escapedOriginal},${escapedOptimized},${escapedRecovered},${escapedFinal},${row.htmlLang},${row.status},${escapedError}`;
    });

    return header + rows.join('\n');
  }

  printSummary() {
    console.log('\n📊 ERROR RECOVERY SUMMARY');
    console.log('===========================\n');

    const totalErrors = this.errorUrls.length;
    const recovered = this.recoveredTitles;
    const stillErrors = totalErrors - recovered;
    const successRate = totalErrors > 0 ? ((recovered / totalErrors) * 100).toFixed(1) : '0.0';

    console.log('🔄 RECOVERY RESULTS:');
    console.log(`   Total error URLs: ${totalErrors}`);
    console.log(`   Successfully recovered: ${recovered}`);
    console.log(`   Still errors: ${stillErrors}`);
    console.log(`   Success rate: ${successRate}%\n`);

    // Count by locale
    const localeRecovery = {};
    this.errorUrls.forEach(row => {
      if (!localeRecovery[row.locale]) {
        localeRecovery[row.locale] = { total: 0, recovered: 0 };
      }
      localeRecovery[row.locale].total++;
      if (row.status === 'RECOVERED') {
        localeRecovery[row.locale].recovered++;
      }
    });

    console.log('🌍 RECOVERY BY LOCALE:');
    Object.entries(localeRecovery).forEach(([locale, stats]) => {
      const localeName = this.csvData.find(r => r.locale === locale)?.localeName || locale;
      const rate = stats.total > 0 ? ((stats.recovered / stats.total) * 100).toFixed(1) : '0.0';
      console.log(`   ${localeName} (${locale}): ${stats.recovered}/${stats.total} recovered (${rate}%)`);
    });

    // Final stats
    const totalPages = this.csvData.length;
    const finalErrors = this.csvData.filter(r => r.status === 'ERROR').length;
    const completionRate = ((totalPages - finalErrors) / totalPages * 100).toFixed(1);

    console.log(`\n🎯 FINAL COMPLETENESS:`);
    console.log(`   Total pages: ${totalPages}`);
    console.log(`   Pages with titles: ${totalPages - finalErrors}`);
    console.log(`   Still missing: ${finalErrors}`);
    console.log(`   Completion rate: ${completionRate}%`);

    console.log(`\n💾 OUTPUT FILES:`);
    console.log(`   Original: all-page-titles-fully-localized.csv`);
    console.log(`   Complete: all-page-titles-complete.csv`);
  }

  async run() {
    this.loadCSV();
    await this.recoverErrorTitles();
    this.printSummary();

    // Save complete CSV
    const completeCSV = this.generateUpdatedCSV();
    writeFileSync('all-page-titles-complete.csv', completeCSV, 'utf8');

    console.log(`\n🎉 Error recovery complete! Check 'all-page-titles-complete.csv' for the complete dataset.`);
  }
}

// Run the error recovery
const recovery = new TitleErrorRecovery();
recovery.run().catch(console.error);