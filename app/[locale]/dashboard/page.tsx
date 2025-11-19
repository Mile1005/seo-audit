import { Metadata } from 'next'
import DashboardContent from '@/components/dashboard/DashboardContent';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generateSEOMeta } from '@/lib/seo';
import { generateAlternates } from '@/lib/metadata-utils';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    ...generateSEOMeta({
      title: 'Dashboard - AI SEO Turbo Control Center',
      description: 'Access your comprehensive SEO dashboard to monitor rankings, track keywords, analyze competitors, and optimize your website performance.',
      keywords: ['SEO dashboard', 'ranking monitor', 'keyword tracking', 'SEO analytics', 'website optimization'],
      locale: locale as any,
      path: '/dashboard',
      noIndex: true // Dashboard should not be indexed
    }),
    alternates: generateAlternates('/dashboard')
  };
}

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale, namespace: 'dashboard' });
  
  return (
    <div className="space-y-8">
      {/* Server-rendered H1 for SEO */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Server-rendered H2 sections for SEO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            {t('overview.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {t('overview.description')}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            {t('keywordTracking.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {t('keywordTracking.description')}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            {t('backlinkAnalysis.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {t('backlinkAnalysis.description')}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            {t('competitorInsights.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {t('competitorInsights.description')}
          </p>
        </div>
      </div>

      {/* Client-side content with authentication */}
      <DashboardContent />
    </div>
  )
}
