import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import BlogPostClient from '../[slug]/blog-post-client'
import { StructuredData, generateBlogPostingSchema, generateHowToSchema } from '@/components/seo/StructuredData'
import { generateSEOMeta } from '@/lib/seo'
import { Metadata } from 'next'
import { type Locale } from '@/i18n'

// SEO metadata for the blog post
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    title: 'Complete SEO Audit Checklist for 2025 | AI SEO Turbo Blog',
    description: 'A comprehensive 47-point checklist to audit your website for SEO issues and opportunities. Used by 1000+ websites to increase organic traffic.',
    keywords: ['SEO', 'Audit', 'Technical', 'Checklist', '2025'],
    ogType: 'article',
    locale: locale as Locale,
    path: 'blog/complete-seo-audit-checklist-2025'
  })
}

export default async function CompleteSEOAuditChecklistPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  // Get translations server-side
  const t = await getTranslations({ locale, namespace: 'blog.completeSEOAuditChecklist2025' })

  // Generate HowTo schema for the SEO audit checklist
  const howToSchema = generateHowToSchema({
    name: "Complete SEO Audit Checklist for 2025",
    description: "A comprehensive 47-point checklist to audit your website for SEO issues and opportunities. Follow this step-by-step guide to identify and fix critical SEO problems.",
    steps: [
      {
        name: "Technical Foundation Audit",
        text: "Check site crawlability, XML sitemaps, robots.txt, URL structure, and redirect chains. Ensure search engines can properly access and index your content."
      },
      {
        name: "Page Speed Optimization",
        text: "Analyze Core Web Vitals (LCP, FID, CLS), optimize images, minify CSS/JavaScript, configure browser caching, and implement CDN for faster loading times."
      },
      {
        name: "Mobile Optimization",
        text: "Verify mobile-first indexing readiness, test responsive design, ensure proper viewport configuration, and optimize touch targets for mobile users."
      },
      {
        name: "On-Page SEO Audit",
        text: "Review title tags, meta descriptions, header structure, keyword usage, content length, and internal linking to improve search rankings."
      },
      {
        name: "Content Quality Assessment",
        text: "Evaluate content freshness, uniqueness, readability, and user engagement metrics. Ensure content provides real value to your target audience."
      }
    ],
    totalTime: "PT2H",
    url: "https://www.aiseoturbo.com/blog/complete-seo-audit-checklist-2025"
  })

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
      
      <div class="bg-blue-600/10 border-l-4 border-blue-500 p-4 my-6">
        <p class="text-gray-100"><strong>Ready to get started?</strong> Try <a href="/features" class="text-blue-400 hover:text-blue-300 underline">AI SEO Turbo's automated auditing tools</a> or <a href="/pricing" class="text-blue-400 hover:text-blue-300 underline">choose a plan</a> that fits your needs.</p>
      </div>
      
      <p class="text-gray-300">Learn more about <a href="/blog/core-web-vitals-optimization-guide" class="text-blue-400 hover:text-blue-300 underline">Core Web Vitals optimization</a> and <a href="/blog/technical-seo-best-practices-2025" class="text-blue-400 hover:text-blue-300 underline">technical SEO best practices</a> to complement your audit findings.</p>
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
      <StructuredData data={howToSchema} />
      <BlogPostClient post={post} />
    </>
  );
}
