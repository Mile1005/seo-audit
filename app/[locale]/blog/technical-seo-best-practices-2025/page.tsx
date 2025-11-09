import BlogPostClient from '../[slug]/blog-post-client'
import { StructuredData, generateBlogPostingSchema } from '@/components/seo/StructuredData'
import { generateSEOMeta } from '@/lib/seo'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import { type Locale } from '@/i18n'

// SEO metadata for the blog post
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    title: 'Technical SEO Best Practices 2025 | AI SEO Turbo Blog',
    description: 'Master technical SEO in 2025 with our complete guide covering site speed, mobile-first indexing, structured data, crawlability, and best practices.',
    keywords: ['Technical SEO', 'Best Practices', '2025', 'Optimization'],
    ogType: 'article',
    locale: locale as Locale,
    path: 'blog/technical-seo-best-practices-2025'
  })
}

export default async function TechnicalSEO2025Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  // Get translations server-side
  const t = await getTranslations({ locale, namespace: 'blog.technicalSEO2025' })
  
  // Build content inside component so translations work
  const content = `
    <div role="navigation" aria-label="Table of Contents" class="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 mb-8">
      <h2 class="text-lg font-semibold text-white mb-4">${t('toc.title')}</h2>
      <ul class="space-y-2 text-gray-300">
        <li><a href="#evolution" class="text-blue-400 hover:text-blue-300">${t('toc.evolution')}</a></li>
        <li><a href="#site-speed" class="text-blue-400 hover:text-blue-300">${t('toc.siteSpeed')}</a></li>
        <li><a href="#mobile-first" class="text-blue-400 hover:text-blue-300">${t('toc.mobileFirst')}</a></li>
        <li><a href="#structured-data" class="text-blue-400 hover:text-blue-300">${t('toc.structuredData')}</a></li>
        <li><a href="#crawlability" class="text-blue-400 hover:text-blue-300">${t('toc.crawlability')}</a></li>
      </ul>
    </div>

    <section id="evolution">
      <h2>${t('evolution.title')}</h2>
      <p>${t('evolution.intro')}</p>

      <div class="bg-blue-600/10 border-l-4 border-blue-500 p-4 my-6">
        <p class="text-gray-100"><strong>${t('evolution.reality.label')}</strong> ${t('evolution.reality.text')}</p>
      </div>

      <h3>${t('evolution.keyShift.title')}</h3>
      <p>${t('evolution.keyShift.description')}</p>

      <h3>${t('evolution.whyMatters.title')}</h3>
      <ul class="space-y-2 my-4">
        <li>✓ ${t('evolution.whyMatters.reasons.indexing')}</li>
        <li>✓ ${t('evolution.whyMatters.reasons.ux')}</li>
        <li>✓ ${t('evolution.whyMatters.reasons.keywords')}</li>
        <li>✓ ${t('evolution.whyMatters.reasons.crawl')}</li>
      </ul>
    </section>

    <section id="site-speed">
      <h2>${t('siteSpeed.title')}</h2>
      <h3>${t('siteSpeed.whyMatters.title')}</h3>
      <p>${t('siteSpeed.whyMatters.description')}</p>

      <div class="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-4 my-6">
        <h4 class="font-semibold text-emerald-300 mb-2">${t('siteSpeed.benchmarks.title')}</h4>
        <ul class="space-y-1 text-gray-300">
          <li><strong>${t('siteSpeed.benchmarks.excellent')}</strong> ${t('siteSpeed.benchmarks.excellentValue')}</li>
          <li><strong>${t('siteSpeed.benchmarks.good')}</strong> ${t('siteSpeed.benchmarks.goodValue')}</li>
          <li><strong>${t('siteSpeed.benchmarks.average')}</strong> ${t('siteSpeed.benchmarks.averageValue')}</li>
          <li><strong>${t('siteSpeed.benchmarks.poor')}</strong> ${t('siteSpeed.benchmarks.poorValue')}</li>
        </ul>
      </div>

      <h3>${t('siteSpeed.techniques.title')}</h3>
      <div class="space-y-4 my-6">
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('siteSpeed.techniques.imageOptimization.title')}</h4>
          <p class="text-gray-300">${t('siteSpeed.techniques.imageOptimization.description')}</p>
        </div>

        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('siteSpeed.techniques.codeMinification.title')}</h4>
          <p class="text-gray-300">${t('siteSpeed.techniques.codeMinification.description')}</p>
        </div>

        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('siteSpeed.techniques.cdn.title')}</h4>
          <p class="text-gray-300">${t('siteSpeed.techniques.cdn.description')}</p>
        </div>

        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('siteSpeed.techniques.thirdParty.title')}</h4>
          <p class="text-gray-300">${t('siteSpeed.techniques.thirdParty.description')}</p>
        </div>

        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('siteSpeed.techniques.caching.title')}</h4>
          <p class="text-gray-300">${t('siteSpeed.techniques.caching.description')}</p>
        </div>
      </div>

      <h3>${t('siteSpeed.tools.title')}</h3>
      <ul class="space-y-2 my-4">
        <li>${t('siteSpeed.tools.pageSpeed')}</li>
        <li>${t('siteSpeed.tools.webPageTest')}</li>
        <li>${t('siteSpeed.tools.gtmetrix')}</li>
        <li>${t('siteSpeed.tools.webVitals')}</li>
        <li>${t('siteSpeed.tools.lighthouse')}</li>
      </ul>
    </section>

    <section id="mobile-first">
      <h2>${t('mobileFirst.title')}</h2>
      <h3>${t('mobileFirst.whatIs.title')}</h3>
      <p>${t('mobileFirst.whatIs.description')}</p>

      <h3>${t('mobileFirst.bestPractices.title')}</h3>
      <div class="space-y-4 my-6">
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('mobileFirst.bestPractices.responsive.title')}</h4>
          <ul class="text-gray-300 space-y-1 ml-4">
            <li>• ${t('mobileFirst.bestPractices.responsive.items.design')}</li>
            <li>• ${t('mobileFirst.bestPractices.responsive.items.testing')}</li>
            <li>• ${t('mobileFirst.bestPractices.responsive.items.touchTargets')}</li>
            <li>• ${t('mobileFirst.bestPractices.responsive.items.navigation')}</li>
          </ul>
        </div>

        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('mobileFirst.bestPractices.performance.title')}</h4>
          <ul class="text-gray-300 space-y-1 ml-4">
            <li>• ${t('mobileFirst.bestPractices.performance.items.speed')}</li>
            <li>• ${t('mobileFirst.bestPractices.performance.items.popups')}</li>
            <li>• ${t('mobileFirst.bestPractices.performance.items.viewport')}</li>
            <li>• ${t('mobileFirst.bestPractices.performance.items.redirects')}</li>
          </ul>
        </div>

        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('mobileFirst.bestPractices.contentParity.title')}</h4>
          <ul class="text-gray-300 space-y-1 ml-4">
            <li>• ${t('mobileFirst.bestPractices.contentParity.items.content')}</li>
            <li>• ${t('mobileFirst.bestPractices.contentParity.items.interactive')}</li>
            <li>• ${t('mobileFirst.bestPractices.contentParity.items.hierarchy')}</li>
            <li>• ${t('mobileFirst.bestPractices.contentParity.items.structuredData')}</li>
          </ul>
        </div>
      </div>

      <h3>${t('mobileFirst.checklist.title')}</h3>
      <div class="bg-blue-600/10 border-l-4 border-blue-500 p-4 my-6">
        <ul class="text-gray-100 space-y-1">
          <li>✓ ${t('mobileFirst.checklist.items.urls')}</li>
          <li>✓ ${t('mobileFirst.checklist.items.resources')}</li>
          <li>✓ ${t('mobileFirst.checklist.items.vitals')}</li>
          <li>✓ ${t('mobileFirst.checklist.items.viewport')}</li>
          <li>✓ ${t('mobileFirst.checklist.items.loadTime')}</li>
        </ul>
      </div>
    </section>

    <section id="structured-data">
      <h2>${t('structuredData.title')}</h2>
      <h3>${t('structuredData.whatIs.title')}</h3>
      <p>${t('structuredData.whatIs.description')}</p>

      <h3>${t('structuredData.schemaTypes.title')}</h3>
      <div class="space-y-4 my-6">
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('structuredData.schemaTypes.article.title')}</h4>
          <p class="text-gray-300">${t('structuredData.schemaTypes.article.description')}</p>
        </div>

        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('structuredData.schemaTypes.localBusiness.title')}</h4>
          <p class="text-gray-300">${t('structuredData.schemaTypes.localBusiness.description')}</p>
        </div>

        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('structuredData.schemaTypes.aggregateRating.title')}</h4>
          <p class="text-gray-300">${t('structuredData.schemaTypes.aggregateRating.description')}</p>
        </div>

        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('structuredData.schemaTypes.product.title')}</h4>
          <p class="text-gray-300">${t('structuredData.schemaTypes.product.description')}</p>
        </div>

        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('structuredData.schemaTypes.organization.title')}</h4>
          <p class="text-gray-300">${t('structuredData.schemaTypes.organization.description')}</p>
        </div>

        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('structuredData.schemaTypes.faqPage.title')}</h4>
          <p class="text-gray-300">${t('structuredData.schemaTypes.faqPage.description')}</p>
        </div>
      </div>

      <h3>${t('structuredData.tools.title')}</h3>
      <ul class="space-y-2 my-4">
        <li>${t('structuredData.tools.testingTool')}</li>
        <li>${t('structuredData.tools.schemaOrg')}</li>
        <li>${t('structuredData.tools.jsonLd')}</li>
      </ul>
    </section>

    <section id="crawlability">
      <h2>${t('crawlability.title')}</h2>
      <h3>${t('crawlability.robotsTxt.title')}</h3>
      <p>${t('crawlability.robotsTxt.description')}</p>

      <h3>${t('crawlability.xmlSitemap.title')}</h3>
      <ul class="space-y-2 my-4">
        <li>${t('crawlability.xmlSitemap.items.submit')}</li>
        <li>${t('crawlability.xmlSitemap.items.separate')}</li>
        <li>${t('crawlability.xmlSitemap.items.updated')}</li>
        <li>${t('crawlability.xmlSitemap.items.attributes')}</li>
      </ul>

      <h3>${t('crawlability.efficiency.title')}</h3>
      <div class="space-y-4 my-6">
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('crawlability.efficiency.internalLinking.title')}</h4>
          <p class="text-gray-300">${t('crawlability.efficiency.internalLinking.description')}</p>
        </div>

        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('crawlability.efficiency.avoidWaste.title')}</h4>
          <p class="text-gray-300">${t('crawlability.efficiency.avoidWaste.description')}</p>
        </div>

        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('crawlability.efficiency.redirects.title')}</h4>
          <p class="text-gray-300">${t('crawlability.efficiency.redirects.description')}</p>
        </div>

        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('crawlability.efficiency.javascript.title')}</h4>
          <p class="text-gray-300">${t('crawlability.efficiency.javascript.description')}</p>
        </div>
      </div>
    </section>

    <section>
      <h2>${t('security.title')}</h2>
      <p>${t('security.description')}</p>
      <ul class="space-y-2 my-4">
        <li>${t('security.steps.certificate')}</li>
        <li>${t('security.steps.redirects')}</li>
        <li>${t('security.steps.internalLinks')}</li>
        <li>${t('security.steps.searchConsole')}</li>
        <li>${t('security.steps.monitor')}</li>
      </ul>
    </section>

    <section>
      <h2>${t('coreWebVitals.title')}</h2>
      <p>${t('coreWebVitals.description')}</p>
    </section>

    <section>
      <h2>${t('conclusion.title')}</h2>
      <p>${t('conclusion.description')}</p>
    </section>
  `
  
  const post = {
    id: '4',
    slug: 'technical-seo-best-practices-2025',
    title: t('post.title'),
    excerpt: t('post.excerpt'),
    content: content,
    date: t('post.date'),
    readTime: t('post.readTime'),
    category: t('post.category'),
    author: t('post.author'),
    authorRole: t('post.authorRole'),
    featured: true,
    image: '/blog/technical-seo.jpg',
    tags: ['Technical SEO', 'Site Speed', 'Mobile-First', 'Structured Data', 'Schema', 'Crawlability', 'Best Practices'],
    views: '2.1k',
    likes: 98
  }
  
  const blogSchema = generateBlogPostingSchema({
    title: t('post.title'),
    description: t('post.excerpt'),
    author: t('post.author'),
    datePublished: '2025-10-17T14:00:00+00:00',
    dateModified: '2025-10-17T14:00:00+00:00',
    image: 'https://www.aiseoturbo.com/blog/technical-seo-2025.jpg',
    url: `https://www.aiseoturbo.com/${locale === 'en' ? '' : locale + '/'}blog/technical-seo-best-practices-2025`,
    wordCount: 2800,
    keywords: ['technical SEO', 'site speed', 'mobile-first indexing', 'structured data', 'crawlability', 'SEO best practices 2025'],
    category: t('post.category')
  });

  return (
    <>
      <StructuredData data={blogSchema} />
      <BlogPostClient post={post} />
    </>
  );
}
