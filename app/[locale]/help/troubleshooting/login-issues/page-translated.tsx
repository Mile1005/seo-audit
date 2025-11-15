"use client"

import { MainLayout } from '@/components/layout/main-layout'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import LoginIssuesContent from './LoginIssuesContent'

export default function LoginIssuesTranslatedPage() {
  const t = useTranslations('help.categories.troubleshooting.articles.loginIssues')

  return <LoginIssuesContent />
}
