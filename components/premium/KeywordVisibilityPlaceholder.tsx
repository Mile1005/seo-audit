import React, { useState } from 'react'

// Phase 12: Keyword Visibility Placeholder
// Shows static example of ranking distribution & visibility score.

const demo = {
  project: 'example.com',
  visibilityScore: 27.4, // percent weighted traffic share vs tracked set
  distribution: {
    top3: 5,
    top10: 14,
    top20: 22,
    top100: 37
  },
  sampleKeywords: [
    { keyword: 'seo audit tool', position: 4, url: '/audit', volume: 1900, difficulty: 41 },
    { keyword: 'technical seo checklist', position: 11, url: '/technical-seo', volume: 1300, difficulty: 52 },
    { keyword: 'meta tags analyzer', position: 18, url: '/meta', volume: 480, difficulty: 38 }
  ],
  lastUpdated: '2025-09-12'
}

export function KeywordVisibilityPlaceholder() {
  const [show, setShow] = useState(false)
  return (
    <div className="rounded-md border border-dashed p-6 bg-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Keyword Visibility (Premium)</h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Track daily positions, share of voice, and SERP feature presence. Connect a ranking provider to enable automatic refresh, competitor overlays, and anomaly alerts.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-500" data-upsell="keywords-upgrade">Upgrade</button>
          <button onClick={()=>setShow(s=>!s)} className="px-3 py-1.5 text-sm rounded-md border hover:bg-slate-100">{show ? 'Hide JSON' : 'Sample JSON'}</button>
        </div>
      </div>
      {show && (
        <pre className="mt-4 max-h-72 overflow-auto text-xs bg-slate-900 text-slate-100 p-4 rounded"><code>{JSON.stringify(demo, null, 2)}</code></pre>
      )}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-medium">Visibility Score</p>
          <p className="text-2xl font-semibold">{demo.visibilityScore}%</p>
        </div>
        <div>
          <p className="font-medium">Ranking Distribution</p>
          <p className="text-slate-700">Top 3: {demo.distribution.top3} • Top 10: {demo.distribution.top10} • Top 20: {demo.distribution.top20}</p>
        </div>
      </div>
      <ul className="mt-4 list-disc pl-5 text-slate-700 space-y-1 text-sm">
        <li>Daily rank tracking (desktop & mobile)</li>
        <li>Competitive share of voice graphs</li>
        <li>Feature snippet + SERP feature detection</li>
        <li>Alerting & historical exports (CSV / API)</li>
      </ul>
    </div>
  )
}

export default KeywordVisibilityPlaceholder