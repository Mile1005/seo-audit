'use client'

import { useTranslations } from 'next-intl'
import BlogPostClient from '../[slug]/blog-post-client'
import { StructuredData, generateBlogPostingSchema } from '@/components/seo/StructuredData'

// Note: Metadata export not supported in client components
// SEO is handled by parent layout and structured data
const pageMetadata = {
  title: 'Complete SEO Audit Checklist for 2025 | AI SEO Turbo Blog',
  description: 'A comprehensive 47-point checklist to audit your website for SEO issues and opportunities. Used by 1000+ websites to increase organic traffic.',
  canonical: 'https://www.aiseoturbo.com/blog/complete-seo-audit-checklist-2025',
  ogType: 'article',
  keywords: ['SEO', 'Audit', 'Technical', 'Checklist', '2025']
}

export default function CompleteSEOAuditChecklistPage() {
  // Namespace lives under blog.completeSEOAuditChecklist2025 (messages are nested inside the "blog" object)
  const t = useTranslations('blog.completeSEOAuditChecklist2025')

  // Build content inside component so translations work
  const content = `
    <div role="navigation" aria-label="Table of Contents" class="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 mb-8">
      <h2 class="text-lg font-semibold text-white mb-4">${t('toc.title')}</h2>
      <ul class="space-y-2 text-gray-300">
        <li><a href="#importance" class="text-blue-400 hover:text-blue-300">${t('toc.importance')}</a></li>
        <li><a href="#technical" class="text-blue-400 hover:text-blue-300">${t('toc.technical')}</a></li>
        <li><a href="#on-page" class="text-blue-400 hover:text-blue-300">${t('toc.onPage')}</a></li>
        <li><a href="#content" class="text-blue-400 hover:text-blue-300">${t('toc.content')}</a></li>
        <li><a href="#off-page" class="text-blue-400 hover:text-blue-300">${t('toc.offPage')}</a></li>
      </ul>
    </div>

    <section id="importance">
      <h2>${t('importance.title')}</h2>
      <p>${t('importance.intro')}</p>

      <div class="bg-blue-600/10 border-l-4 border-blue-500 p-4 my-6">
        <p class="text-gray-100"><strong>${t('importance.impact.label')}</strong> ${t('importance.impact.text')}</p>
      </div>

      <h3>${t('importance.accomplish.title')}</h3>
      <div class="space-y-3 my-6">
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('importance.accomplish.technical.title')}</h4>
          <p class="text-gray-300">${t('importance.accomplish.technical.description')}</p>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('importance.accomplish.keyword.title')}</h4>
          <p class="text-gray-300">${t('importance.accomplish.keyword.description')}</p>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('importance.accomplish.algorithm.title')}</h4>
          <p class="text-gray-300">${t('importance.accomplish.algorithm.description')}</p>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('importance.accomplish.ux.title')}</h4>
          <p class="text-gray-300">${t('importance.accomplish.ux.description')}</p>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('importance.accomplish.competitive.title')}</h4>
          <p class="text-gray-300">${t('importance.accomplish.competitive.description')}</p>
        </div>
      </div>
    </section>

    <section id="technical">
      <h2>${t('technical.title')}</h2>
      <p>${t('technical.intro')}</p>

      <h3 class="text-xl font-semibold text-white mt-8 mb-4">${t('technical.checkpointsTitle')}</h3>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('technical.checkpoints.speed.title')}</h4>
          <div class="text-gray-300 text-sm">${t('technical.checkpoints.speed.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('technical.checkpoints.mobile.title')}</h4>
          <div class="text-gray-300 text-sm">${t('technical.checkpoints.mobile.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('technical.checkpoints.ssl.title')}</h4>
          <div class="text-gray-300 text-sm">${t('technical.checkpoints.ssl.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('technical.checkpoints.sitemap.title')}</h4>
          <div class="text-gray-300 text-sm">${t('technical.checkpoints.sitemap.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('technical.checkpoints.robots.title')}</h4>
          <div class="text-gray-300 text-sm">${t('technical.checkpoints.robots.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('technical.checkpoints.internalLinking.title')}</h4>
          <div class="text-gray-300 text-sm">${t('technical.checkpoints.internalLinking.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('technical.checkpoints.brokenLinks.title')}</h4>
          <div class="text-gray-300 text-sm">${t('technical.checkpoints.brokenLinks.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('technical.checkpoints.canonical.title')}</h4>
          <div class="text-gray-300 text-sm">${t('technical.checkpoints.canonical.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('technical.checkpoints.duplicate.title')}</h4>
          <div class="text-gray-300 text-sm">${t('technical.checkpoints.duplicate.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('technical.checkpoints.structuredData.title')}</h4>
          <div class="text-gray-300 text-sm">${t('technical.checkpoints.structuredData.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('technical.checkpoints.architecture.title')}</h4>
          <div class="text-gray-300 text-sm">${t('technical.checkpoints.architecture.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('technical.checkpoints.urlStructure.title')}</h4>
          <div class="text-gray-300 text-sm">${t('technical.checkpoints.urlStructure.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('technical.checkpoints.redirects.title')}</h4>
          <div class="text-gray-300 text-sm">${t('technical.checkpoints.redirects.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('technical.checkpoints.serverResponse.title')}</h4>
          <div class="text-gray-300 text-sm">${t('technical.checkpoints.serverResponse.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('technical.checkpoints.javascript.title')}</h4>
          <div class="text-gray-300 text-sm">${t('technical.checkpoints.javascript.description')}</div>
        </div>
      </div>
    </section>

    <section id="on-page">
      <h2>${t('onPage.title')}</h2>
      <p>${t('onPage.intro')}</p>

      <h3 class="text-xl font-semibold text-white mt-8 mb-4">${t('onPage.checkpointsTitle')}</h3>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('onPage.checkpoints.titleTag.title')}</h4>
          <div class="text-gray-300 text-sm">${t('onPage.checkpoints.titleTag.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('onPage.checkpoints.metaDescription.title')}</h4>
          <div class="text-gray-300 text-sm">${t('onPage.checkpoints.metaDescription.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('onPage.checkpoints.headers.title')}</h4>
          <div class="text-gray-300 text-sm">${t('onPage.checkpoints.headers.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('onPage.checkpoints.images.title')}</h4>
          <div class="text-gray-300 text-sm">${t('onPage.checkpoints.images.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('onPage.checkpoints.contentQuality.title')}</h4>
          <div class="text-gray-300 text-sm">${t('onPage.checkpoints.contentQuality.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('onPage.checkpoints.keywordOptimization.title')}</h4>
          <div class="text-gray-300 text-sm">${t('onPage.checkpoints.keywordOptimization.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('onPage.checkpoints.internalLinkingStrategy.title')}</h4>
          <div class="text-gray-300 text-sm">${t('onPage.checkpoints.internalLinkingStrategy.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('onPage.checkpoints.urlSlug.title')}</h4>
          <div class="text-gray-300 text-sm">${t('onPage.checkpoints.urlSlug.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('onPage.checkpoints.schemaMarkup.title')}</h4>
          <div class="text-gray-300 text-sm">${t('onPage.checkpoints.schemaMarkup.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('onPage.checkpoints.readability.title')}</h4>
          <div class="text-gray-300 text-sm">${t('onPage.checkpoints.readability.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('onPage.checkpoints.freshness.title')}</h4>
          <div class="text-gray-300 text-sm">${t('onPage.checkpoints.freshness.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('onPage.checkpoints.featuredSnippets.title')}</h4>
          <div class="text-gray-300 text-sm">${t('onPage.checkpoints.featuredSnippets.description')}</div>
        </div>
      </div>
    </section>

    <section id="content">
      <h2>${t('content.title')}</h2>
      <p>${t('content.intro')}</p>

      <h3 class="text-xl font-semibold text-white mt-8 mb-4">${t('content.criteriaTitle')}</h3>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('content.criteria.performance.title')}</h4>
          <div class="text-gray-300 text-sm">${t('content.criteria.performance.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('content.criteria.thinContent.title')}</h4>
          <div class="text-gray-300 text-sm">${t('content.criteria.thinContent.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('content.criteria.contentGaps.title')}</h4>
          <div class="text-gray-300 text-sm">${t('content.criteria.contentGaps.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('content.criteria.structure.title')}</h4>
          <div class="text-gray-300 text-sm">${t('content.criteria.structure.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('content.criteria.plagiarism.title')}</h4>
          <div class="text-gray-300 text-sm">${t('content.criteria.plagiarism.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('content.criteria.engagement.title')}</h4>
          <div class="text-gray-300 text-sm">${t('content.criteria.engagement.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('content.criteria.multimedia.title')}</h4>
          <div class="text-gray-300 text-sm">${t('content.criteria.multimedia.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('content.criteria.accuracy.title')}</h4>
          <div class="text-gray-300 text-sm">${t('content.criteria.accuracy.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('content.criteria.uniqueness.title')}</h4>
          <div class="text-gray-300 text-sm">${t('content.criteria.uniqueness.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('content.criteria.depth.title')}</h4>
          <div class="text-gray-300 text-sm">${t('content.criteria.depth.description')}</div>
        </div>
      </div>
    </section>

    <section id="off-page">
      <h2>${t('offPage.title')}</h2>
      <p>${t('offPage.intro')}</p>

      <h3 class="text-xl font-semibold text-white mt-8 mb-4">${t('offPage.assessmentTitle')}</h3>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('offPage.assessment.backlinks.title')}</h4>
          <div class="text-gray-300 text-sm">${t('offPage.assessment.backlinks.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('offPage.assessment.toxicLinks.title')}</h4>
          <div class="text-gray-300 text-sm">${t('offPage.assessment.toxicLinks.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('offPage.assessment.domainAuthority.title')}</h4>
          <div class="text-gray-300 text-sm">${t('offPage.assessment.domainAuthority.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('offPage.assessment.brandMentions.title')}</h4>
          <div class="text-gray-300 text-sm">${t('offPage.assessment.brandMentions.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('offPage.assessment.socialSignals.title')}</h4>
          <div class="text-gray-300 text-sm">${t('offPage.assessment.socialSignals.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('offPage.assessment.citations.title')}</h4>
          <div class="text-gray-300 text-sm">${t('offPage.assessment.citations.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('offPage.assessment.gmb.title')}</h4>
          <div class="text-gray-300 text-sm">${t('offPage.assessment.gmb.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('offPage.assessment.competitorBacklinks.title')}</h4>
          <div class="text-gray-300 text-sm">${t('offPage.assessment.competitorBacklinks.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('offPage.assessment.guestPosting.title')}</h4>
          <div class="text-gray-300 text-sm">${t('offPage.assessment.guestPosting.description')}</div>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <h4 class="font-semibold text-white mb-2">${t('offPage.assessment.reputation.title')}</h4>
          <div class="text-gray-300 text-sm">${t('offPage.assessment.reputation.description')}</div>
        </div>
      </div>
    </section>

    <section>
      <h2>${t('howToUse.title')}</h2>
      <div class="space-y-4 my-6">
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <p class="text-gray-300">${t('howToUse.step1')}</p>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <p class="text-gray-300">${t('howToUse.step2')}</p>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <p class="text-gray-300">${t('howToUse.step3')}</p>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <p class="text-gray-300">${t('howToUse.step4')}</p>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <p class="text-gray-300">${t('howToUse.step5')}</p>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-lg">
          <p class="text-gray-300">${t('howToUse.step6')}</p>
        </div>
      </div>
    </section>

    <section>
      <h2>${t('conclusion.title')}</h2>
      <p>${t('conclusion.paragraph1')}</p>
      <p>${t('conclusion.paragraph2')}</p>
    </section>
  `

  const post = {
    id: '1',
    slug: 'complete-seo-audit-checklist-2025',
    title: t('post.title'),
    excerpt: t('post.excerpt'),
    content,
    date: t('post.date'),
    readTime: t('post.readTime'),
    category: t('post.category'),
    author: t('post.author'),
    authorRole: t('post.authorRole'),
    featured: true,
    image: '/blog/seo-audit-checklist.jpg',
    tags: ['SEO Audit', 'Technical SEO', 'On-Page SEO', 'Content Audit', 'Off-Page SEO', 'Checklist', 'Framework'],
    views: '2.4k',
    likes: 156
  }

  const blogSchema = generateBlogPostingSchema({
    title: t('post.title'),
    description: t('post.excerpt'),
    author: t('post.author'),
    datePublished: '2025-10-17T09:00:00+00:00',
    dateModified: '2025-10-17T09:00:00+00:00',
    image: 'https://www.aiseoturbo.com/blog/seo-audit-checklist.jpg',
    url: 'https://www.aiseoturbo.com/blog/complete-seo-audit-checklist-2025',
    wordCount: 3200,
    keywords: ['SEO audit', 'technical SEO', 'on-page SEO', 'content audit', 'off-page SEO', 'SEO checklist', 'website audit'],
    category: t('post.category')
  });

  return (
    <>
      <StructuredData data={blogSchema} />
      <BlogPostClient post={post} />
    </>
  );
}
