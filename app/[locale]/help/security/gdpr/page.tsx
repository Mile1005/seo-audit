import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import GDPRPage from '@/app/help/security/gdpr/page'

export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateSEOMeta({
    description: 'Understand your GDPR rights, data portability options, and how AI SEO Turbo complies with privacy regulations for EU users.',
    keywords: ['GDPR', 'data rights', 'privacy regulations', 'EU compliance', 'data portability', 'right to erasure'],
    path: 'help/security/gdpr',
    locale: params.locale as Locale,
  })
}

export default function Page() {
  return <GDPRPage />
}
