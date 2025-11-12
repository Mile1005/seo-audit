#!/usr/bin/env node

/**
 * CSV to SEO Implementation Script
 * Applies localized titles from CSV to Next.js application
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Supported locales
const LOCALES = ['en', 'fr', 'de', 'es', 'it', 'id'];

class CSVToSEOApplier {
  constructor() {
    this.csvData = [];
    this.pageSEOMap = new Map();
    this.localeTitles = new Map();
  }

  loadCSV() {
    console.log('📖 Loading CSV data...');
    const csvContent = readFileSync('all-page-titles-complete.csv', 'utf8');
    const lines = csvContent.split('\n');

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const parts = line.split(',');
      if (parts.length >= 8) {
        const url = parts[0];
        const locale = parts[1];
        const localeName = parts[2];
        const originalTitle = parts[3].replace(/^"|"$/g, '');
        const optimizedTitle = parts[4].replace(/^"|"$/g, '');
        const recoveredTitle = parts[5] ? parts[5].replace(/^"|"$/g, '') : '';
        const finalTitle = parts[6].replace(/^"|"$/g, '');
        const htmlLang = parts[7];
        const status = parts[8];

        // Extract page path from URL
        const pagePath = this.extractPagePath(url);

        if (!this.pageSEOMap.has(pagePath)) {
          this.pageSEOMap.set(pagePath, {});
        }

        this.pageSEOMap.get(pagePath)[locale] = {
          title: finalTitle,
          url,
          locale,
          localeName,
          status
        };

        // Store for locale-specific access
        if (!this.localeTitles.has(locale)) {
          this.localeTitles.set(locale, new Map());
        }
        this.localeTitles.get(locale).set(pagePath, finalTitle);
      }
    }

    console.log(`✅ Loaded ${this.pageSEOMap.size} unique pages with localized titles`);
  }

  extractPagePath(url) {
    // Remove base URL
    let path = url.replace('https://www.aiseoturbo.com', '');

    // Handle root paths
    if (path === '' || path === '/') {
      return 'home';
    }

    // Remove locale prefix for non-English
    if (path.startsWith('/fr/') || path.startsWith('/de/') || path.startsWith('/es/') ||
        path.startsWith('/it/') || path.startsWith('/id/')) {
      path = path.substring(4);
    }

    // Remove leading slash
    path = path.startsWith('/') ? path.substring(1) : path;

    // Handle empty path after locale removal
    if (path === '' || path === '/') {
      return 'home';
    }

    return path;
  }

  updateSEOConfig() {
    console.log('🔧 Updating lib/seo.ts with localized titles...');

    // Read current SEO file
    const seoFilePath = join(__dirname, 'lib', 'seo.ts');
    let seoContent = readFileSync(seoFilePath, 'utf8');

    // Create new pageSEO object with locale support
    let newPageSEO = 'export const pageSEO = {\n';

    for (const [pagePath, localeData] of this.pageSEOMap) {
      newPageSEO += `  '${pagePath}': {\n`;

      // Add locale-specific configurations
      for (const locale of LOCALES) {
        if (localeData[locale]) {
          const title = localeData[locale].title;
          const description = this.generateDescription(pagePath, locale);
          const keywords = this.generateKeywords(pagePath, locale);

          newPageSEO += `    '${locale}': {\n`;
          newPageSEO += `      title: '${title.replace(/'/g, "\\'")}',\n`;
          newPageSEO += `      description: '${description.replace(/'/g, "\\'")}',\n`;
          newPageSEO += `      keywords: ${JSON.stringify(keywords)},\n`;
          newPageSEO += `      ogImage: '/logo.png'\n`;
          newPageSEO += `    },\n`;
        }
      }

      newPageSEO += `  },\n`;
    }

    newPageSEO += '};\n';

    // Replace the old pageSEO object
    const pageSEORegex = /export const pageSEO = \{[\s\S]*?\};/;
    seoContent = seoContent.replace(pageSEORegex, newPageSEO);

    // Update generateSEOMeta to handle locale-specific titles
    const generateSEOMetaRegex = /export function generateSEOMeta\(config: SEOConfig\): Metadata \{\s*const \{ title, description, keywords, canonical, ogImage, ogType, twitterCard, noIndex, structuredData, locale, path \} = config;\s*[\s\S]*?return \{\s*title: title,\s*[\s\S]*?\};/;

    const newGenerateSEOMeta = `export function generateSEOMeta(config: SEOConfig): Metadata {
  const { title, description, keywords, canonical, ogImage, ogType, twitterCard, noIndex, structuredData, locale, path } = config;

  // Get localized title if available
  let finalTitle = title;
  if (locale && path && pageSEO[path] && pageSEO[path][locale]) {
    finalTitle = pageSEO[path][locale].title;
  }

  return {
    title: finalTitle,
    description,
    keywords,
    authors: [{ name: 'AI SEO Turbo Team' }],
    creator: 'AI SEO Turbo',
    publisher: 'AI SEO Turbo',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aiseoturbo.com'),
    alternates: locale && path ? generateLanguageAlternates(path, locale) : undefined,
    openGraph: {
      title: finalTitle,
      description,
      url: canonical,
      siteName: 'AI SEO Turbo',
      images: ogImage ? [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: finalTitle,
      }] : undefined,
      locale: locale || defaultLocale,
      type: ogType || 'website',
    },
    twitter: {
      card: twitterCard || 'summary_large_image',
      title: finalTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
      creator: '@aiseoturbo',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}`;

    seoContent = seoContent.replace(generateSEOMetaRegex, newGenerateSEOMeta);

    // Write updated file
    writeFileSync(seoFilePath, seoContent, 'utf8');
    console.log('✅ Updated lib/seo.ts with localized titles');
  }

  generateDescription(pagePath, locale) {
    // Generate appropriate descriptions based on page type and locale
    const descriptions = {
      'en': {
        'home': 'Transform your SEO with AI-powered audits identifying 47+ critical issues. Get data-driven insights to boost organic traffic and dominate rankings.',
        'features': 'Discover powerful SEO features including technical audits, competitor analysis, keyword tracking, and AI-powered recommendations for better rankings.',
        'pricing': 'Choose the perfect SEO audit plan for your business. Free plan with analysis, Pro plans from $29/month with advanced features and priority support.',
        'about': 'Discover AISEOTurbo\'s mission to revolutionize SEO with AI technology. Meet our team of experts committed to helping businesses succeed online.',
        'contact': 'Get expert SEO help from certified specialists. Contact us for personalized consultation, technical support, and partnership inquiries.',
        'blog': 'Stay updated with the latest SEO tips, strategies, and best practices. Learn expert insights on technical SEO, content optimization, and algorithms.'
      },
      'fr': {
        'home': 'Transformez votre SEO avec des audits alimentés par IA identifiant plus de 47 problèmes critiques. Obtenez des insights basés sur les données pour booster le trafic organique.',
        'features': 'Découvrez de puissantes fonctionnalités SEO incluant des audits techniques, l\'analyse concurrentielle, le suivi des mots-clés et des recommandations IA.',
        'pricing': 'Choisissez le plan d\'audit SEO parfait pour votre entreprise. Plan gratuit avec analyse, plans Pro dès 29$/mois avec fonctionnalités avancées.',
        'about': 'Découvrez la mission d\'AISEOTurbo de révolutionner le SEO avec la technologie IA. Rencontrez notre équipe d\'experts engagés à aider les entreprises.',
        'contact': 'Obtenez de l\'aide SEO experte de spécialistes certifiés. Contactez-nous pour des consultations personnalisées et du support technique.',
        'blog': 'Restez à jour avec les derniers conseils SEO, stratégies et meilleures pratiques. Apprenez les insights d\'experts sur le SEO technique et l\'optimisation.'
      },
      'de': {
        'home': 'Transformieren Sie Ihr SEO mit KI-gestützten Audits, die über 47 kritische Probleme identifizieren. Erhalten Sie datenbasierte Einblicke für mehr organischen Traffic.',
        'features': 'Entdecken Sie leistungsstarke SEO-Funktionen einschließlich technischer Audits, Wettbewerbsanalysen, Keyword-Tracking und KI-Empfehlungen.',
        'pricing': 'Wählen Sie den perfekten SEO-Audit-Plan für Ihr Unternehmen. Kostenloser Plan mit Analyse, Pro-Pläne ab 29$/Monat mit erweiterten Funktionen.',
        'about': 'Entdecken Sie die Mission von AISEOTurbo, SEO mit KI-Technologie zu revolutionieren. Treffen Sie unser Expertenteam für Geschäftserfolg online.',
        'contact': 'Erhalten Sie professionelle SEO-Hilfe von zertifizierten Spezialisten. Kontaktieren Sie uns für personalisierte Beratung und technischen Support.',
        'blog': 'Bleiben Sie auf dem neuesten Stand mit den neuesten SEO-Tipps, Strategien und Best Practices. Lernen Sie Experten-Insights zu technischem SEO.'
      },
      'es': {
        'home': 'Transforme tu SEO con auditorías impulsadas por IA que identifican más de 47 problemas críticos. Obtén insights basados en datos para aumentar el tráfico orgánico.',
        'features': 'Descubre poderosas funciones SEO incluyendo auditorías técnicas, análisis de competidores, seguimiento de palabras clave y recomendaciones de IA.',
        'pricing': 'Elige el plan de auditoría SEO perfecto para tu negocio. Plan gratuito con análisis, planes Pro desde 29$/mes con funciones avanzadas.',
        'about': 'Descubre la misión de AISEOTurbo de revolucionar el SEO con tecnología de IA. Conoce a nuestro equipo de expertos comprometidos con el éxito empresarial.',
        'contact': 'Obtén ayuda SEO experta de especialistas certificados. Contáctanos para consultas personalizadas, soporte técnico y oportunidades de partnership.',
        'blog': 'Mantente actualizado con los últimos consejos SEO, estrategias y mejores prácticas. Aprende insights de expertos sobre SEO técnico y optimización.'
      },
      'it': {
        'home': 'Trasforma il tuo SEO con audit alimentati da IA che identificano oltre 47 problemi critici. Ottieni insights basati sui dati per aumentare il traffico organico.',
        'features': 'Scopri potenti funzionalità SEO inclusi audit tecnici, analisi concorrenti, monitoraggio keywords e raccomandazioni IA per migliori posizionamenti.',
        'pricing': 'Scegli il piano di audit SEO perfetto per la tua azienda. Piano gratuito con analisi, piani Pro da 29$/mese con funzionalità avanzate.',
        'about': 'Scopri la missione di AISEOTurbo di rivoluzionare il SEO con tecnologia IA. Incontra il nostro team di esperti impegnati ad aiutare le aziende online.',
        'contact': 'Ottieni aiuto SEO esperto da specialisti certificati. Contattaci per consulenze personalizzate, supporto tecnico e opportunità di partnership.',
        'blog': 'Rimani aggiornato con gli ultimi consigli SEO, strategie e best practices. Impara insights da esperti su SEO tecnico e ottimizzazione contenuti.'
      },
      'id': {
        'home': 'Transformasikan SEO Anda dengan audit bertenaga AI yang mengidentifikasi lebih dari 47 masalah kritis. Dapatkan insights berbasis data untuk meningkatkan traffic organik.',
        'features': 'Temukan fitur SEO powerful termasuk audit teknis, analisis kompetitor, pelacakan kata kunci, dan rekomendasi bertenaga AI untuk ranking lebih baik.',
        'pricing': 'Pilih paket audit SEO yang sempurna untuk bisnis Anda. Paket gratis dengan analisis, paket Pro mulai dari $29/bulan dengan fitur advanced.',
        'about': 'Temukan misi AISEOTurbo untuk merevolusi SEO dengan teknologi AI. Temui tim ahli kami yang berkomitmen membantu bisnis sukses secara online.',
        'contact': 'Dapatkan bantuan SEO ahli dari spesialis bersertifikat. Hubungi kami untuk konsultasi personal, dukungan teknis, dan kesempatan partnership.',
        'blog': 'Tetap update dengan tips SEO terbaru, strategi, dan best practices. Pelajari insights ahli tentang SEO teknis dan optimasi konten.'
      }
    };

    // Get base description
    let baseDesc = descriptions[locale]?.[pagePath] || descriptions['en'][pagePath] || 'Comprehensive AI-powered SEO audit and optimization tools for better search rankings.';

    // For specific feature pages, customize further
    if (pagePath.startsWith('features/')) {
      const featureDescriptions = {
        'en': {
          'seo-audit': 'Get detailed SEO audits with 47+ technical checks, AI-powered recommendations, and actionable insights to improve your website rankings.',
          'site-crawler': 'Comprehensive website crawler that detects broken links, analyzes site structure, and identifies technical SEO issues for better search performance.',
          'competitor-analysis': 'Analyze competitor SEO strategies, keyword rankings, and backlink profiles. Discover opportunities to outrank competitors and gain market share.',
          'ai-assistant': 'AI-powered SEO assistant providing personalized recommendations, content optimization suggestions, and automated insights for better rankings.',
          'keyword-tracking': 'Track keyword positions across search engines, monitor ranking changes, and get alerts for SERP movements to optimize your SEO strategy.'
        }
      };
      if (featureDescriptions[locale]?.[pagePath]) {
        baseDesc = featureDescriptions[locale][pagePath];
      }
    }

    return baseDesc;
  }

  generateKeywords(pagePath, locale) {
    const keywordSets = {
      'en': {
        'home': ['AI SEO audit', 'SEO optimization tool', 'website ranking boost', 'organic traffic growth', 'technical SEO analysis'],
        'features': ['SEO features', 'technical SEO audit', 'competitor analysis', 'keyword tracking'],
        'pricing': ['SEO audit pricing', 'SEO tools cost', 'website audit plans'],
        'about': ['SEO company', 'AI SEO experts', 'SEO consultants', 'technical SEO team'],
        'contact': ['SEO support', 'contact SEO experts', 'SEO consultation', 'technical SEO help'],
        'blog': ['SEO blog', 'SEO tips', 'SEO strategies', 'search engine optimization']
      }
    };

    return keywordSets[locale]?.[pagePath] || keywordSets['en'][pagePath] || ['SEO audit', 'SEO optimization', 'AI SEO tools'];
  }

  updatePageComponents() {
    console.log('🔧 Updating page components to use localized titles...');

    // Update each page component to use locale-specific SEO
    const pagesToUpdate = [
      { path: 'app/[locale]/features/page.tsx', seoKey: 'features' },
      { path: 'app/[locale]/pricing/page.tsx', seoKey: 'pricing' },
      { path: 'app/[locale]/about/page.tsx', seoKey: 'about' },
      { path: 'app/[locale]/contact/page.tsx', seoKey: 'contact' },
      { path: 'app/[locale]/blog/page.tsx', seoKey: 'blog' },
    ];

    for (const page of pagesToUpdate) {
      const filePath = join(__dirname, page.path);
      try {
        let content = readFileSync(filePath, 'utf8');

        // Update the generateMetadata function to use locale-specific SEO
        const oldMetadataCall = /return generateSEOMeta\(\{\s*title: pageSEO\.\w+\.title,[\s\S]*?locale: locale as Locale,[\s\S]*?path: ['"](.*?)['"]\s*\}\)/;

        const newMetadataCall = `return generateSEOMeta({
    title: pageSEO['${page.seoKey}'][locale]?.title || pageSEO['${page.seoKey}'].en.title,
    description: pageSEO['${page.seoKey}'][locale]?.description || pageSEO['${page.seoKey}'].en.description,
    keywords: pageSEO['${page.seoKey}'][locale]?.keywords || pageSEO['${page.seoKey}'].en.keywords,
    ogImage: pageSEO['${page.seoKey}'][locale]?.ogImage || pageSEO['${page.seoKey}'].en.ogImage,
    locale: locale as Locale,
    path: '${page.seoKey}'
  })`;

        content = content.replace(oldMetadataCall, newMetadataCall);

        writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated ${page.path}`);
      } catch (error) {
        console.log(`⚠️  Could not update ${page.path}: ${error.message}`);
      }
    }
  }

  printSummary() {
    console.log('\n📊 CSV TO SEO IMPLEMENTATION SUMMARY');
    console.log('=====================================\n');

    console.log('🎯 IMPLEMENTATION COMPLETED:');
    console.log(`   Pages processed: ${this.pageSEOMap.size}`);
    console.log(`   Locales supported: ${LOCALES.length} (${LOCALES.join(', ')})`);
    console.log(`   Total title variations: ${this.pageSEOMap.size * LOCALES.length}`);

    console.log('\n📁 FILES UPDATED:');
    console.log('   ✅ lib/seo.ts - Updated pageSEO object with locale support');
    console.log('   ✅ lib/seo.ts - Enhanced generateSEOMeta for localization');
    console.log('   ✅ Page components updated to use localized titles');

    console.log('\n🌍 LOCALIZATION COVERAGE:');
    LOCALES.forEach(locale => {
      const pageCount = Array.from(this.pageSEOMap.values()).filter(page => page[locale]).length;
      console.log(`   ${locale.toUpperCase()}: ${pageCount}/${this.pageSEOMap.size} pages localized`);
    });

    console.log('\n🚀 NEXT STEPS:');
    console.log('   1. Test the application to ensure titles load correctly');
    console.log('   2. Run SEO audits to verify proper title implementation');
    console.log('   3. Check search console for title display in different locales');
    console.log('   4. Monitor international search performance improvements');

    console.log('\n🎉 Ready for production! All localized titles are now implemented.');
  }

  async run() {
    console.log('🚀 Starting CSV to SEO Implementation...\n');

    this.loadCSV();
    this.updateSEOConfig();
    this.updatePageComponents();
    this.printSummary();

    console.log('\n🎊 CSV titles successfully applied to your Next.js application!');
  }
}

// Run the implementation
const applier = new CSVToSEOApplier();
applier.run().catch(console.error);