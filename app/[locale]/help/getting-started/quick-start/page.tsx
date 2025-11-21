import { Metadata } from 'next'
import { MainLayout } from '@/components/layout/main-layout'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { StructuredData, generateHowToSchema } from '@/components/seo/StructuredData'
import { generateSEOMeta } from '@/lib/seo'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ArrowLeft, Clock, User, Rocket } from 'lucide-react'
import Link from 'next/link'
import QuickStartContent from './QuickStartContent'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'help' })

  return generateSEOMeta({
    title: t('quick-start.meta.title'),
    description: t('quick-start.meta.description'),
    keywords: ['quick start guide', 'getting started', 'AISEOTurbo setup', 'SEO audit tutorial', 'website optimization guide'],
    locale: locale as any,
    path: '/help/getting-started/quick-start'
  })
}

export default async function QuickStartPage({ params }: Props) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'help' })

  const howToSchema = generateHowToSchema({
    name: t('quick-start.meta.title'),
    description: t('quick-start.meta.description'),
    totalTime: "PT10M", // 10 minutes
    url: `https://www.aiseoturbo.com/${locale}/help/getting-started/quick-start`,
    datePublished: "2025-03-01T10:00:00+00:00",
    steps: [
      {
        name: t('quick-start.steps.1.title'),
        text: t('quick-start.steps.1.description')
      },
      {
        name: t('quick-start.steps.2.title'),
        text: t('quick-start.steps.2.description')
      },
      {
        name: t('quick-start.steps.3.title'),
        text: t('quick-start.steps.3.description')
      },
      {
        name: t('quick-start.steps.4.title'),
        text: t('quick-start.steps.4.description')
      }
    ]
  })

  return (
    <MainLayout>
      <StructuredData data={howToSchema} />
      <div className="min-h-screen bg-slate-950">

        {/* Breadcrumb */}
        <section className="bg-slate-900/50 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: t('quick-start.breadcrumb.help'), url: `https://www.aiseoturbo.com/help` },
                { name: t('quick-start.breadcrumb.gettingStarted'), url: `https://www.aiseoturbo.com/help/getting-started` },
                { name: t('quick-start.breadcrumb.quickStart'), url: `https://www.aiseoturbo.com/help/getting-started/quick-start` }
              ]}
              darkMode={true}
            />
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/help"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 group"
              aria-label="Return to Help Center"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
              {t('quick-start.backToHelp')}
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-3" aria-hidden="true">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-blue-400 text-sm font-medium">{t('quick-start.header.category')}</span>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {t('quick-start.header.title')}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-6 text-gray-400 text-sm mb-8">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>{t('quick-start.header.readTime')}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" aria-hidden="true" />
                <span>{t('quick-start.header.lastUpdated')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content - Client component for animations */}
        <QuickStartContent />
      </div>
    </MainLayout>
  )
}
