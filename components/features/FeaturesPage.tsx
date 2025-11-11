import React from 'react';
import { CheckCircle, Search, TrendingUp, Shield, Zap, Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Breadcrumbs } from '../navigation/breadcrumbs';
import { MainLayout } from '../layout/main-layout';

export default async function FeaturesPage() {
  const t = await getTranslations('featuresIndex');
  
  const features = [
    {
      icon: Search,
      title: t('features.audit.title'),
      description: t('features.audit.description'),
      benefits: [
        t('features.audit.benefit1'),
        t('features.audit.benefit2'),
        t('features.audit.benefit3'),
        t('features.audit.benefit4'),
      ],
      popular: true,
    },
    {
      icon: TrendingUp,
      title: t('features.competitor.title'),
      description: t('features.competitor.description'),
      benefits: [
        t('features.competitor.benefit1'),
        t('features.competitor.benefit2'),
        t('features.competitor.benefit3'),
        t('features.competitor.benefit4'),
      ],
      popular: false,
    },
    {
      icon: Shield,
      title: t('features.monitoring.title'),
      description: t('features.monitoring.description'),
      benefits: [
        t('features.monitoring.benefit1'),
        t('features.monitoring.benefit2'),
        t('features.monitoring.benefit3'),
        t('features.monitoring.benefit4'),
      ],
      popular: false,
    },
    {
      icon: Zap,
      title: t('features.ai.title'),
      description: t('features.ai.description'),
      benefits: [
        t('features.ai.benefit1'),
        t('features.ai.benefit2'),
        t('features.ai.benefit3'),
        t('features.ai.benefit4'),
      ],
      popular: true,
    },
    {
      icon: Users,
      title: t('features.team.title'),
      description: t('features.team.description'),
      benefits: [
        t('features.team.benefit1'),
        t('features.team.benefit2'),
        t('features.team.benefit3'),
        t('features.team.benefit4'),
      ],
      popular: false,
    },
    {
      icon: CheckCircle,
      title: t('features.reports.title'),
      description: t('features.reports.description'),
      benefits: [
        t('features.reports.benefit1'),
        t('features.reports.benefit2'),
        t('features.reports.benefit3'),
        t('features.reports.benefit4'),
      ],
      popular: false,
    },
  ];
  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <div className="mb-8 flex justify-center">
            <Breadcrumbs
              items={[
                { name: 'Features', url: 'https://www.aiseoturbo.com/features' }
              ]}
              darkMode={false}
            />
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            {t('header.title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {t('header.subtitle')}
          </p>
        </div>
      </section>

      {/* Comprehensive SEO Features Introduction */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-invert mx-auto">
            <h2>{t('intro.title')}</h2>
            <p>
              {t('intro.p1')}
            </p>

            <p>
              {t('intro.p2')}
            </p>

            <h3>{t('intro.whyChooseTitle')}</h3>
            <p>
              {t('intro.whyChooseText')}
            </p>

            <h3>{t('intro.technicalTitle')}</h3>
            <p>
              {t('intro.technicalText')}
            </p>
            <ul>
              <li>{t('intro.technicalItem1')}</li>
              <li>{t('intro.technicalItem2')}</li>
              <li>{t('intro.technicalItem3')}</li>
              <li>{t('intro.technicalItem4')}</li>
            </ul>

            <h3>{t('intro.competitorTitle')}</h3>
            <p>
              {t('intro.competitorText')}
            </p>

            <h4>{t('intro.competitorSubtitle')}</h4>
            <ul>
              <li>{t('intro.competitorItem1')}</li>
              <li>{t('intro.competitorItem2')}</li>
              <li>{t('intro.competitorItem3')}</li>
              <li>{t('intro.competitorItem4')}</li>
              <li>{t('intro.competitorItem5')}</li>
            </ul>

            <h3>{t('intro.monitoringTitle')}</h3>
            <p>
              {t('intro.monitoringText')}
            </p>

            <h4>{t('intro.monitoringSubtitle')}</h4>
            <ul>
              <li>{t('intro.monitoringItem1')}</li>
              <li>{t('intro.monitoringItem2')}</li>
              <li>{t('intro.monitoringItem3')}</li>
              <li>{t('intro.monitoringItem4')}</li>
              <li>{t('intro.monitoringItem5')}</li>
            </ul>

            <h3>{t('intro.contentTitle')}</h3>
            <p>
              {t('intro.contentText')}
            </p>

            <h4>{t('intro.contentSubtitle')}</h4>
            <ul>
              <li>{t('intro.contentItem1')}</li>
              <li>{t('intro.contentItem2')}</li>
              <li>{t('intro.contentItem3')}</li>
              <li>{t('intro.contentItem4')}</li>
              <li>{t('intro.contentItem5')}</li>
            </ul>

            <h3>{t('intro.teamTitle')}</h3>
            <p>
              {t('intro.teamText')}
            </p>

            <h4>{t('intro.teamSubtitle')}</h4>
            <ul>
              <li>{t('intro.teamItem1')}</li>
              <li>{t('intro.teamItem2')}</li>
              <li>{t('intro.teamItem3')}</li>
              <li>{t('intro.teamItem4')}</li>
              <li>{t('intro.teamItem5')}</li>
            </ul>

            <h3>{t('intro.reportingTitle')}</h3>
            <p>
              {t('intro.reportingText')}
            </p>

            <h4>{t('intro.reportingSubtitle')}</h4>
            <ul>
              <li>{t('intro.reportingItem1')}</li>
              <li>{t('intro.reportingItem2')}</li>
              <li>{t('intro.reportingItem3')}</li>
              <li>{t('intro.reportingItem4')}</li>
              <li>{t('intro.reportingItem5')}</li>
            </ul>

            <h2>{t('intro.expertTitle')}</h2>
            <p>
              {t('intro.expertP1')}
            </p>

            <p>
              {t('intro.expertP2')}
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="relative overflow-hidden border border-border/50 rounded-lg bg-card text-card-foreground shadow-sm hover:border-primary/50 transition-colors">
                  {feature.popular && (
                    <span className="absolute top-4 right-4 inline-flex items-center rounded-full border-transparent bg-primary text-primary-foreground px-2.5 py-0.5 text-xs font-semibold">
                      {t('badgePopular')}
                    </span>
                  )}
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold leading-none tracking-tight">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="p-6 pt-0">
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Start free trial with AI SEO Turbo"
            >
              {t('cta.startTrial')}
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-border rounded-lg font-semibold hover:bg-muted/50 transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Contact sales team"
            >
              {t('cta.contactSales')}
            </a>
          </div>
        </div>
      </section>
    </div>
    </MainLayout>
  );
}
