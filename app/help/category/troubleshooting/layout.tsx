import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Troubleshooting Guide - Fix SEO Issues | AI SEO Turbo',
  description: 'Solve common SEO problems with AI SEO Turbo. Find solutions for audit issues, login problems, performance errors, and sync issues.',
  keywords: ['troubleshooting', 'SEO issues', 'fix problems', 'audit errors', 'login issues', 'performance problems', 'sync issues'],
  alternates: {
    canonical: 'https://www.aiseoturbo.com/help/category/troubleshooting'
  },
  openGraph: {
    title: 'Troubleshooting Guide - Fix SEO Issues | AI SEO Turbo',
    description: 'Solve common SEO problems with AI SEO Turbo. Find solutions for audit issues, login problems, performance errors, and sync issues.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Troubleshooting Guide - Fix SEO Issues | AI SEO Turbo',
    description: 'Solve common SEO problems with AI SEO Turbo. Find solutions for audit issues, login problems, performance errors, and sync issues.',
  }
}

export default function TroubleshootingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}