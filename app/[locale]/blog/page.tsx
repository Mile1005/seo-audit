import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import BlogPage from '@/app/blog/page'
import { generateSEOMeta, pageSEO } from '@/lib/seo'
import { type Locale } from '@/i18n'

// SEO metadata for the blog page with hreflang support
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return generateSEOMeta({
    description: 'Stay updated with the latest SEO tips, strategies, and best practices. Learn expert insights on technical SEO, content optimization, and algorithms.',
    keywords: ['SEO blog', 'SEO tips', 'SEO strategies', 'search engine optimization'],
    locale: locale as Locale,
    path: 'blog'
  })
}

type Props = { params: Promise<{ locale: string }> }

export default async function LocalizedBlogPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <BlogPage />
}
