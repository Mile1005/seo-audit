"use client";

import { MainLayout } from '../../components/layout/main-layout'
import { StructuredData, generateAboutPageSchema } from '../../components/seo/StructuredData'
import { useTranslations } from 'next-intl'

export default function AboutPage() {
  const t = useTranslations('about');
  const tHero = useTranslations('about.hero');
  const tStory = useTranslations('about.story');
  const tProblem = useTranslations('about.problem');
  const tStats = useTranslations('about.stats');
  const tMission = useTranslations('about.mission');
  const tVision = useTranslations('about.vision');
  const tValues = useTranslations('about.values');
  const tExpertise = useTranslations('about.expertise');
  const tTeam = useTranslations('about.team');
  const aboutSchema = generateAboutPageSchema({
    organizationName: "AISEOTurbo",
    description: "AI-powered SEO audit platform helping businesses optimize their websites for better search engine rankings. We democratize SEO insights through cutting-edge AI technology.",
    foundingDate: "2025-09",
    founders: [
      {
        name: "Mile Stoev",
        jobTitle: "Founder & CEO"
      }
    ],
    numberOfEmployees: "1-10",
    url: "https://www.aiseoturbo.com",
    email: "support@aiseoturbo.com"
  });

  return (
    <MainLayout>
      <StructuredData data={aboutSchema} />
      <div className="min-h-screen bg-background">{/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              {tHero('title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">{tHero('titleHighlight')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              {tHero('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{tStory('title')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {tStory('subtitle')}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">{tProblem('title')}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {tProblem('description')}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{tProblem('point1')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{tProblem('point2')}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{tProblem('point3')}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-2xl">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">{tStats('experience')}</div>
                  <div className="text-muted-foreground mb-6">{tStats('experienceLabel')}</div>
                  <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">{tStats('businesses')}</div>
                  <div className="text-muted-foreground">{tStats('businessesLabel')}</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{tMission('title')}</h3>
                  <p className="text-muted-foreground">
                    {tMission('description')}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{tVision('title')}</h3>
                  <p className="text-muted-foreground">
                    {tVision('description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{tValues('title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {tValues('subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 bg-background rounded-xl shadow-sm border">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{tValues('precision.title')}</h3>
              <p className="text-muted-foreground">{tValues('precision.description')}</p>
            </div>

            <div className="text-center p-6 bg-background rounded-xl shadow-sm border">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{tValues('innovation.title')}</h3>
              <p className="text-muted-foreground">{tValues('innovation.description')}</p>
            </div>

            <div className="text-center p-6 bg-background rounded-xl shadow-sm border">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{tValues('collaboration.title')}</h3>
              <p className="text-muted-foreground">{tValues('collaboration.description')}</p>
            </div>

            <div className="text-center p-6 bg-background rounded-xl shadow-sm border">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{tValues('integrity.title')}</h3>
              <p className="text-muted-foreground">{tValues('integrity.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">{tExpertise('title')}</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <h3>{tExpertise('technical.title')}</h3>
              <p className="text-lg leading-relaxed mb-6">
                {tExpertise('technical.description')}
              </p>

              <h3>{tExpertise('ai.title')}</h3>
              <p className="text-lg leading-relaxed mb-6">
                {tExpertise('ai.description')}
              </p>

              <h3>{tExpertise('datadriven.title')}</h3>
              <p className="text-lg leading-relaxed mb-6">
                {tExpertise('datadriven.description')}
              </p>

              <h3>{tExpertise('track.title')}</h3>
              <p className="text-lg leading-relaxed">
                {tExpertise('track.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">{tTeam('title')}</h2>
            <div className="prose prose-lg mx-auto text-muted-foreground mb-8">
              <p className="text-lg leading-relaxed">
                {tTeam('description')}
              </p>
            </div>
            <div className="bg-card rounded-xl p-8 border">
              <blockquote className="text-xl font-medium text-foreground mb-4">
                {tTeam('quote')}
              </blockquote>
              <cite className="text-muted-foreground">{tTeam('attribution')}</cite>
            </div>
          </div>
        </div>
      </section>
    </div>
    </MainLayout>
  )
}
