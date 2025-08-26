import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import EnhancedHeader from '../../components/layout/EnhancedHeader';
import Footer from '../../components/layout/Footer';

export const dynamic = 'force-dynamic';

const features = [
  {
    title: 'AI-Powered Analysis',
    description:
      'Advanced models surface critical SEO issues, group them by impact, and suggest precise, actionable fixes tailored to your stack.',
    bullets: [
      'On-page, technical, and content scoring',
      'Priority-based issue grouping',
      'Guided, step-by-step fixes',
    ],
    colorFrom: 'from-blue-500',
    colorTo: 'to-indigo-600',
    id: 'ai-analysis',
  },
  {
    title: 'Real-time Monitoring',
    description:
      'Track changes as they happen. Get instant alerts on regressions in Core Web Vitals, indexing, metadata, and structured data.',
    bullets: [
      '24/7 crawler + change detection',
      'Core Web Vitals deltas',
      'Alerting to Slack/Email/Webhooks',
    ],
    colorFrom: 'from-emerald-500',
    colorTo: 'to-teal-600',
    id: 'monitoring',
  },
  {
    title: 'Custom Reports',
    description:
      'Build branded, stakeholder-friendly reports with live charts, comparisons, and auto-generated commentary.',
    bullets: [
      'White-label PDF & live links',
      'Segment by folder, subdomain, tag',
      'Automated weekly/monthly delivery',
    ],
    colorFrom: 'from-fuchsia-500',
    colorTo: 'to-purple-600',
    id: 'reports',
  },
  {
    title: 'API Access',
    description:
      'Integrate audits, ranking data, and crawl results into your workflows, dashboards, or data warehouse with a stable API.',
    bullets: [
      'REST/JSON endpoints',
      'Rate-limited, token-based auth',
      'SDKs and code samples',
    ],
    colorFrom: 'from-amber-500',
    colorTo: 'to-orange-600',
    id: 'api',
  },
  {
    title: 'White-label Solutions',
    description:
      'Offer AISEO Turbo under your brand. Configure logos, colors, domains, and permissions with a few clicks.',
    bullets: [
      'Custom domain & theme',
      'Role-based access control',
      'Multi-tenant ready',
    ],
    colorFrom: 'from-cyan-500',
    colorTo: 'to-sky-600',
    id: 'white-label',
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <EnhancedHeader />

      {/* Hero */}
  <section className="relative overflow-hidden pt-16 pb-10">
        <div className="absolute inset-0 bg-soft-radial" />
        <div className="absolute inset-0 bg-noise" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-gray-900"
          >
            Powerful features for modern SEO teams
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Everything you need to audit, monitor, and grow organic traffic—faster.
          </motion.p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/seo-audit" className="btn-primary">Run free audit</Link>
            <Link href="#sections" className="btn-secondary">Explore features</Link>
          </div>
        </div>
      </section>

      {/* Alternating features */}
      <section id="sections" className="relative py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {features.map((f, idx) => (
              <div key={f.title} id={f.id} className="relative scroll-mt-28">
                {/* Section divider */}
                {idx > 0 && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-px h-10 bg-gradient-to-b from-transparent via-blue-200 to-transparent" />
                )}
                <div className={`grid lg:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''}`}>
                  {/* Copy */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="prose prose-lg max-w-none">
                      <h2 className="!mb-3">{f.title}</h2>
                      <p>{f.description}</p>
                      <ul>
                        {f.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 flex gap-4">
                      <Link href="/signup" className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow hover:shadow-md transition">
                        Get started
                      </Link>
                      <Link href="/contact" className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium hover:border-blue-300 hover:text-blue-700 transition">
                        Talk to sales
                      </Link>
                    </div>
                  </motion.div>

                  {/* Visual */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                  >
                    <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gradient-to-br ${f.colorFrom} ${f.colorTo}`}>
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,white,transparent_40%)]" />
                      {/* Decorative shapes */}
                      <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-white/20 blur-2xl" />
                      <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-black/10 blur-2xl" />
                      {/* Placeholder chart/image */}
                      <div className="absolute inset-0 grid place-items-center">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-4 shadow border border-white">
                          <div className="text-sm font-semibold text-gray-700">Interactive preview</div>
                          <div className="mt-2 h-24 w-64 bg-gradient-to-r from-slate-100 to-white rounded-md" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Try all paid features free for 7 days</h2>
          <p className="text-lg text-blue-100 mb-8">No credit card required. Cancel anytime.</p>
          <Link href="/signup" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg">
            Get access now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
