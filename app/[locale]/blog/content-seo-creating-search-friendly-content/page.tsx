'use client'

import BlogPostClient from '../[slug]/blog-post-client'
import { StructuredData, generateBlogPostingSchema } from '@/components/seo/StructuredData'
import { useTranslations, useLocale } from 'next-intl'

// Note: Metadata export not supported in client components
// SEO is handled by parent layout and structured data
const pageMetadata = {
  title: 'Content SEO: Search-Friendly Content | AI SEO Turbo Blog',
  description: 'Master content SEO with keyword research, user intent optimization, and structure best practices to create content that ranks and converts.',
  canonical: 'https://www.aiseoturbo.com/blog/content-seo-creating-search-friendly-content',
  ogType: 'article',
  keywords: ['Content SEO', 'Writing', 'User Experience', 'Search']
}

export default function ContentSEOContentPage() {
  // Namespace lives under blog.contentSEOCreatingSearchFriendlyContent (messages are nested inside the "blog" object)
  const t = useTranslations('blog.contentSEOCreatingSearchFriendlyContent')
  const locale = useLocale()

  const post = {
    id: '6',
    slug: 'content-seo-creating-search-friendly-content',
    title: t('post.title'),
    excerpt: t('post.excerpt'),
    content: `
      <div role="navigation" aria-label="Table of Contents" class="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 mb-8">
        <h2 class="text-lg font-semibold text-white mb-4">${t('toc.title')}</h2>
        <ul class="space-y-2 text-gray-300">
          <li><a href="#contentVsSEO" class="text-blue-400 hover:text-blue-300">${t('toc.contentVsSEO')}</a></li>
          <li><a href="#userIntent" class="text-blue-400 hover:text-blue-300">${t('toc.userIntent')}</a></li>
          <li><a href="#contentStrategy" class="text-blue-400 hover:text-blue-300">${t('toc.contentStrategy')}</a></li>
          <li><a href="#optimization" class="text-blue-400 hover:text-blue-300">${t('toc.optimization')}</a></li>
          <li><a href="#creation" class="text-blue-400 hover:text-blue-300">${t('toc.creation')}</a></li>
          <li><a href="#measurement" class="text-blue-400 hover:text-blue-300">${t('toc.measurement')}</a></li>
        </ul>
      </div>

      <section id="contentVsSEO">
        <h2>${t('contentVsSEO.title')}</h2>
        <p>${t('contentVsSEO.intro')}</p>

        <h3>${t('contentVsSEO.evolution.title')}</h3>
        <p>${t('contentVsSEO.evolution.description')}</p>

        <h3>${t('contentVsSEO.whyMatters')}</h3>
        <ul class="space-y-2 my-4">
          <li>✓ ${t('contentVsSEO.whyMatters.organicTraffic')}</li>
          <li>✓ ${t('contentVsSEO.whyMatters.authority')}</li>
          <li>✓ ${t('contentVsSEO.whyMatters.conversion')}</li>
          <li>✓ ${t('contentVsSEO.whyMatters.sustainability')}</li>
        </ul>
      </section>

      <section id="userIntent">
        <h2>${t('userIntent.title')}</h2>

        <h3>${t('userIntent.whatIsIntent.title')}</h3>
        <p>${t('userIntent.whatIsIntent.description')}</p>

        <h3>${t('userIntent.types.title')}</h3>
        <div class="space-y-4 my-6">
          <div class="bg-slate-800/50 p-4 rounded-lg">
            <h4 class="font-semibold text-white mb-2">${t('userIntent.types.informational.title')}</h4>
            <p class="text-gray-300">${t('userIntent.types.informational.description')}</p>
          </div>

          <div class="bg-slate-800/50 p-4 rounded-lg">
            <h4 class="font-semibold text-white mb-2">${t('userIntent.types.navigational.title')}</h4>
            <p class="text-gray-300">${t('userIntent.types.navigational.description')}</p>
          </div>

          <div class="bg-slate-800/50 p-4 rounded-lg">
            <h4 class="font-semibold text-white mb-2">${t('userIntent.types.commercial.title')}</h4>
            <p class="text-gray-300">${t('userIntent.types.commercial.description')}</p>
          </div>

          <div class="bg-slate-800/50 p-4 rounded-lg">
            <h4 class="font-semibold text-white mb-2">${t('userIntent.types.transactional.title')}</h4>
            <p class="text-gray-300">${t('userIntent.types.transactional.description')}</p>
          </div>
        </div>

        <h3>${t('userIntent.matching.title')}</h3>
        <p>${t('userIntent.matching.description')}</p>
      </section>

      <section id="contentStrategy">
        <h2>${t('contentStrategy.title')}</h2>

        <h3>${t('contentStrategy.audit.title')}</h3>
        <p>${t('contentStrategy.audit.description')}</p>

        <h3>${t('contentStrategy.keywordResearch.title')}</h3>
        <p>${t('contentStrategy.keywordResearch.description')}</p>

        <h3>${t('contentStrategy.topicClusters.title')}</h3>
        <p>${t('contentStrategy.topicClusters.description')}</p>

        <h3>${t('contentStrategy.contentCalendar.title')}</h3>
        <p>${t('contentStrategy.contentCalendar.description')}</p>
      </section>

      <section id="optimization">
        <h2>${t('optimization.title')}</h2>

        <h3>${t('optimization.onPage.title')}</h3>
        <ul class="space-y-2 my-4">
          <li><strong>${t('optimization.onPage.titleTags')}</strong></li>
          <li><strong>${t('optimization.onPage.metaDescriptions')}</strong></li>
          <li><strong>${t('optimization.onPage.headings')}</strong></li>
          <li><strong>${t('optimization.onPage.urlStructure')}</strong></li>
          <li><strong>${t('optimization.onPage.internalLinks')}</strong></li>
        </ul>

        <h3>${t('optimization.semantic.title')}</h3>
        <p>${t('optimization.semantic.description')}</p>

        <h3>${t('optimization.technical.title')}</h3>
        <ul class="space-y-2 my-4">
          <li><strong>${t('optimization.technical.schema')}</strong></li>
          <li><strong>${t('optimization.technical.mobile')}</strong></li>
          <li><strong>${t('optimization.technical.speed')}</strong></li>
          <li><strong>${t('optimization.technical.indexability')}</strong></li>
        </ul>

        <h3>${t('optimization.engagement.title')}</h3>
        <ul class="space-y-2 my-4">
          <li><strong>${t('optimization.engagement.readability')}</strong></li>
          <li><strong>${t('optimization.engagement.visuals')}</strong></li>
          <li><strong>${t('optimization.engagement.social')}</strong></li>
          <li><strong>${t('optimization.engagement.callsToAction')}</strong></li>
        </ul>
      </section>

      <section id="creation">
        <h2>${t('creation.title')}</h2>

        <h3>${t('creation.skyscraper.title')}</h3>
        <p>${t('creation.skyscraper.description')}</p>

        <h3>${t('creation.pillarCluster.title')}</h3>
        <p>${t('creation.pillarCluster.description')}</p>

        <h3>${t('creation.zeroPosition.title')}</h3>
        <p>${t('creation.zeroPosition.description')}</p>

        <h3>${t('creation.aiAugmented.title')}</h3>
        <p>${t('creation.aiAugmented.description')}</p>

        <h3>${t('creation.userGenerated.title')}</h3>
        <p>${t('creation.userGenerated.description')}</p>
      </section>

      <section id="measurement">
        <h2>${t('measurement.title')}</h2>

        <h3>${t('measurement.ranking.title')}</h3>
        <ul class="space-y-2 my-4">
          <li><strong>${t('measurement.ranking.organicRankings')}</strong></li>
          <li><strong>${t('measurement.ranking.impressions')}</strong></li>
          <li><strong>${t('measurement.ranking.featuredSnippets')}</strong></li>
          <li><strong>${t('measurement.ranking.serpFeatures')}</strong></li>
        </ul>

        <h3>${t('measurement.traffic.title')}</h3>
        <ul class="space-y-2 my-4">
          <li><strong>${t('measurement.traffic.organicTraffic')}</strong></li>
          <li><strong>${t('measurement.traffic.bounceRate')}</strong></li>
          <li><strong>${t('measurement.traffic.pagesPerSession')}</strong></li>
          <li><strong>${t('measurement.traffic.socialShares')}</strong></li>
        </ul>

        <h3>${t('measurement.conversion.title')}</h3>
        <ul class="space-y-2 my-4">
          <li><strong>${t('measurement.conversion.goalCompletions')}</strong></li>
          <li><strong>${t('measurement.conversion.revenueAttribution')}</strong></li>
          <li><strong>${t('measurement.conversion.leadQuality')}</strong></li>
          <li><strong>${t('measurement.conversion.customerAcquisition')}</strong></li>
        </ul>

        <h3>${t('measurement.contentQuality.title')}</h3>
        <ul class="space-y-2 my-4">
          <li><strong>${t('measurement.contentQuality.domainAuthority')}</strong></li>
          <li><strong>${t('measurement.contentQuality.backlinks')}</strong></li>
          <li><strong>${t('measurement.contentQuality.brandMentions')}</strong></li>
          <li><strong>${t('measurement.contentQuality.contentFreshness')}</strong></li>
        </ul>

        <h3>${t('measurement.tools.title')}</h3>
        <ul class="space-y-2 my-4">
          <li><strong>${t('measurement.tools.googleAnalytics')}</strong></li>
          <li><strong>${t('measurement.tools.googleSearchConsole')}</strong></li>
          <li><strong>${t('measurement.tools.semrush')}</strong></li>
          <li><strong>${t('measurement.tools.ahrefs')}</strong></li>
          <li><strong>${t('measurement.tools.screamingFrog')}</strong></li>
        </ul>
      </section>

      <section>
        <h2>${t('conclusion.title')}</h2>
        <p>${t('conclusion.paragraph1')}</p>
        <p>${t('conclusion.paragraph2')}</p>
        <p>${t('conclusion.paragraph3')}</p>
      </section>
    `,
    date: t('post.date'),
    readTime: t('post.readTime'),
    category: t('post.category'),
    author: t('post.author'),
    authorRole: t('post.authorRole'),
    featured: true,
    image: '/blog/content-seo.jpg',
    tags: ['Content SEO', 'Content Strategy', 'Keyword Research', 'User Intent', 'Blog Writing', 'Content Optimization'],
    views: '2.7k',
    likes: 189
  }

  const blogSchema = generateBlogPostingSchema({
    title: t('metadata.title'),
    description: t('metadata.description'),
    author: t('post.author'),
    datePublished: '2025-11-07T11:00:00+00:00',
    dateModified: '2025-11-07T11:00:00+00:00',
    image: 'https://www.aiseoturbo.com/blog/content-seo.jpg',
    url: 'https://www.aiseoturbo.com/blog/content-seo-creating-search-friendly-content',
    wordCount: 2950,
    keywords: ['content SEO', 'keyword research', 'user intent', 'content strategy', 'SEO writing', 'content optimization'],
    category: t('post.category')
  });

  return (
    <>
      <StructuredData data={blogSchema} />
      <BlogPostClient post={post} />
    </>
  );
}