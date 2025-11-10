import { Metadata } from 'next'
import { MainLayout } from '@/components/layout/main-layout'

export const metadata: Metadata = {
  title: 'Careers - Join AI SEO Turbo Team',
  description: 'Join our team and help build the future of AI-powered SEO tools.',
}

export default function CareersPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-8">Careers</h1>
            <p className="text-xl text-slate-300 mb-8">
              We're always looking for talented individuals to join our team.
            </p>
            <p className="text-slate-400">
              No current openings. Please check back later!
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}