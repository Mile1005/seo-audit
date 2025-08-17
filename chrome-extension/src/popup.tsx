import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Types
interface Issue {
  id: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}
interface QuickFix {
  suggestion: string;
  impact: 'High' | 'Medium' | 'Low';
}
interface SEOData {
  page: {
    title: string;
    metaDescription: string | null;
    canonical: string | null;
    robots: string | null;
    viewport: string | null;
    openGraph: Record<string, string>;
    twitterCard: Record<string, string>;
    jsonLdTypes: string[];
  };
  headings: { tag: string; text: string }[];
  headingCounts: Record<string, number>;
  images: { src: string; alt: string; hasAlt: boolean }[];
  links: { href: string; text: string; rel: string | null; isInternal: boolean }[];
  wordCount: number;
  readability: {
    fleschKincaid: number | null;
    readingTimeMin: number;
  };
  coreWebVitals: {
    lcp: number | null;
    cls: number | null;
    inp: number | null;
  };
}

type Tab = 'Overview' | 'Technical' | 'Content' | 'Images' | 'Links' | 'Performance' | 'Settings';

const getScoreColor = (score: number) => {
  if (score >= 80) return '#22C55E'; // green
  if (score >= 50) return '#eab308'; // yellow
  return '#ef4444'; // red
};

const TABS: Tab[] = ['Overview', 'Technical', 'Content', 'Images', 'Links', 'Performance', 'Settings'];

const Popup: React.FC = () => {
  const [seo, setSeo] = useState<SEOData | null>(null);
  const [tab, setTab] = useState<Tab>('Overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analysisDepth, setAnalysisDepth] = useState<'basic' | 'deep'>('basic');

  // Dummy scoring/issue logic for demo
  const computeScore = (data: SEOData | null): number => {
    if (!data) return 0;
    let score = 100;
    if (!data.page.metaDescription) score -= 10;
    if (!data.page.canonical) score -= 5;
    if (data.images.filter(img => !img.hasAlt).length > 0) score -= 10;
    if (data.headings.filter(h => h.tag === 'H1').length !== 1) score -= 10;
    if (data.links.length < 5) score -= 5;
    return Math.max(0, score);
  };

  const issues: Issue[] = seo ? [
    ...(!seo.page.metaDescription ? [{ id: 'meta', description: 'Missing meta description', priority: 'High' as const }] : []),
    ...(!seo.page.canonical ? [{ id: 'canonical', description: 'Missing canonical URL', priority: 'Medium' as const }] : []),
    ...(seo.images.filter(img => !img.hasAlt).length > 0 ? [{ id: 'alt', description: 'Some images missing alt text', priority: 'High' as const }] : []),
    ...(seo.headings.filter(h => h.tag === 'H1').length !== 1 ? [{ id: 'h1', description: 'Page should have exactly one H1', priority: 'High' as const }] : []),
    ...(seo.links.length < 5 ? [{ id: 'links', description: 'Not enough links on page', priority: 'Low' as const }] : []),
  ] : [];

  const quickFixes: QuickFix[] = [
    { suggestion: 'Add a meta description tag', impact: 'High' },
    { suggestion: 'Ensure all images have alt text', impact: 'High' },
    { suggestion: 'Add a canonical URL', impact: 'Medium' },
    { suggestion: 'Add more internal links', impact: 'Low' },
  ];

  useEffect(() => {
    setLoading(true);
    setError(null);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { type: 'GET_SEO_DATA', depth: analysisDepth },
          (response) => {
            if (chrome.runtime.lastError || !response) {
              setError('Failed to analyze page. Try refreshing.');
              setLoading(false);
            } else {
              setSeo(response);
              setLoading(false);
            }
          }
        );
      }
    });
  }, [analysisDepth]);

  const exportCSV = () => {
    if (!seo) return;
    const rows = [
      ['Title', seo.page.title],
      ['Meta Description', seo.page.metaDescription || ''],
      ['Canonical', seo.page.canonical || ''],
      ['Word Count', String(seo.wordCount)],
      ['Flesch-Kincaid', String(seo.readability.fleschKincaid ?? '')],
      ['LCP', String(seo.coreWebVitals.lcp ?? '')],
      ['CLS', String(seo.coreWebVitals.cls ?? '')],
      ['INP', String(seo.coreWebVitals.inp ?? '')],
    ];
    const csv = rows.map(r => r.map(v => '"' + v.replace(/"/g, '""') + '"').join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'seo-analysis.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Score circles for overall and Core Web Vitals
  const score = computeScore(seo);
  const lcp = seo?.coreWebVitals.lcp ?? 0;
  const cls = seo?.coreWebVitals.cls ?? 0;
  const inp = seo?.coreWebVitals.inp ?? 0;

  return (
    <div className="min-w-[400px] max-w-[600px] max-h-[600px] overflow-y-auto bg-[#111827] text-white p-4 font-sans rounded-lg shadow-xl" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex items-center mb-4 gap-4">
        <div className="w-20 h-20">
          <CircularProgressbar
            value={score}
            text={`${score}`}
            styles={buildStyles({
              textColor: '#fff',
              pathColor: getScoreColor(score),
              trailColor: '#222',
              textSize: '2.2rem',
              strokeLinecap: 'round',
            })}
          />
        </div>
        <div className="ml-4 flex-1">
          <div className="text-2xl font-bold">Instant AI SEO Analyzer</div>
          <div className="text-xs text-gray-400">Overall SEO Score</div>
        </div>
        <button className="ml-auto px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded text-xs font-semibold shadow" onClick={exportCSV}>Export CSV</button>
      </div>
      <div className="flex border-b border-gray-700 mb-2 gap-1">
        {TABS.map(t => (
          <button key={t} className={`flex-1 py-2 text-sm font-medium transition-colors ${tab === t ? 'border-b-2 border-green-500 text-green-400' : 'text-gray-400 hover:text-green-300'}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      {loading ? (
        <div className="py-8 text-center text-gray-400">Analyzing page...</div>
      ) : error ? (
        <div className="py-8 text-center text-red-500">{error}</div>
      ) : seo && (
        <div>
          {tab === 'Overview' && (
            <div className="space-y-2">
              <div className="flex gap-4 justify-center my-4">
                <div className="w-16 h-16">
                  <CircularProgressbar value={lcp > 0 ? Math.max(0, Math.min(100, 100 - (lcp - 200) / 25)) : 0} text={'LCP'} styles={buildStyles({ pathColor: lcp <= 2500 ? '#22C55E' : lcp <= 4000 ? '#eab308' : '#ef4444', textColor: '#fff', trailColor: '#222', textSize: '1.2rem' })} />
                </div>
                <div className="w-16 h-16">
                  <CircularProgressbar value={cls > 0 ? Math.max(0, Math.min(100, 100 - cls * 1000)) : 0} text={'CLS'} styles={buildStyles({ pathColor: cls <= 0.1 ? '#22C55E' : cls <= 0.25 ? '#eab308' : '#ef4444', textColor: '#fff', trailColor: '#222', textSize: '1.2rem' })} />
                </div>
                <div className="w-16 h-16">
                  <CircularProgressbar value={inp > 0 ? Math.max(0, Math.min(100, 100 - (inp - 200) / 2)) : 0} text={'INP'} styles={buildStyles({ pathColor: inp <= 200 ? '#22C55E' : inp <= 500 ? '#eab308' : '#ef4444', textColor: '#fff', trailColor: '#222', textSize: '1.2rem' })} />
                </div>
              </div>
              <div className="text-lg font-semibold">Quick Wins</div>
              <ul className="mb-2 space-y-1">
                {quickFixes.map((fix, i) => (
                  <li key={i} className={`text-sm ${fix.impact === 'High' ? 'text-green-400' : fix.impact === 'Medium' ? 'text-yellow-400' : 'text-gray-300'}`}>{fix.suggestion} <span className="ml-2 text-xs">[{fix.impact}]</span></li>
                ))}
              </ul>
              <div className="text-lg font-semibold">Issues</div>
              <ul className="mb-2 space-y-1">
                {issues.length === 0 ? <li className="text-green-600">No major issues detected!</li> : issues.map(issue => (
                  <li key={issue.id} className={`text-sm ${issue.priority === 'High' ? 'text-red-400' : issue.priority === 'Medium' ? 'text-yellow-400' : 'text-gray-300'}`}>{issue.description} <span className="ml-2 text-xs">[{issue.priority}]</span></li>
                ))}
              </ul>
            </div>
          )}
          {/* TODO: Implement other tabs with modern card layouts, tooltips, and details */}
          {tab === 'Settings' && (
            <div className="space-y-4">
              <div className="font-semibold text-lg">Settings</div>
              <div>
                <label className="text-xs mr-2">Analysis Depth:</label>
                <select className="text-xs border rounded px-2 py-1 bg-gray-800 text-white" value={analysisDepth} onChange={e => setAnalysisDepth(e.target.value as any)}>
                  <option value="basic">Basic</option>
                  <option value="deep">Deep</option>
                </select>
              </div>
              <div className="text-xs text-gray-400">More settings coming soon...</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
createRoot(container).render(<Popup />);
