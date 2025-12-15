import BlogPostClient from "../[slug]/blog-post-client";
import { StructuredData, generateBlogPostingSchema } from "@/components/seo/StructuredData";
import { generateSEOMeta } from "@/lib/seo";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n";

// SEO metadata for the blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateSEOMeta({
    title: "Local SEO Strategies That Work | AI SEO Turbo Blog",
    description:
      "Boost your local search rankings with these proven strategies for local businesses and service providers.",
    keywords: ["Local SEO", "Local Search", "Business", "Optimization"],
    ogType: "article",
    locale: locale as Locale,
    path: "blog/local-seo-strategies-that-work",
  });
}

export default async function LocalSEOStrategiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Get translations server-side
  const t = await getTranslations({ locale, namespace: "blog.localSEOStrategiesThatWork" });

  const post = {
    id: "5",
    slug: "local-seo-strategies-that-work",
    title: t("post.title"),
    excerpt: t("post.excerpt"),
    content: `
      <div role="navigation" aria-label="Table of Contents" class="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 mb-8">
        <h2 class="text-lg font-semibold text-white mb-4">${t("toc.title")}</h2>
        <ul class="space-y-2 text-gray-300">
          <li><a href="#importance" class="text-blue-400 hover:text-blue-300">${t("toc.importance")}</a></li>
          <li><a href="#gbp" class="text-blue-400 hover:text-blue-300">${t("toc.gbp")}</a></li>
          <li><a href="#citations" class="text-blue-400 hover:text-blue-300">${t("toc.citations")}</a></li>
          <li><a href="#reviews" class="text-blue-400 hover:text-blue-300">${t("toc.reviews")}</a></li>
          <li><a href="#localKeywords" class="text-blue-400 hover:text-blue-300">${t("toc.localKeywords")}</a></li>
          <li><a href="#advanced" class="text-blue-400 hover:text-blue-300">${t("toc.advanced")}</a></li>
          <li><a href="#measurement" class="text-blue-400 hover:text-blue-300">${t("toc.measurement")}</a></li>
        </ul>
      </div>

      <section id="importance">
        <h2>${t("importance.title")}</h2>
        <p>${t("importance.intro")}</p>

        <div class="bg-blue-600/10 border-l-4 border-blue-500 p-4 my-6">
          <p class="text-gray-100"><strong>${t("importance.stats.label")}</strong> ${t("importance.stats.text")}</p>
        </div>

        <h3>${t("importance.localSearchJourney.title")}</h3>
        <p>${t("importance.localSearchJourney.description")}</p>

        <h3>${t("importance.revenueImpact.title")}</h3>
        <ul class="space-y-3 my-6">
          <li><strong>${t("importance.revenueImpact.footTraffic")}</strong></li>
          <li><strong>${t("importance.revenueImpact.phoneCalls")}</strong></li>
          <li><strong>${t("importance.revenueImpact.onlineBookings")}</strong></li>
          <li><strong>${t("importance.revenueImpact.trustAuthority")}</strong></li>
          <li><strong>${t("importance.revenueImpact.competitiveAdvantage")}</strong></li>
        </ul>
      </section>

      <section id="gbp">
        <h2>${t("gbp.title")}</h2>

        <h3>${t("gbp.whyEssential.title")}</h3>
        <p>${t("gbp.whyEssential.description")}</p>

        <h3>${t("gbp.optimizationChecklist.title")}</h3>
        <div class="space-y-4 my-6">
          <div class="bg-slate-800/50 p-4 rounded-lg">
            <h4 class="font-semibold text-white mb-2">${t("gbp.optimizationChecklist.businessInfo.title")}</h4>
            <ul class="text-gray-300 space-y-1 ml-4">
              <li>• ${t("gbp.optimizationChecklist.businessInfo.verifyClaim")}</li>
              <li>• ${t("gbp.optimizationChecklist.businessInfo.exactName")}</li>
              <li>• ${t("gbp.optimizationChecklist.businessInfo.completeAddress")}</li>
              <li>• ${t("gbp.optimizationChecklist.businessInfo.phoneWebsite")}</li>
              <li>• ${t("gbp.optimizationChecklist.businessInfo.categories")}</li>
            </ul>
          </div>

          <div class="bg-slate-800/50 p-4 rounded-lg">
            <h4 class="font-semibold text-white mb-2">${t("gbp.optimizationChecklist.visualContent.title")}</h4>
            <ul class="text-gray-300 space-y-1 ml-4">
              <li>• ${t("gbp.optimizationChecklist.visualContent.uploadPhotos")}</li>
              <li>• ${t("gbp.optimizationChecklist.visualContent.businessPhotos")}</li>
              <li>• ${t("gbp.optimizationChecklist.visualContent.professionalLogo")}</li>
              <li>• ${t("gbp.optimizationChecklist.visualContent.staffPhotos")}</li>
              <li>• ${t("gbp.optimizationChecklist.visualContent.updateRegularly")}</li>
              <li>• ${t("gbp.optimizationChecklist.visualContent.virtualTour")}</li>
            </ul>
          </div>

          <div class="bg-slate-800/50 p-4 rounded-lg">
            <h4 class="font-semibold text-white mb-2">${t("gbp.optimizationChecklist.description.title")}</h4>
            <ul class="text-gray-300 space-y-1 ml-4">
              <li>• ${t("gbp.optimizationChecklist.description.writeDescription")}</li>
              <li>• ${t("gbp.optimizationChecklist.description.includeKeywords")}</li>
              <li>• ${t("gbp.optimizationChecklist.description.highlightUSPs")}</li>
              <li>• ${t("gbp.optimizationChecklist.description.serviceAreas")}</li>
              <li>• ${t("gbp.optimizationChecklist.description.businessHours")}</li>
            </ul>
          </div>

          <div class="bg-slate-800/50 p-4 rounded-lg">
            <h4 class="font-semibold text-white mb-2">${t("gbp.optimizationChecklist.posts.title")}</h4>
            <ul class="text-gray-300 space-y-1 ml-4">
              <li>• ${t("gbp.optimizationChecklist.posts.postWeekly")}</li>
              <li>• ${t("gbp.optimizationChecklist.posts.shareOffers")}</li>
              <li>• ${t("gbp.optimizationChecklist.posts.includeImages")}</li>
              <li>• ${t("gbp.optimizationChecklist.posts.keepFresh")}</li>
              <li>• ${t("gbp.optimizationChecklist.posts.postHolidays")}</li>
            </ul>
          </div>
        </div>

        <h3>${t("gbp.advancedFeatures.title")}</h3>
        <ul class="space-y-3 my-6">
          <li><strong>${t("gbp.advancedFeatures.googlePosts")}</strong></li>
          <li><strong>${t("gbp.advancedFeatures.qaSection")}</strong></li>
          <li><strong>${t("gbp.advancedFeatures.productCatalog")}</strong></li>
          <li><strong>${t("gbp.advancedFeatures.servicesList")}</strong></li>
          <li><strong>${t("gbp.advancedFeatures.events")}</strong></li>
        </ul>
      </section>

      <section id="citations">
        <h2>${t("citations.title")}</h2>

        <h3>${t("citations.whatAre.title")}</h3>
        <p>${t("citations.whatAre.description")}</p>

        <div class="bg-emerald-600/10 border border-emerald-500/30 rounded-lg p-4 my-6">
          <h4 class="font-semibold text-emerald-300 mb-2">${t("citations.napConsistency.title")}</h4>
          <p class="text-gray-300">${t("citations.napConsistency.description")}</p>
        </div>

        <h3>${t("citations.topSources.title")}</h3>
        <ol class="space-y-3 my-6">
          <li><strong>${t("citations.topSources.google")}</strong></li>
          <li><strong>${t("citations.topSources.apple")}</strong></li>
          <li><strong>${t("citations.topSources.yelp")}</strong></li>
          <li><strong>${t("citations.topSources.facebook")}</strong></li>
          <li><strong>${t("citations.topSources.industry")}</strong></li>
          <li><strong>${t("citations.topSources.chamber")}</strong></li>
          <li><strong>${t("citations.topSources.bbb")}</strong></li>
          <li><strong>${t("citations.topSources.nextdoor")}</strong></li>
        </ol>

        <h3>${t("citations.buildingStrategy.title")}</h3>
        <p>${t("citations.buildingStrategy.description")}</p>
        <ol class="space-y-2 my-4">
          <li><strong>${t("citations.buildingStrategy.tier1")}</strong></li>
          <li><strong>${t("citations.buildingStrategy.tier2")}</strong></li>
          <li><strong>${t("citations.buildingStrategy.tier3")}</strong></li>
        </ol>
      </section>

      <section id="reviews">
        <h2>${t("reviews.title")}</h2>

        <h3>${t("reviews.importance.title")}</h3>
        <p>${t("reviews.importance.description")}</p>

        <h3>${t("reviews.strategy.title")}</h3>
        <div class="space-y-4 my-6">
          <div class="bg-slate-800/50 p-4 rounded-lg">
            <h4 class="font-semibold text-white mb-2">${t("reviews.strategy.encourageReviews.title")}</h4>
            <p class="text-gray-300">${t("reviews.strategy.encourageReviews.description")}</p>
          </div>

          <div class="bg-slate-800/50 p-4 rounded-lg">
            <h4 class="font-semibold text-white mb-2">${t("reviews.strategy.respondToReviews.title")}</h4>
            <p class="text-gray-300">${t("reviews.strategy.respondToReviews.description")}</p>
          </div>

          <div class="bg-slate-800/50 p-4 rounded-lg">
            <h4 class="font-semibold text-white mb-2">${t("reviews.strategy.reviewPlatforms.title")}</h4>
            <p class="text-gray-300">${t("reviews.strategy.reviewPlatforms.description")}</p>
          </div>

          <div class="bg-slate-800/50 p-4 rounded-lg">
            <h4 class="font-semibold text-white mb-2">${t("reviews.strategy.fakeReviews.title")}</h4>
            <p class="text-gray-300">${t("reviews.strategy.fakeReviews.description")}</p>
          </div>
        </div>
      </section>

      <section id="localKeywords">
        <h2>${t("content.localKeywords.title")}</h2>

        <h3>${t("content.contentStrategy.locationPages.title")}</h3>
        <p>${t("content.contentStrategy.locationPages.description")}</p>

        <h3>${t("content.contentStrategy.localBlogContent.title")}</h3>
        <p>${t("content.contentStrategy.localBlogContent.description")}</p>

        <h3>${t("content.contentStrategy.servicePages.title")}</h3>
        <p>${t("content.contentStrategy.servicePages.description")}</p>
      </section>

      <section id="advanced">
        <h2>${t("technical.title")}</h2>

        <h3>${t("technical.mobileOptimization.title")}</h3>
        <p>${t("technical.mobileOptimization.description")}</p>

        <h3>${t("technical.pageSpeed.title")}</h3>
        <p>${t("technical.pageSpeed.description")}</p>

        <h3>${t("technical.localSitemap.title")}</h3>
        <p>${t("technical.localSitemap.description")}</p>

        <h3>${t("technical.localInternalLinking.title")}</h3>
        <p>${t("technical.localInternalLinking.description")}</p>
      </section>

      <section id="measurement">
        <h2>${t("tracking.title")}</h2>
        <p>${t("tracking.kpis.title")}</p>
        <ul class="space-y-2 my-4">
          <li><strong>${t("tracking.kpis.gmbMetrics")}</strong></li>
          <li><strong>${t("tracking.kpis.organicRankings")}</strong></li>
          <li><strong>${t("tracking.kpis.organicTraffic")}</strong></li>
          <li><strong>${t("tracking.kpis.conversions")}</strong></li>
          <li><strong>${t("tracking.kpis.citations")}</strong></li>
          <li><strong>${t("tracking.kpis.reviews")}</strong></li>
        </ul>
      </section>

      <section>
        <h2>${t("conclusion.title")}</h2>
        <p>${t("conclusion.paragraph1")}</p>
      </section>
    `,
    date: t("post.date"),
    readTime: t("post.readTime"),
    category: t("post.category"),
    author: t("post.author"),
    authorRole: t("post.authorRole"),
    featured: true,
    image: "/blog/seo-audit-checklist.webp",
    tags: [
      "Local SEO",
      "Google Business Profile",
      "Local Citations",
      "Reviews",
      "Local Search",
      "Small Business",
    ],
    views: "1.9k",
    likes: 76,
  };

  const blogSchema = generateBlogPostingSchema({
    title: t("metadata.title"),
    description: t("metadata.description"),
    author: t("post.author"),
    datePublished: "2025-10-17T13:00:00+00:00",
    dateModified: "2025-10-17T13:00:00+00:00",
    image: "https://www.aiseoturbo.com/blog/local-seo.jpg",
    url: "https://www.aiseoturbo.com/blog/local-seo-strategies-that-work",
    wordCount: 2650,
    keywords: [
      "local SEO",
      "Google Business Profile",
      "local search",
      "local citations",
      "NAP consistency",
      "Google Maps",
    ],
    category: t("post.category"),
  });

  return (
    <>
      <StructuredData data={blogSchema} />
      <BlogPostClient post={post} />
    </>
  );
}
