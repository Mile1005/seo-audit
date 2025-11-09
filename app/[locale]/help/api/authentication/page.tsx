import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'
import AuthenticationPage from '@/app/help/api/authentication/page'

export const dynamic = 'force-static'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  return generateSEOMeta({
    ...pageSEO.help,
    path: '/help/api/authentication',
    locale: params.locale as Locale,
  })
}

export default function Page() {
  return <AuthenticationPage />
}
