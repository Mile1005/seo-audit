'use client'

import { useTranslations, useLocale } from 'next-intl'
import BlogPostClient from '../[slug]/blog-post-client'
import { StructuredData, generateBlogPostingSchema } from '@/components/seo/StructuredData'

export default function CoreWebVitalsPage() {
  const t = useTranslations('blog.coreWebVitals2025')
  const locale = useLocale()
  
  const content = `
    <div role="navigation" aria-label="Table of Contents" class="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 mb-8">
      <h2 class="text-lg font-semibold text-white mb-4">${t('toc.title')}</h2>
      <ul class="space-y-2 text-gray-300">
        <li><a href="#introduction" class="text-blue-400 hover:text-blue-300">${t('toc.introduction')}</a></li>
        <li><a href="#lcp" class="text-blue-400 hover:text-blue-300">${t('toc.lcp')}</a></li>
        <li><a href="#fid" class="text-blue-400 hover:text-blue-300">${t('toc.fid')}</a></li>
        <li><a href="#cls" class="text-blue-400 hover:text-blue-300">${t('toc.cls')}</a></li>
        <li><a href="#optimization" class="text-blue-400 hover:text-blue-300">${t('toc.optimization')}</a></li>
      </ul>
    </div>

    <section id="introduction">
      <h2>${t('introduction.title')}</h2>
      <p>${t('introduction.paragraph1')}</p>

      <div class="bg-blue-600/10 border-l-4 border-blue-500 p-4 my-6">
        <p class="text-gray-100"><strong>${t('introduction.insight.label')}</strong> ${t('introduction.insight.text')}</p>
      </div>

      <p>${t('introduction.paragraph2')}</p>
    </section>

    <section id="lcp">
      <h2>${t('lcp.title')}</h2>
      
      <h3>${t('lcp.understanding.title')}</h3>
      <p>${t('lcp.understanding.description')}</p>

      <div class="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-4 my-6">
        <h4 class="font-semibold text-emerald-300 mb-2">${t('lcp.thresholds.title')}</h4>
        <ul class="space-y-1 text-gray-300">
          <li><strong class="text-emerald-400">${t('lcp.thresholds.good')}</strong> ${t('lcp.thresholds.goodValue')}</li>
          <li><strong class="text-yellow-400">${t('lcp.thresholds.needsImprovement')}</strong> ${t('lcp.thresholds.needsImprovementValue')}</li>
          <li><strong class="text-red-400">${t('lcp.thresholds.poor')}</strong> ${t('lcp.thresholds.poorValue')}</li>
        </ul>
      </div>

      <h3>${t('lcp.bestPractices.title')}</h3>
      <div class="space-y-4 my-6">
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">1. ${t('lcp.bestPractices.serverResponse')}</h4>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">2. ${t('lcp.bestPractices.images')}</h4>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">3. ${t('lcp.bestPractices.lazyLoading')}</h4>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">4. ${t('lcp.bestPractices.renderBlocking')}</h4>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">5. ${t('lcp.bestPractices.fontDisplay')}</h4>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">6. ${t('lcp.bestPractices.browserCaching')}</h4>
        </div>
      </div>
    </section>

    <section id="fid">
      <h2>${t('fid.title')}</h2>
      
      <h3>${t('fid.whatIs.title')}</h3>
      <p>${t('fid.whatIs.description')}</p>

      <div class="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-4 my-6">
        <h4 class="font-semibold text-emerald-300 mb-2">${t('fid.thresholds.title')}</h4>
        <ul class="space-y-1 text-gray-300">
          <li><strong class="text-emerald-400">${t('fid.thresholds.good')}</strong> ${t('fid.thresholds.goodValue')}</li>
          <li><strong class="text-yellow-400">${t('fid.thresholds.needsImprovement')}</strong> ${t('fid.thresholds.needsImprovementValue')}</li>
          <li><strong class="text-red-400">${t('fid.thresholds.poor')}</strong> ${t('fid.thresholds.poorValue')}</li>
        </ul>
      </div>

      <div class="bg-blue-600/10 border-l-4 border-blue-500 p-4 my-6">
        <p class="text-gray-100"><strong>${t('fid.note')}</strong></p>
      </div>

      <h3>${t('fid.strategies.title')}</h3>
      <div class="space-y-4 my-6">
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">1. ${t('fid.strategies.longTasks')}</h4>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">2. ${t('fid.strategies.thirdParty')}</h4>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">3. ${t('fid.strategies.webWorkers')}</h4>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">4. ${t('fid.strategies.codeSplitting')}</h4>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">5. ${t('fid.strategies.profiling')}</h4>
        </div>
      </div>
    </section>

    <section id="cls">
      <h2>${t('cls.title')}</h2>
      
      <h3>${t('cls.understanding.title')}</h3>
      <p>${t('cls.understanding.description')}</p>

      <div class="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-4 my-6">
        <h4 class="font-semibold text-emerald-300 mb-2">${t('cls.thresholds.title')}</h4>
        <ul class="space-y-1 text-gray-300">
          <li><strong class="text-emerald-400">${t('cls.thresholds.good')}</strong> ${t('cls.thresholds.goodValue')}</li>
          <li><strong class="text-yellow-400">${t('cls.thresholds.needsImprovement')}</strong> ${t('cls.thresholds.needsImprovementValue')}</li>
          <li><strong class="text-red-400">${t('cls.thresholds.poor')}</strong> ${t('cls.thresholds.poorValue')}</li>
        </ul>
      </div>

      <h3>${t('cls.causes.title')}</h3>
      <div class="space-y-4 my-6">
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('cls.causes.images.title')}</h4>
          <p class="text-gray-300">${t('cls.causes.images.description')}</p>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('cls.causes.fonts.title')}</h4>
          <p class="text-gray-300">${t('cls.causes.fonts.description')}</p>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('cls.causes.ads.title')}</h4>
          <p class="text-gray-300">${t('cls.causes.ads.description')}</p>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('cls.causes.injected.title')}</h4>
          <p class="text-gray-300">${t('cls.causes.injected.description')}</p>
        </div>
      </div>
    </section>

    <section id="optimization">
      <h2>${t('optimization.title')}</h2>
      
      <div class="space-y-6 my-6">
        <div class="bg-slate-800/50 p-4 rounded-lg border-l-4 border-blue-500">
          <h3 class="font-semibold text-white mb-2">${t('optimization.step1.title')}</h3>
          <ul class="text-gray-300 space-y-1 ml-4">
            <li>• ${t('optimization.step1.pageSpeed')}</li>
            <li>• ${t('optimization.step1.extension')}</li>
            <li>• ${t('optimization.step1.webPageTest')}</li>
            <li>• ${t('optimization.step1.searchConsole')}</li>
          </ul>
        </div>

        <div class="bg-slate-800/50 p-4 rounded-lg border-l-4 border-emerald-500">
          <h3 class="font-semibold text-white mb-2">${t('optimization.step2.title')}</h3>
          <p class="text-gray-300">${t('optimization.step2.description')}</p>
        </div>

        <div class="bg-slate-800/50 p-4 rounded-lg border-l-4 border-purple-500">
          <h3 class="font-semibold text-white mb-2">${t('optimization.step3.title')}</h3>
          <p class="text-gray-300">${t('optimization.step3.description')}</p>
        </div>

        <div class="bg-slate-800/50 p-4 rounded-lg border-l-4 border-orange-500">
          <h3 class="font-semibold text-white mb-2">${t('optimization.step4.title')}</h3>
          <p class="text-gray-300">${t('optimization.step4.description')}</p>
        </div>
      </div>

      <div class="bg-yellow-600/10 border-l-4 border-yellow-500 p-4 my-6">
        <p class="text-gray-100"><strong>${t('optimization.important.label')}</strong> ${t('optimization.important.text')}</p>
      </div>
    </section>

    <section>
      <h2>${t('business.title')}</h2>
      <p>${t('business.intro')}</p>
      <ul class="space-y-2 my-4">
        <li><strong>${t('business.conversion')}</strong></li>
        <li><strong>${t('business.ux')}</strong></li>
        <li><strong>${t('business.bounce')}</strong></li>
        <li><strong>${t('business.seo')}</strong></li>
        <li><strong>${t('business.mobile')}</strong></li>
      </ul>
    </section>

    <section>
      <h2>${t('final.title')}</h2>
      <p>${t('final.intro')}</p>
      <ul class="space-y-2 my-4">
        <li>${t('final.googleBlog')}</li>
        <li>${t('final.devTools')}</li>
        <li>${t('final.industry')}</li>
        <li>${t('final.data')}</li>
      </ul>
      <p>${t('final.conclusion')}</p>
    </section>
  `
  
  const post = {
    id: '3',
    slug: 'core-web-vitals-optimization-guide',
    title: t('post.title'),
    excerpt: t('post.excerpt'),
    content: content,
    date: t('post.date'),
    readTime: t('post.readTime'),
    category: t('post.category'),
    author: t('post.author'),
    authorRole: t('post.authorRole'),
    featured: true,
    image: '/blog/core-web-vitals.jpg',
    tags: ['Core Web Vitals', 'Page Speed', 'LCP', 'FID', 'CLS', 'Performance', 'SEO', 'Web Performance'],
    views: '3.2k',
    likes: 145
  }
  
  const blogSchema = generateBlogPostingSchema({
    title: t('post.title'),
    description: t('post.excerpt'),
    author: t('post.author'),
    datePublished: '2025-10-17T12:00:00+00:00',
    dateModified: '2025-10-17T12:00:00+00:00',
    image: 'https://www.aiseoturbo.com/blog/core-web-vitals.jpg',
    url: `https://www.aiseoturbo.com/${locale === 'en' ? '' : locale + '/'}blog/core-web-vitals-optimization-guide`,
    wordCount: 2400,
    keywords: ['Core Web Vitals', 'LCP', 'FID', 'CLS', 'page speed', 'performance optimization', 'Google ranking factors'],
    category: t('post.category')
  })

  return (
    <>
      <StructuredData data={blogSchema} />
      <BlogPostClient post={post} />
    </>
  )
}
