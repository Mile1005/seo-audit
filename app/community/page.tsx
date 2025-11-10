import { Metadata } from 'next'
import { MainLayout } from '@/components/layout/main-layout'

export const metadata: Metadata = {
  title: 'Community - AI SEO Turbo Community',
  description: 'Join our community of SEO professionals and AI enthusiasts.',
}

export default function CommunityPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-8">Community</h1>
            <p className="text-xl text-slate-300 mb-8">
              Join our community of SEO professionals and AI enthusiasts.
            </p>
            <p className="text-slate-400">
              Community features coming soon!
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}