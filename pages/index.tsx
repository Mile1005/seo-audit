import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import EnhancedHeader from '../components/layout/EnhancedHeader';
import Footer from '../components/layout/Footer';
import nextDynamic from 'next/dynamic';
import Image from 'next/image';
import StickyAuditBar from '../components/StickyAuditBar';
const Lottie = nextDynamic(() => import('lottie-react').then(m => m.default), { ssr: false });
import heroAnim from '../lib/animations/hero.json';

// Animated number counter
function Counter({ target, suffix = '', className = '' }: { target: number; suffix?: string; className?: string }) {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    let start: number | null = null;
    const duration = 1200;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setValue(target * p);
      if (p < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  const formatted = target >= 100 ? Math.round(value).toLocaleString() : value.toFixed(1);
  return <div className={className}>{formatted}{suffix}</div>;
}

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [homeUrl, setHomeUrl] = useState('');
  const [homeError, setHomeError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const ensureHttps = (url: string) => {
    if (!url) return url;
    const trimmed = url.trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  };

  const isValidDomainOrUrl = (value: string) => {
  const v = value.trim();
  // Accept either full URL or bare domain (handles IDN punycode too)
  const urlRegex = /^(https?:\/\/)?((xn--)?[\w-]+\.)+[\w-]{2,}(\/[\w\-.\/?%&=]*)?$/i;
  // Disallow spaces and invalid characters
  if (!urlRegex.test(v)) return false;
  // Guard against schemes like javascript:
  if (/^\w+:/.test(v) && !/^https?:/i.test(v)) return false;
  return true;
  };

  const handleHomeAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidDomainOrUrl(homeUrl)) {
      setHomeError('Enter a valid domain or URL (example.com or https://example.com)');
      return;
    }
    setHomeError(null);
    setSubmitting(true);
    try {
      const response = await fetch('/api/seo-audit/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: ensureHttps(homeUrl) })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Failed to start audit');
      const auditId = data.auditId || data.id;
      router.push(`/seo-audit/results?id=${auditId}`);
    } catch (err) {
      setHomeError('Failed to start audit. Please try again.');
      setSubmitting(false);
    }
  };
  const tabs = [
    {
      id: 0,
      title: "SEO Audit",
      description: "Comprehensive website analysis with technical SEO, on-page optimization, and performance insights.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: [
        "Technical SEO audit",
        "On-page optimization checks",
        "Performance and speed insights"
      ],
      link: "/seo-audit"
    },
    {
      id: 1,
      title: "Site Crawler",
      description: "Advanced website crawling to discover technical issues, broken links, and site structure problems.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      features: [
        "Crawl your entire website",
        "Find broken links and missing tags",
        "Site structure visualization"
      ],
      link: "/site-crawler"
    },
    {
      id: 2,
      title: "Rank Tracker",
      description: "Monitor your keyword rankings and track performance changes over time with detailed analytics.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      features: [
        "Track keyword rankings",
        "Monitor ranking changes",
        "Competitor analytics"
      ],
      link: "/rank-tracker"
    },
    {
      id: 3,
      title: "Backlink Analysis",
      description: "Analyze your backlink profile, discover new opportunities, and monitor competitor link strategies.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      features: [
        "Backlink profile analysis",
        "Discover new opportunities",
        "Competitor link monitoring"
      ],
      link: "/backlinks"
    }
  ];

  return (
    <>
  <EnhancedHeader />
      {/* Hero Section */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden parallax-dots">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 bg-soft-radial" />
        {/* noise + parallax orbs */}
        <div className="absolute inset-0 bg-noise" />
        <motion.div aria-hidden className="pointer-events-none absolute -left-20 top-24 w-40 h-40 rounded-full bg-blue-200/40 blur-2xl" initial={{y:10}} animate={{y:[0,10,0]}} transition={{duration:8, repeat:Infinity}} />
        <motion.div aria-hidden className="pointer-events-none absolute right-[-60px] top-40 w-56 h-56 rounded-full bg-purple-200/40 blur-2xl" initial={{y:-10}} animate={{y:[0,-10,0]}} transition={{duration:10, repeat:Infinity}} />
  <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12 pb-12">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="space-y-8">
            <h1 className="text-[42px] sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
              Speed up{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                search marketing
              </span>{' '}
              goals achievement
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Start your analysis for free
            </p>
            {/* Removed extra Lottie spacing to tighten hero */}
            <form onSubmit={handleHomeAudit} className="flex items-center justify-center max-w-2xl mx-auto">
              <div className="relative w-full">
                <input
                  type="text"
                  value={homeUrl}
                  onChange={(e)=>setHomeUrl(e.target.value)}
                  placeholder="Enter domain or URL (example.com)"
                  className={`w-full px-6 py-4 text-lg border-2 rounded-full focus:outline-none focus:ring-4 transition-all shadow-lg ${homeError ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'}`}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="absolute right-2 top-2 px-8 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed ripple"
                >
                  {submitting ? 'Analyzing…' : 'Start audit'}
                </button>
              </div>
            </form>
            {homeError && <div className="text-red-600 text-sm -mt-4">{homeError}</div>}
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span>Based on 600+ reviews</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center font-bold text-gray-600">G2</div>
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center font-bold text-gray-600">C</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

  {/* Trust badges + logos */}
  <section className="py-10 bg-white">
        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:0.6}} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4 justify-center">
              {["No credit card", "Free trial", "GDPR-ready"].map((b)=> (
                <div key={b} className="inline-flex items-center gap-2 text-gray-600 text-sm bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"/>
                  {b}
                </div>
              ))}
            </div>
            <div className="text-center md:text-right text-gray-500 text-sm">Trusted by teams at</div>
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-6 items-center opacity-90">
            {[
              {src:'/brand/logo-acme.svg', alt:'Acme'},
              {src:'/brand/logo-hooli.svg', alt:'Hooli'},
              {src:'/brand/badge-g2.svg', alt:'G2'},
              {src:'/brand/badge-capterra.svg', alt:'Capterra'}
            ].map((l, i)=> (
              <div key={i} className="h-12 flex items-center justify-center">
                <Image src={l.src} alt={l.alt} width={140} height={40} className="max-h-10 opacity-80 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </motion.div>
      </section>


      {/* Features/Tabbed Tools Section */}
  <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-blue-50/30">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">MARKETING TOOLS TO SPEED UP SEO TASKS</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to optimize your website and improve search rankings with our comprehensive SEO toolkit
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {tabs.map((tab) => (
                <div key={tab.id} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 tilt shimmer-border">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      {tab.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{tab.title}</h3>
                      <p className="text-gray-600 mb-4">{tab.description}</p>
                      <ul className="mb-4 list-disc list-inside text-gray-600">
                        {tab.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                      <Link
                        href={tab.link}
                        className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                      >
                        Learn More
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Illustration */}
            <div className="lg:pl-12">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden shimmer-border">
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-6">Get Comprehensive SEO Insights</h3>
                  <p className="text-xl mb-8 text-blue-100">
                    Our AI-powered tools analyze every aspect of your website's SEO performance and provide actionable recommendations.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-green-300 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">100+ SEO factors analyzed</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-green-300 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">Real-time monitoring</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-green-300 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">Detailed reports & insights</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">USE THE RIGHT DATA</h2>
            <p className="text-xl text-gray-600">Powered by comprehensive SEO databases and real-time analysis</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { value: 1.5, suffix: 'B', color: 'text-blue-600', label: 'Domains' },
              { value: 8.6, suffix: 'B', color: 'text-green-600', label: 'Keywords' },
              { value: 529, suffix: 'B', color: 'text-purple-600', label: 'Backlinks' },
              { value: 5.6, suffix: 'B', color: 'text-orange-600', label: 'Keyword Suggestions' },
              { value: 230, suffix: '', color: 'text-red-600', label: 'Countries' },
              { value: 2.2, suffix: 'B', color: 'text-indigo-600', label: 'Google SERPs' },
            ].map((s, i) => (
              <motion.div key={i} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5, delay:i*0.05}} className="text-center">
                <Counter target={s.value} suffix={s.suffix} className={`text-4xl font-bold mb-2 ${s.color}`} />
                <div className="text-gray-600 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our SEO audit tools</p>
          </div>
          <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 overflow-hidden">
            {[{
              q: 'Who should use our SEO audit tool?',
              a: "Our SEO audit tool is perfect for business owners, bloggers, digital marketers, web developers, SEO professionals, and basically anyone who wants to improve their website's search engine rankings and online visibility."
            },{
              q: "What's required to use our SEO tools?",
              a: "All you need is a website URL to get started. Our tools work with any website regardless of the platform it's built on - WordPress, Shopify, Wix, custom HTML, or any other CMS."
            },{
              q: 'Do I need technical knowledge to use these tools?',
              a: "Absolutely not. Our SEO audit tools are designed to be user-friendly and accessible to everyone. You'll get clear, actionable recommendations that don't require any technical expertise to understand or implement."
            },{
              q: 'How long does an SEO audit take?',
              a: 'Most audits complete within 1-2 minutes. Larger websites with more pages may take up to 5 minutes. You\'ll receive a comprehensive report with detailed insights and actionable recommendations.'
            },{
              q: 'Is my data secure and private?',
              a: 'Yes, absolutely. We take data privacy seriously. Your website data is analyzed securely and is never shared with third parties.'
            }].map((item, idx) => (
              <details key={idx} className="group open:bg-gray-50">
                <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">{item.q}</span>
                  <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600">{item.a}</div>
              </details>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Ready to Boost Your SEO Rankings?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-blue-100 mb-10"
          >
            Join over 10,000 websites that have improved their search rankings with our AI-powered SEO tools.
            Start your comprehensive SEO audit today and discover opportunities to grow your organic traffic.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/seo-audit"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block ripple"
            >
              Start Free SEO Audit
            </Link>
            <Link
              href="/site-crawler"
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block ripple"
            >
              Explore All Tools
            </Link>
          </motion.div>
          <p className="text-blue-100 text-sm mt-6">
            ✓ No credit card required  ✓ Get results in under 2 minutes  ✓ 100% free audit
          </p>
        </div>
      </section>
  <StickyAuditBar />
  <Footer />
    </>
  );
}
