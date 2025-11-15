"use client"

import { MainLayout } from '@/components/layout/main-layout'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import SyncIssuesContent from './SyncIssuesContent'

export default function SyncIssuesTranslatedPage() {
  const t = useTranslations('help.categories.troubleshooting.articles.syncIssues')

  return <SyncIssuesContent />
}