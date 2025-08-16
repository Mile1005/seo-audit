import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

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

type Tab = 'Overview' | 'Technical' | 'Content' | 'Images' | 'Links';

const getScoreColor = (score: number) => {
  if (score >= 80) return 'bg-green-500';
  if (score >= 50) return 'bg-yellow-400';
  return 'bg-red-500';
};

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

  return (
    <div className="min-w-[400px] max-w-[600px] max-h-[600px] overflow-y-auto bg-white p-4 font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
      <h2 className="text-xl font-bold mb-2">Instant AI SEO Analyzer</h2>
      <div className="flex items-center mb-4">
        <div className={`rounded-full w-12 h-12 flex items-center justify-center text-white text-lg font-bold ${getScoreColor(computeScore(seo))}`}>{computeScore(seo)}</div>
        <div className="ml-4">
          <div className="font-semibold">Overall SEO Score</div>
          <div className="text-xs text-gray-500">(Higher is better)</div>
        </div>
        <button className="ml-auto px-3 py-1 bg-blue-500 text-white rounded text-xs" onClick={exportCSV}>Export CSV</button>
      </div>
      <div className="flex border-b mb-2">
        {(['Overview', 'Technical', 'Content', 'Images', 'Links'] as Tab[]).map(t => (
          <button key={t} className={`flex-1 py-2 text-sm font-medium ${tab === t ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      {loading ? (
        <div className="py-8 text-center text-gray-400">Analyzing page...</div>
      ) : error ? (
        <div className="py-8 text-center text-red-500">{error}</div>
      ) : seo && (
        <div>
          {tab === 'Overview' && (
            <div>
              <div className="mb-2"><span className="font-semibold">Title:</span> {seo.page.title}</div>
              <div className="mb-2"><span className="font-semibold">Meta Description:</span> {seo.page.metaDescription || <span className="text-red-500">Missing</span>}</div>
              <div className="mb-2"><span className="font-semibold">Canonical:</span> {seo.page.canonical || <span className="text-yellow-500">Missing</span>}</div>
              <div className="mb-2"><span className="font-semibold">Word Count:</span> {seo.wordCount}</div>
              <div className="mb-2"><span className="font-semibold">Flesch-Kincaid:</span> {seo.readability.fleschKincaid?.toFixed(1) ?? 'N/A'}</div>
              <div className="mb-2"><span className="font-semibold">Core Web Vitals:</span> LCP: {seo.coreWebVitals.lcp?.toFixed(0) ?? 'N/A'} ms, CLS: {seo.coreWebVitals.cls?.toFixed(2) ?? 'N/A'}, INP: {seo.coreWebVitals.inp?.toFixed(0) ?? 'N/A'}</div>
            </div>
          )}
          {tab === 'Technical' && (
            <div>
              <div className="mb-2"><span className="font-semibold">Robots:</span> {seo.page.robots || 'N/A'}</div>
              <div className="mb-2"><span className="font-semibold">Viewport:</span> {seo.page.viewport || 'N/A'}</div>
              <div className="mb-2"><span className="font-semibold">Open Graph:</span> {Object.keys(seo.page.openGraph).length ? <ul className="ml-4 list-disc">{Object.entries(seo.page.openGraph).map(([k, v]) => <li key={k}>{k}: {v}</li>)}</ul> : 'None'}</div>
              <div className="mb-2"><span className="font-semibold">Twitter Card:</span> {Object.keys(seo.page.twitterCard).length ? <ul className="ml-4 list-disc">{Object.entries(seo.page.twitterCard).map(([k, v]) => <li key={k}>{k}: {v}</li>)}</ul> : 'None'}</div>
              <div className="mb-2"><span className="font-semibold">JSON-LD Types:</span> {seo.page.jsonLdTypes.length ? seo.page.jsonLdTypes.join(', ') : 'None'}</div>
            </div>
          )}
          {tab === 'Content' && (
            <div>
              <div className="mb-2"><span className="font-semibold">Headings:</span> {Object.entries(seo.headingCounts).map(([tag, count]) => <span key={tag} className="inline-block mr-2">{tag}: {count}</span>)}</div>
              <ul className="list-disc ml-4">
                {seo.headings.map((h, i) => <li key={i}><span className="font-semibold">{h.tag}:</span> {h.text}</li>)}
              </ul>
            </div>
          )}
          {tab === 'Images' && (
            <div>
              <div className="mb-2"><span className="font-semibold">Total Images:</span> {seo.images.length}</div>
              <div className="mb-2"><span className="font-semibold">Missing Alt:</span> {seo.images.filter(img => !img.hasAlt).length}</div>
              <ul className="list-disc ml-4">
                {seo.images.slice(0, 10).map((img, i) => <li key={i}>{img.src} {img.alt ? <span className="text-green-600">(alt: {img.alt})</span> : <span className="text-red-500">(missing alt)</span>}</li>)}
              </ul>
            </div>
          )}
          {tab === 'Links' && (
            <div>
              <div className="mb-2"><span className="font-semibold">Total Links:</span> {seo.links.length}</div>
              <div className="mb-2"><span className="font-semibold">Internal:</span> {seo.links.filter(l => l.isInternal).length}</div>
              <div className="mb-2"><span className="font-semibold">External:</span> {seo.links.filter(l => !l.isInternal).length}</div>
              <ul className="list-disc ml-4">
                {seo.links.slice(0, 10).map((l, i) => <li key={i}><a href={l.href} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">{l.text || l.href}</a> <span className="text-xs text-gray-400">[{l.isInternal ? 'Internal' : 'External'}]</span></li>)}
              </ul>
            </div>
          )}
          {/* Issues & Quick Fixes */}
          <div className="mt-4">
            <h4 className="font-semibold mb-1">Issues</h4>
            <ul className="mb-2">
              {issues.length === 0 ? <li className="text-green-600">No major issues detected!</li> : issues.map(issue => (
                <li key={issue.id} className={`text-sm ${issue.priority === 'High' ? 'text-red-600' : issue.priority === 'Medium' ? 'text-yellow-600' : 'text-gray-700'}`}>{issue.description} <span className="ml-2 text-xs">[{issue.priority}]</span></li>
              ))}
            </ul>
            <h4 className="font-semibold mb-1">Quick Fixes</h4>
            <ul>
              {quickFixes.map((fix, i) => (
                <li key={i} className={`text-sm ${fix.impact === 'High' ? 'text-red-600' : fix.impact === 'Medium' ? 'text-yellow-600' : 'text-gray-700'}`}>{fix.suggestion} <span className="ml-2 text-xs">[{fix.impact}]</span></li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {/* Settings */}
      <div className="mt-4 border-t pt-2 flex items-center">
        <label className="text-xs mr-2">Analysis Depth:</label>
        <select className="text-xs border rounded px-2 py-1" value={analysisDepth} onChange={e => setAnalysisDepth(e.target.value as any)}>
          <option value="basic">Basic</option>
          <option value="deep">Deep</option>
        </select>
      </div>
    </div>
  );
};

const container = document.createElement('div');
document.body.appendChild(container);
createRoot(container).render(<Popup />);
