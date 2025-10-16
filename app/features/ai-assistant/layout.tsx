import { Metadata } from 'next'
import { generateSEOMeta, pageSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEOMeta(pageSEO['features/ai-assistant'])

export default function AIAssistantLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}