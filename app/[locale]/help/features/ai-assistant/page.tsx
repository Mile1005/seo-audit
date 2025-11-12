import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import AIAssistantPage from '@/app/help/features/ai-assistant/page'

export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateSEOMeta({
    title: 'AI Assistant Feature Guide - Smart SEO Recommendations | AI SEO Turbo',
    description: 'Discover how to use the AI Assistant feature for intelligent SEO recommendations, automated insights, and smart optimization suggestions.',
    keywords: ['AI assistant', 'SEO recommendations', 'automated insights', 'smart optimization', 'AI features'],
    path: '/help/features/ai-assistant',
    locale: params.locale as Locale,
  })
}

export default function Page() {
  return <AIAssistantPage />
}
