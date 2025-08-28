import { Metadata } from 'next'
import { AboutHero } from './components/about-hero'
import { TeamSection } from './components/team-section'
import { StorySection } from './components/story-section'
import { ValuesSection } from './components/values-section'

export const metadata: Metadata = {
  title: 'About Us | AISEOTurbo - AI-Powered SEO Solutions',
  description: 'Learn about AISEOTurbo mission to revolutionize SEO with AI technology.',
  keywords: ['about aiseoturbo', 'seo company', 'ai seo team', 'seo experts'],
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <StorySection />
      <ValuesSection />
      <TeamSection />
    </main>
  )
}
