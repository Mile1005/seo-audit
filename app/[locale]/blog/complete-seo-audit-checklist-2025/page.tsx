import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import BlogPostClient from "../[slug]/blog-post-client";
import {
  StructuredData,
  generateBlogPostingSchema,
  generateHowToSchema,
} from "@/components/seo/StructuredData";
import { generateSEOMeta } from "@/lib/seo";
import { Metadata } from "next";
import { type Locale } from "@/i18n";
import { generateAlternates } from "@/lib/metadata-utils";
import {
  TrafficGrowthChart,
  AuditImpactChart,
  CoreWebVitalsChart,
  SEOProgressTimeline,
} from "@/components/blog/SEOCharts";

// SEO metadata for the blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...generateSEOMeta({
      title: "Complete SEO Audit Checklist for 2025 | AI SEO Turbo Blog",
      description:
        "A comprehensive 47-point checklist to audit your website for SEO issues and opportunities. Used by 1000+ websites to increase organic traffic.",
      keywords: ["SEO", "Audit", "Technical", "Checklist", "2025"],
      ogType: "article",
      locale: locale as Locale,
      path: "blog/complete-seo-audit-checklist-2025",
    }),
    alternates: generateAlternates("/blog/complete-seo-audit-checklist-2025", locale as Locale),
  };
}

export default async function CompleteSEOAuditChecklistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Get translations server-side
  const t = await getTranslations({ locale, namespace: "blog.completeSEOAuditChecklist2025" });

  // Generate HowTo schema for the SEO audit checklist
  const howToSchema = generateHowToSchema({
    name: "Complete SEO Audit Checklist for 2025",
    description:
      "A comprehensive 47-point checklist to audit your website for SEO issues and opportunities. Follow this step-by-step guide to identify and fix critical SEO problems.",
    steps: [
      {
        name: "Technical Foundation Audit",
        text: "Check site crawlability, XML sitemaps, robots.txt, URL structure, and redirect chains. Ensure search engines can properly access and index your content.",
      },
      {
        name: "Page Speed Optimization",
        text: "Analyze Core Web Vitals (LCP, FID, CLS), optimize images, minify CSS/JavaScript, configure browser caching, and implement CDN for faster loading times.",
      },
      {
        name: "Mobile Optimization",
        text: "Verify mobile-first indexing readiness, test responsive design, ensure proper viewport configuration, and optimize touch targets for mobile users.",
      },
      {
        name: "On-Page SEO Audit",
        text: "Review title tags, meta descriptions, header structure, keyword usage, content length, and internal linking to improve search rankings.",
      },
      {
        name: "Content Quality Assessment",
        text: "Evaluate content freshness, uniqueness, readability, and user engagement metrics. Ensure content provides real value to your target audience.",
      },
    ],
    totalTime: "PT2H",
    url: "https://www.aiseoturbo.com/blog/complete-seo-audit-checklist-2025",
  });

  const post = {
    id: "1",
    slug: "complete-seo-audit-checklist-2025",
    title: t("post.title"),
    excerpt: t("post.excerpt"),
    content: (
      <div className="prose-blog">
        {/* Table of Contents */}
        <nav className="blog-toc mb-12 md:mb-16 pb-8 border-b border-slate-800">
          <h2 className="text-xl font-semibold text-white mb-4 md:mb-6">{t("toc.title")}</h2>
          <ul className="space-y-2 md:space-y-3">
            <li>
              <a href="#importance">{t("toc.importance")}</a>
            </li>
            <li>
              <a href="#technical">{t("toc.technical")}</a>
            </li>
            <li>
              <a href="#on-page">{t("toc.onPage")}</a>
            </li>
            <li>
              <a href="#content">{t("toc.content")}</a>
            </li>
            <li>
              <a href="#off-page">{t("toc.offPage")}</a>
            </li>
          </ul>
        </nav>

        {/* Introduction Section */}
        <section className="blog-section mb-20">
          <p className="text-xl text-gray-200 leading-relaxed mb-8">{t("importance.intro")}</p>

          <div className="interactive-stat">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-2">{t("importance.impact.label")}</p>
                <p className="text-gray-400">{t("importance.impact.text")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why SEO Audits Matter + Traffic Growth Chart */}
        <section id="importance" className="blog-section mb-20">
          <h2>{t("importance.title")}</h2>

          <p>{t("importance.intro")}</p>

          <div className="my-12 pl-6 border-l-4 border-blue-500">
            <p className="text-xl text-gray-100 font-medium italic">{t("importance.quote")}</p>
          </div>

          {/* Interactive Traffic Growth Chart */}
          <TrafficGrowthChart />

          <h3>{t("importance.accomplish.title")}</h3>

          <div className="space-y-8 mt-8">
            <div className="blog-checkpoint">
              <h4 className="text-lg font-semibold text-white mb-3">
                {t("importance.accomplish.technical.title")}
              </h4>
              <p>{t("importance.accomplish.technical.description")}</p>
            </div>

            <div className="blog-checkpoint">
              <h4 className="text-lg font-semibold text-white mb-3">
                {t("importance.accomplish.keyword.title")}
              </h4>
              <p>{t("importance.accomplish.keyword.description")}</p>
            </div>

            <div className="blog-checkpoint">
              <h4 className="text-lg font-semibold text-white mb-3">
                {t("importance.accomplish.algorithm.title")}
              </h4>
              <p>{t("importance.accomplish.algorithm.description")}</p>
            </div>

            <div className="blog-checkpoint">
              <h4 className="text-lg font-semibold text-white mb-3">
                {t("importance.accomplish.ux.title")}
              </h4>
              <p>{t("importance.accomplish.ux.description")}</p>
            </div>

            <div className="blog-checkpoint">
              <h4 className="text-lg font-semibold text-white mb-3">
                {t("importance.accomplish.competitive.title")}
              </h4>
              <p>{t("importance.accomplish.competitive.description")}</p>
            </div>
          </div>

          {/* Audit Impact Chart */}
          <AuditImpactChart />
        </section>

        {/* Technical Foundation + Core Web Vitals Chart */}
        <section id="technical" className="blog-section mb-20">
          <h2>{t("technical.title")}</h2>

          <p>{t("technical.intro")}</p>

          <div className="space-y-8 mt-10">
            <div className="blog-checkpoint">
              <h3>{t("technical.checkpoints.speed.title")}</h3>
              <p
                dangerouslySetInnerHTML={{ __html: t("technical.checkpoints.speed.description") }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("technical.checkpoints.mobile.title")}</h3>
              <p
                dangerouslySetInnerHTML={{ __html: t("technical.checkpoints.mobile.description") }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("technical.checkpoints.ssl.title")}</h3>
              <p dangerouslySetInnerHTML={{ __html: t("technical.checkpoints.ssl.description") }} />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("technical.checkpoints.sitemap.title")}</h3>
              <p
                dangerouslySetInnerHTML={{ __html: t("technical.checkpoints.sitemap.description") }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("technical.checkpoints.robots.title")}</h3>
              <p
                dangerouslySetInnerHTML={{ __html: t("technical.checkpoints.robots.description") }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("technical.checkpoints.internalLinking.title")}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: t("technical.checkpoints.internalLinking.description"),
                }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("technical.checkpoints.brokenLinks.title")}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: t("technical.checkpoints.brokenLinks.description"),
                }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("technical.checkpoints.canonical.title")}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: t("technical.checkpoints.canonical.description"),
                }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("technical.checkpoints.duplicate.title")}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: t("technical.checkpoints.duplicate.description"),
                }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("technical.checkpoints.structuredData.title")}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: t("technical.checkpoints.structuredData.description"),
                }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("technical.checkpoints.architecture.title")}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: t("technical.checkpoints.architecture.description"),
                }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("technical.checkpoints.urlStructure.title")}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: t("technical.checkpoints.urlStructure.description"),
                }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("technical.checkpoints.redirects.title")}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: t("technical.checkpoints.redirects.description"),
                }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("technical.checkpoints.serverResponse.title")}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: t("technical.checkpoints.serverResponse.description"),
                }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("technical.checkpoints.javascript.title")}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: t("technical.checkpoints.javascript.description"),
                }}
              />
            </div>
          </div>
        </section>

        {/* On-Page SEO Audit */}
        <section id="on-page" className="blog-section mb-20">
          <h2>{t("onPage.title")}</h2>

          <p>{t("onPage.intro")}</p>

          <div className="space-y-8 mt-10">
            <div className="blog-checkpoint">
              <h3>{t("onPage.checkpoints.title.title")}</h3>
              <p dangerouslySetInnerHTML={{ __html: t("onPage.checkpoints.title.description") }} />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("onPage.checkpoints.meta.title")}</h3>
              <p dangerouslySetInnerHTML={{ __html: t("onPage.checkpoints.meta.description") }} />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("onPage.checkpoints.headers.title")}</h3>
              <p
                dangerouslySetInnerHTML={{ __html: t("onPage.checkpoints.headers.description") }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("onPage.checkpoints.keywords.title")}</h3>
              <p
                dangerouslySetInnerHTML={{ __html: t("onPage.checkpoints.keywords.description") }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("onPage.checkpoints.content.title")}</h3>
              <p
                dangerouslySetInnerHTML={{ __html: t("onPage.checkpoints.content.description") }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("onPage.checkpoints.images.title")}</h3>
              <p dangerouslySetInnerHTML={{ __html: t("onPage.checkpoints.images.description") }} />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("onPage.checkpoints.url.title")}</h3>
              <p dangerouslySetInnerHTML={{ __html: t("onPage.checkpoints.url.description") }} />
            </div>
          </div>
        </section>

        {/* Content Quality Assessment */}
        <section id="content" className="blog-section mb-20">
          <h2>{t("content.title")}</h2>

          <p>{t("content.intro")}</p>

          <div className="space-y-8 mt-10">
            <div className="blog-checkpoint">
              <h3>{t("content.checkpoints.quality.title")}</h3>
              <p
                dangerouslySetInnerHTML={{ __html: t("content.checkpoints.quality.description") }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("content.checkpoints.uniqueness.title")}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: t("content.checkpoints.uniqueness.description"),
                }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("content.checkpoints.readability.title")}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: t("content.checkpoints.readability.description"),
                }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("content.checkpoints.engagement.title")}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: t("content.checkpoints.engagement.description"),
                }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("content.checkpoints.freshness.title")}</h3>
              <p
                dangerouslySetInnerHTML={{ __html: t("content.checkpoints.freshness.description") }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("content.checkpoints.multimedia.title")}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: t("content.checkpoints.multimedia.description"),
                }}
              />
            </div>
          </div>
        </section>

        {/* Off-Page SEO Audit */}
        <section id="off-page" className="blog-section mb-20">
          <h2>{t("offPage.title")}</h2>

          <p>{t("offPage.intro")}</p>

          <div className="space-y-8 mt-10">
            <div className="blog-checkpoint">
              <h3>{t("offPage.checkpoints.backlinks.title")}</h3>
              <p
                dangerouslySetInnerHTML={{ __html: t("offPage.checkpoints.backlinks.description") }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("offPage.checkpoints.authority.title")}</h3>
              <p
                dangerouslySetInnerHTML={{ __html: t("offPage.checkpoints.authority.description") }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("offPage.checkpoints.social.title")}</h3>
              <p
                dangerouslySetInnerHTML={{ __html: t("offPage.checkpoints.social.description") }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("offPage.checkpoints.mentions.title")}</h3>
              <p
                dangerouslySetInnerHTML={{ __html: t("offPage.checkpoints.mentions.description") }}
              />
            </div>

            <div className="blog-checkpoint">
              <h3>{t("offPage.checkpoints.local.title")}</h3>
              <p dangerouslySetInnerHTML={{ __html: t("offPage.checkpoints.local.description") }} />
            </div>
          </div>
        </section>

        {/* How to Use This Checklist */}
        <section className="blog-section mb-20">
          <h2>{t("howToUse.title")}</h2>

          <p>{t("howToUse.intro")}</p>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">{t("howToUse.step1")}</h3>
              <p className="text-gray-300">{t("howToUse.step1Desc")}</p>
            </div>

            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">{t("howToUse.step2")}</h3>
              <p className="text-gray-300">{t("howToUse.step2Desc")}</p>
            </div>

            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">{t("howToUse.step3")}</h3>
              <p className="text-gray-300">{t("howToUse.step3Desc")}</p>
            </div>

            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">{t("howToUse.step4")}</h3>
              <p className="text-gray-300">{t("howToUse.step4Desc")}</p>
            </div>

            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">{t("howToUse.step5")}</h3>
              <p className="text-gray-300">{t("howToUse.step5Desc")}</p>
            </div>

            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">{t("howToUse.step6")}</h3>
              <p className="text-gray-300">{t("howToUse.step6Desc")}</p>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="blog-section">
          <h2>{t("conclusion.title")}</h2>

          <p>{t("conclusion.paragraph1")}</p>

          <p>{t("conclusion.paragraph2")}</p>

          <div className="my-10 pl-6 border-l-4 border-blue-500">
            <p className="text-lg text-gray-100 font-medium">{t("conclusion.cta")}</p>
          </div>
        </section>
      </div>
    ),
    date: t("post.date"),
    readTime: t("post.readTime"),
    category: t("post.category"),
    author: t("post.author"),
    authorRole: t("post.authorRole"),
    featured: true,
    image: "/blog/seo-audit-checklist.webp",
    tags: [
      "SEO Audit",
      "Technical SEO",
      "On-Page SEO",
      "Content Audit",
      "Off-Page SEO",
      "Checklist",
      "Framework",
    ],
    views: "2.4k",
    likes: 156,
  };

  const blogSchema = generateBlogPostingSchema({
    title: t("post.title"),
    description: t("post.excerpt"),
    author: t("post.author"),
    datePublished: "2025-10-17T09:00:00+00:00",
    dateModified: "2025-10-17T09:00:00+00:00",
    image: "https://www.aiseoturbo.com/blog/seo-audit-checklist.jpg",
    url: "https://www.aiseoturbo.com/blog/complete-seo-audit-checklist-2025",
    wordCount: 3200,
    keywords: [
      "SEO audit",
      "technical SEO",
      "on-page SEO",
      "content audit",
      "off-page SEO",
      "SEO checklist",
      "website audit",
    ],
    category: t("post.category"),
  });

  return (
    <>
      <StructuredData data={blogSchema} />
      <StructuredData data={howToSchema} />
      <BlogPostClient post={post} />
    </>
  );
}
